import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import IconButton from './IconButton';
import { CalendarIcon } from './icons';
import { useAnchoredArrowOffset, useAnchoredPanelPosition } from '../useAnchoredPanel';
import './DatePicker.css';

// Figma's arrow-head asset (node 564:22889) is a fixed 14.1421×7 triangle — half its
// width is used below to center it under whichever trigger segment is active.
const ARROW_HALF_WIDTH = 7;

export type DateRangePickerSize = 'md' | 'lg';

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  size?: DateRangePickerSize;
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

/** Figma renders the range fill as one rectangle per affected week row (not a background
 * per day cell), so it reads as a continuous band rather than seven separate rounded
 * squares with gaps between them. This computes, per 7-cell week row, the grid-line span
 * the band should cover — clamped to the row's own edges when the range continues into the
 * row above/below, so multi-week ranges read as one unbroken strip.
 *
 * The day grid uses 14 (not 7) grid-template-columns — each day cell spans 2 half-columns
 * — purely so a band's start/end edge can land on the *center* line of the start/end date's
 * column instead of its full width. Without that, the band (which has to cover a day cell's
 * full column to include the inter-cell gap in its box) bleeds tint into the space before
 * the start date / after the end date, since the day-cell button is narrower than its grid
 * column and centered within it. Landing on the center line trims exactly that overshoot
 * while staying a single spanning grid item, so gap-inclusion still makes it read as one
 * continuous rectangle with no seam at the start/end cell. */
function getRowBands(cells: Date[], start: Date, end: Date) {
  const bands: { row: number; startLine: number; endLine: number }[] = [];
  if (isSameDay(start, end)) return bands;
  for (let row = 0; row < 6; row++) {
    const rowCells = cells.slice(row * 7, row * 7 + 7);
    const rowFirst = rowCells[0];
    const rowLast = rowCells[6];
    if (end < rowFirst || start > rowLast) continue;

    let startLine = 1;
    if (start >= rowFirst) {
      const colStart = rowCells.findIndex((d) => isSameDay(d, start));
      startLine = colStart * 2 + 2;
    }

    let endLine = 15;
    if (end <= rowLast) {
      const colEnd = rowCells.findIndex((d) => isSameDay(d, end));
      endLine = colEnd * 2 + 2;
    }

    bands.push({ row, startLine, endLine });
  }
  return bands;
}

/** Figma's Date-range node (562-6424) shows two independently-navigable month panels
 * sharing one popover shell and one Reset/Apply footer. Each panel keeps its own
 * viewDate so either side can be paged without moving the other — the two default to
 * consecutive months on open, matching the reference screenshot (Jan-2029 / Feb-2029). */
