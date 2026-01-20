'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Language } from '../../../../lib/i18n/translations';

interface ARViewPageProps {
  params: Promise<{
    lang: Language;
    id: string;
  }>;
}

const arEmbeds: Record<string, {
  nameEn: string;
  nameAr: string;
  iframeUrl: string;
}> = {
  '1': {
    nameEn: 'White-Tailed Lapwing',
    nameAr: 'الزقزاق أبيض الذيل',
    iframeUrl: 'https://webxr.run/06LeM1AzARYJP',
  },
  '5': {
    nameEn: 'Eurasian Stone-Curlew',
    nameAr: 'الكروان الأوراسي',
    iframeUrl: 'https://webxr.run/06LeM1AzARYJP',
  },
  '19': {
    nameEn: 'Desert Monitor',
    nameAr: 'ورل الصحراء',
    iframeUrl: 'https://webxr.run/06LeM1AzARYJP',
  },
};

export default function ARViewPage({ params }: ARViewPageProps) {
  const { lang, id } = use(params);
  const router = useRouter();
  const isArabic = lang === 'ar';
  const [showInstructions, setShowInstructions] = useState(true);

  const animal = arEmbeds[id] || arEmbeds['5'];

  const handleBack = () => {
    router.back();
  };

  const handleViewMore = () => {
    router.push(`/${lang}/thank-you`);
  };

  const handleStartAR = () => {
    setShowInstructions(false);
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      {/* AR Iframe with Enhanced Permissions */}
      {!showInstructions && (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src={animal.iframeUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              margin: 0,
              padding: 0,
              overflow: 'hidden',
            }}
            allow="camera *; microphone *; gyroscope *; accelerometer *; magnetometer *; xr-spatial-tracking *; geolocation *; fullscreen *"
            sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-popups allow-presentation"
            allowFullScreen
            title={`AR Experience - ${isArabic ? animal.nameAr : animal.nameEn}`}
          />
        </div>
      )}

      {/* Rest of the code stays the same... */}
      {showInstructions && (
        <div className="absolute inset-0 bg-[#1A1410] flex flex-col items-center justify-center p-6 overflow-y-auto">
          <div className="max-w-md w-full text-center space-y-6 my-auto">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4">
              <span className="text-5xl">📱</span>
            </div>

            <h1 className="text-white text-2xl font-semibold mb-2" dir={isArabic ? 'rtl' : 'ltr'}>
              {isArabic ? 'تجربة الواقع المعزز' : 'AR Experience'}
            </h1>

            <p className="text-white/80 text-lg" dir={isArabic ? 'rtl' : 'ltr'}>
              {isArabic ? animal.nameAr : animal.nameEn}
            </p>

            <div className="space-y-3 text-left" dir={isArabic ? 'rtl' : 'ltr'}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">1</div>
                <p className="text-white/70 text-sm pt-1">
                  {isArabic ? 'اضغط "السماح" عند طلب إذن الكاميرا' : 'Tap "Allow" when camera permission is requested'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">2</div>
                <p className="text-white/70 text-sm pt-1">
                  {isArabic ? 'وجه الكاميرا إلى سطح مستوٍ' : 'Point camera at a flat surface'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">3</div>
                <p className="text-white/70 text-sm pt-1">
                  {isArabic ? 'انقر على الشاشة لوضع الحيوان' : 'Tap screen to place the animal'}
                </p>
              </div>
            </div>

            <button
              onClick={handleStartAR}
              className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#1A1410] font-semibold text-base py-4 px-6 rounded-lg transition-all shadow-lg mt-8"
            >
              {isArabic ? 'ابدأ تجربة AR' : 'Start AR Experience'}
            </button>

            <button
              onClick={handleBack}
              className="w-full bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium text-base py-3 px-6 rounded-lg transition-all"
            >
              {isArabic ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      {!showInstructions && (
        <>
          <div className="fixed top-0 left-0 right-0 z-[9999] p-4 flex justify-between items-center">
            <div className="flex justify-between items-center w-full">
              <button onClick={handleBack} className="w-10 h-10 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-full flex items-center justify-center transition-all shadow-lg border border-white/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={() => setShowInstructions(true)} className="w-10 h-10 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-full flex items-center justify-center transition-all shadow-lg border border-white/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="fixed bottom-4 right-4 z-[9999]">
            <button onClick={handleViewMore} className="bg-[#6B5D4F]/90 backdrop-blur-sm hover:bg-[#7B6D5F] text-white font-medium text-xs sm:text-sm py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-all shadow-lg border border-white/10 whitespace-nowrap">
              {isArabic ? 'عرض المزيد' : 'View More'}
            </button>
          </div>
        </>
      )}
    </main>
  );
}