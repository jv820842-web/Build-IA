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
  Github,
  Headphones,
  LogOut
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

      {/* MODAL PRO */}
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
                  <Github className="w-3.5 h-3.5" />
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

      {/* Modal Sobre */}
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

            <div className="mb-8">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#f0abfc]" />
                O que você pode construir?
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-4 bg-[#1f0938] border border-white/5 rounded-xl">
                  <h4 className="text-xs font-bold text-white mb-1">💻 Landing Pages e Portfólios</h4>
                  <p className="text-[11px] text-[#d8b4fe]">Páginas modernas, responsivas e prontas para publicação.</p>
                </div>
                <div className="p-4 bg-[#1f0938] border border-white/5 rounded-xl">
                  <h4 className="text-xs font-bold text-white mb-1">📊 Dashboards & Apps Web</h4>
                  <p className="text-[11px] text-[#d8b4fe]">Painéis administrativos com gráficos e tabelas dinâmicas.</p>
                </div>
                <div className="p-4 bg-[#1f0938] border border-white/5 rounded-xl">
                  <h4 className="text-xs font-bold text-white mb-1">🐍 Scripts e APIs em Python/Node</h4>
                  <p className="text-[11px] text-[#d8b4fe]">Backend limpo, rotas de API e algoritmos de automação.</p>
                </div>
                <div className="p-4 bg-[#1f0938] border border-white/5 rounded-xl">
                  <h4 className="text-xs font-bold text-white mb-1">⚡ Componentes React / Tailwind</h4>
                  <p className="text-[11px] text-[#d8b4fe]">Elementos modulares prontos para copiar e colar no seu projeto.</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#f0abfc]" />
                Principais Recursos da Plataforma
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                  <Code2 className="w-5 h-5 text-[#f0abfc] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Geração de Código Clean</h4>
                    <p className="text-[11px] text-[#d8b4fe]">Código padronizado utilizando boas práticas, TypeScript e Next.js.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                  <Layers className="w-5 h-5 text-[#f0abfc] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Modelo Ultrarrápido Build IA 3.6</h4>
                    <p className="text-[11px] text-[#d8b4fe]">Respostas geradas em tempo real com baixa latência.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-[#f0abfc] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Segurança e Exportação Prática</h4>
                    <p className="text-[11px] text-[#d8b4fe]">Exporte ou copie todo o código gerado em 1 clique.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-white/10">
              <button 
                onClick={() => {
                  setShowAboutModal(false);
                  setShowLanding(false);
                }}
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

      {/* Modal Planos */}
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
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
                !isPro ? 'bg-[#1a0a33] border-[#f0abfc]' : 'bg-[#0f051e] border-white/10'
              }`}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">Starter</h3>
                    {!isPro && <span className="text-[10px] bg-[#f0abfc]/20 text-[#f0abfc] px-2.5 py-0.5 rounded-full border border-[#f0abfc]/40">Atual</span>}
                  </div>
                  <p className="text-2xl font-extrabold text-[#f0abfc] my-3">Grátis</p>
                  <ul className="space-y-2.5 text-xs text-[#d8b4fe] mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Modelo Build IA 3.6 Flash</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Conversas limitadas</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Exportação simples</li>
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    setShowPricingModal(false);
                    setShowLanding(false);
                  }}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Usar Plano Grátis
                </button>
              </div>

              <div className={`p-6 rounded-2xl border relative flex flex-col justify-between ${
                isPro ? 'bg-[#230944] border-[#d946ef] shadow-[0_0_25px_rgba(217,70,239,0.4)]' : 'bg-[#17062d] border-[#d946ef]/50 hover:border-[#d946ef]'
              }`}>
                <span className="absolute -top-3 right-6 bg-[#d946ef] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">Recomendado</span>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">Pro Studio</h3>
                    {isPro && <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/40 flex items-center gap-1"><Crown className="w-3 h-3" /> Ativo</span>}
                  </div>
                  <p className="text-2xl font-extrabold text-[#f0abfc] my-3">$ 5,99 <span className="text-xs font-normal text-[#d8b4fe]">/mês</span></p>
                  <ul className="space-y-2.5 text-xs text-[#d8b4fe] mb-6">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Modelo Build IA Pro 4.0 & Claude 3.5</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Velocidade e prioridade máxima</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Exportação em ZIP e no GitHub</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#f0abfc]" /> Suporte Prioritário VIP 24/7</li>
                  </ul>
                </div>
                
                {isPro ? (
                  <button 
                    onClick={() => {
                      setShowPricingModal(false);
                      setShowProFeaturesModal(true);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Gerenciar Recursos Pro</span>
                  </button>
                ) : (
                  <button 
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full py-2.5 bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] hover:opacity-90 text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(217,70,239,0.4)] flex items-center justify-center gap-2"
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Pagar $ 5,99 no Checkout</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Superior */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4 z-20 sticky top-0 bg-[#07020d]/80 backdrop-blur-md border-b border-white/5">
        <div 
          className="flex items-center gap-2.5 cursor-pointer" 
          onClick={() => setShowLanding(true)}
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
            onClick={() => {
              setShowLanding(false);
              setInput("Crie uma Dashboard financeira interativa com gráficos");
            }}
            className="flex items-center gap-1.5 text-xs text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition-colors border border-white/10"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#f0abfc]" />
            <span>Exemplos</span>
          </button>
        </div>

        {/* Botões Lado Direito */}
        <div className="flex items-center gap-3">
          {/* BOTÃO DE SAIR DO CHAT (Exibido quando showLanding === false) */}
          {!showLanding && (
            <button 
              onClick={() => setShowLanding(true)}
              className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
              title="Sair do Chat e voltar para a tela inicial"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair do chat</span>
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

          {!showLanding && (
            <button 
              onClick={() => setMessages([])}
              className="flex items-center gap-1.5 text-xs text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl transition-colors border border-white/10"
              title="Nova conversa"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          )}

          <button 
            onClick={() => setShowAboutModal(true)}
            className="bg-[#1f0938] hover:bg-[#2e0e54] text-[#f0abfc] hover:text-white border border-[#d946ef]/40 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Ver mais</span>
          </button>
        </div>
      </header>

      {/* Landing Page */}
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
                onClick={() => setShowAboutModal(true)}
                className="bg-white/5 hover:bg-white/10 text-[#d8b4fe] border border-white/10 px-6 py-4 rounded-2xl text-base font-medium transition-all"
              >
                Ver mais sobre a IA
              </button>
            </div>
          </main>

          <footer className="text-center text-xs text-[#a78bfa]/60 py-6 border-t border-white/5 z-10">
            © Build IA Studio. Todos os direitos reservados.
          </footer>
        </div>
      ) : (
        /* Chat */
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

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#d8b4fe] mb-8">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Motor atual: <strong className="text-white">{selectedModel}</strong></span>
                  </div>

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
                        {/* BOTÃO CONSTRUIR (Ação de envio de formulário) */}
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

                        <button type="button" className="text-[#d8b4fe] hover:text-white p-1.5 transition-colors">
                          <Mic className="w-4 h-4" />
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
                      <span className="text-sm text-[#d8b4fe]">Construindo sua aplicação com {selectedModel}...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}