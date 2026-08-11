import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import IconButton from './IconButton';
import { CalendarIcon } from './icons';
import { useAnchoredPanelPosition } from '../useAnchoredPanel';
import './DatePicker.css';

export type DateTimePickerSize = 'md' | 'lg';

export interface DateTimeValue {
  date: Date | null;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface DateTimePickerProps {
  value?: DateTimeValue;
  defaultValue?: DateTimeValue;
  onChange?: (value: DateTimeValue) => void;
  size?: DateTimePickerSize;
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

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

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

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES_SECONDS = Array.from({ length: 60 }, (_, i) => i);

/** Figma's Date-and-time node (554-12152) pairs the standard single-month grid with a
 * 3-column scrollable time list (hours/minutes/seconds); the header's right half swaps
 * the month label for a live HH:MM:SS readout. Figma's default screenshot only shows the
 * unselected 00:00:00 state, so the selected-cell highlight below reuses the day cell's
 * existing --selected token treatment for a consistent selection affordance. */
function TimeColumn({
  values,
  selected,
  onSelect,
}: {
  values: number[];
  selected: number;
  onSelect: (n: number) => void;
}) {
  return (
    <div className="ds-date-picker__time-col">
      {values.map((n) => (
        <button
          key={n}
          type="button"
          className={`ds-date-picker__cell ds-date-picker__time-cell${
            n === selected ? ' ds-date-picker__cell--selected' : ''
          }`}
          onClick={() => onSelect(n)}
        >
          {pad2(n)}
        </button>
      ))}
    </div>
  );
}

export function DateTimePicker({
  value,
  defaultValue = { date: null, hours: 0, minutes: 0, seconds: 0 },
  onChange,
  size = 'lg',
  className,
}: DateTimePickerProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<DateTimeValue>(defaultValue);
  const current = isControlled ? value : internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => startOfMonth(current.date ?? new Date()));
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelPosition = useAnchoredPanelPosition(rootRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setIsOpen(false);
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
    setViewDate(startOfMonth(current.date ?? new Date()));
    setIsOpen(true);
  };

  const closePanel = () => setIsOpen(false);

  const commit = (next: DateTimeValue) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const today = new Date();
  const cells = buildCalendarGrid(viewDate);
  const label = current.date
    ? `${formatDate(current.date)} ${pad2(current.hours)}:${pad2(current.minutes)}:${pad2(current.seconds)}`
    : '';

  const classes = [
    'ds-date-picker',
    `ds-date-picker--${size}`,
    isOpen ? 'ds-date-picker--open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} ref={rootRef}>
      <button
        type="button"
        className="ds-date-picker__trigger"
        onClick={() => (isOpen ? closePanel() : openPanel())}
      >
        <span className={`ds-date-picker__value${label ? '' : ' ds-date-picker__value--placeholder'}`}>
          {label || 'Start Date'}
        </span>
        <CalendarIcon className="ds-date-picker__icon" />
      </button>

      {isOpen &&
        createPortal(
          <div
            className="ds-date-picker__panel ds-date-picker__panel--datetime"
            style={panelPosition}
            ref={panelRef}
          >
            <div className="ds-date-picker__header ds-date-picker__header--datetime">
              <div className="ds-date-picker__header-cal">
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
              <div className="ds-date-picker__header-time">
                {pad2(current.hours)}:{pad2(current.minutes)}:{pad2(current.seconds)}
              </div>
            </div>

            <div className="ds-date-picker__body--datetime">
              <div className="ds-date-picker__date-panel">
                <div className="ds-date-picker__weekdays">
                  {WEEKDAY_LABELS.map((wd) => (
                    <span key={wd} className="ds-date-picker__weekday">
                      {wd}
                    </span>
                  ))}
                </div>
                <div className="ds-date-picker__grid">
                  {cells.map((date) => {
                    const inMonth = date.getMonth() === viewDate.getMonth();
                    const isSelected = current.date ? isSameDay(date, current.date) : false;
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
                        onClick={() => commit({ ...current, date })}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="ds-date-picker__time-panel">
                <TimeColumn
                  values={HOURS}
                  selected={current.hours}
                  onSelect={(hours) => commit({ ...current, hours })}
                />
                <TimeColumn
                  values={MINUTES_SECONDS}
                  selected={current.minutes}
                  onSelect={(minutes) => commit({ ...current, minutes })}
                />
                <TimeColumn
                  values={MINUTES_SECONDS}
                  selected={current.seconds}
                  onSelect={(seconds) => commit({ ...current, seconds })}
                />
              </div>
            </div>

            <div className="ds-date-picker__footer">
              <Button
                variant="primary"
                appearance="ghost"
                size="sm"
                onClick={() => commit({ date: null, hours: 0, minutes: 0, seconds: 0 })}
              >
                Reset
              </Button>
              <Button variant="primary" appearance="solid" size="sm" onClick={closePanel}>
                Apply
              </Button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
