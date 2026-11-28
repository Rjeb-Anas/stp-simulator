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
import SlideLayout from '../components/SlideLayout'

const principles = [
  {
    icon: Network,
    title: 'Détection des boucles',
    description:
      'STP analyse la topologie du réseau pour identifier les chemins redondants.',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    icon: GitBranch,
    title: 'Sélection du meilleur chemin',
    description:
      'Le protocole détermine une topologie logique sans boucle vers le Root Bridge.',
    color: '#0D9488',
    bg: '#F0FDFA',
  },
  {
    icon: Lock,
    title: 'Blocage des chemins redondants',
    description:
      "Certains ports sont placés en état bloqué afin d'éviter les boucles.",
    color: '#D97706',
    bg: '#FFFBEB',
  },
]

export default function STPExplanation() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="IEEE 802.1D"
      title="Introduction au protocole STP"
      subtitle="Spanning Tree Protocol : prévenir les boucles dans les réseaux commutés."
      slideNumber={7}
    >
      {/* Définition */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex shrink-0 items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50/70 p-4"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-700">
          <Workflow size={22} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 sm:text-base">
            Qu'est-ce que STP ?
          </h2>
          <p className="mt-0.5 text-xs leading-5 text-slate-600 sm:text-sm">
            Le <strong>Spanning Tree Protocol (STP)</strong> est un protocole de
            couche 2 qui évite les boucles Ethernet en construisant une
            topologie logique arborescente tout en conservant les liens
            physiques redondants.
          </p>
        </div>
      </motion.section>

      {/* Principes fondamentaux */}
      <div className="mb-2 shrink-0">
        <h2 className="text-sm font-bold text-slate-900">
          Les trois principes fondamentaux
        </h2>
      </div>

      <div className="mb-4 grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-3">
        {principles.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-4"
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                <Icon size={20} />
              </div>

              <h3 className="mb-1.5 text-sm font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                {item.description}
              </p>

              <div className="mt-auto pt-3">
                <div
                  className="h-1 w-10 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Principe général */}
      <section className="mb-3 shrink-0 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <div className="mb-3 flex items-center gap-2">
          <RefreshCw size={17} className="text-teal-700" />
          <h2 className="text-sm font-bold text-slate-900">
            Principe général de fonctionnement
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-2 text-center sm:grid-cols-5">
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
            <p className="text-xs font-bold text-blue-900">Analyse du réseau</p>
            <p className="mt-0.5 text-[11px] text-blue-700">Échange de BPDUs</p>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowRight size={18} className="rotate-90 sm:rotate-0" />
          </div>

          <div className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-2.5">
            <p className="text-xs font-bold text-teal-900">
              Élection du Root Bridge
            </p>
            <p className="mt-0.5 text-[11px] text-teal-700">
              Référence du réseau
            </p>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowRight size={18} className="rotate-90 sm:rotate-0" />
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
            <p className="text-xs font-bold text-amber-900">
              Blocage des redondances
            </p>
            <p className="mt-0.5 text-[11px] text-amber-700">
              Topologie sans boucle
            </p>
          </div>
        </div>
      </section>

      {/* À retenir */}
      <div className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 border-l-4 border-l-teal-600 bg-slate-50 px-4 py-2.5">
        <ShieldCheck size={18} className="shrink-0 text-teal-600" />
        <p className="text-xs leading-5 text-slate-700 sm:text-sm">
          <strong className="text-slate-900">À retenir :</strong> STP élimine
          les boucles logiques tout en maintenant la redondance physique du
          réseau.
        </p>
      </div>
    </SlideLayout>
  )
}
