import { useState } from 'react';
import Form, { FormRow, FormCol, FormField } from './Form';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Toggle } from './Toggle';
import { Radio } from './Radio';
import { DateRangePicker } from './DateRangePicker';
import { DatePicker } from './DatePicker';
import Upload, { UploadImageItem } from './Upload';
import Button from './Button';
import IconButton from './IconButton';
import {
  InputIcon,
  SelectIcon,
  TextareaIcon,
  DatepickerIcon,
  TableIcon,
  UploadIcon,
} from './icons';
import './ButtonDoc.css';
import './FormDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=602-11970';

type FieldTypeId =
  | 'input'
  | 'number-input'
  | 'select'
  | 'date-picker'
  | 'textarea'
  | 'toggle'
  | 'radio'
  | 'readonly'
  | 'image-grid';

const FIELD_TYPE_TABS: { id: FieldTypeId; label: string }[] = [
  { id: 'input', label: 'Input' },
  { id: 'number-input', label: 'Number Input' },
  { id: 'select', label: 'Select' },
  { id: 'date-picker', label: 'Date Picker' },
  { id: 'textarea', label: 'Textarea' },
  { id: 'toggle', label: 'Toggle' },
  { id: 'radio', label: 'Radio' },
  { id: 'readonly', label: 'Readonly' },
  { id: 'image-grid', label: 'Image Grid' },
];

type ExampleId = 'form' | 'sub-form' | 'form-list';

const EXAMPLE_TABS: { id: ExampleId; label: string }[] = [
  { id: 'form', label: 'Form' },
  { id: 'sub-form', label: 'Sub-form' },
  { id: 'form-list', label: 'Form-list' },
];

/** The rich-text Textarea field shared by the Form and Sub-form examples (Figma's
 * "Textarea (Rich text)" field) — a formatting toolbar above the field, and a
 * character-count / error hint row below it. */
function RichTextField() {
  return (
    <FormField label="Title" info>
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
        <Textarea className="ds-richtext__field" placeholder="Placeholder" size="lg" />
      </div>
      <div className="ds-richtext__hint">
        <span className="ds-richtext__hint-error">Error Message</span>
        <span className="ds-richtext__hint-count">0/200</span>
      </div>
    </FormField>
  );
}

/** Example tab: Form (Figma 789:56940) — a plain Form composite: paired rows of
 * Input / DateRangePicker / Select fields, plus the shared rich-text Textarea field. */
function FormExample() {
  return (
    <Form title="General Information">
      <FormRow>
        <FormCol>
          <FormField label="Title">
            <Input placeholder="Placeholder" size="lg" />
          </FormField>
        </FormCol>
        <FormCol>
          <FormField label="Title">
            <Input placeholder="Placeholder" size="lg" />
          </FormField>
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <FormField label="Title" required>
            <DateRangePicker />
          </FormField>
        </FormCol>
        <FormCol>
          <FormField label="Title" required>
            <DateRangePicker />
          </FormField>
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <FormField label="Title">
            <Select placeholder="Placeholder" size="lg" />
          </FormField>
        </FormCol>
        <FormCol>
          <FormField label="Title">
            <Select placeholder="Placeholder" size="lg" />
          </FormField>
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <RichTextField />
        </FormCol>
      </FormRow>
    </Form>
  );
}

/** Example tab: Sub-form (Figma 941:56469) — a tinted wrapper (flagged token
 * substitution, see FormDoc.css) around a nested Form, demonstrating a Form embedded
 * inside another Form's field grid. */
function SubFormExample() {
  return (
    <div className="ds-subform">
      <div className="ds-subform__header">
        <span className="ds-subform__title">
          Sub-form Header
          <IconButton
            icon="info"
            variant="pending"
            appearance="ghost"
            size="sm"
            label="About Sub-form Header"
          />
        </span>
        <IconButton
          icon="expand_less"
          variant="neutral"
          appearance="ghost"
          size="sm"
          className="ds-icon-button--icon-scale-lg"
          label="Collapse Sub-form Header"
        />
      </div>
      <div className="ds-subform__body">
        <Form title="Form Header">
          <FormRow>
            <FormCol>
              <FormField label="Title">
                <Input placeholder="Placeholder" size="lg" />
              </FormField>
              <FormField label="Title" required>
                <Input placeholder="0" size="lg" type="number" />
              </FormField>
              <FormField label="Title">
                <Toggle label="Yes" defaultChecked />
              </FormField>
            </FormCol>
            <FormCol>
              <FormField label="Title">
                <Input placeholder="Placeholder" size="lg" />
              </FormField>
              <FormField label="Title" required>
                <DateRangePicker />
              </FormField>
              <FormField label="Title">
                <Select placeholder="Placeholder" size="lg" />
              </FormField>
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol>
              <RichTextField />
            </FormCol>
          </FormRow>
        </Form>
      </div>
    </div>
  );
}

