
import React from 'react';
import type { Theme } from '../types';

interface ThemeSelectorProps {
  selectedTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  themes: Theme[];
  translations: Record<string, string>;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange, themes, translations }) => {
  return (
    <div>
      <label htmlFor="theme-select" className="block text-sm font-medium text-gray-700 mb-2">
        {translations.themeLabel}
      </label>
      <select
        id="theme-select"
        value={selectedTheme}
        onChange={(e) => onThemeChange(e.target.value as Theme)}
        className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F77F00] focus:border-[#F77F00] transition-all"
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};
   