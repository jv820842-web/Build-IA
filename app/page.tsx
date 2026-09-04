import Link from 'next/link';
import { Cpu, ArrowRight, Code2, Sparkles, Layers, Rocket } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-600 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-neutral-800/80 bg-neutral-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-7 w-7 text-purple-500" />
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-neutral-200 to-purple-400 bg-clip-text text-transparent">
              Build IA
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
            <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#precos" className="hover:text-white transition-colors">Preços</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
              Entrar
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition-all shadow-lg shadow-purple-600/30"
            >
              Criar Agora
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto text-center relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        
        <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Transforme ideias em software em minutos
        </span>
        
        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Crie aplicações completas descrevendo com <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-blue-500 bg-clip-text text-transparent">Inteligência Artificial</span>.
        </h1>
        
        <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto">
          O Build IA gera código, banco de dados e interfaces completas a partir das suas instruções em texto simples.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-purple-600/30"
          >
            Começar a criar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mockup do Editor */}
        <div className="mt-16 max-w-4xl mx-auto rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-xl shadow-2xl text-left">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 mb-4">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-neutral-500 ml-2">Build IA Studio</span>
          </div>
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <p className="text-xs text-neutral-400 mb-2">Instrução para a IA:</p>
            <p className="text-sm text-purple-300 font-mono font-medium">"Crie um SaaS de agendamento de consultas com suporte a pagamento via PIX e painel administrativo em dark mode."</p>
          </div>
        </div>
      </section>

      {/* Grid de Recursos */}
      <section id="recursos" className="py-20 border-t border-neutral-900 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Tudo o que você precisa para lançar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-neutral-800 bg-neutral-900/30 p-6 rounded-2xl">
            <Code2 className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Geração de Código Limpo</h3>
            <p className="text-sm text-neutral-400">Código moderno estruturado com Next.js, React e TypeScript pronto para produção.</p>
          </div>
          <div className="border border-neutral-800 bg-neutral-900/30 p-6 rounded-2xl">
            <Layers className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Banco de Dados Automático</h3>
            <p className="text-sm text-neutral-400">Modelagem automática do banco de dados e APIs REST estruturadas.</p>
          </div>
          <div className="border border-neutral-800 bg-neutral-900/30 p-6 rounded-2xl">
            <Rocket className="h-8 w-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Deploy Instantâneo</h3>
            <p className="text-sm text-neutral-400">Publique sua aplicação na nuvem com um clique e compartilhe o link imediatamente.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
