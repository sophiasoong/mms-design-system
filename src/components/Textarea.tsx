import { useState } from 'react';
import './Textarea.css';
import { InputChip } from './Chip';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaState = 'default' | 'hover' | 'focus' | 'error' | 'disabled';

export interface TextareaProps {
  placeholder?: string;
  defaultValue?: string;
  size?: TextareaSize;
  state?: TextareaState;
  /** Native character cap — the browser simply stops accepting keystrokes past this
   * length (backspace/delete still work), so a caller pairing this with
   * `state="error"` at the same threshold gets a field that blocks further typing
   * and shows the error border, without needing a combined disabled+error state. */
  maxLength?: number;
  chips?: string[];
  onRemoveChip?: (label: string) => void;
  onAddChip?: (value: string) => void;
  onChange?: (value: string) => void;
  className?: string;
}

export function Textarea({
  placeholder = 'Placeholder',
  defaultValue,
  size = 'lg',
  state = 'default',
  maxLength,
  chips,
  onRemoveChip,
  onAddChip,
  onChange,
  className,
}: TextareaProps) {
  const [chipDraft, setChipDraft] = useState('');
  const disabled = state === 'disabled';
  const chipMode = !!onAddChip;
  const hasChips = !!chips && chips.length > 0;
  const classes = [
    'ds-textarea',
    `ds-textarea--${size}`,
    chipMode ? 'ds-textarea--chips' : '',
    disabled ? 'ds-textarea--disabled' : '',
    state === 'hover' ? 'ds-textarea--force-hover' : '',
    state === 'focus' ? 'ds-textarea--force-focus' : '',
    state === 'error' ? 'ds-textarea--error' : '',
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

  if (chipMode) {
    return (
      <div className={classes}>
        <div className="ds-textarea__chips">
          {chips?.map((chipLabel) => (
            <InputChip
              key={chipLabel}
              label={chipLabel}
              size="md"
              state={disabled ? 'disabled' : 'default'}
              onRemove={() => onRemoveChip?.(chipLabel)}
            />
          ))}
          <input
            className="ds-textarea__chip-field"
            type="text"
            value={chipDraft}
            onChange={(event) => setChipDraft(event.target.value)}
            onKeyDown={handleChipKeyDown}
            placeholder={hasChips ? '' : placeholder}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classes}>
      <textarea
        className="ds-textarea__field"
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      />
    </div>
  );
}
