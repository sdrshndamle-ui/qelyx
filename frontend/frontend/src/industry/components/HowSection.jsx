import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const HowSection = ({ industry = 'insurance' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const insuranceCapabilities = [
    {
      title: "Guidewire & Core System Integration",
      description: "A unified insurance data foundation.",
      items: [
        "PolicyCenter, ClaimCenter, BillingCenter integration",
        "Logical insurance data models",
        "Analytics-ready lakehouse architecture"
      ]
    },
    {
      title: "Agentic AI for Insurance Workflows",
      description: "AI agents that operate independently within business and regulatory rules.",
      items: [
        "Autonomous claims intake, triage, and resolution",
        "Intelligent agents for policy validation and underwriting support",
        "AI-driven actuarial and finance reporting workflows",
        "Human-in-the-loop controls for regulatory compliance"
      ]
    },
    {
      title: "Governance, Risk & Compliance",
      description: "Trust and transparency built into every AI decision.",
      items: [
        "Explainable AI for claims and underwriting",
        "End-to-end data and decision lineage",
        "Automated compliance reporting (IFRS, GAAP, Solvency)"
      ]
    }
  ]

  const bankingCapabilities = [
    {
      title: "Core Banking System Integration",
      description: "A unified banking data foundation.",
      items: [
        "Core banking systems integration",
        "Logical banking data models",
        "Analytics-ready lakehouse architecture"
      ]
    },
    {
      title: "Agentic AI for Banking Workflows",
      description: "AI agents that operate independently within business and regulatory rules.",
      items: [
        "Autonomous transaction processing and validation",
        "Intelligent agents for credit validation and risk assessment",
        "AI-driven regulatory and finance reporting workflows",
        "Human-in-the-loop controls for regulatory compliance"
      ]
    },
    {
      title: "Governance, Risk & Compliance",
      description: "Trust and transparency built into every AI decision.",
      items: [
        "Explainable AI for transactions and credit decisions",
        "End-to-end data and decision lineage",
        "Automated compliance reporting (Basel, IFRS, GAAP)"
      ]
    }
  ]

  const financeCapabilities = [
    {
      title: "Financial Data Platform Design",
      description: "A unified, governed foundation for finance and risk.",
      items: [
        "Integrated GL, sub‑ledger, and planning data models",
        "Data vault and dimensional models for finance & risk",
        "Pre‑built patterns for regulatory and statutory reporting"
      ]
    },
    {
      title: "Digital Finance & FP&A Workbench",
      description: "Modern analytics and planning for CFO and FP&A teams.",
      items: [
        "Self‑service financial reporting and dashboards",
        "Scenario and driver‑based planning models",
        "Embedded workflow and approvals for plan changes"
      ]
    },
    {
      title: "Controls, Compliance & Auditability",
      description: "End‑to‑end transparency across data and decisions.",
      items: [
        "Data lineage from source systems to disclosures",
        "Policy‑driven access and segregation of duties",
        "Audit‑ready evidence for internal and external stakeholders"
      ]
    }
  ]

  const healthCapabilities = [
    {
      title: "Clinical & Operational Data Foundation",
      description: "Unify EMR, claims, and operational data at scale.",
      items: [
        "Standardized clinical, financial, and operational models",
        "Near real‑time ingestion from EMR, LIS, and ancillary systems",
        "Secure, HIPAA‑compliant data zones and views"
      ]
    },
    {
      title: "Care Pathway & Population Analytics",
      description: "Insights that connect quality, cost, and experience.",
      items: [
        "Patient journey and cohort analytics",
        "Readmission, length‑of‑stay, and throughput analysis",
        "Value‑based care and quality program reporting"
      ]
    },
    {
      title: "Healthcare Governance & Compliance",
      description: "Operationalize privacy and regulatory controls.",
      items: [
        "Automated PHI discovery and classification",
        "Access monitoring and consent management",
        "Regulatory and accreditation reporting accelerators"
      ]
    }
  ]

  let capabilities = insuranceCapabilities
  let industryName = 'Insurance'

  if (industry === 'banking') {
    capabilities = bankingCapabilities
    industryName = 'Banking'
  } else if (industry === 'finance') {
    capabilities = financeCapabilities
    industryName = 'Finance'
  } else if (industry === 'health') {
    capabilities = healthCapabilities
    industryName = 'Healthcare'
  }

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

  return (
    <section className="industry-how-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span className="eyebrow" variants={itemVariants}>
            How Qelyx Helps {industryName}
          </motion.span>
          <motion.h2 className="section-title" variants={itemVariants}>
            How Qelyx Helps {industryName}
          </motion.h2>
        </motion.div>

        <motion.div
          className="industry-capabilities-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              className="industry-capability-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 217, 255, 0.3)"
              }}
            >
              <h3 className="capability-title">{capability.title}</h3>
              <p className="capability-description">{capability.description}</p>
              <ul className="capability-list">
                {capability.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + i * 0.1 + 0.5 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowSection


