'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
  dir: 'ltr' | 'rtl'
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.customizer': '3D Customizer',

    // Hero
    'hero.title': 'Timeless Elegance',
    'hero.subtitle': 'Carved in Stone',
    'hero.description': 'Premium Egyptian Natural Stone',
    'hero.cta.explore': 'Explore Collection',
    'hero.cta.quote': 'Get a Quote',
    'hero.scroll': 'Scroll to discover',

    // About
    'about.title': 'Our Story',
    'about.subtitle': 'Crafting Excellence Since 2000',

    // Products
    'products.title': 'Our Collection',
    'products.subtitle': 'Premium Egyptian Stone',
    'products.filter.all': 'All',
    'products.filter.marble': 'Marble',
    'products.filter.granite': 'Granite',
    'products.filter.other': 'Other Stones',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Excellence in Every Detail',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Let\'s Discuss Your Project',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.interest': 'Interest',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.location': 'Location',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',

    // Footer
    'footer.tagline': 'Premium Egyptian Natural Stone',
    'footer.products': 'Products',
    'footer.company': 'Company',
    'footer.copyright': '© 2024 EMC. All rights reserved.',

    // 3D Customizer
    'customizer.title': '3D Kitchen Visualizer',
    'customizer.select': 'Select a Surface',
    'customizer.materials': 'Materials',
    'customizer.views': 'Views',
    'customizer.filter': 'Filter',
    'customizer.countertop': 'Countertop',
    'customizer.island': 'Island',
    'customizer.backsplash': 'Backsplash',
    'customizer.floor': 'Floor',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عنا',
    'nav.products': 'المنتجات',
    'nav.services': 'الخدمات',
    'nav.contact': 'اتصل بنا',
    'nav.customizer': 'المصمم ثلاثي الأبعاد',

    // Hero
    'hero.title': 'أناقة خالدة',
    'hero.subtitle': 'منحوتة في الحجر',
    'hero.description': 'حجر طبيعي مصري فاخر',
    'hero.cta.explore': 'استكشف المجموعة',
    'hero.cta.quote': 'احصل على عرض سعر',
    'hero.scroll': 'مرر للاكتشاف',

    // About
    'about.title': 'قصتنا',
    'about.subtitle': 'صناعة التميز منذ عام 2000',

    // Products
    'products.title': 'مجموعتنا',
    'products.subtitle': 'حجر مصري فاخر',
    'products.filter.all': 'الكل',
    'products.filter.marble': 'رخام',
    'products.filter.granite': 'جرانيت',
    'products.filter.other': 'أحجار أخرى',

    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'التميز في كل التفاصيل',

    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'دعنا نناقش مشروعك',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.interest': 'الاهتمام',
    'contact.form.message': 'الرسالة',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.info.location': 'الموقع',
    'contact.info.phone': 'الهاتف',
    'contact.info.email': 'البريد الإلكتروني',

    // Footer
    'footer.tagline': 'حجر طبيعي مصري فاخر',
    'footer.products': 'المنتجات',
    'footer.company': 'الشركة',
    'footer.copyright': '© 2024 EMC. جميع الحقوق محفوظة.',

    // 3D Customizer
    'customizer.title': 'مصمم المطبخ ثلاثي الأبعاد',
    'customizer.select': 'اختر سطحًا',
    'customizer.materials': 'المواد',
    'customizer.views': 'المناظر',
    'customizer.filter': 'تصفية',
    'customizer.countertop': 'سطح العمل',
    'customizer.island': 'الجزيرة',
    'customizer.backsplash': 'البلاط الخلفي',
    'customizer.floor': 'الأرضية',
  },
}

const defaultT = (key: string): string => translations['en'][key] || key

const defaultContext: LanguageContextType = {
  language: 'en',
  toggleLanguage: () => {},
  t: defaultT,
  dir: 'ltr',
}

const LanguageContext = createContext<LanguageContextType>(defaultContext)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('emc-language') as Language
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
      localStorage.setItem('emc-language', language)
    }
  }, [language, mounted])

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'))
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const dir = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
