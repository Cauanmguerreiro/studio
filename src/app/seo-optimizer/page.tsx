'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateSeoKeywords } from '@/ai/flows/generate-seo-keywords';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SearchCheck, Loader2, Wand2 } from 'lucide-react';
import { genres } from '@/lib/data';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  genre: z.string().min(1, 'Please select a genre.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SeoOptimizerPage() {
  const [generatedKeywords, setGeneratedKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      genre: '',
      description: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedKeywords([]);
    try {
      const result = await generateSeoKeywords(values);
      setGeneratedKeywords(result.keywords.split(',').map(k => k.trim()).filter(Boolean));
    } catch (error) {
      console.error('Error generating keywords:', error);
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
                <SearchCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">SEO Optimizer</CardTitle>
              <CardDescription>Generate keywords to make your song more discoverable.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Song Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Garota de Ipanema" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the song's mood, themes, and story." {...field} />
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
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Keywords
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl">Generated Keywords</CardTitle>
          <CardDescription>Your AI-generated keywords will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {isLoading ? (
             <div className="flex flex-col items-center justify-center h-full space-y-4 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Finding the best keywords...</p>
             </div>
          ) : generatedKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {generatedKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="text-base px-3 py-1">
                  {keyword}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4 border-2 border-dashed rounded-lg">
                <SearchCheck className="h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground text-center">Enter your song details to generate keywords.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
