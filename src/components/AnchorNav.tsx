import { useEffect, useState } from 'react';
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
    <nav className="ds-anchor-nav" aria-label="On this page">
      <p className="ds-anchor-nav__title">On this page</p>
      <ul className="ds-anchor-nav__list" role="list">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`ds-anchor-nav__link${activeId === section.id ? ' ds-anchor-nav__link--active' : ''}`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
