import { useState } from 'react';
import './AppSidebar.css';

export interface SidebarSubItem {
  id: string;
  label: string;
  subItems?: SidebarSubItem[];
}

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: string;
  subItems?: SidebarSubItem[];
}

export interface SidebarNavSection {
  id: string;
  label: string;
  items: SidebarNavItem[];
}

// The reveal CSS is a plain `:hover, :focus-within` OR: clicking a flyout sub-item focuses it,
// and since moving the pointer away afterward fires no blur, :focus-within alone keeps that
// flyout open forever alongside whatever's newly hovered. Blurring any stray focus that lives
// outside the branch the pointer just entered lets the existing CSS close the stale flyout the
// instant the pointer moves to a different item.
function closeStaleFocus(current: HTMLElement) {
  const active = document.activeElement as HTMLElement | null;
  if (!active || active === document.body) return;
  if (current.contains(active) || active.contains(current)) return;
  if (
    active.closest(
      '.ds-app-sidebar__item-wrap--has-flyout, .ds-app-sidebar__flyout-item-wrap--has-flyout',
    )
  ) {
    active.blur();
  }
}

// Recursive: a sub-item only gets the trailing chevron and reveals a second flyout when it has
// its own nested subItems, matching Figma node 263:2634 (sidebar-flyout composition), where the
// level-1 flyout's items carry a chevron but the level-2 flyout's items do not.
function renderFlyoutItems(items: SidebarSubItem[]) {
  return items.map((sub) => {
    const hasNested = Boolean(sub.subItems && sub.subItems.length > 0);
    return (
      <div
        key={sub.id}
        className={`ds-app-sidebar__flyout-item-wrap${
          hasNested ? ' ds-app-sidebar__flyout-item-wrap--has-flyout' : ''
        }`}
        onMouseEnter={(e) => closeStaleFocus(e.currentTarget)}
      >
        <button type="button" className="ds-app-sidebar__flyout-item" role="menuitem">
          <span className="ds-app-sidebar__flyout-label">{sub.label}</span>
          {hasNested && (
            <span className="icon ds-app-sidebar__item-chevron" aria-hidden="true">
              chevron_right
            </span>
          )}
        </button>
        {hasNested && (
          <div className="ds-app-sidebar__flyout" role="menu">
            {renderFlyoutItems(sub.subItems!)}
          </div>
        )}
      </div>
    );
  });
}

// Labels and icon-component names read from the Figma master symbol (node 217:5484) via
// get_design_context — Material Symbols Rounded glyphs chosen to match each item's intent
// since none of these icons are bespoke Figma marks.
export const DEFAULT_SIDEBAR_SECTIONS: SidebarNavSection[] = [
  {
    id: 'main',
    label: 'Main',
    items: [
      { id: 'order-management', label: 'Order Management', icon: 'receipt_long' },
      { id: 'product-inventory', label: 'Product and Inventory', icon: 'inventory_2' },
      { id: 'merchant-dashboard', label: 'Merchant Dashboard', icon: 'dashboard' },
      { id: 'merchant-advertisement', label: 'Merchant Advertisment', icon: 'campaign' },
      { id: 'payment-center', label: 'Payment Center', icon: 'credit_card' },
      { id: 'ratings-reviews', label: 'Ratings and Reviews', icon: 'star_rate' },
      { id: 'merchant', label: 'Merchant', icon: 'work' },
      { id: 'system', label: 'System', icon: 'apartment' },
    ],
  },
  {
    id: 'platform-support',
    label: 'Platform Support',
    items: [{ id: 'return-request', label: 'Return Request', icon: 'assignment_return' }],
  },
  {
    id: 'hktvmall',
    label: 'HKTVmall',
    items: [
      { id: 'hktv-store-management', label: 'Store Management', icon: 'storefront' },
      { id: '3pl', label: '3PL', icon: 'local_shipping' },
      { id: 'promotion-management', label: 'Promotion Management', icon: 'sell' },
    ],
  },
  {
    id: 'theplace',
    label: 'ThePlace',
    items: [{ id: 'theplace-store-management', label: 'Store Management', icon: 'storefront' }],
  },
];

export interface AppSidebarProps {
  sections?: SidebarNavSection[];
  activeItemId?: string;
  onSelectItem?: (id: string) => void;
  collapsedSectionIds?: string[];
  showItemChevron?: boolean;
  className?: string;
}

export default function AppSidebar({
  sections = DEFAULT_SIDEBAR_SECTIONS,
  activeItemId,
  onSelectItem,
  collapsedSectionIds,
  showItemChevron = true,
  className,
}: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(collapsedSectionIds));

  const toggleSection = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const classes = ['ds-app-sidebar', className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label="Product navigation">
      {sections.map((section) => {
        const isCollapsed = collapsed.has(section.id);
        return (
          <div className="ds-app-sidebar__section" key={section.id}>
            <button
              type="button"
              className="ds-app-sidebar__section-header"
              onClick={() => toggleSection(section.id)}
              aria-expanded={!isCollapsed}
            >
              <span className="ds-app-sidebar__section-label">{section.label}</span>
              <span className="icon ds-app-sidebar__section-chevron" aria-hidden="true">
                {isCollapsed ? 'expand_more' : 'expand_less'}
              </span>
            </button>
            {!isCollapsed && (
              <ul className={`ds-app-sidebar__item-list${section.id === 'main' ? ' ds-app-sidebar__item-list--main' : ''}`}>
                {section.items.map((item) => {
                  const isActive = activeItemId === item.id;
                  return (
                    <li
                      className={`ds-app-sidebar__item-wrap${
                        item.subItems ? ' ds-app-sidebar__item-wrap--has-flyout' : ''
                      }`}
                      key={item.id}
                      onMouseEnter={(e) => closeStaleFocus(e.currentTarget)}
                    >
                      <button
                        type="button"
                        className={`ds-app-sidebar__item${isActive ? ' ds-app-sidebar__item--active' : ''}`}
                        onClick={() => onSelectItem?.(item.id)}
                      >
                        <span className="icon ds-app-sidebar__item-icon" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span className="ds-app-sidebar__item-label">{item.label}</span>
                        {showItemChevron && (
                          <span className="icon ds-app-sidebar__item-chevron" aria-hidden="true">
                            chevron_right
                          </span>
                        )}
                      </button>
                      {item.subItems && (
                        <div className="ds-app-sidebar__flyout" role="menu">
                          {renderFlyoutItems(item.subItems)}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
