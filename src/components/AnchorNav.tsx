import { useEffect, useState } from 'react';
import { docHeading } from '../i18n/docs';
import { useStrings } from '../i18n/strings';
import { useLocale } from '../locale';
import './AnchorNav.css';

export interface AnchorSection {
  id: string;
  label: string;
}

interface AnchorNavProps {
  sections: AnchorSection[];
}

export default function AnchorNav({ sections }: AnchorNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  // Labels are the English section titles, so they translate through the same table the
  // doc pages' SectionTitle headings use (i18n/docs.ts) — the nav and the page stay in sync.
  const locale = useLocale();
  const strings = useStrings().anchorNav;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="ds-anchor-nav" aria-label={strings.label}>
      <ul className="ds-anchor-nav__list" role="list">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`ds-anchor-nav__link${activeId === section.id ? ' ds-anchor-nav__link--active' : ''}`}
            >
              {docHeading(section.label, locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
