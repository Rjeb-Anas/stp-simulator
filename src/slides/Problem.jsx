import { motion } from 'framer-motion'
import {
  BookOpen,
  PlayCircle,
  BarChart3,
  CheckCircle2,
  Target,
  ArrowRight,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

const phases = [
  {
    number: '01',
    title: 'Fonctionnement',
    subtitle: 'Fondamentaux L2 & STP',
    slidesRange: 'Diapos 03 – 12',
    description:
      'Maîtriser la segmentation VLAN, le risque de boucle de niveau 2 et les mécanismes de décision du Spanning Tree.',
    topics: [
      'VLAN & Trunk 802.1Q',
      'Boucles Ethernet & tempêtes',
      'BPDU & élection du Root Bridge',
      'Rôles (RP, DP, BLK) & coûts',
    ],
    icon: BookOpen,
    accent: {
      topBar: 'bg-teal-600',
      badge: 'border-teal-200 bg-teal-50 text-teal-700',
      num: 'text-teal-600',
      iconBox: 'border-teal-200 bg-teal-50 text-teal-700',
      check: 'text-teal-600',
    },
  },
  {
    number: '02',
    title: 'Simulation',
    subtitle: 'Mise en pratique interactive',
    slidesRange: 'Diapos 13 – 18',
    description:
      'Observer en temps réel le comportement d’une topologie redondante avec et sans STP, puis lors d’une panne de lien.',
    topics: [
      'Topologie & configuration IOS',
      'Simulation sans STP (Broadcast Storm)',
      'Simulation avec STP (Blocage)',
      'Panne de lien & reconvergence',
    ],
    icon: PlayCircle,
    accent: {
      topBar: 'bg-blue-600',
      badge: 'border-blue-200 bg-blue-50 text-blue-700',
      num: 'text-blue-600',
      iconBox: 'border-blue-200 bg-blue-50 text-blue-700',
      check: 'text-blue-600',
    },
  },
  {
    number: '03',
    title: 'Analyse & Bilan',
    subtitle: 'Évaluation technique',
    slidesRange: 'Diapos 19 – 20',
    description:
      'Comparer les performances, identifier les limites du protocole historique et retenir les bonnes pratiques.',
    topics: [
      'Comparatif Sans STP vs Avec STP',
      'Temps de convergence (802.1D / RSTP)',
      'Limites & risques de sécurité',
      'Synthèse & recommandations',
    ],
    icon: BarChart3,
    accent: {
      topBar: 'bg-slate-800',
      badge: 'border-slate-200 bg-slate-100 text-slate-700',
      num: 'text-slate-800',
      iconBox: 'border-slate-200 bg-slate-100 text-slate-800',
      check: 'text-slate-700',
    },
  },
]

export default function Problem() {
  return (
    <SlideLayout
      section="Vue d'ensemble"
      badge="Plan · 3 phases"
      title="Problématique & Plan de la présentation"
      subtitle="Comment concilier haute disponibilité (liens redondants) et stabilité du réseau Ethernet."
      slideNumber={2}
    >
      {/* Objectif / Problématique */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-4 flex shrink-0 flex-col gap-2 rounded-xl border border-teal-200/80 bg-teal-50/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-start gap-3 sm:items-center">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Target size={18} />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-teal-800">
              Problématique centrale
            </p>
            <p className="mt-0.5 text-xs text-slate-700 sm:text-sm">
              La redondance physique protège contre les pannes, mais crée des{' '}
              <strong className="font-bold text-slate-900">boucles de niveau 2</strong>.
              Le protocole <strong className="font-bold text-teal-700">STP</strong> bloque
              les chemins superflus tout en gardant un secours automatique.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3 Phases */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-3">
        {phases.map((phase, index) => {
          const Icon = phase.icon
          const a = phase.accent

          return (
            <motion.article
              key={phase.number}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition hover:border-slate-300"
            >
              {/* Barre supérieure colorée */}
              <div className={`h-1.5 w-full ${a.topBar}`} />

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                {/* En-tête carte */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-2xl font-black tracking-tight ${a.num}`}>
                      {phase.number}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${a.badge}`}>
                      {phase.slidesRange}
                    </span>
                  </div>

                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${a.iconBox}`}>
                    <Icon size={18} />
                  </div>
                </div>

                {/* Titre & description */}
                <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">
                  {phase.title}
                </h2>
                <p className="text-[11px] font-semibold text-slate-500">
                  {phase.subtitle}
                </p>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                  {phase.description}
                </p>

                <div className="my-3.5 h-px bg-slate-100" />

                {/* Points clés */}
                <ul className="flex flex-1 flex-col gap-2">
                  {phase.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-xs text-slate-700"
                    >
                      <CheckCircle2
                        size={14}
                        className={`mt-0.5 shrink-0 ${a.check}`}
                      />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                {/* Indicateur de progression */}
                {index < phases.length - 1 && (
                  <div className="mt-3 hidden items-center justify-end gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:flex">
                    <span>Étape suivante</span>
                    <ArrowRight size={12} />
                  </div>
                )}
              </div>
            </motion.article>
          )
        })}
      </div>
    </SlideLayout>
  )
}
