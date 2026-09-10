import type { Locale } from '../locale';

export interface ComponentCategory {
  id: string;
  label: string;
  /** Traditional Chinese label; see the glossary note above COMPONENTS. */
  labelZh: string;
}

// Order here is the sidebar's group order — General first (the most-reached-for
// primitives), then roughly input → structure → display → feedback, matching how a
// merchant builds a screen: pick an action/label, add inputs, lay out navigation,
// display data, then handle feedback states.
export const CATEGORIES: ComponentCategory[] = [
  { id: 'general', label: 'General', labelZh: '通用' },
  { id: 'data-entry', label: 'Data Entry', labelZh: '數據錄入' },
  { id: 'navigation', label: 'Navigation', labelZh: '導航' },
  { id: 'data-display', label: 'Data Display', labelZh: '數據展示' },
  { id: 'feedback', label: 'Feedback', labelZh: '反饋' },
];

export interface ComponentEntry {
  id: string;
  name: string;
  /** Traditional Chinese name; see the glossary note below. */
  nameZh: string;
  icon: string;
  category: string;
}

// `icon` is a Material Symbols Rounded glyph name rendered as ligature text. 'button',
// 'icon-button', 'dropdown', 'chip', 'input', 'textarea', 'select', 'checkbox', 'radio',
// 'datepicker', 'tab', 'tag', 'badge', 'toggle', 'table', 'hint', 'tooltip', 'indicator',
// 'searchbar', 'step', 'header', 'sidebar', 'action-panel', 'anchor', 'breadcrumb', and
// 'message', 'list', 'dialog', 'banner', 'toast', 'card', 'lightbox', 'upload', 'modal',
// 'form', and 'assets' are exceptions: Sidebar.tsx and each Related Components card render
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
//
// `nameZh` glossary: Ant Design's Chinese component overview
// (https://ant.design/components/overview-cn) is the source, converted Simplified → Traditional
// character for character (按钮 → 按鈕, 步骤条 → 步驟條). Components Ant Design has no direct
// entry for take the nearest Ant term or a plain descriptive one: Search bar ← Input.Search
// 搜索; Textarea ← Input.TextArea 文本域; Toggle ← Switch 开关; Step ← Steps 步骤条; Indicator ←
// Progress 进度条; Message 訊息 (ours is a notification-list row); Dialog ← Modal 对话框; Modal
// 彈窗 (the larger task surface); Banner 橫幅; Header/Footer 頁首/頁尾; Topbar 頂欄; Sidebar ←
// Sider 侧边栏; Action panel 操作面板; Assets 資源; Hint 提示; Lightbox 燈箱.
//
// Five names were set by decision 2026-09-09 in place of the Ant-derived term: Icon button
// 圖示按鈕 (not 圖標按鈕), Badge 標章 (not 徽標), Chip 膠囊標籤, Dropdown 下拉選單 (not Ant's
// 下拉菜單), Toast 浮動訊息 (not Ant Message's 全局提示).
export const COMPONENTS: ComponentEntry[] = [
  { id: 'button', name: 'Button', nameZh: '按鈕', icon: 'smart_button', category: 'general' },
  { id: 'icon-button', name: 'Icon button', nameZh: '圖示按鈕', icon: 'add_circle', category: 'general' },
  { id: 'badge', name: 'Badge', nameZh: '標章', icon: 'fiber_manual_record', category: 'general' },
  { id: 'tag', name: 'Tag', nameZh: '標籤', icon: 'sell', category: 'general' },
  { id: 'chip', name: 'Chip', nameZh: '膠囊標籤', icon: 'medication', category: 'general' },
  { id: 'input', name: 'Input', nameZh: '輸入框', icon: 'text_fields', category: 'data-entry' },
  { id: 'searchbar', name: 'Search bar', nameZh: '搜索欄', icon: 'search', category: 'data-entry' },
  { id: 'textarea', name: 'Textarea', nameZh: '文本域', icon: 'notes', category: 'data-entry' },
  { id: 'select', name: 'Select', nameZh: '選擇器', icon: 'expand_circle_down', category: 'data-entry' },
  { id: 'dropdown', name: 'Dropdown', nameZh: '下拉選單', icon: 'list_alt', category: 'data-entry' },
  { id: 'checkbox', name: 'Checkbox', nameZh: '多選框', icon: 'check_box', category: 'data-entry' },
  { id: 'radio', name: 'Radio', nameZh: '單選框', icon: 'radio_button_checked', category: 'data-entry' },
  { id: 'toggle', name: 'Toggle', nameZh: '開關', icon: 'toggle_on', category: 'data-entry' },
  { id: 'datepicker', name: 'Datepicker', nameZh: '日期選擇框', icon: 'calendar_month', category: 'data-entry' },
  { id: 'upload', name: 'Upload', nameZh: '上傳', icon: 'cloud_upload', category: 'data-entry' },
  { id: 'form', name: 'Form', nameZh: '表單', icon: 'description', category: 'data-entry' },
  { id: 'header', name: 'Header', nameZh: '頁首', icon: 'view_agenda', category: 'navigation' },
  { id: 'footer', name: 'Footer', nameZh: '頁尾', icon: 'dock_to_bottom', category: 'navigation' },
  { id: 'topbar', name: 'Topbar', nameZh: '頂欄', icon: 'view_headline', category: 'navigation' },
  { id: 'sidebar', name: 'Sidebar', nameZh: '側邊欄', icon: 'side_navigation', category: 'navigation' },
  { id: 'tab', name: 'Tab', nameZh: '標籤頁', icon: 'tab', category: 'navigation' },
  { id: 'pagination', name: 'Pagination', nameZh: '分頁', icon: 'more_horiz', category: 'navigation' },
  { id: 'anchor', name: 'Anchor', nameZh: '錨點', icon: 'link', category: 'navigation' },
  { id: 'breadcrumb', name: 'Breadcrumb', nameZh: '麵包屑', icon: 'chevron_right', category: 'navigation' },
  { id: 'action-panel', name: 'Action panel', nameZh: '操作面板', icon: 'view_sidebar', category: 'navigation' },
  { id: 'table', name: 'Table', nameZh: '表格', icon: 'table_chart', category: 'data-display' },
  { id: 'card', name: 'Card', nameZh: '卡片', icon: 'credit_card', category: 'data-display' },
  { id: 'list', name: 'List', nameZh: '列表', icon: 'list', category: 'data-display' },
  { id: 'step', name: 'Step', nameZh: '步驟條', icon: 'timeline', category: 'data-display' },
  { id: 'assets', name: 'Assets', nameZh: '資源', icon: 'perm_media', category: 'data-display' },
  { id: 'hint', name: 'Hint', nameZh: '提示', icon: 'help', category: 'feedback' },
  { id: 'tooltip', name: 'Tooltip', nameZh: '文字提示', icon: 'chat_bubble', category: 'feedback' },
  { id: 'indicator', name: 'Indicator', nameZh: '進度條', icon: 'progress_activity', category: 'feedback' },
  { id: 'message', name: 'Message', nameZh: '訊息', icon: 'notifications', category: 'feedback' },
  { id: 'banner', name: 'Banner', nameZh: '橫幅', icon: 'campaign', category: 'feedback' },
  { id: 'toast', name: 'Toast', nameZh: '浮動訊息', icon: 'notifications', category: 'feedback' },
  { id: 'dialog', name: 'Dialog', nameZh: '對話框', icon: 'chat_bubble', category: 'feedback' },
  { id: 'modal', name: 'Modal', nameZh: '彈窗', icon: 'web_asset', category: 'feedback' },
  { id: 'lightbox', name: 'Lightbox', nameZh: '燈箱', icon: 'photo_library', category: 'feedback' },
];

export function componentName(component: ComponentEntry, locale: Locale): string {
  return locale === 'zh' ? component.nameZh : component.name;
}

export function categoryLabel(category: ComponentCategory, locale: Locale): string {
  return locale === 'zh' ? category.labelZh : category.label;
}
