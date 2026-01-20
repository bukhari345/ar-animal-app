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
  const [showPlayButton, setShowPlayButton] = useState(true); // Show by default for safety
  const [videoStarted, setVideoStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const isArabic = lang === 'ar';

  /**
   * CROSS-PLATFORM VIDEO HANDLING
   * - Always start muted for autoplay compatibility
   * - Show play button by default (safer approach)
   * - Handle both Android and iOS quirks
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 5 && !showButtons) {
        setShowButtons(true);
      }
    };

    const handlePlay = () => {
      setVideoStarted(true);
      setShowPlayButton(false);
    };

    const handlePause = () => {
      // Only show play button if video hasn't started yet
      if (!videoStarted) {
        setShowPlayButton(true);
      }
    };

    const handleEnded = () => {
      // Auto-show buttons when video ends
      setShowButtons(true);
    };

    const handleLoadedMetadata = () => {
      // Video metadata is loaded, try autoplay
      attemptAutoplay();
    };

    const attemptAutoplay = () => {
      if (video.paused) {
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Autoplay succeeded (will be muted)
              setShowPlayButton(false);
              setVideoStarted(true);
            })
            .catch(() => {
              // Autoplay blocked - show play button
              setShowPlayButton(true);
            });
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Fallback: Check if autoplay worked after delay
    const autoplayCheck = setTimeout(() => {
      if (video.paused && !videoStarted) {
        setShowPlayButton(true);
      }
    }, 1500);

    return () => {
      clearTimeout(autoplayCheck);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [showButtons, videoStarted]);

  /**
   * Handle user-initiated playback
   * Unmute on first tap (iOS/Android requirement)
   */
  const handleCustomPlayClick = () => {
    const video = videoRef.current;
    if (!video) return;

    // Unmute on user interaction
    video.muted = false;
    setIsMuted(false);

    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setShowPlayButton(false);
          setVideoStarted(true);
        })
        .catch((error) => {
          console.error('Playback failed:', error);
          // Keep play button visible
          setShowPlayButton(true);
        });
    }
  };

  /**
   * Toggle mute/unmute during playback
   */
  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleStartJourney = () => {
    router.push(`/${lang}/animals`);
  };

  const handleSkipVideo = () => {
    router.push(`/${lang}/animals`);
  };

  return (
    <main className="min-h-screen bg-[#1A1410] flex flex-col">
      {/* Header */}
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

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 py-6">
        {/* Video Container */}
        <div className="w-full max-w-2xl mx-auto relative">
          <video
            ref={videoRef}
            className="w-full rounded-xl shadow-2xl"
            playsInline
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            muted
            preload="auto"
            crossOrigin="anonymous"
            controlsList="nodownload"
          >
            {/* MP4 source - Best compatibility for iOS and Android */}
            <source src={`/videos/${lang}/Photgrapher-video.mp4`} type="video/mp4" />
            
            {/* WebM fallback for desktop browsers */}
            <source src={`/videos/${lang}/Photgrapher-video.webm`} type="video/webm" />

            {/* Subtitles */}
            <track
              kind="subtitles"
              src="/videos/subtitles/intro-en.vtt"
              srcLang="en"
              label="English"
              default={!isArabic}
            />
            <track
              kind="subtitles"
              src="/videos/subtitles/intro-ar.vtt"
              srcLang="ar"
              label="العربية"
              default={isArabic}
            />

            Your browser does not support the video tag.
          </video>

          {/* Custom Play Overlay */}
          {showPlayButton && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl cursor-pointer z-10"
              onClick={handleCustomPlayClick}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-white/95 hover:bg-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95">
                  <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[26px] border-l-[#1A1410] border-b-[16px] border-b-transparent ml-2" />
                </div>
                <p className="text-white text-sm font-medium">
                  {isArabic ? 'انقر للتشغيل' : 'Tap to Play'}
                </p>
              </div>
            </div>
          )}

          {/* Mute/Unmute Button (when video is playing) */}
          {videoStarted && !showPlayButton && (
            <button
              onClick={handleMuteToggle}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all z-10"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                // Muted Icon
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                // Unmuted Icon
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}

          {/* Description */}
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

        {/* Buttons */}
        <div className="w-full max-w-md mx-auto mt-6">
          {showButtons ? (
            <div
              className="space-y-3"
              style={{ animation: 'fadeIn 0.5s ease-in' }}
            >
              <button
                onClick={handleStartJourney}
                className="w-full bg-[#4A4A4A] hover:bg-[#5A5A5A] active:bg-[#3A3A3A] text-white font-semibold text-base py-4 px-6 rounded-lg transition-all shadow-lg"
              >
                {isArabic ? 'ابدأ الرحلة' : 'Start Journey'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center py-2">
                <p className="text-white/60 text-sm">
                  {videoStarted
                    ? isArabic
                      ? 'جارٍ تشغيل الفيديو...'
                      : 'Playing video...'
                    : isArabic
                    ? 'انقر فوق تشغيل لبدء الفيديو'
                    : 'Click play to start video'}
                </p>
              </div>
              
              {/* Skip button - Always available */}
              <button
                onClick={handleSkipVideo}
                className="w-full bg-transparent border-2 border-white/30 hover:border-white/50 text-white/70 hover:text-white font-medium text-sm py-3 px-6 rounded-lg transition-all"
              >
                {isArabic ? 'تخطي الفيديو' : 'Skip Video'}
              </button>
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

      {/* Animation */}
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