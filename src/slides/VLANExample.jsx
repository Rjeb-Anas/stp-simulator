
import { motion } from 'framer-motion'
import {
  Monitor,
  Users,
  GraduationCap,
  Server,
  Network,
  ArrowRight,
  ShieldCheck,
  Layers3,
} from 'lucide-react'

const groups = [
  {
    id: 10,
    name: 'ADMINISTRATION',
    description: 'Gestion du réseau',
    devices: ['PC 01', 'PC 02'],
    Icon: Users,
    color: '#3978D4',
    background: '#EFF6FF',
    border: '#CFE0FA',
  },
  {
    id: 20,
    name: 'ÉTUDIANTS',
    description: 'Accès aux ressources pédagogiques',
    devices: ['PC 03', 'PC 04'],
    Icon: GraduationCap,
    color: '#0D9488',
    background: '#ECFDF5',
    border: '#BCE9DF',
  },
  {
    id: 30,
    name: 'SERVEURS',
    description: 'Services et données',
    devices: ['Serveur 01'],
    Icon: Server,
    color: '#D97706',
    background: '#FFF7ED',
    border: '#F5DDB7',
  },
]

function Device({ name, color }) {
  const isServer = name.includes('Serveur')
  const Icon = isServer ? Server : Monitor

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
      <Icon size={16} style={{ color }} />
      <span className="text-xs font-semibold text-slate-700">{name}</span>
    </div>
  )
}

export default function VLANExample() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-7 text-slate-800 md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* En-tête */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-teal-600" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Partie 01 / Fonctionnement
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Exemple de segmentation VLAN
          </h1>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Un seul réseau physique, plusieurs réseaux logiques indépendants.
          </p>
        </motion.header>

        {/* Explication */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-7 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4"
        >
          <Layers3 className="mt-0.5 shrink-0 text-blue-600" size={21} />
          <p className="text-sm leading-relaxed text-slate-700">
            Le switch répartit les équipements dans différents VLAN.
            Chaque VLAN constitue un domaine de broadcast séparé,
            même si les équipements utilisent le même commutateur.
          </p>
        </motion.div>

        {/* Topologie */}
        <div className="grid gap-5 lg:grid-cols-[1fr_220px_1fr]">

          {/* Groupes de postes */}
          <div className="flex flex-col gap-4">
            {groups.map((group, index) => {
              const Icon = group.Icon

              return (
                <motion.section
                  key={group.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.12 }}
                  className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                  style={{ borderColor: group.border }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ background: group.background }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white"
                        style={{ color: group.color }}
                      >
                        <Icon size={19} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-slate-800">
                          {group.name}
                        </h2>
                        <p className="text-xs text-slate-500">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className="rounded-md px-2.5 py-1 text-xs font-bold"
                      style={{
                        background: group.color,
                        color: 'white',
                      }}
                    >
                      VLAN {group.id}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 p-4">
                    {group.devices.map((device) => (
                      <Device
                        key={device}
                        name={device}
                        color={group.color}
                      />
                    ))}
                  </div>
                </motion.section>
              )
            })}
          </div>

          {/* Connexions */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="hidden h-12 w-px bg-slate-200 lg:block" />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-md"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Network size={27} />
              </div>

              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Commutateur
              </p>
              <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                SWITCH
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Manageable · Couche 2
              </p>

              <div className="my-4 border-t border-slate-100" />

              <div className="space-y-2 text-left">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: group.color }}
                    />
                    <span className="text-xs font-semibold text-slate-600">
                      VLAN {group.id}
                    </span>
                    <span className="ml-auto text-xs text-slate-400">
                      Actif
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="hidden h-12 w-px bg-slate-200 lg:block" />
          </div>

          {/* Résultat logique */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="text-teal-600" size={21} />
              <h3 className="font-bold text-slate-800">
                Résultat
              </h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Isolation logique',
                  text: 'Les broadcasts restent dans leur VLAN.',
                },
                {
                  title: 'Meilleure organisation',
                  text: 'Les équipements sont regroupés par fonction.',
                },
                {
                  title: 'Communication contrôlée',
                  text: 'Un routage inter-VLAN est nécessaire pour communiquer entre VLAN.',
                },
              ].map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-7 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-4 text-white"
        >
          <ArrowRight className="shrink-0 text-teal-400" size={20} />
          <p className="text-sm leading-relaxed text-slate-200">
            <strong className="text-white">À retenir :</strong>{' '}
            les VLAN permettent de segmenter un réseau sans multiplier
            les commutateurs physiques.
          </p>
        </motion.div>

        {/* Pied de page */}
        <footer className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-[10px] font-bold tracking-[0.18em] text-slate-400">
            RÉSEAUX INFORMATIQUES
          </span>
          <span className="text-xs font-bold tabular-nums text-slate-500">
            04 / 20
          </span>
        </footer>
      </div>
    </main>
  )
}
