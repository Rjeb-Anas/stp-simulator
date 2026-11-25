
import { motion } from 'framer-motion'
import {
  Network,
  ShieldCheck,
  GitBranch,
  RefreshCw,
  Workflow,
  ArrowRight,
  Lock,
} from 'lucide-react'

const principles = [
  {
    icon: Network,
    title: 'Détection des boucles',
    description:
      'STP analyse la topologie du réseau pour identifier les chemins redondants.',
    color: '#3978D4',
    bg: '#EFF6FF',
  },
  {
    icon: GitBranch,
    title: 'Sélection du meilleur chemin',
    description:
      'Le protocole détermine une topologie logique sans boucle.',
    color: '#0D9488',
    bg: '#ECFDF5',
  },
  {
    icon: Lock,
    title: 'Blocage des chemins redondants',
    description:
      'Certains ports sont placés en état bloqué afin d’éviter les boucles.',
    color: '#D97706',
    bg: '#FFF7ED',
  },
]

export default function STPExplanation() {
  return (
    <main className="h-full w-full overflow-hidden bg-[#F8FAFC] px-5 py-4 text-slate-800 md:px-8">
      <div className="mx-auto flex h-full max-w-7xl flex-col">

        {/* EN-TÊTE */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 shrink-0"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-teal-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
              Partie 01 / Fonctionnement
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Introduction au protocole STP
          </h1>

          <p className="mt-1 text-xs text-slate-500 md:text-sm">
            Spanning Tree Protocol : prévenir les boucles dans les réseaux commutés.
          </p>
        </motion.header>

        {/* DÉFINITION */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 flex shrink-0 items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <Workflow size={25} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 md:text-lg">
              Qu'est-ce que STP ?
            </h2>

            <p className="mt-1 text-xs leading-6 text-slate-600 md:text-sm">
              Le <strong>Spanning Tree Protocol (STP)</strong> est un protocole
              de couche 2 qui permet d'éviter les boucles Ethernet en
              construisant une topologie logique sans boucle, tout en
              conservant les connexions physiques redondantes.
            </p>
          </div>
        </motion.section>

        {/* OBJECTIFS */}
        <div className="mb-2 shrink-0">
          <h2 className="text-sm font-bold text-slate-900">
            Les trois principes fondamentaux
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Comment STP assure la stabilité du réseau
          </p>
        </div>

        <div className="mb-4 grid min-h-0 flex-1 grid-cols-3 gap-3">
          {principles.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.12 }}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: item.bg,
                    color: item.color,
                  }}
                >
                  <Icon size={21} />
                </div>

                <h3 className="mb-2 text-sm font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-xs leading-6 text-slate-500">
                  {item.description}
                </p>

                <div
                  className="mt-auto pt-4"
                >
                  <div
                    className="h-1 w-10 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* PRINCIPE DE FONCTIONNEMENT */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4 shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2">
            <RefreshCw size={18} className="text-teal-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Principe général de fonctionnement
            </h2>
          </div>

          <div className="grid grid-cols-3 items-center gap-2 text-center">
            <div className="rounded-lg bg-blue-50 px-2 py-3">
              <p className="text-xs font-bold text-blue-800">
                Analyse du réseau
              </p>
              <p className="mt-1 text-[10px] text-blue-700">
                Échange de BPDUs
              </p>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowRight size={19} />
            </div>

            <div className="rounded-lg bg-teal-50 px-2 py-3">
              <p className="text-xs font-bold text-teal-800">
                Élection du Root Bridge
              </p>
              <p className="mt-1 text-[10px] text-teal-700">
                Référence du réseau
              </p>
            </div>
          </div>

          <div className="my-2 flex justify-center text-slate-400">
            <ArrowRight size={18} className="rotate-90" />
          </div>

          <div className="rounded-lg bg-orange-50 px-3 py-3 text-center">
            <p className="text-xs font-bold text-orange-800">
              Sélection des ports et blocage des chemins redondants
            </p>
            <p className="mt-1 text-[10px] text-orange-700">
              Obtention d'une topologie logique sans boucle
            </p>
          </div>
        </motion.section>

        {/* À RETENIR */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-3 flex shrink-0 items-center gap-3 rounded-lg bg-slate-900 px-4 py-3"
        >
          <ShieldCheck size={19} className="shrink-0 text-teal-400" />
          <p className="text-xs leading-5 text-slate-200">
            <strong className="text-white">À retenir :</strong>{' '}
            STP élimine les boucles logiques tout en maintenant
            la redondance physique du réseau.
          </p>
        </motion.div>

        {/* PIED DE PAGE */}
        <footer className="flex shrink-0 items-center justify-between border-t border-slate-200 pt-2">
          <span className="text-[9px] font-bold tracking-[0.18em] text-slate-400">
            RÉSEAUX INFORMATIQUES
          </span>

          <span className="text-[10px] font-bold tabular-nums text-slate-500">
            07 / 20
          </span>
        </footer>
      </div>
    </main>
  )
}
