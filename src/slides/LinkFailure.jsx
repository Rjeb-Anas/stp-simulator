import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Cable } from 'lucide-react'
import SimulationLayout, { SwitchNode, PortBadge } from '../components/SimulationLayout'

const steps = [
  {
    title: 'Topologie STP nominale',
    description:
      'Le réseau est convergé. SW2 et SW3 joignent SW1 via leurs Root Ports. Le lien SW2–SW3 est maintenu en réserve (Blocking) sur SW3.',
    statusBadge: (
      <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700">
        Nominal
      </span>
    ),
  },
  {
    title: 'Panne physique SW1 – SW2',
    description:
      'La liaison directe SW1–SW2 est coupée. SW2 ne reçoit plus de BPDU sur Gi0/1 et détecte immédiatement la perte de son Root Port.',
    statusBadge: (
      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
        Lien DOWN
      </span>
    ),
  },
  {
    title: 'Recalcul STP & Transition',
    description:
      'SW3 reçoit la notification de changement de topologie (TCN) et fait passer son port Gi0/2 de Blocking vers Listening/Learning.',
    statusBadge: (
      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
        Convergence
      </span>
    ),
  },
  {
    title: 'Connectivité rétablie',
    description:
      'Le lien SW2–SW3 passe en Forwarding. Le trafic de SW2 emprunte désormais le chemin de secours SW2 → SW3 → SW1 sans aucune boucle.',
    statusBadge: (
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
        Rétabli
      </span>
    ),
  },
]

const logsByStep = [
  [
    { time: '00:01:00', level: 'success', text: 'STP: Topologie stable. SW3 Gi0/2 en état BLOCKING.' },
    { time: '00:01:01', level: 'info', text: 'Trafic SW2 -> SW1 actif via Gi0/1 (RP).' },
  ],
  [
    { time: '00:01:05', level: 'error', text: '%LINK-3-UPDOWN: Interface Gi0/1 (SW1-SW2) changed state to down' },
    { time: '00:01:05', level: 'warn', text: 'SW2: Perte du Root Port Gi0/1. Envoi TCN BPDU vers SW3.' },
  ],
  [
    { time: '00:01:07', level: 'warn', text: '%SPANTREE-6-PORT_STATE: SW3 Gi0/2 -> LISTENING / LEARNING' },
    { time: '00:01:08', level: 'info', text: 'SW2: Gi0/2 sélectionné comme nouveau Root Port (Cost: 8).' },
  ],
  [
    { time: '00:01:10', level: 'success', text: '%SPANTREE-6-PORT_STATE: SW3 Gi0/2 -> FORWARDING' },
    { time: '00:01:11', level: 'success', text: 'Connectivité SW2 -> SW3 -> SW1 restaurée automatiquement.' },
  ],
]

