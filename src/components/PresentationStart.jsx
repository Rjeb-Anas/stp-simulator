
import { motion } from 'framer-motion'
import {
  Presentation,
  Maximize,
  ArrowRight,
  Network,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react'

const topics = [
  { icon: Network, label: 'Fonctionnement' },
  { icon: Presentation, label: 'Simulation' },
  { icon: ShieldCheck, label: 'Analyse' },
]

export default function PresentationStart({ onStart }) {
  return (
    <main className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#080E1C] p-4 sm:p-6">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/15 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main content */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700/70 bg-[#111B2E] shadow-2xl"
      >
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />

        <div className="px-5 py-7 sm:px-10 sm:py-9">

          {/* Institution */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
              <GraduationCap size={22} className="text-cyan-400" />
            </div>

            <div>
              <p className="text-sm font-bold tracking-wider text-white">
                FST FÈS
              </p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                Faculté des Sciences et Techniques
              </p>
            </div>
          </div>

          {/* Main icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
            <Network size={32} className="text-cyan-400" strokeWidth={1.6} />
          </div>

          {/* Title */}
          <div className="text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 sm:text-xs">
              Présentation académique · 2026–2027
            </p>

            <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              VLAN
              <span className="mx-2 font-light text-slate-500">&</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                PROTOCOLE STP
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              Fonctionnement, simulation et analyse des mécanismes
              de segmentation réseau et de prévention des boucles de niveau 2.
            </p>
          </div>

          {/* Topics */}
          <div className="my-6 grid grid-cols-3 gap-2 sm:gap-4">
            {topics.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-800/50 px-2 py-3 sm:py-4"
              >
                <Icon size={21} className="text-blue-400" />
                <span className="text-center text-[10px] font-semibold text-slate-300 sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Fullscreen information */}
          <div className="mb-5 flex items-center justify-center gap-3 rounded-lg border border-slate-700/60 bg-slate-800/40 px-3 py-3">
            <Maximize size={17} className="shrink-0 text-cyan-400" />
            <p className="text-center text-xs text-slate-400">
              Présentation optimisée pour le mode plein écran.
            </p>
          </div>

          {/* Start */}
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition-all hover:from-blue-500 hover:to-cyan-500 sm:py-4"
          >
            Commencer la présentation
            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.button>

          {/* Footer */}
          <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-slate-700/60 pt-4 text-[10px] text-slate-500 sm:flex-row sm:text-xs">
            <span>Département Informatique · Réseaux</span>
            <span>Navigation avec les flèches ↑ et ↓</span>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
