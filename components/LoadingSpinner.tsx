
import React from 'react';

interface LoadingSpinnerProps {
    translations: Record<string, string>;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ translations }) => {
  return (
    <div className="text-center py-8">
      <div className="relative inline-block w-20 h-20">
        <div className="absolute border-4 border-solid border-gray-200 rounded-full w-full h-full"></div>
        <div className="absolute border-4 border-solid border-[#F77F00] border-t-transparent rounded-full w-full h-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">{translations.loading}</p>
    </div>
  );
};
   