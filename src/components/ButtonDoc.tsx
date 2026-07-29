import { useState } from 'react';
import Button from './Button';
import IconButton from './IconButton';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=1-318';

const VARIANT_TABS = ['Primary', 'Secondary', 'Danger'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const STATE_TABS = ['Primary', 'Secondary'] as const;
type StateTab = (typeof STATE_TABS)[number];

const EXAMPLE_TABS = ['Solid', 'Outline', 'Ghost'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

interface ButtonDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function ButtonDoc({ onNavigate }: ButtonDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Primary');
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Primary');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Solid');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Button</h1>
        <p className="ds-doc__lede">
          Buttons trigger an action or navigation, in forms, dialogs, toolbars, and cards. Use the
          variant to signal intent (primary, secondary, danger) and the appearance to signal
          visual weight (solid, outline, ghost).
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
          The default Button is a Primary / Solid / Medium button: high-emphasis, used for the
          single most important action on a screen.
        </p>
        <div className="ds-preview">
          <Button leadingIcon="add">Create new</Button>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A button is composed of a container plus up to three optional content slots.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <button
              type="button"
              className="ds-button ds-button--primary ds-button--solid ds-button--md ds-anatomy__demo"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-anatomy__dot ds-anatomy__dot--left" aria-hidden="true" />
              <span className="ds-anatomy__dot ds-anatomy__dot--right" aria-hidden="true" />
              <span className="ds-anatomy__part">
                <span className="icon ds-button__icon ds-button__icon--md" aria-hidden="true">
                  add
                </span>
                <span className="ds-anatomy__badge">2</span>
                <span className="ds-anatomy__dot" aria-hidden="true" />
              </span>
              <span className="ds-anatomy__part">
                <span className="ds-button__label">Label</span>
                <span className="ds-anatomy__badge">3</span>
                <span className="ds-anatomy__dot" aria-hidden="true" />
              </span>
              <span className="ds-anatomy__part">
                <span className="icon ds-button__icon ds-button__icon--md" aria-hidden="true">
                  arrow_forward
                </span>
                <span className="ds-anatomy__badge">4</span>
                <span className="ds-anatomy__dot" aria-hidden="true" />
              </span>
            </button>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> — <span>background, border, radius (--radius-md)</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Leading icon</strong> — <span>optional, Material Symbols Rounded</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Label</strong> — <span>required text, medium weight</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Trailing icon</strong> — <span>optional, Material Symbols Rounded</span>
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
          appearance — Secondary is Solid-only in the current token set.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Button variant groups">
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
                  <Button variant="primary" appearance="solid">
                    Solid
                  </Button>
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Button variant="primary" appearance="outline">
                    Outline
                  </Button>
                  <span className="ds-variant-row__cell-label">outline</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Button variant="primary" appearance="ghost">
                    Ghost
                  </Button>
                  <span className="ds-variant-row__cell-label">ghost</span>
                </div>
              </div>
            </div>
          )}

          {activeVariantTab === 'Secondary' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Button variant="secondary" appearance="solid">
                    Solid
                  </Button>
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Outline and ghost tokens are not defined for Secondary — ask design before adding
                them.
              </span>
            </div>
          )}

          {activeVariantTab === 'Danger' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Button variant="danger" appearance="solid">
                    Solid
                  </Button>
                  <span className="ds-variant-row__cell-label">solid</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Button variant="danger" appearance="outline">
                    Outline
                  </Button>
                  <span className="ds-variant-row__cell-label">outline</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Button variant="danger" appearance="ghost">
                    Ghost
                  </Button>
                  <span className="ds-variant-row__cell-label">ghost</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Button size="sm">Small</Button>
                <span className="ds-variant-row__cell-label">sm · 28px</span>
              </div>
              <div className="ds-variant-row__cell">
                <Button size="md">Medium</Button>
                <span className="ds-variant-row__cell-label">md · 32px</span>
              </div>
              <div className="ds-variant-row__cell">
                <Button size="lg">Large</Button>
                <span className="ds-variant-row__cell-label">lg · 40px</span>
              </div>
            </div>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Example</span>
            <div className="ds-line-tabs" role="tablist" aria-label="Button example groups">
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
            <div className="ds-example-figure">
              {activeExampleTab === 'Solid' ? (
                <div className="ds-example-mocks">
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Topbar</span>
                    <div className="ds-example-mock ds-example-mock--topbar">
                      <div className="ds-example-mock__group">
                        <IconButton
                          icon="menu"
                          label="Menu"
                          variant="primary"
                          appearance="outline"
                          size="md"
                          className="ds-example-mock__dim"
                        />
                        <div className="ds-example-mock__search ds-example-mock__search--full ds-example-mock__dim">
                          <span className="icon" aria-hidden="true">
                            search
                          </span>
                          <span>Placeholder</span>
                        </div>
                        <IconButton
                          icon="search"
                          label="Search"
                          variant="neutral"
                          appearance="ghost"
                          size="md"
                          className="ds-example-mock__search--compact ds-example-mock__dim"
                        />
                      </div>
                      <div className="ds-example-mock__group">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="ds-example-mock__focus"
                        >
                          Back to MMS 1.0
                        </Button>
                        <IconButton
                          icon="help"
                          label="FAQ"
                          variant="neutral"
                          appearance="ghost"
                          size="md"
                          className="ds-example-mock__dim"
                        />
                        <IconButton
                          icon="notifications"
                          label="Notifications"
                          variant="neutral"
                          appearance="ghost"
                          size="md"
                          className="ds-example-mock__dim"
                        />
                        <span className="ds-example-mock__menu-trigger ds-example-mock__dim">
                          English
                          <span className="icon" aria-hidden="true">
                            expand_more
                          </span>
                        </span>
                        <span className="ds-example-mock__menu-trigger ds-example-mock__dim">
                          User Name
                          <span className="icon" aria-hidden="true">
                            expand_more
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Page header</span>
                    <div className="ds-example-mock ds-example-mock--page-header">
                      <div className="ds-example-mock__info ds-example-mock__dim">
                        <span className="ds-example-mock__breadcrumb">
                          Home / Product and Inventory / Bundle Setting
                        </span>
                        <span className="ds-example-mock__page-title">Bundle Setting</span>
                      </div>
                      <div className="ds-example-mock__actions">
                        <Button
                          variant="primary"
                          appearance="outline"
                          className="ds-example-mock__dim"
                        >
                          Batch Create/Edit
                        </Button>
                        <Button
                          variant="primary"
                          appearance="solid"
                          className="ds-example-mock__focus"
                        >
                          Create Bundle Set
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Message</span>
                    <div className="ds-example-mock ds-example-mock--message">
                      <span
                        className="ds-example-mock__thumb ds-example-mock__dim"
                        aria-hidden="true"
                      >
                        <span className="icon" aria-hidden="true">
                          settings
                        </span>
                      </span>
                      <div className="ds-example-mock__text-col">
                        <div className="ds-example-mock__dim">
                          <p className="ds-example-mock__title">Title</p>
                          <p className="ds-example-mock__desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Accumsan duis
                            in facilisi rutru...
                          </p>
                        </div>
                        <Button
                          variant="primary"
                          appearance="solid"
                          className="ds-example-mock__focus"
                        >
                          Label
                        </Button>
                        <div className="ds-example-mock__tags ds-example-mock__dim">
                          <span className="ds-tag">label</span>
                          <span className="ds-tag">label</span>
                          <span className="ds-example-mock__date">YYYY-MM-DD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeExampleTab === 'Outline' ? (
                <div className="ds-example-mocks">
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Upload</span>
                    <div className="ds-example-mock ds-example-mock--upload">
                      <Button
                        variant="primary"
                        appearance="outline"
                        size="md"
                        leadingIcon="upload"
                        className="ds-example-mock__focus"
                      >
                        Upload
                      </Button>
                      <div className="ds-example-mock__file-list">
                        {[0, 1, 2, 3].map((i) => (
                          <div className="ds-example-mock__file-row" key={i}>
                            <span className="icon ds-example-mock__file-icon ds-example-mock__dim" aria-hidden="true">
                              attach_file
                            </span>
                            <span className="ds-example-mock__file-name ds-example-mock__dim">WWWWWWW.xls</span>
                            <IconButton
                              icon="delete"
                              label={`Delete file ${i + 1}`}
                              variant="neutral"
                              appearance="ghost"
                              size="sm"
                              className="ds-example-mock__dim"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ds-example-mocks">
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Dropdown footer</span>
                    <div className="ds-example-mock ds-example-mock--dropdown-footer">
                      <div className="ds-example-mock__select ds-example-mock__dim">
                        <span>Please select</span>
                        <span className="icon" aria-hidden="true">search</span>
                      </div>
                      <div className="ds-example-mock__dropdown-panel">
                        <div className="ds-example-mock__dropdown-options ds-example-mock__dim">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <span className="ds-example-mock__dropdown-option" key={i}>
                              Option
                            </span>
                          ))}
                        </div>
                        <div className="ds-example-mock__dropdown-footer">
                          <Button
                            variant="primary"
                            appearance="ghost"
                            size="sm"
                            leadingIcon="add"
                            className="ds-example-mock__focus"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Modal footer</span>
                    <div className="ds-example-mock ds-example-mock--modal-footer">
                      <Button
                        variant="primary"
                        appearance="ghost"
                        size="md"
                        leadingIcon="arrow_back"
                        className="ds-example-mock__focus"
                      >
                        Back
                      </Button>
                      <div className="ds-example-mock__group">
                        <Button variant="primary" appearance="outline" size="md" className="ds-example-mock__dim">
                          Confirm
                        </Button>
                        <Button variant="primary" appearance="solid" size="md" className="ds-example-mock__dim">
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Banner</span>
                    <div className="ds-example-mock ds-example-mock--banner">
                      <span className="icon ds-example-mock__banner-icon ds-example-mock__dim" aria-hidden="true">
                        info
                      </span>
                      <p className="ds-example-mock__banner-text ds-example-mock__dim">
                        After creating a new brand, please remember to submit the Zendesk webform so our team can
                        verify the brand details.
                      </p>
                      <Button variant="primary" appearance="ghost" size="sm" className="ds-example-mock__focus">
                        Submit MCS Form
                      </Button>
                    </div>
                  </div>

                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Table</span>
                    <div className="ds-example-mock ds-example-mock--table">
                      <div className="ds-example-mock__table-header ds-example-mock__dim">Action</div>
                      {[0, 1, 2].map((i) => (
                        <div className="ds-example-mock__table-row" key={i}>
                          <Button variant="primary" appearance="ghost" size="sm" className="ds-example-mock__focus">
                            Edit
                          </Button>
                        </div>
                      ))}
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
          Every variant/appearance pair defines default, hover, focus, and disabled states. Hover
          and focus are statically forced below for documentation purposes.
        </p>
        <div className="ds-line-tabs ds-line-tabs--no-label" role="tablist" aria-label="Button state groups">
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
                      <Button>Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-primary-solid-default)',
                          }}
                        />
                        <code>interactive-button-surface-primary-solid-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <Button forceState="hover">Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-primary-solid-hover)',
                          }}
                        />
                        <code>interactive-button-surface-primary-solid-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <Button forceState="focus">Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-primary-solid-focus)',
                          }}
                        />
                        <code>interactive-button-surface-primary-solid-focus</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <Button disabled>Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-primary-solid-disabled)',
                          }}
                        />
                        <code>interactive-button-surface-primary-solid-disabled</code>
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
                      <Button variant="secondary">Button</Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-button-surface-secondary-solid-default)',
                          }}
                        />
                        <code>interactive-button-surface-secondary-solid-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <Button variant="secondary" forceState="hover">
                        Button
                      </Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-secondary-solid-hover)',
                          }}
                        />
                        <code>interactive-button-surface-secondary-solid-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <Button variant="secondary" forceState="focus">
                        Button
                      </Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background: 'var(--interactive-button-surface-secondary-solid-focus)',
                          }}
                        />
                        <code>interactive-button-surface-secondary-solid-focus</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <Button variant="secondary" disabled>
                        Button
                      </Button>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span
                          className="ds-swatch__dot"
                          style={{
                            background:
                              'var(--interactive-button-surface-secondary-solid-disabled)',
                          }}
                        />
                        <code>interactive-button-surface-secondary-solid-disabled</code>
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
          Height, inline padding, content gap, and icon size all scale together by size token.
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
              <th scope="row">Height</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-sm</code>
                  <span className="ds-tag">28px</span>
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
              <th scope="row">Padding inline</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-sm</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-md</code>
                  <span className="ds-tag">12px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-lg</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Gap</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-xs</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-xs</code>
                  <span className="ds-tag">4px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-sm</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Icon</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-sm</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-sm</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-md</code>
                  <span className="ds-tag">24px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td colSpan={3}>
                <div className="ds-table-cell">
                  <code>--radius-md</code>
                  <span className="ds-tag">8px</span>
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
          Components that commonly appear alongside Button. Only Button is documented in this
          library today.
        </p>
        <div className="ds-related-grid">
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
