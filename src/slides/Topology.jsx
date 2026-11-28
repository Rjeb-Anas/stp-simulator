import {
  Network,
  Server,
  Monitor,
  Cable,
  ShieldCheck,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

function SwitchNode({ name, x, y, root = false }) {
  return (
    <g>
      <rect
        x={x - 55}
        y={y - 27}
        width="110"
        height="54"
        rx="10"
        fill={root ? '#F0FDFA' : '#EFF6FF'}
        stroke={root ? '#0D9488' : '#2563EB'}
        strokeWidth="2"
      />
      <text
        x={x}
        y={y - 2}
        textAnchor="middle"
        fontSize="14"
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
    <SlideLayout
      section="Partie 02 · Simulation"
      badge="Environnement réseau"
      title="Présentation de la topologie réseau"
      subtitle="Une architecture composée de trois switches reliés par des liaisons redondantes."
      slideNumber={13}
      accent="blue"
    >
      <section className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Schéma réseau */}
        <div className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">
              Schéma de la topologie
            </h2>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
              3 switches · 3 liens
            </span>
          </div>

          <div className="flex min-h-[210px] flex-1 items-center rounded-xl border border-slate-100 bg-white p-2">
            <svg viewBox="0 0 520 330" className="w-full" role="img">
              <line x1="260" y1="70" x2="105" y2="235" stroke="#64748B" strokeWidth="4.5" />
              <line x1="260" y1="70" x2="415" y2="235" stroke="#64748B" strokeWidth="4.5" />
              <line x1="105" y1="235" x2="415" y2="235" stroke="#64748B" strokeWidth="4.5" />

              <rect x="135" y="128" width="64" height="22" rx="6" fill="white" stroke="#CBD5E1" />
              <text x="167" y="143" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Trunk</text>

              <rect x="322" y="128" width="64" height="22" rx="6" fill="white" stroke="#CBD5E1" />
              <text x="354" y="143" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Trunk</text>

              <rect x="228" y="220" width="64" height="22" rx="6" fill="white" stroke="#CBD5E1" />
              <text x="260" y="235" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Trunk</text>

              <SwitchNode name="SW1" x={260} y={70} root />
              <SwitchNode name="SW2" x={105} y={235} />
              <SwitchNode name="SW3" x={415} y={235} />

              <rect x="20" y="292" width="480" height="26" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
              <circle cx="38" cy="305" r="5" fill="#0D9488" />
              <text x="50" y="309" fontSize="10" fill="#475569">SW1 : Root Bridge prévu</text>
              <circle cx="280" cy="305" r="5" fill="#64748B" />
              <text x="292" y="309" fontSize="10" fill="#475569">Liaisons Trunk 802.1Q</text>
            </svg>
          </div>

          <p className="mt-2 text-center text-xs text-slate-500">
            Les trois liaisons forment une boucle physique de niveau 2.
          </p>
        </div>

        {/* Informations */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <Network size={17} className="text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900">Équipements</h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: Server,
                  bg: 'bg-teal-50 text-teal-700',
                  title: '3 switches',
                  sub: 'SW1, SW2 et SW3',
                },
                {
                  icon: Cable,
                  bg: 'bg-blue-50 text-blue-700',
                  title: '3 liens Trunk',
                  sub: 'Transport multi-VLAN',
                },
                {
                  icon: Monitor,
                  bg: 'bg-violet-50 text-violet-700',
                  title: 'Postes clients',
                  sub: 'Connectés aux ports Access',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${item.bg}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-bold text-slate-900">
              VLAN du réseau
            </h2>

            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-blue-200/70 bg-blue-50/70 px-3 py-2">
                <span className="text-xs font-bold text-blue-800">VLAN 10</span>
                <span className="text-xs text-blue-700">Administration</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-teal-200/70 bg-teal-50/70 px-3 py-2">
                <span className="text-xs font-bold text-teal-800">VLAN 20</span>
                <span className="text-xs text-teal-700">Étudiants</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-violet-200/70 bg-violet-50/70 px-3 py-2">
                <span className="text-xs font-bold text-violet-800">
                  VLAN 30
                </span>
                <span className="text-xs text-violet-700">Serveurs</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-700" />
              <p className="text-xs font-bold text-amber-900">
                Objectif de la simulation
              </p>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-amber-800/80">
              Observer le comportement du réseau sans STP puis avec STP activé.
            </p>
          </div>
        </div>
      </section>
    </SlideLayout>
  )
}
