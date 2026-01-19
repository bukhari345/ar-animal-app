export interface LanguageParams {
  lang: 'en' | 'ar';
}

export interface AnimalData {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  icon: string;
  video: {
    en: string;
    ar: string;
  };
  arEmbed: {
    en: string;
    ar: string;
  };
}