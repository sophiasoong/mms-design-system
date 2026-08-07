import type { ReactNode } from 'react';
import { Tag } from './Tag';
import IconButton from './IconButton';
import './List.css';

export type ListSize = 'lg' | 'md' | 'sm';

export interface ListProps {
  size?: ListSize;
  /** Thumbnail icon (Lg) or leading icon (Md/Sm). Defaults to a search icon (Lg) or a history icon (Md/Sm). */
  icon?: ReactNode;
  /** Md/Sm only — hides the leading icon. */
  showLeadingIcon?: boolean;
  label?: string;
  /** Lg/Md only — a filter/category chip next to the label. */
  showFilterChip?: boolean;
  tag?: string;
  /** Lg only — a search-match subtitle line; wrap matched text in a <mark className="ds-list__mark"> to highlight it. */
  subtitle?: ReactNode;
  showSubtitle?: boolean;
  /** Lg only — a breadcrumb-style path underneath the subtitle. */
  caption?: string;
  showCaption?: boolean;
  /** Md/Sm only — a trailing value, e.g. a result count. */
  value?: string;
  showValue?: boolean;
  /** Sm only — trailing preview/remove icon buttons. */
  showIconButton?: boolean;
  showPreview?: boolean;
  showRemove?: boolean;
  onPreviewClick?: () => void;
  onRemoveClick?: () => void;
  /** Visually renders the hover state without needing real pointer interaction — used in the docs' States table. */
  forceState?: 'hover';
  className?: string;
}

export default function List({
  size = 'lg',
  icon,
  showLeadingIcon = true,
  label = 'Label',
  showFilterChip = true,
  tag = 'Label',
  subtitle,
  showSubtitle = true,
  caption = 'Online Store / Storefront / Setup',
  showCaption = true,
  value = '1,000',
  showValue = true,
  showIconButton = true,
  showPreview = true,
  showRemove = true,
  onPreviewClick,
  onRemoveClick,
  forceState,
  className,
}: ListProps) {
  const classes = [
    'ds-list',
    `ds-list--${size}`,
    forceState ? `ds-list--force-${forceState}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedIcon = icon ?? (size === 'lg' ? 'search' : 'history');

  if (size === 'lg') {
    return (
      <div className={classes}>
        <span className="ds-list__thumb" aria-hidden="true">
          {typeof resolvedIcon === 'string' ? (
            <span className="icon" aria-hidden="true">
              {resolvedIcon}
            </span>
          ) : (
            resolvedIcon
          )}
        </span>
        <div className="ds-list__main">
          <div className="ds-list__title-row">
            <p className="ds-list__title">{label}</p>
            {showFilterChip && <Tag label={tag} className="ds-list__tag" />}
          </div>
          {(showSubtitle || showCaption) && (
            <div className="ds-list__desc">
              {showSubtitle && <div className="ds-list__subtitle">{subtitle ?? 'Subtitle'}</div>}
              {showCaption && <span className="ds-list__caption">{caption}</span>}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={classes}>
      {showLeadingIcon && (
        <span className="ds-list__leading-icon" aria-hidden="true">
          {typeof resolvedIcon === 'string' ? (
            <span className="icon" aria-hidden="true">
              {resolvedIcon}
            </span>
          ) : (
            resolvedIcon
          )}
        </span>
      )}
      {size === 'md' && showFilterChip && <Tag label={tag} className="ds-list__tag" />}
      <p className="ds-list__label">{label}</p>
      {showValue && <span className="ds-list__value">{value}</span>}
      {size === 'sm' && showIconButton && (
        <div className="ds-list__actions">
          {showPreview && (
            <IconButton
              icon="visibility"
              label="Preview"
              variant="primary"
              appearance="ghost"
              size="sm"
              onClick={onPreviewClick}
            />
          )}
          {showRemove && (
            <IconButton
              icon="delete"
              label="Remove"
              variant="primary"
              appearance="ghost"
              size="sm"
              onClick={onRemoveClick}
            />
          )}
        </div>
      )}
    </div>
  );
}
