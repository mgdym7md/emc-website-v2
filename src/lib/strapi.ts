// Strapi CMS API Helper Functions

// Force runtime env var resolution - webpack cannot inline dynamic lookups
const env = (key: string) => process.env[key]

function getStrapiApiUrl() {
  return env('STRAPI_URL') || env('NEXT_PUBLIC_STRAPI_URL') || 'http://localhost:1337'
}
function getStrapiPublicUrl() {
  return env('NEXT_PUBLIC_STRAPI_URL') || 'http://localhost:1337'
}
function getStrapiToken() {
  return env('STRAPI_API_TOKEN')
}

// Types
export interface SiteSettings {
  siteName: string
  logoUrl: string | null
  faviconUrl: string | null
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  ogImageUrl: string | null
  canonicalUrl: string
  twitterHandle: string | null
}

export interface Product {
  id: number
  name: string
  slug?: string
  type: 'marble' | 'granite' | 'other'
  category: string
  description?: string
  image: string
  color?: string
  specifications?: {
    origin?: string
    finish?: string
    thickness?: string
  }
  order?: number
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  order?: number
}

export interface AboutContent {
  title: string
  subtitle: string
  description: string[]
  stats: { value: string; label: string }[]
  images: string[]
  mission?: string
  vision?: string
}

export interface ContactInfo {
  location: string
  address?: string
  phone: string
  email: string
  socialLinks: {
    linkedin?: string
    instagram?: string
    facebook?: string
    whatsapp?: string
  }
  mapUrl?: string
}

export interface HeroContent {
  tagline: string
  title: string
  subtitle: string
  description: string
  ctaExploreText: string
  ctaQuoteText: string
  scrollText: string
  customizerCtaText: string
  backgroundImageUrl: string | null
}

// Fallback Data (used when Strapi is unavailable)
const fallbackProducts: Product[] = [
  { id: 1, name: 'Galala Classic', type: 'marble', category: 'marble', color: '#e8dcc8', image: '', description: 'Premium Egyptian marble with warm beige tones', order: 1 },
  { id: 2, name: 'Sunny Marble', type: 'marble', category: 'marble', color: '#f5e6c8', image: '', description: 'Bright golden-hued marble perfect for elegant spaces', order: 2 },
  { id: 3, name: 'Sinai Pearl', type: 'marble', category: 'marble', color: '#f0ebe5', image: '', description: 'Lustrous pearl-white marble from the Sinai region', order: 3 },
  { id: 4, name: 'Milly Grey', type: 'marble', category: 'marble', color: '#9a9a9a', image: '', description: 'Contemporary grey marble with subtle veining', order: 4 },
  { id: 5, name: 'Imprador', type: 'marble', category: 'marble', color: '#8b6914', image: '', description: 'Rich brown marble with dramatic patterns', order: 5 },
  { id: 6, name: 'Breccia', type: 'marble', category: 'marble', color: '#c4a882', image: '', description: 'Classic breccia with distinctive angular fragments', order: 6 },
  { id: 7, name: 'Black Star', type: 'granite', category: 'granite', color: '#1a1a1a', image: '', description: 'Deep black granite with sparkling mineral deposits', order: 7 },
  { id: 8, name: 'New Halayb', type: 'granite', category: 'granite', color: '#4a4a4a', image: '', description: 'Premium Egyptian granite from Halayb region', order: 8 },
  { id: 9, name: 'Rosa Nasr', type: 'granite', category: 'granite', color: '#d4a5a5', image: '', description: 'Beautiful pink granite with natural patterns', order: 9 },
  { id: 10, name: 'Red Royal', type: 'granite', category: 'granite', color: '#8b3a3a', image: '', description: 'Majestic red granite for statement surfaces', order: 10 },
  { id: 11, name: 'Verdi Green', type: 'granite', category: 'granite', color: '#3a5a3a', image: '', description: 'Elegant green granite with unique coloring', order: 11 },
  { id: 12, name: 'Golden Sinai', type: 'granite', category: 'granite', color: '#c9a962', image: '', description: 'Warm golden granite from Sinai quarries', order: 12 },
  { id: 13, name: 'Hashma Sandstone', type: 'other', category: 'sandstone', color: '#d4c4a0', image: '', description: 'Traditional Egyptian sandstone', order: 13 },
  { id: 14, name: 'Egyptian Basalt', type: 'other', category: 'basalt', color: '#2a2a2a', image: '', description: 'Dense volcanic basalt for durable applications', order: 14 },
  { id: 15, name: 'Mica Stone', type: 'other', category: 'mica', color: '#c0b090', image: '', description: 'Shimmering mica stone with natural sparkle', order: 15 },
]

