import type { BrandMode } from '../brandMode';
import type { Locale } from '../locale';
import './Topbar.css';

interface TopbarProps {
  mode: BrandMode;
  onToggleMode: () => void;
  locale: Locale;
  onToggleLocale: () => void;
}

export default function Topbar({ mode, onToggleMode, locale, onToggleLocale }: TopbarProps) {
  return (
    <header className="ds-topbar">
      <div className="ds-topbar__left">
        <div className="ds-topbar__brand">
          <span className="icon ds-topbar__brand-icon" aria-hidden="true">
            palette
          </span>
          <span className="ds-topbar__brand-name">
            {mode === 'mma' ? 'MMA Design System' : 'MMS Design System'}
          </span>
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
        aria-label={`Switch to ${locale === 'en' ? 'Chinese' : 'English'}`}
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
