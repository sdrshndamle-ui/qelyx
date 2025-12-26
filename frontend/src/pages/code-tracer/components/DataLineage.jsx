import React, { useState, useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Input, Button, Card, Space } from 'antd'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import './DataLineage.css'

const initialNodes = [
  {
    id: 'nelmr',
    type: 'input',
    data: { label: 'NELMR' },
    position: { x: 100, y: 250 },
    style: { 
      background: 'rgba(0, 217, 255, 0.2)',
      border: '2px solid rgb(0, 217, 255)',
      borderRadius: '8px',
      color: '#ffffff',
      fontWeight: 600,
      padding: '10px 20px',
    },
  },
  {
    id: 'cvcy5960',
    data: { label: 'CVCY5960' },
    position: { x: 400, y: 150 },
    style: { 
      background: 'rgba(0, 217, 255, 0.2)',
      border: '2px solid rgb(0, 217, 255)',
      borderRadius: '8px',
      color: '#ffffff',
      fontWeight: 600,
      padding: '10px 20px',
    },
  },
  {
    id: 'cvcy9700',
    data: { label: 'CVCX9700' },
    position: { x: 400, y: 350 },
    style: { 
      background: 'rgba(0, 217, 255, 0.2)',
      border: '2px solid rgb(0, 217, 255)',
      borderRadius: '8px',
      color: '#ffffff',
      fontWeight: 600,
      padding: '10px 20px',
    },
  },
  {
    id: 'mx-pd-adds',
    data: { label: 'MX.PD-ADDS-CUR-FACE-AMT' },
    position: { x: 700, y: 200 },
    style: { 
      background: 'rgba(15, 23, 42, 0.9)',
      border: '1px solid rgba(148, 163, 184, 0.3)',
      borderRadius: '6px',
      color: 'rgba(226, 232, 240, 0.86)',
      padding: '8px 16px',
    },
  },
  {
    id: 'ms-pd-adds',
    data: { label: 'MS.PD-ADDS-CUR-FACE-AMT' },
    position: { x: 700, y: 300 },
    style: { 
      background: 'rgba(15, 23, 42, 0.9)',
      border: '1px solid rgba(148, 163, 184, 0.3)',
      borderRadius: '6px',
      color: 'rgba(226, 232, 240, 0.86)',
      padding: '8px 16px',
    },
  },
  {
    id: 'ws-ry7470',
    data: { label: 'WS.RY7470-PD-ADDS-CUR-FACE-AMT' },
    position: { x: 700, y: 100 },
    style: { 
      background: 'rgba(15, 23, 42, 0.9)',
      border: '1px solid rgba(148, 163, 184, 0.3)',
      borderRadius: '6px',
      color: 'rgba(226, 232, 240, 0.86)',
      padding: '8px 16px',
    },
  },
  {
    id: 'dtl-target',
    data: { label: 'DTL-PD-UP-ADDS-CUR-FACE-AMT' },
    position: { x: 1000, y: 250 },
    style: { 
      background: 'rgba(245, 34, 45, 0.2)',
      border: '2px solid #f5222d',
      borderRadius: '8px',
      color: '#ffffff',
      fontWeight: 600,
      padding: '10px 20px',
    },
  },
  {
    id: 'target-neutral',
    type: 'output',
    data: { label: 'Target_Neutral' },
    position: { x: 1200, y: 250 },
    style: { 
      background: 'rgba(245, 34, 45, 0.2)',
      border: '2px solid #f5222d',
      borderRadius: '8px',
      color: '#ffffff',
      fontWeight: 600,
      padding: '10px 20px',
    },
  },
]

