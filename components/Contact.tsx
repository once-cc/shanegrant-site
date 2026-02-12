import React, { useState } from 'react';
import FadeIn from './FadeIn';
import { DIGITAL_CAMO_URI } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Job Opportunity',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [attachment, setAttachment] = useState<{ filename: string; content: string } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      setErrorMessage('File size exceeds 20MB limit.');
      return;
    }

    setErrorMessage('');

    // Convert to Base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      // Extract just the base64 part if needed, but Resend handles data URIs or raw base64 usually. 
      // Resend expects 'content' to be a buffer or base64 string. 
      // If we send data URI, we might need to strip the prefix.
      // Let's strip the prefix for safety to send clean base64.
      const content = base64String.split(',')[1];
      setAttachment({
        filename: file.name,
        content: content
      });
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, attachment }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'Job Opportunity', message: '' });
      setAttachment(null);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Transmission failed');
    }
  };

  return (
    <section className="py-24 bg-transparent relative overflow-hidden" id="contact">

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-transparent overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-sm">

            {/* Info Panel - Glass Dark */}
            <div className="bg-charcoal/90 backdrop-blur-md text-white p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden border-r border-white/10">
              {/* Minimal decoration */}
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <span className="material-icons text-9xl">mail_outline</span>
              </div>

              <div className="relative z-10">
                <span className="text-white/40 font-body font-bold text-xs tracking-widest uppercase mb-6 block">Communication</span>
                <h2 className="text-3xl font-display font-bold mb-8 tracking-tight">Get in Touch</h2>

                <div className="space-y-8">
                  <div className="flex items-start group">
                    <span className="material-icons text-white/40 mt-1 mr-4 group-hover:text-white transition-colors">email</span>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-bold">Email Address</p>
                      <p className="font-body text-sm text-white font-medium">Grantshane411@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <span className="material-icons text-white/40 mt-1 mr-4 group-hover:text-white transition-colors">phone_iphone</span>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-bold">Mobile</p>
                      <p className="font-body text-sm text-white font-medium">021 210 9665</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <span className="material-icons text-white/40 mt-1 mr-4 group-hover:text-white transition-colors">place</span>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-bold">Location</p>
                      <p className="font-body text-sm text-white font-medium">Paraparaumu, Wellington</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 md:mt-0 pt-8 border-t border-white/10 relative z-10">
                <p className="text-[11px] text-white/40 leading-relaxed font-body">
                  Available for contract roles and security consultation.
                </p>
              </div>
            </div>

            {/* Form Panel - Glass Light */}
            <div className="p-12 md:w-3/5 bg-white/20 backdrop-blur-md relative border-l border-white/30">
              {status === 'success' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/90 backdrop-blur-sm z-20 animate-fade-in">
                  <div className="w-16 h-16 bg-off-white rounded-full flex items-center justify-center mb-4">
                    <span className="material-icons text-charcoal text-3xl">check</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-charcoal mb-2">Message Sent</h3>
                  <p className="text-battleship-gray mb-6 text-sm">Thank you for your enquiry. I will respond shortly.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-3 bg-charcoal text-white text-xs font-bold uppercase tracking-widest hover:bg-charcoal-light transition-colors rounded-sm"
                  >
                    Send Another
                  </button>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">Name</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/50 border border-white/30 focus:border-white focus:ring-0 px-4 py-3 text-sm transition-colors placeholder-charcoal text-charcoal font-body rounded-sm backdrop-blur-sm"
                      placeholder="Full Name"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">Email</label>
                    <input
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/50 border border-white/30 focus:border-white focus:ring-0 px-4 py-3 text-sm transition-colors placeholder-charcoal text-charcoal font-body rounded-sm backdrop-blur-sm"
                      placeholder="Email Address"
                      type="email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">Subject</label>
                  <div className="relative">
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white/50 border border-white/30 focus:border-white focus:ring-0 px-4 py-3.5 text-sm font-semibold transition-all duration-200 text-charcoal font-body cursor-pointer appearance-none rounded-sm backdrop-blur-sm hover:bg-white/60 focus:bg-white/60"
                      style={{
                        backgroundImage: 'none'
                      }}
                    >
                      <option className="bg-white text-charcoal font-semibold py-2">Job Opportunity</option>
                      <option className="bg-white text-charcoal font-semibold py-2">Networking Inquiry</option>
                      <option className="bg-white text-charcoal font-semibold py-2">Reference Request</option>
                      <option className="bg-white text-charcoal font-semibold py-2">General Enquiry</option>
                    </select>
                    <div className="absolute right-4 top-4 pointer-events-none text-charcoal/60">
                      <span className="material-icons text-sm">expand_more</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    required
                    minLength={10}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/50 border border-white/30 focus:border-white focus:ring-0 px-4 py-3 text-sm transition-colors placeholder-charcoal text-charcoal font-body rounded-sm resize-y backdrop-blur-sm"
                    placeholder="How can I help you?"
                    rows={5}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">Attachment (Optional)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer px-4 py-2 bg-white/50 border border-white/30 text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-colors rounded-sm flex items-center gap-2 text-charcoal backdrop-blur-sm"
                    >
                      <span className="material-icons text-sm">attach_file</span>
                      Upload File
                    </label>
                    {attachment && (
                      <div className="flex items-center gap-2 bg-white/50 border border-border-neutral px-3 py-1 rounded-sm backdrop-blur-sm">
                        <span className="text-xs text-charcoal font-medium truncate max-w-[150px]">{attachment.filename}</span>
                        <button
                          type="button"
                          onClick={() => setAttachment(null)}
                          className="text-battleship-gray hover:text-red-500 transition-colors"
                        >
                          <span className="material-icons text-sm">close</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-white/80 mt-1">Max file size: 20MB</p>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50/80 border-l-4 border-red-500 text-red-700 text-sm backdrop-blur-sm">
                    {errorMessage}
                  </div>
                )}

                <button
                  disabled={status === 'submitting'}
                  className="w-full bg-charcoal hover:bg-charcoal-light text-white font-bold uppercase tracking-widest py-4 transition-all flex justify-center items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group rounded-sm text-xs"
                  type="submit"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="material-icons text-sm animate-spin">refresh</span> Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;