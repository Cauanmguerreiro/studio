'use server';
/**
 * @fileOverview Generates a sample lyric snippet based on genre and style.
 *
 * - generateLyricSnippet - A function that generates the lyric snippet.
 * - GenerateLyricSnippetInput - The input type for the generateLyricSnippet function.
 * - GenerateLyricSnippetOutput - The return type for the generateLyricSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLyricSnippetInputSchema = z.object({
  genre: z.string().describe('The musical genre for the lyric snippet.'),
  style: z.string().describe('The style or theme for the lyric snippet.'),
});
export type GenerateLyricSnippetInput = z.infer<typeof GenerateLyricSnippetInputSchema>;

const GenerateLyricSnippetOutputSchema = z.object({
  snippet: z.string().describe('The generated lyric snippet.'),
});
export type GenerateLyricSnippetOutput = z.infer<typeof GenerateLyricSnippetOutputSchema>;

export async function generateLyricSnippet(input: GenerateLyricSnippetInput): Promise<GenerateLyricSnippetOutput> {
  return generateLyricSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLyricSnippetPrompt',
  input: {schema: GenerateLyricSnippetInputSchema},
  output: {schema: GenerateLyricSnippetOutputSchema},
  prompt: `You are a songwriter specializing in Brazilian music. Generate a short lyric snippet based on the provided genre and style.

Genre: {{{genre}}}
Style: {{{style}}}

Lyric Snippet:`,
});

const generateLyricSnippetFlow = ai.defineFlow(
  {
    name: 'generateLyricSnippetFlow',
    inputSchema: GenerateLyricSnippetInputSchema,
    outputSchema: GenerateLyricSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