function TopologyCanvas({ step, onToggleFault }) {
  const failed = step >= 1
  const transitioning = step === 2
  const recovered = step >= 3

  return (
    <svg viewBox="0 0 560 320" className="h-full w-full">
      <defs>
        <pattern id="grid-fail" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#F1F5F9" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="560" height="320" fill="url(#grid-fail)" />

      {/* Lien SW1 - SW2 (cliquable pour simuler la panne) */}
      <g onClick={onToggleFault} className="cursor-pointer">
        <line
          x1="280" y1="68" x2="120" y2="245"
          stroke="transparent"
          strokeWidth="22"
        />
        <line
          x1="280" y1="68" x2="120" y2="245"
          stroke={failed ? '#EF4444' : '#0D9488'}
          strokeWidth="4.5"
          strokeDasharray={failed ? '8 7' : '0'}
          strokeLinecap="round"
        />
      </g>

      {/* Lien SW1 - SW3 */}
      <line
        x1="280" y1="68" x2="440" y2="245"
        stroke="#0D9488"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Lien SW2 - SW3 */}
      <line
        x1="120" y1="245" x2="440" y2="245"
        stroke={recovered ? '#0D9488' : transitioning ? '#F59E0B' : '#94A3B8'}
        strokeWidth="4.5"
        strokeDasharray={recovered ? '0' : '8 7'}
        strokeLinecap="round"
      />

      {/* Flux de données actif */}
      {!failed && (
        <motion.circle
          r="5.5"
          fill="#0D9488"
          animate={{ cx: [120, 280], cy: [245, 68] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {recovered && (
        <motion.circle
          r="5.5"
          fill="#2563EB"
          animate={{ cx: [120, 440, 280], cy: [245, 245, 68] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Icône panne sur SW1-SW2 */}
      {failed && (
        <g transform="translate(200, 156)" onClick={onToggleFault} className="cursor-pointer">
          <circle r="15" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="16" fontWeight="800" fill="#DC2626">
            ×
          </text>
        </g>
      )}

      {/* Badges de ports */}
      <PortBadge
        x={168}
        y={192}
        port="Gi0/1"
        role={failed ? 'DOWN' : 'RP'}
        state={failed ? 'down' : 'fwd'}
      />
      <PortBadge x={386} y={185} port="Gi0/1" role="RP" state="fwd" />
      <PortBadge
        x={345}
        y={245}
        port="Gi0/2"
        role={recovered ? 'DP' : transitioning ? 'LRN' : 'BLK'}
        state={recovered ? 'fwd' : 'blk'}
      />
      {recovered && (
        <PortBadge x={210} y={245} port="Gi0/2" role="RP" state="fwd" />
      )}

      {/* Astuce interactive */}
      <text x="280" y="306" textAnchor="middle" fontSize="10" fill="#64748B">
        {failed
          ? 'Chemin de secours : SW2 → SW3 → SW1 (Coût total : 8)'
          : 'Astuce : cliquez sur le lien SW1–SW2 pour déclencher la panne'}
      </text>

      {/* Switches */}
      <SwitchNode
        x={280}
        y={68}
        name="SW1"
        mac="00:1A:01"
        priority="4096"
        isRoot
        cpu={failed ? 18 : 11}
        status="root"
        ports={failed ? ['down', 'up'] : ['up', 'up']}
      />
      <SwitchNode
        x={120}
        y={245}
        name="SW2"
        mac="00:1A:02"
        priority="32768"
        cpu={step === 1 ? 42 : step === 2 ? 28 : 13}
        status={step === 1 ? 'danger' : 'normal'}
        ports={failed ? ['down', 'up'] : ['up', 'up']}
      />
      <SwitchNode
        x={440}
        y={245}
        name="SW3"
        mac="00:1A:03"
        priority="32768"
        cpu={step === 2 ? 32 : 12}
        status={transitioning ? 'warning' : 'normal'}
        ports={recovered ? ['up', 'up'] : ['up', 'blk']}
      />
    </svg>
  )
}

export default function LinkFailure({ onComplete, onPreviousSlide }) {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const lastStep = steps.length - 1

  const nextStep = useCallback(() => {
    setIsPlaying(false)
    if (step < lastStep) setStep((v) => v + 1)
    else onComplete?.()
  }, [step, lastStep, onComplete])

  const prevStep = useCallback(() => {
    setIsPlaying(false)
    if (step > 0) setStep((v) => v - 1)
    else onPreviousSlide?.()
  }, [step, onPreviousSlide])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setStep(0)
  }, [])

  const toggleFault = useCallback(() => {
    setIsPlaying(false)
    setStep((prev) => (prev === 0 ? 1 : 0))
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= lastStep) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 2600)
    return () => clearInterval(timer)
  }, [isPlaying, lastStep])

  const metrics = [
    {
      label: 'Lien SW1–SW2',
      value: step >= 1 ? 'DOWN (Panne)' : 'UP (Actif)',
      color: step >= 1 ? 'text-red-600' : 'text-teal-700',
    },
    {
      label: 'Lien SW2–SW3',
      value: step <= 1 ? 'Blocking' : step === 2 ? 'Learning' : 'Forwarding',
      color: step <= 1 ? 'text-amber-600' : step === 2 ? 'text-blue-600' : 'text-emerald-600',
    },
    {
      label: 'Coût SW2 → Root',
      value: step >= 2 ? '8 (via SW3)' : '4 (Direct)',
      color: 'text-slate-900',
    },
    {
      label: 'Connectivité',
      value: step === 1 ? 'Interrompue' : 'Opérationnelle',
      color: step === 1 ? 'text-red-600' : 'text-emerald-600',
    },
  ]

  return (
    <SimulationLayout
      section="Simulation 03 · Tolérance aux pannes"
      title="Réaction de STP à une panne de liaison"
      subtitle="Basculement automatique vers le chemin de secours sans intervention manuelle"
      accent="blue"
      slideNumber={18}
      steps={steps}
      step={step}
      onStepSelect={(i) => { setIsPlaying(false); setStep(i) }}
      onNext={nextStep}
      onPrev={prevStep}
      onReset={reset}
      isPlaying={isPlaying}
      onTogglePlay={() => setIsPlaying((p) => !p)}
      icon={Cable}
      badge={
        <button
          type="button"
          onClick={toggleFault}
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold transition ${
            step === 0
              ? 'bg-red-50 text-red-700 hover:bg-red-100'
              : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
          }`}
        >
          {step === 0 ? 'Simuler la panne' : 'Restaurer le lien'}
        </button>
      }
      diagram={<TopologyCanvas step={step} onToggleFault={toggleFault} />}
      legend={
        <>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-4 rounded bg-teal-600" /> Lien actif (FWD)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-4 border-t-2 border-dashed border-red-500" /> Lien en panne
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-4 border-t-2 border-dashed border-slate-400" /> Port bloqué
          </span>
        </>
      }
      metrics={metrics}
      logs={logsByStep[step]}
    />
  )
}
