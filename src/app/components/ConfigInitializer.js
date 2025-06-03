// components/ConfigInitializer.js
// 'use client'; // if using App Router

// import { useEffect } from 'react';
// import { useSetRecoilState } from 'recoil';
// import { configState } from "@/app/lib/atoms/ConfigAtom";
// import BaseApi from '@/app/(api)/BaseApi'; // Adjust the import path as necessary

// export default function ConfigInitializer() {
//   const setConfig = useSetRecoilState(configState);

//   useEffect(() => {
//     async function fetchConfig() {
//       try {
//         const res = await fetch(BaseApi + '/getconstant');
//         const data = await res.json();
//         setConfig(data);
//       } catch (err) {
//         console.error('Failed to fetch config:', err);
//       }
//     }

//     fetchConfig();
//   }, [setConfig]);

//   return null; // this component doesn't render anything
// }








'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { configState } from "@/app/lib/atoms/ConfigAtom";
import BaseApi from '@/app/(api)/BaseApi';

export default function ConfigInitializer() {
  const setConfig = useSetRecoilState(configState);
  // console.log(setConfig, 'ConfigInitializer setConfig');

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch(`${BaseApi}/getconstant`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // console.log(data.response, 'ConfigInitializer data');
        setConfig(data.response);
      } catch (err) {
        console.error('Failed to fetch config:', err);
      }
    }

    fetchConfig();
  }, [setConfig]);

  return null; // No UI output needed
}

