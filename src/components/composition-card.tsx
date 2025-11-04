import Link from 'next/link';
import Image from 'next/image';
import type { Composition } from '@/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { GenreIcons } from './icons';

interface CompositionCardProps {
  composition: Composition;
  className?: string;
}

export function CompositionCard({ composition, className }: CompositionCardProps) {
  const image = placeholderImages.find((img) => img.id === composition.imageId);
  const Icon = GenreIcons[composition.genre as keyof typeof GenreIcons];

  return (
    <Link href={`/composition/${composition.slug}`}>
      <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", className)}>
        <CardHeader className="p-0">
          {image && (
            <div className="aspect-[3/2] w-full relative">
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 space-y-1">
            <h3 className="font-semibold text-lg leading-tight truncate">{composition.title}</h3>
            <p className="text-sm text-muted-foreground">by {composition.artist}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
             <Badge variant="outline" className="flex items-center gap-2">
                <Icon className="h-3 w-3" />
                <span>{composition.genre}</span>
            </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
