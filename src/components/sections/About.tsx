'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/components/providers/LanguageProvider'
import type { AboutContent } from '@/lib/strapi'

interface AboutProps {
  data: AboutContent
}

export default function About({ data }: AboutProps) {
  const { t } = useLanguage()

  return (
    <section id="about" className="section-padding bg-dark-secondary relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-gold/5 to-transparent" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent-gold/80 text-sm tracking-[0.3em] uppercase mb-4 block">
              {t('about.title')}
            </span>
            <h2 className="heading-primary text-accent-cream mb-8">
              {data.subtitle}
            </h2>

            <div className="space-y-6 text-accent-cream/70 leading-relaxed">
              {data.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-accent-gold/20">
              {data.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-heading text-4xl md:text-5xl text-accent-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-accent-cream/50 text-sm tracking-wider uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-accent-gold/20 to-accent-rose/20">
                  <Image
                    src={data.images[0]}
                    alt="EMC Stone Quarry"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-accent-rose/20 to-accent-gold/20">
                  <Image
                    src={data.images[1]}
                    alt="EMC Stone Craftsmanship"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-accent-gold/30" />
            <div className="absolute -top-4 -left-4 w-32 h-32 border border-accent-gold/30" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
