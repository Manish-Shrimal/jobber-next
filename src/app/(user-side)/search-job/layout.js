// import { Inter } from "next/font/google";
// import "../../globals.css";
// import MetadataApi from "@/app/(api)/MetadataApi";
// import Domain from "@/app/(api)/Domain";
// import Head from "next/head";


// const inter = Inter({ subsets: ["latin"] });

// export async function generateMetadata({ params, searchParams }, parent) {
//   const response = await fetch(`${MetadataApi}/search-job-page`, {
//     cache: "no-store",
//   }).then((res) => res.json());
//   console.log(response)

//   let schemaOrg;
//   let text = response.schema;

//   if (text) {
//     const cleanedText = text
//       .replace(/\\r\\n/g, "")
//       .replace(/\\n/g, "")
//       .replace(/\\r/g, "")
//       .replace(/\\+/g, "")
//       .replace(/[\u0000-\u001F\u007F]/g, "");

//     schemaOrg = cleanedText && JSON.parse(cleanedText);
//   }

//   return {
//     title: response.meta_title,
//     description: response.meta_description,
//     keywords: response.meta_keyword,
//     alternates: {
//       canonical: `${Domain}/search-job`,
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//     // schema is not part of Next.js metadata API — you need to render it manually
//   };
// }

// export default async function RootLayout({ children, params, searchParams }) {
//      const metadata = await generateMetadata({ params, searchParams });
//   return (
//     <html lang="en">
//       <Head>
//         <meta name="description" content={metadata.description} />
//         <meta name="keywords" content={metadata.keywords} />
//         <title>{metadata.title}</title>
//       </Head>
//       <body className={inter.className}>{children}</body>

//     </html>
//   );
// }





import { Inter } from "next/font/google";
import "../../globals.css";
import MetadataApi from "@/app/(api)/MetadataApi";
import Domain from "@/app/(api)/Domain";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const res = await fetch(`${MetadataApi}/search-job-page`, {
    cache: "no-store",
  });

  const data = await res.json();
  const response = data?.response;

  // Safety fallback
  if (!response) {
    return {
      title: "Default Title",
      description: "Default description",
    };
  }

  // Parse schema if exists
  let schemaOrg = null;
  if (response.schema) {
    try {
      const cleanedText = response.schema
        .replace(/\\r\\n/g, "")
        .replace(/\\n/g, "")
        .replace(/\\r/g, "")
        .replace(/\\+/g, "")
        .replace(/[\u0000-\u001F\u007F]/g, "");

      schemaOrg = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Schema JSON parse error", e);
    }
  }

  return {
    title: response.meta_title,
    description: response.meta_description,
    keywords: response.meta_keyword,
    alternates: {
      canonical: `${Domain}/search-job`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

