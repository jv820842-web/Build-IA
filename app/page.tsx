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
  X,
  CreditCard,
  RotateCcw
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
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');

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

  return (
    <div className="min-h-screen bg-[#07020d] text-[#e3e3e3] font-sans antialiased relative overflow-x-hidden flex flex-col justify-between">
      {/* Background Mesh Gradient */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-gradient-to-tr from-[#d946ef] via-[#8b5cf6] to-[#3b82f6] opacity-35 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#6366f1] opacity-30 blur-[170px] pointer-events-none rounded-full" />

      {/* Modal de Planos */}
      {showPricingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#120724] border border-[#d946ef]/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative shadow-[0_0_50px_rgba(217,70,239,0.3)]">
            <button 
              onClick={() => setShowPricingModal(false)}
              className="absolute top-5 right-5 p-2 text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d946ef]/20 border border-[#d946ef]/40 text-[#f0abfc] text-xs font-semibold uppercase mb-3">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Escolha seu Plano</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">Planos Build IA</h2>
              <p className="text-[#d8b4fe] text-sm mt-1">Acesse todo o potencial da inteligência artificial.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Plano Starter */}
              <div 
                onClick={() => setSelectedPlan('free')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  selectedPlan === 'free' 
                    ? 'bg-[#1a0a33] border-[#f0abfc] shadow-[0_0_20px_rgba(240,171,252,0.2)]' 
                    : 'bg-[#0f051e] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">Starter</h3>
                    {selectedPlan === 'free' && <span className="text-[10px] bg-[#f0abfc]/20 text-[#f0abfc] px-2.5 py-0.5 rounded-full border border-[#f0abfc]/40">Ativo</span>}
                  </div>
                  <p className="text-2xl font-extrabold text-[#f0abfc] my-3">Grátis</p>
                  <ul className="space-y-2.5 text-xs text-[#d8b4fe] mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Modelo Build IA 3.6 Flash</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Conversas e projetos ilimitados</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Exportação de código</li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    setSelectedPlan('free');
                    setShowPricingModal(false);
                    setShowLanding(false);
                  }}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Usar Plano Grátis
                </button>
              </div>

              {/* Plano Pro Studio */}
              <div 
                onClick={() => setSelectedPlan('pro')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                  selectedPlan === 'pro' 
                    ? 'bg-[#230944] border-[#d946ef] shadow-[0_0_25px_rgba(217,70,239,0.4)]' 
                    : 'bg-[#17062d] border-[#d946ef]/50 hover:border-[#d946ef]'
                }`}
              >
                <span className="absolute -top-3 right-6 bg-[#d946ef] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">Recomendado</span>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">Pro Studio</h3>
                  </div>
                  <p className="text-2xl font-extrabold text-[#f0abfc] my-3">$ 5,99 <span className="text-xs font-normal text-[#d8b4fe]">/mês</span></p>
                  <ul className="space-y-2.5 text-xs text-[#d8b4fe] mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Todos os recursos do Starter</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Velocidade e prioridade máxima</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Suporte direto e integração GitHub</li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    setSelectedPlan('pro');
                    setShowPricingModal(false);
                    setShowLanding(false);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] hover:opacity-90 text-white text-xs font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(217,70,239,0.4)]"
                >
                  Acessar Pro Studio ($ 5,99)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Superior Limpo com Botão Planos */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4 z-20 sticky top-0 bg-[#07020d]/80 backdrop-blur-md border-b border-white/5">
        <div 
          className="flex items-center gap-2.5 cursor-pointer" 
          onClick={() => setShowLanding(true)}
        >
          <div className="p-2 bg-gradient-to-tr from-[#d946ef] to-[#8b5cf6] rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.5)]">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">Build IA</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPricingModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d946ef]/20 to-[#8b5cf6]/20 border border-[#d946ef]/50 hover:border-[#f0abfc] text-[#f0abfc] hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-[0_0_15px_rgba(217,70,239,0.2)]"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Planos</span>
          </button>

          {!showLanding && (
            <button 
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 text-xs text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition-colors border border-white/10"
              title="Nova conversa"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          )}
        </div>
      </header>

      {/* Conteúdo Principal */}
      {showLanding ? (
        <div className="flex-1 flex flex-col justify-between">
          <main className="max-w-4xl mx-auto w-full text-center my-auto py-20 px-6 z-10 flex flex-col items-center">
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

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => setShowLanding(false)}
                className="bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#7c3aed] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-2xl shadow-[0_0_35px_rgba(217,70,239,0.6)] flex items-center gap-2.5 text-base transition-all transform hover:scale-105"
              >
                <span>Começar a criar agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setShowPricingModal(true)}
                className="bg-white/5 hover:bg-white/10 text-[#d8b4fe] border border-white/10 px-6 py-4 rounded-2xl text-base font-medium transition-all"
              >
                Ver Planos ($ 5,99)
              </button>
            </div>
          </main>

          <section className="max-w-5xl mx-auto w-full py-16 px-6 border-t border-white/10 z-10">
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

          <footer className="text-center text-xs text-[#a78bfa]/60 py-6 border-t border-white/5 z-10">
            © Build IA Studio. Todos os direitos reservados.
          </footer>
        </div>
      ) : (
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
                        </button>

                        <button type="button" className="text-[#d8b4fe] hover:text-white p-1.5 transition-colors">
                          <Mic className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </div>

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
      )}
    </div>
  );
}