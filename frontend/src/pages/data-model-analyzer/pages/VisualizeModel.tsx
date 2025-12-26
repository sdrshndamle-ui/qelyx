import { useState, useCallback, useMemo, useEffect } from 'react'
import { Layout, Card, Select, Button, Input, Space, Typography, Modal, message, Upload, Divider, Tabs, Checkbox, Tag, Alert } from 'antd'
import {
  DownloadOutlined,
  UploadOutlined,
  SaveOutlined,
  PlusOutlined,
  FileTextOutlined,
  SendOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Panel,
  NodeTypes,
} from 'reactflow'
import 'reactflow/dist/style.css'
import CustomTableNode from '../components/CustomTableNode'
import CustomAttributeNode from '../components/CustomAttributeNode'
import AttributeModal from '../components/AttributeModal'
import TableModal from '../components/TableModal'
import { Project, Model } from '../services/projectService'
import { auditService } from '../services/auditService'
import { ddlService } from '../services/ddlService'
import { downloadAsText, downloadAsJSON } from '../utils/downloadUtils'
import ProjectManager from '../components/ProjectManager'
import './VisualizeModel.css'

const { Content, Sider } = Layout
const { TextArea } = Input
const { Option } = Select
const { Title, Paragraph } = Typography

interface TableNode extends Node {
  data: {
    label: string
    columns: Array<{ name: string; type: string; primaryKey?: boolean; isUserAdded?: boolean }>
    tableName: string
    isUserAdded?: boolean
  }
}

interface AttributeNode extends Node {
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

interface Transformation {
  id: string
  edgeId: string
  type: 'filter' | 'map' | 'aggregate' | 'join'
  expression: string
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const VisualizeModel = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedDiagram, setSelectedDiagram] = useState<string>('')
  const [viewLevel, setViewLevel] = useState<'table' | 'attribute'>('table')
  const [searchQuery, setSearchQuery] = useState('')
  const [controlConsole, setControlConsole] = useState('')
  const [resultLogs, setResultLogs] = useState<string>('')
  const [chatQuery, setChatQuery] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [transformations, setTransformations] = useState<Transformation[]>([])
  const [pendingChanges, setPendingChanges] = useState<any[]>([])
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(true)
  const [isCommitModalVisible, setIsCommitModalVisible] = useState(false)
  const [isAttributeModalVisible, setIsAttributeModalVisible] = useState(false)
  const [editingAttribute, setEditingAttribute] = useState<AttributeNode | null>(null)
  const [isTableModalVisible, setIsTableModalVisible] = useState(false)
  const [editingTable, setEditingTable] = useState<TableNode | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const nodeTypes: NodeTypes = useMemo(() => ({
    default: viewLevel === 'table' ? CustomTableNode : CustomAttributeNode,
    table: CustomTableNode,
    attribute: CustomAttributeNode,
  }), [viewLevel])

  // Initialize flow when project or view level changes
  useEffect(() => {
    if (selectedProject && selectedProject.models) {
      initializeFlow(selectedProject.models, viewLevel)
      if (selectedProject.models.length > 0) {
        setSelectedDiagram(selectedProject.models[0].name)
      }
    }
  }, [selectedProject, viewLevel])

