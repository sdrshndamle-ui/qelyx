import { useState, useEffect } from 'react'
import { Layout, Card, Select, Table, Input, Button, Space, Typography, Divider, Tag, message, Tabs } from 'antd'
import { 
  SendOutlined,
  SearchOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  SwapOutlined,
  DownloadOutlined
} from '@ant-design/icons'
import { downloadAsJSON, downloadChatHistory } from '../utils/downloadUtils'
import { projectService } from '../services/projectService'
import { auditService } from '../services/auditService'
import { Modal } from 'antd'
import './ModelCompare.css'

const { Content, Sider } = Layout
const { TextArea } = Input
const { Option } = Select
const { Title, Paragraph } = Typography

interface Model {
  id: string
  name: string
  type: 'image' | 'json' | 'pdf'
  uploadDate: string
  entities?: string[]
  columns?: Array<{ table: string; column: string; type: string }>
}

interface ExtractedContent {
  key: string
  sourceEntity: string
  targetEntity: string
  relationship: string
  cardinality: string
}

interface ComparisonResult {
  similar: Array<{ name: string; type: string }>
  distinct: Array<{ name: string; type: string; model: 'model1' | 'model2' }>
}

interface Recommendation {
  id: string
  type: 'table' | 'column'
  name: string
  sourceModel: string
  targetModel: string
  description: string
  status: 'pending' | 'accepted' | 'rejected' | 'review'
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const ModelCompare = () => {
  const [model1, setModel1] = useState<string>('')
  const [model2, setModel2] = useState<string>('')
  const [comparisonLevel, setComparisonLevel] = useState<'table' | 'column'>('table')
  const [models] = useState<Model[]>([
    {
      id: '1',
      name: 'My_new_ER_Diagram_Extracted.json',
      type: 'json',
      uploadDate: '2025-12-04 12:56:22',
      entities: ['BIL_ACCOUNT', 'BIL_INV_POL', 'BIL_INV_DTL', 'CLIENT_TAB'],
      columns: [
        { table: 'BIL_ACCOUNT', column: 'account_id', type: 'BIGINT' },
        { table: 'BIL_ACCOUNT', column: 'client_id', type: 'BIGINT' },
        { table: 'BIL_ACCOUNT', column: 'balance', type: 'DECIMAL' },
      ],
    },
    {
      id: '2',
      name: 'My_new_ER_Diagram.jpg',
      type: 'image',
      uploadDate: '2025-11-27 07:54:37',
      entities: ['BIL_ACCOUNT', 'BIL_INV_POL', 'BIL_POLICY', 'ORDER_TAB'],
      columns: [
        { table: 'BIL_ACCOUNT', column: 'account_id', type: 'BIGINT' },
        { table: 'BIL_ACCOUNT', column: 'account_number', type: 'VARCHAR' },
        { table: 'BIL_ACCOUNT', column: 'status', type: 'VARCHAR' },
      ],
    },
    {
      id: '3',
      name: 'BillingAccount.jpg',
      type: 'image',
      uploadDate: '2025-12-03 14:28:21',
      entities: ['BIL_ACCOUNT', 'BIL_INV_POL_DTL', 'BIL_CRG_AMOUNTS', 'BIL_POLICY'],
      columns: [
        { table: 'BIL_ACCOUNT', column: 'account_id', type: 'BIGINT' },
        { table: 'BIL_ACCOUNT', column: 'client_id', type: 'BIGINT' },
        { table: 'BIL_ACCOUNT', column: 'created_date', type: 'TIMESTAMP' },
      ],
    },
  ])
  const [model1Data, setModel1Data] = useState<Model | null>(null)
  const [model2Data, setModel2Data] = useState<Model | null>(null)
  const [extractedContent1, setExtractedContent1] = useState<ExtractedContent[]>([])
  const [extractedContent2, setExtractedContent2] = useState<ExtractedContent[]>([])
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentQuery, setCurrentQuery] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{ id: string; title: string; messages: ChatMessage[] }>>([
    {
      id: '1',
      title: 'Compare BIL_ACCOUNT in both models',
      messages: [],
    },
  ])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  useEffect(() => {
    if (model1) {
      const selected = models.find((m) => m.id === model1)
      setModel1Data(selected || null)
      if (selected) {
        loadExtractedContent(selected.id, 'model1')
      }
    }
  }, [model1])

  useEffect(() => {
    if (model2) {
      const selected = models.find((m) => m.id === model2)
      setModel2Data(selected || null)
      if (selected) {
        loadExtractedContent(selected.id, 'model2')
      }
    }
  }, [model2])

