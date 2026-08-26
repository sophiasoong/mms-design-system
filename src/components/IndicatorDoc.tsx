import { useState } from 'react';
import { ProgressBar, ProgressRing } from './Indicator';
import { UploadIcon, TableIcon, DialogIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=705-10506';

type IndicatorType = 'ring' | 'bar';

const TYPE_TABS: IndicatorType[] = ['ring', 'bar'];
const PERCENTAGES = [25, 50, 75, 100];

interface IndicatorDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function IndicatorDoc({ onNavigate }: IndicatorDocProps) {
  const [activeTypeTab, setActiveTypeTab] = useState<IndicatorType>('ring');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Indicator</h1>
        <p className="ds-doc__lede">
          A Progress Indicator expresses an unspecified wait time or shows how far a process
          has advanced. It comes in two forms — a circular Ring and a linear Bar — both driven
          by the same 0-100 progress value.
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
          Both forms are read-only, non-interactive displays of progress — they never carry
          their own affordance and should be paired with a label if the surrounding context
          doesn't already make what's loading clear.
        </p>
        <div className="ds-preview">
          <ProgressRing progress={65} />
          <div style={{ width: 240 }}>
            <ProgressBar progress={65} showLabel />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Just two parts, shared by both the Ring and the Bar — a track that shows the full
          length of the process, and a fill that shows how much of it is done.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-anatomy__demo ds-anatomy__part-relative"
              style={{ display: 'flex', alignItems: 'center', gap: 32 }}
              aria-hidden="true"
            >
              <ProgressRing progress={65} />
              <div className="ds-progress-bar ds-anatomy__part-relative" style={{ width: 200 }}>
                <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
                <div className="ds-progress-bar__fill ds-anatomy__part-relative" style={{ width: '60%' }}>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">2</span>
                </div>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Track</strong> —{' '}
                  <span>the full-length base shape, always brand-neutral-200 regardless of progress</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Fill</strong> —{' '}
                  <span>the brand-primary-300 portion sized to the current progress value</span>
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
          Ring suits a fixed-size, self-contained indicator (e.g. a card or avatar overlay);
          Bar suits a full-width row (e.g. a table cell or upload item).
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Indicator style groups">
          {TYPE_TABS.map((type) => (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={activeTypeTab === type}
              className={`ds-line-tab${activeTypeTab === type ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveTypeTab(type)}
            >
              {type === 'ring' ? 'Progress Ring' : 'Progress Bar'}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-variant-row">
              {PERCENTAGES.map((percentage) => (
                <div className="ds-variant-row__cell" key={percentage}>
                  {activeTypeTab === 'ring' ? (
                    <ProgressRing progress={percentage} />
                  ) : (
                    <div style={{ width: 120 }}>
                      <ProgressBar progress={percentage} />
                    </div>
                  )}
                  <span className="ds-variant-row__cell-label">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label">With label</span>
            {activeTypeTab === 'bar' ? (
              <div className="ds-preview">
                <div style={{ width: 240 }}>
                  <ProgressBar progress={40} showLabel />
                </div>
              </div>
            ) : (
              <span className="ds-variant-note">
                Progress Ring has no built-in label — pair it with your own text if a value
                needs to be shown.
              </span>
            )}
          </div>

          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Indeterminate</span>
            <p className="ds-variant-note">
              For an unspecified wait time — the fill loops continuously instead of tracking a
              progress value.
            </p>
            <div className="ds-preview">
              {activeTypeTab === 'ring' ? (
                <ProgressRing progress={0} indeterminate />
              ) : (
                <div style={{ width: 240 }}>
                  <ProgressBar progress={0} indeterminate />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Track and fill share the same two colors across both forms; only the geometry
          differs.
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
              <th scope="row">Ring size</th>
              <td>
                <code>--component-height-xl</code>
              </td>
              <td>48px</td>
            </tr>
            <tr>
              <th scope="row">Ring stroke width</th>
              <td>—</td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Bar height</th>
              <td>—</td>
              <td>6px</td>
            </tr>
            <tr>
              <th scope="row">Bar / Ring radius</th>
              <td>
                <code>--radius-full</code>
              </td>
              <td>9999px</td>
            </tr>
            <tr>
              <th scope="row">Track color</th>
              <td>
                <code>--brand-neutral-200</code>
              </td>
              <td>#F5F5F5</td>
            </tr>
            <tr>
              <th scope="row">Fill color</th>
              <td>
                <code>--brand-primary-300</code>
              </td>
              <td>#7D73F2 (MMS) · #C5AB7F (MMA)</td>
            </tr>
            <tr>
              <th scope="row">Label gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Label type</th>
              <td>
                <code>--typography-xs-font-size / --typography-sm-line-height</code>
              </td>
              <td>12px / 20px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">
          Components that commonly appear alongside Indicator.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('upload')}
          >
            <UploadIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Upload</span>
          </button>
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
            onClick={() => onNavigate?.('dialog')}
          >
            <DialogIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Dialog</span>
          </button>
        </div>
      </section>
    </div>
  );
}
