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

          <div className="flex min-h-[190px] flex-1 items-center justify-center rounded-lg border border-slate-100 bg-white p-2">
            <svg
              viewBox="0 0 440 240"
              className="h-full max-h-[210px] w-full"
              role="img"
              aria-label="Trois commutateurs échangeant des messages BPDU"
            >
              <defs>
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

              <path d="M220 55 L95 175" stroke="#CBD5E1" strokeWidth="4" fill="none" />
              <path d="M220 55 L345 175" stroke="#CBD5E1" strokeWidth="4" fill="none" />
              <path d="M95 175 L345 175" stroke="#CBD5E1" strokeWidth="4" fill="none" />

              <path d="M190 85 L145 128" stroke="#0D9488" strokeWidth="3" fill="none" markerEnd="url(#bpduArrow)" />
              <path d="M250 85 L295 128" stroke="#0D9488" strokeWidth="3" fill="none" markerEnd="url(#bpduArrow)" />
              <path d="M150 175 L280 175" stroke="#0D9488" strokeWidth="3" fill="none" markerEnd="url(#bpduArrow)" />

              {[
                { name: 'SWITCH 1', x: 165, y: 15, tx: 220 },
                { name: 'SWITCH 2', x: 40, y: 150, tx: 95 },
                { name: 'SWITCH 3', x: 290, y: 150, tx: 345 },
              ].map((sw) => (
                <g key={sw.name}>
                  <rect x={sw.x} y={sw.y} width="110" height="50" rx="9" fill="#0F172A" />
                  <text x={sw.tx} y={sw.y + 23} fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">
                    {sw.name}
                  </text>
                  <text x={sw.tx} y={sw.y + 38} fill="#94A3B8" fontSize="9" textAnchor="middle">
                    Commutateur
                  </text>
                </g>
              ))}

              <rect x="105" y="95" width="60" height="20" rx="10" fill="#CCFBF1" />
              <text x="135" y="109" fill="#0F766E" fontSize="10" fontWeight="bold" textAnchor="middle">
                BPDU
              </text>

              <rect x="275" y="95" width="60" height="20" rx="10" fill="#CCFBF1" />
              <text x="305" y="109" fill="#0F766E" fontSize="10" fontWeight="bold" textAnchor="middle">
                BPDU
              </text>
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
