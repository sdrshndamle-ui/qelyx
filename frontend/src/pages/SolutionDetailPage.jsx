import { useParams, Link } from 'react-router-dom';
import { useState, useRef } from 'react';

// Demo credentials - In production, use proper backend authentication
const DEMO_CREDENTIALS = {
  username: import.meta.env.VITE_DEMO_USERNAME || 'admin',
  password: import.meta.env.VITE_DEMO_PASSWORD || 'Qelyx@123'
};

const SolutionDetailPage = () => {
  const { solutionId } = useParams();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCollateralModal, setShowCollateralModal] = useState(false);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const solutions = {
    // Insurance Solutions
    'finance-transformation': {
      title: 'Finance Transformation',
      category: 'Common Offers',
      overview: 'Our Finance Transformation solution enables organizations to modernize their entire financial operations stack. From legacy system migration to advanced analytics implementation, we provide a comprehensive framework that transforms how companies manage their financial data, reporting, and decision-making processes. The solution addresses the growing complexity of regulatory requirements while enabling real-time financial insights.',
      capabilities: ['Financial Analytics', 'Process Automation', 'Regulatory Compliance', 'Data Integration', 'Real-time Reporting'],
      features: [
        'Automated financial close process reducing cycle time by up to 50%',
        'Real-time financial dashboards with drill-down capabilities',
        'Integrated subledger management with automated reconciliation',
        'Multi-GAAP and IFRS 17 compliant reporting frameworks',
        'Predictive analytics for financial planning and forecasting',
        'Automated journal entry creation and validation'
      ],
      usecases: [
        'Month-end close automation for global insurance operations',
        'IFRS 17 compliance and reporting transformation',
        'Finance shared services consolidation',
        'Investment portfolio analytics and reporting',
        'Premium and claims financial reconciliation'
      ],
      benefits: [
        '50% reduction in month-end close cycle time',
        '40% decrease in manual reconciliation effort',
        '99.5% accuracy in financial reporting',
        '30% cost reduction in finance operations',
        'Real-time visibility into financial performance'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Global Insurer Finance Modernization',
          client: 'Top 10 Global Insurance Company',
          summary: 'Transformed finance operations across 15 countries, reducing close cycle from 12 days to 5 days.',
          results: ['60% faster close cycle', '$15M annual savings', '100% regulatory compliance']
        },
        {
          id: 'cs2',
          title: 'IFRS 17 Implementation',
          client: 'European Life Insurer',
          summary: 'End-to-end IFRS 17 implementation including data, calculations, and reporting.',
          results: ['On-time compliance', 'Automated CSM calculations', 'Integrated disclosure reporting']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Solution Brief', type: 'PDF', size: '2.4 MB' },
        { name: 'Technical Architecture', type: 'PDF', size: '4.1 MB' },
        { name: 'ROI Calculator', type: 'Excel', size: '1.2 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/finance-transformation'
    },
    'finance-actuarial-reporting': {
      title: 'Finance and Actuarial Reporting',
      category: 'Insurance',
      overview: 'Bridge the gap between finance and actuarial functions with our integrated reporting solution. This platform provides a unified view of financial and actuarial data, enabling seamless collaboration and automated regulatory reporting. Built specifically for insurance companies navigating complex IFRS 17 and Solvency II requirements.',
      capabilities: ['Actuarial Integration', 'Regulatory Reporting', 'Data Reconciliation', 'Audit Trail', 'Workflow Automation'],
      features: [
        'Unified finance and actuarial data model',
        'Automated IFRS 17 and Solvency II reporting',
        'Real-time reconciliation between finance and actuarial',
        'Configurable workflow for review and approval',
        'Complete audit trail and version control',
        'Integration with major actuarial platforms'
      ],
      usecases: [
        'Quarterly regulatory reporting automation',
        'Finance-actuarial data reconciliation',
        'Best estimate liability reporting',
        'Embedded value calculations and reporting',
        'Board and management reporting'
      ],
      benefits: [
        '70% reduction in reporting preparation time',
        'Elimination of manual data transfers',
        'Single source of truth for all stakeholders',
        'Reduced regulatory compliance risk',
        'Enhanced audit readiness'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Integrated Reporting Platform',
          client: 'UK Life Insurance Group',
          summary: 'Implemented unified reporting across finance and actuarial teams.',
          results: ['75% faster reporting', 'Zero reconciliation breaks', 'Full regulatory compliance']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Solution Overview', type: 'PDF', size: '3.2 MB' },
        { name: 'Integration Guide', type: 'PDF', size: '2.8 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/finance-actuarial'
    },
    'guidewire-data-lake': {
      title: 'Guidewire Integration and Data Lake',
      category: 'Insurance',
      overview: 'Unlock the full potential of your Guidewire investment with our comprehensive data lake integration solution. We provide seamless extraction, transformation, and loading of Guidewire data into modern cloud data platforms, enabling advanced analytics, reporting, and AI capabilities that go beyond native Guidewire functionality.',
      capabilities: ['Guidewire Integration', 'Data Lake Architecture', 'Real-time Streaming', 'Analytics Enablement', 'Data Quality'],
      features: [
        'Pre-built Guidewire data extractors for PolicyCenter, ClaimCenter, BillingCenter',
        'Real-time CDC (Change Data Capture) for streaming analytics',
        'Certified data models aligned to Guidewire schema',
        'Automated data quality validation rules',
        'Integration with cloud platforms (AWS, Azure, GCP)',
        'Self-service analytics layer with business glossary'
      ],
      usecases: [
        'Enterprise data warehouse for Guidewire data',
        'Claims analytics and fraud detection',
        'Customer 360 view integration',
        'Underwriting analytics and risk scoring',
        'Operational dashboards and KPI monitoring'
      ],
      benefits: [
        'Accelerated time-to-insight from Guidewire data',
        'Reduced dependency on Guidewire InfoCenter',
        'Enable advanced analytics and AI use cases',
        'Improved data quality and governance',
        'Scalable architecture for future growth'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Cloud Data Lake Implementation',
          client: 'North American P&C Insurer',
          summary: 'Built enterprise data lake integrating all Guidewire modules with AWS.',
          results: ['90% faster reporting', '40+ analytics use cases enabled', '$8M annual benefit']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Architecture Blueprint', type: 'PDF', size: '5.2 MB' },
        { name: 'Data Model Documentation', type: 'PDF', size: '3.8 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/guidewire-datalake'
    },
    'agentic-claims-automation': {
      title: 'Agentic Claims Process Automation',
      category: 'Insurance',
      overview: 'Revolutionary claims automation powered by AI agents that autonomously handle the entire claims lifecycle. From FNOL to settlement, our agentic framework deploys specialized AI agents that work together to process claims faster, detect fraud earlier, and improve customer satisfaction while reducing operational costs.',
      capabilities: ['AI Agents', 'Claims Automation', 'Fraud Detection', 'Document Processing', 'Customer Communication'],
      features: [
        'Autonomous FNOL processing with natural language understanding',
        'Multi-agent orchestration for complex claims',
        'Intelligent document extraction and validation',
        'Real-time fraud scoring and alert generation',
        'Automated customer communication and updates',
        'Human-in-the-loop for edge cases with learning capability'
      ],
      usecases: [
        'Straight-through processing for simple claims',
        'Automated damage assessment using images',
        'Fraud detection and investigation support',
        'Subrogation identification and processing',
        'Customer self-service claims submission'
      ],
      benefits: [
        '80% straight-through processing rate',
        '60% reduction in claims handling time',
        '35% improvement in fraud detection',
        '25% reduction in claims leakage',
        'Significant improvement in customer NPS'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Auto Claims Automation',
          client: 'Major Auto Insurer',
          summary: 'Deployed agentic automation for auto claims processing.',
          results: ['85% STP rate', '55% faster settlement', '40% cost reduction']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Agentic AI Whitepaper', type: 'PDF', size: '4.5 MB' },
        { name: 'Implementation Guide', type: 'PDF', size: '3.2 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/agentic-claims'
    },
    // Capital Markets
    'market-data-rationalization': {
      title: 'Market Data Rationalization',
      category: 'Capital Markets',
      overview: 'Optimize your market data spend with our comprehensive rationalization solution. We analyze your entire market data estate, identify redundancies, optimize vendor contracts, and implement governance frameworks that ensure you only pay for what you need while maintaining data quality for trading and risk management.',
      capabilities: ['Cost Optimization', 'Vendor Management', 'Usage Analytics', 'License Compliance', 'Data Governance'],
      features: [
        'Complete market data inventory and mapping',
        'Usage analytics across all consumers',
        'Vendor contract analysis and optimization',
        'License compliance monitoring',
        'Alternative data source identification',
        'Automated reporting and chargeback'
      ],
      usecases: [
        'Annual market data budget optimization',
        'Vendor consolidation and renegotiation',
        'Usage-based chargeback implementation',
        'Data entitlement management',
        'Regulatory reporting for data usage'
      ],
      benefits: [
        '20-40% reduction in market data spend',
        'Full visibility into data usage',
        'Improved vendor negotiations',
        'Compliance with licensing terms',
        'Optimized data distribution'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Global Bank Data Rationalization',
          client: 'Tier 1 Investment Bank',
          summary: 'Comprehensive market data rationalization across global operations.',
          results: ['$25M annual savings', '100% license compliance', '60% reduction in redundancy']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Rationalization Methodology', type: 'PDF', size: '2.8 MB' },
        { name: 'Cost Savings Calculator', type: 'Excel', size: '1.5 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/market-data'
    },
    // Technical Offers
    'automated-data-pipeline': {
      title: 'Automated Data Pipeline',
      category: 'Technical Offers',
      overview: 'Build robust, self-healing data pipelines with our automation framework. Using metadata-driven design and intelligent orchestration, our solution dramatically reduces the time and effort required to build, deploy, and maintain data pipelines while ensuring reliability and data quality at scale.',
      capabilities: ['Pipeline Automation', 'Orchestration', 'Monitoring', 'Error Handling', 'Metadata Management'],
      features: [
        'Metadata-driven pipeline generation',
        'Auto-scaling based on data volumes',
        'Intelligent error handling and retry logic',
        'Real-time monitoring and alerting',
        'Built-in data quality checkpoints',
        'Support for batch and streaming patterns'
      ],
      usecases: [
        'Enterprise data warehouse loading',
        'Real-time data integration',
        'Data lake ingestion automation',
        'API data collection and processing',
        'Legacy system data extraction'
      ],
      benefits: [
        '70% reduction in pipeline development time',
        '90% decrease in pipeline failures',
        'Self-healing capabilities reduce support effort',
        'Standardized patterns ensure maintainability',
        'Rapid onboarding of new data sources'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Enterprise Pipeline Automation',
          client: 'Global Financial Services Firm',
          summary: 'Automated 500+ data pipelines across the enterprise.',
          results: ['75% faster delivery', '95% uptime', '60% cost reduction']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Technical Architecture', type: 'PDF', size: '4.2 MB' },
        { name: 'Quick Start Guide', type: 'PDF', size: '2.1 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/data-pipeline'
    },
    'agentic-data-quality': {
      title: 'Agentic Data Quality Framework',
      category: 'Technical Offers',
      overview: 'Next-generation data quality management powered by autonomous AI agents. Our framework continuously monitors your data estate, proactively identifies quality issues, and automatically remediates problems before they impact downstream consumers. Move from reactive to proactive data quality management.',
      capabilities: ['AI Agents', 'Automated Profiling', 'Anomaly Detection', 'Auto-Remediation', 'Quality Reporting'],
      features: [
        'Autonomous data profiling and rule discovery',
        'Real-time anomaly detection using ML',
        'Automated remediation with approval workflows',
        'Root cause analysis for quality issues',
        'Data quality scorecards and trends',
        'Integration with data catalogs and lineage'
      ],
      usecases: [
        'Enterprise data quality monitoring',
        'Critical data element management',
        'Regulatory data quality compliance',
        'Data migration validation',
        'Golden source management'
      ],
      benefits: [
        '80% reduction in data quality incidents',
        '90% faster issue detection',
        '50% reduction in manual remediation effort',
        'Proactive quality management',
        'Improved trust in data'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Enterprise DQ Implementation',
          client: 'Insurance Conglomerate',
          summary: 'Implemented agentic DQ across 200+ data sources.',
          results: ['85% fewer incidents', 'Real-time monitoring', '$5M savings']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Agentic DQ Whitepaper', type: 'PDF', size: '3.8 MB' },
        { name: 'Implementation Playbook', type: 'PDF', size: '4.5 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/agentic-dq'
    },
    'agentic-data-modelling': {
      title: 'Agentic Data Modelling',
      category: 'Technical Offers',
      overview: 'Revolutionize your data modeling process with AI-powered automation. Our agentic data modeling solution analyzes source systems, understands business requirements, and automatically generates optimized data models. From conceptual to physical, accelerate your modeling lifecycle while ensuring best practices.',
      capabilities: ['AI-Powered Design', 'Auto-Generation', 'Model Optimization', 'Standards Compliance', 'Documentation'],
      features: [
        'Automatic data model generation from sources',
        'Business glossary-driven entity design',
        'Performance optimization recommendations',
        'Automatic documentation generation',
        'Model comparison and impact analysis',
        'Support for dimensional and normalized patterns'
      ],
      usecases: [
        'Data warehouse model design',
        'Data vault implementation',
        'Legacy model modernization',
        'Canonical model development',
        'API schema design'
      ],
      benefits: [
        '60% faster model development',
        'Consistent adherence to standards',
        'Reduced rework from design errors',
        'Comprehensive documentation',
        'Easier model maintenance'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Enterprise Model Modernization',
          client: 'Banking Group',
          summary: 'Modernized legacy data models using agentic approach.',
          results: ['65% faster delivery', 'Zero design defects', 'Full documentation']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Modeling Methodology', type: 'PDF', size: '3.2 MB' },
        { name: 'Best Practices Guide', type: 'PDF', size: '2.8 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/agentic-modelling'
    },
    'data-products': {
      title: 'Data Products',
      category: 'Technical Offers',
      overview: 'Embrace the data mesh paradigm with our data products framework. Build, catalog, and distribute self-service data products that enable domain teams to share trusted data across the enterprise. Complete with governance, quality metrics, and consumption tracking.',
      capabilities: ['Data Mesh', 'Self-Service', 'Product Catalog', 'Governance', 'Consumption Tracking'],
      features: [
        'Data product template library',
        'Self-service product builder',
        'Automated quality certification',
        'Product catalog with search',
        'Usage analytics and chargeback',
        'SLA monitoring and alerting'
      ],
      usecases: [
        'Domain-driven data ownership',
        'Enterprise data sharing',
        'Customer data products',
        'Financial data products',
        'Reference data distribution'
      ],
      benefits: [
        'Accelerated data democratization',
        'Clear data ownership',
        'Improved data quality through accountability',
        'Reduced data duplication',
        'Faster time to insight'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Data Mesh Implementation',
          client: 'Retail Financial Services',
          summary: 'Implemented data products framework across 12 domains.',
          results: ['50+ data products', '80% self-service', '40% faster delivery']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Data Products Guide', type: 'PDF', size: '3.5 MB' },
        { name: 'Implementation Roadmap', type: 'PDF', size: '2.4 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/data-products'
    },
    'automated-data-mappings': {
      title: 'Automated Data Mappings',
      category: 'Technical Offers',
      overview: 'Eliminate the tedious and error-prone process of manual data mapping. Our AI-powered solution automatically discovers source-to-target mappings, suggests transformations, and validates results. Dramatically accelerate data integration and migration projects.',
      capabilities: ['AI Discovery', 'Auto-Mapping', 'Transformation Suggestion', 'Validation', 'Documentation'],
      features: [
        'AI-powered field matching and mapping',
        'Semantic understanding of field meanings',
        'Automatic transformation rule generation',
        'Confidence scoring for mappings',
        'Human review and approval workflow',
        'Export to ETL tools and documentation'
      ],
      usecases: [
        'System integration projects',
        'Data migration planning',
        'Data warehouse development',
        'API integration',
        'Legacy modernization'
      ],
      benefits: [
        '80% reduction in mapping effort',
        '95% mapping accuracy',
        'Consistent transformation logic',
        'Complete audit trail',
        'Accelerated project delivery'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Migration Mapping Automation',
          client: 'Healthcare Provider',
          summary: 'Automated data mappings for EHR migration project.',
          results: ['85% auto-mapped', '10x faster', 'Zero mapping defects']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Mapping Methodology', type: 'PDF', size: '2.8 MB' },
        { name: 'User Guide', type: 'PDF', size: '3.2 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/data-mappings'
    },
    'automated-code-converter': {
      title: 'Automated Code Converter',
      category: 'Technical Offers',
      overview: 'Modernize legacy code assets with our intelligent code conversion platform. Convert mainframe COBOL, stored procedures, and legacy ETL to modern languages and platforms. Our solution preserves business logic while optimizing for modern architectures.',
      capabilities: ['Code Analysis', 'Auto-Conversion', 'Optimization', 'Testing', 'Documentation'],
      features: [
        'Support for COBOL, PL/SQL, T-SQL, Informatica, DataStage',
        'Conversion to Python, Spark, modern SQL, dbt',
        'Automatic code optimization',
        'Generated test cases and validation',
        'Business logic documentation extraction',
        'Incremental conversion with parallel run'
      ],
      usecases: [
        'Mainframe modernization',
        'Database platform migration',
        'ETL tool consolidation',
        'Cloud migration projects',
        'Technical debt reduction'
      ],
      benefits: [
        '70% faster code conversion',
        '90%+ automated conversion rate',
        'Preserved business logic',
        'Modern, maintainable code',
        'Comprehensive documentation'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Mainframe to Cloud Migration',
          client: 'Insurance Company',
          summary: 'Converted 2M+ lines of COBOL to Python/Spark.',
          results: ['92% auto-converted', '60% faster than manual', '$20M savings']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Conversion Playbook', type: 'PDF', size: '4.2 MB' },
        { name: 'Supported Languages', type: 'PDF', size: '1.8 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/code-converter'
    },
    'database-assessment': {
      title: 'Database Assessment',
      category: 'Technical Offers',
      overview: 'Make informed database migration and modernization decisions with our comprehensive assessment toolkit. We analyze your database estate, evaluate migration complexity, estimate effort, and recommend optimal target architectures based on your requirements.',
      capabilities: ['Discovery', 'Complexity Analysis', 'Effort Estimation', 'Target Recommendation', 'Roadmap'],
      features: [
        'Automated database inventory discovery',
        'Schema and code complexity analysis',
        'Migration effort estimation',
        'Target platform recommendations',
        'Risk identification and mitigation',
        'Detailed assessment reports'
      ],
      usecases: [
        'Cloud migration planning',
        'Database consolidation',
        'Platform modernization',
        'License cost optimization',
        'Performance improvement'
      ],
      benefits: [
        'Data-driven migration decisions',
        'Accurate effort estimates',
        'Risk mitigation through early identification',
        'Optimized target architecture',
        'Clear migration roadmap'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Enterprise Database Assessment',
          client: 'Global Bank',
          summary: 'Assessed 500+ databases for cloud migration.',
          results: ['Complete inventory', 'Prioritized roadmap', '30% effort savings']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Assessment Methodology', type: 'PDF', size: '2.5 MB' },
        { name: 'Sample Report', type: 'PDF', size: '3.8 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/db-assessment'
    },
    'automated-code-lineage': {
      title: 'Automated Code Lineage',
      category: 'Technical Offers',
      overview: 'Gain complete visibility into your data flows with automated code lineage discovery. Our solution parses ETL code, stored procedures, and applications to build comprehensive lineage maps showing how data moves and transforms across your enterprise.',
      capabilities: ['Code Parsing', 'Lineage Discovery', 'Impact Analysis', 'Visualization', 'Documentation'],
      features: [
        'Multi-language code parsing (SQL, Python, Java, etc.)',
        'ETL tool lineage extraction',
        'End-to-end data flow visualization',
        'Impact analysis for changes',
        'Integration with data catalogs',
        'Automatic documentation generation'
      ],
      usecases: [
        'Regulatory lineage requirements',
        'Impact analysis for changes',
        'Data governance documentation',
        'Migration planning',
        'Root cause analysis'
      ],
      benefits: [
        'Complete lineage visibility',
        '80% reduction in impact analysis time',
        'Improved change confidence',
        'Regulatory compliance',
        'Faster troubleshooting'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Enterprise Lineage Implementation',
          client: 'Asset Management Firm',
          summary: 'Automated lineage discovery across 1000+ pipelines.',
          results: ['100% coverage', '85% faster impact analysis', 'Audit ready']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Lineage Whitepaper', type: 'PDF', size: '3.2 MB' },
        { name: 'Technical Guide', type: 'PDF', size: '2.8 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/code-lineage'
    },
    'data-marketplace': {
      title: 'Data Marketplace',
      category: 'Technical Offers',
      overview: 'Democratize data access across your enterprise with our data marketplace platform. Enable business users to discover, request, and consume data products through a self-service interface while maintaining governance and compliance controls.',
      capabilities: ['Data Discovery', 'Self-Service Access', 'Governance', 'Consumption Tracking', 'Monetization'],
      features: [
        'Intuitive data product catalog',
        'AI-powered search and recommendations',
        'Automated access request workflows',
        'Usage tracking and analytics',
        'Data quality indicators',
        'Chargeback and monetization support'
      ],
      usecases: [
        'Enterprise data democratization',
        'Self-service analytics enablement',
        'Data monetization initiatives',
        'Partner data sharing',
        'Customer data access portals'
      ],
      benefits: [
        '70% reduction in data access time',
        'Improved data discovery',
        'Controlled self-service access',
        'Clear data ownership',
        'New revenue opportunities'
      ],
      caseStudies: [
        {
          id: 'cs1',
          title: 'Enterprise Data Marketplace',
          client: 'Media Conglomerate',
          summary: 'Launched internal data marketplace serving 5000+ users.',
          results: ['90% self-service', '60% faster access', 'New revenue stream']
        }
      ],
      videoUrl: '#',
      collaterals: [
        { name: 'Marketplace Guide', type: 'PDF', size: '3.5 MB' },
        { name: 'Implementation Playbook', type: 'PDF', size: '4.2 MB' }
      ],
      demoUrl: 'https://demo.qelyx.com/data-marketplace'
    }
  };

  const solution = solutions[solutionId];

  const handleDemoAccess = () => {
    const isAuthenticated = localStorage.getItem('qelyx_authenticated') === 'true';
    if (isAuthenticated) {
      window.open(solution.demoUrl, '_blank');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      localStorage.setItem('qelyx_authenticated', 'true');
      localStorage.setItem('qelyx_auth_timestamp', Date.now().toString());
      setShowAuthModal(false);
      window.open(solution.demoUrl, '_blank');
    } else {
      setAuthError('Invalid username or password');
    }
    setIsAuthenticating(false);
  };

  if (!solution) {
    return (
      <div className="min-h-screen bg-[#0A1A2F] py-16">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Solution Not Found</h1>
          <Link to="/solutions" className="text-accent-aqua hover:underline">
            Return to Solutions
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors = {
    'Insurance': { bg: '#28559A', tag: '#ffffff' },
    'Capital Markets': { bg: '#63bce5', tag: '#0A1A2F' },
    'Common Offers': { bg: '#2A2A2A', tag: '#4b9fe1' },
    'Technical Offers': { bg: '#3778c2', tag: '#ffffff' }
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      {/* Header */}
      <section className="py-12 lg:py-16 border-b border-gray-800">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <Link to="/solutions" className="text-accent-aqua hover:underline mb-6 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Solutions
          </Link>
          
          <div className="flex flex-wrap items-start justify-between gap-6 mt-6">
            <div>
              <span 
                className="text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4"
                style={{ 
                  backgroundColor: categoryColors[solution.category]?.tag + '30',
                  color: categoryColors[solution.category]?.tag
                }}
              >
                {solution.category}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {solution.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {solution.capabilities.map((cap) => (
                  <span key={cap} className="text-xs px-3 py-1 rounded-full bg-accent-aqua/20 text-accent-aqua">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCollateralModal(true)}
                className="px-5 py-2.5 text-sm font-medium rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
              >
                View Collateral
              </button>
              <button
                onClick={handleDemoAccess}
                className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua text-white hover:shadow-lg transition"
              >
                Access Live Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Solution Overview</h2>
                <p className="text-gray-300 leading-relaxed">{solution.overview}</p>
              </div>

              {/* Key Features */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {solution.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <svg className="w-5 h-5 text-accent-aqua mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Use Cases</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {solution.usecases.map((usecase, index) => (
                    <div key={index} className="bg-[#1E2A38] rounded-lg p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-aqua/20 flex items-center justify-center text-accent-aqua font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 text-sm">{usecase}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Business Benefits</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {solution.benefits.map((benefit, index) => (
                    <div key={index} className="bg-gradient-to-r from-[#1E2A38] to-[#243447] rounded-lg p-4 border-l-4 border-accent-aqua">
                      <span className="text-white font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Studies */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Case Studies</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {solution.caseStudies.map((cs) => (
                    <button
                      key={cs.id}
                      onClick={() => setShowCaseStudyModal(cs)}
                      className="bg-[#1E2A38] rounded-xl p-6 text-left hover:bg-[#243447] transition group"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-aqua transition">
                        {cs.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">{cs.client}</p>
                      <p className="text-sm text-gray-300 mb-4">{cs.summary}</p>
                      <div className="flex items-center text-accent-aqua text-sm font-medium">
                        View Details
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Video Section */}
                <div className="bg-[#1E2A38] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Solution Demo</h3>
                  <div className="bg-[#0A1A2F] rounded-lg aspect-video flex items-center justify-center mb-4">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm">Watch Demo Video</p>
                    </div>
                  </div>
                  <button
                    onClick={handleDemoAccess}
                    className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
                  >
                    Access Live Demo
                  </button>
                </div>

                {/* Collateral */}
                <div className="bg-[#1E2A38] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Solution Collateral</h3>
                  <div className="space-y-3">
                    {solution.collaterals.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#0A1A2F] rounded-lg">
                        <div className="flex items-center gap-3">
                          <svg className="w-8 h-8 text-accent-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-white">{doc.name}</p>
                            <p className="text-xs text-gray-400">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <button className="text-accent-aqua hover:text-white transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-br from-secondary-bright/20 to-accent-aqua/20 rounded-xl p-6 border border-accent-aqua/30">
                  <h3 className="text-lg font-semibold text-white mb-2">Need More Information?</h3>
                  <p className="text-sm text-gray-300 mb-4">Our experts are ready to discuss your specific requirements.</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-accent-aqua text-sm font-medium hover:underline"
                  >
                    Contact Us
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1E2A38] rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Authentication Required</h3>
              <button onClick={() => setShowAuthModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-300 text-sm mb-6">Please authenticate to access the live demo.</p>
            <form onSubmit={handleAuth} className="space-y-4">
              {authError && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {authError}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary-bright"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary-bright"
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition disabled:opacity-50"
              >
                {isAuthenticating ? 'Authenticating...' : 'Access Demo'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Collateral Modal */}
      {showCollateralModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1E2A38] rounded-2xl p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Solution Collateral</h3>
              <button onClick={() => setShowCollateralModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              {solution.collaterals.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#0A1A2F] rounded-lg">
                  <div className="flex items-center gap-4">
                    <svg className="w-10 h-10 text-accent-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-white">{doc.name}</p>
                      <p className="text-sm text-gray-400">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-accent-aqua/20 text-accent-aqua rounded-lg hover:bg-accent-aqua/30 transition text-sm font-medium">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Case Study Modal */}
      {showCaseStudyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1E2A38] rounded-2xl p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{showCaseStudyModal.title}</h3>
              <button onClick={() => setShowCaseStudyModal(null)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-accent-aqua text-sm mb-4">{showCaseStudyModal.client}</p>
            <p className="text-gray-300 mb-6">{showCaseStudyModal.summary}</p>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Key Results</h4>
              <div className="space-y-2">
                {showCaseStudyModal.results.map((result, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[#0A1A2F] rounded-lg">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white text-sm">{result}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowCaseStudyModal(null)}
              className="w-full mt-6 px-6 py-3 bg-accent-aqua/20 text-accent-aqua rounded-lg hover:bg-accent-aqua/30 transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionDetailPage;
