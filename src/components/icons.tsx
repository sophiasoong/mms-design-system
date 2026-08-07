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

export function TagIcon({ className }: { className?: string }) {
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
        d="M76 20C84.8366 20 92 27.1634 92 36V60C92 68.8366 84.8366 76 76 76H20C11.1634 76 4 68.8366 4 60V36C4 27.1634 11.1634 20 20 20H76ZM20 28C15.5817 28 12 31.5817 12 36V60C12 64.4183 15.5817 68 20 68H76C80.4183 68 84 64.4183 84 60V36C84 31.5817 80.4183 28 76 28H20Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M56.29 33.8896C56.6225 32.5488 57.9782 31.737 59.3174 32.0762C60.6564 32.4155 61.4728 33.7773 61.1406 35.1181L60.293 38.5381H63.4727C64.8684 38.5381 66 39.6697 66 41.0654C66 42.4612 64.8684 43.5928 63.4727 43.5928H59.041L57.0371 51.6797H61.4727C62.8684 51.6797 63.9999 52.8113 64 54.207C64 55.6028 62.8684 56.7344 61.4727 56.7344H55.7842L54.4521 62.1094C54.1198 63.4504 52.7641 64.263 51.4248 63.9238C50.0856 63.5846 49.2693 62.2218 49.6016 60.8808L50.6289 56.7344H41.7842L40.4521 62.1094C40.1198 63.4504 38.7641 64.263 37.4248 63.9238C36.0856 63.5846 35.2693 62.2218 35.6016 60.8808L36.6289 56.7344H33.5273C32.1316 56.7344 31 55.6028 31 54.207C31.0001 52.8113 32.1316 51.6797 33.5273 51.6797H37.8818L39.8857 43.5928H35.5273C34.1316 43.5928 33 42.4612 33 41.0654C33 39.6697 34.1316 38.5381 35.5273 38.5381H41.1377L42.29 33.8896C42.6225 32.5488 43.9782 31.737 45.3174 32.0762C46.6564 32.4155 47.4728 33.7773 47.1406 35.1181L46.293 38.5381H55.1377L56.29 33.8896ZM43.0371 51.6797H51.8818L53.8857 43.5928H45.041L43.0371 51.6797Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BadgeIcon({ className }: { className?: string }) {
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
        d="M76 44C78.2091 44 80 45.7909 80 48C80 50.2091 78.2091 52 76 52H44C41.7909 52 40 50.2091 40 48C40 45.7909 41.7909 44 44 44H76Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M20 60C26.6274 60 32 54.6274 32 48C32 41.3726 26.6274 36 20 36C13.3726 36 8 41.3726 8 48C8 54.6274 13.3726 60 20 60Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Same pill-track outline as ChipIcon (both source from the same Figma-exported
   96x96 frame), with a filled knob instead of ChipIcon's bar mark — matches the
   supplied Toggle.svg exactly. */
