
import { motion } from 'framer-motion'
import {
  Network,
  ShieldCheck,
  Layers,
  GitBranch,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react'

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
      'Évite les boucles de niveau 2 en bloquant les chemins redondants.',
    color: 'green',
  },
  {
    icon: GitBranch,
    title: 'Redondance',
    description:
      'Permet de conserver une connectivité alternative lorsqu’un lien tombe en panne.',
    color: 'violet',
  },
]

export default function Conclusion() {
  return (
    <section className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 md:p-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-50 blur-3xl" />

      {/* Header */}
      <header className="relative mb-5 flex shrink-0 items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            <GraduationCap size={16} />
            Fin de présentation
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Conclusion
          </h1>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            VLAN et protocole Spanning Tree
          </p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4 text-blue-700">
          <Network size={34} />
        </div>
      </header>

      {/* Main message */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-5 shrink-0 rounded-2xl bg-slate-900 p-5 text-white md:p-6"
      >
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-300">
          À retenir
        </p>

        <h2 className="max-w-3xl text-xl font-bold leading-relaxed md:text-2xl">
          Un réseau bien conçu doit être segmenté, sécurisé et capable de
          résister aux pannes.
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          Les VLAN organisent le réseau, tandis que STP assure une topologie
          sans boucle et permet l'utilisation de chemins redondants en cas
          de changement.
        </p>
      </motion.div>

      {/* Key points */}
      <div className="relative grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-3">
        {points.map((point, index) => {
          const Icon = point.icon

          const styles = {
            blue: 'bg-blue-50 text-blue-700 border-blue-100',
            green: 'bg-green-50 text-green-700 border-green-100',
            violet: 'bg-violet-50 text-violet-700 border-violet-100',
          }

          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className={`mb-3 w-fit rounded-xl border p-3 ${styles[point.color]}`}>
                <Icon size={23} />
              </div>

              <h3 className="mb-2 text-lg font-bold text-slate-900">
                {point.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">
                {point.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Final message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative mt-5 flex shrink-0 items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 size={24} className="shrink-0 text-blue-700" />

          <div>
            <p className="font-bold text-blue-900">
              Merci pour votre attention
            </p>
            <p className="text-xs text-blue-700">
              Questions et discussion
            </p>
          </div>
        </div>

        <span className="text-xs font-bold tracking-widest text-blue-500">
          20 / 20
        </span>
      </motion.div>

      <footer className="relative mt-3 shrink-0 border-t border-slate-100 pt-3 text-center">
        <span className="text-xs text-slate-400">
          VLAN · STP · FONCTIONNEMENT · SIMULATION · ANALYSE
        </span>
      </footer>
    </section>
  )
}
