import { useState } from 'react';
import { Icon, ICON_NAMES, type IconName, type IconSize } from './Icon';
import { Image, type ImageStyle } from './Image';
import { Thumbnail, type ThumbnailMessageStyle } from './Thumbnail';
import { UploadIcon, MessageIcon } from './icons';
import './AssetsDoc.css';

const ICON_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=967-42491';
const IMAGE_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=970-33124';
const THUMBNAIL_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=673-27209';

const ICON_SIZES: { size: IconSize; label: string }[] = [
  { size: 'xs', label: 'Xs · 12px' },
  { size: 'sm', label: 'Sm · 16px' },
  { size: 'md', label: 'Md · 24px' },
  { size: 'lg', label: 'Lg · 36px' },
];

const IMAGE_STYLES: { style: ImageStyle; label: string }[] = [
  { style: 'empty', label: 'Empty' },
  { style: 'activate', label: 'Activate' },
  { style: 'search', label: 'Search' },
];

const THUMBNAIL_TABS = ['Grid', 'Search', 'Table', 'Message'] as const;
type ThumbnailTab = (typeof THUMBNAIL_TABS)[number];

// Same 15 categories as Message's notification thumb (Figma Thumbnail-message, node
// 673:27774) — labels match the titles MessageDoc.tsx already uses for these types.
const MESSAGE_STYLES: { style: ThumbnailMessageStyle; label: string }[] = [
  { style: 'approval', label: 'Approval' },
  { style: 'payment', label: 'Payment' },
  { style: 'auto-renew', label: 'Auto Renew' },
  { style: '3pl', label: '3PL' },
  { style: 'chat', label: 'Chat' },
  { style: 'contract', label: 'Contract' },
  { style: 'product-inventory', label: 'Product & Inventory' },
  { style: 'order', label: 'Order' },
  { style: 'permission', label: 'Permission' },
  { style: 'storage', label: 'Storage' },
  { style: 'sla', label: 'SLA' },
  { style: 'store', label: 'Store' },
  { style: 'merchant', label: 'Merchant' },
  { style: 'totes', label: 'Totes' },
  { style: 'system', label: 'System' },
];