export function ToggleIcon({ className }: { className?: string }) {
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
        d="M64 64C72.8366 64 80 56.8366 80 48C80 39.1634 72.8366 32 64 32C55.1634 32 48 39.1634 48 48C48 56.8366 55.1634 64 64 64Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TableIcon({ className }: { className?: string }) {
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
        opacity="0.9"
        d="M88 36H52V54H88V62H52V88H44V62H8V54H44V36H8V28H88V36Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HintIcon({ className }: { className?: string }) {
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
        d="M76.4131 40.0049C85.0587 40.224 92 47.3016 92 56V68L91.9951 68.4131C91.7795 76.9215 84.9215 83.7795 76.4131 83.9951L76 84H20C11.3016 84 4.22398 77.0587 4.00488 68.4131L4 68V56C4 47.1634 11.1634 40 20 40H76L76.4131 40.0049ZM20 48C15.5817 48 12 51.5817 12 56V68C12 72.4183 15.5817 76 20 76H76C80.4183 76 84 72.4183 84 68V56C84 51.5817 80.4183 48 76 48H20Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M20 62C20 59.7909 21.7909 58 24 58H72C74.2091 58 76 59.7909 76 62C76 64.2091 74.2091 66 72 66H24C21.7909 66 20 64.2091 20 62Z"
        fill="currentColor"
      />
      <path
        d="M18.318 23.445L26.8181 31.9025C27.5479 32.6342 28.3958 33 29.3617 33C30.3276 33 31.1755 32.6342 31.9053 31.9025C32.6351 31.1708 33 30.3315 33 29.3846C33 28.4377 32.6351 27.5984 31.9053 26.8667L23.4052 18.3447L29.2651 16.4078C29.8661 16.1926 30.1559 15.7837 30.1344 15.1812C30.113 14.5786 29.8017 14.1697 29.2007 13.9545L9.68912 8.07946C9.21689 7.9073 8.7876 8.0149 8.40123 8.40226C8.01486 8.78963 7.90754 9.22004 8.07926 9.69348L13.9392 29.2555C14.1538 29.858 14.5617 30.1701 15.1627 30.1916C15.7637 30.2131 16.1715 29.9226 16.3862 29.32L18.318 23.445Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TooltipIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 74C13.8 74 11.9167 73.2167 10.35 71.65C8.78333 70.0833 8 68.2 8 66V18C8 15.8 8.78333 13.9167 10.35 12.35C11.9167 10.7833 13.8 10 16 10H80C82.2 10 84.0833 10.7833 85.65 12.35C87.2167 13.9167 88 15.8 88 18V66C88 68.2 87.2167 70.0833 85.65 71.65C84.0833 73.2167 82.2 74 80 74H58.7L51.3 85C50.9 85.6 50.4167 86.05 49.85 86.35C49.2833 86.65 48.6667 86.8 48 86.8C47.3333 86.8 46.7167 86.65 46.15 86.35C45.5833 86.05 45.1 85.6 44.7 85L37.3 74H16ZM46.3359 73.1038C47.1275 74.2913 48.8725 74.2913 49.6641 73.1038L53.8063 66.8906C54.1772 66.3342 54.8017 66 55.4704 66H78C79.1046 66 80 65.1046 80 64V20C80 18.8954 79.1046 18 78 18H18C16.8954 18 16 18.8954 16 20V64C16 65.1046 16.8954 66 18 66H40.5296C41.1983 66 41.8228 66.3342 42.1937 66.8906L46.3359 73.1038Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M24 51C24 48.7909 25.7909 47 28 47H68C70.2091 47 72 48.7909 72 51C72 53.2091 70.2091 55 68 55H28C25.7909 55 24 53.2091 24 51Z"
        fill="currentColor"
      />
      <path
        d="M24 33C24 30.7909 25.7909 29 28 29H68C70.2091 29 72 30.7909 72 33C72 35.2091 70.2091 37 68 37H28C25.7909 37 24 35.2091 24 33Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Same rounded-rectangle frame as InputIcon (both source from the same Figma-exported
   96x96 frame), with a magnifying-glass detail mark instead of InputIcon's cursor bar —
   matches the supplied Searchbar.svg exactly. */
export function SearchbarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M76.4131 20.0049C85.0587 20.224 92 27.3016 92 36V60C92 68.6984 85.0587 75.776 76.4131 75.9951L76 76H20C11.3016 76 4.22398 69.0587 4.00488 60.4131L4 60V36C4 27.1634 11.1634 20 20 20H76L76.4131 20.0049ZM20 28C15.5817 28 12 31.5817 12 36V60C12 64.4183 15.5817 68 20 68H76C80.4183 68 84 64.4183 84 60V36C84 31.5817 80.4183 28 76 28H20ZM72 44C74.2091 44 76 45.7909 76 48C76 50.2091 74.2091 52 72 52H52C49.7909 52 48 50.2091 48 48C48 45.7909 49.7909 44 52 44H72Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M30.2861 34.7432C36.1087 34.7433 40.8291 39.4635 40.8291 45.2861C40.8291 47.1063 40.3667 48.8183 39.5547 50.3125L45.1211 55.8789C46.2925 57.0505 46.2926 58.9496 45.1211 60.1211C43.9496 61.2926 42.0505 61.2925 40.8789 60.1211L35.3125 54.5547C33.8183 55.3667 32.1063 55.8291 30.2861 55.8291C24.4635 55.8291 19.7433 51.1087 19.7432 45.2861C19.7432 39.4634 24.4634 34.7432 30.2861 34.7432ZM30.2861 40.7432C27.7771 40.7432 25.7432 42.7771 25.7432 45.2861C25.7433 47.795 27.7772 49.8291 30.2861 49.8291C32.7949 49.829 34.8289 47.7949 34.8291 45.2861C34.8291 42.7772 32.795 40.7433 30.2861 40.7432Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IndicatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="36" stroke="var(--brand-neutral-600)" strokeWidth="8" />
      <path
        d="M48.0002 12.4445C48.0002 9.98994 49.9979 7.9741 52.4377 8.24337C70.9838 10.2904 85.7103 25.0166 87.7571 43.5627C88.0261 46.0022 86.0102 48 83.5559 48.0002C81.1013 48.0002 79.1441 45.999 78.8225 43.5656C76.9734 29.5705 66.429 19.027 52.4338 17.1779C50.0006 16.8563 48.0004 14.8989 48.0002 12.4445Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Sourced directly from the user-supplied Step.svg (96x96 frame, circle #BFBFBF ->
   --brand-neutral-600, path black -> currentColor) — matches the two-tone convention
   used by every other bespoke sidebar icon in this file. */
