import { useState } from 'react';
import { Badge, type BadgeColor } from './Badge';
import { TagIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=278-8255';

const LABEL_COLORS: BadgeColor[] = ['green', 'orange', 'red', 'blue', 'gray'];

const STYLE_TABS = ['Dot', 'Label'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

interface BadgeExampleGroup {
  name: string;
  color: BadgeColor;
  labels: string[];
}

// Figma node 681:16419 "Badge-label color reference" — real-world status words grouped by color.
const BADGE_EXAMPLES: BadgeExampleGroup[] = [
  {
    name: 'Green',
    color: 'green',
    labels: ['Online', 'Active', 'Success', 'Accepted', 'Approved', 'Confirmed', 'Completed'],
  },
  { name: 'Orange', color: 'orange', labels: ['Pending', 'Processing', 'Acknowledged'] },
  { name: 'Red', color: 'red', labels: ['Failed', 'Error', 'Expired', 'Rejected'] },
  {
    name: 'Gray',
    color: 'gray',
    labels: ['Offline', 'Inactive', 'On-hold', 'Terminated', 'Cancelled'],
  },
  { name: 'Blue', color: 'blue', labels: ['Scheduled'] },
];

interface BadgeDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function BadgeDoc({ onNavigate }: BadgeDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Label');
  const [activeExampleColor, setActiveExampleColor] = useState<BadgeColor>('green');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Badge</h1>
        <p className="ds-doc__lede">
          A Badge is a small color dot used to flag status at a glance — on its own as a
          standalone indicator, or paired with a text label. Unlike a Tag, it carries no
          background or border of its own; the dot is the entire signal.
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
          Reach for color to carry meaning — Green for success/active states, Orange for
          pending, Red for error, Blue for informational, and Gray for neutral/offline states.
        </p>
        <div className="ds-preview">
          <div className="ds-tab-chip-group" style={{ flexWrap: 'wrap' }}>
            <Badge label="Online" color="green" />
            <Badge label="Pending" color="orange" />
            <Badge label="Error" color="red" />
            <Badge label="Info" color="blue" />
            <Badge label="Offline" color="gray" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Just two parts — a colored dot, and the optional label it sits beside.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-badge ds-badge--label ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
            >
              <span className="ds-badge__dot ds-badge__dot--green ds-anatomy__part-relative">
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              </span>
              <span className="ds-badge__label ds-anatomy__part-relative">
                Label
                <span className="ds-anatomy__badge">2</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Dot</strong> — <span>fixed-size color indicator; color changes per status</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Label</strong> — <span>optional status text; omit it for a standalone dot</span>
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
          Style controls what's rendered: Label pairs the dot with text and comes in five
          colors; Dot is the standalone indicator and only varies by size in the source Figma
          spec.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Badge style groups">
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
          {activeStyleTab === 'Label' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                {LABEL_COLORS.map((color) => (
                  <div className="ds-variant-row__cell" key={color}>
                    <Badge label="Label" color={color} />
                    <span className="ds-variant-row__cell-label">
                      {color[0].toUpperCase() + color.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStyleTab === 'Dot' && (
            <div className="ds-variant-group">
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Badge size="sm" />
                  <span className="ds-variant-row__cell-label">Sm · 16px</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Badge size="lg" />
                  <span className="ds-variant-row__cell-label">Lg · 24px</span>
                </div>
              </div>
              <span className="ds-variant-note">
                Only Red is defined for the standalone dot in the source Figma file — pass{' '}
                <code>color</code> with another value only if a new design spec calls for it.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Example</span>
            <p className="ds-section__desc">Real-world status labels, grouped by color.</p>

            <div className="ds-line-tabs" role="tablist" aria-label="Badge example colors">
              {BADGE_EXAMPLES.map((group) => (
                <button
                  key={group.color}
                  type="button"
                  role="tab"
                  aria-selected={activeExampleColor === group.color}
                  className={`ds-line-tab${
                    activeExampleColor === group.color ? ' ds-line-tab--active' : ''
                  }`}
                  onClick={() => setActiveExampleColor(group.color)}
                >
                  {group.name}
                </button>
              ))}
            </div>

            <div className="ds-preview">
              <div className="ds-badge-example-grid">
                {BADGE_EXAMPLES.find((group) => group.color === activeExampleColor)?.labels.map(
                  (label) => <Badge key={label} label={label} color={activeExampleColor} />,
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Badge is a static indicator, not an interactive control — it has no hover, focus, or
          disabled state. Each color/type resolves to these dot and label tokens.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Color</th>
              <th>Preview</th>
              <th>Dot</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Label</td>
              <td>Green</td>
              <td>
                <Badge label="Label" color="green" />
              </td>
              <td>
                <code>brand-green-600</code>
              </td>
              <td>
                <code>text-body-primary-neutral</code>
              </td>
            </tr>
            <tr>
              <td>Label</td>
              <td>Orange</td>
              <td>
                <Badge label="Label" color="orange" />
              </td>
              <td>
                <code>interactive-icon-button-icon-secondary-ghost-default</code>
              </td>
              <td>
                <code>text-body-primary-neutral</code>
              </td>
            </tr>
            <tr>
              <td>Label</td>
              <td>Red</td>
              <td>
                <Badge label="Label" color="red" />
              </td>
              <td>
                <code>brand-danger-500</code>
              </td>
              <td>
                <code>text-body-primary-neutral</code>
              </td>
            </tr>
            <tr>
              <td>Label</td>
              <td>Blue</td>
              <td>
                <Badge label="Label" color="blue" />
              </td>
              <td>
                <code>brand-blue-600</code>
              </td>
              <td>
                <code>text-body-primary-neutral</code>
              </td>
            </tr>
            <tr>
              <td>Label</td>
              <td>Gray</td>
              <td>
                <Badge label="Label" color="gray" />
              </td>
              <td>
                <code>brand-neutral-600</code>
              </td>
              <td>
                <code>text-body-primary-neutral</code>
              </td>
            </tr>
            <tr>
              <td>Dot</td>
              <td>Sm</td>
              <td>
                <Badge size="sm" />
              </td>
              <td>
                <code>brand-danger-500</code>
              </td>
              <td>—</td>
            </tr>
            <tr>
              <td>Dot</td>
              <td>Lg</td>
              <td>
                <Badge size="lg" />
              </td>
              <td>
                <code>brand-danger-500</code>
              </td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          The dot itself is a fixed 6px circle (12px for the large standalone size) — every
          other measurement below comes from a token.
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
              <th scope="row">Dot ↔ label gap</th>
              <td>
                <code>--space-component-padding-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Dot radius</th>
              <td>
                <code>--radius-full</code>
              </td>
              <td>9999px</td>
            </tr>
            <tr>
              <th scope="row">Standalone box (Sm)</th>
              <td>
                <code>--component-icon-sm</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Standalone box (Lg)</th>
              <td>
                <code>--component-icon-md</code>
              </td>
              <td>24px</td>
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
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Badge.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('tag')}
          >
            <TagIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Tag</span>
          </button>
          <div className="ds-related-card ds-related-card--soon">
            <span className="icon ds-related-card__icon" aria-hidden="true">
              notifications
            </span>
            <span className="ds-related-card__name">Notification</span>
            <span className="ds-related-card__tag">Soon</span>
          </div>
        </div>
      </section>
    </div>
  );
}
