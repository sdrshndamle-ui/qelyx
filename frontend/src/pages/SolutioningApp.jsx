import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import { useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import IndustryExperience from '../industry/IndustryExperience';
import InsuranceTemplate from '../industry/InsuranceTemplate';
import '../solutioning.css';

// Lazy load all solution pages at top level (not conditionally)
const CodeAssistantPage = lazy(() => import('./CodeAssistantPage'));
const CodeTracerPage = lazy(() => import('./CodeTracerPage'));
const DataProductDesignerPage = lazy(() => import('./DataProductDesignerPage'));
const DataModelAnalyzerPage = lazy(() => import('./DataModelAnalyzerPage'));

// Lazy load all solution pages at top level (not conditionally)
// CodeAssistantPage is already defined above, so we don't redefine it

const phases = [
  {
    id: 'discover',
    phase: 'Insight & Assessment',
    original: 'Discover',
    tag: 'Phase 1',
    description: 'Ground decisions with clarity on code, lineage, and data estate readiness.',
    cards: [
      { 
        title: 'Data Estate Assessment', 
        copy: 'Evaluate database health, scalability, and modernization readiness.',
        demoUrl: '/demo/data-estate-assessment.html',
        details: 'Comprehensive assessment of your data infrastructure, identifying bottlenecks, scalability issues, and modernization opportunities.'
      },
      { 
        title: 'Code Assistant', 
        copy: 'Reverse-engineer code to surface system structure and dependencies.',
        demoUrl: '/code-assistant',
        details: 'Deep analysis of application architecture, code dependencies, and system relationships to inform modernization strategies.'
      },
      { 
        title: 'Code Tracer', 
        copy: 'Trace data flows, business logic, and process lineage for transparency.',
        demoUrl: '/code-tracer',
        details: 'End-to-end visibility into data flows, transformations, and business logic across your entire data estate.'
      }
    ]
  },
  {
    id: 'design',
    phase: 'Blueprint & Architecture',
    original: 'Design',
    tag: 'Phase 2',
    description: 'Define the target architecture, mappings, and modernization pathways.',
    cards: [
      { 
        title: 'Integration Mapping Blueprint', 
        copy: 'Align source-to-target mappings with integration patterns.',
        demoUrl: '/demo/integration-mapping-blueprint.html',
        details: 'Design comprehensive integration patterns and mappings between source systems and target architectures.',
      },
      { 
        title: 'Enterprise Data Model Design', 
        copy: 'Craft canonical models to standardize analytics and operations.',
        demoUrl: '/demo/enterprise-data-model-design.html',
        details: 'Create standardized, canonical data models that serve as the foundation for analytics and operations.',
      },
      { 
        title: 'Data Product Designer', 
        copy: 'Design reusable data products with ownership, SLAs, and contracts.',
        demoUrl: '/data-product-designer',
        details: 'Architect data products as reusable assets with clear ownership, service level agreements, and contracts.',
      },
      { 
        title: 'Data Model Analyzer', 
        copy: 'Plan automated conversions to modern languages, frameworks, and patterns.',
        demoUrl: '/data-model-analyzer',
        details: 'Automated transformation of legacy code to modern frameworks, languages, and architectural patterns.',
      }
    ]
  },
  {
    id: 'deliver',
    phase: 'Execution & Enablement',
    original: 'Deliver',
    tag: 'Phase 3',
    description: 'Build secure, governed, and observable data experiences.',
    cards: [
      { 
        title: 'Ingestion Pipeline Orchestration', 
        copy: 'Operationalize ingestion with scheduling, retries, and observability.',
        demoUrl: '/demo/ingestion-pipeline-orchestration.html',
        details: 'Complete orchestration platform for data ingestion with scheduling, error handling, and full observability.',
      },
      { 
        title: 'Secure Data Protection Services', 
        copy: 'Encrypt, tokenize, and mask sensitive data across domains.',
        demoUrl: '/demo/secure-data-protection-services.html',
        details: 'Comprehensive data protection with encryption, tokenization, and masking capabilities across all data domains.',
      },
      { 
        title: 'Data Health & Profiling Analytics', 
        copy: 'Continuously assess data quality, drift, and anomalies.',
        demoUrl: '/demo/data-health-profiling-analytics.html',
        details: 'Real-time monitoring and analytics for data quality, schema drift detection, and anomaly identification.',
      },
      { 
        title: 'Data Quality Assurance Hub', 
        copy: 'Centralize rules, thresholds, and remediation workflows.',
        demoUrl: '/demo/data-quality-assurance-hub.html',
        details: 'Centralized platform for defining, managing, and executing data quality rules and remediation processes.',
      },
      { 
        title: 'Issue Diagnostics & RCA Engine', 
        copy: 'Accelerate resolution with lineage-aware root cause analysis.',
        demoUrl: '/demo/issue-diagnostics-rca-engine.html',
        details: 'Intelligent root cause analysis engine that leverages data lineage to quickly identify and resolve issues.',
      },
      { 
        title: 'Data Standard & Schema Harmonization', 
        copy: 'Normalize schemas and enforce standards across systems.',
        demoUrl: '/demo/data-standard-schema-harmonization.html',
        details: 'Automated schema normalization and standardization across heterogeneous data sources and systems.',
      },
      { 
        title: 'Transformation Pipeline Studio', 
        copy: 'Design, test, and deploy reusable transformation components.',
        demoUrl: '/demo/transformation-pipeline-studio.html',
        details: 'Visual studio for designing, testing, and deploying reusable data transformation pipelines and components.',
      },
      { 
        title: 'Target Schema & Model Definition', 
        copy: 'Define target-state schema for operational and analytical layers.',
        demoUrl: '/demo/target-schema-model-definition.html',
        details: 'Define and manage target schemas for both operational and analytical data layers with version control.',
      },
      { 
        title: 'Data Reconciliation & Validation', 
        copy: 'Verify completeness, accuracy, and consistency across hops.',
        demoUrl: '/demo/data-reconciliation-validation.html',
        details: 'Automated reconciliation and validation processes to ensure data completeness and accuracy across systems.',
      },
      { 
        title: 'Operational Insights & Intelligence', 
        copy: 'Deliver dashboards and alerts for data and process performance.',
        demoUrl: '/demo/operational-insights-intelligence.html',
        details: 'Comprehensive dashboards and alerting system for monitoring data and process performance in real-time.',
      }
    ]
  },
  {
    id: 'management',
    phase: 'Governance & Optimization',
    original: 'Management',
    tag: 'Phase 4',
    description: 'Sustain compliance, reliability, and operational excellence.',
    cards: [
      { 
        title: 'Enterprise Master Data Hub', 
        copy: 'Centralize golden records with stewardship and survivorship.',
        demoUrl: '/demo/enterprise-master-data-hub.html',
        details: 'Centralized master data management with golden record creation, stewardship workflows, and survivorship rules.',
      },
      { 
        title: 'Sensitive Data Governance Center', 
        copy: 'Classify, protect, and audit sensitive data usage.',
        demoUrl: '/demo/sensitive-data-governance-center.html',
        details: 'Comprehensive governance platform for classifying, protecting, and auditing sensitive data across the enterprise.',
      },
      { 
        title: 'Operational & Compliance Reporting', 
        copy: 'Standardized reporting for regulators and business leadership.',
        demoUrl: '/demo/operational-compliance-reporting.html',
        details: 'Automated generation of operational and compliance reports for regulators and executive leadership.',
      },
      { 
        title: 'End-to-End Process Monitoring', 
        copy: 'Track SLAs, dependencies, and health across pipelines.',
        demoUrl: '/demo/end-to-end-process-monitoring.html',
        details: 'Comprehensive monitoring solution tracking SLAs, dependencies, and health metrics across all data pipelines.',
      }
    ]
  }
];

// Category Solutions Data
const categorySolutions = {
  insurance: [
    {
      title: 'Guidewire Integration & Insurance Data Platform',
      copy: 'End-to-end insurance data platform integrating Guidewire core systems with a modern lakehouse to enable unified policy, claims, and financial analytics.',
      demoUrl: '/demo/integration-mapping-blueprint.html',
      details: 'End-to-end insurance data platform integrating Guidewire core systems with a modern lakehouse to enable unified policy, claims, and financial analytics.',
      keywords: ['Insurance', 'Guidewire', 'Data Platform']
    },
    {
      title: 'Finance & Actuarial Reporting',
      copy: 'Modernized finance and actuarial reporting solutions with automated data pipelines, governed metrics, and regulatory-ready outputs.',
      demoUrl: '/demo/data-estate-assessment.html',
      details: 'Modernized finance and actuarial reporting solutions with automated data pipelines, governed metrics, and regulatory-ready outputs.',
      keywords: ['Finance', 'Actuarial', 'Reporting']
    },
    {
      title: 'Agentic Claims Process Automation',
      copy: 'Autonomous claims processing powered by Agentic AI to intelligently intake, assess, route, and resolve claims with built-in human oversight.',
      demoUrl: '/demo/transformation-pipeline-studio.html',
      details: 'Autonomous claims processing powered by Agentic AI to intelligently intake, assess, route, and resolve claims with built-in human oversight.',
      keywords: ['Agentic AI', 'Claims', 'Automation']
    },
    {
      title: 'Underwriting & Risk Intelligence',
      copy: 'Advanced analytics and AI-driven insights to enhance underwriting decisions, improve risk assessment, and optimize portfolio performance.',
      demoUrl: '/demo/data-estate-assessment.html',
      details: 'Advanced analytics and AI-driven insights to enhance underwriting decisions, improve risk assessment, and optimize portfolio performance.',
      keywords: ['Underwriting', 'Risk', 'Analytics']
    },
    {
      title: 'Regulatory & Compliance Automation',
      copy: 'Automated compliance and regulatory reporting solutions ensuring accuracy, traceability, and audit readiness across insurance operations.',
      demoUrl: '/demo/integration-mapping-blueprint.html',
      details: 'Automated compliance and regulatory reporting solutions ensuring accuracy, traceability, and audit readiness across insurance operations.',
      keywords: ['Regulatory', 'Compliance', 'Automation']
    }
  ],
  capitalMarkets: [
    {
      title: 'Market Data Rationalization',
      copy: 'Optimize market data spend and usage through comprehensive rationalization, vendor analysis, and consumption optimization.',
      demoUrl: '/demo/data-estate-assessment.html',
      details: 'Optimize market data spend and usage through comprehensive rationalization, vendor analysis, and consumption optimization.',
      keywords: ['Market Data', 'Cost Optimization', 'Analytics']
    }
  ],
  commonOffers: [
    {
      title: 'Finance Transformation',
      copy: 'End-to-end finance transformation solutions enabling organizations to modernize their financial operations, reporting, and analytics capabilities.',
      demoUrl: '/demo/data-estate-assessment.html',
      details: 'End-to-end finance transformation solutions enabling organizations to modernize their financial operations, reporting, and analytics capabilities.',
      keywords: ['Finance', 'Transformation', 'Analytics']
    }
  ],
  banking: [
    {
      title: 'Banking Data Modernization',
      copy: 'Comprehensive data modernization solutions for banking operations, regulatory compliance, and customer analytics.',
      demoUrl: '/demo/data-estate-assessment.html',
      details: 'Comprehensive data modernization solutions for banking operations, regulatory compliance, and customer analytics.',
      keywords: ['Banking', 'Compliance', 'Analytics']
    },
    {
      title: 'Core Banking Integration',
      copy: 'Seamless integration with core banking systems for unified data management and real-time analytics.',
      demoUrl: '/demo/integration-mapping-blueprint.html',
      details: 'Seamless integration with core banking systems for unified data management and real-time analytics.',
      keywords: ['Core Banking', 'Integration', 'Real-time']
    }
  ],
  finance: [
    {
      title: 'Financial Data Platform',
      copy: 'End-to-end financial data platform for accounting, reporting, and financial analytics.',
      demoUrl: '/demo/data-estate-assessment.html',
      details: 'End-to-end financial data platform for accounting, reporting, and financial analytics.',
      keywords: ['Finance', 'Accounting', 'Reporting']
    },
    {
      title: 'Regulatory Reporting Automation',
      copy: 'Automated regulatory reporting solutions for financial institutions ensuring compliance and accuracy.',
      demoUrl: '/demo/transformation-pipeline-studio.html',
      details: 'Automated regulatory reporting solutions for financial institutions ensuring compliance and accuracy.',
      keywords: ['Regulatory', 'Compliance', 'Automation']
    }
  ],
  healthSector: [
    {
      title: 'Healthcare Data Modernization',
      copy: 'Comprehensive data solutions for healthcare organizations, including patient data management and compliance.',
      demoUrl: '/demo/data-estate-assessment.html',
      details: 'Comprehensive data solutions for healthcare organizations, including patient data management and compliance.',
      keywords: ['Healthcare', 'Patient Data', 'Compliance']
    },
    {
      title: 'HIPAA Compliant Data Platform',
      copy: 'Secure, HIPAA-compliant data platform for healthcare data management and analytics.',
      demoUrl: '/demo/integration-mapping-blueprint.html',
      details: 'Secure, HIPAA-compliant data platform for healthcare data management and analytics.',
      keywords: ['HIPAA', 'Security', 'Healthcare']
    }
  ]
};

// Pipeline Templates - Predefined module sets for end-to-end views
const pipelineTemplates = [
  {
    id: 'full-data-modernization',
    name: 'Full Data Modernization',
    description: 'Complete end-to-end data modernization pipeline covering all phases',
    icon: '🚀',
    modules: [
      'Data Estate Assessment',
      'Code Assistant',
      'Code Tracer',
      'Integration Mapping Blueprint',
      'Enterprise Data Model Design',
      'Data Product Designer',
      'Data Model Analyzer',
      'Ingestion Pipeline Orchestration',
      'Secure Data Protection Services',
      'Data Health & Profiling Analytics',
      'Data Quality Assurance Hub',
      'Issue Diagnostics & RCA Engine',
      'Data Standard & Schema Harmonization',
      'Enterprise Master Data Hub',
      'Sensitive Data Governance Center',
      'Operational & Compliance Reporting'
    ]
  },
  {
    id: 'assessment-to-execution',
    name: 'Assessment to Execution',
    description: 'From discovery through execution and enablement',
    icon: '📊',
    modules: [
      'Data Estate Assessment',
      'Code Assistant',
      'Code Tracer',
      'Integration Mapping Blueprint',
      'Enterprise Data Model Design',
      'Ingestion Pipeline Orchestration',
      'Secure Data Protection Services',
      'Data Health & Profiling Analytics',
      'Data Quality Assurance Hub'
    ]
  },
  {
    id: 'governance-focus',
    name: 'Governance & Compliance',
    description: 'Focused on governance, compliance, and data protection',
    icon: '🛡️',
    modules: [
      'Data Estate Assessment',
      'Sensitive Data Governance Center',
      'Enterprise Master Data Hub',
      'Operational & Compliance Reporting',
      'Secure Data Protection Services',
      'Data Health & Profiling Analytics',
      'End-to-End Process Monitoring'
    ]
  },
  {
    id: 'data-quality-pipeline',
    name: 'Data Quality Pipeline',
    description: 'Comprehensive data quality and health monitoring',
    icon: '✅',
    modules: [
      'Data Estate Assessment',
      'Data Health & Profiling Analytics',
      'Data Quality Assurance Hub',
      'Issue Diagnostics & RCA Engine',
      'Data Standard & Schema Harmonization',
      'Data Reconciliation & Validation',
      'Operational Insights & Intelligence'
    ]
  },
  {
    id: 'modernization-core',
    name: 'Core Modernization',
    description: 'Essential modules for data modernization',
    icon: '⚙️',
    modules: [
      'Data Estate Assessment',
      'Code Assistant',
      'Integration Mapping Blueprint',
      'Enterprise Data Model Design',
      'Data Model Analyzer',
      'Ingestion Pipeline Orchestration',
      'Transformation Pipeline Studio'
    ]
  }
];

// Solution Detail Modal
const SolutionModal = ({ solution, phase, onClose }) => {
  if (!solution) return null;

  const phaseName = typeof phase === 'object' ? (phase.phase || phase.name || 'Solution') : phase || 'Solution';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <span className="modal-phase">{phaseName}</span>
          <h2 className="modal-title">{solution.title}</h2>
          <p className="modal-subtitle">{solution.copy}</p>
        </div>
        <div className="modal-body">
          <div className="modal-info">
            <h3>Overview</h3>
            <p>{solution.details || solution.copy}</p>
            {solution.keywords && solution.keywords.length > 0 && (
              <div className="modal-keywords">
                <h4>Keywords</h4>
                <div className="keywords-list">
                  {solution.keywords.map((keyword, idx) => (
                    <span key={idx} className="keyword-tag">{keyword}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {solution.demoUrl && !solution.demoUrl.startsWith('/code-assistant') && !solution.demoUrl.startsWith('/code-tracer') && !solution.demoUrl.startsWith('/data-product-designer') && !solution.demoUrl.startsWith('/data-model-analyzer') && (
            <div className="modal-demo">
              <h3>Interactive Demo</h3>
              <div className="demo-container">
                <iframe 
                  src={solution.demoUrl} 
                  title={solution.title}
                  className="demo-iframe"
                  allow="fullscreen"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          {solution.demoUrl && (
            <button 
              className="cta primary" 
              onClick={() => {
                if (solution.demoUrl.startsWith('/code-assistant')) {
                  // Open Code Assistant in new window with full URL
                  window.open(`${window.location.origin}${solution.demoUrl}`, '_blank');
                } else if (solution.demoUrl.startsWith('/code-tracer')) {
                  // Open Code Tracer in new window with full URL
                  window.open(`${window.location.origin}${solution.demoUrl}`, '_blank');
                } else if (solution.demoUrl.startsWith('/data-product-designer')) {
                  // Open Data Product Designer in new window with full URL
                  window.open(`${window.location.origin}${solution.demoUrl}`, '_blank');
                } else if (solution.demoUrl.startsWith('/data-model-analyzer')) {
                  // Open Data Model Analyzer in new window with full URL
                  window.open(`${window.location.origin}${solution.demoUrl}`, '_blank');
                } else {
                  window.open(solution.demoUrl, '_blank');
                }
              }}
            >
              Open in New Tab
            </button>
          )}
          <button className="cta secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Pipeline Creation Modal - Category Based with Solution Selection
const PipelineModal = ({ onClose, onCreate, onUpdate, editingPipeline = null }) => {
  const [pipelineName, setPipelineName] = useState(editingPipeline?.name || '');
  const [selectedCategory, setSelectedCategory] = useState(editingPipeline?.categoryId || null);
  const [selectedSolutions, setSelectedSolutions] = useState(editingPipeline?.solutions || []);
  const [draggedSummaryIndex, setDraggedSummaryIndex] = useState(null);
  const [dragOverSummaryIndex, setDragOverSummaryIndex] = useState(null);

  // Ingestion is mandatory
  const ingestionSolution = 'Ingestion Pipeline Orchestration';
  const isIngestionSelected = selectedSolutions.includes(ingestionSolution);

  const handleCategorySelect = (phaseId) => {
    // Allow multiple category selection - toggle category
    if (selectedCategory === phaseId) {
      // If clicking the same category, deselect it but keep all solutions
      setSelectedCategory(null);
    } else {
      setSelectedCategory(phaseId);
      // Don't clear solutions - allow selecting from multiple categories
    }
  };

  const toggleSolution = (solutionTitle) => {
    // Don't allow deselecting ingestion
    if (solutionTitle === ingestionSolution) return;
    
    setSelectedSolutions(prev => 
      prev.includes(solutionTitle)
        ? prev.filter(s => s !== solutionTitle)
        : [...prev, solutionTitle]
    );
  };

  const handleAddTemplate = (template) => {
    // Add all template modules to selected solutions, avoiding duplicates
    setSelectedSolutions(prev => {
      const newSolutions = [...prev];
      template.modules.forEach(moduleTitle => {
        if (!newSolutions.includes(moduleTitle)) {
          newSolutions.push(moduleTitle);
        }
      });
      return newSolutions;
    });
  };

  const getSelectedCategorySolutions = () => {
    if (!selectedCategory) return [];
    const phase = phases.find(p => p.id === selectedCategory);
    if (!phase) return [];
    return phase.cards;
  };

  const handleCreate = () => {
    if (pipelineName.trim() && selectedCategory && selectedSolutions.length > 0 && isIngestionSelected) {
      const phase = phases.find(p => p.id === selectedCategory);
      const pipelineData = {
        id: editingPipeline?.id || Date.now().toString(),
        name: pipelineName,
        category: phase.phase,
        categoryId: selectedCategory,
        solutions: selectedSolutions,
        createdAt: editingPipeline?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (editingPipeline && onUpdate) {
        onUpdate(pipelineData);
      } else {
        onCreate(pipelineData);
        setPipelineName('');
        setSelectedCategory(null);
        setSelectedSolutions([]);
      }
      onClose();
    }
  };

  const categorySolutions = getSelectedCategorySolutions();
  
  // Initialize form when editingPipeline changes
  useEffect(() => {
    if (editingPipeline) {
      setPipelineName(editingPipeline.name);
      setSelectedCategory(editingPipeline.categoryId);
      setSelectedSolutions(editingPipeline.solutions);
    } else {
      setPipelineName('');
      setSelectedCategory(null);
      setSelectedSolutions([]);
    }
  }, [editingPipeline]);

  // Auto-select ingestion when any category is selected (ingestion is required for all pipelines)
  useEffect(() => {
    if (selectedCategory && !editingPipeline) {
      // Find ingestion solution from deliver phase
      const deliverPhase = phases.find(p => p.id === 'deliver');
      if (deliverPhase) {
        const ingestion = deliverPhase.cards.find(card => card.title === ingestionSolution);
        if (ingestion && !selectedSolutions.includes(ingestionSolution)) {
          setSelectedSolutions(prev => [...prev, ingestionSolution]);
        }
      }
    }
  }, [selectedCategory, editingPipeline]);

  return (
    <div className="modal-overlay pipeline-modal-overlay" onClick={onClose}>
      <div className="modal-content pipeline-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="pipeline-modal-header">
          <div className="pipeline-modal-icon">{editingPipeline ? '✏️' : '🚀'}</div>
          <h2 className="pipeline-modal-title">
            {editingPipeline ? 'Edit Pipeline' : 'Create New Pipeline'}
          </h2>
          <p className="pipeline-modal-subtitle">
            {editingPipeline 
              ? 'Add or remove modules to update your pipeline'
              : 'Build your data modernization journey step by step'
            }
          </p>
        </div>
        <div className="pipeline-modal-body">
          <div className="pipeline-form">
            <div className="form-step">
              <div className="step-indicator">
                <span className="step-number">1</span>
                <span className="step-label">Pipeline Details</span>
              </div>
              <label className="pipeline-name-label">
                <span className="label-text">Pipeline Name</span>
                <input 
                  type="text" 
                  value={pipelineName}
                  onChange={(e) => setPipelineName(e.target.value)}
                  placeholder="e.g., Customer Analytics Pipeline"
                  className="pipeline-input"
                />
                {pipelineName.trim() && (
                  <span className="input-success">✓</span>
                )}
              </label>
            </div>

            <div className="form-step">
              <div className="step-indicator">
                <span className="step-number">2</span>
                <span className="step-label">Select Category</span>
              </div>
              <div className="categories-selector">
                <div className="categories-grid">
                  {phases.map((phase, idx) => (
                    <div
                      key={phase.id}
                      className={`category-card ${selectedCategory === phase.id ? 'selected' : ''}`}
                      onClick={() => handleCategorySelect(phase.id)}
                    >
                      <div className="category-card-inner">
                        <div className="category-number">{idx + 1}</div>
                        <div className="category-info">
                          <div className="category-name">{phase.phase}</div>
                          <div className="category-count">{phase.cards.length} solutions</div>
                        </div>
                        {selectedCategory === phase.id && (
                          <div className="category-check-icon">✓</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedCategory && categorySolutions.length > 0 && (
              <div className="form-step solutions-step">
                <div className="step-indicator">
                  <span className="step-number">3</span>
                  <span className="step-label">Select Solutions from {phases.find(p => p.id === selectedCategory)?.phase}</span>
                  {selectedSolutions.length > 0 && (
                    <span className="selection-count">({selectedSolutions.length} selected)</span>
                  )}
                </div>
                <div className="ingestion-notice">
                  <span className="notice-icon">ℹ️</span>
                  <span>You can select solutions from multiple categories. Select a category, choose solutions, then select another category to add more.</span>
                </div>
                <div className="solutions-grid">
                  {categorySolutions.map((solution) => {
                    const isIngestion = solution.title === ingestionSolution;
                    const isChecked = selectedSolutions.includes(solution.title);
                    // Find which phase this solution belongs to
                    const solutionPhase = phases.find(p => p.cards.some(c => c.title === solution.title));
                    return (
                      <div
                        key={solution.title}
                        className={`solution-card ${isIngestion ? 'required' : ''} ${isChecked ? 'checked' : ''}`}
                        onClick={() => !isIngestion && toggleSolution(solution.title)}
                      >
                        <div className="solution-card-checkbox">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSolution(solution.title)}
                            disabled={isIngestion}
                            readOnly
                          />
                          <div className="custom-checkbox">
                            {isChecked && <span className="checkmark">✓</span>}
                          </div>
                        </div>
                        <div className="solution-card-content">
                          <div className="solution-title">{solution.title}</div>
                          <div className="solution-description">{solution.copy}</div>
                          {solutionPhase && (
                            <div className="solution-phase-badge">{solutionPhase.phase}</div>
                          )}
                          {isIngestion && <span className="required-badge">Required</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {selectedCategory !== 'deliver' && (
                  <div className="required-solutions-section">
                    <div className="required-header">
                      <span className="required-icon">🔒</span>
                      <span className="required-title">Required Solution</span>
                    </div>
                    <div className="solutions-grid">
                      {(() => {
                        const deliverPhase = phases.find(p => p.id === 'deliver');
                        if (!deliverPhase) return null;
                        const ingestion = deliverPhase.cards.find(card => card.title === ingestionSolution);
                        if (!ingestion) return null;
                        return (
                          <div className="solution-card required checked">
                            <div className="solution-card-checkbox">
                              <input type="checkbox" checked={true} disabled={true} readOnly />
                              <div className="custom-checkbox">
                                <span className="checkmark">✓</span>
                              </div>
                            </div>
                            <div className="solution-card-content">
                              <div className="solution-title">{ingestion.title}</div>
                              <div className="solution-description">{ingestion.copy}</div>
                              <span className="required-badge">Required</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pipeline Templates Section - Only show when editing */}
            {editingPipeline && (
              <div className="form-step templates-step">
                <div className="step-indicator">
                  <span className="step-number">📋</span>
                  <span className="step-label">Add Template Modules</span>
                  <span className="selection-count">({pipelineTemplates.length} templates)</span>
                </div>
                <p className="templates-description">
                  Add predefined module sets to create an end-to-end pipeline view
                </p>
                <div className="templates-grid">
                  {pipelineTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="template-card"
                      onClick={() => handleAddTemplate(template)}
                    >
                      <div className="template-icon">{template.icon}</div>
                      <div className="template-content">
                        <h4 className="template-name">{template.name}</h4>
                        <p className="template-description">{template.description}</p>
                        <div className="template-modules-count">
                          {template.modules.length} modules
                        </div>
                      </div>
                      <button className="template-add-btn" onClick={(e) => {
                        e.stopPropagation();
                        handleAddTemplate(template);
                      }}>
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Show all selected solutions summary */}
            {selectedSolutions.length > 0 && (
              <div className="form-step selected-solutions-summary">
                <div className="step-indicator">
                  <span className="step-label">Selected Solutions Summary</span>
                  <span className="selection-count">({selectedSolutions.length} total)</span>
                </div>
                <div className="selected-solutions-list">
                  {selectedSolutions.map((solutionTitle, idx) => {
                    const solutionPhase = phases.find(p => p.cards.some(c => c.title === solutionTitle));
                    const solution = solutionPhase?.cards.find(c => c.title === solutionTitle);
                    if (!solution) return null;
                    return (
                      <div 
                        key={solutionTitle} 
                        className={`selected-solution-item ${draggedSummaryIndex === idx ? 'dragging' : ''} ${dragOverSummaryIndex === idx ? 'drag-over' : ''}`}
                        draggable
                        onDragStart={(e) => {
                          setDraggedSummaryIndex(idx);
                          e.dataTransfer.effectAllowed = 'move';
                          e.target.style.opacity = '0.5';
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = 'move';
                          setDragOverSummaryIndex(idx);
                        }}
                        onDragLeave={() => setDragOverSummaryIndex(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (draggedSummaryIndex !== null && draggedSummaryIndex !== idx) {
                            const newOrder = [...selectedSolutions];
                            const draggedItem = newOrder[draggedSummaryIndex];
                            newOrder.splice(draggedSummaryIndex, 1);
                            newOrder.splice(idx, 0, draggedItem);
                            setSelectedSolutions(newOrder);
                          }
                          setDraggedSummaryIndex(null);
                          setDragOverSummaryIndex(null);
                        }}
                        onDragEnd={(e) => {
                          e.target.style.opacity = '1';
                          setDraggedSummaryIndex(null);
                          setDragOverSummaryIndex(null);
                        }}
                      >
                        <div className="drag-handle-summary">⋮⋮</div>
                        <span className="selected-solution-number">{idx + 1}</span>
                        <span className="selected-solution-name">{solutionTitle}</span>
                        {solutionPhase && (
                          <span className="selected-solution-phase">{solutionPhase.phase}</span>
                        )}
                        <button
                          className="remove-solution-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (solutionTitle !== ingestionSolution) {
                              toggleSolution(solutionTitle);
                            }
                          }}
                          disabled={solutionTitle === ingestionSolution}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pipeline-modal-footer">
          <button className="cta secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className={`cta primary ${!pipelineName.trim() || !selectedCategory || selectedSolutions.length === 0 || !isIngestionSelected ? 'disabled' : ''}`}
            onClick={handleCreate}
            disabled={!pipelineName.trim() || !selectedCategory || selectedSolutions.length === 0 || !isIngestionSelected}
          >
            <span>{editingPipeline ? 'Update Pipeline' : 'Create Pipeline'}</span>
            <span className="button-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Home Page Sections
const WhatWeDo = () => (
  <section className="home-section">
    <div className="container">
      <div className="section-header">
        <span className="eyebrow">What We Do</span>
        <h2>Comprehensive Data Modernization Platform</h2>
        <p className="section-description">
          Qelyx provides a unified platform that spans the entire data modernization journey, 
          from initial assessment through ongoing governance and optimization.
        </p>
      </div>
      <div className="phases-overview">
        {phases.map((phase, idx) => (
          <div key={phase.id} className="phase-overview-card">
            <div className="phase-number-large">{idx + 1}</div>
            <h3>{phase.phase}</h3>
            <p>{phase.description}</p>
            <div className="phase-stats">
              <span>{phase.cards.length} Solutions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyWeDo = () => (
  <section className="home-section alt">
    <div className="container">
      <div className="section-header">
        <span className="eyebrow">Why We Do It</span>
        <h2>Transform Data Challenges into Competitive Advantages</h2>
        <p className="section-description">
          Modern data estates are complex, fragmented, and often hinder innovation. 
          We provide the clarity, structure, and automation needed to unlock your data's potential.
        </p>
      </div>
      <div className="why-grid">
        <div className="why-card">
          <div className="why-icon">🎯</div>
          <h3>Clarity & Visibility</h3>
          <p>Gain complete visibility into your data estate, lineage, and dependencies to make informed decisions.</p>
        </div>
        <div className="why-card">
          <div className="why-icon">⚡</div>
          <h3>Speed & Efficiency</h3>
          <p>Automate repetitive tasks and streamline processes to accelerate time-to-value and reduce operational overhead.</p>
        </div>
        <div className="why-card">
          <div className="why-icon">🛡️</div>
          <h3>Security & Compliance</h3>
          <p>Ensure data security, privacy, and regulatory compliance through comprehensive governance and protection.</p>
        </div>
        <div className="why-card">
          <div className="why-icon">📈</div>
          <h3>Scalability & Growth</h3>
          <p>Build data infrastructure that scales with your business and adapts to changing requirements.</p>
        </div>
      </div>
    </div>
  </section>
);

const HowWeSolve = () => (
  <section className="home-section">
    <div className="container">
      <div className="section-header">
        <span className="eyebrow">How We Solve</span>
        <h2>A Unified, Integrated Approach</h2>
        <p className="section-description">
          Our platform integrates seamlessly across all phases, providing a cohesive experience 
          from discovery to ongoing management.
        </p>
      </div>
      <div className="how-steps">
        <div className="how-step">
          <div className="step-number">01</div>
          <h3>Assess & Understand</h3>
          <p>Comprehensive assessment of your current state, identifying opportunities and challenges.</p>
        </div>
        <div className="step-connector"></div>
        <div className="how-step">
          <div className="step-number">02</div>
          <h3>Design & Plan</h3>
          <p>Create blueprints and architectures that align with your business objectives and technical requirements.</p>
        </div>
        <div className="step-connector"></div>
        <div className="how-step">
          <div className="step-number">03</div>
          <h3>Execute & Enable</h3>
          <p>Build, deploy, and operationalize solutions with automation, security, and observability built-in.</p>
        </div>
        <div className="step-connector"></div>
        <div className="how-step">
          <div className="step-number">04</div>
          <h3>Govern & Optimize</h3>
          <p>Ongoing governance, monitoring, and optimization to ensure continued success and compliance.</p>
        </div>
      </div>
    </div>
  </section>
);

const Hero = ({ onExplore }) => (
  <section className="hero">
    <div className="hero-bg"></div>
    <div className="container hero-content">
      <div className="hero-text">
        <p className="eyebrow">Data Modernization Platform</p>
        <h1>Transform Your Data Estate with Precision and Clarity</h1>
        <p className="lede">
          A comprehensive, unified platform spanning <strong>Insight & Assessment</strong>, 
          <strong> Blueprint & Architecture</strong>, <strong>Execution & Enablement</strong>, 
          and <strong>Governance & Optimization</strong>—each solution designed for business clarity and technical excellence.
        </p>
        <div className="hero-actions">
          <button className="cta primary" onClick={onExplore}>
            Explore Solutions
          </button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="phase-preview">
          {phases.map((p, idx) => (
            <div key={p.id} className="phase-item" style={{ '--delay': idx * 0.1 + 's' }}>
              <div className="phase-number">{idx + 1}</div>
              <div className="phase-info">
                <div className="phase-name">{p.phase}</div>
                <div className="phase-modules">{p.cards.length} solutions</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PhaseSection = ({ phase, onSolutionClick }) => {
  return (
    <section id={phase.id} className={`phase-section ${phase.id === 'design' || phase.id === 'management' ? 'alt' : ''}`}>
      <div className="container">
        <div className="section-header">
          <div className="header-left">
            <span className="phase-tag">{phase.tag}</span>
            <h2 className="section-title">{phase.phase}</h2>
            <p className="section-description">{phase.description}</p>
          </div>
        </div>
        <div className="modules-grid">
          {phase.cards.map((card, idx) => (
            <div 
              className="module-card" 
              key={card.title} 
              style={{ '--delay': idx * 0.05 + 's' }}
              onClick={() => onSolutionClick(card, phase)}
            >
              <div className="card-content">
                <div className="card-icon"></div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.copy}</p>
                <div className="card-footer">
                  <span className="card-link">View Demo →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Category Hero Component
const CategoryHero = ({ categoryName }) => {
  if (categoryName !== 'Insurance') return null;

  return (
    <section className="category-hero">
      <div className="container">
        <div className="category-hero-content">
          <div className="category-hero-header">
            <h1 className="category-hero-title">AI-Driven Data Modernization Solutions</h1>
          </div>

          <div className="what-why-how-grid">
            {/* What We Do */}
            <div className="what-why-how-section">
              <h2 className="section-label">What We Do</h2>
              <p className="section-content">
                Qelyx delivers intelligent, industry-aligned data modernization solutions that transform how organizations manage, govern, and activate their data. From insurance and capital markets to cross-industry platforms, our solutions combine modern data architecture with AI-powered automation.
              </p>
            </div>

            {/* Why It Matters */}
            <div className="what-why-how-section">
              <h2 className="section-label">Why It Matters</h2>
              <p className="section-content">
                Legacy systems, fragmented data, and manual processes limit agility and insight. Qelyx helps organizations:
              </p>
              <ul className="why-list">
                <li>Accelerate decision-making with trusted, analytics-ready data</li>
                <li>Reduce operational risk through automated compliance and governance</li>
                <li>Scale modernization efforts without disrupting core business operations</li>
                <li>Leverage AI to drive efficiency across high-value processes like claims and reporting</li>
              </ul>
            </div>

            {/* How We Deliver */}
            <div className="what-why-how-section">
              <h2 className="section-label">How We Deliver</h2>
              <p className="section-content">
                Our platform brings together proven data engineering practices, industry-specific models, and AI-enabled automation to deliver measurable outcomes.
              </p>
              <ul className="how-list">
                <li><strong>Industry-Focused Solutions</strong> — Purpose-built offerings for insurance, capital markets, and enterprise use cases</li>
                <li><strong>Unified Data Architecture</strong> — Cloud-ready lakehouse and data lake platforms with built-in governance and lineage</li>
                <li><strong>AI-Powered Automation</strong> — Intelligent agents and workflows for reporting, integration, and operational processes</li>
                <li><strong>End-to-End Execution</strong> — From assessment and blueprint to implementation, enablement, and optimization</li>
              </ul>
            </div>
          </div>

          <div className="hero-ctas">
            <div className="hero-cta-links">
              <a href="#insurance">View by Industry</a>
              <span className="separator">|</span>
              <a href="#discover">View by Capability</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Agentic AI Section Component with Motion Animations
const AgenticAISection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Enhanced spring physics (inspired by react-spring) - Faster animations
  const springConfig = {
    type: "spring",
    stiffness: 200,
    damping: 20,
    mass: 0.8
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const flowStepVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const connectorVariants = {
    hidden: { scaleX: 0, opacity: 0, x: -20 },
    visible: (i) => ({
      scaleX: 1,
      opacity: 1,
      x: 0,
      transition: {
        delay: (i + 1) * 0.2 + 0.3,
        ...springConfig,
        duration: 0.6
      }
    })
  };

  return (
    <motion.section 
      ref={ref}
      className="industry-agentic-section"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="section-header" variants={itemVariants}>
          <Fade direction="up" triggerOnce delay={100} duration={400}>
            <motion.h2 
              className="section-title"
              whileHover={{ scale: 1.02 }}
              transition={springConfig}
            >
              Agentic AI for Insurance Operations
            </motion.h2>
          </Fade>
          <Fade triggerOnce delay={200} duration={400}>
            <motion.p 
              className="section-description"
              whileHover={{ scale: 1.01 }}
              transition={springConfig}
            >
              <strong>From insights to autonomous action—governed, explainable, and compliant.</strong>
            </motion.p>
          </Fade>
        </motion.div>

        {/* Visual Flow with Motion */}
        <motion.div 
          className="agentic-flow"
          variants={containerVariants}
        >
          <Zoom triggerOnce delay={300} duration={300}>
            <motion.div 
              className="flow-step flow-step-hover" 
              custom={0}
              variants={flowStepVariants}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                zIndex: 10
              }}
              whileTap={{ scale: 0.98 }}
              transition={springConfig}
            >
              <motion.div 
                className="flow-step-number"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={isInView ? { 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1 
                } : { 
                  scale: 0, 
                  rotate: -180, 
                  opacity: 0 
                }}
                transition={{ 
                  delay: 0.5,
                  duration: 0.4,
                  ease: "easeOut",
                  rotate: {
                    duration: 0.6,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }}
              >
                1
              </motion.div>
              <Fade triggerOnce delay={400} duration={300}>
                <div className="flow-step-content">
                  <div className="flow-step-icon">📊</div>
                  <motion.h3 
                    className="flow-step-title"
                    whileHover={{ color: "var(--primary)" }}
                    transition={springConfig}
                  >
                    Unified Insurance Data
                  </motion.h3>
                  <motion.div 
                    className="flow-step-label"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    Policy • Claims • Billing • Finance
                  </motion.div>
                  <p className="flow-step-caption">Insurance data unified from Guidewire and core systems into a governed data platform.</p>
                </div>
              </Fade>
            </motion.div>
          </Zoom>

          <motion.div 
            className="flow-connector"
            custom={0}
            variants={connectorVariants}
            style={{ originX: 0 }}
          >
            <motion.div 
              className="flow-arrow"
              animate={{ 
                x: [0, 8, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.5,
                x: 10
              }}
            >
              →
            </motion.div>
          </motion.div>

          <Zoom triggerOnce delay={900} duration={600}>
            <motion.div 
              className="flow-step flow-step-hover" 
              custom={1}
              variants={flowStepVariants}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                zIndex: 10
              }}
              whileTap={{ scale: 0.98 }}
              transition={springConfig}
            >
              <motion.div 
                className="flow-step-number"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={isInView ? { 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1 
                } : { 
                  scale: 0, 
                  rotate: -180, 
                  opacity: 0 
                }}
                transition={{ 
                  delay: 0.7,
                  duration: 0.4,
                  ease: "easeOut",
                  rotate: {
                    duration: 0.6,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }}
              >
                2
              </motion.div>
              <Fade triggerOnce delay={1000} duration={500}>
                <div className="flow-step-content">
                  <div className="flow-step-icon">🧠</div>
                  <motion.h3 
                    className="flow-step-title"
                    whileHover={{ color: "var(--primary)" }}
                    transition={springConfig}
                  >
                    Agentic AI Reasoning Layer
                  </motion.h3>
                  <motion.div 
                    className="flow-step-label"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    Agentic AI Engine
                  </motion.div>
                  <ul className="flow-step-points">
                    <li>Reason over policy, claims, and risk data</li>
                    <li>Apply business and regulatory rules</li>
                    <li>Evaluate confidence and next-best action</li>
                  </ul>
                </div>
              </Fade>
            </motion.div>
          </Zoom>

          <motion.div 
            className="flow-connector"
            custom={1}
            variants={connectorVariants}
            style={{ originX: 0 }}
          >
            <motion.div 
              className="flow-arrow"
              animate={{ 
                x: [0, 8, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              whileHover={{ 
                scale: 1.5,
                x: 10
              }}
            >
              →
            </motion.div>
          </motion.div>

          <Zoom triggerOnce delay={1100} duration={600}>
            <motion.div 
              className="flow-step flow-step-hover" 
              custom={2}
              variants={flowStepVariants}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                zIndex: 10
              }}
              whileTap={{ scale: 0.98 }}
              transition={springConfig}
            >
              <motion.div 
                className="flow-step-number"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={isInView ? { 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1 
                } : { 
                  scale: 0, 
                  rotate: -180, 
                  opacity: 0 
                }}
                transition={{ 
                  delay: 0.9,
                  duration: 0.4,
                  ease: "easeOut",
                  rotate: {
                    duration: 0.6,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }}
              >
                3
              </motion.div>
              <Fade triggerOnce delay={1200} duration={500}>
                <div className="flow-step-content">
                  <div className="flow-step-icon">🚀</div>
                  <motion.h3 
                    className="flow-step-title"
                    whileHover={{ color: "var(--primary)" }}
                    transition={springConfig}
                  >
                    Autonomous Action
                  </motion.h3>
                  <motion.div 
                    className="flow-step-label"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    Automated Workflows
                  </motion.div>
                  <ul className="flow-step-examples">
                    <li>Claims triage and routing</li>
                    <li>Fraud and anomaly escalation</li>
                    <li>Policy validation checks</li>
                    <li>Actuarial report generation</li>
                  </ul>
                </div>
              </Fade>
            </motion.div>
          </Zoom>

          <motion.div 
            className="flow-connector"
            custom={2}
            variants={connectorVariants}
            style={{ originX: 0 }}
          >
            <motion.div 
              className="flow-arrow"
              animate={{ 
                x: [0, 8, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              whileHover={{ 
                scale: 1.5,
                x: 10
              }}
            >
              →
            </motion.div>
          </motion.div>

          <Zoom triggerOnce delay={1300} duration={600}>
            <motion.div 
              className="flow-step flow-step-hover" 
              custom={3}
              variants={flowStepVariants}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                zIndex: 10
              }}
              whileTap={{ scale: 0.98 }}
              transition={springConfig}
            >
              <motion.div 
                className="flow-step-number"
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={isInView ? { 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1 
                } : { 
                  scale: 0, 
                  rotate: -180, 
                  opacity: 0 
                }}
                transition={{ 
                  delay: 1.1,
                  duration: 0.4,
                  ease: "easeOut",
                  rotate: {
                    duration: 0.6,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }}
              >
                4
              </motion.div>
              <Fade triggerOnce delay={1400} duration={500}>
                <div className="flow-step-content">
                  <div className="flow-step-icon">👨‍💼</div>
                  <motion.h3 
                    className="flow-step-title"
                    whileHover={{ color: "var(--primary)" }}
                    transition={springConfig}
                  >
                    Human-in-the-Loop Governance
                  </motion.h3>
                  <motion.div 
                    className="flow-step-label"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    Oversight & Control
                  </motion.div>
                  <ul className="flow-step-callouts">
                    <li>Approval thresholds</li>
                    <li>Explainable decisions</li>
                    <li>Full audit trail</li>
                    <li>Regulatory compliance</li>
                  </ul>
                </div>
              </Fade>
            </motion.div>
          </Zoom>
        </motion.div>

        {/* One-Line Explainer with Motion */}
        <Fade triggerOnce delay={800} duration={300}>
          <motion.div 
            className="agentic-explainer explainer-hover"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              delay: 1.3, 
              ...springConfig,
              duration: 0.7
            }}
            whileHover={{ 
              scale: 1.02
            }}
          >
            <motion.p 
              className="explainer-text"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              Agentic AI doesn't just analyze insurance data—it acts on it autonomously within governed guardrails.
            </motion.p>
          </motion.div>
        </Fade>

        {/* Comparison Visual with Motion */}
        <Slide direction="up" triggerOnce delay={900} duration={400}>
          <motion.div 
            className="agentic-comparison"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ 
              delay: 1.4, 
              ...springConfig,
              duration: 0.8
            }}
          >
            <Fade direction="left" triggerOnce delay={1800} duration={600}>
              <motion.div 
                className="comparison-item traditional comparison-card-hover"
                initial={{ opacity: 0, x: -50, rotateY: -10 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -50, rotateY: -10 }}
                transition={{ 
                  delay: 1.6, 
                  ...springConfig,
                  duration: 0.7
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  rotateY: 5
                }}
              >
                <h4 className="comparison-title">Traditional Automation</h4>
                <div className="comparison-flow">
                  <span>Data</span> → <span>Rules</span> → <span>Manual Review</span> → <span>Action</span>
                </div>
                <div className="comparison-badges">
                  <span className="badge negative">❌ Slow</span>
                  <span className="badge negative">❌ Fragmented</span>
                  <span className="badge negative">❌ High cost</span>
                </div>
              </motion.div>
            </Fade>

            <div className="comparison-vs">
              VS
            </div>

            <Fade direction="right" triggerOnce delay={1800} duration={600}>
              <motion.div 
                className="comparison-item qelyx comparison-card-hover"
                initial={{ opacity: 0, x: 50, rotateY: 10 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 50, rotateY: 10 }}
                transition={{ 
                  delay: 1.6, 
                  ...springConfig,
                  duration: 0.7
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  rotateY: -5
                }}
              >
                <h4 className="comparison-title">Qelyx Agentic AI</h4>
                <div className="comparison-flow">
                  <span>Unified Data</span> → <span>Reason</span> → <span>Decide</span> → <span>Act</span> → <span>Human Oversight</span>
                </div>
                <div className="comparison-badges">
                  <span className="badge positive">✅ Fast</span>
                  <span className="badge positive">✅ Scalable</span>
                  <span className="badge positive">✅ Compliant</span>
                </div>
              </motion.div>
            </Fade>
          </motion.div>
        </Slide>

        {/* Microcopy Badges with Motion - Redesigned */}
        <motion.div 
          className="microcopy-badges-grid"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {[
            { label: 'Agentic AI', desc: 'Autonomous, goal-driven AI with governance', icon: '🤖' },
            { label: 'Explainable AI', desc: 'Transparent, auditable decisions', icon: '🔍' },
            { label: 'Human-in-the-Loop', desc: 'Control without bottlenecks', icon: '👥' },
            { label: 'Insurance-Ready', desc: 'Built for regulated environments', icon: '🛡️' }
          ].map((badge, index) => (
            <motion.div 
              key={badge.label}
              className="microcopy-badge" 
              custom={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <div className="badge-icon">{badge.icon}</div>
              <motion.span 
                className="badge-label"
                whileHover={{ color: "var(--primary)" }}
                transition={{ duration: 0.2 }}
              >
                {badge.label}
              </motion.span>
              <span className="badge-desc">{badge.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// Industry Page Component for Banking, Insurance, Finance, and Health Sector
// Scroll Progress Indicator Component
const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress-indicator">
      <motion.div 
        className="scroll-progress-bar"
        style={{ 
          scaleX: scrollProgress / 100,
          transformOrigin: 'left'
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
    </div>
  );
};

const IndustryPage = ({ categoryName, solutions, onSolutionClick }) => {
  const isBanking = categoryName === 'Banking';
  const isInsurance = categoryName === 'Insurance';
  const isFinance = categoryName === 'Finance';
  const isHealthSector = categoryName === 'Health Sector';

  if (!isBanking && !isInsurance && !isFinance && !isHealthSector) {
    // Fallback to regular CategoryPage for other categories
    return (
      <>
        <CategoryHero categoryName={categoryName} />
        <section className="category-page">
          <div className="container">
            <div className="section-header">
              <div className="header-left">
                <span className="category-tag">{categoryName}</span>
                <h2 className="section-title">{categoryName}</h2>
                <p className="section-description">
                  {categoryName === 'Capital Markets' && 'Solutions tailored for capital markets data management and analytics'}
                  {categoryName === 'Common Offers' && 'Cross-industry solutions for common data modernization needs'}
                  {categoryName === 'Finance' && 'Financial data transformation and analytics solutions'}
                  {categoryName === 'Health Sector' && 'Healthcare data modernization and compliance solutions'}
                  {categoryName === 'All Industrial Solutions' && 'All industry-specific data modernization solutions'}
                </p>
              </div>
            </div>
            <div className="modules-grid">
              {solutions.map((solution, idx) => (
                <div 
                  className="module-card category-card" 
                  key={solution.title} 
                  style={{ '--delay': idx * 0.05 + 's' }}
                  onClick={() => onSolutionClick(solution, { phase: categoryName, id: categoryName.toLowerCase().replace(/\s+/g, '-') })}
                >
                  <div className="card-content">
                    <div className="card-category-badge">{categoryName}</div>
                    <h3 className="card-title">{solution.title}</h3>
                    <p className="card-description">{solution.copy}</p>
                    {solution.keywords && (
                      <div className="card-keywords">
                        {solution.keywords.map((keyword, kIdx) => (
                          <span key={kIdx} className="keyword-tag">{keyword}</span>
                        ))}
                      </div>
                    )}
                    <div className="card-footer">
                      <span className="card-link">View Details →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Scroll Progress Indicator for Insurance */}
      {isInsurance && <ScrollProgressIndicator />}
      {/* Hero Section */}
      <section className="industry-hero">
        <div className="container">
          <div className="industry-hero-content">
            <div className="industry-icon">
              {isBanking ? '🏦' : isInsurance ? '🛡️' : isFinance ? '💰' : '🏥'}
            </div>
            <h1 className="industry-hero-title">
              {isBanking && 'Intelligent Data & Agentic AI Solutions for Banking'}
              {isInsurance && 'Modern Data & Agentic AI Solutions for Insurance'}
              {isFinance && 'Intelligent Data & Agentic AI Solutions for Finance'}
              {isHealthSector && 'Modern Data & Agentic AI Solutions for Healthcare'}
            </h1>
            <p className="industry-hero-subtitle">
              {isBanking && 'Move beyond insights to autonomous action with Agentic AI–driven data modernization.'}
              {isInsurance && 'Insurance data modernization and intelligent automation solutions'}
              {isFinance && 'Transform financial operations with autonomous intelligence and AI-driven automation.'}
              {isHealthSector && 'Transform healthcare data management with intelligent automation and compliance.'}
            </p>
            <p className="industry-hero-description">
              {isBanking && 'Banks operate in an environment of constant regulatory change, evolving risk, and rising customer expectations. Qelyx helps banks modernize their data foundations and apply Agentic AI to automate decision-making across risk, compliance, and operations — safely and at scale.'}
              {isInsurance && 'Purpose-built solutions to modernize insurance data platforms, integrate core systems, and apply Agentic AI to automate claims, underwriting, and reporting—securely and at scale.'}
              {isFinance && 'Financial organizations require accurate, timely data for decision-making, regulatory compliance, and operational efficiency. Qelyx delivers intelligent data modernization solutions that transform financial operations through AI-powered automation and governance.'}
              {isHealthSector && 'Healthcare organizations manage complex patient data, regulatory requirements, and operational workflows. Qelyx modernizes healthcare data platforms with intelligent automation, ensuring HIPAA compliance while enabling better patient outcomes and operational efficiency.'}
            </p>
            
            {/* Highlighted Tagline for Insurance */}
            
            <div className="industry-hero-ctas">
              <a href="#solutions" className="cta primary">Explore {categoryName} Solutions</a>
              <a href="#contact" className="cta secondary">Talk to an Expert</a>
            </div>
          </div>
        </div>
      </section>

      {/* Agentic AI Section (for Insurance only) - Moved to Top with Motion Animations */}
      {isInsurance && (
        <AgenticAISection />
      )}

      {/* Why It Matters Section */}
      <section className="industry-why-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Why It Matters</span>
            <h2 className="section-title">Why It Matters</h2>
            <p className="section-description">
              {isBanking
                ? 'Traditional analytics stop at dashboards. Manual workflows slow response times and increase operational risk.'
                : 'Insurance operations rely heavily on manual reviews, fragmented data, and slow decision cycles. This increases cost, delays claims, and impacts customer satisfaction.'}
            </p>
          </div>
          <div className="industry-benefits-list">
            {isBanking ? (
              <>
                <div className="benefit-item">Act on insights automatically, not manually</div>
                <div className="benefit-item">Reduce compliance risk with AI-driven controls</div>
                <div className="benefit-item">Detect and respond to threats in real time</div>
                <div className="benefit-item">Scale intelligence across the enterprise</div>
              </>
            ) : (
              <>
                <div className="benefit-item">Automate claims and reporting workflows</div>
                <div className="benefit-item">Improve risk accuracy with AI-driven insights</div>
                <div className="benefit-item">Reduce operational overhead</div>
                <div className="benefit-item">Ensure compliance with explainable, governed AI</div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How Qelyx Helps Section */}
      <section className="industry-how-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">How Qelyx Helps {categoryName}</span>
            <h2 className="section-title">How Qelyx Helps {categoryName}</h2>
          </div>

          <div className="industry-capabilities-grid">
            {/* Capability 1 */}
            <div className="industry-capability-card">
              <h3 className="capability-title">
                {isBanking ? 'Unified Data Foundation' : 'Guidewire & Core System Integration'}
              </h3>
              <p className="capability-description">
                {isBanking
                  ? 'A governed, scalable data platform purpose-built for banking.'
                  : 'A unified insurance data foundation.'}
              </p>
              <ul className="capability-list">
                {isBanking ? (
                  <>
                    <li>Core banking, payments, loans, and risk data integration</li>
                    <li>Banking-aligned data models</li>
                    <li>End-to-end data lineage and quality controls</li>
                  </>
                ) : (
                  <>
                    <li>PolicyCenter, ClaimCenter, BillingCenter integration</li>
                    <li>Logical insurance data models</li>
                    <li>Analytics-ready lakehouse architecture</li>
                  </>
                )}
              </ul>
            </div>

            {/* Capability 2 */}
            <div className="industry-capability-card">
              <h3 className="capability-title">
                {isBanking ? 'Agentic AI for Banking Operations' : 'Agentic AI for Insurance Workflows'}
              </h3>
              <p className="capability-description">
                {isBanking
                  ? 'Autonomous AI agents that reason, decide, and act within defined guardrails.'
                  : 'AI agents that operate independently within business and regulatory rules.'}
              </p>
              <ul className="capability-list">
                {isBanking ? (
                  <>
                    <li>Intelligent risk assessment agents</li>
                    <li>Automated fraud and anomaly response</li>
                    <li>Compliance monitoring and exception handling</li>
                    <li>AI agents that orchestrate workflows across systems</li>
                  </>
                ) : (
                  <>
                    <li>Autonomous claims intake, triage, and resolution</li>
                    <li>Intelligent agents for policy validation and underwriting support</li>
                    <li>AI-driven actuarial and finance reporting workflows</li>
                    <li>Human-in-the-loop controls for regulatory compliance</li>
                  </>
                )}
              </ul>
            </div>

            {/* Capability 3 */}
            <div className="industry-capability-card">
              <h3 className="capability-title">
                {isBanking ? 'Regulatory & Risk Enablement' : 'Governance, Risk & Compliance'}
              </h3>
              <p className="capability-description">
                {isBanking
                  ? 'Compliance-ready by design, not retrofitted.'
                  : 'Trust and transparency built into every AI decision.'}
              </p>
              <ul className="capability-list">
                {isBanking ? (
                  <>
                    <li>Automated audit trails and reporting</li>
                    <li>Explainable AI decisions</li>
                    <li>Policy-driven governance and approvals</li>
                  </>
                ) : (
                  <>
                    <li>Explainable AI for claims and underwriting</li>
                    <li>End-to-end data and decision lineage</li>
                    <li>Automated compliance reporting (IFRS, GAAP, Solvency)</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="industry-core-capabilities">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Core Capabilities</span>
            <h2 className="section-title">Core Capabilities</h2>
          </div>
          <div className="core-capabilities-list">
            {isBanking ? (
              <>
                <div className="core-capability-item" style={{ '--index': 0 }}>✔ Banking Data Lakehouse & Mesh</div>
                <div className="core-capability-item" style={{ '--index': 1 }}>✔ Agentic AI for Risk, Fraud & Compliance</div>
                <div className="core-capability-item" style={{ '--index': 2 }}>✔ Customer 360 & Behavioral Intelligence</div>
                <div className="core-capability-item" style={{ '--index': 3 }}>✔ Regulatory Reporting Automation</div>
                <div className="core-capability-item" style={{ '--index': 4 }}>✔ Real-Time Monitoring & Alerts</div>
              </>
            ) : isInsurance ? (
              <>
                <div className="core-capability-item" style={{ '--index': 0 }}>✔ Finance & Actuarial Reporting</div>
                <div className="core-capability-item" style={{ '--index': 1 }}>✔ Guidewire Integration & Insurance Data Lake</div>
                <div className="core-capability-item" style={{ '--index': 2 }}>✔ Agentic AI Claims Process Automation</div>
                <div className="core-capability-item" style={{ '--index': 3 }}>✔ Risk, Exposure & Loss Analytics</div>
                <div className="core-capability-item" style={{ '--index': 4 }}>✔ Data Governance, Lineage & Controls</div>
              </>
            ) : isFinance ? (
              <>
                <div className="core-capability-item" style={{ '--index': 0 }}>✔ Financial Data Lakehouse & Analytics</div>
                <div className="core-capability-item" style={{ '--index': 1 }}>✔ Agentic AI for Financial Operations</div>
                <div className="core-capability-item" style={{ '--index': 2 }}>✔ Regulatory Reporting Automation</div>
                <div className="core-capability-item" style={{ '--index': 3 }}>✔ Financial Data Quality & Reconciliation</div>
                <div className="core-capability-item" style={{ '--index': 4 }}>✔ Real-Time Financial Monitoring</div>
              </>
            ) : (
              <>
                <div className="core-capability-item" style={{ '--index': 0 }}>✔ Healthcare Data Lakehouse & Integration</div>
                <div className="core-capability-item" style={{ '--index': 1 }}>✔ Agentic AI for Healthcare Operations</div>
                <div className="core-capability-item" style={{ '--index': 2 }}>✔ HIPAA-Compliant Data Platform</div>
                <div className="core-capability-item" style={{ '--index': 3 }}>✔ Patient Data Management & Analytics</div>
                <div className="core-capability-item" style={{ '--index': 4 }}>✔ Clinical Data Governance & Lineage</div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="industry-solutions-section" id="solutions">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{categoryName} Solutions</span>
            <h2 className="section-title">{categoryName} Solutions</h2>
            <p className="section-description">
              Explore our comprehensive solutions designed specifically for {categoryName.toLowerCase()} industry needs.
            </p>
          </div>
          <div className="modules-grid">
            {solutions.map((solution, idx) => (
              <div 
                className="module-card category-card" 
                key={solution.title} 
                style={{ '--delay': idx * 0.05 + 's' }}
                onClick={() => onSolutionClick(solution, { phase: categoryName, id: categoryName.toLowerCase().replace(/\s+/g, '-') })}
              >
                <div className="card-content">
                  <div className="card-category-badge">{categoryName}</div>
                  <h3 className="card-title">{solution.title}</h3>
                  <p className="card-description">{solution.copy}</p>
                  {solution.keywords && (
                    <div className="card-keywords">
                      {solution.keywords.map((keyword, kIdx) => (
                        <span key={kIdx} className="keyword-tag">{keyword}</span>
                      ))}
                    </div>
                  )}
                  <div className="card-footer">
                    <span className="card-link">View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      {!isInsurance && (
        <section className="industry-cta-footer">
          <div className="container">
            <p className="cta-footer-text">
              {isBanking && 'From insight to action — modernize banking with Agentic AI.'}
              {isFinance && 'Transform finance operations — powered by Agentic AI.'}
              {isHealthSector && 'Better healthcare outcomes — powered by intelligent data.'}
            </p>
          </div>
        </section>
      )}

    </>
  );
};

// Category Page Component (for other categories)
const CategoryPage = ({ categoryName, solutions, onSolutionClick }) => {
  // Use IndustryPage for Banking and Insurance, regular CategoryPage for others
  if (categoryName === 'Banking' || categoryName === 'Insurance') {
    return <IndustryPage categoryName={categoryName} solutions={solutions} onSolutionClick={onSolutionClick} />;
  }

  return (
    <>
      <CategoryHero categoryName={categoryName} />
      <section className="category-page">
        <div className="container">
          <div className="section-header">
            <div className="header-left">
              <span className="category-tag">{categoryName}</span>
              <h2 className="section-title">{categoryName}</h2>
              <p className="section-description">
                {categoryName === 'Capital Markets' && 'Solutions tailored for capital markets data management and analytics'}
                {categoryName === 'Common Offers' && 'Cross-industry solutions for common data modernization needs'}
                {categoryName === 'Finance' && 'Financial data transformation and analytics solutions'}
                {categoryName === 'Health Sector' && 'Healthcare data modernization and compliance solutions'}
                {categoryName === 'All Industrial Solutions' && 'All industry-specific data modernization solutions'}
              </p>
            </div>
          </div>
          <div className="modules-grid">
            {solutions.map((solution, idx) => (
              <div 
                className="module-card category-card" 
                key={solution.title} 
                style={{ '--delay': idx * 0.05 + 's' }}
                onClick={() => onSolutionClick(solution, { phase: categoryName, id: categoryName.toLowerCase().replace(/\s+/g, '-') })}
              >
                <div className="card-content">
                  <div className="card-category-badge">{categoryName}</div>
                  <h3 className="card-title">{solution.title}</h3>
                  <p className="card-description">{solution.copy}</p>
                  {solution.keywords && (
                    <div className="card-keywords">
                      {solution.keywords.map((keyword, kIdx) => (
                        <span key={kIdx} className="keyword-tag">{keyword}</span>
                      ))}
                    </div>
                  )}
                  <div className="card-footer">
                    <span className="card-link">View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Home Page Component

const HomePage = ({ onViewChange = () => {} }) => {
  const technicalOffersCount = phases.reduce((sum, phase) => sum + phase.cards.length, 0);
  const allIndustrialCount = categorySolutions.insurance.length + 
                             categorySolutions.capitalMarkets.length + 
                             categorySolutions.commonOffers.length;
  const [selectedCategory, setSelectedCategory] = useState('industry'); // 'industry', 'capability', 'ai-powered'
  const [selectedSegment, setSelectedSegment] = useState(null);
  const hoverTimeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Data for pie chart segments
  const industrySegments = [
    { id: 'finance', label: 'Finance', color: 'var(--primary)', description: 'Modernize financial data, reporting, and analytics with governed, automation-ready platforms.', focusAreas: ['Financial data platforms', 'Regulatory & statutory reporting', 'Performance analytics'], onClick: () => onViewChange('finance') },
    { id: 'insurance', label: 'Insurance', color: 'var(--accent)', description: 'Unify policy, claims, and actuarial data while automating core insurance workflows with Agentic AI.', focusAreas: ['Guidewire integration', 'Actuarial reporting', 'Agentic claims automation'], onClick: () => onViewChange('insurance') },
    { id: 'banking', label: 'Banking', color: 'var(--primary-light)', description: 'Enable intelligent risk, compliance, and fraud operations with unified data and autonomous AI.', focusAreas: ['Core banking data platforms', 'Risk & compliance intelligence', 'Fraud & AML automation'], onClick: () => onViewChange('banking') },
    { id: 'healthcare', label: 'Healthcare', color: 'var(--accent-dark)', description: 'Transform clinical and operational data into trusted insights while ensuring privacy and compliance.', focusAreas: ['Clinical data platforms', 'Outcomes analytics', 'Governance & compliance'], onClick: () => onViewChange('health-sector') },
    { id: 'capital-markets', label: 'Capital Markets', color: 'var(--primary)', description: 'Optimize market, trading, and risk data with high-performance analytics platforms.', focusAreas: ['Market & reference data', 'Risk analytics', 'Performance reporting'], onClick: () => onViewChange('industrial-all') }
  ];

  const capabilitySegments = [
    { id: 'data-foundations', label: 'Data Foundations', color: 'var(--primary)', description: 'Unify, model, and govern enterprise data across systems.', focusAreas: ['Data ingestion & integration', 'Domain data modeling', 'Metadata & lineage'], onClick: () => handleCapabilityClick('discover') },
    { id: 'analytics-insights', label: 'Analytics & Insights', color: 'var(--accent)', description: 'Enable faster, more reliable decision-making with analytics-ready data.', focusAreas: ['BI & reporting', 'Advanced analytics', 'Performance insights'], onClick: () => handleCapabilityClick('design') },
    { id: 'automation-workflows', label: 'Automation & Workflows', color: 'var(--primary-light)', description: 'Move from manual processes to intelligent automation.', focusAreas: ['Process automation', 'Event-driven workflows', 'Operational intelligence'], onClick: () => handleCapabilityClick('deliver') },
    { id: 'governance-compliance', label: 'Governance & Compliance', color: 'var(--accent-dark)', description: 'Ensure trust, transparency, and regulatory readiness.', focusAreas: ['Data quality & controls', 'Audit trails', 'Policy enforcement'], onClick: () => handleCapabilityClick('management') },
    { id: 'platform-optimization', label: 'Platform Optimization', color: 'var(--primary)', description: 'Continuously optimize performance, cost, and scalability.', focusAreas: ['Cloud optimization', 'Performance tuning', 'Platform observability'], onClick: () => handleCapabilityClick('management') }
  ];

  const aiPoweredSegments = [
    { id: 'agentic-ai', label: 'Agentic AI', color: 'var(--primary)', description: 'Autonomous AI agents that reason, decide, and act within governed guardrails.', focusAreas: ['Goal-driven AI agents', 'Human-in-the-loop controls', 'Explainable decisions'], onClick: () => handleCapabilityClick('deliver') },
    { id: 'predictive-intelligence', label: 'Predictive Intelligence', color: 'var(--accent)', description: 'Anticipate risk, behavior, and outcomes before they happen.', focusAreas: ['Risk prediction', 'Demand forecasting', 'Anomaly detection'], onClick: () => handleCapabilityClick('discover') },
    { id: 'intelligent-automation', label: 'Intelligent Automation', color: 'var(--primary-light)', description: 'AI-driven automation for high-value workflows.', focusAreas: ['Claims automation', 'Compliance actions', 'Exception handling'], onClick: () => handleCapabilityClick('deliver') },
    { id: 'decision-intelligence', label: 'Decision Intelligence', color: 'var(--accent-dark)', description: 'Augment human decision-making with AI insights.', focusAreas: ['Next-best action', 'Confidence scoring', 'Scenario analysis'], onClick: () => handleCapabilityClick('management') },
    { id: 'ai-governance-trust', label: 'AI Governance & Trust', color: 'var(--primary)', description: 'Ensure AI is transparent, auditable, and compliant.', focusAreas: ['Explainable AI', 'Decision lineage', 'Regulatory controls'], onClick: () => handleCapabilityClick('management') }
  ];

  const getCurrentSegments = () => {
    if (selectedCategory === 'industry') return industrySegments;
    if (selectedCategory === 'capability') return capabilitySegments;
    return aiPoweredSegments;
  };

  const getCenterLabel = () => {
    if (selectedCategory === 'industry') return { title: 'Industry Solutions', subtitle: 'Purpose-built journeys for regulated industries' };
    if (selectedCategory === 'capability') return { title: 'Platform Capabilities', subtitle: 'End-to-end data and AI capabilities' };
    return { title: 'AI-Powered Solutions', subtitle: 'From insight to autonomous action' };
  };

  const handleCapabilityClick = (phaseId) => {
    setSelectedPieSegment(null); // Capability filters don't map to specific industry segments
    onViewChange('technical-offers');
    setTimeout(() => {
      const element = document.getElementById(phaseId);
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 200);
  };

  return (
    <>
      {/* 🧭 Module 1: Hero – The Solutions Journey (Stackbyte-inspired) */}
      <motion.section 
        className="home-section home-solutions-hero" 
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container solutions-hero-layout">
          <motion.div
            className="solutions-hero-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="eyebrow">HOME → SOLUTIONS</span>
            <h1 className="section-title">A&nbsp;Unified Journey from Data to Intelligent Outcomes</h1>
            <p className="section-description">
              Qelyx delivers a unified journey that modernizes data and AI, turning intelligence into
              autonomous, trusted outcomes for complex, regulated enterprises.
            </p>
            <div className="hero-ctas">
              <button 
                className="cta primary"
                onClick={() => onViewChange('industrial-all')}
              >
                Explore Solutions by Industry
              </button>
              <button 
                className="cta secondary"
                onClick={() => onViewChange('technical-offers')}
              >
                Explore Technical Solutions
              </button>
            </div>
          </motion.div>

          <motion.div
            className="solutions-hero-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="solutions-hero-orbit">
              <div className="solutions-hero-orbit-ring"></div>
              <div className="solutions-hero-orbit-core"></div>
            </div>

            {/* Top-Level Tabs (outside pie container) */}
            <div className="pie-explorer-tabs">
                <button
                  className={`pie-tab ${selectedCategory === 'industry' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('industry')}
                >
                  By Industry
                </button>
                <button
                  className={`pie-tab ${selectedCategory === 'capability' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('capability')}
                >
                  By Capability
                </button>
                <button
                  className={`pie-tab ${selectedCategory === 'ai-powered' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('ai-powered')}
                >
                  AI-Powered
                </button>
            </div>
            
            {/* Interactive Pie Chart Explorer */}
            <div className="solutions-hero-pie-container">
              {/* Pie Chart with 5 Segments */}
              <div className="solutions-hero-pie-chart">
                  <svg viewBox="0 0 200 200" className="pie-chart-svg">
                    {/* Background circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="var(--border-primary)"
                      strokeWidth="2"
                      opacity="0.2"
                    />
                    
                    {/* 5 Segments - Each 72 degrees (20% of circle) */}
                    {getCurrentSegments().map((segment, index) => {
                      const segmentAngle = 72; // 360 / 5 = 72 degrees per segment
                      const startAngle = index * segmentAngle - 90; // Start from top
                      const endAngle = (index + 1) * segmentAngle - 90;
                      
                      const startAngleRad = (startAngle * Math.PI) / 180;
                      const endAngleRad = (endAngle * Math.PI) / 180;
                      
                      const radius = 80;
                      const innerRadius = 50;
                      const centerX = 100;
                      const centerY = 100;
                      
                      const x1 = centerX + radius * Math.cos(startAngleRad);
                      const y1 = centerY + radius * Math.sin(startAngleRad);
                      const x2 = centerX + radius * Math.cos(endAngleRad);
                      const y2 = centerY + radius * Math.sin(endAngleRad);
                      
                      const x3 = centerX + innerRadius * Math.cos(endAngleRad);
                      const y3 = centerY + innerRadius * Math.sin(endAngleRad);
                      const x4 = centerX + innerRadius * Math.cos(startAngleRad);
                      const y4 = centerY + innerRadius * Math.sin(startAngleRad);
                      
                      const largeArc = segmentAngle > 180 ? 1 : 0;
                      
                      const pathData = `
                        M ${x1} ${y1}
                        A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
                        L ${x3} ${y3}
                        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
                        Z
                      `;
                      
                      // Text arc path - closer to the outer edge of the segment (to match design)
                      const textRadius = 72; // Just inside radius (80) so text hugs the outer ring
                      const midAngle = (startAngle + segmentAngle / 2) * Math.PI / 180;
                      
                      // Detect if segment is on left side (90° to 270°) to flip text direction
                      const isLeftSide = midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2;
                      
                      // Create arc path for text - reverse direction for left side to prevent upside-down text
                      const textStartX = centerX + textRadius * Math.cos(startAngleRad);
                      const textStartY = centerY + textRadius * Math.sin(startAngleRad);
                      const textEndX = centerX + textRadius * Math.cos(endAngleRad);
                      const textEndY = centerY + textRadius * Math.sin(endAngleRad);
                      
                      // For left side, reverse the arc direction
                      const textPathData = isLeftSide
                        ? `M ${textEndX} ${textEndY} A ${textRadius} ${textRadius} 0 ${largeArc} 0 ${textStartX} ${textStartY}`
                        : `M ${textStartX} ${textStartY} A ${textRadius} ${textRadius} 0 ${largeArc} 1 ${textEndX} ${textEndY}`;
                      
                      const textPathId = `text-path-${segment.id}`;
                      
                      const handleMouseEnter = () => {
                        // Clear any pending timeout
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current);
                          hoverTimeoutRef.current = null;
                        }
                        // Set segment immediately
                        setSelectedSegment(segment.id);
                      };

                      const handleMouseLeave = () => {
                        // Add small delay before clearing to prevent flickering
                        hoverTimeoutRef.current = setTimeout(() => {
                          setSelectedSegment(null);
                          hoverTimeoutRef.current = null;
                        }, 150); // 150ms delay
                      };

                      return (
                        <g 
                          key={segment.id}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <path
                            d={pathData}
                            fill={segment.color}
                            className={`pie-segment ${selectedSegment === segment.id ? 'selected' : ''}`}
                            opacity={selectedSegment === segment.id ? "1" : "0.8"}
                            style={{ cursor: 'pointer', pointerEvents: 'all' }}
                            onClick={() => {
                              if (hoverTimeoutRef.current) {
                                clearTimeout(hoverTimeoutRef.current);
                                hoverTimeoutRef.current = null;
                              }
                              setSelectedSegment(segment.id);
                              segment.onClick();
                            }}
                          />
                          {/* Invisible arc path for text */}
                          <path
                            id={textPathId}
                            d={textPathData}
                            fill="none"
                            stroke="none"
                            style={{ pointerEvents: 'none' }}
                          />
                          {/* Text curved along arc using textPath */}
                          <text
                            className="pie-segment-label"
                            fill="rgba(255, 255, 255, 0.95)"
                            fontSize="5"
                            fontWeight="600"
                            letterSpacing="0.08em"
                            style={{ cursor: 'pointer', pointerEvents: 'all' }}
                            onClick={() => {
                              if (hoverTimeoutRef.current) {
                                clearTimeout(hoverTimeoutRef.current);
                                hoverTimeoutRef.current = null;
                              }
                              setSelectedSegment(segment.id);
                              segment.onClick();
                            }}
                          >
                            <textPath
                              href={`#${textPathId}`}
                              startOffset="50%"
                              textAnchor="middle"
                              method="align"
                            >
                              {segment.label.toUpperCase()}
                            </textPath>
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Center hole */}
                    <circle
                      cx="100"
                      cy="100"
                      r="50"
                      fill="var(--bg)"
                    />
                  </svg>
                  
                  {/* Center Label */}
                  <div className="pie-chart-center">
                    <div className="pie-chart-center-icon">📊</div>
                    <div className="pie-chart-center-title">{getCenterLabel().title}</div>
                    <div className="pie-chart-center-subtitle">{getCenterLabel().subtitle}</div>
                  </div>
                </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 🧱 Module 2: The Qelyx Solutions Journey */}
      <motion.section 
        className="home-section alt solutions-journey-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">End-to-End Journey</span>
            <h2 className="section-title">The Qelyx Solutions Journey</h2>
            <p className="section-description">
              Every successful transformation follows a path. Qelyx solutions are structured as a progressive journey—each stage building on the previous one to deliver scalable, intelligent outcomes.
            </p>
          </div>
          <div className="solutions-journey-grid">
            {[
              { title: '1. Industry Context', desc: 'Start with deep industry understanding to reduce risk and accelerate value.' },
              { title: '2. Data Foundations', desc: 'Unify, model, and govern enterprise data across core systems.' },
              { title: '3. Technical Execution', desc: 'Design and build scalable, cloud-ready data platforms.' },
              { title: '4. Agentic AI Automation', desc: 'Apply autonomous AI that reasons, decides, and acts on data.' },
              { title: '5. Governance & Optimization', desc: 'Ensure trust, compliance, and continuous improvement.' }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="journey-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 🏭 Module 3: Industry Solutions */}
      <motion.section 
        className="home-section home-industry-solutions"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Industry Solutions</span>
            <h2 className="section-title">Industry Solutions</h2>
            <p className="section-description">
              Qelyx delivers purpose-built solutions for data-intensive, regulated industries—accelerating outcomes while minimizing complexity.
            </p>
          </div>
          <div className="industry-overview-grid">
            {[
              { icon: '💰', title: 'Finance', desc: 'Modernize financial data, reporting, and analytics with automation-ready platforms.', bullets: ['Financial data platforms', 'Regulatory & statutory reporting', 'Performance and management analytics'], onClick: () => onViewChange('finance') },
              { icon: '🛡️', title: 'Insurance', desc: 'Unify policy, claims, and actuarial data while automating core insurance workflows with Agentic AI.', bullets: ['Guidewire data integration', 'Finance & actuarial reporting', 'Agentic claims process automation'], onClick: () => onViewChange('insurance') },
              { icon: '🏦', title: 'Banking', desc: 'Enable intelligent risk, compliance, and fraud operations with unified data and autonomous AI.', bullets: ['Core banking data platforms', 'Risk & compliance intelligence', 'Fraud and financial crime automation'], onClick: () => onViewChange('banking') },
              { icon: '🏥', title: 'Healthcare', desc: 'Transform healthcare data into trusted insights while ensuring privacy and regulatory compliance.', bullets: ['Clinical & operational data platforms', 'Analytics for outcomes and efficiency', 'Governance and compliance automation'], onClick: () => onViewChange('health-sector') }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="industry-overview-card"
                onClick={card.onClick}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="overview-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <ul className="industry-bullets">
                  {card.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 🧠 Module 4: Agentic AI (Core Differentiator) */}
      <motion.section 
        className="home-section alt home-agentic-core"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Agentic Intelligence</span>
            <h2 className="section-title">Agentic AI at the Core</h2>
            <p className="section-description">
              Agentic AI is embedded across the Qelyx platform—enabling systems that don’t just analyze data, but act on it autonomously within governed guardrails.
            </p>
          </div>
          <div className="home-agentic-flow">
            {[
              { title: 'Unified Data', desc: 'Enterprise data from industry systems and platforms.' },
              { title: 'Reason', desc: 'AI agents evaluate signals, rules, and context.' },
              { title: 'Decide', desc: 'Next-best actions determined with confidence scoring.' },
              { title: 'Act', desc: 'Automated workflows executed across systems.' },
              { title: 'Human Oversight', desc: 'Explainability, approvals, and audit trails built in.' }
            ].map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  className="agentic-step"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="agentic-step-title">{step.title}</div>
                  <p>{step.desc}</p>
                </motion.div>
                {index < 4 && (
                  <motion.div
                    className="agentic-arrow"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    →
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="section-subtext center">
            <strong>Agentic AI turns insight into action—safely, transparently, and at scale.</strong>
          </p>
        </div>
      </motion.section>

      {/* ⚙️ Module 5: Technical Solutions */}
      <motion.section 
        className="home-section home-technical-solutions"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Technical Solutions</span>
            <h2 className="section-title">Technical Solutions</h2>
            <p className="section-description">
              Qelyx technical solutions provide the architecture, execution, and governance required to scale modernization initiatives with confidence.
            </p>
          </div>
          <div className="technical-grid">
            {[
              { title: 'Insight & Assessment', desc: 'Understand your current state and define a clear path forward.', bullets: ['Data and platform maturity assessments', 'AI readiness and governance evaluation', 'Modernization roadmaps'] },
              { title: 'Blueprint & Architecture', desc: 'Design future-ready platforms aligned to business goals.', bullets: ['Cloud and lakehouse architecture', 'Data mesh and domain modeling', 'Security, governance, and lineage design'] },
              { title: 'Execution & Enablement', desc: 'Build and operationalize at enterprise scale.', bullets: ['Data engineering and platform implementation', 'Migration and modernization execution', 'Enablement and adoption support'] },
              { title: 'Governance & Optimization', desc: 'Sustain trust, performance, and compliance over time.', bullets: ['Metadata, lineage, and data quality', 'Platform performance and cost optimization', 'Continuous compliance and controls'] }
            ].map((column, index) => (
              <motion.div
                key={index}
                className="technical-column"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3>{column.title}</h3>
                <p>{column.desc}</p>
                <ul>
                  {column.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="view-all-technical">
            <button 
              className="cta primary" 
              onClick={() => onViewChange('technical-offers')}
            >
              Explore Technical Solutions ({technicalOffersCount})
            </button>
          </div>
        </div>
      </motion.section>

      {/* 🔁 Module 6: End-to-End Value Flow */}
      <motion.section 
        className="home-section alt home-value-flow"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">End-to-End Value</span>
            <h2 className="section-title">One Platform. End-to-End Outcomes.</h2>
            <p className="section-description">
              Industry expertise, unified data platforms, technical execution, Agentic AI, and governance—connected on a single platform.
            </p>
          </div>
          <motion.div 
            className="value-flow-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <span>Industry Expertise</span>
            <span>→</span>
            <span>Unified Data Platforms</span>
            <span>→</span>
            <span>Technical Execution</span>
            <span>→</span>
            <span>Agentic AI Automation</span>
            <span>→</span>
            <span>Governed Business Outcomes</span>
          </motion.div>
          <div className="value-outcomes">
            {[
              'Faster, data-driven decisions',
              'Reduced operational and regulatory risk',
              'Scalable automation',
              'Trusted AI adoption'
            ].map((outcome, index) => (
              <motion.div
                key={index}
                className="value-outcome-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {outcome}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


    </>
  );
};



const Header = ({ currentView, onViewChange, pipelinesCount, onTechnicalPhaseSelect }) => {
  const [showIndustrialDropdown, setShowIndustrialDropdown] = useState(false);
  const [showTechnicalDropdown, setShowTechnicalDropdown] = useState(false);

  const handleSignOut = () => {
    // Clear authentication
    localStorage.removeItem('qelyx_authenticated');
    localStorage.removeItem('qelyx_auth_timestamp');
    // Redirect to public homepage
    window.location.href = '/';
  };

  const industrialOptions = [
    { id: 'insurance', label: 'Insurance', view: 'insurance' },
    { id: 'banking', label: 'Banking', view: 'banking' },
    { id: 'finance', label: 'Finance', view: 'finance' },
    { id: 'health-sector', label: 'Health Sector', view: 'health-sector' },
    { id: 'all', label: 'All', view: 'industrial-all' }
  ];

  const technicalOptions = phases.map(phase => ({
    id: phase.id,
    label: phase.phase,
    view: 'technical-offers',
    phaseId: phase.id
  }));

  const handleIndustrialClick = (option, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowIndustrialDropdown(false);
    // Use setTimeout to ensure state updates happen after dropdown closes
    setTimeout(() => {
      onViewChange(option.view);
    }, 10);
  };

  const handleTechnicalClick = (option, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowTechnicalDropdown(false);
    // Use setTimeout to ensure state updates happen after dropdown closes
    setTimeout(() => {
      if (option.phaseId && onTechnicalPhaseSelect) {
        onTechnicalPhaseSelect(option.phaseId);
      } else {
        onViewChange(option.view);
      }
    }, 10);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-dropdown')) {
        setShowIndustrialDropdown(false);
        setShowTechnicalDropdown(false);
      }
    };
    if (showIndustrialDropdown || showTechnicalDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showIndustrialDropdown, showTechnicalDropdown]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-dropdown')) {
        setShowIndustrialDropdown(false);
        setShowTechnicalDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-content">
        <div className="logo" onClick={() => onViewChange('home')} style={{ cursor: 'pointer' }}>
          <img src="/Qelyx Logo_New-CyDrNzo-.png" alt="Qelyx Logo" />
          <span className="logo-text">Qelyx</span>
        </div>
        <nav className="nav">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); onViewChange('home'); }}
            className={currentView === 'home' ? 'active' : ''}
          >
            Home
          </a>
          
          {/* Industrial Solutions Dropdown */}
          <div 
            className="nav-dropdown"
          >
            <a 
              href="#industrial-solutions"
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                setShowIndustrialDropdown(!showIndustrialDropdown);
                setShowTechnicalDropdown(false); // Close other dropdown
              }}
              className={['insurance', 'banking', 'finance', 'health-sector', 'industrial-all'].includes(currentView) ? 'active' : ''}
            >
              Industrial Solutions <span className={`dropdown-arrow ${showIndustrialDropdown ? 'open' : ''}`}>▼</span>
            </a>
            {showIndustrialDropdown && (
              <div 
                className="dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                {industrialOptions.map(option => (
                  <div
                    key={option.id}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => handleIndustrialClick(option, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleIndustrialClick(option, e);
                      }
                    }}
                    className={`dropdown-item ${currentView === option.view ? 'active' : ''}`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technical Solutions Dropdown */}
          <div 
            className="nav-dropdown"
          >
            <a 
              href="#technical-solutions"
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                setShowTechnicalDropdown(!showTechnicalDropdown);
                setShowIndustrialDropdown(false); // Close other dropdown
              }}
              className={currentView === 'technical-offers' ? 'active' : ''}
            >
              Technical Solutions <span className={`dropdown-arrow ${showTechnicalDropdown ? 'open' : ''}`}>▼</span>
            </a>
            {showTechnicalDropdown && (
              <div 
                className="dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                {technicalOptions.map(option => (
                  <div
                    key={option.id}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => handleTechnicalClick(option, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleTechnicalClick(option, e);
                      }
                    }}
                    className={`dropdown-item ${currentView === 'technical-offers' ? 'active' : ''}`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <a 
            href="#pipelines" 
            onClick={(e) => { e.preventDefault(); onViewChange('pipelines'); }}
            className={currentView === 'pipelines' || currentView === 'pipeline' ? 'active' : ''}
          >
            Pipelines {pipelinesCount > 0 && `(${pipelinesCount})`}
          </a>
          
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="sign-out-btn"
            style={{
              marginLeft: '16px',
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-content">
      <div className="footer-brand">
        <div className="logo">
          <img src="/Qelyx Logo_New-CyDrNzo-.png" alt="Qelyx Logo" />
          <span className="logo-text">Qelyx</span>
        </div>
        <p className="footer-tagline">Data modernization through insight, design, execution, and governance.</p>
      </div>
      <div className="footer-links">
        <div className="link-group">
          <h4>Solutions</h4>
          {phases.map(phase => (
            <a key={phase.id} href={`#${phase.id}`}>{phase.phase}</a>
          ))}
        </div>
      </div>
    </div>
    <div className="container footer-bottom">
      <p>© 2025 Qelyx. All rights reserved.</p>
    </div>
  </footer>
);

// Pipeline View Component - Connected Flow
const PipelineView = ({ pipeline, onBack, onSolutionClick, onEdit }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [orderedSolutions, setOrderedSolutions] = useState([]);
  const [itemsPerRow, setItemsPerRow] = useState(5);
  const containerRef = React.useRef(null);

  if (!pipeline) return null;

  // Icon mapping for different modules
  const getModuleIcon = (title) => {
    const iconMap = {
      'Data Estate Assessment': '📊',
      'Code Assistant': '🔍',
      'Code Tracer': '🗺️',
      'Integration Mapping Blueprint': '🔗',
      'Enterprise Data Model Design': '🏗️',
      'Data Product Designer': '📦',
      'Data Model Analyzer': '⚙️',
      'Ingestion Pipeline Orchestration': '📥',
      'Secure Data Protection Services': '🔒',
      'Data Health & Profiling Analytics': '💊',
      'Data Quality Assurance Hub': '✅',
      'Issue Diagnostics & RCA Engine': '🔧',
      'Data Standard & Schema Harmonization': '📐',
      'Transformation Pipeline Studio': '🔄',
      'Target Schema & Model Definition': '🎯',
      'Data Reconciliation & Validation': '⚖️',
      'Operational Insights & Intelligence': '📈',
      'Enterprise Master Data Hub': '👑',
      'Sensitive Data Governance Center': '🛡️',
      'Operational & Compliance Reporting': '📋',
      'End-to-End Process Monitoring': '👁️'
    };
    return iconMap[title] || '📦';
  };

  const getSolutionDetails = (solutionTitle) => {
    for (const phase of phases) {
      const solution = phase.cards.find(card => card.title === solutionTitle);
      if (solution) {
        return { solution, phase };
      }
    }
    return null;
  };

  // Initialize ordered solutions on mount or when pipeline changes
  useEffect(() => {
    if (pipeline && pipeline.solutions.length > 0) {
      const initialOrder = pipeline.solutions
        .map(title => getSolutionDetails(title))
        .filter(Boolean)
        .map(({ solution, phase }, idx) => ({
          solution,
          phase,
          originalIndex: idx,
          phaseOrder: phases.findIndex(p => p.id === phase.id)
        }))
        .sort((a, b) => {
          if (a.phaseOrder !== b.phaseOrder) {
            return a.phaseOrder - b.phaseOrder;
          }
          return a.originalIndex - b.originalIndex;
        });
      setOrderedSolutions(initialOrder);
    }
  }, [pipeline?.solutions]);

  // Use orderedSolutions if available, otherwise fallback to sorted solutionDetails
  const baseSolutionDetails = orderedSolutions.length > 0 ? orderedSolutions : (() => {
    const allSolutions = pipeline.solutions
      .map(title => getSolutionDetails(title))
      .filter(Boolean)
      .map(({ solution, phase }, idx) => ({
        solution,
        phase,
        originalIndex: idx,
        phaseOrder: phases.findIndex(p => p.id === phase.id)
      }))
      .sort((a, b) => {
        if (a.phaseOrder !== b.phaseOrder) {
          return a.phaseOrder - b.phaseOrder;
        }
        return a.originalIndex - b.originalIndex;
      });
    
    // If orderedSolutions is empty, initialize it
    if (orderedSolutions.length === 0 && allSolutions.length > 0) {
      setOrderedSolutions(allSolutions);
    }
    
    return allSolutions;
  })();

  // Organize solutions into rows with zigzag pattern (odd rows: left-to-right, even rows: right-to-left)
  const solutionDetails = useMemo(() => {
    if (itemsPerRow <= 0) return baseSolutionDetails;
    
    const rows = [];
    for (let i = 0; i < baseSolutionDetails.length; i += itemsPerRow) {
      const row = baseSolutionDetails.slice(i, i + itemsPerRow);
      const rowIndex = Math.floor(i / itemsPerRow);
      // Reverse even rows (0-indexed, so row 1, 3, 5... are reversed)
      if (rowIndex % 2 === 1) {
        rows.push([...row].reverse());
      } else {
        rows.push(row);
      }
    }
    
    return rows.flat();
  }, [baseSolutionDetails, itemsPerRow]);

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.style.opacity = '0.5';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newOrder = [...orderedSolutions.length > 0 ? orderedSolutions : solutionDetails];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, draggedItem);
    
    setOrderedSolutions(newOrder);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Generate combined demo URL for all modules
  const handleDemoAllModules = () => {
    // Create a combined demo URL with all selected modules
    if (solutionDetails.length > 0) {
      const moduleIds = solutionDetails.map(({ solution }) => {
        // Extract module identifier from solution title or demoUrl
        if (solution.demoUrl) {
          // Extract from URL like /demo/module-name.html
          const match = solution.demoUrl.match(/\/demo\/([^/]+)\.html/);
          if (match) return match[1];
        }
        // Fallback: convert title to kebab-case
        return solution.title.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '');
      }).filter(Boolean);
      
      const combinedDemoUrl = `/demo/pipeline-demo.html?modules=${moduleIds.join(',')}`;
      window.open(combinedDemoUrl, '_blank');
    } else {
      alert('No modules selected. Please select modules from the pipeline first.');
    }
  };

  return (
    <section className="pipeline-view-section">
      <div className="container">
        <div className="pipeline-header">
          <button className="back-button" onClick={onBack}>
            ← Back to Pipelines
          </button>
          <div className="pipeline-info">
            <h1 className="pipeline-title">{pipeline.name}</h1>
            <div className="pipeline-meta">
              <span className="pipeline-category">{pipeline.category}</span>
              <span className="pipeline-date">
                Created {new Date(pipeline.createdAt).toLocaleDateString()}
                {pipeline.updatedAt && pipeline.updatedAt !== pipeline.createdAt && (
                  <span> • Updated {new Date(pipeline.updatedAt).toLocaleDateString()}</span>
                )}
              </span>
            </div>
          </div>
          {onEdit && (
            <button className="cta secondary edit-pipeline-btn" onClick={onEdit}>
              ✏️ Edit Pipeline
            </button>
          )}
        </div>

        <div className="pipeline-flow-container">
          <div className="pipeline-flow-header">
            <div>
              <h2>Continuous Pipeline Flow ({pipeline.solutions.length} modules)</h2>
              <p className="pipeline-flow-description">
                All selected modules connected in a continuous zigzag flow pattern.
              </p>
            </div>
            <button className="cta primary" onClick={handleDemoAllModules}>
              Demo All Modules
            </button>
          </div>
          <div className="pipeline-flow-continuous" ref={containerRef}>
            {solutionDetails.map(({ solution, phase }, displayIdx) => {
              // Calculate actual index in baseSolutionDetails for numbering
              const actualIdx = baseSolutionDetails.findIndex(
                item => item.solution.title === solution.title && 
                item.phase.id === phase.id
              );
              const moduleNumber = actualIdx >= 0 ? actualIdx + 1 : displayIdx + 1;
              
              // Calculate row and position in row
              const rowIndex = Math.floor(displayIdx / itemsPerRow);
              const positionInRow = displayIdx % itemsPerRow;
              const isLast = displayIdx === solutionDetails.length - 1;
              const isLastRow = rowIndex === Math.floor((solutionDetails.length - 1) / itemsPerRow);
              
              // Determine direction: odd rows (0-indexed) go left-to-right, even rows go right-to-left
              const isReversedRow = rowIndex % 2 === 1;
              
              // Calculate actual row size (last row might be shorter)
              const rowStartIdx = rowIndex * itemsPerRow;
              const rowEndIdx = Math.min(rowStartIdx + itemsPerRow - 1, solutionDetails.length - 1);
              const actualRowSize = rowEndIdx - rowStartIdx + 1;
              
              // In reversed rows: position 0 is leftmost (end of flow), position (actualRowSize-1) is rightmost (start of flow)
              // In normal rows: position 0 is leftmost (start of flow), position (actualRowSize-1) is rightmost (end of flow)
              const isLastInRow = isReversedRow
                ? positionInRow === 0  // Leftmost position is the end in reversed row
                : positionInRow === actualRowSize - 1; // Rightmost position is the end in normal row
              
              const isFirstInRow = isReversedRow
                ? positionInRow === actualRowSize - 1  // Rightmost position is the start in reversed row
                : positionInRow === 0; // Leftmost position is the start in normal row
              
              // Show horizontal connector: 
              // - Normal row: show if not at the end (rightmost)
              // - Reversed row: show if not at the end (leftmost)
              const showHorizontalConnector = !isLast && !isLastInRow;
              
              // Show vertical connector at the end of a row (rightmost module)
              // This connects to the next row's end (which will also be rightmost due to zigzag)
              const showRowConnector = isLastInRow && !isLastRow;
              
              return (
                <React.Fragment key={`${solution.title}-${displayIdx}`}>
                  <div 
                    className={`continuous-flow-item ${isReversedRow ? 'reversed-row' : ''}`}
                    onDragOver={(e) => handleDragOver(e, displayIdx)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, displayIdx)}
                  >
                    <div 
                      className={`continuous-flow-module ${draggedIndex === displayIdx ? 'dragging' : ''} ${dragOverIndex === displayIdx ? 'drag-over' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, displayIdx)}
                      onDragEnd={handleDragEnd}
                      onClick={() => onSolutionClick(solution, phase)}
                    >
                      <div className="continuous-module-header">
                        <div className="continuous-module-number">{moduleNumber}</div>
                        <div className="continuous-module-content">
                          <div className="continuous-module-category-badge">
                            {phase.phase}
                          </div>
                          <h3 className="continuous-module-title">{solution.title}</h3>
                          <p className="continuous-module-description">{solution.copy}</p>
                        </div>
                        <div className="continuous-module-icon">
                          {getModuleIcon(solution.title)}
                        </div>
                      </div>
                      <div className="drag-handle">⋮⋮</div>
                    </div>
                    {showRowConnector && (
                      <div className="row-connector">
                        <div className="row-connector-vertical"></div>
                        <div className="row-connector-horizontal"></div>
                        <div className="row-connector-arrow"></div>
                      </div>
                    )}
                  </div>
                  {showHorizontalConnector && (
                    <div className={`continuous-flow-connector ${isReversedRow ? 'reversed' : ''}`}>
                      <div className="continuous-connector-line"></div>
                      <div className="continuous-connector-arrow"></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pipelines History View
const PipelinesHistory = ({ pipelines, onPipelineSelect, onCreateNew }) => {
  return (
    <section className="pipelines-history-section">
      <div className="container">
        <div className="history-header">
          <h1>Pipeline History</h1>
          <button className="cta primary" onClick={onCreateNew}>
            + Create New Pipeline
          </button>
        </div>
        
        {pipelines.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h2>No Pipelines Yet</h2>
            <p>Create your first pipeline to get started with data modernization</p>
            <button className="cta primary" onClick={onCreateNew}>
              Create Your First Pipeline
            </button>
          </div>
        ) : (
          <div className="pipelines-grid-large">
            {pipelines.map((pipeline) => (
              <div 
                key={pipeline.id} 
                className="pipeline-card-large"
                onClick={() => onPipelineSelect(pipeline)}
              >
                <div className="pipeline-card-header">
                  <h3>{pipeline.name}</h3>
                  <span className="pipeline-card-date">
                    {new Date(pipeline.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="pipeline-card-body">
                  <div className="pipeline-card-category-badge">{pipeline.category}</div>
                  <div className="pipeline-card-stats">
                    <span className="stat-item">
                      <strong>{pipeline.solutions.length}</strong> modules
                    </span>
                  </div>
                  <div className="pipeline-card-preview">
                    <div className="preview-modules">
                      {pipeline.solutions.slice(0, 3).map((sol, idx) => (
                        <span key={idx} className="preview-module">{sol}</span>
                      ))}
                      {pipeline.solutions.length > 3 && (
                        <span className="preview-more">+{pipeline.solutions.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pipeline-card-footer">
                  <span className="view-pipeline-link">View Pipeline →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [showPipelineModal, setShowPipelineModal] = useState(false);
  const [editingPipeline, setEditingPipeline] = useState(null);
  const [pipelines, setPipelines] = useState([]);
  const [currentPipeline, setCurrentPipeline] = useState(null);
  const [showSolutionsInTechnicalOffers, setShowSolutionsInTechnicalOffers] = useState(false);

  const handleSolutionClick = (solution, phase) => {
    setSelectedSolution(solution);
    setSelectedPhase(phase);
  };

  const handleCreatePipeline = (pipeline) => {
    setPipelines(prev => [...prev, pipeline]);
    setCurrentPipeline(pipeline);
    setCurrentView('pipeline');
    setShowPipelineModal(false);
  };

  const handleUpdatePipeline = (updatedPipeline) => {
    setPipelines(prev => prev.map(p => 
      p.id === updatedPipeline.id ? updatedPipeline : p
    ));
    setCurrentPipeline(updatedPipeline);
    setShowPipelineModal(false);
    setEditingPipeline(null);
  };

  const handleEditPipeline = () => {
    setEditingPipeline(currentPipeline);
    setShowPipelineModal(true);
  };

  const handleExplore = () => {
    if (currentView === 'technical-offers') {
      setShowSolutionsInTechnicalOffers(true);
      setTimeout(() => {
        document.getElementById('discover')?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 100);
    } else {
      setCurrentView('solutions');
      setTimeout(() => {
        document.getElementById('discover')?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 100);
    }
  };

  // Reset solutions view when leaving technical offers
  useEffect(() => {
    if (currentView !== 'technical-offers') {
      setShowSolutionsInTechnicalOffers(false);
    }
  }, [currentView]);

  return (
    <>
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        pipelinesCount={pipelines.length}
        onTechnicalPhaseSelect={(phaseId) => {
          // Navigate to technical offers page
          setCurrentView('technical-offers');
          // Show solutions (like clicking Explore Solutions button)
          setShowSolutionsInTechnicalOffers(true);
          // Wait for DOM to update and phase sections to render, then scroll
          setTimeout(() => {
            const scrollToPhase = () => {
              const element = document.getElementById(phaseId);
              if (element) {
                // Calculate position accounting for fixed header
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              } else {
                // Retry if element not found yet (DOM might still be updating)
                setTimeout(scrollToPhase, 100);
              }
            };
            scrollToPhase();
          }, 500);
        }}
      />
      <main>
        {currentView === 'home' ? (
          <HomePage onViewChange={setCurrentView} />
        ) : currentView === 'insurance' ? (
          <InsuranceTemplate embedded />
        ) : currentView === 'banking' ? (
          <IndustryExperience
            initialIndustry="banking"
            solutionsByIndustry={{
              banking: categorySolutions.banking,
              insurance: categorySolutions.insurance
            }}
            onSolutionClick={handleSolutionClick}
          />
        ) : currentView === 'finance' ? (
          <IndustryExperience
            initialIndustry="finance"
            solutionsByIndustry={{
              finance: categorySolutions.finance
            }}
            onSolutionClick={handleSolutionClick}
          />
        ) : currentView === 'health-sector' ? (
          <IndustryExperience
            initialIndustry="health"
            solutionsByIndustry={{
              health: categorySolutions.healthSector
            }}
            onSolutionClick={handleSolutionClick}
          />
        ) : currentView === 'industrial-all' ? (
          <CategoryPage 
            categoryName="All Industrial Solutions"
            solutions={[
              ...categorySolutions.insurance,
              ...categorySolutions.capitalMarkets,
              ...categorySolutions.commonOffers,
              ...categorySolutions.banking,
              ...categorySolutions.finance,
              ...categorySolutions.healthSector
            ]}
            onSolutionClick={handleSolutionClick}
          />
        ) : currentView === 'capital-markets' ? (
          <CategoryPage 
            categoryName="Capital Markets"
            solutions={categorySolutions.capitalMarkets}
            onSolutionClick={handleSolutionClick}
          />
        ) : currentView === 'common-offers' ? (
          <CategoryPage 
            categoryName="Common Offers"
            solutions={categorySolutions.commonOffers}
            onSolutionClick={handleSolutionClick}
          />
        ) : currentView === 'technical-offers' ? (
          <>
            {!showSolutionsInTechnicalOffers ? (
              <>
                <Hero onExplore={handleExplore} />
                <WhatWeDo />
                <WhyWeDo />
                <HowWeSolve />
              </>
            ) : (
              <>
                <Hero onExplore={handleExplore} />
                {phases.map((p) => (
                  <PhaseSection 
                    key={p.id} 
                    phase={p}
                    onSolutionClick={handleSolutionClick}
                  />
                ))}
              </>
            )}
          </>
        ) : currentView === 'solutions' ? (
          <>
            <Hero onExplore={handleExplore} />
            {phases.map((p) => (
              <PhaseSection 
                key={p.id} 
                phase={p}
                onSolutionClick={handleSolutionClick}
              />
            ))}
          </>
        ) : currentView === 'pipelines' ? (
          <PipelinesHistory
            pipelines={pipelines}
            onPipelineSelect={(pipeline) => {
              setCurrentPipeline(pipeline);
              setCurrentView('pipeline');
            }}
            onCreateNew={() => {
              setCurrentView('solutions');
              setTimeout(() => setShowPipelineModal(true), 100);
            }}
          />
        ) : currentView === 'pipeline' ? (
          <PipelineView 
            pipeline={currentPipeline}
            onBack={() => setCurrentView('pipelines')}
            onSolutionClick={handleSolutionClick}
            onEdit={handleEditPipeline}
          />
        ) : (
          <HomePage />
        )}
      </main>
      <Footer />
      {selectedSolution && selectedPhase && (
        <SolutionModal 
          solution={selectedSolution}
          phase={selectedPhase}
          onClose={() => {
            setSelectedSolution(null);
            setSelectedPhase(null);
          }}
        />
      )}
      {showPipelineModal && (
        <PipelineModal 
          onClose={() => {
            setShowPipelineModal(false);
            setEditingPipeline(null);
          }}
          onCreate={handleCreatePipeline}
          onUpdate={handleUpdatePipeline}
          editingPipeline={editingPipeline}
        />
      )}
    </>
  );
};

// Loading component
const SolutionLoader = ({ message = 'Loading...' }) => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: '#020617',
    color: '#fff'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(0, 217, 255, 0.3)',
        borderTopColor: '#00d9ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px'
      }}></div>
      <p>{message}</p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const SolutioningApp = () => {
  const location = useLocation();
  
  // Determine which page to render based on pathname
  if (location.pathname.startsWith('/code-assistant')) {
    return (
      <Suspense fallback={<SolutionLoader message="Loading Code Assistant..." />}>
        <CodeAssistantPage />
      </Suspense>
    );
  }
  
  if (location.pathname.startsWith('/code-tracer')) {
    return (
      <Suspense fallback={<SolutionLoader message="Loading Code Tracer..." />}>
        <CodeTracerPage />
      </Suspense>
    );
  }
  
  if (location.pathname.startsWith('/data-product-designer')) {
    return (
      <Suspense fallback={<SolutionLoader message="Loading Data Product Designer..." />}>
        <DataProductDesignerPage />
      </Suspense>
    );
  }
  
  if (location.pathname.startsWith('/data-model-analyzer')) {
    return (
      <Suspense fallback={<SolutionLoader message="Loading Data Model Analyzer..." />}>
        <DataModelAnalyzerPage />
      </Suspense>
    );
  }
  
  return <App />;
};

export default SolutioningApp;
