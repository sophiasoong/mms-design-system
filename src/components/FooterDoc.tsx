import { useRef, useState } from 'react';
import type { UIEvent } from 'react';
import Footer from './Footer';
import Modal from './Modal';
import Upload from './Upload';
import Form, { FormRow, FormCol, FormField } from './Form';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { DateRangePicker } from './DateRangePicker';
import { DropdownOption } from './Dropdown';
import Button from './Button';
import IconButton from './IconButton';
import { ButtonIcon } from './icons';
import './ButtonDoc.css';
import './UploadDoc.css';
import './FooterDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=370-2983';

const STYLE_TABS = ['Divider', 'Shadow'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const EXAMPLE_TABS = ['Modal', 'Form', 'Dropdown'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

/** Example tab: Dropdown — duplicated from DropdownDoc's own "Filter-chip" Example
 * (its own adaptation of the same Figma filter-chip-dropdown reference), so hovering
 * spotlights Footer's role inside a real composition instead of a bare Footer instance.
 * Kept as style="single" (no checkboxes) to match that existing composition rather than
 * re-adapting the Figma reference's checkboxes a second, inconsistent way. */
function syncScrollbarThumb(scrollEl: HTMLDivElement, thumb: HTMLDivElement | null) {
  if (!thumb) return;
  const track = thumb.parentElement;
  if (!track) return;
  const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
  const maxThumbOffset = track.clientHeight - thumb.clientHeight;
  const ratio = maxScroll > 0 ? scrollEl.scrollTop / maxScroll : 0;
  thumb.style.transform = `translateY(${ratio * maxThumbOffset}px)`;
}

const CATEGORY_OPTIONS = [
  'Electronics',
  'Home & Kitchen',
  'Fashion & Apparel',
  'Beauty & Personal Care',
  'Sports & Outdoors',
  'Toys & Games',
  'Books & Media',
  'Health & Wellness',
  'Automotive',
  'Office Supplies',
  'Pet Supplies',
  'Baby & Kids',
  'Garden & Outdoor',
  'Jewelry & Accessories',
  'Grocery & Gourmet',
];

/** Example tab: Form — duplicated from FormDoc's own RichTextField, since it isn't
 * exported; per this codebase's doc-page convention of duplicating markup instead of
 * sharing components across doc pages (see HeaderDoc.tsx's identical duplicate). */
function FooterExampleRichTextField({ defaultValue }: { defaultValue?: string } = {}) {
  return (
    <FormField label="Description" info>
      <div className="ds-richtext">
        <div className="ds-richtext__toolbar">
          <span className="ds-richtext__toolbar-select">
            Normal
            <span className="icon icon--xs" aria-hidden="true">
              expand_more
            </span>
          </span>
          <span className="ds-richtext__divider" aria-hidden="true" />
          <IconButton icon="format_bold" label="Bold" variant="neutral" appearance="ghost" size="sm" />
          <IconButton icon="format_italic" label="Italic" variant="neutral" appearance="ghost" size="sm" />
          <IconButton
            icon="format_underlined"
            label="Underline"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="strikethrough_s"
            label="Strikethrough"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_color_text"
            label="Text color"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <span className="ds-richtext__divider" aria-hidden="true" />
          <IconButton
            icon="format_list_numbered"
            label="Numbered list"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_list_bulleted"
            label="Bulleted list"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_align_left"
            label="Align left"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_align_center"
            label="Align center"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_align_right"
            label="Align right"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_indent_decrease"
            label="Decrease indent"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="format_indent_increase"
            label="Increase indent"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <span className="ds-richtext__divider" aria-hidden="true" />
          <IconButton icon="link" label="Insert link" variant="neutral" appearance="ghost" size="sm" />
          <IconButton icon="image" label="Insert image" variant="neutral" appearance="ghost" size="sm" />
          <IconButton
            icon="format_quote"
            label="Insert quote"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="table_chart"
            label="Insert table"
            variant="neutral"
            appearance="ghost"
            size="sm"
          />
          <span className="ds-richtext__spacer" />
          <button type="button" className="ds-richtext__preview">
            Preview
          </button>
        </div>
        <Textarea
          className="ds-richtext__field"
          placeholder="Placeholder"
          defaultValue={defaultValue}
          size="lg"
        />
      </div>
      <div className="ds-richtext__hint">
        <span className="ds-richtext__hint-count">{defaultValue?.length ?? 0}/200</span>
      </div>
    </FormField>
  );
}

/** Example tab: Form — adapted from the Figma Form reference (node 1804-62347): two
 * stacked Form cards followed by a page-level Footer, so hovering spotlights Footer's
 * role closing out a real form instead of a bare instance. Secondary label set to
 * "Cancel" to match the rest of this doc page's outline-button convention; Back and
 * primary Confirm are left as Footer's defaults. */
function FooterExampleForm() {
  return (
    <div className="ds-footer-doc__example-forms">
      <Form title="Form Header">
        <FormRow>
          <FormCol>
            <FormField label="Product Name">
              <Input defaultValue="Wireless Bluetooth Headphones" size="lg" />
            </FormField>
            <FormField label="Promotion Period" required>
              <DateRangePicker
                defaultValue={{ start: new Date(2026, 0, 15), end: new Date(2026, 1, 15) }}
              />
            </FormField>
            <FormField label="Category">
              <Select label="Electronics" size="lg" />
            </FormField>
          </FormCol>
          <FormCol>
            <FormField label="Brand">
              <Input defaultValue="SoundWave Audio" size="lg" />
            </FormField>
            <FormField label="Availability Period" required>
              <DateRangePicker
                defaultValue={{ start: new Date(2026, 2, 1), end: new Date(2026, 2, 31) }}
              />
            </FormField>
            <FormField label="Shipping Method">
              <Select label="Standard Shipping" size="lg" />
            </FormField>
          </FormCol>
        </FormRow>
      </Form>
      <Form title="Form Header">
        <FormRow>
          <FormCol>
            <FormField label="SKU">
              <Input defaultValue="WBH-2026-001" size="lg" />
            </FormField>
          </FormCol>
          <FormCol>
            <FormField label="Warehouse Code">
              <Input defaultValue="WH-HKG-03" size="lg" />
            </FormField>
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol>
            <FooterExampleRichTextField defaultValue="Premium over-ear headphones with active noise cancellation and 30-hour battery life." />
          </FormCol>
        </FormRow>
      </Form>
      <Footer size="lg" style="divider" secondaryLabel="Cancel" />
    </div>
  );
}

interface FooterDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function FooterDoc({ onNavigate }: FooterDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Divider');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Modal');
  const dropdownThumbRef = useRef<HTMLDivElement>(null);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Footer</h1>
        <p className="ds-doc__lede">
          A Footer closes out a surface — a modal, a form, or a panel — and carries the
          actions that move a user forward, back, or out of it.
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
          Use Footer to anchor a surface's actions to its bottom edge, with a leading way out
          and a primary way forward always in the same place.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <div style={{ width: 480 }}>
            <Footer size="lg" style="divider" secondaryLabel="Cancel" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Every Footer carries a leading and a primary action; the secondary action is
          optional and only appears at the Lg size.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-footer-anatomy">
            <div className="ds-footer ds-footer--lg ds-footer--divider ds-anatomy__demo" aria-hidden="true" style={{ width: 480 }}>
              <span className="ds-anatomy__part-relative">
                <Button variant="primary" appearance="ghost" size="md" leadingIcon="chevron_left">
                  Back
                </Button>
                <span className="ds-anatomy__badge">1</span>
              </span>
              <div className="ds-footer__trailing">
                <span className="ds-anatomy__part-relative">
                  <Button variant="primary" appearance="outline" size="md">
                    Cancel
                  </Button>
                  <span className="ds-anatomy__badge">2</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <Button variant="primary" appearance="solid" size="md">
                    Confirm
                  </Button>
                  <span className="ds-anatomy__badge">3</span>
                </span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Leading action</strong> —{' '}
                  <span>a ghost Button that navigates back or resets the surface; always present</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Secondary action</strong> —{' '}
                  <span>an outline Button for a secondary confirmation; Lg only</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Primary action</strong> —{' '}
                  <span>a solid Button that commits the surface's main action</span>
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
          Style sets how Footer separates itself from the surface above — a hairline Divider
          or a lifting Shadow.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Footer style groups">
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
          {activeStyleTab === 'Divider' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div style={{ width: 480 }}>
                  <Footer size="lg" style="divider" secondaryLabel="Cancel" />
                </div>
              </div>
              <span className="ds-variant-note">
                Divider adds a hairline border above the footer, separating it from the
                surface it closes.
              </span>
            </div>
          )}

          {activeStyleTab === 'Shadow' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div style={{ width: 480 }}>
                  <Footer size="lg" style="shadow" secondaryLabel="Cancel" />
                </div>
              </div>
              <span className="ds-variant-note">
                Shadow lifts the footer with a drop shadow instead of a border — use it when
                the footer floats above scrollable content.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row ds-variant-row--scrim">
              <div className="ds-variant-row__cell">
                <div style={{ width: 320 }}>
                  <Footer size="lg" style="divider" secondaryLabel="Cancel" />
                </div>
                <span className="ds-variant-row__cell-label">Lg · 64px — modals, full forms</span>
              </div>
              <div className="ds-variant-row__cell">
                <Footer
                  size="sm"
                  style="divider"
                  leadingLabel="Reset"
                  leadingIcon=""
                  primaryLabel="Apply"
                  showSecondary={false}
                />
                <span className="ds-variant-row__cell-label">Sm · 40px — compact panels, filters</span>
              </div>
            </div>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label ds-variant-tabs-label">Example</span>
            <div className="ds-line-tabs" role="tablist" aria-label="Footer example compositions">
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
            <div className="ds-preview ds-preview--scrim ds-footer-doc__example">
              {activeExampleTab === 'Modal' && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Modal
                    size="sm"
                    title="Upload Products"
                    showInfo
                    showLeading={false}
                    secondaryLabel="Cancel"
                  >
                    <div className="ds-upload-doc__steps">
                      <div className="ds-upload-doc__step">
                        <p className="ds-upload-doc__step-title">
                          1. Download Template File or Upload Batch File
                        </p>
                        <div className="ds-upload-doc__step-body">
                          <Button>Download Template</Button>
                        </div>
                      </div>
                      <div className="ds-upload-doc__step">
                        <p className="ds-upload-doc__step-title">2. Add your data to template file</p>
                        <div className="ds-upload-doc__step-body ds-upload-doc__step-detail">
                          <p>If using Excel, make sure to export or save as .xls or xlsx</p>
                          <p className="ds-upload-doc__step-danger">
                            Reminder: Do not modify template title fields, or error may occur
                          </p>
                        </div>
                      </div>
                      <div className="ds-upload-doc__step">
                        <p className="ds-upload-doc__step-title">3. Upload Batch File</p>
                        <div className="ds-upload-doc__step-body">
                          <Upload
                            style="dropzone"
                            showFileList={false}
                            className="ds-upload-doc__step-upload"
                          />
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
              {activeExampleTab === 'Form' && <FooterExampleForm />}
              {activeExampleTab === 'Dropdown' && (
                <div className="ds-combo-figure">
                  <button type="button" className="ds-filter-chip">
                    <span>Category</span>
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
                          syncScrollbarThumb(e.currentTarget, dropdownThumbRef.current)
                        }
                      >
                        {CATEGORY_OPTIONS.map((label) => (
                          <DropdownOption key={label} label={label} style="single" />
                        ))}
                      </div>
                      <div className="ds-dropdown__scrollbar" aria-hidden="true">
                        <div className="ds-dropdown__scrollbar-track">
                          <div className="ds-dropdown__scrollbar-thumb" ref={dropdownThumbRef} />
                        </div>
                      </div>
                    </div>
                    <Footer
                      size="sm"
                      style="divider"
                      leadingLabel="Reset"
                      leadingIcon=""
                      primaryLabel="Apply"
                      showSecondary={false}
                    />
                  </div>
                </div>
              )}
            </div>
            <span className="ds-variant-note">
              Each tab is a real composition duplicated from that component's own doc page —
              hover to spotlight Footer's role inside it.
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Each style maps to its own separation treatment, so a Footer always reads as
          attached to the surface it closes.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Style</th>
              <th>Preview</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Divider</td>
              <td style={{ width: 280 }}>
                <Footer
                  size="sm"
                  style="divider"
                  leadingLabel="Reset"
                  leadingIcon=""
                  primaryLabel="Apply"
                  showSecondary={false}
                />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--global-divider-neutral-light)', border: '1px solid var(--global-divider-neutral-light)' }}
                  />
                  <code>global-divider-neutral-light</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Shadow</td>
              <td style={{ width: 280 }}>
                <Footer size="lg" style="shadow" secondaryLabel="Cancel" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-dropdown-panel-shadow-default)' }}
                  />
                  <code>interactive-dropdown-panel-shadow-default</code>
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
          Lg and Sm share the same button gap and corner radius; only height, padding, and
          button size scale down together.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Token</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Lg height</th>
              <td>
                <code>--component-height-3xl</code>
              </td>
              <td>64px</td>
            </tr>
            <tr>
              <th scope="row">Sm height</th>
              <td>
                <code>--component-height-lg</code>
              </td>
              <td>40px</td>
            </tr>
            <tr>
              <th scope="row">Lg padding</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px, all sides</td>
            </tr>
            <tr>
              <th scope="row">Sm padding</th>
              <td>
                <code>--space-component-padding-sm</code>
              </td>
              <td>8px, all sides</td>
            </tr>
            <tr>
              <th scope="row">Corner radius (Divider, Lg only)</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px, bottom corners only</td>
            </tr>
            <tr>
              <th scope="row">Corner radius (Shadow)</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px, bottom corners only</td>
            </tr>
            <tr>
              <th scope="row">Divider border (Sm)</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px, top only</td>
            </tr>
            <tr>
              <th scope="row">Shadow offset / blur</th>
              <td>
                <code>--interactive-dropdown-panel-shadow-default</code>
              </td>
              <td>0px 2px 8px</td>
            </tr>
            <tr>
              <th scope="row">Button gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Lg button size</th>
              <td>
                <code>--component-height-md</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Sm button size</th>
              <td>
                <code>--component-height-sm</code>
              </td>
              <td>28px (Figma specifies 24px; no matching Button size exists)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Footer.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('button')}
          >
            <ButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Button</span>
          </button>
        </div>
      </section>
    </div>
  );
}
