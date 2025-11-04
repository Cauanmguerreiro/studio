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
        <h1 className="mt-6 text-4xl font-bold tracking-tight">Thank You</h1>
        <p className="mt-2 max-w-md text-lg text-muted-foreground">
          Your feedback is important to us. It will help us build a better platform for the future of music.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">The Future of Music IP</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Help us understand the needs of the music industry by answering a few short questions.
        </p>
      </div>

      <Card className="border-none">
        <CardHeader>
          <CardTitle>Market Research Survey</CardTitle>
          <CardDescription>Your answers will help shape the future of our platform.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-semibold text-base">What is your primary role in the music industry?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
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
                    <FormLabel className="font-semibold text-base">How often do you look for new compositions to record or perform?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="frequently" /></FormControl>
                          <FormLabel className="font-normal text-base">Frequently</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="sometimes" /></FormControl>
                          <FormLabel className="font-normal text-base">Sometimes</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="rarely" /></FormControl>
                          <FormLabel className="font-normal text-base">Rarely or never</FormLabel>
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
                    <FormLabel className="font-semibold text-base">Have you ever considered selling the rights to your original compositions?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="yes-actively" /></FormControl>
                          <FormLabel className="font-normal text-base">Yes, I am actively looking for ways to do so.</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="yes-interested" /></FormControl>
                          <FormLabel className="font-normal text-base">I would be interested if there was a simple way.</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="no" /></FormControl>
                          <FormLabel className="font-normal text-base">No, I am not interested.</FormLabel>
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
                      <FormLabel className="font-semibold text-base">What are the biggest challenges you face in the music industry? (Select all that apply)</FormLabel>
                     </div>
                      {[
                        { id: 'networking', label: 'Networking and connecting with other professionals.' },
                        { id: 'discovery', label: 'Discovering new talent or compositions.' },
                        { id: 'legal', label: 'Navigating contracts and legal issues.' },
                        { id: 'trust', label: 'Ensuring trust and transparency in transactions.' }
                      ].map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="challenges"
                          render={({ field }) => {
                            return (
                              <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0 mb-2">
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
                     <FormLabel className="font-semibold text-base">Which features would be most valuable in a music IP marketplace? (Select all that apply)</FormLabel>
                    </div>
                     {[
                        { id: 'search', label: 'Advanced search and filtering for compositions.' },
                        { id: 'previews', label: 'Ability to listen to high-quality audio previews.' },
                        { id: 'secure', label: 'Secure and transparent IP rights transactions.' },
                        { id: 'collaboration', label: 'Tools for collaboration between artists and composers.' }
                      ].map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="features"
                          render={({ field }) => {
                            return (
                              <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0 mb-2">
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
                    <FormLabel className="font-semibold text-base">Any additional thoughts or comments?</FormLabel>
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
              <Button type="submit" disabled={isLoading} size="lg" className="w-full font-bold text-lg tracking-wider">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
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
