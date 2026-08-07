import { useState } from 'react';
import ActionPanel, {
  ActionPanelSectionTitle,
  ActionPanelField,
  ActionPanelValue,
} from './ActionPanel';
import { Radio } from './Radio';
import { Select } from './Select';
import { Badge } from './Badge';
import Button from './Button';
import IconButton from './IconButton';
import { RadioIcon, SelectIcon, ButtonIcon, BadgeIcon } from './icons';
import './ButtonDoc.css';
import './ActionPanelDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=163-17058';

const HISTORY_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 90 days'] as const;
type HistoryOption = (typeof HISTORY_OPTIONS)[number] | 'All history' | 'Custom range';

const VARIANT_TABS = ['Info only', 'Buttons only', 'Full example'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

interface ActionPanelDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function ActionPanelDoc({ onNavigate }: ActionPanelDocProps) {
  const [historyRange, setHistoryRange] = useState<HistoryOption>('All history');
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Info only');

  const fullExampleMain = (
    <>
      <ActionPanelSectionTitle>Search History</ActionPanelSectionTitle>
      <div className="ds-action-panel__radio-group">
        <Radio
          label="All history"
          name="history-range"
          value="All history"
          checked={historyRange === 'All history'}
          onChange={() => setHistoryRange('All history')}
        />
        <div className="ds-action-panel__radio-group ds-action-panel__radio-group--nested">
          {HISTORY_OPTIONS.map((option) => (
            <Radio
              key={option}
              label={option}
              name="history-range"
              value={option}
              checked={historyRange === option}
              onChange={() => setHistoryRange(option)}
            />
          ))}
        </div>
        <Radio
          label="Custom range"
          name="history-range"
          value="Custom range"
          checked={historyRange === 'Custom range'}
          onChange={() => setHistoryRange('Custom range')}
        />
      </div>
      <Button>Apply</Button>
    </>
  );

  const fullExampleMain2 = (
    <>
      <ActionPanelField label="Storefront Code">
        <Select label="H0888001" size="md" />
      </ActionPanelField>
      <ActionPanelField label="Status">
        <Badge color="green" label="Open" />
      </ActionPanelField>
      <Button>Save</Button>
      <Button appearance="outline">Cancel</Button>
    </>
  );

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Action Panel</h1>
        <p className="ds-doc__lede">
          An Action Panel is a small, self-contained surface for a focused set of controls —
          filters, quick settings, or read-only details — attached beside the content it acts on.
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
          Use an Action Panel beside a list or table to hold the controls that filter or act on
          it — Main and Main2 are two generic content slots, divided by a rule only when both
          are populated.
        </p>
        <div className="ds-preview ds-action-panel-usage">
          <img
            className="ds-action-panel-usage__img"
            src="/assets/action-panel-overview-usage.png"
            alt="Action Panel shown in place within the app shell, beside the page content (Figma reference)"
          />
          <span className="ds-action-panel-usage__highlight" aria-hidden="true" />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A header titles the panel; Main and Main2 hold arbitrary content composed from other
          components, not markup the panel owns itself.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-action-panel-anatomy">
            <div className="ds-action-panel ds-anatomy__demo" aria-hidden="true">
              <div className="ds-action-panel__header">
                <div className="ds-anatomy__part-relative">
                  <span className="ds-action-panel__title">Action</span>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
                </div>
                <IconButton
                  icon="info"
                  variant="pending"
                  appearance="ghost"
                  size="sm"
                  label="About Action"
                />
              </div>
              <div className="ds-action-panel__main ds-action-panel__main--divided">
                <div className="ds-anatomy__part-relative">
                  <div className="ds-action-panel__section-title">Section Title</div>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
                </div>
                <Radio label="Option 1" decorative checked />
                <Radio label="Option 2" decorative />
                <Radio label="Option 3" decorative />
              </div>
              <div className="ds-action-panel__main2">
                <div className="ds-action-panel__field">
                  <div className="ds-anatomy__part-relative">
                    <span className="ds-action-panel__field-label">Subtitle</span>
                    <span className="ds-anatomy__badge ds-anatomy__badge--side-left">3</span>
                  </div>
                  <div className="ds-action-panel__field-value">Value</div>
                </div>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Header</strong> —{' '}
                  <span>the panel's title, with an optional info icon button</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Section Title</strong> —{' '}
                  <span>
                    the primary content slot; gains a bottom rule only when Subtitle is also
                    populated
                  </span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Subtitle</strong> — <span>an optional secondary content slot</span>
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
          Main and Main2 are interchangeable — either slot can hold read-only fields, form
          controls, buttons, or both at once.
        </p>
        <span className="ds-variant-group__label ds-variant-tabs-label">Example</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Action Panel variant groups">
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
          {activeVariantTab === 'Info only' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <ActionPanel
                  title="Promotion Details"
                  main={
                    <>
                      <ActionPanelField label="Storefront Code">
                        <ActionPanelValue>H0888001</ActionPanelValue>
                      </ActionPanelField>
                      <ActionPanelField label="Status">
                        <ActionPanelValue>Active</ActionPanelValue>
                      </ActionPanelField>
                      <ActionPanelField label="Promotion Date">
                        <ActionPanelValue>2026-09-01 – 2026-09-30</ActionPanelValue>
                      </ActionPanelField>
                    </>
                  }
                />
              </div>
              <span className="ds-variant-note">Main holds three read-only fields; Main2 is unused.</span>
            </div>
          )}

          {activeVariantTab === 'Buttons only' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <ActionPanel
                  title="Review"
                  main={
                    <>
                      <Button>Approve</Button>
                      <Button appearance="outline">Reject</Button>
                      <Button appearance="outline">Escalate</Button>
                    </>
                  }
                />
              </div>
              <span className="ds-variant-note">
                Main holds a stack of content-width buttons; Main2 is unused.
              </span>
            </div>
          )}

          {activeVariantTab === 'Full example' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim">
                <ActionPanel title="Search History" main={fullExampleMain} main2={fullExampleMain2} />
              </div>
              <span className="ds-variant-note">
                Main holds a section title, a radio group, and a button; Main2 holds a select
                field, a status field, and two buttons — divided by a rule since both are present.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          The only interactive part the panel itself owns is the header's info icon button —
          Main and Main2 content carries whatever states its own component defines.
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
              <td style={{ width: 240 }}>
                <IconButton icon="info" variant="pending" appearance="ghost" size="sm" label="About Action" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--feedback-toast-icon-warning)' }} />
                  <code>feedback-toast-icon-warning</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 240 }}>
                <IconButton
                  icon="info"
                  variant="pending"
                  appearance="ghost"
                  size="sm"
                  label="About Action"
                  forceState="hover"
                />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--feedback-toast-surface-warning)' }} />
                  <code>feedback-toast-surface-warning</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Focus</td>
              <td style={{ width: 240 }}>
                <IconButton
                  icon="info"
                  variant="pending"
                  appearance="ghost"
                  size="sm"
                  label="About Action"
                  forceState="focus"
                />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--feedback-toast-surface-warning)' }} />
                  <code>feedback-toast-surface-warning</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td style={{ width: 240 }}>
                <IconButton icon="info" variant="pending" appearance="ghost" size="sm" label="About Action" disabled />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-700)' }} />
                  <code>brand-neutral-700</code>
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
          Main and Main2 share the same padding and corner radius; only their internal gap
          differs to match Figma.
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
              <th scope="row">Panel width</th>
              <td>
                <code>—</code>
              </td>
              <td>244px (no matching width token; flagged, same as AppSidebar's 260px)</td>
            </tr>
            <tr>
              <th scope="row">Corner radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Header height</th>
              <td>
                <code>--component-height-2xl</code>
              </td>
              <td>56px</td>
            </tr>
            <tr>
              <th scope="row">Header padding</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px, all sides</td>
            </tr>
            <tr>
              <th scope="row">Header title ↔ info gap</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Header border / divider</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px, --global-divider-neutral-light</td>
            </tr>
            <tr>
              <th scope="row">Main / Main2 padding</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px, all sides</td>
            </tr>
            <tr>
              <th scope="row">Main content gap</th>
              <td>
                <code>--space-layout-section-gap-xs</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Main2 content gap</th>
              <td>
                <code>--space-layout-section-gap-md</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Section title height</th>
              <td>
                <code>--component-height-md</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Field label ↔ content gap</th>
              <td>
                <code>--space-component-gap-xs</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Field value height</th>
              <td>
                <code>--component-height-md</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Nested radio indent</th>
              <td>
                <code>--space-component-padding-xl</code>
              </td>
              <td>24px, left</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components an Action Panel commonly composes in its Main / Main2 slots.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('radio')}
          >
            <RadioIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Radio</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('select')}
          >
            <SelectIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Select</span>
          </button>
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
            onClick={() => onNavigate?.('badge')}
          >
            <BadgeIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Badge</span>
          </button>
        </div>
      </section>
    </div>
  );
}
