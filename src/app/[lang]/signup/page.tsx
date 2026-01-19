'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { translations, Language } from '../../../lib/i18n/translations';

interface SignUpPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default function SignUpPage({ params }: SignUpPageProps) {
  const { lang } = use(params);
  
  const t = translations[lang].signup;
  const router = useRouter();
  const isArabic = lang === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
  });

  const [countryCode, setCountryCode] = useState('+971');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Navigate to intro video page
    router.push(`/${lang}/intro-video`);
  };

  return (
    <main className="min-h-screen bg-[#1A1410] flex flex-col">
      {/* Header with back button */}
      <div className="p-6 pt-8">
        <button
          onClick={() => router.back()}
          className="text-white/90 hover:text-white transition-colors"
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

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-sm space-y-8">
          
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white tracking-wide">
              {t.title}
            </h1>
            <div className="space-y-1">
              <p className="text-sm text-white/90 font-normal leading-relaxed">
                SIGN UP TO WIN
              </p>
              <p className="text-sm text-white/90 font-normal leading-relaxed">
                A SIGNED PHOTO BOOK BY
              </p>
              <p className="text-sm text-white/90 font-normal leading-relaxed">
                ALI BIN THALITH.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <input
                type="text"
                placeholder={t.fullName}
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-[#2D2419] border border-[#4A3D2E] rounded-lg py-4 px-5 text-white text-base placeholder:text-[#8B7E6E] focus:outline-none focus:border-[#D4AF37] transition-colors"
                required
                dir={isArabic ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Mobile Number Input */}
            <div className="relative">
              <div className="flex gap-0">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-[#2D2419] border border-[#4A3D2E] border-r-0 rounded-l-lg py-4 px-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer"
                  style={{ minWidth: '85px' }}
                >
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+965">🇰🇼 +965</option>
                  <option value="+974">🇶🇦 +974</option>
                  <option value="+973">🇧🇭 +973</option>
                  <option value="+968">🇴🇲 +968</option>
                </select>

                {/* Dropdown arrow icon */}
                <div className="absolute left-[65px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#8B7E6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <input
                  type="tel"
                  placeholder={t.mobileNumber}
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                  className="flex-1 bg-[#2D2419] border border-[#4A3D2E] rounded-r-lg py-4 px-5 text-white text-base placeholder:text-[#8B7E6E] focus:outline-none focus:border-[#D4AF37] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#1A1410] font-bold text-base py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-6"
            >
              {t.continue}
            </button>

            {/* Terms */}
            <p className="text-xs text-[#8B7E6E] text-center leading-relaxed pt-1">
              By continuing, you agree to our Terms of Service<br />and Privacy Policy.
            </p>
          </form>

        </div>
      </div>
    </main>
  );
}