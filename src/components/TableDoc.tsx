import { useEffect, useRef, useState } from 'react';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectHeaderCell,
  TableRow,
  TableCell,
  TableSelectCell,
  type TableSize,
} from './Table';
import { Badge } from './Badge';
import Button from './Button';
import { Checkbox } from './Checkbox';
import { FilterChip } from './Chip';
import Dropdown, { DropdownOption } from './Dropdown';
import { Input } from './Input';
import { DatePicker } from './DatePicker';
import IconButton from './IconButton';
import { Toggle } from './Toggle';
import { Tag } from './Tag';
import Pagination from './Pagination';
import { BadgeIcon, ButtonIcon, CheckboxIcon } from './icons';
import './ButtonDoc.css';
import './Table.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=152-3908';

/** Provided illustration asset — fills are the asset's own literal colors, not design tokens. */
function EmptyStateIllustration() {
  return (
    <svg
      className="ds-table-empty__illustration"
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M60 100C84.8528 100 105 96.4177 105 91.9988C105 87.5798 84.8528 83.9976 60 83.9976C35.1472 83.9976 15 87.5798 15 91.9988C15 96.4177 35.1472 100 60 100Z"
        fill="#F5F5F7"
        fillOpacity="0.8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M94.9994 66.0315L79.5603 47.258C78.8195 46.3743 77.7367 45.8394 76.5964 45.8394H43.4017C42.262 45.8394 41.1792 46.3743 40.4384 47.258L25 66.0315V75.8394H95V66.0315H94.9994Z"
        fill="#7D73F2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.6339 19.9976H82.3661C83.0647 19.9976 83.7346 20.272 84.2285 20.7605C84.7225 21.2491 85 21.9117 85 22.6025V83.3926C85 84.0835 84.7225 84.746 84.2285 85.2346C83.7346 85.7231 83.0647 85.9976 82.3661 85.9976H37.6339C36.9353 85.9976 36.2654 85.7231 35.7715 85.2346C35.2775 84.746 35 84.0835 35 83.3926V22.6025C35 21.9117 35.2775 21.2491 35.7715 20.7605C36.2654 20.272 36.9353 19.9976 37.6339 19.9976V19.9976Z"
        fill="#F7F6FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.7908 26.9976H76.2092C76.5515 26.9976 76.8798 27.136 77.1218 27.3825C77.3639 27.629 77.4998 27.9632 77.4998 28.3118V44.7114C77.4998 45.06 77.3639 45.3943 77.1218 45.6407C76.8798 45.8872 76.5515 46.0256 76.2092 46.0256H43.7908C43.4485 46.0256 43.1202 45.8872 42.8782 45.6407C42.6361 45.3943 42.5002 45.06 42.5002 44.7114V28.3118C42.5002 27.9632 42.6361 27.629 42.8782 27.3825C43.1202 27.136 43.4485 26.9976 43.7908 26.9976ZM43.9599 53.1599H76.0401C76.4273 53.1599 76.7986 53.3165 77.0723 53.5953C77.3461 53.8741 77.4998 54.2521 77.4998 54.6463C77.4998 55.0406 77.3461 55.4186 77.0723 55.6974C76.7986 55.9761 76.4273 56.1327 76.0401 56.1327H43.9599C43.5727 56.1327 43.2014 55.9761 42.9277 55.6974C42.6539 55.4186 42.5002 55.0406 42.5002 54.6463C42.5002 54.2521 42.6539 53.8741 42.9277 53.5953C43.2014 53.3165 43.5727 53.1599 43.9599 53.1599ZM43.9599 60.8896H76.0401C76.4274 60.8896 76.7987 61.0462 77.0725 61.325C77.3463 61.6039 77.5002 61.982 77.5002 62.3763C77.5002 62.7706 77.3463 63.1488 77.0725 63.4276C76.7987 63.7064 76.4274 63.863 76.0401 63.863H43.9599C43.5726 63.863 43.2013 63.7064 42.9275 63.4276C42.6537 63.1488 42.4998 62.7706 42.4998 62.3763C42.4998 61.982 42.6537 61.6039 42.9275 61.325C43.2013 61.0462 43.5726 60.8896 43.9599 60.8896ZM94.8574 89.4754C94.3573 91.4934 92.6007 92.9976 90.5112 92.9976H29.4888C27.3993 92.9976 25.6427 91.4928 25.1433 89.4754C25.048 89.0909 24.9999 88.6958 25 88.2992V66.2418H41.9833C43.8592 66.2418 45.3711 67.8504 45.3711 69.8034V69.8296C45.3711 71.7819 46.9005 73.3584 48.7764 73.3584H71.2236C73.0995 73.3584 74.6289 71.7675 74.6289 69.8145V69.8066C74.6289 67.8537 76.1408 66.2411 78.0167 66.2411H95V88.2998C95 88.7053 94.9503 89.0989 94.8574 89.4754Z"
        fill="#D4D0FB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M95.993 22.0757L92.0263 23.8329C91.9244 23.8781 91.8134 23.8896 91.706 23.866C91.5987 23.8424 91.4993 23.7847 91.4194 23.6995C91.3395 23.6143 91.2823 23.5051 91.2544 23.3844C91.2264 23.2637 91.2289 23.1365 91.2614 23.0173L92.3864 18.9015C90.8828 16.9493 90 14.5688 90 12C90 5.37238 95.8763 0 103.126 0C110.373 0 116.25 5.37238 116.25 12C116.25 18.6276 110.374 24 103.125 24C100.495 24 98.0467 23.2931 95.993 22.0757Z"
        fill="#FFD591"
      />
      <rect x="102.25" y="11" width="2.625" height="3" fill="#1F11BB" />
      <ellipse cx="108.463" cy="12.6" rx="1.4" ry="1.6" fill="#1F11BB" />
      <path d="M98.5312 11L100.062 14H97L98.5312 11Z" fill="#1F11BB" />
    </svg>
  );
}

