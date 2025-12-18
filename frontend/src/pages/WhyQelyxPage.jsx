import { Link } from 'react-router-dom';
import QVideo from '../assets/Q_New.mp4';

const WhyQelyxPage = () => {
  const valuePillars = [
    {
      title: 'Quality',
      description: 'We are committed to delivering excellence in every engagement. From data accuracy to solution design, we maintain rigorous standards that ensure our work stands up to scrutiny and delivers lasting value.',
    },
    {
      title: 'Expertise',
      description: 'Our team brings deep domain knowledge across financial services, healthcare, retail, and more. We combine technical mastery with business acumen to solve complex challenges effectively.',
    },
    {
      title: 'Leadership',
      description: 'We guide organizations through transformation with vision and clarity. Our thought leadership helps clients navigate uncertainty and make informed decisions about their data future.',
    },
    {
      title: 'Yield',
      description: 'We focus on maximizing returns from your data investments. Every initiative is designed to deliver measurable business outcomes and sustainable competitive advantage.',
    },
    {
      title: 'eXecution',
      description: 'Strategy without execution is just theory. We pride ourselves on delivering results with precision, speed, and reliability—turning ambitious plans into operational reality.',
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
              The <span className="bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">Qelyx Story</span>
            </h1>
            <p className="text-body-large text-[#a0aec0] mb-8 max-w-4xl mx-auto leading-relaxed">
              We founded Qelyx with a simple belief: organizations deserve a partner who understands both the technical complexity of modern data and AI ecosystems and the business outcomes they're trying to achieve. Too often, these worlds exist in silos—technologists who can't speak the language of business, and business leaders left frustrated by solutions that don't deliver. We bridge that divide, combining deep technical mastery with strategic business insight to drive transformation that actually works.
            </p>
          </div>
        </div>
      </section>

      {/* Connected Insights Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-section font-extrabold text-[#00d9ff] mb-6">
                Connected Insights, Unified Vision
              </h2>
              <div className="space-y-4 text-body text-[#a0aec0] leading-relaxed">
                <p>
                  The Qelyx logo tells the story of modern business complexity—and our solution to it.
                </p>
                <p>
                  Each node represents the reality of your organization: different datasets scattered across departments, multiple stakeholders with varying priorities, diverse business verticals operating in silos, and sectors that rarely communicate effectively. These critical decision points exist in isolation, creating blind spots that limit your strategic potential.
                </p>
                <p>
                  The connections between nodes represent what we do. At Qelyx, we don't just collect data—we weave it together. We believe in bringing all your decision points into a unified network, creating pathways where insights flow freely across boundaries. When datasets connect, when parties collaborate, when verticals share intelligence—that's when transformation happens.
                </p>
                <p>
                  The result? Specific, actionable insights tailored to your unique challenges. Not generic dashboards or disconnected reports, but a cohesive intelligence network that empowers confident decision-making across your entire organization.
                </p>
              </div>
              <p className="text-body-large font-bold text-white mt-8">
                Qelyx: Where disconnected nodes become connected intelligence.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-2xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-auto rounded-2xl"
                  aria-label="Qelyx connected intelligence visualization"
                >
                  <source src={QVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-16 lg:py-24 bg-[#0f1625]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <p className="text-body text-white">From ambiguity into clarity</p>
              <p className="text-body text-white">From ideas into innovation</p>
              <p className="text-body text-white">From insight into action</p>
            </div>
            <div className="space-y-8">
              <p className="text-body font-bold text-white">We turn complex data challenges into strategic opportunities</p>
              <p className="text-body font-bold text-white">We transform raw information into competitive advantage</p>
              <p className="text-body font-bold text-white">We convert analytics into measurable business results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-section font-extrabold mb-4 text-white">
              Foundation of Our Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            {valuePillars.map((pillar, index) => {
              const isExecution = pillar.title === 'eXecution';
              const firstLetter = pillar.title[0];
              const restOfTitle = pillar.title.slice(1);
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 flex flex-col h-full min-h-[250px] sm:min-h-[280px]"
                >
                  <h3 className="text-h3 font-bold mb-3 flex-shrink-0">
                    {isExecution ? (
                      <>
                        <span className="font-extrabold text-[#0a0f1c]">{firstLetter}</span>
                        <span className="font-extrabold text-[#00b8d4]">{restOfTitle[0]}</span>
                        <span className="text-[#0a0f1c]">{restOfTitle.slice(1)}</span>
                      </>
                    ) : (
                      <>
                        <span className="font-extrabold text-[#00b8d4]">{firstLetter}</span>
                        <span className="text-[#0a0f1c]">{restOfTitle}</span>
                      </>
                    )}
                  </h3>
                  <p className="text-body-small text-[#0a0f1c] leading-relaxed flex-grow">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-16 lg:py-24 bg-[#0f1625]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-section font-extrabold text-white mb-6">
                A Partner Who Understands Both Data and Business
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-body text-white leading-relaxed">
                We bridge the gap between technical depth and strategic impact—ensuring your data investments don't just launch, but deliver measurable value over the long term. Our team speaks the language of both the boardroom and the data centre, translating complex analytics into actionable business strategy.
              </p>
              <Link
                to="/contact"
                className="btn-primary inline-block"
              >
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-section font-extrabold mb-4 text-white">
              What we Offer
            </h2>
            <p className="text-body text-[#a0aec0] max-w-2xl mx-auto">
              A strategic, collaborative methodology that delivers results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="card">
              <h3 className="text-h3 font-bold text-white mb-4">Strategic Advisory</h3>
              <p className="text-body-small text-[#a0aec0] leading-relaxed mb-4">
                We begin by understanding your unique challenges and opportunities. Our strategic advisory services help you define clear data and AI objectives aligned with your business goals.
              </p>
              <ul className="space-y-2 text-body-small text-[#a0aec0]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>Data & AI strategy development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>Analytics maturity assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>Transformation roadmaps</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-h3 font-bold text-white mb-4">Innovation & Prototyping</h3>
              <p className="text-body-small text-[#a0aec0] leading-relaxed mb-4">
                We rapidly prototype solutions to validate concepts before full-scale implementation. Our innovation services help you test ideas quickly and cost-effectively.
              </p>
              <ul className="space-y-2 text-body-small text-[#a0aec0]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>AI/ML prototypes and POCs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>Automation accelerators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>Concept validation</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-h3 font-bold text-white mb-4">Expert Implementation</h3>
              <p className="text-body-small text-[#a0aec0] leading-relaxed mb-4">
                We turn strategy into reality with expert implementation services. Our engineering teams build modern data platforms and analytics solutions that scale.
              </p>
              <ul className="space-y-2 text-body-small text-[#a0aec0]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>Modern data platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>Cloud-native engineering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>MLOps & production AI</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-h3 font-bold text-white mb-4">Thought Leadership</h3>
              <p className="text-body-small text-[#a0aec0] leading-relaxed mb-4">
                We share knowledge and build capabilities through workshops, training, and community programs. Our thought leadership helps organizations build data literacy and stay ahead.
              </p>
              <ul className="space-y-2 text-body-small text-[#a0aec0]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>CXO Advisory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>Leadership workshops</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00d9ff] mt-1">•</span>
                  <span>Data literacy training</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#0f1625]">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-section font-extrabold mb-4 text-white">
            Ready to Transform Your Data Strategy?
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

export default WhyQelyxPage;
