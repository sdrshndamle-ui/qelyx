// QHub Modal Component
// Handles modal display, form submission, and content rendering

import QHubModalContent from './QHubModalContent';

const MODAL_CONFIG = {
  'aspirant-profiles': {
    title: 'Submit Your Profile',
    subtitle: 'Join our talent network for exciting opportunities',
    fields: ['name', 'email', 'phone', 'linkedin', 'experience', 'skills', 'resume', 'message']
  },
  'training-programs': {
    title: 'Training Programs',
    subtitle: 'Browse and apply for upcoming programs',
    fields: ['name', 'email', 'phone', 'experience', 'message']
  },
  'trainer-registration': {
    title: 'Register as Trainer',
    subtitle: 'Share your expertise and get remunerated',
    fields: ['name', 'email', 'phone', 'linkedin', 'experience', 'skills', 'message']
  },
  'contractor-profiles': {
    title: 'Contractor & Freelancer Registration',
    subtitle: 'Submit your profile for client engagements',
    fields: ['name', 'email', 'phone', 'linkedin', 'experience', 'skills', 'availability', 'message']
  },
  'rfp-workshops': {
    title: 'Request RFPs & Workshops',
    subtitle: 'Let us help with your RFPs and workshops',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'bespoke-training': {
    title: 'Request Bespoke Training',
    subtitle: 'Customized training for your organisation',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'ethical-ai': {
    title: 'Ethical AI Certification',
    subtitle: 'Get certified for responsible AI practices',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'consulting': {
    title: 'Data & Domain Consulting',
    subtitle: 'Expert consulting for your niche requirements',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'focused-workshops': {
    title: 'Request Focused Workshop',
    subtitle: 'Targeted workshops for specific challenges',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'architecture-review': {
    title: 'Architecture Review Request',
    subtitle: 'Expert review of your architectures',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'market-research': {
    title: 'Market Research Request',
    subtitle: 'Industry-specific market research',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'rapid-prototypes': {
    title: 'Rapid Prototypes',
    subtitle: 'Register for secured prototyping environment',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'sandbox-partners': {
    title: 'Partner Sandbox Access',
    subtitle: 'Access our partner sandbox environments',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'hosted-environment': {
    title: 'Hosted Development Environment',
    subtitle: 'Let us host and develop for you',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'hackathons': {
    title: 'Organize a Hackathon',
    subtitle: 'Engage your teams with exciting hackathons',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'custom-solutions': {
    title: 'Custom Prototypes & Solutions',
    subtitle: 'Tailored solutions for your needs',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'client-sandbox': {
    title: 'Client Sandbox Setup',
    subtitle: 'Secured sandbox for your organisation',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'enthusiast-sandbox': {
    title: 'Join Collaborative Sandbox',
    subtitle: 'Share ideas with the community',
    fields: ['name', 'email', 'linkedin', 'skills', 'message']
  },
  'publish-ideas': {
    title: 'Publish Your Ideas',
    subtitle: 'Share and earn from your innovations',
    fields: ['name', 'email', 'linkedin', 'message']
  },
  'college-training': {
    title: 'College & Community Training',
    subtitle: 'Training programs for educational institutions',
    fields: ['name', 'email', 'organisation', 'phone', 'message']
  },
  'escrow-payments': {
    title: 'Escrow Payment System',
    subtitle: 'Learn about our secure payment system',
    fields: ['name', 'email', 'message']
  },
  'learning-labs': {
    title: 'Learning Labs Registration',
    subtitle: 'Train for specific client requirements',
    fields: ['name', 'email', 'phone', 'experience', 'message']
  }
};

const FIELD_LABELS = {
  name: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  organisation: 'Organisation',
  linkedin: 'LinkedIn Profile',
  experience: 'Years of Experience',
  skills: 'Key Skills',
  availability: 'Availability',
  message: 'Message / Additional Details',
  resume: 'Upload Resume'
};

const WIDE_MODAL_IDS = [
  'aspirant-profiles',
  'training-programs',
  'trainer-registration',
  'contractor-profiles',
  'rfp-workshops',
  'bespoke-training',
  'ethical-ai',
  'consulting',
  'focused-workshops',
  'architecture-review',
  'market-research',
  'rapid-prototypes',
  'sandbox-partners',
  'hosted-environment',
  'hackathons',
  'enthusiast-sandbox',
  'publish-ideas',
  'learning-labs',
  'college-training',
  'escrow-payments'
];

const QHubModal = ({
  activeModal,
  formData,
  isSubmitting,
  submitted,
  onClose,
  onSubmit,
  onChange
}) => {
  if (!activeModal) return null;

  const config = MODAL_CONFIG[activeModal] || {
    title: 'Contact Us',
    subtitle: 'Get in touch',
    fields: ['name', 'email', 'message']
  };
  const isWideModal = WIDE_MODAL_IDS.includes(activeModal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className={`bg-[#1E2A38] rounded-2xl p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto ${isWideModal ? 'max-w-5xl w-full' : 'max-w-lg w-full'}`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">{config.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{config.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Submitted Successfully!</h4>
            <p className="text-gray-300">We'll be in touch with you shortly.</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-accent-aqua text-white rounded-lg hover:bg-accent-aqua/80 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <div className={isWideModal ? 'grid lg:grid-cols-2 gap-8' : ''}>
            {/* Content - Left Side (for wide modals) */}
            {isWideModal && (
              <QHubModalContent activeModal={activeModal} />
            )}

            {/* Form - Right Side (or full width for other modals) */}
            <form onSubmit={onSubmit} className="space-y-4">
              {config.fields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {FIELD_LABELS[field]} {['name', 'email'].includes(field) && '*'}
                  </label>
                  {field === 'message' ? (
                    <textarea
                      name={field}
                      value={formData[field] || ''}
                      onChange={onChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-secondary-bright resize-none"
                      placeholder={`Enter ${FIELD_LABELS[field].toLowerCase()}`}
                    />
                  ) : field === 'resume' ? (
                    <input
                      type="file"
                      name={field}
                      accept=".pdf,.doc,.docx"
                      onChange={onChange}
                      className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary-bright file:text-white file:cursor-pointer"
                    />
                  ) : field === 'experience' ? (
                    <select
                      name={field}
                      value={formData[field] || ''}
                      onChange={onChange}
                      className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary-bright"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  ) : field === 'availability' ? (
                    <select
                      name={field}
                      value={formData[field] || ''}
                      onChange={onChange}
                      className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary-bright"
                    >
                      <option value="">Select availability</option>
                      <option value="immediate">Immediate</option>
                      <option value="2-weeks">2 weeks notice</option>
                      <option value="1-month">1 month notice</option>
                      <option value="2-months">2 months notice</option>
                      <option value="3-months">3+ months notice</option>
                    </select>
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      name={field}
                      value={formData[field] || ''}
                      onChange={onChange}
                      required={['name', 'email'].includes(field)}
                      className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-secondary-bright"
                      placeholder={`Enter ${FIELD_LABELS[field].toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QHubModal;

