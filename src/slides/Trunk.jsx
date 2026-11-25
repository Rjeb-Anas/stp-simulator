
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
    <main className="h-full w-full overflow-hidden bg-[#F8FAFC] px-5 py-4 text-slate-800 md:px-8">
      <div className="mx-auto flex h-full max-w-7xl flex-col">

        {/* EN-TÊTE */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 shrink-0"
        >
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-teal-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700">
              Partie 01 / Fonctionnement
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Les liens Trunk et 802.1Q
          </h1>

          <p className="mt-1 text-xs text-slate-500 md:text-sm">
            Transporter plusieurs VLAN à travers une seule liaison physique.
          </p>
        </motion.header>

        {/* DÉFINITION */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-3 flex shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <Cable size={21} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 md:text-base">
              Qu'est-ce qu'un lien Trunk ?
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-600 md:text-sm">
              Une liaison réseau qui transporte le trafic de plusieurs VLAN
              entre des équipements, notamment des commutateurs.
            </p>
          </div>
        </motion.section>

        {/* DEUX COLONNES */}
        <div className="mb-3 grid min-h-0 flex-1 grid-cols-2 gap-3">

          {/* 802.1Q */}
          <motion.section
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Tags size={19} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Encapsulation IEEE 802.1Q
                </h2>
                <p className="text-[10px] text-slate-500">
                  Identification des trames Ethernet
                </p>
              </div>
            </div>

            <p className="mb-3 text-xs leading-5 text-slate-600">
              La norme <strong>IEEE 802.1Q</strong> ajoute une étiquette
              (tag) dans l'en-tête Ethernet pour identifier le VLAN
              d'appartenance d'une trame.
            </p>

            {/* STRUCTURE TRAME */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Structure simplifiée d'une trame
              </p>

              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { name: 'MAC destination', style: 'bg-slate-200 text-slate-700' },
                  { name: 'MAC source', style: 'bg-slate-200 text-slate-700' },
                  { name: 'Tag 802.1Q', style: 'border-2 border-teal-500 bg-teal-50 text-teal-800' },
                  { name: 'Type', style: 'bg-blue-100 text-blue-800' },
                  { name: 'Données', style: 'bg-slate-200 text-slate-700' },
                  { name: 'FCS', style: 'bg-slate-200 text-slate-700' },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={`flex min-h-11 items-center justify-center rounded-md px-1 text-center text-[10px] font-bold ${field.style}`}
                  >
                    {field.name}
                  </div>
                ))}
              </div>

              <p className="mt-2 text-center text-[10px] text-slate-500">
                Le tag contient notamment l'identifiant VLAN.
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-xs font-medium text-teal-800">
              <CheckCircle2 size={15} className="shrink-0" />
              Identifiant VLAN codé sur 12 bits.
            </div>
          </motion.section>

          {/* ACCESS VS TRUNK */}
          <motion.section
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                <Network size={19} />
              </div>
              <h2 className="text-sm font-bold text-slate-900">
                Access vs Trunk
              </h2>
            </div>

            {/* ACCESS */}
            <div className="mb-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-blue-900">
                  Port Access
                </h3>
                <span className="rounded bg-blue-600 px-2 py-1 text-[9px] font-bold text-white">
                  1 VLAN
                </span>
              </div>

              <p className="text-xs leading-5 text-blue-900/75">
                Relie généralement un équipement terminal à un seul VLAN.
                Les trames sont normalement non étiquetées.
              </p>
            </div>

            {/* TRUNK */}
            <div className="mb-3 rounded-lg border border-teal-100 bg-teal-50 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-teal-900">
                  Port Trunk
                </h3>
                <span className="rounded bg-teal-600 px-2 py-1 text-[9px] font-bold text-white">
                  Plusieurs VLAN
                </span>
              </div>

              <p className="text-xs leading-5 text-teal-900/75">
                Transporte plusieurs VLAN sur une même liaison,
                généralement avec des trames étiquetées en 802.1Q.
              </p>
            </div>

            <div className="mt-auto flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <ArrowLeftRight size={16} className="shrink-0 text-slate-500" />
              <p className="text-[10px] leading-4 text-slate-500">
                Utilisé notamment entre deux commutateurs.
              </p>
            </div>
          </motion.section>
        </div>

        {/* PROCESSUS */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-3 shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <div className="mb-3 flex items-center gap-2">
            <Layers3 size={17} className="text-teal-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Comment fonctionne le transport des VLAN ?
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <span className="text-[10px] font-extrabold tracking-wider text-teal-700">
                  ÉTAPE {step.number}
                </span>

                <h3 className="mt-1 text-xs font-bold text-slate-800">
                  {step.title}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  {step.description}
                </p>

                {index !== 3 && (
                  <ArrowRight
                    size={13}
                    className="absolute right-1 top-3 text-slate-300"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* À RETENIR */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-3 flex shrink-0 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5"
        >
          <CheckCircle2 size={17} className="shrink-0 text-teal-400" />
          <p className="text-xs leading-5 text-slate-200">
            <strong className="text-white">À retenir :</strong>{' '}
            le Trunk transporte plusieurs VLAN et 802.1Q permet
            de distinguer les trames grâce à leur identifiant.
          </p>
        </motion.div>

        {/* PIED DE PAGE */}
        <footer className="flex shrink-0 items-center justify-between border-t border-slate-200 pt-2">
          <span className="text-[9px] font-bold tracking-[0.18em] text-slate-400">
            RÉSEAUX INFORMATIQUES
          </span>

          <span className="text-[10px] font-bold tabular-nums text-slate-500">
            05 / 20
          </span>
        </footer>

      </div>
    </main>
  )
}
