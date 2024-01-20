import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { NavBar } from '@/components/ui/NavBar';
import { cn } from '@/lib/utils/cn';

import './globals.css';

const intInter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn('font-sans relative', intInter.className)}>
        <div className='flex flex-col min-h-screen'>
          <NavBar className='w-full'/>
          {children}
        </div>
      </body>
    </html>
  );
}