function Panel({
  viewDate,
  onNavigate,
  range,
  today,
  onSelectDay,
}: {
  viewDate: Date;
  onNavigate: (delta: number) => void;
  range: DateRange;
  today: Date;
  onSelectDay: (date: Date) => void;
}) {
  const cells = buildCalendarGrid(viewDate);
  const bands = range.start && range.end ? getRowBands(cells, range.start, range.end) : [];
  return (
    <div className="ds-date-picker__range-panel">
      <div className="ds-date-picker__header">
        <div className="ds-date-picker__nav">
          <IconButton
            icon="keyboard_double_arrow_left"
            label="Previous year"
            size="md"
            variant="primary"
            appearance="ghost"
            onClick={() => onNavigate(-12)}
          />
          <IconButton
            icon="chevron_left"
            label="Previous month"
            size="md"
            variant="primary"
            appearance="ghost"
            onClick={() => onNavigate(-1)}
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
            onClick={() => onNavigate(1)}
          />
          <IconButton
            icon="keyboard_double_arrow_right"
            label="Next year"
            size="md"
            variant="primary"
            appearance="ghost"
            onClick={() => onNavigate(12)}
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

      <div className="ds-date-picker__grid ds-date-picker__grid--range">
        {bands.map((band) => (
          <div
            key={`band-${band.row}`}
            className="ds-date-picker__range-band"
            style={{
              gridColumn: `${band.startLine} / ${band.endLine}`,
              gridRow: band.row + 1,
            }}
            aria-hidden="true"
          />
        ))}
        {cells.map((date, index) => {
          const inMonth = date.getMonth() === viewDate.getMonth();
          const isStart = range.start ? isSameDay(date, range.start) : false;
          const isEnd = range.end ? isSameDay(date, range.end) : false;
          const isSelected = isStart || isEnd;
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
              onClick={() => onSelectDay(date)}
              style={{
                gridColumn: `${(index % 7) * 2 + 1} / span 2`,
                gridRow: Math.floor(index / 7) + 1,
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DateRangePicker({
  value,
  defaultValue = { start: null, end: null },
  onChange,
  size = 'lg',
  className,
}: DateRangePickerProps) {
  const isControlled = value !== undefined;
  const [internalRange, setInternalRange] = useState<DateRange>(defaultValue);
  const range = isControlled ? value : internalRange;
  const [isOpen, setIsOpen] = useState(false);
  const [leftViewDate, setLeftViewDate] = useState(() => startOfMonth(range.start ?? new Date()));
  const [rightViewDate, setRightViewDate] = useState(() => addMonths(leftViewDate, 1));
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const startLabelRef = useRef<HTMLSpanElement>(null);
  const endLabelRef = useRef<HTMLSpanElement>(null);
  const panelPosition = useAnchoredPanelPosition(rootRef, isOpen);

  // Mirrors selectDay's own branching below: once a start is picked but no end yet, the
  // next click sets the end; otherwise (nothing picked, or both already picked and about
  // to restart) the next click sets the start. The arrow points at whichever is next.
  const activeField: 'start' | 'end' = range.start && !range.end ? 'end' : 'start';
  const arrowCenter = useAnchoredArrowOffset(
    rootRef,
    activeField === 'start' ? startLabelRef : endLabelRef,
    isOpen,
  );
  const arrowOffset = Math.max(0, arrowCenter - ARROW_HALF_WIDTH);

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
    const base = startOfMonth(range.start ?? new Date());
    setLeftViewDate(base);
    setRightViewDate(addMonths(base, 1));
    setIsOpen(true);
  };

  const closePanel = () => setIsOpen(false);

  const commit = (next: DateRange) => {
    if (!isControlled) setInternalRange(next);
    onChange?.(next);
  };

  const selectDay = (date: Date) => {
    if (!range.start || (range.start && range.end)) {
      commit({ start: date, end: null });
    } else if (date < range.start) {
      commit({ start: date, end: range.start });
    } else {
      commit({ start: range.start, end: date });
    }
  };

  const today = new Date();

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
        <span className={`ds-date-picker__value${range.start ? '' : ' ds-date-picker__value--placeholder'}`}>
          <span ref={startLabelRef}>{range.start ? formatDate(range.start) : 'Start Date'}</span>
          {' — '}
          <span ref={endLabelRef}>{range.end ? formatDate(range.end) : 'End Date'}</span>
        </span>
        <CalendarIcon className="ds-date-picker__icon" />
      </button>

      {isOpen &&
        createPortal(
          <div className="ds-date-picker__popover--range" style={panelPosition} ref={panelRef}>
            {/* Points at whichever of Start Date/End Date (above) is next to be picked —
                see activeField and useAnchoredArrowOffset. */}
            <div
              className="ds-date-picker__arrow"
              style={{ marginInlineStart: `${arrowOffset}px` }}
              aria-hidden="true"
            />
            <div className="ds-date-picker__panel ds-date-picker__panel--range">
              <div className="ds-date-picker__range-panels">
                <Panel
                  viewDate={leftViewDate}
                  onNavigate={(delta) => setLeftViewDate((d) => addMonths(d, delta))}
                  range={range}
                  today={today}
                  onSelectDay={selectDay}
                />
                <Panel
                  viewDate={rightViewDate}
                  onNavigate={(delta) => setRightViewDate((d) => addMonths(d, delta))}
                  range={range}
                  today={today}
                  onSelectDay={selectDay}
                />
              </div>

              <div className="ds-date-picker__footer">
                <Button
                  variant="primary"
                  appearance="ghost"
                  size="sm"
                  onClick={() => commit({ start: null, end: null })}
                >
                  Reset
                </Button>
                <Button variant="primary" appearance="solid" size="sm" onClick={closePanel}>
                  Apply
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
