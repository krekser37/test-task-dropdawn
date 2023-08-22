import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: 'Dropdawn',
  description: 'Test task',
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={openSans.className}>{children}
        <div id="portal-root"></div>
      </body>
    </html>
  )
};
