import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import './HomeTab.css'

const HomeTab = () => {
  const navigate = useNavigate()

  return (
    <div className="home-tab">
      <div className="section-container">
        <Button
          type="primary"
          icon={<HomeOutlined />}
          onClick={() => navigate('/')}
          size="large"
        >
          Back to Data Product Designer Home
        </Button>
      </div>
    </div>
  )
}

export default HomeTab

