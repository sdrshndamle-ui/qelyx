import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SolutionsPage from './pages/SolutionsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout className="app">
      <Navbar />
      <Content>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
