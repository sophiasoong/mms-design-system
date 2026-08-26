import { useLayoutEffect, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';

/** Positions a portaled floating panel (DatePicker/DateRangePicker/DateTimePicker's
 * calendar) against its trigger's live bounding rect, so ancestors with overflow:hidden
 * (e.g. Form's rounded card) can't clip it — recomputed on open, on any scroll/resize, and
 * on any resize of the anchor itself (a ResizeObserver, not just the window listener above)
 * since the trigger's own box can change size from its own content — e.g.
 * DateRangePicker's trigger widens once its placeholder text ("Start Date — End Date") is
 * replaced by longer formatted dates — with no window resize event of its own to key off. */
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
    const resizeObserver = new ResizeObserver(update);
    if (anchorRef.current) resizeObserver.observe(anchorRef.current);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
      resizeObserver.disconnect();
    };
  }, [isOpen, anchorRef]);

  return style;
}

/** Computes the horizontal offset (px, from the anchor's own left edge) to the center of
 * some sub-element within it — e.g. DateRangePicker's trigger renders "Start Date" and
 * "End Date" as separate spans, and this points a small arrow at whichever one is
 * currently active. Recomputed on open, on any scroll/resize, on any resize of the anchor
 * or the target itself (same ResizeObserver reasoning as useAnchoredPanelPosition above —
 * the target span's own width changes as its placeholder text is replaced by a formatted
 * date, independent of whether the anchor's box happens to resize too), and again whenever
 * targetRef itself changes identity — e.g. switching from the start-date span's ref to the
 * end-date span's ref as the user progresses through picking a range. */
export function useAnchoredArrowOffset(
  anchorRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  isOpen: boolean,
): number {
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const update = () => {
      const anchorRect = anchorRef.current?.getBoundingClientRect();
      const targetRect = targetRef.current?.getBoundingClientRect();
      if (!anchorRect || !targetRect) return;
      setOffset(targetRect.left - anchorRect.left + targetRect.width / 2);
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    const resizeObserver = new ResizeObserver(update);
    if (anchorRef.current) resizeObserver.observe(anchorRef.current);
    if (targetRef.current) resizeObserver.observe(targetRef.current);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
      resizeObserver.disconnect();
    };
  }, [isOpen, anchorRef, targetRef]);

  return offset;
}
