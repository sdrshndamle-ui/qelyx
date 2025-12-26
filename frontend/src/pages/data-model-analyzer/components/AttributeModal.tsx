import { useState, useEffect } from 'react'
import { Modal, Form, Input, Select, InputNumber, Switch, Space, Typography, Table, Button, Alert, Divider } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

export interface AttributeNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: {
    label: string
    attributeName: string
    tableName: string
    dataType: string
    isPrimaryKey?: boolean
    isForeignKey?: boolean
    referencedTable?: string
    referencedColumn?: string
    isUserAdded?: boolean
  }
}

const { Option } = Select
const { Title, Text } = Typography

interface Relationship {
  id: string
  targetAttributeId: string
  targetAttributeName: string
  cardinality: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many'
}

interface AttributeModalProps {
  visible: boolean
  onCancel: () => void
  onSave: (attributeData: {
    attributeName: string
    tableName: string
    dataType: string
    length?: number
    nullable: boolean
    isPrimaryKey: boolean
    isForeignKey: boolean
    referencedTable?: string
    referencedColumn?: string
    relationships: Relationship[]
  }) => void
  editingAttribute?: AttributeNode | null
  availableAttributes: AttributeNode[]
  availableTables: string[]
}

const AttributeModal = ({
  visible,
  onCancel,
  onSave,
  editingAttribute,
  availableAttributes,
  availableTables,
}: AttributeModalProps) => {
  const [form] = Form.useForm()
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [selectedDataType, setSelectedDataType] = useState<string>('VARCHAR')
  const [impactAnalysis, setImpactAnalysis] = useState<string>('')

  useEffect(() => {
    if (visible) {
      if (editingAttribute) {
        form.setFieldsValue({
          attributeName: editingAttribute.data.attributeName,
          tableName: editingAttribute.data.tableName,
          dataType: editingAttribute.data.dataType.split('(')[0],
          length: editingAttribute.data.dataType.match(/\((\d+)\)/)?.[1] || undefined,
          nullable: !editingAttribute.data.isPrimaryKey,
          isPrimaryKey: editingAttribute.data.isPrimaryKey || false,
          isForeignKey: editingAttribute.data.isForeignKey || false,
          referencedTable: editingAttribute.data.referencedTable,
          referencedColumn: editingAttribute.data.referencedColumn,
        })
        // Load existing relationships from edges
        setRelationships([])
      } else {
        form.resetFields()
        setRelationships([])
        form.setFieldsValue({
          dataType: 'VARCHAR',
          nullable: true,
          isPrimaryKey: false,
          isForeignKey: false,
        })
      }
      setImpactAnalysis('')
    }
  }, [visible, editingAttribute, form])

  const handleDataTypeChange = (value: string) => {
    setSelectedDataType(value)
    if (value === 'INT' || value === 'BIGINT' || value === 'SMALLINT' || value === 'TINYINT') {
      form.setFieldsValue({ length: undefined })
    }
  }

  const handleAddRelationship = () => {
    const newRelationship: Relationship = {
      id: `rel-${Date.now()}`,
      targetAttributeId: '',
      targetAttributeName: '',
      cardinality: 'one-to-many',
    }
    setRelationships([...relationships, newRelationship])
  }

  const handleRemoveRelationship = (id: string) => {
    setRelationships(relationships.filter((rel) => rel.id !== id))
  }

  const handleRelationshipChange = (id: string, field: string, value: any) => {
    setRelationships(
      relationships.map((rel) => {
        if (rel.id === id) {
          if (field === 'targetAttributeId') {
            const attr = availableAttributes.find((a) => a.id === value)
            return {
              ...rel,
              targetAttributeId: value,
              targetAttributeName: attr ? attr.data.attributeName : '',
            }
          }
          return { ...rel, [field]: value }
        }
        return rel
      })
    )
  }

  const calculateImpact = () => {
    const attributeName = form.getFieldValue('attributeName')
    const isPrimaryKey = form.getFieldValue('isPrimaryKey')
    const isForeignKey = form.getFieldValue('isForeignKey')
    const isDelete = !!editingAttribute

    let impact = ''

    if (isDelete) {
      impact = `Deleting this attribute will:\n`
      impact += `- Remove the attribute "${attributeName}" from the data model\n`
      if (isPrimaryKey) {
        impact += `- ⚠️ WARNING: This is a Primary Key. Deleting it will break all foreign key relationships.\n`
      }
      if (isForeignKey) {
        impact += `- ⚠️ WARNING: This is a Foreign Key. Deleting it will break referential integrity.\n`
      }
      impact += `- Remove ${relationships.length} relationship(s) associated with this attribute\n`
      impact += `- Impact ${relationships.length} dependent attribute(s)\n`
    } else if (editingAttribute) {
      impact = `Editing this attribute will:\n`
      impact += `- Update the attribute "${attributeName}" properties\n`
      if (isPrimaryKey) {
        impact += `- ⚠️ WARNING: Changing Primary Key properties may affect all related foreign keys\n`
      }
      impact += `- Update ${relationships.length} relationship(s)\n`
    } else {
      impact = `Adding this attribute will:\n`
      impact += `- Create a new attribute "${attributeName}" in the data model\n`
      if (isPrimaryKey) {
        impact += `- Set as Primary Key (will be used for unique identification)\n`
      }
      if (isForeignKey) {
        impact += `- Create a Foreign Key relationship\n`
      }
      impact += `- Create ${relationships.length} relationship(s) with other attributes\n`
    }

    setImpactAnalysis(impact)
  }

  const handleFormChange = () => {
    calculateImpact()
  }

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const dataType = values.length && selectedDataType !== 'INT' && selectedDataType !== 'BIGINT' && selectedDataType !== 'SMALLINT' && selectedDataType !== 'TINYINT'
        ? `${selectedDataType}(${values.length})`
        : selectedDataType

      onSave({
        attributeName: values.attributeName,
        tableName: values.tableName,
        dataType,
        length: values.length,
        nullable: values.nullable,
        isPrimaryKey: values.isPrimaryKey || false,
        isForeignKey: values.isForeignKey || false,
        referencedTable: values.referencedTable,
        referencedColumn: values.referencedColumn,
        relationships,
      })
      form.resetFields()
      setRelationships([])
      setImpactAnalysis('')
    })
  }

  const relationshipColumns = [
    {
      title: 'Target Attribute',
      dataIndex: 'targetAttributeId',
      key: 'targetAttributeId',
      render: (value: string, record: Relationship) => (
        <Select
          value={value}
          onChange={(val) => handleRelationshipChange(record.id, 'targetAttributeId', val)}
          placeholder="Select attribute"
          style={{ width: '100%' }}
          showSearch
          filterOption={(input, option) =>
            String(option?.children || '').toLowerCase().includes(input.toLowerCase())
          }
        >
          {availableAttributes
            .filter((attr) => attr.id !== editingAttribute?.id)
            .map((attr) => (
              <Option key={attr.id} value={attr.id}>
                {attr.data.attributeName} ({attr.data.tableName})
              </Option>
            ))}
        </Select>
      ),
    },
    {
      title: 'Cardinality',
      dataIndex: 'cardinality',
      key: 'cardinality',
      render: (value: string, record: Relationship) => (
        <Select
          value={value}
          onChange={(val) => handleRelationshipChange(record.id, 'cardinality', val)}
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

  return (
    <Modal
      title={editingAttribute ? 'Edit Attribute' : 'Add New Attribute'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={editingAttribute ? 'Update' : 'Add'}
      cancelText="Cancel"
      width={800}
      style={{ top: 20 }}
      afterClose={() => {
        form.resetFields()
        setRelationships([])
        setImpactAnalysis('')
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChange}
        initialValues={{
          dataType: 'VARCHAR',
          nullable: true,
          isPrimaryKey: false,
          isForeignKey: false,
        }}
      >
        <Form.Item
          name="attributeName"
          label="Attribute Name"
          rules={[{ required: true, message: 'Please enter attribute name' }]}
        >
          <Input placeholder="e.g., customer_id, email_address" />
        </Form.Item>

        <Form.Item
          name="tableName"
          label="Table Name"
          rules={[{ required: true, message: 'Please select table name' }]}
        >
          <Select placeholder="Select table" showSearch>
            {availableTables.map((table) => (
              <Option key={table} value={table}>
                {table}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Space style={{ width: '100%' }} size="middle">
          <Form.Item
            name="dataType"
            label="Data Type"
            rules={[{ required: true, message: 'Please select data type' }]}
            style={{ flex: 1 }}
          >
            <Select placeholder="Select data type" onChange={handleDataTypeChange}>
              <Option value="VARCHAR">VARCHAR</Option>
              <Option value="INT">INT</Option>
              <Option value="BIGINT">BIGINT</Option>
              <Option value="SMALLINT">SMALLINT</Option>
              <Option value="TINYINT">TINYINT</Option>
              <Option value="DECIMAL">DECIMAL</Option>
              <Option value="FLOAT">FLOAT</Option>
              <Option value="DOUBLE">DOUBLE</Option>
              <Option value="DATE">DATE</Option>
              <Option value="DATETIME">DATETIME</Option>
              <Option value="TIMESTAMP">TIMESTAMP</Option>
              <Option value="BOOLEAN">BOOLEAN</Option>
              <Option value="TEXT">TEXT</Option>
            </Select>
          </Form.Item>

          {(selectedDataType === 'VARCHAR' || selectedDataType === 'DECIMAL') && (
            <Form.Item
              name="length"
              label="Length/Precision"
              rules={[{ required: true, message: 'Please enter length' }]}
              style={{ flex: 1 }}
            >
              <InputNumber min={1} max={10000} placeholder="e.g., 255" style={{ width: '100%' }} />
            </Form.Item>
          )}
        </Space>

        <Space style={{ width: '100%' }} size="large">
          <Form.Item name="nullable" valuePropName="checked" label="Nullable">
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item name="isPrimaryKey" valuePropName="checked" label="Primary Key">
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item name="isForeignKey" valuePropName="checked" label="Foreign Key">
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Space>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.isForeignKey !== currentValues.isForeignKey}
        >
          {({ getFieldValue }) =>
            getFieldValue('isForeignKey') ? (
              <Space style={{ width: '100%' }} size="middle">
                <Form.Item
                  name="referencedTable"
                  label="Referenced Table"
                  rules={[{ required: true, message: 'Please select referenced table' }]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="Select table" showSearch>
                    {availableTables.map((table) => (
                      <Option key={table} value={table}>
                        {table}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="referencedColumn"
                  label="Referenced Column"
                  rules={[{ required: true, message: 'Please enter referenced column' }]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="e.g., id, customer_id" />
                </Form.Item>
              </Space>
            ) : null
          }
        </Form.Item>

        <Divider />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Title level={5} style={{ margin: 0 }}>Relationships with Other Attributes</Title>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddRelationship}
              size="small"
            >
              Add Relationship
            </Button>
          </div>

          {relationships.length > 0 ? (
            <Table
              dataSource={relationships}
              columns={relationshipColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          ) : (
            <Text type="secondary" style={{ fontSize: 12 }}>
              No relationships defined. Click "Add Relationship" to create relationships with other attributes.
            </Text>
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

export default AttributeModal

