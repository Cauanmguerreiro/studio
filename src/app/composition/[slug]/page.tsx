import { notFound } from 'next/navigation';
import Image from 'next/image';
import { compositions } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { GenreIcons } from '@/components/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { CheckCircle } from 'lucide-react';

interface CompositionPageProps {
  params: {
    slug: string;
  };
}

function getCompositionFromSlug(slug: string) {
  return compositions.find((comp) => comp.slug === slug);
}

export async function generateStaticParams() {
  return compositions.map((comp) => ({
    slug: comp.slug,
  }));
}

export default function CompositionPage({ params }: CompositionPageProps) {
  const composition = getCompositionFromSlug(params.slug);

  if (!composition) {
    notFound();
  }

  const image = placeholderImages.find((img) => img.id === composition.imageId);
  const Icon = GenreIcons[composition.genre as keyof typeof GenreIcons];

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
            {image && (
                <div className="aspect-square w-full relative overflow-hidden rounded-lg border">
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                </div>
            )}
        </div>
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="flex items-center gap-2 w-fit">
              <Icon className="h-4 w-4" />
              <span>{composition.genre}</span>
            </Badge>
            <h1 className="mt-2 text-4xl font-bold tracking-tighter">
              {composition.title}
            </h1>
            <p className="text-xl text-muted-foreground">by {composition.artist}</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Mood</p>
                <p className="text-muted-foreground">{composition.mood}</p>
              </div>
              <div>
                <p className="font-semibold">Artist</p>
                <p className="text-muted-foreground">{composition.artist}</p>
              </div>
            </CardContent>
          </Card>
          
          <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="w-full font-semibold text-lg">Purchase IP Rights</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'><CheckCircle className='text-green-500' /> Secure Transaction</DialogTitle>
                    <DialogDescription>
                        Review the terms for purchasing the intellectual property rights for "{composition.title}".
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 text-sm'>
                    <p>You are about to acquire the exclusive rights for this composition. This includes rights for recording, distribution, and public performance.</p>
                    <p className='font-semibold'>This transaction is final and legally binding.</p>
                    <div className='p-4 bg-muted rounded-lg'>
                        <p className='font-bold'>Price: R$ 10,000.00</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button>Proceed to Payment</Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </div>
      
      <Separator className="my-12" />

      <div>
        <h2 className="text-3xl font-bold">Lyrics</h2>
        <div className="mt-6 whitespace-pre-wrap rounded-lg bg-muted p-6 font-mono text-base leading-relaxed">
            {composition.lyrics}
        </div>
      </div>
    </div>
  );
}