export function StepIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="36" stroke="var(--brand-neutral-600)" strokeWidth="8" />
      <path
        d="M39 36.5L50 32V64.5"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Header.svg source: rounded-square outline + 3 horizontal bars (a stylized panel/
   title-bar glyph). Frame outline (#BFBFBF) -> --brand-neutral-600, the two lower bars
   (#BFBFBF) -> --brand-neutral-600, the top bar (#222222, the "title" row) -> currentColor
   — matches the two-tone convention used by every other bespoke sidebar icon in this file. */
export function HeaderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M20 12H76C80.4183 12 84 15.5817 84 20V76C84 80.4183 80.4183 84 76 84H20C15.5817 84 12 80.4183 12 76V20C12 15.5817 15.5817 12 20 12Z"
        stroke="var(--brand-neutral-600)"
        strokeWidth="8"
      />
      <path
        d="M20 24C20 21.7909 21.7909 20 24 20H72C74.2091 20 76 21.7909 76 24V28C76 30.2091 74.2091 32 72 32H24C21.7909 32 20 30.2091 20 28V24Z"
        fill="currentColor"
      />
      <path
        d="M20 68C20 65.7909 21.7909 64 24 64H72C74.2091 64 76 65.7909 76 68V72C76 74.2091 74.2091 76 72 76H24C21.7909 76 20 74.2091 20 72V68Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M20 42C20 39.7909 21.7909 38 24 38H72C74.2091 38 76 39.7909 76 42V54C76 56.2091 74.2091 58 72 58H24C21.7909 58 20 56.2091 20 54V42Z"
        fill="var(--brand-neutral-600)"
      />
    </svg>
  );
}

/* Footer.svg source: the same rounded-square + 3-bar glyph as Header.svg, mirrored — here
   the bottom bar (#222222, the "footer" row) -> currentColor, while the frame outline and
   the two remaining bars (#BFBFBF) -> --brand-neutral-600, matching this file's two-tone
   convention. */
export function FooterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M20 12H76C80.4183 12 84 15.5817 84 20V76C84 80.4183 80.4183 84 76 84H20C15.5817 84 12 80.4183 12 76V20C12 15.5817 15.5817 12 20 12Z"
        stroke="var(--brand-neutral-600)"
        strokeWidth="8"
      />
      <path
        d="M20 24C20 21.7909 21.7909 20 24 20H72C74.2091 20 76 21.7909 76 24V28C76 30.2091 74.2091 32 72 32H24C21.7909 32 20 30.2091 20 28V24Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M20 68C20 65.7909 21.7909 64 24 64H72C74.2091 64 76 65.7909 76 68V72C76 74.2091 74.2091 76 72 76H24C21.7909 76 20 74.2091 20 72V68Z"
        fill="currentColor"
      />
      <path
        d="M20 42C20 39.7909 21.7909 38 24 38H72C74.2091 38 76 39.7909 76 42V54C76 56.2091 74.2091 58 72 58H24C21.7909 58 20 56.2091 20 54V42Z"
        fill="var(--brand-neutral-600)"
      />
    </svg>
  );
}

