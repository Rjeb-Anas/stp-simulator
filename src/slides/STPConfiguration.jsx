import { motion } from 'framer-motion'
import { Crown, Terminal, Network, Info } from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

const commands = [
  {
    name: 'SW1 — Root Bridge',
    color: 'border-t-teal-500',
    badge: 'Priorité 4096',
    code: `enable
configure terminal
spanning-tree vlan 10,20,30 priority 4096
end`,
    description:
      'On attribue une priorité faible à SW1 pour garantir son élection comme Root Bridge.',
  },
  {
    name: 'SW2 — Switch secondaire',
    color: 'border-t-blue-500',
    badge: 'Priorité 32768',
    code: `enable
configure terminal
spanning-tree vlan 10,20,30 priority 32768
end`,
    description: 'SW2 conserve la priorité par défaut, plus élevée que SW1.',
  },
  {
    name: 'SW3 — Switch secondaire',
    color: 'border-t-amber-500',
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
    <SlideLayout
      section="Partie 02 · Simulation"
      badge="Cisco IOS"
      title="Configuration du protocole STP"
      subtitle="Définir le Root Bridge et vérifier le fonctionnement de Spanning Tree."
      slideNumber={15}
      accent="blue"
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {commands.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex min-h-0 flex-col rounded-xl border border-slate-200 border-t-4 bg-white p-4 ${item.color}`}
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-slate-900">{item.name}</h2>
              <span className="whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                {item.badge}
              </span>
            </div>

            <div className="flex-1 rounded-xl bg-slate-900 p-3.5">
              <div className="mb-2.5 flex items-center gap-2 border-b border-white/10 pb-2 text-xs text-slate-400">
                <Terminal size={13} className="text-emerald-400" />
                Cisco IOS
              </div>
              <pre className="whitespace-pre-wrap font-mono text-[11px] leading-6 text-emerald-300">
                {item.code}
              </pre>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid shrink-0 grid-cols-1 gap-3 md:grid-cols-[1.2fr_1fr]">
        <div className="flex items-center gap-3 rounded-xl border border-teal-200 bg-teal-50/70 p-3.5">
          <Crown className="shrink-0 text-teal-700" size={21} />
          <div>
            <p className="text-xs font-bold text-teal-900 sm:text-sm">
              Vérifier le Root Bridge
            </p>
            <code className="font-mono text-xs text-teal-800">
              show spanning-tree vlan 10
            </code>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-3.5">
          <Network className="shrink-0 text-blue-700" size={21} />
          <div>
            <p className="text-xs font-bold text-blue-900 sm:text-sm">
              Vérifier l'état global
            </p>
            <code className="font-mono text-xs text-blue-800">
              show spanning-tree
            </code>
          </div>
        </div>
      </div>

      <div className="mt-3 flex shrink-0 items-start gap-2 text-xs text-slate-500">
        <Info size={14} className="mt-0.5 shrink-0 text-slate-400" />
        <p>
          Une priorité plus faible favorise l'élection. SW1 devient Root Bridge
          si aucun autre switch ne possède un Bridge ID inférieur.
        </p>
      </div>
    </SlideLayout>
  )
}
