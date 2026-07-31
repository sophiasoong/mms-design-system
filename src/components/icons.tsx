/* Figma-exported SVGs for the bespoke nav / Related Component glyphs — one per
   component whose Figma mark has no Material Symbols Rounded equivalent (see the
   comment in ../data/components.ts for the full list of which ids use these vs. the
   ligature fallback). All source files share one convention: two flat fills, #222222
   for the foreground/detail mark and #BFBFBF for the background/container shape. Both
   are exact matches in tokens.css (--brand-neutral-950 and --brand-neutral-600), so no
   value is being guessed here. The detail mark maps to currentColor (so it still
   follows the sidebar's active-item color the same way every icon here always has);
   the container shape stays a fixed --brand-neutral-600 so the frame doesn't recolor
   with it. viewBox is each source frame's own 96×96 box, rendered at 24×24 — the same
   square the surrounding Material Symbol glyphs occupy. */

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
        d="M76 20C84.8366 20 92 27.1634 92 36V60C92 68.8366 84.8366 76 76 76H20C11.1634 76 4 68.8366 4 60V36C4 27.1634 11.1634 20 20 20H76ZM20 28C15.5817 28 12 31.5817 12 36V60C12 64.4183 15.5817 68 20 68H76C80.4183 68 84 64.4183 84 60V36C84 31.5817 80.4183 28 76 28H20ZM74 44C76.2091 44 78 45.7909 78 48C78 50.2091 76.2091 52 74 52H50C47.7909 52 46 50.2091 46 48C46 45.7909 47.7909 44 50 44H74Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M28 38C29.6569 38 31 39.3431 31 41V45H35C36.6569 45 38 46.3431 38 48C38 49.6569 36.6569 51 35 51H31V55C31 56.6569 29.6569 58 28 58C26.3431 58 25 56.6569 25 55V51H21C19.3431 51 18 49.6569 18 48C18 46.3431 19.3431 45 21 45H25V41C25 39.3431 26.3431 38 28 38Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconButtonIcon({ className }: { className?: string }) {
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
        d="M44 52V64C44 65.1333 44.3833 66.0833 45.15 66.85C45.9167 67.6167 46.8667 68 48 68C49.1333 68 50.0833 67.6167 50.85 66.85C51.6167 66.0833 52 65.1333 52 64V52H64C65.1333 52 66.0833 51.6167 66.85 50.85C67.6167 50.0833 68 49.1333 68 48C68 46.8667 67.6167 45.9167 66.85 45.15C66.0833 44.3833 65.1333 44 64 44H52V32C52 30.8667 51.6167 29.9167 50.85 29.15C50.0833 28.3833 49.1333 28 48 28C46.8667 28 45.9167 28.3833 45.15 29.15C44.3833 29.9167 44 30.8667 44 32V44H32C30.8667 44 29.9167 44.3833 29.15 45.15C28.3833 45.9167 28 46.8667 28 48C28 49.1333 28.3833 50.0833 29.15 50.85C29.9167 51.6167 30.8667 52 32 52H44Z"
        fill="currentColor"
      />
      <circle cx="48" cy="48" r="36" stroke="var(--brand-neutral-600)" strokeWidth="8" />
    </svg>
  );
}