/* Pagination.svg source: the same rounded-square frame as Header/Footer.svg (#BFBFBF) ->
   --brand-neutral-600, plus the "1"-like tick mark from Step.svg (#000000, the current-page
   indicator) -> currentColor — matches the two-tone convention used by every other bespoke
   sidebar icon in this file. */
export function PaginationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M20 12H76C80.4183 12 84 15.5817 84 20V76C84 80.4183 80.4183 84 76 84H20C15.5817 84 12 80.4183 12 76V20C12 15.5817 15.5817 12 20 12Z"
        stroke="var(--brand-neutral-600)"
        strokeWidth="8"
      />
      <path
        d="M39 36.5L50 32V64.5"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Topbar.svg source: the same rounded-square frame as Header/Footer/Pagination.svg (#BFBFBF)
   -> --brand-neutral-600, plus a single filled top strip with rounded top corners (#222222,
   the "topbar" row spanning the full width) -> currentColor — matches the two-tone convention
   used by every other bespoke sidebar icon in this file. */
export function TopbarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M20 12H76C80.4183 12 84 15.5817 84 20V76C84 80.4183 80.4183 84 76 84H20C15.5817 84 12 80.4183 12 76V20C12 15.5817 15.5817 12 20 12Z"
        stroke="var(--brand-neutral-600)"
        strokeWidth="8"
      />
      <path
        d="M8 20C8 13.3726 13.3726 8 20 8H76C82.6274 8 88 13.3726 88 20V32H8V20Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Sidebar.svg source: the same rounded-square frame as Header/Footer/Pagination/Topbar.svg
   (#BFBFBF) -> --brand-neutral-600, plus a filled left rail (#222222, flush with the frame's
   left edge and rounded top/bottom-left corners) -> currentColor — matches the two-tone
   convention used by every other bespoke sidebar icon in this file. */
export function SidebarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M20 12H76C80.4183 12 84 15.5817 84 20V76C84 80.4183 80.4183 84 76 84H20C15.5817 84 12 80.4183 12 76V20C12 15.5817 15.5817 12 20 12Z"
        stroke="var(--brand-neutral-600)"
        strokeWidth="8"
      />
      <path
        d="M8 20C8 13.3726 13.3726 8 20 8H32V88H20C13.3726 88 8 82.6274 8 76V20Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Action Panel.svg source: the same rounded-square frame as Header/Footer/Pagination/
   Topbar/Sidebar.svg (#BFBFBF) -> --brand-neutral-600, plus a filled right rail
   (#222222, mirroring Sidebar.svg's left rail but on the trailing edge) -> currentColor
   — matches the two-tone convention used by every other bespoke sidebar icon in this file. */
export function ActionPanelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M20 12H76C80.4183 12 84 15.5817 84 20V76C84 80.4183 80.4183 84 76 84H20C15.5817 84 12 80.4183 12 76V20C12 15.5817 15.5817 12 20 12Z"
        stroke="var(--brand-neutral-600)"
        strokeWidth="8"
      />
      <path
        d="M56 24C56 21.7909 57.7909 20 60 20H72C74.2091 20 76 21.7909 76 24V72C76 74.2091 74.2091 76 72 76H60C57.7909 76 56 74.2091 56 72V24Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Anchor.svg source: a vertical rail (rect, #BFBFBF) -> --brand-neutral-600, plus three
   horizontal rounded bars — the top bar (#222222, the current/active anchor item) ->
   currentColor, the middle and bottom bars (#BFBFBF, inactive items) -> --brand-neutral-600
   — matches the two-tone convention used by every other bespoke sidebar icon in this file. */
export function AnchorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="12" y="8" width="8" height="80" rx="4" fill="var(--brand-neutral-600)" />
      <path
        d="M30 22C30 18.6863 32.6863 16 36 16H56C59.3137 16 62 18.6863 62 22V22C62 25.3137 59.3137 28 56 28H36C32.6863 28 30 25.3137 30 22V22Z"
        fill="currentColor"
      />
      <path
        d="M30 48C30 44.6863 32.6863 42 36 42H78C81.3137 42 84 44.6863 84 48V48C84 51.3137 81.3137 54 78 54H36C32.6863 54 30 51.3137 30 48V48Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M30 74C30 70.6863 32.6863 68 36 68H64C67.3137 68 70 70.6863 70 74V74C70 77.3137 67.3137 80 64 80H36C32.6863 80 30 77.3137 30 74V74Z"
        fill="var(--brand-neutral-600)"
      />
    </svg>
  );
}

/* Traced from the user-provided Breadcrumb.svg (96x96): the dark left segment (#222222)
   is the active/current crumb, so it maps to currentColor; the lighter right segment and
   connecting chevron (#BFBFBF) are both the fixed background shape, same as every other
   icon in this file. */
export function BreadcrumbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M8 48C8 44.6863 10.6863 42 14 42H32C35.3137 42 38 44.6863 38 48C38 51.3137 35.3137 54 32 54H14C10.6863 54 8 51.3137 8 48Z"
        fill="currentColor"
      />
      <path
        d="M58 48C58 44.6863 60.6863 42 64 42H82C85.3137 42 88 44.6863 88 48C88 51.3137 85.3137 54 82 54H64C60.6863 54 58 51.3137 58 48Z"
        fill="var(--brand-neutral-600)"
      />
      <path
        d="M50 43L46 53.5"
        stroke="var(--brand-neutral-600)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Traced from the user-provided Message.svg (96x96): the bell outline (#BFBFBF) is the
   fixed background shape -> --brand-neutral-600; the clapper and top clasp (#222222) are
   the notification "detail" marks -> currentColor, matching this file's two-tone convention. */
export function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M77.16 69.16L72 64V44C72 31.72 65.44 21.44 54 18.72V16C54 12.68 51.32 10 48 10C44.68 10 42 12.68 42 16V18.72C30.52 21.44 24 31.68 24 44V64L18.84 69.16C16.32 71.68 18.08 76 21.64 76H74.32C77.92 76 79.68 71.68 77.16 69.16ZM64 68H32V44C32 34.08 38.04 26 48 26C57.96 26 64 34.08 64 44V68Z"
        fill="var(--brand-neutral-600)"
      />
      <path d="M48 88C52.4 88 56 84.4 56 80H40C40 84.4 43.56 88 48 88Z" fill="currentColor" />
      <path
        d="M42 16C42 12.6863 44.6863 10 48 10C51.3137 10 54 12.6863 54 16V18.7H42V16Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Traced from the user-provided List.svg (96x96): the top bar and its leading circle
   (#222222) are the "active row" mark -> currentColor; the middle and bottom bars and
   circles (#BFBFBF) are the muted background rows -> --brand-neutral-600, matching this
   file's two-tone convention. */
export function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M32 24C32 21.7909 33.7909 20 36 20H80C82.2091 20 84 21.7909 84 24C84 26.2091 82.2091 28 80 28H36C33.7909 28 32 26.2091 32 24Z" fill="currentColor" />
      <circle cx="18" cy="24" r="6" fill="currentColor" />
      <path d="M32 48C32 45.7909 33.7909 44 36 44H80C82.2091 44 84 45.7909 84 48C84 50.2091 82.2091 52 80 52H36C33.7909 52 32 50.2091 32 48Z" fill="var(--brand-neutral-600)" />
      <circle cx="18" cy="48" r="6" fill="var(--brand-neutral-600)" />
      <path d="M32 72C32 69.7909 33.7909 68 36 68H80C82.2091 68 84 69.7909 84 72C84 74.2091 82.2091 76 80 76H36C33.7909 76 32 74.2091 32 72Z" fill="var(--brand-neutral-600)" />
      <circle cx="18" cy="72" r="6" fill="var(--brand-neutral-600)" />
    </svg>
  );
}

/* Traced from the user-provided Dialog.svg (96x96): the rounded card outline and its two
   text-line bars (#BFBFBF) are the fixed dialog-body mark -> --brand-neutral-600; the two
   bottom "button pill" shapes (#222222) are the active/detail marks -> currentColor,
   matching this file's two-tone convention. */
export function DialogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M72 12C80.8366 12 88 19.1634 88 28V68C88 76.6984 81.0587 83.776 72.4131 83.9951L72 84H24L23.5869 83.9951C15.0785 83.7795 8.2205 76.9215 8.00488 68.4131L8 68V28C8 19.1634 15.1634 12 24 12H72ZM24 20C19.5817 20 16 23.5817 16 28V68C16 72.4183 19.5817 76 24 76H72C76.4183 76 80 72.4183 80 68V28C80 23.5817 76.4183 20 72 20H24ZM61 45C63.2091 45 65 46.7909 65 49C65 51.2091 63.2091 53 61 53H27C24.7909 53 23 51.2091 23 49C23 46.7909 24.7909 45 27 45H61ZM49 29C51.2091 29 53 30.7909 53 33C53 35.2091 51.2091 37 49 37H27C24.7909 37 23 35.2091 23 33C23 30.7909 24.7909 29 27 29H49Z"
        fill="var(--brand-neutral-600)"
      />
      <path d="M34 66C34 63.7909 35.7909 62 38 62H48C50.2091 62 52 63.7909 52 66C52 68.2091 50.2091 70 48 70H38C35.7909 70 34 68.2091 34 66Z" fill="currentColor" />
      <path d="M56 66C56 63.7909 57.7909 62 60 62H70C72.2091 62 74 63.7909 74 66C74 68.2091 72.2091 70 70 70H60C57.7909 70 56 68.2091 56 66Z" fill="currentColor" />
    </svg>
  );
}

/* Traced from the user-provided Banner.svg (96x96): the rounded rect outline (#BFBFBF) is
   the fixed banner-body mark -> --brand-neutral-600; the text bar and dot (#222222) are the
   active/detail marks -> currentColor, matching this file's two-tone convention. */
export function BannerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M76.4131 20.0049C85.0587 20.224 92 27.3016 92 36V60C92 68.6984 85.0587 75.776 76.4131 75.9951L76 76H20C11.3016 76 4.22398 69.0587 4.00488 60.4131L4 60V36C4 27.1634 11.1634 20 20 20H76L76.4131 20.0049ZM20 28C15.5817 28 12 31.5817 12 36V60C12 64.4183 15.5817 68 20 68H76C80.4183 68 84 64.4183 84 60V36C84 31.5817 80.4183 28 76 28H20ZM72 52C74.2091 52 76 53.7909 76 56C76 58.2091 74.2091 60 72 60H38C35.7909 60 34 58.2091 34 56C34 53.7909 35.7909 52 38 52H72Z"
        fill="var(--brand-neutral-600)"
      />
      <path d="M34 40C34 37.7909 35.7909 36 38 36H60C62.2091 36 64 37.7909 64 40C64 42.2091 62.2091 44 60 44H38C35.7909 44 34 42.2091 34 40Z" fill="currentColor" />
      <circle cx="24" cy="40" r="6" fill="currentColor" />
    </svg>
  );
}

