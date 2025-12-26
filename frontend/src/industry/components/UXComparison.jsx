import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const UXComparison = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <div className="ux-comparison-container" ref={ref}>
      <motion.div
        className="ux-comparison"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Traditional UX Side */}
        <motion.div
          className="ux-side traditional-ux"
          variants={itemVariants}
        >
          <h3 className="ux-side-title">Traditional Automation</h3>
          
          <div className="ux-user-section">
            <div className="ux-user-container">
              <div className="ux-user">
                <div className="ux-user-icon">👤</div>
                <div className="ux-laptop">💻</div>
              </div>
            </div>
          </div>

          <div className="ux-process-section">
            <div className="ux-process-flow">
              <motion.div
                className="process-step"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.6 }}
              >
                <div className="process-icon">📊</div>
                <div className="process-label">Data</div>
              </motion.div>
              
              <motion.div
                className="process-arrow"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ delay: 0.7 }}
              >
                →
              </motion.div>
              
              <motion.div
                className="process-step"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.8 }}
              >
                <div className="process-icon">📐</div>
                <div className="process-label">Rules</div>
              </motion.div>
              
              <motion.div
                className="process-arrow"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ delay: 0.9 }}
              >
                →
              </motion.div>
              
              <motion.div
                className="process-step"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 1.0 }}
              >
                <div className="process-icon">📋</div>
                <div className="process-label">Manual Review</div>
              </motion.div>
              
              <motion.div
                className="process-arrow"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ delay: 1.1 }}
              >
                →
              </motion.div>
              
              <motion.div
                className="process-step"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 1.2 }}
              >
                <div className="process-icon">✅</div>
                <div className="process-label">Action</div>
              </motion.div>
            </div>
          </div>

          <div className="ux-badges-section">
            <div className="ux-badges">
              <motion.span
                className="ux-badge negative"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.3 }}
              >
                ❌ Slow
              </motion.span>
              <motion.span
                className="ux-badge negative"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.4 }}
              >
                ❌ Fragmented
              </motion.span>
              <motion.span
                className="ux-badge negative"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.5 }}
              >
                ❌ High cost
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* VS Divider */}
        <motion.div
          className="ux-vs-divider"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          VS
        </motion.div>

        {/* Agentic AI UX Side */}
        <motion.div
          className="ux-side agentic-ux"
          variants={itemVariants}
        >
          <h3 className="ux-side-title">Qelyx Agentic AI</h3>
          
          <div className="ux-user-section">
            <div className="ux-user-container">
              <div className="ux-user">
                <div className="ux-user-icon">🤖</div>
                <div className="ux-laptop">💻</div>
              </div>
            </div>
          </div>

          <div className="ux-process-section">
            <div className="ux-process-flow agentic-flow">
              <motion.div
                className="process-step primary"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 0.6 }}
              >
                <div className="process-icon">📊</div>
                <div className="process-label">Unified Data</div>
              </motion.div>
              
              <motion.div
                className="process-arrow"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ delay: 0.7 }}
              >
                →
              </motion.div>
              
              <motion.div
                className="process-step primary"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 0.8 }}
              >
                <div className="process-icon">🧠</div>
                <div className="process-label">Reason</div>
              </motion.div>
              
              <motion.div
                className="process-arrow"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ delay: 0.9 }}
              >
                →
              </motion.div>
              
              <motion.div
                className="process-step primary"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 1.0 }}
              >
                <div className="process-icon">⚡</div>
                <div className="process-label">Decide</div>
              </motion.div>
              
              <motion.div
                className="process-arrow"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ delay: 1.1 }}
              >
                →
              </motion.div>
              
              <motion.div
                className="process-step primary"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 1.2 }}
              >
                <div className="process-icon">👨‍💼</div>
                <div className="process-label">Human Oversight</div>
              </motion.div>
              
              <motion.div
                className="process-arrow"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ delay: 1.3 }}
              >
                →
              </motion.div>
              
              <motion.div
                className="process-step primary"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 1.4 }}
              >
                <div className="process-icon">🚀</div>
                <div className="process-label">Act</div>
              </motion.div>
            </div>
          </div>

          <div className="ux-badges-section">
            <div className="ux-badges">
            <motion.span
              className="ux-badge positive"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 1.5 }}
            >
              ✅ Fast
            </motion.span>
            <motion.span
              className="ux-badge positive"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 1.6 }}
            >
              ✅ Scalable
            </motion.span>
            <motion.span
              className="ux-badge positive"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 1.7 }}
            >
              ✅ Compliant
            </motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default UXComparison


