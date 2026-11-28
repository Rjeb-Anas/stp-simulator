import { motion } from 'framer-motion'
import { Network, Crown, Route, ShieldCheck } from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

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
            <svg viewBox="0 0 440 285" className="w-full" role="img">
              <line x1="220" y1="60" x2="90" y2="225" stroke="#0D9488" strokeWidth="4.5" />
              <line x1="220" y1="60" x2="350" y2="225" stroke="#0D9488" strokeWidth="4.5" />
              <line x1="90" y1="225" x2="350" y2="225" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="8 6" />

              <rect x="157" y="20" width="126" height="58" rx="12" fill="#F0FDFA" stroke="#0D9488" strokeWidth="2" />
              <text x="220" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#115E59">SW1</text>
              <text x="220" y="63" textAnchor="middle" fontSize="10" fill="#0F766E">Root Bridge</text>

              <rect x="27" y="195" width="126" height="58" rx="12" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
              <text x="90" y="220" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1E40AF">SW2</text>
              <text x="90" y="238" textAnchor="middle" fontSize="10" fill="#1D4ED8">Switch</text>

              <rect x="287" y="195" width="126" height="58" rx="12" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
              <text x="350" y="220" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1E40AF">SW3</text>
              <text x="350" y="238" textAnchor="middle" fontSize="10" fill="#1D4ED8">Switch</text>

              <rect x="115" y="110" width="46" height="24" rx="6" fill="#DBEAFE" />
              <text x="138" y="126" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1D4ED8">DP</text>

              <rect x="279" y="110" width="46" height="24" rx="6" fill="#DBEAFE" />
              <text x="302" y="126" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1D4ED8">DP</text>

              <rect x="44" y="145" width="46" height="24" rx="6" fill="#CCFBF1" />
              <text x="67" y="161" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">RP</text>

              <rect x="350" y="145" width="46" height="24" rx="6" fill="#CCFBF1" />
              <text x="373" y="161" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">RP</text>

              <rect x="190" y="212" width="60" height="24" rx="6" fill="#FEF3C7" stroke="#F59E0B" />
              <text x="220" y="228" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#B45309">Bloqué</text>
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