/** One repeatable "Banner" card within the Form-list example (Figma 1201:63864) —
 * drag handle, thumbnail, title, delete/collapse actions, then an image + URL row and
 * a schedule row whose date fields only appear once "Schedule display period" is
 * selected. */
function BannerListItem({ scheduled, index }: { scheduled: boolean; index: number }) {
  const scheduleGroup = `banner-schedule-${index}`;
  return (
    <div className="ds-form-list-item">
      <div className="ds-form-list-item__header">
        <span className="icon icon--sm ds-form-list-item__drag" aria-hidden="true">
          drag_indicator
        </span>
        <span className="ds-form-list-item__thumb" aria-hidden="true">
          <span className="icon icon--sm" aria-hidden="true">
            image
          </span>
        </span>
        <span className="ds-form-list-item__title">
          Banner
          <span className="icon icon--sm ds-form-field__info" aria-hidden="true">
            info
          </span>
        </span>
        <div className="ds-form-list-item__actions">
          <IconButton
            icon="delete"
            label="Delete banner"
            variant="primary"
            appearance="ghost"
            size="sm"
          />
          <IconButton
            icon="expand_less"
            label="Collapse banner"
            variant="primary"
            appearance="ghost"
            size="sm"
          />
        </div>
      </div>
      <div className="ds-form-list-item__body">
        <FormRow>
          <FormCol>
            <FormField label="Banner">
              <p className="ds-form-doc__field-caption">
                Max size: 2MB; dimensions: 1920 x 360px; supported formats: .jpg / png / webp
              </p>
              <Upload style="image-grid" />
            </FormField>
          </FormCol>
          <FormCol>
            <FormField label="Banner URL">
              <Input placeholder="Please enter Direct to Merchant Page Banner URL" size="lg" />
            </FormField>
          </FormCol>
        </FormRow>
        <div className="ds-form-doc__schedule-row">
          <div className="ds-form-doc__schedule-cell ds-form-doc__schedule-cell--wide">
            <FormField label="Display Schedule">
              <div className="ds-form-doc__radio-row">
                <Radio name={scheduleGroup} label="Always display" defaultChecked={!scheduled} />
                <Radio
                  name={scheduleGroup}
                  label="Schedule display period"
                  defaultChecked={scheduled}
                />
              </div>
            </FormField>
          </div>
          {scheduled && (
            <>
              <div className="ds-form-doc__schedule-cell">
                <FormField label="Start Date & Hour" required>
                  <DatePicker placeholder="YYYY-MM-DD" size="lg" />
                </FormField>
              </div>
              <div className="ds-form-doc__schedule-cell">
                <FormField label="End Date & Hour" required>
                  <DatePicker placeholder="YYYY-MM-DD" size="lg" />
                </FormField>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** Example tab: Form-list (Figma 1201:63864) — a Form wrapping two repeatable Banner
 * cards (one scheduled, one always-displayed) plus an outlined "add" button with a
 * running count, demonstrating a repeatable list of composite fields inside a Form. */
function FormListExample() {
  return (
    <Form title="Direct to Merchant Page Banner">
      <BannerListItem scheduled index={1} />
      <BannerListItem scheduled={false} index={2} />
      <Button
        variant="primary"
        appearance="outline"
        size="md"
        leadingIcon="add"
        className="ds-form-doc__add-banner"
      >
        Add Direct to Merchant Page Banner 2/10
      </Button>
    </Form>
  );
}

interface FormDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function FormDoc({ onNavigate }: FormDocProps) {
  const [collapsedDemo, setCollapsedDemo] = useState(false);
  const [activeFieldTypeId, setActiveFieldTypeId] = useState<FieldTypeId>('input');
  const [activeExampleId, setActiveExampleId] = useState<ExampleId>('form');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Form</h1>
        <p className="ds-doc__lede">
          A Form is a collapsible section that groups related fields into a responsive column
          grid — Input, Select, Textarea, DatePicker, Toggle, and Radio controls stack inside
          labeled rows, with an optional embedded Table for line-item data.
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
          The default Form: a title with an info action, a two-column row of fields, and a
          collapse chevron.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <Form title="General Information">
            <FormRow>
              <FormCol>
                <FormField label="Product Name" required>
                  <Input placeholder="Enter product name" size="lg" />
                </FormField>
                <FormField label="Category" info>
                  <Select placeholder="Select category" size="lg" />
                </FormField>
              </FormCol>
              <FormCol>
                <FormField label="Available Period">
                  <DateRangePicker />
                </FormField>
                <FormField label="Active">
                  <Toggle defaultChecked />
                </FormField>
              </FormCol>
            </FormRow>
          </Form>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Three parts: a Header, one or more Form-col rows of equal-width columns, and each
          column's stack of labeled Fields.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-form-anatomy">
            <div className="ds-form ds-anatomy__demo" aria-hidden="true">
              <div className="ds-form__header ds-anatomy__part-relative">
                <div className="ds-form__header-content">
                  <span className="ds-form__title">General Information</span>
                  <IconButton icon="info" variant="pending" appearance="ghost" size="sm" label="About" />
                </div>
                <IconButton icon="expand_less" variant="pending" appearance="ghost" size="sm" label="Collapse" />
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              </div>
              <div className="ds-form__main ds-anatomy__part-relative">
                <div className="ds-form-row">
                  <FormCol>
                    <div className="ds-anatomy__part-relative">
                      <FormField label="Product Name" required>
                        <Input placeholder="Enter product name" size="lg" />
                      </FormField>
                      <span className="ds-anatomy__badge ds-anatomy__badge--side-left">3</span>
                    </div>
                    <FormField label="Category" info>
                      <Select placeholder="Select category" size="lg" />
                    </FormField>
                  </FormCol>
                  <FormCol>
                    <FormField label="Available Period">
                      <DateRangePicker />
                    </FormField>
                    <FormField label="Active">
                      <Toggle defaultChecked />
                    </FormField>
                  </FormCol>
                </div>
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Header</strong> —{' '}
                  <span>title, optional info icon and tag slot, and a collapse chevron</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Form-col row</strong> — <span>up to four equal-width columns</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Field</strong> —{' '}
                  <span>a label, optionally required or paired with info, above its control</span>
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
          Every field type Form can contain, each in its default state — switch tabs to preview
          Input, Number Input, Select, Date Picker, Textarea, Toggle, Radio, Readonly, and Image
          Grid.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Field Type</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Form field types">
          {FIELD_TYPE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeFieldTypeId === tab.id}
              className={`ds-line-tab${activeFieldTypeId === tab.id ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveFieldTypeId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ds-preview">
          <Form title="All Field Types" showHeader={false}>
            {activeFieldTypeId === 'input' && (
              <FormField label="Product Name" required>
                <Input placeholder="Enter product name" size="lg" />
              </FormField>
            )}
            {activeFieldTypeId === 'number-input' && (
              <FormField label="Weight (kg)" required>
                <Input placeholder="0.00" size="lg" type="number" />
              </FormField>
            )}
            {activeFieldTypeId === 'select' && (
              <FormField label="Category" info>
                <Select placeholder="Select category" size="lg" />
              </FormField>
            )}
            {activeFieldTypeId === 'date-picker' && (
              <FormField label="Available Period">
                <DateRangePicker />
              </FormField>
            )}
            {activeFieldTypeId === 'textarea' && (
              <FormField label="Shipping Notes">
                <Textarea placeholder="Add any special handling instructions" size="lg" />
              </FormField>
            )}
            {activeFieldTypeId === 'toggle' && (
              <FormField label="Active">
                <Toggle defaultChecked />
              </FormField>
            )}
            {activeFieldTypeId === 'radio' && (
              <FormField label="Fulfillment">
                <div className="ds-form-doc__radio-row">
                  <Radio name="fulfillment-variant" label="Warehouse" defaultChecked />
                  <Radio name="fulfillment-variant" label="Dropship" />
                </div>
              </FormField>
            )}
            {activeFieldTypeId === 'readonly' && (
              <FormField label="Order ID">
                <span className="ds-form-field__value">ORD-2024-00842</span>
              </FormField>
            )}
            {activeFieldTypeId === 'image-grid' && (
              <FormField label="Product Images">
                <Upload
                  style="image-grid"
                  images={
                    <UploadImageItem
                      size="lg"
                      shape="square"
                      state="filled"
                      thumbnail={<img src="/assets/lightbox-lego-stack-cutout.png" alt="" />}
                    />
                  }
                />
              </FormField>
            )}
          </Form>
        </div>

        <span className="ds-variant-group__label ds-variant-tabs-label">Example</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Form composition examples">
          {EXAMPLE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeExampleId === tab.id}
              className={`ds-line-tab${activeExampleId === tab.id ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveExampleId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ds-preview ds-preview--scrim">
          {activeExampleId === 'form' && <FormExample />}
          {activeExampleId === 'sub-form' && <SubFormExample />}
          {activeExampleId === 'form-list' && <FormListExample />}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Form's own state is its collapse toggle. Its field controls each carry their own
          default / hover / focus / error / disabled states, documented on their own pages.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <Form
            title="General Information"
            defaultCollapsed={collapsedDemo}
            key={String(collapsedDemo)}
          >
            <FormRow>
              <FormCol>
                <FormField label="Product Name" required>
                  <Input placeholder="Enter product name" size="lg" />
                </FormField>
              </FormCol>
            </FormRow>
          </Form>
        </div>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Trigger</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Expanded</td>
              <td>
                <button type="button" className="ds-line-tab" onClick={() => setCollapsedDemo(false)}>
                  Show expanded
                </button>
              </td>
            </tr>
            <tr>
              <td>Collapsed</td>
              <td>
                <button type="button" className="ds-line-tab" onClick={() => setCollapsedDemo(true)}>
                  Show collapsed
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Every measurement below comes from a token — no hardcoded values, except where flagged.
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
              <th scope="row">Container radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Header padding</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Header background</th>
              <td>
                <code>--surface-form-background-default</code>
              </td>
              <td>
                #ffffff — flagged: no matching token in the raw source data, substituted from{' '}
                <code>surface-card-surface-default</code> (identical value)
              </td>
            </tr>
            <tr>
              <th scope="row">Header divider</th>
              <td>
                <code>--global-divider-neutral-light</code>
              </td>
              <td>#f4f4f4</td>
            </tr>
            <tr>
              <th scope="row">Title color</th>
              <td>
                <code>--text-heading-primary-brand</code>
              </td>
              <td>#110964</td>
            </tr>
            <tr>
              <th scope="row">Main background</th>
              <td>
                <code>--brand-neutral-0</code>
              </td>
              <td>#ffffff</td>
            </tr>
            <tr>
              <th scope="row">Main padding</th>
              <td>
                <code>--space-layout-section-padding-md</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Row gap (between Form-col rows)</th>
              <td>
                <code>--space-layout-section-gap-md</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Column gap (within a Form-col row)</th>
              <td>
                <code>--space-layout-section-gap-md</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Field gap (within a column)</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Label / control gap</th>
              <td>
                <code>--space-component-gap-xs</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Label color</th>
              <td>
                <code>--text-label-primary</code>
              </td>
              <td>#5c5c5c</td>
            </tr>
            <tr>
              <th scope="row">Required mark color</th>
              <td>
                <code>--text-required-default</code>
              </td>
              <td>#ff4d4f</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Form.</p>
        <div className="ds-related-grid">
          <button type="button" className="ds-related-card ds-related-card--link" onClick={() => onNavigate?.('input')}>
            <InputIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Input</span>
          </button>
          <button type="button" className="ds-related-card ds-related-card--link" onClick={() => onNavigate?.('textarea')}>
            <TextareaIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Textarea</span>
          </button>
          <button type="button" className="ds-related-card ds-related-card--link" onClick={() => onNavigate?.('select')}>
            <SelectIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Select</span>
          </button>
          <button type="button" className="ds-related-card ds-related-card--link" onClick={() => onNavigate?.('datepicker')}>
            <DatepickerIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Datepicker</span>
          </button>
          <button type="button" className="ds-related-card ds-related-card--link" onClick={() => onNavigate?.('upload')}>
            <UploadIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Upload</span>
          </button>
          <button type="button" className="ds-related-card ds-related-card--link" onClick={() => onNavigate?.('table')}>
            <TableIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Table</span>
          </button>
        </div>
      </section>
    </div>
  );
}
