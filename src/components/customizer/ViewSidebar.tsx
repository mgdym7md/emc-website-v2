'use client'

import type { ViewPreset } from './KitchenVisualizer'

interface ViewSidebarProps {
  views: ViewPreset[]
  activeView: ViewPreset
  onViewChange: (view: ViewPreset) => void
}

export default function ViewSidebar({ views, activeView, onViewChange }: ViewSidebarProps) {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-dark-secondary/80 backdrop-blur-sm border border-accent-gold/20 border-r-0 py-2">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view)}
            className={`block w-full px-4 py-2 text-sm text-right transition-colors ${
              activeView.id === view.id
                ? 'bg-accent-gold/20 text-accent-gold'
                : 'text-accent-cream/60 hover:text-accent-cream hover:bg-dark-primary/50'
            }`}
          >
            {view.name}
          </button>
        ))}
      </div>
    </div>
  )
}
