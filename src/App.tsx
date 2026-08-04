import { useEffect, useState } from 'react';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import AnchorNav from './components/AnchorNav';
import ButtonDoc from './components/ButtonDoc';
import IconButtonDoc from './components/IconButtonDoc';
import DropdownDoc from './components/DropdownDoc';
import ChipDoc from './components/ChipDoc';
import InputDoc from './components/InputDoc';
import SearchbarDoc from './components/SearchbarDoc';
import TextareaDoc from './components/TextareaDoc';
import SelectDoc from './components/SelectDoc';
import CheckboxDoc from './components/CheckboxDoc';
import RadioDoc from './components/RadioDoc';
import DatePickerDoc from './components/DatePickerDoc';
import TabDoc from './components/TabDoc';
import TagDoc from './components/TagDoc';
import BadgeDoc from './components/BadgeDoc';
import ToggleDoc from './components/ToggleDoc';
import TableDoc from './components/TableDoc';
import HintDoc from './components/HintDoc';
import TooltipDoc from './components/TooltipDoc';
import IndicatorDoc from './components/IndicatorDoc';
import { getStoredBrandMode, applyBrandMode, type BrandMode } from './brandMode';
import { BUTTON_SECTIONS } from './data/buttonSections';
import { ICON_BUTTON_SECTIONS } from './data/iconButtonSections';
import { DROPDOWN_SECTIONS } from './data/dropdownSections';
import { CHIP_SECTIONS } from './data/chipSections';
import { INPUT_SECTIONS } from './data/inputSections';
import { SEARCHBAR_SECTIONS } from './data/searchbarSections';
import { TEXTAREA_SECTIONS } from './data/textareaSections';
import { SELECT_SECTIONS } from './data/selectSections';
import { CHECKBOX_SECTIONS } from './data/checkboxSections';
import { RADIO_SECTIONS } from './data/radioSections';
import { DATE_PICKER_SECTIONS } from './data/datePickerSections';
import { TAB_SECTIONS } from './data/tabSections';
import { TAG_SECTIONS } from './data/tagSections';
import { BADGE_SECTIONS } from './data/badgeSections';
import { TOGGLE_SECTIONS } from './data/toggleSections';
import { TABLE_SECTIONS } from './data/tableSections';
import { HINT_SECTIONS } from './data/hintSections';
import { TOOLTIP_SECTIONS } from './data/tooltipSections';
import { INDICATOR_SECTIONS } from './data/indicatorSections';
import type { AnchorSection } from './components/AnchorNav';
import './App.css';

const SECTIONS_BY_COMPONENT: Record<string, AnchorSection[]> = {
  button: BUTTON_SECTIONS,
  'icon-button': ICON_BUTTON_SECTIONS,
  dropdown: DROPDOWN_SECTIONS,
  chip: CHIP_SECTIONS,
  input: INPUT_SECTIONS,
  searchbar: SEARCHBAR_SECTIONS,
  textarea: TEXTAREA_SECTIONS,
  select: SELECT_SECTIONS,
  checkbox: CHECKBOX_SECTIONS,
  radio: RADIO_SECTIONS,
  datepicker: DATE_PICKER_SECTIONS,
  tab: TAB_SECTIONS,
  tag: TAG_SECTIONS,
  badge: BADGE_SECTIONS,
  toggle: TOGGLE_SECTIONS,
  table: TABLE_SECTIONS,
  hint: HINT_SECTIONS,
  tooltip: TOOLTIP_SECTIONS,
  indicator: INDICATOR_SECTIONS,
};

function App() {
  const [mode, setMode] = useState<BrandMode>(getStoredBrandMode());
  const [activeComponentId, setActiveComponentId] = useState('button');

  useEffect(() => {
    applyBrandMode(mode);
  }, [mode]);

  const toggleMode = () => setMode((prev) => (prev === 'mms' ? 'mma' : 'mms'));

  return (
    <div className="ds-app">
      <Topbar mode={mode} onToggleMode={toggleMode} />
      <div className="ds-app__body">
        <Sidebar activeComponentId={activeComponentId} onSelectComponent={setActiveComponentId} />
        <main className="ds-main">
          {activeComponentId === 'button' ? (
            <ButtonDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'icon-button' ? (
            <IconButtonDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'dropdown' ? (
            <DropdownDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'chip' ? (
            <ChipDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'input' ? (
            <InputDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'searchbar' ? (
            <SearchbarDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'textarea' ? (
            <TextareaDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'select' ? (
            <SelectDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'checkbox' ? (
            <CheckboxDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'radio' ? (
            <RadioDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'datepicker' ? (
            <DatePickerDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'tab' ? (
            <TabDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'tag' ? (
            <TagDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'badge' ? (
            <BadgeDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'toggle' ? (
            <ToggleDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'table' ? (
            <TableDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'hint' ? (
            <HintDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'tooltip' ? (
            <TooltipDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'indicator' ? (
            <IndicatorDoc onNavigate={setActiveComponentId} />
          ) : (
            <div className="ds-main__empty">Select a component to view its documentation.</div>
          )}
        </main>
        <AnchorNav sections={SECTIONS_BY_COMPONENT[activeComponentId] ?? []} />
      </div>
    </div>
  );
}

export default App;
