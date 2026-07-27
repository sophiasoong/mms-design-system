import type { ButtonHTMLAttributes } from 'react';
import './IconButton.css';

export type IconButtonVariant = 'primary' | 'secondary' | 'danger' | 'neutral' | 'success' | 'pending';
export type IconButtonAppearance = 'solid' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonShape = 'square' | 'round';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: IconButtonVariant;
  appearance?: IconButtonAppearance;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  /** Accessible name — required since the button has no visible label. */
  label: string;
  /** Visually renders the hover/focus state without needing real pointer/keyboard interaction — used in the docs' States table. */
  forceState?: 'hover' | 'focus';
}

export default function IconButton({
  icon,
  variant = 'primary',
  appearance = 'solid',
  size = 'md',
  shape = 'square',
  label,
  forceState,
  disabled,
  className,
  ...rest
}: IconButtonProps) {
  const classes = [
    'ds-icon-button',
    `ds-icon-button--${variant}`,
    `ds-icon-button--${appearance}`,
    `ds-icon-button--${size}`,
    `ds-icon-button--${shape}`,
    forceState ? `ds-icon-button--force-${forceState}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} aria-label={label} {...rest}>
      <span className="icon ds-icon-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
