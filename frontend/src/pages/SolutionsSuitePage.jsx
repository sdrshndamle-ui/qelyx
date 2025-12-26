import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SolutioningApp from './SolutioningApp';

const SolutionsSuitePage = () => {
  // All hooks must be called at the top level, before any conditional returns
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('qelyx_authenticated') === 'true';
      const authTimestamp = localStorage.getItem('qelyx_auth_timestamp');
      
      if (authStatus && authTimestamp) {
        const elapsed = Date.now() - parseInt(authTimestamp, 10);
        const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
        if (elapsed < SESSION_DURATION) {
          setIsAuthenticated(true);
          return;
        }
      }
      setIsAuthenticated(false);
    };

    checkAuth();
    // Check auth status periodically
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  // If authenticated, show SolutioningApp content
  if (isAuthenticated) {
    return <SolutioningApp />;
  }

  // Otherwise show the original content

  const solutions = [
    // Insurance Solutions
    {
      id: 'finance-actuarial-reporting',
      title: 'Finance and Actuarial Reporting',
      category: 'Insurance',
      summary: 'Comprehensive reporting solutions bridging finance and actuarial functions with automated workflows and regulatory compliance.',
      tags: ['Actuarial', 'Reporting', 'Compliance'],
      color: '#28559A',
      tagColor: '#ffffff'
    },
    {
      id: 'guidewire-data-lake',
      title: 'Guidewire Integration and Data Lake',
      category: 'Insurance',
      summary: 'Seamless Guidewire integration with enterprise data lake architecture for unified insurance data management and analytics.',
      tags: ['Guidewire', 'Data Lake', 'Integration'],
      color: '#28559A',
      tagColor: '#ffffff'
    },
    {
      id: 'agentic-claims-automation',
      title: 'Agentic Claims Process Automation',
      category: 'Insurance',
      summary: 'AI-powered autonomous claims processing with intelligent agents that handle end-to-end claims workflows.',
      tags: ['AI Agents', 'Claims', 'Automation'],
      color: '#28559A',
      tagColor: '#ffffff'
    },
    // Common Offers
    {
      id: 'finance-transformation',
      title: 'Finance Transformation',
      category: 'Common Offers',
      summary: 'End-to-end finance transformation solutions enabling organizations to modernize their financial operations, reporting, and analytics capabilities.',
      tags: ['Finance', 'Transformation', 'Analytics'],
      color: '#2A2A2A',
      tagColor: '#4b9fe1'
    },
    // Capital Markets Solutions
    {
      id: 'market-data-rationalization',
      title: 'Market Data Rationalization',
      category: 'Capital Markets',
      summary: 'Optimize market data spend and usage through comprehensive rationalization, vendor analysis, and consumption optimization.',
      tags: ['Market Data', 'Cost Optimization', 'Analytics'],
      color: '#63bce5',
      tagColor: '#0A1A2F'
    },
    // Technical Offers
    {
      id: 'automated-data-pipeline',
      title: 'Automated Data Pipeline',
      category: 'Technical Offers',
      summary: 'Self-configuring data pipelines with automated orchestration, monitoring, and error handling capabilities.',
      tags: ['ETL', 'Automation', 'Data Engineering'],
      color: '#3778c2',
      tagColor: '#ffffff'
    },
    {
      id: 'agentic-data-quality',
      title: 'Agentic Data Quality Framework',
      category: 'Technical Offers',
      summary: 'Autonomous data quality management powered by AI agents that continuously monitor, detect, and remediate data issues.',
      tags: ['AI Agents', 'Data Quality', 'Automation'],
      color: '#3778c2',
      tagColor: '#ffffff'
    },
    {
      id: 'agentic-data-modelling',
      title: 'Agentic Data Modelling',
      category: 'Technical Offers',
      summary: 'AI-driven data modeling solution that automatically generates and optimizes data models based on business requirements.',
      tags: ['AI Agents', 'Data Modelling', 'Automation'],
      color: '#3778c2',
      tagColor: '#ffffff'
    },
    {
      id: 'data-products',
      title: 'Data Products',
      category: 'Technical Offers',
      summary: 'Framework for building, managing, and distributing reusable data products across the enterprise.',
      tags: ['Data Mesh', 'Data Products', 'Governance'],
      color: '#3778c2',
      tagColor: '#ffffff'
    },
    {
      id: 'automated-data-mappings',
      title: 'Automated Data Mappings',
      category: 'Technical Offers',
      summary: 'AI-powered data mapping solution that automatically discovers, suggests, and validates field mappings across systems.',
      tags: ['AI', 'Data Mapping', 'Integration'],
      color: '#3778c2',
      tagColor: '#ffffff'
    },
    {
      id: 'automated-code-converter',
      title: 'Automated Code Converter',
      category: 'Technical Offers',
      summary: 'Intelligent code conversion tool that transforms legacy code to modern platforms with validation and optimization.',
      tags: ['Modernization', 'Code Conversion', 'Automation'],
      color: '#3778c2',
      tagColor: '#ffffff'
    },
    {
      id: 'database-assessment',
      title: 'Database Assessment',
      category: 'Technical Offers',
      summary: 'Comprehensive database assessment toolkit for migration planning, performance analysis, and modernization roadmaps.',
      tags: ['Assessment', 'Migration', 'Database'],
      color: '#3778c2',
      tagColor: '#ffffff'
    },
    {
      id: 'automated-code-lineage',
      title: 'Automated Code Lineage',
      category: 'Technical Offers',
      summary: 'Automatic discovery and visualization of code dependencies, data flows, and impact analysis across systems.',
      tags: ['Lineage', 'Impact Analysis', 'Discovery'],
      color: '#3778c2',
      tagColor: '#ffffff'
    },
    {
      id: 'data-marketplace',
      title: 'Data Marketplace',
      category: 'Technical Offers',
      summary: 'Enterprise data marketplace platform for discovering, requesting, and consuming data products with governance controls.',
      tags: ['Data Marketplace', 'Self-Service', 'Governance'],
      color: '#3778c2',
      tagColor: '#ffffff'
    }
  ];

  const categories = ['all', 'Insurance', 'Capital Markets', 'Common Offers', 'Technical Offers'];

  const filteredSolutions = activeFilter === 'all' 
    ? solutions 
    : solutions.filter(s => s.category === activeFilter);

  const getCategoryCount = (category) => {
    if (category === 'all') return solutions.length;
    return solutions.filter(s => s.category === category).length;
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Solutions Suite
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Production-ready solutions and accelerators built from our deep industry experience. Each solution comes with live demos, detailed documentation, and proven implementation patterns.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                  activeFilter === cat
                    ? 'bg-accent-aqua text-white'
                    : 'bg-[#1E2A38] text-gray-300 hover:bg-[#2A2A2A]'
                }`}
              >
                {cat === 'all' ? 'All Solutions' : cat}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeFilter === cat ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {getCategoryCount(cat)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSolutions.map((solution) => (
              <Link
                key={solution.id}
                to={`/solutions/${solution.id}`}
                className="rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 group"
                style={{ backgroundColor: solution.color }}
              >
                <div className="p-6 h-full flex flex-col">
                  <span 
                    className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4 self-start"
                    style={{ 
                      backgroundColor: solution.tagColor + '30',
                      color: solution.tagColor === '#ffffff' ? '#ffffff' : solution.tagColor
                    }}
                  >
                    {solution.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-aqua transition-colors">
                    {solution.title}
                  </h3>
                  <p className={`text-sm mb-4 flex-grow ${solution.color === '#4b9fe1' ? 'text-white' : 'text-gray-300'}`}>
                    {solution.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-white text-sm font-medium group-hover:text-accent-aqua transition-colors">
                    View Details
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1E2A38]">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Our solutions can be customized to meet your specific requirements. Let's discuss how we can help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SolutionsSuitePage;
