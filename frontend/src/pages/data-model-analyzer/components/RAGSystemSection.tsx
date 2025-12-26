import { useState } from 'react'
import { Typography, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import './RAGSystemSection.css'

const { Title, Paragraph } = Typography

interface FlywheelSegment {
  id: string
  label: string
  angle: number
  header: string
  content: {
    title: string
    subtitle?: string
    description: string
    details?: string[]
  }
}

const RAGSystemSection = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('ingestion')

  const segments: FlywheelSegment[] = [
    {
      id: 'ingestion',
      label: 'Ingestion',
      angle: 0,
      header: 'DATA INGESTION',
      content: {
        title: 'Data Ingestion',
        description: 'The system creates two distinct pipelines for processing different types of input data before storing them centrally.',
        details: [
          'Pipeline A: Image Processing (Top Branch)',
          '  • Input: Images are uploaded and stored in a Blob Store',
          '  • Processing: An LLM (Large Language Model) is used to analyse the images.',
          '  • Extraction: Instead of just simple captioning, the LLM extracts structured data: Entities, Relationships, and Cardinality. This suggests the system is building a knowledge graph or a structured metadata layer derived from visual data (e.g., understanding diagrams or charts).',
          '  • Destination: This structured data is sent to the Vector DB.',
          '',
          'Pipeline B: PDF Processing (Bottom Branch)',
          '  • Input: PDF documents are uploaded and stored in a Blob Store.',
          '  • Extraction Tool: The system uses a Python library designed to extract text, tables, and metadata from PDFs. It specifically extracts "Table, column, and alias information."',
          '  • Embedding: The extracted text is passed through LLM for Vectorization and Indexing. This model converts the text into high-dimensional vectors (numerical representations of meaning).',
          '  • Destination: These vectors are stored in the Vector DB.',
        ],
      },
    },
    {
      id: 'storage',
      label: 'Storage',
      angle: 72,
      header: 'CENTRAL STORAGE',
      content: {
        title: 'Central Storage',
        description: 'Vector DB (Tables/Collections): This is the core engine of the system. It acts as the unified storage solution that holds:',
        details: [
          '• The vector embeddings generated from the PDFs (for semantic search).',
          '• The structured entity/relationship data generated from the images.',
          '• This consolidation allows the system to link visual data with textual data.',
        ],
      },
    },
    {
      id: 'retrieval',
      label: 'Retrieval',
      angle: 144,
      header: 'RETRIEVAL & QUERYING',
      content: {
        title: 'Retrieval & Querying',
        description: 'This section handles how users interact with the stored data. The flow moves from right to left (User -> System) and then back again.',
        details: [
          '• User Interface: The user inputs Query Prompts via a screen/interface.',
          '• Orchestrator LLM: An LLM receives the user\'s prompt. It acts as the "brain" of the operation.',
          '• AI Agent Tools: The LLM utilizes specific tools to execute tasks. Based on the label "Querying, Impact Analysis, Model Comparison," this system likely does more than just search; it performs analytical reasoning.',
          '• Federated Retrieval: The agent uses this component to fetch relevant data from the Vector DB. "Federated" suggests it might be querying across multiple indices or data collections simultaneously (e.g., searching the PDF vectors and the Image metadata at the same time).',
        ],
      },
    },
    {
      id: 'outcome',
      label: 'Outcome',
      angle: 216,
      header: 'OUTCOME',
      content: {
        title: 'Outcome',
        subtitle: 'From Hidden to Actionable',
        description: '',
        details: [
          '• Eliminate Documentation Archaeology - Stop wasting hours hunting through shared drives. Find any table, relationship, or data element in seconds with natural language queries.',
          '• Accelerate Onboarding - New developers and analysts understand complex data architectures in days, not months. Your institutional knowledge becomes instantly accessible.',
          '• Enable Confident Modernization - Compare legacy models with proposed designs side-by-side. Perform impact analysis across visual and textual documentation to de-risk migration decisions.',
          '• Preserve Critical Knowledge - Decades of ER diagrams and data models become a living, searchable knowledge base—protected from retirement, turnover, and forgotten file servers.',
          '• Unify Fragmented Documentation - Bridge the gap between visual diagrams (what architects drew) and technical specs (what developers wrote). Query across both simultaneously for complete understanding.',
          '• Make Smarter Architectural Decisions - Answer "what if" questions about model changes instantly. Evaluate proposals against your entire documentation history with AI-powered analysis.',
          '',
          'The result: Your unstructured data model documentation transforms from a scattered liability into a strategic intelligence asset. Query it. Analyze it. Act on it.',
        ],
      },
    },
    {
      id: 'privacy',
      label: 'Privacy',
      angle: 288,
      header: 'PRIVACY',
      content: {
        title: 'Privacy',
        subtitle: 'End-to-End Protection',
        description: '',
        details: [
          '• Isolated Processing – Images and PDFs are processed in secure environments. Raw files never leave your designated storage (on-premise blob storage or private cloud).',
          '• Encrypted at Every Layer – Data encrypted in transit and at rest (AES-256). Vector embeddings are anonymized representations—no raw content exposed in storage.',
          '• Private Vector Database – Deploy your vector DB within your own infrastructure. All embeddings, metadata, and query results stay inside your security perimeter.',
          '• Zero External Exposure – For maximum security, run the entire system air-gapped with self-hosted AI models. No internet. No third parties. Complete isolation.',
          '• Access Control & Audit – Role-based permissions control who queries what. Comprehensive logging tracks every interaction with your documentation.',
          '• You Own the Intelligence – All extracted entities, relationships, and embeddings are your intellectual property. No retention, no training on your data, no exceptions.',
          '• Data Processing Agreements – Contractual guarantees that your architectural diagrams and technical specs remain confidential and protected.',
        ],
      },
    },
  ]

  const selectedSegmentData = segments.find((s) => s.id === selectedSegment)
  const selectedContent = selectedSegmentData?.content
  const selectedHeader = selectedSegmentData?.header

  const currentIndex = segments.findIndex((s) => s.id === selectedSegment)

  const handlePrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : segments.length - 1
    setSelectedSegment(segments[prevIndex].id)
  }

  const handleNext = () => {
    const nextIndex = currentIndex < segments.length - 1 ? currentIndex + 1 : 0
    setSelectedSegment(segments[nextIndex].id)
  }

  const getSegmentPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180
    const x = Math.cos(radian) * radius
    const y = Math.sin(radian) * radius
    return { x, y }
  }

  return (
    <div className="rag-system-section">
      <div className="rag-container">
        <div className="rag-header">
          <Title level={2} className="rag-title">
            Multi-Modal Retrieval-Augmented Generation (RAG) System
          </Title>
          <Paragraph className="rag-subtitle">
            It is designed to ingest complex unstructured data models (images and PDFs), convert them into searchable formats (vectors and structured metadata), and allow users to perform sophisticated queries and analysis using AI agents.
          </Paragraph>
        </div>

        <div className="rag-content">
          <div className="rag-text-panel">
            {selectedContent && selectedHeader && (
              <div className="content-wrapper">
                <div className="content-header-label">{selectedHeader}</div>
                <Title level={2} className="content-title">
                  {selectedContent.title}
                </Title>
                {selectedContent.subtitle && (
                  <Title level={4} className="content-subtitle">
                    {selectedContent.subtitle}
                  </Title>
                )}
                {selectedContent.description && (
                  <Paragraph className="content-description">
                    {selectedContent.description}
                  </Paragraph>
                )}
                {selectedContent.details && (
                  <div className="content-details">
                    {selectedContent.details.map((detail, index) => (
                      <Paragraph key={index} className="detail-item">
                        {detail}
                      </Paragraph>
                    ))}
                  </div>
                )}
                <div className="navigation-arrows">
                  <Button
                    type="text"
                    icon={<LeftOutlined />}
                    onClick={handlePrevious}
                    className="nav-arrow-btn"
                  />
                  <Button
                    type="text"
                    icon={<RightOutlined />}
                    onClick={handleNext}
                    className="nav-arrow-btn"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="rag-flywheel-panel">
            <div className="flywheel-container">
              <svg
                className="flywheel-svg"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%' }}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Outer ring segments */}
                {segments.map((segment) => {
                  const isSelected = segment.id === selectedSegment
                  const startAngle = segment.angle - 36
                  const endAngle = segment.angle + 36
                  const innerRadius = 100
                  const outerRadius = 240

                  const startAngleRad = (startAngle * Math.PI) / 180
                  const endAngleRad = (endAngle * Math.PI) / 180

                  const centerX = 250
                  const centerY = 250
                  const x1 = centerX + Math.cos(startAngleRad) * innerRadius
                  const y1 = centerY + Math.sin(startAngleRad) * innerRadius
                  const x2 = centerX + Math.cos(startAngleRad) * outerRadius
                  const y2 = centerY + Math.sin(startAngleRad) * outerRadius
                  const x3 = centerX + Math.cos(endAngleRad) * outerRadius
                  const y3 = centerY + Math.sin(endAngleRad) * outerRadius
                  const x4 = centerX + Math.cos(endAngleRad) * innerRadius
                  const y4 = centerY + Math.sin(endAngleRad) * innerRadius

                  const largeArc = endAngle - startAngle > 180 ? 1 : 0

                  const outerPath = `M ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1} Z`

                  // Position label in the middle of the segment
                  const labelRadius = (innerRadius + outerRadius) / 2
                  const labelPos = getSegmentPosition(segment.angle, labelRadius)
                  const labelX = centerX + labelPos.x
                  const labelY = centerY + labelPos.y

                  return (
                    <g key={segment.id}>
                      <path
                        d={outerPath}
                        className={`flywheel-segment ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedSegment(segment.id)}
                        style={{ cursor: 'pointer' }}
                      />
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`segment-label ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedSegment(segment.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {segment.label}
                      </text>
                    </g>
                  )
                })}

                {/* Center circle */}
                <circle
                  cx="250"
                  cy="250"
                  r="85"
                  className="center-circle"
                />
                <text
                  x="250"
                  y="250"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="center-text"
                >
                  DATA MODEL
                  <tspan x="250" dy="18">ANALYZER</tspan>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RAGSystemSection

