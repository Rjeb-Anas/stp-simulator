
import { motion } from 'framer-motion'
import {
  Network,
  RefreshCw,
  AlertTriangle,
  Radio,
  Activity,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react'

const consequences = [
  {
    icon: RefreshCw,
    title: 'Tempête de broadcast',
    description:
      'Les trames de diffusion circulent continuellement dans les boucles.',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
  {
    icon: Activity,
    title: 'Instabilité de la table MAC',
    description:
      'Le switch reçoit plusieurs fois les mêmes trames et apprend des associations MAC incorrectes.',
    color: '#D97706',
    bg: '#FFF7ED',
  },
  {
    icon: Network,
    title: 'Saturation du réseau',
    description:
      'La multiplication des trames consomme la bande passante et les ressources des équipements.',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
]

export default function Layer2Loops() {
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
            <span className="h-1 w-7 rounded-full bg-orange-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-700">
              Partie 01 / Fonctionnement
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Les boucles de niveau 2
          </h1>

          <p className="mt-1 text-xs text-slate-500 md:text-sm">
            Comprendre les risques liés aux connexions redondantes.
          </p>
        </motion.header>

        {/* DÉFINITION */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-3 flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <AlertTriangle size={21} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 md:text-base">
              Qu'est-ce qu'une boucle de niveau 2 ?
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-600 md:text-sm">
              Une boucle apparaît lorsque plusieurs chemins physiques relient
              les commutateurs et créent un circuit fermé dans le réseau Ethernet.
            </p>
          </div>
        </motion.section>

        {/* TOPOLOGIE ET EXPLICATION */}
        <div className="mb-3 grid min-h-0 flex-1 grid-cols-2 gap-3">

          {/* SCHÉMA */}
          <motion.section
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <Network size={18} className="text-orange-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Exemple de boucle réseau
              </h2>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center rounded-lg bg-slate-50 p-2">
              <svg
                viewBox="0 0 440 290"
                className="h-full w-full"
                role="img"
                aria-label="Trois commutateurs connectés en boucle avec des flèches indiquant la circulation des trames"
              >
                <defs>
                  <marker
                    id="loopArrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L6,3 z" fill="#DC2626" />
                  </marker>
                </defs>

                {/* LIENS */}
                <path
                  d="M220 65 L105 205"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M220 65 L335 205"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M105 205 L335 205"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* FLÈCHES DE CIRCULATION */}
                <path
                  d="M170 125 L155 145"
                  stroke="#DC2626"
                  strokeWidth="3"
                  fill="none"
                  markerEnd="url(#loopArrow)"
                />
                <path
                  d="M270 125 L285 145"
                  stroke="#DC2626"
                  strokeWidth="3"
                  fill="none"
                  markerEnd="url(#loopArrow)"
                />
                <path
                  d="M180 205 L245 205"
                  stroke="#DC2626"
                  strokeWidth="3"
                  fill="none"
                  markerEnd="url(#loopArrow)"
                />

                {/* SWITCH 1 */}
                <rect
                  x="165"
                  y="25"
                  width="110"
                  height="55"
                  rx="10"
                  fill="#1E293B"
                />
                <text
                  x="220"
                  y="49"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  SWITCH 1
                </text>
                <text
                  x="220"
                  y="65"
                  textAnchor="middle"
                  fill="#CBD5E1"
                  fontSize="9"
                >
                  Commutateur
                </text>

                {/* SWITCH 2 */}
                <rect
                  x="50"
                  y="180"
                  width="110"
                  height="55"
                  rx="10"
                  fill="#1E293B"
                />
                <text
                  x="105"
                  y="204"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  SWITCH 2
                </text>
                <text
                  x="105"
                  y="220"
                  textAnchor="middle"
                  fill="#CBD5E1"
                  fontSize="9"
                >
                  Commutateur
                </text>

                {/* SWITCH 3 */}
                <rect
                  x="280"
                  y="180"
                  width="110"
                  height="55"
                  rx="10"
                  fill="#1E293B"
                />
                <text
                  x="335"
                  y="204"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  SWITCH 3
                </text>
                <text
                  x="335"
                  y="220"
                  textAnchor="middle"
                  fill="#CBD5E1"
                  fontSize="9"
                >
                  Commutateur
                </text>

                {/* BOUCLE */}
                <rect
                  x="155"
                  y="120"
                  width="130"
                  height="30"
                  rx="15"
                  fill="#FEE2E2"
                  stroke="#FECACA"
                />
                <text
                  x="220"
                  y="139"
                  textAnchor="middle"
                  fill="#B91C1C"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Boucle Ethernet
                </text>
              </svg>
            </div>

            <p className="mt-2 text-center text-[10px] text-slate-500">
              Les trois commutateurs forment un circuit fermé.
            </p>
          </motion.section>

          {/* CAUSE */}
          <motion.section
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-2">
              <Radio size={19} className="text-red-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Pourquoi est-ce dangereux ?
              </h2>
            </div>

            <p className="mb-4 text-xs leading-6 text-slate-600">
              Contrairement à certains protocoles de couche 3, Ethernet
              ne possède pas de mécanisme général de durée de vie des trames
              pour arrêter leur circulation en boucle.
            </p>

            <div className="rounded-lg border border-red-100 bg-red-50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <RefreshCw size={17} className="text-red-600" />
                <span className="text-xs font-bold text-red-800">
                  Circulation répétée
                </span>
              </div>

              <p className="text-xs leading-5 text-red-800/80">
                Une trame broadcast peut être retransmise continuellement
                par les commutateurs, créant une tempête de broadcast.
              </p>
            </div>

            <div className="mt-3 rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-700">
                Conséquence :
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Le réseau peut devenir lent, instable, voire inutilisable.
              </p>
            </div>
          </motion.section>
        </div>

        {/* CONSÉQUENCES */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-3 shrink-0"
        >
          <h2 className="mb-2 text-sm font-bold text-slate-900">
            Les principales conséquences
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {consequences.map((item) => {
              const Icon = item.icon

              return (
                <article
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div
                    className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: item.bg,
                      color: item.color,
                    }}
                  >
                    <Icon size={17} />
                  </div>

                  <h3 className="text-xs font-bold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    {item.description}
                  </p>
                </article>
              )
            })}
          </div>
        </motion.section>

        {/* TRANSITION VERS STP */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-2 flex shrink-0 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5"
        >
          <ShieldAlert size={18} className="shrink-0 text-orange-400" />
          <p className="text-xs leading-5 text-slate-200">
            <strong className="text-white">Solution :</strong>{' '}
            le protocole STP permet de détecter les boucles et de bloquer
            certains chemins redondants pour éviter leur formation.
          </p>
        </motion.div>

        {/* PIED DE PAGE */}
        <footer className="flex shrink-0 items-center justify-between border-t border-slate-200 pt-2">
          <span className="text-[9px] font-bold tracking-[0.18em] text-slate-400">
            RÉSEAUX INFORMATIQUES
          </span>
          <span className="text-[10px] font-bold tabular-nums text-slate-500">
            06 / 20
          </span>
        </footer>
      </div>
    </main>
  )
}
