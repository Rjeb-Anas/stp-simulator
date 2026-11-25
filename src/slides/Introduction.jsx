
import { motion } from "framer-motion";
import { Network, ShieldCheck, GitBranch } from "lucide-react";

export default function Introduction() {
  return (
    <section className="relative flex h-full w-full flex-col
      justify-between overflow-hidden rounded-2xl
      border border-slate-200 bg-[#F8FAFC] p-8 text-slate-800
      shadow-xl md:p-14">

      {/* Décoration */}
      <div className="absolute -right-24 -top-24 h-80 w-80
        rounded-full bg-sky-100/80 blur-2xl" />

      <div className="absolute -bottom-32 -left-20 h-80 w-80
        rounded-full bg-teal-100/70 blur-3xl" />

      <div className="absolute right-12 top-16 hidden
        h-48 w-48 rounded-full border-2 border-sky-200
        md:block" />

      <div className="absolute right-20 top-24 hidden
        h-32 w-32 rounded-full border border-teal-300
        md:block" />

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="rounded-xl bg-teal-100 p-3">
          <Network className="h-7 w-7 text-teal-700" />
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.2em]
            text-teal-700">
            FST FÈS
          </p>
          <p className="text-xs text-slate-500">
            Département Informatique · Réseaux
          </p>
        </div>
      </motion.div>

      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 my-10 max-w-3xl"
      >
        <span className="inline-flex rounded-full
          bg-sky-100 px-4 py-2 text-xs font-bold
          uppercase tracking-[0.2em] text-sky-800">
          Présentation académique
        </span>

        <h1 className="mt-7 text-5xl font-black
          leading-tight tracking-tight text-slate-800
          md:text-7xl">
          VLAN &
          <br />
          <span className="text-teal-600">
            PROTOCOLE STP
          </span>
        </h1>

        <div className="my-7 h-1.5 w-24 rounded-full
          bg-orange-400" />

        <p className="text-base font-medium tracking-wide
          text-slate-500 md:text-lg">
          Fonctionnement
          <span className="mx-3 text-orange-500">·</span>
          Simulation
          <span className="mx-3 text-orange-500">·</span>
          Analyse
        </p>
      </motion.div>

      {/* Illustration réseau */}
      <div className="absolute right-12 top-1/2 hidden
        -translate-y-1/2 lg:block">
        <div className="relative flex h-64 w-64
          items-center justify-center rounded-full
          bg-sky-100/70">
          <div className="absolute h-44 w-44 rounded-full
            border-2 border-dashed border-teal-300" />

          <div className="z-10 rounded-2xl bg-white p-6
            shadow-lg shadow-sky-200">
            <Network size={65} className="text-teal-600" />
          </div>

          <div className="absolute left-5 top-12 rounded-xl
            bg-white p-3 shadow-md">
            <GitBranch size={24} className="text-orange-500" />
          </div>

          <div className="absolute bottom-8 right-5 rounded-xl
            bg-white p-3 shadow-md">
            <ShieldCheck size={24} className="text-sky-600" />
          </div>
        </div>
      </div>

      {/* Informations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 grid gap-5 border-t
          border-slate-200 pt-6 md:grid-cols-3"
      >
        <div>
          <p className="mb-2 text-xs font-bold uppercase
            tracking-widest text-teal-700">
            Présenté par
          </p>
          <p className="font-semibold text-slate-800">
            Nom et prénom
          </p>
          <p className="text-sm text-slate-500">
            Nom et prénom
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase
            tracking-widest text-teal-700">
            Encadré par
          </p>
          <p className="font-semibold text-slate-800">
            M. / Mme [Nom]
          </p>
          <p className="text-sm text-slate-500">
            Enseignant(e)
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase
            tracking-widest text-teal-700">
            Année universitaire
          </p>
          <p className="font-semibold text-slate-800">
            2026 – 2027
          </p>
          <p className="text-sm text-slate-500">
            Réseaux informatiques
          </p>
        </div>
      </motion.div>
    </section>
  );
}
