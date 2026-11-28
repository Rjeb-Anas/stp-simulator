import { motion } from 'framer-motion'
import {
  Network,
  RefreshCw,
  AlertTriangle,
  Radio,
  Activity,
  ShieldAlert,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'
import { SwitchNode } from '../components/SimulationLayout'

const consequences = [
  {
    icon: RefreshCw,
    title: 'Tempête de broadcast',
    description:
      'Les trames de diffusion circulent continuellement dans les boucles.',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
  {
    icon: Activity,
    title: 'Instabilité de la table MAC',
    description:
      'Le switch reçoit plusieurs fois les mêmes trames et apprend des associations incorrectes.',
    color: '#D97706',
    bg: '#FFFBEB',
  },
  {
    icon: Network,
    title: 'Saturation du réseau',
    description:
      'La multiplication des trames consomme la bande passante et le CPU des équipements.',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
]

export default function Layer2Loops() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="Problématique"
      title="Les boucles de niveau 2"
      subtitle="Comprendre les risques liés aux connexions redondantes sans contrôle."
      slideNumber={6}
      accent="amber"
    >
      {/* Définition */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 flex shrink-0 items-center gap-3 rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-3"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 sm:text-base">
            Qu'est-ce qu'une boucle de niveau 2 ?
          </h2>
          <p className="mt-0.5 text-xs leading-5 text-slate-600 sm:text-sm">
            Une boucle apparaît lorsque plusieurs chemins physiques relient les
            commutateurs et créent un circuit fermé dans le réseau Ethernet.
          </p>
        </div>
      </motion.section>

      {/* Topologie et explication */}
      <div className="mb-3 grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Schéma */}
        <section className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Network size={17} className="text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Exemple de boucle réseau
            </h2>
          </div>

          <div className="flex min-h-[210px] flex-1 items-center justify-center rounded-lg border border-slate-100 bg-white p-2">
            <svg
              viewBox="0 0 520 300"
              className="h-full max-h-[250px] w-full"
              role="img"
              aria-label="Trois commutateurs connectés en boucle"
            >
              <defs>
                <pattern id="grid-loop" width="22" height="22" patternUnits="userSpaceOnUse">
                  <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                </pattern>
                <marker
                  id="loopArrow"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L6,3 z" fill="#DC2626" />
                </marker>
              </defs>
              <rect width="520" height="300" fill="url(#grid-loop)" />

              {/* Liens formant une boucle */}
              <line x1="260" y1="64" x2="115" y2="232" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="260" y1="64" x2="405" y2="232" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="115" y1="232" x2="405" y2="232" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />

              {/* Flèches de circulation infinie */}
              <path d="M196 125 L164 162" stroke="#DC2626" strokeWidth="3" fill="none" markerEnd="url(#loopArrow)" />
              <path d="M324 125 L356 162" stroke="#DC2626" strokeWidth="3" fill="none" markerEnd="url(#loopArrow)" />
              <path d="M210 218 L305 218" stroke="#DC2626" strokeWidth="3" fill="none" markerEnd="url(#loopArrow)" />

              {/* Badge central */}
              <rect x="195" y="146" width="130" height="26" rx="8" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.5" />
              <text x="260" y="163" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#DC2626">
                BOUCLE INFINIE L2
              </text>

              <SwitchNode x={260} y={64} name="SW1" mac="00:1A:01" priority="32768" cpu={88} status="danger" ports={['down', 'down']} />
              <SwitchNode x={115} y={232} name="SW2" mac="00:1A:02" priority="32768" cpu={92} status="danger" ports={['down', 'down']} />
              <SwitchNode x={405} y={232} name="SW3" mac="00:1A:03" priority="32768" cpu={90} status="danger" ports={['down', 'down']} />
            </svg>
          </div>
        </section>

        {/* Cause */}
        <section className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4">
          <div>
            <div className="mb-2.5 flex items-center gap-2">
              <Radio size={18} className="text-red-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Pourquoi est-ce dangereux ?
              </h2>
            </div>

            <p className="mb-3 text-xs leading-6 text-slate-600 sm:text-sm">
              Contrairement à la couche 3 (champ TTL d'IP), Ethernet ne possède
              pas de mécanisme de durée de vie des trames pour arrêter leur
              circulation en boucle.
            </p>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50/80 p-3">
            <div className="mb-1 flex items-center gap-2">
              <RefreshCw size={16} className="text-red-600" />
              <span className="text-xs font-bold text-red-800">
                Circulation infinie
              </span>
            </div>
            <p className="text-xs leading-5 text-red-800/80">
              Une trame broadcast est retransmise en continu par chaque switch,
              provoquant une tempête de broadcast.
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-bold text-slate-800">
              Solution : le protocole STP
            </p>
            <p className="mt-0.5 text-xs text-slate-600">
              STP détecte les boucles et bloque logiquement les chemins
              redondants.
            </p>
          </div>
        </section>
      </div>

      {/* Conséquences */}
      <div className="grid shrink-0 grid-cols-1 gap-3 md:grid-cols-3">
        {consequences.map((item) => {
          const Icon = item.icon
          return (
            <article
              key={item.title}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                <Icon size={16} />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                  {item.description}
                </p>
              </div>
            </article>
          )
        })}
      </div>

      {/* Solution */}
      <div className="mt-3 flex shrink-0 items-center gap-2.5 rounded-xl border border-slate-200 border-l-4 border-l-teal-600 bg-slate-50 px-4 py-2.5">
        <ShieldAlert size={17} className="shrink-0 text-teal-600" />
        <p className="text-xs leading-5 text-slate-700">
          <strong className="text-slate-900">À retenir :</strong> STP élimine
          les boucles logiques tout en conservant les câbles redondants.
        </p>
      </div>
    </SlideLayout>
  )
}
