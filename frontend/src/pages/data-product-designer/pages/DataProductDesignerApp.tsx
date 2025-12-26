import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { UploadOutlined, BulbOutlined, CodeOutlined } from '@ant-design/icons'
import MetadataIntakeTab from '../components/tabs/MetadataIntakeTab'
import DomainRecommendTab from '../components/tabs/DomainRecommendTab'
import DesignSQLTab from '../components/tabs/DesignSQLTab'
import './DataProductDesignerApp.css'

const { Sider, Content } = Layout

const DataProductDesignerApp = () => {
  const [selectedTab, setSelectedTab] = useState('metadata')

  const menuItems = [
    {
      key: 'metadata',
      icon: <UploadOutlined />,
      label: 'Metadata Intake'
    },
    {
      key: 'domain',
      icon: <BulbOutlined />,
      label: 'Domain & Recommend'
    },
    {
      key: 'design',
      icon: <CodeOutlined />,
      label: 'Design SQL'
    }
  ]

  const renderContent = () => {
    switch (selectedTab) {
      case 'metadata':
        return <MetadataIntakeTab />
      case 'domain':
        return <DomainRecommendTab />
      case 'design':
        return <DesignSQLTab />
      default:
        return <MetadataIntakeTab />
    }
  }

  return (
    <Layout className="data-product-designer-app">
      <Sider width={200} className="app-sider">
        <Menu
          mode="inline"
          selectedKeys={[selectedTab]}
          items={menuItems}
          onClick={({ key }) => {
            setSelectedTab(key)
          }}
          className="app-menu"
        />
      </Sider>
      <Layout>
        <Content className="app-content">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DataProductDesignerApp

