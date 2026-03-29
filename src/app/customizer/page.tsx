'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Link from 'next/link'

// Dynamic import for Three.js components (client-side only)
const KitchenVisualizer = dynamic(
  () => import('@/components/customizer/KitchenVisualizer'),
  { ssr: false }
)

export default function CustomizerPage() {
  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Back Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-dark-primary/80 backdrop-blur-sm border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>

      {/* 3D Visualizer */}
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin mx-auto mb-4" />
              <p className="text-accent-cream/60">Loading 3D Visualizer...</p>
            </div>
          </div>
        }
      >
        <KitchenVisualizer />
      </Suspense>
    </div>
  )
}
