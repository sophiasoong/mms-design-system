export type Locale = 'en' | 'zh';

const STORAGE_KEY = 'ds-locale';

export function getStoredLocale(): Locale {
  return localStorage.getItem(STORAGE_KEY) === 'zh' ? 'zh' : 'en';
}

export function applyLocale(locale: Locale) {
  document.documentElement.setAttribute('lang', locale === 'zh' ? 'zh-Hant' : 'en');
  localStorage.setItem(STORAGE_KEY, locale);
}
