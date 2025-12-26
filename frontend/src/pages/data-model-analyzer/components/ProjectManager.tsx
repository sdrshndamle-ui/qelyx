import { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Table, Space, Tag, Typography, message, Popconfirm, Select } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, LinkOutlined } from '@ant-design/icons'
import { projectService, Project, ExternalResource } from '../services/projectService'

const { TextArea } = Input
const { Title } = Typography
const { Option } = Select

interface ProjectManagerProps {
  visible: boolean
  onClose: () => void
  onSelectProject: (project: Project) => void
  selectedProjectId?: string
}

const ProjectManager = ({ visible, onClose, onSelectProject, selectedProjectId }: ProjectManagerProps) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isResourceModalVisible, setIsResourceModalVisible] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [form] = Form.useForm()
  const [resourceForm] = Form.useForm()

  useEffect(() => {
    if (visible) {
      loadProjects()
    }
  }, [visible])

  const loadProjects = async () => {
    setLoading(true)
    try {
      const data = await projectService.getAllProjects()
      setProjects(data)
    } catch (error) {
      message.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (values: any) => {
    try {
      const newProject = await projectService.createProject({
        name: values.name,
        description: values.description,
        userId: 'user123', // In real app, get from auth context
        externalResources: [],
        models: [],
      })
      setProjects([...projects, newProject])
      setIsCreateModalVisible(false)
      form.resetFields()
      message.success('Project created successfully')
    } catch (error) {
      message.error('Failed to create project')
    }
  }

  const handleEditProject = async (values: any) => {
    if (!editingProject) return
    try {
      const updated = await projectService.updateProject(editingProject.id, {
        name: values.name,
        description: values.description,
      })
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)))
      setIsEditModalVisible(false)
      setEditingProject(null)
      form.resetFields()
      message.success('Project updated successfully')
    } catch (error) {
      message.error('Failed to update project')
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      await projectService.deleteProject(id)
      setProjects(projects.filter((p) => p.id !== id))
      message.success('Project deleted successfully')
    } catch (error) {
      message.error('Failed to delete project')
    }
  }

  const handleAddResource = async (values: any) => {
    if (!currentProject) return
    try {
      const resource: ExternalResource = {
        id: Date.now().toString(),
        name: values.name,
        type: values.type,
        connectionString: values.connectionString,
        description: values.description,
      }
      const updated = await projectService.addExternalResource(currentProject.id, resource)
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)))
      setIsResourceModalVisible(false)
      resourceForm.resetFields()
      setCurrentProject(null)
      message.success('External resource added successfully')
    } catch (error) {
      message.error('Failed to add external resource')
    }
  }

  const handleRemoveResource = async (projectId: string, resourceId: string) => {
    try {
      const updated = await projectService.removeExternalResource(projectId, resourceId)
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)))
      message.success('External resource removed successfully')
    } catch (error) {
      message.error('Failed to remove external resource')
    }
  }

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      fixed: 'left' as const,
      ellipsis: { showTitle: true },
      render: (text: string, record: Project) => (
        <Space size="small" style={{ flexWrap: 'nowrap' }}>
          <span 
            style={{ 
              color: selectedProjectId === record.id ? 'rgb(0, 217, 255)' : '#ffffff',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '130px'
            }}
            title={text}
          >
            {text}
          </span>
          {selectedProjectId === record.id && <Tag color="cyan">Selected</Tag>}
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: { showTitle: true },
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
      ellipsis: { showTitle: true },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      ellipsis: { showTitle: true },
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Models',
      key: 'models',
      width: 70,
      align: 'center' as const,
      render: (_: any, record: Project) => (
        <Tag>{record.models?.length || 0}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 240,
      fixed: 'right' as const,
      render: (_: any, record: Project) => (
        <Space size="small" style={{ flexWrap: 'nowrap' }}>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              setEditingProject(record)
              form.setFieldsValue({
                name: record.name,
                description: record.description,
              })
              setIsEditModalVisible(true)
            }}
            size="small"
            style={{ padding: '0 4px' }}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<LinkOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentProject(record)
              setIsResourceModalVisible(true)
            }}
            size="small"
            style={{ padding: '0 4px' }}
          >
            Resources
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this project?"
            onConfirm={(e) => {
              e?.stopPropagation()
              handleDeleteProject(record.id)
            }}
            okText="Yes"
            cancelText="No"
            onCancel={(e) => e?.stopPropagation()}
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()}
              size="small"
              style={{ padding: '0 4px' }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Modal
        title="Select Project"
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="close" onClick={onClose}>
            Close
          </Button>
        ]}
        width={900}
        style={{ top: 20 }}
        maskClosable={false}
      >
        <Space direction="vertical" size="large" style={{ width: '100%', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Title level={4} style={{ margin: 0 }}>Projects</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalVisible(true)}
            >
              New Project
            </Button>
          </div>
          <div style={{ width: '100%', overflowX: 'auto', overflowY: 'visible' }}>
            <Table
              columns={columns}
              dataSource={projects}
              loading={loading}
              rowKey="id"
              scroll={{ x: 890, y: 500 }}
              onRow={(record) => ({
                onClick: () => {
                  onSelectProject(record)
                  onClose()
                },
                style: { cursor: 'pointer' },
              })}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </Space>
      </Modal>

      <Modal
        title="Create New Project"
        open={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false)
          form.resetFields()
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateProject} layout="vertical">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={4} placeholder="Enter project description" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsCreateModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Project"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setEditingProject(null)
          form.resetFields()
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleEditProject} layout="vertical">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={4} placeholder="Enter project description" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setIsEditModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`External Resources - ${currentProject?.name || ''}`}
        open={isResourceModalVisible}
        onCancel={() => {
          setIsResourceModalVisible(false)
          setCurrentProject(null)
          resourceForm.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Form form={resourceForm} onFinish={handleAddResource} layout="vertical">
            <Form.Item
              name="name"
              label="Resource Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g., Production Database" />
            </Form.Item>
            <Form.Item
              name="type"
              label="Resource Type"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select type">
                <Option value="database">Database</Option>
                <Option value="api">API</Option>
                <Option value="file">File</Option>
                <Option value="url">URL</Option>
              </Select>
            </Form.Item>
            <Form.Item name="connectionString" label="Connection String">
              <Input placeholder="e.g., jdbc:postgresql://host:port/db" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea rows={2} placeholder="Resource description" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Resource
              </Button>
            </Form.Item>
          </Form>

          {currentProject?.externalResources && currentProject.externalResources.length > 0 && (
            <div>
              <Title level={5}>Existing Resources</Title>
              <Table
                dataSource={currentProject.externalResources}
                rowKey="id"
                size="small"
                columns={[
                  { title: 'Name', dataIndex: 'name', key: 'name' },
                  {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    render: (type: string) => <Tag>{type}</Tag>,
                  },
                  { title: 'Description', dataIndex: 'description', key: 'description' },
                  {
                    title: 'Actions',
                    key: 'actions',
                    render: (_: any, record: ExternalResource) => (
                      <Popconfirm
                        title="Remove this resource?"
                        onConfirm={() => handleRemoveResource(currentProject.id, record.id)}
                      >
                        <Button type="link" danger size="small">
                          Remove
                        </Button>
                      </Popconfirm>
                    ),
                  },
                ]}
                pagination={false}
              />
            </div>
          )}
        </Space>
      </Modal>
    </>
  )
}

export default ProjectManager

