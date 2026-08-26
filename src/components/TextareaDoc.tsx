import { useRef, useState } from 'react';
import { Textarea } from './Textarea';
import Button from './Button';
import { FormIcon } from './icons';
import './ButtonDoc.css';

const FIGMA_URL =
  'https://www.figma.com/design/RU2sCgGMuU0PXUhKwYcpfr/MMS-Web-AI-Design-System?node-id=431-2293';

const STYLE_TABS = ['Label', 'Input-chip'] as const;
type StyleTab = (typeof STYLE_TABS)[number];

const EXAMPLE_TABS = ['Textarea-field', 'Text editor toolbar'] as const;
type ExampleTab = (typeof EXAMPLE_TABS)[number];

const TOOLBAR_FORMAT_BUTTONS = [
  { key: 'bold', icon: 'format_bold', label: 'Bold' },
  { key: 'italic', icon: 'format_italic', label: 'Italic' },
  { key: 'underline', icon: 'format_underlined', label: 'Underline' },
  { key: 'strikethrough', icon: 'strikethrough_s', label: 'Strikethrough' },
] as const;
type ToolbarFormatKey = (typeof TOOLBAR_FORMAT_BUTTONS)[number]['key'];

const TOOLBAR_FORMAT_COMMANDS: Record<ToolbarFormatKey, string> = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  strikethrough: 'strikeThrough',
};

const TOOLBAR_PARAGRAPH_BUTTONS = [
  { icon: 'format_list_numbered', label: 'Numbered list' },
  { icon: 'format_list_bulleted', label: 'Bulleted list' },
  { icon: 'format_align_left', label: 'Align left' },
  { icon: 'format_align_center', label: 'Align center' },
  { icon: 'format_align_right', label: 'Align right' },
  { icon: 'format_align_justify', label: 'Justify' },
  { icon: 'format_indent_decrease', label: 'Decrease indent' },
  { icon: 'format_indent_increase', label: 'Increase indent' },
] as const;

const TOOLBAR_OTHER_BUTTONS = [
  { icon: 'link', label: 'Insert link' },
  { icon: 'image', label: 'Insert image' },
  { icon: 'format_quote', label: 'Insert quote' },
  { icon: 'table', label: 'Insert table' },
] as const;

const CHAR_LIMIT = 200;
const TOOLBAR_INITIAL_TEXT = 'Autosize height based on content lines';
const countCharacters = (text: string) => text.length;

interface TextareaDocProps {
  onNavigate?: (componentId: string) => void;
}

