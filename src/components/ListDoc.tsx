import { useState } from 'react';
import List from './List';
import { Searchbar } from './Searchbar';
import { FilterChip } from './Chip';
import { Tag } from './Tag';
import Button from './Button';
import { IconButtonIcon, AssetsIcon } from './icons';
import './ButtonDoc.css';
import './ListDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=638-8189';
const SEARCH_DROPDOWN_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=639-5388';
const SEARCH_RESULTS_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=639-5409';
const UPLOAD_FIELD_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=714-18194';

const SIZE_TABS = ['Lg', 'Md', 'Sm'] as const;
type SizeTab = (typeof SIZE_TABS)[number];

const EXAMPLE_TABS = ['Search History', 'Search Results', 'Uploaded Files'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

const EXAMPLE_FIGMA_URL: Record<ExampleTab, string> = {
  'Search History': SEARCH_DROPDOWN_FIGMA_URL,
  'Search Results': SEARCH_RESULTS_FIGMA_URL,
  'Uploaded Files': UPLOAD_FIELD_FIGMA_URL,
};

interface ListDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function ListDoc({ onNavigate }: ListDocProps) {
  const [activeSizeTab, setActiveSizeTab] = useState<SizeTab>('Lg');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Search History');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">List</h1>
        <p className="ds-doc__lede">
          A List is a single row in a set of results or entries — a search result with a
          thumbnail, a recent-search entry, or a compact uploaded-file row, all built from the
          same component at a different size.
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
          Stack Lists to build a search-results panel, a recent-searches dropdown, or a list of
          uploaded files — the row's background shifts on hover so a reader can track which one
          they're pointing at.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <div style={{ width: '100%', maxWidth: 432 }}>
            <List />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          The Lg row — a search result — has the fullest anatomy: a thumbnail, a title with an
          optional filter chip, a subtitle, and a breadcrumb-style caption, all separated from the
          next row by a divider.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-list-anatomy">
            <div
              className="ds-list ds-list--lg ds-anatomy__demo ds-anatomy__part-relative"
              style={{ width: 432 }}
              aria-hidden="true"
            >
              <span className="ds-list__thumb ds-anatomy__part-relative">
                <span className="icon" aria-hidden="true">
                  search
                </span>
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              </span>
              <div className="ds-list__main">
                <div className="ds-list__title-row">
                  <p className="ds-list__title ds-anatomy__part-relative">
                    Title
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">2</span>
                  </p>
                  <span className="ds-anatomy__part-relative">
                    <Tag label="Label" />
                    <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
                  </span>
                </div>
                <div className="ds-list__desc">
                  <div className="ds-list__subtitle ds-anatomy__part-relative">
                    Subtitle
                    <span className="ds-anatomy__badge ds-anatomy__badge--side">4</span>
                  </div>
                  <span className="ds-list__caption ds-anatomy__part-relative">
                    Online Store / Storefront / Setup
                    <span className="ds-anatomy__badge ds-anatomy__badge--side">5</span>
                  </span>
                </div>
              </div>
              <span className="ds-anatomy__badge">6</span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Thumbnail</strong> —{' '}
                  <span>a fixed 36px icon tile, Lg only</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Title</strong> — <span>the row's headline, always present</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Filter chip</strong> —{' '}
                  <span>an optional category tag next to the title</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Subtitle</strong> —{' '}
                  <span>a search-match snippet; optional</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Caption</strong> —{' '}
                  <span>a breadcrumb-style path to the result; optional</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">6</span>
                <span>
                  <strong>Divider</strong> — <span>separates this row from the next</span>
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
          Size changes both height and anatomy: Lg is the full search-result row above; Md drops
          to a single line with a leading icon and an optional trailing value; Sm is the most
          compact, adding preview/remove actions for a file-row use case.
        </p>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            List adapts to three real compositions: a recent-searches dropdown (Md), a live
            search-results panel with keyword highlighting (Lg), and a bulk-upload file list (Sm).
            {' '}
            <a
              className="ds-list-example__ref"
              href={EXAMPLE_FIGMA_URL[activeExampleTab]}
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon icon--xs" aria-hidden="true">
                draw
              </span>
              Reference in Figma
            </a>
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="List example use cases">
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

          <div className="ds-preview ds-preview--scrim">
            <div className="ds-list-example">
              {activeExampleTab === 'Search History' && (
                <div className="ds-list-example__panel ds-list-example__panel--wide">
                  <div className="ds-list-example__searchbar-row ds-list-example__dim">
                    <Searchbar
                      size="lg"
                      state="focus"
                      placeholder="Search products, promotions..."
                    />
                    <div className="ds-list-example__chips">
                      <FilterChip label="Product" selected />
                      <FilterChip label="Promotion" />
                    </div>
                  </div>
                  <div className="ds-list-example__history-header ds-list-example__dim">
                    <span className="ds-list-example__history-label">Search History</span>
                    <Button variant="primary" appearance="ghost" size="sm">
                      Clear All
                    </Button>
                  </div>
                  <div className="ds-list-example__rows ds-list-example__focus">
                    <List
                      size="md"
                      label="Wireless Keyboard"
                      showFilterChip
                      tag="Product"
                      value="1,000"
                    />
                    <List
                      size="md"
                      label="Summer Sale 20% Off"
                      showFilterChip={false}
                      value="482"
                    />
                    <List
                      size="md"
                      label="Bluetooth Speaker"
                      showFilterChip
                      tag="Product"
                      value="1,000"
                    />
                  </div>
                  <div className="ds-list-example__footer ds-list-example__dim">
                    <span className="ds-list-example__kbd">Esc</span>
                    <span className="ds-list-example__hint">to close</span>
                    <span className="ds-list-example__kbd">/</span>
                    <span className="ds-list-example__hint">to focus search</span>
                  </div>
                </div>
              )}

              {activeExampleTab === 'Search Results' && (
                <div className="ds-list-example__panel ds-list-example__panel--wide ds-list-example__panel--radius-xl">
                  <div className="ds-list-example__searchbar-row ds-list-example__dim">
                    <Searchbar size="lg" state="focus" chipLabel="Product" defaultValue="Something" />
                  </div>
                  <div className="ds-list-example__rows ds-list-example__rows--lg ds-list-example__focus">
                    <List
                      size="lg"
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
                      label="Storefront Domain Settings"
                      tag="Product"
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
                      subtitle={
                        <>
                          Key<mark className="ds-list__mark">word</mark> • Keyword • Keyword •
                          Intent
                        </>
                      }
                      caption="Online Store / Promotions / Free Gift / Campaign / Rules / Eligibility"
                    />
                  </div>
                  <div className="ds-list-example__footer ds-list-example__dim">
                    <span className="ds-list-example__kbd">Esc</span>
                    <span className="ds-list-example__hint">Close</span>
                    <span className="ds-list-example__kbd">/</span>
                    <span className="ds-list-example__hint">Open global search</span>
                  </div>
                </div>
              )}

              {activeExampleTab === 'Uploaded Files' && (
                <div className="ds-list-example__upload">
                  <div className="ds-list-example__upload-card">
                    <div className="ds-list-example__upload-content ds-list-example__dim">
                      <p className="ds-list-example__upload-title">Import result</p>
                      <p className="ds-list-example__upload-desc">
                        2,400 rows processed from product-catalog.xls
                      </p>
                    </div>
                    <div className="ds-list-example__upload-results ds-list-example__focus">
                      <List
                        size="sm"
                        icon={
                          <span
                            className="icon icon--sm"
                            aria-hidden="true"
                            style={{ color: 'var(--interactive-icon-button-icon-success-default)' }}
                          >
                            check_circle
                          </span>
                        }
                        label="Pass"
                        value="2,000"
                        showIconButton={false}
                      />
                      <List
                        size="sm"
                        icon={
                          <span
                            className="icon icon--sm"
                            aria-hidden="true"
                            style={{ color: 'var(--brand-danger-500)' }}
                          >
                            cancel
                          </span>
                        }
                        label="Error"
                        value="400"
                        showIconButton={false}
                      />
                    </div>
                    <span className="ds-list-example__upload-total ds-list-example__dim">
                      Total product(s): 2,400
                    </span>
                  </div>
                  <div className="ds-list-example__upload-files ds-list-example__focus">
                    <List
                      size="sm"
                      icon="attach_file"
                      label="product-catalog.xls"
                      showValue={false}
                      showPreview={false}
                    />
                    <List
                      size="sm"
                      icon="attach_file"
                      label="inventory-update.xls"
                      showValue={false}
                      showPreview={false}
                    />
                    <List
                      size="sm"
                      icon="attach_file"
                      label="pricing-sheet.xls"
                      showValue={false}
                      showPreview={false}
                    />
                    <List
                      size="sm"
                      icon="attach_file"
                      label="store-locations.xls"
                      showValue={false}
                      showPreview={false}
                    />
                  </div>
                  <div className="ds-list-example__upload-actions ds-list-example__dim">
                    <Button variant="primary" appearance="outline" size="md">
                      Download Error Report
                    </Button>
                    <Button variant="primary" appearance="outline" size="md">
                      Upload Again
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {activeExampleTab === 'Search History' && (
            <span className="ds-variant-note">
              Each row reuses Md-size List as-is — the dropdown only adds the searchbar, chips,
              and header/footer around it.
            </span>
          )}
          {activeExampleTab === 'Search Results' && (
            <span className="ds-variant-note">
              Each row reuses Lg-size List as-is — the highlighted keyword is a &lt;mark&gt; inside
              the subtitle, and the first row uses <code>forceState=&quot;hover&quot;</code> to
              show the keyboard-focused state.
            </span>
          )}
          {activeExampleTab === 'Uploaded Files' && (
            <span className="ds-variant-note">
              The Pass/Error summary and each filename both reuse Sm-size List — only the icon,
              value, and action props change.
            </span>
          )}
        </div>

        <span className="ds-variant-group__label ds-variant-tabs-label">Size</span>
        <div className="ds-line-tabs" role="tablist" aria-label="List size groups">
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
            <div className="ds-preview ds-preview--scrim">
              <div style={{ width: '100%', maxWidth: 432 }}>
                {activeSizeTab === 'Lg' ? (
                  <List size="lg" />
                ) : activeSizeTab === 'Md' ? (
                  <List size="md" label="Wireless Keyboard" />
                ) : (
                  <List size="sm" label="product-photo.jpg" showValue={false} />
                )}
              </div>
            </div>
            {activeSizeTab === 'Lg' && (
              <span className="ds-variant-note">
                Search result — thumbnail, title, filter chip, subtitle, and caption.
              </span>
            )}
            {activeSizeTab === 'Md' && (
              <span className="ds-variant-note">
                Recent-search entry — a leading icon, an optional filter chip, a label, and a
                trailing value.
              </span>
            )}
            {activeSizeTab === 'Sm' && (
              <span className="ds-variant-note">
                Uploaded-file row — a leading icon, a label, and trailing preview/remove actions.
              </span>
            )}
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Token</th>
                  <th>Height</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Lg</th>
                  <td>
                    <code>--space-component-padding-sm</code>
                  </td>
                  <td>Auto (content-driven, 8px vertical padding)</td>
                </tr>
                <tr>
                  <th scope="row">Md</th>
                  <td>
                    <code>--component-height-md</code>
                  </td>
                  <td>32px</td>
                </tr>
                <tr>
                  <th scope="row">Sm</th>
                  <td>
                    <code>--component-height-xs</code>
                  </td>
                  <td>24px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          The whole row is a single hover target — background shifts uniformly regardless of
          size.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Background</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td style={{ width: 432 }}>
                <List />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{
                      background: 'var(--brand-neutral-0)',
                      border: '1px solid var(--global-divider-neutral-light)',
                    }}
                  />
                  <code>brand-neutral-0</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 432 }}>
                <List forceState="hover" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-list-background-hover)' }}
                  />
                  <code>interactive-list-background-hover</code>
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
          Every measurement below comes from a token — no hardcoded values.
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
              <th scope="row">Lg row padding (vertical)</th>
              <td>
                <code>--space-component-padding-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Lg row padding (horizontal)</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Md/Sm row height</th>
              <td>
                <code>--component-height-md</code> / <code>--component-height-xs</code>
              </td>
              <td>32px / 24px</td>
            </tr>
            <tr>
              <th scope="row">Thumbnail size</th>
              <td>
                <code>--component-icon-lg</code>
              </td>
              <td>36px</td>
            </tr>
            <tr>
              <th scope="row">Thumbnail radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Leading icon size</th>
              <td>
                <code>--component-icon-sm</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Thumbnail ↔ content gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Divider</th>
              <td>
                <code>--global-divider-neutral-light</code>
              </td>
              <td>#f4f4f4, 1px</td>
            </tr>
            <tr>
              <th scope="row">Title / label type</th>
              <td>
                <code>--typography-sm</code>
              </td>
              <td>14px / 20px</td>
            </tr>
            <tr>
              <th scope="row">Subtitle / caption type</th>
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
          Components that commonly appear alongside List.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('icon-button')}
          >
            <IconButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Icon Button</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('assets')}
          >
            <AssetsIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Assets</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('assets')}
          >
            <span className="icon ds-related-card__icon" aria-hidden="true">
              image
            </span>
            <span className="ds-related-card__name">Thumbnail</span>
          </button>
        </div>
      </section>
    </div>
  );
}
