import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Layers,
  GitBranch,
  CheckCircle2,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

const points = [
  {
    icon: Layers,
    title: 'VLAN',
    description:
      'Segmentent le réseau en plusieurs domaines de broadcast pour améliorer son organisation.',
    color: 'blue',
  },
  {
    icon: ShieldCheck,
    title: 'Protocole STP',
    description:
      'Évite les boucles de niveau 2 en bloquant logiquement les chemins redondants.',
    color: 'teal',
  },
  {
    icon: GitBranch,
    title: 'Redondance',
    description:
      "Permet de rétablir automatiquement la connectivité lorsqu'un lien tombe en panne.",
    color: 'violet',
  },
]

export default function Conclusion() {
  return (
    <SlideLayout
      section="Fin de présentation"
      badge="Synthèse"
      title="Conclusion"
      subtitle="VLAN et protocole Spanning Tree"
      slideNumber={20}
    >
      {/* Message principal */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 shrink-0 rounded-xl bg-slate-900 p-5 text-white"
      >
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-teal-400">
          À retenir
        </p>
        <h2 className="max-w-3xl text-lg font-bold leading-relaxed sm:text-xl md:text-2xl">
          Un réseau bien conçu doit être segmenté, sécurisé et capable de
          résister aux pannes.
        </h2>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-300 sm:text-sm">
          Les VLAN organisent le réseau, tandis que STP assure une topologie
          sans boucle et bascule vers les chemins redondants en cas de coupure.
        </p>
      </motion.div>

      {/* Points clés */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-3">
        {points.map((point, index) => {
          const Icon = point.icon
          const styles = {
            blue: 'bg-blue-50 text-blue-700 border-blue-200',
            teal: 'bg-teal-50 text-teal-700 border-teal-200',
            violet: 'bg-violet-50 text-violet-700 border-violet-200',
          }

          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col justify-center rounded-xl border border-slate-200 bg-slate-50/50 p-4"
            >
              <div className={`mb-3 w-fit rounded-xl border p-2.5 ${styles[point.color]}`}>
                <Icon size={21} />
              </div>

              <h3 className="mb-1.5 text-base font-bold text-slate-900">
                {point.title}
              </h3>

              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                {point.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Remerciements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-4 flex shrink-0 flex-col items-start justify-between gap-2 rounded-xl border border-teal-200 bg-teal-50/70 px-5 py-3.5 sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 size={22} className="shrink-0 text-teal-700" />
          <div>
            <p className="text-sm font-bold text-teal-900">
              Merci pour votre attention
            </p>
            <p className="text-xs text-teal-700">Questions et discussion</p>
          </div>
        </div>

        <span className="text-xs font-bold tracking-widest text-teal-700">
          FST FÈS · 2026–2027
        </span>
      </motion.div>
    </SlideLayout>
  )
}
