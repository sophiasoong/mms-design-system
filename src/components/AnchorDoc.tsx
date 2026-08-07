import { useState } from 'react';
import Anchor, { AnchorItem } from './Anchor';
import { TabIcon } from './icons';
import './ButtonDoc.css';
import './AnchorDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=784-22412';

const LEVEL_TABS = ['Tab', 'Sub-tab'] as const;
type LevelTab = (typeof LEVEL_TABS)[number];

interface AnchorDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function AnchorDoc({ onNavigate }: AnchorDocProps) {
  const [activeLevelTab, setActiveLevelTab] = useState<LevelTab>('Tab');
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Anchor</h1>
        <p className="ds-doc__lede">
          An Anchor stacks the links that jump a reader to a section of the current page,
          highlighting whichever one is in view.
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
          Use Anchor beside long-form content so a reader always knows where they are and can
          jump straight to another section.
        </p>
        <div className="ds-preview">
          <div style={{ width: 220 }}>
            <Anchor>
              {['Overview', 'Anatomy', 'Variants', 'States'].map((label) => (
                <AnchorItem
                  key={label}
                  label={label}
                  state={activeSection === label.toLowerCase() ? 'active' : 'default'}
                  onClick={() => setActiveSection(label.toLowerCase())}
                />
              ))}
            </Anchor>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Every item carries an indicator and a label; a Sub-tab indents further to nest under
          its parent Tab.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div className="ds-anchor ds-anatomy__demo" aria-hidden="true" style={{ width: 220 }}>
              <span className="ds-anatomy__part-relative ds-anchor-anatomy__row">
                <div className="ds-anchor-item ds-anchor-item--tab ds-anchor-item--active">
                  <span className="ds-anatomy__part-relative">
                    <span className="ds-anchor-item__label">Overview</span>
                    <span className="ds-anatomy__badge ds-anatomy__badge--side">2</span>
                  </span>
                </div>
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              </span>
              <div className="ds-anchor-item ds-anchor-item--tab">
                <span className="ds-anchor-item__label">Anatomy</span>
              </div>
              <span className="ds-anatomy__part-relative ds-anchor-anatomy__row">
                <div className="ds-anchor-item ds-anchor-item--sub-tab">
                  <span className="ds-anchor-item__label">Overview A</span>
                </div>
                <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Indicator</strong> —{' '}
                  <span>a left border that changes color with the item's state</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Label</strong> —{' '}
                  <span>switches to a heading weight and the brand color when active</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Sub-tab level</strong> —{' '}
                  <span>extra left padding nests the item under its parent Tab</span>
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
          Level sets how far an item indents — Tab for a top-level section, Sub-tab for one
          nested beneath it.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Level</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Anchor level groups">
          {LEVEL_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeLevelTab === tab}
              className={`ds-line-tab${activeLevelTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveLevelTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeLevelTab === 'Tab' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ width: 220 }}>
                  <Anchor>
                    <AnchorItem label="Overview" level="tab" state="active" />
                    <AnchorItem label="Anatomy" level="tab" />
                  </Anchor>
                </div>
              </div>
              <span className="ds-variant-note">
                Tab sits flush with the stack's own left edge — the top-level section a page
                jumps to.
              </span>
            </div>
          )}

          {activeLevelTab === 'Sub-tab' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ width: 220 }}>
                  <Anchor>
                    <AnchorItem label="Overview" level="tab" state="active" />
                    <AnchorItem label="Overview A" level="sub-tab" />
                    <AnchorItem label="Overview B" level="sub-tab" />
                  </Anchor>
                </div>
              </div>
              <span className="ds-variant-note">
                Sub-tab indents further, nesting under whichever Tab it follows.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Hover and Active both switch to the brand color; Active also switches to a heading
          weight so the current section reads at a glance.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td style={{ width: 220 }}>
                <AnchorItem label="Label" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-anchor-label-default)' }} />
                  <code>interactive-anchor-label-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 220 }}>
                <AnchorItem label="Label" state="hover" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-300)' }} />
                  <code>brand-primary-300</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Active</td>
              <td style={{ width: 220 }}>
                <AnchorItem label="Label" state="active" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                  <code>brand-primary-400</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td style={{ width: 220 }}>
                <AnchorItem label="Label" state="disabled" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-anchor-label-disabled)' }} />
                  <code>interactive-anchor-label-disabled</code>
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
          Tab and Sub-tab share the same height, gap, and indicator width; only the left inset
          changes between them.
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
              <th scope="row">Item height</th>
              <td>
                <code>--component-height-lg</code>
              </td>
              <td>40px</td>
            </tr>
            <tr>
              <th scope="row">Indicator ↔ label gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Indicator width</th>
              <td>
                <code>--border-md</code>
              </td>
              <td>2px, left only</td>
            </tr>
            <tr>
              <th scope="row">Tab padding</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px, left and right</td>
            </tr>
            <tr>
              <th scope="row">Sub-tab left padding</th>
              <td>
                <code>--space-component-padding-xl</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Sub-tab right padding</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Active label</th>
              <td>
                <code>--typography-font-family-heading</code>
              </td>
              <td>Heading family, medium weight</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">
          Component that shares Anchor's indicator-line convention for marking the current
          selection.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('tab')}
          >
            <TabIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Tab</span>
          </button>
        </div>
      </section>
    </div>
  );
}
