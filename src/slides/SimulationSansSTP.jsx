import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Wifi } from 'lucide-react'
import SimulationLayout, { SwitchNode, PortBadge } from '../components/SimulationLayout'

const steps = [
  {
    title: 'Topologie redondante sans STP',
    description:
      'Trois switches sont reliés en triangle pour assurer la redondance. Sans STP, tous les ports passent immédiatement en état Forwarding.',
    statusBadge: (
      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
        Prêt
      </span>
    ),
  },
  {
    title: 'Circulation infinie des broadcasts',
    description:
      'SW2 reçoit une requête ARP Broadcast et la diffuse sur tous ses ports. SW1 et SW3 la dupliquent à leur tour : les trames tournent en boucle.',
    statusBadge: (
      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
        Boucle L2 active
      </span>
    ),
  },
  {
    title: 'Tempête de broadcast (Saturation)',
    description:
      'Chaque tour duplique les trames de manière exponentielle. Les tables MAC deviennent instables (flapping) et le CPU atteint 99 %.',
    statusBadge: (
      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
        Broadcast Storm
      </span>
    ),
  },
]

const logsByStep = [
  [
    { time: '00:00:01', level: 'info', text: 'SW1(config)# no spanning-tree vlan 1' },
    { time: '00:00:02', level: 'info', text: '%LINK-3-UPDOWN: Gi0/1, Gi0/2 changed state to up' },
    { time: '00:00:03', level: 'warn', text: 'WARN: Aucune protection contre les boucles L2.' },
  ],
  [
    { time: '00:00:05', level: 'info', text: 'SW2: RX ARP Broadcast (FF:FF:FF:FF:FF:FF) on Fa0/1' },
    { time: '00:00:05', level: 'warn', text: 'SW1/SW3: Flooding broadcast frame on Gi0/1, Gi0/2' },
    { time: '00:00:06', level: 'warn', text: '%MAC_MOVE-4-NOTIF: Host 001A.2B3C flapping Gi0/1 <-> Gi0/2' },
  ],
  [
    { time: '00:00:08', level: 'error', text: '%STORM-2-LIMIT: Broadcast rate > 95,000 pps on Gi0/1' },
    { time: '00:00:09', level: 'error', text: '%SYS-2-CPUHOG: Switch CPU utilization at 99%' },
    { time: '00:00:10', level: 'error', text: 'CRITICAL: Réseau saturé, perte totale de connectivité.' },
  ],
]

