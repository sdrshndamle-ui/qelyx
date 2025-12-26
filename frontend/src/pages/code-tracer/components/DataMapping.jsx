import React from 'react'
import { Table, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './DataMapping.css'

const { Search } = Input

function DataMapping() {
  const columns = [
    {
      title: 'From To',
      dataIndex: 'fromTo',
      key: 'fromTo',
      width: 200,
    },
    {
      title: 'Source Index',
      dataIndex: 'sourceIndex',
      key: 'sourceIndex',
      width: 180,
    },
    {
      title: 'Source Chunk Name',
      dataIndex: 'chunkName',
      key: 'chunkName',
      width: 200,
    },
    {
      title: 'Source Input',
      dataIndex: 'sourceInput',
      key: 'sourceInput',
      width: 250,
    },
    {
      title: 'Source Intermediate',
      dataIndex: 'sourceIntermediate',
      key: 'sourceIntermediate',
      width: 200,
    },
    {
      title: 'Source Output',
      dataIndex: 'sourceOutput',
      key: 'sourceOutput',
      width: 250,
    },
    {
      title: 'Source Condition',
      dataIndex: 'sourceCondition',
      key: 'sourceCondition',
      width: 400,
    },
  ]

  const data = [
    {
      key: '1',
      fromTo: '5960_Output_Input',
      sourceIndex: 'CYCY_5960_12_1',
      chunkName: 'RY7470-ENTER.',
      sourceInput: 'MX.PD-ADDS-CUR-FACE-AMT',
      sourceIntermediate: 'None',
      sourceOutput: 'WS.RY7470-PD-ADDS-CUR-FACE-AMT',
      sourceCondition: 'ADD RY7470-FACE-AMT OF WS PD-ADDS-CUR-FACE-AMT OF MX GIVING RY7470-PD-ADDS-CUR-FACE-AMT OF WS',
    },
    {
      key: '2',
      fromTo: '9700_Output_Input',
      sourceIndex: 'CYCX_9700_49_2',
      chunkName: 'P6300-UPDATE-PMR.',
      sourceInput: 'MX.PD-ADDS-CUR-FACE-AMT',
      sourceIntermediate: 'None',
      sourceOutput: 'MS.PD-ADDS-CUR-FACE-AMT',
      sourceCondition: 'IF PD-UP-ADDS-NOT-PRES OF MX ELSE IF (PUA-FACE-REM OF SY6900PK NUMERIC AND PD-ADDS-CUR-FACE-AMT OF MX NUMERIC AND (PD-ADDS-CUR-FACE-AMT OF MX > 0)) MOVE PD-ADDS-CUR-FACE-AMT OF MX TO PD-ADDS-CUR-FACE-AMT',
    },
  ]

  return (
    <div className="data-mapping">
      <div className="mapping-header">
        <h2 className="mapping-title">Data Mapping Table</h2>
        <Search
          placeholder="Search mappings..."
          allowClear
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 1500 }}
        className="mapping-table"
      />
    </div>
  )
}

export default DataMapping

