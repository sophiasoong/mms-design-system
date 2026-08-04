import './Indicator.css';

const RING_RADIUS = 16;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const INDETERMINATE_RING_ARC = 25;

const clampProgress = (progress: number) => Math.min(100, Math.max(0, progress));

export interface ProgressRingProps {
  progress: number;
  indeterminate?: boolean;
  className?: string;
}

export function ProgressRing({ progress, indeterminate = false, className }: ProgressRingProps) {
  const clamped = clampProgress(progress);
  const dashoffset = indeterminate
    ? RING_CIRCUMFERENCE * (1 - INDETERMINATE_RING_ARC / 100)
    : RING_CIRCUMFERENCE * (1 - clamped / 100);
  const classes = [
    'ds-progress-ring',
    indeterminate ? 'ds-progress-ring--indeterminate' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      className={classes}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : 100}
    >
      <circle className="ds-progress-ring__track" cx="24" cy="24" r={RING_RADIUS} />
      <circle
        className="ds-progress-ring__fill"
        cx="24"
        cy="24"
        r={RING_RADIUS}
        strokeDasharray={`${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`}
        strokeDashoffset={dashoffset}
      />
    </svg>
  );
}

export interface ProgressBarProps {
  progress: number;
  indeterminate?: boolean;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  indeterminate = false,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = clampProgress(progress);
  const classes = ['ds-progress-bar-group', className].filter(Boolean).join(' ');
  const barClasses = [
    'ds-progress-bar',
    indeterminate ? 'ds-progress-bar--indeterminate' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div
        className={barClasses}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : 100}
      >
        {indeterminate ? (
          <div className="ds-progress-bar__fill ds-progress-bar__fill--indeterminate" />
        ) : (
          <div className="ds-progress-bar__fill" style={{ width: `${clamped}%` }} />
        )}
      </div>
      {showLabel && !indeterminate && <span className="ds-progress-bar__label">{clamped}%</span>}
    </div>
  );
}
