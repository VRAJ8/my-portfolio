import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyTheme = (dark: boolean) => {
  document.documentElement.classList.toggle('dark', dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#05060d' : '#e6ecf7');
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // index.html applies the saved theme before first paint; start from whatever it chose.
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    applyTheme(isDarkMode);
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable (private mode); the theme still works for this visit.
    }
  }, [isDarkMode]);

  // Colours cross-fade via the registered custom properties in index.css.
  const toggleTheme = useCallback(() => setIsDarkMode((dark) => !dark), []);

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
