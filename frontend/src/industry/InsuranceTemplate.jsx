import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Header from './components/Header'
import IndustryHero from './components/IndustryHero'
import AgenticSection from './components/AgenticSection'
import WhySection from './components/WhySection'
import HowSection from './components/HowSection'
import CoreCapabilities from './components/CoreCapabilities'
import SolutionsSection from './components/SolutionsSection'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import GradientOrbs from './components/GradientOrbs'
import UXComparison from './components/UXComparison'
import AgenticBadges from './components/AgenticBadges'
import './App.css'
import './styles.css'
import './styles-ux-comparison.css'

/**
 * Exact template clone of the standalone Insurance/Banking experience
 * from Solution-Page-Design. Used as-is for the Insurance selection.
 */
const InsuranceTemplate = ({ embedded = false }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('insurance')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Always start the page at the top so the hero section is visible on reload
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const handleIndustryChange = (industry) => {
    setSelectedIndustry(industry)
  }

  return (
    <div className="app">
      <AnimatedBackground />
      <GradientOrbs />
      {!embedded && (
        <motion.div
          className="scroll-progress-indicator"
          style={{ scaleX }}
        >
          <div className="scroll-progress-bar" />
        </motion.div>
      )}

      {!embedded && (
        <Header
          selectedIndustry={selectedIndustry}
          onIndustryChange={handleIndustryChange}
        />
      )}
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
          <SolutionsSection industry={selectedIndustry} />
        </div>
      </main>
      {!embedded && <Footer />}
    </div>
  )
}

export default InsuranceTemplate


