// i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import translationEN from '/public/locales/en/translation.json';
// import translationDE from '/public/locales/de/translation.json';
// import translationEL from '/public/locales/el/translation.json';
// import translationUKR from '/public/locales/ukr/translation.json';

// i18n
//   .use(initReactI18next) // 👈 REQUIRED
//   .init({
//     resources: {
//       en: { translation: translationEN },
//       de: { translation: translationDE },
//       el: { translation: translationEL },
//       ukr: { translation: translationUKR },
//     },
//     lng: 'en', // default language
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;









import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/common.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


