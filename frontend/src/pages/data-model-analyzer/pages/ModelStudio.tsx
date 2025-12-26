import { useState, useEffect } from 'react'
import { Layout, Card, Upload, Button, Table, Input, Select, Space, Typography, message, Divider, Tag } from 'antd'
import { 
  UploadOutlined, 
  CloudUploadOutlined, 
  FileTextOutlined, 
  PictureOutlined,
  SendOutlined,
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  FolderOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { downloadChatHistory, downloadAsCSV } from '../utils/downloadUtils'
import { projectService, Project, Model } from '../services/projectService'
import ProjectManager from '../components/ProjectManager'
import type { UploadProps } from 'antd'
// @ts-ignore - Vite handles image imports with spaces in filenames
import page1Image from '../Page 1.png'
import './ModelStudio.css'

const { Content, Sider } = Layout
const { TextArea } = Input
const { Option } = Select
const { Title, Paragraph } = Typography


interface ExtractedContent {
  key: string
  sourceEntity: string
  targetEntity: string
  relationship: string
  cardinality: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const ModelStudio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<Model | null>(null)
  const [isProjectManagerVisible, setIsProjectManagerVisible] = useState(false)
  const [analysisMode, setAnalysisMode] = useState<'query' | 'impact' | null>(null)
  const [extractedContent, setExtractedContent] = useState<ExtractedContent[]>([])
  const [chatMode, setChatMode] = useState<'query' | 'impact'>('query')
  const [selectedLLM, setSelectedLLM] = useState<string>('azure-openai')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentQuery, setCurrentQuery] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{ id: string; title: string; messages: ChatMessage[] }>>([
    {
      id: '1',
      title: 'Can you tell me about BIL_ACCOUNT entity table?',
      messages: [],
    },
  ])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  useEffect(() => {
    if (selectedDocument) {
      // Load extracted content for selected document
      loadExtractedContent(selectedDocument.id)
      // Load chat history for selected document
      loadChatHistory(selectedDocument.id)
      // Auto-start analysis if mode is set
      if (analysisMode) {
        // Analysis will start automatically
      }
    }
  }, [selectedDocument, analysisMode])

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setSelectedDocument(null)
    setAnalysisMode(null)
    message.success(`Selected project: ${project.name}`)
  }

  const handleModelSelect = (model: Model, mode: 'query' | 'impact') => {
    setSelectedDocument(model)
    setAnalysisMode(mode)
    setChatMode(mode)
    message.success(`Starting ${mode === 'query' ? 'Query' : 'Impact Analysis'} mode for ${model.name}`)
  }

  const loadExtractedContent = (_docId: string) => {
    // Mock extracted content - in production, this would come from an API
    const mockContent: ExtractedContent[] = [
      {
        key: '1',
        sourceEntity: 'BIL_ACCOUNT',
        targetEntity: 'BIL_INV_POL_DTL',
        relationship: 'BIL_INV_POL_DTL summarizes activity for BIL_ACCOUNT (is summarized by)',
        cardinality: '1:M (One-to-Many)',
      },
      {
        key: '2',
        sourceEntity: 'BIL_INV_POL',
        targetEntity: 'BIL_INV_POL_DTL',
        relationship: 'BIL_INV_POL creates BIL_INV_POL_DTL (is created by)',
        cardinality: '1:M (One-to-Many)',
      },
      {
        key: '3',
        sourceEntity: 'BIL_INV_POL',
        targetEntity: 'BIL_INV_DTL',
        relationship: 'BIL_INV_POL provides detail to / summarizes BIL_INV_DTL',
        cardinality: '1:M (One-to-Many)',
      },
      {
        key: '4',
        sourceEntity: 'BIL_INV_TTY_ACT',
        targetEntity: 'BIL_INV_POL',
        relationship: 'BIL_INV_TTY_ACT provides detail to / summarizes BIL_INV_POL',
        cardinality: '1:M (One-to-Many)',
      },
      {
        key: '5',
        sourceEntity: 'BIL_INV_CRG_DTL',
        targetEntity: 'BIL_CRG_AMOUNTS',
        relationship: 'BIL_INV_CRG_DTL invoices / is invoiced by BIL_CRG_AMOUNTS',
        cardinality: '1:M (One-to-Many)',
      },
    ]
    setExtractedContent(mockContent)
  }

  const loadChatHistory = (docId: string) => {
    // Load chat history for the selected document
    // In production, this would fetch from API based on docId
    // For now, we'll use the existing chat history
    if (chatHistory.length > 0) {
      setSelectedChatId(chatHistory[0].id)
      setChatMessages(chatHistory[0].messages)
    } else {
      // Create a new chat if none exists
      const newChat = {
        id: Date.now().toString(),
        title: `Chat for ${docId}`,
        messages: [],
      }
      setChatHistory([newChat])
      setSelectedChatId(newChat.id)
      setChatMessages([])
    }
  }


  const handleUpload: UploadProps['customRequest'] = async (options) => {
    if (!selectedProject) {
      message.warning('Please select a project first')
      return
    }

    const { file, onSuccess } = options
    try {
      const newModel = await projectService.addModelToProject(selectedProject.id, {
        name: (file as File).name,
        type: (file as File).name.endsWith('.json') ? 'json' : 
              (file as File).name.endsWith('.pdf') ? 'pdf' : 'image',
        uploadDate: new Date().toISOString(),
        url: (file as File).name.includes('jpg') || (file as File).name.includes('png') ? page1Image : undefined,
      })
      
      // Refresh project to get updated models
      const updatedProject = await projectService.getProjectById(selectedProject.id)
      if (updatedProject) {
        setSelectedProject(updatedProject)
      }
      
      onSuccess?.(newModel)
      message.success('File uploaded successfully to project')
    } catch (error) {
      message.error('Failed to upload file')
      console.error(error)
    }
  }

  const handleSendQuery = async () => {
    if (!currentQuery.trim()) {
      message.warning('Please enter a query')
      return
    }

    if (!selectedDocument) {
      message.warning('Please select a document first')
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

    // Update chat history
    if (selectedChatId) {
      const updatedHistory = chatHistory.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: updatedMessages, title: chat.title === 'New Chat' ? queryText.substring(0, 50) : chat.title }
          : chat
      )
      setChatHistory(updatedHistory)
    }

    // Simulate AI response based on mode
    setTimeout(() => {
      let responseContent = ''
      if (chatMode === 'query') {
        responseContent = `Based on the ${selectedDocument.name} model, I found the following information related to your query: "${queryText}". The BIL_ACCOUNT entity is a central table that connects to multiple other entities through various relationships. It has one-to-many relationships with BIL_INV_POL_DTL, BIL_PRM_SCHEDULE, and other billing-related tables.`
      } else {
        responseContent = `Impact Analysis for: "${queryText}"\n\n**Impact Level:** Medium\n\n**Affected Components:**\n- Entities: The change will affect related tables\n- Relationships: Dependencies may need updates\n- APIs: Endpoints using this entity will require modifications\n- Reports: Reporting systems may need adjustments\n\n**Recommendations:**\n1. Review all dependent entities before making changes\n2. Update foreign key constraints\n3. Test changes in a staging environment\n4. Notify downstream systems about the modification`
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      }
      const finalMessages = [...updatedMessages, assistantMessage]
      setChatMessages(finalMessages)

      // Update chat history with assistant response
      if (selectedChatId) {
        const finalHistory = chatHistory.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: finalMessages }
            : chat
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

  const uploadProps: UploadProps = {
    customRequest: handleUpload,
    showUploadList: false,
    accept: '.jpg,.jpeg,.png,.webp,.json,.pdf,.txt',
  }

  return (
    <Layout className="model-studio-layout">
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
        {/* Project Selection Header */}
        <Card className="project-header-card">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title level={3} style={{ margin: 0, color: 'rgb(0, 217, 255)' }}>Model Studio</Title>
              <Button
                type="primary"
                icon={<SettingOutlined />}
                onClick={() => setIsProjectManagerVisible(true)}
              >
                Manage Projects
              </Button>
            </div>
            {selectedProject ? (
              <div>
                <Space>
                  <Tag color="cyan" icon={<FolderOutlined />} style={{ fontSize: 14, padding: '4px 12px' }}>
                    {selectedProject.name}
                  </Tag>
                  <Button type="link" onClick={() => setSelectedProject(null)}>
                    Change Project
                  </Button>
                </Space>
                <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
                  {selectedProject.description}
                </Paragraph>
                {selectedProject.externalResources && selectedProject.externalResources.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <span style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: 12 }}>External Resources: </span>
                    {selectedProject.externalResources.map((res) => (
                      <Tag key={res.id} style={{ marginLeft: 4 }}>{res.name}</Tag>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Paragraph style={{ color: 'rgb(0, 217, 255)' }}>Select a project to start analyzing models, or create a new project.</Paragraph>
                <Button
                  type="primary"
                  icon={<FolderOutlined />}
                  onClick={() => setIsProjectManagerVisible(true)}
                >
                  Select or Create Project
                </Button>
              </div>
            )}
          </Space>
        </Card>

        {!selectedProject ? (
          <Card>
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <FolderOutlined style={{ fontSize: 64, color: 'rgba(148, 163, 184, 0.5)', marginBottom: 16 }} />
              <Title level={4} style={{ color: 'rgb(0, 217, 255)' }}>No Project Selected</Title>
              <Paragraph style={{ color: 'rgb(0, 217, 255)' }}>Please select or create a project to view and analyze models.</Paragraph>
            </div>
          </Card>
        ) : !selectedDocument ? (
          <div className="document-selection">
            <Card className="selection-card">
              <Title level={4} style={{ color: '#ffffff' }}>Project Models</Title>
              <Paragraph style={{ marginBottom: 24, color: '#ffffff' }}>
                Select a model to analyze, or upload a new model to this project
              </Paragraph>
              
              <div className="upload-options">
                <Card className="upload-option-card" hoverable>
                  <Upload {...uploadProps}>
                    <div className="upload-option-content">
                      <UploadOutlined className="upload-icon" />
                      <div className="upload-text">
                        <div className="upload-title">Upload</div>
                        <div className="upload-subtitle">png, jpg, jpeg, webp</div>
                      </div>
                    </div>
                  </Upload>
                </Card>
                <Card className="upload-option-card" hoverable>
                  <div className="upload-option-content">
                    <FileTextOutlined className="upload-icon" />
                    <div className="upload-text">
                      <div className="upload-title">Paste</div>
                      <div className="upload-subtitle">screenshot, txt</div>
                    </div>
                  </div>
                </Card>
                <Card className="upload-option-card" hoverable>
                  <div className="upload-option-content">
                    <CloudUploadOutlined className="upload-icon" />
                    <div className="upload-text">
                      <div className="upload-title">Cloud</div>
                      <div className="upload-subtitle">load from database</div>
                    </div>
                  </div>
                </Card>
                <Card className="upload-option-card" hoverable>
                  <div className="upload-option-content">
                    <PictureOutlined className="upload-icon" />
                    <div className="upload-text">
                      <div className="upload-title">External Context</div>
                      <div className="upload-subtitle">attach data</div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>

            {selectedProject.models && selectedProject.models.length > 0 && (
              <Card className="documents-card">
                <Title level={4} style={{ color: '#ffffff' }}>Project Models ({selectedProject.models.length})</Title>
                <div className="documents-grid">
                  {selectedProject.models.map((model) => (
                    <Card
                      key={model.id}
                      className="document-card"
                      hoverable
                    >
                      <div className="document-icon">
                        {model.type === 'image' && <PictureOutlined />}
                        {model.type === 'json' && <FileTextOutlined />}
                        {model.type === 'pdf' && <FileTextOutlined />}
                      </div>
                      <div className="document-name">{model.name}</div>
                      <div className="document-date">{new Date(model.uploadDate).toLocaleDateString()}</div>
                      <Space style={{ marginTop: 12, width: '100%' }} direction="vertical">
                        <Button
                          type="primary"
                          block
                          onClick={() => handleModelSelect(model, 'query')}
                        >
                          Query Mode
                        </Button>
                        <Button
                          block
                          onClick={() => handleModelSelect(model, 'impact')}
                        >
                          Impact Analysis
                        </Button>
                      </Space>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>
        ) : (
          <div className="model-view">
            <div className="model-header">
              <div>
                <Title level={4}>Loaded Model: {selectedDocument.name}</Title>
                <Tag color="cyan" style={{ marginLeft: 8 }}>
                  {analysisMode === 'query' ? 'Query Mode' : 'Impact Analysis Mode'}
                </Tag>
              </div>
              <Button onClick={() => {
                setSelectedDocument(null)
                setAnalysisMode(null)
              }}>
                Back to Models
              </Button>
            </div>
            <Card className="schema-card">
              {selectedDocument.type === 'image' && selectedDocument.url ? (
                <div className="schema-image-container">
                  <img
                    src={selectedDocument.url}
                    alt={selectedDocument.name}
                    className="schema-image"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div class="schema-placeholder">
                            <svg style="font-size: 48px; color: rgba(148, 163, 184, 0.5);" viewBox="0 0 1024 1024">
                              <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm513 560H173l256.8-314.4c4.1-5 12.4-5 16.5 0L612.9 484l127.2 151.2c4.1 5 12.4 5 16.5 0L851 512l195 352z"/>
                            </svg>
                            <p>Schema visualization will appear here</p>
                          </div>
                        `
                      }
                    }}
                  />
                </div>
              ) : selectedDocument.type === 'json' ? (
                <div className="schema-placeholder">
                  <FileTextOutlined style={{ fontSize: 48, color: 'rgba(148, 163, 184, 0.5)' }} />
                  <Paragraph>JSON data model loaded. Extracted content shown below.</Paragraph>
                </div>
              ) : (
                <div className="schema-placeholder">
                  <FileTextOutlined style={{ fontSize: 48, color: 'rgba(148, 163, 184, 0.5)' }} />
                  <Paragraph>Schema visualization will appear here</Paragraph>
                </div>
              )}
            </Card>
            <Card 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Extracted Content</span>
                  {extractedContent.length > 0 && (
                    <Button
                      type="text"
                      icon={<DownloadOutlined />}
                      size="small"
                      onClick={() => downloadAsCSV(extractedContent, `extracted-content-${selectedDocument.name}-${Date.now()}`)}
                      title="Download extracted content"
                    />
                  )}
                </div>
              }
              className="extracted-content-card"
            >
              <Table
                columns={extractedColumns}
                dataSource={extractedContent}
                pagination={{ pageSize: 5 }}
                size="small"
              />
            </Card>
          </div>
        )}
      </Content>

      {/* Fixed Chat Input at Bottom Right */}
      <div className="fixed-chat-input">
        <Card className="chat-input-card">
          <TextArea
            rows={3}
            placeholder={chatMode === 'query' ? 'Ask your question here...' : 'Describe the change you want to analyze...'}
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

      <Sider width={350} className="right-sidebar">
        <Card className="chat-card">
          <div className="chat-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Title level={5} style={{ margin: 0 }}>What do you want to analyse?</Title>
              {chatMessages.length > 0 && (
                <Button
                  type="text"
                  icon={<DownloadOutlined />}
                  size="small"
                  onClick={() => downloadChatHistory(chatMessages, `model-studio-chat-${Date.now()}`)}
                  title="Download chat history"
                />
              )}
            </div>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <label className="input-label">Mode</label>
                <Button.Group style={{ width: '100%' }}>
                  <Button
                    type={chatMode === 'query' ? 'primary' : 'default'}
                    onClick={() => setChatMode('query')}
                    style={{ flex: 1 }}
                  >
                    Query Mode
                  </Button>
                  <Button
                    type={chatMode === 'impact' ? 'primary' : 'default'}
                    onClick={() => setChatMode('impact')}
                    style={{ flex: 1 }}
                  >
                    Impact Analysis
                  </Button>
                </Button.Group>
              </div>
              <div>
                <label className="input-label">LLM Model</label>
                <Select
                  value={selectedLLM}
                  onChange={setSelectedLLM}
                  style={{ width: '100%' }}
                  className="llm-model-select"
                >
                  <Option value="azure-openai">Azure OpenAI</Option>
                  <Option value="claude-sonnet">Claude Sonnet</Option>
                  <Option value="gemini">Gemini</Option>
                  <Option value="gpt-4">GPT-4</Option>
                  <Option value="gpt-3.5">GPT-3.5 Turbo</Option>
                </Select>
              </div>
            </Space>
          </div>
          <Divider style={{ margin: '16px 0', borderColor: 'rgba(148, 163, 184, 0.3)' }} />
          <div className="chat-messages">
            {chatMessages.length === 0 ? (
              <div className="chat-empty">
                <Paragraph style={{ color: 'rgba(148, 163, 184, 0.8)', textAlign: 'center' }}>
                  Start a conversation by asking a question about the selected model
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
            placeholder={chatMode === 'query' ? 'Ask your question here...' : 'Describe the change you want to analyze...'}
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

      {/* Project Manager Modal */}
      <ProjectManager
        visible={isProjectManagerVisible}
        onClose={() => setIsProjectManagerVisible(false)}
        onSelectProject={handleProjectSelect}
        selectedProjectId={selectedProject?.id}
      />
    </Layout>
  )
}

export default ModelStudio

