'use client'

import Image from 'next/image'
import type { Material, SurfaceType } from './KitchenVisualizer'

interface MaterialSidebarProps {
  materials: Material[]
  selectedMaterial: Material | null
  onMaterialSelect: (material: Material) => void
  filterType: 'all' | 'marble' | 'granite'
  onFilterChange: (type: 'all' | 'marble' | 'granite') => void
  selectedSurface: SurfaceType | null
}

export default function MaterialSidebar({
  materials,
  selectedMaterial,
  onMaterialSelect,
  filterType,
  onFilterChange,
  selectedSurface,
}: MaterialSidebarProps) {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-dark-secondary/95 backdrop-blur-sm border-r border-accent-gold/20 z-40 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-accent-gold/20">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-accent-gold/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <span className="text-accent-gold font-medium text-sm tracking-wider uppercase">Stone</span>
        </div>

        {/* Filter */}
        <div className="space-y-2">
          <span className="text-accent-cream/50 text-xs uppercase tracking-wider">Filter</span>
          <div className="flex gap-1">
            {(['all', 'marble', 'granite'] as const).map((type) => (
              <button
                key={type}
                onClick={() => onFilterChange(type)}
                className={`flex-1 px-2 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                  filterType === type
                    ? 'bg-accent-gold text-dark-primary'
                    : 'bg-dark-primary/50 text-accent-cream/60 hover:text-accent-cream'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instruction */}
      {!selectedSurface && (
        <div className="p-4 bg-accent-gold/10 border-b border-accent-gold/20">
          <p className="text-accent-cream/70 text-xs">
            Click on a surface in the 3D view to start customizing
          </p>
        </div>
      )}

      {/* Materials List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {materials.map((material) => (
          <button
            key={material.id}
            onClick={() => onMaterialSelect(material)}
            disabled={!selectedSurface}
            className={`w-full flex items-center gap-3 p-2 transition-all group ${
              selectedMaterial?.id === material.id
                ? 'bg-accent-gold/20 border border-accent-gold/50'
                : 'hover:bg-dark-primary/50 border border-transparent'
            } ${!selectedSurface ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {/* Thumbnail or Color Swatch */}
            <div className="relative w-14 h-14 overflow-hidden flex-shrink-0">
              {material.thumbnail ? (
                <>
                  <Image
                    src={material.thumbnail}
                    alt={material.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 mix-blend-overlay opacity-30"
                    style={{ backgroundColor: material.color }}
                  />
                </>
              ) : (
                <div
                  className="w-full h-full border border-accent-gold/20"
                  style={{ backgroundColor: material.color }}
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-left">
              <h4 className={`text-sm font-medium ${
                selectedMaterial?.id === material.id ? 'text-accent-gold' : 'text-accent-cream'
              }`}>
                {material.name}
              </h4>
              <span className="text-xs text-accent-cream/50 uppercase tracking-wider">
                {material.type}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 text-accent-cream/40 hover:text-accent-gold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </button>
              <button className="p-1 text-accent-cream/40 hover:text-accent-gold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>
          </button>
        ))}
      </div>

      {/* Close button */}
      <button className="absolute top-4 right-4 p-1 text-accent-cream/40 hover:text-accent-cream">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
