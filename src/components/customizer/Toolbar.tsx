'use client'

import type { Material, SurfaceType } from './KitchenVisualizer'

interface ToolbarProps {
  onHelpClick: () => void
  selectedSurface: SurfaceType | null
  surfaceMaterials: Record<SurfaceType, Material>
}

export default function Toolbar({ onHelpClick, selectedSurface, surfaceMaterials }: ToolbarProps) {
  const handleShare = () => {
    // Create shareable configuration
    const config = {
      countertop: surfaceMaterials.countertop.name,
      island: surfaceMaterials.island.name,
      backsplash: surfaceMaterials.backsplash.name,
      floor: surfaceMaterials.floor.name,
    }
    const text = `Check out my kitchen design!\nCountertop: ${config.countertop}\nIsland: ${config.island}\nBacksplash: ${config.backsplash}\nFloor: ${config.floor}`

    if (navigator.share) {
      navigator.share({
        title: 'EMC Kitchen Design',
        text,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Configuration copied to clipboard!')
    }
  }

  const handleScreenshot = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const link = document.createElement('a')
      link.download = 'emc-kitchen-design.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  const handleReset = () => {
    window.location.reload()
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Help */}
      <button
        onClick={onHelpClick}
        className="w-10 h-10 bg-dark-secondary/80 backdrop-blur-sm border border-accent-gold/20 flex items-center justify-center text-accent-cream/60 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
        title="Help"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        className="w-10 h-10 bg-dark-secondary/80 backdrop-blur-sm border border-accent-gold/20 flex items-center justify-center text-accent-cream/60 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
        title="Share"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </button>

      {/* More Options */}
      <button
        className="w-10 h-10 bg-dark-secondary/80 backdrop-blur-sm border border-accent-gold/20 flex items-center justify-center text-accent-cream/60 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
        title="More options"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
      </button>

      {/* Screenshot */}
      <button
        onClick={handleScreenshot}
        className="w-10 h-10 bg-dark-secondary/80 backdrop-blur-sm border border-accent-gold/20 flex items-center justify-center text-accent-cream/60 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
        title="Take screenshot"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
      </button>

      {/* Fullscreen */}
      <button
        onClick={() => document.documentElement.requestFullscreen?.()}
        className="w-10 h-10 bg-dark-secondary/80 backdrop-blur-sm border border-accent-gold/20 flex items-center justify-center text-accent-cream/60 hover:text-accent-gold hover:border-accent-gold/40 transition-colors"
        title="Fullscreen"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      </button>
    </div>
  )
}
