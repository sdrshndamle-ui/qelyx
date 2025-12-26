import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const Header = ({ selectedIndustry, onIndustryChange }) => {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  const handleIndustrySelect = (industry) => {
    if (onIndustryChange) {
      onIndustryChange(industry)
    }
    setIsDropdownOpen(false)
  }

  return (
    <motion.header
      className="site-header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container header-content">
        <motion.div
          className="logo"
          style={{ cursor: 'pointer' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/Qelyx-Logo-New.png"
            alt="Qelyx Logo"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <span className="logo-text">Qelyx</span>
        </motion.div>
        <nav className="nav">
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.a>
          <div
            className="nav-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <motion.a
              href="#industrial-solutions"
              className="active"
              whileHover={{ scale: 1.05 }}
            >
              Industrial Solutions <span className="dropdown-arrow">▼</span>
            </motion.a>
            {isDropdownOpen && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <motion.a
                  href="#insurance"
                  className={selectedIndustry === 'insurance' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    handleIndustrySelect('insurance')
                  }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  Insurance
                </motion.a>
                <motion.a
                  href="#banking"
                  className={selectedIndustry === 'banking' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    handleIndustrySelect('banking')
                  }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  Banking
                </motion.a>
              </motion.div>
            )}
          </div>
          <div className="nav-dropdown">
            <motion.a
              href="#technical-solutions"
              whileHover={{ scale: 1.05 }}
            >
              Technical Solutions <span className="dropdown-arrow">▼</span>
            </motion.a>
          </div>
          <motion.a
            href="#pipelines"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pipelines
          </motion.a>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header


