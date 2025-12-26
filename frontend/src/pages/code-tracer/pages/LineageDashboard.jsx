import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs } from 'antd'
import GeneralOverview from '../components/GeneralOverview'
import DataMapping from '../components/DataMapping'
import DataCatalog from '../components/DataCatalog'
import DataLineage from '../components/DataLineage'
import './LineageDashboard.css'

function LineageDashboard() {
  const { productName } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="lineage-dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            {decodeURIComponent(productName)} - Column Level Lineage
          </h1>
          <p className="last-changed">Last Changed - 29-08-2024 16:30:24</p>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="dashboard-tabs"
        items={[
          {
            key: 'overview',
            label: 'General Overview',
            children: <GeneralOverview />,
          },
          {
            key: 'mapping',
            label: 'Data Mapping',
            children: <DataMapping />,
          },
          {
            key: 'catalog',
            label: 'Data Catalog',
            children: <DataCatalog />,
          },
          {
            key: 'lineage',
            label: 'Data Lineage',
            children: <DataLineage />,
          },
        ]}
      />
    </div>
  )
}

export default LineageDashboard

