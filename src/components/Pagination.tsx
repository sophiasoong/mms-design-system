import Button from './Button';
import IconButton from './IconButton';
import { Input } from './Input';
import './Pagination.css';

export type PaginationSize = 'md' | 'sm';

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  size?: PaginationSize;
  pageSizeLabel?: string;
  onPageSizeClick?: () => void;
  showGoTo?: boolean;
  className?: string;
}

function getPageItems(current: number, total: number, siblingCount: number): (number | 'ellipsis')[] {
  const windowStart = Math.max(1, current - siblingCount);
  const windowEnd = Math.min(total, current + siblingCount);
  const pages = new Set<number>([1, total]);
  for (let page = windowStart; page <= windowEnd; page += 1) pages.add(page);

  const sorted = [...pages].sort((a, b) => a - b);
  const items: (number | 'ellipsis')[] = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) items.push('ellipsis');
    items.push(page);
    previous = page;
  }
  return items;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  size = 'md',
  pageSizeLabel = '10 /page',
  onPageSizeClick,
  showGoTo = true,
  className,
}: PaginationProps) {
  const isSm = size === 'sm';
  const controlSize = isSm ? 'sm' : 'md';
  const items = getPageItems(currentPage, totalPages, isSm ? 1 : 2);

  const classes = ['ds-pagination', `ds-pagination--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <IconButton
        icon="chevron_left"
        appearance="ghost"
        size={controlSize}
        label="Previous page"
        className="ds-pagination__nav"
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
      />
      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="ds-pagination__item ds-pagination__item--ellipsis"
            aria-hidden="true"
          >
            <span className="icon icon--sm" aria-hidden="true">
              more_horiz
            </span>
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`ds-pagination__item${item === currentPage ? ' ds-pagination__item--active' : ''}`}
            aria-current={item === currentPage ? 'page' : undefined}
            onClick={() => onPageChange?.(item)}
          >
            {item}
          </button>
        ),
      )}
      <IconButton
        icon="chevron_right"
        appearance="ghost"
        size={controlSize}
        label="Next page"
        className="ds-pagination__nav"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
      />
      <div className="ds-pagination__goto">
        <Button
          variant="primary"
          appearance="outline"
          size={controlSize}
          trailingIcon="expand_more"
          onClick={onPageSizeClick}
        >
          {pageSizeLabel}
        </Button>
        {showGoTo && (
          <>
            <span className="ds-pagination__goto-label">Go to</span>
            <Input className="ds-pagination__goto-input" size="md" placeholder="" />
          </>
        )}
      </div>
    </div>
  );
}
