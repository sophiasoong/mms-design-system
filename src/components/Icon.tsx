import './Icon.css';
import {
  AddIcon,
  AssetUploadIcon,
  AttachmentIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DeleteIcon,
  DownloadIcon,
  DragIcon,
  EditIcon,
  ErrorIcon,
  FaqIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  InfoIcon,
  MenuIcon,
  MoreIcon,
  NotificationIcon,
  PreviewIcon,
  RotateLeftIcon,
  RotateRightIcon,
  SearchIcon,
  SuccessIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from './assetIcons';

const ICONS = {
  add: AddIcon,
  attachment: AttachmentIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  close: CloseIcon,
  delete: DeleteIcon,
  download: DownloadIcon,
  drag: DragIcon,
  edit: EditIcon,
  error: ErrorIcon,
  faq: FaqIcon,
  'flip-horizontal': FlipHorizontalIcon,
  'flip-vertical': FlipVerticalIcon,
  info: InfoIcon,
  menu: MenuIcon,
  more: MoreIcon,
  notification: NotificationIcon,
  preview: PreviewIcon,
  'rotate-left': RotateLeftIcon,
  'rotate-right': RotateRightIcon,
  search: SearchIcon,
  success: SuccessIcon,
  upload: AssetUploadIcon,
  'zoom-in': ZoomInIcon,
  'zoom-out': ZoomOutIcon,
} as const;

export type IconName = keyof typeof ICONS;
export type IconSize = 'xs' | 'sm' | 'md' | 'lg';

export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export interface IconProps {
  name: IconName;
  /** Maps to --component-icon-xs/sm/md/lg (12/16/24/36px). */
  size?: IconSize;
  className?: string;
}

export function Icon({ name, size = 'sm', className }: IconProps) {
  const Glyph = ICONS[name];
  const classes = ['ds-icon', `ds-icon--${size}`, className].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      <Glyph className="ds-icon__glyph" />
    </span>
  );
}
