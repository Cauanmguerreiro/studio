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
import { Input } from '@/components/ui/input';

const sellerSchema = z.object({
  processoAtual: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  frustracao: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  ferramentas: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Selecione pelo menos uma ferramenta.',
  }),
  licenciamento: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Selecione pelo menos um tipo de licença.',
  }),
  precoExclusiva: z.string().min(1, 'Por favor, selecione uma opção.'),
  descoberta: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  colaboracao: z.string().min(1, 'Por favor, selecione uma opção.'),
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
  medoCompra: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  preco: z.string().min(1, 'Por favor, selecione uma faixa de preço.'),
  solucao: z.string().min(10, 'Por favor, detalhe um pouco mais.'),
  pagamento: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Selecione pelo menos uma forma de pagamento.',
  }),
  feedback: z.string().min(1, 'Por favor, selecione uma opção.'),
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
        precoExclusiva: '',
        descoberta: '',
        colaboracao: '',
        solucao: '',
        monetizacao: '',
        focoLocal: '',
      },
      buyer: {
        processoAtual: '',
        frustracao: '',
        descoberta: [],
        confianca: '',
        medoCompra: '',
        preco: '',
        solucao: '',
        pagamento: [],
        feedback: '',
      }
    },
  });

  const userType = form.watch('userType');

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    console.log('Dados da Pesquisa:', values);
    
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
                <TabsTrigger value="seller">Sou Compositor / Produtor</TabsTrigger>
                <TabsTrigger value="buyer">Sou Artista / Intérprete</TabsTrigger>
              </TabsList>
              
              <TabsContent value="seller">
                <Card>
                  <CardHeader>
                    <CardTitle>Perguntas para Criadores</CardTitle>
                    <CardDescription>Sua perspectiva como criador é fundamental.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <FormField
                      control={form.control}
                      name="seller.processoAtual"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Como você comercializa uma composição sua hoje, desde a criação até o recebimento?</FormLabel>
                          <FormControl><Textarea placeholder="Descreva seu processo de venda..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={form.control}
                      name="seller.ferramentas"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Que tipo de plataformas você usa hoje? O que você gosta e não gosta nelas?</FormLabel>
                          {['Plataformas especializadas (Ex: BeatStars)', 'Redes Sociais (Instagram, TikTok)', 'YouTube', 'Contato direto (WhatsApp, E-mail)', 'Outra'].map((item) => (
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
                     <FormField
                      control={form.control}
                      name="seller.licenciamento"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Que tipos de licença você costuma vender?</FormLabel>
                          {['Leasing (não-exclusivo) com arquivo MP3', 'Leasing com arquivo WAV', 'Leasing com Stems (arquivos separados)', 'Licença Exclusiva (direitos totais)'].map((item) => (
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
                     <FormField
                      control={form.control}
                      name="seller.precoExclusiva"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Como você define o preço para uma licença exclusiva?</FormLabel>
                           <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="fixo" /></FormControl><FormLabel className="font-normal text-base">Tenho um preço fixo</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="negocio" /></FormControl><FormLabel className="font-normal text-base">Eu negocio caso a caso</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="nao_vendo" /></FormControl><FormLabel className="font-normal text-base">Ainda não vendo licenças exclusivas</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="seller.descoberta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Como os artistas e intérpretes descobrem seu trabalho hoje?</FormLabel>
                          <FormControl><Textarea placeholder="Redes sociais, indicação, etc." {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="seller.colaboracao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Você tem interesse em colaborar com outros compositores ou produtores?</FormLabel>
                           <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="sim" /></FormControl><FormLabel className="font-normal text-base">Sim, ativamente</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="as_vezes" /></FormControl><FormLabel className="font-normal text-base">Sim, ocasionalmente</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="nao" /></FormControl><FormLabel className="font-normal text-base">Não, prefiro trabalhar sozinho</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="seller.solucao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Se você tivesse uma plataforma "mágica" para suas criações, o que ela obrigatoriamente teria?</FormLabel>
                          <FormControl><Textarea placeholder="Pense em funcionalidades, facilidades, segurança, etc." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="seller.monetizacao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Plataformas internacionais costumam ficar com 30% da venda. O que você acha disso?</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="justo" /></FormControl><FormLabel className="font-normal text-base">Acho 30% justo pelo que oferecem</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="ideal_15" /></FormControl><FormLabel className="font-normal text-base">O ideal seria entre 10-15%</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="ideal_0" /></FormControl><FormLabel className="font-normal text-base">O ideal seria uma taxa fixa ou 0%</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="seller.focoLocal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Você vê vantagem em uma plataforma focada no mercado brasileiro?</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="sim" /></FormControl><FormLabel className="font-normal text-base">Sim, com certeza (pelo idioma, suporte, pagamentos)</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="nao" /></FormControl><FormLabel className="font-normal text-base">Não, prefiro plataformas globais pelo alcance</FormLabel></FormItem>
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
                    <CardTitle>Perguntas para Artistas</CardTitle>
                    <CardDescription>Sua jornada para encontrar a composição perfeita nos interessa.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                     <FormField
                      control={form.control}
                      name="buyer.processoAtual"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Onde você procura instrumentais e composições para suas músicas hoje?</FormLabel>
                          <FormControl><Textarea placeholder="YouTube, Spotify, contato direto com produtores..." {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="buyer.frustracao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Qual é a sua maior dificuldade ao procurar e licenciar uma obra?</FormLabel>
                          <FormControl><Textarea placeholder="Ex: Achar algo original, preços, burocracia, confiança..." {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="buyer.descoberta"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Como você prefere buscar uma nova composição?</FormLabel>
                           {['Por Gênero Musical', "Por Artista de Referência (Ex: 'tipo L7nnon')", 'Por Mood/Sentimento (Ex: dançante, reflexiva)', 'Por Instrumentos', 'Por BPM (velocidade)'].map((item) => (
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
                    <FormField
                      control={form.control}
                      name="buyer.confianca"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Você entende as diferenças de licenciamento (leasing vs. exclusividade)?</FormLabel>
                           <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="sim" /></FormControl><FormLabel className="font-normal text-base">Sim, entendo bem</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="parcialmente" /></FormControl><FormLabel className="font-normal text-base">Entendo o básico, mas tenho dúvidas</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="nao" /></FormControl><FormLabel className="font-normal text-base">Não, acho confuso</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="buyer.medoCompra"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">O que mais te causa insegurança ao licenciar uma composição online?</FormLabel>
                          <FormControl><Textarea placeholder="Ex: O produtor vender pra outro, problemas com direitos autorais..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="buyer.preco"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Quanto você costuma pagar por uma licença não-exclusiva (leasing)?</FormLabel>
                           <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="ate_150" /></FormControl><FormLabel className="font-normal text-base">Até R$ 150</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="150_400" /></FormControl><FormLabel className="font-normal text-base">Entre R$ 150 e R$ 400</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="mais_400" /></FormControl><FormLabel className="font-normal text-base">Mais de R$ 400</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="nao_pago" /></FormControl><FormLabel className="font-normal text-base">Normalmente não pago, busco opções gratuitas</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="buyer.solucao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">O que uma plataforma precisaria ter para ser sua principal fonte de composições?</FormLabel>
                          <FormControl><Textarea placeholder="Ex: Filtros melhores, mais confiança, pagamento fácil, clareza nos contratos..." {...field} /></FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="buyer.pagamento"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Como você prefere pagar por uma licença?</FormLabel>
                           {['PIX', 'Cartão de Crédito Parcelado', 'Boleto Bancário'].map((item) => (
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
                     <FormField
                      control={form.control}
                      name="buyer.feedback"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-base">Você gostaria de ter um canal para dar feedback ou pedir ajustes diretamente ao produtor pela plataforma?</FormLabel>
                           <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="sim" /></FormControl><FormLabel className="font-normal text-base">Sim, seria um grande diferencial</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="talvez" /></FormControl><FormLabel className="font-normal text-base">Talvez, se for simples de usar</FormLabel></FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="nao" /></FormControl><FormLabel className="font-normal text-base">Não, prefiro resolver por fora</FormLabel></FormItem>
                            </RadioGroup>
                          </FormControl>
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
