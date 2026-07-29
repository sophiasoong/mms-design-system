/* Figma node 1241:37619 ("Button" nav glyph) — a bespoke rounded-rect containing a
   plus sign and a dash, not a Material Symbols glyph (no glyph in the Rounded family
   matches this literal mark). Used to represent the Button component in navigation and
   Related Component cards. Paths are the exact vectors exported from Figma (not a
   stroke+line approximation) — an earlier version built the plus/dash from stroked
   <line> elements with round caps, whose caps overlapped and erased the gap Figma draws
   between them; filled paths reproduce that gap exactly. Colored via currentColor so it
   follows the same color-inheritance rules as the Material Symbol icons it sits
   alongside. viewBox matches the Figma frame's own 96×96 box (including its built-in
   padding), so it renders at 24×24 — the same square box the surrounding Material
   Symbol glyphs occupy — without a bespoke aspect ratio. */
export function ButtonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 38C32.2091 38 34 39.7909 34 42V44H36C38.2091 44 40 45.7909 40 48C40 50.2091 38.2091 52 36 52H34V54C34 56.2091 32.2091 58 30 58C27.7909 58 26 56.2091 26 54V52H24C21.7909 52 20 50.2091 20 48C20 45.7909 21.7909 44 24 44H26V42C26 39.7909 27.7909 38 30 38Z"
        fill="currentColor"
      />
      <path
        d="M72 44C74.2091 44 76 45.7909 76 48C76 50.2091 74.2091 52 72 52H50C47.7909 52 46 50.2091 46 48C46 45.7909 47.7909 44 50 44H72Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76 20C84.8366 20 92 27.1634 92 36V60C92 68.8366 84.8366 76 76 76H20C11.1634 76 4 68.8366 4 60V36C4 27.1634 11.1634 20 20 20H76ZM20 28C15.5817 28 12 31.5817 12 36V60C12 64.4183 15.5817 68 20 68H76C80.4183 68 84 64.4183 84 60V36C84 31.5817 80.4183 28 76 28H20Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Figma node 1241:37606 ("Chip" nav glyph) — the pill-shaped counterpart to ButtonIcon:
   a fully rounded (stadium) border with a single centered line, so the mark reads as
   Chip's pill shape rather than Button's rounded rectangle. Paths are the exact vectors
   from the Figma-exported SVG, same as ButtonIcon. Colored via currentColor (exported
   as flat black) so it follows the same color-inheritance rules as the Material Symbol
   icons it sits alongside. */
export function ChipIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M68 44C70.2091 44 72 45.7909 72 48C72 50.2091 70.2091 52 68 52H28C25.7909 52 24 50.2091 24 48C24 45.7909 25.7909 44 28 44H68Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 20C79.464 20 92 32.536 92 48C92 63.464 79.464 76 64 76H32C16.536 76 4 63.464 4 48C4 32.536 16.536 20 32 20H64ZM32 28C20.9543 28 12 36.9543 12 48C12 59.0457 20.9543 68 32 68H64C75.0457 68 84 59.0457 84 48C84 36.9543 75.0457 28 64 28H32Z"
        fill="currentColor"
      />
    </svg>
  );
}
