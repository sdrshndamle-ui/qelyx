import { useState } from 'react'
import { Card, Input, Button, Table, Tag, Space, Typography, Spin, message } from 'antd'
import { SearchOutlined, SendOutlined, DownloadOutlined } from '@ant-design/icons'
import { aiService } from '../services/aiService'
import { ontologyService } from '../services/ontologyService'
import { downloadAsCSV, downloadAsJSON, downloadAsText } from '../utils/downloadUtils'
import './QueryMode.css'

const { TextArea } = Input
const { Title, Paragraph } = Typography

interface QueryResult {
  key: string
  table: string
  column: string
  type: string
  description: string
  confidence: number
  ontologyMatch: string
}

const QueryMode = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<QueryResult[]>([])
  const [analysis, setAnalysis] = useState<string>('')

  const handleQuery = async () => {
    if (!query.trim()) {
      message.warning('Please enter a query')
      return
    }

    setLoading(true)
    try {
      // Simulate AI analysis
      const aiResponse = await aiService.analyzeQuery(query)
      const ontologyMatches = await ontologyService.findMatches(query)

      // Generate results
      const queryResults: QueryResult[] = aiResponse.tables.map((table: any, idx: number) => ({
        key: `${idx}`,
        table: table.name,
        column: table.column,
        type: table.type,
        description: table.description,
        confidence: table.confidence,
        ontologyMatch: ontologyMatches.find((m: any) => m.table === table.name)?.term || 'N/A',
      }))

      setResults(queryResults)
      setAnalysis(aiResponse.analysis)
      message.success('Analysis completed successfully')
    } catch (error) {
      message.error('Failed to analyze query. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'Table',
      dataIndex: 'table',
      key: 'table',
      render: (text: string) => <span style={{ color: 'rgb(0, 217, 255)' }}>{text}</span>,
    },
    {
      title: 'Column',
      dataIndex: 'column',
      key: 'column',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="cyan">{type}</Tag>,
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (confidence: number) => {
        const color = confidence > 0.8 ? 'green' : confidence > 0.6 ? 'orange' : 'red'
        return <Tag color={color}>{Math.round(confidence * 100)}%</Tag>
      },
    },
    {
      title: 'Ontology Match',
      dataIndex: 'ontologyMatch',
      key: 'ontologyMatch',
      render: (match: string) => (
        <Tag color="blue">{match}</Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ]

  return (
    <div className="query-mode">
      <div className="page-header">
        <Title level={2}>Query Mode</Title>
        <Paragraph>
          Ask questions about your data model using natural language. Our AI analyzes your query
          and matches it against industry ontologies to provide comprehensive insights.
        </Paragraph>
      </div>

      <Card className="query-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <label className="input-label">Enter your query</label>
            <TextArea
              rows={4}
              placeholder="e.g., What tables contain customer information? Show me all date columns in the sales schema..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onPressEnter={(e) => {
                if (e.shiftKey) return
                e.preventDefault()
                handleQuery()
              }}
            />
          </div>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleQuery}
            loading={loading}
            size="large"
          >
            Analyze Query
          </Button>
        </Space>
      </Card>

      {loading && (
        <div className="loading-container">
          <Spin size="large" />
          <p>Analyzing your query with AI and Industry Ontology...</p>
        </div>
      )}

      {analysis && !loading && (
        <Card className="analysis-card">
          <Title level={4}>AI Analysis</Title>
          <Paragraph>{analysis}</Paragraph>
        </Card>
      )}

      {results.length > 0 && !loading && (
        <Card className="results-card">
          <Title level={4}>Query Results</Title>
          <Table
            columns={columns}
            dataSource={results}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      )}
    </div>
  )
}

export default QueryMode