/* Traced from the user-provided Toast.svg (96x96): the rounded card outline and its two
   lower text-line bars (#BFBFBF) are the fixed toast-body mark -> --brand-neutral-600; the
   highlighted top bar (#222222) is the active/detail mark -> currentColor, matching this
   file's two-tone convention. */
export function ToastIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path
        d="M72 12C80.8366 12 88 19.1634 88 28V68C88 76.6984 81.0587 83.776 72.4131 83.9951L72 84H24L23.5869 83.9951C15.0785 83.7795 8.2205 76.9215 8.00488 68.4131L8 68V28C8 19.1634 15.1634 12 24 12H72ZM24 20C19.5817 20 16 23.5817 16 28V68C16 72.4183 19.5817 76 24 76H72C76.4183 76 80 72.4183 80 68V28C80 23.5817 76.4183 20 72 20H24ZM68 60C70.2091 60 72 61.7909 72 64C72 66.2091 70.2091 68 68 68H28C25.7909 68 24 66.2091 24 64C24 61.7909 25.7909 60 28 60H68ZM68 44C70.2091 44 72 45.7909 72 48C72 50.2091 70.2091 52 68 52H28C25.7909 52 24 50.2091 24 48C24 45.7909 25.7909 44 28 44H68Z"
        fill="var(--brand-neutral-600)"
      />
      <path d="M42 33C42 30.7909 43.7909 29 46 29H68C70.2091 29 72 30.7909 72 33V33C72 35.2091 70.2091 37 68 37H46C43.7909 37 42 35.2091 42 33V33Z" fill="currentColor" />
    </svg>
  );
}
