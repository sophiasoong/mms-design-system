export interface ComponentEntry {
  id: string;
  name: string;
  icon: string;
}

// `icon` is a Material Symbols Rounded glyph name rendered as ligature text. 'button',
// 'icon-button', 'dropdown', 'chip', 'input', 'textarea', 'select', 'checkbox', 'radio',
// 'datepicker', 'tab', 'tag', and 'badge' are exceptions: Sidebar.tsx and each Related
// Component card render them as bespoke SVGs (ButtonIcon / IconButtonIcon / DropdownIcon /
// ChipIcon / InputIcon / TextareaIcon / SelectIcon / CheckboxIcon / RadioIcon /
// DatepickerIcon / TabIcon / TagIcon / BadgeIcon in ./components/icons) instead, since no
// Material Symbol matches their Figma-specified marks — the icon values below go unused
// for those ids and are kept only as a readable fallback label.
export const COMPONENTS: ComponentEntry[] = [
  { id: 'button', name: 'Button', icon: 'smart_button' },
  { id: 'icon-button', name: 'Icon Button', icon: 'add_circle' },
  { id: 'dropdown', name: 'Dropdown', icon: 'list_alt' },
  { id: 'chip', name: 'Chip', icon: 'medication' },
  { id: 'input', name: 'Input', icon: 'text_fields' },
  { id: 'textarea', name: 'Textarea', icon: 'notes' },
  { id: 'select', name: 'Select', icon: 'expand_circle_down' },
  { id: 'checkbox', name: 'Checkbox', icon: 'check_box' },
  { id: 'radio', name: 'Radio', icon: 'radio_button_checked' },
  { id: 'datepicker', name: 'Datepicker', icon: 'calendar_month' },
  { id: 'tab', name: 'Tab', icon: 'tab' },
  { id: 'tag', name: 'Tag', icon: 'sell' },
  { id: 'badge', name: 'Badge', icon: 'fiber_manual_record' },
];
