
import React from 'react';

interface ErrorDisplayProps {
  message: string | null;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  );
};
   