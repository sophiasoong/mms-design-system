import { useState } from 'react';
import Toast, { type ToastState } from './Toast';
import Button from './Button';
import IconButton from './IconButton';
import AppTopbar from './AppTopbar';
import { ButtonIcon, IconButtonIcon, FormIcon } from './icons';
import './ButtonDoc.css';
import './ToastDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=174-28283';
const EXAMPLE_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=1907-132768';

const VARIANT_TABS = ['Success', 'Info', 'Warning', 'Danger'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const STATE_BY_TAB: Record<VariantTab, ToastState> = {
  Success: 'success',
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
};

/** Per-state copy for the Style row below — single-line has no title and a fixed 48px
    row (no overflow handling of its own), so its description is written short enough to
    read as one real line at 396px; multi-line's description is written long enough to
    wrap to two lines, showing off the layout it's actually for. One realistic
    title/description/button per state either way, not Toast's own generic
    "Title"/"Description"/"Button" defaults. */
const SINGLE_LINE_COPY_BY_TAB: Record<VariantTab, { description: string; buttonLabel: string }> = {
  Success: {
    description: 'Changes saved successfully.',
    buttonLabel: 'View',
  },
  Info: {
    description: 'Maintenance begins at 11 PM.',
    buttonLabel: 'Learn more',
  },
  Warning: {
    description: "You've used 90% of your storage.",
    buttonLabel: 'Upgrade',
  },
  Danger: {
    description: 'Sync failed — check your connection.',
    buttonLabel: 'Retry',
  },
};

const MULTI_LINE_COPY_BY_TAB: Record<VariantTab, { title: string; description: string; buttonLabel: string }> = {
  Success: {
    title: 'Draft saved',
    description: "Your changes have been saved successfully. Publish when you're ready to make them live.",
    buttonLabel: 'View',
  },
  Info: {
    title: 'Maintenance scheduled',
    description: 'Scheduled maintenance begins tonight at 11:00 PM and lasts about 30 minutes.',
    buttonLabel: 'Learn more',
  },
  Warning: {
    title: 'Storage almost full',
    description: "You've used 90% of your storage. Upgrade your plan to keep uploading files.",
    buttonLabel: 'Upgrade',
  },
  Danger: {
    title: 'Sync failed',
    description: 'Sync failed — check your internet connection and try again in a few minutes.',
    buttonLabel: 'Retry',
  },
};

interface ToastDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function ToastDoc({ onNavigate }: ToastDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Success');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Toast</h1>
        <p className="ds-doc__lede">
          A Toast surfaces a brief, self-contained notification about the result of an action — a
          confirmation, a warning, or an error. Unlike a Banner, it always carries a semantic state
          and is meant to be transient.
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
          Toast is a bordered, tinted row — a state icon, a message, and up to two optional
          actions. State controls its color; layout controls whether it carries a title.
        </p>
        <div className="ds-preview">
          <Toast />
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
          <div className="ds-anatomy__figure ds-toast-anatomy">
            <div
              className="ds-toast ds-toast--success ds-toast--multi-line ds-anatomy__demo"
              aria-hidden="true"
            >
              <span className="ds-toast__icon ds-anatomy__part-relative">
                <span className="icon" aria-hidden="true">
                  check_circle
                </span>
                <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              </span>
              <div className="ds-toast__content">
                <p className="ds-toast__title">
                  <span className="ds-anatomy__part-relative">
                    Title
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">2</span>
                  </span>
                </p>
                <p className="ds-toast__desc ds-anatomy__part-relative">
                  Description
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">3</span>
                </p>
                <span className="ds-anatomy__part-relative">
                  <Button variant="primary" appearance="ghost" size="sm" className="ds-toast__button">
                    Button
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
                  className="ds-toast__close"
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
                    reflects the state — a check for Success, an info glyph for Info, a warning
                    triangle for Warning, an X for Danger
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
        <div className="ds-line-tabs" role="tablist" aria-label="Toast style groups">
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
                <Toast
                  state={STATE_BY_TAB[activeVariantTab]}
                  layout="single-line"
                  description={SINGLE_LINE_COPY_BY_TAB[activeVariantTab].description}
                  buttonLabel={SINGLE_LINE_COPY_BY_TAB[activeVariantTab].buttonLabel}
                />
                <span className="ds-variant-row__cell-label">Single-line</span>
              </div>
              <div className="ds-variant-row__cell">
                <Toast
                  state={STATE_BY_TAB[activeVariantTab]}
                  layout="multi-line"
                  title={MULTI_LINE_COPY_BY_TAB[activeVariantTab].title}
                  description={MULTI_LINE_COPY_BY_TAB[activeVariantTab].description}
                  buttonLabel={MULTI_LINE_COPY_BY_TAB[activeVariantTab].buttonLabel}
                />
                <span className="ds-variant-row__cell-label">Multi-line</span>
              </div>
            </div>
            {activeVariantTab === 'Success' && (
              <span className="ds-variant-note">
                For confirming that an action completed as expected.
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
                For a failed or blocked action that needs the user&apos;s attention.
              </span>
            )}
          </div>
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Toast doesn&apos;t live in a row like the Style examples above — it floats above the
            page it&apos;s reporting on, anchored to the top-right corner, clear of whatever the
            user was doing. Hover the composition to see which part is Toast.
          </p>

          <div className="ds-variant-groups">
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim ds-preview--scroll" style={{ padding: 0 }}>
                <div className="ds-toast-example">
                  <div className="ds-toast-example__dim">
                    <AppTopbar showLogo />
                  </div>
                  <div className="ds-toast-example__body" />
                  <div className="ds-toast-example__anchor">
                    <div className="ds-toast-example__focus">
                      <Toast
                        state="success"
                        layout="multi-line"
                        title="Draft saved successfully"
                        description="Your changes have been saved as a draft. Publish when you're ready to make it live."
                        showButton={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span className="ds-variant-note">
                Confirms a Save action on the page behind it, then dismisses on its own.{' '}
                <a
                  className="ds-toast-example__ref"
                  href={EXAMPLE_FIGMA_URL}
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
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Toast itself has no interactive state of its own — the ones below belong to its ghost
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
              <td>396px, fixed in every Figma instance and in this build</td>
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
                <em>none — flagged</em>
              </td>
              <td>6px (closest tokens are --radius-sm at 4px and --radius-md at 8px)</td>
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
              <th scope="row">Title ↔ Description gap</th>
              <td>
                <code>--space-component-gap-xs</code>
              </td>
              <td>4px</td>
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
        <p className="ds-section__desc">Components that commonly appear alongside Toast.</p>
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
