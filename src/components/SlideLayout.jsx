import { motion } from 'framer-motion'

/**
 * Unified, responsive layout wrapper for all presentation slides.
 * Ensures consistent light professional styling, header, footer, and responsive scrolling.
 */
export default function SlideLayout({
  section,
  badge,
  title,
  subtitle,
  slideNumber,
  totalSlides = 20,
  accent = 'teal',
  children,
}) {
  const accentColors = {
    teal: {
      bar: 'bg-teal-600',
      text: 'text-teal-700',
      pill: 'bg-teal-50 text-teal-700 border-teal-200/70',
    },
    blue: {
      bar: 'bg-blue-600',
      text: 'text-blue-700',
      pill: 'bg-blue-50 text-blue-700 border-blue-200/70',
    },
    amber: {
      bar: 'bg-amber-600',
      text: 'text-amber-700',
      pill: 'bg-amber-50 text-amber-700 border-amber-200/70',
    },
    red: {
      bar: 'bg-red-600',
      text: 'text-red-700',
      pill: 'bg-red-50 text-red-700 border-red-200/70',
    },
  }

  const theme = accentColors[accent] || accentColors.teal
  const pad = (v) => String(v).padStart(2, '0')

  return (
    <section className="flex min-h-full w-full flex-col rounded-2xl border border-slate-200/90 bg-white p-3.5 text-slate-800 shadow-sm sm:p-6 md:p-8">
      {/* En-tête unifié */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-4 shrink-0 border-b border-slate-100 pb-4"
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className={`h-1.5 w-7 rounded-full ${theme.bar}`} />
            <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${theme.text}`}>
              {section}
            </span>
          </div>

          {badge && (
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${theme.pill}`}>
              {badge}
            </span>
          )}
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            {subtitle}
          </p>
        )}
      </motion.header>

      {/* Contenu principal */}
      <div className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>

      {/* Pied de page unifié */}
      <footer className="mt-4 flex shrink-0 items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400">
        <span className="font-semibold tracking-wider text-slate-400">
          VLAN & PROTOCOLE STP · FST FÈS
        </span>
        <span className="font-bold tabular-nums text-slate-500">
          {pad(slideNumber)} / {pad(totalSlides)}
        </span>
      </footer>
    </section>
  )
}
