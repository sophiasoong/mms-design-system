import { useEffect, useRef, useState } from 'react';
import { COMPONENTS } from '../data/components';
import {
  BadgeIcon,
  ButtonIcon,
  CheckboxIcon,
  ChipIcon,
  DatepickerIcon,
  DropdownIcon,
  HintIcon,
  IconButtonIcon,
  InputIcon,
  RadioIcon,
  SelectIcon,
  TabIcon,
  TableIcon,
  TagIcon,
  TextareaIcon,
  ToggleIcon,
} from './icons';
import './Sidebar.css';

function renderItemIcon(component: (typeof COMPONENTS)[number]) {
  if (component.id === 'button') return <ButtonIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'icon-button') return <IconButtonIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'dropdown') return <DropdownIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'chip') return <ChipIcon className="ds-sidebar__item-icon" />;
  if (component.id === 'input') return <InputIcon className="ds-sidebar__item-icon" />;
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
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const filtered = COMPONENTS.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <aside className={`ds-sidebar${collapsed ? ' ds-sidebar--collapsed' : ''}`}>
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
          aria-label="Search component name"
          tabIndex={collapsed ? -1 : undefined}
          ref={searchInputRef}
        />
      </div>

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
    </aside>
  );
}
