'use client'

import { Provider as JotaiProvider } from 'jotai';
import { Geist, Geist_Mono } from "next/font/google";
import { LocalStorageMigrator } from '@/components/localStorage-migrator';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <JotaiProvider>
          <LocalStorageMigrator />
          <div className="h-screen flex flex-col overflow-hidden bg-background">            
            
            {/* Main Content - Takes remaining height */}
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
          </div>
        </JotaiProvider>
      </body>
    </html>
  );
}
