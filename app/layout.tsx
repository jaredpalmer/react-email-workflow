'use client'

import { Provider as JotaiProvider } from 'jotai';
import { LocalStorageMigrator } from '@/components/localStorage-migrator';
import { Toaster } from '@/components/ui/sonner';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <JotaiProvider>
          <LocalStorageMigrator />
          <div className="h-screen flex flex-col overflow-hidden bg-background">            
            
            {/* Main Content - Takes remaining height */}
            <main className="flex-1 overflow-hidden">
              {children}
            </main>
          </div>
          <Toaster />
        </JotaiProvider>
      </body>
    </html>
  );
}
