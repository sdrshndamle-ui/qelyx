import { motion } from 'framer-motion'

const GradientOrbs = () => {
  return (
    <div className="gradient-orbs">
      <motion.div
        className="orb orb-1"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          type: "tween"
        }}
        style={{ willChange: 'transform' }}
      />
      <motion.div
        className="orb orb-2"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
          type: "tween"
        }}
        style={{ willChange: 'transform' }}
      />
      <motion.div
        className="orb orb-3"
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
          type: "tween"
        }}
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

export default GradientOrbs

