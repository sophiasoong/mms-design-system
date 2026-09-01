import { useState, type ReactNode } from 'react';
import { Icon, type IconName, type IconSize } from './Icon';
import { Image, type ImageStyle } from './Image';
import { Thumbnail, type ThumbnailMessageStyle } from './Thumbnail';
import Button from './Button';
import { FilterChip } from './Chip';
import { Searchbar } from './Searchbar';
import { Table, TableHeader, TableHeaderCell, type TableAlign } from './Table';
import List from './List';
import Message from './Message';
import { ContractIcon, ApprovalIcon, ThreePLIcon, PaymentIcon, OrderIcon } from './messageTypeIcons';
import { ProductIcon, PromotionIcon } from './assetIcons';
import {
  UploadIcon,
  MessageIcon,
  DropzoneIcon,
  TopbarIcon,
  TableIcon,
  DropdownIcon,
} from './icons';
import {
  ChevronDown12Icon,
  ChevronUp12Icon,
  ChevronRight12Icon,
  ChevronDown16Icon,
  ChevronUp16Icon,
  ChevronNext16Icon,
  ChevronBack16Icon,
  Clear16Icon,
  History16Icon,
  Order16Icon,
  Sorter16Icon,
  Resize16Icon,
  Drag16Icon,
  Outlink16Icon,
  Calendar16Icon,
  SwapRight16Icon,
  DoubleChevronLeft16Icon,
  DoubleChevronRight16Icon,
  VisibilityOff16Icon,
  Product16Icon,
  Promotion16Icon,
  Navigation16Icon,
  Visible16Icon,
  Order20Icon,
  Product20Icon,
  Dashboard20Icon,
  Ad20Icon,
  Payment20Icon,
  Rating20Icon,
  Merchant20Icon,
  System20Icon,
  Return20Icon,
  Promotion20Icon,
  ThreePL20Icon,
  StoreHktv20Icon,
  StoreThePlace20Icon,
} from './iconSizeGroups';
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

// The Icon-library's own 5 native size TIERS from Figma (967:42491) — a different axis
// from ICON_SIZES above: each tier is its own frame of hand-drawn artwork at a fixed
// native pixel size, not one glyph CSS-scaled to 4 sizes. Some tier icons reuse Icon's
// ICONS map (Xs/Sm/Md already render at 12/16/24px) or assetIcons.tsx components that
// happen to match 1:1; the rest are new, tier-specific traces in iconSizeGroups.tsx.
const ICON_SIZE_TABS = ['12px', '16px', '20px', '24px', '48px'] as const;
type IconSizeTab = (typeof ICON_SIZE_TABS)[number];

// Sparse tiers (12px: 3 icons, 48px: 1 icon) don't fill the grid's full width — see
// .ds-assets__icon-grid--center in AssetsDoc.css.
const ICON_GRID_CENTER_TABS: IconSizeTab[] = ['12px', '48px'];

interface SizeTabIconEntry {
  key: string;
  label: string;
  glyph: ReactNode;
}

// 12px tier (Figma frame 367:3410) — Right/Down/Up are each their own native 12x12
// export, see iconSizeGroups.tsx's header comment. Each glyph carries the
// ds-icon__glyph class so the shared .ds-icon--xs wrapper below (Icon.css) centers
// and caps it in a common 12x12 box, same as Icon.tsx does for its own ICONS map.
const ICON_TAB_12: SizeTabIconEntry[] = [
  { key: 'right', label: 'Right', glyph: <ChevronRight12Icon className="ds-icon__glyph" /> },
  { key: 'down', label: 'Down', glyph: <ChevronDown12Icon className="ds-icon__glyph" /> },
  { key: 'up', label: 'Up', glyph: <ChevronUp12Icon className="ds-icon__glyph" /> },
];

// 16px tier (Figma frame 367:3028) — names already covered by Icon's own ICONS map,
// rendered at size="sm" (16px) rather than re-traced.
const ICON_TAB_16_NAMES: IconName[] = [
  'menu',
  'search',
  'attachment',
  'add',
  'info',
  'success',
  'error',
  'preview',
  'close',
  'upload',
  'delete',
  'edit',
];

