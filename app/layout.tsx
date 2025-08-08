import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Pixel from "./_components/Pixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Natural Mom Wellness",
  description: "Pregnancy and Postpartum Guide",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Pixel />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2101939556996012&ev=PageView&noscript=1"/>',
          }}
        />
      </body>
    </html>
  );
}
