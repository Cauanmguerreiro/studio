"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b-4 border-primary bg-background">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-10 w-10 text-primary animate-spin-slow" />
            <span className="font-headline text-3xl font-bold inline-block animate-wiggle">
              SongRise
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
