import '../globals.css'
import { Inter } from 'next/font/google'
import Provider from "@components/Provider";
import ToasterContext from '@components/ToasterContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Asset Management System',
  description: 'A simple asset management system built by cyvdev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-600`}>
        <Provider>
        <ToasterContext />
          {children}
        </Provider>
      </body>
    </html>
  );
}
