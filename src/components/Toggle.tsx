import { useRef, useState } from 'react';
import './Toggle.css';

export type ToggleSize = 'sm' | 'md';
export type ToggleState = 'default' | 'hover' | 'focus' | 'disabled';

export interface ToggleProps {
  label?: string;
  size?: ToggleSize;
  checked?: boolean;
  defaultChecked?: boolean;
  state?: ToggleState;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Toggle({
  label,
  size = 'md',
  checked,
  defaultChecked = false,
  state = 'default',
  onChange,
  className,
}: ToggleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const disabled = state === 'disabled';

  const classes = [
    'ds-toggle',
    `ds-toggle--${size}`,
    isChecked ? 'ds-toggle--checked' : '',
    disabled ? 'ds-toggle--disabled' : '',
    state === 'hover' ? 'ds-toggle--force-hover' : '',
    state === 'focus' ? 'ds-toggle--force-focus' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label className={classes}>
      <span className="ds-toggle__hit">
        <input
          ref={inputRef}
          type="checkbox"
          className="ds-toggle__input"
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
        />
        <span className="ds-toggle__track">
          <span className="ds-toggle__thumb" />
        </span>
      </span>
      {label && <span className="ds-toggle__label">{label}</span>}
    </label>
  );
}
