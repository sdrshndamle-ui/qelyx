import { Card, Row, Col, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  AppstoreOutlined,
  SwapOutlined,
  EditOutlined,
  DatabaseOutlined,
} from '@ant-design/icons'
import RAGSystemSection from '../components/RAGSystemSection'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()

  const modules = [
    {
      key: 'model-studio',
      icon: <AppstoreOutlined className="module-icon" />,
      title: 'Model Studio',
      description: 'Select and analyze data models using Query Mode or Impact Analysis powered by Generative AI',
      gradient: 'linear-gradient(145deg, #22d3ee, #0ea5e9)',
      route: '/data-model-analyzer/model-studio',
    },
    {
      key: 'model-compare',
      icon: <SwapOutlined className="module-icon" />,
      title: 'Model Compare',
      description: 'Compare two data models side-by-side and get recommendations for extending them',
      gradient: 'linear-gradient(145deg, #22c55e, #16a34a)',
      route: '/data-model-analyzer/model-compare',
    },
    {
      key: 'visualize-model',
      icon: <EditOutlined className="module-icon" />,
      title: 'Visualize Model',
      description: 'Visualize and modify data models using React Flow with table or attribute level views',
      gradient: 'linear-gradient(145deg, #6366f1, #22d3ee)',
      route: '/data-model-analyzer/visualize-model',
    },
    {
      key: 'enterprise-ontology',
      icon: <DatabaseOutlined className="module-icon" />,
      title: 'Enterprise Ontology',
      description: 'Manage and standardize enterprise data models with detailed field properties and ontology mapping',
      gradient: 'linear-gradient(145deg, #f59e0b, #d97706)',
      route: '/data-model-analyzer/enterprise-ontology',
    },
  ]

  return (
    <div className="homepage">
      <div className="hero-section">
        <h1 className="hero-title">Data Model Analyzer</h1>
        <p className="hero-subtitle">
          Leverage Generative AI and Industry Ontology to analyze, understand, and transform your data models
        </p>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/data-model-analyzer/model-studio')}
          className="hero-cta"
        >
          Start Analysis
        </Button>
      </div>

      <div className="modules-section">
        <h2 className="section-title">Core Modules</h2>
        <Row gutter={[24, 24]}>
          {modules.map((module) => (
            <Col xs={24} sm={12} lg={6} key={module.key}>
              <Card
                className="module-card"
                hoverable
                onClick={() => navigate(module.route)}
              >
                <div
                  className="module-icon-wrapper"
                  style={{ background: module.gradient }}
                >
                  {module.icon}
                </div>
                <h3 className="module-title">{module.title}</h3>
                <p className="module-description">{module.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <RAGSystemSection />
    </div>
  )
}

export default HomePage

