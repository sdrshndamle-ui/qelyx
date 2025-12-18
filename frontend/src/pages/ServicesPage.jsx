import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      id: 'data-advisory',
      title: 'Data Advisory',
      description: 'Strategy, governance, maturity assessments, and roadmapping to guide your data transformation journey.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        'Data & AI strategy',
        'Analytics maturity assessment',
        'Data governance & Operating model',
        'Technology & cloud advisory',
        'Privacy & Ethics Frameworks',
        'Vendor selection and solution evaluation',
        'AI Readiness and Transformation roadmaps',
      ],
    },
    {
      id: 'innovation',
      title: 'Insight & Intelligence Innovation',
      description: 'AI/ML prototypes, automation, concept validation, and data product designs to test ideas quickly and cost-effectively.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: [
        'AI/ML Prototypes',
        'Automation Accelerators',
        'Concept validation & POCs',
        'Data Product Designs',
        'Industry-specific innovation frameworks',
        'BI/Analytics Modernisation',
        'Predictive & Prescriptive Modelling',
        'Generative AI Use-Case Design',
        'Customer & Market Insight Frameworks',
      ],
    },
    {
      id: 'implementation',
      title: 'Implementation & Engineering',
      description: 'Modern data platforms, engineering, insights delivery, and cloud-native solutions that scale with your business.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: [
        'Modern data platforms',
        'Data pipelines & integration',
        'Analytics dashboards & insight systems',
        'MLOps & production AI',
        'Cloud-native engineering',
        'Orchestration',
        'Legacy platform decommissioning',
        'Data Mesh and Fabric architectures',
      ],
    },
    {
      id: 'thought-leadership',
      title: 'Thought Leadership',
      description: 'Frameworks, workshops, executive storytelling, and training programs to build data literacy and organizational capabilities.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: [
        'CXO Advisory',
        'Leadership Workshops',
        'Data Literacy Training',
        'Community & Knowledge Programs',
        'Market Research',
        'Team upskilling',
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
              Our <span className="bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-body-large text-[#a0aec0] mb-8 max-w-2xl mx-auto leading-relaxed">
              Comprehensive data and AI solutions tailored to accelerate your digital and analytical maturity
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="text-[#00d9ff] mb-4">{service.icon}</div>
                  <h2 className="text-section font-extrabold mb-4 text-white">
                    {service.title}
                  </h2>
                  <p className="text-body text-[#a0aec0] mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-body-small text-[#a0aec0]">
                        <span className="text-[#00d9ff] mt-1 flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="btn-primary inline-block"
                  >
                    Get Started
                  </Link>
                </div>
                <div className={`card ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <div className="aspect-video bg-gradient-to-br from-[#00d9ff]/20 to-[#6366f1]/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-[#00d9ff] mb-2">{service.icon}</div>
                      <p className="text-body-small text-[#a0aec0]">Service Visualization</p>
                    </div>
                  </div>
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
            Ready to Get Started?
          </h2>
          <p className="text-body text-[#a0aec0] mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help transform your data strategy and deliver measurable business outcomes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary"
            >
              Contact Us
            </Link>
            <Link
              to="/why-qelyx"
              className="btn-secondary"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
