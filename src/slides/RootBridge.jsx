
import { motion } from 'framer-motion'
import { Crown, Network, CheckCircle2, ArrowDown } from 'lucide-react'

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
    <main className="h-full w-full overflow-hidden rounded-3xl bg-white p-6 text-slate-800 shadow-xl">
      <div className="flex h-full flex-col">
        <header className="mb-5 shrink-0">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
            Partie 01 · Fonctionnement
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            L’élection du Root Bridge
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            STP sélectionne un commutateur racine pour construire une topologie sans boucle.
          </p>
        </header>

        <section className="grid min-h-0 flex-1 grid-cols-2 gap-5">
          <div className="flex flex-col rounded-2xl bg-slate-50 p-4">
            <h2 className="mb-3 text-sm font-bold text-slate-700">
              Comparaison des Bridge ID
            </h2>

            <div className="space-y-3">
              {switches.map((sw, index) => (
                <motion.div
                  key={sw.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`rounded-xl border p-3 ${
                    sw.winner
                      ? 'border-teal-400 bg-teal-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{sw.name}</span>
                    {sw.winner && (
                      <span className="flex items-center gap-1 text-xs font-bold text-teal-700">
                        <Crown size={14} /> Root Bridge
                      </span>
                    )}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-slate-400">Priorité</p>
                      <p className="font-bold tabular-nums">{sw.priority}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Adresse MAC</p>
                      <p className="font-mono text-[10px] font-semibold">
                        {sw.mac}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto rounded-xl bg-teal-600 p-3 text-white">
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 size={17} />
                SW3 est élu Root Bridge
              </div>
              <p className="mt-1 text-xs text-teal-50">
                Sa priorité (4096) est la plus faible.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 p-4">
            <div>
              <h2 className="mb-3 text-sm font-bold text-slate-700">
                Comment se déroule l’élection ?
              </h2>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-bold">Échange des BPDU</p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      Les switches échangent leurs identifiants Bridge ID.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-bold">Comparaison des identifiants</p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      Le Bridge ID le plus faible est préféré.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-bold">Désignation du Root Bridge</p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      Le switch gagnant devient la référence de l’arbre STP.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-orange-50 p-3">
              <p className="text-xs font-bold text-orange-800">
                Règle de comparaison
              </p>
              <p className="mt-1 text-xs leading-relaxed text-orange-700">
                1. Priorité la plus faible
                <br />
                2. En cas d’égalité : adresse MAC la plus faible
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-4 flex shrink-0 items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span>VLAN & PROTOCOLE STP</span>
          <span className="font-bold tracking-widest">09 / 20</span>
        </footer>
      </div>
    </main>
  )
}
