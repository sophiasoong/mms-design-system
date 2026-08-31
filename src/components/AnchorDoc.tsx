import { useEffect, useState } from 'react';
import Anchor, { AnchorItem } from './Anchor';
import Form, { FormRow, FormCol, FormField } from './Form';
import { Input } from './Input';
import { Select } from './Select';
import { Toggle } from './Toggle';
import { Badge } from './Badge';
import Button from './Button';
import { Table, TableHeader, TableHeaderCell, TableRow, TableCell } from './Table';
import Pagination from './Pagination';
import { Searchbar } from './Searchbar';
import { FilterChip } from './Chip';
import './ButtonDoc.css';
import './FormDoc.css';
import './AnchorDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=784-22412';

const LEVEL_TABS = ['Tab', 'Sub-tab'] as const;
type LevelTab = (typeof LEVEL_TABS)[number];

/** Figma node 1827:89961 ("Edit Store") — a real form page with a sticky Anchor beside
 * it, one item per Form section. Section count/content is trimmed down from the
 * reference (which also has data tables and pagination) to keep this demo focused on
 * the Anchor-to-section navigation the task calls for, reusing FormDoc's own
 * Form/FormRow/FormCol/FormField composition style. */
const EXAMPLE_SECTIONS = [
  { id: 'store-base', label: 'Store Base Information' },
  { id: 'contract', label: 'Contract Information' },
  { id: 'warehouse', label: 'Warehouse & Logistics' },
  { id: 'delivery', label: 'Merchant Delivery Information' },
] as const;

interface ExampleProductRow {
  sku: string;
  brand: string;
  name: string;
  category: string;
  originalPrice: string;
  sellingPrice: string;
  avgPsp: string;
  pppPrice: string;
  costBearer: string;
  discountRate: string;
}

const EXAMPLE_PRODUCT_ROWS: ExampleProductRow[] = [
  { sku: 'SKU-200001', brand: 'Nestlé', name: 'Nescafé Gold Blend 200g', category: 'Beverages', originalPrice: '$144', sellingPrice: '$138', avgPsp: '$127', pppPrice: '$121', costBearer: 'Merchant', discountRate: '8%' },
  { sku: 'SKU-200002', brand: 'Unilever', name: 'Dove Body Wash 400ml', category: 'Personal Care', originalPrice: '$89', sellingPrice: '$82', avgPsp: '$76', pppPrice: '$71', costBearer: 'Platform', discountRate: '12%' },
  { sku: 'SKU-200003', brand: 'Colgate', name: 'Colgate Total Toothpaste 150g', category: 'Personal Care', originalPrice: '$46', sellingPrice: '$42', avgPsp: '$39', pppPrice: '$36', costBearer: 'Merchant', discountRate: '9%' },
];

/** Figma nodes 178282 ("Contract Information") and 178375 ("Warehouse & Logistics") both
 * end in this same product/promotion table + toolbar — a shared reference component, not
 * unique content per section, so both Form sections below reuse this one composition. */
