
import { motion } from 'framer-motion'
import {
  Layers3,
  Network,
  Radio,
  ShieldCheck,
  Settings2,
  ArrowRight,
} from 'lucide-react'

const concepts = [
  {
    icon: Network,
    title: 'Segmentation logique',
    description:
      'Un VLAN permet de diviser un réseau local physique en plusieurs réseaux logiques indépendants.',
    color: '#3978D4',
    bg: '#EFF6FF',
  },
  {
    icon: Radio,
    title: 'Domaine de broadcast',
    description:
      'Chaque VLAN constitue un domaine de diffusion distinct. Les broadcasts restent limités à leur VLAN.',
    color: '#0D9488',
    bg: '#ECFDF5',
  },
  {
    icon: ShieldCheck,
    title: 'Isolation du trafic',
    description:
      'Les VLAN séparent les flux réseau et contribuent à améliorer la sécurité et le contrôle des communications.',
    color: '#D97706',
    bg: '#FFF7ED',
  },
]

export default function VLAN() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-8 text-slate-800 md:px-12">
      <div className="mx-auto max-w-6xl">

        {/* En-tête */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-9"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-teal-600" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Partie 01 / Fonctionnement
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Comprendre les VLAN
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-500">
            La segmentation logique d'un réseau local
          </p>
        </motion.header>

        {/* Définition */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <Layers3 size={23} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Définition
            </h2>
          </div>

          <p className="text-base leading-8 text-slate-600 md:text-lg">
            Un <strong className="text-slate-900">VLAN</strong>
            {' '}(Virtual Local Area Network) est un réseau local virtuel
            qui permet de regrouper logiquement des équipements au sein
            d'un même réseau physique.
          </p>

          <p className="mt-3 text-base leading-8 text-slate-600 md:text-lg">
            Cette technologie permet de séparer les communications
            en plusieurs domaines de diffusion, sans avoir besoin
            de créer un réseau physique distinct pour chaque groupe.
          </p>
        </motion.section>

        {/* Principes fondamentaux */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Principes fondamentaux
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Les caractéristiques essentielles de la segmentation VLAN
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {concepts.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.12 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: item.bg,
                    color: item.color,
                  }}
                >
                  <Icon size={24} />
                </div>

                <h3 className="mb-3 text-base font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-slate-500">
                  {item.description}
                </p>

                <div
                  className="mt-5 h-1 w-12 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </motion.article>
            )
          })}
        </div>

        {/* Fonctionnement */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <Settings2 size={21} className="text-teal-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Fonctionnement général
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              'Le switch identifie le VLAN associé à chaque port.',
              'Les trames sont transmises selon les règles du VLAN concerné.',
              'La communication entre VLAN nécessite un routage inter-VLAN.',
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                  0{index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* À retenir */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-7 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-4 text-white"
        >
          <ArrowRight className="shrink-0 text-teal-400" size={20} />
          <p className="text-sm leading-relaxed text-slate-200">
            <strong className="text-white">À retenir :</strong>{' '}
            les VLAN permettent une meilleure organisation du réseau,
            une isolation logique du trafic et une gestion plus efficace.
          </p>
        </motion.div>

        {/* Pied de page */}
        <footer className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-[10px] font-bold tracking-[0.18em] text-slate-400">
            RÉSEAUX INFORMATIQUES
          </span>
          <span className="text-xs font-bold tabular-nums text-slate-500">
            03 / 20
          </span>
        </footer>
      </div>
    </main>
  )
}
