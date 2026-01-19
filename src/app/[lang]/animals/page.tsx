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
  { 
    id: 1, 
    nameEn: 'WHITE-TAILED\nLAPWING', 
    nameAr: 'الزقزاق\nأبيض الذيل', 
    image: '/animals/AL MARMOOM_ICONS_12.png' 
  },
  { 
    id: 2, 
    nameEn: 'WATER RAIL', 
    nameAr: 'مرعة\nالماء', 
    image: '/animals/AL MARMOOM_ICONS_13.png' 
  },
  { 
    id: 3, 
    nameEn: 'BLUE\nTHROATED\nWAGTAIL', 
    nameAr: 'الذعرة\nزرقاء الحلق', 
    image: '/animals/AL MARMOOM_ICONS_14.png' 
  },
  { 
    id: 4, 
    nameEn: 'PURPLE\nSUNBIRD', 
    nameAr: 'الطنان\nالأرجواني', 
    image: '/animals/AL MARMOOM_ICONS_15.png' 
  },
  { 
    id: 5, 
    nameEn: 'EURASIAN\nSTONE-CURLEW', 
    nameAr: 'الكروان\nالأوراسي', 
    image: '/animals/AL MARMOOM_ICONS_16.png' 
  },
  { 
    id: 6, 
    nameEn: 'HOUBARA\nBUSTARD', 
    nameAr: 'الحبارى', 
    image: '/animals/AL MARMOOM_ICONS_17.png' 
  },
  { 
    id: 7, 
    nameEn: 'LITTLE\nGREBE', 
    nameAr: 'الغطاس\nالصغير', 
    image: '/animals/AL MARMOOM_ICONS_18.png' 
  },
  { 
    id: 8, 
    nameEn: 'WESTERN GREAT\nEGRET', 
    nameAr: 'البلشون\nالأبيض الكبير', 
    image: '/animals/AL MARMOOM_ICONS_19.png' 
  },
  { 
    id: 9, 
    nameEn: 'HOOPOE', 
    nameAr: 'الهدهد', 
    image: '/animals/AL MARMOOM_ICONS_20.png' 
  },
  { 
    id: 10, 
    nameEn: 'THE YELLOW\nWAGTAIL', 
    nameAr: 'الذعرة\nالصفراء', 
    image: '/animals/AL MARMOOM_ICONS_21.png' 
  },
  { 
    id: 11, 
    nameEn: 'THE ARABIAN\nGREEN BEE-EATER', 
    nameAr: 'الوروار الأخضر\nالعربي', 
    image: '/animals/AL MARMOOM_ICONS_22.png' 
  },
  { 
    id: 12, 
    nameEn: 'IRAQI\nSANDGROUSE', 
    nameAr: 'القطا\nالعراقي', 
    image: '/animals/AL MARMOOM_ICONS_23.png' 
  },
];

// Animal data - Page 2
const animalsPage2 = [
  { 
    id: 13, 
    nameEn: 'DESERT\nEAGLE OWL', 
    nameAr: 'بومة النسر\nالصحراوية', 
    image: '/animals/AL MARMOOM_ICONS_6.png' 
  },
  { 
    id: 14, 
    nameEn: 'LITTLE\nOWL', 
    nameAr: 'البومة\nالصغيرة', 
    image: '/animals/AL MARMOOM_ICONS_7.png' 
  },
  { 
    id: 15, 
    nameEn: 'RUPPELS\nFOX', 
    nameAr: 'ثعلب\nروبل', 
    image: '/animals/AL MARMOOM_ICONS_8.png' 
  },
  { 
    id: 16, 
    nameEn: 'GERBILLUS\nCHEESMANI', 
    nameAr: 'جربوع\nتشيزماني', 
    image: '/animals/AL MARMOOM_ICONS_9.png' 
  },
  { 
    id: 17, 
    nameEn: 'HEDGEHOG', 
    nameAr: 'القنفذ', 
    image: '/animals/AL MARMOOM_ICONS_10.png' 
  },
  { 
    id: 18, 
    nameEn: 'DESERT\nHARE', 
    nameAr: 'أرنب\nالصحراء', 
    image: '/animals/AL MARMOOM_ICONS_11.png' 
  },
  { 
    id: 19, 
    nameEn: 'ARABIAN\nORYX', 
    nameAr: 'المها\nالعربي', 
    image: '/animals/AL MARMOOM_ICONS_24.png' 
  },
  { 
    id: 20, 
    nameEn: 'DORCAS\nGAZELLE', 
    nameAr: 'غزال\nالدركاس', 
    image: '/animals/AL MARMOOM_ICONS_1.png' 
  },
  { 
    id: 21, 
    nameEn: 'FROG\nHEADED LIZARD', 
    nameAr: 'سحلية\nرأس الضفدع', 
    image: '/animals/AL MARMOOM_ICONS_2.png' 
  },
  { 
    id: 22, 
    nameEn: 'SANDFISH\nLIZARD', 
    nameAr: 'سحلية\nالسمكة الرملية', 
    image: '/animals/AL MARMOOM_ICONS_3.png' 
  },
  { 
    id: 23, 
    nameEn: 'SPINY TAILED\nLIZARD', 
    nameAr: 'الضب\nشوكي الذيل', 
    image: '/animals/AL MARMOOM_ICONS_4.png' 
  },
  { 
    id: 24, 
    nameEn: 'DORCAS\nGAZELLE', 
    nameAr: 'غزال\nالدركاس', 
    image: '/animals/AL MARMOOM_ICONS_5.png' 
  },
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
              {/* Circular Image */}
              <div className="relative w-full aspect-square mb-2">
                <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#D4AF37] transition-all shadow-lg group-active:scale-95">
                  <Image
                    src={animal.image}
                    alt={isArabic ? animal.nameAr : animal.nameEn}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
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