import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import { Hammersmith_One } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const hammersmithOne = Hammersmith_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
});

export const metadata: Metadata = {
  title: "SONGNATION - O Ecossistema da Música",
  description: "Descubra, licencie e colabore em composições musicais. O futuro da propriedade intelectual na música começa aqui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, hammersmithOne.variable)}>
          <div className="relative flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
      </body>
    </html>
  );
}
