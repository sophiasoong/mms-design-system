import './Image.css';
import { useBrandMode, type BrandMode } from '../brandMode';

export type ImageStyle = 'empty' | 'activate' | 'search';

/** Per-brand flattened Figma exports. MMS ships the original PNG set; MMA ships the SVG set
    exported from the MMA Empty-data composition (Figma node 1072-81508), whose fills sit on the
    MMA brand-primary scale (50/75/100/300/600/700) and brand-secondary-300. */
const IMAGE_SRC: Record<BrandMode, Record<ImageStyle, string>> = {
  mms: {
    empty: '/assets/image-empty.png',
    // Figma labels this variant "Activitate" (source typo) — exposed here as `activate`.
    activate: '/assets/image-activate.png',
    search: '/assets/image-search.png',
  },
  mma: {
    empty: '/assets/image-empty-mma.svg',
    activate: '/assets/image-activate-mma.svg',
    search: '/assets/image-search-mma.svg',
  },
};

export interface ImageProps {
  /** Which empty-state illustration to show. Each is a flattened Figma export — the
   * chat-bubble/toggle overlay Figma shows per style is already baked into the asset. */
  style?: ImageStyle;
  className?: string;
}

export function Image({ style = 'empty', className }: ImageProps) {
  const classes = ['ds-image', className].filter(Boolean).join(' ');
  // The illustration follows the MMS/MMA brand toggle — each brand ships its own export set.
  const brandMode = useBrandMode();

  return (
    <div className={classes}>
      <img className="ds-image__illustration" src={IMAGE_SRC[brandMode][style]} alt="" />
    </div>
  );
}
