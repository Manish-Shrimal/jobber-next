import { Inter } from "next/font/google";
import "../../../globals.css";
import Domain from "@/app/(api)/Domain";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Employer - Logicspice",
  description: "Manage jobs, view applications, and streamline hiring using the Logicspice Employer Portal.",
  keywords: "employer, job management, hiring, logicspice, hr portal",
  openGraph: {
    title: "Employer Portal - Logicspice",
    description: "Manage jobs and applications easily through the Logicspice Employer dashboard.",
    url: Domain+"/employer",
    siteName: "Logicspice",
    type: "website",
  },
};

export default function EmployerLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* You can also add a header or sidebar here */}
        {children}
      </body>
    </html>
  );
}
