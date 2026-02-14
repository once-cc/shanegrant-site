import React, { useState } from 'react';
import FadeIn from './FadeIn';
import { supabase } from '../lib/supabase';
import { CONTACT_DETAILS } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Job Opportunity',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // ONLY call Edge Function - it handles both DB insert and email
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message
        }
      });

      if (error) {
        // Edge Function error
        throw new Error('Failed to send your message. Please try again.');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to send your message. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: 'Job Opportunity', message: '' });

    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Transmission failed. Please try again.');
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-charcoal/95 relative z-10 overflow-hidden" id="contact">

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-transparent overflow-hidden flex flex-col md:flex-row shadow-2xl rounded-sm">

            {/* Info Panel - Glass Dark */}
            <div className="bg-charcoal/90 backdrop-blur-md text-white p-6 sm:p-8 md:p-12 md:w-2/5 flex flex-col justify-between relative overflow-hidden border-r border-white/10">
              {/* Minimal decoration */}
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <span className="material-icons text-9xl">mail_outline</span>
              </div>

              <div className="relative z-10">
                <span className="text-white/40 font-body font-bold text-xs tracking-widest uppercase mb-6 block">Communication</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-5 sm:mb-8 tracking-tight">Get in Touch</h2>

                <div className="space-y-5 sm:space-y-8">
                  <div className="flex items-start group">
                    <span className="material-icons text-white/40 mt-1 mr-4 group-hover:text-white transition-colors">email</span>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-bold">Email Address</p>
                      <p className="font-body text-sm text-white font-medium">{CONTACT_DETAILS.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <span className="material-icons text-white/40 mt-1 mr-4 group-hover:text-white transition-colors">phone_iphone</span>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-bold">Mobile</p>
                      <p className="font-body text-sm text-white font-medium">{CONTACT_DETAILS.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <span className="material-icons text-white/40 mt-1 mr-4 group-hover:text-white transition-colors">place</span>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 font-bold">Location</p>
                      <p className="font-body text-sm text-white font-medium">{CONTACT_DETAILS.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 pt-5 sm:pt-8 border-t border-white/10 relative z-10">
                <p className="text-[11px] text-white/40 leading-relaxed font-body">
                  Available for contract roles and security consultation.
                </p>
              </div>
            </div>

            {/* Form Panel - Glass Light */}
            <div className="p-6 sm:p-8 md:p-12 md:w-3/5 bg-white/20 backdrop-blur-md relative border-l border-white/30">
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

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                  <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">Phone (Optional)</label>
                  <input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/50 border border-white/30 focus:border-white focus:ring-0 px-4 py-3 text-sm transition-colors placeholder-charcoal text-charcoal font-body rounded-sm backdrop-blur-sm"
                    placeholder="Phone Number"
                    type="tel"
                  />
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