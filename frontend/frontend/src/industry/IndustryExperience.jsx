import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import GradientOrbs from './components/GradientOrbs'
import IndustryHero from './components/IndustryHero'
import AgenticSection from './components/AgenticSection'
import UXComparison from './components/UXComparison'
import AgenticBadges from './components/AgenticBadges'
import WhySection from './components/WhySection'
import HowSection from './components/HowSection'
import CoreCapabilities from './components/CoreCapabilities'
import SolutionsSection from './components/SolutionsSection'
import './App.css'
import './styles.css'
import './styles-ux-comparison.css'

/**
 * Modern industrial solutions experience (banking + insurance) lifted from
 * the dedicated Solution-Page-Design app. This keeps the animated background,
 * scroll progress indicator, and motion-heavy sections while letting the
 * parent decide which industry to show.
 */
const IndustryExperience = ({
  initialIndustry = 'insurance',
  solutionsByIndustry = {},
  onSolutionClick
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState(initialIndustry)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setSelectedIndustry(initialIndustry)
  }, [initialIndustry])

  const industrySolutions = solutionsByIndustry[selectedIndustry] || []

  return (
    <div className="app industry-experience">
      <AnimatedBackground />
      <GradientOrbs />

      <motion.div
        className="scroll-progress-indicator"
        style={{ scaleX }}
      >
        <div className="scroll-progress-bar" />
      </motion.div>

      <main>
        <div className="section-wrapper">
          <IndustryHero industry={selectedIndustry} />
        </div>
        <div className="section-wrapper">
          <AgenticSection industry={selectedIndustry} />
        </div>
        <div className="section-wrapper comparison-wrapper">
          <UXComparison industry={selectedIndustry} />
        </div>
        <div className="section-wrapper badges-wrapper">
          <AgenticBadges industry={selectedIndustry} />
        </div>
        <div className="section-wrapper">
          <WhySection industry={selectedIndustry} />
        </div>
        <div className="section-wrapper">
          <HowSection industry={selectedIndustry} />
        </div>
        <div className="section-wrapper">
          <CoreCapabilities industry={selectedIndustry} />
        </div>
        <div className="section-wrapper">
          <SolutionsSection
            industry={selectedIndustry}
            solutions={industrySolutions}
            onSolutionClick={onSolutionClick}
          />
        </div>
      </main>
    </div>
  )
}

export default IndustryExperience

