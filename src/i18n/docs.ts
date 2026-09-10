import type { Locale } from '../locale';

/* ---- Doc-page heading copy, per locale ----
   Every component page shares the same section skeleton (Overview → Anatomy → Variants →
   States → Layout & Spacing → Related Components) and a handful of sub-headings, so the
   headings are translated once here, keyed by their English text, instead of per page.
   The same table drives the right-hand AnchorNav, whose labels mirror the section titles.

   Register follows the sidebar glossary (data/components.ts): 組件 for "component", 圖示
   for "icon" (matching 圖示按鈕). Page titles are not listed — DocTitle reads the
   component's own nameZh from data/components.ts so the h1 and the sidebar always agree. */

const HEADINGS_ZH: Record<string, string> = {
  // h2 section titles
  Overview: '概述',
  Anatomy: '結構',
  Variants: '變體',
  States: '狀態',
  'Layout & Spacing': '佈局與間距',
  'Related Components': '相關組件',
  // h3 sub-titles and variant-group labels (the small "Style" / "Size" / "Example"
  // captions above each variant tab strip or group, VariantLabel in DocHeading.tsx)
  Example: '範例',
  Style: '樣式',
  Size: '尺寸',
  Thumbnail: '縮圖',
  'Image item': '圖片項目',
  Illustration: '插圖',
  Icon: '圖示',
  'With label': '附帶標籤',
  Width: '寬度',
  Shape: '形狀',
  Indeterminate: '半選',
  Position: '位置',
  Level: '層級',
  'Field Type': '欄位類型',
  Dropzone: '拖放區域',
  'Column Layout': '分欄佈局',
};

/** The heading for `locale`; unknown English text falls back to itself so an untranslated
 * heading degrades to English rather than disappearing. */
export function docHeading(en: string, locale: Locale): string {
  if (locale === 'en') return en;
  return HEADINGS_ZH[en] ?? en;
}

/* Line-tab item labels (the .ds-line-tab strips under a variant caption), keyed by the
   English label each page renders — TabLabel in DocHeading.tsx wraps every tab's text. The
   labels double as the pages' tab-state values, which is why the table is keyed by display
   text rather than by an id. Component names reuse data/components.ts's nameZh; size codes
   Sm/Md/Lg/Xl become 小/中/大/特大; pixel labels (12px…) are left as-is. Casing variants
   ("Card Tab" / "Card tab") are listed separately since the key is the exact text. */
