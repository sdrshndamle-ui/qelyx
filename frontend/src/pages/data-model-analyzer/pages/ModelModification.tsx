import { useState } from 'react'
import { Card, Form, Input, Select, Button, Table, Tag, Typography, Space, Steps, message, Modal, Checkbox } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { aiService } from '../services/aiService'
import './ModelModification.css'

const { Title, Paragraph } = Typography
const { Option } = Select
const { TextArea } = Input

interface TableDefinition {
  key: string
  name: string
  schema: string
  columns: ColumnDefinition[]
  relationships: RelationshipDefinition[]
}

interface ColumnDefinition {
  key: string
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
}

interface RelationshipDefinition {
  key: string
  fromTable: string
  fromColumn: string
  toTable: string
  toColumn: string
  type: 'one-to-one' | 'one-to-many' | 'many-to-many'
}

const ModelModification = () => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [tables, setTables] = useState<TableDefinition[]>([])
  const [selectedTable, setSelectedTable] = useState<TableDefinition | null>(null)
  const [isTableModalVisible, setIsTableModalVisible] = useState(false)
  const [isColumnModalVisible, setIsColumnModalVisible] = useState(false)
  const [isRelationshipModalVisible, setIsRelationshipModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const steps = [
    {
      title: 'Add Tables',
      description: 'Define new tables',
    },
    {
      title: 'Add Columns',
      description: 'Add columns to tables',
    },
    {
      title: 'Add Relationships',
      description: 'Define relationships',
    },
    {
      title: 'Review & Apply',
      description: 'Review changes',
    },
  ]

  const handleAddTable = async (values: any) => {
    setLoading(true)
    try {
      // Use AI to suggest optimal table structure
      const suggestions = await aiService.suggestTableStructure(values.name, values.description)
      
      const newTable: TableDefinition = {
        key: `table-${Date.now()}`,
        name: values.name,
        schema: values.schema || 'public',
        columns: suggestions.columns || [],
        relationships: [],
      }

      setTables([...tables, newTable])
      setIsTableModalVisible(false)
      form.resetFields()
      message.success('Table added successfully')
    } catch (error) {
      message.error('Failed to add table')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddColumn = async (values: any) => {
    if (!selectedTable) return

    setLoading(true)
    try {
      const suggestions = await aiService.suggestColumnType(values.name, values.description)
      
      const newColumn: ColumnDefinition = {
        key: `col-${Date.now()}`,
        name: values.name,
        type: suggestions.type || values.type,
        nullable: values.nullable || false,
        primaryKey: values.primaryKey || false,
      }

      const updatedTables = tables.map((table) =>
        table.key === selectedTable.key
          ? { ...table, columns: [...table.columns, newColumn] }
          : table
      )

      setTables(updatedTables)
      setSelectedTable({ ...selectedTable, columns: [...selectedTable.columns, newColumn] })
      setIsColumnModalVisible(false)
      form.resetFields(['name', 'type', 'description', 'nullable', 'primaryKey'])
      message.success('Column added successfully')
    } catch (error) {
      message.error('Failed to add column')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddRelationship = async (values: any) => {
    if (!selectedTable) return

    const newRelationship: RelationshipDefinition = {
      key: `rel-${Date.now()}`,
      fromTable: selectedTable.name,
      fromColumn: values.fromColumn,
      toTable: values.toTable,
      toColumn: values.toColumn,
      type: values.type,
    }

    const updatedTables = tables.map((table) =>
      table.key === selectedTable.key
        ? { ...table, relationships: [...table.relationships, newRelationship] }
        : table
    )

    setTables(updatedTables)
    setSelectedTable({ ...selectedTable, relationships: [...selectedTable.relationships, newRelationship] })
    setIsRelationshipModalVisible(false)
    form.resetFields(['fromColumn', 'toTable', 'toColumn', 'type'])
    message.success('Relationship added successfully')
  }

  const handleApplyChanges = async () => {
    setLoading(true)
    try {
      const result = await aiService.applyModelChanges(tables)
      message.success('Model changes applied successfully!')
      console.log('Applied changes:', result)
    } catch (error) {
      message.error('Failed to apply changes')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const tableColumns = [
    {
      title: 'Table Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span style={{ color: 'rgb(0, 217, 255)' }}>{text}</span>,
    },
    {
      title: 'Schema',
      dataIndex: 'schema',
      key: 'schema',
    },
    {
      title: 'Columns',
      dataIndex: 'columns',
      key: 'columns',
      render: (columns: ColumnDefinition[]) => <Tag>{columns.length}</Tag>,
    },
    {
      title: 'Relationships',
      dataIndex: 'relationships',
      key: 'relationships',
      render: (relationships: RelationshipDefinition[]) => <Tag>{relationships.length}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: TableDefinition) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedTable(record)
              setCurrentStep(1)
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setTables(tables.filter((t) => t.key !== record.key))
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const columnColumns = [
    {
      title: 'Column Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="cyan">{type}</Tag>,
    },
    {
      title: 'Nullable',
      dataIndex: 'nullable',
      key: 'nullable',
      render: (nullable: boolean) => (
        <Tag color={nullable ? 'green' : 'red'}>{nullable ? 'Yes' : 'No'}</Tag>
      ),
    },
    {
      title: 'Primary Key',
      dataIndex: 'primaryKey',
      key: 'primaryKey',
      render: (pk: boolean) => (pk ? <Tag color="blue">PK</Tag> : '-'),
    },
  ]

  return (
    <div className="model-modification">
      <div className="page-header">
        <Title level={2}>Model Modification</Title>
        <Paragraph>
          Convert and modify your data model to suit new requirements. Add tables, columns,
          and relationships with AI-powered suggestions.
        </Paragraph>
      </div>

      <Card className="steps-card">
        <Steps current={currentStep} items={steps} />
      </Card>

      {currentStep === 0 && (
        <Card
          title="Tables"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsTableModalVisible(true)}
            >
              Add Table
            </Button>
          }
        >
          <Table
            columns={tableColumns}
            dataSource={tables}
            pagination={false}
            onRow={(record) => ({
              onClick: () => {
                setSelectedTable(record)
                setCurrentStep(1)
              },
            })}
          />
        </Card>
      )}

      {currentStep === 1 && selectedTable && (
        <Card
          title={`Columns for ${selectedTable.name}`}
          extra={
            <Space>
              <Button onClick={() => setCurrentStep(0)}>Back</Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsColumnModalVisible(true)}
              >
                Add Column
              </Button>
              <Button onClick={() => setCurrentStep(2)}>Next: Relationships</Button>
            </Space>
          }
        >
          <Table columns={columnColumns} dataSource={selectedTable.columns} pagination={false} />
        </Card>
      )}

      {currentStep === 2 && selectedTable && (
        <Card
          title={`Relationships for ${selectedTable.name}`}
          extra={
            <Space>
              <Button onClick={() => setCurrentStep(1)}>Back</Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsRelationshipModalVisible(true)}
              >
                Add Relationship
              </Button>
              <Button onClick={() => setCurrentStep(3)}>Next: Review</Button>
            </Space>
          }
        >
          <Table
            columns={[
              { title: 'From Column', dataIndex: 'fromColumn', key: 'fromColumn' },
              { title: 'To Table', dataIndex: 'toTable', key: 'toTable' },
              { title: 'To Column', dataIndex: 'toColumn', key: 'toColumn' },
              {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                render: (type: string) => <Tag>{type}</Tag>,
              },
            ]}
            dataSource={selectedTable.relationships}
            pagination={false}
          />
        </Card>
      )}

      {currentStep === 3 && (
        <Card
          title="Review Changes"
          extra={
            <Space>
              <Button onClick={() => setCurrentStep(2)}>Back</Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleApplyChanges}
                loading={loading}
              >
                Apply Changes
              </Button>
            </Space>
          }
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={4}>Summary</Title>
              <Paragraph>
                {tables.length} table(s) will be created/modified with{' '}
                {tables.reduce((sum, t) => sum + t.columns.length, 0)} columns and{' '}
                {tables.reduce((sum, t) => sum + t.relationships.length, 0)} relationships.
              </Paragraph>
            </div>
            <Table columns={tableColumns} dataSource={tables} pagination={false} />
          </Space>
        </Card>
      )}

      <Modal
        title="Add Table"
        open={isTableModalVisible}
        onCancel={() => {
          setIsTableModalVisible(false)
          form.resetFields()
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTable} layout="vertical">
          <Form.Item name="name" label="Table Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Customer, Order, Product" />
          </Form.Item>
          <Form.Item name="schema" label="Schema">
            <Input placeholder="default: public" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Describe the purpose of this table" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsTableModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Table
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Column"
        open={isColumnModalVisible}
        onCancel={() => {
          setIsColumnModalVisible(false)
          form.resetFields(['name', 'type', 'description', 'nullable', 'primaryKey'])
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddColumn} layout="vertical">
          <Form.Item name="name" label="Column Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., customer_id, email, created_at" />
          </Form.Item>
          <Form.Item name="type" label="Data Type">
            <Select placeholder="Select type (AI will suggest if empty)">
              <Option value="VARCHAR">VARCHAR</Option>
              <Option value="INTEGER">INTEGER</Option>
              <Option value="BIGINT">BIGINT</Option>
              <Option value="DECIMAL">DECIMAL</Option>
              <Option value="DATE">DATE</Option>
              <Option value="TIMESTAMP">TIMESTAMP</Option>
              <Option value="BOOLEAN">BOOLEAN</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={2} placeholder="Describe this column" />
          </Form.Item>
          <Form.Item name="nullable" valuePropName="checked">
            <Checkbox>Nullable</Checkbox>
          </Form.Item>
          <Form.Item name="primaryKey" valuePropName="checked">
            <Checkbox>Primary Key</Checkbox>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsColumnModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Column
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Relationship"
        open={isRelationshipModalVisible}
        onCancel={() => {
          setIsRelationshipModalVisible(false)
          form.resetFields(['fromColumn', 'toTable', 'toColumn', 'type'])
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddRelationship} layout="vertical">
          <Form.Item name="fromColumn" label="From Column" rules={[{ required: true }]}>
            <Select placeholder="Select column">
              {selectedTable?.columns.map((col) => (
                <Option key={col.key} value={col.name}>
                  {col.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="toTable" label="To Table" rules={[{ required: true }]}>
            <Select placeholder="Select target table">
              {tables
                .filter((t) => t.key !== selectedTable?.key)
                .map((table) => (
                  <Option key={table.key} value={table.name}>
                    {table.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="toColumn" label="To Column" rules={[{ required: true }]}>
            <Input placeholder="Target column name" />
          </Form.Item>
          <Form.Item name="type" label="Relationship Type" rules={[{ required: true }]}>
            <Select>
              <Option value="one-to-one">One to One</Option>
              <Option value="one-to-many">One to Many</Option>
              <Option value="many-to-many">Many to Many</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsRelationshipModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Add Relationship
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ModelModification

