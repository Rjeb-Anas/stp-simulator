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
    duration: "Bilan technique",
  },
];

export default function Problem() {
  return (
    <section className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 text-slate-800 md:p-10">

      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7"
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-teal-600" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Vue d'ensemble
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
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
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Notre parcours
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Cartes */}
      <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-3">
        {sections.map((section, index) => {
          const Icon = section.icon;

          return (
            <motion.article
              key={section.number}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 md:p-6"
            >
              {/* Numéro et icône */}
              <div className="mb-5 flex items-center justify-between">
                <span className="text-4xl font-extrabold text-teal-600">
                  {section.number}
                </span>

                <div className="rounded-lg bg-slate-100 p-3 text-slate-600">
                  <Icon size={25} />
                </div>
              </div>

              {/* Titre */}
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                {section.title}
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {section.subtitle}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {section.description}
              </p>

              {/* Contenu */}
              <div className="my-5 h-px bg-slate-200" />

              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Au programme
              </p>

              <ul className="flex flex-col gap-3">
                {section.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-teal-600"
                    />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <span className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600">
                  {section.duration}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Pied de page */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Network size={15} />
          <span>VLAN & PROTOCOLE STP</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          02 / 20
          <ArrowRight size={15} className="text-teal-600" />
        </div>
      </div>
    </section>
  );
}