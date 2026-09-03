import { useEffect, useRef, useState } from 'react';
import { Tooltip, type TooltipPosition } from './Tooltip';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectHeaderCell,
  TableRow,
  TableCell,
  TableSelectCell,
} from './Table';
import { FilterChip } from './Chip';
import Dropdown, { DropdownOption } from './Dropdown';
import { Searchbar } from './Searchbar';
import Button from './Button';
import Pagination from './Pagination';
import Form, { FormRow, FormCol, FormField } from './Form';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { DateRangePicker } from './DateRangePicker';
import IconButton from './IconButton';
import { TableIcon, FormIcon } from './icons';
import './ButtonDoc.css';
import './Table.css';
import './TooltipDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=194-1548';

const CHAT_FUNCTION_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=1889-114085';

const POSITION_TABS: TooltipPosition[] = [
  'top-left',
  'top',
  'top-right',
  'bottom-left',
  'bottom',
  'bottom-right',
];

const formatPosition = (position: TooltipPosition) =>
  position
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

type ExampleTab = 'Table header' | 'Form header' | 'Chat function';
const EXAMPLE_TABS: ExampleTab[] = ['Table header', 'Form header', 'Chat function'];

/** Duplicated from TableDoc.tsx's own EXAMPLE_ROWS dataset — the Table header tab
 * reuses the exact "Default" instance composition, per doc-CSS-stays-scoped
 * convention this is duplicated locally rather than imported from TableDoc. */
interface TooltipExampleRow {
  sku: string;
  brand: string;
  name: string;
  category: string;
  originalPrice: string;
  sellingPrice: string;
  merchant: string;
  discount: string;
}

const TOOLTIP_EXAMPLE_ROWS: TooltipExampleRow[] = [
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

const TOOLTIP_CATEGORY_FILTER_OPTIONS = Array.from(
  new Set(TOOLTIP_EXAMPLE_ROWS.map((row) => row.category)),
);
const TOOLTIP_STATUS_FILTER_OPTIONS = ['Success', 'Pending', 'Rejected'];
const TOOLTIP_SCOPE_OPTIONS = ['SKU ID', 'Brand', 'Product Name'];

/** Duplicated from FormDoc.tsx's own RichTextField helper (Figma 789:56940) — see
 * TooltipDoc.css for the duplicated .ds-richtext styling this depends on. */
function TooltipRichTextField({ defaultValue }: { defaultValue?: string } = {}) {
  return (
    <FormField label="Description" info>
      <div className="ds-richtext">
        <div className="ds-richtext__toolbar">
          <span className="ds-richtext__toolbar-select">
            Normal
            <span className="icon icon--xs" aria-hidden="true">
              expand_more
            </span>
          </span>
          <span className="ds-richtext__divider" aria-hidden="true" />
          <IconButton icon="format_bold" label="Bold" variant="neutral" appearance="ghost" size="sm" />
          <IconButton icon="format_italic" label="Italic" variant="neutral" appearance="ghost" size="sm" />
          <IconButton
            icon="format_underlined"
            label="Underline"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="strikethrough_s"
            label="Strikethrough"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_color_text"
            label="Text color"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <span className="ds-richtext__divider" aria-hidden="true" />
          <IconButton
            icon="format_list_numbered"
            label="Numbered list"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_list_bulleted"
            label="Bulleted list"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_align_left"
            label="Align left"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_align_center"
            label="Align center"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_align_right"
            label="Align right"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_indent_decrease"
            label="Decrease indent"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_indent_increase"
            label="Increase indent"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <span className="ds-richtext__divider" aria-hidden="true" />
          <IconButton icon="link" label="Insert link" variant="neutral" appearance="ghost" size="sm" />
          <IconButton icon="image" label="Insert image" variant="neutral" appearance="ghost" size="sm" />
          <IconButton
            icon="format_quote"
            label="Insert quote"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="table_chart"
            label="Insert table"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <span className="ds-richtext__spacer" />
          <button type="button" className="ds-richtext__preview">
            Preview
          </button>
        </div>
        <Textarea
          className="ds-richtext__field"
          placeholder="Placeholder"
          defaultValue={defaultValue}
          size="lg"
        />
      </div>
      <div className="ds-richtext__hint">
        <span className="ds-richtext__hint-count">{defaultValue?.length ?? 0}/200</span>
      </div>
    </FormField>
  );
}

/** Duplicated from FormDoc.tsx's own FormExample composition (Figma 789:56940) — the
 * Form header tab reuses the exact "Form" instance, with `infoTooltip` added to
 * demonstrate the header info icon's hover tooltip. */
function TooltipFormExample() {
  return (
    <Form
      title="General Information"
      infoTooltip="Basic details that identify this product across the catalog."
      infoTooltipPosition="bottom"
    >
      <FormRow>
        <FormCol>
          <FormField label="Product Name">
            <Input defaultValue="Wireless Bluetooth Headphones" size="lg" />
          </FormField>
        </FormCol>
        <FormCol>
          <FormField label="Brand">
            <Input defaultValue="SoundWave Audio" size="lg" />
          </FormField>
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <FormField label="Promotion Period" required>
            <DateRangePicker
              defaultValue={{ start: new Date(2026, 0, 15), end: new Date(2026, 1, 15) }}
            />
          </FormField>
        </FormCol>
        <FormCol>
          <FormField label="Availability Period" required>
            <DateRangePicker
              defaultValue={{ start: new Date(2026, 2, 1), end: new Date(2026, 2, 31) }}
            />
          </FormField>
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <FormField label="Category">
            <Select label="Electronics" size="lg" />
          </FormField>
        </FormCol>
        <FormCol>
          <FormField label="Shipping Method">
            <Select label="Standard Shipping" size="lg" />
          </FormField>
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <TooltipRichTextField defaultValue="Premium over-ear headphones with active noise cancellation and 30-hour battery life." />
        </FormCol>
      </FormRow>
    </Form>
  );
}

interface TooltipDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function TooltipDoc({ onNavigate }: TooltipDocProps) {
  const [activePositionTab, setActivePositionTab] = useState<TooltipPosition>('top');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Table header');

  /* Table header tab's local state — duplicated from TableDoc.tsx's own Default
   * instance state so the composition (toolbar, filters, freeze-shadow scroll) behaves
   * identically without importing TableDoc's own component. */
  const [exampleCheckedRows, setExampleCheckedRows] = useState<Record<string, boolean>>({});
  const [openFilter, setOpenFilter] = useState<'category' | 'status' | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<number[]>([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [scopeValue, setScopeValue] = useState(TOOLTIP_SCOPE_OPTIONS[0]);
  const [scopeOpen, setScopeOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const exampleScrollRef = useRef<HTMLDivElement>(null);
  const [freezeShadow, setFreezeShadow] = useState({
    checkboxWidth: 0,
    actionWidth: 0,
    atStart: true,
    atEnd: true,
  });

  useEffect(() => {
    if (!openFilter) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!filtersRef.current?.contains(e.target as Node)) setOpenFilter(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openFilter]);

  useEffect(() => {
    if (!scopeOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!scopeRef.current?.contains(e.target as Node)) setScopeOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [scopeOpen]);

  useEffect(() => {
    if (activeExampleTab !== 'Table header') return;
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
  }, [activeExampleTab]);

  useEffect(() => {
    if (openFilter !== 'category') setCategorySearch('');
  }, [openFilter]);

  const toggleFilterOption = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
  ) =>
    setter((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));

  const filteredCategoryOptions = TOOLTIP_CATEGORY_FILTER_OPTIONS.map((label, index) => ({
    label,
    index,
  })).filter(({ label }) => label.toLowerCase().includes(categorySearch.toLowerCase()));

  const toggleExampleRow = (sku: string) =>
    setExampleCheckedRows((prev) => ({ ...prev, [sku]: !prev[sku] }));

  const allExampleChecked = TOOLTIP_EXAMPLE_ROWS.every((row) => exampleCheckedRows[row.sku]);
  const someExampleChecked = TOOLTIP_EXAMPLE_ROWS.some((row) => exampleCheckedRows[row.sku]);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Tooltip</h1>
        <p className="ds-doc__lede">
          A Tooltip is a floating label with a directional arrow that points back at the
          element that triggered it. It appears on hover or focus and disappears once the
          pointer leaves the target's range — used to annotate icon buttons, truncated
          labels, or any control whose purpose isn't obvious from its own content.
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
          Tooltip is passive, read-only content — it never carries its own interactivity. It
          rides along with the element that triggers it and inherits that element's
          hover/focus behavior.
        </p>
        <div className="ds-preview">
          <Tooltip>Amet minim mollit non deserunt ullamco est sit aliq.</Tooltip>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Three parts — a shadowed container that carries the surface, the text it holds, and
          the arrow that points back at the trigger.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-tooltip ds-tooltip--md ds-tooltip--top ds-tooltip--align-center ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <div className="ds-tooltip__bubble">
                <p className="ds-tooltip__label ds-anatomy__part-relative">
                  Label
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
                </p>
              </div>
              <div className="ds-tooltip__arrow-wrapper ds-anatomy__part-relative">
                <svg className="ds-tooltip__arrow" width="16" height="8" viewBox="0 0 16 8" aria-hidden="true">
                  <path d="M16 8L8 0L0 8H16Z" />
                </svg>
                <span className="ds-anatomy__badge">3</span>
              </div>
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
                  <span>the tooltip text; wraps within the size's width instead of truncating (Sm never wraps)</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Arrow</strong> —{' '}
                  <span>a small triangle pointing at the trigger; flips and slides based on position</span>
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
          Position controls which side of the trigger the bubble sits on and which way the
          arrow points; Size controls the bubble's width and whether its label can wrap.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Position</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Tooltip position groups">
          {POSITION_TABS.map((position) => (
            <button
              key={position}
              type="button"
              role="tab"
              aria-selected={activePositionTab === position}
              className={`ds-line-tab${activePositionTab === position ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActivePositionTab(position)}
            >
              {formatPosition(position)}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview">
              <Tooltip position={activePositionTab}>
                Amet minim mollit non deserunt ullamco est sit aliq.
              </Tooltip>
            </div>
            <span className="ds-variant-note">
              {activePositionTab.startsWith('top')
                ? 'Top places the bubble above the trigger — the arrow flips to point down.'
                : 'Bottom places the bubble below the trigger — the arrow rests pointing up.'}{' '}
              {activePositionTab.endsWith('-left')
                ? 'Left slides the bubble past the trigger, landing the arrow near its right edge.'
                : activePositionTab.endsWith('-right')
                  ? 'Right slides the bubble past the trigger, landing the arrow near its left edge.'
                  : 'Centers the bubble directly over the trigger.'}
            </span>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Tooltip size="sm">Amet minim</Tooltip>
                <span className="ds-variant-row__cell-label">Sm · hug content</span>
              </div>
              <div className="ds-variant-row__cell">
                <Tooltip size="md">Amet minim mollit non deserunt ullamco est sit aliq.</Tooltip>
                <span className="ds-variant-row__cell-label">Md · 240px</span>
              </div>
              <div className="ds-variant-row__cell">
                <Tooltip size="lg">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit
                  officia consequat duis enim velit mollit.
                </Tooltip>
                <span className="ds-variant-row__cell-label">Lg · 600px</span>
              </div>
            </div>
          </div>
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Tooltip most often annotates a header's info icon — hovering or focusing the icon
            reveals the bubble pinned above it.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Tooltip example compositions">
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

          {activeExampleTab === 'Table header' && (
            <div className="ds-preview ds-preview--scrim">
              <div className="ds-table-example">
                <div className="ds-table-toolbar">
                  <div className="ds-table-toolbar__search-wrap" ref={scopeRef}>
                    <Searchbar
                      size="md"
                      placeholder="Search"
                      scopeLabel={scopeValue}
                      onScopeClick={() => setScopeOpen((open) => !open)}
                    />
                    {scopeOpen && (
                      <div className="ds-dropdown ds-table-filter__panel" role="listbox">
                        <div className="ds-dropdown__options">
                          {TOOLTIP_SCOPE_OPTIONS.map((option) => (
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
                  <div className="ds-table-toolbar__filters" ref={filtersRef}>
                    <div className="ds-table-filter">
                      <FilterChip
                        label="Category"
                        selected={openFilter === 'category'}
                        onClick={() =>
                          setOpenFilter((f) => (f === 'category' ? null : 'category'))
                        }
                      />
                      {openFilter === 'category' && (
                        <div className="ds-dropdown ds-table-filter__panel" role="listbox">
                          <div className="ds-dropdown__searchbar-row">
                            <div className="ds-dropdown__searchbar">
                              <span className="icon icon--sm" aria-hidden="true">
                                search
                              </span>
                              <input
                                className="ds-dropdown__searchbar-input"
                                type="text"
                                placeholder="Search category"
                                value={categorySearch}
                                onChange={(e) => setCategorySearch(e.target.value)}
                                autoFocus
                              />
                            </div>
                          </div>
                          <div className="ds-dropdown__options">
                            {filteredCategoryOptions.length === 0 ? (
                              <div className="ds-dropdown__empty">No matches</div>
                            ) : (
                              filteredCategoryOptions.map(({ label, index }) => (
                                <DropdownOption
                                  key={label}
                                  label={label}
                                  style="multi"
                                  state={categoryFilter.includes(index) ? 'selected' : 'default'}
                                  onClick={() => toggleFilterOption(setCategoryFilter, index)}
                                />
                              ))
                            )}
                          </div>
                          <div className="ds-dropdown__footer">
                            <Button
                              variant="primary"
                              appearance="ghost"
                              size="sm"
                              onClick={() => setCategoryFilter([])}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="primary"
                              appearance="solid"
                              size="sm"
                              onClick={() => setOpenFilter(null)}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="ds-table-filter">
                      <FilterChip
                        label="Status"
                        selected={openFilter === 'status'}
                        onClick={() => setOpenFilter((f) => (f === 'status' ? null : 'status'))}
                      />
                      {openFilter === 'status' && (
                        <Dropdown
                          className="ds-table-filter__panel"
                          style="single"
                          options={TOOLTIP_STATUS_FILTER_OPTIONS}
                          selectedIndices={statusFilter !== null ? [statusFilter] : []}
                          onOptionClick={(i) => setStatusFilter((prev) => (prev === i ? null : i))}
                          onReset={() => setStatusFilter(null)}
                          onApply={() => setOpenFilter(null)}
                        />
                      )}
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

                <div
                  className="ds-table-example__scroll ds-tooltip-example__table-scroll"
                  ref={exampleScrollRef}
                >
                  <div className="ds-table-example__frame">
                    <div
                      className="ds-table-example__freeze-shadow ds-table-example__freeze-shadow--left"
                      style={{ left: freezeShadow.checkboxWidth, opacity: freezeShadow.atStart ? 0 : 1 }}
                      aria-hidden="true"
                    />
                    <Table size="md">
                      <TableHeader>
                        <TableSelectHeaderCell
                          checked={allExampleChecked}
                          indeterminate={someExampleChecked && !allExampleChecked}
                          onChange={(checked) =>
                            setExampleCheckedRows(
                              Object.fromEntries(TOOLTIP_EXAMPLE_ROWS.map((row) => [row.sku, checked])),
                            )
                          }
                        />
                        <TableHeaderCell width={88}>Image</TableHeaderCell>
                        <TableHeaderCell
                          width={140}
                          info
                          infoTooltip="Stock Keeping Unit — the unique identifier assigned to this product variant."
                        >
                          SKU ID
                        </TableHeaderCell>
                        <TableHeaderCell
                          width={140}
                          info
                          infoTooltip="The manufacturer or label this product is sold under."
                        >
                          Brand
                        </TableHeaderCell>
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
                      {TOOLTIP_EXAMPLE_ROWS.map((row) => (
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
                      style={{ right: freezeShadow.actionWidth, opacity: freezeShadow.atEnd ? 0 : 1 }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="ds-table-example__pagination">
                  <Pagination currentPage={1} totalPages={10} />
                </div>
              </div>
            </div>
          )}

          {activeExampleTab === 'Form header' && (
            <div className="ds-preview ds-preview--scrim">
              <TooltipFormExample />
            </div>
          )}

          {activeExampleTab === 'Chat function' && (
            <div className="ds-preview ds-preview--scrim">
              <div className="ds-tooltip-example__chat-frame">
                <img
                  className="ds-tooltip-example__chat-image"
                  src="/assets/tooltip-example-chat.png"
                  alt="Chat function example showing the Support Chat tooltip above the sidebar's chat icon"
                />
                <div className="ds-tooltip-example__chat-highlight" aria-hidden="true" />
              </div>
            </div>
          )}

          {activeExampleTab === 'Chat function' && (
            <a
              className="ds-tooltip-example__figma-ref"
              href={CHAT_FUNCTION_FIGMA_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon icon--xs" aria-hidden="true">
                draw
              </span>
              Reference in Figma
            </a>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Padding, radius, shadow, and type are fixed across all sizes and positions — only
          width changes.
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
              <th scope="row">Width (Sm)</th>
              <td>—</td>
              <td>Hug content, no wrap</td>
            </tr>
            <tr>
              <th scope="row">Width (Md)</th>
              <td>
                <code>--component-width-tooltip-md</code>
              </td>
              <td>240px</td>
            </tr>
            <tr>
              <th scope="row">Width (Lg)</th>
              <td>—</td>
              <td>600px</td>
            </tr>
            <tr>
              <th scope="row">Bubble padding</th>
              <td>
                <code>--space-component-padding-md / -lg</code>
              </td>
              <td>12px / 16px (vertical / horizontal)</td>
            </tr>
            <tr>
              <th scope="row">Arrow inset</th>
              <td>
                <code>--space-component-padding-xl</code>
              </td>
              <td>24px (left / right)</td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td>—</td>
              <td>6px</td>
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
                <code>--typography-sm</code>
              </td>
              <td>14px / 20px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">
          Components that commonly appear alongside Tooltip.
        </p>
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
            onClick={() => onNavigate?.('form')}
          >
            <FormIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Form</span>
          </button>
        </div>
      </section>
    </div>
  );
}
