import './Tag.css';

export type TagColor = 'gray' | 'primary' | 'green' | 'orange' | 'red' | 'blue';
export type TagStyle = 'solid' | 'outline';

export interface TagProps {
  label: string;
  color?: TagColor;
  style?: TagStyle;
  className?: string;
}

export function Tag({ label, color = 'gray', style = 'outline', className }: TagProps) {
  const classes = [
    'ds-tag',
    color !== 'gray' ? `ds-tag--${color}` : '',
    style === 'solid' ? 'ds-tag--solid' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <span className="ds-tag__label">{label}</span>
    </span>
  );
}
