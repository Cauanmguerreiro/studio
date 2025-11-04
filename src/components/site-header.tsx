"use client";

import Link from "next/link";
import Image from "next/image";
import logo from '@/components/logo.png';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-20 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logo} alt="SongRise Logo" width={40} height={40} className="h-10 w-10" />
            <span className="font-logo text-3xl font-bold inline-block text-foreground">
              SongRise
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
