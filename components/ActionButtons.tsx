
import React from 'react';

interface ActionButtonsProps {
  onGenerate: () => void;
  isLoading: boolean;
  isReady: boolean;
  translations: Record<string, string>;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onGenerate, isLoading, isReady, translations }) => {
  return (
    <div className="mt-4">
      <button
        onClick={onGenerate}
        disabled={isLoading || !isReady}
        className="w-full flex items-center justify-center bg-[#F77F00] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#d66e00] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F77F00]"
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {isLoading ? translations.generatingButton : translations.generateButton}
      </button>
    </div>
  );
};
   