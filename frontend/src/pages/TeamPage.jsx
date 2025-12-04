import { Link } from 'react-router-dom';

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      {/* About Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">About Us</h1>
          <div className="max-w-4xl">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Qelyx is a modern data and insights consultancy that partners with organisations to accelerate their digital and analytical maturity. We combine strategic advisory, innovation-driven thinking, hands-on implementation, and thought leadership to help organisations turn data into a competitive advantage.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Our expertise spans data strategy, analytics, AI enablement, data literacy, governance, and the full insight lifecycle. With a values-led approach grounded in Quality, Expertise, Leadership, Yield, and eXecution, we help businesses navigate complexity and achieve measurable results.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              At Qelyx, we believe data is more than numbers—it's intelligence, context, and opportunity. And we're here to make sure you capture all of it.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 lg:py-24 bg-[#1E2A38]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet Our Founder</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-secondary-azure to-accent-aqua rounded-2xl flex items-center justify-center">
                  <span className="text-6xl text-white font-bold">SD</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-2">Our Founder</h3>
                <p className="text-accent-aqua font-semibold mb-4">Founder & Principal Consultant</p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Our Founder brings over two decades of experience in data strategy, analytics, and digital transformation across financial services, insurance, and healthcare industries.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Having led complex data initiatives at global organizations, Our Founder established Qelyx with a vision to bridge the gap between technical excellence and business impact. His approach combines deep technical expertise with strategic thinking, ensuring that data investments deliver measurable value.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our Founder is passionate about helping organizations unlock the full potential of their data assets and building teams that can sustain and grow their analytical capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how Qelyx can help you achieve your data and analytics goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-8 py-4 text-base font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;

