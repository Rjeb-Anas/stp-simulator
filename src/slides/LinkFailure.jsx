
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Network,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Cable,
  ShieldCheck,
} from 'lucide-react'

const steps = [
  {
    title: 'Topologie normale',
    description:
      'Les trois switches sont connectés. STP maintient une topologie sans boucle en bloquant le lien redondant entre SW2 et SW3.',
    detail:
      'Le réseau fonctionne normalement. Les deux chemins vers le Root Bridge sont disponibles.',
    status: 'Réseau opérationnel',
    failed: false,
    recovered: false,
  },
  {
    title: 'Panne du lien SW1 – SW2',
    description:
      'Une défaillance physique coupe la liaison entre SW1 et SW2. Le chemin direct vers le Root Bridge devient indisponible.',
    detail:
      'STP détecte la perte du lien et commence à recalculer la topologie.',
    status: 'Lien interrompu',
    failed: true,
    recovered: false,
  },
  {
    title: 'Activation du chemin alternatif',
    description:
      'STP recalcule les chemins. Le port précédemment bloqué peut maintenant être activé pour rétablir la connectivité.',
    detail:
      'Le trafic entre SW2 et le reste du réseau passe désormais par SW3.',
    status: 'Recalcul STP',
    failed: true,
    recovered: true,
  },
  {
    title: 'Connectivité rétablie',
    description:
      'Le réseau retrouve une topologie fonctionnelle. La communication continue malgré la panne du lien initial.',
    detail:
      'STP assure la continuité du réseau en utilisant le chemin alternatif, sans créer de boucle.',
    status: 'Réseau rétabli',
    failed: true,
    recovered: true,
  },
]

function SwitchNode({ name, x, y, root = false }) {
  return (
    <g>
      {root && (
        <circle
          cx={x}
          cy={y}
          r="43"
          fill="#dbeafe"
          opacity="0.7"
        />
      )}

      <rect
        x={x - 38}
        y={y - 25}
        width="76"
        height="50"
        rx="10"
        fill={root ? '#2563eb' : '#ffffff'}
        stroke={root ? '#1d4ed8' : '#cbd5e1'}
        strokeWidth="2"
      />

      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={root ? '#ffffff' : '#0f172a'}
      >
        {name}
      </text>

      {root && (
        <text
          x={x}
          y={y - 34}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#2563eb"
        >
          ROOT BRIDGE
        </text>
      )}
    </g>
  )
}

function NetworkTopology({ step }) {
  const failed = step >= 1
  const recovered = step >= 2

  return (
    <svg viewBox="0 0 500 340" className="h-full w-full">

      {/* Lien SW1 - SW2 */}
      <line
        x1="250"
        y1="85"
        x2="115"
        y2="245"
        stroke={failed ? '#ef4444' : '#16a34a'}
        strokeWidth="5"
        strokeDasharray={failed ? '9 8' : '0'}
        strokeLinecap="round"
      />

      {/* Lien SW1 - SW3 */}
      <line
        x1="250"
        y1="85"
        x2="385"
        y2="245"
        stroke="#16a34a"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Lien SW2 - SW3 */}
      <line
        x1="115"
        y1="245"
        x2="385"
        y2="245"
        stroke={recovered ? '#16a34a' : '#94a3b8'}
        strokeWidth="5"
        strokeDasharray={recovered ? '0' : '9 8'}
        strokeLinecap="round"
      />

      {/* Indication de panne */}
      {failed && (
        <>
          <circle
            cx="182"
            cy="165"
            r="17"
            fill="#fee2e2"
            stroke="#ef4444"
            strokeWidth="2"
          />

          <text
            x="182"
            y="171"
            textAnchor="middle"
            fontSize="19"
            fontWeight="700"
            fill="#dc2626"
          >
            ×
          </text>
        </>
      )}

      {/* Indication du chemin alternatif */}
      {recovered && (
        <text
          x="250"
          y="225"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#16a34a"
        >
          CHEMIN ACTIF
        </text>
      )}

      <SwitchNode
        name="SW1"
        x={250}
        y={85}
        root
      />

      <SwitchNode
        name="SW2"
        x={115}
        y={245}
      />

      <SwitchNode
        name="SW3"
        x={385}
        y={245}
      />

      <text
        x="250"
        y="320"
        textAnchor="middle"
        fontSize="12"
        fill="#64748b"
      >
        {step === 0 && 'Topologie normale'}
        {step === 1 && 'Défaillance du lien SW1 - SW2'}
        {step === 2 && 'Activation du chemin alternatif'}
        {step === 3 && 'Connectivité rétablie'}
      </text>
    </svg>
  )
}

