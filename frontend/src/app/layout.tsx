import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'


const robotoMono = Roboto_Mono({
  variable : "--font-roboto-mono",
  subsets : ["latin"]
})

export const metadata: Metadata = {
  title: "Clutter Free",
  description: "Web based application to declutter your thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
