import React from 'react';

const Footer: React.FC = () => (
  <footer className="px-4 pb-32 pt-6 text-center text-sm text-label-tertiary lg:pb-12">
    © {new Date().getFullYear()} Vraj Patel · Designed &amp; built in San Jose, California
  </footer>
);

export default Footer;
