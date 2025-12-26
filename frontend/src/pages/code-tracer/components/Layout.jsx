import React from 'react'
import { useLocation } from 'react-router-dom'
import { Layout as AntLayout } from 'antd'
import './Layout.css'

const { Header, Content } = AntLayout

function Layout({ children }) {
  const location = useLocation()

  const handleSignout = () => {
    // Clear authentication
    localStorage.removeItem('qelyx_authenticated');
    localStorage.removeItem('qelyx_auth_timestamp');
    // Redirect to public homepage
    window.location.href = '/';
  }

  // Determine home URL based on current route
  const getHomeUrl = () => {
    if (location.pathname.startsWith('/code-tracer')) {
      return '/code-tracer';
    } else if (location.pathname.startsWith('/data-product-designer')) {
      return '/data-product-designer';
    }
    return '/code-tracer'; // default
  }

  const handleHomeClick = () => {
    window.location.href = getHomeUrl();
  }

  const handleQelyxSolutionsClick = () => {
    window.location.href = '/solutions';
  }

  // Get username from localStorage or default to 'admin'
  const username = localStorage.getItem('qelyx_username') || 'admin';

  // Determine if Home should be active
  const isHomeActive = () => {
    const path = location.pathname;
    if (path.startsWith('/code-tracer')) {
      return path === '/code-tracer' || (path.startsWith('/code-tracer/') && path !== '/code-tracer/catalog' && !path.startsWith('/code-tracer/lineage/'));
    } else if (path.startsWith('/data-product-designer')) {
      return path === '/data-product-designer' || path === '/data-product-designer/';
    }
    return false;
  }

  return (
    <AntLayout className="app-layout">
      <Header className="app-header">
        <div className="header-content">
          <div className="header-logo">
            <a 
              onClick={handleHomeClick}
              className="logo-link"
              style={{ cursor: 'pointer' }}
            >
              <span className="logo-text">Qelyx</span>
            </a>
          </div>
          <nav className="header-nav">
            <a 
              onClick={(e) => { e.preventDefault(); handleHomeClick(); }}
              className={isHomeActive() ? 'active' : ''}
              style={{ cursor: 'pointer', color: isHomeActive() ? 'rgba(226, 232, 240, 1)' : 'rgba(226, 232, 240, 0.8)' }}
            >
              Home
            </a>
            <a 
              onClick={(e) => { e.preventDefault(); handleQelyxSolutionsClick(); }}
              style={{ cursor: 'pointer', color: 'rgba(226, 232, 240, 0.8)' }}
            >
              Qelyx Solutions
            </a>
            <a 
              onClick={(e) => { e.preventDefault(); window.location.href = '/blog'; }}
              style={{ cursor: 'pointer', color: 'rgba(226, 232, 240, 0.8)' }}
            >
              Blogs
            </a>
            <a 
              onClick={(e) => { e.preventDefault(); }}
              style={{ cursor: 'pointer', color: 'rgba(226, 232, 240, 0.8)' }}
            >
              Technology
            </a>
          </nav>
          <div className="header-user">
            <div className="user-info">
              <span className="logged-in-text">Logged in as:</span>
              <span className="username">{username}</span>
              <div className="user-avatar">
                <span className="avatar-letter">{username.charAt(0).toLowerCase()}</span>
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
