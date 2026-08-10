import { useState } from 'react';
import Upload, { UploadDropzone, UploadImageItem } from './Upload';
import List from './List';
import Button from './Button';
import { ListIcon, ButtonIcon } from './icons';
import './ButtonDoc.css';
import './UploadDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=680-5826';

const METHOD_TABS = ['Dropzone', 'Image grid', 'Button'] as const;
type MethodTab = (typeof METHOD_TABS)[number];

const IMAGE_ITEM_TABS = ['Circular (sm)', 'Square (sm)', 'Square (lg)'] as const;
type ImageItemTab = (typeof IMAGE_ITEM_TABS)[number];

const IMAGE_ITEM_TAB_CONFIG: Record<ImageItemTab, { size: 'sm' | 'lg'; shape: 'round' | 'square' }> = {
  'Circular (sm)': { size: 'sm', shape: 'round' },
  'Square (sm)': { size: 'sm', shape: 'square' },
  'Square (lg)': { size: 'lg', shape: 'square' },
};

// Reference: Figma node 737:7217 pairs 9 filled tiles with 1 loading tile ahead of the
// built-in empty "add more" tile that Upload always appends in image-grid mode.
const IMAGE_GRID_FILLED_COUNT = 9;

const SAMPLE_RESULTS = [
  {
    icon: 'check_circle',
    tone: 'success' as const,
    label: 'Pass',
    value: '2,000',
    detail: [
      { tone: 'success' as const, label: 'Joined', value: '1,600' },
      { tone: 'success' as const, label: 'Excluded', value: '400' },
    ],
  },
  {
    icon: 'cancel',
    tone: 'danger' as const,
    label: 'Error',
    value: '400',
    detail: [
      { tone: 'danger' as const, label: 'Joined', value: '100' },
      { tone: 'danger' as const, label: 'Excluded', value: '300' },
    ],
  },
];

const SAMPLE_FILES = [
  { name: 'product-catalog.xls' },
  { name: 'inventory-list.csv' },
  { name: 'shipping-manifest.csv' },
  { name: 'customer-records.xlsx' },
];

