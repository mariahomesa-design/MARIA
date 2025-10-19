
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ThemeSelector } from './components/ThemeSelector';
import { ActionButtons } from './components/ActionButtons';
import { ResultDisplay } from './components/ResultDisplay';
import { CostEstimator } from './components/CostEstimator';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import type { Language, Theme } from './types';
import { THEMES, TRANSLATIONS } from './constants';
import { generateDesignedImage, detectRoomType, estimateCost } from './services/geminiService';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme>(THEMES[0]);
  const [costEstimation, setCostEstimation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const handleImageUpload = (file: File, dataUrl: string) => {
    setUploadedImageFile(file);
    setUploadedImageUrl(dataUrl);
    setGeneratedImageUrl(null);
    setCostEstimation(null);
    setError(null);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // remove data:image/jpeg;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleGenerateDesign = useCallback(async () => {
    if (!uploadedImageFile) {
      setError(t.errorNoImage);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    setCostEstimation(null);

    try {
      const imageBase64 = await fileToBase64(uploadedImageFile);

      // We run AI tasks in parallel for better performance
      const [detectedRoom, cost] = await Promise.all([
        detectRoomType(imageBase64, language),
        estimateCost(selectedTheme, language)
      ]);
      
      const generatedImageBase64 = await generateDesignedImage(imageBase64, selectedTheme, detectedRoom, language);
      
      setGeneratedImageUrl(`data:image/jpeg;base64,${generatedImageBase64}`);
      setCostEstimation(cost);

    } catch (err) {
      console.error(err);
      setError(t.errorGeneration);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImageFile, selectedTheme, language, t]);

  return (
    <div className={`min-h-screen text-gray-800 transition-all duration-300 ${language === 'ar' ? 'rtl font-[Cairo]' : 'ltr font-[Inter]'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-6xl p-4 sm:p-8">
        <Header language={language} setLanguage={setLanguage} translations={t} />

        <main className="mt-8">
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <ImageUploader onImageUpload={handleImageUpload} uploadedImageUrl={uploadedImageUrl} translations={t} />
              
              <div className="flex flex-col space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">{t.configureTitle}</h2>
                <ThemeSelector
                  selectedTheme={selectedTheme}
                  onThemeChange={setSelectedTheme}
                  themes={THEMES}
                  translations={t}
                />
                <ActionButtons
                  onGenerate={handleGenerateDesign}
                  isLoading={isLoading}
                  isReady={!!uploadedImageFile}
                  translations={t}
                />
              </div>
            </div>
            {isLoading && <LoadingSpinner translations={t} />}
            {error && <ErrorDisplay message={error} />}
          </div>

          {!isLoading && generatedImageUrl && (
            <div className="mt-12">
               <ResultDisplay
                  beforeImage={uploadedImageUrl!}
                  afterImage={generatedImageUrl}
                  translations={t}
                />
               <CostEstimator cost={costEstimation} translations={t} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
   