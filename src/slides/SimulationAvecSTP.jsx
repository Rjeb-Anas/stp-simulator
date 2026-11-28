import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import SimulationLayout, { SwitchNode, PortBadge } from '../components/SimulationLayout'

const steps = [
  {
    title: 'Échange des trames BPDU',
    description:
      'Au démarrage, chaque switch envoie des trames BPDU contenant son Bridge ID (Priorité + MAC) sur tous ses ports pour découvrir la topologie.',
    statusBadge: (
      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
        Échange BPDU
      </span>
    ),
  },
  {
    title: 'Élection du Root Bridge',
    description:
      'SW1 possède la priorité configurée la plus faible (4096 contre 32768 par défaut). Tous les switches reconnaissent SW1 comme Root Bridge.',
    statusBadge: (
      <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700">
        SW1 = Root Bridge
      </span>
    ),
  },
  {
    title: 'Sélection des Root & Designated Ports',
    description:
      'SW2 et SW3 élisent leur lien direct vers SW1 (Coût = 4) comme Root Port (RP). Les ports de SW1 deviennent Designated Ports (DP).',
    statusBadge: (
      <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700">
        Coût chemin = 4
      </span>
    ),
  },
  {
    title: 'Blocage du lien redondant',
    description:
      'Entre SW2 et SW3, SW3 possède le Bridge ID le plus élevé. Son port Gi0/2 passe en état Blocking (BLK) pour casser la boucle logique.',
    statusBadge: (
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
        Boucle éliminée
      </span>
    ),
  },
]

const logsByStep = [
  [
    { time: '00:00:01', level: 'info', text: 'STP: Envoi BPDU Hello (Root=4096.001A.01) sur Gi0/1-2' },
    { time: '00:00:02', level: 'info', text: 'SW2: RX BPDU meilleur Root ID depuis SW1 (4096 < 32768)' },
    { time: '00:00:02', level: 'info', text: 'SW3: RX BPDU meilleur Root ID depuis SW1 (4096 < 32768)' },
  ],
  [
    { time: '00:00:04', level: 'success', text: '%SPANTREE-5-ROOTCHANGE: SW1 élu Root Bridge (BID 4096)' },
    { time: '00:00:04', level: 'info', text: 'SW2/SW3: Mise à jour du Root ID -> 4096.001A.01' },
  ],
  [
    { time: '00:00:06', level: 'success', text: 'SW2: Gi0/1 sélectionné comme Root Port (Cost 4)' },
    { time: '00:00:06', level: 'success', text: 'SW3: Gi0/1 sélectionné comme Root Port (Cost 4)' },
    { time: '00:00:07', level: 'info', text: 'SW1: Gi0/1 & Gi0/2 -> Designated Port (FWD)' },
  ],
  [
    { time: '00:00:09', level: 'warn', text: 'SW3: Détection segment redondant sur Gi0/2 (vs SW2)' },
    { time: '00:00:10', level: 'warn', text: '%SPANTREE-6-PORT_STATE: SW3 Gi0/2 -> BLOCKING (ALT)' },
    { time: '00:00:11', level: 'success', text: 'STP Convergé : Topologie sans boucle opérationnelle.' },
  ],
]

