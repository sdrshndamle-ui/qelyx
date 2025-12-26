import { Layout as AntLayout } from 'antd'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import './Layout.css'

const { Content } = AntLayout

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  // Model Studio and Model Compare have their own layouts, so we don't wrap them in the standard content area
  const hasCustomLayout = location.pathname === '/data-model-analyzer/model-studio' || location.pathname === '/data-model-analyzer/model-compare'

  return (
    <AntLayout className="app-layout">
      <Header />
      {hasCustomLayout ? (
        children
      ) : (
        <Content className="main-content">
          {children}
        </Content>
      )}
    </AntLayout>
  )
}

export default Layout

