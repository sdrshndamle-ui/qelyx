import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <div className="home-header">
      <div className="header-container">
        <div className="header-logo">
          <a href="https://qelyx.com" className="logo-link" target="_blank" rel="noopener noreferrer">
            <span className="logo-text">Qelyx</span>
          </a>
        </div>
        <div className="header-nav">
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Home
          </a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Qelyx Solutions
          </a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Case Studies
          </a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Blogs
          </a>
          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            Technology
          </a>
        </div>
        <div className="header-profile" onMouseEnter={() => setShowProfileMenu(true)} onMouseLeave={() => setShowProfileMenu(false)}>
          <div className="profile-info">
            <span className="profile-label">Logged in as:</span>
            <span className="profile-name">admin</span>
          </div>
          <div className="profile-avatar">a</div>
          {showProfileMenu && (
            <div className="profile-dropdown-menu">
              <button className="sign-out-btn" onClick={() => window.location.href = 'https://qelyx.com'}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

