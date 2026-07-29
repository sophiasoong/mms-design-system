import { useRef, useState } from 'react';
import type { UIEvent } from 'react';
import Dropdown, { DropdownOption, ExpanderOption } from './Dropdown';
import Button from './Button';
import { ButtonIcon } from './icons';
import './ButtonDoc.css';

function syncScrollbarThumb(scrollEl: HTMLDivElement, thumb: HTMLDivElement | null) {
  if (!thumb) return;
  const track = thumb.parentElement;
  if (!track) return;
  const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
  const maxThumbOffset = track.clientHeight - thumb.clientHeight;
  const ratio = maxScroll > 0 ? scrollEl.scrollTop / maxScroll : 0;
  thumb.style.transform = `translateY(${ratio * maxThumbOffset}px)`;
}

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=577-17134';

const VARIANT_TABS = ['Single-select', 'Multi-select', 'Expander', 'Cascader'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const STATE_TABS = ['Single-select', 'Multi-select', 'Expander', 'Cascader'] as const;
type StateTab = (typeof STATE_TABS)[number];

const CASCADER_OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const CASCADER_CHILDREN: Record<string, string[]> = {
  'Option 1': ['Option 1.1', 'Option 1.2', 'Option 1.3'],
  'Option 2': ['Option 2.1', 'Option 2.2'],
  'Option 3': ['Option 3.1', 'Option 3.2', 'Option 3.3', 'Option 3.4'],
  'Option 4': ['Option 4.1'],
  'Option 5': ['Option 5.1', 'Option 5.2'],
};

const SAMPLE_OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
const FIFTEEN_OPTIONS = Array.from({ length: 15 }, (_, i) => `Option ${i + 1}`);

const EXPANDER_BRANCH_LEAVES: Record<string, string[]> = {
  'Category A': ['Item A1a', 'Item A1b', 'Item A2a', 'Item A2b', 'Subcategory A3'],
  'Subcategory A1': ['Item A1a', 'Item A1b'],
  'Subcategory A2': ['Item A2a', 'Item A2b'],
  'Category B': ['Item B1a', 'Item B1b'],
};

interface DropdownDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function DropdownDoc({ onNavigate }: DropdownDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Single-select');
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Single-select');

  // ---- Example > Dropdown set: scrollbar thumb tracks real scroll position ----
  const filterChipThumbRef = useRef<HTMLDivElement>(null);
  const selectThumbRef = useRef<HTMLDivElement>(null);

  // ---- Variants > Style: interactive demo state ----
  const [singleSelected, setSingleSelected] = useState(2);

  const [multiSelected, setMultiSelected] = useState<number[]>([0, 2]);
  const toggleMultiSelected = (i: number) =>
    setMultiSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const [badgePanelSelected, setBadgePanelSelected] = useState<Set<number>>(new Set([1]));
  const toggleBadgePanelSelected = (i: number) =>
    setBadgePanelSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const [captionPanelSelected, setCaptionPanelSelected] = useState<Set<number>>(new Set());
  const toggleCaptionPanelSelected = (i: number) =>
    setCaptionPanelSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const [expanderExpanded, setExpanderExpanded] = useState<Record<string, boolean>>({
    'Category A': true,
    'Subcategory A1': true,
    'Subcategory A2': false,
    'Category B': false,
  });
  const [expanderSelected, setExpanderSelected] = useState<Set<string>>(new Set(['Item A1a']));
  const toggleExpander = (label: string) =>
    setExpanderExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  const toggleExpanderSelected = (label: string) =>
    setExpanderSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  const toggleExpanderBranchSelected = (branchLabel: string) => {
    const leaves = EXPANDER_BRANCH_LEAVES[branchLabel];
    setExpanderSelected((prev) => {
      const allSelected = leaves.every((l) => prev.has(l));
      const next = new Set(prev);
      leaves.forEach((l) => (allSelected ? next.delete(l) : next.add(l)));
      return next;
    });
  };
  const isExpanderBranchSelected = (branchLabel: string) =>
    EXPANDER_BRANCH_LEAVES[branchLabel].every((l) => expanderSelected.has(l));

  const [cascaderOpenL1, setCascaderOpenL1] = useState<string | null>('Option 2');
  const [cascaderSelectedL1, setCascaderSelectedL1] = useState<Set<string>>(new Set(['Option 2']));
  const [cascaderSelectedL2, setCascaderSelectedL2] = useState<Set<string>>(new Set());
  const toggleCascaderL1 = (label: string) =>
    setCascaderSelectedL1((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  const toggleCascaderL2 = (label: string) =>
    setCascaderSelectedL2((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Dropdown</h1>
        <p className="ds-doc__lede">
          A Dropdown presents a list of options in a floating panel. Use Single-select when only
          one option can be chosen at a time, and Multi-select — with checkboxes and a Reset /
          Apply footer — when several options can be chosen together.
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
          The default Dropdown is a Single-select panel: one option is selected at a time, and
          picking a new option closes the panel immediately — there is no footer.
        </p>
        <div className="ds-preview">
          <Dropdown style="single" options={SAMPLE_OPTIONS} selectedIndices={[1]} showFooter={false} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A dropdown panel is a floating surface holding a scrollable list of options, plus an
          optional footer for Multi-select confirmation.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-dropdown ds-dropdown--sm ds-anatomy__demo ds-anatomy__part-relative"
              role="listbox"
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <div className="ds-dropdown__options">
                <div className="ds-dropdown-option ds-dropdown-option--multi ds-dropdown-option--selected">
                  <span className="ds-checkbox ds-checkbox--checked ds-anatomy__part-relative" aria-hidden="true">
                    <span className="ds-checkbox__box">
                      <span className="icon" aria-hidden="true">
                        check
                      </span>
                    </span>
                    <span className="ds-anatomy__badge ds-anatomy__badge--side-left">3</span>
                  </span>
                  <span className="ds-dropdown-option__label">Label one</span>
                </div>
                <div className="ds-dropdown-option ds-dropdown-option--multi ds-anatomy__part-relative">
                  <span className="ds-checkbox" aria-hidden="true">
                    <span className="ds-checkbox__box" />
                  </span>
                  <span className="ds-dropdown-option__label">Label two</span>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">2</span>
                </div>
                <div className="ds-dropdown-option ds-dropdown-option--multi">
                  <span className="ds-checkbox" aria-hidden="true">
                    <span className="ds-checkbox__box" />
                  </span>
                  <span className="ds-dropdown-option__label">Label three</span>
                </div>
              </div>
              <div className="ds-dropdown__footer">
                <button type="button" className="ds-button ds-button--primary ds-button--ghost ds-button--sm" tabIndex={-1}>
                  <span className="ds-button__label">Reset</span>
                </button>
                <button type="button" className="ds-button ds-button--primary ds-button--solid ds-button--sm" tabIndex={-1}>
                  <span className="ds-button__label">Apply</span>
                </button>
                <span className="ds-anatomy__badge">4</span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Panel</strong> —{' '}
                  <span>surface, radius, drop shadow (--interactive-dropdown-panel-surface-default)</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Option row</strong> —{' '}
                  <span>fixed height, label; surface responds to hover / selected / disabled</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Checkbox</strong> — <span>Multi-select only, reflects selection</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Footer</strong> — <span>Reset (ghost) / Apply (solid) actions, Multi-select only</span>
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
          Style controls selection behavior: Single-select highlights one option and needs no
          confirmation; Multi-select shows a checkbox per option and requires Apply to confirm.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Dropdown variant groups">
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
          {activeVariantTab === 'Single-select' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <Dropdown
                  style="single"
                  options={SAMPLE_OPTIONS}
                  selectedIndices={[singleSelected]}
                  showFooter={false}
                  onOptionClick={setSingleSelected}
                />
              </div>
              <span className="ds-variant-note">
                No footer — selecting an option applies it immediately and closes the panel.
              </span>
            </div>
          )}

          {activeVariantTab === 'Multi-select' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--stack">
                <div className="ds-variant-row__cell">
                  <Dropdown
                    style="multi"
                    options={SAMPLE_OPTIONS}
                    selectedIndices={multiSelected}
                    onOptionClick={toggleMultiSelected}
                    showFooter={false}
                  />
                  <span className="ds-variant-row__cell-label">Default</span>
                </div>
                <div className="ds-variant-row__cell">
                  <div className="ds-dropdown ds-dropdown--sm">
                    <div className="ds-dropdown__options">
                      <DropdownOption
                        label="Red"
                        style="multi"
                        showBadge
                        badgeColor="red"
                        state={badgePanelSelected.has(0) ? 'selected' : 'default'}
                        onClick={() => toggleBadgePanelSelected(0)}
                      />
                      <DropdownOption
                        label="Yellow"
                        style="multi"
                        showBadge
                        badgeColor="yellow"
                        state={badgePanelSelected.has(1) ? 'selected' : 'default'}
                        onClick={() => toggleBadgePanelSelected(1)}
                      />
                      <DropdownOption
                        label="Blue"
                        style="multi"
                        showBadge
                        badgeColor="blue"
                        state={badgePanelSelected.has(2) ? 'selected' : 'default'}
                        onClick={() => toggleBadgePanelSelected(2)}
                      />
                    </div>
                  </div>
                  <span className="ds-variant-row__cell-label">Badge</span>
                </div>
                <div className="ds-variant-row__cell">
                  <div className="ds-dropdown ds-dropdown--sm">
                    <div className="ds-dropdown__options">
                      <ExpanderOption
                        label="Option 1"
                        caption={`${captionPanelSelected.size}/3`}
                        state={captionPanelSelected.has(0) ? 'selected' : 'default'}
                        onClick={() => toggleCaptionPanelSelected(0)}
                      />
                      <ExpanderOption
                        label="Option 2"
                        caption={`${captionPanelSelected.size}/3`}
                        state={captionPanelSelected.has(1) ? 'selected' : 'default'}
                        onClick={() => toggleCaptionPanelSelected(1)}
                      />
                      <ExpanderOption
                        label="Option 3"
                        caption={`${captionPanelSelected.size}/3`}
                        state={captionPanelSelected.has(2) ? 'selected' : 'default'}
                        onClick={() => toggleCaptionPanelSelected(2)}
                      />
                    </div>
                  </div>
                  <span className="ds-variant-row__cell-label">Caption</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Selecting an option toggles its checkbox immediately — no footer or confirmation
                step. Badge flags an item (e.g. unread); Caption adds trailing metadata (e.g. a
                count).
              </span>
            </div>
          )}

          {activeVariantTab === 'Expander' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div className="ds-dropdown ds-dropdown--compact">
                  <div className="ds-dropdown__options">
                    <ExpanderOption
                      label="Category A"
                      level={0}
                      expandState={expanderExpanded['Category A'] ? 'expanded' : 'collapsed'}
                      state={isExpanderBranchSelected('Category A') ? 'selected' : 'default'}
                      onClick={() => toggleExpanderBranchSelected('Category A')}
                      onExpandClick={() => toggleExpander('Category A')}
                    />
                    {expanderExpanded['Category A'] && (
                      <>
                        <ExpanderOption
                          label="Subcategory A1"
                          level={1}
                          expandState={expanderExpanded['Subcategory A1'] ? 'expanded' : 'collapsed'}
                          state={isExpanderBranchSelected('Subcategory A1') ? 'selected' : 'default'}
                          onClick={() => toggleExpanderBranchSelected('Subcategory A1')}
                          onExpandClick={() => toggleExpander('Subcategory A1')}
                        />
                        {expanderExpanded['Subcategory A1'] && (
                          <>
                            <ExpanderOption
                              label="Item A1a"
                              level={3}
                              state={expanderSelected.has('Item A1a') ? 'selected' : 'default'}
                              onClick={() => toggleExpanderSelected('Item A1a')}
                            />
                            <ExpanderOption
                              label="Item A1b"
                              level={3}
                              state={expanderSelected.has('Item A1b') ? 'selected' : 'default'}
                              onClick={() => toggleExpanderSelected('Item A1b')}
                            />
                          </>
                        )}
                        <ExpanderOption
                          label="Subcategory A2"
                          level={1}
                          expandState={expanderExpanded['Subcategory A2'] ? 'expanded' : 'collapsed'}
                          state={isExpanderBranchSelected('Subcategory A2') ? 'selected' : 'default'}
                          onClick={() => toggleExpanderBranchSelected('Subcategory A2')}
                          onExpandClick={() => toggleExpander('Subcategory A2')}
                        />
                        {expanderExpanded['Subcategory A2'] && (
                          <>
                            <ExpanderOption
                              label="Item A2a"
                              level={3}
                              state={expanderSelected.has('Item A2a') ? 'selected' : 'default'}
                              onClick={() => toggleExpanderSelected('Item A2a')}
                            />
                            <ExpanderOption
                              label="Item A2b"
                              level={3}
                              state={expanderSelected.has('Item A2b') ? 'selected' : 'default'}
                              onClick={() => toggleExpanderSelected('Item A2b')}
                            />
                          </>
                        )}
                        <ExpanderOption
                          label="Subcategory A3"
                          level={2}
                          state={expanderSelected.has('Subcategory A3') ? 'selected' : 'default'}
                          onClick={() => toggleExpanderSelected('Subcategory A3')}
                        />
                      </>
                    )}
                    <ExpanderOption
                      label="Category B"
                      level={0}
                      expandState={expanderExpanded['Category B'] ? 'expanded' : 'collapsed'}
                      state={isExpanderBranchSelected('Category B') ? 'selected' : 'default'}
                      onClick={() => toggleExpanderBranchSelected('Category B')}
                      onExpandClick={() => toggleExpander('Category B')}
                    />
                    {expanderExpanded['Category B'] && (
                      <>
                        <ExpanderOption
                          label="Item B1a"
                          level={2}
                          state={expanderSelected.has('Item B1a') ? 'selected' : 'default'}
                          onClick={() => toggleExpanderSelected('Item B1a')}
                        />
                        <ExpanderOption
                          label="Item B1b"
                          level={2}
                          state={expanderSelected.has('Item B1b') ? 'selected' : 'default'}
                          onClick={() => toggleExpanderSelected('Item B1b')}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <span className="ds-variant-note">
                Nested options indent per level; a chevron toggles a branch's children, and any
                number of leaf rows can be checked at once.
              </span>
            </div>
          )}

          {activeVariantTab === 'Cascader' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div className="ds-cascader">
                  <div className="ds-cascader__column">
                    {CASCADER_OPTIONS.map((label) => (
                      <DropdownOption
                        key={label}
                        label={label}
                        style="cascader"
                        trailingIcon="chevron_right"
                        state={cascaderSelectedL1.has(label) ? 'selected' : 'default'}
                        onClick={() => {
                          toggleCascaderL1(label);
                          setCascaderOpenL1(label);
                        }}
                      />
                    ))}
                  </div>
                  {cascaderOpenL1 && (
                    <div className="ds-cascader__column">
                      {CASCADER_CHILDREN[cascaderOpenL1].map((label) => (
                        <DropdownOption
                          key={label}
                          label={label}
                          style="multi"
                          state={cascaderSelectedL2.has(label) ? 'selected' : 'default'}
                          onClick={() => toggleCascaderL2(label)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <span className="ds-variant-note">
                Each option drills into a second column of choices to the right; both columns are
                multi-select, so options in either column can stay checked as you browse between
                branches — see States for a static reference of both columns open.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Width</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Dropdown style="single" options={SAMPLE_OPTIONS.slice(0, 3)} showFooter={false} width="sm" />
                <span className="ds-variant-row__cell-label">sm · 280px</span>
              </div>
              <div className="ds-variant-row__cell">
                <Dropdown style="single" options={SAMPLE_OPTIONS.slice(0, 3)} showFooter={false} width="lg" />
                <span className="ds-variant-row__cell-label">lg · 320px</span>
              </div>
            </div>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Example</span>

            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <div className="ds-combo-figure">
                  <button type="button" className="ds-filter-chip">
                    <span>Label</span>
                    <span className="icon" aria-hidden="true">
                      keyboard_arrow_down
                    </span>
                  </button>
                  <div className="ds-dropdown ds-dropdown--sm">
                    <div className="ds-dropdown__searchbar-row">
                      <div className="ds-dropdown__searchbar">
                        <span className="icon" aria-hidden="true">
                          search
                        </span>
                        <span className="ds-dropdown__searchbar-placeholder">Search in filters</span>
                      </div>
                    </div>
                    <div className="ds-dropdown__panel">
                      <div
                        className="ds-dropdown__options ds-dropdown__options--scroll"
                        onScroll={(e: UIEvent<HTMLDivElement>) =>
                          syncScrollbarThumb(e.currentTarget, filterChipThumbRef.current)
                        }
                      >
                        {FIFTEEN_OPTIONS.map((label) => (
                          <DropdownOption key={label} label={label} style="single" />
                        ))}
                      </div>
                      <div className="ds-dropdown__scrollbar" aria-hidden="true">
                        <div className="ds-dropdown__scrollbar-track">
                          <div className="ds-dropdown__scrollbar-thumb" ref={filterChipThumbRef} />
                        </div>
                      </div>
                    </div>
                    <div className="ds-dropdown__footer">
                      <Button variant="primary" appearance="ghost" size="sm">
                        Reset
                      </Button>
                      <Button variant="primary" appearance="solid" size="sm">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-row__cell-label">Filter-chip</span>
              </div>
              <div className="ds-variant-row__cell">
                <div className="ds-combo-figure">
                  <div className="ds-select-trigger">
                    <span className="ds-select-trigger__placeholder">Please select</span>
                    <span className="icon" aria-hidden="true">
                      search
                    </span>
                  </div>
                  <div className="ds-dropdown ds-dropdown--sm">
                    <div className="ds-dropdown__panel">
                      <div
                        className="ds-dropdown__options ds-dropdown__options--scroll"
                        onScroll={(e: UIEvent<HTMLDivElement>) =>
                          syncScrollbarThumb(e.currentTarget, selectThumbRef.current)
                        }
                      >
                        {FIFTEEN_OPTIONS.map((label) => (
                          <DropdownOption key={label} label={label} style="single" />
                        ))}
                      </div>
                      <div className="ds-dropdown__scrollbar" aria-hidden="true">
                        <div className="ds-dropdown__scrollbar-track">
                          <div className="ds-dropdown__scrollbar-thumb" ref={selectThumbRef} />
                        </div>
                      </div>
                    </div>
                    <div className="ds-dropdown__footer">
                      <Button variant="primary" appearance="ghost" size="sm" leadingIcon="add">
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-row__cell-label">Select</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Every option row defines default, hover, selected, and disabled states. Hover is
          statically forced below for documentation purposes.
        </p>
        <div className="ds-line-tabs ds-line-tabs--no-label" role="tablist" aria-label="Dropdown state groups">
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
          {activeStateTab === 'Single-select' && (
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
                      <DropdownOption label="Option" style="single" state="default" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-dropdown-option-surface-default)' }}
                        />
                        <code>interactive-dropdown-option-surface-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <DropdownOption label="Option" style="single" state="default" forceHover />
                    </td>
                    <td>
                      {/* interactive-dropdown-option-surface-hover is unaliased to raw MMS
                          lavender in the source tokens; brand-primary-50 is what the CSS
                          actually renders (see Dropdown.css) and shifts correctly in MMA. */}
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-50)' }} />
                        <code>brand-primary-50</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Selected</td>
                    <td>
                      <DropdownOption label="Option" style="single" state="selected" />
                    </td>
                    <td>
                      {/* interactive-dropdown-option-surface-selected(-hover) are unaliased
                          to raw MMS lavender in the source tokens; brand-primary-75 is what
                          the CSS actually renders and shifts correctly in MMA. */}
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-75)' }} />
                        <code>brand-primary-75</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <DropdownOption label="Option" style="single" state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-dropdown-option-surface-disabled)' }}
                        />
                        <code>interactive-dropdown-option-surface-disabled</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Multi-select' && (
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
                      <DropdownOption label="Option" style="multi" state="default" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{ background: 'var(--interactive-dropdown-option-surface-default)' }}
                        />
                        <code>interactive-dropdown-option-surface-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <DropdownOption label="Option" style="multi" state="default" forceHover />
                    </td>
                    <td>
                      {/* interactive-dropdown-option-surface-hover is unaliased to raw MMS
                          lavender in the source tokens; brand-primary-50 is what the CSS
                          actually renders (see Dropdown.css) and shifts correctly in MMA. */}
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-50)' }} />
                        <code>brand-primary-50</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Selected</td>
                    <td>
                      <DropdownOption label="Option" style="multi" state="selected" />
                    </td>
                    <td>
                      {/* interactive-checkbox-surface-checked is unaliased to raw MMS indigo
                          in the source tokens; brand-primary-400 is what the CSS actually
                          renders and shifts correctly in MMA. */}
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                        <code>brand-primary-400</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <DropdownOption label="Option" style="multi" state="disabled" />
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

          {activeStateTab === 'Expander' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <div className="ds-dropdown ds-dropdown--compact">
                    <div className="ds-dropdown__options">
                      <ExpanderOption label="Category A" level={0} expandState="collapsed" />
                      <ExpanderOption label="Category B" level={0} expandState="collapsed" />
                      <ExpanderOption label="Category C" level={0} expandState="collapsed" />
                    </div>
                  </div>
                  <span className="ds-variant-row__cell-label">Default — panel closed</span>
                </div>
                <div className="ds-variant-row__cell">
                  <div className="ds-dropdown ds-dropdown--compact">
                    <div className="ds-dropdown__options">
                      <ExpanderOption label="Category A" level={0} expandState="expanded" />
                      <ExpanderOption label="Subcategory A1" level={1} expandState="expanded" />
                      <ExpanderOption label="Item A1a" level={3} state="selected" />
                      <ExpanderOption label="Item A1b" level={3} />
                      <ExpanderOption label="Subcategory A2" level={1} expandState="collapsed" />
                      <ExpanderOption label="Category B" level={0} expandState="collapsed" />
                    </div>
                  </div>
                  <span className="ds-variant-row__cell-label">Open — branch expanded</span>
                </div>
              </div>
            </div>
          )}

          {activeStateTab === 'Cascader' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Dropdown style="cascader" options={CASCADER_OPTIONS} selectedIndices={[1]} />
                  <span className="ds-variant-row__cell-label">Default — single column</span>
                </div>
                <div className="ds-variant-row__cell">
                  <div className="ds-cascader">
                    {[0, 1, 2].map((column) => (
                      <div className="ds-cascader__column" key={column}>
                        {CASCADER_OPTIONS.map((label, i) => (
                          <DropdownOption
                            key={label}
                            label={label}
                            style="cascader"
                            state={column === 0 && i === 1 ? 'selected' : 'default'}
                            trailingIcon="chevron_right"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <span className="ds-variant-row__cell-label">Open — cascading columns</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Option rows stay a fixed height across styles; only horizontal padding changes to make
          room for the Multi-select checkbox.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Single-select</th>
              <th>Multi-select</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Option height</th>
              <td colSpan={2}>
                <div className="ds-table-cell">
                  <code>--component-height-md</code>
                  <span className="ds-tag">32px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Option padding</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-md</code>
                  <span className="ds-tag">12px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-sm</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Checkbox gap</th>
              <td colSpan={2}>
                <div className="ds-table-cell">
                  <code>--space-component-gap-xs</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Panel radius</th>
              <td colSpan={2}>
                <div className="ds-table-cell">
                  <code>--radius-md</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Panel width</th>
              <td colSpan={2}>
                <div className="ds-table-cell">
                  <code>--component-width-dropdown-sm / -lg</code>
                  <span className="ds-tag">280 / 320px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Footer height</th>
              <td colSpan={2}>
                <div className="ds-table-cell">
                  <code>--component-height-lg</code>
                  <span className="ds-tag">40px</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Dropdown.</p>
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
            onClick={() => onNavigate?.('icon-button')}
          >
            <span className="icon ds-related-card__icon" aria-hidden="true">
              add_circle
            </span>
            <span className="ds-related-card__name">Icon Button</span>
          </button>
          <div className="ds-related-card ds-related-card--soon">
            <span className="icon ds-related-card__icon" aria-hidden="true">
              check_box
            </span>
            <span className="ds-related-card__name">Checkbox</span>
            <span className="ds-related-card__tag">Soon</span>
          </div>
          <div className="ds-related-card ds-related-card--soon">
            <span className="icon ds-related-card__icon" aria-hidden="true">
              list
            </span>
            <span className="ds-related-card__name">Cascader</span>
            <span className="ds-related-card__tag">Soon</span>
          </div>
        </div>
      </section>
    </div>
  );
}