const SIZE_TABS: TableSize[] = ['sm', 'md', 'lg', 'xl'];

type StyleTab = 'header' | 'cell';
const STYLE_TABS: { id: StyleTab; label: string }[] = [
  { id: 'header', label: 'Header' },
  { id: 'cell', label: 'Cell' },
];

type ExampleTab = 'default' | 'empty';
const EXAMPLE_TABS: { id: ExampleTab; label: string }[] = [
  { id: 'default', label: 'Default' },
  { id: 'empty', label: 'Empty' },
];

interface ExampleRow {
  sku: string;
  brand: string;
  name: string;
  category: string;
  originalPrice: string;
  sellingPrice: string;
  merchant: string;
  discount: string;
}

const EXAMPLE_ROWS: ExampleRow[] = [
  { sku: 'SKU-100234', brand: 'Nestlé', name: 'Nescafé Gold Blend 200g', category: 'Beverages', originalPrice: '$144', sellingPrice: '$138', merchant: 'Merchant A', discount: '8%' },
  { sku: 'SKU-100235', brand: 'Unilever', name: 'Dove Body Wash 500ml', category: 'Personal Care', originalPrice: '$89', sellingPrice: '$79', merchant: 'Merchant A', discount: '12%' },
  { sku: 'SKU-100236', brand: 'P&G', name: 'Pampers Diapers Size 3', category: 'Baby Care', originalPrice: '$210', sellingPrice: '$195', merchant: 'Merchant B', discount: '5%' },
  { sku: 'SKU-100237', brand: 'Nestlé', name: 'KitKat 4 Finger 41.5g', category: 'Snacks', originalPrice: '$18', sellingPrice: '$16', merchant: 'Merchant B', discount: '15%' },
  { sku: 'SKU-100238', brand: 'Colgate', name: 'Colgate Total Toothpaste 150g', category: 'Oral Care', originalPrice: '$32', sellingPrice: '$28', merchant: 'Merchant A', discount: '10%' },
  { sku: 'SKU-100239', brand: 'Kellogg’s', name: 'Corn Flakes Original 500g', category: 'Breakfast & Cereal', originalPrice: '$45', sellingPrice: '$40', merchant: 'Merchant C', discount: '11%' },
  { sku: 'SKU-100240', brand: 'Johnson & Johnson', name: 'Baby Shampoo No More Tears 300ml', category: 'Health & Wellness', originalPrice: '$56', sellingPrice: '$52', merchant: 'Merchant B', discount: '7%' },
  { sku: 'SKU-100241', brand: 'Coca-Cola', name: 'Coca-Cola Classic 1.5L', category: 'Soft Drinks', originalPrice: '$28', sellingPrice: '$25', merchant: 'Merchant C', discount: '11%' },
  { sku: 'SKU-100242', brand: 'L’Oréal', name: 'Elvive Shampoo 400ml', category: 'Beauty & Care', originalPrice: '$68', sellingPrice: '$59', merchant: 'Merchant A', discount: '13%' },
  { sku: 'SKU-100243', brand: 'Nestlé', name: 'Milo Chocolate Malt Drink 400g', category: 'Dairy & Nutrition', originalPrice: '$52', sellingPrice: '$47', merchant: 'Merchant B', discount: '10%' },
];

