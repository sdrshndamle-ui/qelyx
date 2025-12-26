import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const IndustryHero = ({ industry = 'insurance' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const industryContent = {
    insurance: {
      icon: '🡇',
      subtitle: 'Insurance data modernization and intelligent automation solutions.',
      description:
        'Purpose-built solutions to modernize insurance data platforms, integrate core systems, and apply Agentic AI to automate claims, underwriting, and reporting—securely and at scale.'
    },
    banking: {
      icon: '🏦',
      subtitle: 'Banking data modernization and intelligent automation solutions.',
      description:
        'Modernize core banking platforms, unify customer and transaction data, and apply Agentic AI to enhance payments, lending, risk, and compliance operations.'
    },
    finance: {
      icon: '💰',
      subtitle: 'Financial data platforms for insight, control, and performance.',
      description:
        'Unify general ledger, planning, and risk data into a governed platform to accelerate close, strengthen forecasting, and improve financial decision‑making.'
    },
    health: {
      icon: '🏥',
      subtitle: 'Data‑driven care and operational excellence for healthcare providers.',
      description:
        'Connect clinical, claims, and operational data to power better patient outcomes, capacity planning, and regulatory reporting with embedded governance.'
    }
  }

  const content = industry in industryContent ? industryContent[industry] : industryContent.insurance

  const industryLabelMap = {
    insurance: 'Insurance',
    banking: 'Banking',
    finance: 'Financial Services',
    health: 'Healthcare'
  }

  const industryLabel = industryLabelMap[industry] || 'Your Industry'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
    <section className="industry-hero" ref={ref}>
      <div className="hero-background-pattern"></div>
      <div className="container">
        <motion.div
          className="industry-hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="industry-hero-layout">
            <div className="industry-hero-left">
              <motion.div
                className="industry-icon"
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {content.icon}
              </motion.div>
              
              <motion.h1
                className="industry-hero-title"
                variants={itemVariants}
              >
                Modern Data &{' '}
                <motion.span
                  style={{ color: 'var(--primary)' }}
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(0, 217, 255, 0.5)',
                      '0 0 30px rgba(0, 217, 255, 0.8)',
                      '0 0 20px rgba(0, 217, 255, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Agentic AI
                </motion.span>
                {' '}Solutions for {industryLabel}
              </motion.h1>
              
              <motion.p
                className="industry-hero-subtitle"
                variants={itemVariants}
              >
                {content.subtitle}
              </motion.p>
              
              <motion.p
                className="industry-hero-description"
                variants={itemVariants}
              >
                {content.description}
              </motion.p>
            </div>

            {industry === 'insurance' && (
              <motion.div
                className="industry-hero-right"
                variants={itemVariants}
              >
                <motion.img
                  src="https://cdn-res.keymedia.com/cdn-cgi/image/w=840,h=504,f=auto/https://cdn-res.keymedia.com/cms/images/us/003/0308_638048062043969265.jpg"
                  alt="Insurance solutions visual"
                  className="industry-hero-image"
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default IndustryHero


