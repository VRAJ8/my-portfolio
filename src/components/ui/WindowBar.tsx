import React from 'react';

/** The close dot and grab bar that sit under every visionOS window. Decorative only. */
const WindowBar: React.FC = () => (
  <div className="mt-4 flex items-center justify-center gap-2.5" aria-hidden="true">
    <span className="h-2.5 w-2.5 rounded-full bg-label-tertiary opacity-70" />
    <span className="h-2.5 w-24 rounded-full bg-label-tertiary opacity-70 transition-all duration-300 hover:w-28 hover:opacity-100" />
  </div>
);

export default WindowBar;
