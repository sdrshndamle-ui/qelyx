import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RocketOutlined } from '@ant-design/icons';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Qelyx Code Assistant</h1>
          <p className="hero-subtitle">
            Transform your legacy code into modern technologies with AI-powered migration, 
            documentation, and business rule extraction.
          </p>
          <Button
            type="primary"
            size="large"
            icon={<RocketOutlined />}
            onClick={() => navigate('/code-assistant/solutions')}
            className="get-started-button"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
