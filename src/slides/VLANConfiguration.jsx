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
import SlideLayout from '../components/SlideLayout'

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
    header: 'bg-blue-50 text-blue-900',
    number: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200',
  },
  teal: {
    header: 'bg-teal-50 text-teal-900',
    number: 'bg-teal-100 text-teal-700',
    border: 'border-teal-200',
  },
  violet: {
    header: 'bg-violet-50 text-violet-900',
    number: 'bg-violet-100 text-violet-700',
    border: 'border-violet-200',
  },
}

export default function VLANConfiguration() {
  return (
    <SlideLayout
      section="Partie 02 · Simulation"
      badge="Cisco IOS"
      title="Configuration des VLAN"
      subtitle="Création des VLAN, affectation des ports Access et mise en place des liaisons Trunk."
      slideNumber={14}
      accent="blue"
    >
      {/* VLAN TABLE */}
      <section className="mb-3 shrink-0">
        <div className="mb-2 flex items-center gap-2">
          <Layers3 size={16} className="text-teal-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Plan d'adressage logique
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-3">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
              <Monitor size={18} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-blue-900">VLAN 10</p>
              <p className="text-[11px] text-blue-700">ADMIN</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-teal-200 bg-teal-50/70 p-3">
            <div className="rounded-lg bg-teal-100 p-2 text-teal-700">
              <Monitor size={18} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-teal-900">VLAN 20</p>
              <p className="text-[11px] text-teal-700">ÉTUDIANTS</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50/70 p-3">
            <div className="rounded-lg bg-violet-100 p-2 text-violet-700">
              <Server size={18} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-violet-900">VLAN 30</p>
              <p className="text-[11px] text-violet-700">SERVEURS</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIGURATION STEPS */}
      <section className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex min-h-0 flex-col overflow-hidden rounded-xl border ${styles[step.color].border}`}
          >
            <div className={`flex items-center gap-3 px-3.5 py-2.5 ${styles[step.color].header}`}>
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${styles[step.color].number}`}>
                {step.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-xs font-extrabold">{step.title}</h3>
                <p className="text-[10px] opacity-75">{step.subtitle}</p>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col bg-slate-900 p-3">
              <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-1.5">
                <Terminal size={13} className="text-emerald-400" />
                <span className="text-[10px] font-semibold text-slate-400">
                  SWITCH#
                </span>
                <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
              </div>

              <pre className="whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-emerald-300">
                {step.code}
              </pre>
            </div>
          </motion.div>
        ))}
      </section>

      {/* NETWORK AND VERIFICATION */}
      <section className="mt-3 grid shrink-0 grid-cols-1 gap-3 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Network size={15} className="text-teal-600" />
            <h2 className="text-xs font-bold text-slate-800">
              Communication entre switches
            </h2>
          </div>

          <div className="flex items-center justify-between gap-2">
            {['SW1', 'SW2', 'SW3'].map((name, index) => (
              <div key={name} className="flex flex-1 items-center gap-1">
                <div className="flex-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center">
                  <Network size={14} className="mx-auto text-slate-700" />
                  <p className="mt-0.5 text-[10px] font-bold text-slate-800">
                    {name}
                  </p>
                </div>
                {index < 2 && (
                  <div className="flex flex-col items-center">
                    <Cable size={13} className="text-violet-600" />
                    <span className="text-[8px] font-bold text-violet-600">
                      Trunk
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-teal-700" />
            <h2 className="text-xs font-bold text-teal-900">
              Vérifier la configuration
            </h2>
          </div>
          <div className="mt-1.5 space-y-1 font-mono text-[11px] text-teal-800">
            <p>show vlan brief</p>
            <p>show interfaces trunk</p>
          </div>
        </div>
      </section>

      <div className="mt-2.5 flex shrink-0 items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-2">
        <ArrowRight size={14} className="shrink-0 text-amber-700" />
        <p className="text-[11px] font-medium text-amber-900">
          Répéter la création des VLAN sur chaque switch et adapter les
          interfaces à la topologie.
        </p>
      </div>
    </SlideLayout>
  )
}