const CATEGORY_FILTER_OPTIONS = Array.from(new Set(EXAMPLE_ROWS.map((row) => row.category)));
const STATUS_FILTER_OPTIONS = ['Success', 'Pending', 'Rejected'];

interface OverviewRow {
  name: string;
  status: 'Success' | 'Pending' | 'Rejected';
}

const OVERVIEW_ROWS: OverviewRow[] = [
  { name: 'Ava Chen', status: 'Success' },
  { name: 'Marcus Reyes', status: 'Pending' },
  { name: 'Priya Nair', status: 'Rejected' },
];

const STATUS_COLOR: Record<OverviewRow['status'], 'green' | 'orange' | 'red'> = {
  Success: 'green',
  Pending: 'orange',
  Rejected: 'red',
};

interface TableDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function TableDoc({ onNavigate }: TableDocProps) {
  const [activeSizeTab, setActiveSizeTab] = useState<TableSize>('md');
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('header');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('default');
  const [checkedRows, setCheckedRows] = useState<Record<string, boolean>>({
    'Ava Chen': true,
  });
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [exampleCheckedRows, setExampleCheckedRows] = useState<Record<string, boolean>>({});
  const [openFilter, setOpenFilter] = useState<'category' | 'status' | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<number[]>([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const exampleScrollRef = useRef<HTMLDivElement>(null);
  const [freezeShadow, setFreezeShadow] = useState({
    checkboxWidth: 0,
    actionWidth: 0,
    atStart: true,
    atEnd: true,
  });

  useEffect(() => {
    if (!openFilter) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!filtersRef.current?.contains(e.target as Node)) setOpenFilter(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openFilter]);

  useEffect(() => {
    const el = exampleScrollRef.current;
    if (!el) return;

    const measure = () => {
      const checkboxCell = el.querySelector<HTMLElement>('.ds-datatable__select-cell');
      const actionCell = el.querySelector<HTMLElement>('.ds-table-example__action-cell');
      setFreezeShadow({
        checkboxWidth: checkboxCell?.offsetWidth ?? 0,
        actionWidth: actionCell?.offsetWidth ?? 0,
        atStart: el.scrollLeft <= 0,
        atEnd: Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth,
      });
    };

    measure();

    const handleScroll = () => {
      setFreezeShadow((prev) => ({
        ...prev,
        atStart: el.scrollLeft <= 0,
        atEnd: Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth,
      }));
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);
    el.addEventListener('scroll', handleScroll);

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener('scroll', handleScroll);
    };
  }, [activeExampleTab]);

  useEffect(() => {
    if (openFilter !== 'category') setCategorySearch('');
  }, [openFilter]);

  const toggleFilterOption = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
  ) =>
    setter((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));

