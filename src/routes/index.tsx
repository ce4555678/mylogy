import { createFileRoute } from '@tanstack/react-router'
// import { pipeline, type DataArray } from '@xenova/transformers'
// import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  FileText,
  Lock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { NavHeader } from '#/components/ui/nav-header'

export const Route = createFileRoute('/')({ component: App })

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Privacidade Total',
    desc: 'Nenhum dado sai do seu navegador. Armazenamento 100% local e seguro, sem rastreamento.',
  },
  {
    icon: Sparkles,
    title: 'Busca Inteligente',
    desc: 'Encontre qualquer nota por palavras-chave ou trechos de conteúdo em milissegundos.',
  },
  {
    icon: FileText,
    title: 'Interface Limpa',
    desc: 'Design minimalista e focado para você escrever sem distrações e com clareza.',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Crie uma nota', desc: 'Clique em "Nova Nota" e comece a escrever o que quiser.' },
  { step: '02', title: 'Organize e busque', desc: 'Use a busca para encontrar qualquer nota instantaneamente.' },
  { step: '03', title: 'Tudo seu, sempre', desc: 'Seus dados ficam apenas no seu dispositivo. Sem nuvem, sem upload.' },
]

function App() {
  // async function gen(text: string) {
  //   const extractor = await pipeline(
  //     'feature-extraction',
  //     'Xenova/paraphrase-multilingual-MiniLM-L12-v2',
  //     {
  //       progress_callback: (data: any) => {
  //         if (data.status === 'progress') {
  //           console.log(`Baixando: ${data.progress.toFixed(2)}%`)
  //         }
  //         if (data.status === 'ready') {
  //           console.log('Modelo pronto e salvo para uso offline!')
  //         }
  //       },
  //     },
  //   )
  //   // const output = await extractor(text, { pooling: 'mean', normalize: true })
  // }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary px-4 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
        <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary-foreground/6" />
        <div className="pointer-events-none absolute -bottom-24 -right-12 w-96 h-96 rounded-full bg-primary-foreground/6" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-foreground/4" />

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/20 px-4 py-1.5 text-xs font-bold text-primary-foreground mb-8 tracking-wide uppercase">
            <Lock className="w-3 h-3" />
            100% privado — só no seu dispositivo
          </span>

          <h1 className="text-4xl sm:text-6xl font-bold text-primary-foreground leading-tight text-balance mb-6">
            Seu diário digital,
            <br className="hidden sm:block" /> do seu jeito.
          </h1>
          <p className="text-primary-foreground/85 text-base sm:text-lg leading-relaxed mb-10 text-pretty max-w-lg mx-auto">
            Escreva, organize e relembre seus pensamentos e ideias — com
            privacidade total e design que inspira.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* <Button
              size="lg"
              // onClick={() => setIsNewNoteOpen(true)}
              className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/95 font-bold text-sm px-8 h-12 rounded-xl shadow-lg"
            >
              <PenLine className="w-4 h-4 mr-2" />
              Criar primeira nota
            </Button> */}
            <a href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="ghost"
                className="w-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-sm px-8 h-12 rounded-xl"
              >
                Ver Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-4 py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Por que mylogy?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
              Tudo que você precisa,
              <br className="hidden sm:block" /> nada do que não quer.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-3 rounded-2xl border-2 border-border bg-card p-6 shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/12 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-base">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP PREVIEW ── */}
      <section className="px-4 py-12 sm:py-16 bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Interface
          </p>
          <div className="relative rounded-3xl overflow-hidden border-2 border-border shadow-md mx-auto max-w-xs sm:max-w-sm">
            <img
              src="/hero-preview.jpg"
              alt="Preview da interface do mylogy em um smartphone"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-4 py-16 sm:py-20 bg-muted/40 border-y border-border/60">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Como funciona
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
              Simples assim.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold text-primary-foreground">{step}</span>
                </div>
                <h3 className="font-bold text-foreground text-base">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="px-4 py-16 sm:py-24 bg-background text-center">
        <div className="mx-auto max-w-xl">
          <div className="w-16 h-16 rounded-2xl bg-primary/12 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance mb-4">
            Pronto para começar?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
            Sua primeira nota está a um clique de distância. Sem cadastro, sem
            email, sem senha.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            
            <a href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-border text-foreground hover:bg-muted hover:border-primary/50 font-semibold text-sm px-8 h-12 rounded-xl"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Ir para o Dashboard
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/40 bg-card/50 px-4 py-8 text-center mt-auto">
        <p className="text-sm text-muted-foreground font-medium">
          mylogy &copy; {new Date().getFullYear()} &mdash; Seus pensamentos,
          somente seus.
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Armazenamento local. Sem nuvem. Sem rastreamento.
        </p>
      </footer>
    </div>
  )
}
