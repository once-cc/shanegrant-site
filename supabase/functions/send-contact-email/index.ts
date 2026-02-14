import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RECIPIENT_EMAIL = "grantshane411@gmail.com"

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
}

// Escape HTML entities to prevent XSS in email templates
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders })
    }

    try {
        const { name, email, phone, message, subject } = await req.json()

        // Validate required fields
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: "Missing required fields: name, email, and message are required", success: false }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: "Invalid email format", success: false }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // Create Supabase client with service role key (server-side only)
        const supabaseAdmin = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        )

        // Step 1: Insert into database (using service role - bypasses RLS)
        const { data: submission, error: dbError } = await supabaseAdmin
            .from("contact_submissions")
            .insert([{
                name,
                email,
                phone: phone || null,
                message: subject ? `Subject: ${subject}\n\n${message}` : message,
                ip_address: req.headers.get("x-forwarded-for") || "unknown",
                user_agent: req.headers.get("user-agent") || "unknown",
            }])
            .select()
            .single()

        if (dbError) {
            console.error("Database insert error:", dbError)
            return new Response(
                JSON.stringify({ error: `Failed to save submission: ${dbError.message}`, success: false }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        console.log("Database insert OK, submission ID:", submission.id)

        // Step 2: Send email notification via Resend
        let emailSent = false
        try {
            const resendApiKey = Deno.env.get("RESEND_API_KEY")

            if (!resendApiKey) {
                console.warn("RESEND_API_KEY not configured - email notification skipped")
            } else {
                console.log("Sending email via Resend...")

                const safeName = escapeHtml(name)
                const safeEmail = escapeHtml(email)
                const safePhone = escapeHtml(phone || "Not provided")
                const safeMessage = escapeHtml(message)

                const emailSubject = `New Contact Form Submission from ${safeName}`
                const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { border-bottom: 3px solid #2c5530; padding-bottom: 10px; margin-bottom: 20px; }
    .header h1 { margin: 0; color: #2c5530; font-size: 22px; }
    .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #2c5530; }
    .section h2 { margin: 0 0 10px 0; color: #2c5530; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
    .field { margin: 8px 0; }
    .field strong { display: inline-block; width: 80px; color: #555; }
    .message-box { background: white; padding: 15px; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="section">
      <h2>Contact Details</h2>
      <div class="field"><strong>Name:</strong> ${safeName}</div>
      <div class="field"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></div>
      <div class="field"><strong>Phone:</strong> ${safePhone}</div>
    </div>
    <div class="section">
      <h2>Message</h2>
      <div class="message-box">${safeMessage}</div>
    </div>
    <div class="footer">
      <p><strong>Submission ID:</strong> ${submission.id}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" })}</p>
      <p>Click <strong>Reply</strong> to respond directly to ${safeEmail}</p>
    </div>
  </div>
</body>
</html>`.trim()

                const resendResponse = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${resendApiKey}`,
                    },
                    body: JSON.stringify({
                        from: "Shane Grant Portfolio <no-reply@shanegrant.site>",
                        to: [RECIPIENT_EMAIL],
                        reply_to: email,
                        subject: emailSubject,
                        html: emailHtml,
                    }),
                })

                const resendBody = await resendResponse.text()
                console.log("Resend response status:", resendResponse.status)
                console.log("Resend response body:", resendBody)

                if (resendResponse.ok) {
                    emailSent = true
                    console.log("Email sent successfully via Resend")
                } else {
                    console.error("Resend API error:", resendBody)
                }
            }
        } catch (emailError) {
            console.error("Email sending error:", emailError)
            console.warn("Email notification failed, but submission was saved to database")
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Submission received successfully",
                submissionId: submission.id,
                emailSent,
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )

    } catch (error) {
        console.error("Error in send-contact-email function:", error)
        return new Response(
            JSON.stringify({ error: error.message || "Internal server error", success: false }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    }
})
