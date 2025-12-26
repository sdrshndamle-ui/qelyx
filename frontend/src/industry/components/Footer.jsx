import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <footer className="site-footer" ref={ref}>
      <div className="container footer-content">
        <motion.div
          className="footer-brand"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="logo" variants={itemVariants}>
            <img
              src="/Qelyx-Logo-New.png"
              alt="Qelyx Logo"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <span className="logo-text">Qelyx</span>
          </motion.div>
          <motion.p className="footer-tagline" variants={itemVariants}>
            Data modernization through insight, design, execution, and governance.
          </motion.p>
        </motion.div>
        <motion.div
          className="footer-links"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="link-group">
            <h4>Solutions</h4>
            <motion.a href="#discover" variants={itemVariants} whileHover={{ x: 4 }}>
              Insight & Assessment
            </motion.a>
            <motion.a href="#design" variants={itemVariants} whileHover={{ x: 4 }}>
              Blueprint & Architecture
            </motion.a>
            <motion.a href="#deliver" variants={itemVariants} whileHover={{ x: 4 }}>
              Execution & Enablement
            </motion.a>
            <motion.a href="#management" variants={itemVariants} whileHover={{ x: 4 }}>
              Governance & Optimization
            </motion.a>
          </div>
        </motion.div>
      </div>
      <div className="container footer-bottom">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          © 2025 Qelyx. All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}

export default Footer


