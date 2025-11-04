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
        <PartyPopper className="h-16 w-16 text-primary animate-bounce-slow" />
        <h1 className="mt-6 font-headline text-5xl font-bold animate-wiggle">THANK YOU, HUMAN!</h1>
        <p className="mt-2 max-w-md text-lg text-muted-foreground">
          Your brain data has been successfully harvested! It will help us build our musical empire. We appreciate your unwitting contribution.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-headline text-5xl font-bold tracking-tight animate-wiggle">Help Us Conquer the Music World!</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          We have a totally normal idea for a music platform. Spill your brain beans for us.
        </p>
      </div>

      <Card className="border-4 border-primary">
        <CardHeader>
          <CardTitle>Top Secret Market Research</CardTitle>
          <CardDescription>Your answers are definitely not being used for world domination. Promise.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-semibold text-lg">What's your deal in the music biz?</FormLabel>
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
                             <FormLabel className="font-normal text-base">{role.label}</FormLabel>
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
                    <FormLabel className="font-semibold text-lg">How often are you desperately hunting for fresh choons to record?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="frequently" /></FormControl>
                          <FormLabel className="font-normal text-base">All the time, I'm a machine!</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="sometimes" /></FormControl>
                          <FormLabel className="font-normal text-base">When the moon is right.</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="rarely" /></FormControl>
                          <FormLabel className="font-normal text-base">I write my own masterpieces, thank you.</FormLabel>
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
                    <FormLabel className="font-semibold text-lg">Ever wanted to sell your musical babies to strangers?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="yes-actively" /></FormControl>
                          <FormLabel className="font-normal text-base">Yes, my genius must be shared (for cash).</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="yes-interested" /></FormControl>
                          <FormLabel className="font-normal text-base">The thought has tickled my brain pickles.</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="no" /></FormControl>
                          <FormLabel className="font-normal text-base">No, they are my precious creations.</FormLabel>
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
                      <FormLabel className="font-semibold text-lg">What's the biggest pain in your musical rear? (Pick some)</FormLabel>
                     </div>
                      {[
                        { id: 'networking', label: 'Talking to other humans is hard.' },
                        { id: 'discovery', label: 'Finding good stuff is like finding a unicorn.' },
                        { id: 'legal', label: 'Contracts are written in goblin language.' },
                        { id: 'trust', label: 'Everyone is a shady weirdo.' }
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
                                    className="transform scale-125"
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
                                <FormLabel className="font-normal text-base">{item.label}</FormLabel>
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
                     <FormLabel className="font-semibold text-lg">What magic tricks should our platform do? (Choose your spells)</FormLabel>
                    </div>
                     {[
                        { id: 'search', label: 'A magical search that reads my mind.' },
                        { id: 'previews', label: 'Let me hear a tiny bit before I buy the cow.' },
                        { id: 'secure', label: 'Super-duper secure IP transactions with lasers.' },
                        { id: 'collaboration', label: 'A psychic link to collaborate with others.' }
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
                                    className="transform scale-125"
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
                                <FormLabel className="font-normal text-base">{item.label}</FormLabel>
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
                    <FormLabel className="font-semibold text-lg">Scream your secret thoughts into this box:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us your deepest, darkest musical desires..."
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
              <Button type="submit" disabled={isLoading} className="w-full text-xl py-6 hover:scale-110 transition-transform duration-300">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Transmitting Brainwaves...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-6 w-6" />
                    Launch My Thoughts Into The Void!
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
