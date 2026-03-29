import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Products from '@/components/sections/Products'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'
import { getProducts, getServices, getAboutContent, getContactInfo } from '@/lib/strapi'

export const dynamic = 'force-dynamic' // Always fetch fresh data from Strapi

export default async function Home() {
  // Fetch data from Strapi CMS (with fallback to static data)
  const [products, services, about, contact] = await Promise.all([
    getProducts(),
    getServices(),
    getAboutContent(),
    getContactInfo(),
  ])

  return (
    <>
      <Hero />
      <About data={about} />
      <Products data={products} />
      <Services data={services} />
      <Contact data={contact} />
    </>
  )
}
