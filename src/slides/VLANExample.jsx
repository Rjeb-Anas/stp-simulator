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
import SlideLayout from '../components/SlideLayout'

const groups = [
  {
    id: 10,
    name: 'ADMINISTRATION',
    description: 'Gestion du réseau',
    devices: ['PC 01', 'PC 02'],
    Icon: Users,
    color: '#2563EB',
    background: '#EFF6FF',
    border: '#BFDBFE',
  },
  {
    id: 20,
    name: 'ÉTUDIANTS',
    description: 'Accès aux ressources pédagogiques',
    devices: ['PC 03', 'PC 04'],
    Icon: GraduationCap,
    color: '#0D9488',
    background: '#F0FDFA',
    border: '#99F6E4',
  },
  {
    id: 30,
    name: 'SERVEURS',
    description: 'Services et données',
    devices: ['Serveur 01'],
    Icon: Server,
    color: '#D97706',
    background: '#FFFBEB',
    border: '#FDE68A',
  },
]

function Device({ name, color }) {
  const isServer = name.includes('Serveur')
  const Icon = isServer ? Server : Monitor

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5">
      <Icon size={15} style={{ color }} />
      <span className="text-xs font-semibold text-slate-700">{name}</span>
    </div>
  )
}

export default function VLANExample() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="Exemple concret"
      title="Exemple de segmentation VLAN"
      subtitle="Un seul réseau physique, plusieurs réseaux logiques indépendants."
      slideNumber={4}
    >
      {/* Explication */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex shrink-0 items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3"
      >
        <Layers3 className="mt-0.5 shrink-0 text-blue-600" size={19} />
        <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
          Le switch répartit les équipements dans différents VLAN. Chaque VLAN
          constitue un domaine de broadcast séparé, même si les équipements
          utilisent le même commutateur.
        </p>
      </motion.div>

      {/* Topologie */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_210px_1fr]">
        {/* Groupes de postes */}
        <div className="flex flex-col justify-between gap-3">
          {groups.map((group, index) => {
            const Icon = group.Icon

            return (
              <motion.section
                key={group.id}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="overflow-hidden rounded-xl border bg-white"
                style={{ borderColor: group.border }}
              >
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ background: group.background }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white"
                      style={{ color: group.color }}
                    >
                      <Icon size={17} />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold text-slate-800 sm:text-sm">
                        {group.name}
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                    style={{ background: group.color }}
                  >
                    VLAN {group.id}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 p-3">
                  {group.devices.map((device) => (
                    <Device key={device} name={device} color={group.color} />
                  ))}
                </div>
              </motion.section>
            )
          })}
        </div>

        {/* Switch central */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
          >
            <div className="mx-auto mb-2.5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Network size={24} />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Commutateur
            </p>
            <h3 className="mt-0.5 text-base font-extrabold text-slate-900">
              SWITCH
            </h3>
            <p className="text-[11px] text-slate-500">Manageable · Couche 2</p>

            <div className="my-3 border-t border-slate-200" />

            <div className="space-y-2 text-left">
              {groups.map((group) => (
                <div key={group.id} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: group.color }}
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    VLAN {group.id}
                  </span>
                  <span className="ml-auto text-[11px] font-medium text-teal-700">
                    Actif
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Résultat logique */}
        <motion.aside
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col justify-center rounded-xl border border-slate-200 bg-slate-50/60 p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="text-teal-600" size={20} />
            <h3 className="font-bold text-slate-800">Résultat logique</h3>
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
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>

      {/* À retenir */}
      <div className="mt-4 flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 border-l-4 border-l-teal-600 bg-slate-50 px-4 py-3">
        <ArrowRight className="shrink-0 text-teal-600" size={18} />
        <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
          <strong className="text-slate-900">À retenir :</strong> les VLAN
          permettent de segmenter un réseau sans multiplier les commutateurs
          physiques.
        </p>
      </div>
    </SlideLayout>
  )
}
