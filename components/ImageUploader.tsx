
import React, { useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File, dataUrl: string) => void;
  uploadedImageUrl: string | null;
  translations: Record<string, string>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImageUrl, translations }) => {
  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFileChange(event.dataTransfer.files);
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="w-full">
      {uploadedImageUrl ? (
        <div className="w-full h-80 rounded-xl overflow-hidden shadow-md border-2 border-dashed border-gray-200">
          <img src={uploadedImageUrl} alt="Uploaded room" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => handleFileChange(e.target.files)}
          />
          <div className="text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-semibold text-gray-700">{translations.uploadTitle}</h3>
            <p className="mt-1 text-sm text-gray-500">{translations.uploadSubtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);
   