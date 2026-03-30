'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  logoUrl?: string | null
}

export default function Navbar({ logoUrl }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'products', label: t('nav.products') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') },
  ]

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    if (isHomePage) {
      // On home page, scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // On other pages, navigate to home with hash
      router.push(`/#${sectionId}`)
    }
  }, [isHomePage, router])

  // Handle hash navigation after page load
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const sectionId = window.location.hash.slice(1)
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [isHomePage, pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-primary/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 relative">
            {logoUrl ? (
              <Image src={logoUrl} alt="EMC Logo" width={40} height={40} className="w-full h-full object-contain" />
            ) : (
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <rect x="2" y="2" width="36" height="36" stroke="currentColor" strokeWidth="1" className="text-accent-gold" />
                <rect x="8" y="8" width="24" height="24" stroke="currentColor" strokeWidth="1" className="text-accent-gold/60" />
                <rect x="14" y="14" width="12" height="12" fill="currentColor" className="text-accent-gold" />
              </svg>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-semibold tracking-wider text-accent-gold">EMC</span>
            <span className="text-[10px] tracking-[0.2em] text-accent-cream/60 uppercase">Stone Masters</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-sm tracking-wider uppercase transition-colors duration-300 text-accent-cream/70 hover:text-accent-gold cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/customizer"
            className="px-4 py-2 bg-accent-gold/10 border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/20 text-sm tracking-wider uppercase transition-colors duration-300"
          >
            {t('nav.customizer')}
          </Link>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-accent-cream/70 hover:text-accent-gold transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 text-sm border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 transition-colors"
          >
            {language === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-accent-cream/70 hover:text-accent-gold transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-primary/98 backdrop-blur-md border-t border-accent-gold/10"
          >
            <div className="container-custom py-6 px-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-sm tracking-wider uppercase py-2 transition-colors text-accent-cream/70 hover:text-accent-gold cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/customizer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm tracking-wider uppercase py-2 text-accent-gold"
              >
                {t('nav.customizer')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
