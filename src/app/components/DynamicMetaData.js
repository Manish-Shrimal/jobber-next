// "use client";
// import { useEffect, useState } from "react";
// import Head from "next/head";
// import axios from "axios";
// import MetadataApi from "@/app/(api)/MetadataApi";

// export default function DynamicMetadata() {
//   const [meta, setMeta] = useState({
//     home_meta_title: "Default Title",
//     home_meta_description: "Default Description",
//     home_meta_keyword: "default, keywords",
//   });

//   useEffect(() => {
//     const fetchMetadata = async () => {
//       try {
//         const res = await axios.get(`${MetadataApi}/home-page`);
//         if (res.data?.response) {
//           setMeta(res.data.response);
//         }
//         console.log("Fetched Metadata:", res.data.response);
//       } catch (err) {
//         console.error("Failed to fetch metadata", err);
//       }
//     };

//     fetchMetadata();
//   }, []);

//   return (
//     <Head>
//       <title>{meta.home_meta_title}</title>
//       <meta name="description" content={meta.home_meta_description} />
//       <meta name="keywords" content={meta.home_meta_keyword} />
//     </Head>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import MetadataApi from "@/app/(api)/MetadataApi";


export default function DynamicMetaData() {
  const [meta, setMeta] = useState({
    title: "Default Title",
    description: "Default Description",
    keywords: "default, keywords",
  });

  useEffect(() => {
    axios.get(`${MetadataApi}/home-page`).then((res) => {
      setMeta(res.data.response);
    });
  }, []);

  return (
    <Head>
      <title>{meta.home_meta_title}</title>
      <meta name="description" content={meta.home_meta_description} />
      <meta name="keywords" content={meta.home_meta_keyword} />
    </Head>
  );
}

