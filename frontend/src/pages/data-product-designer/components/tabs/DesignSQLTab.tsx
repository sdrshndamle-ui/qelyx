import { useState } from 'react'
import { Button, Select, Input, Tabs, Tag, Checkbox, Space, Alert, Card } from 'antd'
import { SearchOutlined, DownloadOutlined, ReloadOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import './DesignSQLTab.css'

const { Option } = Select

interface CDE {
  id: string
  name: string
  rationale: string
}

interface BusinessRule {
  id: string
  name: string
  description: string
  sql?: string
}

interface DQCheck {
  id: string
  name: string
  layer: string
  severity: string
  description: string
  sql?: string
}

const DesignSQLTab = () => {
  const [targetPlatform, setTargetPlatform] = useState('databricks')
  const [rulesMode, setRulesMode] = useState('genai')
  const [showSQL, setShowSQL] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<string>('Policy & Holder Master')
  const [sqlGenerated, setSqlGenerated] = useState(false)
  const [generatedSQL, setGeneratedSQL] = useState('')

  const products = ['Policy & Holder Master', 'Coverage & Rider Detail', 'Quote & Rating Engine Output']

  const cdes: CDE[] = [
    { id: '1', name: 'policy_id', rationale: 'Marked critical by heuristics' },
    { id: '2', name: 'effective_date', rationale: 'Marked critical by heuristics' },
    { id: '3', name: 'contact_id', rationale: 'Marked critical by heuristics' },
    { id: '4', name: 'policy_number', rationale: 'Marked critical by heuristics' },
    { id: '5', name: 'expiry_date', rationale: 'Marked critical by heuristics' },
    { id: '6', name: 'created_date', rationale: 'Marked critical by heuristics' },
    { id: '7', name: 'status', rationale: 'Marked critical by heuristics' },
    { id: '8', name: 'account_id', rationale: 'Marked critical by heuristics' }
  ]

  const businessRules: BusinessRule[] = [
    { id: '1', name: 'Policy Status Validation', description: 'Policy status must be one of: Active, Inactive, Cancelled' },
    { id: '2', name: 'Date Range Validation', description: 'Effective date must be before expiry date' },
    { id: '3', name: 'Required Fields', description: 'Policy ID and Policy Number are required' }
  ]

  const dqChecks: DQCheck[] = [
    { id: '1', name: 'NOT NULL Check', layer: 'Bronze', severity: 'High', description: 'Check for null values in critical columns' },
    { id: '2', name: 'Data Type Validation', layer: 'Silver', severity: 'Medium', description: 'Validate data types match schema' },
    { id: '3', name: 'Referential Integrity', layer: 'Gold', severity: 'High', description: 'Check foreign key relationships' }
  ]

  const filteredCDEs = cdes.filter(cde => 
    cde.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cde.rationale.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleGenerateSQL = () => {
    // Generate sample SQL
    const sql = `-- Policy & Holder Master : Physicalization (Databricks Spark SQL / Delta)

-- Schema Creation
CREATE SCHEMA IF NOT EXISTS bronze;
CREATE SCHEMA IF NOT EXISTS silver;
CREATE SCHEMA IF NOT EXISTS gold;
CREATE SCHEMA IF NOT EXISTS semantic;

-- Bronze Tables (Delta)
CREATE TABLE IF NOT EXISTS bronze.policy (
  src_load_ts TIMESTAMP,
  policy_id VARCHAR(32),
  policy_number VARCHAR(20),
  status VARCHAR(20),
  effective_date DATE,
  expiry_date DATE,
  created_date TIMESTAMP,
  account_id VARCHAR(32),
  contact_id VARCHAR(32)
) USING DELTA;

CREATE TABLE IF NOT EXISTS bronze.account (
  src_load_ts TIMESTAMP,
  account_id VARCHAR(32),
  account_number VARCHAR(20),
  account_name VARCHAR(100),
  primary_contact_id VARCHAR(32),
  create_time TIMESTAMP,
  update_time TIMESTAMP
) USING DELTA;

CREATE TABLE IF NOT EXISTS bronze.contact (
  src_load_ts TIMESTAMP,
  contact_id VARCHAR(32),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20)
) USING DELTA;

-- Silver Tables (Delta)
CREATE TABLE IF NOT EXISTS silver.DP01_base USING DELTA AS
SELECT 
  p.policy_id,
  p.policy_number,
  p.status,
  p.effective_date,
  p.expiry_date,
  p.created_date,
  p.account_id,
  p.contact_id,
  a.account_number,
  a.account_name,
  c.first_name,
  c.last_name,
  c.email,
  CURRENT_TIMESTAMP() AS silver_load_ts
FROM bronze.policy p
LEFT JOIN bronze.account a ON p.account_id = a.account_id
LEFT JOIN bronze.contact c ON p.contact_id = c.contact_id
WHERE 1=0;

-- Gold Tables (Delta)
CREATE TABLE IF NOT EXISTS gold.DP01 USING DELTA AS
SELECT 
  policy_id,
  policy_number,
  status,
  effective_date,
  expiry_date,
  created_date,
  account_id,
  account_number,
  account_name,
  contact_id,
  first_name,
  last_name,
  email,
  CURRENT_TIMESTAMP() AS gold_load_ts
FROM silver.DP01_base
WHERE 1=0;`

    setGeneratedSQL(sql)
    setSqlGenerated(true)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedSQL], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedProduct.toLowerCase().replace(/\s+/g, '_')}_ddl.sql`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'cdes',
      label: `CDEs (${filteredCDEs.length})`,
      children: (
        <div className="cdes-list">
          {filteredCDEs.map(cde => (
            <Card key={cde.id} className="cde-card">
              <div className="cde-name">{cde.name}</div>
              <div className="cde-rationale">{cde.rationale}</div>
            </Card>
          ))}
        </div>
      )
    },
    {
      key: 'rules',
      label: `Business Rules (${businessRules.length})`,
      children: (
        <div className="rules-list">
          {businessRules.map(rule => (
            <Card key={rule.id} className="rule-card">
              <div className="rule-name">{rule.name}</div>
              <div className="rule-description">{rule.description}</div>
              {showSQL && rule.sql && (
                <pre className="rule-sql">{rule.sql}</pre>
              )}
            </Card>
          ))}
        </div>
      )
    },
    {
      key: 'dq',
      label: `DQ Checks (${dqChecks.length})`,
      children: (
        <div className="dq-list">
          {dqChecks.map(check => (
            <Card key={check.id} className="dq-card">
              <div className="dq-header">
                <div className="dq-name">{check.name}</div>
                <Space>
                  <Tag>{check.layer}</Tag>
                  <Tag color={check.severity === 'High' ? 'red' : check.severity === 'Medium' ? 'orange' : 'default'}>
                    {check.severity}
                  </Tag>
                </Space>
              </div>
              <div className="dq-description">{check.description}</div>
              {showSQL && check.sql && (
                <pre className="dq-sql">{check.sql}</pre>
              )}
            </Card>
          ))}
        </div>
      )
    }
  ]

  return (
    <div className="design-sql-tab">
      <div className="section-container">
        <h2 className="step-title">Step 4 - Design & SQL</h2>

        <div className="settings-bar">
          <div className="setting-item">
            <label>Target Platform:</label>
            <Select
              value={targetPlatform}
              onChange={setTargetPlatform}
              style={{ width: 250 }}
            >
              <Option value="databricks">Databricks Delta (Spark SQL)</Option>
              <Option value="snowflake">Snowflake</Option>
              <Option value="bigquery">BigQuery</Option>
            </Select>
          </div>
          <div className="setting-item">
            <label>Rules Mode:</label>
            <Select
              value={rulesMode}
              onChange={setRulesMode}
              style={{ width: 150 }}
            >
              <Option value="genai">GenAI</Option>
              <Option value="heuristic">Heuristic</Option>
            </Select>
          </div>
        </div>

        <div className="global-totals">
          <div className="total-item">
            <span className="total-label">Total CDEs:</span>
            <span className="total-value">{cdes.length}</span>
          </div>
          <div className="total-item">
            <span className="total-label">Total Business Rules:</span>
            <span className="total-value">{businessRules.length}</span>
          </div>
          <div className="total-item">
            <span className="total-label">Total DQ Checks:</span>
            <span className="total-value">{dqChecks.length}</span>
          </div>
        </div>

        <div className="design-artifacts-section">
          <div className="artifacts-header">
            <h3>Design artifacts</h3>
            <div className="artifacts-controls">
              <Input
                placeholder="Search (name, table, column, rationale, SQL)"
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: 400, marginRight: 16 }}
              />
              <Checkbox
                checked={showSQL}
                onChange={(e) => setShowSQL(e.target.checked)}
              >
                Show SQL
              </Checkbox>
            </div>
          </div>

          <div className="product-filters">
            {products.map(product => (
              <Tag
                key={product}
                className={`product-filter-tag ${selectedProduct === product ? 'active' : ''}`}
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: 'pointer' }}
              >
                {product}
              </Tag>
            ))}
          </div>

          <div className="filtered-totals">
            <div className="total-item">
              <span className="total-label">CDEs:</span>
              <span className="total-value">{filteredCDEs.length}</span>
            </div>
            <div className="total-item">
              <span className="total-label">Business Rules:</span>
              <span className="total-value">{businessRules.length}</span>
            </div>
            <div className="total-item">
              <span className="total-label">DQ Checks:</span>
              <span className="total-value">{dqChecks.length}</span>
            </div>
          </div>

          <div className="product-context">
            Product: {selectedProduct}
          </div>

          <Tabs items={tabItems} className="artifacts-tabs" />

          <div className="sql-generation-section">
            <div className="target-platform-info">
              Target platform: {targetPlatform === 'databricks' ? 'Databricks Delta (Spark SQL)' : targetPlatform}
            </div>
            <Button
              type="primary"
              size="large"
              icon={<ReloadOutlined />}
              onClick={handleGenerateSQL}
              className="generate-btn"
            >
              Generate DDL + ETL + Semantic Views
            </Button>
          </div>

          {sqlGenerated && (
            <>
              <Alert
                message="SQL generated."
                type="success"
                showIcon
                className="sql-success-alert"
              />
              <div className="sql-output-container">
                <div className="sql-output-header">
                  <h4>Generated SQL</h4>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </div>
                <pre className="sql-output">{generatedSQL}</pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DesignSQLTab

