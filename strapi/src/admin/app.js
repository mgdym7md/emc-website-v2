const config = {
  locales: ['en', 'ar'],
  translations: {
    en: {
      'app.components.LeftMenu.navbrand.title': 'EMC Dashboard',
      'app.components.LeftMenu.navbrand.workplace': 'Content Management',
    },
    ar: {
      'app.components.LeftMenu.navbrand.title': 'لوحة تحكم EMC',
      'app.components.LeftMenu.navbrand.workplace': 'إدارة المحتوى',
    },
  },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
