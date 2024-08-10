import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileProvider } from '@/contexts/MobileContext';
import { AccountProvider } from '@/contexts/AccountContext';
import { GuideBarProvider } from '@/contexts/GuideBarContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "null pay",
  description: "Null Pay is an innovative application that combines the power of blockchain technology with the ease of visual programming using Blockly. Designed for tech enthusiasts and developers, Null Pay allows users to create, manage, and execute blockchain transactions effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{height: '100%', margin: 0}}>
      <body className={inter.className} style={{height: '100%', margin: 0}}>
        <AccountProvider>
          <MobileProvider>
            <GuideBarProvider>
              {children}
            </GuideBarProvider>
          </MobileProvider>
        </AccountProvider>
      </body>
    </html>
  );
}
