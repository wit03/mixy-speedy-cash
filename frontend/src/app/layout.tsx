import type { Metadata } from "next";
import { Inter, Rubik, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const interFont = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const rubikFont = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rubik',
})

const plexMonoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plex-mono',
})


export const metadata: Metadata = {
  title: "Mixy Speedy",
  description: "Mobile PWA Banking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F5F5F5]">
      <body className={`flex flex-col ${interFont.variable} ${rubikFont.variable} ${plexMonoFont.variable} `}>
        <Toaster />
        {children}
        
        
      </body>
      
    </html>
  );
}
