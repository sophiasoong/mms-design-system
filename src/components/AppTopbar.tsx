import Button from './Button';
import IconButton from './IconButton';
import { Badge } from './Badge';
import { Searchbar, type SearchbarState } from './Searchbar';
import './AppTopbar.css';

export interface AppTopbarProps {
  storeName?: string;
  userName?: string;
  language?: string;
  notificationCount?: number;
  showBackButton?: boolean;
  showLogo?: boolean;
  sidebarExpanded?: boolean;
  /** Forces the built-in Searchbar's visual state — e.g. 'focus' while a caller-driven
      results panel anchored to this Topbar is open, so the field reads as active instead
      of resetting to 'default' the instant the browser's own focus moves to the panel. */
  searchState?: SearchbarState;
  onMenuClick?: () => void;
  onStoreClick?: () => void;
  onSearch?: (value: string) => void;
  onBackClick?: () => void;
  onFaqClick?: () => void;
  onNotificationClick?: () => void;
  onLanguageClick?: () => void;
  onUserClick?: () => void;
  className?: string;
}

export default function AppTopbar({
  storeName = 'Store Name',
  userName = 'User Name',
  language = 'English',
  notificationCount = 99,
  showBackButton = true,
  showLogo = false,
  sidebarExpanded = true,
  searchState,
  onMenuClick,
  onStoreClick,
  onSearch,
  onBackClick,
  onFaqClick,
  onNotificationClick,
  onLanguageClick,
  onUserClick,
  className,
}: AppTopbarProps) {
  const classes = ['ds-app-topbar', className].filter(Boolean).join(' ');
  const notificationLabel = notificationCount > 99 ? '99+' : String(notificationCount);
  // A caller driving searchState to 'focus' (an active search) also means the search field
  // should take over the bar — the Store menu on its left and the Back/FAQ/notification
  // trio on its right step aside so it can flex-grow into the space they leave behind,
  // rather than these two staying coupled to separate props of their own.
  const searchExpanded = searchState === 'focus';

  return (
    <header className={classes}>
      {showLogo && (
        <img
          className="ds-app-topbar__logo"
          src={sidebarExpanded ? '/assets/logo_mms_default.png' : '/assets/logo_mms_collapsed.png'}
          alt="Merchant Management System"
        />
      )}
      <div className="ds-app-topbar__leading">
        <IconButton
          icon="menu"
          variant="primary"
          appearance="outline"
          size="md"
          label="Toggle menu"
          onClick={onMenuClick}
        />
        {!searchExpanded && (
          <button type="button" className="ds-app-topbar__store-trigger" onClick={onStoreClick}>
            <Badge color="green" />
            <span>{storeName}</span>
            <span className="icon" aria-hidden="true">
              expand_more
            </span>
          </button>
        )}
      </div>

      <div className="ds-app-topbar__search">
        <Searchbar size="lg" placeholder="Search" state={searchState} onSearch={onSearch} />
      </div>

      <div className="ds-app-topbar__trailing">
        {!searchExpanded && (
          <>
            {showBackButton && (
              <Button variant="secondary" appearance="solid" size="sm" onClick={onBackClick}>
                Back to MMS 1.0
              </Button>
            )}
            <IconButton
              icon="help"
              variant="neutral"
              appearance="ghost"
              shape="round"
              size="md"
              label="FAQ"
              className="ds-app-topbar__faq"
              onClick={onFaqClick}
            />
            <span className="ds-app-topbar__notification-wrap">
              <IconButton
                icon="notifications"
                variant="neutral"
                appearance="ghost"
                shape="round"
                size="md"
                label="Notifications"
                onClick={onNotificationClick}
              />
              {notificationCount > 0 && (
                <span className="ds-app-topbar__notification-badge">{notificationLabel}</span>
              )}
            </span>
          </>
        )}
        <span className="ds-app-topbar__divider" aria-hidden="true" />
        <button type="button" className="ds-app-topbar__menu-trigger" onClick={onLanguageClick}>
          <span>{language}</span>
          <span className="icon" aria-hidden="true">
            expand_more
          </span>
        </button>
        <button
          type="button"
          className="ds-app-topbar__menu-trigger ds-app-topbar__user-trigger"
          onClick={onUserClick}
        >
          <span className="ds-app-topbar__avatar" aria-hidden="true">
            <span className="icon" aria-hidden="true">
              account_circle
            </span>
          </span>
          <span>{userName}</span>
          <span className="icon" aria-hidden="true">
            expand_more
          </span>
        </button>
      </div>
    </header>
  );
}
