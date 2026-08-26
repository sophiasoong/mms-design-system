import { useState } from 'react';
import { Tag, type TagColor } from './Tag';
import Message from './Message';
import { ContractIcon, ApprovalIcon, ThreePLIcon, PaymentIcon, OrderIcon } from './messageTypeIcons';
import Button from './Button';
import AppTopbar from './AppTopbar';
import List from './List';
import { Searchbar } from './Searchbar';
import { SearchbarIcon, MessageIcon, TableIcon } from './icons';
import './ButtonDoc.css';
import './TagDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=135-94';
const NOTIFICATION_PANEL_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=676-5949';
const GLOBAL_SEARCH_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=681-19234';

const OUTLINE_COLORS: TagColor[] = ['primary', 'green', 'orange', 'red', 'blue', 'gray'];

const STYLE_TABS = ['Outline', 'Solid'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const EXAMPLE_TABS = ['Message', 'Searchbar'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

interface TagDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function TagDoc({ onNavigate }: TagDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Outline');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Message');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Tag</h1>
        <p className="ds-doc__lede">
          A Tag is a small, static label used to categorize content or flag its status — unlike a
          Chip, it isn't clickable, selectable, or removable. Gray comes in both Solid and Outline
          style; every other color is Outline-only.
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
          Reach for color to carry meaning — Green for success/active states, Orange for pending,
          Red for error, Blue for informational, and Primary or Gray for neutral categorization.
        </p>
        <div className="ds-preview">
          <div className="ds-tab-chip-group" style={{ flexWrap: 'wrap' }}>
            <Tag label="Default" color="gray" />
            <Tag label="New" color="primary" />
            <Tag label="Active" color="green" />
            <Tag label="Pending" color="orange" />
            <Tag label="Error" color="red" />
            <Tag label="Info" color="blue" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Just two parts — a container that carries the color, and the label it holds.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-tag ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-tag__label ds-anatomy__part-relative">
                Label
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>fixed height and padding; background, border, and label color change per color/style</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Label</strong> — <span>tag text; no icon or interactive affordance</span>
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
          Style controls the container: Outline pairs a tinted background with a matching border;
          Solid drops the border and is only defined for Gray in the source Figma spec.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Tag style groups">
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
          {activeStyleTab === 'Outline' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                {OUTLINE_COLORS.map((color) => (
                  <div className="ds-variant-row__cell" key={color}>
                    <Tag label="Label" color={color} style="outline" />
                    <span className="ds-variant-row__cell-label">
                      {color[0].toUpperCase() + color.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStyleTab === 'Solid' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Tag label="Label" color="gray" style="solid" />
                  <span className="ds-variant-row__cell-label">Gray</span>
                </div>
              </div>
              <span className="ds-variant-note">
                No other color has a Solid style defined in the source Figma file — pass{' '}
                <code>style=&quot;solid&quot;</code> with another color only if a new design spec
                calls for it.
              </span>
            </div>
          )}
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Two places Tag shows up in composition: the notification panel dropped from the
            topbar's bell, and a global-search results panel.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Tag example groups">
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
            {activeExampleTab === 'Message' && (
              <div className="ds-variant-group">
                <div className="ds-preview ds-preview--scrim ds-preview--scroll" style={{ padding: 0 }}>
                  <div className="ds-tag-example-message">
                    <div className="ds-tag-example-message__dim">
                      <AppTopbar />
                    </div>
                    <div className="ds-tag-example-message__panel-row">
                      <div className="ds-tag-example-message__panel">
                        <Message
                          title="Contract"
                          description="A contract is ready for your signature — please review before the due date."
                          icon={<ContractIcon />}
                          tags={['Contract', 'Legal']}
                          date="2026-08-02"
                          showButton={false}
                          showBadge={false}
                        />
                        <Message
                          title="Approval"
                          description="A new request is waiting for your review and approval."
                          icon={<ApprovalIcon />}
                          tags={['Approval', 'Review']}
                          date="2026-07-30"
                          showButton={false}
                          showBadge={false}
                        />
                        <Message
                          title="3PL"
                          description="Your 3PL partner updated the shipment status for 3 pending orders."
                          icon={<ThreePLIcon />}
                          tags={['3PL', 'Logistics']}
                          date="2026-07-31"
                          showButton={false}
                          showBadge={false}
                        />
                        <Message
                          title="Payment"
                          description="A payment of $1,240.00 was successfully processed for invoice #48213."
                          icon={<PaymentIcon />}
                          tags={['Payment', 'Finance']}
                          date="2026-08-01"
                          showButton={false}
                          showBadge={false}
                        />
                        <Message
                          title="Order"
                          description="Order #10293 has shipped and is on its way to the customer."
                          icon={<OrderIcon />}
                          tags={['Order', 'Logistics']}
                          date="2026-08-02"
                          showButton={false}
                          showBadge={false}
                        />
                        <div className="ds-tag-example-message__panel-footer ds-tag-example-message__dim">
                          <Button
                            variant="primary"
                            appearance="outline"
                            size="md"
                            className="ds-tag-example-message__view-all"
                          >
                            View All
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">
                  Every row's tags stay highlighted on hover while the rest of the panel dims.{' '}
                  <a
                    className="ds-tag-example-message__ref"
                    href={NOTIFICATION_PANEL_FIGMA_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon icon--xs" aria-hidden="true">
                      draw
                    </span>
                    Reference in Figma
                  </a>
                </span>
              </div>
            )}

            {activeExampleTab === 'Searchbar' && (
              <div className="ds-variant-group">
                <div className="ds-preview ds-preview--scrim">
                  <div className="ds-tag-example-searchbar">
                    <div className="ds-tag-example-searchbar__panel">
                      <div className="ds-tag-example-searchbar__searchbar-row ds-tag-example-searchbar__dim">
                        <Searchbar size="lg" state="focus" chipLabel="Label" defaultValue="Label" />
                      </div>
                      <div className="ds-tag-example-searchbar__rows">
                        <List
                          size="lg"
                          label="Storefront Setup"
                          showFilterChip={false}
                          subtitle={
                            <>
                              Key<mark className="ds-list__mark">word</mark> • Keyword • Keyword •
                              Intent
                            </>
                          }
                          caption="Online Store / Storefront / Setup / Marketing / Campaigns / Automation"
                        />
                        <List
                          size="lg"
                          label="Storefront Domain Settings"
                          tag="Product"
                          subtitle={
                            <>
                              Key<mark className="ds-list__mark">word</mark> • Keyword • Keyword •
                              Intent
                            </>
                          }
                          caption="Online Store / Storefront / Domain / Settings / Advanced / Custom"
                        />
                        <List
                          size="lg"
                          label="Free Gift Promotion"
                          tag="Promotion"
                          subtitle={
                            <>
                              Key<mark className="ds-list__mark">word</mark> • Keyword • Keyword •
                              Intent
                            </>
                          }
                          caption="Online Store / Promotions / Free Gift / Campaign / Rules / Eligibility"
                        />
                      </div>
                      <div className="ds-tag-example-searchbar__footer ds-tag-example-searchbar__dim">
                        <span className="ds-tag-example-searchbar__kbd">Esc</span>
                        <span className="ds-tag-example-searchbar__hint">Close</span>
                        <span className="ds-tag-example-searchbar__kbd">/</span>
                        <span className="ds-tag-example-searchbar__hint">Open global search</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">
                  Each result's category tag stays highlighted on hover while the rest of the row
                  dims.{' '}
                  <a
                    className="ds-tag-example-searchbar__ref"
                    href={GLOBAL_SEARCH_FIGMA_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon icon--xs" aria-hidden="true">
                      draw
                    </span>
                    Reference in Figma
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Tag is a static label, not an interactive control — it has no hover, focus, or disabled
          state. Each color/style resolves to these container and label tokens.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Color</th>
              <th>Style</th>
              <th>Preview</th>
              <th>Background</th>
              <th>Border</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gray</td>
              <td>Outline</td>
              <td>
                <Tag label="Label" color="gray" style="outline" />
              </td>
              <td>
                <code>surface-tag-background-neutral-default</code>
              </td>
              <td>
                <code>surface-tag-border-neutral-default</code>
              </td>
              <td>
                <code>surface-tag-label-neutral-default</code>
              </td>
            </tr>
            <tr>
              <td>Gray</td>
              <td>Solid</td>
              <td>
                <Tag label="Label" color="gray" style="solid" />
              </td>
              <td>
                <code>surface-tag-background-neutral-default</code>
              </td>
              <td>—</td>
              <td>
                <code>surface-tag-label-neutral-default</code>
              </td>
            </tr>
            <tr>
              <td>Primary</td>
              <td>Outline</td>
              <td>
                <Tag label="Label" color="primary" />
              </td>
              <td>
                <code>brand-primary-50</code>
              </td>
              <td>
                <code>brand-primary-100</code>
              </td>
              <td>
                <code>brand-primary-300</code>
              </td>
            </tr>
            <tr>
              <td>Green</td>
              <td>Outline</td>
              <td>
                <Tag label="Label" color="green" />
              </td>
              <td>
                <code>brand-green-100</code>
              </td>
              <td>
                <code>brand-green-300</code>
              </td>
              <td>
                <code>brand-green-600</code>
              </td>
            </tr>
            <tr>
              <td>Orange</td>
              <td>Outline</td>
              <td>
                <Tag label="Label" color="orange" />
              </td>
              <td>
                <code>brand-secondary-200</code>
              </td>
              <td>
                <code>interactive-button-surface-secondary-solid-focus</code>
              </td>
              <td>
                <code>interactive-icon-button-icon-secondary-ghost-default</code>
              </td>
            </tr>
            <tr>
              <td>Red</td>
              <td>Outline</td>
              <td>
                <Tag label="Label" color="red" />
              </td>
              <td>
                <code>interactive-button-surface-danger-ghost-hover</code>
              </td>
              <td>
                <code>brand-danger-300</code>
              </td>
              <td>
                <code>brand-danger-500</code>
              </td>
            </tr>
            <tr>
              <td>Blue</td>
              <td>Outline</td>
              <td>
                <Tag label="Label" color="blue" />
              </td>
              <td>
                <code>brand-blue-100</code>
              </td>
              <td>
                <code>brand-blue-300</code>
              </td>
              <td>
                <code>brand-blue-600</code>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">Every color and style shares the same fixed geometry.</p>
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
              <th scope="row">Height</th>
              <td>
                <code>--component-height-xs</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Padding</th>
              <td>
                <code>--space-component-padding-xs / -sm</code>
              </td>
              <td>4px / 8px (vertical / horizontal)</td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td>
                <code>--radius-sm</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Border</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px (Outline only)</td>
            </tr>
            <tr>
              <th scope="row">Type</th>
              <td>
                <code>--typography-xs</code>
              </td>
              <td>12px / 16px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Tag.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('searchbar')}
          >
            <SearchbarIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Searchbar</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('message')}
          >
            <MessageIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Message</span>
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
