import { useState } from 'react';
import Pagination from './Pagination';
import Button from './Button';
import IconButton from './IconButton';
import { Input } from './Input';
import { Searchbar } from './Searchbar';
import { FilterChip } from './Chip';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectHeaderCell,
  TableRow,
  TableCell,
  TableSelectCell,
} from './Table';
import Modal from './Modal';
import { IconButtonIcon, DropdownIcon } from './icons';
import './ButtonDoc.css';
import './Table.css';
import './ModalDoc.css';
import './PaginationDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=174-27843';

type ExampleTab = 'page-table' | 'modal-table';
const EXAMPLE_TABS: { id: ExampleTab; label: string }[] = [
  { id: 'page-table', label: 'Page table (Md)' },
  { id: 'modal-table', label: 'Modal table (Sm)' },
];

interface PageTableRow {
  sku: string;
  brand: string;
  name: string;
  category: string;
  originalPrice: string;
  sellingPrice: string;
  merchant: string;
  discount: string;
}

/** Same 10 rows as Table doc's own Default table Example (TableDoc.tsx EXAMPLE_ROWS) —
 * this panel duplicates that exact instance, just re-staged to spotlight Pagination. */
const PAGE_TABLE_ROWS: PageTableRow[] = [
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

interface ModalTableRow {
  sku: string;
  name: string;
  category: string;
  price: string;
  stock: number;
}

/** Same 10 rows as Modal doc's own Table-size Example (ModalDoc.tsx EXAMPLE_TABLE_ROWS). */
const MODAL_TABLE_ROWS: ModalTableRow[] = [
  { sku: 'SKU-1001', name: 'Wireless Keyboard', category: 'Electronics', price: '$49.00', stock: 120 },
  { sku: 'SKU-1002', name: 'Bluetooth Speaker', category: 'Electronics', price: '$79.00', stock: 64 },
  { sku: 'SKU-1003', name: 'Ceramic Mug', category: 'Home', price: '$12.00', stock: 340 },
  { sku: 'SKU-1004', name: 'Yoga Mat', category: 'Sports', price: '$25.00', stock: 95 },
  { sku: 'SKU-1005', name: 'Stainless Water Bottle', category: 'Home', price: '$18.00', stock: 210 },
  { sku: 'SKU-1006', name: 'Desk Lamp', category: 'Home', price: '$34.00', stock: 58 },
  { sku: 'SKU-1007', name: 'Running Shoes', category: 'Sports', price: '$89.00', stock: 42 },
  { sku: 'SKU-1008', name: 'Phone Case', category: 'Electronics', price: '$15.00', stock: 500 },
  { sku: 'SKU-1009', name: 'Notebook Set', category: 'Office', price: '$9.00', stock: 275 },
  { sku: 'SKU-1010', name: 'Wireless Mouse', category: 'Electronics', price: '$29.00', stock: 150 },
];

/** Duplicates Table doc's own Default table Example (search + filters + results bar + a
 * full data table + Pagination). ds-pagination-example (PaginationDoc.css) is an added
 * class, not a replacement — it opts this one instance into the hover-gated spotlight
 * that brings Pagination forward and dims every other zone, without touching Table doc's
 * own live use of the same ds-table-example/-toolbar/-results classes. */
function PaginationPageTableExample() {
  const [checkedRows, setCheckedRows] = useState<Record<string, boolean>>({});
  const toggleRow = (sku: string) => setCheckedRows((prev) => ({ ...prev, [sku]: !prev[sku] }));
  const allChecked = PAGE_TABLE_ROWS.every((row) => checkedRows[row.sku]);
  const someChecked = PAGE_TABLE_ROWS.some((row) => checkedRows[row.sku]);

  return (
    <div className="ds-table-example ds-pagination-example">
      <div className="ds-table-toolbar">
        <Searchbar size="md" placeholder="Search" scopeLabel="SKU ID" />
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
        <span className="ds-table-results__count">
          1–{PAGE_TABLE_ROWS.length} of {PAGE_TABLE_ROWS.length} results
        </span>
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
              <TableSelectHeaderCell
                checked={allChecked}
                indeterminate={someChecked && !allChecked}
                onChange={(checked) =>
                  setCheckedRows(Object.fromEntries(PAGE_TABLE_ROWS.map((row) => [row.sku, checked])))
                }
              />
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
            {PAGE_TABLE_ROWS.map((row) => (
              <TableRow key={row.sku} state={checkedRows[row.sku] ? 'selected' : 'default'}>
                <TableSelectCell checked={!!checkedRows[row.sku]} onChange={() => toggleRow(row.sku)} />
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
  );
}

/** Duplicates Modal doc's own Table-size Example (a Full modal whose body IS the table
 * card). Same ds-pagination-example opt-in as the Page table panel above, applied via
 * Modal's own className prop instead of a wrapping div, since Modal renders its Header/
 * Footer internally — the class still needs to land on the outermost .ds-modal element
 * for the hover-gated spotlight to reach them. */
function PaginationModalTableExample() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Modal
        size="full"
        title="Product Catalog"
        showInfo
        showLeading
        className="ds-modal--table-example ds-pagination-example"
      >
        <div className="ds-table-example">
          <div className="ds-table-toolbar">
            <Input className="ds-table-toolbar__search" size="md" placeholder="Search SKU ID or product name" />
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
              1–{MODAL_TABLE_ROWS.length} of {MODAL_TABLE_ROWS.length} results
            </span>
            <div className="ds-table-results__actions">
              <span className="ds-table-results__updated">Last Updated 2026-08-11 09:15</span>
              <Button variant="primary" appearance="outline" size="md">
                Refresh
              </Button>
              <Button variant="primary" appearance="outline" size="md">
                Export
              </Button>
            </div>
          </div>

          <Table size="md">
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
            {MODAL_TABLE_ROWS.map((row) => (
              <TableRow key={row.sku}>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.name}</TableCell>
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
  );
}

interface PaginationDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function PaginationDoc({ onNavigate }: PaginationDocProps) {
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('page-table');
  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Pagination</h1>
        <p className="ds-doc__lede">
          Pagination breaks a long result set into pages, letting a user jump between numbered
          pages, step forward or back one at a time, or go straight to a specific page.
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
          Use Pagination below a table or list once results span more than one page — it keeps
          the page count visible while giving direct access to the first, last, and current
          neighborhood of pages.
        </p>
        <div className="ds-preview">
          <Pagination currentPage={3} totalPages={10} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Numbered items sit between two nav controls; an optional page-size trigger and a
          go-to field follow on the trailing edge.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div className="ds-pagination ds-anatomy__demo" aria-hidden="true">
              <span className="ds-anatomy__part-relative">
                <IconButton
                  icon="chevron_left"
                  appearance="ghost"
                  size="md"
                  label="Previous page"
                  className="ds-pagination__nav"
                />
                <span className="ds-anatomy__badge">1</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <button type="button" className="ds-pagination__item">
                  2
                </button>
                <span className="ds-anatomy__badge">2</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <button type="button" className="ds-pagination__item ds-pagination__item--active">
                  3
                </button>
                <span className="ds-anatomy__badge">3</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <span className="ds-pagination__item ds-pagination__item--ellipsis" aria-hidden="true">
                  <span className="icon icon--sm" aria-hidden="true">
                    more_horiz
                  </span>
                </span>
                <span className="ds-anatomy__badge">4</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <button type="button" className="ds-pagination__item">
                  10
                </button>
                <span className="ds-anatomy__badge">5</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <IconButton
                  icon="chevron_right"
                  appearance="ghost"
                  size="md"
                  label="Next page"
                  className="ds-pagination__nav"
                />
                <span className="ds-anatomy__badge">6</span>
              </span>
              <div className="ds-pagination__goto">
                <span className="ds-anatomy__part-relative">
                  <Button variant="primary" appearance="outline" size="md" trailingIcon="expand_more">
                    10 /page
                  </Button>
                  <span className="ds-anatomy__badge">7</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <span className="ds-pagination__goto-label">Go to</span>
                  <Input className="ds-pagination__goto-input" size="md" placeholder="" />
                  <span className="ds-anatomy__badge">8</span>
                </span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Previous</strong> — <span>steps back one page; disabled on the first page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Page item</strong> — <span>jumps directly to that page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Current item</strong> — <span>the active page, outlined and labeled in brand color</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Ellipsis</strong> — <span>collapses the pages between the visible window and the last page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Last page</strong> — <span>always reachable, regardless of total page count</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">6</span>
                <span>
                  <strong>Next</strong> — <span>steps forward one page; disabled on the last page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">7</span>
                <span>
                  <strong>Page-size trigger</strong> — <span>opens a menu to change how many rows each page holds</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">8</span>
                <span>
                  <strong>Go to</strong> — <span>jumps to a page typed directly into the field; optional</span>
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
          Size scales every control together — Sm shows one fewer page before collapsing to an
          ellipsis, to fit its narrower footprint.
        </p>
        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Pagination size="md" currentPage={3} totalPages={10} />
                <span className="ds-variant-row__cell-label">Md · 32px items</span>
              </div>
              <div className="ds-variant-row__cell">
                <Pagination size="sm" currentPage={3} totalPages={8} />
                <span className="ds-variant-row__cell-label">Sm · 24px items</span>
              </div>
            </div>
          </div>

          <span className="ds-variant-group__label ds-variant-tabs-label">Example</span>
          <div className="ds-line-tabs" role="tablist" aria-label="Pagination example contexts">
            {EXAMPLE_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeExampleTab === tab.id}
                className={`ds-line-tab${activeExampleTab === tab.id ? ' ds-line-tab--active' : ''}`}
                onClick={() => setActiveExampleTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="ds-variant-groups">
            <div className="ds-variant-group">
              <p className="ds-section__desc">
                Two full compositions — a page-level product table and a Full-size Modal table —
                built entirely from existing components; hover either to bring Pagination forward
                and dim the rest.
              </p>
              {activeExampleTab === 'page-table' ? (
                <div className="ds-preview">
                  <PaginationPageTableExample />
                </div>
              ) : (
                <div className="ds-preview ds-preview--scrim ds-preview--scroll">
                  <PaginationModalTableExample />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          A page item carries one of three looks; the nav controls also disable at either end
          of the range.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td style={{ width: 280 }}>
                <button type="button" className="ds-pagination__item">
                  2
                </button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--text-body-primary-neutral)' }} />
                  <code>text-body-primary-neutral</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Current</td>
              <td style={{ width: 280 }}>
                <button type="button" className="ds-pagination__item ds-pagination__item--active">
                  3
                </button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-600)' }} />
                  <code>brand-primary-600</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Ellipsis</td>
              <td style={{ width: 280 }}>
                <span className="ds-pagination__item ds-pagination__item--ellipsis" aria-hidden="true">
                  <span className="icon icon--sm" aria-hidden="true">
                    more_horiz
                  </span>
                </span>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--text-body-tertiary-neutral)' }} />
                  <code>text-body-tertiary-neutral</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Nav disabled</td>
              <td style={{ width: 280 }}>
                <IconButton icon="chevron_left" appearance="ghost" size="md" label="Previous page" disabled />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-icon-button-icon-primary-ghost-disabled)' }}
                  />
                  <code>interactive-icon-button-icon-primary-ghost-disabled</code>
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
          Md and Sm share the same corner radius and token set; only item size and gap scale
          down together.
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
              <th scope="row">Md item size</th>
              <td>
                <code>--component-height-md</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Sm item size</th>
              <td>
                <code>--component-height-xs</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Item corner radius</th>
              <td>—</td>
              <td>6px (no matching token; sits between --radius-sm/4px and --radius-md/8px)</td>
            </tr>
            <tr>
              <th scope="row">Md item gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Sm item gap</th>
              <td>
                <code>--space-component-gap-xs</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Go-to group gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Go-to group offset</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px, left margin from the last item</td>
            </tr>
            <tr>
              <th scope="row">Item border (current)</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px, all sides</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Pagination.</p>
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
            onClick={() => onNavigate?.('dropdown')}
          >
            <DropdownIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Dropdown</span>
          </button>
        </div>
      </section>
    </div>
  );
}
