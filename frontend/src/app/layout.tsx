import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WeddingInv — Undangan Digital Premium',
  description: 'Buat undangan pernikahan digital elegan dengan template premium. RSVP online, peta interaktif, dan blast WhatsApp otomatis.',
  openGraph: {
    title: 'WeddingInv — Undangan Digital Premium',
    description: 'Buat undangan pernikahan digital elegan dengan template premium.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'WeddingInv',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeddingInv — Undangan Digital Premium',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen bg-[#06060c]">
        {children}
      </body>
    </html>
  );
}
