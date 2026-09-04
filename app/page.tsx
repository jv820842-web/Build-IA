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
  ArrowRight
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
    } finally {
      setLoading(false);
    }
  };

  // 1. TELA INICIAL (LANDING PAGE ROXA)
  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#08040d] text-[#e3e3e3] font-sans antialiased relative overflow-x-hidden flex flex-col justify-between p-6">
        {/* Luzes Roxas Neon de Fundo */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] opacity-25 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-[#6b21a8] opacity-20 blur-[160px] pointer-events-none rounded-full" />

        {/* Header da Landing */}
        <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-4 z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#9333ea]/20 border border-[#9333ea]/40 rounded-lg">
              <Cpu className="w-5 h-5 text-[#c084fc]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Build IA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#a1a1aa]">
            <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#precos" className="hover:text-white transition-colors">Preços</a>
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

        {/* Conteúdo Central Hero */}
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

          <p className="mt-6 text-lg text-[#a1a1aa] max-w-2xl leading-relaxed">
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

        <footer className="text-center text-xs text-[#52525b] py-4 z-10">
          © Build IA Studio. Todos os direitos reservados.
        </footer>
      </div>
    );
  }

  // 2. INTERFACE DO CHAT (SEM O ÍCONE DA PARTE SUPERIOR)
  return (
    <div className="flex h-screen bg-[#0d0714] text-[#e3e3e3] font-sans antialiased overflow-hidden relative">
      {/* Luz Radial Roxa no Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#581c87] via-[#2e1065] to-transparent opacity-35 blur-[140px] pointer-events-none rounded-full" />

      {/* Sidebar Lateral sem o botão do topo */}
      <aside className="w-16 bg-[#120a1c]/90 backdrop-blur-md flex flex-col justify-between p-3 select-none z-20 border-r border-[#261438]">
        <div className="flex flex-col items-center space-y-6 pt-4">
          <button 
            onClick={() => {
              setMessages([]);
              setActiveTab('chat');
            }}
            className="p-2.5 hover:bg-[#261438] rounded-full text-[#c4c7c5] transition-colors"
            title="Nova conversa"
          >
            <Plus className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setActiveTab(activeTab === 'search' ? 'chat' : 'search')}
            className={`p-2.5 rounded-full transition-colors ${activeTab === 'search' ? 'bg-[#261438] text-[#c084fc]' : 'text-[#c4c7c5] hover:bg-[#261438]'}`}
            title="Pesquisar conversas"
          >
            <Search className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setActiveTab(activeTab === 'explore' ? 'chat' : 'explore')}
            className={`p-2.5 rounded-full transition-colors ${activeTab === 'explore' ? 'bg-[#261438] text-[#c084fc]' : 'text-[#c4c7c5] hover:bg-[#261438]'}`}
            title="Explorar ideias"
          >
            <Compass className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setActiveTab(activeTab === 'apps' ? 'chat' : 'apps')}
            className={`p-2.5 rounded-full transition-colors ${activeTab === 'apps' ? 'bg-[#261438] text-[#c084fc]' : 'text-[#c4c7c5] hover:bg-[#261438]'}`}
            title="Recursos e Ferramentas"
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button 
            onClick={() => setActiveTab(activeTab === 'settings' ? 'chat' : 'settings')}
            className={`p-2.5 rounded-full transition-colors ${activeTab === 'settings' ? 'bg-[#261438] text-[#c084fc]' : 'text-[#c4c7c5] hover:bg-[#261438]'}`}
            title="Configurações"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="w-7 h-7 rounded-full bg-[#261438] border border-[#581c87] flex items-center justify-center text-xs font-semibold text-[#c084fc]">
            B
          </div>
        </div>
      </aside>

      {/* Painel Lateral / Modais */}
      {activeTab !== 'chat' && (
        <div className="w-80 bg-[#170c24]/95 backdrop-blur-md border-r border-[#261438] z-20 flex flex-col p-4 animate-in slide-in-from-left duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#261438]">
            <h2 className="text-base font-medium text-[#e3e3e3] capitalize">
              {activeTab === 'search' && 'Pesquisar conversas'}
              {activeTab === 'explore' && 'Explorar ideias'}
              {activeTab === 'apps' && 'Recursos da IA'}
              {activeTab === 'settings' && 'Configurações'}
            </h2>
            <button onClick={() => setActiveTab('chat')} className="p-1 hover:bg-[#261438] rounded-full text-[#a1a1aa]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {activeTab === 'search' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Buscar nas mensagens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0d0714] border border-[#261438] rounded-lg px-3 py-2 text-sm text-[#e3e3e3] focus:outline-none"
                />
                <div className="space-y-2">
                  {messages.length === 0 ? (
                    <p className="text-xs text-[#a1a1aa] text-center pt-4">Nenhuma conversa recente encontrada.</p>
                  ) : (
                    messages
                      .filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((m, i) => (
                        <div key={i} className="p-2.5 bg-[#0d0714] rounded-lg border border-[#261438] text-xs text-[#c4c7c5] flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 shrink-0 text-[#a1a1aa] mt-0.5" />
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
                  className="w-full p-3 bg-[#0d0714] hover:bg-[#261438] rounded-xl text-left border border-[#261438] transition-colors"
                >
                  <p className="text-xs font-medium text-[#c084fc]">Programação</p>
                  <p className="text-xs text-[#c4c7c5] mt-1">Como criar páginas web modernas</p>
                </button>

                <button 
                  onClick={() => { handleSubmit("Escreva uma história criativa sobre exploração espacial"); setActiveTab('chat'); }}
                  className="w-full p-3 bg-[#0d0714] hover:bg-[#261438] rounded-xl text-left border border-[#261438] transition-colors"
                >
                  <p className="text-xs font-medium text-[#c084fc]">Escrita Criativa</p>
                  <p className="text-xs text-[#c4c7c5] mt-1">Crie histórias e textos fictícios</p>
                </button>
              </div>
            )}

            {activeTab === 'apps' && (
              <div className="space-y-2 text-xs text-[#c4c7c5]">
                <div className="p-3 bg-[#0d0714] rounded-lg border border-[#261438]">
                  <p className="font-medium text-[#e3e3e3]">Modelo Integrado</p>
                  <p className="text-[#a1a1aa] mt-1">Gemini 3.6 Flash ativo para respostas rápidas.</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 bg-[#0d0714] rounded-lg border border-[#261438]">
                  <span>Limpar conversa atual</span>
                  <button onClick={() => { setMessages([]); setActiveTab('chat'); }} className="p-1.5 bg-[#f43f5e]/20 text-[#f43f5e] hover:bg-[#f43f5e]/30 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => setShowLanding(true)}
                  className="w-full p-2 bg-[#261438] hover:bg-[#3b1a58] text-[#c084fc] rounded text-center transition-colors"
                >
                  Voltar para Tela Inicial
                </button>
                <p className="text-[#a1a1aa] px-1">Versão do sistema: Build IA 1.0.0</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Área Principal de Chat */}
      <main className="flex-1 flex flex-col h-full relative z-10">
        <div className="flex-1 overflow-y-auto px-4 flex flex-col items-center justify-center">
          <div className="max-w-2xl w-full">
            {messages.length === 0 ? (
              <div className="text-center my-auto pb-12">
                <h1 className="text-4xl font-normal text-[#e3e3e3] tracking-wide">
                  Ative sempre que precisar
                </h1>
              </div>
            ) : (
              <div className="space-y-6 pb-24 w-full">
                {messages.map((msg, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    {msg.role === 'user' ? (
                      <div className="w-8 h-8 rounded-full bg-[#261438] flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-[#c4c7c5]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#170c24] flex items-center justify-center shrink-0 border border-[#3b1a58]">
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
                    <span className="text-sm text-[#a1a1aa]">Pensando...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Bar Estilo Gemini Roxo */}
        <div className="p-6 pb-12">
          <div className="max-w-2xl mx-auto relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="bg-[#170c24]/90 backdrop-blur-md border border-[#261438] focus-within:border-[#581c87] rounded-full flex items-center px-5 py-2.5 shadow-2xl transition-all"
            >
              <button 
                type="button" 
                onClick={() => { setMessages([]); setActiveTab('chat'); }}
                className="text-[#a1a1aa] hover:text-[#e3e3e3] p-1.5 transition-colors"
                title="Nova conversa"
              >
                <Plus className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Peça ao Build IA"
                className="bg-transparent flex-1 focus:outline-none text-[#e3e3e3] placeholder-[#a1a1aa] text-sm px-3"
              />

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#c084fc] font-medium px-2 py-1 bg-[#0d0714] rounded-md border border-[#261438]">
                  Flash
                </span>
                <button type="button" className="text-[#a1a1aa] hover:text-[#e3e3e3] p-1.5 transition-colors">
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