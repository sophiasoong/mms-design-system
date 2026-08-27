import { useState } from 'react';
import Header from './Header';
import ActionPanel, { ActionPanelField, ActionPanelValue } from './ActionPanel';
import Modal from './Modal';
import Upload from './Upload';
import Form, { FormRow, FormCol, FormField } from './Form';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { DateRangePicker } from './DateRangePicker';
import Button from './Button';
import IconButton from './IconButton';
import { IconButtonIcon, ToggleIcon, AssetsIcon } from './icons';
import './ButtonDoc.css';
import './UploadDoc.css';
import './HeaderDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=1-1202';

const STYLE_TABS = ['Modal', 'Form', 'Sub-form', 'Section', 'Form-list'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const EXAMPLE_TABS = ['Action Panel', 'Modal', 'Form'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

/** Example tab: Form — duplicated from FormDoc's own RichTextField, since it isn't
 * exported; per this codebase's doc-page convention of duplicating markup instead of
 * sharing components across doc pages (see ToggleDoc.css). */
function HeaderExampleRichTextField({ defaultValue }: { defaultValue?: string } = {}) {
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

/** Example tab: Form — duplicated from FormDoc's own FormExample (Figma 789:56940), so
 * hovering spotlights Header's role inside a real, fully-populated Form instead of a bare
 * Header instance. */
function HeaderExampleForm() {
  return (
    <Form title="General Information">
      <FormRow>
        <FormCol>
          <FormField label="Product Name">
            <Input defaultValue="Wireless Bluetooth Headphones" size="lg" />
          </FormField>
        </FormCol>
        <FormCol>
          <FormField label="Brand">
            <Input defaultValue="SoundWave Audio" size="lg" />
          </FormField>
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <FormField label="Promotion Period" required>
            <DateRangePicker
              defaultValue={{ start: new Date(2026, 0, 15), end: new Date(2026, 1, 15) }}
            />
          </FormField>
        </FormCol>
        <FormCol>
          <FormField label="Availability Period" required>
            <DateRangePicker
              defaultValue={{ start: new Date(2026, 2, 1), end: new Date(2026, 2, 31) }}
            />
          </FormField>
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <FormField label="Category">
            <Select label="Electronics" size="lg" />
          </FormField>
        </FormCol>
        <FormCol>
          <FormField label="Shipping Method">
            <Select label="Standard Shipping" size="lg" />
          </FormField>
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <HeaderExampleRichTextField defaultValue="Premium over-ear headphones with active noise cancellation and 30-hour battery life." />
        </FormCol>
      </FormRow>
    </Form>
  );
}

interface HeaderDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function HeaderDoc({ onNavigate }: HeaderDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Form');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Action Panel');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Header</h1>
        <p className="ds-doc__lede">
          A Header titles a surface — a modal, a form, a section, or a row in a list — and
          carries the controls that act on it: an info tooltip, a status tag, a toggle, a
          button, or an expander.
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
          Use Header to give any surface a consistent title bar, with optional metadata and
          trailing actions layered in only where the surface needs them.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <div style={{ width: 480 }}>
            <Header style="form" title="Shipping address" showInfo showDescription />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A title anchors the header; everything else is an optional slot that appears only
          when the surface needs it.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-header-anatomy">
            <div className="ds-header ds-header--form ds-anatomy__demo" aria-hidden="true" style={{ width: 480 }}>
              <div className="ds-header__content">
                <div className="ds-header__title-row">
                  <span className="ds-header__title ds-anatomy__part-relative">
                    Title
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
                  </span>
                  <span className="ds-anatomy__part-relative">
                    <IconButton icon="info" variant="secondary" appearance="ghost" size="sm" label="More information" />
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">2</span>
                  </span>
                </div>
                <p className="ds-header__description ds-anatomy__part-relative">
                  Description
                  <span className="ds-anatomy__badge">3</span>
                </p>
              </div>
              <span className="ds-anatomy__part-relative ds-header-anatomy__actions-anchor">
                <Button variant="primary" appearance="outline" size="md">
                  Label
                </Button>
                <span className="ds-anatomy__badge">4</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Title</strong> — <span>the surface's name; always present</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Info</strong> —{' '}
                  <span>an icon button for supplementary context, shown next to the title</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Description</strong> — <span>a secondary line of supporting text</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Actions</strong> —{' '}
                  <span>trailing controls — a Button, a Toggle, or an Expander — that vary by style</span>
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
          Style sets the surface Header sits on top of — a Modal, a Form, a nested Sub-form, a
          plain Section, or a row inside a Form-list.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Header style groups">
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
          {activeStyleTab === 'Modal' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div style={{ width: 480 }}>
                  <Header
                    style="modal"
                    title="Delete this record?"
                    showDescription
                    description="This action can't be undone. The record and any linked activity will be permanently removed."
                  />
                </div>
              </div>
              <span className="ds-variant-note">
                The trailing Expander renders as a Close (×) rather than a chevron.
              </span>
            </div>
          )}

          {activeStyleTab === 'Form' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div style={{ width: 480 }}>
                  <Header style="form" title="Shipping address" showInfo showTag showCaption />
                </div>
              </div>
              <span className="ds-variant-note">
                Form headers can carry a Tag and a Caption alongside the title, in addition to
                a Button, a Toggle, or an Expander.
              </span>
            </div>
          )}

          {activeStyleTab === 'Sub-form' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div style={{ width: 480 }}>
                  <Header style="sub-form" title="Billing address" showButton buttonLabel="Same as shipping" />
                </div>
              </div>
              <span className="ds-variant-note">
                Sub-form uses a tinted background to read as nested inside a parent Form.
              </span>
            </div>
          )}

          {activeStyleTab === 'Section' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div style={{ width: 480 }}>
                  <Header style="section" title="Search History" showButton buttonLabel="Clear All" />
                </div>
              </div>
              <span className="ds-variant-note">
                Section carries a white background but no padding of its own — it's meant to sit
                inside a parent surface that already provides that chrome.
              </span>
            </div>
          )}

          {activeStyleTab === 'Form-list' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div style={{ width: 480 }}>
                  <Header style="form-list" title="policy-2026-master.pdf" showTag tagLabel="Active" />
                </div>
              </div>
              <span className="ds-variant-note">
                Form-list adds a drag handle and thumbnail for reordering rows inside a list,
                plus a dedicated Delete action.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row ds-variant-row--scrim">
              <div className="ds-variant-row__cell">
                <Header style="form" title="Shipping address" />
                <span className="ds-variant-row__cell-label">Lg · 56px — Modal, Form, Sub-form, Form-list</span>
              </div>
              <div className="ds-variant-row__cell">
                <Header style="section" title="Search History" showButton buttonLabel="Clear All" />
                <span className="ds-variant-row__cell-label">Md · 32px — Section</span>
              </div>
            </div>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label ds-variant-tabs-label">Example</span>
            <div className="ds-line-tabs" role="tablist" aria-label="Header example compositions">
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
            <div className="ds-preview ds-preview--scrim ds-header-doc__example">
              {activeExampleTab === 'Action Panel' && (
                <ActionPanel
                  title="Promotion Details"
                  main={
                    <>
                      <ActionPanelField label="Storefront Code">
                        <ActionPanelValue>H0888001</ActionPanelValue>
                      </ActionPanelField>
                      <ActionPanelField label="Status">
                        <ActionPanelValue>Active</ActionPanelValue>
                      </ActionPanelField>
                      <ActionPanelField label="Promotion Date">
                        <ActionPanelValue>2026-09-01 – 2026-09-30</ActionPanelValue>
                      </ActionPanelField>
                    </>
                  }
                />
              )}
              {activeExampleTab === 'Modal' && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Modal size="sm" title="Upload Products" showInfo>
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
              {activeExampleTab === 'Form' && <HeaderExampleForm />}
            </div>
            <span className="ds-variant-note">
              Each tab is a real composition duplicated from that component's own doc page —
              hover to spotlight Header's role inside it.
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Each style maps to its own surface color, so a Header always reads as part of the
          container it titles.
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
              <td>Modal</td>
              <td style={{ width: 240 }}>
                <Header style="modal" title="Title" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--global-background-surface)', border: '1px solid var(--global-divider-neutral-light)' }} />
                  <code>global-background-surface</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Form</td>
              <td style={{ width: 240 }}>
                <Header style="form" title="Title" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--global-background-surface)', border: '1px solid var(--global-divider-neutral-light)' }} />
                  <code>global-background-surface</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Sub-form</td>
              <td style={{ width: 240 }}>
                <Header style="sub-form" title="Title" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-75)' }} />
                  <code>brand-primary-75</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Section</td>
              <td style={{ width: 240 }}>
                <Header style="section" title="Title" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-0)', border: '1px solid var(--global-divider-neutral-light)' }} />
                  <code>brand-neutral-0</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Form-list</td>
              <td style={{ width: 240 }}>
                <Header style="form-list" title="Title" showTag={false} showCaption={false} />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-100)' }} />
                  <code>brand-neutral-100</code>
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
          Modal, Form, Sub-form, and Form-list share the same top-corner radius and border;
          Section carries no chrome of its own.
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
              <th scope="row">Corner radius (top only)</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Bottom border</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px</td>
            </tr>
            <tr>
              <th scope="row">Modal padding</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px, all sides</td>
            </tr>
            <tr>
              <th scope="row">Form / Sub-form / Form-list padding</th>
              <td>
                <code>--space-component-padding-xl / --space-component-padding-lg</code>
              </td>
              <td>24px inline, 16px block</td>
            </tr>
            <tr>
              <th scope="row">Form / Sub-form / Form-list min-height</th>
              <td>
                <code>--component-height-lg</code>
              </td>
              <td>56px</td>
            </tr>
            <tr>
              <th scope="row">Section height</th>
              <td>
                <code>--component-height-md</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Title ↔ actions gap (Modal)</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Title ↔ actions gap (Form / Sub-form / Form-list)</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Title row ↔ description gap</th>
              <td>
                <code>--space-component-gap-xs</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Title type</th>
              <td>
                <code>--typography-md-font-size / --typography-md-line-height</code>
              </td>
              <td>16px / 22px</td>
            </tr>
            <tr>
              <th scope="row">Caption type</th>
              <td>
                <code>--typography-xs-font-size / --typography-xs-line-height</code>
              </td>
              <td>12px / 16px</td>
            </tr>
            <tr>
              <th scope="row">Description type</th>
              <td>
                <code>--typography-sm-font-size / --typography-sm-line-height</code>
              </td>
              <td>14px / 20px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Header.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('icon-button')}
          >
            <IconButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Icon Button</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('toggle')}
          >
            <ToggleIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Toggle</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('assets')}
          >
            <AssetsIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Assets</span>
          </button>
        </div>
      </section>
    </div>
  );
}
