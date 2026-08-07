import type { ReactNode } from 'react';
import './Anchor.css';

export type AnchorLevel = 'tab' | 'sub-tab';
export type AnchorItemState = 'default' | 'hover' | 'active' | 'disabled';

export interface AnchorItemProps {
  label?: string;
  level?: AnchorLevel;
  state?: AnchorItemState;
  className?: string;
  onClick?: () => void;
}

export function AnchorItem({
  label = 'Label',
  level = 'tab',
  state = 'default',
  className,
  onClick,
}: AnchorItemProps) {
  const disabled = state === 'disabled';
  const classes = [
    'ds-anchor-item',
    `ds-anchor-item--${level}`,
    state === 'active' ? 'ds-anchor-item--active' : '',
    disabled ? 'ds-anchor-item--disabled' : '',
    state === 'hover' ? 'ds-anchor-item--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      <span className="ds-anchor-item__label">{label}</span>
    </button>
  );
}

export interface AnchorProps {
  children?: ReactNode;
  className?: string;
}

export default function Anchor({ children, className }: AnchorProps) {
  return <div className={['ds-anchor', className].filter(Boolean).join(' ')}>{children}</div>;
}
