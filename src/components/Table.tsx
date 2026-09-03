import { Children, isValidElement, type ReactNode } from 'react';
import { Checkbox } from './Checkbox';
import { Tooltip } from './Tooltip';
import './Table.css';

export type TableSize = 'sm' | 'md' | 'lg' | 'xl';
export type TableRowState = 'default' | 'hover' | 'selected' | 'highlighted' | 'disabled';
export type TableAlign = 'left' | 'center' | 'right';
export type TableSortDirection = 'asc' | 'desc' | null;

export interface TableProps {
  size?: TableSize;
  /** Overrides just the header row's height, independent of `size` (which otherwise sizes
   * both header and body rows the same). For a composition where body rows grow to fit a
   * thumbnail/upload tile (e.g. `xl`) but the plain-text header shouldn't stretch to match. */
  headerSize?: TableSize;
  className?: string;
  children: React.ReactNode;
}

/** Splits children into a `<thead>` (any `TableHeader` or raw `<thead>` passed in) and a
 * `<tbody>` (everything else — `TableRow`s or raw `<tr>`s) — React validates table
 * nesting strictly, so a bare `<tr>` can't sit directly under `<table>` the way the HTML
 * spec's implicit-tbody behavior would otherwise allow. */
export function Table({ size = 'md', headerSize, className, children }: TableProps) {
  const classes = [
    'ds-datatable',
    `ds-datatable--${size}`,
    headerSize ? `ds-datatable--header-${headerSize}` : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const items = Children.toArray(children);
  const head = items.filter(
    (child) => isValidElement(child) && (child.type === TableHeader || child.type === 'thead'),
  );
  const body = items.filter((child) => !head.includes(child));
  return (
    <table className={classes}>
      {head}
      <tbody>{body}</tbody>
    </table>
  );
}

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead>
      <tr className={['ds-datatable__header-row', className].filter(Boolean).join(' ')}>
        {children}
      </tr>
    </thead>
  );
}

export interface TableHeaderCellProps {
  children?: React.ReactNode;
  width?: number | string;
  align?: TableAlign;
  info?: boolean;
  /** Content for a Tooltip that appears above the info icon on hover/focus — opt-in,
   * only rendered when both `info` and this are set (see ActionPanelField's `required`
   * prop for the same additive-prop convention). Positioned by the icon itself so it
   * stays pinned to the icon regardless of the column label's length. */
  infoTooltip?: ReactNode;
  sortable?: boolean;
  sortDirection?: TableSortDirection;
  onSort?: () => void;
  className?: string;
}

export function TableHeaderCell({
  children,
  width,
  align = 'left',
  info = false,
  infoTooltip,
  sortable = false,
  sortDirection = null,
  onSort,
  className,
}: TableHeaderCellProps) {
  const classes = [
    'ds-datatable__header-cell',
    `ds-datatable__header-cell--${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <th className={classes} style={width !== undefined ? { width } : undefined} scope="col">
      <span className="ds-datatable__header-content">
        <span className="ds-datatable__header-label">{children}</span>
        {info && infoTooltip && (
          <span className="ds-datatable__header-info-anchor" tabIndex={0}>
            <span className="icon icon--sm ds-datatable__header-icon ds-datatable__header-icon--info" aria-hidden="true">
              info
            </span>
            <span className="ds-datatable__header-tooltip">
              <Tooltip size="sm">{infoTooltip}</Tooltip>
            </span>
          </span>
        )}
        {info && !infoTooltip && (
          <span className="icon icon--sm ds-datatable__header-icon ds-datatable__header-icon--info" aria-hidden="true">
            info
          </span>
        )}
        {sortable && (
          <button
            type="button"
            className={`ds-datatable__sort-btn${sortDirection ? ' ds-datatable__sort-btn--active' : ''}`}
            onClick={onSort}
            aria-label={`Sort by ${typeof children === 'string' ? children : 'column'}`}
          >
            <span className="icon icon--sm ds-datatable__header-icon" aria-hidden="true">
              {sortDirection === 'asc' ? 'arrow_upward' : sortDirection === 'desc' ? 'arrow_downward' : 'unfold_more'}
            </span>
          </button>
        )}
      </span>
    </th>
  );
}

export interface TableSelectHeaderCellProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function TableSelectHeaderCell({
  checked,
  indeterminate,
  onChange,
  className,
}: TableSelectHeaderCellProps) {
  return (
    <th className={['ds-datatable__header-cell', 'ds-datatable__select-cell', className].filter(Boolean).join(' ')} scope="col">
      <Checkbox checked={checked} indeterminate={indeterminate} onChange={onChange} />
    </th>
  );
}

export interface TableRowProps {
  state?: TableRowState;
  children: React.ReactNode;
  className?: string;
}

export function TableRow({ state = 'default', children, className }: TableRowProps) {
  const classes = [
    'ds-datatable__row',
    state !== 'default' ? `ds-datatable__row--${state}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <tr className={classes}>{children}</tr>;
}

export interface TableCellProps {
  children?: React.ReactNode;
  align?: TableAlign;
  className?: string;
}

export function TableCell({ children, align = 'left', className }: TableCellProps) {
  const classes = ['ds-datatable__cell', `ds-datatable__cell--${align}`, className]
    .filter(Boolean)
    .join(' ');
  return <td className={classes}>{children}</td>;
}

export interface TableSelectCellProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function TableSelectCell({ checked, disabled, onChange, className }: TableSelectCellProps) {
  return (
    <td className={['ds-datatable__cell', 'ds-datatable__select-cell', className].filter(Boolean).join(' ')}>
      <Checkbox checked={checked} state={disabled ? 'disabled' : 'default'} onChange={onChange} />
    </td>
  );
}
