// "use client"
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// const Page = () => {
//     const router = useRouter();
//   const { locale, pathname, asPath, query } = router;
//   const [selectedLanguage, setSelectedLanguage] = useState(locale);

// const handleChangeLanguage = (newLocale) => {
//   if (newLocale === locale) return;
//   setSelectedLanguage(newLocale);
//   console.log(newLocale)

//   router.push(
//     {
//       pathname,
//       query,
//     },
//     undefined,
//     { locale: newLocale }
//   );
// };



//   return (
//     <div>
//        <div className="LangaugeDropdown">
//       <select
//         className="form-select"
//         aria-label="Select Language"
//         value={selectedLanguage}
//         onChange={(e) => handleChangeLanguage(e.target.value)}
//       >
//         <option value="en">English</option>
//         <option value="el">Greek</option>
//         <option value="ukr">Ukrainian</option>
//         <option value="de">German</option>
//       </select>
//     </div>
//     </div>
//   )
// }

// export default Page












// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// const Page = ({ locale }) => {
//   const router = useRouter();
//   const [selectedLanguage, setSelectedLanguage] = useState('en'); // fallback locale

//   const handleChangeLanguage = (newLocale) => {
//     if (newLocale === selectedLanguage) return;

//     setSelectedLanguage(newLocale);
//     console.log('Switching to:', newLocale);

  
//     router.push(`/${newLocale}`);
//   };

//   return (
//     <div>
//       <div className="LangaugeDropdown">
//         <select
//           className="form-select"
//           aria-label="Select Language"
//           value={selectedLanguage}
//           onChange={(e) => handleChangeLanguage(e.target.value)}
//         >
//           <option value="en">English</option>
//           <option value="el">Greek</option>
//           <option value="ukr">Ukrainian</option>
//           <option value="de">German</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Page;










// 'use client';

// import { useRouter } from 'next/navigation';

// const Page = () => {
//   const router = useRouter();

//   const handleChangeLanguage = (newLocale) => {
//     router.push('/', undefined, { locale: newLocale });
//   };

//   return (
//     <select onChange={(e) => handleChangeLanguage(e.target.value)}>
//       <option value="en">English</option>
//       <option value="el">Greek</option>
//       <option value="ukr">Ukrainian</option>
//       <option value="de">German</option>
//     </select>
//   );
// };

// export default Page;


// 'use client';

// import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// const Page = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const handleChangeLanguage = (newLocale) => {
//     router.push(`${pathname}?${searchParams.toString()}`, undefined, { locale: newLocale });
  
//   };

//   return (
//     <select onChange={(e) => handleChangeLanguage(e.target.value)} defaultValue="en">
//       <option value="en">English</option>
//       <option value="el">Greek</option>
//       <option value="ukr">Ukrainian</option>
//       <option value="de">German</option>
//     </select>
//   );
// };

// export default Page;












// 'use client';

// import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const LanguageDropdown = () => {
//   const router = useRouter();
//   const pathname = usePathname(); // e.g., /en/about
//   const searchParams = useSearchParams();

//   // Extract current locale from pathname (/en/page -> 'en')
//   const currentLocale = pathname.split('/')[1] || 'en';

//   const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);

//   useEffect(() => {
//     setSelectedLanguage(currentLocale);
//   }, [currentLocale]);

//   const handleChangeLanguage = (newLocale) => {
//     if (newLocale === selectedLanguage) return;

//     setSelectedLanguage(newLocale);
//     console.log(newLocale)

//     // Replace the locale part of the path with the new one
//     const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

//     // Preserve search params
//     const queryString = searchParams.toString();
//     const url = queryString ? `${newPathname}?${queryString}` : newPathname;

//     router.push(url);
//   };

//   return (
//     <select
//       aria-label="Select Language"
//       value={selectedLanguage}
//       onChange={(e) => handleChangeLanguage(e.target.value)}
//     >
//       <option value="en">English</option>
//       <option value="el">Greek</option>
//       <option value="ukr">Ukrainian</option>
//       <option value="de">German</option>
//     </select>
//   );
// };

// export default LanguageDropdown;









// 'use client';

// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useLanguage } from '@/app/contexts/LanguageContext';

// const LanguageDropdown = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const { locale, setLocale } = useLanguage();

//   const currentLocale = pathname.split('/')[1] || 'en';
//   const [selectedLanguage, setSelectedLanguage] = useState(currentLocale);

//   useEffect(() => {
//     setSelectedLanguage(currentLocale);
//   }, [currentLocale]);

//   const handleChangeLanguage = (newLocale) => {
//     if (newLocale === selectedLanguage) return;

//     setSelectedLanguage(newLocale);
//     setLocale(newLocale); // trigger loading of new translations

//     const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
//     const queryString = searchParams.toString();
//     const url = queryString ? `${newPathname}?${queryString}` : newPathname;

//     router.push(url);
//   };

//   return (
//     <select
//       aria-label="Select Language"
//       value={selectedLanguage}
//       onChange={(e) => handleChangeLanguage(e.target.value)}
//     >
//       <option value="en">English</option>
//       <option value="el">Greek</option>
//       <option value="ukr">Ukrainian</option>
//       <option value="de">German</option>
//     </select>
//   );
// };

// export default LanguageDropdown;




'use client';

import { useEffect, useState } from 'react';

const Page = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  const loadTranslations = async (locale) => {
    try {
      const response = await fetch(`/locales/${locale}/common.json`);
      if (!response.ok) {
        throw new Error(`Translation file not found for locale: ${locale}`);
      }
      const data = await response.json();
      setTranslations(data);
    } catch (err) {
      console.error('Failed to load translations:', err);
      setTranslations({});
    }
  };

  const handleChangeLanguage = (newLocale) => {
    if (newLocale === selectedLanguage) return;
    setSelectedLanguage(newLocale);
    loadTranslations(newLocale);
  };

  // Load default translation on first render
  useEffect(() => {
    loadTranslations(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <div>
      <select
        aria-label="Select Language"
        value={selectedLanguage}
        onChange={(e) => handleChangeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="el">Greek</option>
        <option value="ukr">Ukrainian</option>
        <option value="de">German</option>
      </select>

      <h1>{translations?.navHeaders?.home || 'Loading...'}</h1>
    </div>
  );
};

export default Page;