const TAB_LABELS_ZH: Record<string, string> = {
  // Intent / appearance
  Primary: '主要',
  Secondary: '次要',
  Danger: '危險',
  Solid: '實心',
  Outline: '描邊',
  Ghost: '幽靈',
  Info: '資訊',
  Success: '成功',
  Warning: '警告',
  Feedback: '反饋',
  Default: '預設',
  Highlighted: '高亮',
  Compact: '精簡',
  Confirm: '確認',
  Destructive: '破壞性',
  Loading: '載入中',
  Read: '已讀',
  Readonly: '唯讀',
  Checked: '已勾選',
  Unchecked: '未勾選',
  Empty: '空狀態',
  // Sizes
  Sm: '小',
  Md: '中',
  Lg: '大',
  Xl: '特大',
  'Square (sm)': '方形（小）',
  'Square (lg)': '方形（大）',
  'Circular (sm)': '圓形（小）',
  'Modal table (Sm)': '彈窗表格（小）',
  'Page table (Md)': '頁面表格（中）',
  '1-col': '1 欄',
  '2-col': '2 欄',
  '3-col': '3 欄',
  '4-col': '4 欄',
  // Colors (Badge)
  Blue: '藍色',
  Gray: '灰色',
  Green: '綠色',
  Orange: '橘色',
  Red: '紅色',
  Dot: '圓點',
  Label: '標籤',
  // Positions (Tooltip)
  Top: '上方',
  'Top Left': '左上',
  'Top Right': '右上',
  Bottom: '下方',
  'Bottom Left': '左下',
  'Bottom Right': '右下',
  Horizontal: '水平',
  Vertical: '垂直',
  // Component names as tab labels (match data/components.ts nameZh)
  Button: '按鈕',
  Table: '表格',
  Form: '表單',
  Modal: '彈窗',
  Dialog: '對話框',
  Textarea: '文本域',
  Select: '選擇器',
  Input: '輸入框',
  Toggle: '開關',
  Radio: '單選框',
  Datepicker: '日期選擇框',
  'Date Picker': '日期選擇框',
  Upload: '上傳',
  Message: '訊息',
  Step: '步驟條',
  Breadcrumb: '麵包屑',
  Dropdown: '下拉選單',
  Chip: '膠囊標籤',
  Tab: '標籤頁',
  'Search bar': '搜索欄',
  'Action panel': '操作面板',
  Notification: '通知',
  // Chips
  'Action chip': '操作膠囊標籤',
  'Filter chip': '篩選膠囊標籤',
  'Filter-chip': '篩選膠囊標籤',
  'Input chip': '輸入膠囊標籤',
  'Input-chip': '輸入膠囊標籤',
  'Chip (in-line)': '膠囊標籤（單行）',
  'Chip (wrap)': '膠囊標籤（換行）',
  // Tabs
  'Card Tab': '卡片標籤頭',
  'Card tab': '卡片標籤頭',
  'Line Tab': '線型標籤頭',
  'Line tab': '線型標籤頭',
  'Chip Tab': '膠囊標籤頭',
  'Chip tab': '膠囊標籤頭',
  'Segment Tab': '分段標籤頭',
  'Segment tab': '分段標籤頭',
  'Sub-tab': '子標籤頭',
  // Selection
  'Single-select': '單選',
  'Multi-select': '多選',
  Cascader: '級聯選擇',
  Expander: '展開器',
  Trigger: '觸發器',
  // Checkbox / Radio
  'Checkbox card': '多選框卡片',
  'Checkbox cell': '多選框儲存格',
  'Checkbox field': '多選框欄位',
  'Checkbox label': '多選框標籤',
  'Radio card': '單選框卡片',
  'Radio label': '單選框標籤',
  // Datepicker
  'Single Date': '單一日期',
  'Date Range': '日期範圍',
  'Date and Time': '日期與時間',
  'Date-picker field': '日期選擇欄位',
  'Day Cell': '日期儲存格',
  // Form / page compositions
  'Form header': '表單頁首',
  'Form page': '表單頁',
  'Form-list': '表單列表',
  'Sub-form': '子表單',
  Section: '區塊',
  'Overview page': '總覽頁',
  'Audit Record': '稽核紀錄',
  'Crop Image': '裁切圖片',
  'Image Grid': '圖片網格',
  'Image grid': '圖片網格',
  'Image (single)': '圖片（單張）',
  'Image (multiple)': '圖片（多張）',
  Video: '影片',
  Grid: '網格',
  Number: '數字',
  'Number Input': '數字輸入框',
  Password: '密碼',
  'Textarea-field': '文本域欄位',
  'Text editor toolbar': '文字編輯器工具列',
  'Show expanded': '顯示展開',
  'Show collapsed': '顯示收合',
  // Table
  Header: '表頭',
  'Table header': '表頭',
  Cell: '儲存格',
  // Search / list
  Search: '搜索',
  'Global search': '全域搜索',
  'Table search': '表格搜索',
  'Scope Selector': '範圍選擇器',
  'Search history': '搜索歷史',
  'Search results': '搜索結果',
  'Uploaded files': '已上傳檔案',
  // Navigation
  'Main menu': '主選單',
  'Flyout menu': '彈出選單',
  'Menu toggle': '選單切換',
  'Notification panel': '通知面板',
  'Message center': '訊息中心',
  'Back-link': '返回連結',
  Trail: '路徵',
  Divider: '分隔線',
  Shadow: '陰影',
  // Action panel / indicator / misc
  'Info only': '僅資訊',
  'Buttons only': '僅按鈕',
  Combo: '組合',
  'Progress Bar': '進度條',
  'Progress Ring': '進度環',
  'Chat function': '聊天功能',
};

/** A line-tab label for `locale`: tab table first, then the heading table (Style, Dropzone,
 * Thumbnail… appear as both), then the English text itself. */
export function tabLabel(en: string, locale: Locale): string {
  if (locale === 'en') return en;
  return TAB_LABELS_ZH[en] ?? HEADINGS_ZH[en] ?? en;
}
