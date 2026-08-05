import Button from './Button';
import IconButton from './IconButton';
import { Toggle } from './Toggle';
import { Tag } from './Tag';
import './Header.css';

export type HeaderStyle = 'modal' | 'form' | 'sub-form' | 'section' | 'form-list';

export interface HeaderProps {
  style?: HeaderStyle;
  title?: string;
  description?: string;
  caption?: string;
  tagLabel?: string;
  buttonLabel?: string;
  showInfo?: boolean;
  showTag?: boolean;
  showCaption?: boolean;
  showDescription?: boolean;
  showButton?: boolean;
  showToggle?: boolean;
  toggleChecked?: boolean;
  showExpander?: boolean;
  showDrag?: boolean;
  showThumbnail?: boolean;
  showDelete?: boolean;
  onInfoClick?: () => void;
  onButtonClick?: () => void;
  onToggleChange?: (checked: boolean) => void;
  onExpanderClick?: () => void;
  onDeleteClick?: () => void;
  className?: string;
}

export default function Header({
  style = 'form',
  title = 'Title',
  description = 'Description',
  caption = '2026-08-01 00:00 - 2026-08-31 23:00 HKT (GMT+8)',
  tagLabel = 'Label',
  buttonLabel = 'Label',
  showInfo = true,
  showTag = false,
  showCaption = false,
  showDescription = false,
  showButton = false,
  showToggle = false,
  toggleChecked = true,
  showExpander = true,
  showDrag = true,
  showThumbnail = true,
  showDelete = true,
  onInfoClick,
  onButtonClick,
  onToggleChange,
  onExpanderClick,
  onDeleteClick,
  className,
}: HeaderProps) {
  const isModal = style === 'modal';
  const isForm = style === 'form';
  const isSubForm = style === 'sub-form';
  const isSection = style === 'section';
  const isFormList = style === 'form-list';

  const classes = ['ds-header', `ds-header--${style}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {isFormList && showDrag && (
        <span className="icon ds-header__drag" aria-hidden="true">
          drag_indicator
        </span>
      )}
      {isFormList && showThumbnail && (
        <span className="ds-header__thumbnail" aria-hidden="true">
          <span className="icon" aria-hidden="true">
            image
          </span>
        </span>
      )}

      {isSection ? (
        <span className="ds-header__title">{title}</span>
      ) : (
        <div className="ds-header__content">
          <div className="ds-header__title-row">
            <span className="ds-header__title">{title}</span>
            {showInfo && (
              <IconButton
                icon="info"
                variant="secondary"
                appearance="ghost"
                size="sm"
                label="More information"
                onClick={onInfoClick}
              />
            )}
            {(isForm || isFormList) && showTag && <Tag label={tagLabel} color="blue" />}
            {(isForm || isFormList) && showCaption && (
              <span className="ds-header__caption">{caption}</span>
            )}
          </div>
          {(isModal || isForm || isSubForm) && showDescription && (
            <p className="ds-header__description">{description}</p>
          )}
        </div>
      )}

      {(isForm || isSubForm || isSection) && showButton && (
        <Button
          variant="primary"
          appearance={isSection ? 'ghost' : 'outline'}
          size="md"
          onClick={onButtonClick}
        >
          {buttonLabel}
        </Button>
      )}

      {(isForm || isSubForm) && showToggle && (
        <Toggle label="Yes" checked={toggleChecked} onChange={onToggleChange} />
      )}

      {isFormList && showDelete && (
        <IconButton
          icon="delete"
          variant="neutral"
          appearance="ghost"
          size="sm"
          label="Delete"
          onClick={onDeleteClick}
        />
      )}

      {!isSection && showExpander && (
        <IconButton
          icon={isModal ? 'close' : 'keyboard_arrow_down'}
          variant={isModal ? 'primary' : 'neutral'}
          appearance="ghost"
          size="sm"
          label={isModal ? 'Close' : 'Toggle section'}
          onClick={onExpanderClick}
        />
      )}
    </div>
  );
}
