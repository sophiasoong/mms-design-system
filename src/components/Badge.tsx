import './Badge.css';

export type BadgeColor = 'green' | 'orange' | 'red' | 'blue' | 'gray';
export type BadgeSize = 'sm' | 'lg';

export interface BadgeProps {
  label?: string;
  color?: BadgeColor;
  /** Only applies when `label` is omitted — the labeled variant always uses the small dot. */
  size?: BadgeSize;
  className?: string;
}

export function Badge({ label, color = 'red', size = 'sm', className }: BadgeProps) {
  const classes = [
    'ds-badge',
    label ? 'ds-badge--label' : `ds-badge--dot-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <span className={`ds-badge__dot ds-badge__dot--${color}`} aria-hidden="true" />
      {label && <span className="ds-badge__label">{label}</span>}
    </span>
  );
}
