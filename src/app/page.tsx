'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, CheckCircle, Search, ShieldCheck, Users, Wand2 } from 'lucide-react';
import { compositions } from '@/lib/data';
import { CompositionCard } from '@/components/composition-card';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { GenreIcons } from '@/components/icons';
import { genres } from '@/lib/data';

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
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Input
              type="email"
              placeholder="Digite seu melhor e-mail"
              className="max-w-sm text-lg h-12 text-foreground"
            />
            <Button size="lg" className="w-full sm:w-auto font-bold text-lg">
              Receber Acesso Antecipado <ArrowRight className="ml-2" />
            </Button>
          </div>
          <p className="mt-2 text-sm text-white/60">Junte-se à lista de espera e seja o primeiro a saber.</p>
        </div>
      </section>

      {/* Featured Compositions Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Músicas em Destaque</h2>
          <p className="mt-2 text-lg text-muted-foreground text-center max-w-xl mx-auto">
            Explore uma seleção de nossas composições mais recentes e populares.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {compositions.slice(0, 4).map((comp) => (
              <CompositionCard key={comp.id} composition={comp} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Explorar Todo o Catálogo <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
                <Badge variant="outline">Plataforma Completa</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">Tudo que você precisa em um só lugar</h2>
                <p className="text-lg text-muted-foreground">
                    Desde a busca pela batida perfeita até a formalização dos direitos autorais, a SONGNATION simplifica cada etapa do processo.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="p-6">
                    <CardContent className="flex flex-col items-center text-center">
                        <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-bold text-lg">Licenciamento Seguro</h3>
                        <p className="text-muted-foreground text-sm mt-1">Transações protegidas e contratos inteligentes para sua tranquilidade.</p>
                    </CardContent>
                </Card>
                 <Card className="p-6">
                    <CardContent className="flex flex-col items-center text-center">
                        <Search className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-bold text-lg">Busca Inteligente</h3>
                        <p className="text-muted-foreground text-sm mt-1">Filtre por gênero, humor, BPM e encontre a composição ideal para seu projeto.</p>
                    </CardContent>
                </Card>
                 <Card className="p-6">
                    <CardContent className="flex flex-col items-center text-center">
                        <Users className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-bold text-lg">Colaboração</h3>
                        <p className="text-muted-foreground text-sm mt-1">Conecte-se com outros talentos, co-crie e divida os royalties de forma justa.</p>
                    </CardContent>
                </Card>
                 <Card className="p-6">
                    <CardContent className="flex flex-col items-center text-center">
                        <Wand2 className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-bold text-lg">Ferramentas IA</h3>
                        <p className="text-muted-foreground text-sm mt-1">Gere letras, otimize SEO e encontre inspiração com nossa suíte de IA.</p>
                    </CardContent>
                </Card>
            </div>
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
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Pronto para Revolucionar sua Música?</h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/80">
            Junte-se à nossa comunidade de criadores e artistas visionários.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Input
              type="email"
              placeholder="seu.email@exemplo.com"
              className="max-w-sm text-lg h-12 bg-primary-foreground/10 border-primary-foreground/30 placeholder:text-primary-foreground/50 focus:bg-background focus:text-foreground"
            />
            <Button size="lg" variant="secondary" className="w-full sm:w-auto font-bold text-lg">
                Garantir meu Acesso
            </Button>
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