// 16px tier, continued — the tier's remaining traces, each its own dedicated
// tier-specific component (see iconSizeGroups.tsx's Product16Icon/Promotion16Icon/
// Navigation16Icon/Visible16Icon header comment: despite sharing names with
// assetIcons.tsx's Thumbnail-only ProductIcon/PromotionIcon/PageIcon/VisibilityIcon,
// those are genuinely different native sizes/proportions, so they're kept separate
// rather than reused here). Each glyph carries ds-icon__glyph so the shared
// .ds-icon--sm wrapper below centers/caps it in the same 16x16 box the
// ICON_TAB_16_NAMES row above already gets from <Icon size="sm"> — otherwise these
// render at their own raw native sizes, which vary widely glyph to glyph and look
// inconsistent both against each other and against the row above.
const ICON_TAB_16_EXTRA: SizeTabIconEntry[] = [
  { key: 'down', label: 'Down', glyph: <ChevronDown16Icon className="ds-icon__glyph" /> },
  { key: 'up', label: 'Up', glyph: <ChevronUp16Icon className="ds-icon__glyph" /> },
  { key: 'next', label: 'Next', glyph: <ChevronNext16Icon className="ds-icon__glyph" /> },
  { key: 'back', label: 'Back', glyph: <ChevronBack16Icon className="ds-icon__glyph" /> },
  {
    key: 'double-chevron-left',
    label: 'Left',
    glyph: <DoubleChevronLeft16Icon className="ds-icon__glyph" />,
  },
  {
    key: 'double-chevron-right',
    label: 'Right',
    glyph: <DoubleChevronRight16Icon className="ds-icon__glyph" />,
  },
  { key: 'swap-right', label: 'Swap Right', glyph: <SwapRight16Icon className="ds-icon__glyph" /> },
  { key: 'clear', label: 'Clear', glyph: <Clear16Icon className="ds-icon__glyph" /> },
  { key: 'history', label: 'History', glyph: <History16Icon className="ds-icon__glyph" /> },
  { key: 'sorter', label: 'Sorter', glyph: <Sorter16Icon className="ds-icon__glyph" /> },
  { key: 'resize', label: 'Resize', glyph: <Resize16Icon className="ds-icon__glyph" /> },
  { key: 'outlink', label: 'Outlink', glyph: <Outlink16Icon className="ds-icon__glyph" /> },
  { key: 'calendar', label: 'Calendar', glyph: <Calendar16Icon className="ds-icon__glyph" /> },
  { key: 'order', label: 'Order', glyph: <Order16Icon className="ds-icon__glyph" /> },
  { key: 'drag', label: 'Drag', glyph: <Drag16Icon className="ds-icon__glyph" /> },
  { key: 'product', label: 'Product', glyph: <Product16Icon className="ds-icon__glyph" /> },
  { key: 'promotion', label: 'Promotion', glyph: <Promotion16Icon className="ds-icon__glyph" /> },
  { key: 'navigation', label: 'Navigation', glyph: <Navigation16Icon className="ds-icon__glyph" /> },
  { key: 'visible', label: 'Visible', glyph: <Visible16Icon className="ds-icon__glyph" /> },
  { key: 'hidden', label: 'Hidden', glyph: <VisibilityOff16Icon className="ds-icon__glyph" /> },
];

// 20px tier (Figma frame 367:3016) — entirely net-new traces; every name here shares
// wording with an unrelated icon elsewhere (16px tier or the 48px message thumbs in
// messageTypeIcons.tsx) but is confirmed different artwork, see iconSizeGroups.tsx.
const ICON_TAB_20: SizeTabIconEntry[] = [
  { key: 'order', label: 'Order', glyph: <Order20Icon /> },
  { key: 'product', label: 'Product', glyph: <Product20Icon /> },
  { key: 'dashboard', label: 'Dashboard', glyph: <Dashboard20Icon /> },
  { key: 'ad', label: 'Add', glyph: <Ad20Icon /> },
  { key: 'payment', label: 'Payment', glyph: <Payment20Icon /> },
  { key: 'rating', label: 'Rating', glyph: <Rating20Icon /> },
  { key: 'merchant', label: 'Merchant', glyph: <Merchant20Icon /> },
  { key: 'system', label: 'System', glyph: <System20Icon /> },
  { key: 'return', label: 'Return', glyph: <Return20Icon /> },
  { key: 'promotion', label: 'Promotion', glyph: <Promotion20Icon /> },
  { key: '3pl', label: '3PL', glyph: <ThreePL20Icon /> },
  { key: 'store-hktv', label: 'HKTV Store', glyph: <StoreHktv20Icon /> },
  { key: 'store-the-place', label: 'thePlace Store', glyph: <StoreThePlace20Icon /> },
];

