import { useState } from 'react';
import Banner, { type BannerState } from './Banner';
import Button from './Button';
import IconButton from './IconButton';
import Modal from './Modal';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableSelectHeaderCell,
  TableSelectCell,
} from './Table';
import { Searchbar } from './Searchbar';
import { FilterChip } from './Chip';
import { Tag } from './Tag';
import { Badge, type BadgeColor } from './Badge';
import Breadcrumb, { BreadcrumbItem, BreadcrumbSeparator } from './Breadcrumb';
import Pagination from './Pagination';
import { ButtonIcon, IconButtonIcon, FormIcon } from './icons';
import './ButtonDoc.css';
import './BannerDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=192-35114';

const VARIANT_TABS = ['Primary', 'Info', 'Warning', 'Danger'] as const;
type VariantTab = (typeof VARIANT_TABS)[number];

const STATE_BY_TAB: Record<VariantTab, BannerState> = {
  Primary: 'primary',
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
};

const EXAMPLE_TABS = ['Overview page', 'Modal'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

interface ExampleSkuRow {
  sku: string;
  brand: string;
  name: string;
  category: string;
  status: 'Excluded' | 'Joined';
  originalPrice: string;
  sellingPrice: string;
  avgPsp: string;
  pppPrice: string;
  costBearer: string;
  discountRate: string;
}

/** Backs both Example compositions below (Figma nodes 1893-123689 "Overview page" and
 * 1893-127337 "Modal") — the same SKU-pricing-table column shape TabDoc.tsx's own
 * EXAMPLE_TABLE_ROWS uses for its "Confirm SKU and Lock Price" reference, kept as its own
 * copy here rather than imported, in the same spirit as this codebase's doc-CSS-stays-scoped
 * convention. */
const EXAMPLE_SKU_ROWS: ExampleSkuRow[] = [
  {
    sku: 'SKU-100001',
    brand: 'Nestlé',
    name: 'Nescafé Gold Blend 200g',
    category: 'Beverages',
    status: 'Joined',
    originalPrice: '$144',
    sellingPrice: '$138',
    avgPsp: '$127',
    pppPrice: '$121',
    costBearer: 'Merchant',
    discountRate: '8%',
  },
  {
    sku: 'SKU-100002',
    brand: 'Nestlé',
    name: 'Milo Activ-Go 400g',
    category: 'Beverages',
    status: 'Excluded',
    originalPrice: '$68',
    sellingPrice: '$65',
    avgPsp: '$60',
    pppPrice: '$57',
    costBearer: 'Platform',
    discountRate: '10%',
  },
  {
    sku: 'SKU-100003',
    brand: "Kellogg's",
    name: 'Corn Flakes 500g',
    category: 'Breakfast',
    status: 'Joined',
    originalPrice: '$52',
    sellingPrice: '$49',
    avgPsp: '$46',
    pppPrice: '$44',
    costBearer: 'Merchant',
    discountRate: '6%',
  },
  {
    sku: 'SKU-100004',
    brand: 'Lipton',
    name: 'Yellow Label Tea 100s',
    category: 'Beverages',
    status: 'Excluded',
    originalPrice: '$36',
    sellingPrice: '$34',
    avgPsp: '$31',
    pppPrice: '$29',
    costBearer: 'Platform',
    discountRate: '12%',
  },
];

interface ExampleBrandRow {
  code: string;
  nameEn: string;
  nameZhHant: string;
  nameZhHans: string;
  status: 'New' | 'Approved' | 'Rejected';
}

/** Backs the "Brand" page composition (Figma node 1893-118257), the second instance added
 * to the "Overview page" Example tab. */
const EXAMPLE_BRAND_ROWS: ExampleBrandRow[] = [
  {
    code: 'BRD-0001',
    nameEn: 'Aurora Home',
    nameZhHant: '曙光家居',
    nameZhHans: '曙光家居',
    status: 'New',
  },
  {
    code: 'BRD-0002',
    nameEn: 'Nordic Living',
    nameZhHant: '北歐生活',
    nameZhHans: '北欧生活',
    status: 'Approved',
  },
  {
    code: 'BRD-0003',
    nameEn: 'PureLeaf Tea Co.',
    nameZhHant: '純葉茶莊',
    nameZhHans: '纯叶茶庄',
    status: 'Rejected',
  },
  {
    code: 'BRD-0004',
    nameEn: 'Everstride',
    nameZhHant: '恆步',
    nameZhHans: '恒步',
    status: 'New',
  },
];

const BRAND_STATUS_COLOR: Record<ExampleBrandRow['status'], BadgeColor> = {
  New: 'blue',
  Approved: 'green',
  Rejected: 'red',
};

interface BannerDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function BannerDoc({ onNavigate }: BannerDocProps) {
  const [activeVariantTab, setActiveVariantTab] = useState<VariantTab>('Primary');
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Overview page');

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Banner</h1>
        <p className="ds-doc__lede">
          A Banner surfaces a short, persistent message inline with the page content — a status
          update, a warning, or an announcement. Unlike a Dialog, it never blocks the page.
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
          Banner is a bordered, tinted row — a state icon, a message, and up to two optional
          actions. State controls its color; layout controls whether it carries a title.
        </p>
        <div className="ds-preview">
          <Banner />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Five parts: an icon, an optional title, a description, an optional button, and an
          optional close control.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure ds-banner-anatomy">
            <div
              className="ds-banner ds-banner--primary ds-banner--multi-line ds-anatomy__demo"
              aria-hidden="true"
            >
              <span className="ds-banner__icon ds-anatomy__part-relative">
                <span className="icon" aria-hidden="true">
                  info
                </span>
                <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              </span>
              <div className="ds-banner__content">
                <p className="ds-banner__title">
                  <span className="ds-anatomy__part-relative">
                    Title
                    <span className="ds-anatomy__badge ds-anatomy__badge--container">2</span>
                  </span>
                </p>
                <p className="ds-banner__desc ds-anatomy__part-relative">
                  This is a description.
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">3</span>
                </p>
                <span className="ds-anatomy__part-relative">
                  <Button variant="primary" appearance="ghost" size="sm" className="ds-banner__button">
                    Label
                  </Button>
                  <span className="ds-anatomy__badge ds-anatomy__badge--side-left">4</span>
                </span>
              </div>
              <span className="ds-anatomy__part-relative">
                <IconButton
                  icon="close"
                  variant="neutral"
                  appearance="ghost"
                  size="sm"
                  shape="square"
                  label="Dismiss"
                  className="ds-banner__close"
                />
                <span className="ds-anatomy__badge ds-anatomy__badge--side">5</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Icon</strong> —{' '}
                  <span>
                    reflects the state — an info glyph for Primary/Info/Warning, a warning
                    triangle for Danger
                  </span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Title</strong> —{' '}
                  <span>only in the multi-line layout; hide with showTitle={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Description</strong> — <span>the message body, always present</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">4</span>
                <span>
                  <strong>Button</strong> —{' '}
                  <span>an optional ghost action; hide with showButton={'{false}'}</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">5</span>
                <span>
                  <strong>Close</strong> —{' '}
                  <span>an optional dismiss control; hide with showClose={'{false}'}</span>
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
          State sets the icon and surface color. Layout controls whether the message carries a
          title: single-line stays a fixed 48px row, multi-line grows to fit a title and
          description stacked above the button.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Banner style groups">
          {VARIANT_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeVariantTab === tab}
              className={`ds-line-tab${activeVariantTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveVariantTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <div className="ds-variant-row">
              <div className="ds-variant-row__cell">
                <Banner state={STATE_BY_TAB[activeVariantTab]} layout="single-line" />
                <span className="ds-variant-row__cell-label">Single-line</span>
              </div>
              <div className="ds-variant-row__cell">
                <Banner
                  state={STATE_BY_TAB[activeVariantTab]}
                  layout="multi-line"
                  title={activeVariantTab}
                />
                <span className="ds-variant-row__cell-label">Multi-line</span>
              </div>
            </div>
            {activeVariantTab === 'Primary' && (
              <span className="ds-variant-note">
                The default state — brand-purple icon and border, for general announcements.
              </span>
            )}
            {activeVariantTab === 'Info' && (
              <span className="ds-variant-note">
                For neutral, informational updates that don&apos;t need urgency.
              </span>
            )}
            {activeVariantTab === 'Warning' && (
              <span className="ds-variant-note">
                For messages that need attention but aren&apos;t blocking or destructive.
              </span>
            )}
            {activeVariantTab === 'Danger' && (
              <span className="ds-variant-note">
                The only state whose icon swaps to a warning triangle — reserve it for errors or
                failed operations.
              </span>
            )}
          </div>
        </div>

        <span className="ds-variant-group__label ds-variant-tabs-label">Example</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Banner example groups">
          {EXAMPLE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeExampleTab === tab}
              className={`ds-line-tab${activeExampleTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveExampleTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <p className="ds-section__desc">
          Hover a composition to see which part is the Banner.
        </p>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            {activeExampleTab === 'Overview page' && (
              <div className="ds-preview ds-preview--stack">
              <div className="ds-banner-example">
                <div className="ds-banner-example__page">
                  <div className="ds-banner-example__dim">
                    <a
                      className="ds-banner-example__crumb"
                      href="#"
                      onClick={(event) => event.preventDefault()}
                    >
                      <span className="icon icon--sm" aria-hidden="true">
                        chevron_left
                      </span>
                      Back to Promotion Cycles
                    </a>
                    <h4 className="ds-banner-example__title">Confirm SKU and Lock Price</h4>
                  </div>

                  <div className="ds-banner-example__focus">
                    <Banner
                      state="info"
                      layout="multi-line"
                      title="About PPP Pricing:"
                      description="Eligible customers will see the lower price between: (1) Current selling price 10% OFF or (2) the PPP price listed below (past 60 days average selling price x the promotion discount rate)."
                      showButton={false}
                    />
                  </div>

                  <div className="ds-banner-example__dim ds-banner-example__layout">
                    <div className="ds-banner-example__main">
                      <div className="ds-table-example">
                        <div className="ds-table-toolbar">
                          <div className="ds-table-toolbar__search-wrap">
                            <Searchbar size="md" placeholder="Search SKU ID or Name" scopeLabel="SKU" />
                          </div>
                          <div className="ds-table-toolbar__filters">
                            <FilterChip label="Category" />
                            <FilterChip label="Status" />
                          </div>
                          <div className="ds-table-toolbar__actions">
                            <button type="button" className="ds-banner-example__reset">
                              Reset All
                            </button>
                          </div>
                        </div>
                        <div className="ds-table-example__scroll">
                          <div className="ds-table-example__frame">
                            <Table size="md">
                              <TableHeader>
                                <TableHeaderCell width={64}>Image</TableHeaderCell>
                                <TableHeaderCell width={110}>SKU ID</TableHeaderCell>
                                <TableHeaderCell width={100}>Brand</TableHeaderCell>
                                <TableHeaderCell>SKU Name</TableHeaderCell>
                                <TableHeaderCell width={100}>Category</TableHeaderCell>
                                <TableHeaderCell width={90}>Status</TableHeaderCell>
                                <TableHeaderCell width={90} align="right">
                                  Original Price
                                </TableHeaderCell>
                                <TableHeaderCell width={90} align="right">
                                  Selling Price
                                </TableHeaderCell>
                                <TableHeaderCell width={80} align="right" info>
                                  Avg PSP
                                </TableHeaderCell>
                                <TableHeaderCell width={80} align="right" info>
                                  PPP Price
                                </TableHeaderCell>
                                <TableHeaderCell width={100}>Cost Bearer</TableHeaderCell>
                                <TableHeaderCell width={110} align="right">
                                  Promotion Discount
                                </TableHeaderCell>
                                <TableHeaderCell width={70} align="center">
                                  Action
                                </TableHeaderCell>
                              </TableHeader>
                              {EXAMPLE_SKU_ROWS.map((row) => (
                                <TableRow key={row.sku}>
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
                                  <TableCell>
                                    <Tag
                                      label={row.status}
                                      color={row.status === 'Joined' ? 'green' : 'gray'}
                                    />
                                  </TableCell>
                                  <TableCell align="right">{row.originalPrice}</TableCell>
                                  <TableCell align="right">{row.sellingPrice}</TableCell>
                                  <TableCell align="right">{row.avgPsp}</TableCell>
                                  <TableCell align="right">{row.pppPrice}</TableCell>
                                  <TableCell>{row.costBearer}</TableCell>
                                  <TableCell align="right">{row.discountRate}</TableCell>
                                  <TableCell align="center">
                                    <IconButton
                                      icon="more_vert"
                                      variant="neutral"
                                      appearance="ghost"
                                      size="sm"
                                      shape="square"
                                      label="Row actions"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </Table>
                          </div>
                        </div>
                        <div className="ds-table-example__pagination">
                          <Pagination currentPage={1} totalPages={13} size="sm" />
                        </div>
                      </div>
                    </div>

                    <div className="ds-banner-example__panel">
                      <p className="ds-banner-example__panel-title">Cycle Detail</p>
                      <div className="ds-banner-example__panel-row">
                        <span className="ds-banner-example__panel-label">Cycle ID</span>
                        <span className="ds-banner-example__panel-value">PC-2026-0091</span>
                      </div>
                      <div className="ds-banner-example__panel-row">
                        <span className="ds-banner-example__panel-label">Status</span>
                        <span className="ds-banner-example__panel-value">Pending Lock</span>
                      </div>
                      <div className="ds-banner-example__panel-row">
                        <span className="ds-banner-example__panel-label">Price Lock Date</span>
                        <span className="ds-banner-example__panel-value">2026-09-10</span>
                      </div>
                      <div className="ds-banner-example__panel-actions">
                        <Button variant="primary" appearance="outline" size="md">
                          Save Draft
                        </Button>
                        <Button variant="primary" appearance="solid" size="md">
                          Confirm &amp; Lock Price
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ds-banner-example">
                <div className="ds-banner-example__page">
                  <div className="ds-banner-example__dim ds-banner-example__brand-header">
                    <Breadcrumb>
                      <BreadcrumbItem label="Home" />
                      <BreadcrumbSeparator />
                      <BreadcrumbItem label="Order Management" />
                      <BreadcrumbSeparator />
                      <BreadcrumbItem label="Order Overview" />
                      <BreadcrumbSeparator />
                      <BreadcrumbItem label="Brand" state="active" />
                    </Breadcrumb>
                    <div className="ds-banner-example__brand-titlebar">
                      <h4 className="ds-banner-example__title">Brand</h4>
                      <Button variant="primary" appearance="solid" size="md">
                        Add Brand
                      </Button>
                    </div>
                  </div>

                  <div className="ds-banner-example__focus">
                    <Banner
                      state="info"
                      layout="single-line"
                      description="After creating a new brand, please remember to submit the Zendesk webform so our team can verify the brand details."
                      buttonLabel="Submit MCS Form"
                      showClose={false}
                    />
                  </div>

                  <div className="ds-banner-example__dim ds-table-example">
                    <div className="ds-table-toolbar">
                      <div className="ds-table-toolbar__search-wrap">
                        <Searchbar size="md" placeholder="Placeholder" scopeLabel="Brand Code" />
                      </div>
                      <div className="ds-table-toolbar__filters">
                        <FilterChip label="Status" />
                      </div>
                      <div className="ds-table-toolbar__actions">
                        <Button variant="primary" appearance="solid" size="sm">
                          Search
                        </Button>
                        <button type="button" className="ds-banner-example__reset">
                          Reset
                        </button>
                      </div>
                    </div>
                    <div className="ds-table-results">
                      <span className="ds-table-results__count">1-10 of 10 results</span>
                    </div>
                    <div className="ds-table-example__scroll">
                      <div className="ds-table-example__frame">
                        <Table size="md">
                          <TableHeader>
                            <TableHeaderCell sortable>Brand Code</TableHeaderCell>
                            <TableHeaderCell sortable>Brand Name (English)</TableHeaderCell>
                            <TableHeaderCell sortable>
                              Brand Name (Traditional Chinese)
                            </TableHeaderCell>
                            <TableHeaderCell sortable>
                              Brand Name (Simplified Chinese)
                            </TableHeaderCell>
                            <TableHeaderCell sortable width={110}>
                              Status
                            </TableHeaderCell>
                          </TableHeader>
                          {EXAMPLE_BRAND_ROWS.map((row) => (
                            <TableRow key={row.code}>
                              <TableCell>{row.code}</TableCell>
                              <TableCell>{row.nameEn}</TableCell>
                              <TableCell>{row.nameZhHant}</TableCell>
                              <TableCell>{row.nameZhHans}</TableCell>
                              <TableCell>
                                <Badge label={row.status} color={BRAND_STATUS_COLOR[row.status]} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </Table>
                      </div>
                    </div>
                    <div className="ds-table-example__pagination">
                      <Pagination currentPage={3} totalPages={10} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
              </div>
            )}

            {activeExampleTab === 'Modal' && (
              <div className="ds-preview ds-preview--scrim ds-banner-example">
                <Modal
                  size="lg"
                  title="Review SKU and PPP Prices"
                  showInfo
                  showLeading={false}
                  secondaryLabel="Cancel"
                  primaryLabel="Save"
                >
                  <div className="ds-banner-example__modal-body">
                    <div className="ds-banner-example__dim ds-banner-example__modal-filters">
                      <div className="ds-banner-example__modal-search">
                        <Searchbar size="md" placeholder="Search SKU ID or Name" scopeLabel="SKU ID" />
                      </div>
                      <FilterChip label="Category" />
                      <button type="button" className="ds-banner-example__reset">
                        Reset
                      </button>
                    </div>

                    <div className="ds-banner-example__focus">
                      <Banner
                        state="danger"
                        layout="single-line"
                        description="Deselection limit exceeded — 32 SKU deselected (max 30, 10%). Please re-select SKU to include in promotion cycle."
                        showButton={false}
                      />
                    </div>

                    <div className="ds-banner-example__dim">
                      <div className="ds-table-example__scroll">
                        <div className="ds-table-example__frame">
                          <Table size="md">
                            <TableHeader>
                              <TableSelectHeaderCell indeterminate />
                              <TableHeaderCell width={64}>Image</TableHeaderCell>
                              <TableHeaderCell width={110}>SKU ID</TableHeaderCell>
                              <TableHeaderCell width={100}>Brand</TableHeaderCell>
                              <TableHeaderCell>SKU Name</TableHeaderCell>
                              <TableHeaderCell width={100}>Category</TableHeaderCell>
                              <TableHeaderCell width={90} align="right">
                                Original Price
                              </TableHeaderCell>
                              <TableHeaderCell width={90} align="right">
                                Selling Price
                              </TableHeaderCell>
                              <TableHeaderCell width={80} align="right" info>
                                Avg PSP
                              </TableHeaderCell>
                              <TableHeaderCell width={80} align="right" info>
                                PPP Price
                              </TableHeaderCell>
                              <TableHeaderCell width={100}>Cost Bearer</TableHeaderCell>
                              <TableHeaderCell width={130} align="right">
                                Promotion Discount Rate
                              </TableHeaderCell>
                            </TableHeader>
                            {EXAMPLE_SKU_ROWS.map((row, index) => (
                              <TableRow key={row.sku} state={index < 2 ? 'selected' : 'default'}>
                                <TableSelectCell checked={index < 2} />
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
                                <TableCell align="right">{row.originalPrice}</TableCell>
                                <TableCell align="right">{row.sellingPrice}</TableCell>
                                <TableCell align="right">{row.avgPsp}</TableCell>
                                <TableCell align="right">{row.pppPrice}</TableCell>
                                <TableCell>{row.costBearer}</TableCell>
                                <TableCell align="right">{row.discountRate}</TableCell>
                              </TableRow>
                            ))}
                          </Table>
                        </div>
                      </div>
                      <div className="ds-banner-example__modal-pagination">
                        <span className="ds-table-results__count">1-10 of 300 results</span>
                        <Pagination currentPage={1} totalPages={30} size="sm" showGoTo={false} />
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            )}

            {activeExampleTab === 'Overview page' && (
              <span className="ds-variant-note">
                Embedded directly below the page title, ahead of the filters — an info banner
                explaining a rule before the merchant reads the table. On the SKU page it has no
                button; on the Brand page it links out to the Zendesk webform merchants need to
                submit next.
              </span>
            )}
            {activeExampleTab === 'Modal' && (
              <span className="ds-variant-note">
                A danger banner surfaces inline once a bulk deselection breaks the promotion&apos;s
                exclusion cap — dismissible, since the merchant can act on it (re-select rows)
                without leaving the modal.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Banner itself has no interactive state of its own — the ones below belong to its ghost
          Button, already documented in full on the Button page.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Surface</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="ghost" size="sm">
                  Label
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-ghost-default)' }}
                  />
                  <code>interactive-button-surface-primary-ghost-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="ghost" size="sm" forceState="hover">
                  Label
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-ghost-hover)' }}
                  />
                  <code>interactive-button-surface-primary-ghost-hover</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Focus</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="ghost" size="sm" forceState="focus">
                  Label
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-ghost-focus)' }}
                  />
                  <code>interactive-button-surface-primary-ghost-focus</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td style={{ width: 160 }}>
                <Button variant="primary" appearance="ghost" size="sm" disabled>
                  Label
                </Button>
              </td>
              <td>
                <span className="ds-swatch">
                  <span
                    className="ds-swatch__dot"
                    style={{ background: 'var(--interactive-button-surface-primary-ghost-disabled)' }}
                  />
                  <code>interactive-button-surface-primary-ghost-disabled</code>
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
          Every measurement below comes from a token — no hardcoded values, except where flagged.
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
              <th scope="row">Container width</th>
              <td>
                <em>none — flagged</em>
              </td>
              <td>412px, fixed in every Figma instance and in this build</td>
            </tr>
            <tr>
              <th scope="row">Single-line height</th>
              <td>
                <code>--component-height-xl</code>
              </td>
              <td>48px</td>
            </tr>
            <tr>
              <th scope="row">Container padding (horizontal)</th>
              <td>
                <code>--space-component-padding-lg</code>
              </td>
              <td>16px</td>
            </tr>
            <tr>
              <th scope="row">Container padding (vertical)</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Container radius</th>
              <td>
                <code>--radius-md</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Container border</th>
              <td>
                <code>--border-sm</code>
              </td>
              <td>1px</td>
            </tr>
            <tr>
              <th scope="row">Icon ↔ Content gap</th>
              <td>
                <code>--space-component-gap-sm</code>
              </td>
              <td>8px</td>
            </tr>
            <tr>
              <th scope="row">Icon size</th>
              <td>
                <code>--component-icon-md</code> / <code>--component-icon-sm</code>
              </td>
              <td>24px tile, 16px glyph</td>
            </tr>
            <tr>
              <th scope="row">Title type</th>
              <td>
                <code>--typography-md</code>
              </td>
              <td>16px / 22px, medium</td>
            </tr>
            <tr>
              <th scope="row">Description type</th>
              <td>
                <code>--typography-sm</code>
              </td>
              <td>14px / 20px, regular</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Banner.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('form')}
          >
            <FormIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Form</span>
          </button>
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
        </div>
      </section>
    </div>
  );
}
