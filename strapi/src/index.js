'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }) {
    // Check if we should run seeders
    const shouldSeed = process.env.SEED_DB === 'true';

    if (shouldSeed) {
      console.log('🌱 Running database seeders...');
      await runSeeders(strapi);
      console.log('✅ Seeding completed!');
    }
  },
};

async function runSeeders(strapi) {
  // Check if data already exists
  const existingProducts = await strapi.entityService.count('api::product.product');

  if (existingProducts > 0) {
    console.log('📦 Data already exists, skipping seeders');
    return;
  }

  // Seed Products
  const products = [
    { name: 'Galala Classic', type: 'marble', category: 'marble', color: '#e8dcc8', description: 'Premium Egyptian marble with warm beige tones, perfect for elegant interiors.', order: 1, specifications: { origin: 'Egypt', finish: 'Polished', thickness: '20mm, 30mm' } },
    { name: 'Sunny Marble', type: 'marble', category: 'marble', color: '#f5e6c8', description: 'Bright golden-hued marble perfect for elegant spaces.', order: 2, specifications: { origin: 'Egypt', finish: 'Polished, Honed', thickness: '20mm, 30mm' } },
    { name: 'Sinai Pearl', type: 'marble', category: 'marble', color: '#f0ebe5', description: 'Lustrous pearl-white marble from the Sinai region.', order: 3, specifications: { origin: 'Sinai, Egypt', finish: 'Polished', thickness: '20mm, 30mm' } },
    { name: 'Milly Grey', type: 'marble', category: 'marble', color: '#9a9a9a', description: 'Contemporary grey marble with subtle veining.', order: 4, specifications: { origin: 'Egypt', finish: 'Polished, Matte', thickness: '20mm, 30mm' } },
    { name: 'Imprador', type: 'marble', category: 'marble', color: '#8b6914', description: 'Rich brown marble with dramatic patterns.', order: 5, specifications: { origin: 'Egypt', finish: 'Polished', thickness: '20mm, 30mm' } },
    { name: 'Breccia', type: 'marble', category: 'marble', color: '#c4a882', description: 'Classic breccia with distinctive angular fragments.', order: 6, specifications: { origin: 'Egypt', finish: 'Polished', thickness: '20mm, 30mm' } },
    { name: 'Black Star', type: 'granite', category: 'granite', color: '#1a1a1a', description: 'Deep black granite with sparkling mineral deposits.', order: 7, specifications: { origin: 'Egypt', finish: 'Polished, Flamed', thickness: '20mm, 30mm, 40mm' } },
    { name: 'New Halayb', type: 'granite', category: 'granite', color: '#4a4a4a', description: 'Premium Egyptian granite from Halayb region.', order: 8, specifications: { origin: 'Halayb, Egypt', finish: 'Polished', thickness: '20mm, 30mm' } },
    { name: 'Rosa Nasr', type: 'granite', category: 'granite', color: '#d4a5a5', description: 'Beautiful pink granite with natural patterns.', order: 9, specifications: { origin: 'Egypt', finish: 'Polished', thickness: '20mm, 30mm' } },
    { name: 'Red Royal', type: 'granite', category: 'granite', color: '#8b3a3a', description: 'Majestic red granite for statement surfaces.', order: 10, specifications: { origin: 'Egypt', finish: 'Polished, Flamed', thickness: '20mm, 30mm, 40mm' } },
    { name: 'Verdi Green', type: 'granite', category: 'granite', color: '#3a5a3a', description: 'Elegant green granite with unique coloring.', order: 11, specifications: { origin: 'Egypt', finish: 'Polished', thickness: '20mm, 30mm' } },
    { name: 'Golden Sinai', type: 'granite', category: 'granite', color: '#c9a962', description: 'Warm golden granite from Sinai quarries.', order: 12, specifications: { origin: 'Sinai, Egypt', finish: 'Polished', thickness: '20mm, 30mm' } },
    { name: 'Hashma Sandstone', type: 'other', category: 'sandstone', color: '#d4c4a0', description: 'Traditional Egyptian sandstone.', order: 13, specifications: { origin: 'Egypt', finish: 'Natural, Honed', thickness: '30mm, 40mm' } },
    { name: 'Egyptian Basalt', type: 'other', category: 'basalt', color: '#2a2a2a', description: 'Dense volcanic basalt for durable applications.', order: 14, specifications: { origin: 'Egypt', finish: 'Flamed, Bush-hammered', thickness: '30mm, 40mm, 50mm' } },
    { name: 'Mica Stone', type: 'other', category: 'mica', color: '#c0b090', description: 'Shimmering mica stone with natural sparkle.', order: 15, specifications: { origin: 'Egypt', finish: 'Natural', thickness: '10mm, 20mm' } },
  ];

  for (const product of products) {
    await strapi.entityService.create('api::product.product', {
      data: { ...product, publishedAt: new Date() },
    });
  }
  console.log(`  ✓ Created ${products.length} products`);

  // Seed Services
  const services = [
    { title: 'Import & Export', description: 'Global distribution of premium Egyptian stone to markets worldwide with reliable logistics.', icon: 'globe', order: 1 },
    { title: 'Custom Fabrication', description: 'Precision cutting and finishing to exact specifications for any architectural project.', icon: 'tools', order: 2 },
    { title: 'Project Consultation', description: 'Expert guidance for architects and designers on stone selection and applications.', icon: 'consultation', order: 3 },
    { title: 'Timely Delivery', description: 'Efficient supply chain management ensuring your materials arrive when needed.', icon: 'delivery', order: 4 },
    { title: 'Quality Certification', description: 'Complete documentation and verification for all stone products.', icon: 'certificate', order: 5 },
    { title: 'Premium Selection', description: 'Hand-selected slabs from the finest Egyptian quarries.', icon: 'premium', order: 6 },
  ];

  for (const service of services) {
    await strapi.entityService.create('api::service.service', {
      data: { ...service, publishedAt: new Date() },
    });
  }
  console.log(`  ✓ Created ${services.length} services`);

  // Seed About
  await strapi.entityService.create('api::about.about', {
    data: {
      title: 'Our Story',
      subtitle: 'Crafting Excellence Since 2000',
      description: `Engineering Marble Contractors (EMC) was established in 2015, building upon the legacy of EMCO, which has been a cornerstone of the Egyptian stone industry since 2000.

Our mission is to bring the timeless beauty of Egyptian natural stone to the world, combining traditional craftsmanship with modern precision.

We take pride in our commitment to quality, sustainability, and customer satisfaction, serving clients across more than 30 countries.`,
      stats: [
        { value: '25+', label: 'Years Experience' },
        { value: '50+', label: 'Stone Varieties' },
        { value: '30+', label: 'Countries Served' },
      ],
      mission: 'To deliver the finest Egyptian natural stone to the world while maintaining the highest standards of quality and craftsmanship.',
      vision: 'To be the global leader in premium Egyptian stone exports, recognized for excellence and reliability.',
      publishedAt: new Date(),
    },
  });
  console.log('  ✓ Created About content');

  // Seed Contact
  await strapi.entityService.create('api::contact.contact', {
    data: {
      location: 'Cairo, Egypt',
      address: 'Industrial Zone, 10th of Ramadan City, Cairo, Egypt',
      phone: '+20 XXX XXX XXXX',
      email: 'info@emc-egypt.com',
      linkedin: 'https://linkedin.com/company/emc-egypt',
      instagram: 'https://instagram.com/emc_egypt',
      facebook: 'https://facebook.com/emcegypt',
      whatsapp: '+20 XXX XXX XXXX',
      publishedAt: new Date(),
    },
  });
  console.log('  ✓ Created Contact content');
}
