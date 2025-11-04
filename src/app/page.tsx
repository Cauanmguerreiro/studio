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
import Link from 'next/link';

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

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Uma Revolução na Indústria Musical</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              O Songnation nasceu para quebrar barreiras, valorizar o compositor e dar ao artista a ferramenta que faltava para encontrar o próximo hit.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Descoberta Inteligente</h3>
                <p className="mt-2 text-muted-foreground">Filtre por gênero, humor ou tema e encontre a composição perfeita em minutos, não em meses.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Segurança Jurídica</h3>
                <p className="mt-2 text-muted-foreground">Transações transparentes com contratos automatizados que protegem compositores e artistas.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Wand2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Valorização do Criador</h3>
                <p className="mt-2 text-muted-foreground">Damos ao compositor a vitrine e a monetização que ele merece, transformando arte em receita.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Conexão Direta</h3>
                <p className="mt-2 text-muted-foreground">Uma ponte direta entre o gênio criativo e a voz que vai levar a música ao topo das paradas.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Genres Section */}
      <section className="pb-16 md:pb-24 bg-background">
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
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSco65pXa-BYEXNvrMA-J94SH1cOC3IB6izsenEWRCFIiEJr4g/viewform?embedded=true" 
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
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSepQ1CHZ8uroa8PsO7xnshRLNvMKEtcWWYSZv-NspqzCSi8uQ/viewform?embedded=true" 
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
        <div className="container px-4 text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} SONGNATION. Todos os direitos reservados.</p>
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <Link href="/terms" passHref>
                    <Button variant="link" className="text-muted-foreground">Termos de Serviço</Button>
                    </Link>
                    <Link href="/privacy" passHref>
                    <Button variant="link" className="text-muted-foreground">Política de Privacidade</Button>
                    </Link>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center">
                <h4 className="font-semibold text-foreground">Desenvolvido por</h4>
                <p className="mt-2">
                    Cauan Guerreiro &bull; Gustavo Camargo &bull; Bruno Barbosa &bull; Guilherme Serrano &bull; Nicolas Dimer
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}
