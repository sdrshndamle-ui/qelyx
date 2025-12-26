import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { lazy, Suspense } from 'react';
import LayoutComponent from './code-tracer/components/Layout';
import './code-tracer/index.css';

const { Content } = Layout;

// Lazy load Data Product Designer pages
const DataProductDesignerHome = lazy(() => import('./data-product-designer/pages/DataProductDesignerHome'));
const DataProductDesignerApp = lazy(() => import('./data-product-designer/pages/DataProductDesignerApp'));

// Loading component
const DataProductDesignerLoader = () => (
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
      <p>Loading Data Product Designer...</p>
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Layout wrapper that uses Code Tracer's Layout component (for navbar, colors, fonts)
const DataProductDesignerLayout = ({ children }) => {
  return (
    <LayoutComponent>
      <Suspense fallback={<DataProductDesignerLoader />}>
        {children}
      </Suspense>
    </LayoutComponent>
  );
};

const DataProductDesignerPage = () => {
  return (
    <Routes>
      <Route path="/data-product-designer" element={<DataProductDesignerLayout><DataProductDesignerHome /></DataProductDesignerLayout>} />
      <Route path="/data-product-designer/app" element={<DataProductDesignerLayout><DataProductDesignerApp /></DataProductDesignerLayout>} />
    </Routes>
  );
};

export default DataProductDesignerPage;

