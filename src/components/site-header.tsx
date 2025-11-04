"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold text-xl inline-block">
              SongRise
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
