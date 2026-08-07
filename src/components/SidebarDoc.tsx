import { useState } from 'react';
import AppSidebar, { DEFAULT_SIDEBAR_SECTIONS, type SidebarNavSection } from './AppSidebar';
import { FooterIcon, HeaderIcon, TopbarIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=263-2633';

const MENU_TABS = ['Main menu', 'Flyout menu'] as const;
type MenuTab = (typeof MENU_TABS)[number];

const COMPACT_SECTIONS: SidebarNavSection[] = DEFAULT_SIDEBAR_SECTIONS.filter(
  (section) => section.id === 'platform-support' || section.id === 'hktvmall',
);

// Same sections as the plain "Main menu" tab, but every item picks up its own flyout so this
// tab can demo real hover/focus interaction — no --demo-open forcing — on any item; a few items
// (Return Request, 3PL, Promotion Management) additionally cascade one of their sub-items into a
// second nested level, matching Figma node 263:2634 — Store Management is left flat so the demo
// shows both shapes side by side rather than a uniform grid.
const NESTED_SUB_ITEM_INDEX: Record<string, number> = {
  'return-request': 1,
  '3pl': 0,
  'promotion-management': 1,
};

const FLYOUT_MENU_SECTIONS: SidebarNavSection[] = COMPACT_SECTIONS.map((section) => ({
  ...section,
  items: section.items.map((item) => {
    const nestedIndex = NESTED_SUB_ITEM_INDEX[item.id];
    return {
      ...item,
      subItems: [0, 1, 2].map((i) =>
        i === nestedIndex
          ? {
              id: `${item.id}-sub-${i + 1}`,
              label: 'Sub-item',
              subItems: [
                { id: `${item.id}-sub-${i + 1}-1`, label: 'Sub-item' },
                { id: `${item.id}-sub-${i + 1}-2`, label: 'Sub-item' },
              ],
            }
          : { id: `${item.id}-sub-${i + 1}`, label: 'Sub-item' },
      ),
    };
  }),
}));

interface SidebarDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function SidebarDoc({ onNavigate }: SidebarDocProps) {
  const [activeMenuTab, setActiveMenuTab] = useState<MenuTab>('Main menu');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Sidebar</h1>
        <p className="ds-doc__lede">
          The Sidebar is the product's primary navigation — a dark, always-present rail grouping
          every merchant workflow into collapsible sections.
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
          Use Sidebar once, at the root of the application shell, beside the page content — it
          stays fixed while the main content area scrolls independently.
        </p>
        <div className="ds-preview ds-sidebar-usage">
          <img
            className="ds-sidebar-usage__img"
            src="/assets/sidebar-overview-usage.png"
            alt="Sidebar shown in place within the app shell, beside the page content (Figma reference)"
          />
          <span className="ds-sidebar-usage__highlight" aria-hidden="true" />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Each section groups a header with its own collapse toggle above an indented, bordered
          list of nav items; items that carry sub-navigation reveal a flyout panel.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div className="ds-app-sidebar ds-anatomy__demo" aria-hidden="true" style={{ width: 260 }}>
              <div className="ds-app-sidebar__section">
                <div className="ds-anatomy__part-relative">
                  <button type="button" className="ds-app-sidebar__section-header">
                    <span className="ds-app-sidebar__section-label">Platform Support</span>
                    <span className="icon ds-app-sidebar__section-chevron" aria-hidden="true">
                      expand_less
                    </span>
                  </button>
                  <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
                </div>

                <div className="ds-anatomy__part-relative">
                  <ul className="ds-app-sidebar__item-list">
                    <li className="ds-app-sidebar__item-wrap ds-app-sidebar__item-wrap--has-flyout">
                      <div className="ds-anatomy__part-relative">
                        <button type="button" className="ds-app-sidebar__item">
                          <span className="icon ds-app-sidebar__item-icon" aria-hidden="true">
                            assignment_return
                          </span>
                          <span className="ds-app-sidebar__item-label">Return Request</span>
                          <span className="icon ds-app-sidebar__item-chevron" aria-hidden="true">
                            chevron_right
                          </span>
                        </button>
                        <span className="ds-anatomy__badge">3</span>
                      </div>

                      <div className="ds-app-sidebar__flyout ds-app-sidebar__flyout--demo-open">
                        <button type="button" className="ds-app-sidebar__flyout-item">
                          <span className="ds-app-sidebar__flyout-label">Sub-item</span>
                          <span className="icon ds-app-sidebar__item-chevron" aria-hidden="true">
                            chevron_right
                          </span>
                        </button>
                        <span className="ds-anatomy__badge ds-anatomy__badge--side-left">4</span>
                      </div>
                    </li>
                  </ul>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
                </div>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Section header</strong> —{' '}
                  <span>groups related items under a label; toggles the section collapsed</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Item list</strong> — <span>an indented, left-bordered rail of nav items</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Nav item</strong> — <span>icon, label, and a trailing chevron affordance</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Flyout</strong> — <span>reveals sub-navigation for items that have it, on hover or focus</span>
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
          Every section collapses independently, and items can optionally open a flyout for
          sub-navigation.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Sidebar menu content">
          {MENU_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeMenuTab === tab}
              className={`ds-line-tab${activeMenuTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveMenuTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview" style={{ justifyContent: 'flex-start' }}>
              <AppSidebar
                key={activeMenuTab}
                sections={activeMenuTab === 'Flyout menu' ? FLYOUT_MENU_SECTIONS : COMPACT_SECTIONS}
                showItemChevron={activeMenuTab === 'Flyout menu'}
              />
            </div>
            <span className="ds-variant-note">
              {activeMenuTab === 'Main menu'
                ? 'Main menu — a plain item list with no further navigation.'
                : 'Flyout menu — hover or focus any item to reveal its flyout live; Return Request, 3PL, and Promotion Management each cascade a sub-item into a second nested level.'}
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Active is the one state where the label's font weight steps up from regular to medium.
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
                <div
                  style={{
                    width: 220,
                    padding: 12,
                    background: 'var(--surface-sidebar-surface-default)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <ul className="ds-app-sidebar__item-list" style={{ margin: 0 }}>
                    <li className="ds-app-sidebar__item-wrap">
                      <button type="button" className="ds-app-sidebar__item">
                        <span className="icon ds-app-sidebar__item-icon" aria-hidden="true">
                          receipt_long
                        </span>
                        <span className="ds-app-sidebar__item-label">Order Management</span>
                        <span className="icon ds-app-sidebar__item-chevron" aria-hidden="true">
                          chevron_right
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-sidebar-item-label-default)' }}
                  />
                  <code>interactive-sidebar-item-label-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 240 }}>
                <div
                  style={{
                    width: 220,
                    padding: 12,
                    background: 'var(--surface-sidebar-surface-default)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <ul className="ds-app-sidebar__item-list" style={{ margin: 0 }}>
                    <li className="ds-app-sidebar__item-wrap">
                      <button type="button" className="ds-app-sidebar__item ds-app-sidebar__item--force-hover">
                        <span className="icon ds-app-sidebar__item-icon" aria-hidden="true">
                          receipt_long
                        </span>
                        <span className="ds-app-sidebar__item-label">Order Management</span>
                        <span className="icon ds-app-sidebar__item-chevron" aria-hidden="true">
                          chevron_right
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-sidebar-item-surface-hover)' }}
                  />
                  <code>interactive-sidebar-item-surface-hover</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Active</td>
              <td style={{ width: 240 }}>
                <div
                  style={{
                    width: 220,
                    padding: 12,
                    background: 'var(--surface-sidebar-surface-default)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <ul className="ds-app-sidebar__item-list" style={{ margin: 0 }}>
                    <li className="ds-app-sidebar__item-wrap">
                      <button type="button" className="ds-app-sidebar__item ds-app-sidebar__item--active">
                        <span className="icon ds-app-sidebar__item-icon" aria-hidden="true">
                          receipt_long
                        </span>
                        <span className="ds-app-sidebar__item-label">Order Management</span>
                        <span className="icon ds-app-sidebar__item-chevron" aria-hidden="true">
                          chevron_right
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-sidebar-item-surface-active)' }}
                  />
                  <code>interactive-sidebar-item-surface-active</code>
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
          The Main section indents its item list less than the other three — a genuine
          inconsistency in the source Figma file, preserved here rather than normalized.
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
              <th scope="row">Sidebar width</th>
              <td>
                <code>—</code>
              </td>
              <td>260px (Figma's size/component/width/sm; no matching tokens.css variable exists)</td>
            </tr>
            <tr>
              <th scope="row">Section gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Section header height</th>
              <td>
                <code>--component-height-lg</code>
              </td>
              <td>40px</td>
            </tr>
            <tr>
              <th scope="row">Item list indent (Main)</th>
              <td>
                <code>--space-component-padding-sm</code>
              </td>
              <td>8px (Figma inconsistency — see note above)</td>
            </tr>
            <tr>
              <th scope="row">Item list indent (other sections)</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Item list border</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px</td>
            </tr>
            <tr>
              <th scope="row">Item height</th>
              <td>
                <code>--component-height-lg</code>
              </td>
              <td>40px</td>
            </tr>
            <tr>
              <th scope="row">Item padding</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px, left and right</td>
            </tr>
            <tr>
              <th scope="row">Item radius</th>
              <td>
                <code>--radius-lg</code>
              </td>
              <td>12px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components Sidebar commonly appears alongside in the app shell.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('topbar')}
          >
            <TopbarIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Topbar</span>
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
            onClick={() => onNavigate?.('footer')}
          >
            <FooterIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Footer</span>
          </button>
        </div>
      </section>
    </div>
  );
}
