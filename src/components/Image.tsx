import './Image.css';

export type ImageStyle = 'empty' | 'activate' | 'search';

const IMAGE_SRC: Record<ImageStyle, string> = {
  empty: '/assets/image-empty.png',
  // Figma labels this variant "Activitate" (source typo) — exposed here as `activate`.
  activate: '/assets/image-activate.png',
  search: '/assets/image-search.png',
};

export interface ImageProps {
  /** Which empty-state illustration to show. Each is a flattened Figma export — the
   * chat-bubble/toggle overlay Figma shows per style is already baked into the PNG. */
  style?: ImageStyle;
  className?: string;
}

export function Image({ style = 'empty', className }: ImageProps) {
  const classes = ['ds-image', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <img className="ds-image__illustration" src={IMAGE_SRC[style]} alt="" />
    </div>
  );
}
