'use client';

import { useState, useRef, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Language } from '../../../lib/i18n/translations';

interface IntroVideoPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default function IntroVideoPage({ params }: IntroVideoPageProps) {
  const { lang } = use(params);
  const [showButtons, setShowButtons] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const isArabic = lang === 'ar';

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Try to autoplay
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
            setVideoStarted(true);
            setShowPlayButton(false);
            console.log('Video autoplay started');
          })
          .catch((error) => {
            // Autoplay was prevented - show custom play button
            console.log('Autoplay prevented, showing play button:', error);
            setShowPlayButton(true);
          });
      }

      // Track video time - show buttons after 5 seconds
      const handleTimeUpdate = () => {
        if (video.currentTime >= 5 && !showButtons) {
          console.log('5 seconds reached, showing buttons');
          setShowButtons(true);
        }
      };

      const handlePlay = () => {
        setVideoStarted(true);
        setShowPlayButton(false);
      };

      const handlePause = () => {
        // Don't show play button if video is paused by user using controls
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [showButtons]);

  const handleCustomPlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
      setShowPlayButton(false);
      setVideoStarted(true);
    }
  };

  const handleStartJourney = () => {
    router.push(`/${lang}/animals`);
  };

  const handleWinBook = () => {
    router.push(`/${lang}/signup`);
  };

  return (
    <main className="min-h-screen bg-[#1A1410] flex flex-col">
      {/* Header Section - Black Background with LARGER Logo */}
      <header className="bg-black py-10 px-6 pt-16 sm:pt-20">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="AL MARMOOM"
            width={450}
            height={180}
            className="w-auto h-32 sm:h-36 md:h-40 lg:h-44 object-contain"
            priority
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 py-6">
        {/* Video Section */}
        <div className="w-full max-w-2xl mx-auto relative">
          <video
            ref={videoRef}
            className="w-full rounded-xl shadow-2xl"
            controls
            playsInline
            preload="auto"
          >
            <source src={`/videos/${lang}/intro.mp4`} type="video/mp4" />
            
            {/* English Subtitles */}
            <track
              kind="subtitles"
              src="/videos/subtitles/intro-en.vtt"
              srcLang="en"
              label="English"
              default={!isArabic}
            />
            
            {/* Arabic Subtitles */}
            <track
              kind="subtitles"
              src="/videos/subtitles/intro-ar.vtt"
              srcLang="ar"
              label="العربية"
              default={isArabic}
            />
            
            Your browser does not support the video tag.
          </video>

          {/* Custom Centered Play Button Overlay */}
          {showPlayButton && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl cursor-pointer"
              onClick={handleCustomPlayClick}
            >
              <div className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-2xl hover:scale-110">
                <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[26px] border-l-[#1A1410] border-b-[16px] border-b-transparent ml-2"></div>
              </div>
            </div>
          )}

          {/* Video Description */}
          <div className="mt-4 text-center">
            <p className="text-white/90 text-sm font-medium">
              {isArabic 
                ? 'رسالة ترحيبية من علي بن ثالث' 
                : 'Welcome message by Ali Bin Thalith'}
            </p>
            <p className="text-white/60 text-xs mt-1">
              {isArabic 
                ? 'نظرة سريعة على الأنواع + دعوة للمشاهدة' 
                : 'Quick species insight + invite to watch'}
            </p>
          </div>
        </div>

        {/* Buttons Section - Appears after 5 seconds of playback */}
        <div className="w-full max-w-md mx-auto mt-6">
          {showButtons ? (
            <div 
              className="space-y-3"
              style={{ 
                animation: 'fadeIn 0.5s ease-in',
              }}
            >
              {/* Start Journey Button */}
              <button
                onClick={handleStartJourney}
                className="w-full bg-[#4A4A4A] hover:bg-[#5A5A5A] text-white font-semibold text-base py-4 px-6 rounded-lg transition-all shadow-lg"
              >
                {isArabic ? 'ابدأ الرحلة' : 'Start Journey'}
              </button>

              {/* Win a Book Button */}
              <button
                onClick={handleWinBook}
                className="w-full bg-[#3A3A3A] hover:bg-[#4A4A4A] text-white font-semibold text-base py-4 px-6 rounded-lg transition-all shadow-lg"
              >
                {isArabic ? 'اربح كتابًا' : 'Win a Book'}
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              {videoStarted ? (
                <p className="text-white/60 text-sm">
                  {isArabic ? 'جارٍ تشغيل الفيديو...' : 'Playing video...'}
                </p>
              ) : (
                <p className="text-white/60 text-sm">
                  {isArabic ? 'انقر فوق تشغيل لبدء الفيديو' : 'Click play to start video'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6">
          <p className="text-center text-[10px] text-white/60 tracking-wide">
            {isArabic 
              ? 'محمية المرموم الصحراوية' 
              : 'Al Marmoom Desert Conservation Reserve'}
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}