function ExampleProductTable({ scopeLabel }: { scopeLabel: string }) {
  return (
    <div className="ds-table-example ds-anchor-example__product-table">
      <div className="ds-table-toolbar">
        <div className="ds-table-toolbar__search-wrap">
          <Searchbar size="md" placeholder="Search" scopeLabel={scopeLabel} />
        </div>
        <div className="ds-table-toolbar__filters">
          <FilterChip label="Category" />
          <FilterChip label="Status" />
        </div>
        <div className="ds-table-toolbar__actions">
          <Button variant="primary" appearance="ghost" size="md">
            Reset
          </Button>
        </div>
      </div>

      <div className="ds-table-results">
        <span className="ds-table-results__count">1–3 of 3 results</span>
        <div className="ds-table-results__actions">
          <span className="ds-table-results__updated">Last Updated 2026-08-31 09:15</span>
          <Button variant="primary" appearance="outline" size="md">
            Refresh
          </Button>
          <Button variant="primary" appearance="outline" size="md">
            Export
          </Button>
        </div>
      </div>

      <div className="ds-table-example__scroll">
        <div className="ds-table-example__frame">
          <Table size="md">
            <TableHeader>
              <TableHeaderCell width={72}>Image</TableHeaderCell>
              <TableHeaderCell width={110}>SKU ID</TableHeaderCell>
              <TableHeaderCell width={110}>Brand</TableHeaderCell>
              <TableHeaderCell width={220}>SKU Name</TableHeaderCell>
              <TableHeaderCell width={110}>Category</TableHeaderCell>
              <TableHeaderCell width={90} align="right">Original Price</TableHeaderCell>
              <TableHeaderCell width={90} align="right">Selling Price</TableHeaderCell>
              <TableHeaderCell width={80} align="right" info>Avg PSP</TableHeaderCell>
              <TableHeaderCell width={80} align="right" info>PPP Price</TableHeaderCell>
              <TableHeaderCell width={100}>Cost Bearer</TableHeaderCell>
              <TableHeaderCell width={120} align="right">Promotion Discount Rate</TableHeaderCell>
            </TableHeader>
            {EXAMPLE_PRODUCT_ROWS.map((row) => (
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

      <div className="ds-table-example__pagination">
        <Pagination currentPage={1} totalPages={1} />
      </div>
    </div>
  );
}

interface AnchorDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function AnchorDoc({ onNavigate: _onNavigate }: AnchorDocProps) {
  const [activeLevelTab, setActiveLevelTab] = useState<LevelTab>('Tab');
  const [activeSection, setActiveSection] = useState('overview');
  const [activeExampleSection, setActiveExampleSection] = useState<string>(
    EXAMPLE_SECTIONS[0].id
  );

  // Same scroll-spy idiom as the app's own AnchorNav (AnchorNav.tsx) — reimplemented
  // here against Anchor/AnchorItem (the component this page documents) instead of
  // importing AnchorNav, so this doc page's CSS/behavior stays scoped to Anchor.
  useEffect(() => {
    const container = document.getElementById('anchor-example-forms');
    if (!container) return;

    // root: container (rather than the default viewport) — sections scroll inside
    // their own bounded box now, not the outer doc page, so visibility has to be
    // measured against that box.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveExampleSection(visible[0].target.id.replace('anchor-example-', ''));
        }
      },
      { root: container, rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    EXAMPLE_SECTIONS.forEach((section) => {
      const el = document.getElementById(`anchor-example-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToExampleSection = (id: string) => {
    setActiveExampleSection(id);
    const container = document.getElementById('anchor-example-forms');
    const target = document.getElementById(`anchor-example-${id}`);
    if (!container || !target) return;
    // Scrolls the bounded forms container directly instead of target.scrollIntoView(),
    // which would otherwise also drag the outer doc page along with it — the Anchor
    // should stay fixed while only this container moves. offsetTop is relative to the
    // container (its nearest positioned ancestor) but still includes the container's own
    // padding-top, so subtract it — otherwise the first section stops a few pixels short
    // of scrollTop 0 instead of reaching the very top.
    const containerPaddingTop = parseFloat(getComputedStyle(container).paddingTop) || 0;
    container.scrollTo({ top: Math.max(0, target.offsetTop - containerPaddingTop), behavior: 'smooth' });
  };

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Anchor</h1>
        <p className="ds-doc__lede">
          An Anchor stacks the links that jump a reader to a section of the current page,
          highlighting whichever one is in view.
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
          Use Anchor beside long-form content so a reader always knows where they are and can
          jump straight to another section.
        </p>
        <div className="ds-preview">
          <div style={{ width: 220 }}>
            <Anchor>
              {['Overview', 'Anatomy', 'Variants', 'States'].map((label) => (
                <AnchorItem
                  key={label}
                  label={label}
                  state={activeSection === label.toLowerCase() ? 'active' : 'default'}
                  onClick={() => setActiveSection(label.toLowerCase())}
                />
              ))}
            </Anchor>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          Every item carries an indicator and a label; a Sub-tab indents further to nest under
          its parent Tab.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div className="ds-anchor ds-anatomy__demo" aria-hidden="true" style={{ width: 220 }}>
              <span className="ds-anatomy__part-relative ds-anchor-anatomy__row">
                <div className="ds-anchor-item ds-anchor-item--tab ds-anchor-item--active">
                  <span className="ds-anatomy__part-relative">
                    <span className="ds-anchor-item__label">Overview</span>
                    <span className="ds-anatomy__badge ds-anatomy__badge--side">2</span>
                  </span>
                </div>
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">1</span>
              </span>
              <div className="ds-anchor-item ds-anchor-item--tab">
                <span className="ds-anchor-item__label">Anatomy</span>
              </div>
              <span className="ds-anatomy__part-relative ds-anchor-anatomy__row">
                <div className="ds-anchor-item ds-anchor-item--sub-tab">
                  <span className="ds-anchor-item__label">Overview A</span>
                </div>
                <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
              </span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Indicator</strong> —{' '}
                  <span>a left border that changes color with the item's state</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Label</strong> —{' '}
                  <span>switches to a heading weight and the brand color when active</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Sub-tab level</strong> —{' '}
                  <span>extra left padding nests the item under its parent Tab</span>
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
          Level sets how far an item indents — Tab for a top-level section, Sub-tab for one
          nested beneath it.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Level</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Anchor level groups">
          {LEVEL_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeLevelTab === tab}
              className={`ds-line-tab${activeLevelTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveLevelTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeLevelTab === 'Tab' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ width: 220 }}>
                  <Anchor>
                    <AnchorItem label="Overview" level="tab" state="active" />
                    <AnchorItem label="Anatomy" level="tab" />
                  </Anchor>
                </div>
              </div>
              <span className="ds-variant-note">
                Tab sits flush with the stack's own left edge — the top-level section a page
                jumps to.
              </span>
            </div>
          )}

          {activeLevelTab === 'Sub-tab' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ width: 220 }}>
                  <Anchor>
                    <AnchorItem label="Overview" level="tab" state="active" />
                    <AnchorItem label="Overview A" level="sub-tab" />
                    <AnchorItem label="Overview B" level="sub-tab" />
                  </Anchor>
                </div>
              </div>
              <span className="ds-variant-note">
                Sub-tab indents further, nesting under whichever Tab it follows.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Example</span>
            <p className="ds-section__desc">
              A form page with several sections, each with a matching Anchor item — click one
              to scroll the page to that section and highlight it, the same in-page
              navigation as the app's own AnchorNav.
            </p>
            <div className="ds-preview">
              <div className="ds-anchor-example">
                <div className="ds-anchor-example__forms" id="anchor-example-forms">
                  <div id="anchor-example-store-base">
                    <Form title="Store Base Information" showInfo={false}>
                      <FormRow>
                        <FormCol>
                          <FormField label="Business Unit">
                            <span className="ds-form-field__value">HKTV</span>
                          </FormField>
                          <FormField label="MMS Store Code">
                            <span className="ds-form-field__value">H8224002</span>
                          </FormField>
                          <FormField label="Store Status">
                            <Badge label="Active" color="green" />
                          </FormField>
                          <FormField label="Year Joined">
                            <span className="ds-form-field__value">2025</span>
                          </FormField>
                          <FormField label="Store Name (in English)" required>
                            <Input defaultValue="Chic Living HK" size="lg" />
                          </FormField>
                          <FormField label="Linked ThePlace Store ID">
                            <span className="ds-form-field__value">100014261S</span>
                          </FormField>
                        </FormCol>
                        <FormCol>
                          <FormField label="Merchant Name">
                            <span className="ds-form-field__value">H8224002</span>
                          </FormField>
                          <FormField label="Storefront Code">
                            <span className="ds-form-doc__readonly-link">
                              <span className="ds-form-doc__readonly-link-text">H0888001</span>
                              <span className="icon icon--sm" aria-hidden="true">
                                open_in_new
                              </span>
                            </span>
                          </FormField>
                          <FormField label="Online Status">
                            <Badge label="Online" color="green" />
                          </FormField>
                          <FormField label="Allow choosing 13Landmarks categories">
                            <Toggle label="No" />
                          </FormField>
                          <FormField label="Store Name (in Traditional Chinese)" required>
                            <Input defaultValue="馥麗生活館" size="lg" />
                          </FormField>
                          <FormField label="Link Store" info>
                            <span className="ds-form-field__value">Link</span>
                          </FormField>
                        </FormCol>
                        <FormCol>
                          <FormField label="Merchant ID">
                            <span className="ds-form-field__value">88883333</span>
                          </FormField>
                          <FormField label="Hybris Avenue Status">
                            <span className="ds-form-field__value">Yes</span>
                          </FormField>
                          <FormField label="Direct-Operated Store">
                            <Toggle label="No" />
                          </FormField>
                          <FormField label="Customer Chat">
                            <Toggle label="Disabled" />
                          </FormField>
                          <FormField label="Store Name (in Simplified Chinese)" required>
                            <Input defaultValue="馥丽生活馆" size="lg" />
                          </FormField>
                        </FormCol>
                      </FormRow>
                    </Form>
                  </div>

                  <div id="anchor-example-contract">
                    <Form title="Contract Information" showInfo={false}>
                      <FormRow>
                        <FormCol>
                          <FormField label="Contract Type" required>
                            <Select placeholder="Please select" size="lg" />
                          </FormField>
                        </FormCol>
                        <FormCol>
                          <FormField label="Payment Group" required>
                            <Select placeholder="Please select" size="lg" />
                          </FormField>
                        </FormCol>
                      </FormRow>
                      <FormRow>
                        <FormCol>
                          <FormField label="Renewal Plan" required>
                            <Select placeholder="Please select" size="lg" />
                          </FormField>
                        </FormCol>
                        <FormCol>
                          <FormField label="To Be Terminated">
                            <Toggle label="No" />
                          </FormField>
                        </FormCol>
                      </FormRow>
                      <ExampleProductTable scopeLabel="Promotion ID" />
                    </Form>
                  </div>

                  <div id="anchor-example-warehouse">
                    <Form title="Warehouse & Logistics" showInfo={false}>
                      <FormRow>
                        <FormCol>
                          <FormField label="Warehouse Package Color" required>
                            <Select label="Orange" size="lg" />
                          </FormField>
                        </FormCol>
                        <FormCol>
                          <FormField label="Pickup Days" required>
                            <Select placeholder="Please select" size="lg" chips={['Mon-Fri']} />
                          </FormField>
                        </FormCol>
                      </FormRow>
                      <ExampleProductTable scopeLabel="Promotion ID" />
                    </Form>
                  </div>

                  <div id="anchor-example-delivery">
                    <Form title="Merchant Delivery Information" showInfo={false}>
                      <FormRow>
                        <FormCol>
                          <FormField label="Contact Name" required info>
                            <Input placeholder="Please type" size="lg" />
                          </FormField>
                        </FormCol>
                        <FormCol>
                          <FormField label="Contact Info" required info>
                            <Input placeholder="Please type" size="lg" />
                          </FormField>
                        </FormCol>
                      </FormRow>
                      <FormRow>
                        <FormCol>
                          <FormField label="HK Delivery Fee">
                            <Input defaultValue="3" size="lg" type="number" />
                          </FormField>
                        </FormCol>
                        <FormCol>
                          <FormField label="HK Free Delivery Threshold">
                            <Input defaultValue="100" size="lg" type="number" />
                          </FormField>
                        </FormCol>
                      </FormRow>
                    </Form>
                  </div>
                </div>

                <div className="ds-anchor-example__nav" style={{ width: 220 }}>
                  <Anchor>
                    {EXAMPLE_SECTIONS.map((section) => (
                      <AnchorItem
                        key={section.id}
                        label={section.label}
                        state={activeExampleSection === section.id ? 'active' : 'default'}
                        onClick={() => scrollToExampleSection(section.id)}
                      />
                    ))}
                  </Anchor>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Hover and Active both switch to the brand color; Active also switches to a heading
          weight so the current section reads at a glance.
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
              <td style={{ width: 220 }}>
                <AnchorItem label="Label" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-anchor-label-default)' }} />
                  <code>interactive-anchor-label-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td style={{ width: 220 }}>
                <AnchorItem label="Label" state="hover" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-300)' }} />
                  <code>brand-primary-300</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Active</td>
              <td style={{ width: 220 }}>
                <AnchorItem label="Label" state="active" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--brand-primary-400)' }} />
                  <code>brand-primary-400</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td style={{ width: 220 }}>
                <AnchorItem label="Label" state="disabled" />
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-anchor-label-disabled)' }} />
                  <code>interactive-anchor-label-disabled</code>
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
          Tab and Sub-tab share the same height, gap, and indicator width; only the left inset
          changes between them.
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
              <th scope="row">Item height</th>
              <td>
                <code>--component-height-lg</code>
              </td>
              <td>40px</td>
            </tr>
            <tr>
              <th scope="row">Indicator ↔ label gap</th>
              <td>
                <code>--space-component-gap-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Indicator width</th>
              <td>
                <code>--border-md</code>
              </td>
              <td>2px, left only</td>
            </tr>
            <tr>
              <th scope="row">Tab padding</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px, left and right</td>
            </tr>
            <tr>
              <th scope="row">Sub-tab left padding</th>
              <td>
                <code>--space-component-padding-xl</code>
              </td>
              <td>24px</td>
            </tr>
            <tr>
              <th scope="row">Sub-tab right padding</th>
              <td>
                <code>--space-component-padding-md</code>
              </td>
              <td>12px</td>
            </tr>
            <tr>
              <th scope="row">Active label</th>
              <td>
                <code>--typography-font-family-heading</code>
              </td>
              <td>Heading family, medium weight</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">
          No related components have been identified for Anchor yet.
        </p>
      </section>
    </div>
  );
}