  useEffect(() => {
    if (model1Data && model2Data) {
      performComparison()
      generateRecommendations()
    }
  }, [model1Data, model2Data, comparisonLevel])

  const loadExtractedContent = (_modelId: string, side: 'model1' | 'model2') => {
    const mockContent: ExtractedContent[] = [
      {
        key: '1',
        sourceEntity: 'BIL_ACCOUNT',
        targetEntity: 'BIL_INV_POL_DTL',
        relationship: 'BIL_INV_POL_DTL summarizes activity for BIL_ACCOUNT',
        cardinality: '1:M (One-to-Many)',
      },
      {
        key: '2',
        sourceEntity: 'BIL_INV_POL',
        targetEntity: 'BIL_INV_POL_DTL',
        relationship: 'BIL_INV_POL creates BIL_INV_POL_DTL',
        cardinality: '1:M (One-to-Many)',
      },
      {
        key: '3',
        sourceEntity: 'BIL_INV_POL',
        targetEntity: 'BIL_INV_DTL',
        relationship: 'BIL_INV_POL provides detail to BIL_INV_DTL',
        cardinality: '1:M (One-to-Many)',
      },
    ]

    if (side === 'model1') {
      setExtractedContent1(mockContent)
    } else {
      setExtractedContent2(mockContent)
    }
  }

  const performComparison = () => {
    if (!model1Data || !model2Data) return

    let similar: Array<{ name: string; type: string }> = []
    let distinct: Array<{ name: string; type: string; model: 'model1' | 'model2' }> = []

    if (comparisonLevel === 'table') {
      const entities1 = model1Data.entities || []
      const entities2 = model2Data.entities || []
      const common = entities1.filter((e) => entities2.includes(e))
      similar = common.map((e) => ({ name: e, type: 'table' }))
      distinct = [
        ...entities1.filter((e) => !entities2.includes(e)).map((e) => ({ name: e, type: 'table', model: 'model1' as const })),
        ...entities2.filter((e) => !entities1.includes(e)).map((e) => ({ name: e, type: 'table', model: 'model2' as const })),
      ]
    } else {
      const cols1 = model1Data.columns || []
      const cols2 = model2Data.columns || []
      const commonCols = cols1.filter((c1) => cols2.some((c2) => c2.table === c1.table && c2.column === c1.column))
      similar = commonCols.map((c) => ({ name: `${c.table}.${c.column}`, type: 'column' }))
      distinct = [
        ...cols1
          .filter((c1) => !cols2.some((c2) => c2.table === c1.table && c2.column === c1.column))
          .map((c) => ({ name: `${c.table}.${c.column}`, type: 'column', model: 'model1' as const })),
        ...cols2
          .filter((c2) => !cols1.some((c1) => c1.table === c2.table && c1.column === c2.column))
          .map((c) => ({ name: `${c.table}.${c.column}`, type: 'column', model: 'model2' as const })),
      ]
    }

    setComparisonResult({ similar, distinct })
  }

  const generateRecommendations = () => {
    if (!model1Data || !model2Data || !comparisonResult) return

    const recs: Recommendation[] = []

    comparisonResult.distinct.forEach((item) => {
      if (item.model === 'model2') {
        recs.push({
          id: Date.now().toString() + Math.random(),
          type: item.type as 'table' | 'column',
          name: item.name,
          sourceModel: model2Data.name,
          targetModel: model1Data.name,
          description: `Add ${item.type} "${item.name}" from ${model2Data.name} to ${model1Data.name}`,
          status: 'pending',
        })
      }
    })

    setRecommendations(recs)
  }

  const handleRecommendationAction = async (recId: string, action: 'accepted' | 'rejected' | 'review') => {
    setRecommendations((prev) => {
      const updated = prev.map((rec) => (rec.id === recId ? { ...rec, status: action } : rec))
      
      // If recommendation is accepted, offer to save as Project
      if (action === 'accepted') {
        const acceptedRecs = updated.filter((r) => r.status === 'accepted')
        if (acceptedRecs.length > 0 && model1Data && model2Data) {
          // Use setTimeout to allow state to update first
          setTimeout(async () => {
            const shouldSave = await new Promise<boolean>((resolve) => {
              Modal.confirm({
                title: 'Save Amended Results as Project?',
                content: `You have ${acceptedRecs.length} accepted recommendation(s). Would you like to save the amended results as a new Project in Model Studio?`,
                okText: 'Save as Project',
                cancelText: 'Not Now',
                onOk: () => resolve(true),
                onCancel: () => resolve(false),
              })
            })

            if (shouldSave) {
              handleSaveAsProject(acceptedRecs)
            }
          }, 100)
        }
      }
      
      return updated
    })
    message.success(`Recommendation ${action}`)
    auditService.logAction('recommendation_action', { recId, action })
  }

