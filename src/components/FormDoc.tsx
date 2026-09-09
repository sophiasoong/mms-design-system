import { useState, useRef, useLayoutEffect } from 'react';
import Form, { FormRow, FormCol, FormField } from './Form';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Toggle } from './Toggle';
import { Radio } from './Radio';
import { DateRangePicker } from './DateRangePicker';
import { DatePicker } from './DatePicker';
import Upload, { UploadImageItem } from './Upload';
import List from './List';
import Button from './Button';
import IconButton from './IconButton';
import { Badge } from './Badge';
import { ChevronDownIcon, InputChip } from './Chip';
import { Tag } from './Tag';
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

type ColumnLayoutId = '1-col' | '2-col' | '3-col' | '4-col';

/** Figma's "Form-col" span variants (node 775-18658): how many equal FormCol columns
 * one FormRow splits into. The numeric id doubles as the column count. */
const COLUMN_LAYOUT_TABS: { id: ColumnLayoutId; label: string; columns: number }[] = [
  { id: '1-col', label: '1-col', columns: 1 },
  { id: '2-col', label: '2-col', columns: 2 },
  { id: '3-col', label: '3-col', columns: 3 },
  { id: '4-col', label: '4-col', columns: 4 },
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
function RichTextField({ defaultValue }: { defaultValue?: string } = {}) {
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

/** Example tab: Form (Figma 789:56940) — a plain Form composite: paired rows of
 * Input / DateRangePicker / Select fields, plus the shared rich-text Textarea field.
 * Fields carry sample filled-in data (rather than empty placeholders) so the example
 * reads as a real, in-progress form — also reused by the States section below. */
function FormExample({ defaultCollapsed }: { defaultCollapsed?: boolean } = {}) {
  return (
    <Form title="General Information" defaultCollapsed={defaultCollapsed}>
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
          <RichTextField defaultValue="Premium over-ear headphones with active noise cancellation and 30-hour battery life." />
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
          Product Variants
          <IconButton
            icon="info"
            variant="pending"
            appearance="ghost"
            size="sm"
            label="About Product Variants"
          />
        </span>
        <IconButton
          icon={<ChevronDownIcon className="ds-form__header-chevron--up" />}
          variant="neutral"
          appearance="ghost"
          size="sm"
          label="Collapse Product Variants"
        />
      </div>
      <div className="ds-subform__body">
        <Form title="Variant Details">
          <FormRow>
            <FormCol>
              <FormField label="Variant Name">
                <Input defaultValue="Wireless Bluetooth Headphones - Black" size="lg" />
              </FormField>
              <FormField label="Price" required>
                <Input defaultValue="129" size="lg" type="number" />
              </FormField>
              <FormField label="Active">
                <Toggle label="Yes" defaultChecked />
              </FormField>
            </FormCol>
            <FormCol>
              <FormField label="SKU">
                <Input defaultValue="WBH-BLK-001" size="lg" />
              </FormField>
              <FormField label="Availability Period" required>
                <DateRangePicker
                  defaultValue={{ start: new Date(2026, 0, 1), end: new Date(2026, 5, 30) }}
                />
              </FormField>
              <FormField label="Color">
                <Select label="Black" size="lg" />
              </FormField>
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol>
              <RichTextField defaultValue="Includes charging cable, carrying case, and 1-year warranty." />
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
interface BannerListItemProps {
  scheduled: boolean;
  index: number;
  dragging?: boolean;
  rootRef: (el: HTMLDivElement | null) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragEnterSelf: () => void;
  onDropOnSelf: () => void;
  onDelete: () => void;
}

function BannerListItem({
  scheduled,
  index,
  dragging,
  rootRef,
  onDragStart,
  onDragEnd,
  onDragEnterSelf,
  onDropOnSelf,
  onDelete,
}: BannerListItemProps) {
  const [isScheduled, setIsScheduled] = useState(scheduled);
  const [collapsed, setCollapsed] = useState(false);
  const scheduleGroup = `banner-schedule-${index}`;
  return (
    <div
      ref={rootRef}
      className={['ds-form-list-item', dragging && 'ds-form-list-item--dragging']
        .filter(Boolean)
        .join(' ')}
      onDragEnter={onDragEnterSelf}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onDropOnSelf();
      }}
    >
      <div className="ds-form-list-item__header">
        <span
          className="icon icon--sm ds-form-list-item__drag"
          aria-hidden="true"
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
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
            onClick={onDelete}
          />
          <IconButton
            icon={<ChevronDownIcon className={!collapsed ? 'ds-form__header-chevron--up' : undefined} />}
            label={collapsed ? 'Expand banner' : 'Collapse banner'}
            variant="primary"
            appearance="ghost"
            size="sm"
            aria-expanded={!collapsed}
            onClick={() => setCollapsed((c) => !c)}
          />
        </div>
      </div>
      <div
        className={['ds-form-list-item__body', collapsed && 'ds-form-list-item__body--collapsed']
          .filter(Boolean)
          .join(' ')}
        aria-hidden={collapsed || undefined}
      >
        <FormRow>
          <FormCol>
            <FormField label="Banner">
              <p className="ds-form-doc__field-caption">
                Max size: 2MB; dimensions: 1920 x 360px; supported formats: .jpg / png / webp
              </p>
              <Upload
                style="image-grid"
                showAddTile={false}
                images={<UploadImageItem size="sm" shape="square" state="default" />}
              />
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
                <Radio
                  name={scheduleGroup}
                  label="Always display"
                  checked={!isScheduled}
                  onChange={() => setIsScheduled(false)}
                />
                <Radio
                  name={scheduleGroup}
                  label="Schedule display period"
                  checked={isScheduled}
                  onChange={() => setIsScheduled(true)}
                />
              </div>
            </FormField>
          </div>
          {isScheduled && (
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
interface BannerData {
  id: number;
  scheduled: boolean;
}

const MAX_BANNERS = 10;

function FormListExample() {
  const [banners, setBanners] = useState<BannerData[]>([
    { id: 1, scheduled: true },
    { id: 2, scheduled: false },
  ]);
  const nextIdRef = useRef(3);
  const [dragId, setDragId] = useState<number | null>(null);
  // Live preview of the drop while dragging: the dragged card moves into whichever
  // card's slot the pointer enters, so the cards in between visibly push aside. Only
  // committed to `banners` on drop; a cancelled drag simply discards it.
  const [previewBanners, setPreviewBanners] = useState<BannerData[] | null>(null);
  const itemRefs = useRef(new Map<number, HTMLDivElement>());
  const firstRectsRef = useRef<Map<number, DOMRect> | null>(null);
  const displayBanners = previewBanners ?? banners;

  // Taken right before a state change that reorders the cards, so the rects are fresh —
  // getBoundingClientRect is viewport-relative, so a snapshot kept from an earlier
  // render would drift as soon as the doc page scrolled.
  const snapshotRects = () => {
    firstRectsRef.current = new Map(
      Array.from(itemRefs.current, ([id, node]) => [id, node.getBoundingClientRect()]),
    );
  };

  // FLIP: each card that changed slot is snapped back to where it was (transition off),
  // then released so .ds-form-list-item's CSS transform transition plays it to its new
  // slot. Measured rects keep mixed heights (collapsed/scheduled) exact.
  useLayoutEffect(() => {
    const firstRects = firstRectsRef.current;
    if (!firstRects) return;
    firstRectsRef.current = null;
    itemRefs.current.forEach((node, id) => {
      const first = firstRects.get(id);
      if (!first) return;
      const deltaY = first.top - node.getBoundingClientRect().top;
      if (!deltaY) return;
      node.style.transition = 'none';
      node.style.transform = `translateY(${deltaY}px)`;
      node.getBoundingClientRect();
      node.style.transition = '';
      node.style.transform = '';
    });
  }, [displayBanners]);

  const handleAddBanner = () => {
    setBanners((prev) =>
      prev.length >= MAX_BANNERS ? prev : [...prev, { id: nextIdRef.current++, scheduled: false }],
    );
  };

  // Removes the whole card; the rects snapshot lets the cards below FLIP-slide up into
  // the gap instead of jumping (same transition as the drag preview).
  const handleDeleteBanner = (id: number) => {
    snapshotRects();
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const handleDragStart = (id: number) => {
    setDragId(id);
    setPreviewBanners(banners);
  };

  // Ignores the dragged card itself: after a move it sits under the pointer, and
  // reacting to that would bounce the order straight back.
  const handleDragEnterItem = (targetId: number) => {
    if (dragId === null || targetId === dragId || !previewBanners) return;
    const from = previewBanners.findIndex((b) => b.id === dragId);
    const to = previewBanners.findIndex((b) => b.id === targetId);
    if (from === -1 || to === -1) return;
    const next = [...previewBanners];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    snapshotRects();
    setPreviewBanners(next);
  };

  const handleDrop = () => {
    if (previewBanners) setBanners(previewBanners);
    setDragId(null);
    setPreviewBanners(null);
  };

  // Fires after a drop too (preview already cleared then); only a cancelled drag with
  // a pending move still has cards to animate back.
  const handleDragEnd = () => {
    if (previewBanners && previewBanners !== banners) snapshotRects();
    setDragId(null);
    setPreviewBanners(null);
  };

  return (
    <Form title="Direct to Merchant Page Banner">
      {displayBanners.map((banner, i) => (
        <BannerListItem
          key={banner.id}
          scheduled={banner.scheduled}
          index={i + 1}
          dragging={dragId === banner.id}
          rootRef={(el) => {
            if (el) itemRefs.current.set(banner.id, el);
            else itemRefs.current.delete(banner.id);
          }}
          onDragStart={() => handleDragStart(banner.id)}
          onDragEnd={handleDragEnd}
          onDragEnterSelf={() => handleDragEnterItem(banner.id)}
          onDropOnSelf={handleDrop}
          onDelete={() => handleDeleteBanner(banner.id)}
        />
      ))}
      <Button
        variant="primary"
        appearance="outline"
        size="md"
        leadingIcon="add"
        className="ds-form-doc__add-banner"
        onClick={handleAddBanner}
        disabled={banners.length >= MAX_BANNERS}
      >
        Add Direct to Merchant Page Banner {banners.length}/{MAX_BANNERS}
      </Button>
    </Form>
  );
}

type SpecLineKind =
  | 'pad-top'
  | 'pad-bottom'
  | 'pad-left'
  | 'pad-right'
  | 'field-gap'
  | 'col-gap'
  | 'col-gap-mid'
  | 'summary-gap';

/** Red dashed measurement callout — same annotation style as ToastDoc's Example
 * (.ds-toast-example__gap), duplicated here under a page-scoped class per the doc-CSS
 * convention. Absolutely positioned, so it never affects the layout it measures. */
function SpecLine({ kind, value }: { kind: SpecLineKind; value: string }) {
  return (
    <span className={`ds-form-doc__spec ds-form-doc__spec--${kind}`} aria-hidden="true">
      <span>{value}</span>
    </span>
  );
}

/** One standard column of Figma's Form-col 1-col / 2-col / 3-col variants (node 775-18658):
 * Input-field, required Date-picker-field, Select-field — the same three placeholder
 * fields repeated per column so the tabs only differ by how the width is split.
 * `showFieldGaps` annotates the two field-to-field gaps (first column only);
 * `showColumnGap` annotates the gap to the column on its left (second column only), drawn
 * level with the first field gap so it stays clear of the centred padding leaders. */
function ColumnLayoutFieldCol({
  showFieldGaps,
  showColumnGap,
}: {
  showFieldGaps?: boolean;
  showColumnGap?: boolean;
}) {
  const measuredField = showFieldGaps ? 'ds-form-doc__column-layout-field--measured' : undefined;
  // The column-gap leader hangs off the second field (raised into the field-gap band above
  // it, see FormDoc.css --col-gap-mid) rather than the column's top edge, so that field is
  // the positioning anchor whenever either callout is shown.
  const secondField =
    showFieldGaps || showColumnGap ? 'ds-form-doc__column-layout-field--measured' : undefined;
  return (
    <FormCol>
      <FormField label="Title">
        <Input placeholder="Placeholder" size="lg" />
      </FormField>
      <FormField label="Title" required className={secondField}>
        {showFieldGaps && <SpecLine kind="field-gap" value="16px" />}
        {showColumnGap && <SpecLine kind="col-gap-mid" value="16px" />}
        <DateRangePicker />
      </FormField>
      <FormField label="Title" className={measuredField}>
        {showFieldGaps && <SpecLine kind="field-gap" value="16px" />}
        <Select placeholder="Placeholder" size="lg" />
      </FormField>
    </FormCol>
  );
}

/** Figma's 4-col variant swaps the field stacks for a readonly summary column: a primary
 * Tag heading a stack of Sm List rows (a medium-weight "Title" row followed by two
 * "Label · 1,000" rows, twice). Figma leaves columns 2 and 4 empty; the doc fills all four
 * so the preview has no dead space. */
function ColumnLayoutSummaryCol({
  showSummaryGap,
  showColumnGap,
}: {
  showSummaryGap?: boolean;
  showColumnGap?: boolean;
}) {
  return (
    <FormCol
      className={[
        'ds-form-doc__column-layout-summary',
        showColumnGap && 'ds-form-doc__column-layout-col--measured',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showColumnGap && <SpecLine kind="col-gap" value="16px" />}
      <Tag label="Label" color="primary" />
      <div
        className={[
          'ds-form-doc__column-layout-summary-list',
          showSummaryGap && 'ds-form-doc__column-layout-field--measured',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {showSummaryGap && <SpecLine kind="summary-gap" value="8px" />}
        {[0, 1].map((group) => (
          <div key={group}>
            <List
              size="sm"
              showLeadingIcon={false}
              showIconButton={false}
              showValue={false}
              label="Title"
              className="ds-form-doc__column-layout-summary-title"
            />
            <List size="sm" showLeadingIcon={false} showIconButton={false} label="Label" value="1,000" />
            <List size="sm" showLeadingIcon={false} showIconButton={false} label="Label" value="1,000" />
          </div>
        ))}
      </div>
    </FormCol>
  );
}

/** The Column Layout preview's single FormRow, split into `columns` equal FormCols. */
function ColumnLayoutRow({ columns }: { columns: number }) {
  if (columns === 4) {
    return (
      <FormRow>
        <ColumnLayoutSummaryCol showSummaryGap />
        <ColumnLayoutSummaryCol showColumnGap />
        <ColumnLayoutSummaryCol />
        <ColumnLayoutSummaryCol />
      </FormRow>
    );
  }
  return (
    <FormRow>
      {Array.from({ length: columns }, (_, i) => (
        <ColumnLayoutFieldCol key={i} showFieldGaps={i === 0} showColumnGap={i === 1} />
      ))}
    </FormRow>
  );
}

interface FormDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function FormDoc({ onNavigate }: FormDocProps) {
  const [collapsedDemo, setCollapsedDemo] = useState(false);
  const [activeFieldTypeId, setActiveFieldTypeId] = useState<FieldTypeId>('input');
  const [activeColumnLayoutId, setActiveColumnLayoutId] = useState<ColumnLayoutId>('1-col');
  const [activeExampleId, setActiveExampleId] = useState<ExampleId>('form');
  const [fulfillment, setFulfillment] = useState<'warehouse' | 'dropship'>('warehouse');

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
                  <Toggle label="Yes" defaultChecked />
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
                <IconButton
                  icon={<ChevronDownIcon className="ds-form__header-chevron--up" />}
                  variant="neutral"
                  appearance="ghost"
                  size="sm"
                  label="Collapse"
                />
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              </div>
              <div className="ds-form__main ds-anatomy__part-relative">
                <div className="ds-form-row">
                  <FormCol>
                    <div className="ds-anatomy__part-relative">
                      <FormField label="Product Name" required>
                        <Input placeholder="Enter product name" size="lg" />
                      </FormField>
                      <span className="ds-anatomy__badge ds-anatomy__badge--side-left ds-form-anatomy__badge--field">3</span>
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
                      <Toggle label="Yes" defaultChecked />
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
          Grid. Column Layout then shows how one FormRow splits into 1 to 4 equal FormCol
          columns.
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
          <Form
            title="All Field Types"
            showHeader={false}
            className={
              activeFieldTypeId === 'readonly'
                ? 'ds-form-doc__readonly-demo'
                : 'ds-form-doc__field-type-demo'
            }
          >
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
              <FormField label="Category">
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
                <Toggle label="Yes" defaultChecked />
              </FormField>
            )}
            {activeFieldTypeId === 'radio' && (
              <FormField label="Fulfillment">
                <div className="ds-form-doc__radio-row">
                  <Radio
                    name="fulfillment-variant"
                    label="Warehouse"
                    checked={fulfillment === 'warehouse'}
                    onChange={() => setFulfillment('warehouse')}
                  />
                  <Radio
                    name="fulfillment-variant"
                    label="Dropship"
                    checked={fulfillment === 'dropship'}
                    onChange={() => setFulfillment('dropship')}
                  />
                </div>
              </FormField>
            )}
            {activeFieldTypeId === 'readonly' && (
              <div className="ds-form-doc__readonly-grid">
                <div className="ds-variant-row__cell">
                  <FormField label="Order ID">
                    <span className="ds-form-field__value">ORD-2024-00842</span>
                  </FormField>
                  <span className="ds-variant-row__cell-label">Label</span>
                </div>
                <div className="ds-variant-row__cell">
                  <FormField label="Tracking Number">
                    <span className="ds-form-doc__readonly-link">
                      <span className="ds-form-doc__readonly-link-text">TRK-88213</span>
                      <span className="icon icon--sm" aria-hidden="true">
                        open_in_new
                      </span>
                    </span>
                  </FormField>
                  <span className="ds-variant-row__cell-label">Text button</span>
                </div>
                <div className="ds-variant-row__cell">
                  <FormField label="Order Status">
                    <Badge label="Pending" color="orange" />
                  </FormField>
                  <span className="ds-variant-row__cell-label">Badge</span>
                </div>
                <div className="ds-variant-row__cell">
                  <FormField label="Delivery Dates">
                    <div className="ds-form-doc__readonly-chip-row">
                      <InputChip label="2026-01-01" size="sm" showTrailingIcon={false} />
                      <InputChip label="2026-01-02" size="sm" showTrailingIcon={false} />
                      <InputChip label="2026-01-02" size="sm" showTrailingIcon={false} />
                      <Button variant="primary" appearance="ghost" size="sm">
                        View All (100)
                      </Button>
                    </div>
                  </FormField>
                  <span className="ds-variant-row__cell-label">Chip</span>
                </div>
                <div className="ds-variant-row__cell">
                  <FormField label="Categories">
                    <div className="ds-form-doc__readonly-tag-row">
                      <Tag label="Apparel" />
                      <Tag label="Footwear" />
                      <Tag label="Accessories" />
                    </div>
                  </FormField>
                  <span className="ds-variant-row__cell-label">Tag</span>
                </div>
              </div>
            )}
            {activeFieldTypeId === 'image-grid' && (
              <FormField label="Product Images">
                <Upload
                  style="image-grid"
                  showAddTile={false}
                  images={
                    <>
                      <UploadImageItem
                        size="sm"
                        shape="square"
                        state="filled"
                        thumbnail={<img src="/assets/lightbox-lego-stack-cutout.png" alt="" />}
                      />
                      <UploadImageItem
                        size="sm"
                        shape="square"
                        state="filled"
                        thumbnail={<img src="/assets/lightbox-lego-stack-cutout.png" alt="" />}
                      />
                      <UploadImageItem
                        size="sm"
                        shape="square"
                        state="filled"
                        thumbnail={<img src="/assets/lightbox-lego-stack-cutout.png" alt="" />}
                      />
                      <UploadImageItem
                        size="sm"
                        shape="square"
                        state="filled"
                        thumbnail={<img src="/assets/lightbox-lego-stack-cutout.png" alt="" />}
                      />
                      <UploadImageItem size="sm" shape="square" state="default" />
                    </>
                  }
                />
              </FormField>
            )}
          </Form>
        </div>

        <span className="ds-variant-group__label ds-variant-tabs-label">Column Layout</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Form column layouts">
          {COLUMN_LAYOUT_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeColumnLayoutId === tab.id}
              className={`ds-line-tab${activeColumnLayoutId === tab.id ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveColumnLayoutId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ds-preview ds-preview--scrim">
          <Form title="Column Layout" showHeader={false} className="ds-form-doc__column-layout-demo">
            {/* Main-slot padding callouts (space/layout/section/padding/md on all four sides);
                the field/column gap callouts live inside ColumnLayoutRow's columns. */}
            <SpecLine kind="pad-top" value="24px" />
            <SpecLine kind="pad-bottom" value="24px" />
            <SpecLine kind="pad-left" value="24px" />
            <SpecLine kind="pad-right" value="24px" />
            <ColumnLayoutRow
              columns={
                COLUMN_LAYOUT_TABS.find((tab) => tab.id === activeColumnLayoutId)?.columns ?? 1
              }
            />
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
          <FormExample defaultCollapsed={collapsedDemo} key={String(collapsedDemo)} />
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
          Every measurement below comes from a token — no hardcoded values.
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
                <code>--global-background-surface</code>
              </td>
              <td>#ffffff</td>
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
