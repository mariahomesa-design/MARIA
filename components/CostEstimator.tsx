
import React from 'react';

interface CostEstimatorProps {
  cost: string | null;
  translations: Record<string, string>;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ cost, translations }) => {
  if (!cost) {
    return null;
  }

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-700 mb-3">{translations.costTitle}</h3>
      <p className="text-gray-600 leading-relaxed">{cost}</p>
    </div>
  );
};
   