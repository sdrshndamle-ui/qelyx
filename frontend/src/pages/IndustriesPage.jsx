import { Link } from 'react-router-dom';

const IndustriesPage = () => {
  const industries = [
    {
      name: 'Retail',
      headline: 'Empowering Retailers with Intelligent, Data-Driven Experiences',
      intro: 'Retailers are under pressure to deliver frictionless omnichannel experiences while optimizing margins in a highly volatile market. Qelyx helps retail organizations modernize data foundations and unlock advanced analytics to stay competitive.',
      challenges: [
        'Fragmented customer, inventory, and supply chain data',
        'Inefficient forecasting leading to stockouts or overstock',
        'Lack of real-time visibility across channels',
        'Rising operational costs and shrinking margins',
        'Difficulty building personalized customer engagement'
      ],
      opportunities: [
        'Unified customer 360 platforms',
        'Real-time demand forecasting and supply chain analytics',
        'Dynamic pricing and promotion optimization',
        'AI-powered customer segmentation and personalization',
        'Cloud-native data architectures for scalable retail operations'
      ],
      differentiators: [
        'Deep expertise in omnichannel analytics and customer insights',
        'Proven accelerators for retail demand forecasting',
        'Experience modernizing legacy POS/ERP data into cloud-native ecosystems',
        'AI-driven store operations optimization frameworks'
      ]
    },
    {
      name: 'Banking & Capital Markets',
      headline: 'Modernizing Data to Drive Trust, Compliance, and Intelligent Decision Making',
      intro: 'Financial institutions face heightened regulatory demands, intense competition, and the need for real-time insights. Qelyx enables secure, compliant, and scalable AI-driven data solutions.',
      challenges: [
        'Siloed legacy systems and inconsistent data quality',
        'Complex regulatory reporting requirements',
        'Fraud risk and cybersecurity threats',
        'Pressure to deliver hyper-personalized digital banking services',
        'High cost of manual processes and operations'
      ],
      opportunities: [
        'Enterprise data fabric and automated data governance',
        'AI-enabled risk scoring and fraud detection',
        'Real-time analytics for trading and portfolio optimization',
        'Customer personalization using machine learning',
        'Cloud migration strategies that maintain regulatory compliance'
      ],
      differentiators: [
        'Strong understanding of FCA and global regulatory frameworks',
        'Secure, compliant data platform modernization expertise',
        'Proprietary frameworks for risk and fraud analytics',
        'High-performance cloud architectures designed for financial workloads'
      ]
    },
    {
      name: 'Insurance',
      headline: 'Using Data & AI to Transform Underwriting, Claims, and Customer Experience',
      intro: 'Insurers must evolve quickly to meet customer expectations and manage risk effectively. Qelyx builds intelligent data ecosystems that enable faster, more accurate decision making.',
      challenges: [
        'Manual underwriting processes',
        'High claims processing time and fraud exposure',
        'Difficulty leveraging telematics, IoT, and third-party data',
        'Legacy policy administration systems',
        'Limited insight into customer behavior and lifetime value'
      ],
      opportunities: [
        'Automated underwriting powered by predictive analytics',
        'Fraud detection using machine learning models',
        'Modern data lakes integrating telematics and external data',
        'AI-driven claims triage and workflow automation',
        'Customer 360 platforms for personalized insurance products'
      ],
      differentiators: [
        'Experience integrating multi-source actuarial and telematics data',
        'Automated underwriting accelerators',
        'Proven frameworks for claims AI and fraud detection',
        'Expertise modernizing legacy policy admin data architectures'
      ]
    },
    {
      name: 'Health & Life Sciences',
      headline: 'Improving Patient Outcomes Through Trusted, Interoperable, Data-Driven Systems',
      intro: 'HLS organizations need data to be accessible, real-time, and compliant. Qelyx helps build modern, secure data ecosystems to support clinical, research, and operational excellence.',
      challenges: [
        'Fragmented clinical, operational, and research data',
        'Strict data privacy and regulatory standards',
        'Difficulties scaling digital health and remote-care models',
        'Limited interoperability across EHR and lab systems',
        'Rising costs and resource shortages'
      ],
      opportunities: [
        'Unified patient record platforms and health data interoperability',
        'Predictive AI for clinical decision support',
        'Real-time operational analytics for hospitals',
        'Accelerated drug discovery using ML and knowledge graphs',
        'Scalable, compliant cloud environments (HIPAA, GDPR, etc.)'
      ],
      differentiators: [
        'Strong focus on data privacy and regulatory compliance',
        'Expertise integrating EHR, lab, imaging, and clinical datasets',
        'Accelerators for predictive health analytics and population health insights',
        'Proven success modernizing data in biotech, pharma, and provider networks'
      ]
    },
    {
      name: 'Media & Entertainment',
      headline: 'Harnessing Data to Personalize Content, Boost Revenue, and Transform Audience Engagement',
      intro: 'Media organizations rely on real-time insights to deliver personalized content and optimize monetization. Qelyx helps build scalable, AI-driven data ecosystems that power creativity and growth.',
      challenges: [
        'Disconnected audience, engagement, and consumption data',
        'Difficulty scaling personalized content recommendations',
        'Pressure to optimize ad revenue across fragmented channels',
        'Piracy, content security, and digital rights challenges',
        'Need for real-time performance metrics and forecasting'
      ],
      opportunities: [
        'Unified audience analytics and engagement platforms',
        'AI-driven content recommendation engines',
        'Marketing attribution and multi-touch analytics',
        'Rights management and content lifecycle analytics',
        'Scalable cloud data platforms for media processing and distribution'
      ],
      differentiators: [
        'Expertise in OTT, streaming, publishing, and gaming analytics',
        'Accelerators for audience intelligence and personalization',
        'Advanced modeling for ad performance and revenue optimization',
        'Strong capability in metadata management and content analytics'
      ]
    },
    {
      name: 'Public Sector',
      headline: 'Enabling Efficient, Transparent, and Citizen-Centric Public Services',
      intro: 'Government organizations need secure, scalable, and trustworthy data ecosystems. Qelyx helps public-sector departments modernize systems and use AI responsibly to improve outcomes for citizens.',
      challenges: [
        'Legacy systems with low interoperability',
        'Data silos preventing effective decision making',
        'Limited real-time reporting capabilities',
        'Complexity in managing large-scale public programs',
        'High expectations for transparency and accountability'
      ],
      opportunities: [
        'Modern, secure government data platforms',
        'Citizen analytics for service improvement',
        'Automated compliance, reporting, and case management',
        'AI for resource planning and workload optimization',
        'Data governance frameworks to boost data sharing and trust'
      ],
      differentiators: [
        'Experience designing secure, compliant government data platforms',
        'Expertise in responsible and ethical AI implementation',
        'Proven frameworks for cross-departmental data interoperability',
        'Strong understanding of procurement, compliance, and governance'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Where Industry Expertise Meets Data Excellence
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Qelyx works at the intersection of strategy, technology, and domain knowledge to deliver tailored data and AI solutions that address each sector's unique challenges and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-8">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Industries We Serve</h2>
          
          {industries.map((industry, index) => (
            <div key={industry.name} className={`mb-16 pb-16 ${index < industries.length - 1 ? 'border-b border-gray-700' : ''}`}>
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#2A6FF4] to-[#15d5d1] bg-clip-text text-transparent">
                  {industry.name}
                </span>
              </h3>
              <p className="text-xl text-white font-semibold mb-4">{industry.headline}</p>
              <p className="text-gray-300 mb-8">{industry.intro}</p>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#1E2A38] rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Industry Challenges</h4>
                  <ul className="space-y-2">
                    {industry.challenges.map((challenge, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-accent-aqua mt-1">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#1E2A38] rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Opportunities</h4>
                  <ul className="space-y-2">
                    {industry.opportunities.map((opportunity, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-accent-aqua mt-1">•</span>
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#1E2A38] rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Qelyx Differentiators</h4>
                  <ul className="space-y-2">
                    {industry.differentiators.map((diff, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-accent-aqua mt-1">•</span>
                        {diff}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
              >
                Learn More About {industry.name} Solutions
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;


