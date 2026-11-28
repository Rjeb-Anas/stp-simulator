
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronUp,
  ChevronDown,
  Maximize,
  Minimize,
  Presentation,
} from 'lucide-react'

import PresentationStart from './components/PresentationStart'

// Import des 20 diapositives
import Introduction from './slides/Introduction'
import Problem from './slides/Problem'
import VLAN from './slides/VLAN'
import VLANExample from './slides/VLANExample'
import Trunk from './slides/Trunk'
import Layer2Loops from './slides/Layer2Loops'
import STPExplanation from './slides/STPExplanation'
import BPDU from './slides/BPDU'
import RootBridge from './slides/RootBridge'
import PortRoles from './slides/PortRoles'
import PortStates from './slides/PortStates'
import STPCost from './slides/STPCost'
import Topology from './slides/Topology'
import VLANConfiguration from './slides/VLANConfiguration'
import STPConfiguration from './slides/STPConfiguration'
import SimulationSansSTP from './slides/SimulationSansSTP'
import SimulationAvecSTP from './slides/SimulationAvecSTP'
import LinkFailure from './slides/LinkFailure'
import Analysis from './slides/Analysis'
import Conclusion from './slides/Conclusion'

// Liste des diapositives
const slides = [
  Introduction,
  Problem,
  VLAN,
  VLANExample,
  Trunk,
  Layer2Loops,
  STPExplanation,
  BPDU,
  RootBridge,
  PortRoles,
  PortStates,
  STPCost,
  Topology,
  VLANConfiguration,
  STPConfiguration,
  SimulationSansSTP,
  SimulationAvecSTP,
  LinkFailure,
  Analysis,
  Conclusion,
]

// Indices des diapositives qui possèdent leurs propres étapes
const simulationSlides = [15, 16, 17]

export default function App() {
  const [started, setStarted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const totalSlides = slides.length
  const CurrentSlide = slides[currentSlide]

  // Diapositive suivante
  const nextSlide = useCallback(() => {
    setCurrentSlide((current) =>
      Math.min(current + 1, totalSlides - 1)
    )
  }, [totalSlides])

  // Diapositive précédente
  const previousSlide = useCallback(() => {
    setCurrentSlide((current) =>
      Math.max(current - 1, 0)
    )
  }, [])

  // Démarrer la présentation (plein écran si supporté)
  const startPresentation = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen()
      }
    } catch {
      // Sur mobile / certains navigateurs, le plein écran peut être bloqué :
      // on démarre la présentation normalement sans bloquer l'utilisateur.
    }
    setCurrentSlide(0)
    setStarted(true)
  }

  // Quitter la présentation
  const exitPresentation = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    }

    setStarted(false)
    setCurrentSlide(0)
  }

  // Détecter l'état du plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreen = Boolean(document.fullscreenElement)

      setIsFullscreen(fullscreen)

      if (!fullscreen && started) {
        setStarted(false)
        setCurrentSlide(0)
      }
    }

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange
    )

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange
      )
    }
  }, [started])

  // Navigation clavier pour les diapositives normales
  useEffect(() => {
    if (!started) return

    const handleKeyDown = (event) => {
      // Les simulations gèrent elles-mêmes les flèches
      if (simulationSlides.includes(currentSlide)) return

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        nextSlide()
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        previousSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [started, currentSlide, nextSlide, previousSlide])

  // Écran de démarrage
  if (!started) {
    return (
      <PresentationStart onStart={startPresentation} />
    )
  }

  return (
    <main className="fixed inset-0 flex h-dvh w-screen flex-col overflow-hidden bg-slate-100">

      {/* Barre supérieure */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 text-slate-800 sm:px-5 md:px-8">

        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <Presentation size={16} />
          </div>

          <span className="truncate text-xs font-bold tracking-wide text-slate-900 sm:text-sm">
            VLAN & PROTOCOLE STP
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <span className="hidden text-xs font-medium text-slate-500 sm:inline">
            FST Fès · 2026–2027
          </span>

          <button
            onClick={exitPresentation}
            title="Quitter la présentation"
            className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Minimize size={16} />
          </button>
        </div>
      </header>

      {/* Zone des diapositives */}
      <section className="relative min-h-0 flex-1 overflow-hidden bg-slate-100 p-2 sm:p-3 md:p-5">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="mx-auto h-full w-full max-w-7xl overflow-y-auto overflow-x-hidden"
          >
            {simulationSlides.includes(currentSlide) ? (
              <CurrentSlide
                onComplete={nextSlide}
                onPreviousSlide={previousSlide}
              />
            ) : (
              <CurrentSlide />
            )}
          </motion.div>
        </AnimatePresence>

      </section>

      {/* Barre inférieure */}
      <footer className="flex h-13 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-3 text-slate-800 sm:px-5 md:px-8">

        {/* Progression */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold tabular-nums text-slate-600">
            {String(currentSlide + 1).padStart(2, '0')}
            {' / '}
            {String(totalSlides).padStart(2, '0')}
          </span>

          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 md:w-44">
            <motion.div
              className="h-full rounded-full bg-teal-600"
              animate={{
                width: `${((currentSlide + 1) / totalSlides) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">

          <button
            onClick={previousSlide}
            disabled={currentSlide === 0}
            title="Diapositive précédente"
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronUp size={18} />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            title="Diapositive suivante"
            className="rounded-lg bg-teal-600 p-2 text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronDown size={18} />
          </button>

        </div>
      </footer>
    </main>
  )
}
