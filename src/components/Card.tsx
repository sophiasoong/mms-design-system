import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { Tag } from './Tag';
import List from './List';
import { DatePicker } from './DatePicker';
import './Card.css';

export interface CardListItem {
  label: string;
  value: string;
  /** Renders a divider above this row — used to group rows into sub-totals. */
  dividerBefore?: boolean;
}

export interface CardDateField {
  label: string;
  placeholder?: string;
}

export interface CardProps {
  /** Renders a pill (reusing Tag's primary style) centered on the card's top edge, e.g. "Most Popular". */
  badge?: string;
  title?: ReactNode;
  priceLabel: string;
  price: string;
  priceUnit: string;
  /** Renders a labeled Datepicker trigger below the price block. */
  dateField?: CardDateField;
  /** Divider directly under the price block (and date field, if present). Defaults to true. */
  showDivider?: boolean;
  items: CardListItem[];
  /** Typically a full-width primary Button. */
  footer?: ReactNode;
  /** Adds the elevated shadow ring used for the featured/recommended plan. */
  highlighted?: boolean;
  className?: string;
}

export function Card({
  badge,
  title,
  priceLabel,
  price,
  priceUnit,
  dateField,
  showDivider = true,
  items,
  footer,
  highlighted = false,
  className,
}: CardProps) {
  const classes = ['ds-card', highlighted ? 'ds-card--highlighted' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {badge && <Tag color="primary" label={badge} className="ds-card__badge" />}
      <div className="ds-card__body">
        <div className="ds-card__header">
          {title && <p className="ds-card__title">{title}</p>}
          <div className="ds-card__price">
            <p className="ds-card__price-label">{priceLabel}</p>
            <p className="ds-card__price-value">{price}</p>
            <p className="ds-card__price-unit">{priceUnit}</p>
          </div>
          {dateField && (
            <div className="ds-card__field">
              <p className="ds-card__field-label">{dateField.label}</p>
              <DatePicker size="lg" placeholder={dateField.placeholder ?? 'Select a month'} />
            </div>
          )}
          {showDivider && <div className="ds-card__divider" />}
          <div className="ds-card__list">
            {items.map((item) => (
              <Fragment key={item.label}>
                {item.dividerBefore && <div className="ds-card__divider" />}
                <List
                  size="md"
                  icon="check_circle"
                  label={item.label}
                  value={item.value}
                  showFilterChip={false}
                  showValue
                  className="ds-card__list-row"
                />
              </Fragment>
            ))}
          </div>
        </div>
        {footer && <div className="ds-card__footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Card;
