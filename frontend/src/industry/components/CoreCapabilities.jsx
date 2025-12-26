import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const CoreCapabilities = ({ industry = 'insurance' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const insuranceCapabilities = [
    "✔ Finance & Actuarial Reporting",
    "✔ Guidewire Integration & Insurance Data Lake",
    "✔ Agentic AI Claims Process Automation",
    "✔ Risk, Exposure & Loss Analytics",
    "✔ Data Governance, Lineage & Controls"
  ]

  const bankingCapabilities = [
    "✔ Finance & Regulatory Reporting",
    "✔ Core Banking Integration & Banking Data Lake",
    "✔ Agentic AI Transaction Process Automation",
    "✔ Risk, Credit & Portfolio Analytics",
    "✔ Data Governance, Lineage & Controls"
  ]

  const financeCapabilities = [
    "✔ Finance Data Platform & Single Source of Truth",
    "✔ Automated Close, Consolidation & Reporting",
    "✔ Advanced Forecasting & Scenario Modelling",
    "✔ Integrated Risk & Performance Analytics",
    "✔ Finance Data Governance & Controls"
  ]

  const healthCapabilities = [
    "✔ Unified Clinical & Operational Data Platform",
    "✔ Patient & Population Health Analytics",
    "✔ Revenue Cycle & Cost of Care Intelligence",
    "✔ Quality, Safety & Regulatory Reporting",
    "✔ PHI Governance, Lineage & Compliance"
  ]

  let capabilities = insuranceCapabilities

  if (industry === 'banking') {
    capabilities = bankingCapabilities
  } else if (industry === 'finance') {
    capabilities = financeCapabilities
  } else if (industry === 'health') {
    capabilities = healthCapabilities
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <section className="industry-core-capabilities" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span className="eyebrow" variants={itemVariants}>
            Core Capabilities
          </motion.span>
          <motion.h2 className="section-title" variants={itemVariants}>
            Core Capabilities
          </motion.h2>
        </motion.div>

        <motion.div
          className="core-capabilities-list"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              className="core-capability-item"
              style={{ '--index': index }}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                x: 8,
                transition: { duration: 0.2 }
              }}
            >
              {capability}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CoreCapabilities


