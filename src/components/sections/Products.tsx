'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/components/providers/LanguageProvider'
import type { Product } from '@/lib/strapi'

interface ProductsProps {
  data: Product[]
}

type FilterType = 'all' | 'marble' | 'granite' | 'other'

export default function Products({ data }: ProductsProps) {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('products.filter.all') },
    { key: 'marble', label: t('products.filter.marble') },
    { key: 'granite', label: t('products.filter.granite') },
    { key: 'other', label: t('products.filter.other') },
  ]

  const filteredProducts = data.filter(product => {
    if (activeFilter === 'all') return true
    return product.type === activeFilter
  })

  return (
    <section id="products" className="section-padding bg-dark-primary">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-gold/80 text-sm tracking-[0.3em] uppercase mb-4 block">
            {t('products.subtitle')}
          </span>
          <h2 className="heading-primary text-accent-cream">
            {t('products.title')}
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-2 text-sm tracking-wider uppercase transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-accent-gold text-dark-primary'
                  : 'border border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden bg-dark-secondary card-hover"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-primary via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-accent-gold/20 text-accent-gold text-xs tracking-wider uppercase">
                      {product.type}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-accent-cream group-hover:text-accent-gold transition-colors">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-accent-cream/50 text-sm mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border border-accent-gold/0 group-hover:border-accent-gold/30 transition-colors duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="/customizer" className="btn-secondary inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            Visualize in 3D Kitchen
          </a>
        </motion.div>
      </div>
    </section>
  )
}