function TopologyCanvas({ step }) {
  const showBPDU = step === 0
  const rootElected = step >= 1
  const rolesAssigned = step >= 2
  const blocked = step >= 3

  return (
    <svg viewBox="0 0 560 320" className="h-full w-full">
      <defs>
        <pattern id="grid-avec" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#F1F5F9" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="560" height="320" fill="url(#grid-avec)" />

      {/* Liens SW1 - SW2 et SW1 - SW3 */}
      <line
        x1="280" y1="68" x2="120" y2="245"
        stroke={rolesAssigned ? '#0D9488' : '#3B82F6'}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="280" y1="68" x2="440" y2="245"
        stroke={rolesAssigned ? '#0D9488' : '#3B82F6'}
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Lien redondant SW2 - SW3 */}
      <line
        x1="120" y1="245" x2="440" y2="245"
        stroke={blocked ? '#F59E0B' : '#94A3B8'}
        strokeWidth="4.5"
        strokeDasharray={blocked ? '9 7' : '0'}
        strokeLinecap="round"
      />

      {/* Paquets BPDU animés à l'étape 0 */}
      {showBPDU && (
        <>
          <motion.rect
            width="14" height="10" rx="3" fill="#0D9488"
            animate={{ x: [273, 113], y: [63, 240] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.rect
            width="14" height="10" rx="3" fill="#0D9488"
            animate={{ x: [273, 433], y: [63, 240] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
          />
          <motion.rect
            width="14" height="10" rx="3" fill="#3B82F6"
            animate={{ x: [113, 433], y: [240, 240] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </>
      )}

      {/* Badges de ports */}
      {rolesAssigned && (
        <>
          <PortBadge x={222} y={118} port="Gi0/1" role="DP" state="fwd" />
          <PortBadge x={338} y={118} port="Gi0/2" role="DP" state="fwd" />
          <PortBadge x={175} y={182} port="Gi0/1" role="RP" state="fwd" />
          <PortBadge x={385} y={182} port="Gi0/1" role="RP" state="fwd" />
          <PortBadge x={212} y={245} port="Gi0/2" role="DP" state="fwd" />
        </>
      )}

      {blocked && (
        <PortBadge x={346} y={245} port="Gi0/2" role="BLK" state="blk" />
      )}

      {/* Coûts de lien */}
      {rolesAssigned && (
        <>
          <text x="150" y="138" fontSize="10" fontWeight="700" fill="#0F766E">Cost: 4</text>
          <text x="410" y="138" textAnchor="end" fontSize="10" fontWeight="700" fill="#0F766E">Cost: 4</text>
        </>
      )}

      {/* Switches */}
      <SwitchNode
        x={280}
        y={68}
        name="SW1"
        mac="00:1A:01"
        priority="4096"
        isRoot={rootElected}
        cpu={11}
        status={rootElected ? 'root' : 'normal'}
        ports={['up', 'up']}
      />
      <SwitchNode
        x={120}
        y={245}
        name="SW2"
        mac="00:1A:02"
        priority="32768"
        cpu={12}
        status="normal"
        ports={['up', 'up']}
      />
      <SwitchNode
        x={440}
        y={245}
        name="SW3"
        mac="00:1A:03"
        priority="32768"
        cpu={10}
        status="normal"
        ports={blocked ? ['up', 'blk'] : ['up', 'up']}
      />
    </svg>
  )
}

export default function SimulationAvecSTP({ onComplete, onPreviousSlide }) {
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
      label: 'Root Bridge',
      value: step >= 1 ? 'SW1 (4096)' : 'Élection...',
      color: step >= 1 ? 'text-teal-700' : 'text-blue-600',
    },
    {
      label: 'Ports actifs',
      value: step >= 3 ? '5 FWD / 1 BLK' : '6 en négociation',
      color: 'text-slate-900',
    },
    {
      label: 'Charge CPU',
      value: '11 % (Normal)',
      color: 'text-teal-700',
    },
    {
      label: 'État STP',
      value: step === 3 ? 'Convergé' : 'Calcul...',
      color: step === 3 ? 'text-emerald-600' : 'text-amber-600',
    },
  ]

  return (
    <SimulationLayout
      section="Simulation 02 · Avec STP"
      title="Élimination des boucles — Avec STP activé"
      subtitle="Élection du Root Bridge, attribution des rôles et blocage logique du lien redondant"
      accent="teal"
      slideNumber={17}
      steps={steps}
      step={step}
      onStepSelect={(i) => { setIsPlaying(false); setStep(i) }}
      onNext={nextStep}
      onPrev={prevStep}
      onReset={reset}
      isPlaying={isPlaying}
      onTogglePlay={() => setIsPlaying((p) => !p)}
      icon={ShieldCheck}
      badge={
        <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[11px] font-bold text-teal-700">
          802.1D / RSTP Actif
        </span>
      }
      diagram={<TopologyCanvas step={step} />}
      legend={
        <>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-4 rounded bg-teal-600" /> Lien actif (RP / DP)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-4 border-t-2 border-dashed border-amber-500" /> Port bloqué (BLK)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-3.5 rounded-sm bg-teal-600" /> Trame BPDU
          </span>
        </>
      }
      metrics={metrics}
      logs={logsByStep[step]}
    />
  )
}
