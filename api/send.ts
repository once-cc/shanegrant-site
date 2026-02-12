
import { Resend } from 'resend';
import { Buffer } from 'buffer';

export const config = {
    runtime: 'edge',
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { name, email, subject, message, attachment } = await request.json();

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { data, error } = await resend.emails.send({
            from: 'Shane Grant Portfolio <noreply@shanegrant.nz>',
            to: ['grantshane411@gmail.com'], // Hardcoded for safety
            replyTo: email,
            subject: `[Portfolio Contact] ${subject}: ${name}`,
            html: `
        <h1>New Contact from shanegrant.nz</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
            attachments: attachment ? [{
                filename: attachment.filename,
                content: Buffer.from(attachment.content, 'base64'),
            }] : [],
        });

        if (error) {
            console.error('Resend Error:', error);
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        console.error('Server Error:', err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
