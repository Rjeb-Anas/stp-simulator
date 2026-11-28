import { motion } from 'framer-motion'
import {
  GitBranch,
  Gauge,
  ArrowRight,
  ShieldCheck,
  Zap,
  Network,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

const variants = [
  {
    name: 'STP',
    standard: 'IEEE 802.1D',
    description: 'Évite les boucles en bloquant les chemins redondants.',
    speed: 'Convergence lente (30–50s)',
    color: 'blue',
  },
  {
    name: 'RSTP',
    standard: 'IEEE 802.1w',
    description: 'Améliore la convergence grâce à des mécanismes rapides.',
    speed: 'Convergence rapide (~1–2s)',
    color: 'teal',
  },
  {
    name: 'MSTP',
    standard: 'IEEE 802.1s',
    description: 'Regroupe plusieurs VLAN dans différentes instances STP.',
    speed: 'Gestion multi-instance',
    color: 'violet',
  },
]

const variantStyles = {
  blue: 'border-blue-200 bg-blue-50/70 text-blue-800',
  teal: 'border-teal-200 bg-teal-50/70 text-teal-800',
  violet: 'border-violet-200 bg-violet-50/70 text-violet-800',
}

export default function STPCost() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="Métrique & Variantes"
      title="Coût des chemins et variantes STP"
      subtitle="STP utilise le coût cumulé des liens pour déterminer le meilleur chemin vers le Root Bridge."
      slideNumber={12}
    >
      <section className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Coût des chemins */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <Gauge size={18} className="text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Le coût d'un chemin (Path Cost)
            </h2>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs leading-relaxed text-slate-600">
              Chaque liaison possède un coût inversement proportionnel à sa
              bande passante (ex. 100 Mbps = coût 19, 1 Gbps = coût 4).
            </p>
          </div>

          <div className="my-4 flex flex-col items-center">
            <div className="flex w-full items-center justify-center gap-3">
              <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-center">
                <Network size={20} className="mx-auto text-teal-700" />
                <p className="mt-1 text-xs font-bold text-teal-900">
                  Root Bridge
                </p>
              </div>
              <ArrowRight size={19} className="text-slate-400" />
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-center">
                <GitBranch size={20} className="mx-auto text-blue-700" />
                <p className="mt-1 text-xs font-bold text-blue-900">Switch</p>
              </div>
            </div>

            <div className="mt-3 w-full rounded-xl border border-slate-200 p-3">
              <p className="mb-2 text-xs font-bold text-slate-700">
                Exemple de comparaison
              </p>

              <div className="space-y-2.5">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-600">Chemin A (direct)</span>
                    <strong className="text-teal-700">Coût 19</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[38%] rounded-full bg-teal-600" />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-600">Chemin B (2 sauts)</span>
                    <strong className="text-amber-700">Coût 38</strong>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[76%] rounded-full bg-amber-500" />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-lg bg-teal-50 p-2 text-xs font-semibold text-teal-800">
                <ShieldCheck size={15} className="shrink-0" />
                Le chemin A est préféré car son coût total est plus faible.
              </div>
            </div>
          </div>

          <div className="mt-auto rounded-xl border border-blue-200 bg-blue-50/70 p-3">
            <p className="text-xs font-bold text-blue-900">Règle essentielle</p>
            <p className="mt-0.5 text-xs text-blue-800/80">
              Le coût total le plus faible l'emporte. En cas d'égalité, STP
              départage via le Bridge ID puis le Port ID.
            </p>
          </div>
        </div>

        {/* Variantes */}
        <div className="flex flex-col">
          <div className="mb-3 flex items-center gap-2">
            <GitBranch size={18} className="text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Les variantes du protocole
            </h2>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            {variants.map((variant, index) => (
              <motion.div
                key={variant.name}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12 }}
                className={`flex-1 rounded-xl border p-4 ${variantStyles[variant.color]}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold">{variant.name}</h3>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold shadow-xs">
                    {variant.standard}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {variant.description}
                </p>

                <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold">
                  <Zap size={14} />
                  {variant.speed}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SlideLayout>
  )
}
