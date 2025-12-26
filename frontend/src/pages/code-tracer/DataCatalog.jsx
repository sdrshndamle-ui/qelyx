import React, { useState } from 'react'
import { Table, Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './DataCatalog.css'

const { Search } = Input

function DataCatalog() {
  const [selectedSource, setSelectedSource] = useState('CYCX_9500')

  const columns = [
    {
      title: 'FIELD NAME',
      dataIndex: 'fieldName',
      key: 'fieldName',
      width: 250,
    },
    {
      title: 'FIELD DESCRIPTION',
      dataIndex: 'fieldDescription',
      key: 'fieldDescription',
    },
  ]

  const data = [
    {
      key: '1',
      fieldName: 'FILLER',
      fieldDescription: 'Filler',
    },
    {
      key: '2',
      fieldName: 'SY1020PK',
      fieldDescription: 'The variable SY1020PK stands for a linkage packet used to call the subprogram CYCY1020, which does date manipulation.',
    },
    {
      key: '3',
      fieldName: 'PKSIZE',
      fieldDescription: 'None',
    },
    {
      key: '4',
      fieldName: 'DT-CALC-TYP',
      fieldDescription: 'DATE CALCULATION TYPE',
    },
    {
      key: '5',
      fieldName: 'MO-DA',
      fieldDescription: 'The variable MO-DA stands for Month and Day. It is used to store a 2-digit month and 2-digit day value.',
    },
    {
      key: '6',
      fieldName: 'MONTH',
      fieldDescription: 'None',
    },
    {
      key: '7',
      fieldName: 'DAYOFMO',
      fieldDescription: 'DAYOFMO stands for the day of the month. It is defined as part of a group level data item called MO-DA which represents a month and day. So in summary, DAYOFMO is a 2 digit day of month field that is part of a group data item used to represent a month and day. It can also be accessed as a 4 digit combined month and day field via the redefines.',
    },
    {
      key: '8',
      fieldName: 'MO-DA-9',
      fieldDescription: 'The variable MO-DA-9 stands for a date field that contains the month and day. The 9 indicates it is a numeric field.',
    },
    {
      key: '9',
      fieldName: 'DATE-A',
      fieldDescription: 'Input start date',
    },
    {
      key: '10',
      fieldName: 'DATE-B',
      fieldDescription: 'The variable DATE-B stands for an output date from the subprogram SY1020, which does date calculations like adding/subtracting a number of days. So it\'s likely used to store a key calculated policy date.',
    },
  ]

  return (
    <div className="data-catalog">
      <div className="catalog-header">
        <h2 className="catalog-title">Data Catalog</h2>
        <div className="catalog-controls">
          <Select
            value={selectedSource}
            onChange={setSelectedSource}
            style={{ width: 200 }}
            className="source-select"
          >
            <Select.Option value="CYCX_9500">CYCX_9500</Select.Option>
            <Select.Option value="CYCY_5960">CYCY_5960</Select.Option>
            <Select.Option value="CYCX_9700">CYCX_9700</Select.Option>
          </Select>
          <Search
            placeholder="Search fields..."
            allowClear
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        className="catalog-table"
      />
    </div>
  )
}

export default DataCatalog

