import { useState, useEffect } from 'react'
import { Modal, Form, Input, Select, InputNumber, Space, Typography, Table, Button, Tag, Alert, Divider, message } from 'antd'
import { DeleteOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons'

const { TextArea } = Input
const { Option } = Select

export interface TableNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: {
    label: string
    tableName: string
    columns: Array<{
      name: string
      type: string
      description?: string
      alias?: string
      primaryKey?: boolean
      foreignKey?: boolean
      nullable?: boolean
      length?: number
      referencedTable?: string
      referencedColumn?: string
      isUserAdded?: boolean
    }>
    description?: string
    isUserAdded?: boolean
  }
}

interface Relationship {
  id: string
  targetTableId: string
  targetTableName: string
  type: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many'
  recommended: boolean
}

interface Column {
  id: string
  name: string
  description: string
  alias: string
  dataType: string
  length?: number
  nullable: boolean
  primaryKey: boolean
  foreignKey: boolean
  referencedTable?: string
  referencedColumn?: string
}

interface TableModalProps {
  visible: boolean
  onCancel: () => void
  onSave: (tableData: {
    tableName: string
    description: string
    relationships: Relationship[]
    columns: Column[]
  }) => void
  editingTable?: TableNode | null
  availableTables: TableNode[]
}

const TableModal = ({
  visible,
  onCancel,
  onSave,
  editingTable,
  availableTables,
}: TableModalProps) => {
  const [form] = Form.useForm()
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [columns, setColumns] = useState<Column[]>([])
  const [recommendedRelationships, setRecommendedRelationships] = useState<Relationship[]>([])
  const [impactAnalysis, setImpactAnalysis] = useState<string>('')
  const [selectedDataType, setSelectedDataType] = useState<string>('VARCHAR')

  useEffect(() => {
    if (visible) {
      if (editingTable) {
        form.setFieldsValue({
          tableName: editingTable.data.tableName,
          description: editingTable.data.description || '',
        })
        setColumns(
          editingTable.data.columns.map((col, idx) => ({
            id: `col-${idx}`,
            name: col.name,
            description: col.description || '',
            alias: col.alias || '',
            dataType: col.type.split('(')[0],
            length: col.type.match(/\((\d+)\)/)?.[1] ? parseInt(col.type.match(/\((\d+)\)/)?.[1] || '0') : undefined,
            nullable: col.nullable !== false,
            primaryKey: col.primaryKey || false,
            foreignKey: col.foreignKey || false,
            referencedTable: col.referencedTable,
            referencedColumn: col.referencedColumn,
          }))
        )
        setRelationships([])
      } else {
        form.resetFields()
        setColumns([])
        setRelationships([])
        // Auto-detect recommended relationships
        detectRecommendedRelationships('')
      }
      setImpactAnalysis('')
    }
  }, [visible, editingTable, form])

  const detectRecommendedRelationships = (tableName: string) => {
    // Simple recommendation logic based on table name similarity
    const recommendations: Relationship[] = []
    availableTables.forEach((table) => {
      if (table.id === editingTable?.id) return
      
      const currentName = tableName.toLowerCase() || editingTable?.data.tableName.toLowerCase() || ''
      const otherName = table.data.tableName.toLowerCase()
      
      // Recommend relationships based on common patterns
      if (
        (currentName.includes('order') && otherName.includes('customer')) ||
        (currentName.includes('customer') && otherName.includes('order')) ||
        (currentName.includes('product') && otherName.includes('order')) ||
        (currentName.includes('order') && otherName.includes('product'))
      ) {
        recommendations.push({
          id: `rec-${Date.now()}-${Math.random()}`,
          targetTableId: table.id,
          targetTableName: table.data.tableName,
          type: 'one-to-many',
          recommended: true,
        })
      }
    })
    setRecommendedRelationships(recommendations)
  }

  const handleTableNameChange = (value: string) => {
    detectRecommendedRelationships(value)
    calculateImpact()
  }

  const handleAddRelationship = () => {
    const newRelationship: Relationship = {
      id: `rel-${Date.now()}`,
      targetTableId: '',
      targetTableName: '',
      type: 'one-to-many',
      recommended: false,
    }
    setRelationships([...relationships, newRelationship])
  }

  const handleRemoveRelationship = (id: string) => {
    setRelationships(relationships.filter((rel) => rel.id !== id))
    calculateImpact()
  }

  const handleRelationshipChange = (id: string, field: string, value: any) => {
    setRelationships(
      relationships.map((rel) => {
        if (rel.id === id) {
          if (field === 'targetTableId') {
            const table = availableTables.find((t) => t.id === value)
            return {
              ...rel,
              targetTableId: value,
              targetTableName: table ? table.data.tableName : '',
            }
          }
          return { ...rel, [field]: value }
        }
        return rel
      })
    )
    calculateImpact()
  }

  const handleAcceptRecommendation = (recommendation: Relationship) => {
    if (!relationships.find((r) => r.targetTableId === recommendation.targetTableId)) {
      setRelationships([...relationships, { ...recommendation, recommended: false }])
      setRecommendedRelationships(
        recommendedRelationships.filter((r) => r.id !== recommendation.id)
      )
    }
  }

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: `col-${Date.now()}`,
      name: '',
      description: '',
      alias: '',
      dataType: 'VARCHAR',
      nullable: true,
      primaryKey: false,
      foreignKey: false,
    }
    setColumns([...columns, newColumn])
  }

  const handleRemoveColumn = (id: string) => {
    const column = columns.find((c) => c.id === id)
    if (column?.primaryKey || column?.foreignKey) {
      Modal.warning({
        title: 'Cannot Delete Key Column',
        content: (
          <div>
            <p>
              Cannot delete <strong>{column.name}</strong> because it is a{' '}
              {column.primaryKey ? 'Primary Key' : 'Foreign Key'}.
            </p>
            <p>
              To delete this column, you must drop the entire table and all related tables.
            </p>
          </div>
        ),
      })
      return
    }
    setColumns(columns.filter((c) => c.id !== id))
    calculateImpact()
  }

  const handleColumnChange = (id: string, field: string, value: any) => {
    setColumns(
      columns.map((col) => {
        if (col.id === id) {
          return { ...col, [field]: value }
        }
        return col
      })
    )
    calculateImpact()
  }

  const calculateImpact = () => {
    const tableName = form.getFieldValue('tableName') || editingTable?.data.tableName || ''
    const isDelete = !!editingTable
    const primaryKeyColumns = columns.filter((c) => c.primaryKey).length
    const foreignKeyColumns = columns.filter((c) => c.foreignKey).length
    const relationshipCount = relationships.length

    let impact = ''

    if (isDelete) {
      impact = `Deleting table "${tableName}" will:\n`
      impact += `- Remove the entire table and all ${columns.length} column(s)\n`
      impact += `- ⚠️ CRITICAL: Remove ${primaryKeyColumns} Primary Key(s) - this will break all foreign key relationships\n`
      impact += `- ⚠️ CRITICAL: Remove ${foreignKeyColumns} Foreign Key(s) - this will break referential integrity\n`
      impact += `- Remove ${relationshipCount} relationship(s) with other tables\n`
      impact += `- Impact all dependent tables and queries\n`
      impact += `- All data in this table will be permanently lost\n`
    } else if (editingTable) {
      impact = `Editing table "${tableName}" will:\n`
      impact += `- Update table properties and structure\n`
      if (primaryKeyColumns > 0) {
        impact += `- ⚠️ WARNING: Changes to ${primaryKeyColumns} Primary Key(s) may affect all related foreign keys\n`
      }
      if (foreignKeyColumns > 0) {
        impact += `- ⚠️ WARNING: Changes to ${foreignKeyColumns} Foreign Key(s) may affect referential integrity\n`
      }
      impact += `- Update ${relationshipCount} relationship(s)\n`
      impact += `- Modify ${columns.length} column(s)\n`
    } else {
      impact = `Adding table "${tableName}" will:\n`
      impact += `- Create a new table with ${columns.length} column(s)\n`
      if (primaryKeyColumns > 0) {
        impact += `- Create ${primaryKeyColumns} Primary Key(s) for unique identification\n`
      }
      if (foreignKeyColumns > 0) {
        impact += `- Create ${foreignKeyColumns} Foreign Key relationship(s)\n`
      }
      impact += `- Create ${relationshipCount} relationship(s) with other tables\n`
    }

    setImpactAnalysis(impact)
  }

  const handleFormChange = () => {
    const tableName = form.getFieldValue('tableName')
    if (tableName) {
      handleTableNameChange(tableName)
    }
    calculateImpact()
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      // Validate columns
      const invalidColumns = columns.filter((c) => !c.name || !c.dataType)
      if (invalidColumns.length > 0) {
        message.error('Please fill in all required column fields (name and data type)')
        return
      }

      // Check for at least one column
      if (columns.length === 0) {
        message.error('Please add at least one column to the table')
        return
      }

      // Check for primary key
      const hasPrimaryKey = columns.some((c) => c.primaryKey)
      if (!hasPrimaryKey) {
        Modal.confirm({
          title: 'No Primary Key Defined',
          content: 'This table has no primary key. It is recommended to have at least one primary key. Do you want to continue?',
          onOk: () => {
            proceedWithSave(values)
          },
        })
      } else {
        proceedWithSave(values)
      }
    })
  }

  const proceedWithSave = (values: any) => {
    onSave({
      tableName: values.tableName,
      description: values.description || '',
      relationships,
      columns,
    })
    form.resetFields()
    setColumns([])
    setRelationships([])
    setRecommendedRelationships([])
    setImpactAnalysis('')
  }

  const relationshipColumns = [
    {
      title: 'Target Table',
      dataIndex: 'targetTableId',
      key: 'targetTableId',
      render: (value: string, record: Relationship) => (
        <Select
          value={value}
          onChange={(val) => handleRelationshipChange(record.id, 'targetTableId', val)}
          placeholder="Select table"
          style={{ width: '100%' }}
          showSearch
          filterOption={(input, option) =>
            String(option?.children || '').toLowerCase().includes(input.toLowerCase())
          }
        >
          {availableTables
            .filter((table) => table.id !== editingTable?.id)
            .map((table) => (
              <Option key={table.id} value={table.id}>
                {table.data.tableName}
              </Option>
            ))}
        </Select>
      ),
    },
    {
      title: 'Relationship Type',
      dataIndex: 'type',
      key: 'type',
      render: (value: string, record: Relationship) => (
        <Select
          value={value}
          onChange={(val) => handleRelationshipChange(record.id, 'type', val)}
          style={{ width: '100%' }}
        >
          <Option value="one-to-one">One-to-One</Option>
          <Option value="one-to-many">One-to-Many</Option>
          <Option value="many-to-one">Many-to-One</Option>
          <Option value="many-to-many">Many-to-Many</Option>
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Relationship) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveRelationship(record.id)}
        >
          Remove
        </Button>
      ),
    },
  ]

  const columnColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (value: string, record: Column) => (
        <Input
          value={value}
          onChange={(e) => handleColumnChange(record.id, 'name', e.target.value)}
          placeholder="Column name"
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (value: string, record: Column) => (
        <Input
          value={value}
          onChange={(e) => handleColumnChange(record.id, 'description', e.target.value)}
          placeholder="Description"
        />
      ),
    },
    {
      title: 'Alias',
      dataIndex: 'alias',
      key: 'alias',
      render: (value: string, record: Column) => (
        <Input
          value={value}
          onChange={(e) => handleColumnChange(record.id, 'alias', e.target.value)}
          placeholder="Alias"
        />
      ),
    },
    {
      title: 'Data Type',
      dataIndex: 'dataType',
      key: 'dataType',
      render: (value: string, record: Column) => (
        <Space>
          <Select
            value={value}
            onChange={(val) => {
              setSelectedDataType(val)
              handleColumnChange(record.id, 'dataType', val)
            }}
            style={{ width: 120 }}
          >
            <Option value="VARCHAR">VARCHAR</Option>
            <Option value="INT">INT</Option>
            <Option value="BIGINT">BIGINT</Option>
            <Option value="DECIMAL">DECIMAL</Option>
            <Option value="DATE">DATE</Option>
            <Option value="DATETIME">DATETIME</Option>
            <Option value="BOOLEAN">BOOLEAN</Option>
            <Option value="TEXT">TEXT</Option>
          </Select>
          {(value === 'VARCHAR' || value === 'DECIMAL') && (
            <InputNumber
              min={1}
              max={10000}
              value={record.length}
              onChange={(val) => handleColumnChange(record.id, 'length', val)}
              placeholder="Length"
              style={{ width: 80 }}
            />
          )}
        </Space>
      ),
    },
    {
      title: 'Properties',
      key: 'properties',
      render: (_: any, record: Column) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Space size="small">
            <Tag
              color={record.primaryKey ? 'cyan' : 'default'}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (record.foreignKey) {
                  Modal.warning({
                    title: 'Cannot Set Primary Key',
                    content: 'Cannot set as Primary Key when Foreign Key is enabled. Please disable Foreign Key first.',
                  })
                  return
                }
                handleColumnChange(record.id, 'primaryKey', !record.primaryKey)
              }}
            >
              PK
            </Tag>
            <Tag
              color={record.foreignKey ? 'blue' : 'default'}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (record.primaryKey) {
                  Modal.warning({
                    title: 'Cannot Set Foreign Key',
                    content: 'Cannot set as Foreign Key when Primary Key is enabled. Please disable Primary Key first.',
                  })
                  return
                }
                handleColumnChange(record.id, 'foreignKey', !record.foreignKey)
              }}
            >
              FK
            </Tag>
            <Tag
              color={record.nullable ? 'default' : 'orange'}
              style={{ cursor: 'pointer' }}
              onClick={() => handleColumnChange(record.id, 'nullable', !record.nullable)}
            >
              {record.nullable ? 'NULL' : 'NOT NULL'}
            </Tag>
          </Space>
          {record.foreignKey && (
            <Space size="small" style={{ width: '100%', marginTop: 4 }}>
              <Input
                size="small"
                placeholder="Referenced Table"
                value={record.referencedTable}
                onChange={(e) => handleColumnChange(record.id, 'referencedTable', e.target.value)}
                style={{ width: '45%' }}
              />
              <Input
                size="small"
                placeholder="Referenced Column"
                value={record.referencedColumn}
                onChange={(e) => handleColumnChange(record.id, 'referencedColumn', e.target.value)}
                style={{ width: '45%' }}
              />
            </Space>
          )}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Column) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveColumn(record.id)}
          disabled={record.primaryKey || record.foreignKey}
        >
          Delete
        </Button>
      ),
    },
  ]

  return (
    <Modal
      title={editingTable ? 'Edit Table' : 'Add New Table'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={editingTable ? 'Update' : 'Add'}
      cancelText="Cancel"
      width={1000}
      style={{ top: 20 }}
      afterClose={() => {
        form.resetFields()
        setColumns([])
        setRelationships([])
        setRecommendedRelationships([])
        setImpactAnalysis('')
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChange}
      >
        <Form.Item
          name="tableName"
          label="Table Name"
          rules={[{ required: true, message: 'Please enter table name' }]}
        >
          <Input placeholder="e.g., Customer, Order, Product" />
        </Form.Item>

        <Form.Item name="description" label="Table Description">
          <TextArea rows={3} placeholder="Describe the purpose and usage of this table" />
        </Form.Item>

        <Divider />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Title level={5} style={{ margin: 0 }}>Relationships with Other Tables</Title>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddRelationship}
              size="small"
            >
              Add Relationship
            </Button>
          </div>

          {recommendedRelationships.length > 0 && (
            <Alert
              message="Recommended Relationships"
              description={
                <div>
                  {recommendedRelationships.map((rec) => (
                    <div key={rec.id} style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>
                        <strong>{rec.targetTableName}</strong> - {rec.type}
                      </span>
                      <Button
                        type="link"
                        size="small"
                        icon={<CheckOutlined />}
                        onClick={() => handleAcceptRecommendation(rec)}
                      >
                        Accept
                      </Button>
                    </div>
                  ))}
                </div>
              }
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {relationships.length > 0 ? (
            <Table
              dataSource={relationships}
              columns={relationshipColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          ) : (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              No relationships defined. Click "Add Relationship" to create relationships with other tables.
            </Typography.Text>
          )}
        </div>

        <Divider />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Title level={5} style={{ margin: 0 }}>Attributes/Columns</Title>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddColumn}
              size="small"
            >
              Add Column
            </Button>
          </div>

          {columns.length > 0 ? (
            <Table
              dataSource={columns}
              columns={columnColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          ) : (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              No columns defined. Click "Add Column" to add attributes to this table.
            </Typography.Text>
          )}
        </div>

        {impactAnalysis && (
          <div style={{ marginTop: 16 }}>
            <Alert
              message="Impact Analysis"
              description={<pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 12 }}>{impactAnalysis}</pre>}
              type="warning"
              showIcon
            />
          </div>
        )}
      </Form>
    </Modal>
  )
}

export default TableModal

