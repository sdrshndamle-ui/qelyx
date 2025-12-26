import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const AgenticBadges = ({ industry = 'insurance' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  const baseBadges = [
    { icon: "🤖", label: "Agentic AI", desc: "Autonomous, goal-driven AI with governance" },
    { icon: "🔍", label: "Explainable AI", desc: "Transparent, auditable decisions" },
    { icon: "👥", label: "Human-in-the-Loop", desc: "Control without bottlenecks" }
  ]

  const industryReadyLabelMap = {
    insurance: "Insurance-Ready",
    banking: "Banking-Ready",
    finance: "Finance-Ready",
    health: "Healthcare-Ready"
  }

  const industryReadyLabel = industryReadyLabelMap[industry] || "Enterprise-Ready"

  const badges = [
    ...baseBadges,
    { icon: "🛡️", label: industryReadyLabel, desc: "Built for regulated environments" }
  ]

  return (
    <section className="agentic-badges-section" ref={ref}>
      <div className="container">
        <motion.div
          className="microcopy-badges-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              className="microcopy-badge"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                boxShadow: "0 10px 25px rgba(0, 217, 255, 0.25)"
              }}
            >
              <motion.div
                className="badge-icon"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {badge.icon}
              </motion.div>
              <span className="badge-label">{badge.label}</span>
              <span className="badge-desc">{badge.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AgenticBadges

