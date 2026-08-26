import { useLayoutEffect, useRef, useState } from 'react';
import { FilterChip, InputChip, ActionChip, ChevronDownIcon } from './Chip';
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell } from './Table';
import { Searchbar } from './Searchbar';
import { Textarea } from './Textarea';
import { DropdownOption } from './Dropdown';
import Button from './Button';
import { SearchbarIcon, SelectIcon, TextareaIcon, TabIcon, TableIcon } from './icons';
import './ButtonDoc.css';
import './Select.css';
import './ChipDoc.css';

const FIGMA_URL = 'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=0-1';

const STYLE_TABS = ['Filter chip', 'Input chip', 'Action chip'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const STATE_TABS = ['Filter chip', 'Input chip', 'Action chip'] as const;
type StateTab = (typeof STATE_TABS)[number];

const EXAMPLE_TABS = ['Filter chip', 'Input chip', 'Action chip'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

const EXAMPLE_TAB_NOTES: Record<ExampleTab, string> = {
  'Filter chip':
    'Filter chips are the interactive focal point here; the search bar and table recede on hover.',
  'Input chip':
    "Each chosen value renders as an Input chip; clicking a chip's close icon removes just that value. Type text and press Enter to add a new chip.",
  'Action chip':
    'Select renders selected values as Input chips — Chip (in-line) trigger collapses overflow into a trailing "+N" badge, Chip (wrap) trigger lets selection flow onto additional lines instead. Tab groups use Action chips, with the category labels receding on hover. A Searchbar\'s filter suggestions render as Action chips too, collapsing into a removable inline token once one is picked.',
};

interface ChipTabGroup {
  label: string;
  chips: string[];
}

// Figma node 1720:64766 — category-labeled Action Chip rows from a Waybill Management toolbar.
const CHIP_TAB_GROUPS: ChipTabGroup[] = [
  {
    label: 'Product Ready Methods',
    chips: ['Standard Delivery', 'Same Day In-hub', '3PL', 'Consignment', 'Hybrid Delivery Consolidated'],
  },
  { label: 'Order Status', chips: ['To-Ship', 'Shipping', 'Completed', 'Cancelled'] },
];

// Figma node 1720:61038 "Toolbar" — Filter chip labels from the same reference's Table toolbar.
const FILTER_CHIP_LABELS = ['Storefront Code', 'Waybill Status'];

// Same node's Scoped-searchbar: scope label "Order No." (matching the "Search Order No."
// placeholder), paired here with "Waybill No." — the toolbar's other identifier-style column.
const CHIP_TABLE_SCOPE_OPTIONS = ['Order No.', 'Waybill No.'];

interface FilterChipTableRow {
  waybill: string;
  storefront: string;
  status: string;
}

const FILTER_CHIP_TABLE_ROWS: FilterChipTableRow[] = [
  { waybill: 'WB-10293', storefront: 'H0888001', status: 'Acknowledged' },
  { waybill: 'WB-10294', storefront: 'H0891427', status: 'Pending' },
  { waybill: 'WB-10295', storefront: 'H0892003', status: 'Acknowledged' },
];

// Duplicated from Select's Example > Multi-select tab's two chip-trigger demos.
const SELECT_MULTI_CHIP_LABELS = ['Design', 'Engineering', 'Product', 'Marketing', 'Sales'];
const SELECT_CHIP_ROW_GAP_PX = 4; // resolved value of --space-component-gap-xs

interface ChipDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function ChipDoc({ onNavigate }: ChipDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Filter chip');
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Filter chip');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Filter chip');

  // ---- Variants: interactive demo state ----
  const [filterSelected, setFilterSelected] = useState(true);
  const [actionSelectedSize, setActionSelectedSize] = useState<'sm' | 'md' | 'lg' | null>('lg');
  const [inputChips, setInputChips] = useState(['Tag one', 'Tag two', 'Tag three']);
  const removeInputChip = (label: string) =>
    setInputChips((prev) => prev.filter((l) => l !== label));

  // ---- Example: Table (filter-chips) — scoped searchbar duplicated from Searchbar's Style > Scope Selector tab ----
  const [tableScopeValue, setTableScopeValue] = useState(CHIP_TABLE_SCOPE_OPTIONS[0]);
  const [tableScopeOpen, setTableScopeOpen] = useState(false);

  // ---- Example: Textarea (input-chips) — duplicated from Textarea's Style > Input-chip tab ----
  const [textareaChips, setTextareaChips] = useState(['Tag one', 'Tag two']);
  const removeTextareaChip = (label: string) =>
    setTextareaChips((prev) => prev.filter((l) => l !== label));
  const addTextareaChip = (label: string) =>
    setTextareaChips((prev) => (prev.includes(label) ? prev : [...prev, label]));

  // ---- Example: Select (action-chips) — duplicated from Select's Example > Multi-select tab ----
  const [selectInlineOpen, setSelectInlineOpen] = useState(false);
  const [selectInlineSelected, setSelectInlineSelected] = useState(['Design', 'Engineering']);
  const toggleSelectInlineOption = (label: string) =>
    setSelectInlineSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  const toggleAllSelectInlineOptions = () =>
    setSelectInlineSelected((prev) =>
      prev.length === SELECT_MULTI_CHIP_LABELS.length ? [] : [...SELECT_MULTI_CHIP_LABELS]
    );

  // Same measured-overflow approach as Select's own Chip (in-line) trigger: an
  // off-screen row renders every chip at its truncated width so genuine container
  // overflow (not a fixed count) drives the trailing "+N" badge.
  const selectInlineRowRef = useRef<HTMLDivElement>(null);
  const selectInlineMeasureRef = useRef<HTMLDivElement>(null);
  const [selectInlineVisibleCount, setSelectInlineVisibleCount] = useState(
    selectInlineSelected.length
  );

  useLayoutEffect(() => {
    const visibleRow = selectInlineRowRef.current;
    const measureRow = selectInlineMeasureRef.current;
    if (!visibleRow || !measureRow) return;

    const containerWidth = visibleRow.clientWidth;
    const children = Array.from(measureRow.children) as HTMLElement[];
    const badgeEl = children[children.length - 1];
    const chipEls = children.slice(0, -1);
    const badgeWidth = badgeEl?.offsetWidth ?? 0;

    let usedWidth = 0;
    let visible = chipEls.length;
    for (let i = 0; i < chipEls.length; i++) {
      const chipWidth = chipEls[i].offsetWidth + (i > 0 ? SELECT_CHIP_ROW_GAP_PX : 0);
      const isLast = i === chipEls.length - 1;
      const reserve = isLast ? 0 : SELECT_CHIP_ROW_GAP_PX + badgeWidth;
      if (usedWidth + chipWidth + reserve > containerWidth) {
        visible = i;
        break;
      }
      usedWidth += chipWidth;
    }
    setSelectInlineVisibleCount(visible);
  }, [selectInlineSelected, activeExampleTab]);

  const visibleSelectInlineChips = selectInlineSelected.slice(0, selectInlineVisibleCount);
  const hiddenSelectInlineCount = selectInlineSelected.length - visibleSelectInlineChips.length;

  const [selectWrapOpen, setSelectWrapOpen] = useState(false);
  const [selectWrapSelected, setSelectWrapSelected] = useState([
    'Design',
    'Engineering',
    'Product',
    'Marketing',
  ]);
  const toggleSelectWrapOption = (label: string) =>
    setSelectWrapSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  const toggleAllSelectWrapOptions = () =>
    setSelectWrapSelected((prev) =>
      prev.length === SELECT_MULTI_CHIP_LABELS.length ? [] : [...SELECT_MULTI_CHIP_LABELS]
    );

  // ---- Example: Searchbar (action-chips) — duplicated from Searchbar's Variants > Chip style tab ----
  const [searchbarFilterChip, setSearchbarFilterChip] = useState<string | null>(null);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Chip</h1>
        <p className="ds-doc__lede">
          A Chip is a compact, pill-shaped control used to filter, tag, or trigger an action.
          Filter chips open a dropdown panel and reflect selection; Input chips represent a
          discrete piece of user-entered data and can be removed; Action chips trigger a command,
          similar to a small button.
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
          Chips surface a relationship between pieces of information at a glance and let users
          browse, narrow, or act on content quickly. Use a Filter chip when the chip opens a panel
          of choices; an Input chip when it represents something the user typed or picked and may
          remove; and an Action chip when clicking it triggers a command immediately.
        </p>
        <div className="ds-preview">
          <div style={{ display: 'flex', gap: 'var(--space-component-gap-md)', flexWrap: 'wrap' }}>
            <FilterChip label="Filter" selected />
            <InputChip label="Input" />
            <ActionChip label="Action" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Every chip is a pill-shaped container holding a label; Filter chips add a trailing
          chevron to signal the attached dropdown, and Input chips add a trailing close icon
          instead.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-chip ds-chip--filter ds-chip--selected ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-chip__label ds-anatomy__part-relative">
                Label
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </span>
              <span className="ds-chip__chevron ds-anatomy__part-relative" aria-hidden="true">
                <ChevronDownIcon />
                <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>border, radius, background respond to selected / hover / focus / disabled</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Label</strong> — <span>chip text; color follows the container state</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Trailing icon</strong> —{' '}
                  <span>chevron on Filter chip, close icon on Input chip; Action chip has none</span>
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
          Style controls behavior: Filter chip toggles selection and pairs with a Dropdown panel
          (see Related Components); Input chip can be removed individually; Action chip fires an
          action immediately and comes in three sizes.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Chip variant groups">
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
          {activeStyleTab === 'Filter chip' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <FilterChip
                  label="Label"
                  selected={filterSelected}
                  onClick={() => setFilterSelected((v) => !v)}
                />
              </div>
              <span className="ds-variant-note">
                Selecting a Filter chip highlights it and applies a border/background change; the
                trailing chevron opens the attached Dropdown panel.
              </span>
            </div>
          )}

          {activeStyleTab === 'Input chip' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ display: 'flex', gap: 'var(--space-component-gap-sm)', flexWrap: 'wrap' }}>
                  {inputChips.map((label) => (
                    <InputChip key={label} label={label} onRemove={() => removeInputChip(label)} />
                  ))}
                  {inputChips.length === 0 && (
                    <span className="ds-variant-note">All chips removed — reload the page to reset.</span>
                  )}
                </div>
              </div>
              <span className="ds-variant-note">
                Clicking the close icon removes that chip; Input chips carry no selected state of
                their own.
              </span>
            </div>
          )}

          {activeStyleTab === 'Action chip' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ display: 'flex', gap: 'var(--space-component-gap-sm)', alignItems: 'center' }}>
                  {(['lg', 'md', 'sm'] as const).map((size) => (
                    <ActionChip
                      key={size}
                      label="Label"
                      size={size}
                      selected={actionSelectedSize === size}
                      onClick={() => setActionSelectedSize((v) => (v === size ? null : size))}
                    />
                  ))}
                </div>
              </div>
              <span className="ds-variant-note">
                Action chip has no trailing icon — clicking the whole chip fires the action; the
                selected look shown here doubles as a toggle example.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <FilterChip label="Label" selected />
                <span className="ds-variant-row__cell-label">Filter · 32px</span>
              </div>
            </div>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <InputChip label="Label" size="md" />
                <span className="ds-variant-row__cell-label">Input Md · 28px</span>
              </div>
              <div className="ds-variant-row__cell">
                <InputChip label="Label" size="sm" />
                <span className="ds-variant-row__cell-label">Input Sm · 24px</span>
              </div>
            </div>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <ActionChip label="Label" size="lg" />
                <span className="ds-variant-row__cell-label">Action Lg · 32px</span>
              </div>
              <div className="ds-variant-row__cell">
                <ActionChip label="Label" size="md" />
                <span className="ds-variant-row__cell-label">Action Md · 28px</span>
              </div>
              <div className="ds-variant-row__cell">
                <ActionChip label="Label" size="sm" />
                <span className="ds-variant-row__cell-label">Action Sm · 24px</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Example</span>
            <p className="ds-section__desc">
              Real-world compositions adapted from a Waybill Management toolbar and other
              chip-bearing components, grouped by chip style — Filter chips paired with a data
              table, Input chips inside a Textarea or as Select trigger values, and
              category-labeled Action chip groups.
            </p>

            <div className="ds-line-tabs" role="tablist" aria-label="Chip example groups">
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

            <span className="ds-variant-note">{EXAMPLE_TAB_NOTES[activeExampleTab]}</span>

            <div
              className={`ds-preview${activeExampleTab === 'Filter chip' ? ' ds-preview--scrim' : ''}`}
            >
              {activeExampleTab === 'Filter chip' && (
                <div className="ds-example-mocks" style={{ width: '100%' }}>
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Table</span>
                    <div
                      className="ds-example-chip-table ds-table-example"
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
                                {CHIP_TABLE_SCOPE_OPTIONS.map((option) => (
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
                          {FILTER_CHIP_LABELS.map((label) => (
                            <FilterChip key={label} label={label} />
                          ))}
                        </div>
                      </div>
                      <Table size="md">
                        <TableHeader>
                          <TableHeaderCell>Waybill No.</TableHeaderCell>
                          <TableHeaderCell>Storefront Code</TableHeaderCell>
                          <TableHeaderCell>Waybill Status</TableHeaderCell>
                        </TableHeader>
                        {FILTER_CHIP_TABLE_ROWS.map((row) => (
                          <TableRow key={row.waybill}>
                            <TableCell>{row.waybill}</TableCell>
                            <TableCell>{row.storefront}</TableCell>
                            <TableCell>{row.status}</TableCell>
                          </TableRow>
                        ))}
                      </Table>
                    </div>
                  </div>
                </div>
              )}

              {activeExampleTab === 'Input chip' && (
                <div className="ds-example-mocks">
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Textarea</span>
                    <div style={{ width: 320 }}>
                      <Textarea
                        chips={textareaChips}
                        onRemoveChip={removeTextareaChip}
                        onAddChip={addTextareaChip}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeExampleTab === 'Action chip' && (
                <div className="ds-example-mocks">
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Select</span>
                    <div className="ds-variant-row" style={{ alignItems: 'flex-start' }}>
                      <div className="ds-variant-row__cell">
                        <div className="ds-combo-figure" style={{ width: 320 }}>
                          <div
                            className="ds-select"
                            style={{ width: 320 }}
                            onClick={() => setSelectInlineOpen((open) => !open)}
                          >
                            <div className="ds-select__content">
                              {visibleSelectInlineChips.length > 0 ? (
                                <div
                                  ref={selectInlineRowRef}
                                  className="ds-select__chips"
                                  style={{
                                    flex: '1 1 0%',
                                    minWidth: 0,
                                    flexWrap: 'nowrap',
                                    overflow: 'hidden',
                                  }}
                                >
                                  {visibleSelectInlineChips.map((label) => (
                                    <InputChip
                                      key={label}
                                      label={label}
                                      title={label}
                                      size="sm"
                                      className="ds-chip--truncate"
                                      onRemove={() => toggleSelectInlineOption(label)}
                                    />
                                  ))}
                                  {hiddenSelectInlineCount > 0 && (
                                    <span
                                      className="ds-chip ds-chip--input ds-chip--sm"
                                      style={{ flexShrink: 0, cursor: 'default' }}
                                    >
                                      <span className="ds-chip__label">+{hiddenSelectInlineCount}</span>
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="ds-select__placeholder">Please select</span>
                              )}
                            </div>
                            <span className="ds-select__chevron" aria-hidden="true">
                              <ChevronDownIcon />
                            </span>
                          </div>
                          {/* Off-screen measuring row: full chip list + one badge, rendered at real
                              widths so useLayoutEffect can compute genuine overflow before paint. */}
                          <div
                            ref={selectInlineMeasureRef}
                            aria-hidden="true"
                            style={{
                              position: 'absolute',
                              top: -9999,
                              left: -9999,
                              display: 'flex',
                              flexWrap: 'nowrap',
                              gap: 'var(--space-component-gap-xs)',
                              visibility: 'hidden',
                            }}
                          >
                            {selectInlineSelected.map((label) => (
                              <InputChip
                                key={label}
                                label={label}
                                size="sm"
                                className="ds-chip--truncate"
                              />
                            ))}
                            <span className="ds-chip ds-chip--input ds-chip--sm" style={{ flexShrink: 0 }}>
                              <span className="ds-chip__label">+{selectInlineSelected.length}</span>
                            </span>
                          </div>
                          {selectInlineOpen && (
                            <div className="ds-dropdown ds-dropdown--lg" style={{ width: '100%' }}>
                              <div className="ds-dropdown__panel">
                                <div className="ds-dropdown__options">
                                  <DropdownOption
                                    label="Select All"
                                    style="multi"
                                    state={
                                      selectInlineSelected.length === SELECT_MULTI_CHIP_LABELS.length
                                        ? 'selected'
                                        : 'default'
                                    }
                                    onClick={toggleAllSelectInlineOptions}
                                  />
                                  {SELECT_MULTI_CHIP_LABELS.map((label) => (
                                    <DropdownOption
                                      key={label}
                                      label={label}
                                      style="multi"
                                      state={selectInlineSelected.includes(label) ? 'selected' : 'default'}
                                      onClick={() => toggleSelectInlineOption(label)}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="ds-dropdown__footer">
                                <Button
                                  variant="primary"
                                  appearance="ghost"
                                  size="sm"
                                  onClick={() => setSelectInlineSelected([])}
                                >
                                  Reset
                                </Button>
                                <Button
                                  variant="primary"
                                  appearance="solid"
                                  size="sm"
                                  onClick={() => setSelectInlineOpen(false)}
                                >
                                  Apply
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        <span className="ds-variant-row__cell-label">Chip (in-line) trigger</span>
                      </div>

                      <div className="ds-variant-row__cell">
                        <div className="ds-combo-figure" style={{ width: 320 }}>
                          <div
                            className="ds-select"
                            style={{
                              width: 320,
                              height: 'auto',
                              paddingBlock: 'var(--space-component-padding-sm)',
                            }}
                            onClick={() => setSelectWrapOpen((open) => !open)}
                          >
                            <div className="ds-select__content">
                              {selectWrapSelected.length > 0 ? (
                                <div
                                  className="ds-select__chips"
                                  style={{ flex: '1 1 0%', minWidth: 0, flexWrap: 'wrap' }}
                                >
                                  {selectWrapSelected.map((label) => (
                                    <InputChip
                                      key={label}
                                      label={label}
                                      size="sm"
                                      onRemove={() => toggleSelectWrapOption(label)}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <span className="ds-select__placeholder">Please select</span>
                              )}
                            </div>
                            <span className="ds-select__chevron" aria-hidden="true">
                              <ChevronDownIcon />
                            </span>
                          </div>
                          {selectWrapOpen && (
                            <div className="ds-dropdown ds-dropdown--lg" style={{ width: '100%' }}>
                              <div className="ds-dropdown__panel">
                                <div className="ds-dropdown__options">
                                  <DropdownOption
                                    label="Select All"
                                    style="multi"
                                    state={
                                      selectWrapSelected.length === SELECT_MULTI_CHIP_LABELS.length
                                        ? 'selected'
                                        : 'default'
                                    }
                                    onClick={toggleAllSelectWrapOptions}
                                  />
                                  {SELECT_MULTI_CHIP_LABELS.map((label) => (
                                    <DropdownOption
                                      key={label}
                                      label={label}
                                      style="multi"
                                      state={selectWrapSelected.includes(label) ? 'selected' : 'default'}
                                      onClick={() => toggleSelectWrapOption(label)}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="ds-dropdown__footer">
                                <Button
                                  variant="primary"
                                  appearance="ghost"
                                  size="sm"
                                  onClick={() => setSelectWrapSelected([])}
                                >
                                  Reset
                                </Button>
                                <Button
                                  variant="primary"
                                  appearance="solid"
                                  size="sm"
                                  onClick={() => setSelectWrapOpen(false)}
                                >
                                  Apply
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        <span className="ds-variant-row__cell-label">Chip (wrap) trigger</span>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Tab</span>
                    <div className="ds-example-chip-tabs">
                      {CHIP_TAB_GROUPS.map((group) => (
                        <div key={group.label} className="ds-example-chip-tabs__row">
                          <span className="ds-example-chip-tabs__label">{group.label}</span>
                          <div className="ds-example-chip-tabs__chips">
                            {group.chips.map((label) => (
                              <ActionChip key={label} label={label} size="md" />
                            ))}
                            <ActionChip label="All" size="md" selected />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Searchbar</span>
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
                          chipLabel={searchbarFilterChip ?? undefined}
                          onChipRemove={() => setSearchbarFilterChip(null)}
                        />
                      </div>
                      {!searchbarFilterChip && (
                        <div style={{ display: 'flex', gap: 'var(--space-component-gap-xs)' }}>
                          <ActionChip
                            label="Product"
                            size="md"
                            onClick={() => setSearchbarFilterChip('Product')}
                          />
                          <ActionChip
                            label="Promotion"
                            size="md"
                            onClick={() => setSearchbarFilterChip('Promotion')}
                          />
                        </div>
                      )}
                    </div>
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
          Filter chip is the only style with a Focus ring; Input chip drops its close icon when
          disabled since a disabled chip can't be removed.
        </p>
        <div className="ds-line-tabs ds-line-tabs--no-label" role="tablist" aria-label="Chip state groups">
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
          {activeStateTab === 'Filter chip' && (
            <div className="ds-variant-group">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Selected</th>
                    <th>Preview</th>
                    <th>Surface token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Default</td>
                    <td>No</td>
                    <td>
                      <FilterChip label="Label" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-100)' }} />
                        <code>brand-neutral-100</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>No</td>
                    <td>
                      <FilterChip label="Label" state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-800)' }} />
                        <code>brand-neutral-800 (border)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>No</td>
                    <td>
                      <FilterChip label="Label" state="focus" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-800)' }} />
                        <code>brand-neutral-800 (ring)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>No</td>
                    <td>
                      <FilterChip label="Label" state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-700)' }} />
                        <code>brand-neutral-700 (label)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Default</td>
                    <td>Yes</td>
                    <td>
                      <FilterChip label="Label" selected />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-75)' }} />
                        <code>brand-primary-75</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>Yes</td>
                    <td>
                      <FilterChip label="Label" selected state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                        <code>brand-primary-400 (border)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>Yes</td>
                    <td>
                      <FilterChip label="Label" selected state="focus" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-shadow-primary)' }}
                        />
                        <code>interactive-shadow-primary (ring)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>Yes</td>
                    <td>
                      <FilterChip label="Label" selected state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-300)' }} />
                        <code>brand-primary-300 (label)</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Input chip' && (
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
                      <InputChip label="Label" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-100)' }} />
                        <code>brand-neutral-100</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <InputChip label="Label" state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-800)' }} />
                        <code>brand-neutral-800 (border)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <InputChip label="Label" state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-700)' }} />
                        <code>brand-neutral-700 (label)</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Action chip' && (
            <div className="ds-variant-group">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Selected</th>
                    <th>Preview</th>
                    <th>Surface token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Default</td>
                    <td>No</td>
                    <td>
                      <ActionChip label="Label" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-100)' }} />
                        <code>brand-neutral-100</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>No</td>
                    <td>
                      <ActionChip label="Label" state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-800)' }} />
                        <code>brand-neutral-800 (border)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>No</td>
                    <td>
                      <ActionChip label="Label" state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-700)' }} />
                        <code>brand-neutral-700 (label)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Default</td>
                    <td>Yes</td>
                    <td>
                      <ActionChip label="Label" selected />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-75)' }} />
                        <code>brand-primary-75</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>Yes</td>
                    <td>
                      <ActionChip label="Label" selected state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                        <code>brand-primary-400 (border)</code>
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
          Every chip hugs its label width; only height and horizontal padding change between
          styles and sizes.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Filter</th>
              <th>Input</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Height</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-md</code>
                  <span className="ds-tag">32px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-sm / -xs</code>
                  <span className="ds-tag">28 / 24px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-md / -sm / -xs</code>
                  <span className="ds-tag">32 / 28 / 24px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Padding</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-md / -lg</code>
                  <span className="ds-tag">12 / 16px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-md / -sm</code>
                  <span className="ds-tag">12 / 8px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-md</code>
                  <span className="ds-tag">12px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Label / icon gap</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--space-component-gap-sm</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--radius-xl</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Border</th>
              <td colSpan={3}>
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
        <p className="ds-section__desc">Components that commonly appear alongside Chip.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('searchbar')}
          >
            <SearchbarIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Searchbar</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('select')}
          >
            <SelectIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Select</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('textarea')}
          >
            <TextareaIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Textarea</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('tab')}
          >
            <TabIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Tab</span>
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
