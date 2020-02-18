import i18next from 'i18next';
import en from './locales/en';
import ru from './locales/ru';
import { Languages } from '../store/system/types';

i18next
  .init({
    keySeparator: '::',
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: Languages.English,
    resources: {
      [Languages.English]: {
        translation: en
      },
      [Languages.Russian]: {
        translation: ru
      },
    },
  });

export default i18next;