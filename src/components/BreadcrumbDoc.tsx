import { useState } from 'react';
import Breadcrumb, { BackLink, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbSeparator } from './Breadcrumb';
import Button from './Button';
import './ButtonDoc.css';
import './BreadcrumbDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=287-8497';
const PAGE_HEADER_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=856-53733';

const VARIANT_TABS = ['Trail', 'Back-link'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const EXAMPLE_TABS = ['Breadcrumb', 'Back-link'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

interface BreadcrumbDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function BreadcrumbDoc({ onNavigate: _onNavigate }: BreadcrumbDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Trail');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Breadcrumb');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Breadcrumb</h1>
        <p className="ds-doc__lede">
          A Breadcrumb traces the path a reader took to the current page, so any earlier step is
          one click away.
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
          Every item is clickable except the last — the current page renders in a darker,
          non-interactive state so a reader can tell at a glance where they are. Folder-only
          items in the Sidebar that have no page of their own never appear in the trail.
        </p>
        <div className="ds-preview">
          <Breadcrumb>
            <BreadcrumbItem label="Home" />
            <BreadcrumbSeparator />
            <BreadcrumbItem label="Components" />
            <BreadcrumbSeparator />
            <BreadcrumbItem label="Breadcrumb" state="active" />
          </Breadcrumb>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A trail chains Items with a Separator between each pair; a long trail can collapse its
          middle steps behind an Ellipsis.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div className="ds-breadcrumb ds-anatomy__demo" aria-hidden="true">
              <span className="ds-anatomy__part-relative">
                <BreadcrumbItem label="Home" />
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <BreadcrumbSeparator />
                <span className="ds-anatomy__badge">2</span>
              </span>
              <BreadcrumbEllipsis />
              <BreadcrumbSeparator />
              <span className="ds-anatomy__part-relative">
                <BreadcrumbItem label="Current page" state="active" />
                <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Item</strong> — <span>a clickable step in the path</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Separator</strong> — <span>divides one step from the next</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Active item</strong> —{' '}
                  <span>the current page, always last and not clickable</span>
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
          A full trail lists every step; when it would run too long, the middle steps collapse
          behind an Ellipsis. Back-link is a lighter alternative for a single return path.
        </p>

        <span className="ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Breadcrumb variant groups">
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
          {activeVariantTab === 'Trail' && (
            <>
              <div className="ds-variant-group">
                <div className="ds-preview">
                  <Breadcrumb>
                    <BreadcrumbItem label="Home" />
                    <BreadcrumbSeparator />
                    <BreadcrumbItem label="Components" />
                    <BreadcrumbSeparator />
                    <BreadcrumbItem label="Navigation" />
                    <BreadcrumbSeparator />
                    <BreadcrumbItem label="Breadcrumb" state="active" />
                  </Breadcrumb>
                </div>
                <span className="ds-variant-note">Full trail — every step in the path is shown.</span>
              </div>
              <div className="ds-variant-group">
                <div className="ds-preview">
                  <Breadcrumb>
                    <BreadcrumbItem label="Home" />
                    <BreadcrumbSeparator />
                    <BreadcrumbEllipsis />
                    <BreadcrumbSeparator />
                    <BreadcrumbItem label="Breadcrumb" state="active" />
                  </Breadcrumb>
                </div>
                <span className="ds-variant-note">
                  Truncated — an Ellipsis stands in for the collapsed middle steps.
                </span>
              </div>
            </>
          )}

          {activeVariantTab === 'Back-link' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <BackLink label="Back to Components" />
              </div>
              <span className="ds-variant-note">
                Used instead of a full trail for a single return path — to the last page in the
                same flow, to a different feature that linked here, or both at once (stacked as
                two consecutive Back-links).
              </span>
            </div>
          )}
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            A page header pairs Breadcrumb (or Back-link) with the page title and its primary
            actions — the trail sits above the title so a reader can place the page before
            reading it.{' '}
            <a
              className="ds-breadcrumb-example__ref"
              href={PAGE_HEADER_FIGMA_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon icon--xs" aria-hidden="true">
                draw
              </span>
              Page-header reference in Figma
            </a>
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Page-header example groups">
            {EXAMPLE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeExampleTab === tab}
                className={`ds-line-tab${activeExampleTab === tab ? ' ds-line-tab--active' : ''}`}
                onClick={() => setActiveExampleTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="ds-variant-groups">
            {activeExampleTab === 'Breadcrumb' && (
              <div className="ds-variant-group">
                <div className="ds-preview">
                  <div className="ds-breadcrumb-example">
                    <div className="ds-breadcrumb-example__info">
                      <div className="ds-breadcrumb-example__focus">
                        <Breadcrumb>
                          <BreadcrumbItem label="Home" />
                          <BreadcrumbSeparator />
                          <BreadcrumbItem label="Product and Inventory" />
                          <BreadcrumbSeparator />
                          <BreadcrumbItem label="Bundle Setting" state="active" />
                        </Breadcrumb>
                      </div>
                      <h4 className="ds-breadcrumb-example__title ds-breadcrumb-example__dim">
                        Bundle Setting
                      </h4>
                    </div>
                    <div className="ds-breadcrumb-example__buttons ds-breadcrumb-example__dim">
                      <Button variant="primary" appearance="outline" size="md">
                        Batch Create/Edit
                      </Button>
                      <Button variant="primary" appearance="solid" size="md">
                        Create Bundle Set
                      </Button>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">
                  Breadcrumb style — the trail carries the full path down to the current page.
                </span>
              </div>
            )}

            {activeExampleTab === 'Back-link' && (
              <div className="ds-variant-group">
                <div className="ds-preview">
                  <div className="ds-breadcrumb-example">
                    <div className="ds-breadcrumb-example__info">
                      <div className="ds-breadcrumb-example__focus">
                        <BackLink label="Back to Product and Inventory" />
                      </div>
                      <h4 className="ds-breadcrumb-example__title ds-breadcrumb-example__dim">
                        Bundle Setting
                      </h4>
                    </div>
                    <div className="ds-breadcrumb-example__buttons ds-breadcrumb-example__dim">
                      <Button variant="primary" appearance="outline" size="md">
                        Discard
                      </Button>
                      <Button variant="primary" appearance="solid" size="md">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">
                  Back-link style — a lighter header for a page reached from a single, specific
                  place.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Hover underlines an item to signal it's clickable; Active marks the current page;
          Disabled reads as a step with no page of its own.
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
              <td>
                <BreadcrumbItem label="Label" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--text-body-tertiary-neutral)' }}
                  />
                  <code>text-body-tertiary-neutral</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td>
                <BreadcrumbItem label="Label" state="hover" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--text-body-primary-neutral)' }}
                  />
                  <code>text-body-primary-neutral</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Active</td>
              <td>
                <BreadcrumbItem label="Label" state="active" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--text-body-primary-neutral)' }}
                  />
                  <code>text-body-primary-neutral</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td>
                <BreadcrumbItem label="Label" state="disabled" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-neutral-500)' }} />
                  <code>brand-neutral-500</code>
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
          Item, Separator, and Ellipsis all share the trail's height; Back-link matches it too so
          either style drops into the same header slot.
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
              <th scope="row">Trail height</th>
              <td>
                <code>--component-height-xs</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Item padding</th>
              <td>
                <code>--space-component-padding-xs</code>
              </td>
              <td>4px, left and right</td>
            </tr>
            <tr>
              <th scope="row">Separator / Ellipsis padding</th>
              <td>
                <code>--space-component-padding-sm</code>
              </td>
              <td>8px, left and right</td>
            </tr>
            <tr>
              <th scope="row">Back-link icon ↔ label gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Back-link corner radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Item / Separator font</th>
              <td>
                <code>--typography-sm-font-size</code> / <code>--typography-sm-line-height</code>
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
          No related components have been identified for Breadcrumb yet.
        </p>
      </section>
    </div>
  );
}
