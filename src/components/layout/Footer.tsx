'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/components/providers/LanguageProvider'

interface FooterProps {
  logoUrl?: string | null
}

export default function Footer({ logoUrl }: FooterProps) {
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'

  const handleSectionClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    if (isHomePage) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(`/#${sectionId}`)
    }
  }, [isHomePage, router])

  const productLinks = [
    { id: 'products', label: 'Marble' },
    { id: 'products', label: 'Granite' },
    { id: 'products', label: 'Sandstone' },
    { id: 'products', label: 'Basalt' },
  ]

  const companyLinks = [
    { id: 'about', label: 'About Us', isSection: true },
    { id: 'services', label: 'Services', isSection: true },
    { href: '/customizer', label: '3D Customizer', isSection: false },
    { id: 'contact', label: 'Contact', isSection: true },
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/emc-egypt',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/emc_egypt',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/emcegypt',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-dark-secondary border-t border-accent-gold/10">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10">
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
              <span className="font-heading text-xl font-semibold tracking-wider text-accent-gold">EMC</span>
            </Link>
            <p className="text-accent-cream/60 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-cream/40 hover:text-accent-gold transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading text-lg text-accent-gold mb-6">{t('footer.products')}</h4>
            <ul className="space-y-3">
              {productLinks.map((link, idx) => (
                <li key={`${link.label}-${idx}`}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(e) => handleSectionClick(e, link.id)}
                    className="text-accent-cream/60 hover:text-accent-gold text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-lg text-accent-gold mb-6">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, idx) => (
                <li key={`${link.label}-${idx}`}>
                  {link.isSection ? (
                    <a
                      href={`/#${link.id}`}
                      onClick={(e) => handleSectionClick(e, link.id!)}
                      className="text-accent-cream/60 hover:text-accent-gold text-sm transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href!}
                      className="text-accent-cream/60 hover:text-accent-gold text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-lg text-accent-gold mb-6">Stay Updated</h4>
            <p className="text-accent-cream/60 text-sm mb-4">
              Subscribe for the latest stone collections and industry insights.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-dark-primary border border-accent-gold/20 text-accent-cream text-sm placeholder:text-accent-cream/40 focus:outline-none focus:border-accent-gold/50"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent-gold text-dark-primary text-sm hover:bg-accent-cream transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-accent-gold/10 text-center">
          <p className="text-accent-cream/40 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
