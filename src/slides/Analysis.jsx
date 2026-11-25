
import { motion } from 'framer-motion'
import {
  Network,
  AlertTriangle,
  ShieldCheck,
  GitCompareArrows,
  CheckCircle2,
  XCircle,
  Activity,
} from 'lucide-react'

const comparisons = [
  {
    criterion: 'Boucles réseau',
    without: 'Présentes',
    with: 'Éliminées',
    good: true,
  },
  {
    criterion: 'Broadcast',
    without: 'Tempête possible',
    with: 'Trafic contrôlé',
    good: true,
  },
  {
    criterion: 'Liens redondants',
    without: 'Risque de boucle',
    with: 'Un lien peut être bloqué',
    good: true,
  },
  {
    criterion: 'Panne d’un lien',
    without: 'Réseau perturbé',
    with: 'Recalcul du chemin',
    good: true,
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
  'La reconvergence peut prendre du temps avec STP classique.',
]

export default function Analysis() {
  return (
    <section className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <header className="mb-4 flex shrink-0 items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
            <GitCompareArrows size={15} />
            Analyse des résultats
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Comparaison : avec et sans STP
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Évaluation du comportement du réseau
          </p>
        </div>

        <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
          <Activity size={27} />
        </div>
      </header>

      {/* Comparison table */}
      <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-slate-200 bg-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">
          <span>Critère</span>
          <span className="text-red-600">Sans STP</span>
          <span className="text-green-700">Avec STP</span>
        </div>

        <div className="divide-y divide-slate-100">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.criterion}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-[1fr_1fr_1fr] items-center px-4 py-3"
            >
              <span className="text-sm font-semibold text-slate-800">
                {item.criterion}
              </span>

              <span className="flex items-center gap-2 text-sm text-red-600">
                <XCircle size={15} className="shrink-0" />
                {item.without}
              </span>

              <span className="flex items-center gap-2 text-sm text-green-700">
                <CheckCircle2 size={15} className="shrink-0" />
                {item.with}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits and limits */}
      <div className="mt-4 grid shrink-0 grid-cols-2 gap-4">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-green-800">
            <ShieldCheck size={18} />
            Avantages
          </div>

          <div className="space-y-2">
            {benefits.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-green-600"
                />
                <p className="text-xs leading-relaxed text-green-900">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-orange-800">
            <AlertTriangle size={18} />
            Limites
          </div>

          <div className="space-y-3">
            {limits.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <AlertTriangle
                  size={15}
                  className="mt-0.5 shrink-0 text-orange-600"
                />
                <p className="text-xs leading-relaxed text-orange-900">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mt-4 flex shrink-0 items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
        <Network size={22} className="shrink-0 text-blue-700" />
        <p className="text-sm font-semibold text-blue-900">
          STP garantit une topologie sans boucle tout en conservant une
          possibilité de redondance en cas de panne.
        </p>
      </div>

      <footer className="mt-3 shrink-0 border-t border-slate-200 pt-3">
        <span className="text-xs text-slate-400">
          ANALYSE · 19 / 20
        </span>
      </footer>
    </section>
  )
}
