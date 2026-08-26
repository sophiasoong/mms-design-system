import { useState } from 'react';
import Banner, { type BannerState } from './Banner';
import Button from './Button';
import IconButton from './IconButton';
import { ButtonIcon, IconButtonIcon, FormIcon } from './icons';
import './ButtonDoc.css';
import './BannerDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=192-35114';

const VARIANT_TABS = ['Primary', 'Info', 'Warning', 'Danger'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const STATE_BY_TAB: Record<VariantTab, BannerState> = {
  Primary: 'primary',
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
};

const EXAMPLE_TABS = ['Feature update', 'Setup reminder', 'Payment failed'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

interface BannerDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function BannerDoc({ onNavigate }: BannerDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Primary');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Feature update');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Banner</h1>
        <p className="ds-doc__lede">
          A Banner surfaces a short, persistent message inline with the page content — a status
          update, a warning, or an announcement. Unlike a Dialog, it never blocks the page.
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
          Banner is a bordered, tinted row — a state icon, a message, and up to two optional
          actions. State controls its color; layout controls whether it carries a title.
        </p>
        <div className="ds-preview">
          <Banner />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Five parts: an icon, an optional title, a description, an optional button, and an
          optional close control.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-banner-anatomy">
            <div
              className="ds-banner ds-banner--primary ds-banner--multi-line ds-anatomy__demo"
              aria-hidden="true"
            >
              <span className="ds-banner__icon ds-anatomy__part-relative">
                <span className="icon" aria-hidden="true">
                  info
                </span>
                <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              </span>
              <div className="ds-banner__content">
                <p className="ds-banner__title">
                  <span className="ds-anatomy__part-relative">
                    Title
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">2</span>
                  </span>
                </p>
                <p className="ds-banner__desc ds-anatomy__part-relative">
                  This is a description.
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">3</span>
                </p>
                <span className="ds-anatomy__part-relative">
                  <Button variant="primary" appearance="ghost" size="sm" className="ds-banner__button">
                    Label
                  </Button>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">4</span>
                </span>
              </div>
              <span className="ds-anatomy__part-relative">
                <IconButton
                  icon="close"
                  variant="neutral"
                  appearance="ghost"
                  size="sm"
                  shape="square"
                  label="Dismiss"
                  className="ds-banner__close"
                />
                <span className="ds-anatomy__badge ds-anatomy__badge--side">5</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Icon</strong> —{' '}
                  <span>
                    reflects the state — an info glyph for Primary/Info/Warning, a warning
                    triangle for Danger
                  </span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Title</strong> —{' '}
                  <span>only in the multi-line layout; hide with showTitle={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Description</strong> — <span>the message body, always present</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Button</strong> —{' '}
                  <span>an optional ghost action; hide with showButton={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Close</strong> —{' '}
                  <span>an optional dismiss control; hide with showClose={'{false}'}</span>
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
          State sets the icon and surface color. Layout controls whether the message carries a
          title: single-line stays a fixed 48px row, multi-line grows to fit a title and
          description stacked above the button.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Banner style groups">
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
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Banner state={STATE_BY_TAB[activeVariantTab]} layout="single-line" />
                <span className="ds-variant-row__cell-label">Single-line</span>
              </div>
              <div className="ds-variant-row__cell">
                <Banner
                  state={STATE_BY_TAB[activeVariantTab]}
                  layout="multi-line"
                  title={activeVariantTab}
                />
                <span className="ds-variant-row__cell-label">Multi-line</span>
              </div>
            </div>
            {activeVariantTab === 'Primary' && (
              <span className="ds-variant-note">
                The default state — brand-purple icon and border, for general announcements.
              </span>
            )}
            {activeVariantTab === 'Info' && (
              <span className="ds-variant-note">
                For neutral, informational updates that don&apos;t need urgency.
              </span>
            )}
            {activeVariantTab === 'Warning' && (
              <span className="ds-variant-note">
                For messages that need attention but aren&apos;t blocking or destructive.
              </span>
            )}
            {activeVariantTab === 'Danger' && (
              <span className="ds-variant-note">
                The only state whose icon swaps to a warning triangle — reserve it for errors or
                failed operations.
              </span>
            )}
          </div>
        </div>

        <span className="ds-variant-group__label ds-variant-tabs-label">Example</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Banner example groups">
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
            <div className="ds-preview">
              {activeExampleTab === 'Feature update' && (
                <Banner
                  state="info"
                  layout="multi-line"
                  title="New: Bulk order export"
                  description="Export up to 500 orders at once from the Orders page."
                  showButton={false}
                />
              )}
              {activeExampleTab === 'Setup reminder' && (
                <Banner
                  state="warning"
                  layout="single-line"
                  description="Store verification is incomplete — some features are limited until setup is finished."
                  buttonLabel="Complete setup"
                  showClose={false}
                />
              )}
              {activeExampleTab === 'Payment failed' && (
                <Banner
                  state="danger"
                  layout="multi-line"
                  showTitle={false}
                  description="Payment failed. Update your billing information to keep your subscription active."
                  buttonLabel="Update billing"
                />
              )}
            </div>
            {activeExampleTab === 'Feature update' && (
              <span className="ds-variant-note">
                A dismissible announcement — informational, no action required, so the button is
                hidden.
              </span>
            )}
            {activeExampleTab === 'Setup reminder' && (
              <span className="ds-variant-note">
                A persistent reminder — pairs a call-to-action button with no close, since it stays
                until setup is finished.
              </span>
            )}
            {activeExampleTab === 'Payment failed' && (
              <span className="ds-variant-note">
                A multi-line banner with the title hidden — the description alone communicates the
                issue, so a title would be redundant.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Banner itself has no interactive state of its own — the ones below belong to its ghost
          Button, already documented in full on the Button page.
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
                <Button variant="primary" appearance="ghost" size="sm">
                  Label
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-ghost-default)' }}
                  />
                  <code>interactive-button-surface-primary-ghost-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="ghost" size="sm" forceState="hover">
                  Label
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-ghost-hover)' }}
                  />
                  <code>interactive-button-surface-primary-ghost-hover</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Focus</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="ghost" size="sm" forceState="focus">
                  Label
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-ghost-focus)' }}
                  />
                  <code>interactive-button-surface-primary-ghost-focus</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="ghost" size="sm" disabled>
                  Label
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-ghost-disabled)' }}
                  />
                  <code>interactive-button-surface-primary-ghost-disabled</code>
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
              <th scope="row">Container width</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>412px, fixed in every Figma instance and in this build</td>
            </tr>
            <tr>
              <th scope="row">Single-line height</th>
              <td>
                <code>--component-height-xl</code>
              </td>
              <td>48px</td>
            </tr>
            <tr>
              <th scope="row">Container padding (horizontal)</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Container padding (vertical)</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Container radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Container border</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px</td>
            </tr>
            <tr>
              <th scope="row">Icon ↔ Content gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Icon size</th>
              <td>
                <code>--component-icon-md</code> / <code>--component-icon-sm</code>
              </td>
              <td>24px tile, 16px glyph</td>
            </tr>
            <tr>
              <th scope="row">Title type</th>
              <td>
                <code>--typography-md</code>
              </td>
              <td>16px / 22px, medium</td>
            </tr>
            <tr>
              <th scope="row">Description type</th>
              <td>
                <code>--typography-sm</code>
              </td>
              <td>14px / 20px, regular</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Banner.</p>
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
            onClick={() => onNavigate?.('icon-button')}
          >
            <IconButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Icon Button</span>
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
