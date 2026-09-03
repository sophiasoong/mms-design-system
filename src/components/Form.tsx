import { useState } from 'react';
import type { ReactNode } from 'react';
import IconButton from './IconButton';
import { Tooltip } from './Tooltip';
import './Form.css';

export interface FormProps {
  /** Figma's "Title & Info" heading text. */
  title?: string;
  showHeader?: boolean;
  showInfo?: boolean;
  infoLabel?: string;
  onInfoClick?: () => void;
  /** Content for a Tooltip that appears above the header's info icon on hover/focus —
   * opt-in, only rendered when both `showInfo` and this are set (same additive-prop
   * convention as TableHeaderCell's `infoTooltip` / ActionPanelField's `required`). */
  infoTooltip?: ReactNode;
  /** Which side of the header `infoTooltip` renders on. Defaults to `'top'` (existing
   * behavior for all current consumers); `'bottom'` is opt-in. */
  infoTooltipPosition?: 'top' | 'bottom';
  /** Figma's "Tag & Caption" slot, rendered beside the title. */
  tag?: ReactNode;
  /** Whether the header's chevron can collapse the Main slot. */
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  /** Figma's "Main" slot — the form's fields (FormRow/FormCol/FormField), and
   * optionally a trailing Table. */
  children?: ReactNode;
  className?: string;
}

export default function Form({
  title = 'General Information',
  showHeader = true,
  showInfo = true,
  infoLabel,
  onInfoClick,
  infoTooltip,
  infoTooltipPosition = 'top',
  tag,
  collapsible = true,
  defaultCollapsed = false,
  children,
  className,
}: FormProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const classes = ['ds-form', className].filter(Boolean).join(' ');
  const infoButton = (
    <IconButton
      icon="info"
      variant="pending"
      appearance="ghost"
      size="sm"
      label={infoLabel ?? `About ${title}`}
      onClick={onInfoClick}
    />
  );

  return (
    <div className={classes}>
      {showHeader && (
        <div className="ds-form__header">
          <div className="ds-form__header-content">
            <span className="ds-form__title">{title}</span>
            {showInfo && infoTooltip && (
              <span className="ds-form__info-anchor" tabIndex={0}>
                {infoButton}
                <span
                  className={[
                    'ds-form__info-tooltip',
                    infoTooltipPosition === 'bottom' && 'ds-form__info-tooltip--bottom',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <Tooltip size="sm" position={infoTooltipPosition}>
                    {infoTooltip}
                  </Tooltip>
                </span>
              </span>
            )}
            {showInfo && !infoTooltip && infoButton}
            {tag && <div className="ds-form__tag">{tag}</div>}
          </div>
          {collapsible && (
            <IconButton
              icon={collapsed ? 'expand_more' : 'expand_less'}
              variant="neutral"
              appearance="ghost"
              size="sm"
              className="ds-icon-button--icon-scale-lg"
              label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
              aria-expanded={!collapsed}
              onClick={() => setCollapsed((c) => !c)}
            />
          )}
        </div>
      )}
      {children && (
        <div
          className={['ds-form__main', collapsed && 'ds-form__main--collapsed']
            .filter(Boolean)
            .join(' ')}
          aria-hidden={collapsed || undefined}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/** Figma's "Form-col" — a row of equal-width columns, each stacking labeled fields. */
export function FormRow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={['ds-form-row', className].filter(Boolean).join(' ')}>{children}</div>;
}

/** One column within a FormRow (Figma's "Col-1".."Col-4") — a vertical stack of fields. */
export function FormCol({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={['ds-form-col', className].filter(Boolean).join(' ')}>{children}</div>;
}

export interface FormFieldProps {
  label: string;
  required?: boolean;
  info?: boolean;
  className?: string;
  children: ReactNode;
}

/** A labeled field row (Figma's "Input-field" / "Select-field" / "Toggle-field" / etc.)
 * — a small label, optionally marked required or paired with an info glyph, above
 * arbitrary field content (Input, Select, Toggle, Radio, DateRangePicker, Textarea...). */
export function FormField({ label, required, info, className, children }: FormFieldProps) {
  return (
    <div className={['ds-form-field', className].filter(Boolean).join(' ')}>
      <span className="ds-form-field__label">
        {label}
        {required && (
          <span className="ds-form-field__required" aria-hidden="true">
            *
          </span>
        )}
        {info && (
          <span className="icon icon--sm ds-form-field__info" aria-hidden="true">
            info
          </span>
        )}
      </span>
      {children}
    </div>
  );
}
