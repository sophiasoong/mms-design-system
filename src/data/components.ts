export interface ComponentCategory {
  id: string;
  label: string;
}

// Order here is the sidebar's group order — General first (the most-reached-for
// primitives), then roughly input → structure → display → feedback, matching how a
// merchant builds a screen: pick an action/label, add inputs, lay out navigation,
// display data, then handle feedback states.
export const CATEGORIES: ComponentCategory[] = [
  { id: 'general', label: 'General' },
  { id: 'data-entry', label: 'Data Entry' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'data-display', label: 'Data Display' },
  { id: 'feedback', label: 'Feedback' },
];

export interface ComponentEntry {
  id: string;
  name: string;
  icon: string;
  category: string;
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
//
// `category` groups items under a CATEGORIES entry above for the sidebar (Sidebar.tsx) —
// it's presentation-only grouping, unrelated to routing (App.tsx keys off `id` alone).
export const COMPONENTS: ComponentEntry[] = [
  { id: 'button', name: 'Button', icon: 'smart_button', category: 'general' },
  { id: 'icon-button', name: 'Icon Button', icon: 'add_circle', category: 'general' },
  { id: 'badge', name: 'Badge', icon: 'fiber_manual_record', category: 'general' },
  { id: 'tag', name: 'Tag', icon: 'sell', category: 'general' },
  { id: 'chip', name: 'Chip', icon: 'medication', category: 'general' },
  { id: 'input', name: 'Input', icon: 'text_fields', category: 'data-entry' },
  { id: 'searchbar', name: 'Searchbar', icon: 'search', category: 'data-entry' },
  { id: 'textarea', name: 'Textarea', icon: 'notes', category: 'data-entry' },
  { id: 'select', name: 'Select', icon: 'expand_circle_down', category: 'data-entry' },
  { id: 'dropdown', name: 'Dropdown', icon: 'list_alt', category: 'data-entry' },
  { id: 'checkbox', name: 'Checkbox', icon: 'check_box', category: 'data-entry' },
  { id: 'radio', name: 'Radio', icon: 'radio_button_checked', category: 'data-entry' },
  { id: 'toggle', name: 'Toggle', icon: 'toggle_on', category: 'data-entry' },
  { id: 'datepicker', name: 'Datepicker', icon: 'calendar_month', category: 'data-entry' },
  { id: 'upload', name: 'Upload', icon: 'cloud_upload', category: 'data-entry' },
  { id: 'form', name: 'Form', icon: 'description', category: 'data-entry' },
  { id: 'header', name: 'Header', icon: 'view_agenda', category: 'navigation' },
  { id: 'footer', name: 'Footer', icon: 'dock_to_bottom', category: 'navigation' },
  { id: 'topbar', name: 'Topbar', icon: 'view_headline', category: 'navigation' },
  { id: 'sidebar', name: 'Sidebar', icon: 'side_navigation', category: 'navigation' },
  { id: 'tab', name: 'Tab', icon: 'tab', category: 'navigation' },
  { id: 'pagination', name: 'Pagination', icon: 'more_horiz', category: 'navigation' },
  { id: 'anchor', name: 'Anchor', icon: 'link', category: 'navigation' },
  { id: 'breadcrumb', name: 'Breadcrumb', icon: 'chevron_right', category: 'navigation' },
  { id: 'action-panel', name: 'Action Panel', icon: 'view_sidebar', category: 'navigation' },
  { id: 'table', name: 'Table', icon: 'table_chart', category: 'data-display' },
  { id: 'card', name: 'Card', icon: 'credit_card', category: 'data-display' },
  { id: 'list', name: 'List', icon: 'list', category: 'data-display' },
  { id: 'step', name: 'Step', icon: 'timeline', category: 'data-display' },
  { id: 'assets', name: 'Assets', icon: 'perm_media', category: 'data-display' },
  { id: 'hint', name: 'Hint', icon: 'help', category: 'feedback' },
  { id: 'tooltip', name: 'Tooltip', icon: 'chat_bubble', category: 'feedback' },
  { id: 'indicator', name: 'Indicator', icon: 'progress_activity', category: 'feedback' },
  { id: 'message', name: 'Message', icon: 'notifications', category: 'feedback' },
  { id: 'banner', name: 'Banner', icon: 'campaign', category: 'feedback' },
  { id: 'toast', name: 'Toast', icon: 'notifications', category: 'feedback' },
  { id: 'dialog', name: 'Dialog', icon: 'chat_bubble', category: 'feedback' },
  { id: 'modal', name: 'Modal', icon: 'web_asset', category: 'feedback' },
  { id: 'lightbox', name: 'Lightbox', icon: 'photo_library', category: 'feedback' },
];
