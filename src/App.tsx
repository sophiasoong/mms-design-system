import { useEffect, useState } from 'react';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import AnchorNav from './components/AnchorNav';
import ButtonDoc from './components/ButtonDoc';
import IconButtonDoc from './components/IconButtonDoc';
import DropdownDoc from './components/DropdownDoc';
import ChipDoc from './components/ChipDoc';
import { getStoredBrandMode, applyBrandMode, type BrandMode } from './brandMode';
import { BUTTON_SECTIONS } from './data/buttonSections';
import { ICON_BUTTON_SECTIONS } from './data/iconButtonSections';
import { DROPDOWN_SECTIONS } from './data/dropdownSections';
import { CHIP_SECTIONS } from './data/chipSections';
import type { AnchorSection } from './components/AnchorNav';
import './App.css';

const SECTIONS_BY_COMPONENT: Record<string, AnchorSection[]> = {
  button: BUTTON_SECTIONS,
  'icon-button': ICON_BUTTON_SECTIONS,
  dropdown: DROPDOWN_SECTIONS,
  chip: CHIP_SECTIONS,
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
