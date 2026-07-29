import { useState } from 'react';
import { Select } from './Select';
import { ChevronDownIcon } from './Chip';
import { DropdownOption } from './Dropdown';
import { ChipIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=166-22704';

const VARIANT_TABS = ['Label', 'Input-chips'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const EXAMPLE_OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];

interface SelectDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function SelectDoc({ onNavigate }: SelectDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Label');
  const [chips, setChips] = useState(['Tag one', 'Tag two']);
  const removeChip = (label: string) => setChips((prev) => prev.filter((l) => l !== label));

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
          list. It pairs with a Dropdown panel (see Related Component) for the actual choices; the
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
          A Select shows placeholder text when empty; once values are chosen it can instead
          display them as Input chips (see Chip) that can be removed individually.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Select variant groups">
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
          {activeVariantTab === 'Label' && (
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

          {activeVariantTab === 'Input-chips' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ width: 320 }}>
                  <Select chips={chips} onRemoveChip={removeChip} />
                  {chips.length === 0 && (
                    <span className="ds-variant-note">All chips removed — reload the page to reset.</span>
                  )}
                </div>
              </div>
              <span className="ds-variant-note">
                Each chosen value renders as an Input chip; clicking a chip's close icon removes
                just that value without opening the panel.
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
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="example" className="ds-section">
        <h2 className="ds-section__title">Example</h2>
        <p className="ds-section__desc">
          Select opens a searchable Dropdown panel: click the trigger to open it, which swaps the
          trigger itself into a search field — type to filter the option list. Picking an option
          fills the trigger and closes the panel.
        </p>
        <div className="ds-preview">
          <div className="ds-combo-figure" style={{ width: 320 }}>
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
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Select.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('dropdown')}
          >
            <span className="icon ds-related-card__icon" aria-hidden="true">
              list_alt
            </span>
            <span className="ds-related-card__name">Dropdown</span>
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
