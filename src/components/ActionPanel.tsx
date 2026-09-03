import type { ReactNode } from 'react';
import IconButton from './IconButton';
import './ActionPanel.css';

export interface ActionPanelProps {
  title?: string;
  showInfo?: boolean;
  infoLabel?: string;
  onInfoClick?: () => void;
  /** Figma's "Main" slot — the panel's primary content block. */
  main?: ReactNode;
  /** Figma's "Main2" slot — a secondary content block, divided from Main by a rule
   * only when both slots are populated (matching the source component's own behavior). */
  main2?: ReactNode;
  className?: string;
}

export default function ActionPanel({
  title = 'Action',
  showInfo = true,
  infoLabel,
  onInfoClick,
  main,
  main2,
  className,
}: ActionPanelProps) {
  const classes = ['ds-action-panel', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="ds-action-panel__header">
        <span className="ds-action-panel__title">{title}</span>
        {showInfo && (
          <IconButton
            icon="info"
            variant="pending"
            appearance="ghost"
            size="sm"
            label={infoLabel ?? `About ${title}`}
            onClick={onInfoClick}
          />
        )}
      </div>
      {main && (
        <div className={`ds-action-panel__main${main2 ? ' ds-action-panel__main--divided' : ''}`}>
          {main}
        </div>
      )}
      {main2 && <div className="ds-action-panel__main2">{main2}</div>}
    </div>
  );
}

/** A "Section Title" row — the plain-text heading Figma places atop a Main/Main2
 * block's content (e.g. "Search History"). */
export function ActionPanelSectionTitle({ children }: { children: ReactNode }) {
  return <div className="ds-action-panel__section-title">{children}</div>;
}

export interface ActionPanelFieldProps {
  label: string;
  /** Appends a red required-marker asterisk after the label, same convention as
   * Form.tsx's FormField `required` prop (Figma's separate text/required/default
   * "*" span, rather than baking "*" into the label string itself). */
  required?: boolean;
  children: ReactNode;
}

/** A labeled field row (Figma's "Select-field" / "Readonly-field") — a small label
 * above arbitrary content (a Select, a Badge, or plain text via ActionPanelValue). */
export function ActionPanelField({ label, required, children }: ActionPanelFieldProps) {
  return (
    <div className="ds-action-panel__field">
      <span className="ds-action-panel__field-label">
        {label}
        {required && (
          <span className="ds-action-panel__field-required" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {children}
    </div>
  );
}

/** Plain-text value display for a read-only ActionPanelField (e.g. "H0888001"). */
export function ActionPanelValue({ children }: { children: ReactNode }) {
  return <div className="ds-action-panel__field-value">{children}</div>;
}
