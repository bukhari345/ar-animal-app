'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Language } from '../../../lib/i18n/translations';

interface ThankYouPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default function ThankYouPage({ params }: ThankYouPageProps) {
  const { lang } = use(params);
  const router = useRouter();
  const isArabic = lang === 'ar';

  const handleGoBackToMain = () => {
    // Redirect to animals page (main page)
    router.push(`/${lang}/animals`);
  };

  const handleBackArrow = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-[#1A1410] relative flex flex-col overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1410] via-[#2D2419] to-[#1A1410] opacity-50"></div>

      {/* Back Arrow - Top Left */}
      <div className="absolute top-0 left-0 p-4 z-10">
        <button
          onClick={handleBackArrow}
          className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          aria-label="Go back"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className="text-center space-y-6 max-w-md w-full">
          {/* Logo - EXTRA LARGE on mobile, responsive on larger screens */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="AL MARMOOM"
              width={500}
              height={200}
              className="w-auto h-32 sm:h-36 md:h-40 lg:h-44 object-contain mx-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* Thank You Text */}
          <div className="space-y-4">
            <h1 
              className="text-white text-xl sm:text-2xl font-medium leading-relaxed whitespace-pre-line" 
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic 
                ? 'شكراً لزيارتك\nالمرموم' 
                : 'Thank you for visiting\nAL MARMOOM'}
            </h1>
            
            <p 
              className="text-white/90 text-base sm:text-lg font-light leading-relaxed" 
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {isArabic 
                ? 'معرض التصوير الفوتوغرافي بالسيارة' 
                : 'Drive-Thru Photography Exhibition'}
            </p>
          </div>

          {/* Decorative line */}
          <div className="pt-6">
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Bottom Button - Redirects to Animals Page */}
      <div className="relative z-10 fixed bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-[#1A1410] via-[#1A1410] to-transparent">
        <button
          onClick={handleGoBackToMain}
          className="w-full max-w-md mx-auto block bg-[#D4AF37] hover:bg-[#B8941F] text-[#1A1410] font-semibold text-base py-4 px-6 rounded-lg transition-all shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Go Back To Main Page'}
        </button>
      </div>
    </main>
  );
}