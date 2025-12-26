import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './data-model-analyzer/components/Layout';
import './data-model-analyzer/index.css';

// Lazy load Data Model Analyzer pages
const HomePage = lazy(() => import('./data-model-analyzer/pages/HomePage'));
const ModelStudio = lazy(() => import('./data-model-analyzer/pages/ModelStudio'));
const ModelCompare = lazy(() => import('./data-model-analyzer/pages/ModelCompare'));
const QueryMode = lazy(() => import('./data-model-analyzer/pages/QueryMode'));
const ImpactAnalysis = lazy(() => import('./data-model-analyzer/pages/ImpactAnalysis'));
const VisualizeModel = lazy(() => import('./data-model-analyzer/pages/VisualizeModel'));
const EnterpriseOntology = lazy(() => import('./data-model-analyzer/pages/EnterpriseOntology'));

// Loading component
const DataModelAnalyzerLoader = () => (
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
      <p>Loading Data Model Analyzer...</p>
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const DataModelAnalyzerPage = () => {
  return (
    <Layout>
      <Suspense fallback={<DataModelAnalyzerLoader />}>
        <Routes>
          <Route path="/data-model-analyzer" element={<HomePage />} />
          <Route path="/data-model-analyzer/model-studio" element={<ModelStudio />} />
          <Route path="/data-model-analyzer/model-compare" element={<ModelCompare />} />
          <Route path="/data-model-analyzer/query" element={<QueryMode />} />
          <Route path="/data-model-analyzer/impact-analysis" element={<ImpactAnalysis />} />
          <Route path="/data-model-analyzer/visualize-model" element={<VisualizeModel />} />
          <Route path="/data-model-analyzer/enterprise-ontology" element={<EnterpriseOntology />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default DataModelAnalyzerPage;

