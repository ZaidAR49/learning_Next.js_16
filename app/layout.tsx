import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from '@/components/ui/LightRays';
import Header from '@/components/header';
import { PostHogProvider } from '@/components/PostHogProvider';
import { PostHogPageView } from '@/components/PostHogPageView';
import { Suspense } from 'react';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const schibstedSans = Schibsted_Grotesk({
  variable: "--font-schibsted-sans",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Events",
  description: "Find the best tech events around you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen", "antialiased", schibstedSans.variable, martianMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <Header />
          <div className="absolute top-0 left-0 inset-0 z-[-1] min-h-screen">
            <LightRays
              raysOrigin="top-center-offset"
              raysColor="#7e57c2"
              raysSpeed={0.3}
              lightSpread={2}
              rayLength={5}
              followMouse={true}
              mouseInfluence={0.2}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </div>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
