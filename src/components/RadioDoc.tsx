import { useState } from 'react';
import { Radio } from './Radio';
import { Checkbox } from './Checkbox';
import { Select } from './Select';
import { DatePicker } from './DatePicker';
import Form, { FormRow, FormCol, FormField } from './Form';
import IconButton from './IconButton';
import { FormIcon, InputIcon } from './icons';
import './ButtonDoc.css';
import './RadioDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=681-13324';

const STATE_TABS = ['Unchecked', 'Checked'] as const;
type StateTab = (typeof STATE_TABS)[number];

const VARIANT_STYLE_TABS = ['Radio label', 'Radio card'] as const;
type VariantStyleTab = (typeof VARIANT_STYLE_TABS)[number];

const VARIANT_EXAMPLE_TABS = ['Radio label', 'Radio card'] as const;
type VariantExampleTab = (typeof VARIANT_EXAMPLE_TABS)[number];

interface RadioDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function RadioDoc({ onNavigate }: RadioDocProps) {
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Unchecked');
  const [overviewChecked, setOverviewChecked] = useState(true);
  const [activeVariantStyleTab, setActiveVariantStyleTab] = useState<VariantStyleTab>(
    'Radio label',
  );
  const [activeVariantExampleTab, setActiveVariantExampleTab] = useState<VariantExampleTab>(
    'Radio label',
  );
  const [exampleSendMode, setExampleSendMode] = useState<'prompt' | 'schedule'>('prompt');
  const [exampleRecipients, setExampleRecipients] = useState<'only' | 'variables' | 'filter'>(
    'only',
  );

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Radio</h1>
        <p className="ds-doc__lede">
          A Radio lets a user select exactly one option from a set of mutually exclusive
          choices.
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
          Use a Radio group when a user must pick a single option from a short, visible
          list — unlike Checkbox, only one Radio in a group can be checked at a time.
        </p>
        <div className="ds-preview">
          <Radio label="Label" checked={overviewChecked} onChange={setOverviewChecked} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A Radio is a bordered circle inside a larger invisible hit area, holding a dot
          that appears once checked.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-radio ds-radio--checked ds-radio--force-focus ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-radio__hit">
                <span className="ds-radio__circle ds-anatomy__part-relative">
                  <span className="ds-radio__dot" aria-hidden="true" />
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">2</span>
                </span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Hit area &amp; circle</strong> —{' '}
                  <span>
                    24×24 click target wrapping a 16×16 bordered circle; border and
                    background respond to checked / hover / disabled, and a focus ring
                    extends around the hit area
                  </span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Dot</strong> —{' '}
                  <span>appears only when checked; color follows the circle state</span>
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
          Radio has a single binary axis — unlike Checkbox, there is no indeterminate
          state.
        </p>

