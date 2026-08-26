import { useEffect, useRef, useState } from 'react';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';
import { Select } from './Select';
import { DatePicker } from './DatePicker';
import { FilterChip } from './Chip';
import { Searchbar } from './Searchbar';
import Pagination from './Pagination';
import Button from './Button';
import Form, { FormRow, FormCol, FormField } from './Form';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectHeaderCell,
  TableRow,
  TableCell,
  TableSelectCell,
} from './Table';
import { FormIcon, TableIcon } from './icons';
import './ButtonDoc.css';
import './Table.css';
import './CheckboxDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=321-9732';

const STATE_TABS = ['Unchecked', 'Checked', 'Indeterminate'] as const;
type StateTab = (typeof STATE_TABS)[number];

const VARIANT_STYLE_TABS = ['Checkbox label', 'Checkbox card'] as const;
type VariantStyleTab = (typeof VARIANT_STYLE_TABS)[number];

const VARIANT_EXAMPLE_TABS = ['Checkbox cell', 'Checkbox field', 'Checkbox card'] as const;
type VariantExampleTab = (typeof VARIANT_EXAMPLE_TABS)[number];

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

interface CheckboxDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function CheckboxDoc({ onNavigate }: CheckboxDocProps) {
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Unchecked');
  const [overviewChecked, setOverviewChecked] = useState(true);
  const [activeVariantStyleTab, setActiveVariantStyleTab] = useState<VariantStyleTab>(
    'Checkbox label',
  );
  const [activeVariantExampleTab, setActiveVariantExampleTab] = useState<VariantExampleTab>(
    'Checkbox cell',
  );
  const [exampleCheckedRows, setExampleCheckedRows] = useState<Record<string, boolean>>({});
  const exampleScrollRef = useRef<HTMLDivElement>(null);
  const [freezeShadow, setFreezeShadow] = useState({
    checkboxWidth: 0,
    actionWidth: 0,
    atStart: true,
    atEnd: true,
  });

