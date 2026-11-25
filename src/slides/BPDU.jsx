
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Radio,
  Network,
  Crown,
  GitBranch,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'

const information = [
  {
    icon: Crown,
    title: 'Root Bridge ID',
    description: 'Identifie le commutateur considéré comme racine.',
    color: '#3978D4',
    bg: '#EFF6FF',
  },
  {
    icon: Network,
    title: 'Bridge ID',
    description: 'Identifie le commutateur qui envoie la BPDU.',
    color: '#0D9488',
    bg: '#ECFDF5',
  },
  {
    icon: GitBranch,
    title: 'Root Path Cost',
    description: 'Indique le coût du chemin vers le Root Bridge.',
    color: '#D97706',
    bg: '#FFF7ED',
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
    <main className="h-full w-full overflow-hidden bg-[#F8FAFC] px-5 py-4 text-slate-800 md:px-8">
      <div className="mx-auto flex h-full max-w-7xl flex-col">

        {/* EN-TÊTE */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 shrink-0"
        >
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-teal-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
              Partie 01 / Fonctionnement
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Les BPDU : messages du protocole STP
          </h1>

          <p className="mt-1 text-xs text-slate-500 md:text-sm">
            Comment les commutateurs communiquent pour éviter les boucles.
          </p>
        </motion.header>

        {/* DÉFINITION */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-3 flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <MessageSquare size={21} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 md:text-base">
              Qu'est-ce qu'une BPDU ?
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-600 md:text-sm">
              Une <strong>BPDU (Bridge Protocol Data Unit)</strong> est
              un message de contrôle échangé entre les commutateurs
              pour partager les informations nécessaires au fonctionnement de STP.
            </p>
          </div>
        </motion.section>

        {/* CONTENU CENTRAL */}
        <div className="mb-3 grid min-h-0 flex-1 grid-cols-2 gap-3">

          {/* ÉCHANGE DES BPDU */}
          <motion.section
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <Radio size={19} className="text-teal-700" />
              <h2 className="text-sm font-bold text-slate-900">
                Échange des BPDU
              </h2>
            </div>

            <p className="mb-2 text-xs leading-5 text-slate-500">
              Les commutateurs échangent régulièrement des messages STP
              sur leurs ports participants.
            </p>

            <div className="flex min-h-0 flex-1 items-center justify-center rounded-lg bg-slate-50 p-2">
              <svg
                viewBox="0 0 440 250"
                className="h-full w-full"
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

                {/* LIENS */}
                <path
                  d="M220 65 L95 180"
                  stroke="#94A3B8"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M220 65 L345 180"
                  stroke="#94A3B8"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M95 180 L345 180"
                  stroke="#94A3B8"
                  strokeWidth="4"
                  fill="none"
                />

                {/* FLÈCHES BPDU */}
                <path
                  d="M190 95 L145 137"
                  stroke="#0D9488"
                  strokeWidth="3"
                  fill="none"
                  markerEnd="url(#bpduArrow)"
                />
                <path
                  d="M250 95 L295 137"
                  stroke="#0D9488"
                  strokeWidth="3"
                  fill="none"
                  markerEnd="url(#bpduArrow)"
                />
                <path
                  d="M145 180 L285 180"
                  stroke="#0D9488"
                  strokeWidth="3"
                  fill="none"
                  markerEnd="url(#bpduArrow)"
                />

                {/* SWITCH 1 */}
                <rect
                  x="165"
                  y="20"
                  width="110"
                  height="55"
                  rx="9"
                  fill="#1E293B"
                />
                <text
                  x="220"
                  y="44"
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  SWITCH 1
                </text>
                <text
                  x="220"
                  y="60"
                  fill="#CBD5E1"
                  fontSize="9"
                  textAnchor="middle"
                >
                  Commutateur
                </text>

                {/* SWITCH 2 */}
                <rect
                  x="40"
                  y="155"
                  width="110"
                  height="55"
                  rx="9"
                  fill="#1E293B"
                />
                <text
                  x="95"
                  y="179"
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  SWITCH 2
                </text>
                <text
                  x="95"
                  y="195"
                  fill="#CBD5E1"
                  fontSize="9"
                  textAnchor="middle"
                >
                  Commutateur
                </text>

                {/* SWITCH 3 */}
                <rect
                  x="290"
                  y="155"
                  width="110"
                  height="55"
                  rx="9"
                  fill="#1E293B"
                />
                <text
                  x="345"
                  y="179"
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  SWITCH 3
                </text>
                <text
                  x="345"
                  y="195"
                  fill="#CBD5E1"
                  fontSize="9"
                  textAnchor="middle"
                >
                  Commutateur
                </text>

                {/* LABELS BPDU */}
                <rect
                  x="105"
                  y="103"
                  width="66"
                  height="21"
                  rx="10"
                  fill="#CCFBF1"
                />
                <text
                  x="138"
                  y="117"
                  fill="#0F766E"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  BPDU
                </text>

                <rect
                  x="269"
                  y="103"
                  width="66"
                  height="21"
                  rx="10"
                  fill="#CCFBF1"
                />
                <text
                  x="302"
                  y="117"
                  fill="#0F766E"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  BPDU
                </text>

                <text
                  x="220"
                  y="230"
                  fill="#64748B"
                  fontSize="10"
                  textAnchor="middle"
                >
                  Échange d'informations STP
                </text>
              </svg>
            </div>

            <div className="mt-2 rounded-lg bg-teal-50 px-3 py-2">
              <p className="text-[10px] leading-4 text-teal-800">
                Les BPDU permettent aux switches de connaître la topologie
                et de prendre les décisions STP.
              </p>
            </div>
          </motion.section>

          {/* INFORMATIONS TRANSMISES */}
          <motion.section
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-2">
              <Network size={19} className="text-blue-700" />
              <h2 className="text-sm font-bold text-slate-900">
                Informations transportées
              </h2>
            </div>

            <div className="flex flex-1 flex-col gap-3">
              {information.map((item) => {
                const Icon = item.icon

                return (
                  <article
                    key={item.title}
                    className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: item.bg,
                        color: item.color,
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[10px] leading-4 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
              <p className="text-[10px] leading-4 text-blue-800">
                Ces informations permettent notamment d'élire le Root Bridge
                et de calculer les meilleurs chemins.
              </p>
            </div>
          </motion.section>
        </div>

        {/* PROCESSUS */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-3 shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2">
            <RefreshCw size={17} className="text-teal-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Rôle des BPDU dans le fonctionnement de STP
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {process.map((item, index) => (
              <div key={item.number}>
                <span className="text-[10px] font-extrabold tracking-wider text-teal-700">
                  ÉTAPE {item.number}
                </span>

                <h3 className="mt-1 text-xs font-bold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  {item.description}
                </p>

                {index !== 3 && (
                  <ArrowRight
                    size={13}
                    className="mt-2 text-slate-300"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* À RETENIR */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-3 flex shrink-0 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5"
        >
          <ShieldCheck size={17} className="shrink-0 text-teal-400" />
          <p className="text-xs leading-5 text-slate-200">
            <strong className="text-white">À retenir :</strong>{' '}
            les BPDU sont les messages de contrôle qui permettent à STP
            de découvrir la topologie et de prendre ses décisions.
          </p>
        </motion.div>

        {/* PIED DE PAGE */}
        <footer className="flex shrink-0 items-center justify-between border-t border-slate-200 pt-2">
          <span className="text-[9px] font-bold tracking-[0.18em] text-slate-400">
            RÉSEAUX INFORMATIQUES
          </span>

          <span className="text-[10px] font-bold tabular-nums text-slate-500">
            08 / 20
          </span>
        </footer>
      </div>
    </main>
  )
}
