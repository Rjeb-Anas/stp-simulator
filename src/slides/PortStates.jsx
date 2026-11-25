
import { motion } from 'framer-motion'
import {
  Lock,
  Radio,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Info,
  Network,
} from 'lucide-react'

const states = [
  {
    number: '01',
    name: 'Blocking',
    subtitle: 'Blocage',
    description: 'Empêche le passage des trames de données pour éviter les boucles.',
    detail: 'Reçoit les BPDU, mais ne transmet pas les données.',
    icon: Lock,
    color: 'orange',
    duration: 'État initial',
  },
  {
    number: '02',
    name: 'Listening',
    subtitle: 'Écoute',
    description: 'Participe à la convergence et traite les informations STP.',
    detail: 'Ne transmet pas de données et n’apprend pas les adresses MAC.',
    icon: Radio,
    color: 'blue',
    duration: '15 secondes*',
  },
  {
    number: '03',
    name: 'Learning',
    subtitle: 'Apprentissage',
    description: 'Commence à construire la table des adresses MAC.',
    detail: 'Apprend les adresses MAC, sans transmettre les trames.',
    icon: BookOpen,
    color: 'violet',
    duration: '15 secondes*',
  },
  {
    number: '04',
    name: 'Forwarding',
    subtitle: 'Transmission',
    description: 'Le port devient actif pour le trafic réseau.',
    detail: 'Transmet les trames et apprend les adresses MAC.',
    icon: CheckCircle2,
    color: 'teal',
    duration: 'État opérationnel',
  },
]

const styles = {
  orange: {
    card: 'border-orange-200 bg-orange-50',
    icon: 'bg-orange-100 text-orange-700',
    number: 'text-orange-600',
    line: 'bg-orange-400',
  },
  blue: {
    card: 'border-blue-200 bg-blue-50',
    icon: 'bg-blue-100 text-blue-700',
    number: 'text-blue-600',
    line: 'bg-blue-400',
  },
  violet: {
    card: 'border-violet-200 bg-violet-50',
    icon: 'bg-violet-100 text-violet-700',
    number: 'text-violet-600',
    line: 'bg-violet-400',
  },
  teal: {
    card: 'border-teal-200 bg-teal-50',
    icon: 'bg-teal-100 text-teal-700',
    number: 'text-teal-600',
    line: 'bg-teal-500',
  },
}

export default function PortStates() {
  return (
    <main className="h-full w-full overflow-hidden rounded-3xl bg-white p-6 text-slate-800 shadow-xl">
      <div className="flex h-full flex-col">
        {/* En-tête */}
        <header className="mb-5 shrink-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
              Partie 01 · Fonctionnement
            </span>
            <span className="text-xs text-slate-400">IEEE 802.1D</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight">
            Les états des ports STP
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            STP contrôle l’activité des ports pour construire une topologie sans boucle.
          </p>
        </header>

        {/* Progression des états */}
        <section className="mb-4 shrink-0">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700">
              Cycle de transition d’un port
            </h2>
            <span className="text-[10px] font-semibold text-slate-400">
              STP CLASSIQUE
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {states.map((state, index) => {
              const Icon = state.icon
              const color = styles[state.color]

              return (
                <motion.div
                  key={state.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12 }}
                  className={`relative rounded-2xl border p-3 ${color.card}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`text-xs font-black ${color.number}`}>
                      {state.number}
                    </span>
                    <div className={`rounded-xl p-2 ${color.icon}`}>
                      <Icon size={19} />
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold">{state.name}</h3>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
                    {state.subtitle}
                  </p>

                  <div className={`mt-3 h-1 w-full rounded-full ${color.line}`} />

                  {index < states.length - 1 && (
                    <ArrowRight
                      size={17}
                      className="absolute -right-[15px] top-1/2 z-10 hidden -translate-y-1/2 text-slate-400 lg:block"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Explications */}
        <section className="grid min-h-0 flex-1 grid-cols-2 gap-4">
          <div className="flex flex-col rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Network size={18} className="text-teal-600" />
              <h2 className="text-sm font-bold">Fonctionnement des états</h2>
            </div>

            <div className="space-y-3">
              {states.map((state) => {
                const Icon = state.icon
                const color = styles[state.color]

                return (
                  <div key={state.name} className="flex gap-3">
                    <div className={`mt-0.5 h-fit rounded-lg p-2 ${color.icon}`}>
                      <Icon size={15} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800">
                        {state.name}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                        {state.detail}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <h2 className="text-sm font-bold">Temps de convergence</h2>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-extrabold text-teal-300">
                    30 s
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Listening + Learning
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-3">
                  <Radio size={24} className="text-teal-300" />
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-slate-300">
                Avec les temporisations par défaut du STP classique, ces deux états durent généralement 15 secondes chacun.
              </p>
            </div>

            <div className="flex-1 rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center gap-2">
                <Info size={17} className="text-blue-700" />
                <h2 className="text-sm font-bold text-blue-900">
                  À ne pas confondre
                </h2>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-blue-800">
                <strong>Disabled :</strong> port désactivé ou non opérationnel.
              </p>

              <p className="mt-2 text-xs leading-relaxed text-blue-800">
                <strong>RSTP (802.1w) :</strong> utilise trois états : Discarding, Learning et Forwarding.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <div className="mt-4 flex shrink-0 items-center gap-3 rounded-xl bg-teal-50 px-4 py-3">
          <CheckCircle2 size={19} className="shrink-0 text-teal-600" />
          <p className="text-xs font-semibold text-teal-900">
            Le port passe à Forwarding uniquement lorsqu’il est autorisé à transmettre les données sans créer de boucle.
          </p>
        </div>

        <footer className="mt-3 flex shrink-0 items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span>VLAN & PROTOCOLE STP</span>
          <span className="font-bold tracking-widest">11 / 20</span>
        </footer>
      </div>
    </main>
  )
}
