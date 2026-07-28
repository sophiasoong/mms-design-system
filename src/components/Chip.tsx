import './Chip.css';

/* Figma node 1202:15587 ("Down") — a bespoke chevron, not a Material Symbols
   glyph (its sharp/mitered terminals don't exist in the Rounded family used
   elsewhere in the project). Colored via currentColor so it still follows
   the chip's state-driven color rules like the other icons. Rendered at 16px
   wide (scaled up from the native 13.5px asset, aspect preserved) to match
   the ink size of the "close" Material Symbol glyph next to it — measured,
   not guessed, since no token governs a custom SVG's render size. */
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="8.766"
      viewBox="0 0 13.5 7.39645"
      fill="none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.219671 0.219669C0.512565 -0.0732239 0.987439 -0.0732227 1.28033 0.219671L6.74997 5.68934L12.2197 0.219669C12.5126 -0.0732239 12.9874 -0.0732227 13.2803 0.219671C13.5732 0.512565 13.5732 0.987439 13.2803 1.28033L7.45708 7.10356C7.06655 7.49408 6.43338 7.49408 6.04286 7.10355L0.219669 1.28033C-0.0732239 0.987435 -0.0732227 0.512561 0.219671 0.219669Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type ChipState = 'default' | 'hover' | 'focus' | 'disabled';

export interface FilterChipProps {
  label?: string;
  selected?: boolean;
  state?: ChipState;
  showTrailingIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

export function FilterChip({
  label = 'Label',
  selected = false,
  state = 'default',
  showTrailingIcon = true,
  className,
  onClick,
}: FilterChipProps) {
  const disabled = state === 'disabled';
  const classes = [
    'ds-chip',
    'ds-chip--filter',
    selected ? 'ds-chip--selected' : '',
    disabled ? 'ds-chip--disabled' : '',
    state === 'hover' ? 'ds-chip--force-hover' : '',
    state === 'focus' ? 'ds-chip--force-focus' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      <span className="ds-chip__label">{label}</span>
      {showTrailingIcon && (
        <span className="ds-chip__chevron" aria-hidden="true">
          <ChevronDownIcon />
        </span>
      )}
    </button>
  );
}

export interface InputChipProps {
  label?: string;
  size?: 'sm' | 'md';
  state?: 'default' | 'hover' | 'disabled';
  showTrailingIcon?: boolean;
  className?: string;
  onClick?: () => void;
  onRemove?: () => void;
}

export function InputChip({
  label = 'Label',
  size = 'md',
  state = 'default',
  showTrailingIcon = true,
  className,
  onClick,
  onRemove,
}: InputChipProps) {
  const disabled = state === 'disabled';
  const classes = [
    'ds-chip',
    'ds-chip--input',
    `ds-chip--${size}`,
    disabled ? 'ds-chip--disabled' : '',
    state === 'hover' ? 'ds-chip--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} onClick={disabled ? undefined : onClick}>
      <span className="ds-chip__label">{label}</span>
      {!disabled && showTrailingIcon && (
        <span
          className="icon"
          aria-hidden="true"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          close
        </span>
      )}
    </span>
  );
}

export interface ActionChipProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  state?: 'default' | 'hover' | 'disabled';
  className?: string;
  onClick?: () => void;
}

export function ActionChip({
  label = 'Label',
  size = 'lg',
  selected = false,
  state = 'default',
  className,
  onClick,
}: ActionChipProps) {
  const disabled = state === 'disabled';
  const classes = [
    'ds-chip',
    'ds-chip--action',
    `ds-chip--${size}`,
    selected ? 'ds-chip--selected' : '',
    disabled ? 'ds-chip--disabled' : '',
    state === 'hover' ? 'ds-chip--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      <span className="ds-chip__label">{label}</span>
    </button>
  );
}
