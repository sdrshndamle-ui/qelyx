import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Button, Space, Tag } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

interface TableNodeData {
  label: string
  tableName: string
  columns: Array<{ name: string; type: string; primaryKey?: boolean; isUserAdded?: boolean }>
  isUserAdded?: boolean
}

const CustomTableNode = ({ data, selected }: NodeProps<TableNodeData>) => {
  const isUserAdded = data.isUserAdded || false
  
  return (
    <div
      className={`custom-table-node ${selected ? 'selected' : ''} ${isUserAdded ? 'user-added' : ''}`}
      style={{
        background: isUserAdded 
          ? 'rgba(82, 196, 26, 0.15)' 
          : 'rgba(15, 23, 42, 0.95)',
        border: selected 
          ? '2px solid rgb(0, 217, 255)' 
          : isUserAdded
          ? '2px solid rgba(82, 196, 26, 0.8)'
          : '1px solid rgba(0, 217, 255, 0.3)',
        borderRadius: '8px',
        padding: '12px',
        minWidth: '250px',
        boxShadow: selected 
          ? '0 0 15px rgba(0, 217, 255, 0.5)' 
          : isUserAdded
          ? '0 0 10px rgba(82, 196, 26, 0.3)'
          : 'none',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: 'rgb(0, 217, 255)' }} />
      
      <div style={{ marginBottom: 8, borderBottom: '1px solid rgba(148, 163, 184, 0.3)', paddingBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, color: 'rgb(0, 217, 255)', fontSize: 14 }}>
            {data.tableName}
          </div>
          {isUserAdded && (
            <Tag color="green" style={{ fontSize: 10, margin: 0 }}>New</Tag>
          )}
        </div>
        <Space size="small" style={{ marginTop: 4 }}>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            style={{ color: 'rgba(226, 232, 240, 0.86)' }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            danger
          />
        </Space>
      </div>

      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {data.columns.map((col, idx) => {
          const colIsUserAdded = col.isUserAdded || false
          return (
            <div
              key={idx}
              style={{
                padding: '4px 8px',
                marginBottom: 4,
                background: colIsUserAdded
                  ? 'rgba(82, 196, 26, 0.2)'
                  : col.primaryKey 
                  ? 'rgba(0, 217, 255, 0.1)' 
                  : 'rgba(2, 6, 23, 0.5)',
                borderRadius: '4px',
                fontSize: 12,
                display: 'flex',
                justifyContent: 'space-between',
                border: colIsUserAdded ? '1px solid rgba(82, 196, 26, 0.5)' : 'none',
              }}
            >
              <span style={{ 
                color: colIsUserAdded 
                  ? 'rgba(82, 196, 26, 1)' 
                  : col.primaryKey 
                  ? 'rgb(0, 217, 255)' 
                  : 'rgba(226, 232, 240, 0.86)' 
              }}>
                {col.name} {colIsUserAdded && '●'}
              </span>
              <span style={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: 11 }}>
                {col.type}
              </span>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(148, 163, 184, 0.3)' }}>
        <Button
          type="text"
          size="small"
          icon={<PlusOutlined />}
          block
          style={{ color: 'rgb(0, 217, 255)' }}
        >
          Add Column
        </Button>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: 'rgb(0, 217, 255)' }} />
    </div>
  )
}

export default memo(CustomTableNode)

