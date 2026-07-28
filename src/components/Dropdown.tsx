import Button from './Button';
import './Dropdown.css';

export type DropdownStyle = 'single' | 'multi' | 'expander' | 'cascader';
export type DropdownOptionState = 'default' | 'selected' | 'disabled';
export type ExpanderState = 'expanded' | 'collapsed' | 'none';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  forceHover?: boolean;
  className?: string;
}

export function Checkbox({ checked = false, disabled = false, forceHover = false, className }: CheckboxProps) {
  const classes = [
    'ds-checkbox',
    checked ? 'ds-checkbox--checked' : '',
    disabled ? 'ds-checkbox--disabled' : '',
    forceHover ? 'ds-checkbox--hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} aria-hidden="true">
      <span className="ds-checkbox__box">
        {checked && (
          <span className="icon" aria-hidden="true">
            check
          </span>
        )}
      </span>
    </span>
  );
}

export interface DropdownOptionProps {
  label: string;
  style?: DropdownStyle;
  state?: DropdownOptionState;
  forceHover?: boolean;
  trailingIcon?: string;
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export function DropdownOption({
  label,
  style = 'single',
  state = 'default',
  forceHover = false,
  trailingIcon,
  showBadge = false,
  className,
  onClick,
}: DropdownOptionProps) {
  const disabled = state === 'disabled';
  const selected = state === 'selected';
  const hasCheckbox = style === 'multi' || style === 'cascader';
  const classes = [
    'ds-dropdown-option',
    hasCheckbox ? 'ds-dropdown-option--multi' : `ds-dropdown-option--${style}`,
    disabled ? 'ds-dropdown-option--disabled' : '',
    selected ? 'ds-dropdown-option--selected' : '',
    forceHover ? 'ds-dropdown-option--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
    >
      {hasCheckbox && <Checkbox checked={selected} disabled={disabled} forceHover={forceHover && !disabled} />}
      {showBadge && (
        <span className="ds-dropdown-option__badge" aria-hidden="true">
          <span className="ds-dropdown-option__badge-dot" />
        </span>
      )}
      <span className="ds-dropdown-option__label">{label}</span>
      {trailingIcon && (
        <span className="ds-dropdown-option__trailing-icon" aria-hidden="true">
          <span className="icon" aria-hidden="true">
            {trailingIcon}
          </span>
        </span>
      )}
    </div>
  );
}

export interface ExpanderOptionProps {
  label: string;
  level?: 0 | 1 | 2;
  expandState?: ExpanderState;
  state?: DropdownOptionState;
  forceHover?: boolean;
  caption?: string;
  className?: string;
  onClick?: () => void;
}

export function ExpanderOption({
  label,
  level = 0,
  expandState = 'none',
  state = 'default',
  forceHover = false,
  caption,
  className,
  onClick,
}: ExpanderOptionProps) {
  const disabled = state === 'disabled';
  const selected = state === 'selected';
  const classes = [
    'ds-dropdown-option',
    'ds-dropdown-option--multi',
    disabled ? 'ds-dropdown-option--disabled' : '',
    selected ? 'ds-dropdown-option--selected' : '',
    forceHover ? 'ds-dropdown-option--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      style={{
        paddingLeft: `calc(var(--space-component-padding-sm) + ${level} * (var(--component-icon-md) + var(--space-component-gap-xs)))`,
      }}
    >
      {expandState !== 'none' && (
        <span className="ds-dropdown-option__expander-icon" aria-hidden="true">
          <span className="icon" aria-hidden="true">
            {expandState === 'expanded' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          </span>
        </span>
      )}
      <Checkbox checked={selected} disabled={disabled} forceHover={forceHover && !disabled} />
      <span className="ds-dropdown-option__label">{label}</span>
      {caption && <span className="ds-dropdown-option__caption">{caption}</span>}
    </div>
  );
}

export interface DropdownProps {
  style?: DropdownStyle;
  options?: string[];
  selectedIndices?: number[];
  disabledIndices?: number[];
  hoverIndex?: number;
  showFooter?: boolean;
  showScrollbar?: boolean;
  width?: 'sm' | 'lg';
  className?: string;
  onOptionClick?: (index: number) => void;
  onReset?: () => void;
  onApply?: () => void;
}

const DEFAULT_OPTIONS = Array.from({ length: 8 }, (_, i) => `Option ${i + 1}`);

export default function Dropdown({
  style = 'single',
  options = DEFAULT_OPTIONS,
  selectedIndices = [],
  disabledIndices = [],
  hoverIndex,
  showFooter = true,
  showScrollbar = false,
  width = 'sm',
  className,
  onOptionClick,
  onReset,
  onApply,
}: DropdownProps) {
  const isCompact = style === 'expander' || style === 'cascader';
  const classes = [
    'ds-dropdown',
    isCompact ? 'ds-dropdown--compact' : `ds-dropdown--${width}`,
    showScrollbar ? 'ds-dropdown--relative' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="listbox">
      <div className="ds-dropdown__options">
        {options.map((label, i) => {
          const state: DropdownOptionState = disabledIndices.includes(i)
            ? 'disabled'
            : selectedIndices.includes(i)
              ? 'selected'
              : 'default';
          return (
            <DropdownOption
              key={label}
              label={label}
              style={style}
              state={state}
              forceHover={hoverIndex === i}
              trailingIcon={style === 'cascader' ? 'chevron_right' : undefined}
              onClick={onOptionClick ? () => onOptionClick(i) : undefined}
            />
          );
        })}
      </div>
      {showFooter && (
        <div className="ds-dropdown__footer">
          <Button variant="primary" appearance="ghost" size="sm" onClick={onReset}>
            Reset
          </Button>
          <Button variant="primary" appearance="solid" size="sm" onClick={onApply}>
            Apply
          </Button>
        </div>
      )}
      {showScrollbar && (
        <div className="ds-dropdown__scrollbar" aria-hidden="true">
          <div className="ds-dropdown__scrollbar-thumb" />
        </div>
      )}
    </div>
  );
}
