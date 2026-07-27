import json, re

with open('/Users/sophiasoong/Documents/AI Playground/MD/tokens.json') as f:
    data = json.loads(json.loads(f.read()))

size = data['size']
motion = data['motion']
opacity = data['opacity']
mms = data['color']['m-m-s']
mma = data['color']['m-m-a']

# Tokens actually consumed by the design-system app (Button component + doc-site chrome).
USED = [
    # Button — primary solid/outline/ghost
    'interactive-button-surface-primary-solid-default','interactive-button-surface-primary-solid-hover',
    'interactive-button-surface-primary-solid-focus','interactive-button-surface-primary-solid-disabled',
    'interactive-button-label-primary-solid-default','interactive-button-label-primary-solid-hover',
    'interactive-button-label-primary-solid-focus','interactive-button-label-primary-solid-disabled',
    'interactive-button-icon-primary-solid-default','interactive-button-icon-primary-solid-hover',
    'interactive-button-icon-primary-solid-focus','interactive-button-icon-primary-solid-disabled',
    'interactive-button-surface-primary-outline-default','interactive-button-surface-primary-outline-hover',
    'interactive-button-surface-primary-outline-focus','interactive-button-surface-primary-outline-disabled',
    'interactive-button-label-primary-outline-default','interactive-button-label-primary-outline-hover',
    'interactive-button-label-primary-outline-focus','interactive-button-label-primary-outline-disabled',
    'interactive-button-border-primary-outline-default','interactive-button-border-primary-outline-hover',
    'interactive-button-border-primary-outline-focus','interactive-button-border-primary-outline-disabled',
    'interactive-button-icon-primary-outline-default','interactive-button-icon-primary-outline-hover',
    'interactive-button-icon-primary-outline-focus','interactive-button-icon-primary-outline-disabled',
    'interactive-button-surface-primary-ghost-default','interactive-button-surface-primary-ghost-hover',
    'interactive-button-surface-primary-ghost-focus','interactive-button-surface-primary-ghost-disabled',
    'interactive-button-label-primary-ghost-default','interactive-button-label-primary-ghost-hover',
    'interactive-button-label-primary-ghost-focus','interactive-button-label-primary-ghost-disabled',
    'interactive-button-icon-primary-ghost-default','interactive-button-icon-primary-ghost-hover',
    'interactive-button-icon-primary-ghost-focus','interactive-button-icon-primary-ghost-disabled',
    # Button — secondary solid
    'interactive-button-surface-secondary-solid-default','interactive-button-surface-secondary-solid-hover',
    'interactive-button-surface-secondary-solid-focus','interactive-button-surface-secondary-solid-disabled',
    'interactive-button-label-secondary-solid-default','interactive-button-label-secondary-solid-disabled',
    # Button — danger solid/outline/ghost
    'interactive-button-surface-danger-solid-default','interactive-button-surface-danger-solid-hover',
    'interactive-button-surface-danger-solid-focus','interactive-button-surface-danger-solid-disabled',
    'interactive-button-label-danger-solid-default','interactive-button-label-danger-solid-disabled',
    'interactive-button-surface-danger-outline-default','interactive-button-surface-danger-outline-hover',
    'interactive-button-surface-danger-outline-focus','interactive-button-surface-danger-outline-disabled',
    'interactive-button-label-danger-outline-default','interactive-button-label-danger-outline-hover',
    'interactive-button-label-danger-outline-focus','interactive-button-label-danger-outline-disabled',
    'interactive-button-border-danger-outline-default','interactive-button-border-danger-outline-hover',
    'interactive-button-border-danger-outline-focus','interactive-button-border-danger-outline-disabled',
    'interactive-button-surface-danger-ghost-default','interactive-button-surface-danger-ghost-hover',
    'interactive-button-surface-danger-ghost-focus','interactive-button-surface-danger-ghost-disabled',
    'interactive-button-label-danger-ghost-default',
    # Focus ring
    'interactive-shadow-primary',
    # App chrome — surface / text / sidebar / divider / brand
    'brand-primary-400','brand-primary-600','brand-primary-50','brand-primary-75','brand-primary-100',
    'brand-neutral-0','brand-neutral-100','brand-neutral-200','brand-neutral-300','brand-neutral-400',
    'brand-neutral-500','brand-neutral-600','brand-neutral-700','brand-neutral-800','brand-neutral-900','brand-neutral-950',
    'brand-danger-500',
    'text-heading-primary-neutral','text-heading-secondary-neutral','text-body-primary-neutral',
    'text-body-secondary-neutral','text-body-tertiary-neutral','text-caption-primary-light','text-link-default',
    'surface-card-surface-default','surface-card-shadow-default','surface-card-border-default',
    'surface-sidebar-surface-default',
    'interactive-sidebar-item-surface-default','interactive-sidebar-item-surface-hover','interactive-sidebar-item-surface-active',
    'interactive-sidebar-item-label-default','interactive-sidebar-item-label-hover','interactive-sidebar-item-label-active',
    'interactive-sidebar-item-icon-default','interactive-sidebar-item-icon-hover','interactive-sidebar-item-icon-active',
    'interactive-searchbar-surface-default','interactive-searchbar-border-default','interactive-searchbar-label-default',
    'interactive-searchbar-placeholder-default','interactive-searchbar-border-focus','interactive-searchbar-icon-default',
    'global-background-page','global-divider-neutral-light','global-overlay-dark',
    'surface-tag-background-neutral-default','surface-tag-border-neutral-default','surface-tag-label-neutral-default',
    'interactive-list-background-hover',
]

def kebab(k):
    return k

lines = []
lines.append('/* AUTO-GENERATED from MD/tokens.json — do not hand-edit values, regenerate via scripts/gen-tokens.py */')
lines.append(':root {')
lines.append('  /* ---- size ---- */')
for k in sorted(size):
    unit = '' if k == 'radius-full' and False else 'px'
    lines.append(f'  --{kebab(k)}: {size[k]}px;')
lines.append('')
lines.append('  /* ---- motion ---- */')
for k in sorted(motion):
    lines.append(f'  --duration-{k.replace("duration-","")}: {motion[k]}ms;')
lines.append('')
lines.append('  /* ---- opacity ---- */')
for k in sorted(opacity):
    label = k.rstrip('-')
    lines.append(f'  --opacity-{label}: {int(opacity[k])/100};')
lines.append('')
lines.append('  /* ---- typography ---- */')
eng = data['font']['english']
for k in sorted(eng):
    val = eng[k]
    if isinstance(val, str):
        val = f'"{val}", sans-serif'
    lines.append(f'  --{kebab(k)}: {val};')
lines.append('')
lines.append('  /* ---- color: MMS (default brand) ---- */')
missing = []
for k in USED:
    if k not in mms:
        missing.append(k)
        continue
    lines.append(f'  --{kebab(k)}: {mms[k]};')
lines.append('}')
lines.append('')
lines.append('/* ---- color: MMA overrides (only tokens whose value differs by brand) ---- */')
lines.append('[data-color-mode="mma"] {')
for k in USED:
    if k not in mma:
        continue
    if mms.get(k) != mma[k]:
        lines.append(f'  --{kebab(k)}: {mma[k]};')
lines.append('}')

out = '\n'.join(lines) + '\n'
with open('/Users/sophiasoong/Documents/AI Playground/playground/design-system/src/styles/tokens.css', 'w') as f:
    f.write(out)

print('missing tokens:', missing)
print('written', len(lines), 'lines')
