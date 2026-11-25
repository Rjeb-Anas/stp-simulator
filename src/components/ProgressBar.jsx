import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  )
}