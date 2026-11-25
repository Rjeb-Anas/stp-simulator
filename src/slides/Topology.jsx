
import { motion } from 'framer-motion'
import {
  Network,
  Server,
  Monitor,
  ArrowDown,
  Cable,
  ShieldCheck,
} from 'lucide-react'

function Switch({ name, x, y, root = false }) {
  return (
    <g>
      <rect
        x={x - 57}
        y={y - 29}
        width="114"
        height="58"
        rx="12"
        fill={root ? '#CCFBF1' : '#DBEAFE'}
        stroke={root ? '#0D9488' : '#3B82F6'}
        strokeWidth="2"
      />
      <text
        x={x}
        y={y - 3}
        textAnchor="middle"
        fontSize="15"
        fontWeight="bold"
        fill={root ? '#115E59' : '#1E40AF'}
      >
        {name}
      </text>
      <text
        x={x}
        y={y + 15}
        textAnchor="middle"
        fontSize="10"
        fill="#64748B"
      >
        {root ? 'Root Bridge prévu' : 'Switch'}
      </text>
    </g>
  )
}

export default function Topology() {
  return (
    <main className="h-full w-full overflow-hidden rounded-3xl bg-white p-6 text-slate-800 shadow-xl">
      <div className="flex h-full flex-col">
        <header className="mb-4 shrink-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
              Partie 02 · Simulation
            </span>
            <span className="text-xs text-slate-400">Environnement réseau</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight">
            Présentation de la topologie réseau
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Une architecture composée de trois switches avec des liaisons redondantes.
          </p>
        </header>

        <section className="grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] gap-5">
          {/* Schéma réseau */}
          <div className="flex min-h-0 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold">Schéma de la topologie</h2>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-slate-500">
                3 switches · 3 liens
              </span>
            </div>

            <div className="flex min-h-0 flex-1 items-center">
              <svg viewBox="0 0 520 340" className="w-full" role="img">
                {/* Liens entre switches */}
                <line x1="260" y1="76" x2="105" y2="244" stroke="#64748B" strokeWidth="5" />
                <line x1="260" y1="76" x2="415" y2="244" stroke="#64748B" strokeWidth="5" />
                <line x1="105" y1="244" x2="415" y2="244" stroke="#64748B" strokeWidth="5" />

                {/* Étiquettes des liens */}
                <rect x="135" y="133" width="64" height="24" rx="7" fill="white" stroke="#CBD5E1" />
                <text x="167" y="149" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Trunk</text>

                <rect x="322" y="133" width="64" height="24" rx="7" fill="white" stroke="#CBD5E1" />
                <text x="354" y="149" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Trunk</text>

                <rect x="228" y="228" width="64" height="24" rx="7" fill="white" stroke="#CBD5E1" />
                <text x="260" y="244" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Trunk</text>

                {/* Switches */}
                <Switch name="SW1" x={260} y={76} root />
                <Switch name="SW2" x={105} y={244} />
                <Switch name="SW3" x={415} y={244} />

                {/* Légende */}
                <rect x="20" y="300" width="480" height="27" rx="8" fill="white" stroke="#E2E8F0" />
                <circle cx="38" cy="313" r="5" fill="#0D9488" />
                <text x="50" y="317" fontSize="10" fill="#475569">SW1 : Root Bridge prévu pour l'exemple</text>
                <circle cx="300" cy="313" r="5" fill="#64748B" />
                <text x="312" y="317" fontSize="10" fill="#475569">Liaisons Trunk</text>
              </svg>
            </div>

            <p className="mt-1 text-center text-[11px] text-slate-400">
              Les trois liaisons forment une boucle physique de niveau 2.
            </p>
          </div>

          {/* Informations */}
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Network size={18} className="text-teal-600" />
                <h2 className="text-sm font-bold">Équipements</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-teal-50 p-2 text-teal-700">
                    <Server size={17} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">3 switches</p>
                    <p className="text-[10px] text-slate-500">SW1, SW2 et SW3</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                    <Cable size={17} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">3 liens Trunk</p>
                    <p className="text-[10px] text-slate-500">Transport des VLAN</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-violet-50 p-2 text-violet-700">
                    <Monitor size={17} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Postes clients</p>
                    <p className="text-[10px] text-slate-500">Connectés aux switches</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 rounded-2xl border border-slate-200 p-4">
              <h2 className="mb-3 text-sm font-bold">VLAN du réseau</h2>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
                  <span className="text-xs font-semibold text-blue-800">VLAN 10</span>
                  <span className="text-xs text-blue-700">Administration</span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-teal-50 px-3 py-2">
                  <span className="text-xs font-semibold text-teal-800">VLAN 20</span>
                  <span className="text-xs text-teal-700">Étudiants</span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-violet-50 px-3 py-2">
                  <span className="text-xs font-semibold text-violet-800">VLAN 30</span>
                  <span className="text-xs text-violet-700">Serveurs</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-orange-50 p-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-orange-700" />
                <p className="text-xs font-bold text-orange-800">
                  Objectif de la simulation
                </p>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-orange-700">
                Observer le comportement du réseau avec STP désactivé puis activé.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-4 flex shrink-0 items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span>VLAN & PROTOCOLE STP</span>
          <span className="font-bold tracking-widest">13 / 20</span>
        </footer>
      </div>
    </main>
  )
}
