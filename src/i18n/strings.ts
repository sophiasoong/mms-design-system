import { useLocale, type Locale } from '../locale';

/* ---- Site chrome copy, per locale ----
   Traditional Chinese follows Ant Design's component vocabulary
   (https://ant.design/components/overview-cn), converted from Simplified to Traditional
   characters, so the docs and the console speak the same terms. Component and category
   names live next to their ids in data/components.ts; this file holds the surrounding UI
   strings. Add a namespace per doc page as pages are translated. */

const en = {
  sidebar: {
    collapse: 'Collapse sidebar',
    expand: 'Expand sidebar',
    searchComponents: 'Search components',
    searchPlaceholder: 'Search component name',
    clearSearch: 'Clear search',
    navLabel: 'Components',
    noResults: 'No components found',
  },
  topbar: {
    switchToChinese: 'Switch to Chinese',
    switchToEnglish: 'Switch to English',
  },
  anchorNav: {
    label: 'On this page',
  },
};

export type Strings = typeof en;

const zh: Strings = {
  sidebar: {
    collapse: '收合側邊欄',
    expand: '展開側邊欄',
    searchComponents: '搜索組件',
    searchPlaceholder: '搜索組件名稱',
    clearSearch: '清除搜索',
    navLabel: '組件',
    noResults: '找不到符合的組件',
  },
  topbar: {
    switchToChinese: '切換為中文',
    switchToEnglish: '切換為英文',
  },
  anchorNav: {
    label: '本頁內容',
  },
};

const STRINGS: Record<Locale, Strings> = { en, zh };

export function getStrings(locale: Locale): Strings {
  return STRINGS[locale];
}

/** The chrome strings for the live locale; re-renders with the Topbar's EN/中 toggle. */
export function useStrings(): Strings {
  return STRINGS[useLocale()];
}
