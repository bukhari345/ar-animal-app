import { i18nConfig } from '../../lib/i18n/config';
import { notFound } from 'next/navigation';
import '../globals.css';

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // Await params
  const { lang } = await params;
  
  // Validate language parameter
function isValidLocale(locale: string): locale is 'en' | 'ar' {
  return i18nConfig.locales.includes(locale as 'en' | 'ar');
}

if (!isValidLocale(lang)) {
  notFound();
}

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir}>
      <body className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </body>
    </html>
  );
}