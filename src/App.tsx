import React from 'react';
import { MotionConfig } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Environment from './components/ui/Environment';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => (
  <ThemeProvider>
    <MotionConfig reducedMotion="user">
      <Environment />
      <Navigation />
      {/* Left padding on large screens keeps windows clear of the tab bar ornament */}
      <div className="relative overflow-x-clip lg:pl-20">
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  </ThemeProvider>
);

export default App;
