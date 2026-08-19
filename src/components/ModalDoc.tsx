import { useState, type CSSProperties } from 'react';
import Modal, { type ModalSize } from './Modal';
import Header from './Header';
import Footer from './Footer';
import Button from './Button';
import Upload from './Upload';
import { Input } from './Input';
import { Select } from './Select';
import { Toggle } from './Toggle';
import { DateRangePicker } from './DateRangePicker';
import { Step } from './Step';
import { FilterChip } from './Chip';
import { ActionPanelField, ActionPanelValue } from './ActionPanel';
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell } from './Table';
import Pagination from './Pagination';
import { Tooltip } from './Tooltip';
import { ButtonIcon, HeaderIcon, FooterIcon, ZoomInIcon, ZoomOutIcon } from './icons';
import './ButtonDoc.css';
import './Table.css';
import './UploadDoc.css';
import './ModalDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/Claude-x-Design-System-Revamp?node-id=194-2826';

type ExampleId = 'upload' | 'audit-record' | 'crop-image' | 'form' | 'step' | 'table';

interface ExampleTab {
  id: ExampleId;
  label: string;
  size: ModalSize;
  title: string;
  figmaUrl: string;
}

const EXAMPLE_TABS: ExampleTab[] = [
  {
    id: 'upload',
    label: 'Upload',
    size: 'sm',
    title: 'Upload Products',
    figmaUrl:
      'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=755-14364&t=ZupQf9myTWU8iKm1-11',
  },
  {
    id: 'audit-record',
    label: 'Audit Record',
    size: 'md',
    title: 'Audit Record',
    figmaUrl:
      'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=778-19170&t=ZupQf9myTWU8iKm1-11',
  },
  {
    id: 'crop-image',
    label: 'Crop Image',
    size: 'md',
    title: 'Crop Image',
    figmaUrl:
      'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=764-18098&t=ZupQf9myTWU8iKm1-11',
  },
  {
    id: 'form',
    label: 'Form',
    size: 'lg',
    title: 'Add Product',
    figmaUrl:
      'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=775-25142&t=ZupQf9myTWU8iKm1-11',
  },
  {
    id: 'step',
    label: 'Step',
    size: 'xl',
    title: 'Add Product',
    figmaUrl:
      'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=789-30169&t=ZupQf9myTWU8iKm1-11',
  },
  {
    id: 'table',
    label: 'Table',
    size: 'full',
    title: 'Product Catalog',
    figmaUrl:
      'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=789-32146&t=ZupQf9myTWU8iKm1-11',
  },
];

const EXAMPLE_TABLE_ROWS = [
  { sku: 'SKU-1001', name: 'Wireless Keyboard', category: 'Electronics', price: '$49.00', stock: 120 },
  { sku: 'SKU-1002', name: 'Bluetooth Speaker', category: 'Electronics', price: '$79.00', stock: 64 },
  { sku: 'SKU-1003', name: 'Ceramic Mug', category: 'Home', price: '$12.00', stock: 340 },
  { sku: 'SKU-1004', name: 'Yoga Mat', category: 'Sports', price: '$25.00', stock: 95 },
  { sku: 'SKU-1005', name: 'Stainless Water Bottle', category: 'Home', price: '$18.00', stock: 210 },
  { sku: 'SKU-1006', name: 'Desk Lamp', category: 'Home', price: '$34.00', stock: 58 },
  { sku: 'SKU-1007', name: 'Running Shoes', category: 'Sports', price: '$89.00', stock: 42 },
  { sku: 'SKU-1008', name: 'Phone Case', category: 'Electronics', price: '$15.00', stock: 500 },
  { sku: 'SKU-1009', name: 'Notebook Set', category: 'Office', price: '$9.00', stock: 275 },
  { sku: 'SKU-1010', name: 'Wireless Mouse', category: 'Electronics', price: '$29.00', stock: 150 },
];

