import { useState } from 'react'
import { Button, Card, Checkbox, Modal, Tag, Alert, Space, Input } from 'antd'
import { EyeOutlined, ReloadOutlined } from '@ant-design/icons'
import './DomainRecommendTab.css'

interface DataProduct {
  id: string
  name: string
  layer: string
  description: string
  tag: string
  selected: boolean
  expanded: boolean
  sourceDetails?: {
    tables: string[]
    columns: string[]
  }
}

const DomainRecommendTab = () => {
  const [businessProcess, setBusinessProcess] = useState('')
  const [activeBusinessProcess, setActiveBusinessProcess] = useState<string | null>(null)
  const [products, setProducts] = useState<DataProduct[]>([
    {
      id: '1',
      name: 'Policy & Holder Master',
      layer: 'Foundation (Silver)',
      description: 'Provide a unified, cleansed view of insurance policies and their associated holders for downstream operational and analytical use.',
      tag: 'Policy Administration',
      selected: false,
      expanded: false,
      sourceDetails: {
        tables: ['dbo.policy', 'dbo.account', 'dbo.contact'],
        columns: ['policy_id', 'policy_number', 'status', 'effective_date', 'contact_id', 'account_id']
      }
    },
    {
      id: '2',
      name: 'Coverage & Rider Detail',
      layer: 'Foundation (Silver)',
      description: 'Deliver structured coverage terms, limits, deductibles, and rider information linked to policies for underwriting and servicing.',
      tag: 'Underwriting',
      selected: false,
      expanded: false,
      sourceDetails: {
        tables: ['dbo.policy'],
        columns: ['policy_id', 'coverage_type', 'coverage_limit', 'deductible']
      }
    },
    {
      id: '3',
      name: 'Quote & Rating Engine Output',
      layer: 'Enterprise (Gold)',
      description: 'Aggregate quotes, rating factors, and premium calculations for sales channels and pricing analytics.',
      tag: 'Sales & Distribution',
      selected: false,
      expanded: false,
      sourceDetails: {
        tables: ['dbo.policy', 'dbo.account'],
        columns: ['policy_id', 'quote_id', 'rating_factor', 'premium']
      }
    },
    {
      id: '4',
      name: 'Billing & Commission Ledger',
      layer: 'Enterprise (Gold)',
      description: 'Provide a consolidated view of billing transactions, endorsements, renewals, cancellations, and commissions for finance operations.',
      tag: 'Finance',
      selected: false,
      expanded: false
    },
    {
      id: '5',
      name: 'Claims Lifecycle Hub',
      layer: 'Enterprise (Gold)',
      description: 'Centralize claim header, detail, FNOL, adjuster notes, salvage, subrogation, recovery, and reserves for claims management.',
      tag: 'Claims',
      selected: false,
      expanded: false
    },
    {
      id: '6',
      name: 'Reinsurance & Catastrophe Exposure',
      layer: 'Enterprise (Gold)',
      description: 'Provide ceded premium/claim, treaty details, bordereaux, catastrophe exposure, and accumulation metrics for risk transfer analysis.',
      tag: 'Reinsurance',
      selected: false,
      expanded: false
    }
  ])
  const [viewModalVisible, setViewModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<DataProduct | null>(null)
  // const selectedCount = products.filter(p => p.selected).length

  const handleAutoDetect = () => {
    // Simulate auto-detection
    setActiveBusinessProcess('Insurance')
    setBusinessProcess('Insurance')
  }

  const handleClear = () => {
    setBusinessProcess('')
    setActiveBusinessProcess(null)
  }

  const handleRecommend = () => {
    // In real app, this would call an API
    console.log('Recommending data products...')
  }

  const handleProductSelect = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, selected: !p.selected } : p
    ))
  }

  const handleViewProduct = (product: DataProduct) => {
    setSelectedProduct(product)
    setViewModalVisible(true)
  }

  const handleToggleExpand = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, expanded: !p.expanded } : p
    ))
  }

  const selectedCount = products.filter(p => p.selected).length

  return (
    <div className="domain-recommend-tab">
      <div className="section-container">
        {/* Step 2 - Business Process */}
        <div className="step-section">
          <h2 className="step-title">Step 2 - Business Process</h2>
          <div className="business-process-section">
            <div className="label">Set Business Process (optional)</div>
            <Input
              placeholder="e.g., Banking, Insurance, Finance"
              value={businessProcess}
              onChange={(e) => setBusinessProcess(e.target.value)}
              className="business-process-input"
            />
            <Space className="business-process-actions">
              <Button type="primary" onClick={handleAutoDetect}>Auto-detect Domain</Button>
              <Button type="primary" onClick={handleClear}>Clear</Button>
            </Space>
            {activeBusinessProcess && (
              <Alert
                message={`Active Business Process : ${activeBusinessProcess}`}
                type="success"
                showIcon={false}
                className="active-process-alert"
              />
            )}
          </div>
        </div>

        {/* Step 3 - Recommend Data Products */}
        <div className="step-section">
          <div className="step-header">
            <h2 className="step-title">Step 3 - Recommend Data Products</h2>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={handleRecommend}
            >
              Recommend Data Products
            </Button>
          </div>

          {products.length > 0 && (
            <Alert
              message={`Proposed ${products.length} data products`}
              type="success"
              showIcon
              className="products-alert"
            />
          )}

          <div className="products-grid">
            {products.map((product) => (
              <Card
                key={product.id}
                className={`product-card ${product.selected ? 'selected' : ''}`}
              >
                <div className="product-header">
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-layer">Layer: {product.layer}</div>
                    <p className="product-description">{product.description}</p>
                  </div>
                  <Tag className="product-tag">{product.tag}</Tag>
                </div>
                
                <div className="product-actions">
                  <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => handleViewProduct(product)}
                    className="view-btn"
                  >
                    View • {product.name}
                  </Button>
                </div>

                <div className="product-details">
                  <div 
                    className="details-header"
                    onClick={() => handleToggleExpand(product.id)}
                  >
                    <span>Details • {product.name}</span>
                    <span className="expand-icon">{product.expanded ? '▼' : '▶'}</span>
                  </div>
                  {product.expanded && (
                    <div className="details-content">
                      <div className="detail-item">
                        <strong>Medallion Layer:</strong> {product.layer}
                      </div>
                      <div className="detail-item">
                        <strong>Business Purpose:</strong> {product.description}
                      </div>
                      {product.sourceDetails && (
                        <div className="detail-item">
                          <strong>Tables/Columns:</strong>
                          <div className="source-info">
                            {product.sourceDetails.tables.map((table, idx) => (
                              <div key={idx} className="table-info">
                                <code>{table}</code> → {product.sourceDetails!.columns.slice(idx * 2, (idx + 1) * 2).join(', ')}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Checkbox
                  checked={product.selected}
                  onChange={() => handleProductSelect(product.id)}
                  className="product-checkbox"
                >
                  Select {product.name}
                </Checkbox>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Modal
        title={`Details • ${selectedProduct?.name || ''}`}
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
        className="product-details-modal"
      >
        {selectedProduct && (
          <div className="modal-content">
            <div className="modal-section">
              <h4>Medallion Layer</h4>
              <p>{selectedProduct.layer}</p>
            </div>
            <div className="modal-section">
              <h4>Business Purpose</h4>
              <p>{selectedProduct.description}</p>
            </div>
            {selectedProduct.sourceDetails && (
              <div className="modal-section">
                <h4>Source Data</h4>
                <div className="source-tables">
                  <h5>Tables:</h5>
                  <ul>
                    {selectedProduct.sourceDetails.tables.map((table, idx) => (
                      <li key={idx}><code>{table}</code></li>
                    ))}
                  </ul>
                  <h5>Columns:</h5>
                  <div className="columns-list">
                    {selectedProduct.sourceDetails.columns.map((col, idx) => (
                      <Tag key={idx} className="column-tag">{col}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default DomainRecommendTab

