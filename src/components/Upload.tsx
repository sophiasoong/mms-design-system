import type { ReactNode } from 'react';
import List from './List';
import Button from './Button';
import { DropzoneIcon } from './icons';
import './Upload.css';

/* ---------------------------------------------------------------- */
/* UploadDropzone                                                    */
/* ---------------------------------------------------------------- */

export type UploadDropzoneState = 'default' | 'hover' | 'filled';

export interface UploadResultRow {
  icon: string;
  tone: 'success' | 'danger';
  label: string;
  value: string;
  /** Indented sub-rows rendered under this row, e.g. a Joined/Excluded breakdown. */
  detail?: { tone: 'success' | 'danger'; label: string; value: string }[];
}

export interface UploadDropzoneProps {
  state?: UploadDropzoneState;
  title?: string;
  description?: string;
  showDescription?: boolean;
  /** Hover only — upload progress, 0-100. */
  progressValue?: number;
  /** Filled only. */
  results?: UploadResultRow[];
  showTotal?: boolean;
  totalLabel?: string;
  className?: string;
}

export function UploadDropzone({
  state = 'default',
  title,
  description = 'Description',
  showDescription = true,
  progressValue = 25,
  results,
  showTotal = true,
  totalLabel = 'Total product(s): 2,400',
  className,
}: UploadDropzoneProps) {
  const isFilled = state === 'filled';
  const classes = ['ds-upload-dropzone', `ds-upload-dropzone--${state}`, className]
    .filter(Boolean)
    .join(' ');
  const resolvedTitle = title ?? (isFilled ? 'Import result' : 'Click or drag file to this area to upload');

  return (
    <div className={classes}>
      {!isFilled && <DropzoneIcon className="ds-upload-dropzone__icon" />}
      <div className="ds-upload-dropzone__content">
        <p className="ds-upload-dropzone__title">{resolvedTitle}</p>
        {showDescription && <p className="ds-upload-dropzone__description">{description}</p>}
      </div>
      {state === 'hover' && (
        <div className="ds-upload-dropzone__progress">
          <div className="ds-upload-dropzone__progress-track">
            <div
              className="ds-upload-dropzone__progress-fill"
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <span className="ds-upload-dropzone__progress-label">{progressValue}%</span>
        </div>
      )}
      {isFilled && results && results.length > 0 && (
        <div className="ds-upload-dropzone__results">
          {results.map((row) => (
            <div className="ds-upload-dropzone__result" key={row.label}>
              <div className="ds-upload-dropzone__result-row">
                <span
                  className={`icon icon--sm ds-upload-dropzone__result-icon ds-upload-dropzone__result-icon--${row.tone}`}
                  aria-hidden="true"
                >
                  {row.icon}
                </span>
                <span className="ds-upload-dropzone__result-label">{row.label}</span>
                <span className="ds-upload-dropzone__result-value">{row.value}</span>
              </div>
              {row.detail && row.detail.length > 0 && (
                <div className="ds-upload-dropzone__detail">
                  {row.detail.map((d) => (
                    <div className="ds-upload-dropzone__detail-row" key={d.label}>
                      <span className="ds-upload-dropzone__detail-tag">
                        <span
                          className={`ds-upload-dropzone__detail-dot ds-upload-dropzone__detail-dot--${d.tone}`}
                          aria-hidden="true"
                        />
                        {d.label}
                      </span>
                      <span className="ds-upload-dropzone__detail-value">{d.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {isFilled && showTotal && <p className="ds-upload-dropzone__total">{totalLabel}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* UploadImageItem                                                   */
/* ---------------------------------------------------------------- */

export type UploadImageItemSize = 'sm' | 'lg';
export type UploadImageItemShape = 'round' | 'square';
export type UploadImageItemState = 'default' | 'filled' | 'loading' | 'error';

export interface UploadImageItemProps {
  size?: UploadImageItemSize;
  shape?: UploadImageItemShape;
  state?: UploadImageItemState;
  /** Filled only — the thumbnail content, e.g. an <img>. */
  thumbnail?: ReactNode;
  /** Filled Lg/Square only — shows a drag handle for reordering (per Figma's showDrag prop on that variant; Sm and Round selected states never render one). */
  draggable?: boolean;
  label?: string;
  errorMessage?: string;
  showErrorHint?: boolean;
  /** Loading only, 0-100. */
  progressValue?: number;
  onAdd?: () => void;
  onPreview?: () => void;
  onRemove?: () => void;
  className?: string;
}

export function UploadImageItem({
  size = 'sm',
  shape = 'round',
  state = 'default',
  thumbnail,
  draggable = true,
  label = 'Upload',
  errorMessage = 'Error Message',
  showErrorHint = true,
  progressValue = 50,
  onAdd,
  onPreview,
  onRemove,
  className,
}: UploadImageItemProps) {
  const classes = [
    'ds-upload-image-item',
    `ds-upload-image-item--${size}`,
    `ds-upload-image-item--${shape}`,
    `ds-upload-image-item--${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showDrag = draggable && size === 'lg' && shape === 'square';

  return (
    <div className={classes}>
      {state === 'filled' && (
        <div className="ds-upload-image-item__frame">
          {showDrag && (
            <span className="ds-upload-image-item__drag" aria-hidden="true">
              <span className="icon icon--sm">drag_indicator</span>
            </span>
          )}
          <div className="ds-upload-image-item__thumbnail">
            {thumbnail}
            <div className="ds-upload-image-item__overlay">
              <button
                type="button"
                className="ds-upload-image-item__action ds-upload-image-item__action--preview"
                aria-label="Preview"
                onClick={onPreview}
              >
                <span className="icon icon--sm" aria-hidden="true">
                  visibility
                </span>
              </button>
              <button
                type="button"
                className="ds-upload-image-item__action ds-upload-image-item__action--remove"
                aria-label="Remove"
                onClick={onRemove}
              >
                <span className="icon icon--sm" aria-hidden="true">
                  delete
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      {state === 'loading' && (
        <>
          <p className="ds-upload-image-item__label">Uploading...</p>
          <div className="ds-upload-image-item__progress-track">
            <div
              className="ds-upload-image-item__progress-fill"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </>
      )}
      {(state === 'default' || state === 'error') && (
        <>
          <button
            type="button"
            className="ds-upload-image-item__add"
            aria-label={label}
            onClick={onAdd}
          >
            <span className="icon icon--sm" aria-hidden="true">
              add
            </span>
          </button>
          <p className="ds-upload-image-item__label">{label}</p>
        </>
      )}
      {state === 'error' && showErrorHint && (
        <span className="ds-upload-image-item__error">{errorMessage}</span>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Upload (UploadField)                                              */
/* ---------------------------------------------------------------- */

export type UploadStyle = 'dropzone' | 'image-grid' | 'button';

export interface UploadFileRow {
  name: string;
  onRemove?: () => void;
}

export interface UploadProps {
  style?: UploadStyle;
  /** Dropzone/Button styles. */
  dropzone?: UploadDropzoneProps;
  files?: UploadFileRow[];
  showFileList?: boolean;
  /** Dropzone style only — shown once the dropzone is Filled. */
  showButtons?: boolean;
  onDownloadErrorReport?: () => void;
  onUploadAgain?: () => void;
  /** Image-grid style only. */
  images?: ReactNode;
  showAddTile?: boolean;
  onAddImage?: () => void;
  /** Button style only. */
  onUploadClick?: () => void;
  className?: string;
}

export default function Upload({
  style = 'dropzone',
  dropzone,
  files,
  showFileList = true,
  showButtons = false,
  onDownloadErrorReport,
  onUploadAgain,
  images,
  showAddTile = true,
  onAddImage,
  onUploadClick,
  className,
}: UploadProps) {
  const classes = ['ds-upload', `ds-upload--${style}`, className].filter(Boolean).join(' ');

  const fileList = files && files.length > 0 && (
    <div className="ds-upload__file-list">
      {files.map((file) => (
        <List
          key={file.name}
          size="sm"
          icon="attach_file"
          label={file.name}
          showValue={false}
          showPreview={false}
          onRemoveClick={file.onRemove}
        />
      ))}
    </div>
  );

  if (style === 'image-grid') {
    return (
      <div className={classes}>
        {images}
        {showAddTile && <UploadImageItem size="lg" shape="square" state="default" onAdd={onAddImage} />}
      </div>
    );
  }

  if (style === 'button') {
    return (
      <div className={classes}>
        <Button
          variant="primary"
          appearance="outline"
          size="md"
          leadingIcon="upload"
          onClick={onUploadClick}
        >
          Upload
        </Button>
        {showFileList && fileList}
      </div>
    );
  }

  return (
    <div className={classes}>
      <UploadDropzone {...dropzone} />
      {showFileList && fileList}
      {showButtons && (
        <div className="ds-upload__buttons">
          <Button variant="primary" appearance="outline" size="md" onClick={onDownloadErrorReport}>
            Download Error Report
          </Button>
          <Button variant="primary" appearance="outline" size="md" onClick={onUploadAgain}>
            Upload Again
          </Button>
        </div>
      )}
    </div>
  );
}
