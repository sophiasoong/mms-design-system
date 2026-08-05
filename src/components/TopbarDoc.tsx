import { useState } from 'react';
import AppTopbar from './AppTopbar';
import Button from './Button';
import IconButton from './IconButton';
import { Badge } from './Badge';
import { Searchbar } from './Searchbar';
import { ButtonIcon, IconButtonIcon, BadgeIcon, SearchbarIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=263-5472';

const BACK_BUTTON_TABS = ['Shown', 'Hidden'] as const;
type BackButtonTab = (typeof BACK_BUTTON_TABS)[number];

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
  const [activeBackTab, setActiveBackTab] = useState<BackButtonTab>('Shown');

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
        <div className="ds-preview ds-preview--scrim ds-preview--scroll" style={{ padding: 0 }}>
          <div style={{ width: '100%' }}>
            <AppTopbar />
          </div>
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
          <div className="ds-anatomy__figure">
            <div className="ds-anatomy__demo-scroll">
            <div className="ds-app-topbar ds-anatomy__demo" aria-hidden="true" style={{ width: PREVIEW_WIDTH }}>
              <div className="ds-app-topbar__leading">
                <span className="ds-anatomy__part-relative">
                  <IconButton icon="menu" variant="primary" appearance="outline" size="md" label="Toggle menu" />
                  <span className="ds-anatomy__badge">1</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <span className="ds-app-topbar__store-trigger">
                    <Badge color="green" />
                    <span>Store Name</span>
                    <span className="icon" aria-hidden="true">
                      expand_more
                    </span>
                  </span>
                  <span className="ds-anatomy__badge">2</span>
                </span>
              </div>

              <span className="ds-anatomy__part-relative ds-app-topbar__search">
                <Searchbar size="lg" placeholder="Search" />
                <span className="ds-anatomy__badge">3</span>
              </span>

              <div className="ds-app-topbar__trailing">
                <span className="ds-anatomy__part-relative">
                  <Button variant="secondary" appearance="solid" size="sm">
                    Back to MMS 1.0
                  </Button>
                  <span className="ds-anatomy__badge">4</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <IconButton icon="help" variant="neutral" appearance="ghost" shape="round" size="md" label="FAQ" />
                  <span className="ds-anatomy__badge">5</span>
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
                  <span className="ds-anatomy__badge">6</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <span className="ds-app-topbar__menu-trigger">
                    <span>English</span>
                    <span className="icon" aria-hidden="true">
                      expand_more
                    </span>
                  </span>
                  <span className="ds-anatomy__badge">7</span>
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
                  <span className="ds-anatomy__badge">8</span>
                </span>
              </div>
            </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Menu toggle</strong> — <span>expands or collapses the product's side navigation</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Store trigger</strong> —{' '}
                  <span>opens the store switcher; the green dot marks the store as online</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Search field</strong> — <span>searches across the current product context</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Back-to-MMS 1.0</strong> — <span>optional escape hatch back to the legacy product; hidden once migration is complete</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>FAQ</strong> — <span>opens contextual help</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">6</span>
                <span>
                  <strong>Notifications</strong> — <span>opens the notification list; the badge caps its count display at 99+</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">7</span>
                <span>
                  <strong>Language trigger</strong> — <span>opens the locale switcher</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">8</span>
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
          The back-to-legacy button is the one leading/trailing part meant to be temporary —
          every other control stays present across contexts.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Back-to-MMS 1.0 button</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Topbar back-button groups">
          {BACK_BUTTON_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeBackTab === tab}
              className={`ds-line-tab${activeBackTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveBackTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview ds-preview--scrim ds-preview--scroll" style={{ padding: 0 }}>
              <div style={{ width: '100%' }}>
                <AppTopbar showBackButton={activeBackTab === 'Shown'} />
              </div>
            </div>
            <span className="ds-variant-note">
              {activeBackTab === 'Shown'
                ? 'Shown while the legacy product is still reachable, so users can jump back at any time.'
                : 'Hidden once a store has fully migrated off the legacy product.'}
            </span>
          </div>
        </div>

        {/* Stacked rather than side-by-side: a full-bleed bar doesn't suit the two-column
            ds-variant-row layout used for compact components elsewhere in the app. */}
        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Notification count</span>
            <div className="ds-preview ds-preview--scrim ds-preview--scroll" style={{ padding: 0 }}>
              <div style={{ width: '100%' }}>
                <AppTopbar notificationCount={3} showBackButton={false} />
              </div>
            </div>
            <span className="ds-variant-note">Under 100 · shows the exact count</span>
          </div>
          <div className="ds-variant-group">
            <div className="ds-preview ds-preview--scrim ds-preview--scroll" style={{ padding: 0 }}>
              <div style={{ width: '100%' }}>
                <AppTopbar notificationCount={0} showBackButton={false} />
              </div>
            </div>
            <span className="ds-variant-note">Zero · badge is hidden entirely</span>
          </div>
        </div>
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
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components that Topbar composes for its controls.</p>
        <div className="ds-related-grid">
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
            onClick={() => onNavigate?.('icon-button')}
          >
            <IconButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Icon Button</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('badge')}
          >
            <BadgeIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Badge</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('searchbar')}
          >
            <SearchbarIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Searchbar</span>
          </button>
        </div>
      </section>
    </div>
  );
}
