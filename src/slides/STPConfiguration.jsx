
import { motion } from 'framer-motion'
import { ShieldCheck, Crown, Terminal, Network, Info } from 'lucide-react'

const commands = [
  {
    name: 'SW1 — Root Bridge',
    color: 'border-teal-400',
    badge: 'Priorité 4096',
    code: `enable
configure terminal
spanning-tree vlan 10,20,30 priority 4096
end`,
    description: 'On donne une priorité faible à SW1 pour favoriser son élection comme Root Bridge.',
  },
  {
    name: 'SW2 — Switch secondaire',
    color: 'border-blue-400',
    badge: 'Priorité 32768',
    code: `enable
configure terminal
spanning-tree vlan 10,20,30 priority 32768
end`,
    description: 'SW2 conserve une priorité plus élevée que SW1.',
  },
  {
    name: 'SW3 — Switch secondaire',
    color: 'border-orange-400',
    badge: 'Priorité 32768',
    code: `enable
configure terminal
spanning-tree vlan 10,20,30 priority 32768
end`,
    description: 'SW3 conserve également une priorité plus élevée que SW1.',
  },
]

export default function STPConfiguration() {
  return (
    <div className="h-full w-full overflow-hidden bg-slate-50 px-7 py-5 flex flex-col">
      <div className="shrink-0 mb-4">
        <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-widest">
          <ShieldCheck size={15} />
          Partie 02 · Simulation
        </div>

        <h1 className="text-3xl font-black text-slate-900 mt-2">
          Configuration du protocole STP
        </h1>

        <p className="text-slate-500 text-sm mt-1">
          Définir le Root Bridge et vérifier le fonctionnement de Spanning Tree.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        {commands.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 }}
            className={`bg-white rounded-2xl border border-slate-200 border-t-4 ${item.color} p-4 flex flex-col min-h-0 shadow-sm`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="font-bold text-slate-800 text-sm">
                {item.name}
              </h2>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-lg whitespace-nowrap">
                {item.badge}
              </span>
            </div>

            <div className="bg-slate-900 rounded-xl p-3 flex-1 min-h-0">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                <Terminal size={14} />
                Cisco IOS
              </div>
              <pre className="text-[11px] leading-6 text-emerald-300 whitespace-pre-wrap">
                {item.code}
              </pre>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mt-3">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="shrink-0 mt-4 grid grid-cols-[1.2fr_1fr] gap-4">
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 flex items-center gap-3">
          <Crown className="text-teal-700 shrink-0" size={23} />
          <div>
            <p className="font-bold text-teal-900 text-sm">Vérifier le Root Bridge</p>
            <code className="text-xs text-teal-800">show spanning-tree vlan 10</code>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center gap-3">
          <Network className="text-blue-700 shrink-0" size={23} />
          <div>
            <p className="font-bold text-blue-900 text-sm">Vérifier les VLAN</p>
            <code className="text-xs text-blue-800">show spanning-tree</code>
          </div>
        </div>
      </div>

      <div className="shrink-0 mt-3 flex items-start gap-2 text-[11px] text-slate-500">
        <Info size={14} className="shrink-0 mt-0.5" />
        <p>
          Une priorité plus faible favorise l’élection. SW1 devient Root Bridge
          si aucun autre switch ne possède un Bridge ID inférieur.
          La configuration est à adapter au mode STP utilisé sur les équipements.
        </p>
      </div>

      <div className="shrink-0 mt-3 pt-2 border-t border-slate-200 flex justify-between text-[10px] text-slate-400 font-semibold">
        <span>VLAN & PROTOCOLE STP</span>
        <span>15 / 20</span>
      </div>
    </div>
  )
}
