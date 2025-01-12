import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import React from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/app';
import { ModalProvider } from '@/app/providers/modalProvider';
import { Loader2 } from 'lucide-react';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chatter Space',
  description: 'Chatter Space Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} antialiased size-full overflow-hidden `}
      >
        <Toaster
          position="bottom-center"
          richColors
          toastOptions={{
            className: 'px-5 py-4 gap-2',
          }}
          icons={{
            loading: <Loader2 className="animate-spin text-accent" />,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="chatter-space-theme"
        >
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
