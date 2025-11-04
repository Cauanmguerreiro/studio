'use server';

/**
 * @fileOverview An SEO optimization tool for songwriters to generate relevant keywords for their songs.
 *
 * - generateSeoKeywords - A function that generates SEO keywords for a song based on its title, genre, and description.
 * - GenerateSeoKeywordsInput - The input type for the generateSeoKeywords function.
 * - GenerateSeoKeywordsOutput - The return type for the generateSeoKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoKeywordsInputSchema = z.object({
  title: z.string().describe('The title of the song.'),
  genre: z.string().describe('The genre of the song (e.g., Sertanejo, Gospel, Trap).'),
  description: z.string().describe('A brief description of the song, including its mood and themes.'),
});
export type GenerateSeoKeywordsInput = z.infer<typeof GenerateSeoKeywordsInputSchema>;

const GenerateSeoKeywordsOutputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'A comma-separated list of keywords relevant to the song, optimized for searchability.'
    ),
});
export type GenerateSeoKeywordsOutput = z.infer<typeof GenerateSeoKeywordsOutputSchema>;

export async function generateSeoKeywords(
  input: GenerateSeoKeywordsInput
): Promise<GenerateSeoKeywordsOutput> {
  return generateSeoKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoKeywordsPrompt',
  input: {schema: GenerateSeoKeywordsInputSchema},
  output: {schema: GenerateSeoKeywordsOutputSchema},
  prompt: `You are an SEO expert specializing in music. Generate a list of comma-separated keywords for a song based on its title, genre, and description.

Title: {{{title}}}
Genre: {{{genre}}}
Description: {{{description}}}

Keywords:`,
});

const generateSeoKeywordsFlow = ai.defineFlow(
  {
    name: 'generateSeoKeywordsFlow',
    inputSchema: GenerateSeoKeywordsInputSchema,
    outputSchema: GenerateSeoKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
