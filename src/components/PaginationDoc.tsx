import Pagination from './Pagination';
import Button from './Button';
import IconButton from './IconButton';
import { Input } from './Input';
import { ButtonIcon, IconButtonIcon, InputIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=174-27843';

interface PaginationDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function PaginationDoc({ onNavigate }: PaginationDocProps) {
  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Pagination</h1>
        <p className="ds-doc__lede">
          Pagination breaks a long result set into pages, letting a user jump between numbered
          pages, step forward or back one at a time, or go straight to a specific page.
        </p>
        <a
          className="ds-doc__figma-link ds-button ds-button--secondary ds-button--solid ds-button--md"
          href={FIGMA_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span className="icon ds-button__icon" aria-hidden="true">
            draw
          </span>
          <span className="ds-button__label">View in Figma</span>
        </a>
      </header>

      {/* ---------------------------------------------------------------- */}
      <section id="overview" className="ds-section">
        <h2 className="ds-section__title">Overview</h2>
        <p className="ds-section__desc">
          Use Pagination below a table or list once results span more than one page — it keeps
          the page count visible while giving direct access to the first, last, and current
          neighborhood of pages.
        </p>
        <div className="ds-preview">
          <Pagination currentPage={3} totalPages={10} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Numbered items sit between two nav controls; an optional page-size trigger and a
          go-to field follow on the trailing edge.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div className="ds-pagination ds-anatomy__demo" aria-hidden="true">
              <span className="ds-anatomy__part-relative">
                <IconButton
                  icon="chevron_left"
                  appearance="ghost"
                  size="md"
                  label="Previous page"
                  className="ds-pagination__nav"
                />
                <span className="ds-anatomy__badge">1</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <button type="button" className="ds-pagination__item">
                  2
                </button>
                <span className="ds-anatomy__badge">2</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <button type="button" className="ds-pagination__item ds-pagination__item--active">
                  3
                </button>
                <span className="ds-anatomy__badge">3</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <span className="ds-pagination__item ds-pagination__item--ellipsis" aria-hidden="true">
                  <span className="icon icon--sm" aria-hidden="true">
                    more_horiz
                  </span>
                </span>
                <span className="ds-anatomy__badge">4</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <button type="button" className="ds-pagination__item">
                  10
                </button>
                <span className="ds-anatomy__badge">5</span>
              </span>
              <span className="ds-anatomy__part-relative">
                <IconButton
                  icon="chevron_right"
                  appearance="ghost"
                  size="md"
                  label="Next page"
                  className="ds-pagination__nav"
                />
                <span className="ds-anatomy__badge">6</span>
              </span>
              <div className="ds-pagination__goto">
                <span className="ds-anatomy__part-relative">
                  <Button variant="primary" appearance="outline" size="md" trailingIcon="expand_more">
                    10 /page
                  </Button>
                  <span className="ds-anatomy__badge">7</span>
                </span>
                <span className="ds-anatomy__part-relative">
                  <span className="ds-pagination__goto-label">Go to</span>
                  <Input className="ds-pagination__goto-input" size="md" placeholder="" />
                  <span className="ds-anatomy__badge">8</span>
                </span>
              </div>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Previous</strong> — <span>steps back one page; disabled on the first page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Page item</strong> — <span>jumps directly to that page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Current item</strong> — <span>the active page, outlined and labeled in brand color</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Ellipsis</strong> — <span>collapses the pages between the visible window and the last page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Last page</strong> — <span>always reachable, regardless of total page count</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">6</span>
                <span>
                  <strong>Next</strong> — <span>steps forward one page; disabled on the last page</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">7</span>
                <span>
                  <strong>Page-size trigger</strong> — <span>opens a menu to change how many rows each page holds</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">8</span>
                <span>
                  <strong>Go to</strong> — <span>jumps to a page typed directly into the field; optional</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="variants" className="ds-section">
        <h2 className="ds-section__title">Variants</h2>
        <p className="ds-section__desc">
          Size scales every control together — Sm shows one fewer page before collapsing to an
          ellipsis, to fit its narrower footprint.
        </p>
        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Pagination size="md" currentPage={3} totalPages={10} />
                <span className="ds-variant-row__cell-label">Md · 32px items</span>
              </div>
              <div className="ds-variant-row__cell">
                <Pagination size="sm" currentPage={3} totalPages={8} />
                <span className="ds-variant-row__cell-label">Sm · 24px items</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          A page item carries one of three looks; the nav controls also disable at either end
          of the range.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td style={{ width: 280 }}>
                <button type="button" className="ds-pagination__item">
                  2
                </button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--text-body-primary-neutral)' }} />
                  <code>text-body-primary-neutral</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Current</td>
              <td style={{ width: 280 }}>
                <button type="button" className="ds-pagination__item ds-pagination__item--active">
                  3
                </button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-600)' }} />
                  <code>brand-primary-600</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Ellipsis</td>
              <td style={{ width: 280 }}>
                <span className="ds-pagination__item ds-pagination__item--ellipsis" aria-hidden="true">
                  <span className="icon icon--sm" aria-hidden="true">
                    more_horiz
                  </span>
                </span>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--text-body-tertiary-neutral)' }} />
                  <code>text-body-tertiary-neutral</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Nav disabled</td>
              <td style={{ width: 280 }}>
                <IconButton icon="chevron_left" appearance="ghost" size="md" label="Previous page" disabled />
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-icon-button-icon-primary-ghost-disabled)' }}
                  />
                  <code>interactive-icon-button-icon-primary-ghost-disabled</code>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Md and Sm share the same corner radius and token set; only item size and gap scale
          down together.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Token</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Md item size</th>
              <td>
                <code>--component-height-md</code>
              </td>
              <td>32px</td>
            </tr>
            <tr>
              <th scope="row">Sm item size</th>
              <td>
                <code>--component-height-xs</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Item corner radius</th>
              <td>—</td>
              <td>6px (no matching token; sits between --radius-sm/4px and --radius-md/8px)</td>
            </tr>
            <tr>
              <th scope="row">Md item gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Sm item gap</th>
              <td>
                <code>--space-component-gap-xs</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Go-to group gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Go-to group offset</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px, left margin from the last item</td>
            </tr>
            <tr>
              <th scope="row">Item border (current)</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px, all sides</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">Components that Pagination composes for its controls.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('icon-button')}
          >
            <IconButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Icon Button</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('button')}
          >
            <ButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Button</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('input')}
          >
            <InputIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Input</span>
          </button>
        </div>
      </section>
    </div>
  );
}
