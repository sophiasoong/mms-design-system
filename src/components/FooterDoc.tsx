import { useState } from 'react';
import Footer from './Footer';
import Button from './Button';
import { ButtonIcon } from './icons';
import './ButtonDoc.css';
import './FooterDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=370-2983';

const STYLE_TABS = ['Divider', 'Shadow'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

interface FooterDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function FooterDoc({ onNavigate }: FooterDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Divider');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Footer</h1>
        <p className="ds-doc__lede">
          A Footer closes out a surface — a modal, a form, or a panel — and carries the
          actions that move a user forward, back, or out of it.
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
          Use Footer to anchor a surface's actions to its bottom edge, with a leading way out
          and a primary way forward always in the same place.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <div style={{ width: 480 }}>
            <Footer size="lg" style="divider" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Every Footer carries a leading and a primary action; the secondary action is
          optional and only appears at the Lg size.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-footer-anatomy">
            <div className="ds-footer ds-footer--lg ds-footer--divider ds-anatomy__demo" aria-hidden="true" style={{ width: 480 }}>
              <span className="ds-anatomy__part-relative">
                <Button variant="primary" appearance="ghost" size="md" leadingIcon="chevron_left">
                  Back
                </Button>
                <span className="ds-anatomy__badge">1</span>
              </span>
              <div className="ds-footer__trailing">
                <span className="ds-anatomy__part-relative">
                  <Button variant="primary" appearance="outline" size="md">
                    Confirm
                  </Button>
                  <span className="ds-anatomy__badge">2</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <Button variant="primary" appearance="solid" size="md">
                    Confirm
                  </Button>
                  <span className="ds-anatomy__badge">3</span>
                </span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Leading action</strong> —{' '}
                  <span>a ghost Button that navigates back or resets the surface; always present</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Secondary action</strong> —{' '}
                  <span>an outline Button for a secondary confirmation; Lg only</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Primary action</strong> —{' '}
                  <span>a solid Button that commits the surface's main action</span>
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
          Style sets how Footer separates itself from the surface above — a hairline Divider
          or a lifting Shadow.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Footer style groups">
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
          {activeStyleTab === 'Divider' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div style={{ width: 480 }}>
                  <Footer size="lg" style="divider" />
                </div>
              </div>
              <span className="ds-variant-note">
                Divider adds a hairline border above the footer, separating it from the
                surface it closes.
              </span>
            </div>
          )}

          {activeStyleTab === 'Shadow' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <div style={{ width: 480 }}>
                  <Footer size="lg" style="shadow" />
                </div>
              </div>
              <span className="ds-variant-note">
                Shadow lifts the footer with a drop shadow instead of a border — use it when
                the footer floats above scrollable content.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row ds-variant-row--scrim">
              <div className="ds-variant-row__cell">
                <Footer size="lg" style="divider" />
                <span className="ds-variant-row__cell-label">Lg · 64px — modals, full forms</span>
              </div>
              <div className="ds-variant-row__cell">
                <Footer
                  size="sm"
                  style="divider"
                  leadingLabel="Reset"
                  leadingIcon=""
                  primaryLabel="Apply"
                  showSecondary={false}
                />
                <span className="ds-variant-row__cell-label">Sm · 40px — compact panels, filters</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Each style maps to its own separation treatment, so a Footer always reads as
          attached to the surface it closes.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Style</th>
              <th>Preview</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Divider</td>
              <td style={{ width: 280 }}>
                <Footer
                  size="sm"
                  style="divider"
                  leadingLabel="Reset"
                  leadingIcon=""
                  primaryLabel="Apply"
                  showSecondary={false}
                />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--global-divider-neutral-light)', border: '1px solid var(--global-divider-neutral-light)' }}
                  />
                  <code>global-divider-neutral-light</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Shadow</td>
              <td style={{ width: 280 }}>
                <Footer size="lg" style="shadow" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-dropdown-panel-shadow-default)' }}
                  />
                  <code>interactive-dropdown-panel-shadow-default</code>
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
          Lg and Sm share the same button gap and corner radius; only height, padding, and
          button size scale down together.
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
              <th scope="row">Lg height</th>
              <td>
                <code>--component-height-3xl</code>
              </td>
              <td>64px</td>
            </tr>
            <tr>
              <th scope="row">Sm height</th>
              <td>
                <code>--component-height-lg</code>
              </td>
              <td>40px</td>
            </tr>
            <tr>
              <th scope="row">Lg padding</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px, all sides</td>
            </tr>
            <tr>
              <th scope="row">Sm padding</th>
              <td>
                <code>--space-component-padding-sm</code>
              </td>
              <td>8px, all sides</td>
            </tr>
            <tr>
              <th scope="row">Corner radius (Divider, Lg only)</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px, all corners</td>
            </tr>
            <tr>
              <th scope="row">Corner radius (Shadow)</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px, bottom corners only</td>
            </tr>
            <tr>
              <th scope="row">Divider border (Sm)</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px, top only</td>
            </tr>
            <tr>
              <th scope="row">Shadow offset / blur</th>
              <td>
                <code>--interactive-dropdown-panel-shadow-default</code>
              </td>
              <td>0px 2px 8px</td>
            </tr>
            <tr>
              <th scope="row">Button gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Lg button size</th>
              <td>
                <code>--component-height-md</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Sm button size</th>
              <td>
                <code>--component-height-sm</code>
              </td>
              <td>28px (Figma specifies 24px; no matching Button size exists)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Footer.</p>
        <div className="ds-related-grid">
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
