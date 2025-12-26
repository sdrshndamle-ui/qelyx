import { Layout, Menu, Dropdown, Avatar, Space } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogoutOutlined, HomeOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import './Header.css'

const { Header: AntHeader } = Layout

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get username from localStorage or default to 'admin'
  const username = localStorage.getItem('qelyx_username') || localStorage.getItem('username') || 'admin'

  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      label: 'Home',
      icon: <HomeOutlined />,
    },
    {
      key: 'solutions',
      label: 'Qelyx Solutions',
    },
    {
      key: 'case-studies',
      label: 'Case Studies',
    },
    {
      key: 'blogs',
      label: 'Blogs',
    },
    {
      key: 'technology',
      label: 'Technology',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    // Handle navigation for menu items
    switch (key) {
      case 'home':
        window.location.href = '/data-model-analyzer'
        break
      case 'solutions':
        window.location.href = '/solutions'
        break
      case 'case-studies':
        // Navigate to case studies page or external link
        break
      case 'blogs':
        window.location.href = '/blog'
        break
      case 'technology':
        // Navigate to technology page or external link
        break
      default:
        break
    }
  }

  const handleLogoClick = () => {
    window.location.href = '/data-model-analyzer'
  }

  const handleSignOut = () => {
    // Clear authentication
    localStorage.removeItem('qelyx_authenticated')
    localStorage.removeItem('qelyx_auth_timestamp')
    localStorage.removeItem('username')
    // Redirect to public homepage
    window.location.href = '/'
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'signout',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
      onClick: handleSignOut,
    },
  ]

  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="logo" onClick={handleLogoClick}>
          <span className="logo-text">Qelyx</span>
        </div>
        <Menu
          mode="horizontal"
          items={menuItems}
          onClick={handleMenuClick}
          className="header-menu"
          selectedKeys={location.pathname === '/data-model-analyzer' || location.pathname === '/data-model-analyzer/' ? ['home'] : []}
        />
        <div className="user-info">
          <div className="user-label">Logged in as:</div>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space className="user-dropdown" style={{ cursor: 'pointer' }}>
              <span className="username">{username}</span>
              <Avatar size="small" style={{ backgroundColor: 'rgb(0, 217, 255)', color: '#fff' }}>
                {username.charAt(0).toUpperCase()}
              </Avatar>
            </Space>
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  )
}

export default Header

