import { Inter } from "next/font/google";
import { toast } from "sonner";
import type { Metadata } from "next";

import "./globals.css";
import { Header } from "@/widgets/header";
import { Toaster } from "@/shared/shadcn/shadcn-ui/sonner";
import { PostDetailsModal } from "@/widgets/post-details-modal";
import { Providers } from "./providers";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kidonia",
  description: "Kidonia Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interSans.variable} antialiased`}>
        <Providers>
          <Header onNotifyUser={toast} />
          <main className="px-[3vw] lg:px-[10vw] 2xl:px-[25vw] py-[2dvh] md:py-[5dvh]">
            {children}
          </main>
        </Providers>
        <Toaster />
        <PostDetailsModal />
      </body>
    </html>
  );
}
