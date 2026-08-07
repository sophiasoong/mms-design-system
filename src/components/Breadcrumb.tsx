import type { ReactNode } from 'react';
import './Breadcrumb.css';

export type BreadcrumbItemState = 'default' | 'hover' | 'active' | 'disabled';

export interface BreadcrumbItemProps {
  label?: string;
  state?: BreadcrumbItemState;
  className?: string;
  onClick?: () => void;
}

export function BreadcrumbItem({
  label = 'Label',
  state = 'default',
  className,
  onClick,
}: BreadcrumbItemProps) {
  const active = state === 'active';
  const disabled = state === 'disabled';
  const classes = [
    'ds-breadcrumb-item',
    active ? 'ds-breadcrumb-item--active' : '',
    disabled ? 'ds-breadcrumb-item--disabled' : '',
    state === 'hover' ? 'ds-breadcrumb-item--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (active || disabled) {
    return (
      <span className={classes} aria-current={active ? 'page' : undefined}>
        {label}
      </span>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {label}
    </button>
  );
}

export function BreadcrumbSeparator() {
  return (
    <span className="ds-breadcrumb-separator" aria-hidden="true">
      /
    </span>
  );
}

export function BreadcrumbEllipsis() {
  return <span className="ds-breadcrumb-ellipsis">...</span>;
}

export interface BreadcrumbProps {
  children?: ReactNode;
  className?: string;
}

export default function Breadcrumb({ children, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={['ds-breadcrumb', className].filter(Boolean).join(' ')}>
      {children}
    </nav>
  );
}

export interface BackLinkProps {
  label?: string;
  className?: string;
  onClick?: () => void;
}

export function BackLink({ label = 'Back to Home', className, onClick }: BackLinkProps) {
  return (
    <button type="button" className={['ds-back-link', className].filter(Boolean).join(' ')} onClick={onClick}>
      <span className="icon icon--sm ds-back-link__icon" aria-hidden="true">
        chevron_left
      </span>
      <span className="ds-back-link__label">{label}</span>
    </button>
  );
}