  const handleSaveAsProject = async (acceptedRecommendations: Recommendation[]) => {
    if (!model1Data || !model2Data) return

    try {
      // Create a merged model based on accepted recommendations
      const projectName = `Merged: ${model1Data.name} + ${model2Data.name}`
      const projectDescription = `Amended model comparison results with ${acceptedRecommendations.length} accepted recommendations`

      const newProject = await projectService.createProject({
        name: projectName,
        description: projectDescription,
        userId: 'user123',
        models: [
          {
            id: model1Data.id,
            name: model1Data.name,
            type: model1Data.type,
            uploadDate: model1Data.uploadDate,
            projectId: '',
          },
          {
            id: model2Data.id,
            name: model2Data.name,
            type: model2Data.type,
            uploadDate: model2Data.uploadDate,
            projectId: '',
          },
        ],
      })

      // Store accepted recommendations in project metadata
      await projectService.updateProject(newProject.id, {
        externalResources: [
          {
            id: '1',
            name: 'Accepted Recommendations',
            type: 'file',
            description: JSON.stringify(acceptedRecommendations),
          },
        ],
      })

      auditService.logAction('project_created_from_comparison', {
        projectId: newProject.id,
        recommendations: acceptedRecommendations.length,
      })

      message.success(`Project "${projectName}" created successfully! You can now visualize it in Model Studio.`)
    } catch (error) {
      message.error('Failed to save project')
      console.error('Save project error:', error)
    }
  }

  const handleSendQuery = async () => {
    if (!currentQuery.trim()) {
      message.warning('Please enter a query')
      return
    }

    if (!model1Data || !model2Data) {
      message.warning('Please select both models first')
      return
    }

    const queryText = currentQuery
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
      timestamp: new Date(),
    }

    const updatedMessages = [...chatMessages, userMessage]
    setChatMessages(updatedMessages)
    setCurrentQuery('')

