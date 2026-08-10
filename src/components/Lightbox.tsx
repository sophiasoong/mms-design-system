import type { ReactNode } from 'react';
import IconButton from './IconButton';
import './Lightbox.css';

export interface LightboxProps {
  /** Defaults to a placeholder swatch when omitted. */
  media?: ReactNode;
  showVideo?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
  showCounter?: boolean;
  counterLabel?: string;
  showActionBar?: boolean;
  showDownload?: boolean;
  showFlip?: boolean;
  showRotate?: boolean;
  showZoom?: boolean;
  showMore?: boolean;
  onClose?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onPlay?: () => void;
  onDownload?: () => void;
  onFlipVertical?: () => void;
  onFlipHorizontal?: () => void;
  onRotateLeft?: () => void;
  onRotateRight?: () => void;
  onZoomOut?: () => void;
  onZoomIn?: () => void;
  onMore?: () => void;
  className?: string;
}

export default function Lightbox({
  media,
  showVideo = false,
  showPrevious = true,
  showNext = true,
  showCounter = true,
  counterLabel = '2 / 9',
  showActionBar = true,
  showDownload = true,
  showFlip = true,
  showRotate = true,
  showZoom = true,
  showMore = true,
  onClose,
  onPrevious,
  onNext,
  onPlay,
  onDownload,
  onFlipVertical,
  onFlipHorizontal,
  onRotateLeft,
  onRotateRight,
  onZoomOut,
  onZoomIn,
  onMore,
  className,
}: LightboxProps) {
  const classes = ['ds-lightbox', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="ds-lightbox__header">
        <IconButton
          icon="close"
          variant="primary"
          appearance="outline"
          shape="round"
          size="lg"
          label="Close"
          onClick={onClose}
        />
      </div>
      <div className="ds-lightbox__main">
        <div className="ds-lightbox__nav ds-lightbox__nav--previous">
          {showPrevious && (
            <IconButton
              icon="chevron_left"
              variant="primary"
              appearance="outline"
              shape="round"
              size="lg"
              label="Previous"
              onClick={onPrevious}
            />
          )}
        </div>
        <div className="ds-lightbox__media">
          {media ?? (
            <div className="ds-lightbox__placeholder">
              <img
                className="ds-lightbox__placeholder-photo"
                src="/assets/lightbox-lego-stack-cutout.png"
                alt=""
              />
            </div>
          )}
          {showVideo && (
            <button type="button" className="ds-lightbox__play" aria-label="Play video" onClick={onPlay}>
              <span className="icon" aria-hidden="true">
                play_circle
              </span>
            </button>
          )}
        </div>
        <div className="ds-lightbox__nav ds-lightbox__nav--next">
          {showNext && (
            <IconButton
              icon="chevron_right"
              variant="primary"
              appearance="outline"
              shape="round"
              size="lg"
              label="Next"
              onClick={onNext}
            />
          )}
        </div>
      </div>
      <div className="ds-lightbox__footer">
        {showCounter && <p className="ds-lightbox__counter">{counterLabel}</p>}
        {showActionBar && (
          <div className="ds-lightbox__actions">
            {showDownload && (
              <button
                type="button"
                className="ds-lightbox__action"
                aria-label="Download"
                onClick={onDownload}
              >
                <span className="icon" aria-hidden="true">
                  download
                </span>
              </button>
            )}
            {showFlip && (
              <button
                type="button"
                className="ds-lightbox__action"
                aria-label="Flip vertical"
                onClick={onFlipVertical}
              >
                <span className="icon" aria-hidden="true">
                  swap_vert
                </span>
              </button>
            )}
            {showFlip && (
              <button
                type="button"
                className="ds-lightbox__action"
                aria-label="Flip horizontal"
                onClick={onFlipHorizontal}
              >
                <span className="icon" aria-hidden="true">
                  swap_horiz
                </span>
              </button>
            )}
            {showRotate && (
              <button
                type="button"
                className="ds-lightbox__action"
                aria-label="Rotate left"
                onClick={onRotateLeft}
              >
                <span className="icon" aria-hidden="true">
                  rotate_left
                </span>
              </button>
            )}
            {showRotate && (
              <button
                type="button"
                className="ds-lightbox__action"
                aria-label="Rotate right"
                onClick={onRotateRight}
              >
                <span className="icon" aria-hidden="true">
                  rotate_right
                </span>
              </button>
            )}
            {showZoom && (
              <button
                type="button"
                className="ds-lightbox__action"
                aria-label="Zoom out"
                onClick={onZoomOut}
              >
                <span className="icon" aria-hidden="true">
                  zoom_out
                </span>
              </button>
            )}
            {showZoom && (
              <button
                type="button"
                className="ds-lightbox__action"
                aria-label="Zoom in"
                onClick={onZoomIn}
              >
                <span className="icon" aria-hidden="true">
                  zoom_in
                </span>
              </button>
            )}
            {showMore && (
              <button
                type="button"
                className="ds-lightbox__action"
                aria-label="More actions"
                onClick={onMore}
              >
                <span className="icon" aria-hidden="true">
                  more_vert
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
