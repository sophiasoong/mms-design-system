import { useEffect, useState } from 'react';

export type Locale = 'en' | 'zh';

const STORAGE_KEY = 'ds-locale';
const ATTR = 'lang';

export function getStoredLocale(): Locale {
  return localStorage.getItem(STORAGE_KEY) === 'zh' ? 'zh' : 'en';
}

export function applyLocale(locale: Locale) {
  document.documentElement.setAttribute(ATTR, locale === 'zh' ? 'zh-Hant' : 'en');
  localStorage.setItem(STORAGE_KEY, locale);
}

function readLocale(): Locale {
  return document.documentElement.getAttribute(ATTR) === 'zh-Hant' ? 'zh' : 'en';
}

/** The live locale, read from the <html lang> attribute applyLocale sets — the same pattern as
    useBrandMode, so any component can follow the Topbar's EN/中 toggle without the locale being
    threaded down through props. Re-renders when the attribute changes. */
export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(readLocale);
  useEffect(() => {
    const observer = new MutationObserver(() => setLocale(readLocale()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: [ATTR] });
    setLocale(readLocale());
    return () => observer.disconnect();
  }, []);
  return locale;
}

/** A pair of copies, one per locale. Every translated string on the site is authored as one of
    these next to its English source, so a missing translation is a type error rather than a
    blank label at runtime. */
export interface Localized {
  en: string;
  zh: string;
}

export function pick(copy: Localized, locale: Locale): string {
  return copy[locale];
}
