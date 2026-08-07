import Button from './Button';
import { Checkbox } from './Checkbox';
import { ProgressRing } from './Indicator';
import './Dialog.css';

/** Matches Figma's four sampled Buttons-slot configurations (node 194:2828): 'confirm'
 * (ghost + solid primary, the default), 'alert' (a single solid primary, Description
 * hidden), 'destructive' (ghost primary + solid danger), and 'loading' (a centered
 * Progress-ring in place of buttons). */
export type DialogLayout = 'confirm' | 'alert' | 'destructive' | 'loading';

export interface DialogProps {
  title?: string;
  description?: string;
  showDescription?: boolean;
  showCheckbox?: boolean;
  checkboxLabel?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  layout?: DialogLayout;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export default function Dialog({
  title = 'Remove the tier',
  description = "If you confirm to remove the tier, it can't be restored.",
  showDescription = true,
  showCheckbox = false,
  checkboxLabel = "Don't show this again",
  checked,
  onCheckedChange,
  layout = 'confirm',
  primaryLabel = 'Label',
  secondaryLabel = 'Label',
  onPrimaryClick,
  onSecondaryClick,
  className,
}: DialogProps) {
  const classes = ['ds-dialog', className].filter(Boolean).join(' ');
  const buttonsClasses = [
    'ds-dialog__buttons',
    layout === 'loading' ? 'ds-dialog__buttons--center' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="ds-dialog__content">
        <p className="ds-dialog__title">{title}</p>
        {showDescription && description && <p className="ds-dialog__desc">{description}</p>}
        {showCheckbox && (
          <Checkbox label={checkboxLabel} checked={checked} onChange={onCheckedChange} />
        )}
      </div>
      <div className={buttonsClasses}>
        {layout === 'loading' ? (
          <ProgressRing progress={0} indeterminate />
        ) : layout === 'alert' ? (
          <Button variant="primary" appearance="solid" size="md" onClick={onPrimaryClick}>
            {primaryLabel}
          </Button>
        ) : (
          <>
            <Button variant="primary" appearance="ghost" size="md" onClick={onSecondaryClick}>
              {secondaryLabel}
            </Button>
            <Button
              variant={layout === 'destructive' ? 'danger' : 'primary'}
              appearance="solid"
              size="md"
              onClick={onPrimaryClick}
            >
              {primaryLabel}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
