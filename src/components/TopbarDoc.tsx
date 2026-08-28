import { useState } from 'react';
import AppTopbar from './AppTopbar';
import AppSidebar from './AppSidebar';
import Button from './Button';
import IconButton from './IconButton';
import { Badge } from './Badge';
import { Searchbar } from './Searchbar';
import { IconButtonIcon, SearchbarIcon, DropdownIcon, AssetsIcon } from './icons';
import './ButtonDoc.css';
import './TopbarDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=263-5472';

const STYLE_TABS = ['Menu toggle', 'Notification'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

// Topbar's natural min-content width: leading (~166) + search's min-width floor (320)
// + trailing (~446) + 2 bar gaps (32) + left/right edge padding (64) = 1028. Used as a
// min-width (not a fixed width) on preview wrappers so the bar still fills the full
// preview box on wide viewports, but floors at its real size instead of being
// force-shrunk (and overflowing internally) on narrower ones.
const PREVIEW_WIDTH = 1028;

interface TopbarDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function TopbarDoc({ onNavigate }: TopbarDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Menu toggle');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Topbar</h1>
        <p className="ds-doc__lede">
          The Topbar anchors the top of the product shell — store switching, search, and account
          controls all live in one fixed bar above the page content.
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
          Use Topbar once, at the root of the application shell — it stays fixed while the
          sidebar and page content scroll beneath it.
        </p>
        <div className="ds-preview ds-topbar-usage">
          <img
            className="ds-topbar-usage__img"
            src="/assets/sidebar-overview-usage.png"
            alt="Topbar shown in place within the app shell, above the page content (Figma reference)"
          />
          <span className="ds-topbar-usage__highlight" aria-hidden="true" />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A leading store-switching group and a centered search field are fixed; the trailing
          group of account controls stays flexible based on which actions apply.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-topbar-anatomy__figure">
            <div className="ds-anatomy__demo-scroll">
              <div
                className="ds-app-topbar ds-anatomy__demo"
                aria-hidden="true"
                style={{ width: '100%', minWidth: PREVIEW_WIDTH }}
              >
              <span className="ds-anatomy__part-relative">
                <img
                  className="ds-app-topbar__logo"
                  src="/assets/logo_mms_default.png"
                  alt="Merchant Management System"
                />
                <span className="ds-anatomy__badge">1</span>
              </span>

              <div className="ds-app-topbar__leading">
                <span className="ds-anatomy__part-relative">
                  <IconButton icon="menu" variant="primary" appearance="outline" size="md" label="Toggle menu" />
                  <span className="ds-anatomy__badge">2</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <span className="ds-app-topbar__store-trigger">
                    <Badge color="green" />
                    <span>Store Name</span>
                    <span className="icon" aria-hidden="true">
                      expand_more
                    </span>
                  </span>
                  <span className="ds-anatomy__badge">3</span>
                </span>
              </div>

              <span className="ds-anatomy__part-relative ds-app-topbar__search">
                <Searchbar size="lg" placeholder="Search" />
                <span className="ds-anatomy__badge">4</span>
              </span>

              <div className="ds-app-topbar__trailing">
                <span className="ds-anatomy__part-relative">
                  <Button variant="secondary" appearance="solid" size="sm">
                    Back to MMS 1.0
                  </Button>
                  <span className="ds-anatomy__badge">5</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <IconButton
                    icon="help"
                    variant="neutral"
                    appearance="ghost"
                    shape="round"
                    size="md"
                    label="FAQ"
                    className="ds-app-topbar__faq"
                  />
                  <span className="ds-anatomy__badge">6</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <span className="ds-app-topbar__notification-wrap">
                    <IconButton
                      icon="notifications"
                      variant="neutral"
                      appearance="ghost"
                      shape="round"
                      size="md"
                      label="Notifications"
                    />
                    <span className="ds-app-topbar__notification-badge">99+</span>
                  </span>
                  <span className="ds-anatomy__badge">7</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <span className="ds-app-topbar__menu-trigger">
                    <span>English</span>
                    <span className="icon" aria-hidden="true">
                      expand_more
                    </span>
                  </span>
                  <span className="ds-anatomy__badge">8</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <span className="ds-app-topbar__menu-trigger">
                    <span className="ds-app-topbar__avatar">
                      <span className="icon" aria-hidden="true">
                        account_circle
                      </span>
                    </span>
                    <span>User Name</span>
                    <span className="icon" aria-hidden="true">
                      expand_more
                    </span>
                  </span>
                  <span className="ds-anatomy__badge">9</span>
                </span>
              </div>
            </div>
            </div>
            <ul className="ds-anatomy__legend ds-topbar-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Logo</strong> — <span>identifies the product and doubles as the sidebar's expanded/collapsed cue</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Menu toggle</strong> — <span>expands or collapses the product's side navigation</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Store trigger</strong> —{' '}
                  <span>opens the store switcher; the green dot marks the store as online</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Search field</strong> — <span>searches across the current product context</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Back-to-MMS 1.0</strong> — <span>optional escape hatch back to the legacy product; hidden once migration is complete</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">6</span>
                <span>
                  <strong>FAQ</strong> — <span>opens contextual help</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">7</span>
                <span>
                  <strong>Notifications</strong> — <span>opens the notification list; the badge caps its count display at 99+</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">8</span>
                <span>
                  <strong>Language trigger</strong> — <span>opens the locale switcher</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">9</span>
                <span>
                  <strong>User trigger</strong> — <span>opens the account menu</span>
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
          The logo and menu toggle mirror the product sidebar's own expanded/collapsed state, and
          the notification badge reflects whether there's anything new to see.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Topbar style groups">
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

        {activeStyleTab === 'Menu toggle' && (
          <div className="ds-variant-groups">
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim ds-preview--scroll" style={{ padding: 0 }}>
                <div className="ds-topbar-page-preview">
                  <AppTopbar
                    showLogo
                    sidebarExpanded={sidebarExpanded}
                    onMenuClick={() => setSidebarExpanded((expanded) => !expanded)}
                  />
                  <div className="ds-topbar-page-preview__body">
                    <div
                      className={`ds-topbar-page-preview__sidebar${
                        sidebarExpanded ? '' : ' ds-topbar-page-preview__sidebar--collapsed'
                      }`}
                    >
                      <AppSidebar />
                    </div>
                    <div className="ds-topbar-page-preview__content" />
                  </div>
                </div>
              </div>
              <span className="ds-variant-note">
                {sidebarExpanded
                  ? 'Sidebar expanded (default) — click the menu toggle to collapse it.'
                  : 'Sidebar collapsed — the reference layout hides it entirely; click the menu toggle to bring it back.'}
              </span>
            </div>
          </div>
        )}

        {/* Both instances share one scrim card (ds-preview--stack) rather than two separate
            ones — a full-bleed bar doesn't suit the two-column ds-variant-row layout used for
            compact components elsewhere in the app, so each instance keeps its own caption
            inline instead. */}
        {activeStyleTab === 'Notification' && (
          <div className="ds-variant-groups">
            <div className="ds-variant-group">
              <div className="ds-preview ds-preview--scrim ds-preview--scroll ds-preview--stack ds-topbar-notification-preview">
                <div className="ds-topbar-notification-preview__item">
                  <span className="ds-topbar-notification-preview__caption">
                    Unread — under 100 · shows the exact count
                  </span>
                  <AppTopbar showLogo notificationCount={3} showBackButton={false} />
                </div>
                <div className="ds-topbar-notification-preview__item">
                  <span className="ds-topbar-notification-preview__caption">
                    Unread — above 100 · caps the badge at 99+
                  </span>
                  <AppTopbar showLogo notificationCount={128} showBackButton={false} />
                </div>
                <div className="ds-topbar-notification-preview__item">
                  <span className="ds-topbar-notification-preview__caption">
                    Read — zero · badge is hidden entirely
                  </span>
                  <AppTopbar showLogo notificationCount={0} showBackButton={false} />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          The menu toggle is the one control with a Figma-specified border, so its outline
          state carries the bar's full default/hover/focus/disabled range.
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
              <td style={{ width: 280 }}>
                <IconButton icon="menu" variant="primary" appearance="outline" size="md" label="Toggle menu" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-icon-button-icon-primary-outline-default)' }} />
                  <code>interactive-icon-button-icon-primary-outline-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 280 }}>
                <IconButton
                  icon="menu"
                  variant="primary"
                  appearance="outline"
                  size="md"
                  label="Toggle menu"
                  forceState="hover"
                />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-icon-button-border-primary-outline-hover)' }} />
                  <code>interactive-icon-button-border-primary-outline-hover</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Focus</td>
              <td style={{ width: 280 }}>
                <IconButton
                  icon="menu"
                  variant="primary"
                  appearance="outline"
                  size="md"
                  label="Toggle menu"
                  forceState="focus"
                />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-icon-button-border-primary-outline-focus)' }} />
                  <code>interactive-icon-button-border-primary-outline-focus</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td style={{ width: 280 }}>
                <IconButton icon="menu" variant="primary" appearance="outline" size="md" label="Toggle menu" disabled />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-icon-button-icon-primary-outline-disabled)' }} />
                  <code>interactive-icon-button-icon-primary-outline-disabled</code>
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
          Figma specifies a 68px bar with 32px of edge padding; the closest existing height
          tier and a symmetric rail are used in its place.
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
              <th scope="row">Bar height</th>
              <td>
                <code>--component-height-3xl</code>
              </td>
              <td>64px (Figma specifies 68px; no matching height tier exists)</td>
            </tr>
            <tr>
              <th scope="row">Edge padding</th>
              <td>
                <code>--space-component-padding-2xl</code>
              </td>
              <td>32px, left and right</td>
            </tr>
            <tr>
              <th scope="row">Leading group gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Trailing group gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Search field height</th>
              <td>
                <code>--component-height-lg</code>
              </td>
              <td>40px, via Searchbar's Lg size</td>
            </tr>
            <tr>
              <th scope="row">Divider height</th>
              <td>
                <code>--component-height-sm</code>
              </td>
              <td>28px</td>
            </tr>
            <tr>
              <th scope="row">Bottom border</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Topbar.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('icon-button')}
          >
            <IconButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Icon Button</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('searchbar')}
          >
            <SearchbarIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Searchbar</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('dropdown')}
          >
            <DropdownIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Dropdown</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('assets')}
          >
            <AssetsIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Assets</span>
          </button>
        </div>
      </section>
    </div>
  );
}