interface UploadDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function UploadDoc({ onNavigate }: UploadDocProps) {
  const [activeMethodTab, setActiveMethodTab] = useState<MethodTab>('Dropzone');
  const [activeImageItemTab, setActiveImageItemTab] = useState<ImageItemTab>('Circular (sm)');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Upload</h1>
        <p className="ds-doc__lede">
          Upload is a field for getting files into the product — a dropzone with drag-and-drop and
          progress feedback, a grid of image tiles, or a plain trigger button, each paired with a
          list of the files already attached.
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
          A guided batch upload flow: download the template, fill it in, then upload the
          completed file.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <div style={{ width: '100%', maxWidth: 432 }}>
            <div className="ds-upload-doc__card ds-upload-doc__steps">
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
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Seven parts, shown here in the dropzone's Filled state — the container, title, and
          description are always present; the results, total, file list, and buttons appear once
          an upload completes.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-upload-anatomy">
            <div className="ds-upload ds-anatomy__demo" style={{ width: 320 }} aria-hidden="true">
              <div className="ds-upload-doc__card">
                <div className="ds-upload-dropzone ds-upload-dropzone--filled ds-anatomy__part-relative">
                  <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
                  <div className="ds-upload-dropzone__content">
                    <p className="ds-upload-dropzone__title ds-anatomy__part-relative">
                      Import result
                      <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
                    </p>
                    <p className="ds-upload-dropzone__description ds-anatomy__part-relative">
                      Description
                      <span className="ds-anatomy__badge ds-anatomy__badge--side-left">3</span>
                    </p>
                  </div>
                  <div className="ds-upload-dropzone__results ds-anatomy__part-relative">
                    <span className="ds-anatomy__badge ds-anatomy__badge--side-left">4</span>
                    {SAMPLE_RESULTS.map((row) => (
                      <div className="ds-upload-dropzone__result" key={row.label}>
                        <div className="ds-upload-dropzone__result-row">
                          <span
                            className={`icon icon--sm ds-upload-dropzone__result-icon ds-upload-dropzone__result-icon--${row.tone}`}
                            aria-hidden="true"
                          >
                            {row.icon}
                          </span>
                          <span className="ds-upload-dropzone__result-label">{row.label}</span>
                          <span className="ds-upload-dropzone__result-value">{row.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="ds-upload-dropzone__total ds-anatomy__part-relative">
                    Total product(s): 2,400
                    <span className="ds-anatomy__badge ds-anatomy__badge--side-left">5</span>
                  </p>
                </div>
                <div className="ds-upload__file-list ds-anatomy__part-relative">
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">6</span>
                  {SAMPLE_FILES.map((file) => (
                    <List
                      key={file.name}
                      size="sm"
                      icon="attach_file"
                      label={file.name}
                      showValue={false}
                      showPreview={false}
                    />
                  ))}
                </div>
                <div className="ds-upload__buttons ds-anatomy__part-relative">
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">7</span>
                  <Button variant="primary" appearance="outline" size="md">
                    Download Error Report
                  </Button>
                  <Button variant="primary" appearance="outline" size="md">
                    Upload Again
                  </Button>
                </div>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Dropzone</strong> —{' '}
                  <span>the container; state=default/hover/filled</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Title</strong> — <span>heading text, e.g. "Import result"</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Description</strong> — <span>supporting text; hide with showDescription={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Results</strong> —{' '}
                  <span>Filled-only rows, each optionally with an indented detail breakdown</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Total</strong> — <span>a right-aligned caption; hide with showTotal={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">6</span>
                <span>
                  <strong>File list</strong> — <span>reuses List (size sm) per attached file; hide with showFileList={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">7</span>
                <span>
                  <strong>Buttons</strong> — <span>optional actions, shown with showButtons={'{true}'}</span>
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
          Two independent variant sets: the upload method — how files get in — and the image
          item's size and shape — how each attached image tile is drawn.
        </p>

        <div id="variants-method" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Upload method</h3>
          <p className="ds-section__desc">
            Three field styles: a drag-and-drop dropzone, a grid of image tiles, and a plain
            trigger button — all three pair with the same reusable file list.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Upload method variants">
            {METHOD_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeMethodTab === tab}
                className={`ds-line-tab${activeMethodTab === tab ? ' ds-line-tab--active' : ''}`}
                onClick={() => setActiveMethodTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="ds-variant-groups">
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                {activeMethodTab === 'Dropzone' && (
                  <div className="ds-upload-doc__card" style={{ width: '100%', maxWidth: 395 }}>
                    <Upload
                      style="dropzone"
                      dropzone={{ state: 'filled', results: SAMPLE_RESULTS }}
                      files={SAMPLE_FILES}
                      showButtons
                    />
                  </div>
                )}
                {activeMethodTab === 'Image grid' && (
                  <div style={{ width: '100%', maxWidth: 516 }}>
                    <Upload
                      style="image-grid"
                      images={
                        <>
                          {Array.from({ length: IMAGE_GRID_FILLED_COUNT }).map((_, i) => (
                            <UploadImageItem
                              key={i}
                              size="lg"
                              shape="square"
                              state="filled"
                              thumbnail={<img src="/assets/lightbox-lego-stack-cutout.png" alt="" />}
                            />
                          ))}
                          <UploadImageItem size="lg" shape="square" state="loading" />
                        </>
                      }
                    />
                  </div>
                )}
                {activeMethodTab === 'Button' && (
                  <div className="ds-upload-doc__card">
                    <Upload style="button" files={SAMPLE_FILES} />
                  </div>
                )}
              </div>
              {activeMethodTab === 'Dropzone' && (
                <span className="ds-variant-note">
                  A drag-and-drop area; once a file is processed it switches to the Filled state
                  with a results summary, a file list, and follow-up actions.
                </span>
              )}
              {activeMethodTab === 'Image grid' && (
                <span className="ds-variant-note">
                  A flex-wrap grid of image tiles — filled and loading tiles can mix freely, always
                  trailed by an empty "add more" tile.
                </span>
              )}
              {activeMethodTab === 'Button' && (
                <span className="ds-variant-note">
                  A plain outline button trigger, for forms where a dropzone would be overkill.
                </span>
              )}
            </div>
          </div>
        </div>

        <div id="variants-image-item" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Image item</h3>
          <p className="ds-section__desc">
            The image-grid tile in each of its three size/shape combinations — there's no large
            round variant, only small round, small square, and large square.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Image item variants">
            {IMAGE_ITEM_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeImageItemTab === tab}
                className={`ds-line-tab${activeImageItemTab === tab ? ' ds-line-tab--active' : ''}`}
                onClick={() => setActiveImageItemTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="ds-variant-groups">
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <UploadImageItem
                  size={IMAGE_ITEM_TAB_CONFIG[activeImageItemTab].size}
                  shape={IMAGE_ITEM_TAB_CONFIG[activeImageItemTab].shape}
                  state="default"
                />
                <UploadImageItem
                  size={IMAGE_ITEM_TAB_CONFIG[activeImageItemTab].size}
                  shape={IMAGE_ITEM_TAB_CONFIG[activeImageItemTab].shape}
                  state="filled"
                  thumbnail={<img src="/assets/lightbox-lego-stack-cutout.png" alt="" />}
                />
                <UploadImageItem
                  size={IMAGE_ITEM_TAB_CONFIG[activeImageItemTab].size}
                  shape={IMAGE_ITEM_TAB_CONFIG[activeImageItemTab].shape}
                  state="loading"
                />
              </div>
              <span className="ds-variant-note">
                Default, Filled, and Loading side by side at the selected size and shape.
              </span>
              <table className="ds-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Token</th>
                    <th>Dimensions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Sm</th>
                    <td>
                      <code>--component-height-4xl</code>
                    </td>
                    <td>72 &times; 72px</td>
                  </tr>
                  <tr>
                    <th scope="row">Lg</th>
                    <td>
                      <code>--component-height-6xl</code>
                    </td>
                    <td>120 &times; 120px</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          The dropzone and image item are each literal Figma variants rather than CSS pseudo-states
          — pass the matching <code>state</code> prop directly.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Dropzone</span>
        <table className="ds-table ds-upload-doc__states-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Border</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td>
                <div style={{ width: 395 }}>
                  <UploadDropzone state="default" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-dropzone-border-default)' }} />
                  <code>interactive-dropzone-border-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td>
                <div style={{ width: 395 }}>
                  <UploadDropzone state="hover" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-dropzone-border-hover)' }} />
                  <code>interactive-dropzone-border-hover</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Filled</td>
              <td>
                <div style={{ width: 395 }}>
                  <UploadDropzone state="filled" results={SAMPLE_RESULTS} showTotal={false} />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-dropzone-border-filled)' }} />
                  <code>interactive-dropzone-border-filled</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <span className="ds-variant-group__label ds-variant-tabs-label">Image item</span>
        <table className="ds-table ds-upload-doc__states-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Border</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td>
                <UploadImageItem size="sm" shape="round" state="default" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-image-item-border-default)' }} />
                  <code>interactive-image-item-border-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Filled</td>
              <td>
                <UploadImageItem
                  size="sm"
                  shape="round"
                  state="filled"
                  thumbnail={<img src="/assets/lightbox-lego-stack-cutout.png" alt="" />}
                />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-image-item-border-selected)' }} />
                  <code>interactive-image-item-border-selected</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Loading</td>
              <td>
                <UploadImageItem size="sm" shape="round" state="loading" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-image-item-border-loading)' }} />
                  <code>interactive-image-item-border-loading</code>
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
              <th scope="row">Dropzone width</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>395px, fixed in Figma; kept fluid (100%) here to fill its container</td>
            </tr>
            <tr>
              <th scope="row">Dropzone padding (x / y)</th>
              <td>
                <code>--space-component-padding-lg</code> / <code>--space-component-padding-xl</code>
              </td>
              <td>16px / 24px</td>
            </tr>
            <tr>
              <th scope="row">Dropzone gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Dropzone radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Dropzone icon size</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>48px (largest icon token is --component-icon-lg at 36px)</td>
            </tr>
            <tr>
              <th scope="row">Progress bar track height</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>6px</td>
            </tr>
            <tr>
              <th scope="row">Detail row indent</th>
              <td>
                <code>--space-component-padding-xl</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Detail status dot</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>6px diameter</td>
            </tr>
            <tr>
              <th scope="row">Image item size (Sm / Lg)</th>
              <td>
                <code>--component-height-4xl</code> / <code>--component-height-6xl</code>
              </td>
              <td>72px / 120px</td>
            </tr>
            <tr>
              <th scope="row">Image grid width</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>516px, fixed in Figma; kept fluid (flex-wrap) here</td>
            </tr>
            <tr>
              <th scope="row">Image grid gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">File list row gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Field section gap</th>
              <td>
                <code>--space-layout-section-gap-sm</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Thumbnail overlay</th>
              <td>
                <code>--global-overlay-dark</code>
              </td>
              <td>#22222299</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components Upload is built from.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('list')}
          >
            <ListIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">List</span>
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