export function DropdownIcon({ className }: { className?: string }) {
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
        d="M20 12H76C80.4183 12 84 15.5817 84 20V76C84 80.4183 80.4183 84 76 84H20C15.5817 84 12 80.4183 12 76V20C12 15.5817 15.5817 12 20 12Z"
        stroke="var(--brand-neutral-600)"
        strokeWidth="8"
      />
      <path
        d="M34.85 66.85C35.6167 66.0833 36 65.1333 36 64C36 62.8667 35.6167 61.9167 34.85 61.15C34.0833 60.3833 33.1333 60 32 60C30.8667 60 29.9167 60.3833 29.15 61.15C28.3833 61.9167 28 62.8667 28 64C28 65.1333 28.3833 66.0833 29.15 66.85C29.9167 67.6167 30.8667 68 32 68C33.1333 68 34.0833 67.6167 34.85 66.85ZM34.85 50.85C35.6167 50.0833 36 49.1333 36 48C36 46.8667 35.6167 45.9167 34.85 45.15C34.0833 44.3833 33.1333 44 32 44C30.8667 44 29.9167 44.3833 29.15 45.15C28.3833 45.9167 28 46.8667 28 48C28 49.1333 28.3833 50.0833 29.15 50.85C29.9167 51.6167 30.8667 52 32 52C33.1333 52 34.0833 51.6167 34.85 50.85ZM34.85 34.85C35.6167 34.0833 36 33.1333 36 32C36 30.8667 35.6167 29.9167 34.85 29.15C34.0833 28.3833 33.1333 28 32 28C30.8667 28 29.9167 28.3833 29.15 29.15C28.3833 29.9167 28 30.8667 28 32C28 33.1333 28.3833 34.0833 29.15 34.85C29.9167 35.6167 30.8667 36 32 36C33.1333 36 34.0833 35.6167 34.85 34.85ZM48 68H64C65.1333 68 66.0833 67.6167 66.85 66.85C67.6167 66.0833 68 65.1333 68 64C68 62.8667 67.6167 61.9167 66.85 61.15C66.0833 60.3833 65.1333 60 64 60H48C46.8667 60 45.9167 60.3833 45.15 61.15C44.3833 61.9167 44 62.8667 44 64C44 65.1333 44.3833 66.0833 45.15 66.85C45.9167 67.6167 46.8667 68 48 68ZM48 52H64C65.1333 52 66.0833 51.6167 66.85 50.85C67.6167 50.0833 68 49.1333 68 48C68 46.8667 67.6167 45.9167 66.85 45.15C66.0833 44.3833 65.1333 44 64 44H48C46.8667 44 45.9167 44.3833 45.15 45.15C44.3833 45.9167 44 46.8667 44 48C44 49.1333 44.3833 50.0833 45.15 50.85C45.9167 51.6167 46.8667 52 48 52ZM48 36H64C65.1333 36 66.0833 35.6167 66.85 34.85C67.6167 34.0833 68 33.1333 68 32C68 30.8667 67.6167 29.9167 66.85 29.15C66.0833 28.3833 65.1333 28 64 28H48C46.8667 28 45.9167 28.3833 45.15 29.15C44.3833 29.9167 44 30.8667 44 32C44 33.1333 44.3833 34.0833 45.15 34.85C45.9167 35.6167 46.8667 36 48 36Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
        d="M64 20C79.464 20 92 32.536 92 48C92 63.464 79.464 76 64 76H32L31.2773 75.9912C16.1474 75.6079 4 63.2224 4 48C4 32.7776 16.1474 20.3921 31.2773 20.0088L32 20H64ZM32 28C20.9543 28 12 36.9543 12 48C12 59.0457 20.9543 68 32 68H64C75.0457 68 84 59.0457 84 48C84 36.9543 75.0457 28 64 28H32Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M20 48C20 45.7909 21.7909 44 24 44H72C74.2091 44 76 45.7909 76 48V48C76 50.2091 74.2091 52 72 52H24C21.7909 52 20 50.2091 20 48V48Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InputIcon({ className }: { className?: string }) {
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
        d="M76.4131 20.0049C85.0587 20.224 92 27.3016 92 36V60C92 68.6984 85.0587 75.776 76.4131 75.9951L76 76H20C11.3016 76 4.22398 69.0587 4.00488 60.4131L4 60V36C4 27.1634 11.1634 20 20 20H76L76.4131 20.0049ZM20 28C15.5817 28 12 31.5817 12 36V60C12 64.4183 15.5817 68 20 68H76C80.4183 68 84 64.4183 84 60V36C84 31.5817 80.4183 28 76 28H20ZM53 44C55.2091 44 57 45.7909 57 48C57 50.2091 55.2091 52 53 52H22C19.7909 52 18 50.2091 18 48C18 45.7909 19.7909 44 22 44H53Z"
        fill="var(--brand-neutral-600)"
      />
      <rect x="61" y="38" width="6" height="20" rx="3" fill="currentColor" />
    </svg>
  );
}

