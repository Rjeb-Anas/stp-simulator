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
import SlideLayout from '../components/SlideLayout'

const states = [
  {
    number: '01',
    name: 'Blocking',
    subtitle: 'Blocage',
    detail: 'Reçoit les BPDU, mais ne transmet pas les données.',
    icon: Lock,
    color: 'amber',
  },
  {
    number: '02',
    name: 'Listening',
    subtitle: 'Écoute (15s)',
    detail: "Ne transmet pas de données et n'apprend pas les adresses MAC.",
    icon: Radio,
    color: 'blue',
  },
  {
    number: '03',
    name: 'Learning',
    subtitle: 'Apprentissage (15s)',
    detail: 'Apprend les adresses MAC, sans transmettre les trames.',
    icon: BookOpen,
    color: 'violet',
  },
  {
    number: '04',
    name: 'Forwarding',
    subtitle: 'Transmission',
    detail: 'Transmet les trames et apprend les adresses MAC.',
    icon: CheckCircle2,
    color: 'teal',
  },
]

const styles = {
  amber: {
    card: 'border-amber-200 bg-amber-50/70',
    icon: 'bg-amber-100 text-amber-700',
    number: 'text-amber-700',
    line: 'bg-amber-400',
  },
  blue: {
    card: 'border-blue-200 bg-blue-50/70',
    icon: 'bg-blue-100 text-blue-700',
    number: 'text-blue-700',
    line: 'bg-blue-500',
  },
  violet: {
    card: 'border-violet-200 bg-violet-50/70',
    icon: 'bg-violet-100 text-violet-700',
    number: 'text-violet-700',
    line: 'bg-violet-500',
  },
  teal: {
    card: 'border-teal-200 bg-teal-50/70',
    icon: 'bg-teal-100 text-teal-700',
    number: 'text-teal-700',
    line: 'bg-teal-600',
  },
}

export default function PortStates() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="IEEE 802.1D"
      title="Les états des ports STP"
      subtitle="STP contrôle la transition des ports pour garantir une topologie sans boucle."
      slideNumber={11}
    >
      {/* Cycle de transition */}
      <section className="mb-4 shrink-0">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            Cycle de transition d'un port
          </h2>
          <span className="text-[11px] font-semibold text-slate-400">
            STP CLASSIQUE
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {states.map((state, index) => {
            const Icon = state.icon
            const color = styles[state.color]

            return (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-xl border p-3.5 ${color.card}`}
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <span className={`text-xs font-black ${color.number}`}>
                    {state.number}
                  </span>
                  <div className={`rounded-lg p-2 ${color.icon}`}>
                    <Icon size={17} />
                  </div>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900">
                  {state.name}
                </h3>
                <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
                  {state.subtitle}
                </p>

                <div className={`mt-3 h-1 w-full rounded-full ${color.line}`} />

                {index < states.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-slate-400 lg:block"
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Explications */}
      <section className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <Network size={17} className="text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Rôle de chaque état
            </h2>
          </div>

          <div className="space-y-3">
            {states.map((state) => {
              const Icon = state.icon
              const color = styles[state.color]

              return (
                <div key={state.name} className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-lg p-1.5 ${color.icon}`}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {state.name}
                    </p>
                    <p className="text-xs text-slate-500">{state.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-white">
            <h2 className="text-sm font-bold">Temps de convergence</h2>
            <div className="mt-2.5 flex items-center justify-between">
              <div>
                <p className="text-2xl font-extrabold text-teal-400">30 s</p>
                <p className="text-[11px] text-slate-400">
                  Listening (15s) + Learning (15s)
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-2.5">
                <Radio size={22} className="text-teal-400" />
              </div>
            </div>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
              Avec les temporisations par défaut du STP classique, la transition
              vers Forwarding prend généralement 30 à 50 secondes.
            </p>
          </div>

          <div className="flex-1 rounded-xl border border-blue-200 bg-blue-50/70 p-4">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-blue-700" />
              <h2 className="text-sm font-bold text-blue-900">
                À ne pas confondre
              </h2>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-blue-900/80">
              <strong>Disabled :</strong> port désactivé administrativement ou
              lien débranché.
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-blue-900/80">
              <strong>RSTP (802.1w) :</strong> simplifie en 3 états :
              Discarding, Learning et Forwarding.
            </p>
          </div>
        </div>
      </section>
    </SlideLayout>
  )
}
