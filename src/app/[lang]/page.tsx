import Image from 'next/image';
import Link from 'next/link';
import { translations, Language } from '../../lib/i18n/translations';

interface LandingPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { lang } = await params;
  
  const currentLang = (lang === 'ar' || lang === 'en') ? lang : 'en';
  const t = translations[currentLang].landing;
  const isArabic = currentLang === 'ar';

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background image - Optimized for mobile */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/landing-bg.jpg')",
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col p-6">
        
        {/* Top Section - Logo and Text */}
        <div className="flex flex-col items-center text-center space-y-3 pt-4 pb-8">
          {/* Logo - Made Much Larger */}
          <div className="mb-2">
            <Image
              src="/logo.png"
              alt="AL MARMOOM"
              width={400}
              height={160}
              className="w-auto h-36 sm:h-40 md:h-44 lg:h-48 object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Title - Darker and Bolder */}
          <h1 className="text-2xl md:text-3xl font-semibold tracking-[0.4em] text-white uppercase drop-shadow-2xl" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
            AL MARMOOM
          </h1>

          {/* Subtitle - Light Golden */}
          <p className="text-sm md:text-base font-light tracking-wide drop-shadow-xl" style={{ color: '#E6C554' }}>
            {t.subtitle}
          </p>

          {/* Location - Light Golden */}
          <p className="text-xs md:text-sm font-light tracking-wide drop-shadow-xl" style={{ color: '#E6C554' }}>
            {t.location}
          </p>
        </div>

        {/* Spacer */}
        <div className="h-16" />

        {/* Bottom Section - Language Selection */}
        <div className="w-full max-w-md mx-auto space-y-3 mt-auto mb-12">
          {/* Arabic Button */}
          <Link href="/ar/signup" className="block w-full">
            <button className="w-full bg-black/60 backdrop-blur-lg border border-white/40 rounded-xl py-4 px-5 flex items-center justify-between hover:bg-black/80 transition-all group shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">🌐</span>
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-base">العربية</p>
                  <p className="text-white/70 text-[10px] uppercase tracking-wider">
                    ARABIC
                  </p>
                </div>
              </div>
              <div className="text-white/70 group-hover:text-white transition-colors">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </button>
          </Link>

          {/* English Button */}
          <Link href="/en/signup" className="block w-full">
            <button className="w-full bg-black/60 backdrop-blur-lg border border-white/40 rounded-xl py-4 px-5 flex items-center justify-between hover:bg-black/80 transition-all group shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">🌐</span>
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-base">English</p>
                  <p className="text-white/70 text-[10px] uppercase tracking-wider">
                    DEFAULT
                  </p>
                </div>
              </div>
              <div className="text-white/70 group-hover:text-white transition-colors">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </button>
          </Link>

          {/* Footer Text */}
          <p className="text-center text-[10px] text-white/80 pt-2 tracking-wide drop-shadow-xl">
            Supported Desert Conservation Reserve
          </p>
            <div className="flex justify-center pt-3">
            <Image
              src="/dubai.png"
              alt="Footer Logo"
              width={200}
              height={60}
              className="object-contain opacity-80"
              style={{ width: 'auto', height: '100px' }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}