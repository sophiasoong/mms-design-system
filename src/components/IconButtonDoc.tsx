import { useState } from 'react';
import IconButton from './IconButton';
import Upload from './Upload';
import Modal from './Modal';
import Header from './Header';
import Lightbox from './Lightbox';
import Form, { FormRow, FormCol, FormField } from './Form';
import { Input } from './Input';
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell } from './Table';
import Pagination from './Pagination';
import { ButtonIcon, HeaderIcon, PaginationIcon, UploadIcon } from './icons';
import './ButtonDoc.css';
import './IconButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=511-2837';

const VARIANT_TABS = ['Primary', 'Danger', 'Feedback'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const EXAMPLE_TABS = ['Ghost', 'Primary'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

const SAMPLE_RESULTS = [
  {
    icon: 'check_circle',
    tone: 'success' as const,
    label: 'Pass',
    value: '2,000',
    detail: [
      { tone: 'success' as const, label: 'Joined', value: '1,600' },
      { tone: 'success' as const, label: 'Excluded', value: '400' },
    ],
  },
  {
    icon: 'cancel',
    tone: 'danger' as const,
    label: 'Error',
    value: '400',
    detail: [
      { tone: 'danger' as const, label: 'Joined', value: '100' },
      { tone: 'danger' as const, label: 'Excluded', value: '300' },
    ],
  },
];

const SAMPLE_FILES = [
  { name: 'product-catalog.xls' },
  { name: 'inventory-list.csv' },
  { name: 'shipping-manifest.csv' },
  { name: 'customer-records.xlsx' },
];

const SAMPLE_TABLE_ROWS = [
  { sku: 'SKU-100234', name: 'Nescafé Gold Blend 200g', category: 'Beverages', price: '$138' },
  { sku: 'SKU-100235', name: 'Dove Body Wash 500ml', category: 'Personal Care', price: '$79' },
  { sku: 'SKU-100236', name: 'Pampers Diapers Size 3', category: 'Baby Care', price: '$195' },
];

interface IconButtonDocProps {
  onNavigate?: (componentId: string) => void;
}

// Variants > Example > Form List tab: one collapsible section per banner, built from the
// shared Header (style="form-list") plus a small form body — mirrors FormDoc's own
// banner-list item, kept local so this file doesn't need to import FormDoc.css.
function ExampleBannerItem({ title }: { title: string }) {
  return (
    <div className="ds-example-banner">
      <Header style="form-list" title={title} showInfo={false} />
      <div className="ds-example-banner__body">
        <FormRow>
          <FormCol>
            <FormField label="Banner Title">
              <Input placeholder="Enter banner title" />
            </FormField>
          </FormCol>
          <FormCol>
            <FormField label="Banner Link">
              <Input placeholder="Enter destination URL" />
            </FormField>
          </FormCol>
        </FormRow>
      </div>
    </div>
  );
}

export default function IconButtonDoc({ onNavigate }: IconButtonDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Primary');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Ghost');
  const exampleLightboxTotal = 9;
  const [exampleLightboxIndex, setExampleLightboxIndex] = useState(1);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Icon Button</h1>
        <p className="ds-doc__lede">
          Icon Buttons trigger an action using only an icon, for contexts where the icon alone
          communicates the action clearly. Use the variant to signal intent (primary, danger,
          success) and the appearance to signal visual weight (solid, outline, ghost).
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
          The default Icon Button is a Primary / Solid / Medium / Square button: high-emphasis,
          used for a single, clearly recognizable action such as closing a dialog.
        </p>
        <div className="ds-preview">
          <IconButton icon="close" label="Close" />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          An icon button is composed of a container plus a single required icon slot — there is no
          label, so the container's <code>aria-label</code> carries the accessible name.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <button
              type="button"
              className="ds-icon-button ds-icon-button--primary ds-icon-button--solid ds-icon-button--md ds-icon-button--square ds-anatomy__demo"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-anatomy__dot ds-anatomy__dot--left" aria-hidden="true" />
              <span className="ds-anatomy__dot ds-anatomy__dot--right" aria-hidden="true" />
              <span className="ds-anatomy__part">
                <span className="icon ds-icon-button__icon" aria-hidden="true">
                  close
                </span>
                <span className="ds-anatomy__badge">2</span>
                <span className="ds-anatomy__dot" aria-hidden="true" />
              </span>
            </button>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>background, border, radius (--radius-md square / --radius-full round)</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Icon</strong> — <span>required, Material Symbols Rounded, fixed 16px</span>
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
          Variant sets intent; appearance sets emphasis. Not every variant supports every
          appearance — Danger has no Outline tokens defined in the current token set.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Icon Button variant groups">
          {VARIANT_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeVariantTab === tab}
              className={`ds-line-tab${activeVariantTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveVariantTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeVariantTab === 'Primary' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <IconButton variant="primary" appearance="solid" icon="close" label="Close" />
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton variant="primary" appearance="outline" icon="close" label="Close" />
                  <span className="ds-variant-row__cell-label">outline</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton variant="primary" appearance="ghost" icon="close" label="Close" />
                  <span className="ds-variant-row__cell-label">ghost</span>
                </div>
              </div>
            </div>
          )}

          {activeVariantTab === 'Danger' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <IconButton variant="danger" appearance="solid" icon="delete" label="Delete" />
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton variant="danger" appearance="ghost" icon="delete" label="Delete" />
                  <span className="ds-variant-row__cell-label">ghost</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Outline tokens are not defined for Danger — ask design before adding them.
              </span>
            </div>
          )}

          {activeVariantTab === 'Feedback' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <IconButton
                    variant="success"
                    appearance="ghost"
                    shape="round"
                    icon="check_circle"
                    label="Success"
                  />
                  <span className="ds-variant-row__cell-label">success</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton
                    variant="pending"
                    appearance="ghost"
                    shape="round"
                    icon="info"
                    label="Pending"
                  />
                  <span className="ds-variant-row__cell-label">pending</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton
                    variant="danger"
                    appearance="ghost"
                    shape="round"
                    icon="error"
                    label="Error"
                  />
                  <span className="ds-variant-row__cell-label">error</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Only Ghost is defined for Feedback, and every surface stays transparent by default
                — a tinted wash appears only on hover and focus. Error reuses the Danger tokens; no
                icon-button-scoped token exists for Pending, so it borrows the Toast/Banner warning
                color instead.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Shape</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <IconButton shape="square" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">square</span>
              </div>
              <div className="ds-variant-row__cell">
                <IconButton shape="round" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">round</span>
              </div>
            </div>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <IconButton size="sm" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">sm · 24px</span>
              </div>
              <div className="ds-variant-row__cell">
                <IconButton size="md" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">md · 32px</span>
              </div>
              <div className="ds-variant-row__cell">
                <IconButton size="lg" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">lg · 40px</span>
              </div>
            </div>
          </div>
        </div>

        <div id="variants-example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Real compositions from elsewhere in the system, grouped by appearance — Ghost gathers
            a batch-upload modal, a collapsible form list of banner sections, and a data table
            with pagination; Primary duplicates Lightbox's own close/previous/next controls —
            with the icon buttons worth calling out highlighted against the rest of the surface.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Example variants">
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
              <div
                className={`ds-preview${activeExampleTab === 'Ghost' ? ' ds-preview--scrim' : ''}`}
                style={activeExampleTab === 'Primary' ? { padding: 0 } : undefined}
              >
                {activeExampleTab === 'Ghost' && (
                  <div className="ds-example-mocks" style={{ width: '100%' }}>
                    <div className="ds-example-mock-item">
                      <span className="ds-example-mock__name">Upload Modal</span>
                      <div style={{ width: '100%', maxWidth: 432, margin: '0 auto' }}>
                        <Modal
                          title="Upload Batch File"
                          className="ds-example-upload-modal"
                          showInfo
                        >
                          <div className="ds-icon-button-doc__card">
                            <Upload
                              style="dropzone"
                              dropzone={{ state: 'filled', results: SAMPLE_RESULTS }}
                              files={SAMPLE_FILES}
                              showButtons
                            />
                          </div>
                        </Modal>
                      </div>
                    </div>
                    <div className="ds-example-mock-item">
                      <span className="ds-example-mock__name">Form List</span>
                      <div style={{ width: '100%' }}>
                        <Form title="Homepage Banners" className="ds-example-form-list">
                          <ExampleBannerItem title="Homepage Banner" />
                          <ExampleBannerItem title="Category Page Banner" />
                        </Form>
                      </div>
                    </div>
                    <div className="ds-example-mock-item">
                      <span className="ds-example-mock__name">Table</span>
                      <div className="ds-example-table" style={{ width: '100%' }}>
                        <Table size="md">
                          <TableHeader>
                            <TableHeaderCell>SKU ID</TableHeaderCell>
                            <TableHeaderCell>Product</TableHeaderCell>
                            <TableHeaderCell>Category</TableHeaderCell>
                            <TableHeaderCell align="right">Price</TableHeaderCell>
                            <TableHeaderCell
                              align="center"
                              className="ds-example-table__action-cell"
                            >
                              Action
                            </TableHeaderCell>
                          </TableHeader>
                          {SAMPLE_TABLE_ROWS.map((row) => (
                            <TableRow key={row.sku}>
                              <TableCell>{row.sku}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.category}</TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                              <TableCell align="center" className="ds-example-table__action-cell">
                                <div className="ds-table-example__action-buttons">
                                  <IconButton
                                    icon="edit"
                                    appearance="ghost"
                                    size="sm"
                                    label="Edit"
                                  />
                                  <IconButton
                                    icon="delete"
                                    variant="danger"
                                    appearance="ghost"
                                    size="sm"
                                    label="Remove"
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </Table>
                        <div className="ds-example-table__pagination">
                          <Pagination currentPage={3} totalPages={10} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeExampleTab === 'Primary' && (
                  <div style={{ width: '100%', aspectRatio: '16 / 9' }} className="ds-example-lightbox">
                    <Lightbox
                      showPrevious={exampleLightboxIndex > 1}
                      showNext={exampleLightboxIndex < exampleLightboxTotal}
                      counterLabel={`${exampleLightboxIndex} / ${exampleLightboxTotal}`}
                      onPrevious={() => setExampleLightboxIndex((index) => Math.max(1, index - 1))}
                      onNext={() =>
                        setExampleLightboxIndex((index) => Math.min(exampleLightboxTotal, index + 1))
                      }
                    />
                  </div>
                )}
              </div>
              {activeExampleTab === 'Ghost' && (
                <span className="ds-variant-note">
                  Each demo highlights its own focal points on hover — Upload Modal: header info
                  + close and the file list's remove control. Form List: header info + expander
                  and each section's drag, remove, and expander controls. Table: each row's Edit
                  and Remove controls, plus Pagination's previous/next controls. Everything else
                  recedes.
                </span>
              )}
              {activeExampleTab === 'Primary' && (
                <span className="ds-variant-note">
                  {exampleLightboxIndex === 1
                    ? 'Close and Next are the interactive focal points — Previous is hidden here since this is the first item in the set; the media, counter, and action bar recede on hover.'
                    : `Close, Previous, and Next are the interactive focal points — click Next or Previous to browse the set (currently item ${exampleLightboxIndex} of ${exampleLightboxTotal}); the media, counter, and action bar recede on hover.`}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Every variant/appearance pair defines default, hover, focus, and disabled states. Hover
          and focus are statically forced below for documentation purposes.
        </p>
        <div className="ds-variant-groups">
          <div className="ds-variant-group">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Preview</th>
                    <th>Surface token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Default</td>
                    <td>
                      <IconButton icon="close" label="Close" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-primary-solid-default)',
                          }}
                        />
                        <code>interactive-icon-button-surface-primary-solid-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <IconButton icon="close" label="Close" forceState="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-primary-solid-hover)',
                          }}
                        />
                        <code>interactive-icon-button-surface-primary-solid-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <IconButton icon="close" label="Close" forceState="focus" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-primary-solid-focus)',
                          }}
                        />
                        <code>interactive-icon-button-surface-primary-solid-focus</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <IconButton icon="close" label="Close" disabled />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-primary-solid-disabled)',
                          }}
                        />
                        <code>interactive-icon-button-surface-primary-solid-disabled</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Container size scales by size token; padding and icon size stay fixed across all three
          sizes — only the hit area grows.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>sm</th>
              <th>md</th>
              <th>lg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Width / Height</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-xs</code>
                  <span className="ds-tag">24px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-md</code>
                  <span className="ds-tag">32px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-lg</code>
                  <span className="ds-tag">40px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Padding</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--space-component-padding-xs</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Icon</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--component-icon-sm</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius (Square)</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--radius-md</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius (Round)</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--radius-full</code>
                  <span className="ds-tag">9999px</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">
          Components that commonly appear alongside Icon Button.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('button')}
          >
            <ButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Button</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('header')}
          >
            <HeaderIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Header</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('pagination')}
          >
            <PaginationIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Pagination</span>
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
