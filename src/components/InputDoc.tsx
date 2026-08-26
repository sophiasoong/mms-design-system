import { useState } from 'react';
import { Input } from './Input';
import Form, { FormRow, FormCol, FormField } from './Form';
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell } from './Table';
import { FormIcon, TableIcon } from './icons';
import './ButtonDoc.css';
import './InputDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=303-9258';

const STYLE_TABS = ['Label', 'Password', 'Number'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const STATES_TABS = ['Label', 'Number'] as const;
type StatesTab = (typeof STATES_TABS)[number];

const EXAMPLE_TABS = ['Label', 'Number'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

const EXAMPLE_TABLE_ROWS = [
  { sku: 'H0888001', skuName: 'Wireless Mouse', price: '199', editing: false },
  { sku: 'H0762034', skuName: 'Mechanical Keyboard', price: '458', editing: true },
  { sku: 'H0913567', skuName: 'USB-C Hub', price: '268', editing: false },
];

interface InputDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function InputDoc({ onNavigate }: InputDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Label');
  const [activeStatesTab, setActiveStatesTab] = useState<StatesTab>('Label');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Label');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Input</h1>
        <p className="ds-doc__lede">
          An Input is a bordered text field for free-form entry. Label holds a single typed
          value, Password masks it behind a visibility toggle, and Number restricts entry to
          numeric characters.
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
          Use an Input wherever a user types free-form text directly, rather than picking from a
          list of options (see Select). Password and Number constrain what's typed to a masked
          value or digits respectively.
        </p>
        <div className="ds-preview">
          <div style={{ width: 320 }}>
            <Input placeholder="Please type" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          An Input is a bordered container holding typed or placeholder text, with an optional
          trailing icon — a visibility toggle in the Password style.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-input ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
              style={{ width: 320 }}
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-input__content ds-anatomy__part-relative">
                <span className="ds-input__placeholder">Please type</span>
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
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
                  <strong>Content</strong> — <span>typed or placeholder text</span>
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
          Label holds a single typed value. Password masks the typed value, with a trailing icon
          to toggle visibility. Number restricts entry to numeric characters.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Input variant groups">
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
                  <Input placeholder="Please type" />
                </div>
              </div>
              <span className="ds-variant-note">A single free-typed value.</span>
            </div>
          )}

          {activeStyleTab === 'Password' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ width: 320 }}>
                  <Input type="password" placeholder="Please type" />
                </div>
              </div>
              <span className="ds-variant-note">
                Masks the typed value; the trailing icon toggles between hidden and visible text.
              </span>
            </div>
          )}

          {activeStyleTab === 'Number' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <Input type="number" placeholder="0" />
              </div>
              <span className="ds-variant-note">Restricts entry to numeric characters.</span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row" style={{ flexDirection: 'column', alignItems: 'center' }}>
              <div className="ds-variant-row__cell">
                <div style={{ width: 240 }}>
                  <Input placeholder="Please type" size="lg" />
                </div>
                <span className="ds-variant-row__cell-label">Lg · 40px</span>
              </div>
              <div className="ds-variant-row__cell">
                <div style={{ width: 240 }}>
                  <Input placeholder="Please type" size="md" />
                </div>
                <span className="ds-variant-row__cell-label">Md · 32px</span>
              </div>
            </div>
          </div>
        </div>

        <div id="variants-example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Real compositions from elsewhere in the system — a Form's delivery-fee fields and a
            Table's editable SKU row — with the field type worth calling out highlighted against
            the rest of the surface.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Example variants">
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

          <div className="ds-variant-groups">
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div
                  className={`ds-example-mocks ds-example-input-demo ds-example-input-demo--${activeExampleTab.toLowerCase()}`}
                  style={{ width: '100%' }}
                >
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Form</span>
                    <div style={{ width: '100%' }}>
                      <Form title="Merchant Delivery Information">
                        <FormRow>
                          <FormCol>
                            <FormField label="Contact Name" required info>
                              <Input
                                placeholder="Please type"
                                defaultValue="Chan Wai Ming"
                                className="ds-example-input-demo__label-field"
                              />
                            </FormField>
                            <FormField label="HK Delivery Fee">
                              <Input
                                type="number"
                                placeholder="0"
                                defaultValue="3"
                                className="ds-example-input-demo__number-field"
                              />
                            </FormField>
                          </FormCol>
                          <FormCol>
                            <FormField label="Contact Info" required info>
                              <Input
                                placeholder="Please type"
                                defaultValue="+852 9123 4567"
                                className="ds-example-input-demo__label-field"
                              />
                            </FormField>
                            <FormField label="HK Free Delivery Threshold">
                              <Input
                                type="number"
                                placeholder="0"
                                defaultValue="10"
                                className="ds-example-input-demo__number-field"
                              />
                            </FormField>
                          </FormCol>
                        </FormRow>
                      </Form>
                    </div>
                  </div>
                  <div className="ds-example-mock-item">
                    <span className="ds-example-mock__name">Table</span>
                    <div style={{ width: '100%' }}>
                      <Table size="md">
                        <TableHeader>
                          <TableHeaderCell width={72}>Image</TableHeaderCell>
                          <TableHeaderCell width={120}>SKU ID</TableHeaderCell>
                          <TableHeaderCell width={260}>SKU Name</TableHeaderCell>
                          <TableHeaderCell width={120} align="right">Price</TableHeaderCell>
                        </TableHeader>
                        {EXAMPLE_TABLE_ROWS.map((row, index) =>
                          row.editing ? (
                            <TableRow key={index} state="highlighted">
                              <TableCell>
                                <span className="ds-datatable__cell-thumbnail">
                                  <span className="icon icon--sm" aria-hidden="true">
                                    image
                                  </span>
                                </span>
                              </TableCell>
                              <TableCell className="ds-example-input-demo__label-cell">
                                <Input
                                  size="md"
                                  defaultValue={row.sku}
                                  className="ds-example-input-demo__label-field"
                                />
                              </TableCell>
                              <TableCell>{row.skuName}</TableCell>
                              <TableCell align="right" className="ds-example-input-demo__number-cell">
                                <Input
                                  size="md"
                                  type="number"
                                  defaultValue={row.price}
                                  className="ds-example-input-demo__number-field"
                                />
                              </TableCell>
                            </TableRow>
                          ) : (
                            <TableRow key={index}>
                              <TableCell>
                                <span className="ds-datatable__cell-thumbnail">
                                  <span className="icon icon--sm" aria-hidden="true">
                                    image
                                  </span>
                                </span>
                              </TableCell>
                              <TableCell>{row.sku}</TableCell>
                              <TableCell>{row.skuName}</TableCell>
                              <TableCell align="right">{row.price}</TableCell>
                            </TableRow>
                          ),
                        )}
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
              <span className="ds-variant-note">
                {activeExampleTab === 'Label'
                  ? "Highlights the plain-text Input fields — Contact Name/Info in the Form, the SKU ID field in the Table's editing row."
                  : "Highlights the Number-input fields — HK Delivery Fee/Threshold in the Form, the Price field in the Table's editing row."}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Error replaces the border color to flag invalid input; Disabled dims the surface and
          blocks interaction entirely.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Input states style">
          {STATES_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeStatesTab === tab}
              className={`ds-line-tab${activeStatesTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveStatesTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeStatesTab === 'Label' && (
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
                    <Input placeholder="Please type" size="md" />
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
                    <Input placeholder="Please type" size="md" state="hover" />
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
                    <Input placeholder="Please type" size="md" state="focus" />
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
                    <Input placeholder="Please type" size="md" state="error" />
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
                    <Input placeholder="Please type" size="md" state="disabled" />
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
        )}

        {activeStatesTab === 'Number' && (
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
                  <Input type="number" placeholder="0" size="md" />
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
                  <Input type="number" placeholder="0" size="md" state="hover" />
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
                  <Input type="number" placeholder="0" size="md" state="focus" />
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
                  <Input type="number" placeholder="0" size="md" state="error" />
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
                  <Input type="number" placeholder="0" size="md" state="disabled" />
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
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          An Input fills its container's width; only height and internal gap change between
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
                  <code>--component-height-lg / -md</code>
                  <span className="ds-tag">40 / 32px</span>
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
              <th scope="row">Content gap</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-sm</code>
                  <span className="ds-tag">8px</span>
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
        <p className="ds-section__desc">Components that commonly appear alongside Input.</p>
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
