import './Select.css';
import { ChevronDownIcon, InputChip } from './Chip';

export type SelectState = 'default' | 'hover' | 'focus' | 'error' | 'disabled';
export type SelectSize = 'lg' | 'md' | 'sm';

export interface SelectProps {
  label?: string;
  placeholder?: string;
  size?: SelectSize;
  state?: SelectState;
  chips?: string[];
  onRemoveChip?: (label: string) => void;
  className?: string;
  onClick?: () => void;
}

export function Select({
  label,
  placeholder = 'Please select',
  size = 'lg',
  state = 'default',
  chips,
  onRemoveChip,
  className,
  onClick,
}: SelectProps) {
  const disabled = state === 'disabled';
  const classes = [
    'ds-select',
    `ds-select--${size}`,
    disabled ? 'ds-select--disabled' : '',
    state === 'hover' ? 'ds-select--force-hover' : '',
    state === 'focus' ? 'ds-select--force-focus' : '',
    state === 'error' ? 'ds-select--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasChips = !!chips && chips.length > 0;

  return (
    <div className={classes} onClick={disabled ? undefined : onClick}>
      <div className="ds-select__content">
        {label && <span className="ds-select__label">{label}</span>}
        {hasChips && (
          <div className="ds-select__chips">
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
        {!label && !hasChips && <span className="ds-select__placeholder">{placeholder}</span>}
      </div>
      <span className="ds-select__chevron" aria-hidden="true">
        <ChevronDownIcon />
      </span>
    </div>
  );
}
