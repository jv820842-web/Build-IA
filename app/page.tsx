'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Plus, 
  Mic,
  Cpu,
  ArrowRight,
  Zap,
  Code2,
  Layers,
  CheckCircle2,
  Terminal,
  ChevronDown
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#07020d] text-[#e3e3e3] font-sans antialiased relative overflow-x-hidden flex flex-col justify-between p-6">
        {/* Glow Mesh Gradient Vibrante Roxo & Magenta Neon */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-gradient-to-tr from-[#d946ef] via-[#8b5cf6] to-[#3b82f6] opacity-40 blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#6366f1] opacity-35 blur-[170px] pointer-events-none rounded-full" />

        {/* Header no topo inspirado no modelo Lovable */}
        <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-4 z-20 sticky top-0 bg-[#07020d]/70 backdrop-blur-md px-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-8">
            {/* Logo Build IA */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setShowLanding(true)}>
              <div className="p-2 bg-gradient-to-tr from-[#d946ef] to-[#8b5cf6] rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">Build IA</span>
            </div>

            {/* Menu Principal com Menus Dropdown */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#d8b4fe]">
              <button onClick={() => scrollToSection('recursos')} className="hover:text-white transition-colors flex items-center gap-1">
                Soluções <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
              <button onClick={() => scrollToSection('recursos')} className="hover:text-white transition-colors flex items-center gap-1">
                Recursos <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
              <button onClick={() => scrollToSection('como-funciona')} className="hover:text-white transition-colors">
                Comunidade
              </button>
              <button onClick={() => scrollToSection('como-funciona')} className="hover:text-white transition-colors">
                Empresas
              </button>
              <button onClick={() => scrollToSection('precos')} className="hover:text-white transition-colors">
                Preços
              </button>
              <button onClick={() => scrollToSection('recursos')} className="hover:text-white transition-colors">
                Segurança
              </button>
            </nav>
          </div>

          {/* Botões Entrar / Começar */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowLanding(false)}
              className="text-sm font-medium text-[#e4e4e7] hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              Entrar
            </button>
            <button 
              onClick={() => setShowLanding(false)}
              className="bg-white hover:bg-zinc-100 text-[#07020d] text-sm font-semibold px-5 py-2 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105"
            >
              Começar
            </button>
          </div>
        </header>

        {/* Hero Section Central com Cor Roxa Neon Vibrante */}
        <main className="max-w-4xl mx-auto w-full text-center my-auto py-20 z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d946ef]/15 border border-[#d946ef]/40 text-[#f0abfc] text-xs font-semibold uppercase tracking-wider mb-8 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f0abfc]" />
            <span>TRANSFORME IDEIAS EM SOFTWARE EM MINUTOS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Crie algo com a <br />
            <span className="bg-gradient-to-r from-[#f0abfc] via-[#d946ef] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(217,70,239,0.4)]">
              Build IA
            </span>
          </h1>

          <p className="mt-6 text-lg text-[#d8b4fe] max-w-2xl leading-relaxed font-normal">
            Crie apps e sites conversando com a IA. O Build IA gera código, lógica e interfaces completas em segundos.
          </p>

          <button 
            onClick={() => setShowLanding(false)}
            className="mt-10 bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#7c3aed] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-2xl shadow-[0_0_35px_rgba(217,70,239,0.6)] flex items-center gap-2.5 text-base transition-all transform hover:scale-105"
          >
            <span>Começar a criar agora</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </main>

        {/* Seção Recursos */}
        <section id="recursos" className="max-w-5xl mx-auto w-full py-20 border-t border-white/10 z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Recursos do Build IA</h2>
            <p className="text-[#d8b4fe] mt-2">Tudo o que você precisa para sair da ideia para a produção.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#120724]/80 backdrop-blur-md rounded-2xl border border-[#3b1768]">
              <Code2 className="w-8 h-8 text-[#f0abfc] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Geração de Código Clean</h3>
              <p className="text-sm text-[#d8b4fe]">Código otimizado em Next.js, React e TypeScript com boas práticas integradas.</p>
            </div>
            <div className="p-6 bg-[#120724]/80 backdrop-blur-md rounded-2xl border border-[#3b1768]">
              <Zap className="w-8 h-8 text-[#f0abfc] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Respostas Ultrarrápidas</h3>
              <p className="text-sm text-[#d8b4fe]">Motor Build IA 3.6 Flash projetado para baixíssima latência na criação.</p>
            </div>
            <div className="p-6 bg-[#120724]/80 backdrop-blur-md rounded-2xl border border-[#3b1768]">
              <Layers className="w-8 h-8 text-[#f0abfc] mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Interfaces Reativas</h3>
              <p className="text-sm text-[#d8b4fe]">Componentes UI elegantes, responsivos e prontos para publicar na nuvem.</p>
            </div>
          </div>
        </section>

        {/* Seção Como Funciona */}
        <section id="como-funciona" className="max-w-5xl mx-auto w-full py-20 border-t border-white/10 z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Como Funciona</h2>
            <p className="text-[#d8b4fe] mt-2">Construa em apenas 3 passos simples.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2a1249] text-[#f0abfc] font-bold flex items-center justify-center mb-4 border border-[#d946ef]">1</div>
              <h3 className="font-semibold text-white mb-1">Descreva seu Projeto</h3>
              <p className="text-sm text-[#d8b4fe]">Digite o que você quer construir em português simples.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2a1249] text-[#f0abfc] font-bold flex items-center justify-center mb-4 border border-[#d946ef]">2</div>
              <h3 className="font-semibold text-white mb-1">Processamento IA</h3>
              <p className="text-sm text-[#d8b4fe]">A IA estrutura as telas, lógica e componentes da aplicação.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#2a1249] text-[#f0abfc] font-bold flex items-center justify-center mb-4 border border-[#d946ef]">3</div>
              <h3 className="font-semibold text-white mb-1">Publique com 1 Clique</h3>
              <p className="text-sm text-[#d8b4fe]">Exporte seu código ou coloque no ar via Vercel instantaneamente.</p>
            </div>
          </div>
        </section>

        {/* Seção Preços */}
        <section id="precos" className="max-w-5xl mx-auto w-full py-20 border-t border-white/10 z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Planos e Preços</h2>
            <p className="text-[#d8b4fe] mt-2">Escolha o plano ideal para suas necessidades.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="p-8 bg-[#120724]/90 rounded-2xl border border-[#3b1768] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Starter</h3>
                <p className="text-3xl font-extrabold text-[#f0abfc] my-4">Grátis</p>
                <ul className="space-y-3 text-sm text-[#d8b4fe] mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Acesso ao Build IA 3.6 Flash</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Conversas e projetos ilimitados</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Exportação de código</li>
                </ul>
              </div>
              <button onClick={() => setShowLanding(false)} className="w-full py-3 bg-[#2a1249] hover:bg-[#3b1768] text-white font-medium rounded-xl transition-colors">
                Acessar Agora
              </button>
            </div>

            <div className="p-8 bg-[#1f0938]/90 rounded-2xl border border-[#d946ef] relative shadow-[0_0_30px_rgba(217,70,239,0.3)] flex flex-col justify-between">
              <span className="absolute -top-3 right-6 bg-[#d946ef] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
              <div>
                <h3 className="text-xl font-bold text-white">Pro Studio</h3>
                <p className="text-3xl font-extrabold text-[#f0abfc] my-4">$ 5,99 <span className="text-sm font-normal text-[#d8b4fe]">/mês</span></p>
                <ul className="space-y-3 text-sm text-[#d8b4fe] mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Recursos do plano Starter</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Prioridade máxima de resposta</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Suporte direto e integração GitHub</li>
                </ul>
              </div>
              <button onClick={() => setShowLanding(false)} className="w-full py-3 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] hover:opacity-90 text-white font-medium rounded-xl transition-colors">
                Acessar Pro Studio
              </button>
            </div>
          </div>
        </section>

        <footer className="text-center text-xs text-[#a78bfa]/60 py-6 border-t border-white/5 z-10">
          © Build IA Studio. Todos os direitos reservados.
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#07020d] text-[#e3e3e3] font-sans antialiased overflow-hidden relative">
      {/* Glow Mesh Gradient Vibrante Roxo & Pink Neon no Chat */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-tr from-[#d946ef] via-[#8b5cf6] to-[#ec4899] opacity-35 blur-[170px] pointer-events-none rounded-full" />

      {/* Header Superior Sem Sidebar Lateral */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4 z-20 border-b border-white/10 bg-[#07020d]/80 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setShowLanding(true)}>
            <div className="p-2 bg-gradient-to-tr from-[#d946ef] to-[#8b5cf6] rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.5)]">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">Build IA</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#d8b4fe]">
            <button onClick={() => setShowLanding(true)} className="hover:text-white transition-colors flex items-center gap-1">
              Soluções <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            <button onClick={() => setShowLanding(true)} className="hover:text-white transition-colors flex items-center gap-1">
              Recursos <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            <button onClick={() => setShowLanding(true)} className="hover:text-white transition-colors">
              Comunidade
            </button>
            <button onClick={() => setShowLanding(true)} className="hover:text-white transition-colors">
              Empresas
            </button>
            <button onClick={() => setShowLanding(true)} className="hover:text-white transition-colors">
              Preços
            </button>
            <button onClick={() => setShowLanding(true)} className="hover:text-white transition-colors">
              Segurança
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMessages([])} 
            className="text-xs font-medium text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
          >
            Nova conversa
          </button>
          <button 
            onClick={() => setShowLanding(true)}
            className="bg-white hover:bg-zinc-100 text-[#07020d] text-xs font-semibold px-4 py-1.5 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Área Principal do Chat */}
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 flex flex-col items-center justify-center">
          <div className="max-w-3xl w-full">
            {messages.length === 0 ? (
              <div className="text-center my-auto pb-8 flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3">
                  Crie algo com a <br />
                  <span className="bg-gradient-to-r from-[#f0abfc] via-[#d946ef] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(217,70,239,0.5)]">
                    Build IA
                  </span>
                </h1>

                <p className="text-[#d8b4fe] text-base max-w-md mt-2 mb-10">
                  Crie apps e sites conversando com a IA
                </p>

                {/* Caixa de Input central inspirada na tela da imagem */}
                <div className="w-full max-w-xl mx-auto">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="bg-[#15092a]/90 backdrop-blur-xl border border-[#d946ef]/50 focus-within:border-[#f0abfc] rounded-2xl flex items-center px-4 py-3 shadow-[0_0_35px_rgba(217,70,239,0.25)] transition-all"
                  >
                    <button 
                      type="button" 
                      onClick={() => setMessages([])}
                      className="text-[#d8b4fe] hover:text-white p-1.5 transition-colors"
                      title="Nova conversa"
                    >
                      <Plus className="w-5 h-5" />
                    </button>

                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Peça à Build IA para criar um aplicativo web que..."
                      className="bg-transparent flex-1 focus:outline-none text-[#e3e3e3] placeholder-[#a78bfa]/70 text-sm px-3"
                    />

                    <div className="flex items-center gap-2">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] hover:opacity-90 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(217,70,239,0.4)]"
                      >
                        <span>Construir</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      <button type="button" className="text-[#d8b4fe] hover:text-white p-1.5 transition-colors">
                        <Mic className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Atalhos Rápidos de Sugestões */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl mt-6">
                  <button 
                    onClick={() => handleSubmit("Crie uma Landing Page moderna com Tailwind CSS")}
                    className="p-3.5 bg-[#120724]/70 hover:bg-[#1f0938] border border-white/10 hover:border-[#d946ef]/60 rounded-xl text-left transition-all text-xs text-[#f0abfc] flex items-center gap-2.5 shadow-sm"
                  >
                    <Code2 className="w-4 h-4 text-[#f0abfc]" />
                    <span>Criar Landing Page em Next.js</span>
                  </button>

                  <button 
                    onClick={() => handleSubmit("Escreva uma função em Python para processar dados")}
                    className="p-3.5 bg-[#120724]/70 hover:bg-[#1f0938] border border-white/10 hover:border-[#d946ef]/60 rounded-xl text-left transition-all text-xs text-[#f0abfc] flex items-center gap-2.5 shadow-sm"
                  >
                    <Terminal className="w-4 h-4 text-[#f0abfc]" />
                    <span>Gerar script em Python</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-8 w-full">
                {messages.map((msg, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    {msg.role === 'user' ? (
                      <div className="w-8 h-8 rounded-full bg-[#2a1249] flex items-center justify-center shrink-0 border border-[#d946ef]/40">
                        <User className="w-5 h-5 text-[#f0abfc]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d946ef] to-[#8b5cf6] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(217,70,239,0.5)]">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex-1 pt-1 text-[#e3e3e3] leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-4 items-center">
                    <Sparkles className="w-5 h-5 text-[#f0abfc] animate-spin" />
                    <span className="text-sm text-[#d8b4fe]">Construindo sua aplicação...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Inferior quando há conversas ativas */}
        {messages.length > 0 && (
          <div className="p-6 pb-8">
            <div className="max-w-2xl mx-auto relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="bg-[#15092a]/95 backdrop-blur-md border border-[#d946ef]/50 focus-within:border-[#f0abfc] rounded-full flex items-center px-5 py-2.5 shadow-[0_0_25px_rgba(217,70,239,0.3)] transition-all"
              >
                <button 
                  type="button" 
                  onClick={() => setMessages([])}
                  className="text-[#d8b4fe] hover:text-white p-1.5 transition-colors"
                  title="Nova conversa"
                >
                  <Plus className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Peça à Build IA para continuar construindo..."
                  className="bg-transparent flex-1 focus:outline-none text-[#e3e3e3] placeholder-[#a78bfa]/70 text-sm px-3"
                />

                <div className="flex items-center gap-2">
                  <button type="button" className="text-[#d8b4fe] hover:text-white p-1.5 transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                  {input.trim() && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="p-2 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] text-white rounded-full transition-colors shadow-[0_0_12px_rgba(217,70,239,0.5)]"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}