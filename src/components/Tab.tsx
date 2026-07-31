import { ActionChip, ChevronDownIcon } from './Chip';
import './Tab.css';

export type TabState = 'default' | 'hover' | 'active' | 'disabled';

/* ---- Card Tab ---- */
export interface CardTabItemProps {
  label?: string;
  size?: 'lg' | 'md';
  state?: TabState;
  closable?: boolean;
  className?: string;
  onClick?: () => void;
  onRemove?: () => void;
}

/** Figma's Card tab exposes this as the "Focus" state — renamed to `active` here so
 * Card/Line/Segment/Chip all share the same Default/Hover/Active/Disabled vocabulary. */
export function CardTabItem({
  label = 'Label',
  size = 'lg',
  state = 'default',
  closable = false,
  className,
  onClick,
  onRemove,
}: CardTabItemProps) {
  const disabled = state === 'disabled';
  const classes = [
    'ds-tab',
    'ds-tab--card',
    `ds-tab--${size}`,
    state === 'active' ? 'ds-tab--active' : '',
    disabled ? 'ds-tab--disabled' : '',
    state === 'hover' ? 'ds-tab--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      <span className="ds-tab__label">{label}</span>
      {closable && (
        <span
          className="icon ds-tab__close"
          aria-hidden="true"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          close
        </span>
      )}
    </button>
  );
}

/* ---- Line Tab ---- */
export interface LineTabItemProps {
  label?: string;
  state?: TabState;
  showIcon?: boolean;
  badge?: 'none' | 'dot' | 'count';
  count?: string;
  className?: string;
  onClick?: () => void;
}

export function LineTabItem({
  label = 'Label',
  state = 'default',
  showIcon = false,
  badge = 'none',
  count = '99+',
  className,
  onClick,
}: LineTabItemProps) {
  const disabled = state === 'disabled';
  const classes = [
    'ds-tab',
    'ds-tab--line',
    state === 'active' ? 'ds-tab--active' : '',
    disabled ? 'ds-tab--disabled' : '',
    state === 'hover' ? 'ds-tab--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      <span className="ds-tab__label">{label}</span>
      {badge === 'dot' && <span className="ds-tab__dot-badge" aria-hidden="true" />}
      {badge === 'count' && <span className="ds-tab__count-badge">{count}</span>}
      {showIcon && (
        <span className="ds-tab__chevron" aria-hidden="true">
          <ChevronDownIcon />
        </span>
      )}
    </button>
  );
}

/* ---- Segment Tab ---- */
export interface SegmentTabItemProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'start' | 'middle' | 'end';
  state?: TabState;
  className?: string;
  onClick?: () => void;
}

export function SegmentTabItem({
  label = 'Label',
  size = 'lg',
  position = 'middle',
  state = 'default',
  className,
  onClick,
}: SegmentTabItemProps) {
  const disabled = state === 'disabled';
  const classes = [
    'ds-tab',
    'ds-tab--segment',
    `ds-tab--${size}`,
    `ds-tab--${position}`,
    state === 'active' ? 'ds-tab--active' : '',
    disabled ? 'ds-tab--disabled' : '',
    state === 'hover' ? 'ds-tab--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      <span className="ds-tab__label">{label}</span>
    </button>
  );
}

/* ---- Chip Tab ----
   Figma's Chip-tab is a title label plus a row of Action chips (one selected) — rather
   than a new tab primitive, it reuses the existing ActionChip from Chip.tsx directly,
   matching this project's chip surface/border/label tokens instead of duplicating them. */
export interface ChipTabProps {
  title?: string;
  options?: string[];
  selected?: string;
  onSelect?: (label: string) => void;
  className?: string;
}

export function ChipTab({
  title = 'Title',
  options = ['All', 'Label', 'Label', 'Label'],
  selected = 'All',
  onSelect,
  className,
}: ChipTabProps) {
  return (
    <div className={['ds-tab-chip-group', className].filter(Boolean).join(' ')}>
      <span className="ds-tab-chip-group__title">{title}</span>
      {options.map((label, i) => (
        <ActionChip
          key={`${label}-${i}`}
          label={label}
          selected={selected === label}
          onClick={() => onSelect?.(label)}
        />
      ))}
    </div>
  );
}
