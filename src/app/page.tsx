'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search, ShieldCheck, Users, Wand2 } from 'lucide-react';
import { genres } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { GenreIcons } from '@/components/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LandingPage() {
  const heroImage = placeholderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        {heroImage && (
            <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover -z-10 brightness-50"
            priority
            />
        )}
        <div className="container px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter !leading-tight">
            O Ecossistema da Música.<br/>Conectando Criadores e Artistas.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80">
            Descubra, licencie e colabore em composições únicas com segurança e transparência. O futuro da propriedade intelectual na música começa aqui.
          </p>
          <div className="mt-8">
            <Button size="lg" className="font-bold text-lg" onClick={() => document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Participe da Pesquisa <ArrowRight className="ml-2" />
            </Button>
            <p className="mt-2 text-sm text-white/60">Sua opinião é fundamental para construirmos o futuro da música.</p>
          </div>
        </div>
      </section>
      
      {/* Genres Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Explore por Gênero</h2>
           <p className="mt-2 text-lg text-muted-foreground max-w-xl mx-auto">
            Navegue por uma vasta biblioteca de gêneros musicais brasileiros e encontre seu próximo hit.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {genres.map((genre) => {
              const Icon = GenreIcons[genre as keyof typeof GenreIcons];
              return (
                <Badge
                  key={genre}
                  variant="outline"
                  className="px-6 py-3 text-lg cursor-pointer hover:bg-accent"
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {genre}
                </Badge>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section id="cta-section" className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Faça Parte da Construção da SONGNATION</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Sua perspectiva como criador ou comprador é essencial. Responda nossa pesquisa e nos ajude a moldar a plataforma ideal para o mercado musical brasileiro.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-bold text-lg">
                  Sou Compositor / Produtor
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Pesquisa para Criadores</DialogTitle>
                  <DialogDescription>
                    Seu feedback é crucial para nós.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-1">
                   {/* SUBSTITUA O 'src' ABAIXO PELA URL DE EMBED DO SEU GOOGLE FORM PARA PRODUTORES */}
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/viewform?embedded=true" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0}>
                      Carregando…
                  </iframe>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                 <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold text-lg bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Sou Artista / Intérprete
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Pesquisa para Compradores</DialogTitle>
                  <DialogDescription>
                    Queremos entender suas necessidades.
                  </DialogDescription>
                </DialogHeader>
                 <div className="flex-1">
                   {/* SUBSTITUA O 'src' ABAIXO PELA URL DE EMBED DO SEU GOOGLE FORM PARA ARTISTAS */}
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy/viewform?embedded=true" 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0}>
                      Carregando…
                  </iframe>
                </div>
              </DialogContent>
            </Dialog>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SONGNATION. Todos os direitos reservados.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
                <Button variant="link" className="text-muted-foreground">Termos de Serviço</Button>
                <Button variant="link" className="text-muted-foreground">Política de Privacidade</Button>
            </div>
        </div>
      </footer>
    </div>
  );
}
