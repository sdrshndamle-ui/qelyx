import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const WhySection = ({ industry = 'insurance' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const insuranceBenefits = [
    "Automate claims and reporting workflows",
    "Improve risk accuracy with AI-driven insights",
    "Reduce operational overhead",
    "Ensure compliance with explainable, governed AI"
  ]

  const bankingBenefits = [
    "Automate transactions and reporting workflows",
    "Improve risk accuracy with AI-driven insights",
    "Reduce operational overhead",
    "Ensure compliance with explainable, governed AI"
  ]

  const financeBenefits = [
    "Accelerate financial close and reporting cycles",
    "Improve forecasting accuracy with integrated data",
    "Increase transparency for regulators and executives",
    "Reduce manual reconciliations and spreadsheet risk"
  ]

  const healthBenefits = [
    "Improve patient outcomes with better data visibility",
    "Reduce manual effort across clinical and operational workflows",
    "Support regulatory and quality reporting with confidence",
    "Strengthen data privacy and governance for PHI"
  ]

  let benefits = insuranceBenefits
  let industryName = 'Insurance'

  if (industry === 'banking') {
    benefits = bankingBenefits
    industryName = 'Banking'
  } else if (industry === 'finance') {
    benefits = financeBenefits
    industryName = 'Finance'
  } else if (industry === 'health') {
    benefits = healthBenefits
    industryName = 'Healthcare'
  }

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
    hidden: { opacity: 0, x: -30 },
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
    <section className="industry-why-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span className="eyebrow" variants={itemVariants}>
            Why It Matters
          </motion.span>
          <motion.h2 className="section-title" variants={itemVariants}>
            Why It Matters
          </motion.h2>
          <motion.p className="section-description" variants={itemVariants}>
            {industryName} operations rely heavily on manual reviews, fragmented data, and slow decision cycles. This increases cost, delays processes, and impacts customer satisfaction.
          </motion.p>
        </motion.div>

        <motion.div
          className="industry-benefits-list"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-item"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                x: 8,
                transition: { duration: 0.2 }
              }}
            >
              {benefit}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhySection


