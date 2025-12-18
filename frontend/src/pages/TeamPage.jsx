import { Link } from 'react-router-dom';

const TeamPage = () => {
  const teamValues = [
    {
      title: 'Expertise',
      description: 'Our team brings deep expertise in data science, AI, cloud engineering, and business strategy.',
    },
    {
      title: 'Collaboration',
      description: 'We work closely with clients as strategic partners, not just vendors.',
    },
    {
      title: 'Innovation',
      description: 'We stay at the forefront of technology, continuously learning and adapting to new tools and methodologies.',
    },
    {
      title: 'Results-Driven',
      description: 'We focus on delivering measurable business outcomes, not just technical solutions.',
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
              Our <span className="bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">Team</span>
            </h1>
            <p className="text-body-large text-[#a0aec0] mb-8 max-w-2xl mx-auto leading-relaxed">
              Multidisciplinary data and innovation specialists who help you navigate complexity with confidence
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 lg:py-24 bg-[#0f1625]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-h2 font-extrabold mb-4 text-white">Our Mission</h2>
              <p className="text-body text-[#a0aec0] leading-relaxed mb-4">
                To help organisations unlock the power of data through strategic advisory, innovative solutions, and expert implementation that accelerates decision-making and delivers measurable business outcomes.
              </p>
            </div>
            <div className="card">
              <h2 className="text-h2 font-extrabold mb-4 text-white">Our Vision</h2>
              <p className="text-body text-[#a0aec0] leading-relaxed mb-4">
                To be the trusted partner that organisations turn to when they need to transform their data capabilities, build innovative solutions, and achieve sustainable competitive advantage through data and AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-section font-extrabold mb-4 text-white">
              What Sets Us Apart
            </h2>
            <p className="text-body text-[#a0aec0] max-w-2xl mx-auto">
              The values and principles that guide our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamValues.map((value, index) => (
              <div
                key={index}
                className="card"
              >
                <h3 className="text-h3 font-bold text-white mb-3">{value.title}</h3>
                <p className="text-body-small text-[#a0aec0] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16 lg:py-24 bg-[#0f1625]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="card max-w-3xl mx-auto text-center">
            <h2 className="text-h2 font-extrabold mb-4 text-white">Join Our Team</h2>
            <p className="text-body text-[#a0aec0] mb-6 leading-relaxed">
              We're always looking for talented individuals who are passionate about data, AI, and helping organisations transform. If you're interested in joining our team, we'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-section font-extrabold mb-4 text-white">
            Ready to Work Together?
          </h2>
          <p className="text-body text-[#a0aec0] mb-8 max-w-2xl mx-auto">
            Let's discuss how our team can help transform your data strategy and deliver measurable results.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary"
            >
              Contact Us
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

export default TeamPage;