// 24px tier (Figma frame 655:21348) — fully covered by Icon's own ICONS map, rendered
// at size="md" (24px).
const ICON_TAB_24_NAMES: IconName[] = [
  'faq',
  'notification',
  'download',
  'flip-horizontal',
  'flip-vertical',
  'rotate-left',
  'rotate-right',
  'zoom-out',
  'zoom-in',
  'more',
  'drag',
];

// 48px tier (Figma frame 705:12687) — its one icon already exists as the Upload
// dropzone's own glyph.
const ICON_TAB_48: SizeTabIconEntry[] = [{ key: 'dropzone', label: 'Dropzone', glyph: <DropzoneIcon /> }];

const IMAGE_STYLES: { style: ImageStyle; label: string }[] = [
  { style: 'empty', label: 'Empty' },
  { style: 'activate', label: 'Activate' },
  { style: 'search', label: 'Search' },
];

// Column set for the "Table empty data" Example instance (Figma 948:27207) — only
// header cells render since the point is the empty body. Trimmed to Figma's 6 core
// columns, dropping the 4 supplementary pricing/promotion columns from its full set.
const TABLE_EMPTY_COLUMNS: { label: string; width: number; align?: TableAlign; info?: boolean }[] = [
  { label: 'Image', width: 88 },
  { label: 'SKU ID', width: 140, info: true },
  { label: 'Brand', width: 140, info: true },
  { label: 'Category', width: 140 },
  { label: 'Original Price', width: 110, align: 'right' },
  { label: 'Selling Price', width: 110, align: 'right' },
];

const THUMBNAIL_TABS = ['Grid', 'Search', 'Table', 'Message'] as const;
type ThumbnailTab = (typeof THUMBNAIL_TABS)[number];