  useEffect(() => {
    if (activeVariantExampleTab !== 'Checkbox cell') return;
    const el = exampleScrollRef.current;
    if (!el) return;

    const measure = () => {
      const checkboxCell = el.querySelector<HTMLElement>('.ds-datatable__select-cell');
      const actionCell = el.querySelector<HTMLElement>('.ds-table-example__action-cell');
      setFreezeShadow({
        checkboxWidth: checkboxCell?.offsetWidth ?? 0,
        actionWidth: actionCell?.offsetWidth ?? 0,
        atStart: el.scrollLeft <= 0,
        atEnd: Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth,
      });
    };

    measure();

    const handleScroll = () => {
      setFreezeShadow((prev) => ({
        ...prev,
        atStart: el.scrollLeft <= 0,
        atEnd: Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth,
      }));
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);
    el.addEventListener('scroll', handleScroll);

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener('scroll', handleScroll);
    };
  }, [activeVariantExampleTab]);

  const toggleExampleRow = (sku: string) =>
    setExampleCheckedRows((prev) => ({ ...prev, [sku]: !prev[sku] }));
  const allExampleChecked = EXAMPLE_TABLE_ROWS.every((row) => exampleCheckedRows[row.sku]);
  const someExampleChecked = EXAMPLE_TABLE_ROWS.some((row) => exampleCheckedRows[row.sku]);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Checkbox</h1>
        <p className="ds-doc__lede">
          A Checkbox lets a user select one or more options from a set. Its indeterminate
          state represents a parent whose children are only partially selected.
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
          Use a Checkbox for independent on/off choices, or in a group for multi-select
          lists. Pair a parent Checkbox with the indeterminate state to summarize a group
          of children that are only partially checked.
        </p>
        <div className="ds-preview">
          <Checkbox label="Label" checked={overviewChecked} onChange={setOverviewChecked} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A Checkbox is a bordered box inside a larger invisible hit area, holding a mark
          that appears once checked or indeterminate.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-checkbox ds-checkbox--checked ds-checkbox--force-focus ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-checkbox__hit">
                <span className="ds-checkbox__box ds-anatomy__part-relative">
                  <span className="icon ds-checkbox__check" aria-hidden="true">
                    check
                  </span>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">2</span>
                </span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Hit area &amp; box</strong> —{' '}
                  <span>
                    24×24 click target wrapping a 16×16 bordered box; border, radius, and
                    background respond to checked / hover / disabled, and a focus ring
                    extends around the hit area
                  </span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Mark</strong> —{' '}
                  <span>
                    checkmark when checked, dash when indeterminate; color follows the box
                    state
                  </span>
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
          Checked and indeterminate share the same checked-mark space — only one mark is
          ever visible, so a checkbox can't be both at once.
        </p>

        <div id="variants-style" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Style</h3>
          <div className="ds-line-tabs" role="tablist" aria-label="Checkbox style">
            {VARIANT_STYLE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeVariantStyleTab === tab}
                className={`ds-line-tab${activeVariantStyleTab === tab ? ' ds-line-tab--active' : ''}`}
                onClick={() => setActiveVariantStyleTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="ds-variant-groups">
            {activeVariantStyleTab === 'Checkbox label' && (
              <div className="ds-variant-group">
                <div className="ds-variant-row">
                  <div className="ds-variant-row__cell">
                    <Checkbox label="Label" />
                    <span className="ds-variant-row__cell-label">Unchecked</span>
                  </div>
                  <div className="ds-variant-row__cell">
                    <Checkbox label="Label" checked />
                    <span className="ds-variant-row__cell-label">Checked</span>
                  </div>
                  <div className="ds-variant-row__cell">
                    <Checkbox label="Label" indeterminate />
                    <span className="ds-variant-row__cell-label">Indeterminate</span>
                  </div>
                </div>
              </div>
            )}
            {activeVariantStyleTab === 'Checkbox card' && (
              <div className="ds-variant-group">
                <div className="ds-variant-row">
                  <div className="ds-variant-row__cell">
                    <div className="ds-checkbox-card">
                      <Checkbox />
                      <div className="ds-checkbox-card__text">
                        <p className="ds-checkbox-card__title">Title</p>
                        <p className="ds-checkbox-card__desc">Description</p>
                      </div>
                    </div>
                    <span className="ds-variant-row__cell-label">Default</span>
                  </div>
                  <div className="ds-variant-row__cell">
                    <div className="ds-checkbox-card ds-checkbox-card--checked">
                      <Checkbox checked />
                      <div className="ds-checkbox-card__text">
                        <p className="ds-checkbox-card__title">Title</p>
                        <p className="ds-checkbox-card__desc">Description</p>
                      </div>
                    </div>
                    <span className="ds-variant-row__cell-label">Checked</span>
                  </div>
                  <div className="ds-variant-row__cell">
                    <div className="ds-checkbox-card ds-checkbox-card--disabled">
                      <Checkbox state="disabled" />
                      <div className="ds-checkbox-card__text">
                        <p className="ds-checkbox-card__title">Title</p>
                        <p className="ds-checkbox-card__desc">Description</p>
                      </div>
                    </div>
                    <span className="ds-variant-row__cell-label">Disabled</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="variants-example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Real compositions from elsewhere in the system — a Table's row selection and a
            Form's Platform/Shipping Method fields — with the checkbox usage worth calling
            out highlighted against the rest of the surface.
          </p>
          <div className="ds-line-tabs" role="tablist" aria-label="Checkbox example">
            {VARIANT_EXAMPLE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeVariantExampleTab === tab}
                className={`ds-line-tab${activeVariantExampleTab === tab ? ' ds-line-tab--active' : ''}`}
                onClick={() => setActiveVariantExampleTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="ds-variant-groups">
            <div className="ds-variant-group">
              {activeVariantExampleTab === 'Checkbox cell' && (
                <div className="ds-preview ds-preview--scrim">
                  <div className="ds-example-checkbox-table">
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
                          <span className="ds-table-results__updated">
                            Last Updated 2026-04-28 09:15
                          </span>
                          <Button variant="primary" appearance="outline" size="md">
                            Refresh
                          </Button>
                          <Button variant="primary" appearance="outline" size="md">
                            Export
                          </Button>
                        </div>
                      </div>

                      <div className="ds-table-example__scroll" ref={exampleScrollRef}>
                        <div className="ds-table-example__frame">
                          <div
                            className="ds-table-example__freeze-shadow ds-table-example__freeze-shadow--left"
                            style={{
                              left: freezeShadow.checkboxWidth,
                              opacity: freezeShadow.atStart ? 0 : 1,
                            }}
                            aria-hidden="true"
                          />
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
                              <TableHeaderCell width={140} info>SKU ID</TableHeaderCell>
                              <TableHeaderCell width={140} info>Brand</TableHeaderCell>
                              <TableHeaderCell width={320}>SKU Name</TableHeaderCell>
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
                              <TableHeaderCell align="center" className="ds-table-example__action-cell">
                                Action
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
                          <div
                            className="ds-table-example__freeze-shadow ds-table-example__freeze-shadow--right"
                            style={{
                              right: freezeShadow.actionWidth,
                              opacity: freezeShadow.atEnd ? 0 : 1,
                            }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      <div className="ds-table-example__pagination">
                        <Pagination currentPage={1} totalPages={10} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(activeVariantExampleTab === 'Checkbox field' ||
                activeVariantExampleTab === 'Checkbox card') && (
                <div className="ds-preview ds-preview--scrim">
                  <div
                    className={`ds-example-checkbox-form ds-example-checkbox-form--${
                      activeVariantExampleTab === 'Checkbox field' ? 'field' : 'card'
                    }`}
                  >
                    <Form title="Sending Settings">
                      <FormRow>
                        <FormCol>
                          <FormField label="Send Mode" required>
                            <div className="ds-example-checkbox-form__field">
                              <Radio label="Immediate" defaultChecked name="send-mode" />
                            </div>
                          </FormField>
                          <FormField label="Sender">
                            <div className="ds-example-checkbox-form__field">
                              <Select placeholder="Please select" />
                            </div>
                          </FormField>
                        </FormCol>
                        <FormCol>
                          <FormField label="Send Date" required>
                            <div className="ds-example-checkbox-form__field">
                              <DatePicker placeholder="Select date" />
                            </div>
                          </FormField>
                        </FormCol>
                      </FormRow>
                      <FormField label="Platform" required>
                        <div className="ds-example-checkbox-form__field ds-example-checkbox-form__field--platform">
                          <div className="ds-checkbox-option-row">
                            <Checkbox label="Message Center (Web /App)" defaultChecked />
                            <Checkbox label="Push notifications (Web)" defaultChecked />
                            <Checkbox label="Push notifications (App)" />
                            <Checkbox label="Email" />
                          </div>
                        </div>
                      </FormField>
                      <FormField label="Shipping Method" required>
                        <div className="ds-example-checkbox-form__field ds-example-checkbox-form__field--shipping">
                          <div className="ds-checkbox-card-row">
                            <div className="ds-checkbox-card ds-checkbox-card--checked">
                              <Checkbox checked />
                              <div className="ds-checkbox-card__text">
                                <p className="ds-checkbox-card__title">Standard Delivery</p>
                                <p className="ds-checkbox-card__desc">
                                  3–5 business days via local courier. Free for orders over $50
                                </p>
                              </div>
                            </div>
                            <div className="ds-checkbox-card">
                              <Checkbox />
                              <div className="ds-checkbox-card__text">
                                <p className="ds-checkbox-card__title">Express Delivery</p>
                                <p className="ds-checkbox-card__desc">
                                  Next-day delivery with real-time tracking and priority handling
                                </p>
                              </div>
                            </div>
                            <div className="ds-checkbox-card">
                              <Checkbox />
                              <div className="ds-checkbox-card__text">
                                <p className="ds-checkbox-card__title">Merchant Self-pickup</p>
                                <p className="ds-checkbox-card__desc">
                                  Customer collects from the nearest designated pickup point
                                </p>
                              </div>
                            </div>
                          </div>
                          <Checkbox
                            label="Apply to all warehouses"
                            className="ds-example-checkbox-form__apply-all"
                          />
                        </div>
                      </FormField>
                    </Form>
                  </div>
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
          Checked and indeterminate reuse the unchecked box's border/background treatment
          except where noted — only the mark color changes between them.
        </p>
        <div className="ds-line-tabs ds-line-tabs--no-label" role="tablist" aria-label="Checkbox state groups">
          {STATE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeStateTab === tab}
              className={`ds-line-tab${activeStateTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveStateTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeStateTab === 'Unchecked' && (
            <div className="ds-variant-group">
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
                    <td>
                      <Checkbox label="Label" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-checkbox-border-default)' }}
                        />
                        <code>interactive-checkbox-border-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <Checkbox label="Label" state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-checkbox-border-hover)' }}
                        />
                        <code>interactive-checkbox-border-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <Checkbox label="Label" state="focus" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-100)' }} />
                        <code>brand-primary-100 (ring)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <Checkbox label="Label" state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-checkbox-surface-disabled)' }}
                        />
                        <code>interactive-checkbox-surface-disabled</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Checked' && (
            <div className="ds-variant-group">
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
                    <td>
                      <Checkbox label="Label" checked />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                        <code>brand-primary-400</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <Checkbox label="Label" checked state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-300)' }} />
                        <code>brand-primary-300</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <Checkbox label="Label" checked state="focus" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-100)' }} />
                        <code>brand-primary-100 (ring)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <Checkbox label="Label" checked state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-checkbox-mark-disabled)' }}
                        />
                        <code>interactive-checkbox-mark-disabled</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Indeterminate' && (
            <div className="ds-variant-group">
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
                    <td>
                      <Checkbox label="Label" indeterminate />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                        <code>brand-primary-400 (dash)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <Checkbox label="Label" indeterminate state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-300)' }} />
                        <code>brand-primary-300 (dash)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <Checkbox label="Label" indeterminate state="focus" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-100)' }} />
                        <code>brand-primary-100 (ring)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <Checkbox label="Label" indeterminate state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-checkbox-mark-disabled)' }}
                        />
                        <code>interactive-checkbox-mark-disabled (dash)</code>
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
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          There is a single Checkbox size across the design system — hit area, box, and
          mark all stay fixed.
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
              <th scope="row">Hit area</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-xs</code>
                  <span className="ds-tag">24px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Box</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-sm</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Checkmark</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-xs</code>
                  <span className="ds-tag">12px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Indeterminate dash</th>
              <td>
                <div className="ds-table-cell">
                  <code>8px</code>
                  <span className="ds-tag">no matching token</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td>
                <div className="ds-table-cell">
                  <code>--radius-xs</code>
                  <span className="ds-tag">2px</span>
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
            <tr>
              <th scope="row">Focus ring</th>
              <td>
                <div className="ds-table-cell">
                  <code>brand-primary-100</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Label gap</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-xs</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Checkbox.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('form')}
          >
            <FormIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Form</span>
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
