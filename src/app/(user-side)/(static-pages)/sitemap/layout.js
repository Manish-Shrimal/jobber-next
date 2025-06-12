import { Inter } from "next/font/google";
import "../../../globals.css";
import MetadataApi from "@/app/(api)/MetadataApi";
import Domain from "@/app/(api)/Domain";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }) {


  const res = await fetch(`${MetadataApi}/static-pages/sitemap`, {
    cache: "no-store",
  });

  const data = await res.json();
  const response = data?.response;

  // Safety fallback
  if (!response) {
    return {
      title: "Sitemap",
      description: "Sitemap",
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
      canonical: `${Domain}/sitemap`,
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

