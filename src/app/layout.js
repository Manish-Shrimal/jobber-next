"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
// import "bootstrap/dist/css/bootstrap.min.css";
import ClientLayout from "@/app/(user-side)/(elements)/ClientLayout";
import { RecoilRoot } from "recoil";
import ConfigInitializer from "./components/ConfigInitializer";
import BootstrapClient from "./components/BoostrapClient";
import GetConstants from "./components/GetConstants"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
          crossorigin="anonymous"
        />
      </Head>

      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecoilRoot>
        <ClientLayout>
          <GetConstants />
          
          <BootstrapClient />
            <ConfigInitializer />
            {children}
          
        </ClientLayout>
        </RecoilRoot>
      </body>
    </html>
  );
}