  const initializeFlow = (models: Model[], level: 'table' | 'attribute') => {
    if (level === 'table') {
      const initialNodes: TableNode[] = []
      const initialEdges: Edge[] = []

      const cols = Math.ceil(Math.sqrt(models.length))
      models.forEach((model, index) => {
        const row = Math.floor(index / cols)
        const col = index % cols
        
        initialNodes.push({
          id: `table-${model.id}`,
          type: 'table',
          position: { x: col * 350, y: row * 250 },
          data: {
            label: model.name,
            tableName: model.name,
            columns: [
              { name: 'id', type: 'BIGINT', primaryKey: true },
              { name: 'name', type: 'VARCHAR(255)' },
              { name: 'created_at', type: 'TIMESTAMP' },
            ],
            isUserAdded: false,
          },
        })

        if (index > 0 && index % cols !== 0) {
          initialEdges.push({
            id: `edge-${index}`,
            source: `table-${models[index - 1].id}`,
            target: `table-${model.id}`,
            label: 'has relationship',
            type: 'smoothstep',
            animated: true,
            style: { stroke: 'rgb(0, 217, 255)' },
            data: { cardinality: '1:M', isUserAdded: false },
          })
        }
      })

      setNodes(initialNodes)
      setEdges(initialEdges)
    } else {
      // Attribute level visualization
      const initialNodes: AttributeNode[] = []
      const initialEdges: Edge[] = []

      models.forEach((model, modelIndex) => {
        const tableName = model.name
        const attributes = [
          { name: 'id', type: 'BIGINT', isPrimaryKey: true },
          { name: 'name', type: 'VARCHAR(255)' },
          { name: 'created_at', type: 'TIMESTAMP' },
        ]

        attributes.forEach((attr, attrIndex) => {
          initialNodes.push({
            id: `attr-${model.id}-${attrIndex}`,
            type: 'attribute',
            position: { x: modelIndex * 250, y: attrIndex * 100 },
            data: {
              label: attr.name,
              attributeName: attr.name,
              tableName,
              dataType: attr.type,
              isPrimaryKey: attr.isPrimaryKey,
              isUserAdded: false,
            },
          })

          // Create relationships between attributes in same table
          if (attrIndex > 0) {
            initialEdges.push({
              id: `attr-edge-${model.id}-${attrIndex}`,
              source: `attr-${model.id}-${attrIndex - 1}`,
              target: `attr-${model.id}-${attrIndex}`,
              label: 'belongs to',
              type: 'smoothstep',
              style: { stroke: 'rgb(0, 217, 255)' },
              data: { cardinality: '1:1', isUserAdded: false },
            })
          }
        })
      })

      setNodes(initialNodes)
      setEdges(initialEdges)
    }
  }

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `edge-${Date.now()}`,
        label: 'relationship',
        type: 'smoothstep',
        animated: true,
        style: { stroke: 'rgb(0, 217, 255)' },
        data: { cardinality: '1:M', isUserAdded: true },
      } as Edge
      setEdges((eds) => addEdge(newEdge, eds))
      auditService.logAction('relationship_created', { from: params.source, to: params.target })
      setPendingChanges((prev) => [...prev, { 
        type: 'add_relationship', 
        from: params.source, 
        to: params.target,
        timestamp: new Date().toISOString(),
      }])
      message.success('New relationship created')
    },
    [setEdges]
  )

  const handleNodeClick = (_event: React.MouseEvent, node: Node) => {
    if (viewLevel === 'table') {
      // Table level - show edit/delete options
      const tableNode = node as TableNode
      Modal.confirm({
        title: `Table: ${tableNode.data.tableName}`,
        content: (
          <div>
            {tableNode.data.description && <p><strong>Description:</strong> {tableNode.data.description}</p>}
            <p><strong>Columns:</strong> {tableNode.data.columns.length}</p>
            <p><strong>Primary Keys:</strong> {tableNode.data.columns.filter((c) => c.primaryKey).length}</p>
            <p><strong>Foreign Keys:</strong> {tableNode.data.columns.filter((c) => c.foreignKey).length}</p>
          </div>
        ),
        okText: 'Edit',
        cancelText: 'Delete',
        okType: 'default',
        cancelButtonProps: { danger: true },
        onOk: () => {
          handleEditTable(node.id)
          Modal.destroyAll()
        },
        onCancel: () => {
          handleDeleteTable(node.id)
          Modal.destroyAll()
        },
      })
    } else {
      // Attribute level - show edit/delete options
      const attributeNode = node as AttributeNode
      Modal.confirm({
        title: `Attribute: ${attributeNode.data.attributeName}`,
        content: (
          <div>
            <p><strong>Table:</strong> {attributeNode.data.tableName}</p>
            <p><strong>Data Type:</strong> {attributeNode.data.dataType}</p>
            {attributeNode.data.isPrimaryKey && <Tag color="cyan">Primary Key</Tag>}
            {attributeNode.data.isForeignKey && <Tag color="blue">Foreign Key</Tag>}
          </div>
        ),
        okText: 'Edit',
        cancelText: 'Delete',
        okType: 'default',
        cancelButtonProps: { danger: true },
        onOk: () => {
          handleEditAttribute(node.id)
          Modal.destroyAll()
        },
        onCancel: () => {
          handleDeleteAttribute(node.id)
          Modal.destroyAll()
        },
      })
      const attrNode = node as AttributeNode
      Modal.info({
        title: `Edit Attribute: ${attrNode.data.attributeName}`,
        content: (
          <div>
            <p>Table: {attrNode.data.tableName}</p>
            <p>Type: {attrNode.data.dataType}</p>
          </div>
        ),
      })
    }
    auditService.logAction('node_clicked', { nodeId: node.id })
  }

  const handleAddTable = () => {
    if (viewLevel === 'table') {
      setEditingTable(null)
      setIsTableModalVisible(true)
    }
  }

  const handleEditTable = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId) as TableNode | undefined
    if (node && viewLevel === 'table') {
      setEditingTable(node)
      setIsTableModalVisible(true)
    }
  }

  const handleDeleteTable = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId) as TableNode | undefined
    if (!node) return

    const primaryKeyColumns = node.data.columns.filter((c) => c.primaryKey).length
    const foreignKeyColumns = node.data.columns.filter((c) => c.foreignKey).length
    const relatedEdges = edges.filter(
      (e) => e.source === nodeId || e.target === nodeId
    )
    const relatedTables = new Set<string>()
    relatedEdges.forEach((e) => {
      if (e.source === nodeId) relatedTables.add(e.target)
      if (e.target === nodeId) relatedTables.add(e.source)
    })

    let impactMessage = `Deleting table "${node.data.tableName}" will:\n`
    impactMessage += `- Remove the entire table and all ${node.data.columns.length} column(s)\n`
    impactMessage += `- ⚠️ CRITICAL: Remove ${primaryKeyColumns} Primary Key(s) - this will break all foreign key relationships\n`
    impactMessage += `- ⚠️ CRITICAL: Remove ${foreignKeyColumns} Foreign Key(s) - this will break referential integrity\n`
    impactMessage += `- Remove ${relatedEdges.length} relationship(s) with other tables\n`
    impactMessage += `- Impact ${relatedTables.size} related table(s): ${Array.from(relatedTables).map((id) => {
      const relatedNode = nodes.find((n) => n.id === id) as TableNode | undefined
      return relatedNode?.data.tableName || id
    }).join(', ')}\n`
    impactMessage += `- All data in this table will be permanently lost\n`
    impactMessage += `\n⚠️ WARNING: This action cannot be undone. All dependent tables and queries will be affected.`

    Modal.confirm({
      title: 'Confirm Delete Table',
      width: 700,
      content: (
        <div>
          <Paragraph>
            Are you sure you want to delete the table <strong>"{node.data.tableName}"</strong>?
          </Paragraph>
          <Alert
            message="Impact Analysis"
            description={<pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 12 }}>{impactMessage}</pre>}
            type="error"
            showIcon
            style={{ marginTop: 16 }}
          />
        </div>
      ),
      okText: 'Delete Table',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        // Remove the node
        setNodes((nds) => {
          // In attribute view, also remove all attributes belonging to this table
          if (viewLevel === 'attribute') {
            return nds.filter((n) => {
              if (n.id === nodeId) return false
              if (n.type === 'attribute') {
                const attrNode = n as AttributeNode
                return attrNode.data.tableName !== node.data.tableName
              }
              return true
            })
          }
          return nds.filter((n) => n.id !== nodeId)
        })
        
        // Remove related edges
        setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId))
        
        // Log audit
        auditService.logAction('table_deleted', {
          tableId: nodeId,
          tableName: node.data.tableName,
          impact: {
            columnsRemoved: node.data.columns.length,
            primaryKeysRemoved: primaryKeyColumns,
            foreignKeysRemoved: foreignKeyColumns,
            relationshipsRemoved: relatedEdges.length,
            relatedTablesAffected: relatedTables.size,
          },
        }, selectedProject?.id)
        
        // Add to pending changes
        setPendingChanges((prev) => [...prev, {
          type: 'delete_table',
          tableId: nodeId,
          tableName: node.data.tableName,
          timestamp: new Date().toISOString(),
        }])
        
        message.success('Table deleted successfully. All associated attributes have been removed.')
      },
    })
  }

  const handleSaveTable = (tableData: {
    tableName: string
    description: string
    relationships: Array<{
      id: string
      targetTableId: string
      targetTableName: string
      type: string
    }>
    columns: Array<{
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
    }>
  }) => {
    if (editingTable) {
      // Update existing table
      const updatedNode: TableNode = {
        ...editingTable,
        data: {
          ...editingTable.data,
          tableName: tableData.tableName,
          description: tableData.description,
          columns: tableData.columns.map((col) => ({
            name: col.name,
            type: col.length && col.dataType !== 'INT' && col.dataType !== 'BIGINT' && col.dataType !== 'DATE' && col.dataType !== 'DATETIME' && col.dataType !== 'BOOLEAN' && col.dataType !== 'TEXT'
              ? `${col.dataType}(${col.length})`
              : col.dataType,
            description: col.description,
            alias: col.alias,
            primaryKey: col.primaryKey,
            foreignKey: col.foreignKey,
            nullable: col.nullable,
            referencedTable: col.referencedTable,
            referencedColumn: col.referencedColumn,
            isUserAdded: editingTable.data.isUserAdded,
          })),
        },
      }
      
      setNodes((nds) => nds.map((n) => (n.id === editingTable.id ? updatedNode : n)))
      
      // Update relationships (edges)
      const existingEdges = edges.filter((e) => e.source === editingTable.id || e.target === editingTable.id)
      const newEdges: Edge[] = tableData.relationships.map((rel) => {
        const existingEdge = existingEdges.find((e) => e.target === rel.targetTableId || e.source === rel.targetTableId)
        return {
          id: existingEdge?.id || `edge-${Date.now()}-${Math.random()}`,
          source: editingTable.id,
          target: rel.targetTableId,
          label: rel.type,
          type: 'smoothstep',
          animated: true,
          data: {
            cardinality: rel.type,
            isUserAdded: true,
          },
        }
      })
      
      // Remove old edges and add new ones
      setEdges((eds) => [
        ...eds.filter((e) => e.source !== editingTable.id && e.target !== editingTable.id),
        ...newEdges,
      ])
      
      auditService.logAction('table_updated', {
        tableId: editingTable.id,
        tableName: tableData.tableName,
        changes: tableData,
      }, selectedProject?.id)
      
      setPendingChanges((prev) => [...prev, {
        type: 'update_table',
        tableId: editingTable.id,
        tableName: tableData.tableName,
        timestamp: new Date().toISOString(),
      }])
      
      message.success('Table updated successfully')
    } else {
      // Add new table
      const newNode: TableNode = {
        id: `table-${Date.now()}`,
        type: 'table',
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: {
          label: tableData.tableName,
          tableName: tableData.tableName,
          description: tableData.description,
          columns: tableData.columns.map((col) => ({
            name: col.name,
            type: col.length && col.dataType !== 'INT' && col.dataType !== 'BIGINT' && col.dataType !== 'DATE' && col.dataType !== 'DATETIME' && col.dataType !== 'BOOLEAN' && col.dataType !== 'TEXT'
              ? `${col.dataType}(${col.length})`
              : col.dataType,
            description: col.description,
            alias: col.alias,
            primaryKey: col.primaryKey,
            foreignKey: col.foreignKey,
            nullable: col.nullable,
            referencedTable: col.referencedTable,
            referencedColumn: col.referencedColumn,
            isUserAdded: true,
          })),
          isUserAdded: true,
        },
      }
      
      setNodes((nds) => [...nds, newNode])
      
      // Create edges for relationships
      const newEdges: Edge[] = tableData.relationships.map((rel) => ({
        id: `edge-${Date.now()}-${Math.random()}`,
        source: newNode.id,
        target: rel.targetTableId,
        label: rel.type,
        type: 'smoothstep',
        animated: true,
        data: {
          cardinality: rel.type,
          isUserAdded: true,
        },
      }))
      
      setEdges((eds) => [...eds, ...newEdges])
      
      auditService.logAction('table_added', {
        tableId: newNode.id,
        tableName: tableData.tableName,
        columns: tableData.columns.length,
        relationships: tableData.relationships.length,
      }, selectedProject?.id)
      
      setPendingChanges((prev) => [...prev, {
        type: 'add_table',
        tableId: newNode.id,
        tableName: tableData.tableName,
        timestamp: new Date().toISOString(),
      }])
      
      message.success('New table added successfully')
    }
    
    setIsTableModalVisible(false)
    setEditingTable(null)
  }

  const handleAddColumn = (tableId: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === tableId && viewLevel === 'table') {
          const tableNode = node as TableNode
          const newColumn = { 
            name: `new_column_${Date.now()}`, 
            type: 'VARCHAR(255)',
            isUserAdded: true,
          }
          auditService.logAction('column_added', { tableId, column: newColumn.name })
          setPendingChanges((prev) => [...prev, { 
            type: 'add_column', 
            tableName: tableNode.data.tableName, 
            column: newColumn,
            timestamp: new Date().toISOString(),
          }])
          return {
            ...node,
            data: {
              ...tableNode.data,
              columns: [...tableNode.data.columns, newColumn],
            },
          }
        }
        return node
      })
    )
    message.success('New column added')
  }

  const handleAddAttribute = () => {
    if (viewLevel === 'attribute') {
      setEditingAttribute(null)
      setIsAttributeModalVisible(true)
    }
  }

  const handleEditAttribute = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId) as AttributeNode | undefined
    if (node && viewLevel === 'attribute') {
      setEditingAttribute(node)
      setIsAttributeModalVisible(true)
    }
  }

  const handleDeleteAttribute = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId) as AttributeNode | undefined
    if (!node) return

    const isPrimaryKey = node.data.isPrimaryKey
    const isForeignKey = node.data.isForeignKey
    const relatedEdges = edges.filter(
      (e) => e.source === nodeId || e.target === nodeId
    )

    let impactMessage = `Deleting "${node.data.attributeName}" will:\n`
    impactMessage += `- Remove the attribute from the data model\n`
    if (isPrimaryKey) {
      impactMessage += `- ⚠️ WARNING: This is a Primary Key. Deleting it will break all foreign key relationships.\n`
    }
    if (isForeignKey) {
      impactMessage += `- ⚠️ WARNING: This is a Foreign Key. Deleting it will break referential integrity.\n`
    }
    impactMessage += `- Remove ${relatedEdges.length} relationship(s) associated with this attribute\n`
    impactMessage += `- Impact ${relatedEdges.length} dependent attribute(s)\n`

    Modal.confirm({
      title: 'Confirm Delete Attribute',
      width: 600,
      content: (
        <div>
          <Paragraph>
            Are you sure you want to delete the attribute <strong>"{node.data.attributeName}"</strong>?
          </Paragraph>
          <Alert
            message="Impact Analysis"
            description={<pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 12 }}>{impactMessage}</pre>}
            type="warning"
            showIcon
            style={{ marginTop: 16 }}
          />
        </div>
      ),
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        // Remove the node
        setNodes((nds) => nds.filter((n) => n.id !== nodeId))
        
        // Remove related edges
        setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId))
        
        // Log audit
        auditService.logAction('attribute_deleted', {
          attributeId: nodeId,
          attributeName: node.data.attributeName,
          impact: {
            relationshipsRemoved: relatedEdges.length,
            isPrimaryKey,
            isForeignKey,
          },
        }, selectedProject?.id)
        
        // Add to pending changes
        setPendingChanges((prev) => [...prev, {
          type: 'delete_attribute',
          attributeId: nodeId,
          attributeName: node.data.attributeName,
          timestamp: new Date().toISOString(),
        }])
        
        message.success('Attribute deleted successfully')
      },
    })
  }

  const handleSaveAttribute = (attributeData: {
    attributeName: string
    tableName: string
    dataType: string
    length?: number
    nullable: boolean
    isPrimaryKey: boolean
    isForeignKey: boolean
    referencedTable?: string
    referencedColumn?: string
    relationships: Array<{
      id: string
      targetAttributeId: string
      targetAttributeName: string
      cardinality: string
    }>
  }) => {
    if (editingAttribute) {
      // Update existing attribute
      const updatedNode: AttributeNode = {
        ...editingAttribute,
        data: {
          ...editingAttribute.data,
          attributeName: attributeData.attributeName,
          tableName: attributeData.tableName,
          dataType: attributeData.dataType,
          isPrimaryKey: attributeData.isPrimaryKey,
          isForeignKey: attributeData.isForeignKey,
          referencedTable: attributeData.referencedTable,
          referencedColumn: attributeData.referencedColumn,
        },
      }
      
      setNodes((nds) => nds.map((n) => (n.id === editingAttribute.id ? updatedNode : n)))
      
      // Update relationships (edges)
      const existingEdges = edges.filter((e) => e.source === editingAttribute.id || e.target === editingAttribute.id)
      const newEdges: Edge[] = attributeData.relationships.map((rel) => {
        const existingEdge = existingEdges.find((e) => e.target === rel.targetAttributeId)
        return {
          id: existingEdge?.id || `edge-${Date.now()}-${Math.random()}`,
          source: editingAttribute.id,
          target: rel.targetAttributeId,
          label: rel.cardinality,
          type: 'smoothstep',
          animated: true,
          data: {
            cardinality: rel.cardinality,
            isUserAdded: true,
          },
        }
      })
      
      // Remove old edges and add new ones
      setEdges((eds) => [
        ...eds.filter((e) => e.source !== editingAttribute.id && e.target !== editingAttribute.id),
        ...newEdges,
      ])
      
      auditService.logAction('attribute_updated', {
        attributeId: editingAttribute.id,
        attributeName: attributeData.attributeName,
        changes: attributeData,
      }, selectedProject?.id)
      
      setPendingChanges((prev) => [...prev, {
        type: 'update_attribute',
        attributeId: editingAttribute.id,
        attributeName: attributeData.attributeName,
        timestamp: new Date().toISOString(),
      }])
      
      message.success('Attribute updated successfully')
    } else {
      // Add new attribute
      const newNode: AttributeNode = {
        id: `attr-${Date.now()}`,
        type: 'attribute',
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: {
          label: attributeData.attributeName,
          attributeName: attributeData.attributeName,
          tableName: attributeData.tableName,
          dataType: attributeData.dataType,
          isPrimaryKey: attributeData.isPrimaryKey,
          isForeignKey: attributeData.isForeignKey,
          referencedTable: attributeData.referencedTable,
          referencedColumn: attributeData.referencedColumn,
          isUserAdded: true,
        },
      }
      
      setNodes((nds) => [...nds, newNode])
      
      // Create edges for relationships
      const newEdges: Edge[] = attributeData.relationships.map((rel) => ({
        id: `edge-${Date.now()}-${Math.random()}`,
        source: newNode.id,
        target: rel.targetAttributeId,
        label: rel.cardinality,
        type: 'smoothstep',
        animated: true,
        data: {
          cardinality: rel.cardinality,
          isUserAdded: true,
        },
      }))
      
      setEdges((eds) => [...eds, ...newEdges])
      
      auditService.logAction('attribute_added', {
        attributeId: newNode.id,
        attributeName: attributeData.attributeName,
        relationships: attributeData.relationships.length,
      }, selectedProject?.id)
      
      setPendingChanges((prev) => [...prev, {
        type: 'add_attribute',
        attributeId: newNode.id,
        attributeName: attributeData.attributeName,
        timestamp: new Date().toISOString(),
      }])
      
      message.success('New attribute added successfully')
    }
    
    setIsAttributeModalVisible(false)
    setEditingAttribute(null)
  }

  const handleAddTransformation = (edgeId: string) => {
    Modal.confirm({
      title: 'Add Transformation',
      content: (
        <div>
          <Select
            placeholder="Select transformation type"
            style={{ width: '100%', marginBottom: 8 }}
            onChange={(value) => {
              const newTransformation: Transformation = {
                id: `trans-${Date.now()}`,
                edgeId,
                type: value as any,
                expression: '',
              }
              setTransformations([...transformations, newTransformation])
              auditService.logAction('transformation_added', { edgeId, type: value })
              setPendingChanges((prev) => [...prev, { 
                type: 'add_transformation', 
                edgeId, 
                transformation: newTransformation,
                timestamp: new Date().toISOString(),
              }])
              message.success(`Transformation '${value}' added`)
              Modal.destroyAll()
            }}
          >
            <Option value="filter">Filter</Option>
            <Option value="map">Map</Option>
            <Option value="aggregate">Aggregate</Option>
            <Option value="join">Join</Option>
          </Select>
        </div>
      ),
      onOk: () => {},
    })
  }

  const handleEdgeClick = (_event: React.MouseEvent, edge: Edge) => {
    Modal.confirm({
      title: 'Edit Relationship',
      content: (
        <div>
          <p>Edge: {edge.label || 'relationship'}</p>
          <p>Cardinality: {edge.data?.cardinality || 'N/A'}</p>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handleAddTransformation(edge.id)
                Modal.destroyAll()
              }}
            >
              Add Transformation
            </Button>
            <Button
              danger
              onClick={() => {
                setEdges((eds) => eds.filter((e) => e.id !== edge.id))
                auditService.logAction('relationship_deleted', { edgeId: edge.id })
                setPendingChanges((prev) => [...prev, { 
                  type: 'delete_relationship', 
                  edgeId: edge.id,
                  timestamp: new Date().toISOString(),
                }])
                message.success(`Relationship ${edge.id} deleted`)
                Modal.destroyAll()
              }}
            >
              Delete Relationship
            </Button>
          </Space>
        </div>
      ),
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query) {
      setNodes((nds) =>
        nds.map((node) => {
          const matches = viewLevel === 'table'
            ? (node as TableNode).data.tableName.toLowerCase().includes(query.toLowerCase()) ||
              (node as TableNode).data.columns.some((col) =>
                col.name.toLowerCase().includes(query.toLowerCase())
              )
            : (node as AttributeNode).data.attributeName.toLowerCase().includes(query.toLowerCase()) ||
              (node as AttributeNode).data.tableName.toLowerCase().includes(query.toLowerCase())
          
          return {
            ...node,
            style: {
              ...node.style,
              opacity: matches ? 1 : 0.3,
            },
          }
        })
      )
    } else {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          style: { ...node.style, opacity: 1 },
        }))
      )
    }
  }

  const handleProcess = async () => {
    if (!controlConsole.trim()) {
      message.warning('Please enter instructions in the Control Console')
      return
    }

    setResultLogs(`Processing: ${controlConsole}\n\n`)
    auditService.logAction('process_instruction', { instruction: controlConsole })

    // Simulate AI processing
    setTimeout(() => {
      const response = `Instruction processed: "${controlConsole}"\n\nActions taken:\n- Analyzed relationships\n- Updated model structure\n- Applied transformations`
      setResultLogs((prev) => prev + response)
      message.success('Processing completed')
    }, 2000)
  }

  const handleChatSubmit = async () => {
    if (!chatQuery.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatQuery,
      timestamp: new Date(),
    }
    setChatMessages((prev) => [...prev, userMessage])
    auditService.logAction('chat_query', { query: chatQuery })

    // Simulate AI response and process amendments
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on your request: "${chatQuery}", I've analyzed the model. Would you like me to add a new table, column, or relationship?`,
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, aiResponse])

      // Process common amendment requests
      const lowerQuery = chatQuery.toLowerCase()
      if (lowerQuery.includes('add table') || lowerQuery.includes('create table')) {
        handleAddTable()
      } else if (lowerQuery.includes('add column') || lowerQuery.includes('add attribute')) {
        if (nodes.length > 0) {
          handleAddColumn(nodes[0].id)
        }
      } else if (lowerQuery.includes('add relationship') || lowerQuery.includes('create relationship')) {
        message.info('Please drag from one node to another to create a relationship')
      }
    }, 1500)

    setChatQuery('')
  }

  const handleBulkUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const tasks = JSON.parse(content)
        setResultLogs(`Uploaded ${tasks.length} tasks from ${file.name}\n\n`)
        tasks.forEach((task: any, idx: number) => {
          setResultLogs((prev) => prev + `Task ${idx + 1}: ${JSON.stringify(task)}\n`)
        })
        message.success(`Uploaded ${tasks.length} tasks`)
        auditService.logAction('bulk_upload', { taskCount: tasks.length })
        setPendingChanges((prev) => [...prev, { 
          type: 'bulk_upload', 
          fileName: file.name, 
          tasks,
          timestamp: new Date().toISOString(),
        }])
      } catch (error) {
        message.error('Failed to parse task list file')
      }
    }
    reader.readAsText(file)
    return false
  }

  const handleSaveResults = () => {
    const results = {
      nodes,
      edges,
      transformations,
      resultLogs,
      chatMessages,
      pendingChanges,
      timestamp: new Date().toISOString(),
    }
    downloadAsJSON(results, `visualize-model-results-${Date.now()}`)
    message.success('Results saved successfully')
    auditService.logAction('results_saved', { nodeCount: nodes.length, edgeCount: edges.length })
  }

  const handleCommitChanges = () => {
    if (pendingChanges.length === 0) {
      message.info('No pending changes to commit')
      return
    }
    setIsCommitModalVisible(true)
  }

  const handleAcceptChanges = () => {
    auditService.logAction('changes_accepted', { changeCount: pendingChanges.length })
    setPendingChanges([])
    setIsCommitModalVisible(false)
    message.success('Changes accepted and committed successfully!')
  }

  const handleDeclineChanges = () => {
    auditService.logAction('changes_declined', { changeCount: pendingChanges.length })
    // Revert user-added elements
    setNodes((nds) => nds.filter((n) => {
      if (viewLevel === 'table') {
        return !(n as TableNode).data.isUserAdded
      } else {
        return !(n as AttributeNode).data.isUserAdded
      }
    }))
    setEdges((eds) => eds.filter((e) => !e.data?.isUserAdded))
    setPendingChanges([])
    setIsCommitModalVisible(false)
    message.info('Changes declined and reverted')
  }

  const handleModifyChanges = () => {
    setIsCommitModalVisible(false)
    message.info('Please modify the changes in the diagram and commit again')
  }

  const handleGenerateDDL = () => {
    const ddl = ddlService.generateDDL(nodes, edges)
    downloadAsText(ddl, `ddl-${Date.now()}.sql`)
    message.success('DDL generated and downloaded')
    auditService.logAction('ddl_generated', { nodeCount: nodes.length, edgeCount: edges.length })
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setIsProjectModalVisible(false)
    message.success(`Selected project: ${project.name}`)
  }

  const filteredNodes = useMemo(() => {
    if (!searchQuery) return nodes
    return nodes.filter((node) => {
      if (viewLevel === 'table') {
        const tableNode = node as TableNode
        return (
          tableNode.data.tableName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tableNode.data.columns.some((col) =>
            col.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      } else {
        const attrNode = node as AttributeNode
        return (
          attrNode.data.attributeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attrNode.data.tableName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
    })
  }, [nodes, searchQuery, viewLevel])

  const userAddedCount = useMemo(() => {
    const userNodes = nodes.filter((n) => {
      if (viewLevel === 'table') {
        return (n as TableNode).data.isUserAdded
      } else {
        return (n as AttributeNode).data.isUserAdded
      }
    })
    const userEdges = edges.filter((e) => e.data?.isUserAdded)
    return userNodes.length + userEdges.length
  }, [nodes, edges, viewLevel])

  return (
    <Layout className="visualize-model-layout">
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
              <Paragraph>Select a project to visualize its data models</Paragraph>
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
            <div className="flow-container">
              <ReactFlow
                nodes={filteredNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={handleNodeClick}
                onEdgeClick={handleEdgeClick}
                nodeTypes={nodeTypes}
                fitView
              >
                <Controls />
                <Background />
                <MiniMap />
                <Panel position="top-left">
                  <Tabs
                    items={[
                      {
                        key: 'tables',
                        label: `${nodes.length} ${viewLevel === 'table' ? 'Tables' : 'Attributes'}`,
                      },
                      {
                        key: 'relationships',
                        label: `${edges.length} Relationships`,
                      },
                    ]}
                    size="small"
                  />
                </Panel>
                <Panel position="top-right">
                  <Space>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={viewLevel === 'table' ? handleAddTable : handleAddAttribute}
                      size="small"
                    >
                      Add {viewLevel === 'table' ? 'Table' : 'Attribute'}
                    </Button>
                    <Button
                      icon={<SaveOutlined />}
                      onClick={handleCommitChanges}
                      size="small"
                      disabled={pendingChanges.length === 0}
                    >
                      Commit ({pendingChanges.length})
                    </Button>
                    <Button
                      icon={<FileTextOutlined />}
                      onClick={handleGenerateDDL}
                      size="small"
                    >
                      Generate DDL
                    </Button>
                    <Button
                      icon={<SaveOutlined />}
                      onClick={handleSaveResults}
                      size="small"
                    >
                      Save
                    </Button>
                  </Space>
                </Panel>
              </ReactFlow>
            </div>
          </Content>

          <Sider width={400} className="right-sidebar">
            <Card className="sidebar-card">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <label className="input-label">Select Diagram</label>
                  <Select
                    value={selectedDiagram}
                    onChange={setSelectedDiagram}
                    style={{ width: '100%' }}
                  >
                    {selectedProject.models?.map((model) => (
                      <Option key={model.id} value={model.name}>
                        {model.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="input-label">View Level</label>
                  <Select
                    value={viewLevel}
                    onChange={setViewLevel}
                    style={{ width: '100%' }}
                  >
                    <Option value="table">Table Level</Option>
                    <Option value="attribute">Attribute Level</Option>
                  </Select>
                </div>

                <div>
                  <label className="input-label">Search Entity/Column</label>
                  <Input
                    placeholder="Search..."
                    prefix={<SearchOutlined />}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    allowClear
                  />
                </div>

                <Divider />

                <div>
                  <Title level={5}>Control Console</Title>
                  <TextArea
                    rows={6}
                    placeholder="Please instruct ERD Agent for a task..."
                    value={controlConsole}
                    onChange={(e) => setControlConsole(e.target.value)}
                  />
                  <Space style={{ marginTop: 8, width: '100%' }} direction="vertical">
                    <Button
                      type="primary"
                      block
                      onClick={handleProcess}
                    >
                      Process
                    </Button>
                    <div style={{ textAlign: 'center', color: 'rgba(148, 163, 184, 0.8)' }}>OR</div>
                    <Upload
                      beforeUpload={(file) => {
                        handleBulkUpload(file)
                        return false
                      }}
                      accept=".json,.txt"
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />} block>
                        Click to upload task list file
                      </Button>
                    </Upload>
                  </Space>
                </div>

                <Divider />

                <div>
                  <Title level={5}>Result Logs</Title>
                  <TextArea
                    rows={8}
                    value={resultLogs}
                    readOnly
                    style={{
                      background: 'rgba(2, 6, 23, 0.5)',
                      color: 'rgba(226, 232, 240, 0.86)',
                      fontFamily: 'monospace',
                      fontSize: 12,
                    }}
                  />
                  {resultLogs && (
                    <Button
                      type="text"
                      icon={<DownloadOutlined />}
                      size="small"
                      onClick={() => downloadAsText(resultLogs, `result-logs-${Date.now()}.txt`)}
                      style={{ marginTop: 8 }}
                    >
                      Download Logs
                    </Button>
                  )}
                </div>

                <Divider />

                <div>
                  <Title level={5}>Chat for Amendments</Title>
                  <div className="chat-history-container" style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 8 }}>
                    {chatMessages.length === 0 ? (
                      <Paragraph style={{ color: 'rgba(148, 163, 184, 0.8)', textAlign: 'center', fontSize: 12 }}>
                        Ask questions or request amendments...
                      </Paragraph>
                    ) : (
                      chatMessages.map((msg) => (
                        <div key={msg.id} className={`chat-message ${msg.role}`} style={{ marginBottom: 8, padding: 8, background: msg.role === 'user' ? 'rgba(0, 217, 255, 0.1)' : 'rgba(2, 6, 23, 0.5)', borderRadius: 4 }}>
                          <strong style={{ color: 'rgb(0, 217, 255)' }}>{msg.role === 'user' ? 'You' : 'AI'}:</strong>
                          <div style={{ marginTop: 4, fontSize: 12 }}>{msg.content}</div>
                        </div>
                      ))
                    )}
                  </div>
                  <TextArea
                    rows={3}
                    placeholder="Ask questions or request amendments (e.g., 'add a new table', 'add column to Customer')..."
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    onPressEnter={(e) => {
                      if (e.shiftKey) return
                      e.preventDefault()
                      handleChatSubmit()
                    }}
                  />
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    block
                    onClick={handleChatSubmit}
                    style={{ marginTop: 8 }}
                  >
                    Send
                  </Button>
                  {chatMessages.length > 0 && (
                    <Button
                      type="text"
                      icon={<DownloadOutlined />}
                      size="small"
                      onClick={() => downloadAsJSON(chatMessages, `chat-history-${Date.now()}.json`)}
                      style={{ marginTop: 8 }}
                    >
                      Download Chat
                    </Button>
                  )}
                </div>

                <Divider />

                <div>
                  <Title level={5}>Download</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={handleSaveResults}
                      block
                    >
                      Download Results
                    </Button>
                    <Button
                      icon={<FileTextOutlined />}
                      onClick={handleGenerateDDL}
                      block
                    >
                      Generate & Download DDL
                    </Button>
                  </Space>
                </div>
              </Space>
            </Card>
          </Sider>

          <Modal
            title="Review Changes Before Committing"
            open={isCommitModalVisible}
            onCancel={() => {
              setIsCommitModalVisible(false)
            }}
            footer={[
              <Button key="decline" danger icon={<CloseOutlined />} onClick={handleDeclineChanges}>
                Decline
              </Button>,
              <Button key="modify" icon={<EditOutlined />} onClick={handleModifyChanges}>
                Modify
              </Button>,
              <Button key="accept" type="primary" icon={<CheckOutlined />} onClick={handleAcceptChanges}>
                Accept & Commit
              </Button>,
            ]}
            width={700}
          >
            <div>
              <Paragraph>
                Please review the following changes before committing. User-added elements are highlighted in green.
              </Paragraph>
              <Card size="small" style={{ marginBottom: 16, background: '#020617', borderColor: 'rgba(148, 163, 184, 0.3)' }}>
                <Title level={5} style={{ color: 'white' }}>Summary of Changes</Title>
                <ul style={{ color: 'rgba(226, 232, 240, 0.86)' }}>
                  <li>New {viewLevel === 'table' ? 'Tables' : 'Attributes'}: {nodes.filter((n) => {
                    if (viewLevel === 'table') {
                      return (n as TableNode).data.isUserAdded
                    } else {
                      return (n as AttributeNode).data.isUserAdded
                    }
                  }).length}</li>
                  <li>New Columns: {pendingChanges.filter(c => c.type === 'add_column').length}</li>
                  <li>New Relationships: {edges.filter(e => e.data?.isUserAdded).length}</li>
                  <li>Transformations Added: {pendingChanges.filter(c => c.type === 'add_transformation').length}</li>
                  <li>Relationships Deleted: {pendingChanges.filter(c => c.type === 'delete_relationship').length}</li>
                  <li>Total Pending Changes: {pendingChanges.length}</li>
                </ul>
              </Card>
              <div style={{ marginTop: 16 }}>
                <Checkbox>I understand and accept these changes will be committed to the data model.</Checkbox>
              </div>
              {userAddedCount > 0 && (
                <div style={{ marginTop: 12 }}>
                  <Tag color="green">Note: {userAddedCount} user-added element(s) will be highlighted in green</Tag>
                </div>
              )}
            </div>
          </Modal>
        </>
      )}

      {/* Attribute Modal */}
      {viewLevel === 'attribute' && (
        <AttributeModal
          visible={isAttributeModalVisible}
          onCancel={() => {
            setIsAttributeModalVisible(false)
            setEditingAttribute(null)
          }}
          onSave={handleSaveAttribute}
          editingAttribute={editingAttribute}
          availableAttributes={nodes.filter((n) => n.type === 'attribute') as AttributeNode[]}
          availableTables={Array.from(new Set(nodes.map((n) => {
            if (viewLevel === 'table') {
              return (n as TableNode).data.tableName
            } else {
              return (n as AttributeNode).data.tableName
            }
          })))}
        />
      )}

      {/* Table Modal */}
      {viewLevel === 'table' && (
        <TableModal
          visible={isTableModalVisible}
          onCancel={() => {
            setIsTableModalVisible(false)
            setEditingTable(null)
          }}
          onSave={handleSaveTable}
          editingTable={editingTable}
          availableTables={nodes.filter((n) => n.type === 'table') as TableNode[]}
        />
      )}
    </Layout>
  )
}

export default VisualizeModel
