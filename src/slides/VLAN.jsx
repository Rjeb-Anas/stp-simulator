import { motion } from 'framer-motion'
import {
  Layers3,
  Network,
  Radio,
  ShieldCheck,
  Settings2,
  ArrowRight,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

const concepts = [
  {
    icon: Network,
    title: 'Segmentation logique',
    description:
      'Un VLAN permet de diviser un réseau local physique en plusieurs réseaux logiques indépendants.',
  },
  {
    icon: Radio,
    title: 'Domaine de broadcast',
    description:
      'Chaque VLAN constitue un domaine de diffusion distinct. Les broadcasts restent limités à leur VLAN.',
  },
  {
    icon: ShieldCheck,
    title: 'Isolation du trafic',
    description:
      'Les VLAN séparent les flux réseau et contribuent à améliorer la sécurité et le contrôle des communications.',
  },
]

const steps = [
  'Le switch identifie le VLAN associé à chaque port.',
  'Les trames sont transmises selon les règles du VLAN concerné.',
  'La communication entre VLAN nécessite un routage inter-VLAN.',
]

export default function VLAN() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="Segmentation"
      title="Comprendre les VLAN"
      subtitle="La segmentation logique d'un réseau local"
      slideNumber={3}
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Colonne gauche */}
        <div className="flex flex-col gap-4">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-slate-200 bg-slate-50/60 p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-teal-200 bg-teal-50 text-teal-700">
                <Layers3 size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Définition</h2>
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              Un <strong className="text-slate-900">VLAN</strong> (Virtual Local
              Area Network) est un réseau local virtuel qui permet de regrouper
              logiquement des équipements au sein d'un même réseau physique.
            </p>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
              Cette technologie permet de séparer les communications en
              plusieurs domaines de diffusion, sans avoir besoin de créer un
              réseau physique distinct pour chaque groupe.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <Settings2 size={20} className="text-teal-600" />
              <h2 className="text-base font-bold text-slate-900">
                Fonctionnement général
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {steps.map((text, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                    0{index + 1}
                  </span>
                  <p className="text-sm text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Principes fondamentaux
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Les caractéristiques essentielles de la segmentation VLAN
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {concepts.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.1 }}
                  className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-teal-600">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-auto flex items-center gap-3 rounded-xl border border-slate-200 border-l-4 border-l-teal-600 bg-slate-50 px-4 py-3.5"
          >
            <ArrowRight className="shrink-0 text-teal-600" size={18} />
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
              <strong className="text-slate-900">À retenir :</strong> les VLAN
              permettent une meilleure organisation du réseau, une isolation
              logique du trafic et une gestion plus efficace.
            </p>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  )
}
