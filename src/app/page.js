import Image from "next/image";
import Index from "./(user-side)/Landing Page/Index/Index";

export default function Home() {
  return (
    <>
    <div > 
       <Index />
    </div>
   
    </>
  );
}






// 'use client';

// import { useTranslation } from 'next-i18next';
// import LanguageDropdown from '@/app/LanguageDrodown/page';

// // export async function generateStaticParams() {
// //   return languages.map((locale) => ({ locale }));
// // }

// export default function HomePage() {
//   const { t } = useTranslation('common');

//   return (
//     <div>
//       <LanguageDropdown />
//       <h1>{t("navHeaders.home")}</h1>
//     </div>
//   );
// }


// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import LanguageDropdown from '@/app/LanguageDrodown/page';

// export default function HomePage({ params: { locale } }) {
//   const [translations, setTranslations] = useState(null);

//   useEffect(() => {
//     async function loadTranslations() {
//       try {
//         const res = await fetch(`/locales/${locale}/common.json`);
//         if (!res.ok) throw new Error('Failed to load translations');
//         const data = await res.json();
//         setTranslations(data);
//       } catch {
//         // fallback to English if failed
//         const res = await fetch('/locales/en/common.json');
//         const data = await res.json();
//         setTranslations(data);
//       }
//     }
//     loadTranslations();
//   }, [locale]);

//   if (!translations) return <div>Loading translations...</div>;

//   return (
//     <div>
//       <LanguageDropdown />
//       <h1>{translations.navHeaders.home}</h1>
//     </div>
//   );
// }






// 'use client';

// import { useEffect, useState } from 'react';
// import LanguageDropdown from '@/app/LanguageDrodown/page';

// export default function HomePage({ params }) {
//   const { locale } = params;
//   const [translations, setTranslations] = useState(null);

//   useEffect(() => {
//     async function loadTranslations() {
//       try {
//         const res = await fetch(`/locales/${locale}/common.json`);
//         const data = await res.json();
//         setTranslations(data);
//       } catch (err) {
//         console.error('Failed to load translations:', err);
//       }
//     }
//     loadTranslations();
//   }, [locale]);

//   if (!translations) return <div>Loading...</div>;

//   return (
//     <div>
//       <LanguageDropdown />
//       <h1>{translations.navHeaders.home}</h1>
//     </div>
//   );
// }




// 'use client';

// import { useLanguage } from '@/app/contexts/LanguageContext';
// import LanguageDropdown from '@/app/LanguageDrodown/page';
//  import { useEffect, useState } from 'react';

// const HomePage = ({ params }) => {
//     const { locale } = params;
//   const [translations, setTranslations] = useState(null);

//   useEffect(() => {
//     async function loadTranslations() {
//       try {
//         const res = await fetch(`/locales/${locale}/common.json`);
//         const data = await res.json();
//         setTranslations(data);
//       } catch (err) {
//         console.error('Failed to load translations:', err);
//       }
//     }
//     loadTranslations();
//   }, [locale]);

//   if (!translations) return <div>Loading...</div>;

//   return (
//     <div>
//       <LanguageDropdown />
//       <h1>{translations['navHeaders.home'] || 'Loading...'}</h1>
//     </div>
//   );
// };

// export default HomePage;





