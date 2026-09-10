import type { BrandMode } from '../brandMode';
import type { Locale } from '../locale';
import { getStrings } from '../i18n/strings';
import './Topbar.css';

interface TopbarProps {
  mode: BrandMode;
  onToggleMode: () => void;
  locale: Locale;
  onToggleLocale: () => void;
}

export default function Topbar({ mode, onToggleMode, locale, onToggleLocale }: TopbarProps) {
  // Topbar already receives the locale as a prop, so it reads the strings directly instead
  // of subscribing through useStrings like the Sidebar does.
  const strings = getStrings(locale).topbar;
  return (
    <header className="ds-topbar">
      <div className="ds-topbar__left">
        <div className="ds-topbar__brand">
          <img className="ds-topbar__brand-icon" src="/assets/logo-mark.svg" alt="" aria-hidden="true" />
          <span className="ds-topbar__brand-name">Shoalter Design System</span>
        </div>

        <button
          className="ds-topbar__mode-toggle"
          onClick={onToggleMode}
          aria-label={`Switch to ${mode === 'mms' ? 'MMA' : 'MMS'} mode`}
        >
          <span className={`ds-topbar__mode-option${mode === 'mms' ? ' ds-topbar__mode-option--active' : ''}`}>
            MMS
          </span>
          <span className={`ds-topbar__mode-option${mode === 'mma' ? ' ds-topbar__mode-option--active' : ''}`}>
            MMA
          </span>
        </button>
      </div>

      <button
        className="ds-topbar__mode-toggle"
        onClick={onToggleLocale}
        aria-label={locale === 'en' ? strings.switchToChinese : strings.switchToEnglish}
      >
        <span className={`ds-topbar__mode-option${locale === 'en' ? ' ds-topbar__mode-option--active' : ''}`}>
          EN
        </span>
        <span className={`ds-topbar__mode-option${locale === 'zh' ? ' ds-topbar__mode-option--active' : ''}`}>
          中
        </span>
      </button>
    </header>
  );
}
