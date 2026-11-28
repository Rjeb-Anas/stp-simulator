import { motion } from 'framer-motion'
import { Network, ShieldCheck, GitBranch } from 'lucide-react'

export default function Introduction() {
  return (
    <section className="relative flex min-h-full w-full flex-col justify-between overflow-x-hidden rounded-2xl border border-slate-200/90 bg-white p-5 text-slate-800 shadow-sm sm:p-8 md:p-12 lg:h-full lg:overflow-hidden">
      {/* Subtle decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-50/80 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-blue-50/80 blur-3xl" />

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-700">
          <Network className="h-6 w-6" />
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-teal-700">
            FST FÈS
          </p>
          <p className="text-xs text-slate-500">
            Département Informatique · Réseaux
          </p>
        </div>
      </motion.div>

      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="relative z-10 my-6 max-w-2xl sm:my-10"
      >
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">
          Présentation académique
        </span>

        <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:mt-7 sm:text-5xl md:text-6xl">
          VLAN &
          <br />
          <span className="text-teal-600">PROTOCOLE STP</span>
        </h1>

        <div className="my-5 h-1.5 w-20 rounded-full bg-teal-600 sm:my-7" />

        <p className="text-sm font-medium tracking-wide text-slate-500 sm:text-base md:text-lg">
          Fonctionnement
          <span className="mx-2 text-teal-600 sm:mx-3">·</span>
          Simulation
          <span className="mx-2 text-teal-600 sm:mx-3">·</span>
          Analyse
        </p>
      </motion.div>

      {/* Illustration réseau */}
      <div className="pointer-events-none absolute right-12 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="relative flex h-60 w-60 items-center justify-center rounded-full border border-slate-200 bg-slate-50/80">
          <div className="absolute h-44 w-44 rounded-full border-2 border-dashed border-teal-300/80" />

          <div className="z-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
            <Network size={56} className="text-teal-600" />
          </div>

          <div className="absolute left-3 top-10 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <GitBranch size={22} className="text-blue-600" />
          </div>

          <div className="absolute bottom-8 right-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <ShieldCheck size={22} className="text-teal-600" />
          </div>
        </div>
      </div>

      {/* Informations */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3 sm:gap-5 sm:pt-6"
      >
        <div>
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-teal-700">
            Présenté par
          </p>
          <p className="text-sm font-semibold text-slate-800">Nom et prénom</p>
          <p className="text-xs text-slate-500">Nom et prénom</p>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-teal-700">
            Encadré par
          </p>
          <p className="text-sm font-semibold text-slate-800">M. / Mme [Nom]</p>
          <p className="text-xs text-slate-500">Enseignant(e)</p>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-teal-700">
            Année universitaire
          </p>
          <p className="text-sm font-semibold text-slate-800">2026 – 2027</p>
          <p className="text-xs text-slate-500">Réseaux informatiques</p>
        </div>
      </motion.div>
    </section>
  )
}
