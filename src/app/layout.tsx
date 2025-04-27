// DO NOT TOUCH CONFIG
import type { Metadata } from "next";
// Template code can be disabled
import { Geist, Geist_Mono } from "next/font/google";
import {ConvexClientProvider} from "./providers"; //added
//Clerk docs- added
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
// Template code can be disabled
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// Template code can be disabled

export const metadata: Metadata = {
  title: "Somatic Serenity",
  description: "An interface to track your goals, flow state and peace of mind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
};
