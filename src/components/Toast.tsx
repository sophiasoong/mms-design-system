import Button from './Button';
import IconButton from './IconButton';
import './Toast.css';

export type ToastState = 'success' | 'info' | 'warning' | 'danger';
export type ToastLayout = 'single-line' | 'multi-line';

export interface ToastProps {
  state?: ToastState;
  layout?: ToastLayout;
  title?: string;
  description?: string;
  showTitle?: boolean;
  showButton?: boolean;
  showClose?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  onClose?: () => void;
  className?: string;
}

const ICON_BY_STATE: Record<ToastState, string> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  danger: 'cancel',
};

export default function Toast({
  state = 'success',
  layout = 'single-line',
  title = 'Title',
  description = 'Description',
  showTitle = true,
  showButton = true,
  showClose = true,
  buttonLabel = 'Button',
  onButtonClick,
  onClose,
  className,
}: ToastProps) {
  const classes = ['ds-toast', `ds-toast--${state}`, `ds-toast--${layout}`, className]
    .filter(Boolean)
    .join(' ');

  const button = showButton && (
    <Button
      variant="primary"
      appearance="ghost"
      size="sm"
      onClick={onButtonClick}
      className="ds-toast__button"
    >
      {buttonLabel}
    </Button>
  );

  return (
    <div className={classes}>
      <span className="ds-toast__icon">
        <span className="icon" aria-hidden="true">
          {ICON_BY_STATE[state]}
        </span>
      </span>
      {layout === 'multi-line' ? (
        <div className="ds-toast__content">
          {showTitle && title && <p className="ds-toast__title">{title}</p>}
          <p className="ds-toast__desc">{description}</p>
          {button}
        </div>
      ) : (
        <>
          <p className="ds-toast__desc">{description}</p>
          {button}
        </>
      )}
      {showClose && (
        <IconButton
          icon="close"
          variant="neutral"
          appearance="ghost"
          size="sm"
          shape="square"
          label="Dismiss"
          onClick={onClose}
          className="ds-toast__close"
        />
      )}
    </div>
  );
}
