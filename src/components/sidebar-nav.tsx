'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Compass, Lightbulb, MicVocal, SearchCheck } from 'lucide-react';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

const navItems = [
  {
    href: '/',
    label: 'Discover',
    icon: Compass,
  },
  {
    href: '/lyric-generator',
    label: 'Lyric Generator',
    icon: MicVocal,
  },
  {
    href: '/seo-optimizer',
    label: 'SEO Optimizer',
    icon: SearchCheck,
  },
];

export function SidebarNav({ isMobile = false }) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col gap-2', isMobile ? 'space-y-4' : '')}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({
              variant: pathname === item.href ? 'default' : 'ghost',
              size: 'default',
            }),
            'justify-start'
          )}
        >
          <item.icon className="mr-2 h-5 w-5" />
          {item.label}
        </Link>
      ))}
      <Separator className="my-4" />
      <div className="rounded-lg bg-accent/30 p-4 text-sm">
        <div className='flex items-center gap-2'>
            <Lightbulb className="h-8 w-8 text-accent-foreground/80" />
            <h4 className="font-headline font-semibold text-accent-foreground">Pro Tip</h4>
        </div>
        <p className="mt-2 text-accent-foreground/80">
            Use the AI tools to kickstart your creativity and optimize your song's reach.
        </p>
      </div>
    </nav>
  );
}
