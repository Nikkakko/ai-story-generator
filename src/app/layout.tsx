import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

import { Public_Sans } from "next/font/google";
import { UserProvider } from "@/lib/auth";
import { getUser } from "@/lib/db/queries";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stories Generator",
  description: "Generate stories with ease using Ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let userPromise = getUser();
  return (
    <html lang="en">
      <body className={`${publicSans.className} antialiased  min-h-[100dvh]`}>
        <Header />
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  );
}
