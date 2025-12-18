import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    message: '',
    scheduleCall: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        organisation: '',
        message: '',
        scheduleCall: false,
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(0, 217, 255, 0.08), transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06), transparent 50%)
            `
          }}
        />
        
        <div className="relative max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero font-extrabold mb-6 text-white">
              Get in <span className="bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-body-large text-[#a0aec0] mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how Qelyx can help accelerate your digital and analytical maturity
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-h2 font-extrabold mb-6 text-white">Send us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-h3 font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-body text-[#a0aec0]">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-body-small font-medium text-white mb-2">
                      Name <span className="text-[#00d9ff]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#151b2e] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[#718096] focus:outline-none focus:border-[#00d9ff] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-body-small font-medium text-white mb-2">
                      Email <span className="text-[#00d9ff]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#151b2e] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[#718096] focus:outline-none focus:border-[#00d9ff] transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="organisation" className="block text-body-small font-medium text-white mb-2">
                      Organisation
                    </label>
                    <input
                      type="text"
                      id="organisation"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#151b2e] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[#718096] focus:outline-none focus:border-[#00d9ff] transition-colors"
                      placeholder="Your organisation"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-body-small font-medium text-white mb-2">
                      Message <span className="text-[#00d9ff]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#151b2e] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[#718096] focus:outline-none focus:border-[#00d9ff] transition-colors resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="scheduleCall"
                      name="scheduleCall"
                      checked={formData.scheduleCall}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 bg-[#151b2e] border border-[rgba(255,255,255,0.1)] rounded focus:ring-[#00d9ff] focus:ring-2"
                    />
                    <label htmlFor="scheduleCall" className="text-body-small text-[#a0aec0]">
                      I'd like to schedule a discovery call
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card">
                <h2 className="text-h2 font-extrabold mb-6 text-white">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="text-[#00d9ff] mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-small text-[#718096] mb-1">Email</p>
                      <a href="mailto:sales@qelyx.com" className="text-body text-[#00d9ff] hover:text-[#00b8d4] transition-colors">
                        sales@qelyx.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-[#00d9ff] mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-small text-[#718096] mb-1">Phone</p>
                      <a href="tel:+447858375128" className="text-body text-[#00d9ff] hover:text-[#00b8d4] transition-colors">
                        +44 (0)7858375128
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-[#00d9ff] mt-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-body-small text-[#718096] mb-1">Location</p>
                      <p className="text-body text-white">London, UK</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-h3 font-bold text-white mb-4">Office Hours</h3>
                <div className="space-y-2 text-body-small text-[#a0aec0]">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM GMT</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