export default function LinkFailure({
  onComplete,
  onPreviousSlide,
}) {
  const [step, setStep] = useState(0)

  const currentStep = steps[step]
  const lastStep = steps.length - 1

  // Étape suivante ou diapositive suivante
  const nextStep = useCallback(() => {
    if (step < lastStep) {
      setStep((current) => current + 1)
    } else {
      onComplete?.()
    }
  }, [step, lastStep, onComplete])

  // Étape précédente ou diapositive précédente
  const previousStep = useCallback(() => {
    if (step > 0) {
      setStep((current) => current - 1)
    } else {
      onPreviousSlide?.()
    }
  }, [step, onPreviousSlide])

  // Réinitialisation
  const reset = useCallback(() => {
    setStep(0)
  }, [])

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        event.stopPropagation()
        nextStep()
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        event.stopPropagation()
        previousStep()
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [nextStep, previousStep])

  return (
    <section className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6">

      {/* Header */}
      <header className="mb-4 flex shrink-0 items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <Network size={15} />
            Simulation · Panne de liaison
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Réaction de STP à une panne
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Basculement vers un chemin alternatif
          </p>
        </div>

        <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
          <Cable size={27} />
        </div>
      </header>

      {/* Progression */}
      <div className="mb-4 flex shrink-0 gap-2">
        {steps.map((item, index) => (
          <div
            key={item.title}
            className={`h-2 flex-1 rounded-full transition-colors ${
              index <= step ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">

        {/* Topologie */}
        <div className="flex min-h-0 flex-col rounded-2xl border border-slate-200 bg-white p-3">

          <div className="mb-2 flex shrink-0 items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">
              Topologie réseau
            </h3>

            <span
              className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                step === 1
                  ? 'bg-red-100 text-red-700'
                  : step >= 2
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
              }`}
            >
              {step === 1 ? 'Panne détectée' : step >= 2 ? 'Chemin rétabli' : 'STP activé'}
            </span>
          </div>

          <div className="min-h-0 flex-1">
            <NetworkTopology step={step} />
          </div>

          <div className="flex shrink-0 flex-wrap justify-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <span className="h-1 w-5 rounded bg-green-500" />
              Lien actif
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1 w-5 rounded border-t-2 border-dashed border-red-500" />
              Lien en panne
            </span>
          </div>
        </div>

        {/* Explications */}
        <div className="flex min-h-0 flex-col gap-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Étape {step + 1} / {steps.length}
              </span>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                STP
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="mb-3 text-lg font-bold text-slate-900">
                  {currentStep.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  {currentStep.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-1 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-800">
              {step === 1 ? (
                <AlertTriangle size={17} className="text-red-500" />
              ) : (
                <CheckCircle2 size={17} className="text-green-600" />
              )}

              Résultat
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm leading-relaxed text-blue-900"
              >
                {currentStep.detail}
              </motion.p>
            </AnimatePresence>

            <div className="mt-4 rounded-xl bg-white p-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                {step === 1 ? (
                  <AlertTriangle size={16} className="text-red-500" />
                ) : (
                  <ShieldCheck size={16} className="text-green-600" />
                )}

                {currentStep.status}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <footer className="mt-4 flex shrink-0 items-center justify-between border-t border-slate-200 pt-3">

        <span className="text-xs text-slate-400">
          SIMULATION · 18 / 20
        </span>

        <div className="flex items-center gap-2">

          <button
            onClick={previousStep}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowUp size={16} />
            Haut
          </button>

          <button
            onClick={nextStep}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Bas
            <ArrowDown size={16} />
          </button>

          <button
            onClick={reset}
            className="rounded-xl border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-slate-100"
            title="Recommencer"
          >
            <RotateCcw size={17} />
          </button>

        </div>
      </footer>
    </section>
  )
}
