import { useRef, useState } from 'react';
import Button from './Button';
import IconButton from './IconButton';
import { Hint } from './Hint';
import './Banner.css';

export type BannerState = 'primary' | 'info' | 'warning' | 'danger';
export type BannerLayout = 'single-line' | 'multi-line';

export interface BannerProps {
  state?: BannerState;
  layout?: BannerLayout;
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

export default function Banner({
  state = 'primary',
  layout = 'single-line',
  title = 'Title',
  description = 'This is a description.',
  showTitle = true,
  showButton = true,
  showClose = true,
  buttonLabel = 'Label',
  onButtonClick,
  onClose,
  className,
}: BannerProps) {
  const [showHint, setShowHint] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  const handleDescMouseEnter = () => {
    const el = descRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowHint(true);
    }
  };
  const handleDescMouseLeave = () => setShowHint(false);

  const classes = ['ds-banner', `ds-banner--${state}`, `ds-banner--${layout}`, className]
    .filter(Boolean)
    .join(' ');

  // Every state uses the same "info" glyph except danger, which uses "warning" —
  // matches the Figma reference (node 203:4808), where only the Error variant swaps marks.
  const iconGlyph = state === 'danger' ? 'warning' : 'info';

  const button = showButton && (
    <Button
      variant="primary"
      appearance="ghost"
      size="sm"
      onClick={onButtonClick}
      className="ds-banner__button"
    >
      {buttonLabel}
    </Button>
  );

  return (
    <div className={classes}>
      <span className="ds-banner__icon">
        <span className="icon" aria-hidden="true">
          {iconGlyph}
        </span>
      </span>
      {layout === 'multi-line' ? (
        <div className="ds-banner__content">
          {showTitle && title && <p className="ds-banner__title">{title}</p>}
          <p className="ds-banner__desc">{description}</p>
          {button}
        </div>
      ) : (
        <>
          <span
            className="ds-banner__desc-wrap"
            onMouseEnter={handleDescMouseEnter}
            onMouseLeave={handleDescMouseLeave}
          >
            <p className="ds-banner__desc" ref={descRef}>
              {description}
            </p>
            {showHint && (
              <span className="ds-banner__hint">
                <Hint>{description}</Hint>
              </span>
            )}
          </span>
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
          className="ds-banner__close"
        />
      )}
    </div>
  );
}
