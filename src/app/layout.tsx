import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/components/sidebar-nav";

export const metadata: Metadata = {
  title: "SongRise",
  description: "The platform for musical intellectual property.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased")}>
        <div className="relative flex min-h-dvh flex-col">
          <SiteHeader />
          <div className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[220px_1fr]">
              <aside className="hidden w-[220px] flex-col pt-10 md:flex">
                <SidebarNav />
              </aside>
              <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
                {children}
              </main>
            </div>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