interface ModalDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function ModalDoc({ onNavigate }: ModalDocProps) {
  const [activeExampleId, setActiveExampleId] = useState<ExampleId>('upload');
  const activeExample = EXAMPLE_TABS.find((tab) => tab.id === activeExampleId)!;
  // 100 = the image's base rendered size already fits the crop cutout exactly
  // (see .ds-modal-example__crop-image in ModalDoc.css), so 100 is the default.
  const [cropZoom, setCropZoom] = useState(100);
  const [isCropZoomDragging, setIsCropZoomDragging] = useState(false);
  const cropZoomPercent = ((cropZoom - 50) / (200 - 50)) * 100;
  // Shared by the slider's own onChange and the +/- icon buttons below, so both
  // paths clamp to the same 50-200 range instead of duplicating the bounds.
  const stepCropZoom = (delta: number) =>
    setCropZoom((value) => Math.min(200, Math.max(50, value + delta)));

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Modal</h1>
        <p className="ds-doc__lede">
          A Modal is a larger floating surface for tasks that need room — a form, a data table,
          a multi-step flow — while still blocking the page behind it. It composes a Header, a
          scrollable body, and a Footer across five fixed widths.
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
          The default Modal: a title with a close action, a scrollable body, and a Footer of
          Back / Confirm actions.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <Modal title="Edit tier details">
            <p className="ds-modal-doc__placeholder-text">
              Modal body content — forms, tables, or any other content — scrolls independently
              of the fixed Header and Footer.
            </p>
          </Modal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Three parts: a Header, a scrollable body, and a Footer. The dimmed backdrop behind the
          panel is not part of Modal itself — like Dialog, it belongs to whatever presents the
          Modal (this doc's scrim, or a consuming app's own overlay).
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-modal-anatomy">
            <div className="ds-modal ds-modal--md ds-anatomy__demo" aria-hidden="true">
              <div className="ds-anatomy__part-relative">
                <Header style="modal" title="Title" showInfo />
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              </div>
              <div className="ds-modal__body ds-anatomy__part-relative">
                <p className="ds-modal-doc__placeholder-text">Body content</p>
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </div>
              <div className="ds-anatomy__part-relative">
                <Footer size="lg" style="divider" />
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">3</span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Header</strong> —{' '}
                  <span>title, optional info icon, and a close action</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Body</strong> — <span>arbitrary content; scrolls on overflow</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Footer</strong> —{' '}
                  <span>a leading action and up to two trailing actions</span>
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
          Six real compositions — built entirely from existing components — show every fixed
          size in context, from a compact Sm upload prompt to a Full product-catalog table.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Modal style examples">
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

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview ds-preview--scrim ds-preview--scroll">
              {/* No fixed height on this wrapper: .ds-modal--full's height:100% (Modal.css)
                  then has no definite parent height to resolve against, so it computes to
                  auto per spec — the Table example (the only 'full' example) hugs its own
                  content instead of being clipped/scrolled inside an arbitrary box height. */}
              <div style={{ width: '100%' }}>
                <Modal size={activeExample.size} title={activeExample.title} showInfo>
                  {/* Mirrors the Upload doc's own Overview demo exactly (same step-title/body/
                      detail/danger classes from UploadDoc.css) — Modal's sm width (432px) was
                      already an exact match for that demo's card width, so this modal is the
                      same upload flow, just staged inside a Modal's chrome instead of a
                      standalone card. */}
                  {activeExampleId === 'upload' && (
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
                  )}

                  {activeExampleId === 'audit-record' && (
                    <div className="ds-modal-example__grid">
                      <ActionPanelField label="Action">
                        <ActionPanelValue>Updated tier pricing</ActionPanelValue>
                      </ActionPanelField>
                      <ActionPanelField label="Performed By">
                        <ActionPanelValue>Sophia Soong</ActionPanelValue>
                      </ActionPanelField>
                      <ActionPanelField label="Module">
                        <ActionPanelValue>Product Catalog</ActionPanelValue>
                      </ActionPanelField>
                      <ActionPanelField label="Date & Time">
                        <ActionPanelValue>2026-08-11 14:32</ActionPanelValue>
                      </ActionPanelField>
                    </div>
                  )}