  const filteredCategoryOptions = CATEGORY_FILTER_OPTIONS.map((label, index) => ({ label, index })).filter(
    ({ label }) => label.toLowerCase().includes(categorySearch.toLowerCase()),
  );

  const toggleRow = (name: string) =>
    setCheckedRows((prev) => ({ ...prev, [name]: !prev[name] }));

  const toggleExampleRow = (sku: string) =>
    setExampleCheckedRows((prev) => ({ ...prev, [sku]: !prev[sku] }));

  const allChecked = OVERVIEW_ROWS.every((row) => checkedRows[row.name]);
  const someChecked = OVERVIEW_ROWS.some((row) => checkedRows[row.name]);

  const allExampleChecked = EXAMPLE_ROWS.every((row) => exampleCheckedRows[row.sku]);
  const someExampleChecked = EXAMPLE_ROWS.some((row) => exampleCheckedRows[row.sku]);

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Table</h1>
        <p className="ds-doc__lede">
          A Table lays out structured data in rows and columns — with optional per-row
          selection, sortable and annotated headers, and cells that host real controls like
          Checkbox, Badge, and Button.
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
          Reach for a Table when data needs to be scanned and compared row by row — pair it
          with Checkbox for bulk selection, Badge to flag status, and Button for row-level
          actions.
        </p>
        <div className="ds-preview">
          <Table size="md">
            <TableHeader>
              <TableSelectHeaderCell
                checked={allChecked}
                indeterminate={someChecked && !allChecked}
                onChange={(checked) =>
                  setCheckedRows(
                    Object.fromEntries(OVERVIEW_ROWS.map((row) => [row.name, checked])),
                  )
                }
              />
              <TableHeaderCell sortable sortDirection={sortDirection} onSort={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}>
                Name
              </TableHeaderCell>
              <TableHeaderCell info align="center">
                Status
              </TableHeaderCell>
              <TableHeaderCell align="center">Action</TableHeaderCell>
            </TableHeader>
            {OVERVIEW_ROWS.map((row) => (
              <TableRow key={row.name} state={checkedRows[row.name] ? 'selected' : 'default'}>
                <TableSelectCell checked={!!checkedRows[row.name]} onChange={() => toggleRow(row.name)} />
                <TableCell>{row.name}</TableCell>
                <TableCell align="center">
                  <Badge label={row.status} color={STATUS_COLOR[row.status]} />
                </TableCell>
                <TableCell align="center">
                  <Button variant="primary" appearance="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A header row of labeled columns sits above any number of data rows — the select
          column and its per-row checkboxes are optional.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <Table size="md" className="ds-anatomy__demo">
              <thead>
                <tr className="ds-datatable__header-row">
                  <th className="ds-datatable__header-cell ds-datatable__select-cell ds-anatomy__part-relative" scope="col">
                    <Checkbox decorative checked />
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
                  </th>
                  <th className="ds-datatable__header-cell ds-anatomy__part-relative" scope="col">
                    <span className="ds-datatable__header-content">
                      Name
                      <span className="icon icon--sm ds-datatable__header-icon" aria-hidden="true">
                        unfold_more
                      </span>
                    </span>
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">2</span>
                  </th>
                </tr>
              </thead>
              <tr className="ds-datatable__row">
                <td className="ds-datatable__cell ds-datatable__select-cell ds-anatomy__part-relative">
                  <Checkbox decorative checked />
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">4</span>
                </td>
                <td className="ds-datatable__cell ds-anatomy__part-relative">
                  Row value
                  <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
                </td>
              </tr>
            </Table>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Select header cell</strong> —{' '}
                  <span>optional header checkbox that selects/deselects every row</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Header cell</strong> —{' '}
                  <span>column label with an optional info icon and/or sort control</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Cell</strong> — <span>a single data value; can also host a Badge or Button</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Row</strong> —{' '}
                  <span>groups related cells; carries default, hover, selected, highlighted, and disabled states</span>
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
          Size controls header and row height — Md is the default, Sm suits dense data grids
          and Xl gives each row room for secondary text or larger cell content.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Table style groups">
          {STYLE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeStyleTab === tab.id}
              className={`ds-line-tab${activeStyleTab === tab.id ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveStyleTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeStyleTab === 'header' ? (
            <div className="ds-variant-group">
              <p className="ds-section__desc">
                A header cell is either a plain <code>Label</code> or a <code>Checkbox</code> for
                bulk selection — both share the same background and label styling.
              </p>
              <div className="ds-variant-row">
                <div className="ds-variant-row__cell">
                  <Table size="sm">
                    <TableHeader>
                      <TableHeaderCell>Label</TableHeaderCell>
                    </TableHeader>
                  </Table>
                  <span className="ds-variant-row__cell-label">Label</span>
                </div>
                <div className="ds-variant-row__cell">
                  <Table size="sm">
                    <TableHeader>
                      <TableSelectHeaderCell />
                    </TableHeader>
                  </Table>
                  <span className="ds-variant-row__cell-label">Checkbox</span>
                </div>
              </div>
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
                    <th scope="row">Background</th>
                    <td>
                      <code>--brand-primary-50</code>
                    </td>
                    <td>#f7f6ff</td>
                  </tr>
                  <tr>
                    <th scope="row">Label color</th>
                    <td>
                      <code>--text-body-secondary-neutral</code>
                    </td>
                    <td>#5c5c5c</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ds-variant-group">
              <p className="ds-section__desc">
                A cell's content style is just what you place inside it — every pattern below
                reuses an existing component.
              </p>
              <div className="ds-preview">
                <Table size="md">
                  <TableHeader>
                    <TableHeaderCell>Style</TableHeaderCell>
                    <TableHeaderCell>Preview</TableHeaderCell>
                  </TableHeader>
                  <TableRow>
                    <TableCell>Checkbox</TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell>Label</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Text-button</TableCell>
                    <TableCell>
                      <button type="button" className="ds-datatable__cell-link">
                        Label
                      </button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Value</TableCell>
                    <TableCell>000.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Input</TableCell>
                    <TableCell>
                      <Input
                        size="md"
                        placeholder="Placeholder"
                        className="ds-table-content-style__input"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date-picker</TableCell>
                    <TableCell>
                      <DatePicker size="md" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Input-number</TableCell>
                    <TableCell>
                      <Input size="md" type="number" placeholder="0" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Button</TableCell>
                    <TableCell>
                      <Button variant="primary" appearance="ghost" size="sm">
                        Label
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Icon-button</TableCell>
                    <TableCell>
                      <IconButton icon="close" appearance="ghost" size="sm" label="Close" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Badge</TableCell>
                    <TableCell>
                      <Badge label="badge" color="green" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tag</TableCell>
                    <TableCell>
                      <Tag label="tag" color="orange" style="outline" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Toggle</TableCell>
                    <TableCell>
                      <Toggle size="sm" checked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Thumbnail</TableCell>
                    <TableCell>
                      <span className="ds-datatable__cell-thumbnail">
                        <span className="icon icon--sm" aria-hidden="true">
                          image
                        </span>
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Upload</TableCell>
                    <TableCell>
                      <span className="ds-datatable__cell-upload">
                        <span className="icon icon--sm" aria-hidden="true">
                          add
                        </span>
                        <span>Upload</span>
                      </span>
                    </TableCell>
                  </TableRow>
                </Table>
              </div>
            </div>
          )}
        </div>

        <span className="ds-variant-group__label ds-variant-tabs-label">Size</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Table size groups">
          {SIZE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeSizeTab === tab}
              className={`ds-line-tab${activeSizeTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveSizeTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-preview">
              <Table size={activeSizeTab}>
                <TableHeader>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell align="center">Status</TableHeaderCell>
                </TableHeader>
                <TableRow>
                  <TableCell>Ava Chen</TableCell>
                  <TableCell align="center">
                    <Badge label="Success" color="green" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marcus Reyes</TableCell>
                  <TableCell align="center">
                    <Badge label="Pending" color="orange" />
                  </TableCell>
                </TableRow>
              </Table>
            </div>
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Token</th>
                  <th>Height</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Sm</th>
                  <td>
                    <code>--component-height-lg</code>
                  </td>
                  <td>40px</td>
                </tr>
                <tr>
                  <th scope="row">Md</th>
                  <td>
                    <code>--component-height-xl</code>
                  </td>
                  <td>48px</td>
                </tr>
                <tr>
                  <th scope="row">Lg</th>
                  <td>
                    <code>--component-height-3xl</code>
                  </td>
                  <td>64px</td>
                </tr>
                <tr>
                  <th scope="row">Xl</th>
                  <td>
                    <code>--component-height-5xl</code>
                  </td>
                  <td>96px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <span className="ds-variant-group__label ds-variant-tabs-label">Example</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Table example states">
          {EXAMPLE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeExampleTab === tab.id}
              className={`ds-line-tab${activeExampleTab === tab.id ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveExampleTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <p className="ds-section__desc">
              A full table implementation — toolbar, results count, data, and pagination — built
              entirely from existing components.
            </p>
            <div className="ds-preview">
              <div className="ds-table-example">
                <div className="ds-table-toolbar">
                  <Input
                    className="ds-table-toolbar__search"
                    size="md"
                    placeholder="Search SKU ID, brand, or product name"
                  />
                  <div className="ds-table-toolbar__filters" ref={filtersRef}>
                    <div className="ds-table-filter">
                      <FilterChip
                        label="Category"
                        selected={openFilter === 'category'}
                        onClick={() =>
                          setOpenFilter((f) => (f === 'category' ? null : 'category'))
                        }
                      />
                      {openFilter === 'category' && (
                        <div className="ds-dropdown ds-table-filter__panel" role="listbox">
                          <div className="ds-dropdown__searchbar-row">
                            <div className="ds-dropdown__searchbar">
                              <span className="icon icon--sm" aria-hidden="true">
                                search
                              </span>
                              <input
                                className="ds-dropdown__searchbar-input"
                                type="text"
                                placeholder="Search category"
                                value={categorySearch}
                                onChange={(e) => setCategorySearch(e.target.value)}
                                autoFocus
                              />
                            </div>
                          </div>
                          <div className="ds-dropdown__options">
                            {filteredCategoryOptions.length === 0 ? (
                              <div className="ds-dropdown__empty">No matches</div>
                            ) : (
                              filteredCategoryOptions.map(({ label, index }) => (
                                <DropdownOption
                                  key={label}
                                  label={label}
                                  style="multi"
                                  state={categoryFilter.includes(index) ? 'selected' : 'default'}
                                  onClick={() => toggleFilterOption(setCategoryFilter, index)}
                                />
                              ))
                            )}
                          </div>
                          <div className="ds-dropdown__footer">
                            <Button
                              variant="primary"
                              appearance="ghost"
                              size="sm"
                              onClick={() => setCategoryFilter([])}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="primary"
                              appearance="solid"
                              size="sm"
                              onClick={() => setOpenFilter(null)}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="ds-table-filter">
                      <FilterChip
                        label="Status"
                        selected={openFilter === 'status'}
                        onClick={() => setOpenFilter((f) => (f === 'status' ? null : 'status'))}
                      />
                      {openFilter === 'status' && (
                        <Dropdown
                          className="ds-table-filter__panel"
                          style="single"
                          options={STATUS_FILTER_OPTIONS}
                          selectedIndices={statusFilter !== null ? [statusFilter] : []}
                          onOptionClick={(i) => setStatusFilter((prev) => (prev === i ? null : i))}
                          onReset={() => setStatusFilter(null)}
                          onApply={() => setOpenFilter(null)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="ds-table-toolbar__actions">
                    <Button variant="primary" appearance="ghost" size="md">
                      Reset
                    </Button>
                  </div>
                </div>

                <div className="ds-table-results">
                  <span className="ds-table-results__count">
                    {activeExampleTab === 'default' ? '1–10 of 10 results' : '0 results'}
                  </span>
                  <div className="ds-table-results__actions">
                    <span className="ds-table-results__updated">Last Updated 2026-04-28 09:15</span>
                    <Button variant="primary" appearance="outline" size="md">
                      Refresh
                    </Button>
                    <Button variant="primary" appearance="outline" size="md">
                      Export
                    </Button>
                  </div>
                </div>

                <div className="ds-table-example__scroll" ref={exampleScrollRef}>
                  <div className="ds-table-example__frame">
                  <div
                    className="ds-table-example__freeze-shadow ds-table-example__freeze-shadow--left"
                    style={{ left: freezeShadow.checkboxWidth, opacity: freezeShadow.atStart ? 0 : 1 }}
                    aria-hidden="true"
                  />
                  <Table size="md">
                    <TableHeader>
                      <TableSelectHeaderCell
                        checked={allExampleChecked}
                        indeterminate={someExampleChecked && !allExampleChecked}
                        onChange={(checked) =>
                          setExampleCheckedRows(
                            Object.fromEntries(EXAMPLE_ROWS.map((row) => [row.sku, checked])),
                          )
                        }
                      />
                      <TableHeaderCell width={88}>Image</TableHeaderCell>
                      <TableHeaderCell width={140} info>SKU ID</TableHeaderCell>
                      <TableHeaderCell width={140} info>Brand</TableHeaderCell>
                      <TableHeaderCell width={320}>SKU Name</TableHeaderCell>
                      <TableHeaderCell width={140}>Category</TableHeaderCell>
                      <TableHeaderCell width={100} align="center">Original Price</TableHeaderCell>
                      <TableHeaderCell width={100} align="center">Selling Price</TableHeaderCell>
                      <TableHeaderCell width={110}>Merchant</TableHeaderCell>
                      <TableHeaderCell width={90} align="center">Discount</TableHeaderCell>
                      <TableHeaderCell align="center" className="ds-table-example__action-cell">
                        Action
                      </TableHeaderCell>
                    </TableHeader>
                    {activeExampleTab === 'default' &&
                      EXAMPLE_ROWS.map((row) => (
                        <TableRow
                          key={row.sku}
                          state={exampleCheckedRows[row.sku] ? 'selected' : 'default'}
                        >
                          <TableSelectCell
                            checked={!!exampleCheckedRows[row.sku]}
                            onChange={() => toggleExampleRow(row.sku)}
                          />
                          <TableCell>
                            <span className="ds-datatable__cell-thumbnail">
                              <span className="icon icon--sm" aria-hidden="true">
                                image
                              </span>
                            </span>
                          </TableCell>
                          <TableCell>{row.sku}</TableCell>
                          <TableCell>{row.brand}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell align="center">{row.originalPrice}</TableCell>
                          <TableCell align="center">{row.sellingPrice}</TableCell>
                          <TableCell>{row.merchant}</TableCell>
                          <TableCell align="center">{row.discount}</TableCell>
                          <TableCell align="center" className="ds-table-example__action-cell">
                            <div className="ds-table-example__action-buttons">
                              <Button variant="primary" appearance="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="danger" appearance="ghost" size="sm">
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </Table>
                  <div
                    className="ds-table-example__freeze-shadow ds-table-example__freeze-shadow--right"
                    style={{ right: freezeShadow.actionWidth, opacity: freezeShadow.atEnd ? 0 : 1 }}
                    aria-hidden="true"
                  />
                  </div>

                  {activeExampleTab === 'empty' && (
                    <div className="ds-table-empty">
                      <EmptyStateIllustration />
                      <p className="ds-table-empty__title">No Record</p>
                      <p className="ds-table-empty__desc">
                        No results match your search or filters. Try adjusting them to find what
                        you're looking for.
                      </p>
                      <Button variant="primary" appearance="solid" size="sm">
                        Reset filters
                      </Button>
                    </div>
                  )}
                </div>

                {activeExampleTab === 'default' && (
                  <div className="ds-table-example__pagination">
                    <Pagination currentPage={1} totalPages={10} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Every row carries one of five states — hover and selected reuse the same purple
          tints as the rest of the system; highlighted uses a flagged one-off value with no
          matching token.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Background</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td>
                <Table size="sm">
                  <TableRow>
                    <TableCell>Row value</TableCell>
                  </TableRow>
                </Table>
              </td>
              <td>
                <code>global-background-surface</code>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td>
                <Table size="sm">
                  <TableRow state="hover">
                    <TableCell>Row value</TableCell>
                  </TableRow>
                </Table>
              </td>
              <td>
                <code>brand-primary-50</code>
              </td>
            </tr>
            <tr>
              <td>Selected</td>
              <td>
                <Table size="sm">
                  <TableRow state="selected">
                    <TableCell>Row value</TableCell>
                  </TableRow>
                </Table>
              </td>
              <td>
                <code>brand-primary-75</code>
              </td>
            </tr>
            <tr>
              <td>Highlighted</td>
              <td>
                <Table size="sm">
                  <TableRow state="highlighted">
                    <TableCell>Row value</TableCell>
                  </TableRow>
                </Table>
              </td>
              <td>
                <code>#fffbf2</code> <span className="ds-variant-note">(unmatched)</span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td>
                <Table size="sm">
                  <TableRow state="disabled">
                    <TableCell>Row value</TableCell>
                  </TableRow>
                </Table>
              </td>
              <td>
                <code>brand-neutral-100</code>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="layout-spacing" className="ds-section">
        <h2 className="ds-section__title">Layout &amp; Spacing</h2>
        <p className="ds-section__desc">
          Row/header height is the only size-dependent measurement — every other spacing
          value below is shared across all four sizes.
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
              <th scope="row">Row height (Sm)</th>
              <td>
                <code>--component-height-lg</code>
              </td>
              <td>40px</td>
            </tr>
            <tr>
              <th scope="row">Row height (Md)</th>
              <td>
                <code>--component-height-xl</code>
              </td>
              <td>48px</td>
            </tr>
            <tr>
              <th scope="row">Row height (Lg)</th>
              <td>
                <code>--component-height-3xl</code>
              </td>
              <td>64px</td>
            </tr>
            <tr>
              <th scope="row">Row height (Xl)</th>
              <td>
                <code>--component-height-5xl</code>
              </td>
              <td>96px</td>
            </tr>
            <tr>
              <th scope="row">Cell padding</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Header ↔ icon gap</th>
              <td>
                <code>--space-component-gap-xs</code>
              </td>
              <td>4px</td>
            </tr>
            <tr>
              <th scope="row">Row divider</th>
              <td>
                <code>--global-divider-neutral-light</code>
              </td>
              <td>1px solid #f4f4f4</td>
            </tr>
            <tr>
              <th scope="row">Cell type</th>
              <td>
                <code>--typography-sm</code>
              </td>
              <td>14px / 20px</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Component</h2>
        <p className="ds-section__desc">
          Components commonly embedded inside Table's own cells.
        </p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('checkbox')}
          >
            <CheckboxIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Checkbox</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('badge')}
          >
            <BadgeIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Badge</span>
          </button>
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('button')}
          >
            <ButtonIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Button</span>
          </button>
        </div>
      </section>
    </div>
  );
}
