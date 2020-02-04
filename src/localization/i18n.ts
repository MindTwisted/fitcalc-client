import i18next from 'i18next';
import en from './locales/en';
import ru from './locales/ru';

i18next
  .init({
    keySeparator: '::',
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: 'en',
    resources: {
      en: {
        translation: en
      },
      ru: {
        translation: ru
      },
    },
  });

export default i18next;