import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout as AntLayout } from 'antd'
import './Layout.css'

const { Header, Content } = AntLayout

function Layout({ children }) {
  const location = useLocation()

  const handleSignout = () => {
    window.location.href = 'https://qelyx.com'
  }

  return (
    <AntLayout className="app-layout">
      <Header className="app-header">
        <div className="header-content">
          <div className="header-logo">
            <a 
              href="https://qelyx.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="logo-link"
            >
              <span className="logo-text">Qelyx</span>
            </a>
          </div>
          <nav className="header-nav">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
            <Link 
              to="/solutions" 
              className={location.pathname === '/solutions' ? 'active' : ''}
            >
              Qelyx Solutions
            </Link>
            <Link 
              to="/case-studies" 
              className={location.pathname === '/case-studies' ? 'active' : ''}
            >
              Case Studies
            </Link>
            <Link 
              to="/blogs" 
              className={location.pathname === '/blogs' ? 'active' : ''}
            >
              Blogs
            </Link>
            <Link 
              to="/technology" 
              className={location.pathname === '/technology' ? 'active' : ''}
            >
              Technology
            </Link>
          </nav>
          <div className="header-user">
            <div className="user-info">
              <span className="logged-in-text">Logged in as:</span>
              <span className="username">admin</span>
              <div className="user-avatar">
                <span className="avatar-letter">a</span>
              </div>
            </div>
            <button className="signout-btn" onClick={handleSignout}>
              Signout
            </button>
          </div>
        </div>
      </Header>
      <Content className="app-content">
        {children}
      </Content>
    </AntLayout>
  )
}

export default Layout

