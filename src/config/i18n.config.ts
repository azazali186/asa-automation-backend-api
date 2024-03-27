// i18n.config.ts
import { HeaderResolver, I18nOptions } from 'nestjs-i18n';
import * as path from 'path';

export const i18nConfig: I18nOptions = {
  fallbackLanguage: 'en',
  fallbacks: {
    en: 'en',
    zh: 'zh',
    km: 'km',
  },
  loaderOptions: {
    path: path.join(__dirname, '../i18n/'),
    watch: true,
  },
  resolvers: [{ use: HeaderResolver, options: ['lang'] }],
};
