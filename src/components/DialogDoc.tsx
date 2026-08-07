import { useState } from 'react';
import Dialog from './Dialog';
import Button from './Button';
import { Checkbox } from './Checkbox';
import { ProgressRing } from './Indicator';
import { ButtonIcon, CheckboxIcon, IndicatorIcon } from './icons';
import './ButtonDoc.css';
import './DialogDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=194-2828';

const VARIANT_TABS = ['Confirm', 'Alert', 'Destructive', 'Loading', 'With Checkbox'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

interface DialogDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function DialogDoc({ onNavigate }: DialogDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Confirm');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Dialog</h1>
        <p className="ds-doc__lede">
          A Dialog interrupts the current flow to ask for confirmation, surface a short message,
          or report progress. It always floats centered over a dimmed backdrop.
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
          Dialog is a fixed-width card — a title and description, an optional opt-in checkbox,
          and a set of actions. Use it sparingly, for moments that truly need to block the user.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <Dialog />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Four parts: a title, an optional description, an optional checkbox, and a row of
          actions.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-dialog-anatomy">
            <div className="ds-dialog ds-anatomy__demo" aria-hidden="true">
              <div className="ds-dialog__content">
                <p className="ds-dialog__title ds-anatomy__part-relative">
                  Remove the tier
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
                </p>
                <p className="ds-dialog__desc ds-anatomy__part-relative">
                  If you confirm to remove the tier, it can&apos;t be restored.
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
                </p>
                <span className="ds-anatomy__part-relative">
                  <Checkbox label="Don't show this again" />
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
                </span>
              </div>
              <div className="ds-dialog__buttons ds-anatomy__part-relative">
                <Button variant="primary" appearance="ghost" size="md">
                  Label
                </Button>
                <Button variant="primary" appearance="solid" size="md">
                  Label
                </Button>
                <span className="ds-anatomy__badge ds-anatomy__badge--side">4</span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Title</strong> — <span>a short headline, always present</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Description</strong> —{' '}
                  <span>supporting body text; omit it for a compact alert dialog</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Checkbox</strong> —{' '}
                  <span>an opt-in like "Don't show this again"; hidden by default</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Buttons</strong> —{' '}
                  <span>one to two actions, or a Progress ring while loading</span>
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
          Layout controls the actions row: Confirm pairs a ghost and a solid primary action;
          Alert drops the description for a single solid action; Destructive swaps the solid
          action for danger; Loading replaces the actions with a Progress ring.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Layout</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Dialog layout groups">
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
              {activeVariantTab === 'Confirm' ? (
                <Dialog layout="confirm" secondaryLabel="Cancel" primaryLabel="Confirm" />
              ) : activeVariantTab === 'Alert' ? (
                <Dialog
                  layout="alert"
                  title="Update available"
                  showDescription={false}
                  primaryLabel="Got it"
                />
              ) : activeVariantTab === 'Destructive' ? (
                <Dialog
                  layout="destructive"
                  title="Delete tier"
                  description="This tier and its pricing rules will be permanently removed."
                  secondaryLabel="Cancel"
                  primaryLabel="Delete"
                />
              ) : activeVariantTab === 'Loading' ? (
                <Dialog
                  layout="loading"
                  title="Loading Data"
                  description="Please wait, do not close the window."
                />
              ) : (
                <Dialog
                  layout="confirm"
                  showCheckbox
                  secondaryLabel="Cancel"
                  primaryLabel="Confirm"
                />
              )}
            </div>
            {activeVariantTab === 'Confirm' && (
              <span className="ds-variant-note">
                The default layout — a ghost secondary action beside a solid primary action.
              </span>
            )}
            {activeVariantTab === 'Alert' && (
              <span className="ds-variant-note">
                Pass <code>showDescription={'{false}'}</code> and{' '}
                <code>layout="alert"</code> for a compact, single-action dialog.
              </span>
            )}
            {activeVariantTab === 'Destructive' && (
              <span className="ds-variant-note">
                <code>layout="destructive"</code> renders the primary action as a solid danger
                Button instead of solid primary.
              </span>
            )}
            {activeVariantTab === 'Loading' && (
              <span className="ds-variant-note">
                <code>layout="loading"</code> centers an indeterminate Progress ring in place of
                the actions row — there is nothing for the user to click.
              </span>
            )}
            {activeVariantTab === 'With Checkbox' && (
              <span className="ds-variant-note">
                Pass <code>showCheckbox</code> to add an opt-in below the description — Figma
                keeps this hidden by default.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Dialog itself has no interactive state of its own — the ones below belong to its
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
              <th scope="row">Card width</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>416px, fixed in every Figma instance</td>
            </tr>
            <tr>
              <th scope="row">Card padding</th>
              <td>
                <code>--space-component-padding-2xl</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Card radius</th>
              <td>
                <code>--radius-md</code> <em>(closest — Figma specs 6px)</em>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Content ↔ Buttons gap</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Title ↔ Description gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Button ↔ Button gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
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
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Dialog composes these components internally.</p>
        <div className="ds-related-grid">
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
            onClick={() => onNavigate?.('checkbox')}
          >
            <CheckboxIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Checkbox</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('indicator')}
          >
            <IndicatorIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Indicator</span>
          </button>
        </div>
      </section>
    </div>
  );
}

// Referenced above only via the Loading-layout ProgressRing preview inside Dialog itself —
// kept imported so the "Related Component" Indicator link and this doc file both compile
// against the same module used by Dialog.tsx.
void ProgressRing;
