
import type { Theme, Language } from './types';

export const THEMES: Theme[] = [
  'Modern',
  'Arabic Majlis',
  'Minimalist',
  'Luxury',
  'Scandinavian',
  'Classic',
];

export const TRANSLATIONS: { [key in Language]: Record<string, string> } = {
  en: {
    title: 'GharVision AI',
    tagline: 'Turn your grey structure into a dream design.',
    uploadTitle: 'Upload Your Room Photo',
    uploadSubtitle: 'Drag & drop or click to upload (JPG, PNG)',
    uploadButton: 'Select Image',
    configureTitle: 'Configure Your Design',
    themeLabel: 'Select a Design Theme',
    generateButton: 'Generate Design',
    generatingButton: 'Generating...',
    before: 'Before',
    after: 'After',
    download: 'Download',
    share: 'Share',
    costTitle: 'Estimated Cost',
    loading: 'Our AI is envisioning your space... Please wait.',
    errorNoImage: 'Please upload an image first.',
    errorGeneration: 'An error occurred while generating the design. Please try again.',
    error: 'Error'
  },
  ar: {
    title: 'رؤية البيت بالذكاء الاصطناعي',
    tagline: 'حوّل هيكل بيتك الرمادي إلى تصميم أحلامك.',
    uploadTitle: 'ارفع صورة غرفتك',
    uploadSubtitle: 'اسحب وأفلت أو انقر للتحميل (JPG, PNG)',
    uploadButton: 'اختر صورة',
    configureTitle: 'إعدادات التصميم',
    themeLabel: 'اختر طراز التصميم',
    generateButton: 'إنشاء التصميم',
    generatingButton: 'جاري الإنشاء...',
    before: 'قبل',
    after: 'بعد',
    download: 'تحميل',
    share: 'مشاركة',
    costTitle: 'التكلفة التقديرية',
    loading: 'يعمل الذكاء الاصطناعي على تصور مساحتك... يرجى الانتظار.',
    errorNoImage: 'يرجى رفع صورة أولاً.',
    errorGeneration: 'حدث خطأ أثناء إنشاء التصميم. يرجى المحاولة مرة أخرى.',
    error: 'خطأ'
  },
};
   