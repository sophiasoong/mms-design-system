import type { ReactNode } from 'react';
import './Tooltip.css';

export type TooltipSize = 'sm' | 'md' | 'lg';
export type TooltipPosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';

export interface TooltipProps {
  children: ReactNode;
  size?: TooltipSize;
  position?: TooltipPosition;
  className?: string;
}

export function Tooltip({ children, size = 'md', position = 'top', className }: TooltipProps) {
  const isBottom = position.startsWith('bottom');
  const align = position.endsWith('-left') ? 'left' : position.endsWith('-right') ? 'right' : 'center';
  const classes = [
    'ds-tooltip',
    `ds-tooltip--${size}`,
    isBottom ? 'ds-tooltip--bottom' : 'ds-tooltip--top',
    `ds-tooltip--align-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const bubble = (
    <div className="ds-tooltip__bubble">
      <p className="ds-tooltip__label">{children}</p>
    </div>
  );

  const arrow = (
    <div className="ds-tooltip__arrow-wrapper">
      <svg className="ds-tooltip__arrow" width="16" height="8" viewBox="0 0 16 8" aria-hidden="true">
        <path d="M16 8L8 0L0 8H16Z" />
      </svg>
    </div>
  );

  return (
    <div className={classes} role="tooltip">
      {isBottom ? (
        <>
          {arrow}
          {bubble}
        </>
      ) : (
        <>
          {bubble}
          {arrow}
        </>
      )}
    </div>
  );
}
