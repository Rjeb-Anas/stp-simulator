
import { motion } from 'framer-motion'
import { Presentation, Maximize, ArrowRight } from 'lucide-react'

export default function PresentationStart({ onStart }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e40af33,_transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-8 text-center shadow-2xl md:p-12"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
          <Presentation size={38} />
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
          FST Fès · 2026–2027
        </p>

        <h1 className="text-3xl font-extrabold text-white md:text-4xl">
          VLAN & PROTOCOLE STP
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
          Fonctionnement · Simulation · Analyse
        </p>

        <div className="my-8 flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          <Maximize size={19} className="text-blue-400" />
          <span>La présentation nécessite le mode plein écran.</span>
        </div>

        <button
          onClick={onStart}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-500"
        >
          Commencer la présentation
          <ArrowRight size={20} />
        </button>

        <p className="mt-5 text-xs text-slate-500">
          Utilisez les flèches du clavier pour naviguer entre les diapositives.
        </p>
      </motion.div>
    </div>
  )
}
