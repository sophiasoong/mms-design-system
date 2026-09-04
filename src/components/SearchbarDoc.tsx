import { useLayoutEffect, useRef, useState } from 'react';
import { Searchbar } from './Searchbar';
import { ActionChip, FilterChip } from './Chip';
import { DropdownOption } from './Dropdown';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectHeaderCell,
  TableRow,
  TableCell,
  TableSelectCell,
} from './Table';
import Button from './Button';
import Pagination from './Pagination';
import AppTopbar from './AppTopbar';
import AppSidebar from './AppSidebar';
import List from './List';
import { ProductIcon, PromotionIcon } from './assetIcons';
import { TableIcon, TopbarIcon } from './icons';
import './ButtonDoc.css';
import './Table.css';
import './SearchbarDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=1-108';

const STYLE_TABS = ['Label', 'Chip', 'Scope Selector'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

// Figma's "Scoped-searchbar" example (node 1604:37717) pairs the trigger with a generic
// 3-option Dropdown panel — these stand in for its placeholder "Option" rows with values
// relevant to a merchant search bar.
const SCOPE_OPTIONS = ['Promotion ID', 'Order ID', 'Product ID'];

const EXAMPLE_TABS = ['Table search', 'Global search'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

interface ExampleTableRow {
  sku: string;
  brand: string;
  name: string;
  category: string;
  originalPrice: string;
  sellingPrice: string;
  merchant: string;
  discount: string;
}

/** A subset of TableDoc.tsx's own EXAMPLE_ROWS (Default tab) — same SKU-pricing column shape,
 * kept as its own copy here per this codebase's doc-CSS-stays-scoped convention rather than
 * imported, and trimmed to 4 rows since this composition's subject is Searchbar, not Table. */
const EXAMPLE_TABLE_ROWS: ExampleTableRow[] = [
  { sku: 'SKU-100234', brand: 'Nestlé', name: 'Nescafé Gold Blend 200g', category: 'Beverages', originalPrice: '$144', sellingPrice: '$138', merchant: 'Merchant A', discount: '8%' },
  { sku: 'SKU-100235', brand: 'Unilever', name: 'Dove Body Wash 500ml', category: 'Personal Care', originalPrice: '$89', sellingPrice: '$79', merchant: 'Merchant A', discount: '12%' },
  { sku: 'SKU-100236', brand: 'P&G', name: 'Pampers Diapers Size 3', category: 'Baby Care', originalPrice: '$210', sellingPrice: '$195', merchant: 'Merchant B', discount: '5%' },
  { sku: 'SKU-100237', brand: 'Nestlé', name: 'KitKat 4 Finger 41.5g', category: 'Snacks', originalPrice: '$18', sellingPrice: '$16', merchant: 'Merchant B', discount: '15%' },
];

interface SearchbarDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function SearchbarDoc({ onNavigate }: SearchbarDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Label');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [scopeValue, setScopeValue] = useState(SCOPE_OPTIONS[0]);
  const [scopeOpen, setScopeOpen] = useState(false);
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Table search');
  const [exampleCheckedRows, setExampleCheckedRows] = useState<Record<string, boolean>>({});
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  // AppTopbar doesn't expose its internal search field's own bounding box as a prop, so the
  // results panel below measures the live DOM node directly (relative to this anchor) to line
  // its own left/width up with the real field — which itself flex-grows/shrinks with the
  // topbar's available width — rather than centering a fixed-width panel under the whole bar.
  const topbarAnchorRef = useRef<HTMLDivElement>(null);
  const [searchFieldRect, setSearchFieldRect] = useState<{ left: number; width: number } | null>(
    null
  );

  useLayoutEffect(() => {
    if (!globalSearchOpen) return;
    const anchor = topbarAnchorRef.current;
    const searchField = anchor?.querySelector('.ds-app-topbar__search');
    if (!anchor || !searchField) return;

    const updateRect = () => {
      const anchorRect = anchor.getBoundingClientRect();
      const fieldRect = searchField.getBoundingClientRect();
      setSearchFieldRect({ left: fieldRect.left - anchorRect.left, width: fieldRect.width });
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [globalSearchOpen]);

  const toggleExampleRow = (sku: string) => {
    setExampleCheckedRows((prev) => ({ ...prev, [sku]: !prev[sku] }));
  };
  const allExampleChecked = EXAMPLE_TABLE_ROWS.every((row) => exampleCheckedRows[row.sku]);
  const someExampleChecked = EXAMPLE_TABLE_ROWS.some((row) => exampleCheckedRows[row.sku]);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Searchbar</h1>
        <p className="ds-doc__lede">
          A Searchbar is a bordered text field dedicated to querying a list or dataset. A
          trailing action icon submits the search, swapping to a clear icon once the field is
          focused with a typed value.
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
          Use a Searchbar wherever a user filters or queries a list of results, rather than
          entering free-form text into a form (see Input).
        </p>
        <div className="ds-preview">
          <div style={{ width: 320 }}>
            <Searchbar placeholder="Search" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A bordered container holding typed or placeholder text, with a trailing action icon
          that submits the search or clears the current value.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-searchbar ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
              style={{ width: 320 }}
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-searchbar__field ds-anatomy__part-relative">
                Search
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </span>
              <span className="ds-searchbar__action ds-searchbar__action--search ds-anatomy__part-relative">
                <span className="icon icon--sm" aria-hidden="true">
                  search
                </span>
                <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>border, radius, background respond to hover / focus / disabled</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Field</strong> — <span>typed or placeholder text</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Action</strong> —{' '}
                  <span>submits the search by default, becomes a clear button once focused with a value</span>
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
          Label holds a single free-typed query. Chip lets a picked filter sit inline as a
          removable token ahead of the typed text. Scope Selector narrows the query to a named
          field via a leading dropdown segment.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Searchbar style groups">
          {STYLE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeStyleTab === tab}
              className={`ds-line-tab${activeStyleTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveStyleTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeStyleTab === 'Label' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ width: 320 }}>
                  <Searchbar placeholder="Search" />
                </div>
              </div>
              <span className="ds-variant-note">A single free-typed query value.</span>
            </div>
          )}

          {activeStyleTab === 'Chip' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--stack">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 'var(--space-component-gap-md)',
                  }}
                >
                  <div style={{ width: 320 }}>
                    <Searchbar
                      placeholder="Please select"
                      chipLabel={selectedFilter ?? undefined}
                      onChipRemove={() => setSelectedFilter(null)}
                    />
                  </div>
                  {!selectedFilter && (
                    <div style={{ display: 'flex', gap: 'var(--space-component-gap-xs)' }}>
                      {/* Figma's external filter-chip suggestion (19 Global Search, node
                          112:2514) tints the pill purple (#f7f6ff / #d4d0fb / #5244ee) — close
                          but not a pixel-exact match to any token this design system defines.
                          Reusing ActionChip's own default (neutral) look here rather than
                          introducing new one-off token values for a single external reference. */}
                      <ActionChip
                        label="Product"
                        size="md"
                        onClick={() => setSelectedFilter('Product')}
                      />
                      <ActionChip
                        label="Promotion"
                        size="md"
                        onClick={() => setSelectedFilter('Promotion')}
                      />
                    </div>
                  )}
                </div>
              </div>
              <span className="ds-variant-note">
                Click a filter chip to embed it inline in the field as a removable token —
                typing continues to work alongside it. Clearing the chip brings the filter
                suggestions back.
              </span>
            </div>
          )}

          {activeStyleTab === 'Scope Selector' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div className="ds-combo-figure" style={{ width: 320 }}>
                  <Searchbar
                    placeholder="Search"
                    scopeLabel={scopeValue}
                    onScopeClick={() => setScopeOpen((open) => !open)}
                  />
                  {scopeOpen && (
                    // Overrides .ds-dropdown's fixed width tokens (sm/lg) with a shrink-to-fit
                    // width — this panel's options are short, fixed labels rather than
                    // arbitrary-length content, so hugging them reads better than stretching
                    // to match the searchbar's (unrelated) width.
                    <div className="ds-dropdown" style={{ width: 'fit-content' }}>
                      <div className="ds-dropdown__options">
                        {SCOPE_OPTIONS.map((option) => (
                          <DropdownOption
                            key={option}
                            label={option}
                            style="single"
                            state={scopeValue === option ? 'selected' : 'default'}
                            onClick={() => {
                              setScopeValue(option);
                              setScopeOpen(false);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <span className="ds-variant-note">
                A leading scope segment names the field a query searches within — click it to
                open a Dropdown panel and switch scopes without losing the typed value. The
                trailing search action picks up the same tinted segment treatment.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row" style={{ flexDirection: 'column', alignItems: 'center' }}>
              <div className="ds-variant-row__cell">
                <div style={{ width: 240 }}>
                  <Searchbar placeholder="Search" size="lg" />
                </div>
                <span className="ds-variant-row__cell-label">Lg · 40px</span>
              </div>
              <div className="ds-variant-row__cell">
                <div style={{ width: 240 }}>
                  <Searchbar placeholder="Search" size="md" />
                </div>
                <span className="ds-variant-row__cell-label">Md · 32px</span>
              </div>
            </div>
          </div>
        </div>

        <span className="ds-variant-group__label ds-variant-tabs-label">Example</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Searchbar example contexts">
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

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            {activeExampleTab === 'Table search' && (
              <>
                <p className="ds-section__desc">
                  Scoped inside a Table toolbar (reusing Table's own Default example, Figma node
                  152-3908) — the leading segment narrows which column a query searches within.
                </p>
                <div className="ds-preview">
                  <div className="ds-searchbar-example">
                    <div className="ds-table-example">
                      <div className="ds-table-toolbar">
                        <div className="ds-table-toolbar__search-wrap">
                          <span className="ds-searchbar-example__focus">
                            <Searchbar
                              size="md"
                              placeholder="Search SKU ID or Name"
                              scopeLabel="SKU ID"
                            />
                          </span>
                        </div>
                        <div className="ds-table-toolbar__filters ds-searchbar-example__dim">
                          <FilterChip label="Category" />
                          <FilterChip label="Status" />
                        </div>
                        <div className="ds-table-toolbar__actions ds-searchbar-example__dim">
                          <Button variant="primary" appearance="ghost" size="md">
                            Reset
                          </Button>
                        </div>
                      </div>
                      <div className="ds-table-example__scroll ds-searchbar-example__dim">
                        <div className="ds-table-example__frame">
                          <Table size="md">
                            <TableHeader>
                              <TableSelectHeaderCell
                                checked={allExampleChecked}
                                indeterminate={someExampleChecked && !allExampleChecked}
                                onChange={(checked) =>
                                  setExampleCheckedRows(
                                    Object.fromEntries(
                                      EXAMPLE_TABLE_ROWS.map((row) => [row.sku, checked]),
                                    ),
                                  )
                                }
                              />
                              <TableHeaderCell width={88}>Image</TableHeaderCell>
                              <TableHeaderCell width={140}>SKU ID</TableHeaderCell>
                              <TableHeaderCell width={140}>Brand</TableHeaderCell>
                              <TableHeaderCell width={280}>SKU Name</TableHeaderCell>
                              <TableHeaderCell width={140}>Category</TableHeaderCell>
                              <TableHeaderCell width={100} align="right">
                                Original Price
                              </TableHeaderCell>
                              <TableHeaderCell width={100} align="right">
                                Selling Price
                              </TableHeaderCell>
                              <TableHeaderCell width={110}>Merchant</TableHeaderCell>
                              <TableHeaderCell width={90} align="right">
                                Discount
                              </TableHeaderCell>
                            </TableHeader>
                            {EXAMPLE_TABLE_ROWS.map((row) => (
                              <TableRow
                                key={row.sku}
                                state={exampleCheckedRows[row.sku] ? 'selected' : 'default'}
                              >
                                <TableSelectCell
                                  checked={!!exampleCheckedRows[row.sku]}
                                  onChange={() => toggleExampleRow(row.sku)}
                                />
                                <TableCell>
                                  <span className="ds-datatable__cell-thumbnail">
                                    <span className="icon icon--sm" aria-hidden="true">
                                      image
                                    </span>
                                  </span>
                                </TableCell>
                                <TableCell>{row.sku}</TableCell>
                                <TableCell>{row.brand}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell align="right">{row.originalPrice}</TableCell>
                                <TableCell align="right">{row.sellingPrice}</TableCell>
                                <TableCell>{row.merchant}</TableCell>
                                <TableCell align="right">{row.discount}</TableCell>
                              </TableRow>
                            ))}
                          </Table>
                        </div>
                      </div>
                      <div className="ds-table-example__pagination ds-searchbar-example__dim">
                        <Pagination currentPage={1} totalPages={4} size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeExampleTab === 'Global search' && (
              <>
                <p className="ds-section__desc">
                  Anchored at the center of the app shell (reusing Topbar's own page-preview
                  instance, Figma node 263-5472) — click it to reveal a results panel matching
                  List's own "Search Results" example (Figma node 639-5409).
                </p>
                <div
                  className="ds-preview ds-preview--scrim ds-preview--scroll"
                  style={{ padding: 0 }}
                >
                  <div
                    className="ds-searchbar-example ds-searchbar-example--global"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest('.ds-app-topbar__search')) {
                        setGlobalSearchOpen((open) => !open);
                      } else if (!target.closest('.ds-searchbar-example__results-panel')) {
                        setGlobalSearchOpen(false);
                      }
                    }}
                  >
                    <div className="ds-searchbar-example__topbar-anchor" ref={topbarAnchorRef}>
                      <AppTopbar showLogo searchState={globalSearchOpen ? 'focus' : 'default'} />
                      {globalSearchOpen && (
                        <div
                          className="ds-searchbar-example__results-overlay"
                          style={
                            searchFieldRect
                              ? { left: searchFieldRect.left, width: searchFieldRect.width }
                              : undefined
                          }
                        >
                          <div className="ds-searchbar-example__panel ds-searchbar-example__panel--radius-xl ds-searchbar-example__results-panel">
                            <div className="ds-searchbar-example__rows ds-searchbar-example__rows--lg">
                              <List
                                size="lg"
                                label="Storefront Setup"
                                tag="Product"
                                icon={<ProductIcon className="ds-searchbar-example__thumb-glyph--product" />}
                                subtitle={
                                  <>
                                    Store<mark className="ds-list__mark">front</mark> theme • Setup
                                    wizard • Launch checklist • Automation
                                  </>
                                }
                                caption="Online Store / Storefront / Setup / Marketing / Campaigns / Automation"
                                forceState="hover"
                              />
                              <List
                                size="lg"
                                label="Storefront Domain Settings"
                                tag="Product"
                                icon={<ProductIcon className="ds-searchbar-example__thumb-glyph--product" />}
                                subtitle={
                                  <>
                                    Custom <mark className="ds-list__mark">domain</mark> • DNS
                                    records • SSL certificate • Redirect rules
                                  </>
                                }
                                caption="Online Store / Storefront / Domain / Settings / Advanced / Custom"
                              />
                              <List
                                size="lg"
                                label="Free Gift Promotion"
                                tag="Promotion"
                                icon={<PromotionIcon className="ds-searchbar-example__thumb-glyph--promotion" />}
                                subtitle={
                                  <>
                                    Gift <mark className="ds-list__mark">threshold</mark> • Eligible
                                    SKUs • Campaign dates • Auto-apply
                                  </>
                                }
                                caption="Online Store / Promotions / Free Gift / Campaign / Rules / Eligibility"
                              />
                            </div>
                            <div className="ds-searchbar-example__footer">
                              <span className="ds-searchbar-example__kbd">Esc</span>
                              <span className="ds-searchbar-example__hint">Close</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="ds-searchbar-example__topbar-body ds-searchbar-example__dim">
                      <div className="ds-searchbar-example__topbar-sidebar">
                        <AppSidebar />
                      </div>
                      <div className="ds-searchbar-example__topbar-content" />
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">
                  Click the search field to open the results panel; click anywhere outside it to
                  close.
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Focus applies the brand focus ring; Disabled dims the surface and blocks interaction
          entirely.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Border token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td>
                <div style={{ width: 240 }}>
                  <Searchbar placeholder="Search" size="md" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-searchbar-border-default)' }}
                  />
                  <code>interactive-searchbar-border-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td>
                <div style={{ width: 240 }}>
                  <Searchbar placeholder="Search" size="md" state="hover" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-searchbar-border-focus)' }}
                  />
                  <code>interactive-searchbar-border-focus (reused — Figma's hover matches focus)</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Focus</td>
              <td>
                <div style={{ width: 240 }}>
                  <Searchbar placeholder="Search" size="md" state="focus" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-searchbar-border-focus)' }}
                  />
                  <code>interactive-searchbar-border-focus (+ ring)</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td>
                <div style={{ width: 240 }}>
                  <Searchbar placeholder="Search" size="md" state="disabled" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-searchbar-border-default)' }}
                  />
                  <code>interactive-searchbar-border-default</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          A Searchbar fills its container's width; only height and internal gap change between
          sizes.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Height</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-lg / -md</code>
                  <span className="ds-tag">40 / 32px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Padding</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-sm</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Content gap</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-xs / -sm</code>
                  <span className="ds-tag">4 / 8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td>
                <div className="ds-table-cell">
                  <code>--radius-md</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Border</th>
              <td>
                <div className="ds-table-cell">
                  <code>--border-sm</code>
                  <span className="ds-tag">1px</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Searchbar.</p>
        <div className="ds-related-grid">
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
            onClick={() => onNavigate?.('topbar')}
          >
            <TopbarIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Topbar</span>
          </button>
        </div>
      </section>
    </div>
  );
}
