import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Gradients */}
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
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-[rgba(0,217,255,0.1)] text-[#00d9ff] px-4 py-2 rounded-full text-eyebrow font-bold mb-6 uppercase tracking-wider">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L10 6H14L11 9L12 14L8 11L4 14L5 9L2 6H6L8 2Z" fill="currentColor"/>
              </svg>
              Data & AI Consulting Excellence
            </div>
            
            {/* Hero Title */}
            <h1 className="text-hero font-extrabold mb-6 text-white">
              Turning Data into <span className="bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">Decisions</span>
            </h1>
            
            {/* Hero Description */}
            <p className="text-body-large text-[#a0aec0] mb-8 max-w-2xl mx-auto leading-relaxed">
              Qelyx partners with organisations to accelerate their digital and analytical maturity. We combine strategic advisory, innovation-driven thinking, and hands-on implementation to help you turn data into competitive advantage.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary"
              >
                Start Your Data Journey
              </Link>
              <Link
                to="/services"
                className="btn-secondary"
              >
                Explore our services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-[#0f1625]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-section font-extrabold mb-4 text-white">
              Qelyx - Core Value Pillars
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-body text-[#a0aec0] leading-relaxed">
                Organizations sit on goldmines of untapped potential. While data flows through countless business processes daily, traditional approaches barely scratch the surface of what's possible. By intelligently connecting datasets with the people, processes, and industry contexts that give them meaning, organizations can transform raw information into strategic advantage—meeting regulatory demands more efficiently, delivering superior customer value, powering smarter decisions, and unlocking entirely new revenue streams. The question isn't whether your data holds value. It's whether you're positioned to capture it.
              </p>
              <p className="text-body text-[#a0aec0] leading-relaxed">
                Qelyx helps organisations unlock the power of data through advisory, innovation, and implementation services that accelerate decision-making and deliver measurable business outcomes. We bring uncompromising rigor and excellence to every insight and solution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {[
              {
                title: 'Quality',
                description: 'Excellence without exception—in every insight, solution, and deliverable',
                stagger: true,
              },
              {
                title: 'Expertise',
                description: 'We pursue mastery, not just knowledge—bringing depth and technical excellence to every challenge.',
                stagger: false,
              },
              {
                title: 'Leadership',
                description: 'We don\'t just guide change - we drive transformation with vision and unwavering clarity.',
                stagger: true,
              },
              {
                title: 'Yield',
                description: 'Partnering with you in turning data investments into measurable business impact',
                stagger: false,
              },
              {
                title: 'eXecution',
                description: 'Delivering results that matter, executed with precision, speed and focus',
                stagger: true,
              },
            ].map((pillar, index) => {
              // Special handling for "eXecution" - color the X, not the e
              const isExecution = pillar.title === 'eXecution';
              const firstLetter = pillar.title[0];
              const restOfTitle = pillar.title.slice(1);
              
              return (
                <div
                  key={index}
                  className={`bg-[#151b2e] border border-[rgba(255,255,255,0.1)] rounded-2xl p-4 sm:p-6 group transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-glow hover:border-[rgba(0,217,255,0.3)] flex flex-col min-h-[200px] sm:min-h-[220px] ${
                    pillar.stagger ? 'lg:self-start' : 'lg:self-end'
                  }`}
                >
                  <h3 className="text-h3 font-bold text-white mb-3 flex-shrink-0">
                    {isExecution ? (
                      <>
                        <span className="font-extrabold">{firstLetter}</span>
                        <span className="font-extrabold text-[#00d9ff]">{restOfTitle[0]}</span>
                        {restOfTitle.slice(1)}
                      </>
                    ) : (
                      <>
                        <span className="font-extrabold text-[#00d9ff]">{firstLetter}</span>
                        {restOfTitle}
                      </>
                    )}
                  </h3>
                  <p className="text-body-small text-[#a0aec0] leading-relaxed flex-grow">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-section font-extrabold mb-4 text-white">
              Our Services
            </h2>
            <p className="text-body text-[#a0aec0] max-w-2xl mx-auto">
              Comprehensive data and AI solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Data Advisory',
                description: 'Strategy, governance, maturity assessments, and roadmapping to guide your data transformation journey.',
                link: '/services',
              },
              {
                title: 'Innovation',
                description: 'AI/ML prototypes, automation accelerators, and concept validation to test ideas quickly.',
                link: '/services',
              },
              {
                title: 'Implementation',
                description: 'End-to-end implementation services bringing your data strategy to life with expert execution.',
                link: '/services',
              },
              {
                title: 'Thought Leadership',
                description: 'Leveraging industry experience for bringing clarity to complexity; turning complex challenges into clear strategies.',
                link: '/services',
              },
            ].map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="card group hover:border-[rgba(0,217,255,0.3)]"
              >
                <h3 className="text-h3 font-bold text-white mb-3 group-hover:text-[#00d9ff] transition-colors">
                  {service.title}
                </h3>
                <p className="text-body-small text-[#a0aec0] leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 text-[#00d9ff] text-sm font-semibold flex items-center gap-2">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#0f1625]">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-section font-extrabold mb-4 text-white">
            Ready to Transform?
          </h2>
          <p className="text-body text-[#a0aec0] mb-8 max-w-2xl mx-auto">
            Let's discuss how Qelyx can help accelerate your digital and analytical maturity.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary"
            >
              Get in Touch
            </Link>
            <Link
              to="/q-hub"
              className="btn-secondary"
            >
              Explore Q Hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