                  {activeExampleId === 'crop-image' && (
                    // flagged: no token exists for this crop mockup's fixed canvas/frame
                    // pixel dimensions (470x430, matching the Figma "Subtract" mask's own
                    // exported canvas size) — kept as raw values.
                    <div className="ds-modal-example__crop-canvas">
                      <div className="ds-modal-example__crop-frame">
                        <img
                          src="/assets/lightbox-lego-stack-cutout.png"
                          alt=""
                          className="ds-modal-example__crop-image"
                          // Drives the actual zoom: cropZoom is a 50–200 percent value,
                          // so 100 = native scale — the image's base rendered size (see
                          // .ds-modal-example__crop-image in ModalDoc.css) already matches
                          // the mask's cutout exactly, so 100% is "fit the crop square",
                          // not "fill the whole frame". Read by .ds-modal-example__crop-image's
                          // transform rule instead of the old static scale(0.8), so dragging
                          // the slider now visibly re-scales the image instead of just moving
                          // the track fill.
                          style={{ '--crop-zoom-scale': cropZoom / 100 } as CSSProperties}
                        />
                        {/* Figma "Subtract" (node 755:17466): a full-bleed dark mask with a
                            centered square cutout, marking the square area that will be
                            kept on crop. */}
                        <div className="ds-modal-example__crop-mask" aria-hidden="true" />
                      </div>
                      <div className="ds-modal-example__crop-zoom">
                        <button
                          type="button"
                          className="ds-modal-example__crop-zoom-btn"
                          aria-label="Zoom out"
                          onClick={() => stepCropZoom(-1)}
                          disabled={cropZoom <= 50}
                        >
                          <ZoomOutIcon className="ds-modal-example__crop-zoom-icon" />
                        </button>
                        <div className="ds-modal-example__crop-slider-wrap">
                          {isCropZoomDragging && (
                            <div
                              className="ds-modal-example__crop-slider-tooltip"
                              // Offsets the tooltip by the thumb's half-width (9px, see
                              // .ds-modal-example__crop-slider::-webkit-slider-thumb) so it
                              // stays centered over the thumb instead of the raw track %,
                              // which drifts at the low/high ends of a native range input.
                              style={{
                                left: `calc(${cropZoomPercent}% + ${(0.5 - cropZoomPercent / 100) * 18}px)`,
                              }}
                            >
                              <Tooltip size="sm">{cropZoom}%</Tooltip>
                            </div>
                          )}
                          <input
                            type="range"
                            className="ds-modal-example__crop-slider"
                            min={50}
                            max={200}
                            value={cropZoom}
                            onChange={(event) => setCropZoom(Number(event.target.value))}
                            onPointerDown={() => setIsCropZoomDragging(true)}
                            onPointerUp={() => setIsCropZoomDragging(false)}
                            style={{ '--slider-fill': `${cropZoomPercent}%` } as CSSProperties}
                          />
                        </div>
                        <button
                          type="button"
                          className="ds-modal-example__crop-zoom-btn"
                          aria-label="Zoom in"
                          onClick={() => stepCropZoom(1)}
                          disabled={cropZoom >= 200}
                        >
                          <ZoomInIcon className="ds-modal-example__crop-zoom-icon" />
                        </button>
                      </div>
                    </div>
                  )}

                  {activeExampleId === 'form' && (
                    <div className="ds-modal-example__form-grid">
                      <ActionPanelField label="Product Name">
                        <Input placeholder="Enter product name" size="lg" />
                      </ActionPanelField>
                      <ActionPanelField label="Category">
                        <Select placeholder="Select category" size="lg" />
                      </ActionPanelField>
                      <ActionPanelField label="Available Period">
                        <DateRangePicker />
                      </ActionPanelField>
                      <ActionPanelField label="Active">
                        <Toggle defaultChecked />
                      </ActionPanelField>
                    </div>
                  )}

