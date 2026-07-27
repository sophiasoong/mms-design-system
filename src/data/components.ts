export interface ComponentEntry {
  id: string;
  name: string;
  icon: string;
}

export const COMPONENTS: ComponentEntry[] = [
  { id: 'button', name: 'Button', icon: 'smart_button' },
  { id: 'icon-button', name: 'Icon Button', icon: 'radio_button_unchecked' },
];
