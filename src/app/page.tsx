'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const roles = [
  { id: 'composer', label: 'Composer/Songwriter' },
  { id: 'artist', label: 'Artist/Singer' },
  { id: 'producer', label: 'Producer' },
  { id: 'other', label: 'Other' },
];

const formSchema = z.object({
  role: z.string().min(1, 'Please select your primary role in the music industry.'),
  findComposition: z.string().min(1, 'This field is required.'),
  sellComposition: z.string().min(1, 'This field is required.'),
  challenges: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SurveyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      findComposition: '',
      sellComposition: '',
      challenges: [],
      features: [],
      comments: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    console.log('Survey Data:', values);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Submission successful!",
      description: "Thank you for your valuable feedback.",
    });

    setIsLoading(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <PartyPopper className="h-16 w-16 text-primary" />
        <h1 className="mt-6 font-headline text-4xl font-bold">Thank You!</h1>
        <p className="mt-2 max-w-md text-lg text-muted-foreground">
          Your feedback is incredibly valuable and will help shape the future of SongRise. We appreciate you taking the time to share your thoughts.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Help Us Build the Future of Music</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          We're exploring an idea for a platform for musical compositions and we need your expert opinion.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Research Survey</CardTitle>
          <CardDescription>Your feedback will help us understand the needs of the music community.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-semibold">What is your primary role in the music industry?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {roles.map((role) => (
                           <FormItem key={role.id} className="flex items-center space-x-3 space-y-0">
                             <FormControl>
                               <RadioGroupItem value={role.id} />
                             </FormControl>
                             <FormLabel className="font-normal">{role.label}</FormLabel>
                           </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="findComposition"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-semibold">As an artist or producer, how often do you look for new, original compositions to record?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="frequently" /></FormControl>
                          <FormLabel className="font-normal">Frequently</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="sometimes" /></FormControl>
                          <FormLabel className="font-normal">Sometimes</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="rarely" /></FormControl>
                          <FormLabel className="font-normal">Rarely / Never</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
               <FormField
                control={form.control}
                name="sellComposition"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-semibold">As a composer, have you ever wanted to sell your compositions to other artists?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="yes-actively" /></FormControl>
                          <FormLabel className="font-normal">Yes, I actively try to.</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="yes-interested" /></FormControl>
                          <FormLabel className="font-normal">I've thought about it and would be interested.</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="no" /></FormControl>
                          <FormLabel className="font-normal">No, I haven't considered it.</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="challenges"
                render={() => (
                  <FormItem>
                     <div className="mb-4">
                      <FormLabel className="font-semibold">What are the biggest challenges you face when trying to connect with other music professionals (e.g., composers finding artists, artists finding songs)? (Select all that apply)</FormLabel>
                     </div>
                      {[
                        { id: 'networking', label: 'Lack of networking opportunities' },
                        { id: 'discovery', label: 'Difficulty discovering new talent/material' },
                        { id: 'legal', label: 'Complexity of contracts and rights' },
                        { id: 'trust', label: 'Trust and security in transactions' }
                      ].map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="challenges"
                          render={({ field }) => {
                            return (
                              <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{item.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                     <FormLabel className="font-semibold">Which features would be most valuable in a marketplace for music compositions? (Select all that apply)</FormLabel>
                    </div>
                     {[
                        { id: 'search', label: 'Advanced search by genre, mood, etc.' },
                        { id: 'previews', label: 'Listening to song previews/demos' },
                        { id: 'secure', label: 'Secure intellectual property transactions' },
                        { id: 'collaboration', label: 'Tools for collaboration between artists and composers' }
                      ].map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="features"
                          render={({ field }) => {
                            return (
                              <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                   <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{item.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Do you have any other comments, ideas, or suggestions?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what you think..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
