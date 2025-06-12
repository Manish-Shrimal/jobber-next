import { Inter } from "next/font/google";
import "../../../globals.css";
import Domain from "@/app/(api)/Domain";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jobseeker - Logicspice",
  description: "Manage jobs, view applications, and streamline hiring using the Logicspice Jobseeker Portal.",
  keywords: "jobseeker, job management, hiring, logicspice, hr portal",
  openGraph: {
    title: "Jobseeker - Logicspice",
    description: "Manage jobs and applications easily through the Logicspice Jobseeker dashboard.",
    url: Domain+"/jobseeker",
    siteName: "Logicspice",
    type: "website",
  },
};

export default function JobseekerLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* You can also add a header or sidebar here */}
        {children}
      </body>
    </html>
  );
}
