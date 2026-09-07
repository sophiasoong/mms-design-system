import { Fragment } from 'react';
import { Badge, type BadgeColor } from './Badge';
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
  /** Dot color of the trailing Badge — defaults to green (Figma's BadgeLabel sub-component). */
  badgeColor?: BadgeColor;
}

export interface StepProps {
  items: StepItemData[];
  orientation?: StepOrientation;
  /** Vertical orientation only. Figma's collapsed Workflow Status panel (node 1881:111929)
   * keeps just the in-progress step visible, so `collapsed` folds every item except the
   * first `current` one (falling back to the first item when nothing is current). Items
   * stay mounted and animate closed/open (Step.css), so toggling this is a smooth motion
   * rather than a re-render. */
  collapsed?: boolean;
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

export function Step({ items, orientation = 'horizontal', collapsed = false, className }: StepProps) {
  const classes = ['ds-step', `ds-step--${orientation}`, className].filter(Boolean).join(' ');

  if (orientation === 'vertical') {
    const currentIndex = Math.max(
      0,
      items.findIndex((item) => item.status === 'current'),
    );
    return (
      <div className={classes}>
        {items.map((item, index) => {
          const isCollapsed = collapsed && index !== currentIndex;
          return (
            <div
              className={`ds-step-item ds-step-item--vertical${isCollapsed ? ' ds-step-item--collapsed' : ''}`}
              aria-hidden={isCollapsed || undefined}
              key={index}
            >
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
                    {item.badgeLabel && (
                      <Badge label={item.badgeLabel} color={item.badgeColor ?? 'green'} />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
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
