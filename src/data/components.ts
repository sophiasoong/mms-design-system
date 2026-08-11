export interface ComponentEntry {
  id: string;
  name: string;
  icon: string;
}

// `icon` is a Material Symbols Rounded glyph name rendered as ligature text. 'button',
// 'icon-button', 'dropdown', 'chip', 'input', 'textarea', 'select', 'checkbox', 'radio',
// 'datepicker', 'tab', 'tag', 'badge', 'toggle', 'table', 'hint', 'tooltip', 'indicator',
// 'searchbar', 'step', 'header', 'sidebar', 'action-panel', 'anchor', 'breadcrumb', and
// 'message', 'list', 'dialog', 'banner', 'toast', 'card', 'lightbox', 'upload', 'modal',
// 'form', and 'assets' are exceptions: Sidebar.tsx and each Related Component card render
// them as bespoke SVGs (ButtonIcon / IconButtonIcon / DropdownIcon / ChipIcon / InputIcon /
// TextareaIcon / SelectIcon / CheckboxIcon / RadioIcon / DatepickerIcon / TabIcon / TagIcon /
// BadgeIcon / ToggleIcon / TableIcon / HintIcon / TooltipIcon / IndicatorIcon / SearchbarIcon /
// StepIcon / HeaderIcon / FooterIcon / PaginationIcon / TopbarIcon / SidebarIcon /
// ActionPanelIcon / AnchorIcon / BreadcrumbIcon / MessageIcon / ListIcon / DialogIcon /
// BannerIcon / ToastIcon / CardIcon / LightboxIcon / UploadIcon / ModalIcon / FormIcon /
// AssetsIcon in ./components/icons) instead, since no Material Symbol matches their
// Figma-specified marks — the icon values below go unused for those ids and are kept only
// as a readable fallback label.
export const COMPONENTS: ComponentEntry[] = [
  { id: 'button', name: 'Button', icon: 'smart_button' },
  { id: 'icon-button', name: 'Icon Button', icon: 'add_circle' },
  { id: 'dropdown', name: 'Dropdown', icon: 'list_alt' },
  { id: 'chip', name: 'Chip', icon: 'medication' },
  { id: 'input', name: 'Input', icon: 'text_fields' },
  { id: 'searchbar', name: 'Searchbar', icon: 'search' },
  { id: 'textarea', name: 'Textarea', icon: 'notes' },
  { id: 'select', name: 'Select', icon: 'expand_circle_down' },
  { id: 'checkbox', name: 'Checkbox', icon: 'check_box' },
  { id: 'radio', name: 'Radio', icon: 'radio_button_checked' },
  { id: 'datepicker', name: 'Datepicker', icon: 'calendar_month' },
  { id: 'tab', name: 'Tab', icon: 'tab' },
  { id: 'tag', name: 'Tag', icon: 'sell' },
  { id: 'badge', name: 'Badge', icon: 'fiber_manual_record' },
  { id: 'toggle', name: 'Toggle', icon: 'toggle_on' },
  { id: 'table', name: 'Table', icon: 'table_chart' },
  { id: 'hint', name: 'Hint', icon: 'help' },
  { id: 'tooltip', name: 'Tooltip', icon: 'chat_bubble' },
  { id: 'indicator', name: 'Indicator', icon: 'progress_activity' },
  { id: 'step', name: 'Step', icon: 'timeline' },
  { id: 'header', name: 'Header', icon: 'view_agenda' },
  { id: 'footer', name: 'Footer', icon: 'dock_to_bottom' },
  { id: 'pagination', name: 'Pagination', icon: 'more_horiz' },
  { id: 'topbar', name: 'Topbar', icon: 'view_headline' },
  { id: 'sidebar', name: 'Sidebar', icon: 'side_navigation' },
  { id: 'action-panel', name: 'Action Panel', icon: 'view_sidebar' },
  { id: 'anchor', name: 'Anchor', icon: 'link' },
  { id: 'breadcrumb', name: 'Breadcrumb', icon: 'chevron_right' },
  { id: 'message', name: 'Message', icon: 'notifications' },
  { id: 'list', name: 'List', icon: 'list' },
  { id: 'dialog', name: 'Dialog', icon: 'chat_bubble' },
  { id: 'banner', name: 'Banner', icon: 'campaign' },
  { id: 'toast', name: 'Toast', icon: 'notifications' },
  { id: 'card', name: 'Card', icon: 'credit_card' },
  { id: 'lightbox', name: 'Lightbox', icon: 'photo_library' },
  { id: 'upload', name: 'Upload', icon: 'cloud_upload' },
  { id: 'modal', name: 'Modal', icon: 'web_asset' },
  { id: 'form', name: 'Form', icon: 'description' },
  { id: 'assets', name: 'Assets', icon: 'perm_media' },
];
