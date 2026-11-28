import {
  Network,
  Server,
  Monitor,
  Cable,
  ShieldCheck,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'
import { SwitchNode } from '../components/SimulationLayout'

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

          <div className="flex min-h-[220px] flex-1 items-center rounded-xl border border-slate-100 bg-white p-2">
            <svg viewBox="0 0 540 315" className="w-full" role="img">
              <defs>
                <pattern id="grid-topo" width="22" height="22" patternUnits="userSpaceOnUse">
                  <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="540" height="315" fill="url(#grid-topo)" />

              <line x1="270" y1="68" x2="115" y2="238" stroke="#3B82F6" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="270" y1="68" x2="425" y2="238" stroke="#3B82F6" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="115" y1="238" x2="425" y2="238" stroke="#3B82F6" strokeWidth="4.5" strokeLinecap="round" />

              <rect x="148" y="138" width="84" height="22" rx="6" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="190" y="153" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1E40AF">Trunk 802.1Q</text>

              <rect x="308" y="138" width="84" height="22" rx="6" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="350" y="153" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1E40AF">Trunk 802.1Q</text>

              <rect x="228" y="227" width="84" height="22" rx="6" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="270" y="242" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1E40AF">Trunk 802.1Q</text>

              <SwitchNode x={270} y={68} name="SW1" mac="00:1A:01" priority="4096" isRoot cpu={11} status="root" ports={['up', 'up']} />
              <SwitchNode x={115} y={238} name="SW2" mac="00:1A:02" priority="32768" cpu={12} status="normal" ports={['up', 'up']} />
              <SwitchNode x={425} y={238} name="SW3" mac="00:1A:03" priority="32768" cpu={12} status="normal" ports={['up', 'up']} />

              <text x="270" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748B">
                VLAN 10 (Admin) · VLAN 20 (Étudiants) · VLAN 30 (Serveurs)
              </text>
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
