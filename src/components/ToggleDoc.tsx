import { useState } from 'react';
import { Toggle, type ToggleSize } from './Toggle';
import { FormIcon, HeaderIcon, TableIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=637-5049';

const SIZE_TABS: ToggleSize[] = ['md', 'sm'];

interface ToggleDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function ToggleDoc({ onNavigate }: ToggleDocProps) {
  const [activeSizeTab, setActiveSizeTab] = useState<ToggleSize>('md');
  const [overviewChecked, setOverviewChecked] = useState(true);
  const [labelChecked, setLabelChecked] = useState(true);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Toggle</h1>
        <p className="ds-doc__lede">
          A Toggle switches a single setting directly between two states — unlike a
          Checkbox, flipping it takes effect immediately, with no separate submit step.
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
          Reach for a Toggle when a setting has an immediate, binary effect — notifications
          on/off, a feature flag, dark mode. Use a Checkbox instead when the choice is part
          of a form that's submitted as a whole.
        </p>
        <div className="ds-preview">
          <Toggle checked={overviewChecked} onChange={setOverviewChecked} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Just two parts — a pill-shaped track, and the thumb that slides across it.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-toggle ds-toggle--md ds-toggle--checked ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-toggle__hit">
                <span className="ds-toggle__track ds-anatomy__part-relative">
                  <span className="ds-toggle__thumb ds-anatomy__part-relative">
                    <span className="ds-anatomy__badge ds-anatomy__badge--side">2</span>
                  </span>
                </span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Track</strong> — <span>pill-shaped background; color signals on/off and responds to hover, focus, and disabled</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Thumb</strong> — <span>fixed white circle that slides between the track's two ends</span>
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
          Size controls the track and thumb dimensions — Md is the default, Sm fits denser
          layouts like table rows or settings lists.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Size</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Toggle size groups">
          {SIZE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeSizeTab === tab}
              className={`ds-line-tab${activeSizeTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveSizeTab(tab)}
            >
              {tab === 'md' ? 'Md' : 'Sm'}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Toggle size={activeSizeTab} checked={false} />
                <span className="ds-variant-row__cell-label">Off</span>
              </div>
              <div className="ds-variant-row__cell">
                <Toggle size={activeSizeTab} checked={true} />
                <span className="ds-variant-row__cell-label">On</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">With label</span>
            <div className="ds-preview">
              <Toggle label="Notifications" checked={labelChecked} onChange={setLabelChecked} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Off and on each carry their own hover, focus, and disabled treatment. Preview
          shows the Md size; every color below applies at Sm too.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Track</th>
              <th>Thumb</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default (off)</td>
              <td>
                <Toggle checked={false} />
              </td>
              <td>
                <code>brand-neutral-600</code>
              </td>
              <td>
                <code>brand-neutral-0</code>
              </td>
            </tr>
            <tr>
              <td>Hover (off)</td>
              <td>
                <Toggle checked={false} state="hover" />
              </td>
              <td>
                <code>brand-neutral-500</code>
              </td>
              <td>
                <code>brand-neutral-0</code>
              </td>
            </tr>
            <tr>
              <td>Focus (off)</td>
              <td>
                <Toggle checked={false} state="focus" />
              </td>
              <td>
                <code>brand-neutral-600</code>
              </td>
              <td>
                <code>brand-neutral-0</code>
              </td>
            </tr>
            <tr>
              <td>Disabled (off)</td>
              <td>
                <Toggle checked={false} state="disabled" />
              </td>
              <td>
                <code>brand-neutral-400</code>
              </td>
              <td>
                <code>brand-neutral-0</code>
              </td>
            </tr>
            <tr>
              <td>On</td>
              <td>
                <Toggle checked={true} />
              </td>
              <td>
                <code>brand-primary-300</code>
              </td>
              <td>
                <code>brand-neutral-0</code>
              </td>
            </tr>
            <tr>
              <td>On · Hover</td>
              <td>
                <Toggle checked={true} state="hover" />
              </td>
              <td>
                <code>brand-primary-200</code>
              </td>
              <td>
                <code>brand-neutral-0</code>
              </td>
            </tr>
            <tr>
              <td>On · Focus</td>
              <td>
                <Toggle checked={true} state="focus" />
              </td>
              <td>
                <code>brand-primary-300</code>
              </td>
              <td>
                <code>brand-neutral-0</code>
              </td>
            </tr>
            <tr>
              <td>On · Disabled</td>
              <td>
                <Toggle checked={true} state="disabled" />
              </td>
              <td>
                <code>brand-primary-75</code>
              </td>
              <td>
                <code>brand-neutral-0</code>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Track and thumb sizes are fixed pixel values from the source Figma spec — every
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
              <th scope="row">Track (Md)</th>
              <td>—</td>
              <td>44 × 22px</td>
            </tr>
            <tr>
              <th scope="row">Thumb (Md)</th>
              <td>—</td>
              <td>18px</td>
            </tr>
            <tr>
              <th scope="row">Track (Sm)</th>
              <td>—</td>
              <td>28 × 16px</td>
            </tr>
            <tr>
              <th scope="row">Thumb (Sm)</th>
              <td>—</td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Thumb inset</th>
              <td>—</td>
              <td>2px</td>
            </tr>
            <tr>
              <th scope="row">Track radius</th>
              <td>
                <code>--radius-full</code>
              </td>
              <td>9999px</td>
            </tr>
            <tr>
              <th scope="row">Track ↔ label gap</th>
              <td>
                <code>--space-component-gap-xs</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Label type</th>
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
        <p className="ds-section__desc">Components that commonly appear alongside Toggle.</p>
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
            onClick={() => onNavigate?.('header')}
          >
            <HeaderIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Header</span>
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
