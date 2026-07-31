import { useRef, useState } from 'react';
import './Input.css';
import { ChevronDownIcon, InputChip } from './Chip';

export type InputState = 'default' | 'hover' | 'focus' | 'error' | 'disabled';
export type InputSize = 'lg' | 'md';
export type InputType = 'text' | 'password' | 'number';

export interface InputProps {
  placeholder?: string;
  defaultValue?: string;
  size?: InputSize;
  state?: InputState;
  type?: InputType;
  chips?: string[];
  onRemoveChip?: (label: string) => void;
  onAddChip?: (value: string) => void;
  className?: string;
}

export function Input({
  placeholder = 'Please type',
  defaultValue,
  size = 'lg',
  state = 'default',
  type = 'text',
  chips,
  onRemoveChip,
  onAddChip,
  className,
}: InputProps) {
  const [chipDraft, setChipDraft] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const numberFieldRef = useRef<HTMLInputElement>(null);
  const disabled = state === 'disabled';
  const hasChips = !!chips && chips.length > 0;
  const chipMode = !!onAddChip;
  const showStepper = type === 'number' && !chipMode;
  const classes = [
    'ds-input',
    `ds-input--${size}`,
    disabled ? 'ds-input--disabled' : '',
    state === 'hover' ? 'ds-input--force-hover' : '',
    state === 'focus' ? 'ds-input--force-focus' : '',
    state === 'error' ? 'ds-input--error' : '',
    showStepper ? 'ds-input--has-stepper' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleChipKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const value = chipDraft.trim();
    if (!value) return;
    onAddChip?.(value);
    setChipDraft('');
  };

  const handleStepUp = () => numberFieldRef.current?.stepUp();
  const handleStepDown = () => numberFieldRef.current?.stepDown();

  const handleNumberKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '-') event.preventDefault();
  };

  const handleNumberInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    if (target.value.includes('-')) target.value = target.value.replace(/-/g, '');
  };

  return (
    <div className={classes}>
      <div className="ds-input__content">
        {hasChips && (
          <div className="ds-input__chips">
            {chips!.map((chipLabel) => (
              <InputChip
                key={chipLabel}
                label={chipLabel}
                size={size === 'lg' ? 'md' : 'sm'}
                state={disabled ? 'disabled' : 'default'}
                onRemove={() => onRemoveChip?.(chipLabel)}
              />
            ))}
          </div>
        )}
        {chipMode ? (
          <input
            className="ds-input__chip-field"
            type="text"
            value={chipDraft}
            onChange={(event) => setChipDraft(event.target.value)}
            onKeyDown={handleChipKeyDown}
            placeholder={hasChips ? '' : placeholder}
            disabled={disabled}
          />
        ) : (
          <input
            ref={type === 'number' ? numberFieldRef : undefined}
            className="ds-input__field"
            type={type === 'password' ? (passwordVisible ? 'text' : 'password') : type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            min={type === 'number' ? 0 : undefined}
            onKeyDown={type === 'number' ? handleNumberKeyDown : undefined}
            onInput={type === 'number' ? handleNumberInput : undefined}
          />
        )}
      </div>
      {showStepper && (
        <div className="ds-input__stepper">
          <button
            type="button"
            className="ds-input__stepper-btn"
            onClick={handleStepUp}
            disabled={disabled}
            aria-label="Increase value"
          >
            <ChevronDownIcon className="ds-input__stepper-icon ds-input__stepper-icon--up" />
          </button>
          <button
            type="button"
            className="ds-input__stepper-btn"
            onClick={handleStepDown}
            disabled={disabled}
            aria-label="Decrease value"
          >
            <ChevronDownIcon className="ds-input__stepper-icon" />
          </button>
        </div>
      )}
      {type === 'password' && !chipMode && (
        <button
          type="button"
          className="ds-input__visibility-toggle"
          onClick={() => setPasswordVisible((visible) => !visible)}
          disabled={disabled}
          aria-label={passwordVisible ? 'Hide password' : 'Show password'}
        >
          <span className="icon icon--sm" aria-hidden="true">
            {passwordVisible ? 'visibility' : 'visibility_off'}
          </span>
        </button>
      )}
    </div>
  );
}
