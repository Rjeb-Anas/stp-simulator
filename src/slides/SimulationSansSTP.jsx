
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Network,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  AlertTriangle,
  Radio,
} from 'lucide-react'

const steps = [
  {
    title: 'Topologie initiale',
    description:
      'Trois switches sont connectés en triangle. Tous les liens sont actifs. Cette configuration crée une boucle de niveau 2.',
  },
  {
    title: 'Circulation des broadcasts',
    description:
      'Lorsqu’un switch reçoit une trame broadcast, il la retransmet sur ses autres ports. À cause de la boucle, les trames peuvent circuler continuellement.',
  },
  {
    title: 'Tempête de broadcast',
    description:
      'Les trames broadcast se multiplient et peuvent saturer les liens réseau. Cela provoque une instabilité et une dégradation des performances.',
  },
]

function SwitchNode({ name, x, y }) {
  return (
    <motion.div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-[105px] rounded-xl border-2 border-slate-300 bg-white p-3 text-center shadow-lg sm:w-32">
        <Network className="mx-auto mb-1 h-6 w-6 text-blue-700" />

        <p className="font-bold text-slate-800">{name}</p>

        <p className="mt-1 text-[9px] font-bold text-slate-500 sm:text-[10px]">
          Switch
        </p>
      </div>
    </motion.div>
  )
}

function NetworkTopology({ step }) {
  const showBroadcast = step >= 1
  const showStorm = step >= 2

  return (
    <div className="relative min-h-[290px] flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white sm:min-h-[350px]">
      <svg
        viewBox="0 0 600 380"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        {/* Liens du triangle */}
        <line
          x1="300"
          y1="75"
          x2="130"
          y2="285"
          stroke="#2563EB"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <line
          x1="300"
          y1="75"
          x2="470"
          y2="285"
          stroke="#2563EB"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <line
          x1="130"
          y1="285"
          x2="470"
          y2="285"
          stroke="#2563EB"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Animation des trames broadcast */}
        {showBroadcast && (
          <>
            <motion.circle
              r="9"
              fill="#F97316"
              animate={{
                cx: [130, 300, 470, 300, 130],
                cy: [285, 285, 285, 285, 285],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.circle
              r="8"
              fill="#F97316"
              animate={{
                cx: [300, 215, 130, 300],
                cy: [75, 180, 285, 75],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.circle
              r="7"
              fill="#FB923C"
              animate={{
                cx: [470, 385, 300, 470],
                cy: [285, 180, 75, 285],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </>
        )}
      </svg>

      <SwitchNode name="SW1" x={50} y={20} />
      <SwitchNode name="SW2" x={21.7} y={75} />
      <SwitchNode name="SW3" x={78.3} y={75} />

      {/* Alerte de tempête */}
      {showStorm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-1/2 top-1/2 z-30 w-max -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-red-400 bg-red-50/95 p-3 text-center shadow-xl"
        >
          <AlertTriangle className="mx-auto h-7 w-7 text-red-600" />

          <p className="mt-1 text-sm font-bold text-red-700">
            Broadcast Storm
          </p>

          <p className="text-xs text-red-600">
            Risque de saturation du réseau
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default function SimulationSansSTP({
  onComplete,
  onPreviousSlide,
}) {
  const [step, setStep] = useState(0)

  const lastStep = steps.length - 1
  const currentStep = steps[step]
  const isFinal = step === lastStep

  // Étape suivante ou diapositive suivante
  const nextStep = useCallback(() => {
    if (step < lastStep) {
      setStep((value) => value + 1)
    } else {
      onComplete?.()
    }
  }, [step, lastStep, onComplete])

  // Étape précédente ou diapositive précédente
  const previousStep = useCallback(() => {
    if (step > 0) {
      setStep((value) => value - 1)
    } else {
      onPreviousSlide?.()
    }
  }, [step, onPreviousSlide])

  // Réinitialiser la simulation
  const reset = useCallback(() => {
    setStep(0)
  }, [])

  // Navigation avec les flèches du clavier
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
    <section className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:p-7">

      {/* En-tête */}
      <header className="shrink-0">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          FST Fès · Génie Informatique
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-4xl">
          Simulation sans STP
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Observation des conséquences d’une boucle dans un réseau Ethernet.
        </p>
      </header>

      {/* Progression */}
      <div className="my-4 flex shrink-0 gap-2">
        {steps.map((item, index) => (
          <div
            key={item.title}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              index <= step ? 'bg-red-500' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1.55fr_1fr]">

        {/* Topologie */}
        <div className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="mb-3 flex shrink-0 items-center justify-between">
            <h2 className="font-bold text-slate-800">
              Topologie réseau
            </h2>

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
              Sans STP
            </span>
          </div>

          <NetworkTopology step={step} />

          <div className="mt-3 flex shrink-0 flex-wrap gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-6 rounded bg-blue-600" />
              Lien actif
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-orange-500" />
              Broadcast
            </span>
          </div>
        </div>

        {/* Explications */}
        <div className="flex min-h-0 flex-col gap-3">
          <h2 className="shrink-0 font-bold text-slate-800">
            Déroulement de la simulation
          </h2>

          {steps.map((item, index) => (
            <div
              key={item.title}
              className={`flex shrink-0 items-center gap-3 rounded-lg border p-3 transition ${
                step === index
                  ? 'border-red-400 bg-red-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  index < step
                    ? 'bg-emerald-600 text-white'
                    : index === step
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                }`}
              >
                {index < step ? '✓' : index + 1}
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {item.title}
              </p>
            </div>
          ))}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-auto rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <p className="text-xs font-bold uppercase text-red-600">
                Étape {step + 1} / {steps.length}
              </p>

              <h3 className="mt-2 font-bold text-slate-900">
                {currentStep.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {currentStep.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div
            className={`flex shrink-0 items-center gap-2 rounded-lg border p-3 ${
              isFinal
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}
          >
            {isFinal ? (
              <AlertTriangle size={21} />
            ) : (
              <Radio size={21} />
            )}

            <p className="text-xs font-semibold">
              {isFinal
                ? 'Risque de tempête de broadcast.'
                : 'Utilisez Haut et Bas pour parcourir les étapes.'}
            </p>
          </div>
        </div>
      </div>

      {/* Commandes */}
      <div className="mt-4 flex shrink-0 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2">

        <button
          onClick={previousStep}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
        >
          <ArrowUp size={17} />
          Haut
        </button>

        <div className="text-center">
          <p className="text-xs text-slate-500">
            Sans STP
          </p>

          <p className="text-sm font-bold text-slate-800">
            {step + 1} / {steps.length}
          </p>
        </div>

        <button
          onClick={nextStep}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white hover:bg-blue-700"
        >
          Bas
          <ArrowDown size={17} />
        </button>

        <button
          onClick={reset}
          title="Recommencer"
          className="rounded-lg border border-slate-300 bg-white p-2 text-slate-600 hover:bg-slate-100"
        >
          <RotateCcw size={17} />
        </button>
      </div>

      <footer className="mt-3 flex shrink-0 justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
        <span>FST Fès · Génie Informatique</span>
        <span>SIMULATION · 16 / 20</span>
      </footer>
    </section>
  )
}
