export interface ComponentEntry {
  id: string;
  name: string;
  icon: string;
}

// `icon` is a Material Symbols Rounded glyph name rendered as ligature text. 'button'
// and 'chip' are exceptions: Sidebar.tsx and each Related Component card render them
// as bespoke SVGs (ButtonIcon / ChipIcon in ./components/icons) instead, since no
// Material Symbol matches their Figma-specified marks — the icon values below go unused
// for those two ids and are kept only as a readable fallback label.
export const COMPONENTS: ComponentEntry[] = [
  { id: 'button', name: 'Button', icon: 'smart_button' },
  { id: 'icon-button', name: 'Icon Button', icon: 'add_circle' },
  { id: 'dropdown', name: 'Dropdown', icon: 'list_alt' },
  { id: 'chip', name: 'Chip', icon: 'medication' },
  { id: 'select', name: 'Select', icon: 'expand_circle_down' },
];
