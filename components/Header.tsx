
import React from 'react';
import type { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, translations }) => {
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="flex justify-between items-center py-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{translations.title}</h1>
        <p className="text-sm sm:text-md text-gray-500 mt-1">{translations.tagline}</p>
      </div>
      <button
        onClick={toggleLanguage}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F77F00]"
      >
        <GlobeIcon className="w-5 h-5 text-gray-600" />
        <span className="font-semibold text-gray-700">{language === 'en' ? 'العربية' : 'English'}</span>
      </button>
    </header>
  );
};

const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l-5.25-5.25a2.25 2.25 0 010-3.182M10.5 21V3m0 18h2.25m-2.25 0h-2.25m0 0l5.25-5.25M10.5 3M13.5 21v-1.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m-4.5-18h2.25a2.25 2.25 0 002.25-2.25V3m-4.5 0a2.25 2.25 0 012.25-2.25V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H11.25a.75.75 0 01-.75-.75v-.008z" />
    </svg>
);
   