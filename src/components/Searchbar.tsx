import { useRef, useState } from 'react';
import { InputChip } from './Chip';
import './Searchbar.css';

export type SearchbarSize = 'lg' | 'md';
export type SearchbarState = 'default' | 'hover' | 'focus' | 'disabled';

export interface SearchbarProps {
  placeholder?: string;
  defaultValue?: string;
  size?: SearchbarSize;
  state?: SearchbarState;
  /** Renders a removable filter chip inline before the typed text — the Figma "Chip" style. */
  chipLabel?: string;
  onChipRemove?: () => void;
  onSearch?: (value: string) => void;
  className?: string;
}

export function Searchbar({
  placeholder = 'Placeholder',
  defaultValue = '',
  size = 'lg',
  state = 'default',
  chipLabel,
  onChipRemove,
  onSearch,
  className,
}: SearchbarProps) {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const fieldRef = useRef<HTMLInputElement>(null);
  const disabled = state === 'disabled';
  const hasChip = Boolean(chipLabel);
  // A chip is a committed filter, so its clear affordance persists regardless of focus —
  // unlike the plain typed-text case, which only shows a clear button while focused.
  const showClear = !disabled && (hasChip || (isFocused && value.length > 0));
  const classes = [
    'ds-searchbar',
    `ds-searchbar--${size}`,
    disabled ? 'ds-searchbar--disabled' : '',
    state === 'hover' ? 'ds-searchbar--force-hover' : '',
    state === 'focus' ? 'ds-searchbar--force-focus' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClear = () => {
    setValue('');
    onChipRemove?.();
    fieldRef.current?.focus();
  };

  // Clicking the clear/search button would otherwise blur the field first (mousedown
  // fires before click), which hides the clear button before its own click can register.
  const preventBlur = (event: React.MouseEvent) => event.preventDefault();

  return (
    <div className={classes}>
      {hasChip && (
        <InputChip
          label={chipLabel}
          size="sm"
          state={disabled ? 'disabled' : 'default'}
          showTrailingIcon={!disabled}
          onRemove={onChipRemove}
        />
      )}
      <input
        ref={fieldRef}
        className="ds-searchbar__field"
        type="text"
        value={value}
        placeholder={hasChip ? undefined : placeholder}
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSearch?.(value);
        }}
      />
      {showClear ? (
        <button
          type="button"
          className="ds-searchbar__action"
          onMouseDown={preventBlur}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <span className="icon icon--sm icon--filled" aria-hidden="true">
            cancel
          </span>
        </button>
      ) : (
        <button
          type="button"
          className="ds-searchbar__action ds-searchbar__action--search"
          onMouseDown={preventBlur}
          onClick={() => onSearch?.(value)}
          disabled={disabled}
          aria-label="Search"
        >
          <span className="icon icon--sm" aria-hidden="true">
            search
          </span>
        </button>
      )}
    </div>
  );
}
