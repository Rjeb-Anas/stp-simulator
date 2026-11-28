import { motion } from 'framer-motion'
import {
  BookOpen,
  PlayCircle,
  BarChart3,
  CheckCircle2,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

const sections = [
  {
    number: '01',
    title: 'Fonctionnement',
    subtitle: 'Comprendre les concepts',
    description:
      'Découvrir les VLAN, les boucles de couche 2 et le fonctionnement du protocole STP.',
    topics: [
      'Segmentation VLAN et Trunk 802.1Q',
      'Problème des boucles réseau',
      'BPDU et élection du Root Bridge',
      'Rôles et états des ports',
    ],
    icon: BookOpen,
    duration: 'Partie théorique',
  },
  {
    number: '02',
    title: 'Simulation',
    subtitle: 'Observer le fonctionnement',
    description:
      'Mettre en pratique les notions étudiées à travers une topologie réseau composée de trois switches.',
    topics: [
      'Création et configuration des VLAN',
      'Simulation sans STP',
      'Activation et fonctionnement du STP',
      "Panne d'un lien et convergence",
    ],
    icon: PlayCircle,
    duration: 'Partie pratique',
  },
  {
    number: '03',
    title: 'Analyse',
    subtitle: 'Interpréter les résultats',
    description:
      'Étudier les résultats obtenus et comprendre les avantages, les limites et les protections du protocole.',
    topics: [
      'Comparaison avec et sans STP',
      'Redondance et convergence',
      'Limites du protocole',
      'Bonnes pratiques de sécurité',
    ],
    icon: BarChart3,
    duration: 'Bilan technique',
  },
]

export default function Problem() {
  return (
    <SlideLayout
      section="Vue d'ensemble"
      badge="3 étapes"
      title="Plan de la présentation"
      subtitle="Trois étapes pour comprendre, expérimenter et analyser le protocole Spanning Tree."
      slideNumber={2}
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-3">
        {sections.map((section, index) => {
          const Icon = section.icon

          return (
            <motion.article
              key={section.number}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/50 p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl font-black text-teal-600">
                  {section.number}
                </span>

                <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-xs">
                  <Icon size={22} />
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                {section.title}
              </h2>

              <p className="mt-0.5 text-xs font-semibold text-teal-700">
                {section.subtitle}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {section.description}
              </p>

              <div className="my-4 h-px bg-slate-200" />

              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Au programme
              </p>

              <ul className="flex flex-col gap-2.5">
                {section.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 text-xs text-slate-600 sm:text-sm"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-teal-600"
                    />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4">
                <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600">
                  {section.duration}
                </span>
              </div>
            </motion.article>
          )
        })}
      </div>
    </SlideLayout>
  )
}
