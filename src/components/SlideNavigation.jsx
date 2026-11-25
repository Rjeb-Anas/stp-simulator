import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react'

export default function SlideNavigation({
  current,
  total,
  next,
  previous
}) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 md:px-12 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left */}
        <div>
          <p className="text-xs text-slate-400 font-medium tracking-wider">
            PRÉSENTATION STP
          </p>
          <p className="text-sm font-semibold text-slate-700 mt-1">
            Diapositive {String(current + 1).padStart(2, '0')}
            <span className="text-slate-400">
              {' / '}{String(total).padStart(2, '0')}
            </span>
          </p>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center gap-2">
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-9 bg-blue-600'
                  : index < current
                  ? 'w-4 bg-cyan-400'
                  : 'w-4 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <button
            onClick={previous}
            disabled={current === 0}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={next}
            disabled={current === total - 1}
            className="flex items-center gap-2 px-5 h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-lg shadow-blue-600/20"
          >
            <span className="text-sm font-semibold hidden sm:block">
              Suivant
            </span>
            <ChevronRight size={19} />
          </button>

        </div>
      </div>
    </div>
  )
}