export function TextareaIcon({ className }: { className?: string }) {
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
        d="M72 12C80.8366 12 88 19.1634 88 28V68C88 76.6984 81.0587 83.776 72.4131 83.9951L72 84H24L23.5869 83.9951C15.0785 83.7795 8.2205 76.9215 8.00488 68.4131L8 68V28C8 19.1634 15.1634 12 24 12H72ZM24 20C19.5817 20 16 23.5817 16 28V68C16 72.4183 19.5817 76 24 76H72C76.4183 76 80 72.4183 80 68V28C80 23.5817 76.4183 20 72 20H24ZM44 42C46.2091 42 48 43.7909 48 46C48 48.2091 46.2091 50 44 50H26C23.7909 50 22 48.2091 22 46C22 43.7909 23.7909 42 26 42H44ZM70 28C72.2091 28 74 29.7909 74 32C74 34.2091 72.2091 36 70 36H26C23.7909 36 22 34.2091 22 32C22 29.7909 23.7909 28 26 28H70Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M73.2326 64.2326C74.2089 63.2563 75.7914 63.2563 76.7678 64.2326C77.7437 65.2089 77.7439 66.7916 76.7678 67.7677L71.7678 72.7677C70.7916 73.7439 69.2089 73.7437 68.2326 72.7677C67.2563 71.7914 67.2563 70.2089 68.2326 69.2326L73.2326 64.2326ZM71.2326 54.2326C72.2089 53.2563 73.7915 53.2563 74.7678 54.2326C75.7437 55.2089 75.7439 56.7915 74.7678 57.7677L61.7678 70.7677C60.7916 71.7439 59.2089 71.7437 58.2326 70.7677C57.2563 69.7914 57.2563 68.2089 58.2326 67.2326L71.2326 54.2326Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SelectIcon({ className }: { className?: string }) {
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
        d="M76.4131 20.0049C85.0587 20.224 92 27.3016 92 36V60C92 68.6984 85.0587 75.776 76.4131 75.9951L76 76H20C11.3016 76 4.22398 69.0587 4.00488 60.4131L4 60V36C4 27.1634 11.1634 20 20 20H76L76.4131 20.0049ZM20 28C15.5817 28 12 31.5817 12 36V60C12 64.4183 15.5817 68 20 68H76C80.4183 68 84 64.4183 84 60V36C84 31.5817 80.4183 28 76 28H20ZM49 44C51.2091 44 53 45.7909 53 48C53 50.2091 51.2091 52 49 52H22C19.7909 52 18 50.2091 18 48C18 45.7909 19.7909 44 22 44H49Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M61 45L68 51L75 45"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckboxIcon({ className }: { className?: string }) {
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
        d="M20 12H76C80.4183 12 84 15.5817 84 20V76C84 80.4183 80.4183 84 76 84H20C15.5817 84 12 80.4183 12 76V20C12 15.5817 15.5817 12 20 12Z"
        stroke="var(--brand-neutral-600)"
        strokeWidth="8"
      />
      <path
        d="M42 64.7778C42.5926 64.7778 43.1481 64.6859 43.6667 64.5022C44.1852 64.3156 44.6667 64 45.1111 63.5556L70.3333 38.3333C71.1482 37.5185 71.5556 36.5185 71.5556 35.3333C71.5556 34.1481 71.1111 33.1111 70.2222 32.2222C69.4074 31.4074 68.3704 31 67.1111 31C65.8519 31 64.8148 31.4074 64 32.2222L42 54.2222L32.3333 44.5556C31.5185 43.7407 30.5185 43.3333 29.3333 43.3333C28.1481 43.3333 27.1111 43.7778 26.2222 44.6667C25.4074 45.4815 25 46.5185 25 47.7778C25 49.037 25.4074 50.0741 26.2222 50.8889L38.8889 63.5556C39.3333 64 39.8148 64.3156 40.3333 64.5022C40.8519 64.6859 41.4074 64.7778 42 64.7778Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function RadioIcon({ className }: { className?: string }) {
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
        d="M48 8C25.92 8 8 25.92 8 48C8 70.08 25.92 88 48 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 48 8ZM48 80C30.32 80 16 65.68 16 48C16 30.32 30.32 16 48 16C65.68 16 80 30.32 80 48C80 65.68 65.68 80 48 80Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M48 68C59.0457 68 68 59.0457 68 48C68 36.9543 59.0457 28 48 28C36.9543 28 28 36.9543 28 48C28 59.0457 36.9543 68 48 68Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Figma node 576:8677 ("Calendar" nav glyph) — the trigger icon used inside the
   Datepicker / DateRangePicker / DateTimePicker input itself, not the sidebar/Related
   Component glyph (that's DatepickerIcon below). The re-supplied Calendar.svg is
   byte-identical to this path (still a single flat fill, no #222222/#BFBFBF split), so
   it stays a single currentColor shape. */
export function CalendarIcon({ className }: { className?: string }) {
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
        d="M63 11.998C65.0842 11.998 66.7734 13.6873 66.7734 15.7715V19.5039H78C80.7615 19.5039 83 21.7326 83 24.4814V79.0225C83 81.7713 80.7614 84 78 84H18C15.2386 84 13 81.7713 13 79.0225V24.4814C13 21.7326 15.2386 19.5039 18 19.5039H29.2266V15.7715C29.2266 13.6873 30.9159 11.9981 33 11.998C35.0842 11.998 36.7734 13.6873 36.7734 15.7715V19.5039H59.2266V15.7715C59.2266 13.6874 60.916 11.9982 63 11.998ZM20.5 76.5342H75.5V46.9189H20.5V76.5342ZM20.5 39.3721H75.5V26.9697H66.7734V30.7031C66.7732 32.7871 65.084 34.4766 63 34.4766C60.9161 34.4764 59.2268 32.787 59.2266 30.7031V26.9697H36.7734V30.7031C36.7732 32.7871 35.084 34.4766 33 34.4766C30.916 34.4765 29.2268 32.787 29.2266 30.7031V26.9697H20.5V39.3721Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DatepickerIcon({ className }: { className?: string }) {
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
        d="M82.2861 14C85.4421 14 88 16.488 88 19.5566V80.4434C88 83.512 85.4421 86 82.2861 86H13.7139C10.5581 85.9998 8 83.5119 8 80.4434V19.5566C8 16.4881 10.5581 14.0002 13.7139 14H82.2861ZM16.5713 44.7051V77.666H79.4287V44.7051H16.5713ZM16.5713 36.0801H79.4287V22.334H16.5713V36.0801Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M32 11V28.0645"
        stroke="currentColor"
        strokeWidth="8.62566"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64 10.8981V27.9625"
        stroke="currentColor"
        strokeWidth="8.62566"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TabIcon({ className }: { className?: string }) {
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
        d="M8 48C8 44.6863 10.6863 42 14 42H26C29.3137 42 32 44.6863 32 48V48C32 51.3137 29.3137 54 26 54H14C10.6863 54 8 51.3137 8 48V48Z"
        fill="currentColor"
      />
      <path
        d="M36 48C36 44.6863 38.6863 42 42 42H54C57.3137 42 60 44.6863 60 48V48C60 51.3137 57.3137 54 54 54H42C38.6863 54 36 51.3137 36 48V48Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M64 48C64 44.6863 66.6863 42 70 42H82C85.3137 42 88 44.6863 88 48V48C88 51.3137 85.3137 54 82 54H70C66.6863 54 64 51.3137 64 48V48Z"
        fill="var(--brand-neutral-600)"
      />
    </svg>
  );
}
