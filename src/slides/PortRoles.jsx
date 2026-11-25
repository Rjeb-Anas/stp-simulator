
import { motion } from 'framer-motion'
import { Network, Crown, Route, ShieldCheck } from 'lucide-react'

const roles = [
  {
    name: 'Root Port (RP)',
    description: 'Port offrant le meilleur chemin vers le Root Bridge.',
    color: 'blue',
    icon: Route,
  },
  {
    name: 'Designated Port (DP)',
    description: 'Port qui transmet les trames sur un segment réseau.',
    color: 'teal',
    icon: Network,
  },
  {
    name: 'Non-Designated Port',
    description: 'Port redondant placé en état bloqué pour éviter les boucles.',
    color: 'orange',
    icon: ShieldCheck,
  },
]

export default function PortRoles() {
  return (
    <main className="h-full w-full overflow-hidden rounded-3xl bg-white p-6 text-slate-800 shadow-xl">
      <div className="flex h-full flex-col">
        <header className="mb-4 shrink-0">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
            Partie 01 · Fonctionnement
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Les rôles des ports STP
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Chaque port reçoit un rôle selon sa position dans la topologie sans boucle.
          </p>
        </header>

        <section className="grid min-h-0 flex-1 grid-cols-2 gap-5">
          <div className="flex flex-col justify-center rounded-2xl bg-slate-50 p-4">
            <h2 className="mb-3 text-sm font-bold text-slate-700">
              Exemple de topologie
            </h2>

            <svg viewBox="0 0 440 300" className="w-full" role="img">
              <line x1="220" y1="65" x2="90" y2="235" stroke="#0D9488" strokeWidth="5" />
              <line x1="220" y1="65" x2="350" y2="235" stroke="#0D9488" strokeWidth="5" />
              <line x1="90" y1="235" x2="350" y2="235" stroke="#FB923C" strokeWidth="5" strokeDasharray="9 7" />

              <rect x="157" y="25" width="126" height="64" rx="14" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" />
              <text x="220" y="51" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#115E59">SW1</text>
              <text x="220" y="70" textAnchor="middle" fontSize="10" fill="#0F766E">Root Bridge</text>

              <rect x="27" y="205" width="126" height="64" rx="14" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
              <text x="90" y="231" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1E40AF">SW2</text>
              <text x="90" y="250" textAnchor="middle" fontSize="10" fill="#1D4ED8">Switch</text>

              <rect x="287" y="205" width="126" height="64" rx="14" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
              <text x="350" y="231" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1E40AF">SW3</text>
              <text x="350" y="250" textAnchor="middle" fontSize="10" fill="#1D4ED8">Switch</text>

              <rect x="115" y="119" width="52" height="25" rx="7" fill="#DBEAFE" />
              <text x="141" y="136" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1D4ED8">DP</text>

              <rect x="273" y="119" width="52" height="25" rx="7" fill="#DBEAFE" />
              <text x="299" y="136" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1D4ED8">DP</text>

              <rect x="42" y="153" width="52" height="25" rx="7" fill="#CCFBF1" />
              <text x="68" y="170" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">RP</text>

              <rect x="346" y="153" width="52" height="25" rx="7" fill="#CCFBF1" />
              <text x="372" y="170" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">RP</text>

              <rect x="194" y="214" width="52" height="25" rx="7" fill="#FFEDD5" />
              <text x="220" y="231" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#C2410C">Bloqué</text>
            </svg>

            <div className="mt-2 flex flex-wrap justify-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-teal-500" /> Root Port</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Designated Port</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-400" /> Bloqué</span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3">
            {roles.map((role, index) => {
              const Icon = role.icon
              const styles = {
                blue: 'bg-blue-50 border-blue-200 text-blue-700',
                teal: 'bg-teal-50 border-teal-200 text-teal-700',
                orange: 'bg-orange-50 border-orange-200 text-orange-700',
              }

              return (
                <motion.div
                  key={role.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`rounded-xl border p-4 ${styles[role.color]}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/80 p-2">
                      <Icon size={21} />
                    </div>
                    <h3 className="text-sm font-extrabold">{role.name}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {role.description}
                  </p>
                </motion.div>
              )
            })}

            <div className="rounded-xl bg-slate-900 p-3 text-white">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Crown size={16} className="text-yellow-400" />
                Objectif de STP
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Conserver un seul chemin actif par segment tout en gardant des liens redondants.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-4 flex shrink-0 items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span>VLAN & PROTOCOLE STP</span>
          <span className="font-bold tracking-widest">10 / 20</span>
        </footer>
      </div>
    </main>
  )
}
