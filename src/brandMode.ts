export type BrandMode = 'mms' | 'mma';

const STORAGE_KEY = 'ds-brand-mode';

export function getStoredBrandMode(): BrandMode {
  return localStorage.getItem(STORAGE_KEY) === 'mma' ? 'mma' : 'mms';
}

export function applyBrandMode(mode: BrandMode) {
  document.documentElement.setAttribute('data-color-mode', mode);
  localStorage.setItem(STORAGE_KEY, mode);
}
