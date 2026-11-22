import type { ReactNode } from 'react';
import Split from './Split';

/** A chapter's number and name, then its headline. */
export default function ChapterTitle({ index, label, children, className = '' }: { index: number; label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="kicker flex items-center gap-3">
        <span className="text-accent">{String(index).padStart(2, '0')}</span>
        <span className="h-px w-10 bg-[var(--line-strong)]" aria-hidden="true" />
        {label}
      </p>
      <Split as="h2" className="display mt-6 text-[clamp(3rem,7.4vw,6.8rem)]">
        {children}
      </Split>
    </div>
  );
}