function formatIconLabel(name: IconName): string {
  return name
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

function FigmaRef({ href }: { href: string }) {
  return (
    <a className="ds-assets__ref" href={href} target="_blank" rel="noreferrer">
      <span className="icon icon--xs" aria-hidden="true">
        draw
      </span>
      View in Figma
    </a>
  );
}

interface AssetsDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function AssetsDoc({ onNavigate }: AssetsDocProps) {
  const [activeThumbnailTab, setActiveThumbnailTab] = useState<ThumbnailTab>('Grid');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Assets</h1>
        <p className="ds-doc__lede">
          Assets bundles three small, non-interactive display primitives that other
          components lean on: Icon for inline glyphs, Image for empty-state
          illustrations, and Thumbnail for photo/category previews across grids, search
          results, tables, and messages. Each has its own Figma source, linked within
          its section below.
        </p>
      </header>

      {/* ---------------------------------------------------------------- */}
      <section id="overview" className="ds-section">
        <h2 className="ds-section__title">Overview</h2>
        <p className="ds-section__desc">One of each, side by side.</p>
        <div className="ds-variant-row">
          <div className="ds-variant-row__cell">
            <Icon name="faq" size="lg" />
            <span className="ds-variant-row__cell-label">Icon</span>
          </div>
          <div className="ds-variant-row__cell">
            <Image style="empty" />
            <span className="ds-variant-row__cell-label">Image</span>
          </div>
          <div className="ds-variant-row__cell">
            <Thumbnail variant="grid" size="md" showActions={false} />
            <span className="ds-variant-row__cell-label">Thumbnail</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="icon" className="ds-section">
        <div className="ds-assets__section-head">
          <h2 className="ds-section__title">Icon</h2>
          <FigmaRef href={ICON_FIGMA_URL} />
        </div>
        <p className="ds-section__desc">
          Single-color glyphs (<code>currentColor</code>) sized via a <code>size</code>{' '}
          prop — Xs/Sm/Md/Lg map to 12/16/24/36px. Used inline in buttons, inputs, and
          list rows throughout this system.
        </p>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">All icons</span>
            <div className="ds-assets__icon-grid">
              {ICON_NAMES.map((name) => (
                <div className="ds-variant-row__cell" key={name}>
                  <Icon name={name} size="md" />
                  <span className="ds-variant-row__cell-label">{formatIconLabel(name)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              {ICON_SIZES.map(({ size, label }) => (
                <div className="ds-variant-row__cell" key={size}>
                  <Icon name="faq" size={size} />
                  <span className="ds-variant-row__cell-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="image" className="ds-section">
        <div className="ds-assets__section-head">
          <h2 className="ds-section__title">Image</h2>
          <FigmaRef href={IMAGE_FIGMA_URL} />
        </div>
        <p className="ds-section__desc">
          Empty-state illustrations for content that hasn't loaded or hasn't been added
          yet — Empty for a generic blank state, Activate for an activation prompt, and
          Search for no results. Each is a flattened Figma export (the source itself
          typos this style as "Activitate").
        </p>
        <div className="ds-variant-row">
          {IMAGE_STYLES.map(({ style, label }) => (
            <div className="ds-variant-row__cell" key={style}>
              <Image style={style} />
              <span className="ds-variant-row__cell-label">{label}</span>
            </div>
          ))}
        </div>
        <span className="ds-variant-note">
          Figma's source composition uses rotate/blend layers that aren't practical to
          hand-trace as inline SVG, and has no 100/108px height token in{' '}
          <code>tokens.css</code> — flagged per project rule rather than guessed; only
          width (<code>--component-height-6xl</code>) is token-driven, height follows
          each export's own intrinsic size.
        </span>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="thumbnail" className="ds-section">
        <div className="ds-assets__section-head">
          <h2 className="ds-section__title">Thumbnail</h2>
          <FigmaRef href={THUMBNAIL_FIGMA_URL} />
        </div>
        <p className="ds-section__desc">
          One component over four unrelated Figma sub-designs: Grid for uploaded-photo
          tiles with a hover preview/remove overlay, Search for a category glyph in a
          tinted box, Table for a wireflow icon or cropped mockup screenshot, and
          Message for the 15 message-category icons shared with the Message component.
        </p>

        <div className="ds-line-tabs" role="tablist" aria-label="Thumbnail variant groups">
          {THUMBNAIL_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeThumbnailTab === tab}
              className={`ds-line-tab${activeThumbnailTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveThumbnailTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeThumbnailTab === 'Grid' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Thumbnail variant="grid" size="md" forceHover />
                  <span className="ds-variant-row__cell-label">Md · 56px</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Thumbnail variant="grid" size="lg" forceHover />
                  <span className="ds-variant-row__cell-label">Lg · 104px</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Md crops the photo to fill the tile; Lg letterboxes it in full on the
                neutral background — both hover to reveal preview/remove actions.
              </span>
            </div>
          )}

          {activeThumbnailTab === 'Search' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Thumbnail variant="search" searchStyle="product" />
                  <span className="ds-variant-row__cell-label">Product</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Thumbnail variant="search" searchStyle="promotion" />
                  <span className="ds-variant-row__cell-label">Promotion</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Thumbnail variant="search" searchStyle="page" />
                  <span className="ds-variant-row__cell-label">Page</span>
                </div>
              </div>
            </div>
          )}

          {activeThumbnailTab === 'Table' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Thumbnail variant="table" tableStyle="wireflow" />
                  <span className="ds-variant-row__cell-label">Wireflow</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Thumbnail variant="table" tableStyle="mockup" />
                  <span className="ds-variant-row__cell-label">Mockup</span>
                </div>
              </div>
            </div>
          )}

          {activeThumbnailTab === 'Message' && (
            <div className="ds-variant-group">
              <div className="ds-assets__icon-grid">
                {MESSAGE_STYLES.map(({ style, label }) => (
                  <div className="ds-variant-row__cell" key={style}>
                    <Thumbnail variant="message" messageStyle={style} />
                    <span className="ds-variant-row__cell-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Assets.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('upload')}
          >
            <UploadIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Upload</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('message')}
          >
            <MessageIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Message</span>
          </button>
        </div>
      </section>
    </div>
  );
}
