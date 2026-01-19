'use client';

import { use, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Language } from '../../../lib/i18n/translations';

interface AnimalsPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

// Animal data - Page 1
const animalsPage1 = [
  { id: 1, nameEn: 'WHITE-TAILED\nLAPWING', nameAr: 'الزقزاق\nأبيض الذيل', emoji: '🦆', color: 'from-gray-600 to-gray-800' },
  { id: 2, nameEn: 'MASKED\nSHRIKE', nameAr: 'الصرد\nالمقنع', emoji: '🐦', color: 'from-blue-600 to-blue-800' },
  { id: 3, nameEn: 'BLUE-CHEEKED\nBEE-EATER', nameAr: 'الوروار\nأزرق الخد', emoji: '🦜', color: 'from-cyan-500 to-blue-600' },
  { id: 4, nameEn: 'PURPLE\nSUNBIRD', nameAr: 'الطنان\nالأرجواني', emoji: '🐦', color: 'from-orange-500 to-red-600' },
  { id: 5, nameEn: 'EURASIAN\nSTONE-CURLEW', nameAr: 'الكروان\nالأوراسي', emoji: '🦅', color: 'from-amber-600 to-yellow-700' },
  { id: 6, nameEn: 'HOUBARA\nBUSTARD', nameAr: 'الحبارى', emoji: '🦃', color: 'from-green-600 to-green-800' },
  { id: 7, nameEn: 'LITTLE\nGREBE', nameAr: 'الغطاس\nالصغير', emoji: '🦆', color: 'from-blue-500 to-cyan-600' },
  { id: 8, nameEn: 'WESTERN GREAT\nEGRET', nameAr: 'البلشون الأبيض\nالكبير', emoji: '🦢', color: 'from-gray-400 to-gray-600' },
  { id: 9, nameEn: 'HOOPOE', nameAr: 'الهدهد', emoji: '🐦', color: 'from-amber-500 to-orange-600' },
  { id: 10, nameEn: 'THE YELLOW\nWAGTAIL', nameAr: 'الذعرة\nالصفراء', emoji: '🐤', color: 'from-yellow-400 to-amber-600' },
  { id: 11, nameEn: 'THE ARABIAN\nGREEN BEE-EATER', nameAr: 'الوروار الأخضر\nالعربي', emoji: '🦜', color: 'from-green-500 to-emerald-700' },
  { id: 12, nameEn: 'RAQAB SAND\nGROUSE', nameAr: 'القطا\nالرقاب', emoji: '🦅', color: 'from-stone-500 to-amber-700' },
];

// Animal data - Page 2
const animalsPage2 = [
  { id: 13, nameEn: 'DESERT\nFOX', nameAr: 'ثعلب\nالصحراء', emoji: '🦊', color: 'from-orange-600 to-red-700' },
  { id: 14, nameEn: 'ARABIAN\nORYX', nameAr: 'المها\nالعربي', emoji: '🦌', color: 'from-gray-500 to-stone-600' },
  { id: 15, nameEn: 'SAND\nCAT', nameAr: 'قط\nالرمال', emoji: '🐱', color: 'from-amber-400 to-yellow-600' },
  { id: 16, nameEn: 'DESERT\nHEDGEHOG', nameAr: 'قنفذ\nالصحراء', emoji: '🦔', color: 'from-brown-500 to-amber-700' },
  { id: 17, nameEn: 'ARABIAN\nGAZELLE', nameAr: 'الغزال\nالعربي', emoji: '🦌', color: 'from-amber-600 to-orange-700' },
  { id: 18, nameEn: 'SAND\nVIPER', nameAr: 'أفعى\nالرمال', emoji: '🐍', color: 'from-yellow-700 to-amber-800' },
  { id: 19, nameEn: 'DESERT\nMONITOR', nameAr: 'ورل\nالصحراء', emoji: '🦎', color: 'from-green-700 to-emerald-800' },
  { id: 20, nameEn: 'CARACAL', nameAr: 'الوشق', emoji: '🐆', color: 'from-orange-700 to-red-800' },
  { id: 21, nameEn: 'ARABIAN\nWOLF', nameAr: 'الذئب\nالعربي', emoji: '🐺', color: 'from-gray-600 to-slate-800' },
  { id: 22, nameEn: 'SPINY-TAILED\nLIZARD', nameAr: 'الضب', emoji: '🦎', color: 'from-lime-600 to-green-700' },
  { id: 23, nameEn: 'DESERT\nHARE', nameAr: 'أرنب\nالصحراء', emoji: '🐰', color: 'from-stone-400 to-gray-600' },
  { id: 24, nameEn: 'HONEY\nBADGER', nameAr: 'غرير\nالعسل', emoji: '🦡', color: 'from-gray-700 to-black' },
];

const allPages = [animalsPage1, animalsPage2];

export default function AnimalsPage({ params }: AnimalsPageProps) {
  const { lang } = use(params);
  const router = useRouter();
  const isArabic = lang === 'ar';
  const [currentPage, setCurrentPage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleAnimalClick = (animalId: number) => {
    router.push(`/${lang}/animal-video/${animalId}`);
  };

  const handleDotClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left - go to next page
      if (currentPage < allPages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    }

    if (touchEndX.current - touchStartX.current > 50) {
      // Swiped right - go to previous page
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const currentAnimals = allPages[currentPage];

  return (
    <main className="min-h-screen bg-[#1A1410] pb-20 relative overflow-hidden">
      {/* Swipeable Container */}
      <div 
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grid of Animals with Slide Animation */}
        <div 
          className="grid grid-cols-3 gap-4 p-4 pt-6 transition-opacity duration-300"
          style={{ opacity: 1 }}
        >
          {currentAnimals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => handleAnimalClick(animal.id)}
              className="flex flex-col items-center cursor-pointer group"
            >
              {/* Circular Image Placeholder */}
              <div className="relative w-full aspect-square mb-2">
                <div className={`absolute inset-0 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#D4AF37] transition-all shadow-lg bg-gradient-to-br ${animal.color} flex items-center justify-center group-active:scale-95`}>
                  <span className="text-3xl sm:text-4xl">{animal.emoji}</span>
                </div>
              </div>

              {/* Animal Name */}
              <p 
                className="text-white text-center text-[10px] sm:text-xs font-light leading-tight uppercase tracking-wide px-1"
                style={{ whiteSpace: 'pre-line' }}
              >
                {isArabic ? animal.nameAr : animal.nameEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots - Clickable */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {allPages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all ${
              currentPage === index ? 'bg-white w-6' : 'bg-white/30 w-2'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </main>
  );
}