const fallbackServices: Service[] = [
  { id: 1, title: 'Import & Export', description: 'Global distribution of premium Egyptian stone to markets worldwide with reliable logistics.', icon: 'globe', order: 1 },
  { id: 2, title: 'Custom Fabrication', description: 'Precision cutting and finishing to exact specifications for any architectural project.', icon: 'tools', order: 2 },
  { id: 3, title: 'Project Consultation', description: 'Expert guidance for architects and designers on stone selection and applications.', icon: 'consultation', order: 3 },
  { id: 4, title: 'Timely Delivery', description: 'Efficient supply chain management ensuring your materials arrive when needed.', icon: 'delivery', order: 4 },
  { id: 5, title: 'Quality Certification', description: 'Complete documentation and verification for all stone products.', icon: 'certificate', order: 5 },
  { id: 6, title: 'Premium Selection', description: 'Hand-selected slabs from the finest Egyptian quarries.', icon: 'premium', order: 6 },
]

const fallbackAbout: AboutContent = {
  title: 'Our Story',
  subtitle: 'Crafting Excellence Since 2000',
  description: [
    'Engineering Marble Contractors (EMC) was established in 2015, building upon the legacy of EMCO, which has been a cornerstone of the Egyptian stone industry since 2000.',
    'Our mission is to bring the timeless beauty of Egyptian natural stone to the world, combining traditional craftsmanship with modern precision.',
    'We take pride in our commitment to quality, sustainability, and customer satisfaction, serving clients across more than 30 countries.',
  ],
  stats: [
    { value: '25+', label: 'Years Experience' },
    { value: '50+', label: 'Stone Varieties' },
    { value: '30+', label: 'Countries Served' },
  ],
  images: [],
  mission: 'To deliver the finest Egyptian natural stone to the world while maintaining the highest standards of quality and craftsmanship.',
  vision: 'To be the global leader in premium Egyptian stone exports, recognized for excellence and reliability.',
}

const fallbackContact: ContactInfo = {
  location: 'Cairo, Egypt',
  address: 'Industrial Zone, 10th of Ramadan City, Cairo, Egypt',
  phone: '+20 XXX XXX XXXX',
  email: 'info@emc-egypt.com',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/emc-egypt',
    instagram: 'https://instagram.com/emc_egypt',
    facebook: 'https://facebook.com/emcegypt',
    whatsapp: '+20 XXX XXX XXXX',
  },
}

const fallbackSiteSettings: SiteSettings = {
  siteName: 'EMC - Engineering Marble Contractors',
  logoUrl: null,
  faviconUrl: null,
  seoTitle: 'EMC - Engineering Marble Contractors | Premium Egyptian Stone',
  seoDescription: 'Premium Egyptian natural stone - Marble, Granite, and specialty stones. 25+ years of excellence in stone craftsmanship.',
  seoKeywords: 'Egyptian marble, granite, natural stone, stone export, marble contractors',
  ogImageUrl: null,
  canonicalUrl: 'https://emcmarble.com',
  twitterHandle: null,
}

const fallbackHeroContent: HeroContent = {
  tagline: 'Engineering Marble Contractors',
  title: 'Timeless Elegance',
  subtitle: 'Carved in Stone',
  description: 'Premium Egyptian Natural Stone',
  ctaExploreText: 'Explore Collection',
  ctaQuoteText: 'Get a Quote',
  scrollText: 'Scroll to discover',
  customizerCtaText: 'Try Our 3D Kitchen Visualizer',
  backgroundImageUrl: null,
}

