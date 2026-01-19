'use client';

import { use, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Language } from '../../../../lib/i18n/translations';

interface AnimalVideoPageProps {
  params: Promise<{
    lang: Language;
    id: string;
  }>;
}

// Animal data
const animalData: Record<string, {
  nameEn: string;
  nameAr: string;
  scientificName: string;
  hasVideo: boolean;
  videoPath?: string;
  placeholderImage?: string;
}> = {
  '1': {
    nameEn: 'White-Tailed Lapwing',
    nameAr: 'الزقزاق أبيض الذيل',
    scientificName: 'VANELLUS LEUCURUS',
    hasVideo: false,
    placeholderImage: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800',
  },
  '5': {
    nameEn: 'Eurasian Stone-Curlew',
    nameAr: 'الكروان الأوراسي',
    scientificName: 'BURHINUS OEDICNEMUS',
    hasVideo: true,
    videoPath: '/videos/en/Stone-curlew_videomain.mp4',
  },
  '19': {
    nameEn: 'Desert Monitor',
    nameAr: 'ورل الصحراء',
    scientificName: 'VARANUS GRISEUS',
    hasVideo: false,
    placeholderImage: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800',
  },
};

export default function AnimalVideoPage({ params }: AnimalVideoPageProps) {
  const { lang, id } = use(params);
  const router = useRouter();
  const isArabic = lang === 'ar';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const animal = animalData[id] || animalData['5'];

  const handleEnterAR = () => {
    router.push(`/${lang}/ar-view/${id}`);
  };

  const handleBack = () => {
    router.back();
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Top Back Button */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full flex items-center justify-center transition-all shadow-lg border border-white/20"
          aria-label="Go back"
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      </div>

      {/* Full Screen Video or Placeholder */}
      <div className="absolute inset-0">
        {animal.hasVideo ? (
          // Actual Video with Controls
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={animal.videoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Play Button Overlay - Only shows when paused */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <button
                  onClick={handlePlayPause}
                  className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all pointer-events-auto"
                >
                  <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[28px] border-l-white border-b-[18px] border-b-transparent ml-2"></div>
                </button>
              </div>
            )}
          </>
        ) : (
          // Placeholder Image
          <>
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${animal.placeholderImage})` }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Placeholder Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mb-4">
                  <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[28px] border-l-white border-b-[18px] border-b-transparent ml-2"></div>
                </div>
                <p className="text-white/60 text-sm">
                  {isArabic ? 'الفيديو قريباً' : 'Video Coming Soon'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Overlay with Info and Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-4 pb-6 z-10">
        
        {/* Animal Info */}
        <div className="mb-4 text-center">
          <h2 className="text-white text-lg font-medium mb-1" dir={isArabic ? 'rtl' : 'ltr'}>
            {isArabic ? animal.nameAr : animal.nameEn}
          </h2>
          <p className="text-white/60 text-xs uppercase tracking-widest">
            {animal.scientificName}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {/* Back Button (Bottom Left) */}
          <button
            onClick={handleBack}
            className="w-12 h-12 bg-[#4A3D2E]/80 backdrop-blur-sm hover:bg-[#5A4D3E] rounded-lg flex items-center justify-center transition-all shadow-lg border border-white/10"
          >
            <svg 
              className="w-6 h-6 text-white" 
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

          {/* Enter AR Experience Button */}
          <button
            onClick={handleEnterAR}
            className="flex-1 bg-[#6B5D4F]/80 backdrop-blur-sm hover:bg-[#7B6D5F] text-white font-medium text-sm py-3 px-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 border border-white/10"
            dir={isArabic ? 'rtl' : 'ltr'}
          >
            <span className="uppercase tracking-wide">
              {isArabic ? 'عرض في AR' : 'VIEW IN AR'}
            </span>
          </button>

          {/* Settings/Options Button */}
          <button
            className="w-12 h-12 bg-[#4A3D2E]/80 backdrop-blur-sm hover:bg-[#5A4D3E] rounded-lg flex items-center justify-center transition-all shadow-lg border border-white/10"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}