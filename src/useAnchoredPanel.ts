import { useLayoutEffect, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';

/** Positions a portaled floating panel (DatePicker/DateRangePicker/DateTimePicker's
 * calendar) against its trigger's live bounding rect, so ancestors with overflow:hidden
 * (e.g. Form's rounded card) can't clip it — recomputed on open and on any scroll/resize
 * so the panel keeps tracking the trigger instead of going stale. */
export function useAnchoredPanelPosition(
  anchorRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
): CSSProperties {
  const [style, setStyle] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    if (!isOpen) return;
    const update = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      setStyle({ position: 'fixed', top: rect.bottom, left: rect.left });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [isOpen, anchorRef]);

  return style;
}
