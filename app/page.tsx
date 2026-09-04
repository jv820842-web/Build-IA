'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Menu, 
  Plus, 
  MessageSquare, 
  Compass, 
  Code, 
  Lightbulb,
  LogIn
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userProfile, setUserProfile] = useState<{ name: string; avatar?: string } | null>({
    name: 'Visitante',
  });

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

  const handleLoginToggle = () => {
    if (userProfile?.name === 'Visitante') {
      setUserProfile({
        name: 'Usuário Gemini',
        avatar: 'https://github.com/identicons/user.png'
      });
    } else {
      setUserProfile({ name: 'Visitante' });
    }
  };

  return (
    <div className="flex h-screen bg-[#0e0e10] text-[#e3e3e3] font-sans antialiased overflow-hidden relative">
      {/* Luzes de Fundo Brilhantes (Aurora Effect) */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#4285f4] opacity-20 blur-[140px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-[#9b51e0] opacity-15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-[#d96570] opacity-10 blur-[150px] pointer-events-none rounded-full" />

      {/* Sidebar Lateral estilo Gemini */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-[#1e1f20]/80 backdrop-blur-md flex flex-col justify-between p-3 select-none z-20 border-r border-[#282a2c]`}>
        <div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2.5 hover:bg-[#282a2c] rounded-full text-[#c4c7c5] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setMessages([])}
            className={`mt-4 flex items-center gap-3 bg-[#1a1a1c]/90 hover:bg-[#282a2c] border border-[#37393b] rounded-full p-3 text-sm text-[#c4c7c5] transition-all w-full ${!sidebarOpen && 'justify-center'}`}
          >
            <Plus className="w-5 h-5 text-[#8e918f]" />
            {sidebarOpen && <span>Nova conversa</span>}
          </button>

          {sidebarOpen && (
            <div className="mt-6">
              <p className="px-3 text-xs font-medium text-[#8e918f]">Recentes</p>
              <div className="mt-2 space-y-1">
                {messages.length > 0 && (
                  <button className="flex items-center gap-3 w-full p-2.5 text-sm text-[#c4c7c5] hover:bg-[#282a2c] rounded-full truncate">
                    <MessageSquare className="w-4 h-4 shrink-0 text-[#8e918f]" />
                    <span className="truncate">{messages[0].content}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Área Principal de Chat */}
      <main className="flex-1 flex flex-col h-full relative z-10">
        {/* Cabeçalho com Conta de Usuário */}
        <header className="flex items-center justify-between p-4 px-6 text-[#c4c7c5]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-[#e3e3e3]">Gemini</span>
            <span className="text-xs bg-[#282a2c] text-[#a8c7fa] px-2 py-0.5 rounded-md font-mono border border-[#37393b]">3.6 Flash</span>
          </div>

          {/* Botão / Perfil do Usuário */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLoginToggle}
              className="flex items-center gap-2 bg-[#1e1f20] hover:bg-[#282a2c] border border-[#37393b] px-3 py-1.5 rounded-full text-xs font-medium text-[#e3e3e3] transition-all"
            >
              {userProfile?.avatar ? (
                <img src={userProfile.avatar} alt="User Avatar" className="w-6 h-6 rounded-full" />
              ) : (
                <User className="w-4 h-4 text-[#a8c7fa]" />
              )}
              <span>{userProfile?.name}</span>
              <LogIn className="w-3.5 h-3.5 text-[#8e918f] ml-1" />
            </button>
          </div>
        </header>

        {/* Scroll das Mensagens ou Tela Inicial */}
        <div className="flex-1 overflow-y-auto px-4 md:px-0">
          <div className="max-w-3xl mx-auto py-8">
            {messages.length === 0 ? (
              <div className="mt-12 space-y-8">
                <div>
                  <h1 className="text-5xl font-semibold bg-gradient-to-r from-[#4285f4] via-[#9b51e0] to-[#d96570] bg-clip-text text-transparent drop-shadow-md">
                    Olá, {userProfile?.name}
                  </h1>
                  <h2 className="text-5xl font-medium text-[#5e6266] mt-2">
                    Como posso ajudar hoje?
                  </h2>
                </div>

                {/* Cards de sugestão estilo Gemini */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <button 
                    onClick={() => handleSubmit("Crie um script TypeScript para manipular dados")}
                    className="p-4 bg-[#1e1f20]/60 hover:bg-[#282a2c]/80 backdrop-blur-md rounded-2xl text-left flex flex-col justify-between h-36 transition-all border border-[#282a2c] hover:border-[#37393b] shadow-lg"
                  >
                    <span className="text-sm text-[#c4c7c5]">Crie um script TypeScript para manipular dados</span>
                    <Code className="w-6 h-6 text-[#a8c7fa] self-end" />
                  </button>

                  <button 
                    onClick={() => handleSubmit("Me dê ideias para planejar um projeto web")}
                    className="p-4 bg-[#1e1f20]/60 hover:bg-[#282a2c]/80 backdrop-blur-md rounded-2xl text-left flex flex-col justify-between h-36 transition-all border border-[#282a2c] hover:border-[#37393b] shadow-lg"
                  >
                    <span className="text-sm text-[#c4c7c5]">Me dê ideias para planejar um projeto web</span>
                    <Lightbulb className="w-6 h-6 text-[#a8c7fa] self-end" />
                  </button>

                  <button 
                    onClick={() => handleSubmit("Explique o conceito de APIs REST de forma simples")}
                    className="p-4 bg-[#1e1f20]/60 hover:bg-[#282a2c]/80 backdrop-blur-md rounded-2xl text-left flex flex-col justify-between h-36 transition-all border border-[#282a2c] hover:border-[#37393b] shadow-lg"
                  >
                    <span className="text-sm text-[#c4c7c5]">Explique o conceito de APIs REST de forma simples</span>
                    <Compass className="w-6 h-6 text-[#a8c7fa] self-end" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    {msg.role === 'user' ? (
                      <div className="w-8 h-8 rounded-full bg-[#37393b] flex items-center justify-center shrink-0 shadow">
                        <User className="w-5 h-5 text-[#c4c7c5]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#1e1f20] flex items-center justify-center shrink-0 border border-[#37393b] shadow">
                        <Sparkles className="w-5 h-5 text-[#4285f4]" />
                      </div>
                    )}
                    <div className="flex-1 pt-1 text-[#e3e3e3] leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-4 items-center">
                    <Sparkles className="w-5 h-5 text-[#4285f4] animate-spin" />
                    <span className="text-sm text-[#8e918f]">Gerando resposta...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Bar Estilo Gemini */}
        <div className="p-4">
          <div className="max-w-3xl mx-auto relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="bg-[#1e1f20]/80 backdrop-blur-md border border-[#37393b] focus-within:border-[#8e918f] rounded-full flex items-center px-6 py-3 shadow-2xl transition-all"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digitar algo para o Gemini..."
                className="bg-transparent flex-1 focus:outline-none text-[#e3e3e3] placeholder-[#8e918f] text-base"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 bg-[#a8c7fa] hover:bg-[#7cacf8] disabled:opacity-30 disabled:hover:bg-[#a8c7fa] text-[#042e00] rounded-full transition-colors ml-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-center text-xs text-[#8e918f] mt-2">
              O Gemini pode apresentar informações imprecisas, inclusive sobre pessoas.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}