'use client';

import { useState, useEffect } from 'react';
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
  X,
  CreditCard,
  RotateCcw,
  BookOpen,
  Lightbulb,
  Info,
  Globe,
  Rocket,
  ShieldCheck,
  Loader2,
  Crown,
  Download,
  Sliders,
  GitBranch,
  Headphones,
  LogOut
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  
  // Modais
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showProFeaturesModal, setShowProFeaturesModal] = useState(false);

  // Estado do Plano
  const [isPro, setIsPro] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Build IA 3.6 Flash');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      if (query.get('success') === 'true') {
        setIsPro(true);
        setSelectedModel('Build IA Pro 4.0 Turbo');
        alert('🎉 Parabéns! Sua assinatura do Plano Pro Studio foi ativada com sucesso!');
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

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
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          isPro: isPro,
          model: selectedModel 
        }),
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

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Erro ao redirecionar para o pagamento.');
      }
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao processar o pagamento.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07020d] text-[#e3e3e3] font-sans antialiased relative overflow-x-hidden flex flex-col justify-between">
      {/* Background Mesh Gradient */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[650px] bg-gradient-to-tr from-[#d946ef] via-[#8b5cf6] to-[#3b82f6] opacity-35 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#6366f1] opacity-30 blur-[170px] pointer-events-none rounded-full" />

      {/* MODAL PLANOS E PREÇOS */}
      {showPricingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#120724] border border-[#d946ef]/40 rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_60px_rgba(217,70,239,0.35)]">
            <button 
              onClick={() => setShowPricingModal(false)}
              className="absolute top-5 right-5 p-2 text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d946ef]/20 border border-[#d946ef]/40 text-[#f0abfc] text-xs font-semibold uppercase mb-3">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Escolha o plano ideal</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Desbloqueie todo o poder da IA</h2>
              <p className="text-[#d8b4fe] text-sm mt-2 max-w-md mx-auto">
                Evolua da versão gratuita para a versão Pro Studio e crie projetos sem limites de velocidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              {/* Plano Gratuito */}
              <div className="bg-[#180b30]/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Gratuito Starter</h3>
                  <p className="text-xs text-[#d8b4fe] mb-4">Ideal para pequenos testes e uso casual</p>
                  <div className="text-3xl font-black text-white mb-6">R$ 0 <span className="text-xs font-normal text-[#d8b4fe]">/mês</span></div>

                  <ul className="space-y-3 text-xs text-[#e3e3e3] mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#d946ef]" />
                      <span>Modelo Padrão Build IA 3.6 Flash</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#d946ef]" />
                      <span>Limite diário de requisições</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#d946ef]" />
                      <span>Geração de telas e scripts simples</span>
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={() => setShowPricingModal(false)}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors border border-white/10"
                >
                  Plano Atual
                </button>
              </div>

              {/* Plano PRO */}
              <div className="bg-gradient-to-b from-[#250d43] to-[#16072b] border-2 border-[#d946ef] rounded-2xl p-6 flex flex-col justify-between relative shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Recomendado
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    Pro Studio
                    <Crown className="w-4 h-4 text-amber-400" />
                  </h3>
                  <p className="text-xs text-[#d8b4fe] mb-4">Para criadores, desenvolvedores e empresas</p>
                  <div className="text-3xl font-black text-white mb-6">R$ 49 <span className="text-xs font-normal text-[#d8b4fe]">/mês</span></div>

                  <ul className="space-y-3 text-xs text-[#e3e3e3] mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#f0abfc]" />
                      <span className="font-semibold text-white">Acesso ao Build IA Pro 4.0 & Claude 3.5</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#f0abfc]" />
                      <span>Geração de código sem restrições</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#f0abfc]" />
                      <span>Exportação completa em .ZIP e GitHub</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#f0abfc]" />
                      <span>Suporte VIP prioritário</span>
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full py-3 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(217,70,239,0.5)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {checkoutLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Assinar Pro Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RECURSOS PRO */}
      {showProFeaturesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#120724] border border-[#d946ef]/60 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative shadow-[0_0_60px_rgba(217,70,239,0.4)]">
            <button 
              onClick={() => setShowProFeaturesModal(false)}
              className="absolute top-5 right-5 p-2 text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d946ef]/20 border border-[#d946ef]/40 text-[#f0abfc] text-xs font-semibold uppercase mb-3">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Painel Pro Studio Exclusivo</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Seus Recursos Premium Ativos</h2>
              <p className="text-[#d8b4fe] text-xs mt-1">Aproveite ao máximo a IA com privilégios de assinante Pro.</p>
            </div>

            <div className="space-y-4 my-6">
              <div className="p-4 bg-[#1a0a33] border border-[#d946ef]/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sliders className="w-5 h-5 text-[#f0abfc]" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Modelo de IA Selecionado</h4>
                    <p className="text-[11px] text-[#d8b4fe]">Alterne entre os motores de inteligência disponíveis</p>
                  </div>
                </div>
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-[#2a1249] text-white text-xs border border-[#d946ef]/40 rounded-xl px-3 py-2 outline-none cursor-pointer"
                >
                  <option value="Build IA Pro 4.0 Turbo">Build IA Pro 4.0 Turbo</option>
                  <option value="Claude 3.5 Sonnet Integration">Claude 3.5 Sonnet Integration</option>
                  <option value="Build IA 3.6 Flash">Build IA 3.6 Flash (Padrão)</option>
                </select>
              </div>

              <div className="p-4 bg-[#1a0a33] border border-[#d946ef]/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-[#f0abfc]" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Exportação Completa de Projetos</h4>
                    <p className="text-[11px] text-[#d8b4fe]">Baixe o código-fonte em .ZIP ou suba no GitHub em 1 clique</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Download do projeto gerado iniciado em .ZIP')}
                  className="bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Exportar</span>
                </button>
              </div>

              <div className="p-4 bg-[#1a0a33] border border-[#d946ef]/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Headphones className="w-5 h-5 text-[#f0abfc]" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Suporte Prioritário VIP</h4>
                    <p className="text-[11px] text-[#d8b4fe]">Atendimento exclusivo com resposta rápida</p>
                  </div>
                </div>
                <a 
                  href="mailto:suporte@buildia.com"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-white/10"
                >
                  Contato VIP
                </a>
              </div>
            </div>

            <button 
              onClick={() => setShowProFeaturesModal(false)}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Fechar Painel Pro
            </button>
          </div>
        </div>
      )}

      {/* MODAL SOBRE */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#120724] border border-[#d946ef]/40 rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto relative shadow-[0_0_60px_rgba(217,70,239,0.35)]">
            <button 
              onClick={() => setShowAboutModal(false)}
              className="absolute top-5 right-5 p-2 text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d946ef]/20 border border-[#d946ef]/40 text-[#f0abfc] text-xs font-semibold uppercase mb-3">
                <Info className="w-3.5 h-3.5" />
                <span>Tudo sobre a Plataforma</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">O que é o Build IA?</h2>
              <p className="text-[#d8b4fe] text-sm mt-2 max-w-xl mx-auto">
                Sua suíte completa alimentada por inteligência artificial para transformar conceitos e prompts em softwares e aplicativos funcionais.
              </p>
            </div>

            <div className="mb-8 p-5 bg-[#1a0a33] border border-[#d946ef]/30 rounded-2xl">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#f0abfc]" />
                Para que ele serve?
              </h3>
              <p className="text-xs md:text-sm text-[#d8b4fe] leading-relaxed">
                O Build IA foi projetado para acelerar o desenvolvimento de software. Com ele, você pode criar telas, sites completos, componentes de interface, scripts de automação e resolver problemas complexos de código usando linguagem natural.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-white/10">
              <button 
                onClick={() => setShowAboutModal(false)}
                className="w-full sm:w-1/2 py-3 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)] flex items-center justify-center gap-2"
              >
                <span>Experimentar Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => {
                  setShowAboutModal(false);
                  setShowPricingModal(true);
                }}
                className="w-full sm:w-1/2 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors border border-white/10"
              >
                Ver Planos Disponíveis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Superior */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4 z-20 sticky top-0 bg-[#07020d]/80 backdrop-blur-md border-b border-white/5">
        <div 
          className="flex items-center gap-2.5 cursor-pointer" 
          onClick={() => setMessages([])}
        >
          <div className="p-2 bg-gradient-to-tr from-[#d946ef] to-[#8b5cf6] rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.5)]">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-white">Build IA</span>
            {isPro && (
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                <Crown className="w-3 h-3 fill-black" /> PRO
              </span>
            )}
          </div>
        </div>

        {/* Botões Centrais */}
        <div className="hidden md:flex items-center gap-2">
          <button 
            onClick={() => setShowAboutModal(true)}
            className="flex items-center gap-1.5 text-xs text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition-colors border border-white/10"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#f0abfc]" />
            <span>Recursos</span>
          </button>

          <button 
            onClick={() => setInput("Crie uma Dashboard financeira interativa com gráficos")}
            className="flex items-center gap-1.5 text-xs text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition-colors border border-white/10"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#f0abfc]" />
            <span>Exemplos</span>
          </button>
        </div>

        {/* Botões Lado Direito */}
        <div className="flex items-center gap-3">
          {/* BOTÃO SAIR: SÓ EXIBIDO DURANTE O CHAT */}
          {messages.length > 0 && (
            <button 
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              title="Sair da conversa"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          )}

          {isPro ? (
            <button 
              onClick={() => setShowProFeaturesModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/50 hover:border-amber-400 text-amber-300 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Recursos Pro</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowPricingModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#d946ef]/20 to-[#8b5cf6]/20 border border-[#d946ef]/50 hover:border-[#f0abfc] text-[#f0abfc] hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-[0_0_15px_rgba(217,70,239,0.2)]"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Planos</span>
            </button>
          )}

          <button 
            onClick={() => setMessages([])}
            className="flex items-center gap-1.5 text-xs text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl transition-colors border border-white/10"
            title="Limpar conversa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        </div>
      </header>

      {/* Conteúdo Central */}
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

                <p className="text-[#d8b4fe] text-base max-w-md mt-2 mb-6">
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
                        disabled={loading || !input.trim()}
                        className="bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] hover:opacity-90 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(217,70,239,0.4)] cursor-pointer disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                        <span>Construir</span>
                      </button>
                    </div>
                  </form>
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d946ef] to-[#8b5cf6] flex items-center justify-center shrink-0">
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
      </main>
    </div>
  );
}