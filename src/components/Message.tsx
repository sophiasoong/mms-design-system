import type { ReactNode } from 'react';
import Button from './Button';
import { Badge } from './Badge';
import { Tag } from './Tag';
import './Message.css';

export interface MessageProps {
  title?: string;
  description?: string;
  /** Material Symbol name, or a custom SVG icon element (e.g. from messageTypeIcons.tsx), rendered in the thumbnail. */
  icon?: ReactNode;
  tags?: string[];
  date?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
  showBadge?: boolean;
  /** Visually renders the hover state without needing real pointer interaction — used in the docs' States table. */
  forceState?: 'hover';
  className?: string;
}

export default function Message({
  title = 'Title',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Accumsan duis in facilisi rutru...',
  icon = 'settings',
  tags = ['label', 'label'],
  date = 'YYYY-MM-DD',
  buttonLabel = 'Label',
  onButtonClick,
  showButton = true,
  showBadge = true,
  forceState,
  className,
}: MessageProps) {
  const classes = [
    'ds-message',
    forceState ? `ds-message--force-${forceState}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span className="ds-message__thumb" aria-hidden="true">
        {typeof icon === 'string' ? (
          <span className="icon" aria-hidden="true">
            {icon}
          </span>
        ) : (
          icon
        )}
      </span>
      <div className="ds-message__body">
        <div className="ds-message__main">
          <div className="ds-message__content">
            <div className="ds-message__text">
              <p className="ds-message__title">{title}</p>
              {description && <p className="ds-message__desc">{description}</p>}
            </div>
            {showButton && (
              <Button variant="primary" appearance="solid" size="md" onClick={onButtonClick}>
                {buttonLabel}
              </Button>
            )}
          </div>
          {showBadge && <Badge size="lg" className="ds-message__badge" />}
        </div>

        {(tags.length > 0 || date) && (
          <div className="ds-message__meta">
            {tags.length > 0 && (
              <div className="ds-message__tags">
                {tags.map((tag, index) => (
                  <Tag key={index} label={tag} className="ds-message__tag" />
                ))}
              </div>
            )}
            {date && <span className="ds-message__date">{date}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