// Helper to construct image URL
// Use public URL for media so browsers can load images
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${getStrapiPublicUrl()}${url}`
}

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, fallback: T, options?: { revalidate?: number }): Promise<T> {
  try {
    const apiUrl = getStrapiApiUrl()
    const token = getStrapiToken()
    const url = `${apiUrl}/api${endpoint}`
    console.log(`[Strapi] Fetching: ${url}`)
    const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
    if (options?.revalidate) {
      fetchOptions.next = { revalidate: options.revalidate }
    } else {
      fetchOptions.cache = 'no-store'
    }
    const res = await fetch(url, fetchOptions)

    if (!res.ok) {
      console.error(`[Strapi] API returned ${res.status} for ${endpoint}`)
      return fallback
    }

    const json = await res.json()
    console.log(`[Strapi] Success: ${endpoint} (${Array.isArray(json.data) ? json.data.length + ' items' : 'single'})`)
    return json.data
  } catch (error: any) {
    console.error(`[Strapi] Fetch FAILED for ${endpoint}:`, error?.message || error)
    return fallback
  }
}

// API Functions
export async function getProducts(): Promise<Product[]> {
  const data = await fetchAPI<any[]>('/products?populate=*&sort=order:asc', [])

  if (!data || data.length === 0) {
    return fallbackProducts
  }

  return data.map((item: any) => ({
    id: item.id,
    name: item.attributes?.name || item.name,
    slug: item.attributes?.slug || item.slug,
    type: item.attributes?.type || item.type,
    category: item.attributes?.category || item.category,
    description: item.attributes?.description || item.description,
    color: item.attributes?.color || item.color,
    image: getStrapiMediaUrl(item.attributes?.image?.data?.attributes?.url) || '',
    specifications: item.attributes?.specifications || item.specifications,
    order: item.attributes?.order || item.order || 0,
  }))
}

export async function getServices(): Promise<Service[]> {
  const data = await fetchAPI<any[]>('/services?populate=*&sort=order:asc', [])

  if (!data || data.length === 0) {
    return fallbackServices
  }

  return data.map((item: any) => ({
    id: item.id,
    title: item.attributes?.title || item.title,
    description: item.attributes?.description || item.description,
    icon: item.attributes?.icon || item.icon,
    order: item.attributes?.order || item.order || 0,
  }))
}

export async function getAboutContent(): Promise<AboutContent> {
  const data = await fetchAPI<any>('/about?populate=*', null)

  if (!data) {
    return fallbackAbout
  }

  const attrs = data.attributes || data
  const descriptionText = attrs.description || ''

  // Parse description - handle both string and array formats
  let descriptionArray: string[]
  if (Array.isArray(descriptionText)) {
    descriptionArray = descriptionText
  } else if (typeof descriptionText === 'string') {
    descriptionArray = descriptionText.split('\n\n').filter(Boolean)
  } else {
    descriptionArray = fallbackAbout.description
  }

  return {
    title: attrs.title || fallbackAbout.title,
    subtitle: attrs.subtitle || fallbackAbout.subtitle,
    description: descriptionArray,
    stats: attrs.stats || fallbackAbout.stats,
    images: attrs.images?.data?.map((img: any) => getStrapiMediaUrl(img.attributes?.url)) || fallbackAbout.images,
    mission: attrs.mission || fallbackAbout.mission,
    vision: attrs.vision || fallbackAbout.vision,
  }
}

export async function getContactInfo(): Promise<ContactInfo> {
  const data = await fetchAPI<any>('/contact?populate=*', null)

  if (!data) {
    return fallbackContact
  }

  const attrs = data.attributes || data

  return {
    location: attrs.location || fallbackContact.location,
    address: attrs.address || fallbackContact.address,
    phone: attrs.phone || fallbackContact.phone,
    email: attrs.email || fallbackContact.email,
    socialLinks: {
      linkedin: attrs.linkedin || fallbackContact.socialLinks.linkedin,
      instagram: attrs.instagram || fallbackContact.socialLinks.instagram,
      facebook: attrs.facebook || fallbackContact.socialLinks.facebook,
      whatsapp: attrs.whatsapp || fallbackContact.socialLinks.whatsapp,
    },
    mapUrl: attrs.mapUrl,
  }
}

// Get site settings (logo, SEO, OG metadata)
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await fetchAPI<any>('/site-setting?populate=*', null, { revalidate: 300 })

  if (!data) {
    return fallbackSiteSettings
  }

  const attrs = data.attributes || data

  return {
    siteName: attrs.siteName || fallbackSiteSettings.siteName,
    logoUrl: getStrapiMediaUrl(attrs.logo?.data?.attributes?.url || attrs.logo?.url) || null,
    faviconUrl: getStrapiMediaUrl(attrs.favicon?.data?.attributes?.url || attrs.favicon?.url) || null,
    seoTitle: attrs.seoTitle || fallbackSiteSettings.seoTitle,
    seoDescription: attrs.seoDescription || fallbackSiteSettings.seoDescription,
    seoKeywords: attrs.seoKeywords || fallbackSiteSettings.seoKeywords,
    ogImageUrl: getStrapiMediaUrl(attrs.ogImage?.data?.attributes?.url || attrs.ogImage?.url) || null,
    canonicalUrl: attrs.canonicalUrl || fallbackSiteSettings.canonicalUrl,
    twitterHandle: attrs.twitterHandle || null,
  }
}

// Get hero content
export async function getHeroContent(): Promise<HeroContent> {
  const data = await fetchAPI<any>('/hero?populate=*', null, { revalidate: 300 })

  if (!data) {
    return fallbackHeroContent
  }

  const attrs = data.attributes || data

  return {
    tagline: attrs.tagline || fallbackHeroContent.tagline,
    title: attrs.title || fallbackHeroContent.title,
    subtitle: attrs.subtitle || fallbackHeroContent.subtitle,
    description: attrs.description || fallbackHeroContent.description,
    ctaExploreText: attrs.ctaExploreText || fallbackHeroContent.ctaExploreText,
    ctaQuoteText: attrs.ctaQuoteText || fallbackHeroContent.ctaQuoteText,
    scrollText: attrs.scrollText || fallbackHeroContent.scrollText,
    customizerCtaText: attrs.customizerCtaText || fallbackHeroContent.customizerCtaText,
    backgroundImageUrl: getStrapiMediaUrl(attrs.backgroundImage?.data?.attributes?.url || attrs.backgroundImage?.url) || null,
  }
}

// Mapping from Strapi ui-text field names to translation keys
const uiTextFieldToKey: Record<string, string> = {
  navHome: 'nav.home',
  navAbout: 'nav.about',
  navProducts: 'nav.products',
  navServices: 'nav.services',
  navContact: 'nav.contact',
  navCustomizer: 'nav.customizer',
  aboutSectionTitle: 'about.title',
  aboutSectionSubtitle: 'about.subtitle',
  productsSectionTitle: 'products.title',
  productsSectionSubtitle: 'products.subtitle',
  filterAll: 'products.filter.all',
  filterMarble: 'products.filter.marble',
  filterGranite: 'products.filter.granite',
  filterOther: 'products.filter.other',
  visualizeCta: 'products.visualize',
  servicesSectionTitle: 'services.title',
  servicesSectionSubtitle: 'services.subtitle',
  contactSectionTitle: 'contact.title',
  contactSectionSubtitle: 'contact.subtitle',
  formName: 'contact.form.name',
  formEmail: 'contact.form.email',
  formInterest: 'contact.form.interest',
  formMessage: 'contact.form.message',
  formSubmit: 'contact.form.submit',
  infoLocation: 'contact.info.location',
  infoPhone: 'contact.info.phone',
  infoEmail: 'contact.info.email',
  footerTagline: 'footer.tagline',
  footerProducts: 'footer.products',
  footerCompany: 'footer.company',
  footerCopyright: 'footer.copyright',
  customizerTitle: 'customizer.title',
  customizerSelect: 'customizer.select',
  customizerMaterials: 'customizer.materials',
  customizerViews: 'customizer.views',
  customizerFilter: 'customizer.filter',
  customizerCountertop: 'customizer.countertop',
  customizerIsland: 'customizer.island',
  customizerBacksplash: 'customizer.backsplash',
  customizerFloor: 'customizer.floor',
}

function mapStrapiFieldsToTranslationKeys(data: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [field, key] of Object.entries(uiTextFieldToKey)) {
    if (data[field]) {
      result[key] = data[field]
    }
  }
  return result
}

// Get UI texts for both locales
export async function getUiTexts(): Promise<{ en: Record<string, string>; ar: Record<string, string> }> {
  const [enData, arData] = await Promise.all([
    fetchAPI<any>('/ui-text?locale=en', null, { revalidate: 300 }),
    fetchAPI<any>('/ui-text?locale=ar', null, { revalidate: 300 }),
  ])

  const enAttrs = enData?.attributes || enData || {}
  const arAttrs = arData?.attributes || arData || {}

  return {
    en: mapStrapiFieldsToTranslationKeys(enAttrs),
    ar: mapStrapiFieldsToTranslationKeys(arAttrs),
  }
}

// Get stone textures for 3D visualizer
export async function getStoneTextures() {
  const products = await getProducts()
  return products.map(p => ({
    id: p.id,
    name: p.name,
    type: p.type,
    color: p.color || '#cccccc',
    thumbnail: p.image,
    texture: p.image,
  }))
}

// Export fallback data for use in components that need static data
export { fallbackProducts, fallbackServices, fallbackAbout, fallbackContact, fallbackSiteSettings, fallbackHeroContent }
