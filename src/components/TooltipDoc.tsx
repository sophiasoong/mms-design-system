import { useState } from 'react';
import { Tooltip, type TooltipPosition } from './Tooltip';
import { TableIcon, FormIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=194-1548';

const POSITION_TABS: TooltipPosition[] = [
  'top-left',
  'top',
  'top-right',
  'bottom-left',
  'bottom',
  'bottom-right',
];

const formatPosition = (position: TooltipPosition) =>
  position
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

interface TooltipDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function TooltipDoc({ onNavigate }: TooltipDocProps) {
  const [activePositionTab, setActivePositionTab] = useState<TooltipPosition>('top');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Tooltip</h1>
        <p className="ds-doc__lede">
          A Tooltip is a floating label with a directional arrow that points back at the
          element that triggered it. It appears on hover or focus and disappears once the
          pointer leaves the target's range — used to annotate icon buttons, truncated
          labels, or any control whose purpose isn't obvious from its own content.
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
          Tooltip is passive, read-only content — it never carries its own interactivity. It
          rides along with the element that triggers it and inherits that element's
          hover/focus behavior.
        </p>
        <div className="ds-preview">
          <Tooltip>Amet minim mollit non deserunt ullamco est sit aliq.</Tooltip>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Three parts — a shadowed container that carries the surface, the text it holds, and
          the arrow that points back at the trigger.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-tooltip ds-tooltip--md ds-tooltip--top ds-tooltip--align-center ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <div className="ds-tooltip__bubble">
                <p className="ds-tooltip__label ds-anatomy__part-relative">
                  Label
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
                </p>
              </div>
              <div className="ds-tooltip__arrow-wrapper ds-anatomy__part-relative">
                <svg className="ds-tooltip__arrow" width="16" height="8" viewBox="0 0 16 8" aria-hidden="true">
                  <path d="M16 8L8 0L0 8H16Z" />
                </svg>
                <span className="ds-anatomy__badge">3</span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>fixed padding and radius, with a drop shadow to lift it off the page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Label</strong> —{' '}
                  <span>the tooltip text; wraps within the size's width instead of truncating (Sm never wraps)</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Arrow</strong> —{' '}
                  <span>a small triangle pointing at the trigger; flips and slides based on position</span>
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
          Position controls which side of the trigger the bubble sits on and which way the
          arrow points; Size controls the bubble's width and whether its label can wrap.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Position</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Tooltip position groups">
          {POSITION_TABS.map((position) => (
            <button
              key={position}
              type="button"
              role="tab"
              aria-selected={activePositionTab === position}
              className={`ds-line-tab${activePositionTab === position ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActivePositionTab(position)}
            >
              {formatPosition(position)}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview">
              <Tooltip position={activePositionTab}>
                Amet minim mollit non deserunt ullamco est sit aliq.
              </Tooltip>
            </div>
            <span className="ds-variant-note">
              {activePositionTab.startsWith('top')
                ? 'Top places the bubble above the trigger — the arrow flips to point down.'
                : 'Bottom places the bubble below the trigger — the arrow rests pointing up.'}{' '}
              {activePositionTab.endsWith('-left')
                ? 'Left slides the bubble past the trigger, landing the arrow near its right edge.'
                : activePositionTab.endsWith('-right')
                  ? 'Right slides the bubble past the trigger, landing the arrow near its left edge.'
                  : 'Centers the bubble directly over the trigger.'}
            </span>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Tooltip size="sm">Amet minim</Tooltip>
                <span className="ds-variant-row__cell-label">Sm · hug content</span>
              </div>
              <div className="ds-variant-row__cell">
                <Tooltip size="md">Amet minim mollit non deserunt ullamco est sit aliq.</Tooltip>
                <span className="ds-variant-row__cell-label">Md · 240px</span>
              </div>
              <div className="ds-variant-row__cell">
                <Tooltip size="lg">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit
                  officia consequat duis enim velit mollit.
                </Tooltip>
                <span className="ds-variant-row__cell-label">Lg · 600px</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Padding, radius, shadow, and type are fixed across all sizes and positions — only
          width changes.
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
              <th scope="row">Width (Sm)</th>
              <td>—</td>
              <td>Hug content, no wrap</td>
            </tr>
            <tr>
              <th scope="row">Width (Md)</th>
              <td>
                <code>--component-width-tooltip-md</code>
              </td>
              <td>240px</td>
            </tr>
            <tr>
              <th scope="row">Width (Lg)</th>
              <td>—</td>
              <td>600px</td>
            </tr>
            <tr>
              <th scope="row">Bubble padding</th>
              <td>
                <code>--space-component-padding-md / -lg</code>
              </td>
              <td>12px / 16px (vertical / horizontal)</td>
            </tr>
            <tr>
              <th scope="row">Arrow inset</th>
              <td>
                <code>--space-component-padding-xl</code>
              </td>
              <td>24px (left / right)</td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td>—</td>
              <td>6px</td>
            </tr>
            <tr>
              <th scope="row">Shadow</th>
              <td>
                <code>--interactive-dropdown-panel-shadow-default</code>
              </td>
              <td>0px 2px 8px 0px</td>
            </tr>
            <tr>
              <th scope="row">Type</th>
              <td>
                <code>--typography-sm</code>
              </td>
              <td>14px / 20px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">
          Components that commonly appear alongside Tooltip.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('table')}
          >
            <TableIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Table</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('form')}
          >
            <FormIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Form</span>
          </button>
        </div>
      </section>
    </div>
  );
}
