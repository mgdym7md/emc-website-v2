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

// Fallback Data (used when Strapi is unavailable)
const fallbackProducts: Product[] = [
  { id: 1, name: 'Galala Classic', type: 'marble', category: 'marble', color: '#e8dcc8', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600', description: 'Premium Egyptian marble with warm beige tones', order: 1 },
  { id: 2, name: 'Sunny Marble', type: 'marble', category: 'marble', color: '#f5e6c8', image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600', description: 'Bright golden-hued marble perfect for elegant spaces', order: 2 },
  { id: 3, name: 'Sinai Pearl', type: 'marble', category: 'marble', color: '#f0ebe5', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', description: 'Lustrous pearl-white marble from the Sinai region', order: 3 },
  { id: 4, name: 'Milly Grey', type: 'marble', category: 'marble', color: '#9a9a9a', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', description: 'Contemporary grey marble with subtle veining', order: 4 },
  { id: 5, name: 'Imprador', type: 'marble', category: 'marble', color: '#8b6914', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600', description: 'Rich brown marble with dramatic patterns', order: 5 },
  { id: 6, name: 'Breccia', type: 'marble', category: 'marble', color: '#c4a882', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', description: 'Classic breccia with distinctive angular fragments', order: 6 },
  { id: 7, name: 'Black Star', type: 'granite', category: 'granite', color: '#1a1a1a', image: 'https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?w=600', description: 'Deep black granite with sparkling mineral deposits', order: 7 },
  { id: 8, name: 'New Halayb', type: 'granite', category: 'granite', color: '#4a4a4a', image: 'https://images.unsplash.com/photo-1600566752734-2a0cd66c42b5?w=600', description: 'Premium Egyptian granite from Halayb region', order: 8 },
  { id: 9, name: 'Rosa Nasr', type: 'granite', category: 'granite', color: '#d4a5a5', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600', description: 'Beautiful pink granite with natural patterns', order: 9 },
  { id: 10, name: 'Red Royal', type: 'granite', category: 'granite', color: '#8b3a3a', image: 'https://images.unsplash.com/photo-1600573472572-8aba3fca8d8a?w=600', description: 'Majestic red granite for statement surfaces', order: 10 },
  { id: 11, name: 'Verdi Green', type: 'granite', category: 'granite', color: '#3a5a3a', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600', description: 'Elegant green granite with unique coloring', order: 11 },
  { id: 12, name: 'Golden Sinai', type: 'granite', category: 'granite', color: '#c9a962', image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=600', description: 'Warm golden granite from Sinai quarries', order: 12 },
  { id: 13, name: 'Hashma Sandstone', type: 'other', category: 'sandstone', color: '#d4c4a0', image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600', description: 'Traditional Egyptian sandstone', order: 13 },
  { id: 14, name: 'Egyptian Basalt', type: 'other', category: 'basalt', color: '#2a2a2a', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600', description: 'Dense volcanic basalt for durable applications', order: 14 },
  { id: 15, name: 'Mica Stone', type: 'other', category: 'mica', color: '#c0b090', image: 'https://images.unsplash.com/photo-1600566752547-33a1a9eb8e91?w=600', description: 'Shimmering mica stone with natural sparkle', order: 15 },
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
  images: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  ],
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

// Helper to construct image URL
// Use public URL for media so browsers can load images
function getStrapiMediaUrl(url: string | null | undefined): string {
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
    image: getStrapiMediaUrl(item.attributes?.image?.data?.attributes?.url) ||
           fallbackProducts.find(p => p.name === (item.attributes?.name || item.name))?.image || '',
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
export { fallbackProducts, fallbackServices, fallbackAbout, fallbackContact, fallbackSiteSettings }
