import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Input, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import './LineageCatalog.css'

const { Search } = Input

function LineageCatalog() {
  const navigate = useNavigate()
  const [filename, setFilename] = useState('')

  const columns = [
    {
      title: 'Sr. No',
      dataIndex: 'srNo',
      key: 'srNo',
      width: 80,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <a 
          onClick={() => navigate(`/code-tracer/lineage/${encodeURIComponent(text)}`)}
          style={{ color: 'rgb(0, 217, 255)', cursor: 'pointer' }}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'success' : 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Efficiency',
      dataIndex: 'efficiency',
      key: 'efficiency',
      render: () => <div className="efficiency-bar" />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            style={{ color: 'rgb(0, 217, 255)' }}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            danger
          />
        </Space>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      srNo: 1,
      productName: 'Life Closed Block',
      createdDate: 'March 21 2024 19:00:00',
      lastUpdated: 'April 2 2024 10:30:00',
      status: 'Active',
      efficiency: '85%',
    },
  ]

  return (
    <div className="lineage-catalog-container">
      <div className="catalog-section">
        <h1 className="section-title">Data Lineage Catalog</h1>
        <p className="section-description">
          Explore or Manage Lineage From the List of Saved Lineage Files. Navigate to Lineage Dashboard by Clicking on the Product Name.
        </p>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          className="catalog-table"
        />
      </div>

      <div className="create-section">
        <h1 className="section-title">Create New</h1>
        <p className="section-description">
          Browse and Upload Mapping File or Establish a New Connection.
        </p>
        <div className="create-form">
          <div className="form-item">
            <label>Create New Filename</label>
            <Input
              placeholder="Enter Filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="filename-input"
            />
          </div>
          <div className="form-actions">
            <Button 
              type="primary" 
              icon={<UploadOutlined />}
              className="action-button"
            >
              Browse File
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              className="action-button"
            >
              Create New
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineageCatalog

