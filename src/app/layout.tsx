import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/strapi'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
    keywords: settings.seoKeywords.split(',').map((k) => k.trim()),
    metadataBase: new URL(settings.canonicalUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: settings.canonicalUrl,
      siteName: settings.siteName,
      type: 'website',
      ...(settings.ogImageUrl && {
        images: [{ url: settings.ogImageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seoTitle,
      description: settings.seoDescription,
      ...(settings.twitterHandle && { site: settings.twitterHandle }),
      ...(settings.ogImageUrl && { images: [settings.ogImageUrl] }),
    },
    ...(settings.faviconUrl && {
      icons: { icon: settings.faviconUrl },
    }),
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${montserrat.variable} font-body bg-dark-primary text-accent-cream`}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar logoUrl={settings.logoUrl} />
            <main>{children}</main>
            <Footer logoUrl={settings.logoUrl} />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
