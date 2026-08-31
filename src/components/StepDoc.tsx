import { useState } from 'react';
import { Step, type StepItemData } from './Step';
import Modal from './Modal';
import { ActionPanelField } from './ActionPanel';
import { Input } from './Input';
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell } from './Table';
import { ListIcon } from './icons';
import './ButtonDoc.css';
import './ModalDoc.css';
import './StepDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=680-5825';

const EXAMPLE_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=789-30169&t=ZupQf9myTWU8iKm1-11';

const STYLE_TABS = ['Horizontal', 'Vertical'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const OVERVIEW_ITEMS: StepItemData[] = [
  { title: 'Account', status: 'finished' },
  { title: 'Profile', status: 'current' },
  { title: 'Preferences', status: 'default' },
  { title: 'Review', status: 'default' },
];

const HORIZONTAL_ITEMS: StepItemData[] = [
  { title: 'Account', status: 'finished' },
  { title: 'Profile', status: 'current' },
  { title: 'Preferences', status: 'default' },
  { title: 'Review', status: 'default' },
];

const VERTICAL_ITEMS: StepItemData[] = [
  {
    title: 'Account created',
    caption: 'Aug 1, 2026, 9:14 AM',
    status: 'finished',
    description: 'Your account details have been verified and saved.',
    badgeLabel: 'Label',
  },
  {
    title: 'Add profile info',
    caption: 'Aug 4, 2026, 2:30 PM',
    status: 'current',
    description: 'Tell us a bit about yourself to personalize your experience.',
    badgeLabel: 'Label',
  },
  {
    title: 'Set preferences',
    caption: 'Aug 6, 2026, 10:00 AM',
    status: 'default',
    description: 'Choose your notification and privacy settings.',
    badgeLabel: 'Label',
  },
  {
    title: 'Review & submit',
    caption: 'Aug 8, 2026, 3:45 PM',
    status: 'default',
    description: 'Confirm everything looks correct before finishing.',
    badgeLabel: 'Label',
  },
];

interface StepDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function StepDoc({ onNavigate }: StepDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Horizontal');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Step</h1>
        <p className="ds-doc__lede">
          A Step indicator communicates progress through a multi-step flow. Each step shows its
          own status — not yet reached, in progress, finished, or errored — connected in
          sequence by a rail.
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
          Use Step to orient a user inside a flow they can't fully see at once — a multi-page
          form, a checkout, an onboarding sequence — so they always know what's done, what's
          next, and where they are.
        </p>
        <div className="ds-preview">
          <Step items={OVERVIEW_ITEMS} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Each step is an indicator and a title, joined to its neighbors by a connector rail.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-step ds-step--horizontal ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
              style={{ width: 800 }}
            >
              <div className="ds-step-item ds-step-item--horizontal">
                <div className="ds-step-indicator ds-step-indicator--finished ds-anatomy__part-relative">
                  <span className="icon icon--sm" aria-hidden="true">
                    check
                  </span>
                  <span className="ds-anatomy__badge">1</span>
                </div>
                <span className="ds-step-item__title ds-step-item__title--finished ds-anatomy__part-relative">
                  Account
                  <span className="ds-anatomy__badge">2</span>
                </span>
              </div>
              <div className="ds-step-connector ds-step-connector--horizontal ds-step-connector--finished ds-anatomy__part-relative">
                <span className="ds-anatomy__badge">3</span>
              </div>
              <div className="ds-step-item ds-step-item--horizontal">
                <div className="ds-step-indicator ds-step-indicator--current">
                  <span className="ds-step-indicator__value">2</span>
                </div>
                <span className="ds-step-item__title ds-step-item__title--current">Profile</span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Indicator</strong> —{' '}
                  <span>a round marker showing the step number, or a check / close glyph for a finished / errored step</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Title</strong> — <span>the step's label; weighted heavier while current</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Connector</strong> —{' '}
                  <span>the rail joining one step to the next, colored by the step it leaves</span>
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
          Horizontal suits a compact row of short titles. Vertical suits a longer flow where
          each step carries its own description and supporting detail.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Step style groups">
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
          {activeStyleTab === 'Horizontal' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <Step items={HORIZONTAL_ITEMS} orientation="horizontal" />
              </div>
              <span className="ds-variant-note">
                Titles stay content-sized; connectors grow to fill the remaining row width.
              </span>
            </div>
          )}

          {activeStyleTab === 'Vertical' && (
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--stack">
                <div style={{ width: 360 }}>
                  <Step items={VERTICAL_ITEMS} orientation="vertical" />
                </div>
              </div>
              <span className="ds-variant-note">
                Each step can carry a caption, a description, and a Badge for extra context.
              </span>
            </div>
          )}
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Step's most common home is a multi-step Modal flow — here it tracks an Add Product
            form across Basic Info, Pricing, and Review.{' '}
            <a
              className="ds-modal-example__ref"
              href={EXAMPLE_FIGMA_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon icon--xs" aria-hidden="true">
                draw
              </span>
              Reference in Figma
            </a>
          </p>

          <div className="ds-preview ds-preview--scrim ds-preview--scroll">
            <div
              className="ds-step-example"
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Modal size="xl" title="Add Product" showInfo secondaryLabel="Cancel">
                <div className="ds-modal-example__step-wrap">
                  <Step
                    className="ds-step-example__focus"
                    orientation="horizontal"
                    items={[
                      { title: 'Basic Info', status: 'finished', stepNumber: 1 },
                      { title: 'Pricing', status: 'current', stepNumber: 2 },
                      { title: 'Review', status: 'default', stepNumber: 3 },
                    ]}
                  />
                  <div className="ds-modal-example__form-grid ds-modal-example__form-grid--price ds-step-example__dim">
                    <ActionPanelField label="Original Price">
                      <Input placeholder="0.00" size="lg" type="number" />
                    </ActionPanelField>
                    <ActionPanelField label="Selling Price">
                      <Input placeholder="0.00" size="lg" type="number" />
                    </ActionPanelField>
                  </div>
                  <Table size="md" className="ds-modal-example__step-table ds-step-example__dim">
                    <TableHeader>
                      <TableHeaderCell>Tier</TableHeaderCell>
                      <TableHeaderCell>Min Quantity</TableHeaderCell>
                      <TableHeaderCell>Price</TableHeaderCell>
                    </TableHeader>
                    <TableRow>
                      <TableCell>Tier 1</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>$49.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tier 2</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>$45.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tier 3</TableCell>
                      <TableCell>200</TableCell>
                      <TableCell>$40.00</TableCell>
                    </TableRow>
                  </Table>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          A step's status drives both its indicator and its connector color.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Preview</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td>
                <Step items={[{ title: 'Title', status: 'default' }]} />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-200)' }} />
                  <code>brand-neutral-200 / brand-neutral-700</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Current</td>
              <td>
                <Step items={[{ title: 'Title', status: 'current' }]} />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                  <code>brand-primary-400</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Finished</td>
              <td>
                <Step items={[{ title: 'Title', status: 'finished' }]} />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-0)' }} />
                  <code>brand-neutral-0 / brand-primary-400</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Error</td>
              <td>
                <Step items={[{ title: 'Title', status: 'error' }]} />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-danger-500)' }} />
                  <code>brand-neutral-0 / brand-danger-500</code>
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
          The indicator is a fixed circle; everything else — titles, connectors, descriptions —
          flexes to fill the available width.
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
              <th scope="row">Indicator size</th>
              <td>
                <code>--component-height-md</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Indicator radius</th>
              <td>
                <code>--radius-full</code>
              </td>
              <td>9999px</td>
            </tr>
            <tr>
              <th scope="row">Indicator border</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px</td>
            </tr>
            <tr>
              <th scope="row">Indicator ↔ title gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Title ↔ connector gap (horizontal)</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Indicator ↔ connector gap (vertical rail)</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Step gap (vertical)</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Title type</th>
              <td>
                <code>--typography-md-font-size / --typography-md-line-height</code>
              </td>
              <td>16px / 24px</td>
            </tr>
            <tr>
              <th scope="row">Caption type</th>
              <td>
                <code>--typography-xs-font-size / --typography-sm-line-height</code>
              </td>
              <td>12px / 20px</td>
            </tr>
            <tr>
              <th scope="row">Description type</th>
              <td>
                <code>--typography-sm-font-size / --typography-sm-line-height</code>
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
          Components that commonly appear alongside Step.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('list')}
          >
            <ListIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">List</span>
          </button>
        </div>
      </section>
    </div>
  );
}
