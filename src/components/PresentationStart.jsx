import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Presentation,
  Maximize,
  ArrowRight,
  Network,
  ShieldCheck,
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react'

const EXPECTED_HASH = (import.meta.env.VITE_SECRET_HASH || '').trim().toLowerCase()

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

const topics = [
  { icon: Network, label: 'Fonctionnement' },
  { icon: Presentation, label: 'Simulation' },
  { icon: ShieldCheck, label: 'Analyse' },
]

export default function PresentationStart({ onStart }) {
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!EXPECTED_HASH) {
      setError('Code d’accès non configuré (VITE_SECRET_HASH manquant).')
      return
    }
    const inputHash = await sha256Hex(code.trim())
    if (inputHash === EXPECTED_HASH) {
      setError('')
      onStart()
    } else {
      setError('Code secret incorrect. Accès refusé.')
    }
  }
  return (
    <main className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-slate-100 p-4 sm:p-6">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Main card */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-teal-600 via-blue-600 to-teal-500" />

        <div className="px-5 py-7 sm:px-10 sm:py-9">
          {/* Institution */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-700">
              <GraduationCap size={22} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-wider text-slate-900">
                FST FÈS
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Faculté des Sciences et Techniques
              </p>
            </div>
          </div>

          {/* Main icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <Network size={32} strokeWidth={1.7} />
          </div>

          {/* Title */}
          <div className="text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-teal-700 sm:text-xs">
              Présentation académique · 2026–2027
            </p>

            <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              VLAN
              <span className="mx-2 font-light text-slate-400">&</span>
              <span className="text-teal-600">
                PROTOCOLE STP
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
              Fonctionnement, simulation interactive et analyse des mécanismes
              de segmentation réseau et de prévention des boucles de niveau 2.
            </p>
          </div>

          {/* Topics */}
          <div className="my-6 grid grid-cols-3 gap-2 sm:gap-4">
            {topics.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-2 py-3 sm:py-4"
              >
                <Icon size={20} className="text-teal-600" />
                <span className="text-center text-[11px] font-semibold text-slate-700 sm:text-xs">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Fullscreen information */}
          <div className="mb-5 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <Maximize size={16} className="shrink-0 text-blue-600" />
            <p className="text-center text-xs text-slate-600">
              Présentation optimisée pour le mode plein écran.
            </p>
          </div>

          {/* Secret code form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="secret-code"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700"
              >
                <Lock size={13} className="text-teal-600" />
                Code secret d&apos;accès
              </label>

              <div className="relative">
                <input
                  id="secret-code"
                  type={showCode ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="Entrez le code secret..."
                  autoComplete="off"
                  className={`w-full rounded-xl border bg-slate-50/70 py-3 pl-4 pr-11 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 ${
                    error
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-teal-500 focus:ring-teal-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCode((v) => !v)}
                  aria-label={showCode ? 'Masquer le code' : 'Afficher le code'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-700"
                >
                  {showCode ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600"
                >
                  <AlertCircle size={14} />
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-teal-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-700 sm:py-4"
            >
              Commencer la présentation
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-500 sm:flex-row">
            <span>Département Informatique · Réseaux</span>
            <span>Navigation avec les flèches ↑ et ↓</span>
          </div>
        </div>
      </motion.section>
    </main>
  )
}
