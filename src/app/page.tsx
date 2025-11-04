'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sellerSchema = z.object({
  processoAtual: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  frustracao: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  ferramentas: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Selecione pelo menos uma ferramenta.',
  }),
  licenciamento: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Selecione pelo menos um tipo de licença.',
  }),
  descoberta: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  solucao: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  monetizacao: z.string().min(1, 'Por favor, selecione uma opção.'),
  focoLocal: z.string().min(1, 'Por favor, selecione uma opção.'),
});

const buyerSchema = z.object({
  processoAtual: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  frustracao: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  descoberta: z.array(z.string()).refine((value) => value.some((item) => item), {
     message: 'Selecione pelo menos uma preferência.',
  }),
  confianca: z.string().min(1, 'Por favor, selecione uma opção.'),
  preco: z.string().min(1, 'Por favor, selecione uma faixa de preço.'),
  solucao: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  pagamento: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Selecione pelo menos uma forma de pagamento.',
  }),
});

const formSchema = z.object({
  userType: z.enum(['seller', 'buyer']),
  seller: sellerSchema.optional(),
  buyer: buyerSchema.optional(),
}).refine(data => {
    if (data.userType === 'seller') return !!data.seller;
    if (data.userType === 'buyer') return !!data.buyer;
    return false;
}, {
    message: "Formulário inválido",
});


type FormValues = z.infer<typeof formSchema>;

