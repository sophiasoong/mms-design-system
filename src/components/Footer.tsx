import Button, { type ButtonSize } from './Button';
import './Footer.css';

export type FooterSize = 'lg' | 'sm';
export type FooterStyle = 'divider' | 'shadow';

export interface FooterProps {
  size?: FooterSize;
  style?: FooterStyle;
  showLeading?: boolean;
  leadingLabel?: string;
  leadingIcon?: string;
  secondaryLabel?: string;
  primaryLabel?: string;
  showSecondary?: boolean;
  onLeadingClick?: () => void;
  onSecondaryClick?: () => void;
  onPrimaryClick?: () => void;
  className?: string;
}

export default function Footer({
  size = 'lg',
  style = 'divider',
  showLeading = true,
  leadingLabel = 'Back',
  leadingIcon = 'chevron_left',
  secondaryLabel = 'Confirm',
  primaryLabel = 'Confirm',
  showSecondary = true,
  onLeadingClick,
  onSecondaryClick,
  onPrimaryClick,
  className,
}: FooterProps) {
  const isLg = size === 'lg';
  const buttonSize: ButtonSize = isLg ? 'md' : 'sm';

  const classes = ['ds-footer', `ds-footer--${size}`, `ds-footer--${style}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {showLeading && (
        <Button
          variant="primary"
          appearance="ghost"
          size={buttonSize}
          leadingIcon={leadingIcon || undefined}
          onClick={onLeadingClick}
        >
          {leadingLabel}
        </Button>
      )}
      <div className="ds-footer__trailing">
        {isLg && showSecondary && (
          <Button variant="primary" appearance="outline" size={buttonSize} onClick={onSecondaryClick}>
            {secondaryLabel}
          </Button>
        )}
        <Button variant="primary" appearance="solid" size={buttonSize} onClick={onPrimaryClick}>
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}
