import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Play,
  Pause,
  Terminal,
} from 'lucide-react'

/**
 * Shared Switch SVG node for network topology simulations.
 */
export function SwitchNode({
  x,
  y,
  name,
  mac,
  priority,
  isRoot = false,
  cpu = 12,
  status = 'normal', // 'normal' | 'root' | 'warning' | 'danger'
  ports = ['up', 'up'],
}) {
  const styles = {
    root: {
      fill: '#0F766E',
      stroke: '#0D9488',
      subText: '#CCFBF1',
      badgeBg: '#CCFBF1',
      badgeText: '#0F766E',
    },
    normal: {
      fill: '#FFFFFF',
      stroke: '#CBD5E1',
      subText: '#64748B',
      badgeBg: '#F1F5F9',
      badgeText: '#475569',
    },
    warning: {
      fill: '#FFFBEB',
      stroke: '#F59E0B',
      subText: '#B45309',
      badgeBg: '#FEF3C7',
      badgeText: '#B45309',
    },
    danger: {
      fill: '#FEF2F2',
      stroke: '#EF4444',
      subText: '#DC2626',
      badgeBg: '#FEE2E2',
      badgeText: '#DC2626',
    },
  }

  const s = styles[status] || styles.normal
  const isDark = status === 'root'

  return (
    <g transform={`translate(${x - 74}, ${y - 34})`}>
      {/* Halo pour Root Bridge ou alerte */}
      {isRoot && (
        <motion.rect
          x="-6"
          y="-6"
          width="160"
          height="80"
          rx="16"
          fill="none"
          stroke="#14B8A6"
          strokeWidth="2"
          strokeDasharray="6 4"
          animate={{ opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      )}

      {/* Corps du switch */}
      <rect
        x="0"
        y="0"
        width="148"
        height="68"
        rx="12"
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth="2"
        filter="drop-shadow(0 4px 6px rgba(15, 23, 42, 0.06))"
      />

      {/* Barre supérieure technique */}
      <rect
        x="10"
        y="10"
        width="28"
        height="16"
        rx="4"
        fill={isDark ? 'rgba(255,255,255,0.16)' : '#F1F5F9'}
      />
      {/* LEDs de ports */}
      {ports.map((p, idx) => {
        const ledColor =
          p === 'up'
            ? '#22C55E'
            : p === 'blk'
            ? '#F59E0B'
            : p === 'down'
            ? '#EF4444'
            : '#94A3B8'
        return (
          <circle
            key={idx}
            cx={18 + idx * 10}
            cy="18"
            r="3"
            fill={ledColor}
          />
        )
      })}

      {/* Badge rôle / priorité */}
      <rect
        x="82"
        y="9"
        width="56"
        height="18"
        rx="5"
        fill={s.badgeBg}
      />
      <text
        x="110"
        y="21"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill={s.badgeText}
      >
        {isRoot ? 'ROOT' : `P:${priority}`}
      </text>

      {/* Nom et MAC */}
      <text
        x="12"
        y="43"
        fontSize="14"
        fontWeight="800"
        fill={isDark ? '#FFFFFF' : '#0F172A'}
      >
        {name}
      </text>
      <text
        x="136"
        y="43"
        textAnchor="end"
        fontSize="9"
        fontFamily="monospace"
        fill={s.subText}
      >
        {mac}
      </text>

      {/* Barre CPU */}
      <rect
        x="12"
        y="53"
        width="124"
        height="5"
        rx="2.5"
        fill={isDark ? 'rgba(255,255,255,0.2)' : '#E2E8F0'}
      />
      <motion.rect
        x="12"
        y="53"
        height="5"
        rx="2.5"
        fill={cpu > 80 ? '#EF4444' : cpu > 45 ? '#F59E0B' : isDark ? '#5EEAD4' : '#0D9488'}
        animate={{ width: Math.max(8, (124 * Math.min(cpu, 100)) / 100) }}
        transition={{ duration: 0.45 }}
      />
    </g>
  )
}

/**
 * Port role/state pill rendered on SVG topology links.
 */
export function PortBadge({ x, y, port, role, state = 'fwd' }) {
  const palette = {
    fwd: { bg: '#DCFCE7', border: '#86EFAC', text: '#15803D' },
    blk: { bg: '#FEF3C7', border: '#FCD34D', text: '#B45309' },
    down: { bg: '#FEE2E2', border: '#FCA5A5', text: '#DC2626' },
    neutral: { bg: '#F1F5F9', border: '#CBD5E1', text: '#475569' },
  }
  const c = palette[state] || palette.neutral
  const label = role ? `${port} · ${role}` : port

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="-34"
        y="-11"
        width="68"
        height="22"
        rx="6"
        fill={c.bg}
        stroke={c.border}
        strokeWidth="1.5"
      />
      <text
        x="0"
        y="3.5"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        fontFamily="monospace"
        fill={c.text}
      >
        {label}
      </text>
    </g>
  )
}

/**
 * Unified, responsive layout for interactive network simulation slides.
 */
export default function SimulationLayout({
  section,
  title,
  subtitle,
  badge,
  accent = 'teal', // 'teal' | 'red' | 'blue'
  slideNumber,
  totalSlides = 20,
  steps,
  step,
  onStepSelect,
  onNext,
  onPrev,
  onReset,
  isPlaying,
  onTogglePlay,
  icon: HeaderIcon,
  diagram,
  legend,
  metrics = [],
  logs = [],
}) {
  const themes = {
    teal: {
      bar: 'bg-teal-600',
      text: 'text-teal-700',
      iconBox: 'border-teal-200 bg-teal-50 text-teal-700',
      pill: 'bg-teal-100 text-teal-700',
      progress: 'bg-teal-600',
      activeCard: 'border-teal-300 bg-teal-50/70',
      activeBtn: 'bg-teal-600 hover:bg-teal-700',
    },
    red: {
      bar: 'bg-red-600',
      text: 'text-red-600',
      iconBox: 'border-red-200 bg-red-50 text-red-600',
      pill: 'bg-red-100 text-red-700',
      progress: 'bg-red-600',
      activeCard: 'border-red-300 bg-red-50/70',
      activeBtn: 'bg-red-600 hover:bg-red-700',
    },
    blue: {
      bar: 'bg-blue-600',
      text: 'text-blue-700',
      iconBox: 'border-blue-200 bg-blue-50 text-blue-700',
      pill: 'bg-blue-100 text-blue-700',
      progress: 'bg-blue-600',
      activeCard: 'border-blue-300 bg-blue-50/70',
      activeBtn: 'bg-blue-600 hover:bg-blue-700',
    },
  }

  const t = themes[accent] || themes.teal
  const currentStep = steps[step]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()
        onNext()
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        e.stopPropagation()
        onPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [onNext, onPrev])

  return (
    <section className="flex min-h-full w-full flex-col rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5 lg:h-full lg:overflow-hidden">
      {/* En-tête */}
      <header className="mb-3 shrink-0 border-b border-slate-100 pb-2.5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className={`h-1.5 w-6 rounded-full ${t.bar}`} />
              <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${t.text}`}>
                {section}
              </span>
            </div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          {HeaderIcon && (
            <div className={`hidden rounded-xl border p-2.5 sm:block ${t.iconBox}`}>
              <HeaderIcon size={20} />
            </div>
          )}
        </div>
      </header>

      {/* Barre de progression interactive */}
      <div className="mb-3 flex shrink-0 gap-1.5">
        {steps.map((s, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onStepSelect(index)}
            title={s.title}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              index <= step ? t.progress : 'bg-slate-200 hover:bg-slate-300'
            }`}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3.5 lg:grid-cols-[1.55fr_1fr]">
        {/* Colonne gauche : Topologie + Télémétrie */}
        <div className="flex min-h-[290px] flex-col gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <div className="flex shrink-0 items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700">
              Topologie interactive
            </span>
            <div className="flex items-center gap-2">
              {badge}
            </div>
          </div>

          {/* Canvas SVG */}
          <div className="relative flex min-h-[200px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-white">
            {diagram}
          </div>

          {/* Légende */}
          {legend && (
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500">
              {legend}
            </div>
          )}

          {/* Télémétrie en direct */}
          {metrics.length > 0 && (
            <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {m.label}
                  </p>
                  <p className={`mt-0.5 text-xs font-extrabold tabular-nums ${m.color || 'text-slate-900'}`}>
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Colonne droite : Étape + Console IOS + Timeline */}
        <div className="flex min-h-0 flex-col gap-2.5">
          {/* Explication de l'étape */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className={`shrink-0 rounded-xl border p-3.5 ${t.activeCard}`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${t.text}`}>
                  Étape {step + 1} / {steps.length}
                </span>
                {currentStep.statusBadge}
              </div>
              <h2 className="text-sm font-bold text-slate-900">
                {currentStep.title}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-700">
                {currentStep.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Console / Journal d'événements STP */}
          <div className="flex min-h-[110px] flex-1 flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-slate-100">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-3 py-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                <Terminal size={12} className="text-teal-400" />
                <span>Console STP / Syslog</span>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto p-2.5 font-mono text-[10.5px] leading-relaxed">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.level === 'error'
                      ? 'text-red-400'
                      : log.level === 'warn'
                      ? 'text-amber-300'
                      : log.level === 'success'
                      ? 'text-emerald-400'
                      : 'text-slate-300'
                  }
                >
                  <span className="text-slate-500">[{log.time}] </span>
                  {log.text}
                </div>
              ))}
            </div>
          </div>

          {/* Liste cliquable des étapes */}
          <div className="shrink-0 space-y-1">
            {steps.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onStepSelect(index)}
                className={`flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-left text-xs transition ${
                  index === step
                    ? `${t.activeCard} font-bold text-slate-900`
                    : index < step
                    ? 'border-slate-200 bg-slate-50 text-slate-700'
                    : 'border-slate-200/70 bg-white text-slate-400 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    index < step
                      ? 'bg-teal-600 text-white'
                      : index === step
                      ? `${t.progress} text-white`
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {index < step ? '✓' : index + 1}
                </span>
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Barre de contrôles */}
      <footer className="mt-3 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowUp size={14} />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause' : 'Lecture'}</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition ${t.activeBtn}`}
          >
            <span className="hidden sm:inline">Suivant</span>
            <ArrowDown size={14} />
          </button>

          <button
            type="button"
            onClick={onReset}
            title="Réinitialiser la simulation"
            className="rounded-lg border border-slate-300 bg-white p-1.5 text-slate-600 transition hover:bg-slate-100"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="font-bold tabular-nums text-slate-700">
            Étape {step + 1} / {steps.length}
          </span>
          <span className="hidden font-semibold tracking-widest text-slate-400 sm:inline">
            SIMULATION · {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </footer>
    </section>
  )
}
