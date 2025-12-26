import { useState, useEffect } from 'react'
import { Layout, Card, Button, Input, Space, Typography, Table, Modal, message, Upload, Divider, Tag, Form } from 'antd'
import {
  EditOutlined,
  PlusOutlined,
  ExportOutlined,
  ImportOutlined,
  SaveOutlined,
  FileTextOutlined,
  FileExcelOutlined,
} from '@ant-design/icons'
import { Project } from '../services/projectService'
import { auditService } from '../services/auditService'
import { downloadAsCSV } from '../utils/downloadUtils'
import ProjectManager from '../components/ProjectManager'
import './EnterpriseOntology.css'

const { Content, Sider } = Layout
const { TextArea } = Input
const { Title, Paragraph } = Typography

interface FieldProperty {
  physicalFieldName: string
  standardizedFieldName: string
  standardizedFieldDescription: string
  dataType: string
  length?: number
  nullable: boolean
  primaryKey: boolean
  aliases: string[]
}

interface TableOntology {
  physicalTableName: string
  standardizedTableName: string
  standardizedTableDescription: string
  fields: FieldProperty[]
}

interface OntologyData {
  projectId: string
  tables: TableOntology[]
}

const EnterpriseOntology = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [ontologyData, setOntologyData] = useState<OntologyData | null>(null)
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(true)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [editingField, setEditingField] = useState<{ tableIndex: number; fieldIndex: number } | null>(null)
  const [editingTable, setEditingTable] = useState<number | null>(null)
  const [form] = Form.useForm()
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([])

  useEffect(() => {
    if (selectedProject) {
      loadOntologyData(selectedProject.id)
    }
  }, [selectedProject])

  const loadOntologyData = async (projectId: string) => {
    // Simulate loading ontology data from project
    // In real app, this would come from an API
    const mockData: OntologyData = {
      projectId,
      tables: [
        {
          physicalTableName: 'BIL_ACCOUNT',
          standardizedTableName: 'Billing Account',
          standardizedTableDescription: 'Main billing account table containing account information',
          fields: [
            {
              physicalFieldName: 'account_id',
              standardizedFieldName: 'Account Identifier',
              standardizedFieldDescription: 'Unique identifier for the billing account',
              dataType: 'BIGINT',
              nullable: false,
              primaryKey: true,
              aliases: ['AccountID', 'AcctID'],
            },
            {
              physicalFieldName: 'client_id',
              standardizedFieldName: 'Client Identifier',
              standardizedFieldDescription: 'Reference to the client associated with this account',
              dataType: 'BIGINT',
              nullable: false,
              primaryKey: false,
              aliases: ['CustomerID'],
            },
            {
              physicalFieldName: 'balance',
              standardizedFieldName: 'Account Balance',
              standardizedFieldDescription: 'Current balance amount in the account',
              dataType: 'DECIMAL',
              length: 14,
              nullable: true,
              primaryKey: false,
              aliases: [],
            },
            {
              physicalFieldName: 'status',
              standardizedFieldName: 'Account Status',
              standardizedFieldDescription: 'Current status of the account (Active, Inactive, Suspended)',
              dataType: 'VARCHAR',
              length: 32,
              nullable: false,
              primaryKey: false,
              aliases: ['AccountStatus'],
            },
          ],
        },
        {
          physicalTableName: 'BIL_INV_POL',
          standardizedTableName: 'Billing Invoice Policy',
          standardizedTableDescription: 'Policy information for billing invoices',
          fields: [
            {
              physicalFieldName: 'policy_id',
              standardizedFieldName: 'Policy Identifier',
              standardizedFieldDescription: 'Unique identifier for the invoice policy',
              dataType: 'BIGINT',
              nullable: false,
              primaryKey: true,
              aliases: ['PolicyID'],
            },
            {
              physicalFieldName: 'policy_name',
              standardizedFieldName: 'Policy Name',
              standardizedFieldDescription: 'Name of the billing policy',
              dataType: 'VARCHAR',
              length: 255,
              nullable: false,
              primaryKey: false,
              aliases: [],
            },
          ],
        },
      ],
    }
    setOntologyData(mockData)
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setIsProjectModalVisible(false)
    message.success(`Selected project: ${project.name}`)
  }

  const handleEditTable = (tableIndex: number) => {
    setEditingTable(tableIndex)
    if (ontologyData) {
      const table = ontologyData.tables[tableIndex]
      form.setFieldsValue({
        standardizedTableName: table.standardizedTableName,
        standardizedTableDescription: table.standardizedTableDescription,
      })
      setIsEditModalVisible(true)
    }
  }

  const handleEditField = (tableIndex: number, fieldIndex: number) => {
    setEditingField({ tableIndex, fieldIndex })
    if (ontologyData) {
      const field = ontologyData.tables[tableIndex].fields[fieldIndex]
      form.setFieldsValue({
        standardizedFieldName: field.standardizedFieldName,
        standardizedFieldDescription: field.standardizedFieldDescription,
        aliases: field.aliases.join(', '),
      })
      setIsEditModalVisible(true)
    }
  }

  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      if (!ontologyData) return

      const newData = { ...ontologyData }
      
      if (editingTable !== null) {
        // Editing table
        newData.tables[editingTable] = {
          ...newData.tables[editingTable],
          standardizedTableName: values.standardizedTableName,
          standardizedTableDescription: values.standardizedTableDescription,
        }
        auditService.logAction('table_ontology_updated', {
          projectId: selectedProject?.id,
          tableName: newData.tables[editingTable].physicalTableName,
        })
      } else if (editingField) {
        // Editing field
        const { tableIndex, fieldIndex } = editingField
        newData.tables[tableIndex].fields[fieldIndex] = {
          ...newData.tables[tableIndex].fields[fieldIndex],
          standardizedFieldName: values.standardizedFieldName,
          standardizedFieldDescription: values.standardizedFieldDescription,
          aliases: values.aliases ? values.aliases.split(',').map((a: string) => a.trim()).filter(Boolean) : [],
        }
        auditService.logAction('field_ontology_updated', {
          projectId: selectedProject?.id,
          tableName: newData.tables[tableIndex].physicalTableName,
          fieldName: newData.tables[tableIndex].fields[fieldIndex].physicalFieldName,
        })
      }

      setOntologyData(newData)
      setIsEditModalVisible(false)
      setEditingTable(null)
      setEditingField(null)
      form.resetFields()
      message.success('Changes saved successfully')
    })
  }

  const handleAddAlias = (tableIndex: number, fieldIndex: number, alias: string) => {
    if (!ontologyData) return
    const newData = { ...ontologyData }
    if (!newData.tables[tableIndex].fields[fieldIndex].aliases.includes(alias)) {
      newData.tables[tableIndex].fields[fieldIndex].aliases.push(alias)
      setOntologyData(newData)
      auditService.logAction('alias_added', {
        projectId: selectedProject?.id,
        fieldName: newData.tables[tableIndex].fields[fieldIndex].physicalFieldName,
        alias,
      })
      message.success('Alias added')
    } else {
      message.warning('Alias already exists')
    }
  }

  const handleDeleteAlias = (tableIndex: number, fieldIndex: number, aliasIndex: number) => {
    if (!ontologyData) return
    const newData = { ...ontologyData }
    const alias = newData.tables[tableIndex].fields[fieldIndex].aliases[aliasIndex]
    newData.tables[tableIndex].fields[fieldIndex].aliases.splice(aliasIndex, 1)
    setOntologyData(newData)
    auditService.logAction('alias_deleted', {
      projectId: selectedProject?.id,
      fieldName: newData.tables[tableIndex].fields[fieldIndex].physicalFieldName,
      alias,
    })
    message.success('Alias deleted')
  }

  const handleImportOntology = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importedData = JSON.parse(content) as OntologyData
        setOntologyData(importedData)
        auditService.logAction('ontology_imported', { fileName: file.name, projectId: selectedProject?.id })
        message.success('Ontology imported successfully')
      } catch (error) {
        message.error('Failed to parse ontology file')
        console.error('Import error:', error)
      }
    }
    reader.readAsText(file)
    return false
  }

  const handleExportToTool = (tool: string) => {
    if (!ontologyData) {
      message.warning('No ontology data to export')
      return
    }

    // Simulate export to external tool
    message.info(`Exporting to ${tool}...`)
    auditService.logAction('ontology_exported', { tool, projectId: selectedProject?.id })
    
    setTimeout(() => {
      message.success(`Successfully exported to ${tool}`)
    }, 2000)
  }

  const handleDownloadXML = () => {
    if (!ontologyData) {
      message.warning('No ontology data to download')
      return
    }

    // Convert to XML format
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<EnterpriseOntology>\n'
    xml += `  <ProjectId>${ontologyData.projectId}</ProjectId>\n`
    xml += '  <Tables>\n'

    ontologyData.tables.forEach((table) => {
      xml += `    <Table>\n`
      xml += `      <PhysicalTableName>${table.physicalTableName}</PhysicalTableName>\n`
      xml += `      <StandardizedTableName>${table.standardizedTableName}</StandardizedTableName>\n`
      xml += `      <StandardizedTableDescription><![CDATA[${table.standardizedTableDescription}]]></StandardizedTableDescription>\n`
      xml += '      <Fields>\n'
      
      table.fields.forEach((field) => {
        xml += `        <Field>\n`
        xml += `          <PhysicalFieldName>${field.physicalFieldName}</PhysicalFieldName>\n`
        xml += `          <StandardizedFieldName>${field.standardizedFieldName}</StandardizedFieldName>\n`
        xml += `          <StandardizedFieldDescription><![CDATA[${field.standardizedFieldDescription}]]></StandardizedFieldDescription>\n`
        xml += `          <DataType>${field.dataType}</DataType>\n`
        if (field.length) xml += `          <Length>${field.length}</Length>\n`
        xml += `          <Nullable>${field.nullable}</Nullable>\n`
        xml += `          <PrimaryKey>${field.primaryKey}</PrimaryKey>\n`
        xml += '          <Aliases>\n'
        field.aliases.forEach((alias) => {
          xml += `            <Alias>${alias}</Alias>\n`
        })
        xml += '          </Aliases>\n'
        xml += '        </Field>\n'
      })
      
      xml += '      </Fields>\n'
      xml += '    </Table>\n'
    })

    xml += '  </Tables>\n</EnterpriseOntology>'
    
    // Create blob and download for XML
    const blob = new Blob([xml], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `enterprise-ontology-${selectedProject?.name || 'export'}-${Date.now()}.xml`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    message.success('XML downloaded successfully')
    auditService.logAction('ontology_downloaded', { format: 'XML', projectId: selectedProject?.id })
  }

  const handleDownloadCSV = () => {
    if (!ontologyData) {
      message.warning('No ontology data to download')
      return
    }

    // Convert to CSV format
    const headers = [
      'Physical Table Name',
      'Standardized Table Name',
      'Standardized Table Description',
      'Physical Field Name',
      'Standardized Field Name',
      'Standardized Field Description',
      'Data Type',
      'Length',
      'Nullable',
      'Primary Key',
      'Aliases',
    ]

    const rows: string[][] = []
    ontologyData.tables.forEach((table) => {
      table.fields.forEach((field) => {
        rows.push([
          table.physicalTableName,
          table.standardizedTableName,
          table.standardizedTableDescription,
          field.physicalFieldName,
          field.standardizedFieldName,
          field.standardizedFieldDescription,
          field.dataType,
          field.length?.toString() || '',
          field.nullable ? 'Yes' : 'No',
          field.primaryKey ? 'Yes' : 'No',
          field.aliases.join('; '),
        ])
      })
    })

    const csvContent = [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\n')
    
    downloadAsCSV(csvContent, `enterprise-ontology-${selectedProject?.name || 'export'}-${Date.now()}.csv`)
    message.success('CSV downloaded successfully')
    auditService.logAction('ontology_downloaded', { format: 'CSV', projectId: selectedProject?.id })
  }

  const tableColumns = [
    {
      title: 'Physical Table Name',
      dataIndex: 'physicalTableName',
      key: 'physicalTableName',
      render: (text: string) => <span style={{ color: 'rgb(0, 217, 255)', fontWeight: 600 }}>{text}</span>,
    },
    {
      title: 'Standardized Table Name',
      dataIndex: 'standardizedTableName',
      key: 'standardizedTableName',
    },
    {
      title: 'Standardized Table Description',
      dataIndex: 'standardizedTableDescription',
      key: 'standardizedTableDescription',
      ellipsis: true,
    },
    {
      title: 'Fields Count',
      key: 'fieldsCount',
      render: (_: any, record: TableOntology) => <Tag color="cyan">{record.fields.length}</Tag>,
    },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: any, _record: TableOntology, index: number) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditTable(index)}
        >
          Edit
        </Button>
      ),
    },
  ]

  const expandedRowRender = (table: TableOntology, tableIndex: number) => {
    const fieldColumns = [
      {
        title: 'Physical Field Name',
        dataIndex: 'physicalFieldName',
        key: 'physicalFieldName',
        render: (text: string) => <span style={{ color: 'rgb(0, 217, 255)' }}>{text}</span>,
      },
      {
        title: 'Standardized Field Name',
        dataIndex: 'standardizedFieldName',
        key: 'standardizedFieldName',
      },
      {
        title: 'Standardized Field Description',
        dataIndex: 'standardizedFieldDescription',
        key: 'standardizedFieldDescription',
        ellipsis: true,
      },
      {
        title: 'Data Type',
        dataIndex: 'dataType',
        key: 'dataType',
        render: (type: string, record: FieldProperty) => (
          <Space>
            <Tag>{type}</Tag>
            {record.length && <span style={{ color: 'rgba(148, 163, 184, 0.8)' }}>({record.length})</span>}
          </Space>
        ),
      },
      {
        title: 'Properties',
        key: 'properties',
        render: (_: any, record: FieldProperty) => (
          <Space>
            {record.primaryKey && <Tag color="cyan">PK</Tag>}
            {record.nullable ? <Tag color="green">Nullable</Tag> : <Tag color="red">Not Null</Tag>}
          </Space>
        ),
      },
      {
        title: 'Aliases',
        key: 'aliases',
        render: (_: any, record: FieldProperty, fieldIndex: number) => (
          <Space>
            {record.aliases.map((alias, aliasIndex) => (
              <Tag
                key={aliasIndex}
                closable
                onClose={() => handleDeleteAlias(tableIndex, fieldIndex, aliasIndex)}
                color="blue"
              >
                {alias}
              </Tag>
            ))}
            <Button
              type="link"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => {
                let aliasInput: string = ''
                Modal.confirm({
                  title: 'Add Alias',
                  content: (
                    <Input
                      placeholder="Enter alias name"
                      onChange={(e) => {
                        aliasInput = e.target.value.trim()
                      }}
                      onPressEnter={() => {
                        if (aliasInput) {
                          handleAddAlias(tableIndex, fieldIndex, aliasInput)
                          Modal.destroyAll()
                        }
                      }}
                      autoFocus
                    />
                  ),
                  onOk: () => {
                    if (aliasInput) {
                      handleAddAlias(tableIndex, fieldIndex, aliasInput)
                    }
                  },
                })
              }}
            >
              Add
            </Button>
          </Space>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: any, _record: FieldProperty, fieldIndex: number) => (
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditField(tableIndex, fieldIndex)}
          >
            Edit
          </Button>
        ),
      },
    ]

    return (
      <Table
        columns={fieldColumns}
        dataSource={table.fields}
        rowKey="physicalFieldName"
        pagination={false}
        size="small"
      />
    )
  }

  return (
    <Layout className="enterprise-ontology-layout">
      <ProjectManager
        visible={isProjectModalVisible}
        onClose={() => setIsProjectModalVisible(false)}
        onSelectProject={handleProjectSelect}
      />

      {!selectedProject ? (
        <Content className="main-content-area">
          <Card>
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Title level={3}>Please Select a Project</Title>
              <Paragraph>Select a project to view and manage its Enterprise Ontology</Paragraph>
              <Button
                type="primary"
                onClick={() => setIsProjectModalVisible(true)}
                size="large"
              >
                Select Project
              </Button>
            </div>
          </Card>
        </Content>
      ) : (
        <>
          <Content className="main-content-area">
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <Title level={2} style={{ margin: 0 }}>Enterprise Ontology</Title>
                  <Paragraph style={{ margin: 0, color: 'rgba(148, 163, 184, 0.8)' }}>
                    Project: {selectedProject.name}
                  </Paragraph>
                </div>
                <Space>
                  <Button
                    icon={<SaveOutlined />}
                    onClick={() => {
                      // Save ontology data
                      message.success('Ontology saved successfully')
                      auditService.logAction('ontology_saved', { projectId: selectedProject.id })
                    }}
                  >
                    Save
                  </Button>
                </Space>
              </div>
            </div>

            <Card>
              <Table
                columns={tableColumns}
                dataSource={ontologyData?.tables || []}
                rowKey="physicalTableName"
                expandable={{
                  expandedRowRender,
                  expandedRowKeys,
                  onExpandedRowsChange: (keys) => setExpandedRowKeys(keys as string[]),
                }}
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Content>

          <Sider width={350} className="right-sidebar">
            <Card className="sidebar-card">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={5}>Import Ontology</Title>
                  <Upload
                    beforeUpload={handleImportOntology}
                    accept=".json,.xml"
                    showUploadList={false}
                  >
                    <Button icon={<ImportOutlined />} block>
                      Import External Ontology
                    </Button>
                  </Upload>
                </div>

                <Divider />

                <div>
                  <Title level={5}>Export to External Tools</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button
                      icon={<ExportOutlined />}
                      block
                      onClick={() => handleExportToTool('Collibra')}
                    >
                      Export to Collibra
                    </Button>
                    <Button
                      icon={<ExportOutlined />}
                      block
                      onClick={() => handleExportToTool('IDMC')}
                    >
                      Export to IDMC
                    </Button>
                    <Button
                      icon={<ExportOutlined />}
                      block
                      onClick={() => handleExportToTool('Databricks Unity Catalog')}
                    >
                      Export to Databricks Unity Catalog
                    </Button>
                    <Button
                      icon={<ExportOutlined />}
                      block
                      onClick={() => handleExportToTool('Azure Purview')}
                    >
                      Export to Azure Purview
                    </Button>
                  </Space>
                </div>

                <Divider />

                <div>
                  <Title level={5}>Download Ontology</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button
                      icon={<FileTextOutlined />}
                      block
                      onClick={handleDownloadXML}
                    >
                      Download as XML
                    </Button>
                    <Button
                      icon={<FileExcelOutlined />}
                      block
                      onClick={handleDownloadCSV}
                    >
                      Download as CSV
                    </Button>
                  </Space>
                </div>
              </Space>
            </Card>
          </Sider>

          <Modal
            title={editingTable !== null ? 'Edit Table Ontology' : 'Edit Field Ontology'}
            open={isEditModalVisible}
            onOk={handleSaveEdit}
            onCancel={() => {
              setIsEditModalVisible(false)
              setEditingTable(null)
              setEditingField(null)
              form.resetFields()
            }}
            width={600}
          >
            <Form form={form} layout="vertical">
              {editingTable !== null ? (
                <>
                  <Form.Item
                    name="standardizedTableName"
                    label="Standardized Table Name"
                    rules={[{ required: true, message: 'Please enter standardized table name' }]}
                  >
                    <Input placeholder="Enter standardized table name" />
                  </Form.Item>
                  <Form.Item
                    name="standardizedTableDescription"
                    label="Standardized Table Description"
                    rules={[{ required: true, message: 'Please enter standardized table description' }]}
                  >
                    <TextArea rows={4} placeholder="Enter standardized table description" />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item
                    name="standardizedFieldName"
                    label="Standardized Field Name"
                    rules={[{ required: true, message: 'Please enter standardized field name' }]}
                  >
                    <Input placeholder="Enter standardized field name" />
                  </Form.Item>
                  <Form.Item
                    name="standardizedFieldDescription"
                    label="Standardized Field Description"
                    rules={[{ required: true, message: 'Please enter standardized field description' }]}
                  >
                    <TextArea rows={4} placeholder="Enter standardized field description" />
                  </Form.Item>
                  <Form.Item
                    name="aliases"
                    label="Aliases (comma-separated)"
                    tooltip="Enter aliases separated by commas"
                  >
                    <Input placeholder="Alias1, Alias2, Alias3" />
                  </Form.Item>
                </>
              )}
            </Form>
          </Modal>
        </>
      )}
    </Layout>
  )
}

export default EnterpriseOntology