        <div id="variants-style" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Style</h3>
          <div className="ds-line-tabs" role="tablist" aria-label="Radio style">
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
            {activeVariantStyleTab === 'Radio label' && (
              <div className="ds-variant-group">
                <div className="ds-variant-row">
                  <div className="ds-variant-row__cell">
                    <Radio label="Label" />
                    <span className="ds-variant-row__cell-label">Unchecked</span>
                  </div>
                  <div className="ds-variant-row__cell">
                    <Radio label="Label" checked />
                    <span className="ds-variant-row__cell-label">Checked</span>
                  </div>
                </div>
              </div>
            )}
            {activeVariantStyleTab === 'Radio card' && (
              <div className="ds-variant-group">
                <div className="ds-variant-row">
                  <div className="ds-variant-row__cell">
                    <div className="ds-radio-card">
                      <Radio label="Label" />
                      <div className="ds-radio-card__preview">
                        <img
                          src="/assets/spreadsheet_preview.png"
                          alt=""
                          className="ds-radio-card__preview-image"
                        />
                        <IconButton
                          icon="zoom_in"
                          variant="primary"
                          appearance="solid"
                          size="md"
                          label="Preview image"
                          className="ds-radio-card__preview-action"
                        />
                      </div>
                    </div>
                    <span className="ds-variant-row__cell-label">Default</span>
                  </div>
                  <div className="ds-variant-row__cell">
                    <div className="ds-radio-card ds-radio-card--checked">
                      <Radio label="Label" checked />
                      <div className="ds-radio-card__preview">
                        <img
                          src="/assets/spreadsheet_preview.png"
                          alt=""
                          className="ds-radio-card__preview-image"
                        />
                        <IconButton
                          icon="zoom_in"
                          variant="primary"
                          appearance="solid"
                          size="md"
                          label="Preview image"
                          className="ds-radio-card__preview-action"
                        />
                      </div>
                    </div>
                    <span className="ds-variant-row__cell-label">Checked</span>
                  </div>
                  <div className="ds-variant-row__cell">
                    <div className="ds-radio-card ds-radio-card--disabled">
                      <Radio label="Label" state="disabled" />
                      <div className="ds-radio-card__preview">
                        <img
                          src="/assets/spreadsheet_preview.png"
                          alt=""
                          className="ds-radio-card__preview-image"
                        />
                        <IconButton
                          icon="zoom_in"
                          variant="primary"
                          appearance="solid"
                          size="md"
                          label="Preview image"
                          disabled
                          className="ds-radio-card__preview-action"
                        />
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
            A real "Sending Settings" composition — with the Radio usage worth calling
            out highlighted against the rest of the form.
          </p>
          <div className="ds-line-tabs" role="tablist" aria-label="Radio example">
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
              <div className="ds-preview ds-preview--scrim">
                <div
                  className={`ds-example-radio-form ds-example-radio-form--${
                    activeVariantExampleTab === 'Radio label' ? 'label' : 'card'
                  }`}
                >
                  <Form title="Sending Settings">
                    <FormField label="Platform" required>
                      <div className="ds-example-radio-form__field">
                        <div className="ds-radio-option-row">
                          <Checkbox label="Message Center (Web /App)" defaultChecked />
                          <Checkbox label="Push notifications (Web)" defaultChecked />
                          <Checkbox label="Push notifications (App)" />
                          <Checkbox label="Email" />
                        </div>
                      </div>
                    </FormField>
                    <FormRow>
                      <FormCol>
                        <FormField label="Send Mode" required>
                          <div className="ds-example-radio-form__field ds-example-radio-form__field--send-mode">
                            <div className="ds-radio-option-row">
                              <Radio
                                label="Prompt"
                                name="example-send-mode"
                                checked={exampleSendMode === 'prompt'}
                                onChange={() => setExampleSendMode('prompt')}
                              />
                              <Radio
                                label="Schedule"
                                name="example-send-mode"
                                checked={exampleSendMode === 'schedule'}
                                onChange={() => setExampleSendMode('schedule')}
                              />
                            </div>
                          </div>
                        </FormField>
                      </FormCol>
                      <FormCol>
                        <FormField label="Send Date" required>
                          <div className="ds-example-radio-form__field">
                            <DatePicker placeholder="2023-12-30 HH:MM" />
                          </div>
                        </FormField>
                      </FormCol>
                      <FormCol>
                        <FormField label="Sender" required>
                          <div className="ds-example-radio-form__field">
                            <Select placeholder="Select Sender" />
                          </div>
                        </FormField>
                      </FormCol>
                    </FormRow>
                    <FormField label="Recipients" required>
                      <div className="ds-example-radio-form__field ds-example-radio-form__field--recipients">
                        <div className="ds-radio-card-row">
                          <div
                            className={`ds-radio-card${
                              exampleRecipients === 'only' ? ' ds-radio-card--checked' : ''
                            }`}
                          >
                            <Radio
                              label="Recipients Only"
                              name="example-recipients"
                              checked={exampleRecipients === 'only'}
                              onChange={() => setExampleRecipients('only')}
                            />
                          </div>
                          <div
                            className={`ds-radio-card${
                              exampleRecipients === 'variables' ? ' ds-radio-card--checked' : ''
                            }`}
                          >
                            <Radio
                              label="Recipients with Variables"
                              name="example-recipients"
                              checked={exampleRecipients === 'variables'}
                              onChange={() => setExampleRecipients('variables')}
                            />
                          </div>
                          <div
                            className={`ds-radio-card${
                              exampleRecipients === 'filter' ? ' ds-radio-card--checked' : ''
                            }`}
                          >
                            <Radio
                              label="Recipients Only (Filter)"
                              name="example-recipients"
                              checked={exampleRecipients === 'filter'}
                              onChange={() => setExampleRecipients('filter')}
                            />
                          </div>
                        </div>
                        <Checkbox
                          label="Send to all merchants"
                          className="ds-example-radio-form__apply-all"
                        />
                      </div>
                    </FormField>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Checked reuses the unchecked circle's border/background treatment except where
          noted — only the dot appears in addition.
        </p>
        <div className="ds-line-tabs ds-line-tabs--no-label" role="tablist" aria-label="Radio state groups">
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
                      <Radio label="Label" />
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
                      <Radio label="Label" state="hover" />
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
                      <Radio label="Label" state="focus" />
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
                      <Radio label="Label" state="disabled" />
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
                      <Radio label="Label" checked />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-300)' }} />
                        <code>brand-primary-300</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <Radio label="Label" checked state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                        <code>brand-primary-400</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Focus</td>
                    <td>
                      <Radio label="Label" checked state="focus" />
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
                      <Radio label="Label" checked state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-700)' }} />
                        <code>brand-neutral-700</code>
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
          There is a single Radio size across the design system — hit area, circle, and
          dot all stay fixed.
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
              <th scope="row">Circle</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-icon-sm</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Dot</th>
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
                  <code>--radius-full</code>
                  <span className="ds-tag">9999px</span>
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
        <p className="ds-section__desc">Components that commonly appear alongside Radio.</p>
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
            onClick={() => onNavigate?.('input')}
          >
            <InputIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Input</span>
          </button>
        </div>
      </section>
    </div>
  );
}