    if (selectedChatId) {
      const updatedHistory = chatHistory.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: updatedMessages, title: chat.title === 'New Chat' ? queryText.substring(0, 50) : chat.title }
          : chat
      )
      setChatHistory(updatedHistory)
    }

    setTimeout(() => {
      const responseContent = `Based on comparing ${model1Data.name} and ${model2Data.name}, I found:\n\n**Similar ${comparisonLevel}s:** ${comparisonResult?.similar.length || 0}\n**Distinct ${comparisonLevel}s:** ${comparisonResult?.distinct.length || 0}\n\n${queryText.includes('difference') ? 'The main differences are in the entity structures and relationships between the two models.' : 'Both models share common structures but have unique elements that could be merged.'}`

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      }
      const finalMessages = [...updatedMessages, assistantMessage]
      setChatMessages(finalMessages)

      if (selectedChatId) {
        const finalHistory = chatHistory.map((chat) =>
          chat.id === selectedChatId ? { ...chat, messages: finalMessages } : chat
        )
        setChatHistory(finalHistory)
      }
    }, 1500)
  }

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
    }
    setChatHistory([newChat, ...chatHistory])
    setSelectedChatId(newChat.id)
    setChatMessages([])
  }

  const handleChatSelect = (chatId: string) => {
    const chat = chatHistory.find((c) => c.id === chatId)
    if (chat) {
      setSelectedChatId(chatId)
      setChatMessages(chat.messages)
    }
  }

  const extractedColumns = [
    {
      title: 'Source Entity',
      dataIndex: 'sourceEntity',
      key: 'sourceEntity',
      render: (text: string) => <span style={{ color: 'rgb(0, 217, 255)' }}>{text}</span>,
    },
    {
      title: 'Target Entity',
      dataIndex: 'targetEntity',
      key: 'targetEntity',
      render: (text: string) => <span style={{ color: 'rgb(0, 217, 255)' }}>{text}</span>,
    },
    {
      title: 'Relationship',
      dataIndex: 'relationship',
      key: 'relationship',
    },
    {
      title: 'Cardinality',
      dataIndex: 'cardinality',
      key: 'cardinality',
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
  ]

  const comparisonColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span style={{ color: 'rgb(0, 217, 255)' }}>{text}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="cyan">{type.toUpperCase()}</Tag>,
    },
  ]

  const distinctColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span style={{ color: 'rgb(0, 217, 255)' }}>{text}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="cyan">{type.toUpperCase()}</Tag>,
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
      render: (model: string) => (
        <Tag color={model === 'model1' ? 'blue' : 'green'}>
          {model === 'model1' ? 'Model 1' : 'Model 2'}
        </Tag>
      ),
    },
  ]

  return (
    <Layout className="model-compare-layout">
      <Sider width={280} className="left-sidebar">
        <div className="sidebar-header">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="sidebar-search"
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleNewChat}
            block
            className="new-chat-btn"
          >
            New chat
          </Button>
        </div>
        <Divider style={{ margin: '16px 0', borderColor: 'rgba(148, 163, 184, 0.3)' }} />
        <div className="chat-history">
          <Title level={5} style={{ color: 'rgba(226, 232, 240, 0.78)', marginBottom: 12 }}>
            Chat History
          </Title>
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`chat-history-item ${selectedChatId === chat.id ? 'active' : ''}`}
              onClick={() => handleChatSelect(chat.id)}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </Sider>

      <Content className="main-content-area">
        <div className="compare-header">
          <Title level={2}>Model Compare</Title>
          <Paragraph>Compare two data models side-by-side and get recommendations for extending them</Paragraph>
        </div>

        <Card className="model-selector-card">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div className="model-selectors">
              <div style={{ flex: 1 }}>
                <label className="input-label">Select Model 1</label>
                <Select
                  value={model1}
                  onChange={setModel1}
                  placeholder="Choose first model"
                  style={{ width: '100%' }}
                  size="large"
                >
                  {models
                    .filter((m) => m.id !== model2)
                    .map((m) => (
                      <Option key={m.id} value={m.id}>
                        {m.name}
                      </Option>
                    ))}
                </Select>
              </div>
              <SwapOutlined style={{ fontSize: 24, color: 'rgb(0, 217, 255)', margin: '0 16px', marginTop: 32 }} />
              <div style={{ flex: 1 }}>
                <label className="input-label">Select Model 2</label>
                <Select
                  value={model2}
                  onChange={setModel2}
                  placeholder="Choose second model"
                  style={{ width: '100%' }}
                  size="large"
                >
                  {models
                    .filter((m) => m.id !== model1)
                    .map((m) => (
                      <Option key={m.id} value={m.id}>
                        {m.name}
                      </Option>
                    ))}
                </Select>
              </div>
            </div>
            <div>
              <label className="input-label">Comparison Level</label>
              <Select
                value={comparisonLevel}
                onChange={setComparisonLevel}
                style={{ width: '100%' }}
                size="large"
              >
                <Option value="table">Table Level</Option>
                <Option value="column">Column Level</Option>
              </Select>
            </div>
          </Space>
        </Card>

        {model1Data && model2Data && (
          <>
            <div className="models-display">
              <Card className="model-card" title={`Model 1: ${model1Data.name}`}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <strong>Type:</strong> {model1Data.type.toUpperCase()}
                  </div>
                  <div>
                    <strong>Upload Date:</strong> {model1Data.uploadDate}
                  </div>
                  <div>
                    <strong>Entities:</strong> {model1Data.entities?.length || 0}
                  </div>
                </Space>
              </Card>
              <Card className="model-card" title={`Model 2: ${model2Data.name}`}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div>
                    <strong>Type:</strong> {model2Data.type.toUpperCase()}
                  </div>
                  <div>
                    <strong>Upload Date:</strong> {model2Data.uploadDate}
                  </div>
                  <div>
                    <strong>Entities:</strong> {model2Data.entities?.length || 0}
                  </div>
                </Space>
              </Card>
            </div>

            <div className="extracted-content-section">
              <Card title="Extracted Content" className="extracted-card">
                <div className="side-by-side-tables">
                  <div className="table-container">
                    <Title level={5} style={{ marginBottom: 16 }}>
                      {model1Data.name}
                    </Title>
                    <Table
                      columns={extractedColumns}
                      dataSource={extractedContent1}
                      pagination={false}
                      size="small"
                    />
                  </div>
                  <div className="table-container">
                    <Title level={5} style={{ marginBottom: 16 }}>
                      {model2Data.name}
                    </Title>
                    <Table
                      columns={extractedColumns}
                      dataSource={extractedContent2}
                      pagination={false}
                      size="small"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {comparisonResult && (
              <div className="comparison-results">
                <Card title="Comparison Results" className="comparison-card">
                  <Tabs
                    items={[
                      {
                        key: 'similar',
                        label: `Similar ${comparisonLevel === 'table' ? 'Tables' : 'Columns'} (${comparisonResult.similar.length})`,
                        children: (
                          <Table
                            columns={comparisonColumns}
                            dataSource={comparisonResult.similar.map((item, idx) => ({
                              key: idx.toString(),
                              ...item,
                            }))}
                            pagination={false}
                          />
                        ),
                      },
                      {
                        key: 'distinct',
                        label: `Distinct ${comparisonLevel === 'table' ? 'Tables' : 'Columns'} (${comparisonResult.distinct.length})`,
                        children: (
                          <Table
                            columns={distinctColumns}
                            dataSource={comparisonResult.distinct.map((item, idx) => ({
                              key: idx.toString(),
                              ...item,
                            }))}
                            pagination={false}
                          />
                        ),
                      },
                    ]}
                  />
                </Card>
              </div>
            )}

            {recommendations.length > 0 && (
              <Card 
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Recommendations for Extending Models</span>
                    <Button
                      type="text"
                      icon={<DownloadOutlined />}
                      size="small"
                      onClick={() => downloadAsJSON(recommendations, `recommendations-${Date.now()}`)}
                      title="Download recommendations"
                    />
                  </div>
                }
                className="recommendations-card"
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {recommendations.map((rec) => (
                    <Card
                      key={rec.id}
                      size="small"
                      className={`recommendation-item ${rec.status}`}
                    >
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div>
                            <Tag color={rec.type === 'table' ? 'blue' : 'cyan'}>{rec.type.toUpperCase()}</Tag>
                            <strong style={{ marginLeft: 8 }}>{rec.name}</strong>
                          </div>
                          <Tag
                            color={
                              rec.status === 'accepted'
                                ? 'green'
                                : rec.status === 'rejected'
                                ? 'red'
                                : rec.status === 'review'
                                ? 'orange'
                                : 'default'
                            }
                          >
                            {rec.status.toUpperCase()}
                          </Tag>
                        </div>
                        <Paragraph style={{ margin: 0, fontSize: 13 }}>
                          {rec.description}
                        </Paragraph>
                        {rec.status === 'pending' && (
                          <Space>
                            <Button
                              type="primary"
                              icon={<CheckOutlined />}
                              size="small"
                              onClick={() => handleRecommendationAction(rec.id, 'accepted')}
                            >
                              Accept
                            </Button>
                            <Button
                              danger
                              icon={<CloseOutlined />}
                              size="small"
                              onClick={() => handleRecommendationAction(rec.id, 'rejected')}
                            >
                              Reject
                            </Button>
                            <Button
                              icon={<EyeOutlined />}
                              size="small"
                              onClick={() => handleRecommendationAction(rec.id, 'review')}
                            >
                              Review
                            </Button>
                          </Space>
                        )}
                      </Space>
                    </Card>
                  ))}
                </Space>
              </Card>
            )}
          </>
        )}
      </Content>

      <Sider width={350} className="right-sidebar">
        <Card className="chat-card">
          <div className="chat-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title level={5} style={{ margin: 0 }}>Ask questions about the comparison</Title>
              {chatMessages.length > 0 && (
                <Button
                  type="text"
                  icon={<DownloadOutlined />}
                  size="small"
                  onClick={() => downloadChatHistory(chatMessages, `model-compare-chat-${Date.now()}`)}
                  title="Download chat history"
                />
              )}
            </div>
          </div>
          <Divider style={{ margin: '16px 0', borderColor: 'rgba(148, 163, 184, 0.3)' }} />
          <div className="chat-messages">
            {chatMessages.length === 0 ? (
              <div className="chat-empty">
                <Paragraph style={{ color: 'rgba(148, 163, 184, 0.8)', textAlign: 'center' }}>
                  Start a conversation about the model comparison
                </Paragraph>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div key={msg.id} className={`chat-message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </Sider>

      {/* Fixed Chat Input at Bottom Right */}
      <div className="fixed-chat-input">
        <Card className="chat-input-card">
          <TextArea
            rows={3}
            placeholder="Ask your question about the comparison..."
            value={currentQuery}
            onChange={(e) => setCurrentQuery(e.target.value)}
            onPressEnter={(e) => {
              if (e.shiftKey) return
              e.preventDefault()
              handleSendQuery()
            }}
            className="fixed-chat-textarea"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendQuery}
            className="fixed-chat-send-btn"
          >
            Send
          </Button>
        </Card>
      </div>
    </Layout>
  )
}

export default ModelCompare

