import { Link } from 'react-router-dom';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Data & AI Solutions for a Smarter Future
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We help organisations harness the power of data and AI to drive innovation, efficiency, and growth across every sector.
            </p>
          </div>
        </div>
      </section>

      {/* Advisory Section */}
      <section className="py-16">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-white mb-4">Advisory</h2>
          <p className="text-gray-300 mb-8 max-w-4xl">
            We help you shape a clear data vision. From strategy to architecture, governance to operating models—our advisory approach ensures your organisation is aligned, future-ready, and optimised for decision-making at scale.
          </p>
          <h3 className="text-xl font-semibold text-white mb-6">What we cover:</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Data & AI Strategy', desc: 'Define your data vision and roadmap aligned with business objectives' },
              { title: 'Analytics Maturity Assessment', desc: 'Evaluate your current capabilities and identify growth opportunities' },
              { title: 'Data Governance & Operating Model', desc: 'Establish frameworks for quality, ownership, and accountability' },
              { title: 'Technology & Cloud Advisory', desc: 'Navigate the technology landscape with expert guidance' },
              { title: 'Vendor Selection & Evaluation', desc: 'Make informed decisions on tools and platforms' },
              { title: 'AI Readiness & Transformation', desc: 'Build roadmaps for successful AI adoption' },
            ].map((item) => (
              <div key={item.title} className="bg-[#2A2A2A] rounded-xl p-6 h-44 flex flex-col">
                <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-gray-300 text-sm flex-grow">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-accent-aqua font-medium mb-8 text-lg">
            Build a data foundation that supports today's needs and tomorrow's ambitions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Explore More
          </Link>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16 bg-[#0F1E2E]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-white mb-4">Insight & Intelligence Innovation</h2>
          <p className="text-gray-300 mb-8 max-w-4xl">
            Qelyx brings creativity and technical depth to help you explore what's possible. We prototype, validate and accelerate ideas that create competitive advantage.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'AI/ML Prototypes', desc: 'Rapid development of machine learning solutions to test hypotheses' },
              { title: 'Automation Accelerators', desc: 'Pre-built components to fast-track your automation journey' },
              { title: 'Concept Validation & POCs', desc: 'De-risk innovation with structured proof of concepts' },
              { title: 'Data Product Designs', desc: 'Create reusable, governed data products for the enterprise' },
              { title: 'Industry Innovation Frameworks', desc: 'Sector-specific approaches to drive differentiation' },
              { title: 'BI/Analytics Modernisation', desc: 'Transform legacy reporting into modern insight platforms' },
              { title: 'Predictive & Prescriptive Modelling', desc: 'Build models that forecast trends and recommend actions' },
              { title: 'Generative AI Use-Case Design', desc: 'Identify and design high-impact GenAI applications' },
              { title: 'Customer & Market Insights', desc: 'Frameworks to understand customers and markets deeply' },
            ].map((item) => (
              <div key={item.title} className="bg-[#1E2A38] rounded-xl p-6 h-44 flex flex-col">
                <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-gray-300 text-sm flex-grow">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-accent-aqua font-medium mb-8 text-lg">
            Create advanced analytics and intelligence systems that unlock opportunities and forecast change.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-16">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-white mb-4">Implementation</h2>
          <p className="text-gray-300 mb-8 max-w-4xl">
            From engineering to insights and user adoption, we deliver solutions built for scale, resilience and real business value.
          </p>
          <h3 className="text-xl font-semibold text-white mb-6">What we implement:</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Modern Data Platforms', desc: 'Build cloud-native platforms designed for scale and agility' },
              { title: 'Data Pipelines & Integration', desc: 'Connect and unify data from disparate sources seamlessly' },
              { title: 'Analytics Dashboards & Insights', desc: 'Create compelling visualisations that drive decisions' },
              { title: 'MLOps & Production AI', desc: 'Operationalise machine learning with robust pipelines' },
              { title: 'Cloud-Native Engineering', desc: 'Leverage modern cloud architectures for maximum flexibility' },
              { title: 'Orchestration', desc: 'Automate and coordinate complex data workflows' },
              { title: 'Legacy Decommissioning', desc: 'Safely retire legacy platforms while preserving value' },
              { title: 'Data Mesh Architecture', desc: 'Implement decentralised, domain-driven data ownership' },
              { title: 'Data Fabric Solutions', desc: 'Create unified data access across your enterprise' },
            ].map((item) => (
              <div key={item.title} className="bg-[#2A2A2A] rounded-xl p-6 h-44 flex flex-col">
                <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-gray-300 text-sm flex-grow">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-accent-aqua font-medium mb-8 text-lg">
            Turn complex data into scalable systems using modern engineering practices and cloud-native architectures.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Explore More
          </Link>
        </div>
      </section>

      {/* Thought Leadership Section */}
      <section className="py-16 bg-[#0F1E2E]">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-white mb-4">Thought Leadership</h2>
          <p className="text-gray-300 mb-4 max-w-4xl">
            We translate complexity into clarity. Qelyx provides perspectives that inspire, educate and shape your organisation's future—through frameworks, workshops, and executive storytelling.
          </p>
          <p className="text-gray-300 mb-8 max-w-4xl">
            Because meaningful transformation requires more than technology—it requires clarity, leadership, and execution excellence.
          </p>
          <h3 className="text-xl font-semibold text-white mb-6">Includes:</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'CXO Advisory', desc: 'Strategic guidance for executive leadership on data initiatives' },
              { title: 'Leadership Workshops', desc: 'Interactive sessions to align leadership around data vision' },
              { title: 'Data Literacy Training', desc: 'Empower your workforce with essential data skills' },
              { title: 'Community & Knowledge Programs', desc: 'Build internal communities of practice and expertise' },
              { title: 'Market Research', desc: 'Industry insights and competitive intelligence' },
              { title: 'Team Upskilling', desc: 'Targeted training to elevate team capabilities' },
            ].map((item) => (
              <div key={item.title} className="bg-[#1E2A38] rounded-xl p-6 h-44 flex flex-col">
                <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-gray-300 text-sm flex-grow">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-accent-aqua font-medium mb-8 text-lg">
            Equip your teams and stakeholders with the knowledge to lead in a data-first era.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#1E2A38]">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Data Strategy?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your business objectives.
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

export default ServicesPage;
