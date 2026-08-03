import { useState } from 'react';
import { Hint, type HintSize } from './Hint';
import { SelectIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=194-2853';

const SIZE_TABS = ['Md', 'Lg'] as const;
type SizeTab = (typeof SIZE_TABS)[number];

interface HintDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function HintDoc({ onNavigate }: HintDocProps) {
  const [activeSizeTab, setActiveSizeTab] = useState<SizeTab>('Md');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Hint</h1>
        <p className="ds-doc__lede">
          A Hint is a small tooltip-style bubble that surfaces extra information or guidance
          without disrupting the interface. It appears after roughly 0.3s of hovering or
          focusing on an element, and disappears once the pointer leaves the target's range —
          most commonly used when a Select option's text is too long to fit on one line.
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
          Hint is passive, read-only content — it never carries its own interactivity. It rides
          along with the element that triggers it (a Select option, a truncated label, a form
          field) and inherits that element's hover/focus behavior.
        </p>
        <div className="ds-preview">
          <Hint>I'm a hint description</Hint>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Just two parts — a shadowed container that carries the surface, and the text it holds.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div className="ds-hint ds-anatomy__demo ds-anatomy__part-relative" aria-hidden="true">
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <p className="ds-hint__label ds-anatomy__part-relative">
                Label
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </p>
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
                  <span>the hint text; wraps within the container's max-width instead of truncating</span>
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
          Size controls only the max-width the label can wrap within — pick it by host
          component, not by content length: Md (240px) inside a Dropdown, Lg (600px) inside a
          Modal.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Size</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Hint size groups">
          {SIZE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeSizeTab === tab}
              className={`ds-line-tab${activeSizeTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveSizeTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview">
              <Hint size={activeSizeTab.toLowerCase() as HintSize}>
                {activeSizeTab === 'Md'
                  ? "I'm a hint description that wraps once it reaches the Dropdown's 240px max-width."
                  : "I'm a much longer hint description — the kind that only fits inside a Modal, where the max-width relaxes all the way out to 600px before the label starts wrapping onto a new line."}
              </Hint>
            </div>
            <span className="ds-variant-note">
              {activeSizeTab === 'Md'
                ? 'Dropdown max-width is 240px — beyond that, the label wraps onto a new line.'
                : 'Modal max-width is 600px — beyond that, the label wraps onto a new line.'}
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Padding, radius, and type are fixed across both sizes — only max-width changes.
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
              <th scope="row">Max-width (Md)</th>
              <td>
                <code>--component-width-tooltip-md</code>
              </td>
              <td>240px</td>
            </tr>
            <tr>
              <th scope="row">Max-width (Lg)</th>
              <td>—</td>
              <td>600px</td>
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
              <th scope="row">Shadow</th>
              <td>
                <code>--interactive-dropdown-panel-shadow-default</code>
              </td>
              <td>0px 2px 8px 0px</td>
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
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components that commonly trigger a Hint.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('select')}
          >
            <SelectIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Select</span>
          </button>
          <div className="ds-related-card ds-related-card--soon">
            <span className="icon ds-related-card__icon" aria-hidden="true">
              check_box
            </span>
            <span className="ds-related-card__name">Modal</span>
            <span className="ds-related-card__tag">Soon</span>
          </div>
        </div>
      </section>
    </div>
  );
}
