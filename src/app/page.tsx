'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { compositions, genres } from '@/lib/data';
import { CompositionCard } from '@/components/composition-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { GenreIcons } from '@/components/icons';
import { placeholderImages } from '@/lib/placeholder-images.json';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState<string | 'All'>('All');

  const featuredCompositions = useMemo(
    () => compositions.slice(0, 5),
    []
  );

  const filteredCompositions = useMemo(() => {
    return compositions
      .filter((composition) =>
        activeGenre === 'All' ? true : composition.genre === activeGenre
      )
      .filter((composition) =>
        composition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        composition.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, activeGenre]);

  const heroImage = placeholderImages.find(p => p.id === 'hero');

  return (
    <div className="space-y-12">
      <section className="relative -mx-8 -mt-6 h-[400px] w-auto overflow-hidden rounded-b-2xl">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                data-ai-hint={heroImage.imageHint}
                className="object-cover"
                priority
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="font-headline text-5xl font-bold text-foreground drop-shadow-lg">
            Find Your Next Hit
          </h1>
          <p className="mt-2 max-w-lg text-lg text-foreground/80 drop-shadow-md">
            Discover and acquire unique musical compositions from Brazil's best talents.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-semibold tracking-tight">
          Featured Compositions
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mt-4 w-full"
        >
          <CarouselContent>
            {featuredCompositions.map((comp) => (
              <CarouselItem key={comp.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <CompositionCard composition={comp} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-semibold tracking-tight">
          Discover
        </h2>
        <div className="mt-4 flex flex-col gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by title or artist..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={activeGenre === 'All' ? 'default' : 'outline'}
              onClick={() => setActiveGenre('All')}
              className="rounded-full"
            >
              All Genres
            </Button>
            {genres.map((genre) => {
              const Icon = GenreIcons[genre as keyof typeof GenreIcons];
              return (
                <Button
                  key={genre}
                  variant={activeGenre === genre ? 'default' : 'outline'}
                  onClick={() => setActiveGenre(genre)}
                  className="rounded-full"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {genre}
                </Button>
              );
            })}
          </div>
        </div>

        {filteredCompositions.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCompositions.map((composition) => (
              <CompositionCard key={composition.id} composition={composition} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="rounded-full border bg-secondary p-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-headline text-2xl font-semibold">
              No Compositions Found
            </h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
