import { useLayoutEffect, useRef, useState } from 'react';
import { Select } from './Select';
import { Badge, type BadgeColor } from './Badge';
import { ChevronDownIcon, InputChip } from './Chip';
import { DropdownOption } from './Dropdown';
import Button from './Button';
import { ChipIcon, DropdownIcon, FormIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=166-22704';

const EXAMPLE_OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

// Figma's reference (node 1762-34246) pairs each option with a distinct hue — lightblue,
// lightgreen, purple, pink — none of which exist as Badge/tokens.css colors (Badge only
// implements green/orange/red/blue/gray, see Badge.tsx's BadgeColor union). Substituted
// with Badge's full 5-color set below rather than guessing new raw hex values; flagged to
// the user in the completion report.
const BADGE_EXAMPLE_OPTIONS: { label: string; color: BadgeColor }[] = [
  { label: 'Orange', color: 'orange' },
  { label: 'Green', color: 'green' },
  { label: 'Red', color: 'red' },
  { label: 'Blue', color: 'blue' },
  { label: 'Gray', color: 'gray' },
];

const STYLE_TABS = ['Label', 'Chip', 'Chip (in-line)', 'Chip (wrap)'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const MULTI_CHIP_LABELS = ['Design', 'Engineering', 'Product', 'Marketing', 'Sales'];
const CHIP_ROW_GAP_PX = 4; // resolved value of --space-component-gap-xs

const EXAMPLE_TABS = ['Single-select', 'Multi-select'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

interface SelectDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function SelectDoc({ onNavigate }: SelectDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Label');

  // ---- Variants: Chip (in-line) / Chip (wrap) demo state ----
  const [inlineChips, setInlineChips] = useState(MULTI_CHIP_LABELS);
  const removeInlineChip = (label: string) =>
    setInlineChips((prev) => prev.filter((l) => l !== label));
  const [wrapChips, setWrapChips] = useState(MULTI_CHIP_LABELS);
  const removeWrapChip = (label: string) =>
    setWrapChips((prev) => prev.filter((l) => l !== label));

  // Same measured-overflow approach as the Example section's Chip (in-line) trigger:
  // an off-screen row renders every chip at its truncated width so genuine container
  // overflow (not a fixed count) drives the trailing "+N" badge.
  const styleInlineRowRef = useRef<HTMLDivElement>(null);
  const styleInlineMeasureRef = useRef<HTMLDivElement>(null);
  const [styleInlineVisibleCount, setStyleInlineVisibleCount] = useState(inlineChips.length);

  useLayoutEffect(() => {
    const visibleRow = styleInlineRowRef.current;
    const measureRow = styleInlineMeasureRef.current;
    if (!visibleRow || !measureRow) return;

    const containerWidth = visibleRow.clientWidth;
    const children = Array.from(measureRow.children) as HTMLElement[];
    const badgeEl = children[children.length - 1];
    const chipEls = children.slice(0, -1);
    const badgeWidth = badgeEl?.offsetWidth ?? 0;

    let usedWidth = 0;
    let visible = chipEls.length;
    for (let i = 0; i < chipEls.length; i++) {
      const chipWidth = chipEls[i].offsetWidth + (i > 0 ? CHIP_ROW_GAP_PX : 0);
      const isLast = i === chipEls.length - 1;
      const reserve = isLast ? 0 : CHIP_ROW_GAP_PX + badgeWidth;
      if (usedWidth + chipWidth + reserve > containerWidth) {
        visible = i;
        break;
      }
      usedWidth += chipWidth;
    }
    setStyleInlineVisibleCount(visible);
  }, [inlineChips, activeStyleTab]);

  const visibleStyleInlineChips = inlineChips.slice(0, styleInlineVisibleCount);
  const hiddenStyleInlineCount = inlineChips.length - visibleStyleInlineChips.length;

  // ---- Example: real open/close + search-filter behavior ----
  const [exampleOpen, setExampleOpen] = useState(false);
  const [exampleQuery, setExampleQuery] = useState('');
  const [exampleSelected, setExampleSelected] = useState<string | null>(null);
  const filteredExampleOptions = EXAMPLE_OPTIONS.filter((option) =>
    option.toLowerCase().includes(exampleQuery.trim().toLowerCase())
  );
  const toggleExampleOpen = () =>
    setExampleOpen((open) => {
      if (open) setExampleQuery('');
      return !open;
    });
  const selectExampleOption = (label: string) => {
    setExampleSelected(label);
    setExampleOpen(false);
    setExampleQuery('');
  };

  // ---- Example: Single-select — "Badge" (Chip-style color swatch) trigger + dropdown ----
  const [badgeExampleOpen, setBadgeExampleOpen] = useState(false);
  const [badgeExampleSelected, setBadgeExampleSelected] = useState('Orange');
  const badgeExampleColor =
    BADGE_EXAMPLE_OPTIONS.find((option) => option.label === badgeExampleSelected)?.color ?? 'orange';
  const toggleBadgeExampleOpen = () => setBadgeExampleOpen((open) => !open);
  const selectBadgeExampleOption = (label: string) => {
    setBadgeExampleSelected(label);
    setBadgeExampleOpen(false);
  };

  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Single-select');

  // ---- Example: Multi-select — Chip (in-line) trigger + Multi-select dropdown ----
  const [inlineExampleOpen, setInlineExampleOpen] = useState(false);
  const [inlineExampleSelected, setInlineExampleSelected] = useState(['Design', 'Engineering']);
  const toggleInlineExampleOption = (label: string) =>
    setInlineExampleSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  const toggleAllInlineExampleOptions = () =>
    setInlineExampleSelected((prev) =>
      prev.length === MULTI_CHIP_LABELS.length ? [] : [...MULTI_CHIP_LABELS]
    );

  // Real overflow detection: an off-screen row renders every selected chip at its
  // truncated width so we can measure actual pixel widths, then the visible row only
  // shows however many fit before the container's edge, collapsing the rest into a
  // trailing "+N" count chip.
  const inlineRowRef = useRef<HTMLDivElement>(null);
  const inlineMeasureRef = useRef<HTMLDivElement>(null);
  const [inlineVisibleCount, setInlineVisibleCount] = useState(inlineExampleSelected.length);

  useLayoutEffect(() => {
    const visibleRow = inlineRowRef.current;
    const measureRow = inlineMeasureRef.current;
    if (!visibleRow || !measureRow) return;

    const containerWidth = visibleRow.clientWidth;
    const children = Array.from(measureRow.children) as HTMLElement[];
    const badgeEl = children[children.length - 1];
    const chipEls = children.slice(0, -1);
    const badgeWidth = badgeEl?.offsetWidth ?? 0;

    let usedWidth = 0;
    let visible = chipEls.length;
    for (let i = 0; i < chipEls.length; i++) {
      const chipWidth = chipEls[i].offsetWidth + (i > 0 ? CHIP_ROW_GAP_PX : 0);
      const isLast = i === chipEls.length - 1;
      const reserve = isLast ? 0 : CHIP_ROW_GAP_PX + badgeWidth;
      if (usedWidth + chipWidth + reserve > containerWidth) {
        visible = i;
        break;
      }
      usedWidth += chipWidth;
    }
    setInlineVisibleCount(visible);
  }, [inlineExampleSelected, activeExampleTab]);

  const visibleInlineExampleChips = inlineExampleSelected.slice(0, inlineVisibleCount);
  const hiddenInlineExampleCount = inlineExampleSelected.length - visibleInlineExampleChips.length;

  // ---- Example: Multi-select — Chip (wrap) trigger + Multi-select dropdown ----
  const [wrapExampleOpen, setWrapExampleOpen] = useState(false);
  const [wrapExampleSelected, setWrapExampleSelected] = useState([
    'Design',
    'Engineering',
    'Product',
    'Marketing',
  ]);
  const toggleWrapExampleOption = (label: string) =>
    setWrapExampleSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  const toggleAllWrapExampleOptions = () =>
    setWrapExampleSelected((prev) =>
      prev.length === MULTI_CHIP_LABELS.length ? [] : [...MULTI_CHIP_LABELS]
    );

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Select</h1>
        <p className="ds-doc__lede">
          A Select is a form-field trigger that opens a choice panel. It shows a label or
          placeholder when empty, can display chosen values as removable chips, and always ends
          in a trailing chevron.
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
          Use a Select wherever a user needs to open a panel to pick one or more values from a
          list. It pairs with a Dropdown panel (see Related Components) for the actual choices; the
          Select itself only renders the closed-state trigger.
        </p>
        <div className="ds-preview">
          <div style={{ width: 320 }}>
            <Select placeholder="Please select" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A Select is a bordered container holding either placeholder/label text or a set of
          value chips, and a trailing chevron that signals the attached panel.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-select ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
              style={{ width: 320 }}
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-select__content ds-anatomy__part-relative">
                <span className="ds-select__placeholder">Please select</span>
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </span>
              <span className="ds-select__chevron ds-anatomy__part-relative" aria-hidden="true">
                <ChevronDownIcon />
                <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>border, radius, background respond to hover / focus / error / disabled</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Content</strong> —{' '}
                  <span>placeholder or label text, or a row of removable value chips</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Chevron</strong> — <span>signals the attached Dropdown panel</span>
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
          A Select shows placeholder text when empty; once a value is chosen it displays as a
          solid label. For a field that holds several removable values, see Input.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Select variant groups">
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
                  <Select label="Label" />
                </div>
              </div>
              <span className="ds-variant-note">
                Filled state for a single chosen value; label color reads as solid text rather
                than the lighter placeholder tone.
              </span>
            </div>
          )}

          {activeStyleTab === 'Chip' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div className="ds-select" style={{ width: 320 }}>
                  <div className="ds-select__content" style={{ gap: 'var(--space-component-gap-sm)' }}>
                    <Badge size="lg" color="orange" />
                    <span className="ds-select__label">Orange</span>
                  </div>
                  <span className="ds-select__chevron" aria-hidden="true">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>
              <span className="ds-variant-note">
                Pairs the chosen value with a color dot, useful when the option set itself
                carries a color or status meaning.
              </span>
            </div>
          )}

          {activeStyleTab === 'Chip (in-line)' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div className="ds-select" style={{ width: 320 }}>
                  <div className="ds-select__content">
                    {visibleStyleInlineChips.length > 0 ? (
                      <div
                        ref={styleInlineRowRef}
                        className="ds-select__chips"
                        style={{ flex: '1 1 0%', minWidth: 0, flexWrap: 'nowrap', overflow: 'hidden' }}
                      >
                        {visibleStyleInlineChips.map((label) => (
                          <InputChip
                            key={label}
                            label={label}
                            title={label}
                            size="sm"
                            className="ds-chip--truncate"
                            onRemove={() => removeInlineChip(label)}
                          />
                        ))}
                        {hiddenStyleInlineCount > 0 && (
                          <span
                            className="ds-chip ds-chip--input ds-chip--sm"
                            style={{ flexShrink: 0, cursor: 'default' }}
                          >
                            <span className="ds-chip__label">+{hiddenStyleInlineCount}</span>
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
                  ref={styleInlineMeasureRef}
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
                  {inlineChips.map((label) => (
                    <InputChip key={label} label={label} size="sm" className="ds-chip--truncate" />
                  ))}
                  <span className="ds-chip ds-chip--input ds-chip--sm" style={{ flexShrink: 0 }}>
                    <span className="ds-chip__label">+{inlineChips.length}</span>
                  </span>
                </div>
              </div>
              <span className="ds-variant-note">
                Chips stay on a single, non-wrapping line: long labels truncate, and once the
                row is full, remaining values collapse into a count.
              </span>
            </div>
          )}

          {activeStyleTab === 'Chip (wrap)' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div
                  className="ds-select"
                  style={{ width: 320, height: 'auto', paddingBlock: 'var(--space-component-padding-sm)' }}
                >
                  <div className="ds-select__content">
                    <div
                      className="ds-select__chips"
                      style={{ flex: '1 1 0%', minWidth: 0, flexWrap: 'wrap' }}
                    >
                      {wrapChips.map((label) => (
                        <InputChip key={label} label={label} size="sm" onRemove={() => removeWrapChip(label)} />
                      ))}
                    </div>
                  </div>
                  <span className="ds-select__chevron" aria-hidden="true">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>
              <span className="ds-variant-note">
                Chips wrap onto additional lines as needed, growing the field's height instead
                of truncating or collapsing overflow.
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
                  <Select placeholder="Please select" size="lg" />
                </div>
                <span className="ds-variant-row__cell-label">Lg · 40px</span>
              </div>
              <div className="ds-variant-row__cell">
                <div style={{ width: 240 }}>
                  <Select placeholder="Please select" size="md" />
                </div>
                <span className="ds-variant-row__cell-label">Md · 32px</span>
              </div>
              <div className="ds-variant-row__cell">
                <div style={{ width: 240 }}>
                  <Select placeholder="Please select" size="sm" />
                </div>
                <span className="ds-variant-row__cell-label">Sm · 24px</span>
              </div>
            </div>
          </div>
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            A Single-select trigger opens a searchable Dropdown panel and closes as soon as a value
            is picked. A Multi-select trigger opens a checkbox panel that stays open across picks,
            so several values can be chosen before Apply commits them.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Select example groups">
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

          {activeExampleTab === 'Single-select' && (
            <div className="ds-variant-group" style={{ marginTop: 'var(--space-component-gap-md)' }}>
              <div className="ds-preview ds-preview--stack">
                <div className="ds-combo-figure" style={{ width: 320 }}>
                  <span className="ds-variant-row__cell-label">Label</span>
                  {exampleOpen ? (
                    <div className="ds-select-trigger">
                      <input
                        className="ds-select-trigger__input"
                        type="text"
                        placeholder="Please select"
                        value={exampleQuery}
                        onChange={(e) => setExampleQuery(e.target.value)}
                        autoFocus
                      />
                      <span
                        className="icon"
                        aria-hidden="true"
                        onClick={toggleExampleOpen}
                        style={{ cursor: 'pointer' }}
                      >
                        search
                      </span>
                    </div>
                  ) : (
                    <Select
                      label={exampleSelected ?? undefined}
                      placeholder="Please select"
                      size="md"
                      onClick={toggleExampleOpen}
                    />
                  )}
                  {exampleOpen && (
                    <div className="ds-dropdown ds-dropdown--lg" style={{ width: '100%' }}>
                      <div className="ds-dropdown__panel">
                        <div className="ds-dropdown__options">
                          {filteredExampleOptions.length > 0 ? (
                            filteredExampleOptions.map((label) => (
                              <DropdownOption
                                key={label}
                                label={label}
                                style="single"
                                state={exampleSelected === label ? 'selected' : 'default'}
                                onClick={() => selectExampleOption(label)}
                              />
                            ))
                          ) : (
                            <div className="ds-dropdown__empty">No results</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="ds-combo-figure" style={{ width: 320 }}>
                  <span className="ds-variant-row__cell-label">Badge</span>
                  <div
                    className={`ds-select ds-select--md${
                      badgeExampleOpen ? ' ds-select--force-focus' : ''
                    }`}
                    onClick={toggleBadgeExampleOpen}
                  >
                    <div className="ds-select__content" style={{ gap: 'var(--space-component-gap-sm)' }}>
                      <Badge size="lg" color={badgeExampleColor} />
                      <span className="ds-select__label">{badgeExampleSelected}</span>
                    </div>
                    <span className="ds-select__chevron" aria-hidden="true">
                      <ChevronDownIcon />
                    </span>
                  </div>
                  {badgeExampleOpen && (
                    <div className="ds-dropdown ds-dropdown--lg" style={{ width: '100%' }}>
                      <div className="ds-dropdown__panel">
                        <div className="ds-dropdown__options">
                          {BADGE_EXAMPLE_OPTIONS.map(({ label, color }) => (
                            <div
                              key={label}
                              className={`ds-dropdown-option ds-dropdown-option--single${
                                badgeExampleSelected === label ? ' ds-dropdown-option--selected' : ''
                              }`}
                              role="option"
                              aria-selected={badgeExampleSelected === label}
                              onClick={() => selectBadgeExampleOption(label)}
                            >
                              <span className="ds-dropdown-option__badge" aria-hidden="true">
                                <Badge size="lg" color={color} />
                              </span>
                              <span className="ds-dropdown-option__label">{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeExampleTab === 'Multi-select' && (
            <div
              className="ds-variant-row"
              style={{ marginTop: 'var(--space-component-gap-md)', alignItems: 'flex-start' }}
            >
              <div className="ds-variant-row__cell">
                <div className="ds-combo-figure" style={{ width: 320 }}>
                  <div
                    className="ds-select"
                    style={{ width: 320 }}
                    onClick={() => setInlineExampleOpen((open) => !open)}
                  >
                    <div className="ds-select__content">
                      {visibleInlineExampleChips.length > 0 ? (
                        <div
                          ref={inlineRowRef}
                          className="ds-select__chips"
                          style={{ flex: '1 1 0%', minWidth: 0, flexWrap: 'nowrap', overflow: 'hidden' }}
                        >
                          {visibleInlineExampleChips.map((label) => (
                            <InputChip
                              key={label}
                              label={label}
                              title={label}
                              size="sm"
                              className="ds-chip--truncate"
                              onRemove={() => toggleInlineExampleOption(label)}
                            />
                          ))}
                          {hiddenInlineExampleCount > 0 && (
                            <span
                              className="ds-chip ds-chip--input ds-chip--sm"
                              style={{ flexShrink: 0, cursor: 'default' }}
                            >
                              <span className="ds-chip__label">+{hiddenInlineExampleCount}</span>
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
                    ref={inlineMeasureRef}
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
                    {inlineExampleSelected.map((label) => (
                      <InputChip key={label} label={label} size="sm" className="ds-chip--truncate" />
                    ))}
                    <span className="ds-chip ds-chip--input ds-chip--sm" style={{ flexShrink: 0 }}>
                      <span className="ds-chip__label">+{inlineExampleSelected.length}</span>
                    </span>
                  </div>
                  {inlineExampleOpen && (
                    <div className="ds-dropdown ds-dropdown--lg" style={{ width: '100%' }}>
                      <div className="ds-dropdown__panel">
                        <div className="ds-dropdown__options">
                          <DropdownOption
                            label="Select All"
                            style="multi"
                            state={
                              inlineExampleSelected.length === MULTI_CHIP_LABELS.length
                                ? 'selected'
                                : 'default'
                            }
                            indeterminate={
                              inlineExampleSelected.length > 0 &&
                              inlineExampleSelected.length < MULTI_CHIP_LABELS.length
                            }
                            onClick={toggleAllInlineExampleOptions}
                          />
                          {MULTI_CHIP_LABELS.map((label) => (
                            <DropdownOption
                              key={label}
                              label={label}
                              style="multi"
                              state={inlineExampleSelected.includes(label) ? 'selected' : 'default'}
                              onClick={() => toggleInlineExampleOption(label)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="ds-dropdown__footer">
                        <Button
                          variant="primary"
                          appearance="ghost"
                          size="sm"
                          onClick={() => setInlineExampleSelected([])}
                        >
                          Reset
                        </Button>
                        <Button
                          variant="primary"
                          appearance="solid"
                          size="sm"
                          onClick={() => setInlineExampleOpen(false)}
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
                    onClick={() => setWrapExampleOpen((open) => !open)}
                  >
                    <div className="ds-select__content">
                      {wrapExampleSelected.length > 0 ? (
                        <div
                          className="ds-select__chips"
                          style={{ flex: '1 1 0%', minWidth: 0, flexWrap: 'wrap' }}
                        >
                          {wrapExampleSelected.map((label) => (
                            <InputChip
                              key={label}
                              label={label}
                              size="sm"
                              onRemove={() => toggleWrapExampleOption(label)}
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
                  {wrapExampleOpen && (
                    <div className="ds-dropdown ds-dropdown--lg" style={{ width: '100%' }}>
                      <div className="ds-dropdown__panel">
                        <div className="ds-dropdown__options">
                          <DropdownOption
                            label="Select All"
                            style="multi"
                            state={
                              wrapExampleSelected.length === MULTI_CHIP_LABELS.length
                                ? 'selected'
                                : 'default'
                            }
                            indeterminate={
                              wrapExampleSelected.length > 0 &&
                              wrapExampleSelected.length < MULTI_CHIP_LABELS.length
                            }
                            onClick={toggleAllWrapExampleOptions}
                          />
                          {MULTI_CHIP_LABELS.map((label) => (
                            <DropdownOption
                              key={label}
                              label={label}
                              style="multi"
                              state={wrapExampleSelected.includes(label) ? 'selected' : 'default'}
                              onClick={() => toggleWrapExampleOption(label)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="ds-dropdown__footer">
                        <Button
                          variant="primary"
                          appearance="ghost"
                          size="sm"
                          onClick={() => setWrapExampleSelected([])}
                        >
                          Reset
                        </Button>
                        <Button
                          variant="primary"
                          appearance="solid"
                          size="sm"
                          onClick={() => setWrapExampleOpen(false)}
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
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Error replaces the border color to flag an invalid selection; Disabled dims the surface
          and blocks interaction entirely.
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
                  <Select placeholder="Please select" size="md" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-default)' }} />
                  <code>interactive-select-border-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td>
                <div style={{ width: 240 }}>
                  <Select placeholder="Please select" size="md" state="hover" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-hover)' }} />
                  <code>interactive-select-border-hover</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Focus</td>
              <td>
                <div style={{ width: 240 }}>
                  <Select placeholder="Please select" size="md" state="focus" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-focus)' }} />
                  <code>interactive-select-border-focus (+ ring)</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Error</td>
              <td>
                <div style={{ width: 240 }}>
                  <Select placeholder="Please select" size="md" state="error" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-error)' }} />
                  <code>interactive-select-border-error</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td>
                <div style={{ width: 240 }}>
                  <Select placeholder="Please select" size="md" state="disabled" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-disabled)' }} />
                  <code>interactive-select-border-disabled</code>
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
          A Select fills its container's width; only height and internal gap change between
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
                  <code>--component-height-lg / -md / -xs</code>
                  <span className="ds-tag">40 / 32 / 24px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Padding</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-md</code>
                  <span className="ds-tag">12px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Content / chevron gap</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-xs</code>
                  <span className="ds-tag">4px</span>
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
        <p className="ds-section__desc">Components that commonly appear alongside Select.</p>
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
        </div>
      </section>
    </div>
  );
}
