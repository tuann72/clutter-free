import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs/server"
import UserProvider from '@/components/UserProvider';


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
      <html lang="en">
      <body
        className={`${robotoMono.variable} antialiased`}
      >
        <UserProvider userInfo={userInfo}>
          {children}
        </UserProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
