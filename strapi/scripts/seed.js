'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Seed script for Strapi
 * Usage: Run inside the Strapi container:
 *   docker exec -it emc-strapi node scripts/seed.js
 *
 * This script:
 * 1. Seeds all content types (products, services, about, contact, hero, ui-text)
 * 2. Creates Arabic localizations for all i18n-enabled content
 * 3. Enables public API access for all content types
 */

async function seed() {
  const strapi = require('@strapi/strapi');
  const app = await strapi().load();

  const seedData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'seed-data.json'), 'utf8')
  );

  console.log('🌱 Starting seed...\n');

  // --- Helper: Link localizations for single types ---
  async function linkSingleTypeLocalizations(collectionName, enId, arId) {
    const tableName = `${collectionName}_localizations_links`;
    try {
      await app.db.connection.raw(
        `INSERT INTO ${tableName} (${collectionName.slice(0, -1)}_id, inv_${collectionName.slice(0, -1)}_id) VALUES (?, ?), (?, ?)`,
        [enId, arId, arId, enId]
      );
    } catch (err) {
      // Try alternative column naming pattern
      try {
        await app.db.connection.raw(
          `INSERT INTO ${tableName} (${collectionName}_id, inv_${collectionName}_id) VALUES (?, ?), (?, ?)`,
          [enId, arId, arId, enId]
        );
      } catch (err2) {
        console.warn(`⚠️  Could not link localizations for ${collectionName}, trying generic pattern...`);
        // Last resort: inspect the table to find column names
        const cols = await app.db.connection.raw(`PRAGMA table_info(${tableName})`);
        if (cols && cols.length >= 2) {
          const col1 = cols[0].name;
          const col2 = cols[1].name;
          await app.db.connection.raw(
            `INSERT INTO ${tableName} (${col1}, ${col2}) VALUES (?, ?), (?, ?)`,
            [enId, arId, arId, enId]
          );
        }
      }
    }
  }

  // --- Helper: Link localizations for collection types ---
  async function linkCollectionLocalizations(collectionName, singularName, enId, arId) {
    const tableName = `${collectionName}_localizations_links`;
    try {
      await app.db.connection.raw(
        `INSERT INTO ${tableName} (${singularName}_id, inv_${singularName}_id) VALUES (?, ?), (?, ?)`,
        [enId, arId, arId, enId]
      );
    } catch (err) {
      console.warn(`⚠️  Could not link localizations for ${collectionName}: ${err.message}`);
    }
  }

  // --- Seed Products (English) ---
  const existingProducts = await app.entityService.findMany('api::product.product');
  let enProductIds = [];
  if (existingProducts.length === 0) {
    for (let i = 0; i < seedData.products.length; i++) {
      const product = seedData.products[i];
      const created = await app.entityService.create('api::product.product', {
        data: {
          ...product,
          order: i + 1,
          publishedAt: new Date(),
        },
      });
      enProductIds.push(created.id);
    }
    console.log(`✅ Seeded ${seedData.products.length} products (English)`);
  } else {
    console.log(`⏭️  Products already exist (${existingProducts.length}), skipping English`);
    enProductIds = existingProducts.map(p => p.id);
  }

  // --- Seed Products (Arabic) ---
  const existingArProducts = await app.entityService.findMany('api::product.product', {
    locale: 'ar',
  });
  if (existingArProducts.length === 0 && seedData.productsAr && enProductIds.length > 0) {
    for (let i = 0; i < seedData.productsAr.length; i++) {
      const arData = seedData.productsAr[i];
      const enProduct = seedData.products[i];
      const arEntry = await app.entityService.create('api::product.product', {
        data: {
          name: arData.name,
          description: arData.description,
          type: enProduct.type,
          category: enProduct.category,
          color: enProduct.color,
          specifications: enProduct.specifications,
          order: i + 1,
          locale: 'ar',
          publishedAt: new Date(),
        },
      });
      await linkCollectionLocalizations('products', 'product', enProductIds[i], arEntry.id);
    }
    console.log(`✅ Seeded ${seedData.productsAr.length} products (Arabic)`);
  } else {
    console.log(`⏭️  Arabic products already exist or no data, skipping`);
  }

  // --- Seed Services (English) ---
  const existingServices = await app.entityService.findMany('api::service.service');
  let enServiceIds = [];
  if (existingServices.length === 0) {
    for (const service of seedData.services) {
      const created = await app.entityService.create('api::service.service', {
        data: {
          ...service,
          publishedAt: new Date(),
        },
      });
      enServiceIds.push(created.id);
    }
    console.log(`✅ Seeded ${seedData.services.length} services (English)`);
  } else {
    console.log(`⏭️  Services already exist (${existingServices.length}), skipping English`);
    enServiceIds = existingServices.map(s => s.id);
  }

  // --- Seed Services (Arabic) ---
  const existingArServices = await app.entityService.findMany('api::service.service', {
    locale: 'ar',
  });
  if (existingArServices.length === 0 && seedData.servicesAr && enServiceIds.length > 0) {
    for (let i = 0; i < seedData.servicesAr.length; i++) {
      const arData = seedData.servicesAr[i];
      const enService = seedData.services[i];
      const arEntry = await app.entityService.create('api::service.service', {
        data: {
          title: arData.title,
          description: arData.description,
          icon: enService.icon,
          order: enService.order,
          locale: 'ar',
          publishedAt: new Date(),
        },
      });
      await linkCollectionLocalizations('services', 'service', enServiceIds[i], arEntry.id);
    }
    console.log(`✅ Seeded ${seedData.servicesAr.length} services (Arabic)`);
  } else {
    console.log(`⏭️  Arabic services already exist or no data, skipping`);
  }

  // --- Seed About (English - single type) ---
  const existingAbout = await app.db.query('api::about.about').findOne({ where: { locale: 'en' } });
  let aboutEnId = existingAbout?.id;
  if (!existingAbout) {
    const aboutData = seedData.about;
    const created = await app.db.query('api::about.about').create({
      data: {
        title: aboutData.title,
        subtitle: aboutData.subtitle,
        description: aboutData.description.join('\n\n'),
        stats: JSON.stringify(aboutData.stats),
        locale: 'en',
        published_at: new Date(),
      },
    });
    aboutEnId = created.id;
    console.log('✅ Seeded about content (English)');
  } else {
    console.log('⏭️  About (English) already exists, skipping');
  }

  // --- Seed About (Arabic) ---
  const existingAboutAr = await app.db.query('api::about.about').findOne({ where: { locale: 'ar' } });
  if (!existingAboutAr && seedData.aboutAr && aboutEnId) {
    const arData = seedData.aboutAr;
    const arEntry = await app.db.query('api::about.about').create({
      data: {
        title: arData.title,
        subtitle: arData.subtitle,
        description: arData.description.join('\n\n'),
        stats: JSON.stringify(arData.stats),
        mission: arData.mission,
        vision: arData.vision,
        locale: 'ar',
        published_at: new Date(),
      },
    });
    await linkSingleTypeLocalizations('abouts', aboutEnId, arEntry.id);
    console.log('✅ Seeded about content (Arabic)');
  } else {
    console.log('⏭️  About (Arabic) already exists, skipping');
  }

  // --- Seed Contact (English - single type) ---
  const existingContact = await app.db.query('api::contact.contact').findOne({ where: { locale: 'en' } });
  let contactEnId = existingContact?.id;
  if (!existingContact) {
    const contactData = seedData.contact;
    const created = await app.db.query('api::contact.contact').create({
      data: {
        location: contactData.location,
        phone: contactData.phone,
        email: contactData.email,
        linkedin: contactData.socialLinks.linkedin,
        instagram: contactData.socialLinks.instagram,
        facebook: contactData.socialLinks.facebook,
        whatsapp: contactData.socialLinks.whatsapp || '',
        locale: 'en',
        published_at: new Date(),
      },
    });
    contactEnId = created.id;
    console.log('✅ Seeded contact content (English)');
  } else {
    console.log('⏭️  Contact (English) already exists, skipping');
  }

  // --- Seed Contact (Arabic) ---
  const existingContactAr = await app.db.query('api::contact.contact').findOne({ where: { locale: 'ar' } });
  if (!existingContactAr && seedData.contactAr && contactEnId) {
    const arData = seedData.contactAr;
    const enContact = seedData.contact;
    const arEntry = await app.db.query('api::contact.contact').create({
      data: {
        location: arData.location,
        address: arData.address || '',
        phone: enContact.phone,
        email: enContact.email,
        linkedin: enContact.socialLinks.linkedin,
        instagram: enContact.socialLinks.instagram,
        facebook: enContact.socialLinks.facebook,
        whatsapp: enContact.socialLinks.whatsapp || '',
        locale: 'ar',
        published_at: new Date(),
      },
    });
    await linkSingleTypeLocalizations('contacts', contactEnId, arEntry.id);
    console.log('✅ Seeded contact content (Arabic)');
  } else {
    console.log('⏭️  Contact (Arabic) already exists, skipping');
  }

  // --- Seed Hero (English - single type) ---
  const existingHero = await app.db.query('api::hero.hero').findOne({ where: { locale: 'en' } });
  let heroEnId = existingHero?.id;
  if (!existingHero) {
    const heroData = seedData.hero.en;
    const created = await app.db.query('api::hero.hero').create({
      data: {
        ...heroData,
        locale: 'en',
        published_at: new Date(),
      },
    });
    heroEnId = created.id;
    console.log('✅ Seeded hero content (English)');
  } else {
    console.log('⏭️  Hero (English) already exists, skipping');
  }

  // --- Seed Hero (Arabic) ---
  const existingHeroAr = await app.db.query('api::hero.hero').findOne({ where: { locale: 'ar' } });
  if (!existingHeroAr && seedData.hero.ar && heroEnId) {
    const arEntry = await app.db.query('api::hero.hero').create({
      data: {
        ...seedData.hero.ar,
        locale: 'ar',
        published_at: new Date(),
      },
    });
    await linkSingleTypeLocalizations('heroes', heroEnId, arEntry.id);
    console.log('✅ Seeded hero content (Arabic)');
  } else {
    console.log('⏭️  Hero (Arabic) already exists, skipping');
  }

  // --- Seed UI Text (English - single type) ---
  const existingUiText = await app.db.query('api::ui-text.ui-text').findOne({ where: { locale: 'en' } });
  let uiTextEnId = existingUiText?.id;
  if (!existingUiText) {
    const created = await app.db.query('api::ui-text.ui-text').create({
      data: {
        ...seedData.uiTexts.en,
        locale: 'en',
        published_at: new Date(),
      },
    });
    uiTextEnId = created.id;
    console.log('✅ Seeded UI text (English)');
  } else {
    console.log('⏭️  UI Text (English) already exists, skipping');
  }

  // --- Seed UI Text (Arabic) ---
  const existingUiTextAr = await app.db.query('api::ui-text.ui-text').findOne({ where: { locale: 'ar' } });
  if (!existingUiTextAr && seedData.uiTexts.ar && uiTextEnId) {
    const arEntry = await app.db.query('api::ui-text.ui-text').create({
      data: {
        ...seedData.uiTexts.ar,
        locale: 'ar',
        published_at: new Date(),
      },
    });
    await linkSingleTypeLocalizations('ui_texts', uiTextEnId, arEntry.id);
    console.log('✅ Seeded UI text (Arabic)');
  } else {
    console.log('⏭️  UI Text (Arabic) already exists, skipping');
  }

  // --- Seed Site Settings ---
  const existingSiteSettings = await app.db.query('api::site-setting.site-setting').findOne({});
  if (!existingSiteSettings) {
    const ssData = seedData.siteSettings;
    await app.db.query('api::site-setting.site-setting').create({
      data: {
        site_name: ssData.siteName,
        seo_title: ssData.seoTitle,
        seo_description: ssData.seoDescription,
        seo_keywords: ssData.seoKeywords,
        canonical_url: ssData.canonicalUrl,
      },
    });
    console.log('✅ Seeded site settings');
  } else {
    console.log('⏭️  Site settings already exist, skipping');
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
      { uid: 'api::site-setting.site-setting', actions: ['find'] },
      { uid: 'api::contact-submission.contact-submission', actions: ['create'] },
      { uid: 'api::hero.hero', actions: ['find'] },
      { uid: 'api::ui-text.ui-text', actions: ['find'] },
    ];

    for (const ct of contentTypes) {
      for (const action of ct.actions) {
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
    console.log('✅ Public API permissions enabled for: products, services, about, contact, site-setting, contact-submission, hero, ui-text');
  }

  console.log('\n🎉 Seed complete!\n');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
