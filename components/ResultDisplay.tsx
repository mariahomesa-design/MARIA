import React, { useState } from 'react';

interface ResultDisplayProps {
  beforeImage: string;
  afterImage: string;
  translations: Record<string, string>;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ beforeImage, afterImage, translations }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = afterImage;
    link.download = 'gharvision-design.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(afterImage);
        const blob = await response.blob();
        const file = new File([blob], 'gharvision-design.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'GharVision AI Design',
          text: 'Check out this interior design I created with GharVision AI!',
          files: [file],
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 relative">
      <div className="relative w-full aspect-video mx-auto rounded-lg overflow-hidden group">
        {/* Base Image (Before) */}
        <img
          src={beforeImage}
          alt={translations.before}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Overlay Image (After) - Clipped */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0% 100%)` }}
        >
          <img
            src={afterImage}
            alt={translations.after}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          aria-label="Image comparison slider"
          className="absolute inset-0 w-full h-full cursor-ew-resize opacity-0"
        />
        
        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/80 backdrop-blur-sm shadow-md pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
            <div className="absolute top-1/2 -translate-y-1/2 -left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                <ChevronUpDownIcon className="w-6 h-6 text-gray-700" />
            </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-sm font-semibold rounded-full pointer-events-none select-none">
          {translations.before}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm font-semibold rounded-full pointer-events-none select-none">
          {translations.after}
        </div>

        {/* Action Buttons - Appear on hover */}
        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={handleDownload} title={translations.download} className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all shadow-md">
            <DownloadIcon className="w-6 h-6" />
          </button>
          <button onClick={handleShare} title={translations.share} className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-all shadow-md">
            <ShareIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.044.585.053m-2.283 4.417c.544.258 1.15.425 1.79.497m0 0a2.247 2.247 0 002.092-.144m0-4.417a2.247 2.247 0 012.092-.144m-2.283 4.417c.544.258 1.15.425 1.79.497m0 0a2.247 2.247 0 002.092-.144" />
    </svg>
);

const ChevronUpDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </svg>
);