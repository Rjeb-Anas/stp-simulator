import { motion } from 'framer-motion'
import {
  MessageSquare,
  Radio,
  Network,
  Crown,
  GitBranch,
  ArrowRight,
  RefreshCw,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'
import { SwitchNode } from '../components/SimulationLayout'

const information = [
  {
    icon: Crown,
    title: 'Root Bridge ID',
    description: 'Identifie le commutateur considéré comme racine.',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    icon: Network,
    title: 'Bridge ID',
    description: 'Identifie le commutateur qui envoie la BPDU.',
    color: '#0D9488',
    bg: '#F0FDFA',
  },
  {
    icon: GitBranch,
    title: 'Root Path Cost',
    description: 'Indique le coût cumulé du chemin vers le Root Bridge.',
    color: '#D97706',
    bg: '#FFFBEB',
  },
]

const process = [
  {
    number: '01',
    title: 'Émission',
    description: 'Les switches envoient des BPDU.',
  },
  {
    number: '02',
    title: 'Réception',
    description: 'Les switches analysent les informations reçues.',
  },
  {
    number: '03',
    title: 'Comparaison',
    description: 'Les informations STP sont comparées.',
  },
  {
    number: '04',
    title: 'Décision',
    description: 'Les rôles et états des ports sont déterminés.',
  },
]

export default function BPDU() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="Messages de contrôle"
      title="Les BPDU : messages du protocole STP"
      subtitle="Comment les commutateurs communiquent pour construire la topologie sans boucle."
      slideNumber={8}
    >
      {/* Définition */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-200 bg-teal-50 text-teal-700">
          <MessageSquare size={20} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 sm:text-base">
            Qu'est-ce qu'une BPDU ?
          </h2>
          <p className="mt-0.5 text-xs leading-5 text-slate-600 sm:text-sm">
            Une <strong>BPDU (Bridge Protocol Data Unit)</strong> est un message
            de contrôle échangé toutes les 2 secondes entre commutateurs pour
            partager les informations STP.
          </p>
        </div>
      </motion.section>

      {/* Contenu central */}
      <div className="mb-3 grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Échange des BPDU */}
        <section className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Radio size={18} className="text-teal-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Échange des BPDU
            </h2>
          </div>

          <div className="flex min-h-[200px] flex-1 items-center justify-center rounded-lg border border-slate-100 bg-white p-2">
            <svg
              viewBox="0 0 520 290"
              className="h-full max-h-[240px] w-full"
              role="img"
              aria-label="Trois commutateurs échangeant des messages BPDU"
            >
              <defs>
                <pattern id="grid-bpdu" width="22" height="22" patternUnits="userSpaceOnUse">
                  <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                </pattern>
                <marker
                  id="bpduArrow"
                  markerWidth="7"
                  markerHeight="7"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0 0 L0 6 L6 3 Z" fill="#0D9488" />
                </marker>
              </defs>
              <rect width="520" height="290" fill="url(#grid-bpdu)" />

              {/* Liens */}
              <line x1="260" y1="62" x2="115" y2="225" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
              <line x1="260" y1="62" x2="405" y2="225" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
              <line x1="115" y1="225" x2="405" y2="225" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />

              {/* Flèches BPDU */}
              <path d="M210 105 L162 160" stroke="#0D9488" strokeWidth="3" fill="none" markerEnd="url(#bpduArrow)" />
              <path d="M310 105 L358 160" stroke="#0D9488" strokeWidth="3" fill="none" markerEnd="url(#bpduArrow)" />
              <path d="M195 212 L315 212" stroke="#0D9488" strokeWidth="3" fill="none" markerEnd="url(#bpduArrow)" />

              {/* Pills BPDU */}
              <rect x="136" y="114" width="60" height="22" rx="6" fill="#CCFBF1" stroke="#5EEAD4" />
              <text x="166" y="129" fill="#0F766E" fontSize="10" fontWeight="800" textAnchor="middle">BPDU</text>

              <rect x="324" y="114" width="60" height="22" rx="6" fill="#CCFBF1" stroke="#5EEAD4" />
              <text x="354" y="129" fill="#0F766E" fontSize="10" fontWeight="800" textAnchor="middle">BPDU</text>

              <rect x="218" y="182" width="84" height="22" rx="6" fill="#EFF6FF" stroke="#BFDBFE" />
              <text x="260" y="197" fill="#1D4ED8" fontSize="9.5" fontWeight="700" textAnchor="middle">Hello · 2 sec</text>

              <SwitchNode x={260} y={62} name="SW1" mac="00:1A:01" priority="4096" isRoot cpu={10} status="root" ports={['up', 'up']} />
              <SwitchNode x={115} y={225} name="SW2" mac="00:1A:02" priority="32768" cpu={12} status="normal" ports={['up', 'up']} />
              <SwitchNode x={405} y={225} name="SW3" mac="00:1A:03" priority="32768" cpu={12} status="normal" ports={['up', 'up']} />
            </svg>
          </div>
        </section>

        {/* Informations transportées */}
        <section className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <Network size={18} className="text-blue-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Informations transportées
            </h2>
          </div>

          <div className="flex flex-1 flex-col gap-2.5">
            {information.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3"
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    <Icon size={17} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 sm:text-sm">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>

      {/* Processus */}
      <section className="shrink-0 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
        <div className="mb-2.5 flex items-center gap-2">
          <RefreshCw size={16} className="text-teal-700" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Rôle des BPDU dans STP
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item, index) => (
            <div key={item.number} className="relative rounded-lg border border-slate-200/80 bg-white p-2.5">
              <span className="text-[10px] font-extrabold tracking-wider text-teal-700">
                ÉTAPE {item.number}
              </span>
              <h3 className="mt-0.5 text-xs font-bold text-slate-800">
                {item.title}
              </h3>
              <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                {item.description}
              </p>
              {index !== 3 && (
                <ArrowRight
                  size={13}
                  className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-slate-400 lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </SlideLayout>
  )
}
