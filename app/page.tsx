'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Plus, 
  Search, 
  Compass, 
  Grid, 
  Settings, 
  Mic,
  X,
  MessageSquare,
  Trash2,
  Cpu,
  ArrowRight,
  Zap,
  Code2,
  Bot,
  Layers,
  CheckCircle2,
  Terminal,
  Wand2
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'search' | 'explore' | 'apps' | 'settings'>('chat');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content },
      ]);
    } catch (error) {
      console.error(error);
    } flex {
      setLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#0d0718] text-[#e3e3e3] font-sans antialiased relative overflow-x-hidden flex flex-col justify-between p-6">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] opacity-25 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-[#6b21a8] opacity-20 blur-[160px] pointer-events-none rounded-full" />

        {/* Header Fixo */}
        <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-4 z-10 sticky top-0 bg-[#0d0718]/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#9333ea]/20 border border-[#9333ea]/40 rounded-lg">
              <Cpu className="w-5 h-5 text-[#c084fc]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Build IA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#a78bfa]">
            <button 
              onClick={() => scrollToSection('recursos')} 
              className="hover:text-[#c084fc] transition-colors cursor-pointer"
            >
              Recursos
            </button>
            <button 
              onClick={() => scrollToSection('como-funciona')} 
              className="hover:text-[#c084fc] transition-colors cursor-pointer"
            >
              Como funciona
            </button>
            <button 
              onClick={() => scrollToSection('precos')} 
              className="hover:text-[#c084fc] transition-colors cursor-pointer"
            >
              Preços
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowLanding(false)}
              className="text-sm text-[#e4e4e7] hover:text-white transition-colors px-3 py-1.5"
            >
              Entrar
            </button>
            <button 
              onClick={() => setShowLanding(false)}
              className="bg-gradient-to-r from-[#a855f7] to-[#9333ea] hover:opacity-90 text-white text-sm font-medium px-5 py-2 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
            >
              Criar Agora
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-4xl mx-auto w-full text-center my-auto py-16 z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9333ea]/10 border border-[#9333ea]/30 text-[#c084fc] text-xs font-medium uppercase tracking-wider mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSFORME IDEIAS EM SOFTWARE EM MINUTOS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Crie aplicações completas descrevendo com <br />
            <span className="bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#60a5fa] bg-clip-text text-transparent">
              Inteligência Artificial.
            </span>
          </h1>

          <p className="mt-6 text-lg text-[#a78bfa] max-w-2xl leading-relaxed">
            O Build IA gera código, banco de dados e interfaces completas a partir das suas instruções em texto simples.
          </p>

          <button 
            onClick={() => setShowLanding(false)}
            className="mt-10 bg-gradient-to-r from-[#a855f7] to-[#7e22ce] hover:from-[#9333ea] hover:to-[#6b21a8] text-white font-medium px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center gap-2 text-base transition-all transform hover:scale-105"
          >
            <span>Começar a criar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </main>

        {/* Seção Recursos */}
        <section id="recursos" className="max-w-5xl mx-auto w-full py-20 border-t border-[#2a1249] z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Recursos do Build IA</h2>
            <p className="text-[#a78bfa] mt-2">Tudo o que você precisa para sair da ideia para a produção.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#170929] rounded-2xl border border-[#2a1249]">
              <Code2 className="w-8 h-8 text-[#c084fc] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Geração de Código Clean</h3>
              <p className="text-sm text-[#a78bfa]">Código otimizado em Next.js, React e TypeScript com boas práticas integradas.</p>
            </div>
            <div className="p-6 bg-[#170929] rounded-2xl border border-[#2a1249]">
              <Zap className="w-8 h-8 text-[#c084fc] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Respostas Ultrarrápidas</h3>
              <p className="text-sm text-[#a78bfa]">Motor Build IA 3.6 Flash projetado para baixíssima latência na criação.</p>
            </div>
            <div className="p-6 bg-[#170929] rounded-2xl border border-[#2a1249]">
              <Layers className="w-8 h-8 text-[#c084fc] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Interfaces Reativas</h3>
              <p className="text-sm text-[#a78bfa]">Componentes UI elegantes, responsivos e prontos para publicar na nuvem.</p>
            </div>
          </div>
        </section>

        {/* Seção Como Funciona */}
        <section id="como-funciona" className="max-w-5xl mx-auto w-full py-20 border-t border-[#2a1249] z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Como Funciona</h2>
            <p className="text-[#a78bfa] mt-2">Construa em apenas 3 passos simples.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2a1249] text-[#c084fc] font-bold flex items-center justify-center mb-4 border border-[#9333ea]">1</div>
              <h3 className="font-semibold text-white mb-1">Descreva seu Projeto</h3>
              <p className="text-sm text-[#a78bfa]">Digite o que você quer construir em português simples.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2a1249] text-[#c084fc] font-bold flex items-center justify-center mb-4 border border-[#9333ea]">2</div>
              <h3 className="font-semibold text-white mb-1">Processamento IA</h3>
              <p className="text-sm text-[#a78bfa]">A IA estrutura as telas, lógica e componentes da aplicação.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2a1249] text-[#c084fc] font-bold flex items-center justify-center mb-4 border border-[#9333ea]">3</div>
              <h3 className="font-semibold text-white mb-1">Publique com 1 Clique</h3>
              <p className="text-sm text-[#a78bfa]">Exporte seu código ou coloque no ar via Vercel instantaneamente.</p>
            </div>
          </div>
        </section>

        {/* Seção Preços (Atualizado para $5,99/mês sem checkout) */}
        <section id="precos" className="max-w-5xl mx-auto w-full py-20 border-t border-[#2a1249] z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Planos e Preços</h2>
            <p className="text-[#a78bfa] mt-2">Escolha o plano ideal para suas necessidades.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="p-8 bg-[#170929] rounded-2xl border border-[#2a1249] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Starter</h3>
                <p className="text-3xl font-extrabold text-[#c084fc] my-4">Grátis</p>
                <ul className="space-y-3 text-sm text-[#a78bfa] mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c084fc]" /> Acesso ao Build IA 3.6 Flash</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c084fc]" /> Conversas e projetos ilimitados</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c084fc]" /> Exportação de código</li>
                </ul>
              </div>
              <button onClick={() => setShowLanding(false)} className="w-full py-2.5 bg-[#2a1249] hover:bg-[#3b1768] text-white font-medium rounded-xl transition-colors">
                Acessar Agora
              </button>
            </div>

            <div className="p-8 bg-[#1e0b38] rounded-2xl border border-[#a855f7] relative shadow-[0_0_25px_rgba(168,85,247,0.25)] flex flex-col justify-between">
              <span className="absolute -top-3 right-6 bg-[#a855f7] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
              <div>
                <h3 className="text-xl font-bold text-white">Pro Studio</h3>
                <p className="text-3xl font-extrabold text-[#c084fc] my-4">$ 5,99 <span className="text-sm font-normal text-[#a78bfa]">/mês</span></p>
                <ul className="space-y-3 text-sm text-[#a78bfa] mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c084fc]" /> Recursos do plano Starter</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c084fc]" /> Prioridade máxima de resposta</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#c084fc]" /> Suporte direto e integração GitHub</li>
                </ul>
              </div>
              <button onClick={() => setShowLanding(false)} className="w-full py-2.5 bg-[#a855f7] hover:bg-[#9333ea] text-white font-medium rounded-xl transition-colors">
                Acessar Pro Studio
              </button>
            </div>
          </div>
        </section>

        <footer className="text-center text-xs text-[#52525b] py-6 border-t border-[#2a1249] z-10">
          © Build IA Studio. Todos os direitos reservados.
        </footer>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#110722] text-[#e3e3e3] font-sans antialiased overflow-hidden relative">
      {/* Glow de fundo mais vívido */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-gradient-to-tr from-[#6b21a8] via-[#3b0764] to-transparent opacity-45 blur-[150px] pointer-events-none rounded-full" />

      {/* Sidebar Lateral */}
      <aside className="w-16 bg-[#0c051a] flex flex-col justify-between p-3 select-none z-20 border-r border-[#2a1249]">
        <div className="flex flex-col items-center space-y-6 pt-4">
          <button 
            onClick={() => {
              setMessages([]);
              setActiveTab('chat');
            }}
            className="p-2.5 hover:bg-[#2a1249] rounded-full text-[#c4c7c5] transition-colors"
            title="Nova conversa"
          >
            <Plus className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setActiveTab(activeTab === 'search' ? 'chat' : 'search')}
            className={`p-2.5 rounded-full transition-colors ${activeTab === 'search' ? 'bg-[#2a1249] text-[#c084fc]' : 'text-[#c4c7c5] hover:bg-[#2a1249]'}`}
            title="Pesquisar conversas"
          >
            <Search className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setActiveTab(activeTab === 'explore' ? 'chat' : 'explore')}
            className={`p-2.5 rounded-full transition-colors ${activeTab === 'explore' ? 'bg-[#2a1249] text-[#c084fc]' : 'text-[#c4c7c5] hover:bg-[#2a1249]'}`}
            title="Explorar ideias"
          >
            <Compass className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setActiveTab(activeTab === 'apps' ? 'chat' : 'apps')}
            className={`p-2.5 rounded-full transition-colors ${activeTab === 'apps' ? 'bg-[#2a1249] text-[#c084fc] border border-[#a855f7]/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'text-[#c4c7c5] hover:bg-[#2a1249]'}`}
            title="Recursos e Ferramentas"
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button 
            onClick={() => setActiveTab(activeTab === 'settings' ? 'chat' : 'settings')}
            className={`p-2.5 rounded-full transition-colors ${activeTab === 'settings' ? 'bg-[#2a1249] text-[#c084fc]' : 'text-[#c4c7c5] hover:bg-[#2a1249]'}`}
            title="Configurações"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="w-7 h-7 rounded-full bg-[#2a1249] border border-[#a855f7]/50 flex items-center justify-center text-xs font-semibold text-[#c084fc]">
            B
          </div>
        </div>
      </aside>

      {/* Painel Lateral */}
      {activeTab !== 'chat' && (
        <div className="w-80 bg-[#170929] border-r border-[#2a1249] z-20 flex flex-col p-5 animate-in slide-in-from-left duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#2a1249]">
            <h2 className="text-base font-semibold text-[#f3e8ff] tracking-wide">
              {activeTab === 'search' && 'Pesquisar conversas'}
              {activeTab === 'explore' && 'Explorar ideias'}
              {activeTab === 'apps' && 'Recursos Da IA'}
              {activeTab === 'settings' && 'Configurações'}
            </h2>
            <button onClick={() => setActiveTab('chat')} className="p-1 hover:bg-[#2a1249] rounded-full text-[#c084fc] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {activeTab === 'apps' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-[#230d3d] rounded-xl border border-[#3b1768] shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Zap className="w-4 h-4 text-[#d8b4fe]" />
                    <p className="font-semibold text-sm text-[#f3e8ff]">Modelo Integrado</p>
                  </div>
                  <p className="text-xs text-[#c084fc] font-medium leading-relaxed">
                    Build IA 3.6 Flash ativo para respostas rápidas e geração de código em tempo real.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9333ea] px-1">Recursos Ativos</p>
                  
                  <div className="p-3 bg-[#1e0b38] rounded-lg border border-[#2a1249] flex items-start gap-2.5">
                    <Code2 className="w-4 h-4 text-[#c084fc] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-[#e9d5ff]">Geração de Código</p>
                      <p className="text-[11px] text-[#a78bfa] mt-0.5">Suporte para Next.js, React, Python, Tailwind CSS e SQL.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1e0b38] rounded-lg border border-[#2a1249] flex items-start gap-2.5">
                    <Bot className="w-4 h-4 text-[#c084fc] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-[#e9d5ff]">Processamento Multimodal</p>
                      <p className="text-[11px] text-[#a78bfa] mt-0.5">Análise rápida de instruções longas e prompts estruturados.</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1e0b38] rounded-lg border border-[#2a1249] flex items-start gap-2.5">
                    <Layers className="w-4 h-4 text-[#c084fc] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-[#e9d5ff]">Contexto Estendido</p>
                      <p className="text-[11px] text-[#a78bfa] mt-0.5">Memória contínua durante a sessão para conversas fluidas.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'search' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Buscar nas mensagens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1e0b38] border border-[#2a1249] rounded-lg px-3 py-2 text-sm text-[#e3e3e3] focus:outline-none focus:border-[#a855f7]"
                />
                <div className="space-y-2">
                  {messages.length === 0 ? (
                    <p className="text-xs text-[#a78bfa] text-center pt-4">Nenhuma conversa recente encontrada.</p>
                  ) : (
                    messages
                      .filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((m, i) => (
                        <div key={i} className="p-2.5 bg-[#1e0b38] rounded-lg border border-[#2a1249] text-xs text-[#e9d5ff] flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 shrink-0 text-[#c084fc] mt-0.5" />
                          <span className="truncate">{m.content}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'explore' && (
              <div className="space-y-3">
                <button 
                  onClick={() => { handleSubmit("Me ajude a programar uma página web em Next.js"); setActiveTab('chat'); }}
                  className="w-full p-3 bg-[#1e0b38] hover:bg-[#2a1249] rounded-xl text-left border border-[#2a1249] transition-colors"
                >
                  <p className="text-xs font-medium text-[#c084fc]">Programação</p>
                  <p className="text-xs text-[#a78bfa] mt-1">Como criar páginas web modernas</p>
                </button>

                <button 
                  onClick={() => { handleSubmit("Escreva uma história criativa sobre exploração espacial"); setActiveTab('chat'); }}
                  className="w-full p-3 bg-[#1e0b38] hover:bg-[#2a1249] rounded-xl text-left border border-[#2a1249] transition-colors"
                >
                  <p className="text-xs font-medium text-[#c084fc]">Escrita Criativa</p>
                  <p className="text-xs text-[#a78bfa] mt-1">Crie histórias e textos fictícios</p>
                </button>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 bg-[#1e0b38] rounded-lg border border-[#2a1249]">
                  <span className="text-[#e9d5ff]">Limpar conversa atual</span>
                  <button onClick={() => { setMessages([]); setActiveTab('chat'); }} className="p-1.5 bg-[#f43f5e]/20 text-[#f43f5e] hover:bg-[#f43f5e]/30 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => setShowLanding(true)}
                  className="w-full p-2 bg-[#2a1249] hover:bg-[#3b1768] text-[#c084fc] rounded text-center transition-colors font-medium"
                >
                  Voltar para Tela Inicial
                </button>
                <p className="text-[#a78bfa] px-1">Versão do sistema: Build IA 1.0.0</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Área Principal de Chat (Design Chamativo) */}
      <main className="flex-1 flex flex-col h-full relative z-10">
        <div className="flex-1 overflow-y-auto px-4 flex flex-col items-center justify-center">
          <div className="max-w-2xl w-full">
            {messages.length === 0 ? (
              <div className="text-center my-auto pb-8 flex flex-col items-center">
                {/* Ícone de Destaque Animado */}
                <div className="mb-6 p-4 bg-gradient-to-b from-[#2a1249] to-[#170929] rounded-2xl border border-[#a855f7]/40 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <Sparkles className="w-10 h-10 text-[#c084fc] animate-pulse" />
                </div>

                {/* Título Chamativo em Gradiente Neon */}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
                  Ative sempre que <br />
                  <span className="bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#e879f9] bg-clip-text text-transparent">
                    precisar criar.
                  </span>
                </h1>

                <p className="text-[#a78bfa] text-base max-w-md mt-2 mb-8">
                  O que você gostaria de construir ou perguntar para o <strong className="text-white">Build IA</strong> hoje?
                </p>

                {/* Sugestões Rápidas de Prompt */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
                  <button 
                    onClick={() => handleSubmit("Crie uma Landing Page moderna com Tailwind CSS")}
                    className="p-3.5 bg-[#170929]/80 hover:bg-[#230d3d] border border-[#2a1249] hover:border-[#a855f7]/60 rounded-xl text-left transition-all text-xs text-[#e9d5ff] flex items-center gap-2.5 group"
                  >
                    <Code2 className="w-4 h-4 text-[#c084fc] group-hover:scale-110 transition-transform" />
                    <span>Criar Landing Page em Next.js</span>
                  </button>

                  <button 
                    onClick={() => handleSubmit("Escreva uma função em Python para processar dados")}
                    className="p-3.5 bg-[#170929]/80 hover:bg-[#230d3d] border border-[#2a1249] hover:border-[#a855f7]/60 rounded-xl text-left transition-all text-xs text-[#e9d5ff] flex items-center gap-2.5 group"
                  >
                    <Terminal className="w-4 h-4 text-[#c084fc] group-hover:scale-110 transition-transform" />
                    <span>Gerar script em Python</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-24 w-full">
                {messages.map((msg, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    {msg.role === 'user' ? (
                      <div className="w-8 h-8 rounded-full bg-[#2a1249] flex items-center justify-center shrink-0 border border-[#3b1768]">
                        <User className="w-5 h-5 text-[#c084fc]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#170929] flex items-center justify-center shrink-0 border border-[#a855f7]/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                        <Sparkles className="w-5 h-5 text-[#c084fc]" />
                      </div>
                    )}
                    <div className="flex-1 pt-1 text-[#e3e3e3] leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-4 items-center">
                    <Sparkles className="w-5 h-5 text-[#c084fc] animate-spin" />
                    <span className="text-sm text-[#a78bfa]">Pensando...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-6 pb-12">
          <div className="max-w-2xl mx-auto relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="bg-[#170929]/90 backdrop-blur-md border border-[#2a1249] focus-within:border-[#a855f7] rounded-full flex items-center px-5 py-2.5 shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all"
            >
              <button 
                type="button" 
                onClick={() => { setMessages([]); setActiveTab('chat'); }}
                className="text-[#a78bfa] hover:text-[#e3e3e3] p-1.5 transition-colors"
                title="Nova conversa"
              >
                <Plus className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Peça ao Build IA"
                className="bg-transparent flex-1 focus:outline-none text-[#e3e3e3] placeholder-[#a78bfa] text-sm px-3"
              />

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#c084fc] font-medium px-2.5 py-1 bg-[#0c051a] rounded-md border border-[#2a1249]">
                  Flash
                </span>
                <button type="button" className="text-[#a78bfa] hover:text-[#e3e3e3] p-1.5 transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                {input.trim() && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="p-1.5 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-full transition-colors shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}