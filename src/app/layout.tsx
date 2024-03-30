import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "./header";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Rooms",
  description: "Find Devs and pair with them online.",
};
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader />
          <Header />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
