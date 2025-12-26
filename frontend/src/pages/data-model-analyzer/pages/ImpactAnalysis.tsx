import { useState } from 'react'
import { Card, Select, Button, Table, Tag, Typography, Space, Tabs, Progress, message } from 'antd'
import { BarChartOutlined, WarningOutlined, CheckCircleOutlined, DownloadOutlined } from '@ant-design/icons'
import { aiService } from '../services/aiService'
import { downloadAsCSV, downloadAsJSON } from '../utils/downloadUtils'
import './ImpactAnalysis.css'

const { Title, Paragraph } = Typography
const { Option } = Select

interface ImpactItem {
  key: string
  entity: string
  type: 'table' | 'column' | 'relationship'
  impact: 'high' | 'medium' | 'low'
  affectedEntities: number
  description: string
}

interface ImpactSummary {
  totalAffected: number
  highImpact: number
  mediumImpact: number
  lowImpact: number
  recommendations: string[]
}

const ImpactAnalysis = () => {
  const [selectedEntity, setSelectedEntity] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [impactData, setImpactData] = useState<ImpactItem[]>([])
  const [summary, setSummary] = useState<ImpactSummary | null>(null)

  const mockEntities = [
    'Customer',
    'Order',
    'Product',
    'Payment',
    'Shipping',
    'Inventory',
  ]

  const handleAnalyze = async () => {
    if (!selectedEntity) {
      message.warning('Please select an entity to analyze')
      return
    }

    setLoading(true)
    try {
      const analysis = await aiService.analyzeImpact(selectedEntity)
      
      const impactItems: ImpactItem[] = analysis.affectedEntities.map((entity: any, idx: number) => ({
        key: `${idx}`,
        entity: entity.name,
        type: entity.type,
        impact: entity.impact,
        affectedEntities: entity.dependentCount,
        description: entity.description,
      }))

      setImpactData(impactItems)
      setSummary(analysis.summary)
      message.success('Impact analysis completed')
    } catch (error) {
      message.error('Failed to analyze impact. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'Entity',
      dataIndex: 'entity',
      key: 'entity',
      render: (text: string) => <span style={{ color: 'rgb(0, 217, 255)' }}>{text}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'table' ? 'blue' : type === 'column' ? 'cyan' : 'purple'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Impact Level',
      dataIndex: 'impact',
      key: 'impact',
      render: (impact: string) => {
        const color = impact === 'high' ? 'red' : impact === 'medium' ? 'orange' : 'green'
        const icon = impact === 'high' ? <WarningOutlined /> : <CheckCircleOutlined />
        return (
          <Tag color={color} icon={icon}>
            {impact.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: 'Affected Entities',
      dataIndex: 'affectedEntities',
      key: 'affectedEntities',
      render: (count: number) => <span style={{ fontWeight: 600 }}>{count}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ]

  const tabItems = [
    {
      key: 'overview',
      label: 'Overview',
      children: (
        <div>
          {summary && (
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card>
                <Title level={5}>Impact Summary</Title>
                <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: 16 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>Total Affected Entities</span>
                      <span style={{ fontWeight: 600, color: 'rgb(0, 217, 255)' }}>
                        {summary.totalAffected}
                      </span>
                    </div>
                    <Progress
                      percent={100}
                      strokeColor={{
                        '0%': '#f5222d',
                        '50%': '#faad14',
                        '100%': '#52c41a',
                      }}
                      showInfo={false}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
                    <div>
                      <Tag color="red" style={{ fontSize: 14, padding: '4px 12px' }}>
                        High: {summary.highImpact}
                      </Tag>
                    </div>
                    <div>
                      <Tag color="orange" style={{ fontSize: 14, padding: '4px 12px' }}>
                        Medium: {summary.mediumImpact}
                      </Tag>
                    </div>
                    <div>
                      <Tag color="green" style={{ fontSize: 14, padding: '4px 12px' }}>
                        Low: {summary.lowImpact}
                      </Tag>
                    </div>
                  </div>
                </Space>
              </Card>

              {summary.recommendations.length > 0 && (
                <Card>
                  <Title level={5}>Recommendations</Title>
                  <ul style={{ marginTop: 16, paddingLeft: 20 }}>
                    {summary.recommendations.map((rec, idx) => (
                      <li key={idx} style={{ marginBottom: 8, lineHeight: 1.8 }}>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </Space>
          )}
        </div>
      ),
    },
    {
      key: 'details',
      label: 'Detailed Impact',
      children: (
        <Table
          columns={columns}
          dataSource={impactData}
          pagination={{ pageSize: 10 }}
          loading={loading}
        />
      ),
    },
  ]

  return (
    <div className="impact-analysis">
      <div className="page-header">
        <Title level={2}>Impact Analysis</Title>
        <Paragraph>
          Analyze the impact of changes to your data model. Understand dependencies,
          affected entities, and get recommendations before making modifications.
        </Paragraph>
      </div>

      <Card className="analysis-controls">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <label className="input-label">Select Entity to Analyze</label>
            <Select
              style={{ width: '100%' }}
              placeholder="Choose a table, column, or relationship"
              value={selectedEntity}
              onChange={setSelectedEntity}
              size="large"
            >
              {mockEntities.map((entity) => (
                <Option key={entity} value={entity}>
                  {entity}
                </Option>
              ))}
            </Select>
          </div>
          <Button
            type="primary"
            icon={<BarChartOutlined />}
            onClick={handleAnalyze}
            loading={loading}
            size="large"
            block
          >
            Analyze Impact
          </Button>
        </Space>
      </Card>

      {(impactData.length > 0 || summary) && (
        <Card 
          className="results-card"
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Impact Analysis Results</span>
              <Space>
                <Button
                  type="text"
                  icon={<DownloadOutlined />}
                  size="small"
                  onClick={() => {
                    const dataToDownload = {
                      summary,
                      impactData,
                      timestamp: new Date().toISOString(),
                    }
                    downloadAsJSON(dataToDownload, `impact-analysis-${selectedEntity}-${Date.now()}`)
                  }}
                  title="Download as JSON"
                >
                  JSON
                </Button>
                {impactData.length > 0 && (
                  <Button
                    type="text"
                    icon={<DownloadOutlined />}
                    size="small"
                    onClick={() => downloadAsCSV(impactData, `impact-analysis-${selectedEntity}-${Date.now()}`)}
                    title="Download as CSV"
                  >
                    CSV
                  </Button>
                )}
              </Space>
            </div>
          }
        >
          <Tabs items={tabItems} />
        </Card>
      )}
    </div>
  )
}

export default ImpactAnalysis

