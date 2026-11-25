
import { motion } from 'framer-motion'
import {
  GitBranch,
  Gauge,
  ArrowRight,
  ShieldCheck,
  Zap,
  Network,
} from 'lucide-react'

const variants = [
  {
    name: 'STP',
    standard: 'IEEE 802.1D',
    description: 'Évite les boucles en bloquant les chemins redondants.',
    speed: 'Convergence plus lente',
    color: 'blue',
  },
  {
    name: 'RSTP',
    standard: 'IEEE 802.1w',
    description: 'Améliore la convergence grâce à des mécanismes rapides.',
    speed: 'Convergence rapide',
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
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
  teal: 'border-teal-200 bg-teal-50 text-teal-700',
  violet: 'border-violet-200 bg-violet-50 text-violet-700',
}

export default function STPCost() {
  return (
    <main className="h-full w-full overflow-hidden rounded-3xl bg-white p-6 text-slate-800 shadow-xl">
      <div className="flex h-full flex-col">
        <header className="mb-4 shrink-0">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-teal-600">
            Partie 01 · Fonctionnement
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Coût des chemins et variantes STP
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            STP utilise le coût des liens pour déterminer le meilleur chemin vers le Root Bridge.
          </p>
        </header>

        <section className="grid min-h-0 flex-1 grid-cols-2 gap-5">
          {/* Coût des chemins */}
          <div className="flex flex-col rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Gauge size={19} className="text-blue-600" />
              <h2 className="text-sm font-bold">Le coût d’un chemin</h2>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs leading-relaxed text-slate-600">
                Chaque liaison possède un coût associé à sa vitesse. STP additionne les coûts des liens pour calculer le coût total vers le Root Bridge.
              </p>
            </div>

            <div className="my-4 flex flex-col items-center">
              <div className="flex w-full items-center justify-center gap-3">
                <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-center">
                  <Network size={21} className="mx-auto text-teal-700" />
                  <p className="mt-1 text-xs font-bold">Root Bridge</p>
                </div>
                <ArrowRight size={20} className="text-slate-400" />
                <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center">
                  <GitBranch size={21} className="mx-auto text-blue-700" />
                  <p className="mt-1 text-xs font-bold">Switch</p>
                </div>
              </div>

              <div className="mt-3 w-full rounded-xl border border-slate-200 p-3">
                <p className="mb-2 text-xs font-bold text-slate-600">
                  Exemple de comparaison
                </p>

                <div className="space-y-2">
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span>Chemin A</span>
                      <strong className="text-teal-700">Coût 19</strong>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[38%] rounded-full bg-teal-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span>Chemin B</span>
                      <strong className="text-orange-700">Coût 38</strong>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div className="h-2 w-[76%] rounded-full bg-orange-400" />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-lg bg-teal-50 p-2 text-xs font-semibold text-teal-800">
                  <ShieldCheck size={16} />
                  Le chemin A est préféré : son coût est plus faible.
                </div>
              </div>
            </div>

            <div className="mt-auto rounded-xl bg-blue-50 p-3">
              <p className="text-xs font-bold text-blue-800">
                Règle essentielle
              </p>
              <p className="mt-1 text-xs text-blue-700">
                Le chemin ayant le coût total le plus faible est préféré. En cas d’égalité, STP applique des critères de départage.
              </p>
            </div>
          </div>

          {/* Variantes */}
          <div className="flex flex-col">
            <div className="mb-3 flex items-center gap-2">
              <GitBranch size={19} className="text-teal-600" />
              <h2 className="text-sm font-bold">Les variantes du protocole</h2>
            </div>

            <div className="flex flex-1 flex-col gap-3">
              {variants.map((variant, index) => (
                <motion.div
                  key={variant.name}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`flex-1 rounded-xl border p-3 ${variantStyles[variant.color]}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold">
                      {variant.name}
                    </h3>
                    <span className="rounded-full bg-white/80 px-2 py-1 text-[10px] font-bold">
                      {variant.standard}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {variant.description}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-[11px] font-bold">
                    <Zap size={14} />
                    {variant.speed}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-4 flex shrink-0 items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-white">
          <ShieldCheck size={19} className="shrink-0 text-teal-300" />
          <p className="text-xs font-medium text-slate-200">
            Le choix d’une variante dépend de la taille du réseau, du nombre de VLAN et du temps de convergence souhaité.
          </p>
        </div>

        <footer className="mt-3 flex shrink-0 items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span>VLAN & PROTOCOLE STP</span>
          <span className="font-bold tracking-widest">12 / 20</span>
        </footer>
      </div>
    </main>
  )
}
