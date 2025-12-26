import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { lazy, Suspense } from 'react';
import LayoutComponent from './code-tracer/components/Layout';
import './code-tracer/index.css';

const { Content } = Layout;

// Lazy load Code Tracer pages
const Home = lazy(() => import('./code-tracer/pages/Home'));
const LineageCatalog = lazy(() => import('./code-tracer/pages/LineageCatalog'));
const LineageDashboard = lazy(() => import('./code-tracer/pages/LineageDashboard'));

// Loading component
const CodeTracerLoader = () => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: '#020617',
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
      <p>Loading Code Tracer...</p>
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Layout wrapper that uses Code Tracer's Layout component
const CodeTracerLayout = ({ children }) => {
  return (
    <LayoutComponent>
      <Suspense fallback={<CodeTracerLoader />}>
        {children}
      </Suspense>
    </LayoutComponent>
  );
};

const CodeTracerPage = () => {
  return (
    <Routes>
      <Route path="/code-tracer" element={<CodeTracerLayout><Home /></CodeTracerLayout>} />
      <Route path="/code-tracer/catalog" element={<CodeTracerLayout><LineageCatalog /></CodeTracerLayout>} />
      <Route path="/code-tracer/lineage/:productName" element={<CodeTracerLayout><LineageDashboard /></CodeTracerLayout>} />
    </Routes>
  );
};

export default CodeTracerPage;

