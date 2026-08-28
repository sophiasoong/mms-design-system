import { useState } from 'react';
import { CardTabItem, LineTabItem, SegmentTabItem, ChipTab } from './Tab';
import { ChipIcon } from './icons';
import './ButtonDoc.css';
import './TabDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=194-2845';

const STYLE_TABS = ['Card Tab', 'Line Tab', 'Segment Tab', 'Chip Tab'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const STATE_TABS = ['Card Tab', 'Line Tab', 'Segment Tab', 'Chip Tab'] as const;
type StateTab = (typeof STATE_TABS)[number];

const EXAMPLE_TABS = ['Card Tab', 'Line Tab', 'Segment Tab', 'Chip Tab'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

const CARD_LABELS = ['Overview', 'Details', 'History'];
const LINE_LABELS = ['Overview', 'Comments', 'Activity'];
const SEGMENT_LABELS = ['Day', 'Week', 'Month'];
const CHIP_OPTIONS = ['All', 'Open', 'Closed', 'Archived'];

interface TabDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function TabDoc({ onNavigate }: TabDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Line Tab');
  const [activeStateTab, setActiveStateTab] = useState<StateTab>('Line Tab');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Line Tab');

  // ---- Variants: interactive demo state ----
  const [cardActive, setCardActive] = useState(CARD_LABELS[0]);
  const [lineActive, setLineActive] = useState(LINE_LABELS[0]);
  const [segmentActive, setSegmentActive] = useState(SEGMENT_LABELS[0]);
  const [chipSelected, setChipSelected] = useState(CHIP_OPTIONS[0]);
  const [sizeSegmentActive, setSizeSegmentActive] = useState<'sm' | 'md' | 'lg'>('lg');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Tab</h1>
        <p className="ds-doc__lede">
          A Tab lets users switch between related views without leaving the page. Card tab reads
          as a notebook divider atop its panel; Line tab is a lightweight underline strip; Segment
          tab is a connected, button-like control; Chip tab pairs a label with a row of filter
          chips.
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
          Use Card tab when tabs sit directly on top of a bordered panel; Line tab for a compact,
          low-emphasis switcher inside any surface; Segment tab when the choices behave like a
          single connected control (e.g. a view toggle); and Chip tab when the options read as
          filters rather than views.
        </p>
        <div className="ds-tab-overview-grid">
          <div className="ds-preview ds-preview--grid-2">
            <div className="ds-preview__group">
              <div className="ds-tab-line-group ds-tab-line-group--card" role="tablist" aria-label="Card tab example">
                <CardTabItem label="Overview" state="active" />
                <CardTabItem label="Details" />
                <CardTabItem label="History" />
              </div>
              <span className="ds-variant-row__cell-label">Card Tab</span>
            </div>
            <div className="ds-preview__group">
              <div className="ds-tab-line-group" role="tablist" aria-label="Line tab example">
                <LineTabItem label="Overview" state="active" />
                <LineTabItem label="Comments" badge="count" count="12" />
                <LineTabItem label="Activity" badge="dot" />
              </div>
              <span className="ds-variant-row__cell-label">Line Tab</span>
            </div>
            <div className="ds-preview__group">
              <div role="tablist" aria-label="Segment tab example">
                <SegmentTabItem label="Day" position="start" state="active" />
                <SegmentTabItem label="Week" position="middle" />
                <SegmentTabItem label="Month" position="end" />
              </div>
              <span className="ds-variant-row__cell-label">Segment Tab</span>
            </div>
            <div className="ds-preview__group">
              <ChipTab title="Filter" options={CHIP_OPTIONS} selected="Open" />
              <span className="ds-variant-row__cell-label">Chip Tab</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Shown here on Line tab, the simplest style — Card and Segment tab share the same
          Container / Label parts, swapping the underline indicator for a filled or bordered
          container instead.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-tab ds-tab--line ds-tab--active ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-tab__label ds-anatomy__part-relative">
                Label
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </span>
              <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>hit area; background/border responds to Default / Hover / Active / Disabled</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Label</strong> — <span>tab text; switches to the heading/medium weight when active</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Indicator</strong> —{' '}
                  <span>Line tab's active underline; Card tab uses a lifted panel instead, Segment tab a solid fill</span>
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
          Style changes the container and indicator; Card and Segment tab also come in multiple
          sizes.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Tab variant groups">
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
          {activeStyleTab === 'Card Tab' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div className="ds-tab-line-group ds-tab-line-group--card" role="tablist" aria-label="Card tab demo">
                  {CARD_LABELS.map((label) => (
                    <CardTabItem
                      key={label}
                      label={label}
                      state={cardActive === label ? 'active' : 'default'}
                      onClick={() => setCardActive(label)}
                    />
                  ))}
                </div>
              </div>
              <span className="ds-variant-note">
                The active card tab lifts to match the panel below it; add <code>closable</code>{' '}
                to show a trailing close icon (Material Symbols, not part of the underline itself).
              </span>
            </div>
          )}

          {activeStyleTab === 'Line Tab' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div className="ds-tab-line-group" role="tablist" aria-label="Line tab demo">
                  {LINE_LABELS.map((label, i) => (
                    <LineTabItem
                      key={label}
                      label={label}
                      state={lineActive === label ? 'active' : 'default'}
                      badge={i === 1 ? 'count' : i === 2 ? 'dot' : 'none'}
                      count="12"
                      onClick={() => setLineActive(label)}
                    />
                  ))}
                </div>
              </div>
              <span className="ds-variant-note">
                A count badge or a plain dot badge can sit beside the label to flag unread items;
                a trailing chevron (<code>showIcon</code>) is available for tabs that open a menu.
              </span>
            </div>
          )}

          {activeStyleTab === 'Segment Tab' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div role="tablist" aria-label="Segment tab demo">
                  {SEGMENT_LABELS.map((label, i) => (
                    <SegmentTabItem
                      key={label}
                      label={label}
                      position={i === 0 ? 'start' : i === SEGMENT_LABELS.length - 1 ? 'end' : 'middle'}
                      state={segmentActive === label ? 'active' : 'default'}
                      onClick={() => setSegmentActive(label)}
                    />
                  ))}
                </div>
              </div>
              <span className="ds-variant-note">
                Segments share one connected border and read as a single control — best for an
                exclusive choice like a view toggle, not independent panels.
              </span>
            </div>
          )}

          {activeStyleTab === 'Chip Tab' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <ChipTab
                  title="Filter"
                  options={CHIP_OPTIONS}
                  selected={chipSelected}
                  onSelect={setChipSelected}
                />
              </div>
              <span className="ds-variant-note">
                Reuses the existing Action chip (see Related Components) with a leading title label
                — best when the options read as filters rather than destinations.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <CardTabItem label="Label" size="lg" state="active" />
                <span className="ds-variant-row__cell-label">Card Lg · 40px</span>
              </div>
              <div className="ds-variant-row__cell">
                <CardTabItem label="Label" size="md" state="active" />
                <span className="ds-variant-row__cell-label">Card Md · 32px</span>
              </div>
            </div>
            <div className="ds-variant-row">
              {(['lg', 'md', 'sm'] as const).map((size) => (
                <div className="ds-variant-row__cell" key={size}>
                  <div role="tablist" aria-label={`Segment tab ${size} size`}>
                    <SegmentTabItem
                      label="Label"
                      size={size}
                      position="start"
                      state={sizeSegmentActive === size ? 'active' : 'default'}
                      onClick={() => setSizeSegmentActive(size)}
                    />
                    <SegmentTabItem
                      label="Label"
                      size={size}
                      position="end"
                      state="default"
                    />
                  </div>
                  <span className="ds-variant-row__cell-label">
                    Segment {size === 'lg' ? 'Lg · 40px' : size === 'md' ? 'Md · 32px' : 'Sm · 24px'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Each style staged with its real content from the reference frame: Card tab as a
            top-level store switcher, Line tab as the sub-nav beneath it, and Chip tab as the
            Order Status and Product Ready Methods filter rows. The reference has no Segment tab
            instance, so that one reuses the Day/Week/Month toggle from Variants above. Hover an
            item to isolate it from its neighbors.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Tab example groups">
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
            {activeExampleTab === 'Card Tab' && (
              <div className="ds-variant-group">
                <div className="ds-preview">
                  <div className="ds-tab-example">
                    <div className="ds-tab-example__row">
                      <div
                        className="ds-tab-line-group ds-tab-line-group--card"
                        role="tablist"
                        aria-label="Card tab example"
                      >
                        <CardTabItem label="HKTVmall" state="active" />
                        <CardTabItem label="ThePlace" />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">Store switcher, staged above its panel.</span>
              </div>
            )}

            {activeExampleTab === 'Line Tab' && (
              <div className="ds-variant-group">
                <div className="ds-preview">
                  <div className="ds-tab-example">
                    <div className="ds-tab-example__row">
                      <div
                        className="ds-tab-line-group"
                        role="tablist"
                        aria-label="Line tab example"
                      >
                        <LineTabItem label="Standard Delivery" state="active" />
                        <LineTabItem label="Merchant Delivery" />
                        <LineTabItem label="Non-Standard Delivery" />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">Delivery-type sub-nav beneath the store switcher.</span>
              </div>
            )}

            {activeExampleTab === 'Segment Tab' && (
              <div className="ds-variant-group">
                <div className="ds-preview">
                  <div className="ds-tab-example">
                    <div className="ds-tab-example__row">
                      <div role="tablist" aria-label="Segment tab example">
                        <SegmentTabItem label="Day" position="start" state="active" />
                        <SegmentTabItem label="Week" position="middle" />
                        <SegmentTabItem label="Month" position="end" />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">
                  Date-range toggle — the reference frame has no Segment tab instance of its own,
                  so this reuses the Day/Week/Month example from Variants above.
                </span>
              </div>
            )}

            {activeExampleTab === 'Chip Tab' && (
              <div className="ds-variant-group">
                <div className="ds-preview ds-preview--stack">
                  <div className="ds-tab-example">
                    <div className="ds-tab-example__row">
                      <ChipTab
                        title="Order Status"
                        options={['To-Ship', 'Shipping', 'Completed', 'Cancelled', 'All']}
                        selected="All"
                      />
                    </div>
                    <div className="ds-tab-example__row">
                      <ChipTab
                        title="Product Ready Methods"
                        options={[
                          'Standard Delivery',
                          'Same Day In-hub',
                          '3PL',
                          'Consignment',
                          'Hybrid Delivery Consolidated',
                          'All',
                        ]}
                        selected="Same Day In-hub"
                      />
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">Status and ready-method filter rows, stacked as they appear in the reference.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Every style shares the same Default / Hover / Active / Disabled progression; Segment
          tab's Active state also has no border since its solid fill already reads as selected.
        </p>
        <div className="ds-line-tabs ds-line-tabs--no-label" role="tablist" aria-label="Tab state groups">
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
          {activeStateTab === 'Card Tab' && (
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
                      <CardTabItem label="Label" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-100)' }} />
                        <code>brand-neutral-100</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <CardTabItem label="Label" state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                        <code>brand-primary-400 (label)</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Active</td>
                    <td>
                      <CardTabItem label="Label" state="active" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--global-background-surface)', border: '1px solid var(--brand-neutral-500)' }} />
                        <code>global-background-surface</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <CardTabItem label="Label" state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-700)' }} />
                        <code>brand-neutral-700 (label)</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Line Tab' && (
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
                      <LineTabItem label="Label" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--interactive-tab-label-line-default)' }} />
                        <code>interactive-tab-label-line-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <LineTabItem label="Label" state="hover" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--interactive-tab-label-line-hover)' }} />
                        <code>interactive-tab-label-line-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Active</td>
                    <td>
                      <LineTabItem label="Label" state="active" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--interactive-tab-indicator-line-active)' }} />
                        <code>interactive-tab-indicator-line-active</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <LineTabItem label="Label" state="disabled" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-700)' }} />
                        <code>brand-neutral-700 (label)</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Segment Tab' && (
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
                      <div role="tablist" aria-label="Segment default state">
                        <SegmentTabItem label="Label" position="start" />
                      </div>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--interactive-tab-surface-segment-default)', border: '1px solid var(--interactive-tab-border-segment-default)' }} />
                        <code>interactive-tab-surface-segment-default</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Hover</td>
                    <td>
                      <div role="tablist" aria-label="Segment hover state">
                        <SegmentTabItem label="Label" position="start" state="hover" />
                      </div>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--interactive-tab-surface-segment-hover)' }} />
                        <code>interactive-tab-surface-segment-hover</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Active</td>
                    <td>
                      <div role="tablist" aria-label="Segment active state">
                        <SegmentTabItem label="Label" position="start" state="active" />
                      </div>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--interactive-tab-surface-segment-active)' }} />
                        <code>interactive-tab-surface-segment-active</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Disabled</td>
                    <td>
                      <div role="tablist" aria-label="Segment disabled state">
                        <SegmentTabItem label="Label" position="start" state="disabled" />
                      </div>
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--interactive-tab-surface-segment-disabled)' }} />
                        <code>interactive-tab-surface-segment-disabled</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeStateTab === 'Chip Tab' && (
            <div className="ds-variant-group">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Selected</th>
                    <th>Preview</th>
                    <th>Surface token</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Default</td>
                    <td>No</td>
                    <td>
                      <ChipTab title="Filter" options={['Label']} selected="" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-100)' }} />
                        <code>brand-neutral-100</code>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Default</td>
                    <td>Yes</td>
                    <td>
                      <ChipTab title="Filter" options={['Label']} selected="Label" />
                    </td>
                    <td>
                      <span className="ds-swatch">
                        <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-75)' }} />
                        <code>brand-primary-75</code>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <span className="ds-variant-note">
                Chip tab's Hover / Disabled states are the underlying Action chip's — see Chip's
                own States section for the full table.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Card and Segment tab scale their height and padding with size; Line and Chip tab hold
          one fixed size each.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Card</th>
              <th>Line</th>
              <th>Segment</th>
              <th>Chip</th>
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
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-lg</code>
                  <span className="ds-tag">40px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-lg / -md / -xs</code>
                  <span className="ds-tag">40 / 32 / 24px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-md</code>
                  <span className="ds-tag">32px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Padding</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-md / -lg</code>
                  <span className="ds-tag">12 / 16px</span>
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
                  <code>--space-component-padding-sm / -lg</code>
                  <span className="ds-tag">8 / 16px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-md</code>
                  <span className="ds-tag">12px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Gap</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-sm</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-gap-md</code>
                  <span className="ds-tag">12px</span>
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
                  <code>--space-component-gap-md</code>
                  <span className="ds-tag">12px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td>
                <div className="ds-table-cell">
                  <code>--radius-md (top corners)</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>—</code>
                  <span className="ds-tag">n/a</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--radius-md (start / end)</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--radius-xl</code>
                  <span className="ds-tag">16px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Indicator</th>
              <td>
                <div className="ds-table-cell">
                  <code>—</code>
                  <span className="ds-tag">lifted panel</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--border-md</code>
                  <span className="ds-tag">2px underline</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--border-sm</code>
                  <span className="ds-tag">1px, collapsed between segments</span>
                </div>
              </td>
              <td>
                <div className="ds-table-cell">
                  <code>--border-sm</code>
                  <span className="ds-tag">1px selected border</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Tab.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('chip')}
          >
            <ChipIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Chip</span>
          </button>
        </div>
      </section>
    </div>
  );
}
