export const translations = {
  en: {
    landing: {
      title: "AL MARMOOM",
      subtitle: "Drive-Through Photography Exhibition",
      location: "Al Marmoom Desert Conservation Reserve",
      selectLanguage: "Select Language",
      english: "English",
      arabic: "العربية",
      default: "DEFAULT",
    },
    signup: {
      title: "SIGN UP",
      subtitle: "SIGN UP TO WIN\nA SIGNED PHOTO BOOK BY\nALI BIN THALITH.",
      fullName: "Full Name",
      mobileNumber: "Mobile Number",
      continue: "Continue",
      terms: "By continuing, you agree to our Terms of Service\nand Privacy Policy.",
    },
    thankYou: {
      title: "Thank you for visiting\nAL MARMOOM",
      subtitle: "Drive-Thru Photography Exhibition",
      button: "Go Back To Main Page",
    },
  },
  ar: {
    landing: {
      title: "المرموم",
      subtitle: "معرض التصوير الفوتوغرافي بالسيارة",
      location: "محمية المرموم الصحراوية",
      selectLanguage: "اختر اللغة",
      english: "English",
      arabic: "العربية",
      default: "الافتراضي",
    },
    signup: {
      title: "التسجيل",
      subtitle: "سجل للفوز\nبكتاب صور موقع من\nعلي بن ثالث.",
      fullName: "الاسم الكامل",
      mobileNumber: "رقم الهاتف المحمول",
      continue: "متابعة",
      terms: "بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية.",
    },
    thankYou: {
      title: "شكراً لزيارتك\nالمرموم",
      subtitle: "معرض التصوير الفوتوغرافي بالسيارة",
      button: "العودة إلى الصفحة الرئيسية",
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;