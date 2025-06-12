// import Image from "next/image";
// import Index from "./(user-side)/Landing Page/Index/Index";

// export default function Home() {
//   return (
//     <>
//     <div > 
//        <Index />
//     </div>
   
//     </>
//   );
// }








// app/page.js
import Index from "./(user-side)/Landing Page/Index/Index";
import MetadataApi from "@/app/(api)/MetadataApi";
import Domain from "@/app/(api)/Domain";

// ✅ This is where metadata for <head> is injected
export async function generateMetadata() {
  try {
    const res = await fetch(`${MetadataApi}/home-page`, {
      cache: "no-store",
    });
    const data = await res.json();
    const meta = data?.response;

    if (!meta) throw new Error("No metadata found");

    return {
      title: meta.home_meta_title,
      description: meta.home_meta_description,
      keywords: meta.home_meta_keyword,
      alternates: {
        canonical: `${Domain}/home`,
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
  } catch (error) {
    console.error("Metadata error:", error);
    return {
      title: "Default Title",
      description: "Default Description",
      keywords: "default, keywords",
    };
  }
}

export default function Home() {
  return (
    <div>
      <Index />
    </div>
  );
}












