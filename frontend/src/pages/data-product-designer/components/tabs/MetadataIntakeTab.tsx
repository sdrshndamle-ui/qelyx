import { useState } from 'react'
import { Upload, Table, Alert, Radio } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadFile, RcFile } from 'antd/es/upload/interface'
import './MetadataIntakeTab.css'

const { Dragger } = Upload

interface MetadataRow {
  key: string
  source_system: string
  schema: string
  table: string
  column: string
  data_type: string
  description: string
  nullable: boolean
  is_pk: boolean
  is_fk: boolean
  row_count: string
}

const MetadataIntakeTab = () => {
  const [sourceType, setSourceType] = useState<'file' | 'db'>('file')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [metadata, setMetadata] = useState<MetadataRow[]>([])
  const [loadedCount, setLoadedCount] = useState<number | null>(null)

  const handleFileUpload = (file: RcFile) => {
    setFileList([{
      uid: file.name,
      name: file.name,
      status: 'done',
      originFileObj: file
    }])
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      // Parse CSV (simplified - in real app, use proper CSV parser)
      const lines = text.split('\n').filter(line => line.trim())
      const rows: MetadataRow[] = []
      
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          // Handle CSV parsing (basic - handles quoted values)
          const values: string[] = []
          let current = ''
          let inQuotes = false
          
          for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j]
            if (char === '"') {
              inQuotes = !inQuotes
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim())
              current = ''
            } else {
              current += char
            }
          }
          values.push(current.trim())
          
          rows.push({
            key: `row-${i}`,
            source_system: values[0] || 'uploaded',
            schema: values[1] || '',
            table: values[2] || '',
            column: values[3] || '',
            data_type: values[4] || '',
            description: values[5] || '',
            nullable: values[6] === 'true' || values[6] === '1' || values[6] === 'Y',
            is_pk: values[7] === 'true' || values[7] === '1' || values[7] === 'Y',
            is_fk: values[8] === 'true' || values[8] === '1' || values[8] === 'Y',
            row_count: 'None'
          })
        }
      }
      
      setMetadata(rows)
      setLoadedCount(rows.length)
    }
    reader.readAsText(file)
    return false // Prevent auto upload
  }

  const handleRemove = () => {
    setFileList([])
    setMetadata([])
    setLoadedCount(null)
  }

  const columns = [
    {
      title: 'Source System',
      dataIndex: 'source_system',
      key: 'source_system',
    },
    {
      title: 'Schema',
      dataIndex: 'schema',
      key: 'schema',
    },
    {
      title: 'Table',
      dataIndex: 'table',
      key: 'table',
    },
    {
      title: 'Column',
      dataIndex: 'column',
      key: 'column',
    },
    {
      title: 'Data Type',
      dataIndex: 'data_type',
      key: 'data_type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Nullable',
      dataIndex: 'nullable',
      key: 'nullable',
      render: (value: boolean) => <input type="checkbox" checked={value} readOnly />
    },
    {
      title: 'Is PK',
      dataIndex: 'is_pk',
      key: 'is_pk',
      render: (value: boolean) => <input type="checkbox" checked={value} readOnly />
    },
    {
      title: 'Is FK',
      dataIndex: 'is_fk',
      key: 'is_fk',
      render: (value: boolean) => <input type="checkbox" checked={value} readOnly />
    },
    {
      title: 'Row Count',
      dataIndex: 'row_count',
      key: 'row_count',
    },
  ]

  return (
    <div className="metadata-intake-tab">
      <div className="section-container">
        <h2 className="step-title">Step 1 - Metadata Intake</h2>
        
        <div className="source-selector">
          <div className="label">Choose source:</div>
          <Radio.Group value={sourceType} onChange={(e) => setSourceType(e.target.value)}>
            <Radio.Button value="file">Upload File</Radio.Button>
            <Radio.Button value="db">Connect DB</Radio.Button>
          </Radio.Group>
        </div>

        {sourceType === 'file' && (
          <>
            <div className="upload-instructions">
              Upload CSV/XLSX with any of the supported layouts:
              <ul>
                <li><code>source_system, schema, table, column, data_type, description (optional)</code></li>
                <li><code>Logical Table Name, Logical Column Name, Physical Data Type, Null Option, Is PK, Is FK</code></li>
              </ul>
            </div>

            <Dragger
              className="upload-area"
              accept=".csv,.xlsx"
              beforeUpload={handleFileUpload}
              fileList={fileList}
              onRemove={handleRemove}
              maxCount={1}
              showUploadList={true}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Drag and drop file here</p>
              <p className="ant-upload-hint">
                Limit 200MB per file. Supported formats: CSV, XLSX
              </p>
            </Dragger>

            {loadedCount !== null && (
              <Alert
                message={`Loaded ${loadedCount} column rows.`}
                type="success"
                showIcon
                className="success-alert"
              />
            )}
          </>
        )}

        {metadata.length > 0 && (
          <div className="metadata-table-container">
            <Table
              dataSource={metadata}
              columns={columns}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
              className="metadata-table"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default MetadataIntakeTab

