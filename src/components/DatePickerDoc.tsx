import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';
import { DateTimePicker } from './DateTimePicker';
import { FilterChip, ChevronDownIcon } from './Chip';
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell } from './Table';
import { Searchbar } from './Searchbar';
import { DropdownOption } from './Dropdown';
import Form, { FormRow, FormCol, FormField } from './Form';
import { Radio } from './Radio';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { CalendarIcon, FormIcon, ChipIcon, TableIcon } from './icons';
import './ButtonDoc.css';
import './DatePickerDoc.css';

/* Figma's reference grid (node 156:9085) is a Jan-2029 month view. Jan 1 2029 falls on a
   Monday, so the fixed 6-row/42-cell grid is exactly 31 in-month days followed by 11
   trailing Feb days — hand-listed here (rather than reusing DatePicker's internal
   buildCalendarGrid, which isn't exported) since the Anatomy demo is static markup, same
   pattern as the rest of this section. */
const ANATOMY_GRID_DAYS = Array.from({ length: 42 }, (_, i) => ({
  day: i < 31 ? i + 1 : i - 30,
  inMonth: i < 31,
}));

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=156-9085';

const STATE_TABS = ['Trigger', 'Day Cell'] as const;
type StateTab = (typeof STATE_TABS)[number];

const STYLE_TABS = ['Single Date', 'Date Range', 'Date and Time'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const VARIANT_EXAMPLE_TABS = ['Filter-chip', 'Date-picker field'] as const;
type VariantExampleTab = (typeof VARIANT_EXAMPLE_TABS)[number];

// ---- Example > Filter-chip — duplicated from ChipDoc's Example > Filter chip tab (node
// 1720-61038/1720-64766), with a "Delivery Date" filter chip + table column added after
// "Waybill Status".
const EXAMPLE_FILTER_CHIP_LABELS = ['Storefront Code', 'Waybill Status'];
const EXAMPLE_TABLE_SCOPE_OPTIONS = ['Order No.', 'Waybill No.'];

interface ExampleFilterTableRow {
  waybill: string;
  storefront: string;
  status: string;
  deliveryDate: string;
}

const EXAMPLE_FILTER_TABLE_ROWS: ExampleFilterTableRow[] = [
  { waybill: 'WB-10293', storefront: 'H0888001', status: 'Acknowledged', deliveryDate: '2026-08-28' },
  { waybill: 'WB-10294', storefront: 'H0891427', status: 'Pending', deliveryDate: '2026-08-29' },
  { waybill: 'WB-10295', storefront: 'H0892003', status: 'Acknowledged', deliveryDate: '2026-09-01' },
];

interface DatePickerDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function DatePickerDoc({ onNavigate }: DatePickerDocProps) {
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Trigger');
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Single Date');
  const [activeVariantExampleTab, setActiveVariantExampleTab] =
    useState<VariantExampleTab>('Filter-chip');
  const [overviewValue, setOverviewValue] = useState<Date | null>(null);

  // ---- Example: Filter-chip — scoped searchbar duplicated from ChipDoc's own Example
  const [tableScopeValue, setTableScopeValue] = useState(EXAMPLE_TABLE_SCOPE_OPTIONS[0]);
  const [tableScopeOpen, setTableScopeOpen] = useState(false);
  const [deliveryDateValue, setDeliveryDateValue] = useState<Date | null>(null);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Datepicker</h1>
        <p className="ds-doc__lede">
          A Datepicker lets a user pick a single date from a calendar popover anchored to a
          text-style trigger.
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
          Click the trigger to open the calendar. Selecting a date or clicking Apply commits
          the value and closes the panel; clicking outside or pressing Escape closes it without
          discarding the current selection.
        </p>
        <div className="ds-preview">
          <DatePicker placeholder="Start Date" value={overviewValue} onChange={setOverviewValue} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A Datepicker is a trigger that anchors a calendar panel made of a header, a day grid,
          and a footer.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-anatomy__demo ds-anatomy__part-relative ds-date-picker ds-date-picker--md"
              style={{ display: 'flex', flexDirection: 'column', width: 280 }}
              aria-hidden="true"
            >
              <div className="ds-date-picker__trigger ds-anatomy__part-relative">
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
                <span className="ds-date-picker__value ds-date-picker__value--placeholder">
                  Start Date
                </span>
                {/* inline-flex (not the shared block's default inline) strips the span's
                    text-line strut, which otherwise adds ~6px below the icon and pushes it
                    off-center within the trigger's flex row. */}
                <span
                  className="ds-anatomy__part-relative"
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  <CalendarIcon className="ds-date-picker__icon" />
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">2</span>
                </span>
              </div>
              <div
                className="ds-date-picker__panel ds-anatomy__part-relative"
                style={{ position: 'static', width: '100%', marginTop: 4, overflow: 'visible' }}
              >
                <div className="ds-date-picker__header ds-anatomy__part-relative">
                  <div className="ds-date-picker__nav">
                    <span
                      className="icon"
                      aria-hidden="true"
                      style={{ color: 'var(--brand-primary-400)', fontSize: 'var(--component-icon-sm)' }}
                    >
                      keyboard_double_arrow_left
                    </span>
                    <span
                      className="icon"
                      aria-hidden="true"
                      style={{ color: 'var(--brand-primary-400)', fontSize: 'var(--component-icon-sm)' }}
                    >
                      chevron_left
                    </span>
                  </div>
                  <span className="ds-date-picker__label">Jan-2029</span>
                  <div className="ds-date-picker__nav">
                    <span
                      className="icon"
                      aria-hidden="true"
                      style={{ color: 'var(--brand-primary-400)', fontSize: 'var(--component-icon-sm)' }}
                    >
                      chevron_right
                    </span>
                    <span
                      className="icon"
                      aria-hidden="true"
                      style={{ color: 'var(--brand-primary-400)', fontSize: 'var(--component-icon-sm)' }}
                    >
                      keyboard_double_arrow_right
                    </span>
                  </div>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
                </div>
                <div className="ds-date-picker__weekdays">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                    <span key={d} className="ds-date-picker__weekday">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="ds-date-picker__grid ds-anatomy__part-relative">
                  {ANATOMY_GRID_DAYS.map(({ day, inMonth }, i) => (
                    <span
                      key={i}
                      className={`ds-date-picker__cell${
                        inMonth ? '' : ' ds-date-picker__cell--disabled'
                      }`}
                    >
                      {day}
                    </span>
                  ))}
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">4</span>
                </div>
                <div className="ds-date-picker__footer ds-anatomy__part-relative">
                  <button
                    type="button"
                    className="ds-button ds-button--primary ds-button--ghost ds-button--sm"
                    tabIndex={-1}
                  >
                    <span className="ds-button__label">Reset</span>
                  </button>
                  <button
                    type="button"
                    className="ds-button ds-button--primary ds-button--solid ds-button--sm"
                    tabIndex={-1}
                  >
                    <span className="ds-button__label">Apply</span>
                  </button>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">5</span>
                </div>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Value / placeholder</strong> —{' '}
                  <span>shows the selected date, or a placeholder when empty</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Calendar icon</strong> — <span>indicates the trigger opens a date picker</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Header</strong> —{' '}
                  <span>month/year label with prev/next month and prev/next year navigation</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Day grid</strong> —{' '}
                  <span>
                    a fixed 6-row grid of days; days outside the current month render in the
                    Disabled style and aren&apos;t selectable
                  </span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Footer</strong> —{' '}
                  <span>Reset clears the value; Apply closes the panel and keeps the selection</span>
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
          Style controls how many dates the panel collects: Single Date picks one day; Date
          Range pairs two month panels behind a shared footer to pick a start/end pair; Date
          and Time adds an hour/minute/second column beside the day grid.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Datepicker variant groups">
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
          {activeStyleTab === 'Single Date' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <DatePicker placeholder="Start Date" />
              </div>
              <span className="ds-variant-note">Picks a single day; Reset clears it.</span>
            </div>
          )}

          {activeStyleTab === 'Date Range' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <DateRangePicker />
              </div>
              <span className="ds-variant-note">
                The first click sets the range start, the second sets the end (picking an
                earlier date restarts the range); days between start and end are
                highlighted across both panels.
              </span>
            </div>
          )}

          {activeStyleTab === 'Date and Time' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <DateTimePicker />
              </div>
              <span className="ds-variant-note">
                Selecting a day updates the date; each time column scrolls independently
                and the header readout reflects the current hour/minute/second.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <DatePicker placeholder="Start Date" size="md" />
                <span className="ds-variant-row__cell-label">Md · 32px</span>
              </div>
              <div className="ds-variant-row__cell">
                <DatePicker placeholder="Start Date" size="lg" />
                <span className="ds-variant-row__cell-label">Lg · 40px</span>
              </div>
            </div>
          </div>
        </div>

        <div id="variants-example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            A Datepicker composes into a table toolbar as a filter-chip trigger, or into a form
            alongside other fields.
          </p>
          <div className="ds-line-tabs" role="tablist" aria-label="Datepicker example">
            {VARIANT_EXAMPLE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeVariantExampleTab === tab}
                className={`ds-line-tab${
                  activeVariantExampleTab === tab ? ' ds-line-tab--active' : ''
                }`}
                onClick={() => setActiveVariantExampleTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="ds-variant-groups">
            {activeVariantExampleTab === 'Filter-chip' && (
              <div className="ds-variant-group">
                <div className="ds-preview ds-preview--scrim">
                  <div className="ds-example-mocks" style={{ width: '100%' }}>
                    <div className="ds-example-mock-item">
                      <span className="ds-example-mock__name">Table</span>
                      <div
                        className="ds-example-datepicker-table ds-table-example"
                        style={{ width: '100%' }}
                      >
                        <div className="ds-table-toolbar">
                          <div className="ds-table-toolbar__search-wrap ds-combo-figure">
                            <Searchbar
                              size="md"
                              placeholder="Search Order No."
                              scopeLabel={tableScopeValue}
                              onScopeClick={() => setTableScopeOpen((open) => !open)}
                            />
                            {tableScopeOpen && (
                              <div className="ds-dropdown" style={{ width: 'fit-content' }}>
                                <div className="ds-dropdown__options">
                                  {EXAMPLE_TABLE_SCOPE_OPTIONS.map((option) => (
                                    <DropdownOption
                                      key={option}
                                      label={option}
                                      style="single"
                                      state={tableScopeValue === option ? 'selected' : 'default'}
                                      onClick={() => {
                                        setTableScopeValue(option);
                                        setTableScopeOpen(false);
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="ds-table-toolbar__filters">
                            {EXAMPLE_FILTER_CHIP_LABELS.map((label) => (
                              <FilterChip key={label} label={label} />
                            ))}
                            <DatePicker
                              placeholder="Delivery Date"
                              size="md"
                              value={deliveryDateValue}
                              onChange={setDeliveryDateValue}
                              className={`ds-date-picker--chip${
                                deliveryDateValue ? ' ds-date-picker--chip-selected' : ''
                              }`}
                              icon={
                                <span className="ds-chip__chevron">
                                  <ChevronDownIcon />
                                </span>
                              }
                            />
                          </div>
                        </div>
                        <Table size="md">
                          <TableHeader>
                            <TableHeaderCell>Waybill No.</TableHeaderCell>
                            <TableHeaderCell>Storefront Code</TableHeaderCell>
                            <TableHeaderCell>Waybill Status</TableHeaderCell>
                            <TableHeaderCell>Delivery Date</TableHeaderCell>
                          </TableHeader>
                          {EXAMPLE_FILTER_TABLE_ROWS.map((row) => (
                            <TableRow key={row.waybill}>
                              <TableCell>{row.waybill}</TableCell>
                              <TableCell>{row.storefront}</TableCell>
                              <TableCell>{row.status}</TableCell>
                              <TableCell>{row.deliveryDate}</TableCell>
                            </TableRow>
                          ))}
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">
                  The Delivery Date filter chip is a Datepicker wearing a chip's clothes — click
                  it to open the real calendar panel; the search bar and table recede on hover.
                </span>
              </div>
            )}

            {activeVariantExampleTab === 'Date-picker field' && (
              <div className="ds-variant-group">
                <div className="ds-preview ds-preview--scrim">
                  <div className="ds-example-datepicker-form">
                    <Form title="Sending Settings">
                      <FormRow>
                        <FormCol>
                          <FormField label="Send Mode" required>
                            <div className="ds-example-datepicker-form__field">
                              <Radio
                                label="Immediate"
                                defaultChecked
                                name="datepicker-send-mode"
                              />
                            </div>
                          </FormField>
                          <FormField label="Sender">
                            <div className="ds-example-datepicker-form__field">
                              <Select placeholder="Please select" />
                            </div>
                          </FormField>
                        </FormCol>
                        <FormCol>
                          <FormField label="Send Date" required>
                            <div className="ds-example-datepicker-form__field ds-example-datepicker-form__field--send-date">
                              <DatePicker placeholder="Select date" />
                            </div>
                          </FormField>
                        </FormCol>
                      </FormRow>
                      <FormField label="Platform" required>
                        <div className="ds-example-datepicker-form__field">
                          <div className="ds-example-datepicker-option-row">
                            <Checkbox label="Message Center (Web /App)" defaultChecked />
                            <Checkbox label="Push notifications (Web)" defaultChecked />
                            <Checkbox label="Push notifications (App)" />
                            <Checkbox label="Email" />
                          </div>
                        </div>
                      </FormField>
                      <FormField label="Shipping Method" required>
                        <div className="ds-example-datepicker-form__field">
                          <div className="ds-example-datepicker-card-row">
                            <div className="ds-example-datepicker-card ds-example-datepicker-card--checked">
                              <Checkbox checked />
                              <div className="ds-example-datepicker-card__text">
                                <p className="ds-example-datepicker-card__title">
                                  Standard Delivery
                                </p>
                                <p className="ds-example-datepicker-card__desc">
                                  3–5 business days via local courier. Free for orders over $50
                                </p>
                              </div>
                            </div>
                            <div className="ds-example-datepicker-card">
                              <Checkbox />
                              <div className="ds-example-datepicker-card__text">
                                <p className="ds-example-datepicker-card__title">
                                  Express Delivery
                                </p>
                                <p className="ds-example-datepicker-card__desc">
                                  Next-day delivery with real-time tracking and priority handling
                                </p>
                              </div>
                            </div>
                            <div className="ds-example-datepicker-card">
                              <Checkbox />
                              <div className="ds-example-datepicker-card__text">
                                <p className="ds-example-datepicker-card__title">
                                  Merchant Self-pickup
                                </p>
                                <p className="ds-example-datepicker-card__desc">
                                  Customer collects from the nearest designated pickup point
                                </p>
                              </div>
                            </div>
                          </div>
                          <Checkbox
                            label="Apply to all warehouses"
                            className="ds-example-datepicker-form__apply-all"
                          />
                        </div>
                      </FormField>
                    </Form>
                  </div>
                </div>
                <span className="ds-variant-note">
                  Send Date is the highlight target — every other field recedes on hover, and the
                  Datepicker itself now stretches to fill its column width.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          The trigger and the calendar's day cells each carry their own state set.
        </p>
        <div
          className="ds-line-tabs ds-line-tabs--no-label"
          role="tablist"
          aria-label="Datepicker state groups"
        >
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
          {activeStateTab === 'Trigger' && (
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
                      <DatePicker placeholder="Start Date" size="md" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-select-border-default)' }}
                        />
                        <code>interactive-select-border-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Open</td>
                    <td>
                      <div style={{ paddingBottom: 320 }}>
                        <DatePicker placeholder="Start Date" size="md" state="open" />
                      </div>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-select-border-hover)' }}
                        />
                        <code>interactive-select-border-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Error</td>
                    <td>
                      <DatePicker placeholder="Start Date" size="md" state="error" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-select-border-error)' }}
                        />
                        <code>interactive-select-border-error</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <DatePicker placeholder="Start Date" size="md" state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-select-surface-disabled)' }}
                        />
                        <code>interactive-select-surface-disabled</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Day Cell' && (
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
                      <span className="ds-date-picker__cell">12</span>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--text-body-primary-neutral)' }}
                        />
                        <code>text-body-primary-neutral</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <span
                        className="ds-date-picker__cell"
                        style={{ background: 'var(--brand-neutral-200)' }}
                      >
                        12
                      </span>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--brand-neutral-200)' }}
                        />
                        <code>brand-neutral-200</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Selected</td>
                    <td>
                      <span className="ds-date-picker__cell ds-date-picker__cell--selected">
                        12
                      </span>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--brand-primary-400)' }}
                        />
                        <code>brand-primary-400</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Today</td>
                    <td>
                      <span className="ds-date-picker__cell ds-date-picker__cell--today">12</span>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--brand-primary-400)' }}
                        />
                        <code>brand-primary-400 (border)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <span className="ds-date-picker__cell ds-date-picker__cell--disabled">
                        12
                      </span>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--text-body-tertiary-neutral)' }}
                        />
                        <code>text-body-tertiary-neutral</code>
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
        <p className="ds-section__desc">Key dimensions for the trigger, panel, and day cells.</p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Trigger height (Md)</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-md</code>
                  <span className="ds-tag">32px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Trigger height (Lg)</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-lg</code>
                  <span className="ds-tag">40px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Trigger radius</th>
              <td>
                <div className="ds-table-cell">
                  <code>--radius-md</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Panel width</th>
              <td>
                <div className="ds-table-cell">
                  <code>280px</code>
                  <span className="ds-tag">no matching token</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Header / footer height</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-md</code>
                  <span className="ds-tag">32px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Day cell</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-md</code>
                  <span className="ds-tag">24px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Day cell radius</th>
              <td>
                <div className="ds-table-cell">
                  <code>--radius-sm</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Open-state ring</th>
              <td>
                <div className="ds-table-cell">
                  <code>interactive-shadow-primary</code>
                  <span className="ds-tag">2px</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Datepicker.</p>
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
            onClick={() => onNavigate?.('chip')}
          >
            <ChipIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Chip</span>
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
