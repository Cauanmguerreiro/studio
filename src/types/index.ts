import { placeholderImages } from "@/lib/placeholder-images.json";

export type Genre = 'Sertanejo' | 'Gospel' | 'Trap' | 'Piseiro' | 'Arrocha' | 'Funk';

export type Composition = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  genre: Genre;
  mood: string;
  imageId: (typeof placeholderImages)[number]["id"];
  lyrics: string;
};
