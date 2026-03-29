'use client'

import { useState, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, PerspectiveCamera, Sky } from '@react-three/drei'
import MaterialSidebar from './MaterialSidebar'
import ViewSidebar from './ViewSidebar'
import KitchenScene from './KitchenScene'
import Toolbar from './Toolbar'
import { useLanguage } from '@/components/providers/LanguageProvider'

export type SurfaceType = 'countertop' | 'island' | 'backsplash' | 'floor'

export interface Material {
  id: number
  name: string
  type: 'marble' | 'granite' | 'other'
  thumbnail: string
  color: string
}

export interface ViewPreset {
  id: number
  name: string
  position: [number, number, number]
  target: [number, number, number]
}

const defaultMaterials: Material[] = [
  { id: 1, name: 'Galala Classic', type: 'marble', thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200', color: '#e8dcc8' },
  { id: 2, name: 'Sunny Marble', type: 'marble', thumbnail: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=200', color: '#f5e6c8' },
  { id: 3, name: 'Sinai Pearl', type: 'marble', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200', color: '#f0ebe5' },
  { id: 4, name: 'Milly Grey', type: 'marble', thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200', color: '#9a9a9a' },
  { id: 5, name: 'Imprador', type: 'marble', thumbnail: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=200', color: '#8b6914' },
  { id: 6, name: 'Breccia', type: 'marble', thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200', color: '#c4a882' },
  { id: 7, name: 'Black Star', type: 'granite', thumbnail: 'https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?w=200', color: '#1a1a1a' },
  { id: 8, name: 'New Halayb', type: 'granite', thumbnail: 'https://images.unsplash.com/photo-1600566752734-2a0cd66c42b5?w=200', color: '#4a4a4a' },
  { id: 9, name: 'Rosa Nasr', type: 'granite', thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200', color: '#d4a5a5' },
  { id: 10, name: 'Red Royal', type: 'granite', thumbnail: 'https://images.unsplash.com/photo-1600573472572-8aba3fca8d8a?w=200', color: '#8b3a3a' },
  { id: 11, name: 'Verdi Green', type: 'granite', thumbnail: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=200', color: '#3a5a3a' },
  { id: 12, name: 'Golden Sinai', type: 'granite', thumbnail: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=200', color: '#c9a962' },
]

const viewPresets: ViewPreset[] = [
  { id: 1, name: 'View 1', position: [8, 5, 8], target: [0, 0, 0] },
  { id: 2, name: 'View 2', position: [-8, 5, 8], target: [0, 0, 0] },
  { id: 3, name: 'View 3', position: [0, 8, 10], target: [0, 0, 0] },
  { id: 4, name: 'View 4', position: [10, 3, 0], target: [0, 0, 0] },
  { id: 5, name: 'View 5', position: [0, 10, 0], target: [0, 0, 0] },
  { id: 6, name: 'View 6', position: [-5, 4, -8], target: [0, 0, 0] },
]

export default function KitchenVisualizer() {
  const { t } = useLanguage()
  const [selectedSurface, setSelectedSurface] = useState<SurfaceType | null>(null)
  const [surfaceMaterials, setSurfaceMaterials] = useState<Record<SurfaceType, Material>>({
    countertop: defaultMaterials[0],
    island: defaultMaterials[0],
    backsplash: defaultMaterials[3],
    floor: defaultMaterials[7],
  })
  const [activeView, setActiveView] = useState<ViewPreset>(viewPresets[0])
  const [filterType, setFilterType] = useState<'all' | 'marble' | 'granite'>('all')
  const [showHelp, setShowHelp] = useState(false)

  const filteredMaterials = defaultMaterials.filter(m =>
    filterType === 'all' || m.type === filterType
  )

  const handleSurfaceClick = useCallback((surface: SurfaceType) => {
    setSelectedSurface(surface)
  }, [])

  const handleMaterialSelect = useCallback((material: Material) => {
    if (selectedSurface) {
      setSurfaceMaterials(prev => ({
        ...prev,
        [selectedSurface]: material,
      }))
    }
  }, [selectedSurface])

  const handleViewChange = useCallback((view: ViewPreset) => {
    setActiveView(view)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Material Sidebar (Left) */}
      <MaterialSidebar
        materials={filteredMaterials}
        selectedMaterial={selectedSurface ? surfaceMaterials[selectedSurface] : null}
        onMaterialSelect={handleMaterialSelect}
        filterType={filterType}
        onFilterChange={setFilterType}
        selectedSurface={selectedSurface}
      />

      {/* 3D Canvas */}
      <Canvas shadows className="bg-dark-primary">
        <PerspectiveCamera
          makeDefault
          position={activeView.position}
          fov={50}
        />
        <OrbitControls
          target={activeView.target}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Lighting - Studio setup without external HDR */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-5, 8, -5]} intensity={0.4} />
        <directionalLight position={[0, 5, 10]} intensity={0.3} />
        <hemisphereLight args={['#ffeeb1', '#080820', 0.5]} />

        {/* Sky for ambient lighting */}
        <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />

        {/* Kitchen Scene */}
        <Suspense fallback={null}>
          <KitchenScene
            surfaceMaterials={surfaceMaterials}
            selectedSurface={selectedSurface}
            onSurfaceClick={handleSurfaceClick}
          />
        </Suspense>

        {/* Floor Shadow */}
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
        />
      </Canvas>

      {/* View Sidebar (Right) */}
      <ViewSidebar
        views={viewPresets}
        activeView={activeView}
        onViewChange={handleViewChange}
      />

      {/* Toolbar (Bottom) */}
      <Toolbar
        onHelpClick={() => setShowHelp(true)}
        selectedSurface={selectedSurface}
        surfaceMaterials={surfaceMaterials}
      />

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-dark-secondary border border-accent-gold/30 p-8 max-w-lg">
            <h3 className="font-heading text-2xl text-accent-gold mb-4">How to Use</h3>
            <ul className="space-y-3 text-accent-cream/70">
              <li className="flex items-start gap-3">
                <span className="text-accent-gold">1.</span>
                <span>Click on any surface (countertop, island, backsplash, floor) to select it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold">2.</span>
                <span>Choose a stone material from the left sidebar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold">3.</span>
                <span>Use the filter to show only marble or granite options</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold">4.</span>
                <span>Switch between camera views using the right sidebar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-gold">5.</span>
                <span>Drag to rotate, scroll to zoom, right-click to pan</span>
              </li>
            </ul>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 btn-primary w-full"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Selected Surface Indicator */}
      {selectedSurface && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
          <div className="px-6 py-2 bg-accent-gold text-dark-primary text-sm font-medium tracking-wider uppercase">
            {t(`customizer.${selectedSurface}`)} Selected
          </div>
        </div>
      )}
    </div>
  )
}
