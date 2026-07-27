import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonAppearance = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  leadingIcon?: string;
  trailingIcon?: string;
  /** Visually renders the hover/focus state without needing real pointer/keyboard interaction — used in the docs' States table. */
  forceState?: 'hover' | 'focus';
}

export default function Button({
  variant = 'primary',
  appearance = 'solid',
  size = 'md',
  leadingIcon,
  trailingIcon,
  forceState,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${appearance}`,
    `ds-button--${size}`,
    forceState ? `ds-button--force-${forceState}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconClass = `icon ds-button__icon ds-button__icon--${size}`;

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      {leadingIcon && (
        <span className={iconClass} aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children && <span className="ds-button__label">{children}</span>}
      {trailingIcon && (
        <span className={iconClass} aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