                  {activeExampleId === 'step' && (
                    <div className="ds-modal-example__step-wrap">
                      <Step
                        orientation="horizontal"
                        items={[
                          { title: 'Basic Info', status: 'finished', stepNumber: 1 },
                          { title: 'Pricing', status: 'current', stepNumber: 2 },
                          { title: 'Review', status: 'default', stepNumber: 3 },
                        ]}
                      />
                      <div className="ds-modal-example__form-grid">
                        <ActionPanelField label="Original Price">
                          <Input placeholder="0.00" size="lg" />
                        </ActionPanelField>
                        <ActionPanelField label="Selling Price">
                          <Input placeholder="0.00" size="lg" />
                        </ActionPanelField>
                      </div>
                      <table className="ds-table ds-modal-example__step-table">
                        <thead>
                          <tr>
                            <th>Tier</th>
                            <th>Min Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Tier 1</th>
                            <td>1</td>
                            <td>$49.00</td>
                          </tr>
                          <tr>
                            <th scope="row">Tier 2</th>
                            <td>50</td>
                            <td>$45.00</td>
                          </tr>
                          <tr>
                            <th scope="row">Tier 3</th>
                            <td>200</td>
                            <td>$40.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeExampleId === 'table' && (
                    <div className="ds-table-example">
                      <div className="ds-table-toolbar">
                        <Input
                          className="ds-table-toolbar__search"
                          size="md"
                          placeholder="Search SKU ID or product name"
                        />
                        <div className="ds-table-toolbar__filters">
                          <FilterChip label="Category" />
                          <FilterChip label="In Stock" />
                        </div>
                        <div className="ds-table-toolbar__actions">
                          <Button variant="primary" appearance="ghost" size="md">
                            Reset
                          </Button>
                        </div>
                      </div>

                      <div className="ds-table-results">
                        <span className="ds-table-results__count">
                          1–{EXAMPLE_TABLE_ROWS.length} of {EXAMPLE_TABLE_ROWS.length} results
                        </span>
                        <div className="ds-table-results__actions">
                          <span className="ds-table-results__updated">
                            Last Updated 2026-08-11 09:15
                          </span>
                          <Button variant="primary" appearance="outline" size="md">
                            Refresh
                          </Button>
                          <Button variant="primary" appearance="outline" size="md">
                            Export
                          </Button>
                        </div>
                      </div>

                      <Table size="md">
                        <TableHeader>
                          <TableHeaderCell width={140}>SKU ID</TableHeaderCell>
                          <TableHeaderCell width={240}>Product Name</TableHeaderCell>
                          <TableHeaderCell width={140}>Category</TableHeaderCell>
                          <TableHeaderCell width={110} align="center">
                            Price
                          </TableHeaderCell>
                          <TableHeaderCell width={100} align="center">
                            Stock
                          </TableHeaderCell>
                        </TableHeader>
                        {EXAMPLE_TABLE_ROWS.map((row) => (
                          <TableRow key={row.sku}>
                            <TableCell>{row.sku}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell align="center">{row.price}</TableCell>
                            <TableCell align="center">{row.stock}</TableCell>
                          </TableRow>
                        ))}
                      </Table>

                      <div className="ds-table-example__pagination">
                        <Pagination currentPage={1} totalPages={1} />
                      </div>
                    </div>
                  )}
                </Modal>
              </div>
            </div>

            <a
              className="ds-modal-example__ref"
              href={activeExample.figmaUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon icon--xs" aria-hidden="true">
                draw
              </span>
              Reference in Figma
            </a>

            <span className="ds-variant-group__label">Size</span>
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Token</th>
                  <th>Width</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Sm</th>
                  <td>
                    <code>--component-width-modal-sm</code>
                  </td>
                  <td>432px</td>
                </tr>
                <tr>
                  <th scope="row">Md</th>
                  <td>
                    <code>--component-width-modal-md</code>
                  </td>
                  <td>656px</td>
                </tr>
                <tr>
                  <th scope="row">Lg</th>
                  <td>
                    <code>--component-width-modal-lg</code>
                  </td>
                  <td>1104px</td>
                </tr>
                <tr>
                  <th scope="row">Xl</th>
                  <td>
                    <code>--component-width-modal-xl</code>
                  </td>
                  <td>1328px</td>
                </tr>
                <tr>
                  <th scope="row">Full</th>
                  <td>
                    <code>--component-width-modal-full</code>
                  </td>
                  <td>1920px (fills its container)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Modal itself has no interactive state of its own — the ones below belong to its
          primary action Button, already documented in full on the Button page.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Surface</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="solid" size="md">
                  Confirm
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-solid-default)' }}
                  />
                  <code>interactive-button-surface-primary-solid-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="solid" size="md" forceState="hover">
                  Confirm
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-solid-hover)' }}
                  />
                  <code>interactive-button-surface-primary-solid-hover</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Focus</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="solid" size="md" forceState="focus">
                  Confirm
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-solid-focus)' }}
                  />
                  <code>interactive-button-surface-primary-solid-focus</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="solid" size="md" disabled>
                  Confirm
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-solid-disabled)' }}
                  />
                  <code>interactive-button-surface-primary-solid-disabled</code>
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
              <th scope="row">Width — Sm</th>
              <td>
                <code>--component-width-modal-sm</code>
              </td>
              <td>432px</td>
            </tr>
            <tr>
              <th scope="row">Width — Md</th>
              <td>
                <code>--component-width-modal-md</code>
              </td>
              <td>656px</td>
            </tr>
            <tr>
              <th scope="row">Width — Lg</th>
              <td>
                <code>--component-width-modal-lg</code>
              </td>
              <td>1104px</td>
            </tr>
            <tr>
              <th scope="row">Width — Xl</th>
              <td>
                <code>--component-width-modal-xl</code>
              </td>
              <td>1328px</td>
            </tr>
            <tr>
              <th scope="row">Width — Full</th>
              <td>
                <code>--component-width-modal-full</code>
              </td>
              <td>1920px, fills its container</td>
            </tr>
            <tr>
              <th scope="row">Panel surface</th>
              <td>
                <code>--surface-modal-surface-default</code>
              </td>
              <td>#ffffff</td>
            </tr>
            <tr>
              <th scope="row">Panel radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px (0 for Full)</td>
            </tr>
            <tr>
              <th scope="row">Backdrop</th>
              <td>
                <code>--global-overlay-dark</code>
              </td>
              <td>#22222299 — applied by the presenting surface, not Modal itself</td>
            </tr>
            <tr>
              <th scope="row">Body padding</th>
              <td>
                <code>--space-layout-section-padding-sm</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Header padding</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Footer height</th>
              <td>
                <code>--component-height-3xl</code>
              </td>
              <td>64px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Modal composes these components internally.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('header')}
          >
            <HeaderIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Header</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('footer')}
          >
            <FooterIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Footer</span>
          </button>
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
