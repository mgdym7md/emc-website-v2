'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Seed script for Strapi
 * Usage: Run inside the Strapi container:
 *   docker exec -it emc-strapi node scripts/seed.js
 *
 * This script:
 * 1. Seeds all content types (products, services, about, contact)
 * 2. Enables public API access for all content types
 */

async function seed() {
  const strapi = require('@strapi/strapi');
  const app = await strapi().load();

  const seedData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'seed-data.json'), 'utf8')
  );

  console.log('🌱 Starting seed...\n');

  // --- Seed Products ---
  const existingProducts = await app.entityService.findMany('api::product.product');
  if (existingProducts.length === 0) {
    for (let i = 0; i < seedData.products.length; i++) {
      const product = seedData.products[i];
      await app.entityService.create('api::product.product', {
        data: {
          ...product,
          order: i + 1,
          publishedAt: new Date(),
        },
      });
    }
    console.log(`✅ Seeded ${seedData.products.length} products`);
  } else {
    console.log(`⏭️  Products already exist (${existingProducts.length}), skipping`);
  }

  // --- Seed Services ---
  const existingServices = await app.entityService.findMany('api::service.service');
  if (existingServices.length === 0) {
    for (const service of seedData.services) {
      await app.entityService.create('api::service.service', {
        data: {
          ...service,
          publishedAt: new Date(),
        },
      });
    }
    console.log(`✅ Seeded ${seedData.services.length} services`);
  } else {
    console.log(`⏭️  Services already exist (${existingServices.length}), skipping`);
  }

  // --- Seed About (single type - use db query to avoid i18n plugin issue) ---
  const existingAbout = await app.db.query('api::about.about').findOne({});
  if (!existingAbout) {
    const aboutData = seedData.about;
    await app.db.query('api::about.about').create({
      data: {
        title: aboutData.title,
        subtitle: aboutData.subtitle,
        description: aboutData.description.join('\n\n'),
        stats: JSON.stringify(aboutData.stats),
        published_at: new Date(),
      },
    });
    console.log('✅ Seeded about content');
  } else {
    console.log('⏭️  About already exists, skipping');
  }

  // --- Seed Contact (single type - use db query to avoid i18n plugin issue) ---
  const existingContact = await app.db.query('api::contact.contact').findOne({});
  if (!existingContact) {
    const contactData = seedData.contact;
    await app.db.query('api::contact.contact').create({
      data: {
        location: contactData.location,
        phone: contactData.phone,
        email: contactData.email,
        linkedin: contactData.socialLinks.linkedin,
        instagram: contactData.socialLinks.instagram,
        facebook: contactData.socialLinks.facebook,
        whatsapp: contactData.socialLinks.whatsapp || '',
        published_at: new Date(),
      },
    });
    console.log('✅ Seeded contact content');
  } else {
    console.log('⏭️  Contact already exists, skipping');
  }

  // --- Enable Public API Permissions ---
  console.log('\n🔓 Setting up public API permissions...');

  const publicRole = await app.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (publicRole) {
    const contentTypes = [
      { uid: 'api::product.product', actions: ['find', 'findOne'] },
      { uid: 'api::service.service', actions: ['find', 'findOne'] },
      { uid: 'api::about.about', actions: ['find'] },
      { uid: 'api::contact.contact', actions: ['find'] },
    ];

    for (const ct of contentTypes) {
      for (const action of ct.actions) {
        const controller = ct.uid.split('.')[1];
        const permissionExists = await app.query('plugin::users-permissions.permission').findOne({
          where: {
            role: publicRole.id,
            action: `${ct.uid}.${action}`,
          },
        });

        if (!permissionExists) {
          await app.query('plugin::users-permissions.permission').create({
            data: {
              action: `${ct.uid}.${action}`,
              role: publicRole.id,
            },
          });
        }
      }
    }
    console.log('✅ Public API permissions enabled for: products, services, about, contact');
  }

  console.log('\n🎉 Seed complete!\n');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
