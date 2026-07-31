import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import IconButton from './IconButton';
import { CalendarIcon } from './icons';
import './DatePicker.css';

export type DatePickerSize = 'md' | 'lg';
export type DatePickerState = 'default' | 'open' | 'error' | 'disabled';

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  size?: DatePickerSize;
  /** Forces the trigger's visual state for doc-page demos — does not drive real open/close. */
  state?: DatePickerState;
  className?: string;
}

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, delta: number) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Figma's reference grid (Dec 2028 → Jan 2029) renders a fixed 6-row/42-cell month grid,
 * with leading/trailing days from adjacent months shown in the Disabled cell style. */
function buildCalendarGrid(viewDate: Date): Date[] {
  const first = startOfMonth(viewDate);
  const firstWeekday = (first.getDay() + 6) % 7; // Monday-first
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - firstWeekday);
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
}

export function DatePicker({
  value,
  defaultValue = null,
  onChange,
  placeholder = 'Start Date',
  size = 'lg',
  state = 'default',
  className,
}: DatePickerProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
  const selected = isControlled ? value : internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => startOfMonth(selected ?? new Date()));
  const rootRef = useRef<HTMLDivElement>(null);

  const disabled = state === 'disabled';
  const forcedOpen = state === 'open';
  const showPanel = forcedOpen || isOpen;

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const openPanel = () => {
    if (disabled || forcedOpen) return;
    setViewDate(startOfMonth(selected ?? new Date()));
    setIsOpen(true);
  };

  const closePanel = () => setIsOpen(false);

  const commit = (date: Date | null) => {
    if (!isControlled) setInternalValue(date);
    onChange?.(date);
  };

  const today = new Date();
  const cells = buildCalendarGrid(viewDate);

  const classes = [
    'ds-date-picker',
    `ds-date-picker--${size}`,
    disabled ? 'ds-date-picker--disabled' : '',
    state === 'error' ? 'ds-date-picker--error' : '',
    showPanel ? 'ds-date-picker--open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} ref={rootRef}>
      <button
        type="button"
        className="ds-date-picker__trigger"
        disabled={disabled}
        onClick={() => (isOpen ? closePanel() : openPanel())}
      >
        <span
          className={`ds-date-picker__value${
            selected ? '' : ' ds-date-picker__value--placeholder'
          }`}
        >
          {selected ? formatDate(selected) : placeholder}
        </span>
        <CalendarIcon className="ds-date-picker__icon" />
      </button>

      {showPanel && (
        <div className="ds-date-picker__panel">
          <div className="ds-date-picker__header">
            <div className="ds-date-picker__nav">
              <IconButton
                icon="keyboard_double_arrow_left"
                label="Previous year"
                size="md"
                variant="primary"
                appearance="ghost"
                onClick={() => setViewDate((d) => addMonths(d, -12))}
              />
              <IconButton
                icon="chevron_left"
                label="Previous month"
                size="md"
                variant="primary"
                appearance="ghost"
                onClick={() => setViewDate((d) => addMonths(d, -1))}
              />
            </div>
            <span className="ds-date-picker__label">
              {MONTH_LABELS[viewDate.getMonth()]}-{viewDate.getFullYear()}
            </span>
            <div className="ds-date-picker__nav">
              <IconButton
                icon="chevron_right"
                label="Next month"
                size="md"
                variant="primary"
                appearance="ghost"
                onClick={() => setViewDate((d) => addMonths(d, 1))}
              />
              <IconButton
                icon="keyboard_double_arrow_right"
                label="Next year"
                size="md"
                variant="primary"
                appearance="ghost"
                onClick={() => setViewDate((d) => addMonths(d, 12))}
              />
            </div>
          </div>

          <div className="ds-date-picker__weekdays">
            {WEEKDAY_LABELS.map((label) => (
              <span key={label} className="ds-date-picker__weekday">
                {label}
              </span>
            ))}
          </div>

          <div className="ds-date-picker__grid">
            {cells.map((date) => {
              const inMonth = date.getMonth() === viewDate.getMonth();
              const isSelected = selected ? isSameDay(date, selected) : false;
              const isToday = isSameDay(date, today);
              const cellClass = [
                'ds-date-picker__cell',
                !inMonth ? 'ds-date-picker__cell--disabled' : '',
                isSelected ? 'ds-date-picker__cell--selected' : '',
                isToday && !isSelected ? 'ds-date-picker__cell--today' : '',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  className={cellClass}
                  disabled={!inMonth}
                  onClick={() => {
                    commit(date);
                    closePanel();
                  }}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="ds-date-picker__footer">
            {/* Figma's footer buttons are exactly 24px (component-height-xs); Button's
                size enum only offers sm(28)/md(32)/lg(40), so "sm" (closest) is used. */}
            <Button variant="primary" appearance="ghost" size="sm" onClick={() => commit(null)}>
              Reset
            </Button>
            <Button variant="primary" appearance="solid" size="sm" onClick={closePanel}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
