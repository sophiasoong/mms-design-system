import { useState } from 'react';
import './Radio.css';

export type RadioState = 'default' | 'hover' | 'focus' | 'disabled';

export interface RadioProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  state?: RadioState;
  onChange?: (checked: boolean) => void;
  /** Renders the visual mark only, with no focusable input — for embedding inside a
   * larger interactive control that already owns the click/keyboard handling and
   * marks itself aria-hidden. */
  decorative?: boolean;
  name?: string;
  value?: string;
  className?: string;
}

export function Radio({
  label,
  checked,
  defaultChecked = false,
  state = 'default',
  onChange,
  decorative = false,
  name,
  value,
  className,
}: RadioProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const disabled = state === 'disabled';

  const classes = [
    'ds-radio',
    isChecked ? 'ds-radio--checked' : '',
    disabled ? 'ds-radio--disabled' : '',
    state === 'hover' ? 'ds-radio--force-hover' : '',
    state === 'focus' ? 'ds-radio--force-focus' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mark = (
    <span className="ds-radio__circle">
      <span className="ds-radio__dot" aria-hidden="true" />
    </span>
  );

  if (decorative) {
    return (
      <span className={classes} aria-hidden="true">
        <span className="ds-radio__hit">{mark}</span>
      </span>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label className={classes}>
      <span className="ds-radio__hit">
        <input
          type="radio"
          className="ds-radio__input"
          checked={isChecked}
          disabled={disabled}
          name={name}
          value={value}
          onChange={handleChange}
        />
        {mark}
      </span>
      {label && <span className="ds-radio__label">{label}</span>}
    </label>
  );
}