function TopologyCanvas({ step }) {
  const showLoop = step >= 1
  const showStorm = step >= 2
  const cpu = step === 0 ? 14 : step === 1 ? 68 : 99

  return (
    <svg viewBox="0 0 560 320" className="h-full w-full">
      <defs>
        <pattern id="grid-sans" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#F1F5F9" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="560" height="320" fill="url(#grid-sans)" />

      {/* Liens physiques */}
      <line
        x1="280" y1="68" x2="120" y2="245"
        stroke={showStorm ? '#EF4444' : showLoop ? '#F59E0B' : '#3B82F6'}
        strokeWidth={showStorm ? '6' : '4.5'}
        strokeLinecap="round"
      />
      <line
        x1="280" y1="68" x2="440" y2="245"
        stroke={showStorm ? '#EF4444' : showLoop ? '#F59E0B' : '#3B82F6'}
        strokeWidth={showStorm ? '6' : '4.5'}
        strokeLinecap="round"
      />
      <line
        x1="120" y1="245" x2="440" y2="245"
        stroke={showStorm ? '#EF4444' : showLoop ? '#F59E0B' : '#3B82F6'}
        strokeWidth={showStorm ? '6' : '4.5'}
        strokeLinecap="round"
      />

      {/* Particules Broadcast animées */}
      {showLoop && (
        <>
          <motion.circle
            r="6.5"
            fill="#F97316"
            animate={{ cx: [280, 120, 440, 280], cy: [68, 245, 245, 68] }}
            transition={{ duration: showStorm ? 1.1 : 2.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            r="6.5"
            fill="#FB923C"
            animate={{ cx: [280, 440, 120, 280], cy: [68, 245, 245, 68] }}
            transition={{ duration: showStorm ? 1.2 : 2.7, repeat: Infinity, ease: 'linear', delay: 0.3 }}
          />
        </>
      )}

      {showStorm && (
        <>
          <motion.circle
            r="5.5"
            fill="#DC2626"
            animate={{ cx: [120, 440, 280, 120], cy: [245, 245, 68, 245] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear', delay: 0.15 }}
          />
          <motion.circle
            r="5.5"
            fill="#DC2626"
            animate={{ cx: [440, 120, 280, 440], cy: [245, 245, 68, 245] }}
            transition={{ duration: 0.95, repeat: Infinity, ease: 'linear', delay: 0.45 }}
          />
          <motion.circle
            r="5"
            fill="#EF4444"
            animate={{ cx: [280, 120, 440, 280], cy: [68, 245, 245, 68] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear', delay: 0.6 }}
          />
        </>
      )}

      {/* Badges de ports (tous FWD) */}
      <PortBadge x={196} y={134} port="Gi0/1" role="FWD" state={showStorm ? 'down' : 'fwd'} />
      <PortBadge x={364} y={134} port="Gi0/2" role="FWD" state={showStorm ? 'down' : 'fwd'} />
      <PortBadge x={280} y={245} port="Gi0/2" role="FWD" state={showStorm ? 'down' : 'fwd'} />

      {/* Switches */}
      <SwitchNode
        x={280}
        y={68}
        name="SW1"
        mac="00:1A:01"
        priority="32768"
        cpu={cpu}
        status={showStorm ? 'danger' : showLoop ? 'warning' : 'normal'}
        ports={showStorm ? ['down', 'down'] : ['up', 'up']}
      />
      <SwitchNode
        x={120}
        y={245}
        name="SW2"
        mac="00:1A:02"
        priority="32768"
        cpu={cpu}
        status={showStorm ? 'danger' : showLoop ? 'warning' : 'normal'}
        ports={showStorm ? ['down', 'down'] : ['up', 'up']}
      />
      <SwitchNode
        x={440}
        y={245}
        name="SW3"
        mac="00:1A:03"
        priority="32768"
        cpu={cpu}
        status={showStorm ? 'danger' : showLoop ? 'warning' : 'normal'}
        ports={showStorm ? ['down', 'down'] : ['up', 'up']}
      />

      {/* Alerte tempête au centre */}
      {showStorm && (
        <g transform="translate(280, 182)">
          <rect
            x="-86"
            y="-22"
            width="172"
            height="44"
            rx="10"
            fill="#FEF2F2"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <text x="0" y="-3" textAnchor="middle" fontSize="11" fontWeight="800" fill="#DC2626">
            BROADCAST STORM
          </text>
          <text x="0" y="13" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#B91C1C">
            Saturation des liens · CPU 99%
          </text>
        </g>
      )}
    </svg>
  )
}

export default function SimulationSansSTP({ onComplete, onPreviousSlide }) {
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
      label: 'Trafic Broadcast',
      value: step === 0 ? '12 pps' : step === 1 ? '1 450 pps' : '> 95 000 pps',
      color: step === 2 ? 'text-red-600' : step === 1 ? 'text-amber-600' : 'text-slate-900',
    },
    {
      label: 'Charge CPU',
      value: step === 0 ? '14 %' : step === 1 ? '68 %' : '99 % (Saturé)',
      color: step === 2 ? 'text-red-600' : step === 1 ? 'text-amber-600' : 'text-teal-700',
    },
    {
      label: 'Boucle Niveau 2',
      value: step === 0 ? 'Latente' : 'Active (Critique)',
      color: step === 0 ? 'text-amber-600' : 'text-red-600',
    },
    {
      label: 'Table MAC',
      value: step === 0 ? 'Stable' : 'Instable (Flapping)',
      color: step === 0 ? 'text-teal-700' : 'text-red-600',
    },
  ]

  return (
    <SimulationLayout
      section="Simulation 01 · Sans STP"
      title="Boucle de niveau 2 — Sans protocole STP"
      subtitle="Observation d'une tempête de broadcast sur une topologie redondante non protégée"
      accent="red"
      slideNumber={16}
      steps={steps}
      step={step}
      onStepSelect={(i) => { setIsPlaying(false); setStep(i) }}
      onNext={nextStep}
      onPrev={prevStep}
      onReset={reset}
      isPlaying={isPlaying}
      onTogglePlay={() => setIsPlaying((p) => !p)}
      icon={step === 2 ? AlertTriangle : Wifi}
      badge={
        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-bold text-red-700">
          STP Désactivé
        </span>
      }
      diagram={<TopologyCanvas step={step} />}
      legend={
        <>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-4 rounded bg-blue-500" /> Lien actif (FWD)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Trame Broadcast
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600" /> Tempête (Saturation)
          </span>
        </>
      }
      metrics={metrics}
      logs={logsByStep[step]}
    />
  )
}
