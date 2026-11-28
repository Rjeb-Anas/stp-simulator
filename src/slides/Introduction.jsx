import { motion } from 'framer-motion'
import { Network, ShieldCheck, Layers, Cpu, Calendar, UserCheck, Users } from 'lucide-react'

const pillars = [
  {
    num: '01',
    title: 'Segmentation VLAN',
    desc: 'Isolation logique & 802.1Q',
    icon: Layers,
    color: 'text-blue-600 bg-blue-50 border-blue-200/80',
  },
  {
    num: '02',
    title: 'Protocole STP',
    desc: 'BPDU, Root Bridge & rôles',
    icon: ShieldCheck,
    color: 'text-teal-700 bg-teal-50 border-teal-200/80',
  },
  {
    num: '03',
    title: 'Simulation & Analyse',
    desc: 'Boucles, pannes & convergence',
    icon: Cpu,
    color: 'text-slate-700 bg-slate-100 border-slate-200',
  },
]

export default function Introduction() {
  return (
    <section className="relative flex min-h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 text-slate-800 shadow-sm sm:p-8 lg:h-full lg:p-10">
      {/* Décoration subtile */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-50/70 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-50/70 blur-3xl" />

      {/* En-tête institutionnel */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-700">
            <Network className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-extrabold tracking-[0.2em] text-teal-700">
              FST FÈS
            </p>
            <p className="text-[11px] font-medium text-slate-500">
              Faculté des Sciences et Techniques · Département Informatique
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
          <Calendar size={12} />
          Année 2026–2027
        </span>
      </motion.header>

      {/* Corps principal : 2 colonnes */}
      <div className="relative z-10 my-auto grid grid-cols-1 items-center gap-6 py-5 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        {/* Colonne gauche : Titre & piliers */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal-700">
              Réseaux & Commutation Niveau 2
            </span>
          </div>

          <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-4xl xl:text-5xl">
            Architecture{' '}
            <span className="text-blue-600">VLAN</span>
            <span className="mx-2 font-light text-slate-300">&amp;</span>
            <br className="hidden sm:block" />
            <span className="text-teal-600">Protocole STP</span>
          </h1>

          <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
            Étude complète de la segmentation des domaines de diffusion, de
            l&apos;élimination des boucles de niveau 2 par Spanning Tree Protocol
            et de la tolérance aux pannes en environnement commuté.
          </p>

          {/* 3 Piliers */}
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {pillars.map(({ num, title, desc, icon: Icon, color }) => (
              <div
                key={num}
                className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-3 transition hover:border-teal-200 hover:bg-white"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg border ${color}`}>
                    <Icon size={15} />
                  </span>
                  <span className="text-[10px] font-extrabold tracking-widest text-slate-400">
                    {num}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900">{title}</p>
                <p className="mt-0.5 text-[11px] text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Colonne droite : Aperçu topologie pro */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="hidden sm:block"
        >
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Topologie cible · 802.1D / 802.1Q
              </span>
              <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700">
                Sans boucle
              </span>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-2">
              <svg viewBox="0 0 360 220" className="h-auto w-full">
                {/* Grille */}
                <defs>
                  <pattern id="intro-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="360" height="220" fill="url(#intro-grid)" />

                {/* Liens */}
                <line x1="180" y1="52" x2="82" y2="168" stroke="#0D9488" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="180" y1="52" x2="278" y2="168" stroke="#0D9488" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="82" y1="168" x2="278" y2="168" stroke="#F59E0B" strokeWidth="3" strokeDasharray="7 5" strokeLinecap="round" />

                {/* Badges ports */}
                <rect x="108" y="100" width="28" height="16" rx="4" fill="#DCFCE7" stroke="#86EFAC" />
                <text x="122" y="111" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803D">RP</text>

                <rect x="224" y="100" width="28" height="16" rx="4" fill="#DCFCE7" stroke="#86EFAC" />
                <text x="238" y="111" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#15803D">RP</text>

                <rect x="160" y="159" width="40" height="18" rx="5" fill="#FEF3C7" stroke="#FCD34D" />
                <text x="180" y="171" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#B45309">BLK</text>

                {/* SW1 Root */}
                <rect x="128" y="24" width="104" height="44" rx="10" fill="#0F766E" />
                <text x="180" y="44" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">SW1 · ROOT</text>
                <text x="180" y="58" textAnchor="middle" fontSize="8.5" fill="#CCFBF1">VLAN 10 / 20 / 30</text>

                {/* SW2 */}
                <rect x="30" y="146" width="104" height="44" rx="10" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
                <text x="82" y="166" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">SW2</text>
                <text x="82" y="180" textAnchor="middle" fontSize="8.5" fill="#64748B">Trunk 802.1Q</text>

                {/* SW3 */}
                <rect x="226" y="146" width="104" height="44" rx="10" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
                <text x="278" y="166" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F172A">SW3</text>
                <text x="278" y="180" textAnchor="middle" fontSize="8.5" fill="#64748B">Port Alt (BLK)</text>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pied de page : Intervenants */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="relative z-10 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3 sm:items-center"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <Users size={15} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
              Présenté par
            </p>
            <p className="text-xs font-semibold text-slate-800">Nom et prénom</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <UserCheck size={15} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
              Encadré par
            </p>
            <p className="text-xs font-semibold text-slate-800">M. / Mme [Nom]</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-2 sm:justify-end sm:border-t-0 sm:pt-0">
          <span className="text-[11px] font-bold tabular-nums text-slate-500">
            01 / 20
          </span>
        </div>
      </motion.footer>
    </section>
  )
}
