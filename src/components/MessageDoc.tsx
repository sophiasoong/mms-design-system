import { useEffect, useRef, useState } from 'react';
import Message from './Message';
import {
  AutoRenewIcon,
  ApprovalIcon,
  ThreePLIcon,
  PaymentIcon,
  ContractIcon,
  OrderIcon,
  ChatIcon,
  StorageIcon,
  StoreIcon,
  MerchantIcon,
  TotesIcon,
  PermissionIcon,
  ProductInventoryIcon,
  SLAIcon,
  SystemIcon,
} from './messageTypeIcons';
import Button from './Button';
import { Badge } from './Badge';
import { Tag } from './Tag';
import AppTopbar from './AppTopbar';
import { Searchbar } from './Searchbar';
import { FilterChip } from './Chip';
import { CardTabItem } from './Tab';
import { ButtonIcon, BadgeIcon, TagIcon, ListIcon } from './icons';
import './ButtonDoc.css';
import './MessageDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=639-5598';
const NOTIFICATION_PANEL_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=676-5949';
const MESSAGE_CENTER_FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=676-7928';

const STYLE_TABS = ['Default', 'Compact', 'Read'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const EXAMPLE_TABS = ['Notification Panel', 'Message Center'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

interface MessageDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function MessageDoc({ onNavigate }: MessageDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Default');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Notification Panel');
  const messageListRef = useRef<HTMLDivElement>(null);
  const [listScrollThumb, setListScrollThumb] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const el = messageListRef.current;
    if (!el) return;

    const updateThumb = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight <= clientHeight) {
        setListScrollThumb({ top: 0, height: 0 });
        return;
      }
      const height = (clientHeight / scrollHeight) * clientHeight;
      const top = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - height);
      setListScrollThumb({ top, height });
    };

    updateThumb();
    el.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);
    return () => {
      el.removeEventListener('scroll', updateThumb);
      window.removeEventListener('resize', updateThumb);
    };
  }, [activeExampleTab]);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Message</h1>
        <p className="ds-doc__lede">
          A Message is a single notification row — a thumbnail, a title and description, and a
          primary action, with tags and a timestamp underneath. Use it to list updates in a
          notification panel or a detail feed.
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
          Compose a list of Messages to build a notification panel, or drop a single row into
          any feed.
        </p>
        <div className="ds-preview ds-preview--scrim">
          <div style={{ width: '100%', maxWidth: 432 }}>
            <Message />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Six parts: a thumbnail, title and description, a primary action, an unread badge, and
          a row of tags with a timestamp.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-preview--scrim ds-message-anatomy">
            <div className="ds-message ds-anatomy__demo" style={{ width: 432 }} aria-hidden="true">
              <span className="ds-message__thumb ds-anatomy__part-relative">
                <span className="icon" aria-hidden="true">
                  settings
                </span>
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              </span>
              <div className="ds-message__body">
                <div className="ds-message__main">
                  <div className="ds-message__content">
                    <div className="ds-message__text">
                      <p className="ds-message__title ds-anatomy__part-relative">
                        Title
                        <span className="ds-anatomy__badge ds-anatomy__badge--container">2</span>
                      </p>
                      <p className="ds-message__desc ds-anatomy__part-relative">
                        Description
                        <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
                      </p>
                    </div>
                    <span className="ds-anatomy__part-relative">
                      <Button variant="primary" appearance="solid" size="md">
                        Label
                      </Button>
                      <span className="ds-anatomy__badge ds-anatomy__badge--side">4</span>
                    </span>
                  </div>
                  <span className="ds-message__badge ds-anatomy__part-relative">
                    <Badge size="lg" />
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">5</span>
                  </span>
                </div>
                <div className="ds-message__meta ds-anatomy__part-relative">
                  <div className="ds-message__tags">
                    <Tag label="label" />
                    <Tag label="label" />
                  </div>
                  <span className="ds-message__date">YYYY-MM-DD</span>
                  <span className="ds-anatomy__badge">6</span>
                </div>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Thumbnail</strong> —{' '}
                  <span>a fixed 48px icon tile; color and icon vary per notification type</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Title</strong> — <span>the notification's headline, always present</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Description</strong> —{' '}
                  <span>supporting body text; omit it for a shorter, compact row</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Button</strong> —{' '}
                  <span>the primary action for this notification; optional</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Badge</strong> — <span>an unread indicator; optional</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">6</span>
                <span>
                  <strong>Tags &amp; Timestamp</strong> —{' '}
                  <span>category labels and when the notification arrived</span>
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
          Style controls the row's presentation: Default includes the description for a full
          notification-panel row; Compact drops it for a denser detail-list row; Read clears the
          unread badge once the notification has been opened.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Message style groups">
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
          <div className="ds-variant-group">
            <div className="ds-preview ds-preview--scrim">
              <div style={{ width: '100%', maxWidth: 432 }}>
                {activeStyleTab === 'Default' ? (
                  <Message />
                ) : activeStyleTab === 'Compact' ? (
                  <Message description="" />
                ) : (
                  <Message showBadge={false} />
                )}
              </div>
            </div>
            {activeStyleTab === 'Compact' && (
              <span className="ds-variant-note">
                Pass an empty <code>description</code> to collapse the row to its title, action,
                and meta line only — used in dense lists like a filter panel.
              </span>
            )}
            {activeStyleTab === 'Read' && (
              <span className="ds-variant-note">
                Pass <code>showBadge={'{false}'}</code> once the notification has been opened —
                the unread dot disappears while the rest of the row stays unchanged.
              </span>
            )}
          </div>
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Two places Message shows up in product: a short list dropped from the topbar's
            notification bell, and the full list-to-detail layout on the Message Center page.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Message example groups">
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
            {activeExampleTab === 'Notification Panel' && (
              <div className="ds-variant-group">
                <div className="ds-preview ds-preview--scrim ds-preview--scroll" style={{ padding: 0 }}>
                  <div className="ds-message-example">
                    <div className="ds-message-example__dim">
                      <AppTopbar />
                    </div>
                    <div className="ds-message-example__panel-row">
                      <div className="ds-message-example__panel ds-message-example__focus">
                        <div
                          className="ds-message-example__panel-item"
                          role="button"
                          tabIndex={0}
                          onClick={() => setActiveExampleTab('Message Center')}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              setActiveExampleTab('Message Center');
                            }
                          }}
                        >
                          <Message
                            title="Contract"
                            description="A contract is ready for your signature — please review before the due date."
                            icon={<ContractIcon />}
                            tags={['Contract', 'Legal']}
                            date="2026-08-02"
                            showButton={false}
                            showBadge={false}
                          />
                        </div>
                        <Message
                          title="Approval"
                          description="A new request is waiting for your review and approval."
                          icon={<ApprovalIcon />}
                          tags={['Approval', 'Review']}
                          date="2026-07-30"
                          showButton={false}
                          showBadge={false}
                        />
                        <Message
                          title="3PL"
                          description="Your 3PL partner updated the shipment status for 3 pending orders."
                          icon={<ThreePLIcon />}
                          tags={['3PL', 'Logistics']}
                          date="2026-07-31"
                          showButton={false}
                          showBadge={false}
                        />
                        <Message
                          title="Payment"
                          description="A payment of $1,240.00 was successfully processed for invoice #48213."
                          icon={<PaymentIcon />}
                          tags={['Payment', 'Finance']}
                          date="2026-08-01"
                          showButton={false}
                          showBadge={false}
                        />
                        <Message
                          title="Order"
                          description="Order #10293 has shipped and is on its way to the customer."
                          icon={<OrderIcon />}
                          tags={['Order', 'Logistics']}
                          date="2026-08-02"
                          showButton={false}
                          showBadge={false}
                        />
                        <div className="ds-message-example__panel-footer">
                          <Button
                            variant="primary"
                            appearance="outline"
                            size="md"
                            className="ds-message-example__view-all"
                            onClick={() => setActiveExampleTab('Message Center')}
                          >
                            View All
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">
                  Clicking the topbar's notification bell opens this panel; "View All" continues
                  to the full Message Center.{' '}
                  <a
                    className="ds-message-example__ref"
                    href={NOTIFICATION_PANEL_FIGMA_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon icon--xs" aria-hidden="true">
                      draw
                    </span>
                    Reference in Figma
                  </a>
                </span>
              </div>
            )}
            {activeExampleTab === 'Message Center' && (
              <div className="ds-variant-group">
                <div className="ds-preview ds-preview--scrim ds-preview--scroll" style={{ padding: 0 }}>
                  <div className="ds-message-example">
                    <div className="ds-message-example__dim">
                      <AppTopbar />
                    </div>
                    <div className="ds-message-example__body">
                      <div className="ds-message-example__page-header ds-message-example__dim">
                        <h4 className="ds-message-example__page-title">Message Center</h4>
                      </div>

                      <div className="ds-message-example__filters ds-message-example__dim">
                        <div
                          className="ds-tab-line-group ds-tab-line-group--card"
                          role="tablist"
                          aria-label="Message Center filter tabs"
                        >
                          <CardTabItem label="System" size="md" state="active" />
                          <CardTabItem label="Personal" size="md" />
                        </div>
                        <div className="ds-message-example__filter-bar">
                          <Searchbar
                            size="md"
                            placeholder="Search Title Keywords"
                            className="ds-message-example__searchbar"
                          />
                          <div className="ds-message-example__filter-chips">
                            <FilterChip label="Business Unit" selected />
                            <FilterChip label="Type" selected />
                            <FilterChip label="Tags" selected />
                            <Button variant="primary" appearance="ghost" size="sm">
                              Reset All
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="ds-message-example__panes">
                        <div className="ds-message-example__list-wrap ds-message-example__focus">
                        <div className="ds-message-example__list" ref={messageListRef}>
                          <Message
                            title="Contract"
                            description="A contract is ready for your signature — please review before the due date."
                            icon={<ContractIcon />}
                            tags={['Contract', 'Legal']}
                            date="2026-08-02"
                            showButton={false}
                            showBadge={false}
                            forceState="hover"
                          />
                          <Message
                            title="Approval"
                            description="A new request is waiting for your review and approval."
                            icon={<ApprovalIcon />}
                            tags={['Approval', 'Review']}
                            date="2026-07-30"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="3PL"
                            description="Your 3PL partner updated the shipment status for 3 pending orders."
                            icon={<ThreePLIcon />}
                            tags={['3PL', 'Logistics']}
                            date="2026-07-31"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Payment"
                            description="A payment of $1,240.00 was successfully processed for invoice #48213."
                            icon={<PaymentIcon />}
                            tags={['Payment', 'Finance']}
                            date="2026-08-01"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Order"
                            description="Order #10293 has shipped and is on its way to the customer."
                            icon={<OrderIcon />}
                            tags={['Order', 'Logistics']}
                            date="2026-08-02"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Chat"
                            description="You have a new message on a customer support ticket."
                            icon={<ChatIcon />}
                            tags={['Chat', 'Support']}
                            date="2026-08-03"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Storage"
                            description="Warehouse storage capacity has reached 85% — consider archiving old inventory."
                            icon={<StorageIcon />}
                            tags={['Storage', 'Ops']}
                            date="2026-08-03"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Store"
                            description="Your store profile information was updated successfully."
                            icon={<StoreIcon />}
                            tags={['Store', 'Profile']}
                            date="2026-08-04"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Merchant"
                            description="A new merchant application is pending your approval."
                            icon={<MerchantIcon />}
                            tags={['Merchant', 'Approval']}
                            date="2026-08-04"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Totes"
                            description="Tote inventory counts have been reconciled for this cycle."
                            icon={<TotesIcon />}
                            tags={['Totes', 'Inventory']}
                            date="2026-08-05"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Permission"
                            description="A team member requested access to a restricted module."
                            icon={<PermissionIcon />}
                            tags={['Permission', 'Access']}
                            date="2026-08-05"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Product & Inventory"
                            description="Stock levels for 5 SKUs have fallen below the reorder threshold."
                            icon={<ProductInventoryIcon />}
                            tags={['Product & Inventory', 'Stock']}
                            date="2026-08-06"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="SLA"
                            description="A service ticket is approaching its SLA deadline."
                            icon={<SLAIcon />}
                            tags={['SLA', 'Compliance']}
                            date="2026-08-06"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="System"
                            description="Scheduled system maintenance will begin tonight at 11:00 PM."
                            icon={<SystemIcon />}
                            tags={['System', 'Maintenance']}
                            date="2026-08-07"
                            showButton={false}
                            showBadge={false}
                          />
                          <Message
                            title="Auto Renew"
                            description="Your subscription will auto-renew in 7 days — review your billing details beforehand."
                            icon={<AutoRenewIcon />}
                            tags={['Auto Renew', 'Billing']}
                            date="2026-07-29"
                            showButton={false}
                            showBadge={false}
                          />
                        </div>
                        <div className="ds-message-example__scrollbar" aria-hidden="true">
                          <div className="ds-message-example__scrollbar-track">
                            <div
                              className="ds-message-example__scrollbar-thumb"
                              style={{
                                height: `${listScrollThumb.height}px`,
                                transform: `translateY(${listScrollThumb.top}px)`,
                                opacity: listScrollThumb.height > 0 ? 1 : 0,
                              }}
                            />
                          </div>
                        </div>
                        </div>
                        <div className="ds-message-example__detail ds-message-example__dim">
                          <h4 className="ds-message-example__detail-title">Contract</h4>
                          <span className="ds-message-example__detail-image" aria-hidden="true">
                            <img
                              src="https://images.unsplash.com/photo-1653378972269-aae6d81e2c18?w=800&q=80"
                              alt=""
                            />
                          </span>
                          <p className="ds-message-example__detail-text">
                            A contract is ready for your signature. Please review the terms
                            carefully before signing, since renewal and cancellation policies
                            are outlined in Section 4.
                          </p>
                          <p className="ds-message-example__detail-text">
                            The due date for signature is 2026-08-02 — reach out to Legal if you
                            need more time or have questions before then.
                          </p>
                          <Button variant="primary" appearance="solid" size="lg">
                            Review Contract
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="ds-variant-note">
                  Clicking a row in the list loads its notification into the detail pane
                  alongside it.{' '}
                  <a
                    className="ds-message-example__ref"
                    href={MESSAGE_CENTER_FIGMA_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon icon--xs" aria-hidden="true">
                      draw
                    </span>
                    Reference in Figma
                  </a>
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
          The whole row is a single hover target — background and tag color shift together.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Background</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td style={{ width: 432 }}>
                <Message />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{
                      background: 'var(--brand-neutral-0)',
                      border: '1px solid var(--global-divider-neutral-light)',
                    }}
                  />
                  <code>brand-neutral-0</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 432 }}>
                <Message forceState="hover" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--brand-primary-50)' }}
                  />
                  <code>brand-primary-50</code>
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
          Every measurement below comes from a token — no hardcoded values.
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
              <th scope="row">Row padding (vertical)</th>
              <td>
                <code>--space-component-padding-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Row padding (horizontal)</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Thumbnail ↔ content gap</th>
              <td>
                <code>--space-component-gap-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Thumbnail size</th>
              <td>
                <code>--component-height-xl</code>
              </td>
              <td>48px</td>
            </tr>
            <tr>
              <th scope="row">Thumbnail radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Title ↔ description gap</th>
              <td>
                <code>--space-component-gap-xs</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Content ↔ meta row gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Title / description type</th>
              <td>
                <code>--typography-sm</code>
              </td>
              <td>14px / 20px</td>
            </tr>
            <tr>
              <th scope="row">Timestamp type</th>
              <td>
                <code>--typography-xs</code>
              </td>
              <td>12px / 16px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Message.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('assets')}
          >
            <span className="icon ds-related-card__icon" aria-hidden="true">
              image
            </span>
            <span className="ds-related-card__name">Thumbnail</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('list')}
          >
            <ListIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">List</span>
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
            onClick={() => onNavigate?.('tag')}
          >
            <TagIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Tag</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('button')}
          >
            <ButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Button</span>
          </button>
        </div>
      </section>
    </div>
  );
}
