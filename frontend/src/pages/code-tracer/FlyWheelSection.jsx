import React, { useState } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './FlyWheelSection.css'

const categories = [
  {
    id: 'challenges',
    label: 'Challenges',
    title: 'Challenges',
    content: `Organizations face significant challenges in understanding and managing their codebase and data lineage:

• Lack of visibility into code dependencies and data flow
• Difficulty tracking transformations across complex systems
• Manual processes that are time-consuming and error-prone
• Inability to understand the impact of code changes
• Limited traceability from source to target systems
• Fragmented understanding of data relationships`
  },
  {
    id: 'leveraging-ai',
    label: 'Leveraging AI',
    title: 'Leveraging AI',
    content: `Our solution leverages advanced AI and Large Language Models (LLMs) to revolutionize code tracing:

• Automated code analysis using AI-powered parsing
• Intelligent pattern recognition for data transformations
• Natural language understanding of code semantics
• Predictive mapping suggestions based on industry patterns
• Continuous learning from codebase patterns and structures
• AI-driven insights for better decision making`
  },
  {
    id: 'our-solution',
    label: 'Our Solution',
    title: 'Our Solution',
    content: `Qelyx Code Tracer provides a comprehensive solution for code and data lineage:

• Automated code parsing and analysis
• Visual lineage graphs with React Flow
• Column-level tracking and mapping
• Smart field matching between systems
• Real-time transformation tracking
• Deployment-ready implementation artifacts`
  },
  {
    id: 'outcome',
    label: 'Outcome',
    title: 'Outcome',
    content: `Organizations achieve significant benefits with Qelyx Code Tracer:

• Complete visibility into code and data lineage
• Reduced time for impact analysis and change management
• Improved data quality through better understanding
• Enhanced compliance and governance capabilities
• Faster onboarding of new team members
• Better decision-making with comprehensive insights`
  },
  {
    id: 'privacy',
    label: 'Privacy',
    title: 'Privacy',
    content: `Privacy and security are fundamental to our solution:

• Enterprise-grade security protocols
• Data encryption at rest and in transit
• Role-based access control
• Audit trails for all operations
• Compliance with industry standards
• On-premise deployment options available`
  }
]

function FlyWheelSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredSegment, setHoveredSegment] = useState(null)

  const currentCategory = categories[activeCategory]
  const segmentAngle = 360 / categories.length

  const handleSegmentClick = (index) => {
    setActiveCategory(index)
  }

  const handlePrev = () => {
    setActiveCategory((prev) => (prev - 1 + categories.length) % categories.length)
  }

  const handleNext = () => {
    setActiveCategory((prev) => (prev + 1) % categories.length)
  }

  const getSegmentColor = (index) => {
    const isActive = index === activeCategory
    // Only selected segment should be cyan
    if (isActive) {
      return 'rgb(0, 217, 255)'
    }
    return 'rgba(15, 23, 42, 0.9)'
  }

  return (
    <section className="flywheel-section">
      <div className="flywheel-container">
        <div className="flywheel-content">
          <div className="content-header">
            <div className="content-label">
              <span className="label-text">{currentCategory.label.toUpperCase()}</span>
              <div className="label-underline"></div>
            </div>
            <h2 className="content-title">{currentCategory.title}</h2>
          </div>
          <div className="content-body">
            <p className="content-text">{currentCategory.content}</p>
          </div>
          <div className="content-navigation">
            <button className="nav-button" onClick={handlePrev}>
              <LeftOutlined />
            </button>
            <button className="nav-button" onClick={handleNext}>
              <RightOutlined />
            </button>
          </div>
        </div>

        <div className="flywheel-diagram">
          <div className="diagram-wrapper">
            <svg viewBox="0 0 600 600" className="flywheel-svg">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                  <feColorMatrix in="coloredBlur" type="matrix" values="0 0.85 1 0 0  0 0.85 1 0 0  0 0.85 1 0 0  0 0 0 1 0"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <radialGradient id="segmentGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(0, 217, 255, 0.9)" />
                  <stop offset="100%" stopColor="rgba(0, 217, 255, 0.6)" />
                </radialGradient>
                <radialGradient id="innerGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(15, 23, 42, 0.98)" />
                  <stop offset="100%" stopColor="rgba(2, 6, 23, 0.95)" />
                </radialGradient>
              </defs>
            
              {categories.map((category, index) => {
                // Adjust starting angle to position segments correctly
                // Privacy at top-left, Explanation at top-right, Leveraging AI at right, etc.
                const baseOffset = -90 // Start from top
                const startAngle = (index * segmentAngle + baseOffset) * (Math.PI / 180)
                const endAngle = ((index + 1) * segmentAngle + baseOffset) * (Math.PI / 180)
                const radius = 280  // Increased outer radius for wider wings
                const innerRadius = 140  // Decreased inner radius for smaller center circle and wider wings
                const centerX = 300
                const centerY = 300

                const x1 = centerX + radius * Math.cos(startAngle)
                const y1 = centerY + radius * Math.sin(startAngle)
                const x2 = centerX + radius * Math.cos(endAngle)
                const y2 = centerY + radius * Math.sin(endAngle)
                const x3 = centerX + innerRadius * Math.cos(endAngle)
                const y3 = centerY + innerRadius * Math.sin(endAngle)
                const x4 = centerX + innerRadius * Math.cos(startAngle)
                const y4 = centerY + innerRadius * Math.sin(startAngle)

                const isActive = index === activeCategory
                const isHovered = hoveredSegment === index
                const isLeveragingAI = category.id === 'leveraging-ai'
                const midAngle = (startAngle + endAngle) / 2
                const textRadius = (radius + innerRadius) / 2
                const textX = centerX + textRadius * Math.cos(midAngle)
                const textY = centerY + textRadius * Math.sin(midAngle)

                // Only selected segment should be bright cyan with glow
                const segmentFill = isActive
                  ? 'rgb(0, 217, 255)' 
                  : 'rgba(15, 23, 42, 0.9)'
                const segmentStroke = isActive
                  ? 'rgba(0, 217, 255, 1)' 
                  : 'rgba(148, 163, 184, 0.3)'
                const segmentStrokeWidth = isActive ? 2 : 1
                const segmentFilter = isActive ? 'url(#strongGlow)' : ''

                return (
                  <g key={category.id}>
                    <path
                      d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`}
                      fill={segmentFill}
                      stroke={segmentStroke}
                      strokeWidth={segmentStrokeWidth}
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: segmentFilter,
                        opacity: isHovered && !isActive ? 0.9 : 1,
                      }}
                      onClick={() => handleSegmentClick(index)}
                      onMouseEnter={() => setHoveredSegment(index)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="segment-label"
                      fill="#ffffff"
                      fontSize={isActive ? '20' : '18'}
                      fontWeight={isActive ? '700' : '600'}
                      fontFamily="Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                      filter={isActive ? 'url(#glow)' : ''}
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onClick={() => handleSegmentClick(index)}
                      onMouseEnter={() => setHoveredSegment(index)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      {category.label}
                    </text>
                  </g>
                )
              })}

              <circle
                cx="300"
                cy="300"
                r="140"
                fill="url(#innerGradient)"
                stroke="rgba(148, 163, 184, 0.3)"
                strokeWidth={2}
                style={{
                  transition: 'all 0.4s ease',
                }}
              />
              <text
                x="300"
                y="300"
                textAnchor="middle"
                dominantBaseline="middle"
                className="center-text"
                fill="#ffffff"
                fontSize="26"
                fontWeight="800"
                letterSpacing="4"
                fontFamily="Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              >
                CODE TRACER
              </text>
            </svg>
            <div className="diagram-glow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlyWheelSection
