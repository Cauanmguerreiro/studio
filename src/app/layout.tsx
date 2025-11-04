import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import { Hammersmith_One } from "next/font/google";
import { FirebaseClientProvider } from "@/firebase";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const hammersmithOne = Hammersmith_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
});

export const metadata: Metadata = {
  title: "SongRise - Pesquisa de Mercado",
  description: "Ajude-nos a construir o futuro da propriedade intelectual na música.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, hammersmithOne.variable)}>
        <FirebaseClientProvider>
          <div className="relative flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