const initialEdges = [
  {
    id: 'e1',
    source: 'nelmr',
    target: 'cvcy5960',
    animated: true,
    style: { stroke: 'rgb(0, 217, 255)', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgb(0, 217, 255)',
    },
  },
  {
    id: 'e2',
    source: 'nelmr',
    target: 'cvcy9700',
    animated: true,
    style: { stroke: 'rgb(0, 217, 255)', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgb(0, 217, 255)',
    },
  },
  {
    id: 'e3',
    source: 'cvcy5960',
    target: 'ws-ry7470',
    animated: true,
    style: { stroke: 'rgba(0, 217, 255, 0.6)', strokeWidth: 1.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgba(0, 217, 255, 0.6)',
    },
  },
  {
    id: 'e4',
    source: 'cvcy9700',
    target: 'ms-pd-adds',
    animated: true,
    style: { stroke: 'rgba(0, 217, 255, 0.6)', strokeWidth: 1.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgba(0, 217, 255, 0.6)',
    },
  },
  {
    id: 'e5',
    source: 'cvcy9700',
    target: 'mx-pd-adds',
    animated: true,
    style: { stroke: 'rgba(0, 217, 255, 0.6)', strokeWidth: 1.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgba(0, 217, 255, 0.6)',
    },
  },
  {
    id: 'e6',
    source: 'mx-pd-adds',
    target: 'dtl-target',
    animated: true,
    style: { stroke: 'rgba(0, 217, 255, 0.6)', strokeWidth: 1.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgba(0, 217, 255, 0.6)',
    },
  },
  {
    id: 'e7',
    source: 'ms-pd-adds',
    target: 'dtl-target',
    animated: true,
    style: { stroke: 'rgba(0, 217, 255, 0.6)', strokeWidth: 1.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgba(0, 217, 255, 0.6)',
    },
  },
  {
    id: 'e8',
    source: 'ws-ry7470',
    target: 'dtl-target',
    animated: true,
    style: { stroke: 'rgba(0, 217, 255, 0.6)', strokeWidth: 1.5 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'rgba(0, 217, 255, 0.6)',
    },
  },
  {
    id: 'e9',
    source: 'dtl-target',
    target: 'target-neutral',
    animated: true,
    style: { stroke: '#f5222d', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#f5222d',
    },
  },
]

function DataLineage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [targetField, setTargetField] = useState('DTL-PD-UP-ADDS-CUR-FACE-AMT')
  const [dataRange, setDataRange] = useState({ from: 0, to: 5160 })

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="data-lineage">
      <div className="lineage-controls">
        <div className="control-section">
          <h3 className="control-title">Data Lineage</h3>
          <p className="control-description">
            By default, the lineage plot is generated using a dataset consisting of few initial rows. 
            If you desire a larger sample size/entire dataset, kindly input your preferred number of rows 
            and proceed by clicking the transform and load button to enable access to lineage graph.
          </p>
          <div className="range-inputs">
            <Input
              type="number"
              value={dataRange.from}
              onChange={(e) => setDataRange({ ...dataRange, from: parseInt(e.target.value) || 0 })}
              style={{ width: 100 }}
            />
            <span>to</span>
            <Input
              type="number"
              value={dataRange.to}
              onChange={(e) => setDataRange({ ...dataRange, to: parseInt(e.target.value) || 0 })}
              style={{ width: 100 }}
            />
            <Button type="primary">Transform and Load</Button>
          </div>
        </div>

        <div className="control-section">
          <p className="control-description">
            Unlock deeper insights by tracing the lineage of your chosen field. Search and select your 
            desired target field name and click on plot lineage to draw its specific lineage.
          </p>
          <div className="field-input">
            <Input
              placeholder="Enter Target Field Name"
              value={targetField}
              onChange={(e) => setTargetField(e.target.value)}
              style={{ width: 400 }}
            />
            <Button type="primary">Plot Lineage</Button>
          </div>
        </div>
      </div>

      <div className="lineage-container">
        <div className="lineage-graph">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="react-flow-container"
          >
            <Background color="rgba(148, 163, 184, 0.1)" gap={16} />
            <Controls 
              style={{ 
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
              }}
            />
            <MiniMap
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
              }}
              nodeColor={(node) => {
                if (node.type === 'input' || node.id.includes('cvcy')) {
                  return 'rgb(0, 217, 255)'
                }
                if (node.type === 'output' || node.id.includes('target')) {
                  return '#f5222d'
                }
                return 'rgba(148, 163, 184, 0.5)'
              }}
            />
          </ReactFlow>
        </div>

        <Card className="insights-panel" title="Insights and Actions">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Button type="primary" block icon={<ReloadOutlined />}>
                Refresh View
              </Button>
            </div>
            <div>
              <Button block>Horizontal View</Button>
            </div>
            <div>
              <Button block>Compact View</Button>
            </div>
            <div>
              <Button block>Download View</Button>
            </div>
            <div>
              <Input
                placeholder="Search Field"
                prefix={<SearchOutlined />}
                style={{ marginBottom: 8 }}
              />
              <Button block>Search</Button>
            </div>
            <div>
              <Input
                placeholder="Search Field"
                prefix={<SearchOutlined />}
                style={{ marginBottom: 8 }}
              />
              <Button block>Trace</Button>
            </div>
            <div className="field-info">
              <p><strong>Selected Source field:</strong></p>
              <p>MX.TERM-ADDS-CUR-COST</p>
            </div>
            <div className="field-info">
              <p><strong>Selected Target field:</strong></p>
              <p>MX.TERM-ADDS-PREV-YR-FACE</p>
            </div>
            <div className="field-info">
              <p><strong>Transformation:</strong></p>
              <p>MOVE TERM-ADDS-CUR-COST OF MX TO TERM-ADDS-PREV-COST</p>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  )
}

export default DataLineage

