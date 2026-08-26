import { useState } from 'react';
import { Card } from './Card';
import Button from './Button';
import { ListIcon, ButtonIcon, TagIcon } from './icons';
import './ButtonDoc.css';
import './CardDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=829-45366';

const VARIANT_TABS = ['Basic', 'Subscription date field', 'Highlighted / Most Popular'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

interface CardDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function CardDoc({ onNavigate }: CardDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Basic');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Card</h1>
        <p className="ds-doc__lede">
          A Card is a self-contained pricing plan surface — a price block, an itemized list of
          what's included, and an optional call-to-action. Reach for it when comparing plans or
          quoting an add-on, side by side with other Cards.
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
          Every Card leads with a price and closes with an itemized breakdown — everything else
          (badge, title, a Subscription date field, the footer button) is optional and only shows
          up on plans that need it.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <Card
            title="Customize Space"
            priceLabel="Starts at"
            price="$500 +"
            priceUnit="HKD per month"
            items={[
              { label: 'Storage', value: '60' },
              { label: 'Tote quota', value: '80' },
              { label: 'Pick pack', value: '40' },
              { label: 'Stock-in frequency', value: '4' },
            ]}
          />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Eight parts — only the container, price block, and list are always present.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-card-anatomy">
            <div
              className="ds-card ds-anatomy__demo ds-anatomy__part-relative"
              style={{ width: 300 }}
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              <span className="ds-card__badge ds-anatomy__part-relative">
                <span className="ds-tag" style={{ color: 'var(--surface-tag-label-neutral-default)' }}>
                  Most Popular
                </span>
                <span className="ds-anatomy__badge ds-anatomy__badge--side">2</span>
              </span>
              <div className="ds-card__body">
                <div className="ds-card__header">
                  <p className="ds-card__title ds-anatomy__part-relative">
                    Based on sales
                    <span className="ds-anatomy__badge ds-anatomy__badge--side-left">3</span>
                  </p>
                  <div className="ds-card__price ds-anatomy__part-relative">
                    <p className="ds-card__price-label">Starts at</p>
                    <p className="ds-card__price-value">$4,999</p>
                    <p className="ds-card__price-unit">HKD per month</p>
                    <span className="ds-anatomy__badge ds-anatomy__badge--side">4</span>
                  </div>
                  <div className="ds-card__field ds-anatomy__part-relative">
                    <p className="ds-card__field-label">Subscription</p>
                    <div
                      style={{
                        height: 40,
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--interactive-searchbar-border-default)',
                      }}
                    />
                    <span className="ds-anatomy__badge ds-anatomy__badge--side-left">5</span>
                  </div>
                  <div className="ds-card__divider ds-anatomy__part-relative">
                    <span className="ds-anatomy__badge ds-anatomy__badge--side">6</span>
                  </div>
                  <div className="ds-card__list ds-anatomy__part-relative">
                    <span className="ds-anatomy__badge ds-anatomy__badge--side-left">7</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: 32, alignItems: 'center' }}>
                      <span style={{ fontSize: 'var(--typography-sm-font-size)' }}>Storage</span>
                      <span style={{ fontSize: 'var(--typography-sm-font-size)' }}>60</span>
                    </div>
                  </div>
                </div>
                <div className="ds-card__footer ds-anatomy__part-relative">
                  <Button variant="primary" appearance="solid" size="lg" className="ds-anatomy__part-relative">
                    Apply Now
                  </Button>
                  <span className="ds-anatomy__badge">8</span>
                </div>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>the card surface; fixed 300px width, padding, and radius</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Badge</strong> —{' '}
                  <span>an optional pill (reusing Tag's primary style) inside the card, flush with the top padding</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Title</strong> — <span>an optional heading above the price</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Price block</strong> —{' '}
                  <span>a label, the price, and a unit, always centered</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Subscription field</strong> —{' '}
                  <span>an optional labeled Datepicker trigger, for date-driven plans</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">6</span>
                <span>
                  <strong>Divider</strong> —{' '}
                  <span>an optional rule separating the price block from the list</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">7</span>
                <span>
                  <strong>List</strong> —{' '}
                  <span>itemized label/value rows; a row can carry its own divider above it</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">8</span>
                <span>
                  <strong>Footer</strong> — <span>an optional full-width call-to-action Button</span>
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
          Three ways the same Card shows up in the source Figma spec — a plain plan, a
          subscription plan with a date field and a mid-list divider, and a highlighted plan with
          a badge and an elevated shadow.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Card style variants">
          {VARIANT_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeVariantTab === tab}
              className={`ds-line-tab${activeVariantTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveVariantTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview ds-preview--scrim">
              {activeVariantTab === 'Basic' && (
                <Card
                  title="Customize Space"
                  priceLabel="Starts at"
                  price="$500 +"
                  priceUnit="HKD per month"
                  items={[
                    { label: 'Storage', value: '60' },
                    { label: 'Tote quota', value: '80' },
                    { label: 'Pick pack', value: '40' },
                    { label: 'Stock-in frequency', value: '4' },
                  ]}
                />
              )}
              {activeVariantTab === 'Subscription date field' && (
                <Card
                  priceLabel="Subtotal"
                  price="$5,999"
                  priceUnit="per month"
                  dateField={{ label: 'Subscription' }}
                  showDivider={false}
                  items={[
                    { label: 'Storage', value: '100' },
                    { label: 'Tote(s)', value: '120' },
                    { label: 'Storage Fee', value: '$3,999', dividerBefore: true },
                    { label: 'Pick & pack', value: '$1,000' },
                    { label: 'Totes Deposit Fee', value: '$1,000' },
                  ]}
                  footer={
                    <Button variant="primary" appearance="solid" size="lg">
                      Apply Now
                    </Button>
                  }
                />
              )}
              {activeVariantTab === 'Highlighted / Most Popular' && (
                <Card
                  badge="Most Popular"
                  title={
                    <>
                      Based on sales
                      <br />
                      within 1 month
                    </>
                  }
                  priceLabel="Starts at"
                  price="$4,999"
                  priceUnit="HKD per month"
                  items={[
                    { label: 'Storage', value: '60' },
                    { label: 'Tote quota', value: '80' },
                    { label: 'Pick pack', value: '40' },
                    { label: 'Stock-in frequency', value: '4' },
                  ]}
                  footer={
                    <Button variant="primary" appearance="solid" size="lg">
                      Apply Now
                    </Button>
                  }
                  highlighted
                />
              )}
            </div>
            {activeVariantTab === 'Basic' && (
              <span className="ds-variant-note">A plain plan — price block, list, no extras.</span>
            )}
            {activeVariantTab === 'Subscription date field' && (
              <span className="ds-variant-note">
                A subscription plan with a date field and a mid-list divider.
              </span>
            )}
            {activeVariantTab === 'Highlighted / Most Popular' && (
              <span className="ds-variant-note">
                A highlighted plan with a badge and an elevated shadow.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Width is a fixed 300px in the source Figma spec — every other measurement below comes
          from a token.
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
              <th scope="row">Width</th>
              <td>—</td>
              <td>300px</td>
            </tr>
            <tr>
              <th scope="row">Container padding</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Header top padding</th>
              <td>
                <code>--space-component-padding-4xl</code>
              </td>
              <td>48px</td>
            </tr>
            <tr>
              <th scope="row">Header gap</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Body gap (header ↔ footer)</th>
              <td>
                <code>--space-layout-section-gap-lg</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Price block gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">List row gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Highlighted shadow</th>
              <td>
                <code>--brand-primary-100</code>
                <span className="ds-doc-flag">flagged</span>
              </td>
              <td>
                0px 1px 6px — Figma specifies <code>brand/primary/200</code> (#a9a1f7), which has
                no matching token; using the nearest existing tier
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">
          Components that commonly appear alongside Card.
        </p>
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
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('tag')}
          >
            <TagIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Tag</span>
          </button>
        </div>
      </section>
    </div>
  );
}
