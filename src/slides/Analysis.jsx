import { motion } from 'framer-motion'
import {
  Network,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

const comparisons = [
  {
    criterion: 'Boucles réseau',
    without: 'Présentes',
    with: 'Éliminées',
  },
  {
    criterion: 'Broadcast',
    without: 'Tempête possible',
    with: 'Trafic contrôlé',
  },
  {
    criterion: 'Liens redondants',
    without: 'Risque de boucle',
    with: 'Port redondant bloqué',
  },
  {
    criterion: 'Panne d’un lien',
    without: 'Réseau perturbé',
    with: 'Recalcul automatique',
  },
]

const benefits = [
  'Évite les boucles de niveau 2.',
  'Réduit les tempêtes de broadcast.',
  'Permet une architecture réseau redondante.',
  'Réagit aux changements de topologie.',
]

const limits = [
  'Certains liens restent temporairement inutilisés.',
  'La reconvergence peut prendre 30–50s avec STP classique (résolu par RSTP).',
]

export default function Analysis() {
  return (
    <SlideLayout
      section="Partie 03 · Analyse"
      badge="Bilan technique"
      title="Comparaison : avec et sans STP"
      subtitle="Évaluation comparative du comportement réseau selon l'activation du protocole."
      slideNumber={19}
    >
      {/* Tableau comparatif */}
      <div className="min-h-0 flex-1 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <div className="min-w-[480px]">
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-600">
            <span>Critère</span>
            <span className="text-red-600">Sans STP</span>
            <span className="text-teal-700">Avec STP</span>
          </div>

          <div className="divide-y divide-slate-100">
            {comparisons.map((item, index) => (
              <motion.div
                key={item.criterion}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="grid grid-cols-3 items-center px-4 py-3"
              >
                <span className="text-xs font-semibold text-slate-800 sm:text-sm">
                  {item.criterion}
                </span>

                <span className="flex items-center gap-2 text-xs text-red-600 sm:text-sm">
                  <XCircle size={15} className="shrink-0" />
                  {item.without}
                </span>

                <span className="flex items-center gap-2 text-xs text-teal-700 sm:text-sm">
                  <CheckCircle2 size={15} className="shrink-0" />
                  {item.with}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Avantages et limites */}
      <div className="mt-4 grid shrink-0 grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-4">
          <div className="mb-2.5 flex items-center gap-2 text-sm font-bold text-teal-900">
            <ShieldCheck size={17} />
            Avantages
          </div>
          <div className="space-y-2">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-teal-600"
                />
                <p className="text-xs leading-relaxed text-teal-950/80">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <div className="mb-2.5 flex items-center gap-2 text-sm font-bold text-amber-900">
            <AlertTriangle size={17} />
            Limites
          </div>
          <div className="space-y-2.5">
            {limits.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <AlertTriangle
                  size={15}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <p className="text-xs leading-relaxed text-amber-950/80">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mt-3 flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 border-l-4 border-l-teal-600 bg-slate-50 px-4 py-3">
        <Network size={20} className="shrink-0 text-teal-600" />
        <p className="text-xs font-semibold text-slate-800 sm:text-sm">
          STP garantit une topologie sans boucle tout en conservant une
          redondance active en cas de panne.
        </p>
      </div>
    </SlideLayout>
  )
}
