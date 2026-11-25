
import { motion } from 'framer-motion'
import {
  Terminal,
  Network,
  Cable,
  Monitor,
  CheckCircle2,
  Layers3,
  ArrowRight,
  Server,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Créer les VLAN',
    subtitle: 'Sur chaque switch',
    color: 'blue',
    code: `enable
configure terminal
vlan 10
 name ADMIN
vlan 20
 name ETUDIANTS
vlan 30
 name SERVEURS`,
  },
  {
    number: '02',
    title: 'Affecter les ports',
    subtitle: 'Exemple : port Fa0/1',
    color: 'teal',
    code: `interface fa0/1
 switchport mode access
 switchport access vlan 10
exit`,
  },
  {
    number: '03',
    title: 'Configurer les Trunk',
    subtitle: 'Entre les switches',
    color: 'violet',
    code: `interface fa0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
exit`,
  },
]

const styles = {
  blue: {
    header: 'bg-blue-50 text-blue-800',
    number: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200',
  },
  teal: {
    header: 'bg-teal-50 text-teal-800',
    number: 'bg-teal-100 text-teal-700',
    border: 'border-teal-200',
  },
  violet: {
    header: 'bg-violet-50 text-violet-800',
    number: 'bg-violet-100 text-violet-700',
    border: 'border-violet-200',
  },
}

export default function VLANConfiguration() {
  return (
    <main className="h-full w-full overflow-hidden rounded-3xl bg-white p-6 text-slate-800 shadow-xl">
      <div className="flex h-full flex-col">
        {/* HEADER */}
        <header className="mb-5 shrink-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
              Partie 02 · Simulation
            </span>
            <span className="text-xs text-slate-400">
              Configuration Cisco IOS
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight">
            Configuration des VLAN
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Création des VLAN, affectation des ports et mise en place des liaisons Trunk.
          </p>
        </header>

        {/* VLAN TABLE */}
        <section className="mb-4 shrink-0">
          <div className="mb-2 flex items-center gap-2">
            <Layers3 size={17} className="text-teal-600" />
            <h2 className="text-sm font-bold">Plan d'adressage logique</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
                <Monitor size={19} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-blue-800">VLAN 10</p>
                <p className="text-[11px] text-blue-700">ADMIN</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-teal-200 bg-teal-50 p-3">
              <div className="rounded-lg bg-teal-100 p-2 text-teal-700">
                <Monitor size={19} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-teal-800">VLAN 20</p>
                <p className="text-[11px] text-teal-700">ÉTUDIANTS</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 p-3">
              <div className="rounded-lg bg-violet-100 p-2 text-violet-700">
                <Server size={19} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-violet-800">VLAN 30</p>
                <p className="text-[11px] text-violet-700">SERVEURS</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONFIGURATION STEPS */}
        <section className="grid min-h-0 flex-1 grid-cols-3 gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border ${styles[step.color].border}`}
            >
              <div className={`flex items-center gap-3 px-3 py-3 ${styles[step.color].header}`}>
                <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black ${styles[step.color].number}`}>
                  {step.number}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xs font-extrabold">{step.title}</h3>
                  <p className="mt-0.5 text-[10px] opacity-70">{step.subtitle}</p>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col bg-slate-950 p-3">
                <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                  <Terminal size={14} className="text-emerald-400" />
                  <span className="text-[10px] font-semibold text-slate-400">
                    SWITCH#
                  </span>
                  <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
                </div>

                <pre className="whitespace-pre-wrap break-words font-mono text-[10px] leading-[1.8] text-emerald-300">
                  {step.code}
                </pre>
              </div>
            </motion.div>
          ))}
        </section>

        {/* NETWORK AND VERIFICATION */}
        <section className="mt-4 grid shrink-0 grid-cols-[1.2fr_1fr] gap-3">
          <div className="rounded-xl border border-slate-200 p-3">
            <div className="mb-2 flex items-center gap-2">
              <Network size={16} className="text-teal-600" />
              <h2 className="text-xs font-bold">Communication entre switches</h2>
            </div>

            <div className="flex items-center justify-between gap-2">
              {['SW1', 'SW2', 'SW3'].map((name, index) => (
                <div key={name} className="flex flex-1 items-center gap-1">
                  <div className="flex-1 rounded-lg bg-slate-100 px-2 py-2 text-center">
                    <Network size={15} className="mx-auto text-slate-600" />
                    <p className="mt-1 text-[10px] font-bold">{name}</p>
                  </div>
                  {index < 2 && (
                    <div className="flex flex-col items-center">
                      <Cable size={14} className="text-violet-600" />
                      <span className="text-[8px] font-bold text-violet-600">Trunk</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-teal-700" />
              <h2 className="text-xs font-bold text-teal-900">
                Vérifier la configuration
              </h2>
            </div>
            <div className="mt-2 space-y-1 font-mono text-[10px] text-teal-800">
              <p>show vlan brief</p>
              <p>show interfaces trunk</p>
            </div>
          </div>
        </section>

        {/* NOTE */}
        <div className="mt-3 flex shrink-0 items-center gap-2 rounded-lg bg-orange-50 px-3 py-2">
          <ArrowRight size={15} className="shrink-0 text-orange-700" />
          <p className="text-[10px] font-medium text-orange-800">
            Répéter la création des VLAN sur chaque switch et adapter les interfaces à la topologie utilisée.
          </p>
        </div>

        <footer className="mt-3 flex shrink-0 items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span>VLAN & PROTOCOLE STP</span>
          <span className="font-bold tracking-widest">14 / 20</span>
        </footer>
      </div>
    </main>
  )
}
