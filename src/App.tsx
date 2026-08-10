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
import StepDoc from './components/StepDoc';
import HeaderDoc from './components/HeaderDoc';
import FooterDoc from './components/FooterDoc';
import PaginationDoc from './components/PaginationDoc';
import TopbarDoc from './components/TopbarDoc';
import SidebarDoc from './components/SidebarDoc';
import ActionPanelDoc from './components/ActionPanelDoc';
import AnchorDoc from './components/AnchorDoc';
import BreadcrumbDoc from './components/BreadcrumbDoc';
import MessageDoc from './components/MessageDoc';
import ListDoc from './components/ListDoc';
import DialogDoc from './components/DialogDoc';
import BannerDoc from './components/BannerDoc';
import ToastDoc from './components/ToastDoc';
import CardDoc from './components/CardDoc';
import LightboxDoc from './components/LightboxDoc';
import UploadDoc from './components/UploadDoc';
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
import { STEP_SECTIONS } from './data/stepSections';
import { HEADER_SECTIONS } from './data/headerSections';
import { FOOTER_SECTIONS } from './data/footerSections';
import { PAGINATION_SECTIONS } from './data/paginationSections';
import { TOPBAR_SECTIONS } from './data/topbarSections';
import { SIDEBAR_SECTIONS } from './data/sidebarSections';
import { ACTION_PANEL_SECTIONS } from './data/actionPanelSections';
import { ANCHOR_SECTIONS } from './data/anchorSections';
import { BREADCRUMB_SECTIONS } from './data/breadcrumbSections';
import { MESSAGE_SECTIONS } from './data/messageSections';
import { LIST_SECTIONS } from './data/listSections';
import { DIALOG_SECTIONS } from './data/dialogSections';
import { BANNER_SECTIONS } from './data/bannerSections';
import { TOAST_SECTIONS } from './data/toastSections';
import { CARD_SECTIONS } from './data/cardSections';
import { LIGHTBOX_SECTIONS } from './data/lightboxSections';
import { UPLOAD_SECTIONS } from './data/uploadSections';
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
  step: STEP_SECTIONS,
  header: HEADER_SECTIONS,
  footer: FOOTER_SECTIONS,
  pagination: PAGINATION_SECTIONS,
  topbar: TOPBAR_SECTIONS,
  sidebar: SIDEBAR_SECTIONS,
  'action-panel': ACTION_PANEL_SECTIONS,
  anchor: ANCHOR_SECTIONS,
  breadcrumb: BREADCRUMB_SECTIONS,
  message: MESSAGE_SECTIONS,
  list: LIST_SECTIONS,
  dialog: DIALOG_SECTIONS,
  banner: BANNER_SECTIONS,
  toast: TOAST_SECTIONS,
  card: CARD_SECTIONS,
  lightbox: LIGHTBOX_SECTIONS,
  upload: UPLOAD_SECTIONS,
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
          ) : activeComponentId === 'step' ? (
            <StepDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'header' ? (
            <HeaderDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'footer' ? (
            <FooterDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'pagination' ? (
            <PaginationDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'topbar' ? (
            <TopbarDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'sidebar' ? (
            <SidebarDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'action-panel' ? (
            <ActionPanelDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'anchor' ? (
            <AnchorDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'breadcrumb' ? (
            <BreadcrumbDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'message' ? (
            <MessageDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'list' ? (
            <ListDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'dialog' ? (
            <DialogDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'banner' ? (
            <BannerDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'toast' ? (
            <ToastDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'card' ? (
            <CardDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'lightbox' ? (
            <LightboxDoc onNavigate={setActiveComponentId} />
          ) : activeComponentId === 'upload' ? (
            <UploadDoc onNavigate={setActiveComponentId} />
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
