import { useRef, useState } from 'react';
import { Hint, type HintSize } from './Hint';
import Modal from './Modal';
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell } from './Table';
import { Searchbar } from './Searchbar';
import { FilterChip } from './Chip';
import Button from './Button';
import Pagination from './Pagination';
import List from './List';
import { ProductIcon, PromotionIcon } from './assetIcons';
import { DropdownIcon, TableIcon, SearchbarIcon } from './icons';
import './ButtonDoc.css';
import './Table.css';
import './ModalDoc.css';
import './ListDoc.css';
import './HintDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=194-2853';

const SIZE_TABS = ['Md', 'Lg'] as const;
type SizeTab = (typeof SIZE_TABS)[number];

const EXAMPLE_TABS = ['Table', 'Searchbar'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

// Duplicated from Modal's Variants > Example > Table instance (ModalDoc.tsx), with the
// first row's Product Name lengthened to ~200 characters so it truncates inside its 240px
// column — the only row wired up to reveal a Hint on hover of its ellipsis.
const HINT_EXAMPLE_TABLE_ROWS = [
  {
    sku: 'SKU-1001',
    name: 'Premium Wireless Mechanical Keyboard with RGB Backlighting, Hot-Swappable Switches, Multi-Device Bluetooth Pairing, Programmable Macro Keys, and a Detachable USB-C Cable for Gaming and Productivity',
    category: 'Electronics',
    price: '$49.00',
    stock: 120,
  },
  { sku: 'SKU-1002', name: 'Bluetooth Speaker', category: 'Electronics', price: '$79.00', stock: 64 },
  { sku: 'SKU-1003', name: 'Ceramic Mug', category: 'Home', price: '$12.00', stock: 340 },
  { sku: 'SKU-1004', name: 'Yoga Mat', category: 'Sports', price: '$25.00', stock: 95 },
  { sku: 'SKU-1005', name: 'Stainless Water Bottle', category: 'Home', price: '$18.00', stock: 210 },
];

// Duplicated from List's Variants > Example > Search Results instance (ListDoc.tsx), with
// the first row's keyword line extended so it overflows the row and truncates — the only
// row wired up to reveal a Hint on hover of its ellipsis.
const HINT_EXAMPLE_SUBTITLE =
  'Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Keyword • Intent';

interface HintDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function HintDoc({ onNavigate }: HintDocProps) {
  const [activeSizeTab, setActiveSizeTab] = useState<SizeTab>('Md');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Table');

  const tableNameRef = useRef<HTMLSpanElement>(null);
  const [showTableHint, setShowTableHint] = useState(false);
  const handleTableNameMouseEnter = () => {
    const el = tableNameRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowTableHint(true);
    }
  };
  const handleTableNameMouseLeave = () => setShowTableHint(false);

  const subtitleRef = useRef<HTMLSpanElement>(null);
  const [showSubtitleHint, setShowSubtitleHint] = useState(false);
  const handleSubtitleMouseEnter = () => {
    const el = subtitleRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowSubtitleHint(true);
    }
  };
  const handleSubtitleMouseLeave = () => setShowSubtitleHint(false);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Hint</h1>
        <p className="ds-doc__lede">
          A Hint is a small tooltip-style bubble that surfaces extra information or guidance
          without disrupting the interface. It appears after roughly 0.3s of hovering or
          focusing on an element, and disappears once the pointer leaves the target's range —
          most commonly used when a Select option's text is too long to fit on one line.
        </p>
        <a
          className="ds-doc__figma-link ds-button ds-button--secondary ds-button--solid ds-button--md"
          href={FIGMA_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span className="icon ds-button__icon" aria-hidden="true">
            draw
          </span>
          <span className="ds-button__label">View in Figma</span>
        </a>
      </header>

      {/* ---------------------------------------------------------------- */}
      <section id="overview" className="ds-section">
        <h2 className="ds-section__title">Overview</h2>
        <p className="ds-section__desc">
          Hint is passive, read-only content — it never carries its own interactivity. It rides
          along with the element that triggers it (a Select option, a truncated label, a form
          field) and inherits that element's hover/focus behavior.
        </p>
        <div className="ds-preview">
          <Hint>I'm a hint description</Hint>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Just two parts — a shadowed container that carries the surface, and the text it holds.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div className="ds-hint ds-anatomy__demo ds-anatomy__part-relative" aria-hidden="true">
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <p className="ds-hint__label ds-anatomy__part-relative">
                Label
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </p>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>fixed padding and radius, with a drop shadow to lift it off the page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Label</strong> —{' '}
                  <span>the hint text; wraps within the container's max-width instead of truncating</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="variants" className="ds-section">
        <h2 className="ds-section__title">Variants</h2>
        <p className="ds-section__desc">
          Size controls only the max-width the label can wrap within — pick it by host
          component, not by content length: Md (240px) inside a Dropdown, Lg (600px) inside a
          Modal.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Size</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Hint size groups">
          {SIZE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeSizeTab === tab}
              className={`ds-line-tab${activeSizeTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveSizeTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview">
              <Hint size={activeSizeTab.toLowerCase() as HintSize}>
                {activeSizeTab === 'Md'
                  ? "I'm a hint description that wraps once it reaches the Dropdown's 240px max-width."
                  : "I'm a much longer hint description — the kind that only fits inside a Modal, where the max-width relaxes all the way out to 600px before the label starts wrapping onto a new line."}
              </Hint>
            </div>
            <span className="ds-variant-note">
              {activeSizeTab === 'Md'
                ? 'Dropdown max-width is 240px — beyond that, the label wraps onto a new line.'
                : 'Modal max-width is 600px — beyond that, the label wraps onto a new line.'}
            </span>
          </div>
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Hint rides along with whatever component truncates its own content — a Table
            cell's overflowing text (Md), or a Searchbar result's overflowing keyword line
            (Lg). Hover the ellipsis in either to reveal it.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Hint example use cases">
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

          <div className="ds-preview ds-preview--scrim ds-preview--scroll">
            {activeExampleTab === 'Table' && (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Modal
                  size="full"
                  title="Product Catalog"
                  showInfo
                  className="ds-modal--table-example"
                  showLeading
                >
                  <div className="ds-table-example">
                    <div className="ds-table-toolbar">
                      <div className="ds-table-toolbar__search-wrap">
                        <Searchbar size="md" placeholder="Search" scopeLabel="SKU ID" />
                      </div>
                      <div className="ds-table-toolbar__filters">
                        <FilterChip label="Category" />
                        <FilterChip label="In Stock" />
                      </div>
                      <div className="ds-table-toolbar__actions">
                        <Button variant="primary" appearance="ghost" size="md">
                          Reset
                        </Button>
                      </div>
                    </div>

                    <div className="ds-table-results">
                      <span className="ds-table-results__count">
                        1–{HINT_EXAMPLE_TABLE_ROWS.length} of {HINT_EXAMPLE_TABLE_ROWS.length}{' '}
                        results
                      </span>
                      <div className="ds-table-results__actions">
                        <span className="ds-table-results__updated">
                          Last Updated 2026-08-11 09:15
                        </span>
                        <Button variant="primary" appearance="outline" size="md">
                          Refresh
                        </Button>
                        <Button variant="primary" appearance="outline" size="md">
                          Export
                        </Button>
                      </div>
                    </div>

                    <Table size="md" className="ds-hint-doc__example-table">
                      <TableHeader>
                        <TableHeaderCell width={140}>SKU ID</TableHeaderCell>
                        <TableHeaderCell width={240}>Product Name</TableHeaderCell>
                        <TableHeaderCell width={140}>Category</TableHeaderCell>
                        <TableHeaderCell width={110} align="center">
                          Price
                        </TableHeaderCell>
                        <TableHeaderCell width={100} align="center">
                          Stock
                        </TableHeaderCell>
                      </TableHeader>
                      {HINT_EXAMPLE_TABLE_ROWS.map((row, index) => (
                        <TableRow key={row.sku}>
                          <TableCell>{row.sku}</TableCell>
                          <TableCell>
                            {index === 0 ? (
                              <span
                                className="ds-hint-doc__example-wrap ds-hint-doc__example-wrap--table"
                                onMouseEnter={handleTableNameMouseEnter}
                                onMouseLeave={handleTableNameMouseLeave}
                              >
                                <span ref={tableNameRef} className="ds-hint-doc__example-truncate">
                                  {row.name}
                                </span>
                                {showTableHint && (
                                  <span className="ds-hint-doc__example-hint">
                                    <Hint size="md">{row.name}</Hint>
                                  </span>
                                )}
                              </span>
                            ) : (
                              row.name
                            )}
                          </TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell align="center">{row.price}</TableCell>
                          <TableCell align="center">{row.stock}</TableCell>
                        </TableRow>
                      ))}
                    </Table>

                    <div className="ds-table-example__pagination">
                      <Pagination size="sm" currentPage={1} totalPages={1} />
                    </div>
                  </div>
                </Modal>
              </div>
            )}

            {activeExampleTab === 'Searchbar' && (
              <div className="ds-list-example">
                <div className="ds-list-example__panel ds-list-example__panel--wide ds-list-example__panel--radius-xl">
                <div className="ds-list-example__searchbar-row">
                  <Searchbar size="lg" state="focus" chipLabel="Product" defaultValue="Something" />
                </div>
                <div className="ds-list-example__rows ds-list-example__rows--lg">
                  <List
                    size="lg"
                    label="Storefront Setup"
                    tag="Product"
                    icon={<ProductIcon className="ds-list-example__thumb-glyph--product" />}
                    subtitle={
                      <span
                        className="ds-hint-doc__example-wrap ds-hint-doc__example-wrap--subtitle"
                        onMouseEnter={handleSubtitleMouseEnter}
                        onMouseLeave={handleSubtitleMouseLeave}
                      >
                        <span ref={subtitleRef} className="ds-hint-doc__example-truncate">
                          Key<mark className="ds-list__mark">word</mark> •{' '}
                          {HINT_EXAMPLE_SUBTITLE}
                        </span>
                        {showSubtitleHint && (
                          <span className="ds-hint-doc__example-hint">
                            <Hint size="md">{`Keyword • ${HINT_EXAMPLE_SUBTITLE}`}</Hint>
                          </span>
                        )}
                      </span>
                    }
                    caption="Online Store / Storefront / Setup / Marketing / Campaigns / Automation"
                    forceState="hover"
                  />
                  <List
                    size="lg"
                    label="Storefront Domain Settings"
                    tag="Product"
                    icon={<ProductIcon className="ds-list-example__thumb-glyph--product" />}
                    subtitle={
                      <>
                        Key<mark className="ds-list__mark">word</mark> • Keyword • Keyword •
                        Intent
                      </>
                    }
                    caption="Online Store / Storefront / Domain / Settings / Advanced / Custom"
                  />
                  <List
                    size="lg"
                    label="Free Gift Promotion"
                    tag="Promotion"
                    icon={<PromotionIcon className="ds-list-example__thumb-glyph--promotion" />}
                    subtitle={
                      <>
                        Key<mark className="ds-list__mark">word</mark> • Keyword • Keyword •
                        Intent
                      </>
                    }
                    caption="Online Store / Promotions / Free Gift / Campaign / Rules / Eligibility"
                  />
                </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Padding, radius, and type are fixed across both sizes — only max-width changes.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Token</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Max-width (Md)</th>
              <td>
                <code>--component-width-tooltip-md</code>
              </td>
              <td>240px</td>
            </tr>
            <tr>
              <th scope="row">Max-width (Lg)</th>
              <td>—</td>
              <td>600px</td>
            </tr>
            <tr>
              <th scope="row">Padding</th>
              <td>
                <code>--space-component-padding-xs / -sm</code>
              </td>
              <td>4px / 8px (vertical / horizontal)</td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td>
                <code>--radius-sm</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Shadow</th>
              <td>
                <code>--interactive-dropdown-panel-shadow-default</code>
              </td>
              <td>0px 2px 8px 0px</td>
            </tr>
            <tr>
              <th scope="row">Type</th>
              <td>
                <code>--typography-xs</code>
              </td>
              <td>12px / 16px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">
          Components that commonly appear alongside Hint.
        </p>
        <div className="ds-related-grid">
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
            onClick={() => onNavigate?.('table')}
          >
            <TableIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Table</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('searchbar')}
          >
            <SearchbarIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Searchbar</span>
          </button>
        </div>
      </section>
    </div>
  );
}
