import type { ReactNode } from 'react';
import { DeleteIcon, VisibilityIcon, PictureIcon, ProductIcon, PromotionIcon, PageIcon } from './assetIcons';
import {
  ApprovalIcon,
  PaymentIcon,
  AutoRenewIcon,
  ThreePLIcon,
  ChatIcon,
  ContractIcon,
  ProductInventoryIcon,
  OrderIcon,
  PermissionIcon,
  StorageIcon,
  SLAIcon,
  StoreIcon,
  MerchantIcon,
  TotesIcon,
  SystemIcon,
} from './messageTypeIcons';
import './Thumbnail.css';

export type ThumbnailVariant = 'grid' | 'search' | 'table' | 'message';
export type ThumbnailGridSize = 'md' | 'lg';
export type ThumbnailSearchStyle = 'page' | 'product' | 'promotion';
export type ThumbnailTableStyle = 'wireflow' | 'mockup';
export type ThumbnailMessageStyle =
  | 'approval'
  | 'payment'
  | 'auto-renew'
  | '3pl'
  | 'chat'
  | 'contract'
  | 'product-inventory'
  | 'order'
  | 'permission'
  | 'storage'
  | 'sla'
  | 'store'
  | 'merchant'
  | 'totes'
  | 'system';

const SEARCH_ICONS: Record<ThumbnailSearchStyle, ReactNode> = {
  page: <PageIcon />,
  product: <ProductIcon />,
  promotion: <PromotionIcon />,
};

// Same 15 category glyphs Message.tsx uses for its thumb — Figma's Thumbnail-message
// sub-component (node 673:27774) exports its own near-duplicate SVGs, but its background
// (brand/secondary/200), icon color (brand/primary/600), size (48px), and radius (radius/md)
// are an exact match to Message.css's `.ds-message__thumb`, so this variant reuses the
// already-traced messageTypeIcons.tsx set instead of re-tracing 15 near-identical icons.
const MESSAGE_ICONS: Record<ThumbnailMessageStyle, ReactNode> = {
  approval: <ApprovalIcon />,
  payment: <PaymentIcon />,
  'auto-renew': <AutoRenewIcon />,
  '3pl': <ThreePLIcon />,
  chat: <ChatIcon />,
  contract: <ContractIcon />,
  'product-inventory': <ProductInventoryIcon />,
  order: <OrderIcon />,
  permission: <PermissionIcon />,
  storage: <StorageIcon />,
  sla: <SLAIcon />,
  store: <StoreIcon />,
  merchant: <MerchantIcon />,
  totes: <TotesIcon />,
  system: <SystemIcon />,
};

export interface ThumbnailProps {
  variant?: ThumbnailVariant;
  /** grid only. */
  size?: ThumbnailGridSize;
  /** grid (both sizes) and table `mockup` content image. */
  image?: string;
  /** grid only — shows the dark preview/remove hover overlay. */
  showActions?: boolean;
  /** Visually renders the hover overlay without needing real pointer interaction. */
  forceHover?: boolean;
  onPreview?: () => void;
  onRemove?: () => void;
  /** search only. */
  searchStyle?: ThumbnailSearchStyle;
  /** table only. */
  tableStyle?: ThumbnailTableStyle;
  /** message only. */
  messageStyle?: ThumbnailMessageStyle;
  className?: string;
}

export function Thumbnail({
  variant = 'grid',
  size = 'md',
  image = '/assets/lightbox-lego-stack-cutout.png',
  showActions = true,
  forceHover = false,
  onPreview,
  onRemove,
  searchStyle = 'product',
  tableStyle = 'mockup',
  messageStyle = 'auto-renew',
  className,
}: ThumbnailProps) {
  const classes = [
    'ds-thumbnail',
    `ds-thumbnail--${variant}`,
    variant === 'grid' ? `ds-thumbnail--${size}` : '',
    variant === 'table' ? `ds-thumbnail--${tableStyle}` : '',
    forceHover ? 'ds-thumbnail--force-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'grid') {
    return (
      <div className={classes}>
        <img className="ds-thumbnail__image" src={image} alt="" />
        {showActions && (
          <div className="ds-thumbnail__overlay">
            <button
              type="button"
              className="ds-thumbnail__action"
              aria-label="Preview"
              onClick={onPreview}
            >
              <VisibilityIcon className="ds-thumbnail__action-icon" />
            </button>
            <button
              type="button"
              className="ds-thumbnail__action"
              aria-label="Remove"
              onClick={onRemove}
            >
              <DeleteIcon className="ds-thumbnail__action-icon ds-thumbnail__action-icon--delete" />
            </button>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'search') {
    return (
      <div className={classes}>
        <span className={`ds-thumbnail__glyph ds-thumbnail__glyph--${searchStyle}`}>
          {SEARCH_ICONS[searchStyle]}
        </span>
      </div>
    );
  }

  if (variant === 'table') {
    return tableStyle === 'mockup' ? (
      <div className={classes}>
        <img className="ds-thumbnail__image" src={image} alt="" />
      </div>
    ) : (
      <div className={classes}>
        <span className="ds-thumbnail__glyph">
          <PictureIcon />
        </span>
      </div>
    );
  }

  return (
    <div className={classes}>
      <span className="ds-thumbnail__glyph">{MESSAGE_ICONS[messageStyle]}</span>
    </div>
  );
}
