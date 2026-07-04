import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/provider"; // import it here
import { aboutData } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: aboutData.name,
  description: aboutData.bio[0],
  openGraph: {
    title: aboutData.name,
    description: aboutData.bio[0],
    images: [
      {
        url: aboutData.avatar,
        alt: aboutData.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          {children} {/* ✅ Now all components can access Redux */}
        </ReduxProvider>
      </body>
    </html>
  );
}