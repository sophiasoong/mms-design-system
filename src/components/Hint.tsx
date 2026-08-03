import type { ReactNode } from 'react';
import './Hint.css';

export type HintSize = 'md' | 'lg';

export interface HintProps {
  children: ReactNode;
  size?: HintSize;
  className?: string;
}

export function Hint({ children, size = 'md', className }: HintProps) {
  const classes = ['ds-hint', size === 'lg' ? 'ds-hint--lg' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="tooltip">
      <p className="ds-hint__label">{children}</p>
    </div>
  );
}
