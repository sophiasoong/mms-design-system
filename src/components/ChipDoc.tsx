import { useState } from 'react';
import { FilterChip, InputChip, ActionChip, ChevronDownIcon } from './Chip';
import { ButtonIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL = 'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=0-1';

const STYLE_TABS = ['Filter chip', 'Input chip', 'Action chip'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const STATE_TABS = ['Filter chip', 'Input chip', 'Action chip'] as const;
type StateTab = (typeof STATE_TABS)[number];

interface ChipDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function ChipDoc({ onNavigate }: ChipDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Filter chip');
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Filter chip');

  // ---- Variants: interactive demo state ----
  const [filterSelected, setFilterSelected] = useState(true);
  const [actionSelectedSize, setActionSelectedSize] = useState<'sm' | 'md' | 'lg' | null>('lg');
  const [inputChips, setInputChips] = useState(['Tag one', 'Tag two', 'Tag three']);
  const removeInputChip = (label: string) =>
    setInputChips((prev) => prev.filter((l) => l !== label));

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
          (see Related Component); Input chip can be removed individually; Action chip fires an
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
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Chip.</p>
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
            onClick={() => onNavigate?.('button')}
          >
            <ButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Button</span>
          </button>
          <div className="ds-related-card ds-related-card--soon">
            <span className="icon ds-related-card__icon" aria-hidden="true">
              sell
            </span>
            <span className="ds-related-card__name">Tag</span>
            <span className="ds-related-card__tag">Soon</span>
          </div>
        </div>
      </section>
    </div>
  );
}
