import { motion } from 'framer-motion'
import {
  Cable,
  Network,
  Tags,
  ArrowLeftRight,
  CheckCircle2,
  Layers3,
  ArrowRight,
} from 'lucide-react'
import SlideLayout from '../components/SlideLayout'

const steps = [
  {
    number: '01',
    title: 'Identification',
    description: 'Le switch identifie le VLAN de la trame.',
  },
  {
    number: '02',
    title: 'Étiquetage',
    description: 'Le tag 802.1Q indique son identifiant VLAN.',
  },
  {
    number: '03',
    title: 'Transmission',
    description: 'La trame traverse le lien Trunk.',
  },
  {
    number: '04',
    title: 'Réception',
    description: 'Le switch destinataire lit le tag.',
  },
]

export default function Trunk() {
  return (
    <SlideLayout
      section="Partie 01 · Fonctionnement"
      badge="IEEE 802.1Q"
      title="Les liens Trunk et 802.1Q"
      subtitle="Transporter plusieurs VLAN à travers une seule liaison physique."
      slideNumber={5}
    >
      {/* Définition */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700">
          <Cable size={20} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 sm:text-base">
            Qu'est-ce qu'un lien Trunk ?
          </h2>
          <p className="mt-0.5 text-xs leading-5 text-slate-600 sm:text-sm">
            Une liaison réseau qui transporte le trafic de plusieurs VLAN entre
            des équipements, notamment des commutateurs.
          </p>
        </div>
      </motion.section>

      {/* Deux colonnes */}
      <div className="mb-3 grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        {/* 802.1Q */}
        <motion.section
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="mb-2.5 flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Tags size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Encapsulation IEEE 802.1Q
              </h2>
              <p className="text-[11px] text-slate-500">
                Identification des trames Ethernet
              </p>
            </div>
          </div>

          <p className="mb-3 text-xs leading-5 text-slate-600">
            La norme <strong>IEEE 802.1Q</strong> ajoute une étiquette (tag)
            dans l'en-tête Ethernet pour identifier le VLAN d'appartenance d'une
            trame.
          </p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Structure simplifiée d'une trame
            </p>

            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
              {[
                { name: 'MAC dest.', style: 'bg-slate-200 text-slate-700' },
                { name: 'MAC src.', style: 'bg-slate-200 text-slate-700' },
                {
                  name: 'Tag 802.1Q',
                  style: 'border-2 border-teal-500 bg-teal-50 text-teal-800',
                },
                { name: 'Type', style: 'bg-blue-100 text-blue-800' },
                { name: 'Données', style: 'bg-slate-200 text-slate-700' },
                { name: 'FCS', style: 'bg-slate-200 text-slate-700' },
              ].map((field) => (
                <div
                  key={field.name}
                  className={`flex min-h-10 items-center justify-center rounded-md px-1 text-center text-[10px] font-bold ${field.style}`}
                >
                  {field.name}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-3">
            <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-xs font-medium text-teal-800">
              <CheckCircle2 size={15} className="shrink-0" />
              Identifiant VLAN (VID) codé sur 12 bits (jusqu'à 4094 VLAN).
            </div>
          </div>
        </motion.section>

        {/* Access vs Trunk */}
        <motion.section
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Network size={18} />
            </div>
            <h2 className="text-sm font-bold text-slate-900">Access vs Trunk</h2>
          </div>

          <div className="mb-3 rounded-xl border border-blue-200/70 bg-blue-50/70 p-3">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-blue-900">Port Access</h3>
              <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                1 VLAN
              </span>
            </div>
            <p className="text-xs leading-5 text-blue-900/80">
              Relie un équipement terminal à un seul VLAN. Les trames sont non
              étiquetées.
            </p>
          </div>

          <div className="mb-3 rounded-xl border border-teal-200/70 bg-teal-50/70 p-3">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-teal-900">Port Trunk</h3>
              <span className="rounded-md bg-teal-600 px-2 py-0.5 text-[10px] font-bold text-white">
                Multi-VLAN
              </span>
            </div>
            <p className="text-xs leading-5 text-teal-900/80">
              Transporte plusieurs VLAN sur une même liaison avec des trames
              étiquetées en 802.1Q.
            </p>
          </div>

          <div className="mt-auto flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <ArrowLeftRight size={15} className="shrink-0 text-slate-500" />
            <p className="text-xs text-slate-500">
              Utilisé principalement pour interconnecter deux commutateurs.
            </p>
          </div>
        </motion.section>
      </div>

      {/* Processus */}
      <section className="shrink-0 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
        <div className="mb-2.5 flex items-center gap-2">
          <Layers3 size={16} className="text-teal-700" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Transport d'une trame sur un Trunk
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative rounded-lg bg-white p-2.5 border border-slate-200/80">
              <span className="text-[10px] font-extrabold tracking-wider text-teal-700">
                ÉTAPE {step.number}
              </span>
              <h3 className="mt-0.5 text-xs font-bold text-slate-800">
                {step.title}
              </h3>
              <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                {step.description}
              </p>
              {index !== 3 && (
                <ArrowRight
                  size={13}
                  className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-slate-400 lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </SlideLayout>
  )
}
