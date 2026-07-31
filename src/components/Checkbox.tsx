import { useEffect, useRef, useState } from 'react';
import './Checkbox.css';

export type CheckboxState = 'default' | 'hover' | 'focus' | 'disabled';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  state?: CheckboxState;
  onChange?: (checked: boolean) => void;
  /** Renders the visual mark only, with no focusable input — for embedding inside a
   * larger interactive control (e.g. Dropdown's option rows) that already owns the
   * click/keyboard handling and marks itself aria-hidden. */
  decorative?: boolean;
  className?: string;
}

export function Checkbox({
  label,
  checked,
  defaultChecked = false,
  indeterminate = false,
  state = 'default',
  onChange,
  decorative = false,
  className,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const disabled = state === 'disabled';

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const classes = [
    'ds-checkbox',
    isChecked ? 'ds-checkbox--checked' : '',
    indeterminate ? 'ds-checkbox--indeterminate' : '',
    disabled ? 'ds-checkbox--disabled' : '',
    state === 'hover' ? 'ds-checkbox--force-hover' : '',
    state === 'focus' ? 'ds-checkbox--force-focus' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mark = (
    <span className="ds-checkbox__box">
      <span className="icon ds-checkbox__check" aria-hidden="true">
        check
      </span>
      <span className="ds-checkbox__dash" aria-hidden="true" />
    </span>
  );

  if (decorative) {
    return (
      <span className={classes} aria-hidden="true">
        <span className="ds-checkbox__hit">{mark}</span>
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
      <span className="ds-checkbox__hit">
        <input
          ref={inputRef}
          type="checkbox"
          className="ds-checkbox__input"
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
        />
        {mark}
      </span>
      {label && <span className="ds-checkbox__label">{label}</span>}
    </label>
  );
}
