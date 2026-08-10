import { useState } from 'react';
import Lightbox from './Lightbox';
import IconButton from './IconButton';
import { IconButtonIcon } from './icons';
import './ButtonDoc.css';
import './LightboxDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=730-26921';

const VARIANT_TABS = [
  'Preview image (multiple)',
  'Preview image (single)',
  'Preview video',
  'Fit image (width)',
  'Fit image (height)',
] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

interface LightboxDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function LightboxDoc({ onNavigate }: LightboxDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Preview image (multiple)');
  const goToPreviewImage = () => setActiveVariantTab('Preview image (multiple)');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Lightbox</h1>
        <p className="ds-doc__lede">
          A Lightbox is a full-screen overlay for viewing a single image or video from a set — it
          pairs the media with prev/next navigation, a position counter, and a bar of quick
          actions like download, flip, rotate, and zoom.
        </p>
        <a
          className="ds-doc__figma-link ds-button ds-button--secondary ds-button--solid ds-button--md"
          href={FIGMA_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span className="icon ds-button__icon" aria-hidden="true">
            draw
          </span>
          <span className="ds-button__label">View in Figma</span>
        </a>
      </header>

      {/* ---------------------------------------------------------------- */}
      <section id="overview" className="ds-section">
        <h2 className="ds-section__title">Overview</h2>
        <p className="ds-section__desc">
          The default Lightbox: a close control, previous/next navigation flanking the media, a
          counter, and an action bar of secondary controls.
        </p>
        <div className="ds-preview" style={{ padding: 0 }}>
          {/* flagged: no aspect-ratio token exists in tokens.json — 16:9 is kept as a
              raw value per the "flag instead of guessing" rule. */}
          <div style={{ width: '100%', aspectRatio: '16 / 9' }}>
            <Lightbox />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Seven parts: a close button, previous/next navigation, the media itself, an optional
          video-play overlay, a position counter, and an action bar.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-lightbox-anatomy">
            {/* flagged: no aspect-ratio token exists in tokens.json — 16:9 is kept as a
                raw value per the "flag instead of guessing" rule. Same fluid width:100%/
                aspect-ratio wrapper as the Overview and Variants demos, instead of a
                fixed-pixel box, so all three preview boxes share one sizing technique. */}
            <div style={{ width: '100%', aspectRatio: '16 / 9' }}>
              <div className="ds-lightbox ds-anatomy__demo" aria-hidden="true">
                <div className="ds-lightbox__header">
                  <span className="ds-anatomy__part-relative">
                    <IconButton
                      icon="close"
                      variant="primary"
                      appearance="outline"
                      shape="round"
                      size="lg"
                      label="Close"
                    />
                    <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
                  </span>
                </div>
                <div className="ds-lightbox__main">
                  <div className="ds-lightbox__nav ds-lightbox__nav--previous">
                    <span className="ds-anatomy__part-relative">
                      <IconButton
                        icon="chevron_left"
                        variant="primary"
                        appearance="outline"
                        shape="round"
                        size="lg"
                        label="Previous"
                      />
                      <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
                    </span>
                  </div>
                  <div className="ds-lightbox__media ds-anatomy__part-relative">
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">3</span>
                    <div className="ds-lightbox__placeholder">
                      <img
                        className="ds-lightbox__placeholder-photo"
                        src="/assets/lightbox-lego-stack-cutout.png"
                        alt=""
                      />
                    </div>
                    <button type="button" className="ds-lightbox__play" aria-label="Play video">
                      <span className="icon" aria-hidden="true">
                        play_circle
                      </span>
                    </button>
                    <span className="ds-anatomy__badge ds-lightbox-anatomy__badge-play">4</span>
                  </div>
                  <div className="ds-lightbox__nav ds-lightbox__nav--next">
                    <span className="ds-anatomy__part-relative">
                      <IconButton
                        icon="chevron_right"
                        variant="primary"
                        appearance="outline"
                        shape="round"
                        size="lg"
                        label="Next"
                      />
                      <span className="ds-anatomy__badge ds-anatomy__badge--side">5</span>
                    </span>
                  </div>
                </div>
                <div className="ds-lightbox__footer">
                  <span className="ds-anatomy__part-relative">
                    <p className="ds-lightbox__counter">2 / 9</p>
                    <span className="ds-anatomy__badge ds-anatomy__badge--side-left">6</span>
                  </span>
                  <span className="ds-anatomy__part-relative">
                    <div className="ds-lightbox__actions">
                      {['download', 'swap_vert', 'swap_horiz', 'rotate_left', 'rotate_right', 'zoom_out', 'zoom_in', 'more_vert'].map(
                        (glyph) => (
                          <button key={glyph} type="button" className="ds-lightbox__action">
                            <span className="icon" aria-hidden="true">
                              {glyph}
                            </span>
                          </button>
                        ),
                      )}
                    </div>
                    <span className="ds-anatomy__badge">7</span>
                  </span>
                </div>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Close</strong> — <span>dismisses the Lightbox; onClose={'{fn}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Previous</strong> —{' '}
                  <span>steps to the prior item; hide with showPrevious={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Media</strong> —{' '}
                  <span>the active image or video, passed via the media prop</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Video overlay</strong> —{' '}
                  <span>a play control shown only when showVideo={'{true}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Next</strong> —{' '}
                  <span>steps to the following item; hide with showNext={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">6</span>
                <span>
                  <strong>Counter</strong> —{' '}
                  <span>the "current / total" position label; hide with showCounter={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">7</span>
                <span>
                  <strong>Action bar</strong> —{' '}
                  <span>secondary controls; each icon toggles independently (showDownload, showFlip, showRotate, showZoom, showMore)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="variants" className="ds-section">
        <h2 className="ds-section__title">Variants</h2>
        <p className="ds-section__desc">
          The media type and the item's position in the set determine which controls appear —
          video drops the editing actions, and the edge items hide the navigation control that
          would go nowhere.
        </p>

        <div className="ds-line-tabs" role="tablist" aria-label="Lightbox variants">
          {VARIANT_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeVariantTab === tab}
              className={`ds-line-tab${activeVariantTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveVariantTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview" style={{ padding: 0 }}>
              {/* flagged: no aspect-ratio token exists in tokens.json — 16:9 is kept as a
                  raw value per the "flag instead of guessing" rule. */}
              <div style={{ width: '100%', aspectRatio: '16 / 9' }}>
                {activeVariantTab === 'Preview image (multiple)' && (
                  <Lightbox showPrevious={false} counterLabel="1 / 9" onNext={goToPreviewImage} />
                )}
                {activeVariantTab === 'Preview image (single)' && (
                  <Lightbox showPrevious={false} showNext={false} showCounter={false} />
                )}
                {activeVariantTab === 'Preview video' && (
                  <Lightbox
                    showVideo
                    showPrevious={false}
                    showNext={false}
                    showCounter={false}
                    showFlip={false}
                    showRotate={false}
                    showMore={false}
                  />
                )}
                {activeVariantTab === 'Fit image (width)' && (
                  <Lightbox
                    onNext={goToPreviewImage}
                    media={
                      <img
                        src="/assets/lightbox-fit-width.jpg"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    }
                  />
                )}
                {activeVariantTab === 'Fit image (height)' && (
                  <Lightbox
                    onNext={goToPreviewImage}
                    media={
                      <img
                        src="/assets/lightbox-fit-height.jpg"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    }
                  />
                )}
              </div>
            </div>
            {activeVariantTab === 'Preview image (multiple)' && (
              <span className="ds-variant-note">
                Previous is hidden on the first item in the set — there's nowhere for it to go.
              </span>
            )}
            {activeVariantTab === 'Preview image (single)' && (
              <span className="ds-variant-note">
                With only one item, navigation and the counter are both unnecessary and hidden.
              </span>
            )}
            {activeVariantTab === 'Preview video' && (
              <span className="ds-variant-note">
                A poster frame with a play overlay; the counter and the editing-only actions
                (flip, rotate, more) drop out, leaving just download and zoom.
              </span>
            )}
            {activeVariantTab === 'Fit image (width)' && (
              <span className="ds-variant-note">
                A wide image fits to the media area's width, letterboxing above and below.
              </span>
            )}
            {activeVariantTab === 'Fit image (height)' && (
              <span className="ds-variant-note">
                A tall image fits to the media area's height, letterboxing left and right.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Close, Previous, and Next are Icon Buttons — their default/hover/focus/disabled states
          are already documented in full on the Icon Button page. The action-bar controls below
          use their own bespoke tokens.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Surface</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td style={{ width: 160 }}>
                <div className="ds-lightbox-doc__action-swatch">
                  <span className="ds-lightbox__action">
                    <span className="icon" aria-hidden="true">
                      download
                    </span>
                  </span>
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--surface-lightbox-action-icon-default)' }}
                  />
                  <code>surface-lightbox-action-icon-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 160 }}>
                <div className="ds-lightbox-doc__action-swatch">
                  <span className="ds-lightbox__action" style={{ color: 'var(--surface-lightbox-action-icon-hover)' }}>
                    <span className="icon" aria-hidden="true">
                      download
                    </span>
                  </span>
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--surface-lightbox-action-icon-hover)' }}
                  />
                  <code>surface-lightbox-action-icon-hover</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Pressed</td>
              <td style={{ width: 160 }}>
                <div className="ds-lightbox-doc__action-swatch">
                  <span className="ds-lightbox__action" style={{ color: 'var(--surface-lightbox-action-icon-pressed)' }}>
                    <span className="icon" aria-hidden="true">
                      download
                    </span>
                  </span>
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--surface-lightbox-action-icon-pressed)' }}
                  />
                  <code>surface-lightbox-action-icon-pressed</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Every measurement below comes from a token — no hardcoded values, except where flagged.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Token</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Overlay background</th>
              <td>
                <code>--surface-lightbox-overlay-default</code>
              </td>
              <td>#22222299</td>
            </tr>
            <tr>
              <th scope="row">Header padding (top / sides)</th>
              <td>
                <code>--space-component-padding-2xl</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Header padding (bottom)</th>
              <td>
                <code>--space-component-padding-xl</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Section gap (header/main/footer)</th>
              <td>
                <code>--space-layout-section-gap-sm</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Nav column width</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>104px, fixed in Figma</td>
            </tr>
            <tr>
              <th scope="row">Footer gap (counter ↔ action bar)</th>
              <td>
                <code>--space-layout-section-gap-lg</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Counter type</th>
              <td>
                <code>--typography-lg</code>
              </td>
              <td>20px / 28px, regular</td>
            </tr>
            <tr>
              <th scope="row">Action bar padding</th>
              <td>
                <code>--space-component-padding-xl</code> / <code>--space-component-padding-2xl</code>
              </td>
              <td>24px (y), 32px (x)</td>
            </tr>
            <tr>
              <th scope="row">Action bar radius</th>
              <td>
                <code>--radius-full</code>
              </td>
              <td>9999px</td>
            </tr>
            <tr>
              <th scope="row">Action bar surface</th>
              <td>
                <code>--surface-lightbox-action-surface-default</code>
              </td>
              <td>#22222299</td>
            </tr>
            <tr>
              <th scope="row">Action icon size</th>
              <td>
                <code>--component-icon-md</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Placeholder icon size</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>64px (largest icon token is --component-icon-lg at 36px)</td>
            </tr>
            <tr>
              <th scope="row">Video-play icon size</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>128px (largest icon token is --component-icon-lg at 36px)</td>
            </tr>
            <tr>
              <th scope="row">Mobile nav breakpoint</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>640px container width (hand-picked, matches Tab/Topbar precedent)</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Lightbox composes this component internally.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('icon-button')}
          >
            <IconButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Icon Button</span>
          </button>
        </div>
      </section>
    </div>
  );
}