const EXAMPLE_TABS = ['Image', 'Thumbnail'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

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
  const [activeIconSizeTab, setActiveIconSizeTab] = useState<IconSizeTab>(ICON_SIZE_TABS[0]);
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Image');

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
      <section id="variants" className="ds-section">
        <h2 className="ds-section__title">Variants</h2>

        <div id="variants-icon" className="ds-section__subsection">
        <div className="ds-assets__section-head">
          <h3 className="ds-section__subtitle">Icon</h3>
          <FigmaRef href={ICON_FIGMA_URL} />
        </div>
        <p className="ds-section__desc">
          Single-color glyphs (<code>currentColor</code>) sized via a <code>size</code>{' '}
          prop — Xs/Sm/Md/Lg map to 12/16/24/36px. Used inline in buttons, inputs, and
          list rows throughout this system.
        </p>

        <div className="ds-line-tabs" role="tablist" aria-label="Icon size groups">
          {ICON_SIZE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeIconSizeTab === tab}
              className={`ds-line-tab${activeIconSizeTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveIconSizeTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div
              className={`ds-assets__icon-grid${
                ICON_GRID_CENTER_TABS.includes(activeIconSizeTab)
                  ? ' ds-assets__icon-grid--center'
                  : ''
              }`}
            >
              {activeIconSizeTab === '12px' &&
                ICON_TAB_12.map(({ key, label, glyph }) => (
                  <div className="ds-variant-row__cell" key={key}>
                    <span className="ds-icon ds-icon--xs">{glyph}</span>
                    <span className="ds-variant-row__cell-label">{label}</span>
                  </div>
                ))}

              {activeIconSizeTab === '16px' && (
                <>
                  {ICON_TAB_16_NAMES.map((name) => (
                    <div className="ds-variant-row__cell" key={name}>
                      <Icon name={name} size="sm" />
                      <span className="ds-variant-row__cell-label">{formatIconLabel(name)}</span>
                    </div>
                  ))}
                  {ICON_TAB_16_EXTRA.map(({ key, label, glyph }) => (
                    <div className="ds-variant-row__cell" key={key}>
                      <span className="ds-icon ds-icon--sm">{glyph}</span>
                      <span className="ds-variant-row__cell-label">{label}</span>
                    </div>
                  ))}
                </>
              )}

              {activeIconSizeTab === '20px' &&
                ICON_TAB_20.map(({ key, label, glyph }) => (
                  <div className="ds-variant-row__cell" key={key}>
                    <span className="ds-assets__icon-tile--20">{glyph}</span>
                    <span className="ds-variant-row__cell-label">{label}</span>
                  </div>
                ))}

              {activeIconSizeTab === '24px' &&
                ICON_TAB_24_NAMES.map((name) => (
                  <div className="ds-variant-row__cell" key={name}>
                    <Icon name={name} size="md" />
                    <span className="ds-variant-row__cell-label">{formatIconLabel(name)}</span>
                  </div>
                ))}

              {activeIconSizeTab === '48px' &&
                ICON_TAB_48.map(({ key, label, glyph }) => (
                  <div className="ds-variant-row__cell" key={key}>
                    {glyph}
                    <span className="ds-variant-row__cell-label">{label}</span>
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
        </div>

        <div id="variants-image" className="ds-section__subsection">
        <div className="ds-assets__section-head">
          <h3 className="ds-section__subtitle">Image</h3>
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
        </div>

        <div id="variants-thumbnail" className="ds-section__subsection">
        <div className="ds-assets__section-head">
          <h3 className="ds-section__subtitle">Thumbnail</h3>
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
        </div>

        <div id="variants-example" className="ds-section__subsection">
        <h3 className="ds-section__subtitle">Example</h3>
        <p className="ds-section__desc">
          Two real compositions built from these assets: the Empty Image style standing in
          for a Table's rows or a Dropdown's option list, and the Product/Promotion
          Thumbnail glyphs swapped into a List row's icon.
        </p>

        <div className="ds-line-tabs" role="tablist" aria-label="Example asset group">
          {EXAMPLE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeExampleTab === tab}
              className={`ds-line-tab${activeExampleTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveExampleTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeExampleTab === 'Image' && (
        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview ds-preview--scroll ds-preview--scrim">
              <div className="ds-assets__image-example">
                <div className="ds-assets__image-example__item">
                  <div className="ds-assets__dropdown-demo">
                    <FilterChip label="Label" />
                    <div className="ds-dropdown" role="listbox">
                      <div className="ds-dropdown__searchbar-row">
                        <div className="ds-dropdown__searchbar ds-dropdown__searchbar--force-focus">
                          <span className="icon icon--sm" aria-hidden="true">
                            search
                          </span>
                          <input
                            className="ds-dropdown__searchbar-input"
                            type="text"
                            readOnly
                            value="Label"
                            aria-label="Search"
                          />
                          <span className="icon icon--sm icon--filled" aria-hidden="true">
                            cancel
                          </span>
                        </div>
                      </div>
                      <div className="ds-dropdown__empty-block">
                        <Image style="empty" />
                        <p className="ds-dropdown__empty-title">No Result</p>
                      </div>
                      <div className="ds-dropdown__footer">
                        <Button variant="primary" appearance="ghost" size="sm">
                          Reset
                        </Button>
                        <Button variant="primary" appearance="solid" size="sm">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                  <span className="ds-variant-note">Empty search result</span>
                </div>

                <div className="ds-assets__image-example__item">
                  <div className="ds-table-example">
                    <div className="ds-table-toolbar">
                      <div className="ds-table-toolbar__search-wrap">
                        <Searchbar size="md" placeholder="Placeholder" scopeLabel="Promotion ID" />
                      </div>
                      <div className="ds-table-toolbar__filters">
                        <FilterChip label="Category" />
                        <FilterChip label="Status" />
                      </div>
                      <div className="ds-table-toolbar__actions">
                        <Button variant="primary" appearance="ghost" size="md">
                          Reset
                        </Button>
                      </div>
                    </div>

                    <div className="ds-table-results">
                      <span className="ds-table-results__count">0 results</span>
                    </div>

                    <div className="ds-table-example__scroll">
                      <div className="ds-table-example__frame">
                        <Table size="md">
                          <TableHeader>
                            {TABLE_EMPTY_COLUMNS.map(({ label, width, align, info }) => (
                              <TableHeaderCell key={label} width={width} align={align} info={info}>
                                {label}
                              </TableHeaderCell>
                            ))}
                          </TableHeader>
                        </Table>
                      </div>

                      <div className="ds-table-empty">
                        <Image style="empty" />
                        <p className="ds-table-empty__title">No Record</p>
                        <p className="ds-table-empty__desc">
                          No results match your search or filters. Try adjusting them to
                          find what you're looking for.
                        </p>
                        <Button variant="primary" appearance="solid" size="sm">
                          Reset filters
                        </Button>
                      </div>
                    </div>
                  </div>
                  <span className="ds-variant-note">Empty table data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {activeExampleTab === 'Thumbnail' && (
        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview ds-preview--scroll ds-preview--scrim">
              <div className="ds-assets__thumbnail-example">
                <div className="ds-assets__thumbnail-example__item">
                  <div className="ds-assets__thumbnail-demo">
                    <div className="ds-assets__thumbnail-demo__panel">
                      <div className="ds-assets__thumbnail-demo__searchbar-row ds-assets__thumbnail-demo__dim">
                        <Searchbar size="lg" state="focus" chipLabel="Product" defaultValue="Something" />
                      </div>
                      <div className="ds-assets__thumbnail-demo__rows">
                        <List
                          size="lg"
                          icon={
                            <ProductIcon className="ds-assets__thumbnail-demo__glyph ds-assets__thumbnail-demo__glyph--product" />
                          }
                          label="Storefront Setup"
                          tag="Product"
                          subtitle={
                            <>
                              Key<mark className="ds-list__mark">word</mark> • Keyword • Keyword •
                              Intent
                            </>
                          }
                          caption="Online Store / Storefront / Setup / Marketing / Campaigns / Automation"
                          forceState="hover"
                        />
                        <List
                          size="lg"
                          icon={
                            <PromotionIcon className="ds-assets__thumbnail-demo__glyph ds-assets__thumbnail-demo__glyph--promotion" />
                          }
                          label="Free Gift Promotion"
                          tag="Promotion"
                          subtitle={
                            <>
                              Key<mark className="ds-list__mark">word</mark> • Keyword • Keyword •
                              Intent
                            </>
                          }
                          caption="Online Store / Promotions / Free Gift / Campaign / Rules / Eligibility"
                        />
                      </div>
                      <div className="ds-assets__thumbnail-demo__footer ds-assets__thumbnail-demo__dim">
                        <span className="ds-assets__thumbnail-demo__kbd">Esc</span>
                        <span className="ds-assets__thumbnail-demo__hint">Close</span>
                        <span className="ds-assets__thumbnail-demo__kbd">/</span>
                        <span className="ds-assets__thumbnail-demo__hint">Open global search</span>
                      </div>
                    </div>
                  </div>
                  <span className="ds-variant-note">Search results</span>
                </div>

                <div className="ds-assets__thumbnail-example__item">
                  <div className="ds-assets__message-demo">
                    <div className="ds-assets__message-demo__panel">
                      <Message
                        title="Contract"
                        description="A contract is ready for your signature — please review before the due date."
                        icon={<ContractIcon />}
                        tags={['Contract', 'Legal']}
                        date="2026-08-02"
                        showButton={false}
                        showBadge={false}
                      />
                      <Message
                        title="Approval"
                        description="A new request is waiting for your review and approval."
                        icon={<ApprovalIcon />}
                        tags={['Approval', 'Review']}
                        date="2026-07-30"
                        showButton={false}
                        showBadge={false}
                      />
                      <Message
                        title="3PL"
                        description="Your 3PL partner updated the shipment status for 3 pending orders."
                        icon={<ThreePLIcon />}
                        tags={['3PL', 'Logistics']}
                        date="2026-07-31"
                        showButton={false}
                        showBadge={false}
                      />
                      <Message
                        title="Payment"
                        description="A payment of $1,240.00 was successfully processed for invoice #48213."
                        icon={<PaymentIcon />}
                        tags={['Payment', 'Finance']}
                        date="2026-08-01"
                        showButton={false}
                        showBadge={false}
                      />
                      <Message
                        title="Order"
                        description="Order #10293 has shipped and is on its way to the customer."
                        icon={<OrderIcon />}
                        tags={['Order', 'Logistics']}
                        date="2026-08-02"
                        showButton={false}
                        showBadge={false}
                      />
                      <div className="ds-assets__message-demo__footer">
                        <Button
                          variant="primary"
                          appearance="outline"
                          size="md"
                          className="ds-assets__message-demo__view-all"
                        >
                          View All
                        </Button>
                      </div>
                    </div>
                  </div>
                  <span className="ds-variant-note">Message</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">
          Components that commonly appear alongside Assets.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('topbar')}
          >
            <TopbarIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Topbar</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('table')}
          >
            <TableIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Table</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('dropdown')}
          >
            <DropdownIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Dropdown</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('message')}
          >
            <MessageIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Message</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('upload')}
          >
            <UploadIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Upload</span>
          </button>
        </div>
      </section>
    </div>
  );
}
