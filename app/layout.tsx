import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'ANTRIKSH - Mission Control',
  description: 'AI Human Activity Recognition for Bharatiya Antariksh Station',
  icons: {
    icon: '🛰️',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100">
        <Header />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
