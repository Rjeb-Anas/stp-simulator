import { motion } from 'framer-motion'
import { Crown, CheckCircle2 } from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

const switches = [
  {
    name: 'SW1',
    priority: 32768,
    mac: '00:11:22:33:44:01',
    winner: false,
  },
  {
    name: 'SW2',
    priority: 32768,
    mac: '00:11:22:33:44:02',
    winner: false,
  },
  {
    name: 'SW3',
    priority: 4096,
    mac: '00:11:22:33:44:03',
    winner: true,
  },
]

export default function RootBridge() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="Élection"
      title="L'élection du Root Bridge"
      subtitle="STP sélectionne un commutateur racine pour construire une topologie sans boucle."
      slideNumber={9}
    >
      <section className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Comparaison des Bridge ID */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <h2 className="mb-3 text-sm font-bold text-slate-800">
            Comparaison des Bridge ID (Priorité + MAC)
          </h2>

          <div className="space-y-3">
            {switches.map((sw, index) => (
              <motion.div
                key={sw.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12 }}
                className={`rounded-xl border p-3.5 ${
                  sw.winner
                    ? 'border-teal-400 bg-teal-50/80'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">
                    {sw.name}
                  </span>
                  {sw.winner && (
                    <span className="flex items-center gap-1 rounded-full bg-teal-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                      <Crown size={12} /> Root Bridge
                    </span>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-slate-400">Priorité</p>
                    <p className="font-bold tabular-nums text-slate-800">
                      {sw.priority}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Adresse MAC</p>
                    <p className="font-mono text-[11px] font-semibold text-slate-700">
                      {sw.mac}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto pt-3">
            <div className="rounded-xl bg-teal-600 p-3.5 text-white">
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 size={17} />
                SW3 est élu Root Bridge
              </div>
              <p className="mt-1 text-xs text-teal-50">
                Sa priorité (4096) est la plus faible du réseau.
              </p>
            </div>
          </div>
        </div>

        {/* Déroulement de l'élection */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <h2 className="mb-4 text-sm font-bold text-slate-800">
              Comment se déroule l'élection ?
            </h2>

            <div className="space-y-4">
              {[
                {
                  num: '1',
                  title: 'Échange des BPDU',
                  text: 'Tous les switches annoncent leur propre Bridge ID.',
                },
                {
                  num: '2',
                  title: 'Comparaison des identifiants',
                  text: 'Le Bridge ID le plus faible est systématiquement préféré.',
                },
                {
                  num: '3',
                  title: 'Désignation du Root Bridge',
                  text: "Le switch gagnant devient la référence centrale de l'arbre STP.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700 border border-blue-200">
                    {step.num}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Règle de comparaison
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-amber-900/80 sm:text-sm">
              1. Priorité la plus faible (par défaut 32768)
              <br />
              2. En cas d'égalité : adresse MAC la plus faible
            </p>
          </div>
        </div>
      </section>
    </SlideLayout>
  )
}
