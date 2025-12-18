import { Link } from 'react-router-dom';

const IndustriesPage = () => {
  const industries = [
    {
      title: 'Retail',
      description: 'Transform customer experiences and optimize operations with data-driven insights. From customer analytics to supply chain optimization, we help retailers make smarter decisions.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      useCases: [
        'Customer behavior analytics',
        'Inventory optimization',
        'Personalized marketing',
        'Supply chain analytics',
      ],
    },
    {
      title: 'Banking & Capital Markets',
      description: 'Navigate regulatory requirements while driving innovation. Our solutions help financial institutions manage risk, detect fraud, and deliver personalized services.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      useCases: [
        'Risk management & compliance',
        'Fraud detection & prevention',
        'Customer analytics',
        'Regulatory reporting',
      ],
    },
    {
      title: 'Insurance',
      description: 'Leverage data to improve underwriting, claims processing, and customer engagement. Our solutions help insurers operate more efficiently and serve customers better.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      useCases: [
        'Underwriting optimization',
        'Claims analytics',
        'Customer segmentation',
        'Predictive modeling',
      ],
    },
    {
      title: 'Health & Life Sciences',
      description: 'Improve patient outcomes and accelerate research with advanced analytics. From clinical trials to population health, we help healthcare organizations make data-driven decisions.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      useCases: [
        'Clinical trial analytics',
        'Population health management',
        'Drug discovery support',
        'Patient outcome prediction',
      ],
    },
    {
      title: 'Media & Entertainment',
      description: 'Understand audiences and optimize content delivery. Our solutions help media companies personalize experiences, optimize content strategy, and maximize engagement.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      useCases: [
        'Audience analytics',
        'Content recommendation',
        'Viewership prediction',
        'Ad optimization',
      ],
    },
    {
      title: 'Public Sector',
      description: 'Deliver better citizen services and improve operational efficiency. Our solutions help government agencies make data-driven policy decisions and optimize service delivery.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      useCases: [
        'Citizen service optimization',
        'Policy impact analysis',
        'Resource allocation',
        'Performance monitoring',
      ],
    },
  ];

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
              Industries We <span className="bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">Serve</span>
            </h1>
            <p className="text-body-large text-[#a0aec0] mb-8 max-w-2xl mx-auto leading-relaxed">
              Industry-specific data and AI solutions tailored to your unique challenges and opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="card group"
              >
                <div className="text-[#00d9ff] mb-4">{industry.icon}</div>
                <h3 className="text-h3 font-bold text-white mb-3 group-hover:text-[#00d9ff] transition-colors">
                  {industry.title}
                </h3>
                <p className="text-body-small text-[#a0aec0] mb-4 leading-relaxed">
                  {industry.description}
                </p>
                <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                  <p className="text-caption text-[#718096] mb-2 uppercase tracking-wider">Key Use Cases</p>
                  <ul className="space-y-2">
                    {industry.useCases.map((useCase, idx) => (
                      <li key={idx} className="text-body-small text-[#a0aec0] flex items-start gap-2">
                        <span className="text-[#00d9ff] mt-1">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#0f1625]">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-section font-extrabold mb-4 text-white">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-body text-[#a0aec0] mb-8 max-w-2xl mx-auto">
            Let's discuss how our industry-specific solutions can help you achieve your data and AI goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary"
            >
              Get in Touch
            </Link>
            <Link
              to="/services"
              className="btn-secondary"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;
