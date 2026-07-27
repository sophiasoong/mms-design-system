import type { BrandMode } from '../brandMode';
import './Topbar.css';

interface TopbarProps {
  mode: BrandMode;
  onToggleMode: () => void;
}

export default function Topbar({ mode, onToggleMode }: TopbarProps) {
  return (
    <header className="ds-topbar">
      <div className="ds-topbar__brand">
        <span className="icon ds-topbar__brand-icon" aria-hidden="true">
          palette
        </span>
        <span className="ds-topbar__brand-name">MMS Design System</span>
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
    </header>
  );
}
