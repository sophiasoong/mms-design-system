import { useState } from 'react';
import Button from './Button';
import IconButton from './IconButton';
import Banner from './Banner';
import ActionPanel from './ActionPanel';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectHeaderCell,
  TableRow,
  TableCell,
  TableSelectCell,
} from './Table';
import { Searchbar } from './Searchbar';
import { FilterChip } from './Chip';
import Pagination from './Pagination';
import { IconButtonIcon, FooterIcon, DropdownIcon, TableIcon } from './icons';
import { useBrandMode, brandLogoSrc } from '../brandMode';
import { DocTitle, SectionTitle, VariantLabel, TabLabel } from './DocHeading';
import './ButtonDoc.css';
import './Table.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=1-318';

const VARIANT_TABS = ['Primary', 'Secondary', 'Danger'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const STATE_TABS = ['Primary', 'Secondary'] as const;
type StateTab = (typeof STATE_TABS)[number];

const EXAMPLE_TABS = ['Solid', 'Outline', 'Ghost'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

/* The Outline and Ghost tabs' Table instance mirrors TableDoc's Example (same columns and SKU
   rows) with a Banner above it, as on BannerDoc's Brand page; the data is duplicated here per
   the doc-scoped convention rather than exported from TableDoc. */
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

const EXAMPLE_TABLE_ROWS: ExampleTableRow[] = [
  { sku: 'SKU-100234', brand: 'Nestlé', name: 'Nescafé Gold Blend 200g', category: 'Beverages', originalPrice: '$144', sellingPrice: '$138', merchant: 'Merchant A', discount: '8%' },
  { sku: 'SKU-100235', brand: 'Unilever', name: 'Dove Body Wash 500ml', category: 'Personal Care', originalPrice: '$89', sellingPrice: '$79', merchant: 'Merchant A', discount: '12%' },
  { sku: 'SKU-100236', brand: 'P&G', name: 'Pampers Diapers Size 3', category: 'Baby Care', originalPrice: '$210', sellingPrice: '$195', merchant: 'Merchant B', discount: '5%' },
  { sku: 'SKU-100237', brand: 'Nestlé', name: 'KitKat 4 Finger 41.5g', category: 'Snacks', originalPrice: '$18', sellingPrice: '$16', merchant: 'Merchant B', discount: '15%' },
  { sku: 'SKU-100238', brand: 'Colgate', name: 'Colgate Total Toothpaste 150g', category: 'Oral Care', originalPrice: '$32', sellingPrice: '$28', merchant: 'Merchant A', discount: '10%' },
  { sku: 'SKU-100239', brand: 'Kellogg’s', name: 'Corn Flakes Original 500g', category: 'Breakfast & Cereal', originalPrice: '$45', sellingPrice: '$40', merchant: 'Merchant C', discount: '11%' },
  { sku: 'SKU-100240', brand: 'Johnson & Johnson', name: 'Baby Shampoo No More Tears 300ml', category: 'Health & Wellness', originalPrice: '$56', sellingPrice: '$52', merchant: 'Merchant B', discount: '7%' },
  { sku: 'SKU-100241', brand: 'Coca-Cola', name: 'Coca-Cola Classic 1.5L', category: 'Soft Drinks', originalPrice: '$28', sellingPrice: '$25', merchant: 'Merchant C', discount: '11%' },
  { sku: 'SKU-100242', brand: 'L’Oréal', name: 'Elvive Shampoo 400ml', category: 'Beauty & Care', originalPrice: '$68', sellingPrice: '$59', merchant: 'Merchant A', discount: '13%' },
  { sku: 'SKU-100243', brand: 'Nestlé', name: 'Milo Chocolate Malt Drink 400g', category: 'Dairy & Nutrition', originalPrice: '$52', sellingPrice: '$47', merchant: 'Merchant B', discount: '10%' },
];

/* Shared by the Outline and Ghost tabs; `highlight` picks which appearance the hover treatment
   rings (everything else dims) — see the .ds-example-mock--highlight-* rules in ButtonDoc.css.
   Outline: Refresh / Export. Ghost: Banner's Submit MCS Form, Reset, and each row's Edit / Delete. */
function ExampleTablePage({ highlight }: { highlight: 'outline' | 'ghost' }) {
  return (
    <div className={`ds-example-mock ds-example-mock--table-page ds-example-mock--highlight-${highlight}`}>
      <Banner
        state="info"
        layout="single-line"
        description="After creating a new brand, please remember to submit the Zendesk webform so our team can verify the brand details."
        buttonLabel="Submit MCS Form"
        showClose={false}
      />
      <div className="ds-table-example">
        <div className="ds-table-toolbar">
          <div className="ds-table-toolbar__search-wrap">
            <Searchbar size="md" placeholder="Search" scopeLabel="SKU ID" />
          </div>
          <div className="ds-table-toolbar__filters">
            <div className="ds-table-filter">
              <FilterChip label="Category" />
            </div>
            <div className="ds-table-filter">
              <FilterChip label="Status" />
            </div>
          </div>
          <div className="ds-table-toolbar__actions">
            <Button variant="primary" appearance="ghost" size="md">
              Reset
            </Button>
          </div>
        </div>

        <div className="ds-table-results">
          <span className="ds-table-results__count">1–10 of 10 results</span>
          <div className="ds-table-results__actions">
            <span className="ds-table-results__updated">Last Updated 2026-04-28 09:15</span>
            <Button variant="primary" appearance="outline" size="md">
              Refresh
            </Button>
            <Button variant="primary" appearance="outline" size="md">
              Export
            </Button>
          </div>
        </div>

        <div className="ds-table-example__scroll">
          <div className="ds-table-example__frame">
            <Table size="md">
              <TableHeader>
                <TableSelectHeaderCell checked={false} />
                <TableHeaderCell width={88}>Image</TableHeaderCell>
                <TableHeaderCell width={140} info>SKU ID</TableHeaderCell>
                <TableHeaderCell width={140} info>Brand</TableHeaderCell>
                <TableHeaderCell width={320}>SKU Name</TableHeaderCell>
                <TableHeaderCell width={140}>Category</TableHeaderCell>
                <TableHeaderCell width={100} align="right">Original Price</TableHeaderCell>
                <TableHeaderCell width={100} align="right">Selling Price</TableHeaderCell>
                <TableHeaderCell width={110}>Merchant</TableHeaderCell>
                <TableHeaderCell width={90} align="right">Discount</TableHeaderCell>
                <TableHeaderCell align="center" className="ds-table-example__action-cell">
                  Action
                </TableHeaderCell>
              </TableHeader>
              {EXAMPLE_TABLE_ROWS.map((row) => (
                <TableRow key={row.sku}>
                  <TableSelectCell checked={false} />
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
                  <TableCell align="center" className="ds-table-example__action-cell">
                    <div className="ds-table-example__action-buttons">
                      <Button variant="primary" appearance="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="danger" appearance="ghost" size="sm">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </div>
        </div>

        <div className="ds-table-example__pagination">
          <Pagination currentPage={1} totalPages={10} />
        </div>
      </div>
    </div>
  );
}

interface ButtonDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function ButtonDoc({ onNavigate }: ButtonDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Primary');
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Primary');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Solid');
  // Example's Topbar mock carries the same per-brand logo lockup as the real AppTopbar.
  const brandMode = useBrandMode();

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <DocTitle>Button</DocTitle>
        <p className="ds-doc__lede">
          Buttons trigger an action or navigation, in forms, dialogs, toolbars, and cards. Use the
          variant to signal intent (primary, secondary, danger) and the appearance to signal
          visual weight (solid, outline, ghost).
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
        <SectionTitle>Overview</SectionTitle>
        <p className="ds-section__desc">
          The default Button is a Primary / Solid / Medium button: high-emphasis, used for the
          single most important action on a screen.
        </p>
        <div className="ds-preview">
          <Button leadingIcon="add">Create new</Button>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <SectionTitle>Anatomy</SectionTitle>
        <p className="ds-section__desc">
          A button is composed of a container plus up to three optional content slots.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <button
              type="button"
              className="ds-button ds-button--primary ds-button--solid ds-button--md ds-anatomy__demo"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-anatomy__dot ds-anatomy__dot--left" aria-hidden="true" />
              <span className="ds-anatomy__dot ds-anatomy__dot--right" aria-hidden="true" />
              <span className="ds-anatomy__part">
                <span className="icon ds-button__icon ds-button__icon--md" aria-hidden="true">
                  add
                </span>
                <span className="ds-anatomy__badge">2</span>
                <span className="ds-anatomy__dot" aria-hidden="true" />
              </span>
              <span className="ds-anatomy__part">
                <span className="ds-button__label">Label</span>
                <span className="ds-anatomy__badge">3</span>
                <span className="ds-anatomy__dot" aria-hidden="true" />
              </span>
              <span className="ds-anatomy__part">
                <span className="icon ds-button__icon ds-button__icon--md" aria-hidden="true">
                  arrow_forward
                </span>
                <span className="ds-anatomy__badge">4</span>
                <span className="ds-anatomy__dot" aria-hidden="true" />
              </span>
            </button>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> — <span>background, border, radius (--radius-md)</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Leading icon</strong> — <span>optional, Material Symbols Rounded</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Label</strong> — <span>required text, medium weight</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Trailing icon</strong> — <span>optional, Material Symbols Rounded</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="variants" className="ds-section">
        <SectionTitle>Variants</SectionTitle>
        <p className="ds-section__desc">
          Variant sets intent; appearance sets emphasis. Not every variant supports every
          appearance — Secondary is Solid-only in the current token set.
        </p>

        <VariantLabel tabs>Style</VariantLabel>
        <div className="ds-line-tabs" role="tablist" aria-label="Button variant groups">
          {VARIANT_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeVariantTab === tab}
              className={`ds-line-tab${activeVariantTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveVariantTab(tab)}
            >
              <TabLabel>{tab}</TabLabel>
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeVariantTab === 'Primary' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Button variant="primary" appearance="solid">
                    Solid
                  </Button>
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Button variant="primary" appearance="outline">
                    Outline
                  </Button>
                  <span className="ds-variant-row__cell-label">outline</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Button variant="primary" appearance="ghost">
                    Ghost
                  </Button>
                  <span className="ds-variant-row__cell-label">ghost</span>
                </div>
              </div>
            </div>
          )}

          {activeVariantTab === 'Secondary' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Button variant="secondary" appearance="solid">
                    Solid
                  </Button>
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Outline and ghost tokens are not defined for Secondary — ask design before adding
                them.
              </span>
            </div>
          )}

          {activeVariantTab === 'Danger' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Button variant="danger" appearance="solid">
                    Solid
                  </Button>
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Button variant="danger" appearance="outline">
                    Outline
                  </Button>
                  <span className="ds-variant-row__cell-label">outline</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Button variant="danger" appearance="ghost">
                    Ghost
                  </Button>
                  <span className="ds-variant-row__cell-label">ghost</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <VariantLabel>Size</VariantLabel>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Button size="sm">Small</Button>
                <span className="ds-variant-row__cell-label">sm · 28px</span>
              </div>
              <div className="ds-variant-row__cell">
                <Button size="md">Medium</Button>
                <span className="ds-variant-row__cell-label">md · 32px</span>
              </div>
              <div className="ds-variant-row__cell">
                <Button size="lg">Large</Button>
                <span className="ds-variant-row__cell-label">lg · 40px</span>
              </div>
            </div>
          </div>

          <div className="ds-variant-group">
            <VariantLabel>Example</VariantLabel>
            <div className="ds-line-tabs" role="tablist" aria-label="Button example groups">
              {EXAMPLE_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeExampleTab === tab}
                  className={`ds-line-tab${activeExampleTab === tab ? ' ds-line-tab--active' : ''}`}
                  onClick={() => setActiveExampleTab(tab)}
                >
                  <TabLabel>{tab}</TabLabel>
                </button>
              ))}
            </div>
            <div className="ds-example-figure">
              {activeExampleTab === 'Solid' ? (
                <div className="ds-example-mocks">
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Topbar</span>
                    <div className="ds-example-mock ds-example-mock--topbar">
                      <div className="ds-example-mock__group">
                        <img
                          className="ds-example-mock__logo ds-example-mock__dim"
                          src={brandLogoSrc(brandMode)}
                          alt="Merchant Management System"
                        />
                        <IconButton
                          icon="menu"
                          label="Menu"
                          variant="primary"
                          appearance="outline"
                          size="md"
                          className="ds-example-mock__dim"
                        />
                        <div className="ds-example-mock__search ds-example-mock__search--full ds-example-mock__dim">
                          <span className="icon" aria-hidden="true">
                            search
                          </span>
                          <span>Placeholder</span>
                        </div>
                        <IconButton
                          icon="search"
                          label="Search"
                          variant="neutral"
                          appearance="ghost"
                          size="md"
                          className="ds-example-mock__search--compact ds-example-mock__dim"
                        />
                      </div>
                      <div className="ds-example-mock__group">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="ds-example-mock__focus"
                        >
                          Back to MMS 1.0
                        </Button>
                        <IconButton
                          icon="help"
                          label="FAQ"
                          variant="neutral"
                          appearance="ghost"
                          size="md"
                          className="ds-example-mock__dim"
                        />
                        <IconButton
                          icon="notifications"
                          label="Notifications"
                          variant="neutral"
                          appearance="ghost"
                          size="md"
                          className="ds-example-mock__dim"
                        />
                        <span className="ds-example-mock__menu-trigger ds-example-mock__dim">
                          English
                          <span className="icon" aria-hidden="true">
                            expand_more
                          </span>
                        </span>
                        <span className="ds-example-mock__menu-trigger ds-example-mock__dim">
                          User Name
                          <span className="icon" aria-hidden="true">
                            expand_more
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Page header</span>
                    <div className="ds-example-mock ds-example-mock--page-header">
                      <div className="ds-example-mock__info ds-example-mock__dim">
                        <span className="ds-example-mock__breadcrumb">
                          Home / Product and Inventory / Bundle Setting
                        </span>
                        <span className="ds-example-mock__page-title">Bundle Setting</span>
                      </div>
                      <div className="ds-example-mock__actions">
                        <Button
                          variant="primary"
                          appearance="outline"
                          className="ds-example-mock__dim"
                        >
                          Batch Create/Edit
                        </Button>
                        <Button
                          variant="primary"
                          appearance="solid"
                          className="ds-example-mock__focus"
                        >
                          Create Bundle Set
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Message</span>
                    <div className="ds-example-mock ds-example-mock--message">
                      <span
                        className="ds-example-mock__thumb ds-example-mock__dim"
                        aria-hidden="true"
                      >
                        <span className="icon" aria-hidden="true">
                          settings
                        </span>
                      </span>
                      <div className="ds-example-mock__text-col">
                        <div className="ds-example-mock__dim">
                          <p className="ds-example-mock__title">Title</p>
                          <p className="ds-example-mock__desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Accumsan duis
                            in facilisi rutru...
                          </p>
                        </div>
                        <Button
                          variant="primary"
                          appearance="solid"
                          className="ds-example-mock__focus"
                        >
                          Label
                        </Button>
                        <div className="ds-example-mock__tags ds-example-mock__dim">
                          <span className="ds-tag">label</span>
                          <span className="ds-tag">label</span>
                          <span className="ds-example-mock__date">YYYY-MM-DD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeExampleTab === 'Outline' ? (
                <div className="ds-example-mocks">
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Upload</span>
                    <div className="ds-example-mock-frame">
                      <div className="ds-example-mock ds-example-mock--upload">
                        <Button
                          variant="primary"
                          appearance="outline"
                          size="md"
                          leadingIcon="upload"
                          className="ds-example-mock__focus"
                        >
                          Upload
                        </Button>
                        <div className="ds-example-mock__file-list">
                          {[0, 1, 2, 3].map((i) => (
                            <div className="ds-example-mock__file-row" key={i}>
                              <span className="icon ds-example-mock__file-icon ds-example-mock__dim" aria-hidden="true">
                                attach_file
                              </span>
                              <span className="ds-example-mock__file-name ds-example-mock__dim">WWWWWWW.xls</span>
                              <IconButton
                                icon="delete"
                                label={`Delete file ${i + 1}`}
                                variant="neutral"
                                appearance="ghost"
                                size="sm"
                                className="ds-example-mock__dim"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Action panel</span>
                    {/* Same composition as ActionPanelDoc's "Buttons only" variant; the
                        --highlight-outline rules ring Reject / Escalate on hover and dim the
                        header and the solid Approve. */}
                    <div className="ds-example-mock ds-example-mock--action-panel ds-example-mock--highlight-outline">
                      <ActionPanel
                        title="Review"
                        main={
                          <>
                            <Button>Approve</Button>
                            <Button appearance="outline">Reject</Button>
                            <Button appearance="outline">Escalate</Button>
                          </>
                        }
                      />
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Table</span>
                    <ExampleTablePage highlight="outline" />
                  </div>
                </div>
              ) : (
                <div className="ds-example-mocks">
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Dropdown footer</span>
                    <div className="ds-example-mock ds-example-mock--dropdown-footer">
                      <div className="ds-example-mock__select ds-example-mock__dim">
                        <span>Please select</span>
                        <span className="icon" aria-hidden="true">search</span>
                      </div>
                      <div className="ds-example-mock__dropdown-panel">
                        <div className="ds-example-mock__dropdown-options ds-example-mock__dim">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <span className="ds-example-mock__dropdown-option" key={i}>
                              Option
                            </span>
                          ))}
                        </div>
                        <div className="ds-example-mock__dropdown-footer">
                          <Button
                            variant="primary"
                            appearance="ghost"
                            size="sm"
                            leadingIcon="add"
                            className="ds-example-mock__focus"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Footer</span>
                    <div className="ds-example-mock-frame">
                      <div className="ds-example-mock ds-example-mock--modal-footer">
                        <Button
                          variant="primary"
                          appearance="ghost"
                          size="md"
                          leadingIcon="arrow_back"
                          className="ds-example-mock__focus"
                        >
                          Back
                        </Button>
                        <div className="ds-example-mock__group">
                          <Button variant="primary" appearance="outline" size="md" className="ds-example-mock__dim">
                            Cancel
                          </Button>
                          <Button variant="primary" appearance="solid" size="md" className="ds-example-mock__dim">
                            Confirm
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Table</span>
                    <ExampleTablePage highlight="ghost" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <SectionTitle>States</SectionTitle>
        <p className="ds-section__desc">
          Every variant/appearance pair defines default, hover, focus, and disabled states. Hover
          and focus are statically forced below for documentation purposes.
        </p>
        <div className="ds-line-tabs ds-line-tabs--no-label" role="tablist" aria-label="Button state groups">
          {STATE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeStateTab === tab}
              className={`ds-line-tab${activeStateTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveStateTab(tab)}
            >
              <TabLabel>{tab}</TabLabel>
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeStateTab === 'Primary' && (
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
                      <Button>Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-primary-solid-default)',
                          }}
                        />
                        <code>interactive-button-surface-primary-solid-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <Button forceState="hover">Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-primary-solid-hover)',
                          }}
                        />
                        <code>interactive-button-surface-primary-solid-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <Button forceState="focus">Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-primary-solid-focus)',
                          }}
                        />
                        <code>interactive-button-surface-primary-solid-focus</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <Button disabled>Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-primary-solid-disabled)',
                          }}
                        />
                        <code>interactive-button-surface-primary-solid-disabled</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Secondary' && (
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
                      <Button variant="secondary">Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-button-surface-secondary-solid-default)',
                          }}
                        />
                        <code>interactive-button-surface-secondary-solid-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <Button variant="secondary" forceState="hover">
                        Button
                      </Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-secondary-solid-hover)',
                          }}
                        />
                        <code>interactive-button-surface-secondary-solid-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <Button variant="secondary" forceState="focus">
                        Button
                      </Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-secondary-solid-focus)',
                          }}
                        />
                        <code>interactive-button-surface-secondary-solid-focus</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <Button variant="secondary" disabled>
                        Button
                      </Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-button-surface-secondary-solid-disabled)',
                          }}
                        />
                        <code>interactive-button-surface-secondary-solid-disabled</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <SectionTitle>Layout &amp; Spacing</SectionTitle>
        <p className="ds-section__desc">
          Height, inline padding, content gap, and icon size all scale together by size token.
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
              <th scope="row">Height</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-sm</code>
                  <span className="ds-tag">28px</span>
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
              <th scope="row">Padding inline</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-sm</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-md</code>
                  <span className="ds-tag">12px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-lg</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Gap</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-xs</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-xs</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-sm</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Icon</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-sm</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-sm</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-lg</code>
                  <span className="ds-tag">24px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--radius-md</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <SectionTitle>Related Components</SectionTitle>
        <p className="ds-section__desc">
          Components that commonly appear alongside Button.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('icon-button')}
          >
            <IconButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Icon button</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('footer')}
          >
            <FooterIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Footer</span>
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
            onClick={() => onNavigate?.('table')}
          >
            <TableIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Table</span>
          </button>
        </div>
      </section>
    </div>
  );
}
