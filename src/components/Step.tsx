import { Fragment } from 'react';
import { Badge } from './Badge';
import './Step.css';

export type StepStatus = 'default' | 'current' | 'finished' | 'error';
export type StepOrientation = 'horizontal' | 'vertical';

export interface StepItemData {
  title: string;
  status: StepStatus;
  /** Shown inside the indicator for `default` / `current` — falls back to the item's 1-based position. */
  stepNumber?: number;
  /** Vertical orientation only. */
  caption?: string;
  description?: string;
  badgeLabel?: string;
}

export interface StepProps {
  items: StepItemData[];
  orientation?: StepOrientation;
  className?: string;
}

interface StepIndicatorProps {
  status: StepStatus;
  stepNumber: number;
}

function StepIndicator({ status, stepNumber }: StepIndicatorProps) {
  return (
    <div className={`ds-step-indicator ds-step-indicator--${status}`}>
      {status === 'finished' ? (
        <span className="icon icon--sm" aria-hidden="true">
          check
        </span>
      ) : status === 'error' ? (
        <span className="icon icon--sm" aria-hidden="true">
          close
        </span>
      ) : (
        <span className="ds-step-indicator__value">{stepNumber}</span>
      )}
    </div>
  );
}

interface StepConnectorProps {
  orientation: StepOrientation;
  status: StepStatus;
}

function StepConnector({ orientation, status }: StepConnectorProps) {
  return (
    <div
      className={`ds-step-connector ds-step-connector--${orientation} ds-step-connector--${status}`}
      aria-hidden="true"
    />
  );
}

export function Step({ items, orientation = 'horizontal', className }: StepProps) {
  const classes = ['ds-step', `ds-step--${orientation}`, className].filter(Boolean).join(' ');

  if (orientation === 'vertical') {
    return (
      <div className={classes}>
        {items.map((item, index) => (
          <div className="ds-step-item ds-step-item--vertical" key={index}>
            <div className="ds-step-item__rail">
              <StepIndicator status={item.status} stepNumber={item.stepNumber ?? index + 1} />
              {index < items.length - 1 && (
                <StepConnector orientation="vertical" status={item.status} />
              )}
            </div>
            <div className="ds-step-item__body">
              <div className="ds-step-item__title-row">
                <span className={`ds-step-item__title ds-step-item__title--${item.status}`}>
                  {item.title}
                </span>
                {item.caption && <span className="ds-step-item__caption">{item.caption}</span>}
              </div>
              {(item.description || item.badgeLabel) && (
                <div className="ds-step-item__detail-row">
                  {item.description && (
                    <span className="ds-step-item__description">{item.description}</span>
                  )}
                  {item.badgeLabel && <Badge label={item.badgeLabel} color="green" />}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={classes}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <div className="ds-step-item ds-step-item--horizontal">
            <StepIndicator status={item.status} stepNumber={item.stepNumber ?? index + 1} />
            <span className={`ds-step-item__title ds-step-item__title--${item.status}`}>
              {item.title}
            </span>
          </div>
          {index < items.length - 1 && (
            <StepConnector orientation="horizontal" status={item.status} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
