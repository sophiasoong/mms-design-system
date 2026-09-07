import { useEffect, useState } from 'react';

export type BrandMode = 'mms' | 'mma';

const STORAGE_KEY = 'ds-brand-mode';
const ATTR = 'data-color-mode';

export function getStoredBrandMode(): BrandMode {
  return localStorage.getItem(STORAGE_KEY) === 'mma' ? 'mma' : 'mms';
}

export function applyBrandMode(mode: BrandMode) {
  document.documentElement.setAttribute(ATTR, mode);
  localStorage.setItem(STORAGE_KEY, mode);
}

function readBrandMode(): BrandMode {
  return document.documentElement.getAttribute(ATTR) === 'mma' ? 'mma' : 'mms';
}

/** The live brand mode, read from the <html data-color-mode> attribute applyBrandMode sets, so
    any component — however deep in a doc page — can follow the Topbar's MMS/MMA toggle without
    the mode being threaded down through props. Re-renders when the attribute changes. */
export function useBrandMode(): BrandMode {
  const [mode, setMode] = useState<BrandMode>(readBrandMode);
  useEffect(() => {
    const observer = new MutationObserver(() => setMode(readBrandMode()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: [ATTR] });
    setMode(readBrandMode());
    return () => observer.disconnect();
  }, []);
  return mode;
}

export type BrandLogoVariant = 'default' | 'collapsed';

/** Per-brand product logo shown in AppTopbar's logo panel. `default` is the full-bleed panel
    used while the Sidebar is expanded (brand-colored ground, white lockup); `collapsed` is the
    white-ground / brand-colored lockup used once the Sidebar collapses to its rail. */
export function brandLogoSrc(mode: BrandMode, variant: BrandLogoVariant = 'default'): string {
  return mode === 'mma' ? `/assets/logo_mma_${variant}.svg` : `/assets/logo_mms_${variant}.png`;
}
