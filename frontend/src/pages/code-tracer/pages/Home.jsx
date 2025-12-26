import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'antd'
import { RocketOutlined, ArrowRightOutlined } from '@ant-design/icons'
import FlyWheelSection from '../components/FlyWheelSection'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span>Data Lineage Visualization Solution</span>
          </div>
          <h1 className="hero-title">
            Discover, Track, Analyse, Transform
            <br />
            <span className="gradient-text">Qelyx Code Tracer</span> Does it All.
          </h1>
          <p className="hero-subtitle">
            Unveil your Data's Journey with our one-stop lineage solution. Gain insight into your data's movement, 
            transformations, and dependencies enabling you to make informed decisions confidently.
          </p>
          <div className="hero-actions">
            <Button 
              type="primary" 
              size="large" 
              icon={<RocketOutlined />}
              onClick={() => navigate('/code-tracer/catalog')}
              className="cta-primary"
            >
              Launch
            </Button>
            <Button 
              size="large" 
              icon={<ArrowRightOutlined />}
              className="cta-secondary"
            >
              Read More
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glow-effect glow-1"></div>
          <div className="glow-effect glow-2"></div>
        </div>
      </section>

      <FlyWheelSection />

      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Qelyx Code Tracer?</h2>
          <p className="section-description">
            Everything you need to track and visualize data lineage with confidence and speed
          </p>
        </div>
        <div className="features-grid">
          <Card className="feature-card" hoverable>
            <div className="feature-icon" style={{ color: 'rgb(0, 217, 255)' }}>
              <RocketOutlined style={{ fontSize: '32px' }} />
            </div>
            <h3 className="feature-title">Visual Lineage</h3>
            <p className="feature-description">
              Interactive data lineage graphs powered by React Flow. Trace data transformations end-to-end.
            </p>
          </Card>
          <Card className="feature-card" hoverable>
            <div className="feature-icon" style={{ color: 'rgb(0, 217, 255)' }}>
              <RocketOutlined style={{ fontSize: '32px' }} />
            </div>
            <h3 className="feature-title">Column-Level Tracking</h3>
            <p className="feature-description">
              Track data at the column level with detailed mapping information and transformation logic.
            </p>
          </Card>
          <Card className="feature-card" hoverable>
            <div className="feature-icon" style={{ color: 'rgb(0, 217, 255)' }}>
              <RocketOutlined style={{ fontSize: '32px' }} />
            </div>
            <h3 className="feature-title">Smart Mapping</h3>
            <p className="feature-description">
              Intelligent mapping between source systems and targets with comprehensive field matching.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Home

