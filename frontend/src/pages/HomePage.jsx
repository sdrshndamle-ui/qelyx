import { Link } from 'react-router-dom';
import QelyxLogoNew from '../assets/Qelyx Logo_New.png';

const HomePage = () => {
  return (
    <div className="bg-cloud-white">
      {/* Hero Section */}
      <section className="max-w-content mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-navy leading-tight mb-6">
              Transform Your Data Into{' '}
              <span className="bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
                Strategic Advantage
              </span>
            </h1>
            <p className="text-lg text-graphite mb-8 leading-relaxed">
              Qelyx partners with organisations to accelerate their digital and analytical maturity. We combine strategic advisory, innovation-driven thinking, and hands-on implementation to help you turn data into competitive advantage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
              >
                Get Started
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-secondary-bright px-6 py-3 text-sm font-semibold text-secondary-bright hover:bg-secondary-bright hover:text-white transition"
              >
                Explore Services
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-sm lg:max-w-md flex items-center justify-center bg-[#F8FAFC] p-4 rounded-lg">
              <img
                src={QelyxLogoNew}
                alt="Qelyx logo"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Pillars Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-primary-legacy via-[#2A6FF4] to-[#15d5d1] bg-clip-text text-transparent">
              Qelyx
            </span>
            <span className="text-primary-navy"> - Core Value Pillars</span>
          </h2>
          <div className="max-w-none mb-12">
            <p className="text-graphite leading-relaxed text-center">
              Organizations sit on goldmines of untapped potential. While data flows through countless business processes daily, traditional approaches barely scratch the surface of what's possible. By intelligently connecting datasets with the people, processes, and industry contexts that give them meaning, organizations can transform raw information into strategic advantage—meeting regulatory demands more efficiently, delivering superior customer value, powering smarter decisions, and unlocking entirely new revenue streams. The question isn't whether your data holds value. It's whether you're positioned to capture it.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { letter: 'Q', title: 'Quality', desc: 'Uncompromising standards in every deliverable' },
              { letter: 'E', title: 'Expertise', desc: 'Deep domain knowledge and technical mastery' },
              { letter: 'L', title: 'Leadership', desc: 'Guiding transformation with vision and clarity' },
              { letter: 'Y', title: 'Yield', desc: 'Maximizing returns on your data investments' },
              { letter: 'X', title: 'eXecution', desc: 'Delivering results with precision and speed' },
            ].map((pillar) => (
              <div key={pillar.letter} className="text-center p-6 rounded-xl bg-cloud-white border border-gray-100">
                <div className="text-4xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent mb-2">
                  {pillar.letter}
                </div>
                <h3 className="font-semibold text-primary-navy mb-2">{pillar.title}</h3>
                <p className="text-sm text-graphite">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-navy py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Unlock Your Data's Potential?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how Qelyx can help you transform your data strategy and achieve measurable business outcomes.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-8 py-4 text-base font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

