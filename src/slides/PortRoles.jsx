import { motion } from 'framer-motion'
import { Network, Crown, Route, ShieldCheck } from 'lucide-react'
import SlideLayout from '../components/SlideLayout'
import { SwitchNode, PortBadge } from '../components/SimulationLayout'

const roles = [
  {
    name: 'Root Port (RP)',
    description: 'Port offrant le meilleur chemin vers le Root Bridge.',
    color: 'teal',
    icon: Route,
  },
  {
    name: 'Designated Port (DP)',
    description: 'Port qui transmet les trames sur un segment réseau.',
    color: 'blue',
    icon: Network,
  },
  {
    name: 'Non-Designated Port (BLK)',
    description: 'Port redondant placé en état bloqué pour éviter les boucles.',
    color: 'amber',
    icon: ShieldCheck,
  },
]

export default function PortRoles() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="Rôles STP"
      title="Les rôles des ports STP"
      subtitle="Chaque port reçoit un rôle précis selon sa position dans la topologie sans boucle."
      slideNumber={10}
    >
      <section className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Topologie */}
        <div className="flex flex-col justify-center rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <h2 className="mb-3 text-sm font-bold text-slate-800">
            Exemple de répartition des rôles
          </h2>

          <div className="rounded-xl border border-slate-100 bg-white p-2">
            <svg viewBox="0 0 540 310" className="w-full" role="img">
              <defs>
                <pattern id="grid-roles" width="22" height="22" patternUnits="userSpaceOnUse">
                  <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="540" height="310" fill="url(#grid-roles)" />

              <line x1="270" y1="68" x2="115" y2="242" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="270" y1="68" x2="425" y2="242" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="115" y1="242" x2="425" y2="242" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="8 6" strokeLinecap="round" />

              <PortBadge x={210} y={118} port="Gi0/1" role="DP" state="fwd" />
              <PortBadge x={330} y={118} port="Gi0/2" role="DP" state="fwd" />
              <PortBadge x={168} y={180} port="Gi0/1" role="RP" state="fwd" />
              <PortBadge x={372} y={180} port="Gi0/1" role="RP" state="fwd" />
              <PortBadge x={208} y={242} port="Gi0/2" role="DP" state="fwd" />
              <PortBadge x={332} y={242} port="Gi0/2" role="BLK" state="blk" />

              <SwitchNode x={270} y={68} name="SW1" mac="00:1A:01" priority="4096" isRoot cpu={11} status="root" ports={['up', 'up']} />
              <SwitchNode x={115} y={242} name="SW2" mac="00:1A:02" priority="32768" cpu={12} status="normal" ports={['up', 'up']} />
              <SwitchNode x={425} y={242} name="SW3" mac="00:1A:03" priority="32768" cpu={10} status="normal" ports={['up', 'blk']} />
            </svg>
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-600" /> Root Port
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Designated Port
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Bloqué
            </span>
          </div>
        </div>

        {/* Cartes de rôles */}
        <div className="flex flex-col justify-center gap-3">
          {roles.map((role, index) => {
            const Icon = role.icon
            const styles = {
              blue: 'bg-blue-50/70 border-blue-200 text-blue-800',
              teal: 'bg-teal-50/70 border-teal-200 text-teal-800',
              amber: 'bg-amber-50/70 border-amber-200 text-amber-800',
            }

            return (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12 }}
                className={`rounded-xl border p-4 ${styles[role.color]}`}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2 shadow-xs">
                    <Icon size={19} />
                  </div>
                  <h3 className="text-sm font-extrabold">{role.name}</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {role.description}
                </p>
              </motion.div>
            )
          })}

          <div className="rounded-xl border border-slate-200 border-l-4 border-l-teal-600 bg-slate-50 p-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 sm:text-sm">
              <Crown size={15} className="text-teal-600" />
              Objectif de STP
            </div>
            <p className="mt-1 text-xs text-slate-600">
              Conserver un seul chemin actif par segment tout en gardant des
              liens redondants prêts en secours.
            </p>
          </div>
        </div>
      </section>
    </SlideLayout>
  )
}
