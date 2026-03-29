'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/LanguageProvider'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-primary via-dark-primary/95 to-dark-primary" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-shape" style={{ top: '20%', left: '10%', width: 60, height: 60 }} />
        <div className="floating-shape" style={{ top: '60%', right: '15%', width: 100, height: 100, animationDelay: '2s' }} />
        <div className="floating-shape" style={{ bottom: '30%', left: '20%', width: 40, height: 40, animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-accent-gold/80 text-sm tracking-[0.3em] uppercase mb-6">
            Engineering Marble Contractors
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-4"
        >
          <span className="text-gradient">{t('hero.title')}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-accent-cream/80 mb-8"
        >
          {t('hero.subtitle')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-accent-cream/60 text-lg md:text-xl tracking-wide max-w-2xl mx-auto mb-12"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="#products" className="btn-primary">
            {t('hero.cta.explore')}
          </Link>
          <Link href="#contact" className="btn-secondary">
            {t('hero.cta.quote')}
          </Link>
        </motion.div>

        {/* 3D Customizer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12"
        >
          <Link
            href="/customizer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-gold/20 to-accent-rose/20 border border-accent-gold/30 text-accent-gold hover:from-accent-gold/30 hover:to-accent-rose/30 transition-all duration-300 group"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            <span className="text-sm tracking-wider uppercase">Try Our 3D Kitchen Visualizer</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-accent-cream/40 text-xs tracking-widest uppercase">
          {t('hero.scroll')}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-accent-gold/50 to-transparent animate-pulse-slow" />
      </motion.div>
    </section>
  )
}
