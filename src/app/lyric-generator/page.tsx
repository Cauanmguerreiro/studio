'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateLyricSnippet } from '@/ai/flows/generate-lyric-snippet';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MicVocal, Loader2, Wand2 } from 'lucide-react';
import { genres } from '@/lib/data';

const formSchema = z.object({
  genre: z.string().min(1, 'Please select a genre.'),
  style: z.string().min(3, 'Style must be at least 3 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function LyricGeneratorPage() {
  const [generatedSnippet, setGeneratedSnippet] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genre: '',
      style: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedSnippet('');
    try {
      const result = await generateLyricSnippet(values);
      setGeneratedSnippet(result.snippet);
    } catch (error) {
      console.error('Error generating lyrics:', error);
      // Optionally, show an error toast to the user
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <MicVocal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="font-headline text-2xl">Lyric Snippet Generator</CardTitle>
              <CardDescription>Get a spark of inspiration for your next song.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a musical genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style or Theme</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Summer romance, overcoming struggle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Snippet
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Generated Lyrics</CardTitle>
          <CardDescription>Your AI-generated lyric snippet will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {isLoading ? (
             <div className="flex flex-col items-center justify-center h-full space-y-4 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Crafting your lyrics...</p>
             </div>
          ) : generatedSnippet ? (
            <div className="whitespace-pre-wrap rounded-lg bg-muted p-4 font-mono text-sm">
              {generatedSnippet}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4 border-2 border-dashed rounded-lg">
                <MicVocal className="h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">Ready for some inspiration?</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
