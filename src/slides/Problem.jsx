
import { motion } from "framer-motion";
import {
  BookOpen,
  Network,
  PlayCircle,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const sections = [
  {
    number: "01",
    title: "Fonctionnement",
    subtitle: "Comprendre les concepts",
    description:
      "Découvrir les VLAN, les boucles de couche 2 et le fonctionnement du protocole STP.",
    topics: [
      "Segmentation VLAN et Trunk 802.1Q",
      "Problème des boucles réseau",
      "BPDU et élection du Root Bridge",
      "Rôles et états des ports",
    ],
    icon: BookOpen,
    color: "teal",
    duration: "Partie théorique",
  },
  {
    number: "02",
    title: "Simulation",
    subtitle: "Observer le fonctionnement",
    description:
      "Mettre en pratique les notions étudiées à travers une topologie réseau composée de trois switches.",
    topics: [
      "Création et configuration des VLAN",
      "Simulation sans STP",
      "Activation et fonctionnement du STP",
      "Panne d'un lien et convergence",
    ],
    icon: PlayCircle,
    color: "orange",
    duration: "Partie pratique",
  },
  {
    number: "03",
    title: "Analyse",
    subtitle: "Interpréter les résultats",
    description:
      "Étudier les résultats obtenus et comprendre les avantages, les limites et les protections du protocole.",
    topics: [
      "Comparaison avec et sans STP",
      "Redondance et convergence",
      "Limites du protocole",
      "Bonnes pratiques de sécurité",
    ],
    icon: BarChart3,
    color: "blue",
    duration: "Bilan technique",
  },
];

const styles = {
  teal: {
    icon: "bg-teal-100 text-teal-700",
    line: "bg-teal-500",
    number: "text-teal-700",
    tag: "bg-teal-50 text-teal-700",
  },
  orange: {
    icon: "bg-orange-100 text-orange-700",
    line: "bg-orange-400",
    number: "text-orange-600",
    tag: "bg-orange-50 text-orange-700",
  },
  blue: {
    icon: "bg-sky-100 text-sky-700",
    line: "bg-sky-500",
    number: "text-sky-700",
    tag: "bg-sky-50 text-sky-700",
  },
};

export default function Problem() {
  return (
    <section className="flex h-full w-full flex-col overflow-hidden
      rounded-2xl border border-slate-200 bg-[#F8FAFC]
      p-6 text-slate-800 shadow-xl md:p-10">

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7"
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="h-7 w-1 rounded-full bg-teal-500" />
          <span className="text-xs font-bold uppercase
            tracking-[0.2em] text-teal-700">
            Vue d'ensemble
          </span>
        </div>

        <h1 className="text-3xl font-black tracking-tight
          text-slate-800 md:text-4xl">
          Plan de la présentation
        </h1>

        <p className="mt-2 text-sm text-slate-500 md:text-base">
          Trois étapes pour comprendre, expérimenter et analyser
          le protocole Spanning Tree.
        </p>
      </motion.div>

      {/* Fil conducteur */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-semibold uppercase
          tracking-widest text-slate-400">
          Notre parcours
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Cartes */}
      <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-3">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const style = styles[section.color];

          return (
            <motion.article
              key={section.number}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative flex flex-col overflow-hidden
                rounded-2xl border border-slate-200
                bg-white p-5 shadow-sm transition-shadow
                hover:shadow-lg md:p-6"
            >
              <div className={`absolute left-0 top-0 h-1 w-full
                ${style.line}`} />

              {/* Numéro et icône */}
              <div className="mb-5 flex items-center
                justify-between">
                <span className={`text-4xl font-black
                  ${style.number}`}>
                  {section.number}
                </span>

                <div className={`rounded-xl p-3 ${style.icon}`}>
                  <Icon size={25} />
                </div>
              </div>

              {/* Titre */}
              <h2 className="text-xl font-extrabold
                text-slate-800 md:text-2xl">
                {section.title}
              </h2>

              <p className="mt-1 text-sm font-semibold
                text-slate-500">
                {section.subtitle}
              </p>

              <p className="mt-4 text-sm leading-relaxed
                text-slate-600">
                {section.description}
              </p>

              {/* Contenu */}
              <div className="my-5 h-px bg-slate-100" />

              <p className="mb-3 text-xs font-bold uppercase
                tracking-wider text-slate-400">
                Au programme
              </p>

              <ul className="flex flex-col gap-3">
                {section.topics.map((topic) => (
                  <li key={topic} className="flex items-start
                    gap-2 text-sm text-slate-600">
                    <CheckCircle2
                      size={16}
                      className={`mt-0.5 shrink-0
                        ${style.number}`}
                    />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <span className={`inline-flex rounded-full
                  px-3 py-1.5 text-xs font-semibold
                  ${style.tag}`}>
                  {section.duration}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Pied de page */}
      <div className="mt-6 flex items-center justify-between
        border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2 text-xs
          text-slate-400">
          <Network size={15} />
          <span>VLAN & PROTOCOLE STP</span>
        </div>

        <div className="flex items-center gap-2 text-xs
          font-semibold text-slate-500">
          02 / 20
          <ArrowRight size={15} className="text-teal-600" />
        </div>
      </div>
    </section>
  );
}
