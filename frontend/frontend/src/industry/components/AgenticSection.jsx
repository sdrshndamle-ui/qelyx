import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const AgenticSection = ({ industry = 'insurance' }) => {
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

  const insuranceFlowSteps = [
    {
      number: 1,
      icon: "📊",
      title: "Unified Insurance Data",
      label: "Policy • Claims • Billing • Finance",
      caption: "Insurance data unified from Guidewire and core systems into a governed data platform."
    },
    {
      number: 2,
      icon: "🧠",
      title: "Agentic AI Reasoning Layer",
      label: "Agentic AI Engine",
      points: [
        "Reason over policy, claims, and risk data",
        "Apply business and regulatory rules",
        "Evaluate confidence and next-best action"
      ]
    },
    {
      number: 3,
      icon: "🚀",
      title: "Autonomous Action",
      label: "Automated Workflows",
      examples: [
        "Claims triage and routing",
        "Fraud and anomaly escalation",
        "Policy validation checks",
        "Actuarial report generation"
      ]
    },
    {
      number: 4,
      icon: "👨‍💼",
      title: "Human-in-the-Loop Governance",
      label: "Oversight & Control",
      callouts: [
        "Approval thresholds",
        "Explainable decisions",
        "Full audit trail",
        "Regulatory compliance"
      ]
    }
  ]

  const bankingFlowSteps = [
    {
      number: 1,
      icon: "📊",
      title: "Unified Banking Data",
      label: "Accounts • Transactions • Loans • Finance",
      caption: "Banking data unified from core banking systems into a governed data platform."
    },
    {
      number: 2,
      icon: "🧠",
      title: "Agentic AI Reasoning Layer",
      label: "Agentic AI Engine",
      points: [
        "Reason over accounts, transactions, and risk data",
        "Apply business and regulatory rules",
        "Evaluate confidence and next-best action"
      ]
    },
    {
      number: 3,
      icon: "🚀",
      title: "Autonomous Action",
      label: "Automated Workflows",
      examples: [
        "Transaction processing and routing",
        "Fraud and anomaly detection",
        "Credit validation checks",
        "Regulatory report generation"
      ]
    },
    {
      number: 4,
      icon: "👨‍💼",
      title: "Human-in-the-Loop Governance",
      label: "Oversight & Control",
      callouts: [
        "Approval thresholds",
        "Explainable decisions",
        "Full audit trail",
        "Regulatory compliance"
      ]
    }
  ]

  const financeFlowSteps = [
    {
      number: 1,
      icon: "📊",
      title: "Unified Financial Data",
      label: "GL • Planning • Risk • Performance",
      caption: "Financial data consolidated from ERPs, planning tools, and data warehouses into a governed platform."
    },
    {
      number: 2,
      icon: "🧮",
      title: "Finance Intelligence Layer",
      label: "Forecasting & Analytics",
      points: [
        "Scenario modelling and what‑if analysis",
        "Automated variance and root‑cause insights",
        "Cash‑flow, liquidity, and margin optimization"
      ]
    },
    {
      number: 3,
      icon: "📈",
      title: "Automated Close & Reporting",
      label: "Close & Compliance",
      examples: [
        "Fast, automated financial close",
        "Regulatory and statutory reporting",
        "Executive performance dashboards"
      ]
    },
    {
      number: 4,
      icon: "🛡️",
      title: "Controlled & Audit‑Ready",
      label: "Governance & Assurance",
      callouts: [
        "Policy‑driven approvals and thresholds",
        "Full traceability across data and decisions",
        "Support for SOX, IFRS, and local GAAP"
      ]
    }
  ]

  const healthFlowSteps = [
    {
      number: 1,
      icon: "🏥",
      title: "Unified Healthcare Data",
      label: "EMR • Claims • Operations",
      caption: "Clinical, claims, and operational data unified into a secure, HIPAA‑aware platform."
    },
    {
      number: 2,
      icon: "🧠",
      title: "Clinical & Operational Intelligence",
      label: "Insight Engine",
      points: [
        "Patient risk and cohort analytics",
        "Throughput and capacity optimization",
        "Quality, safety, and outcome monitoring"
      ]
    },
    {
      number: 3,
      icon: "⚙️",
      title: "Care & Operations Automation",
      label: "Smart Workflows",
      examples: [
        "Prior‑auth & referral routing",
        "Revenue‑cycle and denial management",
        "Staffing and bed‑management optimization"
      ]
    },
    {
      number: 4,
      icon: "🛡️",
      title: "Trust, Privacy & Compliance",
      label: "Oversight & Control",
      callouts: [
        "PHI protection and data masking",
        "Embedded policy and consent controls",
        "Audit trails for regulatory reporting"
      ]
    }
  ]

  let flowSteps = insuranceFlowSteps
  let industryName = 'Insurance'

  if (industry === 'banking') {
    flowSteps = bankingFlowSteps
    industryName = 'Banking'
  } else if (industry === 'finance') {
    flowSteps = financeFlowSteps
    industryName = 'Finance'
  } else if (industry === 'health') {
    flowSteps = healthFlowSteps
    industryName = 'Healthcare'
  }

  return (
    <section className="industry-agentic-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Agentic AI for {industryName} Operations
          </motion.h2>
          <motion.p className="section-description" variants={itemVariants}>
            <strong>From insights to autonomous action—governed, explainable, and compliant.</strong>
          </motion.p>
        </motion.div>

        <motion.div
          className="agentic-flow"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {flowSteps.map((step, index) => (
            <motion.div
              key={index}
              className="flow-step flow-step-hover"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { duration: 0.3 }
              }}
              style={{ zIndex: 5 }}
            >
              <div className="flow-step-content">
                <motion.div
                  className="flow-step-icon"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="flow-step-title">{step.title}</h3>
                <div className="flow-step-label">{step.label}</div>
                {step.caption && <p className="flow-step-caption">{step.caption}</p>}
                {step.points && (
                  <ul className="flow-step-points">
                    {step.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
                {step.examples && (
                  <ul className="flow-step-examples">
                    {step.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                )}
                {step.callouts && (
                  <ul className="flow-step-callouts">
                    {step.callouts.map((callout, i) => (
                      <li key={i}>{callout}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AgenticSection