export default function SurveyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: 'seller',
      seller: {
        processoAtual: '',
        frustracao: '',
        ferramentas: [],
        licenciamento: [],
        descoberta: '',
        solucao: '',
        monetizacao: '',
        focoLocal: '',
      },
      buyer: {
        processoAtual: '',
        frustracao: '',
        descoberta: [],
        confianca: '',
        preco: '',
        solucao: '',
        pagamento: [],
      }
    },
  });

  const userType = form.watch('userType');

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    console.log('Dados da Pesquisa:', values);
    
    // Simula uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Questionário enviado!",
      description: "Muito obrigado pelo seu feedback valioso.",
    });

    setIsLoading(false);
    setIsSubmitted(true);
    form.reset();
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <PartyPopper className="h-16 w-16 text-primary" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight">Obrigado!</h1>
        <p className="mt-2 max-w-md text-lg text-muted-foreground">
          Seu feedback é crucial para construirmos uma plataforma melhor para o futuro da música.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">O Futuro do Mercado Musical</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ajude-nos a entender as necessidades da indústria musical respondendo a algumas perguntas.
        </p>
      </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs 
              value={userType} 
              onValueChange={(value) => form.setValue('userType', value as 'seller' | 'buyer')} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="seller">Vendedor (Beatmaker/Compositor)</TabsTrigger>
                <TabsTrigger value="buyer">Comprador (Artista/MC)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="seller">
                <Card>
                  <CardHeader>
                    <CardTitle>Perguntas para Vendedores</CardTitle>
                    <CardDescription>Sua perspectiva como criador é fundamental.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Vendedor - Questão 1 */}
                    <FormField
                      control={form.control}
                      name="seller.processoAtual"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Me conte como você vende um beat hoje, do momento que você posta até receber o dinheiro.</FormLabel>
                          <FormControl><Textarea placeholder="Descreva seu processo de venda..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Vendedor - Questão 2 */}
                     <FormField
                      control={form.control}
                      name="seller.frustracao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Qual é a sua maior frustração nesse processo? O que mais te irrita?</FormLabel>
                          <FormControl><Textarea placeholder="Suas dores e frustrações..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Vendedor - Questão 3 */}
                    <FormField
                      control={form.control}
                      name="seller.ferramentas"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Quais plataformas você usa hoje? O que você gosta e não gosta nelas?</FormLabel>
                          {['BeatStars', 'Instagram', 'YouTube', 'Outra'].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="seller.ferramentas"
                              render={({ field }) => (
                                <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => checked
                                          ? field.onChange([...field.value, item])
                                          : field.onChange(field.value?.filter((v) => v !== item))}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base">{item}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                     {/* Vendedor - Questão 4 */}
                     <FormField
                      control={form.control}
                      name="seller.licenciamento"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Que tipos de licença você vende?</FormLabel>
                          {['MP3', 'WAV', 'Stems (Arquivos Separados)', 'Exclusiva'].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="seller.licenciamento"
                              render={({ field }) => (
                                <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => checked
                                          ? field.onChange([...field.value, item])
                                          : field.onChange(field.value?.filter((v) => v !== item))}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base">{item}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Vendedor - Questão 5 */}
                    <FormField
                      control={form.control}
                      name="seller.descoberta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Como os artistas te encontram hoje?</FormLabel>
                          <FormControl><Textarea placeholder="Redes sociais, indicação, etc." {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Vendedor - Questão 6 */}
                    <FormField
                      control={form.control}
                      name="seller.solucao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Se você tivesse um app 'mágico' para vender seus beats, o que ele obrigatoriamente teria?</FormLabel>
                          <FormControl><Textarea placeholder="Pense em funcionalidades, facilidades, etc." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Vendedor - Questão 7 */}
                    <FormField
                      control={form.control}
                      name="seller.monetizacao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">A maioria das plataformas fica com 30% da venda (em planos gratuitos). Você acha isso justo? Qual seria o ideal?</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="justo" /></FormControl><FormLabel className="font-normal text-base">Acho 30% justo</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="ideal_15" /></FormControl><FormLabel className="font-normal text-base">O ideal seria 10-15%</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="ideal_0" /></FormControl><FormLabel className="font-normal text-base">O ideal seria 0% (ou taxa fixa)</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                     {/* Vendedor - Questão 8 */}
                     <FormField
                      control={form.control}
                      name="seller.focoLocal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Você vê vantagem em uma plataforma focada primeiro no mercado brasileiro?</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="sim" /></FormControl><FormLabel className="font-normal text-base">Sim, com certeza</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="nao" /></FormControl><FormLabel className="font-normal text-base">Não, prefiro plataformas globais</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="indiferente" /></FormControl><FormLabel className="font-normal text-base">É indiferente para mim</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="buyer">
                <Card>
                  <CardHeader>
                    <CardTitle>Perguntas para Compradores</CardTitle>
                    <CardDescription>Sua jornada para encontrar o beat perfeito nos interessa.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                     {/* Comprador - Questão 1 */}
                     <FormField
                      control={form.control}
                      name="buyer.processoAtual"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Onde você procura beats para suas músicas hoje? Como é esse processo?</FormLabel>
                          <FormControl><Textarea placeholder="YouTube, BeatStars, contato direto..." {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                     {/* Comprador - Questão 2 */}
                     <FormField
                      control={form.control}
                      name="buyer.frustracao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Qual é a sua maior dificuldade ao procurar e comprar um beat?</FormLabel>
                          <FormControl><Textarea placeholder="Ex: Achar algo original, preços, confiança..." {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                     {/* Comprador - Questão 3 */}
                    <FormField
                      control={form.control}
                      name="buyer.descoberta"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Como você prefere procurar um beat?</FormLabel>
                           {['Por Gênero (Trap, Funk, etc)', "Por 'Type Beat' (Ex: L7nnon type beat)", 'Por Mood/Sentimento (Ex: triste, agressivo)', 'Por BPM (velocidade da música)'].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="buyer.descoberta"
                              render={({ field }) => (
                                <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => checked
                                          ? field.onChange([...field.value, item])
                                          : field.onChange(field.value?.filter((v) => v !== item))}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base">{item}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Comprador - Questão 4 */}
                    <FormField
                      control={form.control}
                      name="buyer.confianca"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Você entende as diferenças de licenciamento (lease vs. exclusivo)? O que você mais teme ao comprar um beat?</FormLabel>
                           <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="sim_temor" /></FormControl><FormLabel className="font-normal text-base">Sim, e temo que o beat seja vendido para outros</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="sim_sem_temor" /></FormControl><FormLabel className="font-normal text-base">Sim, e não tenho grandes temores</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="nao" /></FormControl><FormLabel className="font-normal text-base">Não entendo bem as diferenças</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Comprador - Questão 5 */}
                    <FormField
                      control={form.control}
                      name="buyer.preco"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Quanto você costuma pagar por um beat (lease não-exclusivo)?</FormLabel>
                           <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="ate_100" /></FormControl><FormLabel className="font-normal text-base">Até R$ 100</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="100_300" /></FormControl><FormLabel className="font-normal text-base">Entre R$ 100 e R$ 300</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="mais_300" /></FormControl><FormLabel className="font-normal text-base">Mais de R$ 300</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Comprador - Questão 6 */}
                    <FormField
                      control={form.control}
                      name="buyer.solucao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">O que um app de compra de beats precisaria ter para fazer você parar de procurar no YouTube ou no Insta?</FormLabel>
                          <FormControl><Textarea placeholder="Ex: Filtros melhores, mais confiança, pagamento fácil..." {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Comprador - Questão 7 */}
                     <FormField
                      control={form.control}
                      name="buyer.pagamento"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Como você prefere pagar?</FormLabel>
                           {['PIX', 'Cartão de Crédito', 'Boleto'].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="buyer.pagamento"
                              render={({ field }) => (
                                <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => checked
                                          ? field.onChange([...field.value, item])
                                          : field.onChange(field.value?.filter((v) => v !== item))}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-base">{item}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <CardFooter className="mt-6">
              <Button type="submit" disabled={isLoading} size="lg" className="w-full font-bold text-lg tracking-wider">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Feedback
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
    </div>
  );
}