export default function TextareaDoc({ onNavigate }: TextareaDocProps) {
  const [activeStyleTab, setActiveStyleTab] = useState<StyleTab>('Label');
  const [chips, setChips] = useState(['Tag one', 'Tag two']);
  const removeChip = (label: string) => setChips((prev) => prev.filter((l) => l !== label));
  const addChip = (label: string) =>
    setChips((prev) => (prev.includes(label) ? prev : [...prev, label]));

  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTab>('Textarea-field');
  const [activeFormats, setActiveFormats] = useState<ToolbarFormatKey[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const [fieldCharCount, setFieldCharCount] = useState(0);
  const [toolbarCharCount, setToolbarCharCount] = useState(() =>
    countCharacters(TOOLBAR_INITIAL_TEXT)
  );

  const syncActiveFormats = () => {
    setActiveFormats(
      TOOLBAR_FORMAT_BUTTONS.filter(({ key }) =>
        document.queryCommandState(TOOLBAR_FORMAT_COMMANDS[key])
      ).map(({ key }) => key)
    );
  };

  const applyFormat = (key: ToolbarFormatKey) => {
    editorRef.current?.focus();
    document.execCommand(TOOLBAR_FORMAT_COMMANDS[key]);
    syncActiveFormats();
  };

  return (
    <div className="ds-doc">
      <header className="ds-doc__header">
        <span className="ds-doc__eyebrow">Component</span>
        <h1 className="ds-doc__title">Textarea</h1>
        <p className="ds-doc__lede">
          A Textarea is a bordered multi-line text field for free-form entry that runs longer than
          a single line. It grows with typed content and offers a resize handle so the user can
          expand it manually; once content passes six lines, the field scrolls instead.
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
          Use a Textarea wherever a user needs to enter more than one line of free-form text, such
          as a comment, description, or note. For a single line of free-typed text, use Input
          instead.
        </p>
        <div className="ds-preview">
          <div style={{ width: 320 }}>
            <Textarea placeholder="Autosize height based on content lines" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="anatomy" className="ds-section">
        <h2 className="ds-section__title">Anatomy</h2>
        <p className="ds-section__desc">
          A Textarea is a bordered container holding typed or placeholder text, with a resize
          handle in the bottom-right corner for manually adjusting its height.
        </p>
        <div className="ds-anatomy">
          <div className="ds-anatomy__figure">
            <div
              className="ds-textarea ds-anatomy__demo ds-anatomy__part-relative"
              aria-hidden="true"
              style={{ width: 320 }}
            >
              <span className="ds-anatomy__badge ds-anatomy__badge--container">1</span>
              <span className="ds-anatomy__bracket" aria-hidden="true" />
              <span className="ds-textarea__field ds-anatomy__part-relative" style={{ display: 'block' }}>
                Autosize height based on content lines
                <span className="ds-anatomy__badge ds-anatomy__badge--side-left">2</span>
              </span>
              <span className="ds-anatomy__badge ds-anatomy__badge--side">3</span>
            </div>
            <ul className="ds-anatomy__legend">
              <li>
                <span className="ds-anatomy__legend-num">1</span>
                <span>
                  <strong>Container</strong> —{' '}
                  <span>border, radius, background respond to hover / focus / error / disabled</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">2</span>
                <span>
                  <strong>Content</strong> — <span>typed or placeholder text, wraps across lines</span>
                </span>
              </li>
              <li>
                <span className="ds-anatomy__legend-num">3</span>
                <span>
                  <strong>Resize handle</strong> —{' '}
                  <span>drag to grow or shrink the field's height manually</span>
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
          Label holds typed or placeholder text as a growing block. Input-chip turns each Enter
          keypress into a removable Input chip (see Chip), so the field can hold several keywords
          at once. Size sets the field's minimum height — Lg for long-form content, Md for a
          couple of lines, Sm for a compact note.
        </p>

        <span className="ds-variant-group__label ds-variant-tabs-label">Style</span>
        <div className="ds-line-tabs" role="tablist" aria-label="Textarea variant groups">
          {STYLE_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeStyleTab === tab}
              className={`ds-line-tab${activeStyleTab === tab ? ' ds-line-tab--active' : ''}`}
              onClick={() => setActiveStyleTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ds-variant-groups">
          {activeStyleTab === 'Label' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ width: 320 }}>
                  <Textarea placeholder="Autosize height based on content lines" />
                </div>
              </div>
              <span className="ds-variant-note">Typed or placeholder text, growing with content.</span>
            </div>
          )}

          {activeStyleTab === 'Input-chip' && (
            <div className="ds-variant-group">
              <div className="ds-preview">
                <div style={{ width: 320 }}>
                  <Textarea chips={chips} onRemoveChip={removeChip} onAddChip={addChip} />
                </div>
              </div>
              <span className="ds-variant-note">
                Each chosen value renders as an Input chip; clicking a chip's close icon removes
                just that value. Type text and press Enter to add a new chip.
              </span>
            </div>
          )}
        </div>

        <div className="ds-variant-groups">
          <div className="ds-variant-group">
            <span className="ds-variant-group__label">Size</span>
            <div className="ds-variant-row" style={{ flexDirection: 'column', alignItems: 'center' }}>
              <div className="ds-variant-row__cell">
                <div style={{ width: 240 }}>
                  <Textarea placeholder="Placeholder" size="lg" />
                </div>
                <span className="ds-variant-row__cell-label">Lg · 120px min-height</span>
              </div>
              <div className="ds-variant-row__cell">
                <div style={{ width: 240 }}>
                  <Textarea placeholder="Placeholder" size="md" />
                </div>
                <span className="ds-variant-row__cell-label">Md · 64px min-height</span>
              </div>
              <div className="ds-variant-row__cell">
                <div style={{ width: 240 }}>
                  <Textarea placeholder="Placeholder" size="sm" />
                </div>
                <span className="ds-variant-row__cell-label">Sm · 40px min-height</span>
              </div>
            </div>
          </div>
        </div>

        <div id="example" className="ds-section__subsection">
          <h3 className="ds-section__subtitle">Example</h3>
          <p className="ds-section__desc">
            Textarea-field pairs a Title label with the field and a hint row for validation
            and character count. Text editor toolbar adds a formatting bar above the field for
            rich-text entry.
          </p>

          <div className="ds-line-tabs" role="tablist" aria-label="Textarea example groups">
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

          {activeExampleTab === 'Textarea-field' && (
            <div className="ds-preview" style={{ marginTop: 'var(--space-component-gap-md)' }}>
              <div className="ds-textarea-example" style={{ width: 400 }}>
                <div className="ds-textarea-example__title-row">
                  <span className="ds-textarea-example__label">Title</span>
                  <span className="ds-textarea-example__required" aria-hidden="true">
                    *
                  </span>
                  <span className="icon icon--sm ds-textarea-example__info-icon" aria-hidden="true">
                    info
                  </span>
                </div>
                <Textarea
                  placeholder="Autosize height based on content lines"
                  state={fieldCharCount >= CHAR_LIMIT ? 'error' : 'default'}
                  maxLength={CHAR_LIMIT}
                  onChange={(value) => setFieldCharCount(countCharacters(value))}
                />
                <div className="ds-textarea-example__hint">
                  <span
                    className="ds-textarea-example__hint-error"
                    style={{ visibility: fieldCharCount >= CHAR_LIMIT ? 'visible' : 'hidden' }}
                  >
                    Error Message
                  </span>
                  <span className="ds-textarea-example__hint-count">
                    {fieldCharCount}/{CHAR_LIMIT}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeExampleTab === 'Text editor toolbar' && (
            <div className="ds-preview" style={{ marginTop: 'var(--space-component-gap-md)' }}>
              <div className="ds-textarea-example" style={{ width: 'fit-content' }}>
                <div className="ds-textarea-example__title-row">
                  <span className="ds-textarea-example__label">Title</span>
                  <span className="ds-textarea-example__required" aria-hidden="true">
                    *
                  </span>
                  <span className="icon icon--sm ds-textarea-example__info-icon" aria-hidden="true">
                    info
                  </span>
                </div>
                <div className="ds-textarea-example__toolbar">
                  <div className="ds-textarea-example__toolbar-tools">
                    <div className="ds-textarea-example__toolbar-font">
                      Normal
                      <span className="icon" aria-hidden="true">
                        arrow_drop_down
                      </span>
                    </div>
                    <div className="ds-textarea-example__toolbar-group ds-textarea-example__toolbar-group--first">
                      {TOOLBAR_FORMAT_BUTTONS.map(({ key, icon, label }) => (
                        <button
                          key={key}
                          type="button"
                          aria-label={label}
                          aria-pressed={activeFormats.includes(key)}
                          className={`ds-textarea-example__toolbar-btn${
                            activeFormats.includes(key) ? ' ds-textarea-example__toolbar-btn--active' : ''
                          }`}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => applyFormat(key)}
                        >
                          <span className="icon" aria-hidden="true">
                            {icon}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="ds-textarea-example__toolbar-group">
                      {TOOLBAR_PARAGRAPH_BUTTONS.map(({ icon, label }) => (
                        <button
                          key={icon}
                          type="button"
                          aria-label={label}
                          className="ds-textarea-example__toolbar-btn"
                        >
                          <span className="icon" aria-hidden="true">
                            {icon}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="ds-textarea-example__toolbar-group">
                      {TOOLBAR_OTHER_BUTTONS.map(({ icon, label }) => (
                        <button
                          key={icon}
                          type="button"
                          aria-label={label}
                          className="ds-textarea-example__toolbar-btn"
                        >
                          <span className="icon" aria-hidden="true">
                            {icon}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="ds-textarea-example__toolbar-actions">
                    <Button variant="primary" appearance="ghost" size="md">
                      Preview
                    </Button>
                    <button type="button" aria-label="Undo" className="ds-textarea-example__toolbar-btn">
                      <span className="icon" aria-hidden="true">
                        undo
                      </span>
                    </button>
                    <button type="button" aria-label="Redo" className="ds-textarea-example__toolbar-btn">
                      <span className="icon" aria-hidden="true">
                        redo
                      </span>
                    </button>
                  </div>
                </div>
                <div className="ds-textarea ds-textarea--force-focus">
                  <div
                    ref={editorRef}
                    className="ds-textarea__field"
                    contentEditable
                    suppressContentEditableWarning
                    onMouseUp={syncActiveFormats}
                    onKeyUp={syncActiveFormats}
                    onFocus={syncActiveFormats}
                    onInput={(event) =>
                      setToolbarCharCount(countCharacters(event.currentTarget.innerText))
                    }
                  >
                    {TOOLBAR_INITIAL_TEXT}
                  </div>
                </div>
                <div className="ds-textarea-example__hint">
                  <span
                    className="ds-textarea-example__hint-error"
                    style={{ visibility: toolbarCharCount >= CHAR_LIMIT ? 'visible' : 'hidden' }}
                  >
                    Error Message
                  </span>
                  <span className="ds-textarea-example__hint-count">
                    {toolbarCharCount}/{CHAR_LIMIT}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="states" className="ds-section">
        <h2 className="ds-section__title">States</h2>
        <p className="ds-section__desc">
          Error replaces the border color to flag invalid input; Disabled dims the surface, blocks
          interaction, and removes the resize handle.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Preview</th>
              <th>Border token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default</td>
              <td>
                <div style={{ width: 240 }}>
                  <Textarea placeholder="Placeholder" size="md" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-default)' }} />
                  <code>interactive-select-border-default</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Hover</td>
              <td>
                <div style={{ width: 240 }}>
                  <Textarea placeholder="Placeholder" size="md" state="hover" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-hover)' }} />
                  <code>interactive-select-border-hover</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Focus</td>
              <td>
                <div style={{ width: 240 }}>
                  <Textarea placeholder="Placeholder" size="md" state="focus" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-focus)' }} />
                  <code>interactive-select-border-focus (+ ring)</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Error</td>
              <td>
                <div style={{ width: 240 }}>
                  <Textarea placeholder="Placeholder" size="md" state="error" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-error)' }} />
                  <code>interactive-select-border-error</code>
                </span>
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td>
                <div style={{ width: 240 }}>
                  <Textarea placeholder="Placeholder" size="md" state="disabled" />
                </div>
              </td>
              <td>
                <span className="ds-swatch">
                  <span className="ds-swatch__dot" style={{ background: 'var(--interactive-select-border-disabled)' }} />
                  <code>interactive-select-border-disabled</code>
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
          A Textarea fills its container's width; minimum height and internal padding change
          between sizes, and content beyond six lines scrolls rather than growing the field.
        </p>
        <table className="ds-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Min-height</th>
              <td>
                <div className="ds-table-cell">
                  <code>--component-height-6xl / -3xl / -lg</code>
                  <span className="ds-tag">120 / 64 / 40px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Padding</th>
              <td>
                <div className="ds-table-cell">
                  <code>--space-component-padding-sm / -lg</code>
                  <span className="ds-tag">8px vertical / 16px horizontal</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Radius</th>
              <td>
                <div className="ds-table-cell">
                  <code>--radius-md</code>
                  <span className="ds-tag">8px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Border</th>
              <td>
                <div className="ds-table-cell">
                  <code>--border-sm</code>
                  <span className="ds-tag">1px</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Resize</th>
              <td>
                <div className="ds-table-cell">
                  <code>resize: vertical</code>
                  <span className="ds-tag">disabled in the Disabled state</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="related-component" className="ds-section">
        <h2 className="ds-section__title">Related Components</h2>
        <p className="ds-section__desc">Components that commonly appear alongside Textarea.</p>
        <div className="ds-related-grid">
          <button
            type="button"
            className="ds-related-card ds-related-card--link"
            onClick={() => onNavigate?.('form')}
          >
            <FormIcon className="ds-related-card__icon" />
            <span className="ds-related-card__name">Form</span>
          </button>
        </div>
      </section>
    </div>
  );
}
