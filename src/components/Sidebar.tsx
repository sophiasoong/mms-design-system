import { useState } from 'react';
import { COMPONENTS } from '../data/components';
import './Sidebar.css';

interface SidebarProps {
  activeComponentId: string;
  onSelectComponent: (id: string) => void;
}

export default function Sidebar({ activeComponentId, onSelectComponent }: SidebarProps) {
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState(false);

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
        <span className="icon ds-sidebar__search-icon" aria-hidden="true">
          search
        </span>
        <input
          type="text"
          className="ds-sidebar__search-input"
          placeholder="Search component name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search component name"
          tabIndex={collapsed ? -1 : undefined}
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
                <span className="icon ds-sidebar__item-icon" aria-hidden="true">
                  {component.icon}
                </span>
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
