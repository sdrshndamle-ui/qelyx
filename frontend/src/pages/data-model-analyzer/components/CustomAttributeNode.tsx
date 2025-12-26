import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Tag } from 'antd'

interface AttributeNodeData {
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

const CustomAttributeNode = ({ data, selected }: NodeProps<AttributeNodeData>) => {
  const isUserAdded = data.isUserAdded || false
  
  return (
    <div
      className={`custom-attribute-node ${selected ? 'selected' : ''} ${isUserAdded ? 'user-added' : ''}`}
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
        minWidth: '200px',
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
            {data.attributeName}
          </div>
          {isUserAdded && (
            <Tag color="green" style={{ fontSize: 10, margin: 0 }}>New</Tag>
          )}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(148, 163, 184, 0.8)', marginTop: 4 }}>
          {data.tableName}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <Tag color={data.isPrimaryKey ? 'cyan' : data.isForeignKey ? 'blue' : 'default'}>
          {data.dataType}
        </Tag>
        {data.isPrimaryKey && <Tag color="cyan" style={{ marginLeft: 4 }}>PK</Tag>}
        {data.isForeignKey && (
          <>
            <Tag color="blue" style={{ marginLeft: 4 }}>FK</Tag>
            {data.referencedTable && (
              <div style={{ fontSize: 10, color: 'rgba(148, 163, 184, 0.8)', marginTop: 4 }}>
                → {data.referencedTable}.{data.referencedColumn}
              </div>
            )}
          </>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: 'rgb(0, 217, 255)' }} />
    </div>
  )
}

export default memo(CustomAttributeNode)

