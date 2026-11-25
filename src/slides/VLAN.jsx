import { motion } from "framer-motion";
import {
  Layers3,
  Network,
  Radio,
  ShieldCheck,
  Settings2,
  ArrowRight,
} from "lucide-react";

const concepts = [
  {
    icon: Network,
    title: "Segmentation logique",
    description:
      "Un VLAN permet de diviser un réseau local physique en plusieurs réseaux logiques indépendants.",
  },
  {
    icon: Radio,
    title: "Domaine de broadcast",
    description:
      "Chaque VLAN constitue un domaine de diffusion distinct. Les broadcasts restent limités à leur VLAN.",
  },
  {
    icon: ShieldCheck,
    title: "Isolation du trafic",
    description:
      "Les VLAN séparent les flux réseau et contribuent à améliorer la sécurité et le contrôle des communications.",
  },
];

const steps = [
  "Le switch identifie le VLAN associé à chaque port.",
  "Les trames sont transmises selon les règles du VLAN concerné.",
  "La communication entre VLAN nécessite un routage inter-VLAN.",
];

export default function VLAN({ n = 3, total = 20 }) {
  const pad = (v) => String(v).padStart(2, "0");

  return (
    <section className="flex h-full w-full flex-col overflow-hidden bg-white p-8 text-slate-800">
      {/* En-tête */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5"
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1 w-8 rounded-full bg-teal-600" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Partie 01 / Fonctionnement
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Comprendre les VLAN
        </h1>

        <p className="mt-2 text-base text-slate-500">
          La segmentation logique d'un réseau local
        </p>
      </motion.header>

      {/* Contenu en deux colonnes */}
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-5">
        {/* Colonne gauche */}
        <div className="flex flex-col gap-4">
          {/* Définition */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border border-slate-200 bg-white p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-teal-600">
                <Layers3 size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Définition</h2>
            </div>

            <p className="text-sm leading-6 text-slate-600">
              Un <strong className="text-slate-900">VLAN</strong> (Virtual Local
              Area Network) est un réseau local virtuel qui permet de regrouper
              logiquement des équipements au sein d'un même réseau physique.
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cette technologie permet de séparer les communications en
              plusieurs domaines de diffusion, sans avoir besoin de créer un
              réseau physique distinct pour chaque groupe.
            </p>
          </motion.section>

          {/* Fonctionnement général */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-lg border border-slate-200 bg-white p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <Settings2 size={21} className="text-teal-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Fonctionnement général
              </h2>
            </div>

            <div className="flex flex-col gap-2.5">
              {steps.map((text, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                    0{index + 1}
                  </span>
                  <p className="text-sm text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col">
          <div className="mb-3">
            <h2 className="text-lg font-bold text-slate-900">
              Principes fondamentaux
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Les caractéristiques essentielles de la segmentation VLAN
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {concepts.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.12 }}
                  className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-teal-600">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* À retenir */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-auto flex items-center gap-3 rounded-lg border border-slate-200 border-l-4 border-l-teal-600 bg-slate-50 px-5 py-4"
          >
            <ArrowRight className="shrink-0 text-teal-600" size={20} />
            <p className="text-sm leading-relaxed text-slate-600">
              <strong className="text-slate-900">À retenir :</strong> les VLAN
              permettent une meilleure organisation du réseau, une isolation
              logique du trafic et une gestion plus efficace.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pied de page */}
      <footer className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
        <span className="text-[10px] font-semibold tracking-widest text-slate-400">
          RÉSEAUX INFORMATIQUES
        </span>
        <span className="text-xs font-semibold tabular-nums text-slate-500">
          {pad(n)} / {pad(total)}
        </span>
      </footer>
    </section>
  );
}