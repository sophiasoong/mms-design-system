import { useState } from 'react';
import IconButton from './IconButton';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=511-2837';

const VARIANT_TABS = ['Primary', 'Secondary', 'Danger', 'Feedback'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const STATE_TABS = ['Primary', 'Secondary'] as const;
type StateTab = (typeof STATE_TABS)[number];

interface IconButtonDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function IconButtonDoc({ onNavigate }: IconButtonDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Primary');
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Primary');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Icon Button</h1>
        <p className="ds-doc__lede">
          Icon Buttons trigger an action using only an icon, for contexts where the icon alone
          communicates the action clearly. Use the variant to signal intent (primary, secondary,
          danger, success) and the appearance to signal visual weight (solid, outline, ghost).
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
          The default Icon Button is a Primary / Solid / Medium / Square button: high-emphasis,
          used for a single, clearly recognizable action such as closing a dialog.
        </p>
        <div className="ds-preview">
          <IconButton icon="close" label="Close" />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          An icon button is composed of a container plus a single required icon slot — there is no
          label, so the container's <code>aria-label</code> carries the accessible name.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <button
              type="button"
              className="ds-icon-button ds-icon-button--primary ds-icon-button--solid ds-icon-button--md ds-icon-button--square ds-anatomy__demo"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-anatomy__dot ds-anatomy__dot--left" aria-hidden="true" />
              <span className="ds-anatomy__dot ds-anatomy__dot--right" aria-hidden="true" />
              <span className="ds-anatomy__part">
                <span className="icon ds-icon-button__icon" aria-hidden="true">
                  close
                </span>
                <span className="ds-anatomy__badge">2</span>
                <span className="ds-anatomy__dot" aria-hidden="true" />
              </span>
            </button>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>background, border, radius (--radius-md square / --radius-full round)</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Icon</strong> — <span>required, Material Symbols Rounded, fixed 16px</span>
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
          Variant sets intent; appearance sets emphasis. Not every variant supports every
          appearance — Secondary and Danger have no Outline tokens defined in the current token
          set.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Icon Button variant groups">
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
          {activeVariantTab === 'Primary' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <IconButton variant="primary" appearance="solid" icon="close" label="Close" />
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton variant="primary" appearance="outline" icon="close" label="Close" />
                  <span className="ds-variant-row__cell-label">outline</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton variant="primary" appearance="ghost" icon="close" label="Close" />
                  <span className="ds-variant-row__cell-label">ghost</span>
                </div>
              </div>
            </div>
          )}

          {activeVariantTab === 'Secondary' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <IconButton variant="secondary" appearance="solid" icon="close" label="Close" />
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton variant="secondary" appearance="ghost" icon="close" label="Close" />
                  <span className="ds-variant-row__cell-label">ghost</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Outline tokens are not defined for Secondary — ask design before adding them.
              </span>
            </div>
          )}

          {activeVariantTab === 'Danger' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <IconButton variant="danger" appearance="solid" icon="delete" label="Delete" />
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton variant="danger" appearance="ghost" icon="delete" label="Delete" />
                  <span className="ds-variant-row__cell-label">ghost</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Outline tokens are not defined for Danger — ask design before adding them.
              </span>
            </div>
          )}

          {activeVariantTab === 'Feedback' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <IconButton
                    variant="success"
                    appearance="ghost"
                    icon="check_circle"
                    label="Success"
                  />
                  <span className="ds-variant-row__cell-label">success</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton variant="pending" appearance="ghost" icon="pending" label="Pending" />
                  <span className="ds-variant-row__cell-label">pending</span>
                </div>
                <div className="ds-variant-row__cell">
                  <IconButton variant="danger" appearance="ghost" icon="error" label="Error" />
                  <span className="ds-variant-row__cell-label">error</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Only Ghost is defined for Feedback, and every surface stays transparent by default
                — a tinted wash appears only on hover and focus. Error reuses the Danger tokens; no
                icon-button-scoped token exists for Pending, so it borrows the Toast/Banner warning
                color instead.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Shape</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <IconButton shape="square" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">square</span>
              </div>
              <div className="ds-variant-row__cell">
                <IconButton shape="round" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">round</span>
              </div>
            </div>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <IconButton size="sm" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">sm · 24px</span>
              </div>
              <div className="ds-variant-row__cell">
                <IconButton size="md" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">md · 32px</span>
              </div>
              <div className="ds-variant-row__cell">
                <IconButton size="lg" icon="close" label="Close" />
                <span className="ds-variant-row__cell-label">lg · 40px</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Every variant/appearance pair defines default, hover, focus, and disabled states. Hover
          and focus are statically forced below for documentation purposes.
        </p>
        <div className="ds-line-tabs ds-line-tabs--no-label" role="tablist" aria-label="Icon Button state groups">
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
                      <IconButton icon="close" label="Close" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-primary-solid-default)',
                          }}
                        />
                        <code>interactive-icon-button-surface-primary-solid-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <IconButton icon="close" label="Close" forceState="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-primary-solid-hover)',
                          }}
                        />
                        <code>interactive-icon-button-surface-primary-solid-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <IconButton icon="close" label="Close" forceState="focus" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-primary-solid-focus)',
                          }}
                        />
                        <code>interactive-icon-button-surface-primary-solid-focus</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <IconButton icon="close" label="Close" disabled />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-primary-solid-disabled)',
                          }}
                        />
                        <code>interactive-icon-button-surface-primary-solid-disabled</code>
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
                      <IconButton variant="secondary" icon="close" label="Close" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-secondary-solid-default)',
                          }}
                        />
                        <code>interactive-icon-button-surface-secondary-solid-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <IconButton
                        variant="secondary"
                        icon="close"
                        label="Close"
                        forceState="hover"
                      />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-secondary-solid-hover)',
                          }}
                        />
                        <code>interactive-icon-button-surface-secondary-solid-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <IconButton
                        variant="secondary"
                        icon="close"
                        label="Close"
                        forceState="focus"
                      />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-secondary-solid-focus)',
                          }}
                        />
                        <code>interactive-icon-button-surface-secondary-solid-focus</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <IconButton variant="secondary" icon="close" label="Close" disabled />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-icon-button-surface-secondary-solid-disabled)',
                          }}
                        />
                        <code>interactive-icon-button-surface-secondary-solid-disabled</code>
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
          Container size scales by size token; padding and icon size stay fixed across all three
          sizes — only the hit area grows.
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
              <th scope="row">Width / Height</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-xs</code>
                  <span className="ds-tag">24px</span>
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
              <th scope="row">Padding</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--space-component-padding-xs</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Icon</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--component-icon-sm</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius (Square)</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--radius-md</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius (Round)</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--radius-full</code>
                  <span className="ds-tag">9999px</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">
          Components that commonly appear alongside Icon Button.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('button')}
          >
            <span className="icon ds-related-card__icon" aria-hidden="true">
              smart_button
            </span>
            <span className="ds-related-card__name">Button</span>
          </button>
          <div className="ds-related-card ds-related-card--soon">
            <span className="icon ds-related-card__icon" aria-hidden="true">
              view_column_2
            </span>
            <span className="ds-related-card__name">Button Group</span>
            <span className="ds-related-card__tag">Soon</span>
          </div>
          <div className="ds-related-card ds-related-card--soon">
            <span className="icon ds-related-card__icon" aria-hidden="true">
              link
            </span>
            <span className="ds-related-card__name">Link</span>
            <span className="ds-related-card__tag">Soon</span>
          </div>
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
