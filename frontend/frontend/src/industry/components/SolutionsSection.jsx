import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const defaultInsuranceSolutions = [
  {
    title: "Guidewire Integration & Insurance Data Platform",
    description: "End-to-end insurance data platform integrating Guidewire core systems with a modern lakehouse to enable unified policy, claims, and financial analytics.",
    keywords: ["Insurance", "Guidewire", "Data Platform"]
  },
  {
    title: "Finance & Actuarial Reporting",
    description: "Modernized finance and actuarial reporting solutions with automated data pipelines, governed metrics, and regulatory-ready outputs.",
    keywords: ["Finance", "Actuarial", "Reporting"]
  },
  {
    title: "Agentic Claims Process Automation",
    description: "Autonomous claims processing powered by Agentic AI to intelligently intake, assess, route, and resolve claims with built-in human oversight.",
    keywords: ["Agentic AI", "Claims", "Automation"]
  }
]

const defaultBankingSolutions = [
  {
    title: "Credit & Risk Intelligence",
    description: "Advanced analytics and AI-driven insights to enhance credit decisions, improve risk assessment, and optimize portfolio performance.",
    keywords: ["Credit", "Risk", "Analytics"]
  }
]

const SolutionsSection = ({ industry = 'insurance', solutions = [], onSolutionClick }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const fallbackSolutions =
    industry === 'banking'
      ? defaultBankingSolutions
      : defaultInsuranceSolutions
  const renderedSolutions = (solutions && solutions.length > 0 ? solutions : fallbackSolutions)
    .map(solution => ({
      ...solution,
      description: solution.description || solution.copy || solution.details || ''
    }))

  let industryName = 'Insurance'
  if (industry === 'banking') {
    industryName = 'Banking'
  } else if (industry === 'finance') {
    industryName = 'Finance'
  } else if (industry === 'health') {
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <section className="industry-solutions-section" id="solutions" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span className="eyebrow" variants={itemVariants}>
            {industryName} Solutions
          </motion.span>
          <motion.h2 className="section-title" variants={itemVariants}>
            {industryName} Solutions
          </motion.h2>
          <motion.p className="section-description" variants={itemVariants}>
            Explore our comprehensive solutions designed specifically for {industryName.toLowerCase()} industry needs.
          </motion.p>
        </motion.div>

        <motion.div
          key={industry}
          className="modules-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {renderedSolutions.map((solution, index) => (
            <motion.div
              key={index}
              className="module-card category-card"
              style={{ '--delay': `${index * 0.05}s` }}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSolutionClick?.(solution, { phase: industryName, id: industry })}
            >
              <div className="card-content">
                <motion.div
                  className="card-category-badge"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {industryName}
                </motion.div>
                <h3 className="card-title">{solution.title}</h3>
                <p className="card-description">{solution.description}</p>
                <div className="card-keywords">
                  {(solution.keywords || []).map((keyword, i) => (
                    <motion.span
                      key={i}
                      className="keyword-tag"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.05 + 0.4 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {keyword}
                    </motion.span>
                  ))}
                </div>
                <div className="card-footer">
                  <motion.span
                    className="card-link"
                    whileHover={{ x: 4 }}
                  >
                    View Details →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionsSection


