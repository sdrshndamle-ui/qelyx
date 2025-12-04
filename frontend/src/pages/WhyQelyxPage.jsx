import { Link } from 'react-router-dom';

const WhyQelyxPage = () => {
  const pillars = [
    {
      letter: 'Q',
      title: 'Quality',
      desc: 'We are committed to delivering excellence in every engagement. From data accuracy to solution design, we maintain rigorous standards that ensure our work stands up to scrutiny and delivers lasting value.'
    },
    {
      letter: 'E',
      title: 'Expertise',
      desc: 'Our team brings deep domain knowledge across financial services, healthcare, retail, and more. We combine technical mastery with business acumen to solve complex challenges effectively.'
    },
    {
      letter: 'L',
      title: 'Leadership',
      desc: 'We guide organizations through transformation with vision and clarity. Our thought leadership helps clients navigate uncertainty and make informed decisions about their data future.'
    },
    {
      letter: 'Y',
      title: 'Yield',
      desc: 'We focus on maximizing returns from your data investments. Every initiative is designed to deliver measurable business outcomes and sustainable competitive advantage.'
    },
    {
      letter: 'X',
      title: 'eXecution',
      desc: 'Strategy without execution is just theory. We pride ourselves on delivering results with precision, speed, and reliability—turning ambitious plans into operational reality.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The Qelyx Story
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            We founded Qelyx with a simple belief: organizations deserve a partner who understands both the technical complexity of modern data ecosystems and the business outcomes they're trying to achieve.
          </p>
        </div>
      </section>

      {/* Philosophy Bar */}
      <section className="bg-[#1F3044] py-12">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-gray-300">
              <p className="mb-4">From ambiguity into clarity</p>
              <p className="mb-4">From ideas into innovation</p>
              <p>From insight into action</p>
            </div>
            <div className="text-white font-bold">
              <p className="mb-4">We turn complex data challenges into strategic opportunities</p>
              <p className="mb-4">We transform raw information into competitive advantage</p>
              <p>We convert analytics into measurable business results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Foundation of Our Approach
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.letter} className="bg-[#F5F7FA] rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  <span className="text-4xl bg-gradient-to-r from-primary-legacy via-[#2A6FF4] to-[#15d5d1] bg-clip-text text-transparent">
                    {pillar.letter}
                  </span>
                  <span className="bg-gradient-to-r from-primary-legacy via-[#2A6FF4] to-[#15d5d1] bg-clip-text text-transparent">
                    {pillar.title.slice(1)}
                  </span>
                </h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-16 lg:py-24 bg-[#1E2A38]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                A Partner Who Understands Both Data and Business
              </h2>
            </div>
            <div>
              <p className="text-gray-300 leading-relaxed">
                We bridge the gap between technical depth and strategic impact—ensuring your data investments don't just launch, but deliver measurable value over the long term. Our team speaks the language of both the boardroom and the data centre, translating complex analytics into actionable business strategy.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-8 py-4 text-base font-semibold text-white shadow-md hover:shadow-lg transition"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyQelyxPage;

