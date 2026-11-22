import type { SimpleIcon } from 'simple-icons';

/** A simple-icons brand mark, in the current text colour unless told otherwise. */
export default function BrandIcon({ icon, size = 18, color, className = '' }: { icon: SimpleIcon; size?: number; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={color ?? 'currentColor'} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
