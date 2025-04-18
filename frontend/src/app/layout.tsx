import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { currentUser } from "@clerk/nextjs/server"
import UserProvider from '@/components/UserProvider';
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from 'next-themes';


const robotoMono = Roboto_Mono({
  variable : "--font-roboto-mono",
  subsets : ["latin"]
})

export const metadata: Metadata = {
  title: "Clutter Free",
  description: "Web based application to declutter your thoughts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser()
  const userInfo = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress ?? null,
      }
    : null;
    
    return (
      <ClerkProvider>
       <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${typeof window !== 'undefined' ? localStorage.getItem("fontType") ?? "font-mono" : "font-mono"}`}>
        <UserProvider userInfo={userInfo}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </UserProvider>
        </body>
      </html>
      </ClerkProvider>
  );
}
