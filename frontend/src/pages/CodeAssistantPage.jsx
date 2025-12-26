import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { lazy, Suspense } from 'react';
import './code-assistant/App.css';
import './code-assistant/index.css';
import '../solutioning.css';

const { Content } = Layout;

// Lazy load Code Assistant pages
const LandingPage = lazy(() => import('./code-assistant/pages/LandingPage'));
const SolutionsPage = lazy(() => import('./code-assistant/pages/SolutionsPage'));
const ProjectDetailPage = lazy(() => import('./code-assistant/pages/ProjectDetailPage'));

// Loading component
const CodeAssistantLoader = () => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: '#0a0f1c',
    color: '#fff'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(0, 217, 255, 0.3)',
        borderTopColor: '#00d9ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px'
      }}></div>
      <p>Loading Code Assistant...</p>
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Layout component with header
const CodeAssistantLayout = ({ children }) => {
  const location = useLocation();
  
  const handleCodeAssistantHome = () => {
    // Navigate to Code Assistant main page
    window.location.href = '/code-assistant';
  };

  const handleQelyxSolutions = () => {
    // Navigate to Solutions main page
    window.location.href = '/solutions';
  };

  const handleCaseStudies = () => {
    // Navigate to case studies (if exists) or keep on current page
    // window.location.href = '/case-studies';
  };

  const handleBlogs = () => {
    // Navigate to blogs
    window.location.href = '/blog';
  };

  const handleTechnology = () => {
    // Navigate to technology page (if exists) or keep on current page
    // window.location.href = '/technology';
  };

  // Get username from localStorage or default to 'admin'
  const username = localStorage.getItem('qelyx_username') || 'admin';

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1c' }}>
      {/* Code Assistant Header */}
      <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="container header-content">
          <div className="logo" onClick={handleCodeAssistantHome} style={{ cursor: 'pointer' }}>
            <img src="/Qelyx Logo_New-CyDrNzo-.png" alt="Qelyx Logo" />
            <span className="logo-text" style={{ color: '#00d9ff' }}>Qelyx</span>
          </div>
          <nav className="nav">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleCodeAssistantHome(); }}
              className={location.pathname === '/code-assistant' ? 'active' : ''}
              style={{ color: '#ffffff' }}
            >
              Home
            </a>
            <a 
              href="#solutions" 
              onClick={(e) => { e.preventDefault(); handleQelyxSolutions(); }}
              style={{ color: '#ffffff' }}
            >
              Qelyx Solutions
            </a>
            <a 
              href="#case-studies" 
              onClick={(e) => { e.preventDefault(); handleCaseStudies(); }}
              style={{ color: '#ffffff' }}
            >
              Case Studies
            </a>
            <a 
              href="#blogs" 
              onClick={(e) => { e.preventDefault(); handleBlogs(); }}
              style={{ color: '#ffffff' }}
            >
              Blogs
            </a>
            <a 
              href="#technology" 
              onClick={(e) => { e.preventDefault(); handleTechnology(); }}
              style={{ color: '#ffffff' }}
            >
              Technology
            </a>
          </nav>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginLeft: 'auto'
          }}>
            <span style={{ color: '#ffffff', fontSize: '14px' }}>
              Logged in as: <span style={{ color: '#00d9ff' }}>{username}</span>
            </span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#00d9ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '14px',
              textTransform: 'lowercase'
            }}>
              {username.charAt(0).toLowerCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Code Assistant App */}
      <Layout className="app" style={{ background: 'transparent' }}>
        <Content>
          <Suspense fallback={<CodeAssistantLoader />}>
            {children}
          </Suspense>
        </Content>
      </Layout>
    </div>
  );
};

const CodeAssistantPage = () => {
  return (
    <Routes>
      <Route path="/code-assistant" element={<CodeAssistantLayout><LandingPage /></CodeAssistantLayout>} />
      <Route path="/code-assistant/solutions" element={<CodeAssistantLayout><SolutionsPage /></CodeAssistantLayout>} />
      <Route path="/code-assistant/project/:projectId" element={<CodeAssistantLayout><ProjectDetailPage /></CodeAssistantLayout>} />
    </Routes>
  );
};

export default CodeAssistantPage;
