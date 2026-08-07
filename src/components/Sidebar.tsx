import { useEffect, useRef, useState } from 'react';
import { COMPONENTS } from '../data/components';
import {
  ActionPanelIcon,
  AnchorIcon,
  BadgeIcon,
  BannerIcon,
  BreadcrumbIcon,
  ButtonIcon,
  CheckboxIcon,
  ChipIcon,
  DatepickerIcon,
  DialogIcon,
  DropdownIcon,
  FooterIcon,
  HeaderIcon,
  HintIcon,
  IconButtonIcon,
  IndicatorIcon,
  InputIcon,
  ListIcon,
  MessageIcon,
  PaginationIcon,
  RadioIcon,
  SearchbarIcon,
  SelectIcon,
  SidebarIcon,
  StepIcon,
  TabIcon,
  TableIcon,
  TagIcon,
  TextareaIcon,
  ToastIcon,
  ToggleIcon,
  TooltipIcon,
  TopbarIcon,
} from './icons';
import './Sidebar.css';

function renderItemIcon(component: (typeof COMPONENTS)[number]) {
  if (component.id === 'button') return <ButtonIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'icon-button') return <IconButtonIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'dropdown') return <DropdownIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'chip') return <ChipIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'input') return <InputIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'searchbar') return <SearchbarIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'textarea') return <TextareaIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'select') return <SelectIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'checkbox') return <CheckboxIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'radio') return <RadioIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'datepicker') return <DatepickerIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'tab') return <TabIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'tag') return <TagIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'badge') return <BadgeIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'toggle') return <ToggleIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'table') return <TableIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'hint') return <HintIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'tooltip') return <TooltipIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'indicator') return <IndicatorIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'step') return <StepIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'header') return <HeaderIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'footer') return <FooterIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'pagination') return <PaginationIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'topbar') return <TopbarIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'sidebar') return <SidebarIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'action-panel') return <ActionPanelIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'anchor') return <AnchorIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'breadcrumb') return <BreadcrumbIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'message') return <MessageIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'list') return <ListIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'dialog') return <DialogIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'banner') return <BannerIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'toast') return <ToastIcon className="ds-sidebar__item-icon" />;
  return (
    <span className="icon ds-sidebar__item-icon" aria-hidden="true">
      {component.icon}
    </span>
  );
}

interface SidebarProps {
  activeComponentId: string;
  onSelectComponent: (id: string) => void;
}

const COLLAPSE_QUERY = '(max-width: 1024px)';

export default function Sidebar({ activeComponentId, onSelectComponent }: SidebarProps) {
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState(() => window.matchMedia(COLLAPSE_QUERY).matches);
  const [focusPending, setFocusPending] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollThumb, setScrollThumb] = useState({ top: 0, height: 0 });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollHideTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Native scrollbar-width/::-webkit-scrollbar rules reserve their gutter as
  // soon as they're non-zero — even a transparent one — which shrinks this
  // fixed-width collapsed rail and clips its icons. A custom overlay thumb
  // (same pattern as Dropdown/MessageDoc's scrollbar) sits on top instead of
  // in the layout, so it can never take space away from the icons.
  const updateThumb = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight) {
      setScrollThumb({ top: 0, height: 0 });
      return;
    }
    const height = (clientHeight / scrollHeight) * clientHeight;
    const top = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - height);
    setScrollThumb({ top, height });
  };

  // The scrollbar thumb only has a CSS hook (a class), not a native "currently
  // scrolling" selector — track it here and drop the class again after the user
  // has been idle for a moment.
  const handleScroll = () => {
    updateThumb();
    setIsScrolling(true);
    if (scrollHideTimeout.current) clearTimeout(scrollHideTimeout.current);
    scrollHideTimeout.current = setTimeout(() => setIsScrolling(false), 800);
  };

  useEffect(() => {
    window.addEventListener('resize', updateThumb);
    return () => {
      window.removeEventListener('resize', updateThumb);
      if (scrollHideTimeout.current) clearTimeout(scrollHideTimeout.current);
    };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(COLLAPSE_QUERY);
    const handleChange = (e: MediaQueryListEvent) => setCollapsed(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!collapsed && focusPending) {
      searchInputRef.current?.focus();
      setFocusPending(false);
    }
  }, [collapsed, focusPending]);

  const handleSearchIconClick = () => {
    setCollapsed(false);
    setFocusPending(true);
  };

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current?.focus();
  };

  // Clicking the clear button would otherwise blur the field first (mousedown fires
  // before click), which hides the button before its own click can register.
  const preventBlur = (event: React.MouseEvent) => event.preventDefault();

  const showClear = searchFocused && query.length > 0;

  const filtered = COMPONENTS.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));

  // Filtering or collapsing changes how tall the list is, which changes the
  // thumb's size/position — recompute once the DOM has settled.
  useEffect(() => {
    updateThumb();
  }, [filtered.length, collapsed]);

  return (
    <aside className={`ds-sidebar${collapsed ? ' ds-sidebar--collapsed' : ''}`}>
      <div className="ds-sidebar__header">
        <div className="ds-sidebar__toggle-row">
          <button
            type="button"
            className="ds-sidebar__toggle"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-pressed={collapsed}
          >
            <span className="icon" aria-hidden="true">
              {collapsed ? 'left_panel_open' : 'left_panel_close'}
            </span>
          </button>
        </div>

        <div className="ds-sidebar__search">
          <button
            type="button"
            className="ds-sidebar__search-icon-btn"
            aria-label="Search components"
            onClick={handleSearchIconClick}
          >
            <span className="icon ds-sidebar__search-icon" aria-hidden="true">
              search
            </span>
          </button>
          <input
            type="text"
            className="ds-sidebar__search-input"
            placeholder="Search component name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search component name"
            tabIndex={collapsed ? -1 : undefined}
            ref={searchInputRef}
          />
          {showClear && (
            <button
              type="button"
              className="ds-sidebar__search-clear"
              onMouseDown={preventBlur}
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <span className="icon icon--sm icon--filled" aria-hidden="true">
                cancel
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="ds-sidebar__scroll-wrap">
        <div className="ds-sidebar__scroll" onScroll={handleScroll} ref={scrollRef}>
          <nav aria-label="Components">
            <p className="ds-sidebar__section-title">Components</p>
            <ul className="ds-sidebar__list" role="list">
              {filtered.map((component) => (
                <li key={component.id}>
                  <button
                    className={`ds-sidebar__item${
                      activeComponentId === component.id ? ' ds-sidebar__item--active' : ''
                    }`}
                    onClick={() => onSelectComponent(component.id)}
                    title={component.name}
                  >
                    {renderItemIcon(component)}
                    <span className="ds-sidebar__item-label">{component.name}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="ds-sidebar__empty">No components found</li>}
            </ul>
          </nav>
        </div>
        <div
          className={`ds-sidebar__scrollbar${isScrolling ? ' ds-sidebar__scrollbar--visible' : ''}`}
          aria-hidden="true"
        >
          <div className="ds-sidebar__scrollbar-track">
            <div
              className="ds-sidebar__scrollbar-thumb"
              style={{
                height: `${scrollThumb.height}px`,
                transform: `translateY(${scrollThumb.top}px)`,
                opacity: scrollThumb.height > 0 ? 1 : 0,
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
