import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { CloudUploadOutlined, DatabaseOutlined, ApiOutlined, FileTextOutlined, RocketOutlined, CheckCircleOutlined, AppstoreOutlined, BarChartOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import './DataProductDesignerHome.css'

const DataProductDesignerHome = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    {
      key: 'explanation',
      label: 'Explanation',
      title: 'Data Products Explained',
      content: 'Data products represent a paradigm shift in how organizations manage and leverage data. Instead of treating data as a byproduct, data products encapsulate reusable, well-defined assets that deliver value by making data accessible, governed, and interoperable. They are designed with discoverability, usability, and security in mind, enabling businesses to integrate them seamlessly into decision-making processes.\n\nOrganizations often face hurdles such as siloed data, duplication of efforts, inconsistent governance, and high migration costs. These challenges lead to inefficiencies, slow innovation, and increased operational overhead. Centralized models struggle to scale, while fragmented approaches fail to unlock cross-functional insights.\n\nData products address these challenges by promoting a product-driven approach. They enable enhanced decision-making, improve interoperability, and foster innovation. With standardized governance, security, and modular design, data products reduce time-to-market, ensure compliance, and create new revenue streams. Treating data as a product rather than a byproduct transforms data into a strategic asset that drives business growth.'
    },
    {
      key: 'leveraging-ai',
      label: 'Leveraging AI',
      title: 'AI - enabled data products from ecosystem insight to deployment',
      content: 'Data products succeed when organizations can do three things consistently: **know what data they have**, **agree what it means**, and **deliver it as reusable products**—with governance built in, not bolted on.\n\nOur solution accelerates that journey by combining **Large Language Models (LLMs)** with an **industry ontology** to convert fragmented metadata into a clear, standardised view of the enterprise data landscape—then translate that understanding into **actionable data product recommendations** and **deployment-ready implementation artefacts**.'
    },
    {
      key: 'outcome',
      label: 'Outcome',
      title: 'Leaders gain a faster path from data complexity to business outcomes',
      content: 'Leaders gain a faster path from data complexity to business outcomes—through:\n\n- **A single, standardised view of data supply and platform demand** across sources and targets.\n\n- **Consistent semantics and definitions** aligned to industry concepts, reducing ambiguity and rework.\n\n- **A staged, portfolio-based approach to data products** (Foundational → Enterprise → Business), enabling scalable delivery rather than one-off pipelines.\n\n- **Accelerated delivery through code generation**, shortening the path from recommendation to physicalised product.\n\nThis approach reduces time-to-value by shifting data delivery from bespoke pipelines to a **repeatable product portfolio**—improving speed, consistency, and governance simultaneously. It enables teams to scale data product delivery with confidence, while maintaining the standardisation and controls required in complex ecosystems.'
    },
    {
      key: 'our-solution',
      label: 'Our Solution',
      title: 'Our Solution Differentiator',
      content: '**Standardises metadata across systems**\n\nWe ingest metadata from multiple platforms (tables, columns, descriptions and related context) and normalise it to a consistent structure—creating a reliable foundation for discovery and decision-making.\n\n**Understands what\'s available and what consuming platforms require**\n\nThe solution connects supply to demand: what exists in the ecosystem, what target platforms need, and where the gaps are—so products are designed for real consumption patterns.\n\n**Applies industry recommendations through an ontology**\n\nBy aligning to an industry ontology, we bring shared language and consistent meaning to data—accelerating agreement across business and technology stakeholders.\n\n**Detects domains and recommends and physicalizes data products across stages**\n\nThe solution automatically identifies the most relevant business domain(s) and recommends data products across three stages: Foundational, Enterprise, Business Data Products'
    },
    {
      key: 'privacy',
      label: 'Privacy',
      title: 'Privacy & Security',
      content: 'Your data stays secure. All processing is done within your environment, ensuring compliance with enterprise-grade standards. Data is obfuscated to ensure none of the sensitive information is accessible in public domain.'
    }
  ]

  const currentSection = sections[activeSection]

  const handlePrev = () => {
    setActiveSection((prev) => (prev === 0 ? sections.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveSection((prev) => (prev === sections.length - 1 ? 0 : prev + 1))
  }

  const inputItems = [
    {
      icon: <CloudUploadOutlined />,
      title: 'Upload Metadata',
      description: 'Upload your metadata files'
    },
    {
      icon: <DatabaseOutlined />,
      title: 'Connect Database',
      description: 'Connect to data sources'
    },
    {
      icon: <ApiOutlined />,
      title: 'Configure Sources',
      description: 'Establish connections'
    }
  ]

  const outputItems = [
    {
      icon: <FileTextOutlined />,
      title: 'Generate SQL',
      description: 'Review & edit SQL scripts'
    },
    {
      icon: <RocketOutlined />,
      title: 'Deploy',
      description: 'Deploy data products'
    },
    {
      icon: <CheckCircleOutlined />,
      title: 'Complete',
      description: 'Products ready'
    }
  ]

  return (
    <div className="data-product-designer-home">
      <div className="hero-section">
        <div className="section-container">
          <h1 className="hero-title">Data Product Designer</h1>
          <p className="hero-description">
            From Metadata to Medallion—accelerate your data product strategy. Data Product Designer helps you transform raw metadata into actionable, Medallion-architecture-aligned data products—efficiently and intelligently
          </p>
          <Button 
            type="primary" 
            size="large"
            onClick={() => navigate('/data-product-designer/app')}
            className="get-started-btn"
          >
            Get Started
          </Button>
        </div>
      </div>

      <section className="workflow-visualization-section">
        <div className="workflow-visual-container" style={{ position: 'relative' }}>
          <div className="workflow-panel workflow-input-panel">
            <h3 className="panel-title">Input</h3>
            <div className="panel-items">
              {inputItems.map((item, index) => (
                <div key={index} className="workflow-item" data-index={index}>
                  <div className="workflow-item-icon">{item.icon}</div>
                  <div className="workflow-item-content">
                    <h4 className="workflow-item-title">{item.title}</h4>
                    <p className="workflow-item-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="workflow-panel workflow-center-panel">
            <div className="center-header">
              <h2 className="center-title">Data Product Designer</h2>
            </div>
            <div className="workflow-diagram">
              <div className="diagram-core">
                <div className="core-icon-top">
                  <AppstoreOutlined />
                </div>
                <div className="core-icon-bottom">
                  <BarChartOutlined />
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-arrows">
            <div className="arrow-left-to-center"></div>
            <div className="arrow-center-to-right"></div>
          </div>

          <div className="workflow-panel workflow-output-panel">
            <h3 className="panel-title">Output</h3>
            <div className="panel-items">
              {outputItems.map((item, index) => (
                <div key={index} className="workflow-item" data-index={index}>
                  <div className="workflow-item-icon">{item.icon}</div>
                  <div className="workflow-item-content">
                    <h4 className="workflow-item-title">{item.title}</h4>
                    <p className="workflow-item-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="content-section">
        <div className="content-container">
          <div className="content-layout">
            <div className="content-left">
              <div className="section-label">{currentSection.label}</div>
              <h2 className="content-title">{currentSection.title}</h2>
              <div className="content-text">
                {currentSection.content.split('\n\n').map((paragraph, i) => {
                  const trimmed = paragraph.trim()
                  if (trimmed.startsWith('- ')) {
                    const content = trimmed.substring(2)
                    return (
                      <ul key={i} className="content-bullet-list">
                        <li>
                          {content.split('**').map((part, j) => 
                            j % 2 === 1 ? <strong key={j} className="bold-blue">{part}</strong> : part
                          )}
                        </li>
                      </ul>
                    )
                  }
                  return (
                    <p key={i}>
                      {paragraph.split('**').map((part, j) => 
                        j % 2 === 1 ? <strong key={j} className="bold-blue">{part}</strong> : part
                      )}
                    </p>
                  )
                })}
              </div>
              <div className="nav-buttons">
                <button className="nav-btn" onClick={handlePrev}>
                  <LeftOutlined />
                </button>
                <button className="nav-btn" onClick={handleNext}>
                  <RightOutlined />
                </button>
              </div>
            </div>

            <div className="content-right">
              <div className="circular-diagram">
                <div className="diagram-center">
                  <div className="center-text">DATA PRODUCT<br />DESIGNER</div>
                </div>
                <svg className="diagram-svg" viewBox="0 0 400 400" width="800" height="800">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {sections.map((section, index) => {
                    const segmentAngle = 72 // 360 / 5
                    const startAngle = (index * segmentAngle - 90) * Math.PI / 180
                    const endAngle = ((index + 1) * segmentAngle - 90) * Math.PI / 180
                    const isActive = activeSection === index
                    const radius = 150
                    const innerRadius = 80
                    const centerX = 200
                    const centerY = 200
                    
                    // Calculate points for the segment
                    const x1 = centerX + innerRadius * Math.cos(startAngle)
                    const y1 = centerY + innerRadius * Math.sin(startAngle)
                    const x2 = centerX + radius * Math.cos(startAngle)
                    const y2 = centerY + radius * Math.sin(startAngle)
                    const x3 = centerX + radius * Math.cos(endAngle)
                    const y3 = centerY + radius * Math.sin(endAngle)
                    const x4 = centerX + innerRadius * Math.cos(endAngle)
                    const y4 = centerY + innerRadius * Math.sin(endAngle)
                    
                    const largeArc = segmentAngle > 180 ? 1 : 0
                    const path = `M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1} Z`
                    
                    // Label position
                    const labelAngle = (index * segmentAngle + segmentAngle / 2 - 90) * Math.PI / 180
                    const labelRadius = 115
                    const labelX = centerX + labelRadius * Math.cos(labelAngle)
                    const labelY = centerY + labelRadius * Math.sin(labelAngle)
                    const rotationAngle = 0
                    
                    // Split label into words for wrapping
                    const labelWords = section.label.split(' ')
                    const needsTwoLines = section.key === 'leveraging-ai' || section.key === 'our-solution'
                    
                    return (
                      <g key={section.key}>
                        <path
                          d={path}
                          fill={isActive ? 'rgba(0, 217, 255, 0.4)' : 'rgba(148, 163, 184, 0.2)'}
                          stroke={isActive ? 'rgb(0, 217, 255)' : 'rgba(148, 163, 184, 0.3)'}
                          strokeWidth={isActive ? 2 : 1}
                          className="diagram-segment"
                          filter={isActive ? 'url(#glow)' : ''}
                          onClick={() => setActiveSection(index)}
                          style={{ cursor: 'pointer' }}
                        />
                        <text
                          x={labelX}
                          y={labelY}
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="600"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${rotationAngle} ${labelX} ${labelY})`}
                          className="segment-label"
                        >
                          {needsTwoLines ? (
                            <>
                              <tspan x={labelX} dy="-7">{labelWords[0]}</tspan>
                              <tspan x={labelX} dy="14">{labelWords[1] || ''}</tspan>
                            </>
                          ) : (
                            section.label
                          )}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataProductDesignerHome

