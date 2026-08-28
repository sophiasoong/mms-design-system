import type { ReactNode } from 'react';
import Header from './Header';
import Footer, { type FooterProps } from './Footer';
import './Modal.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends Pick<
  FooterProps,
  | 'showLeading'
  | 'leadingLabel'
  | 'leadingIcon'
  | 'secondaryLabel'
  | 'primaryLabel'
  | 'showSecondary'
  | 'onLeadingClick'
  | 'onSecondaryClick'
  | 'onPrimaryClick'
> {
  size?: ModalSize;
  title?: string;
  showInfo?: boolean;
  onInfoClick?: () => void;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
}

export default function Modal({
  size = 'md',
  title = 'Title',
  showInfo = false,
  onInfoClick,
  onClose,
  children,
  className,
  ...footerProps
}: ModalProps) {
  const classes = ['ds-modal', `ds-modal--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <Header
        style="modal"
        title={title}
        showInfo={showInfo}
        onInfoClick={onInfoClick}
        onExpanderClick={onClose}
      />
      <div className="ds-modal__body">{children}</div>
      <Footer size="lg" style="divider" {...footerProps} />
    </div>
  );
}
