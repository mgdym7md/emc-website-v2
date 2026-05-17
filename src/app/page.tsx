import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Products from '@/components/sections/Products'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import { getLocalizedProducts, getLocalizedServices, getAboutContent, getContactInfo, getHeroContent } from '@/lib/strapi'

export const dynamic = 'force-dynamic' // Always fetch fresh data from Strapi

export default async function Home() {
  // Fetch data from Strapi CMS (with fallback to static data)
  const [products, services, about, contact, hero] = await Promise.all([
    getLocalizedProducts(),
    getLocalizedServices(),
    getAboutContent(),
    getContactInfo(),
    getHeroContent(),
  ])

  return (
    <>
      <Hero data={hero} />
      <About data={about} />
      <Products data={products} />
      <Services data={services} />
      <Contact data={contact} />
    </>
  )
}
