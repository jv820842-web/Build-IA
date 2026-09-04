'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Menu, 
  Plus, 
  Search, 
  Compass, 
  Grid, 
  Settings, 
  Mic
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex h-screen bg-[#0e0f12] text-[#e3e3e3] font-sans antialiased overflow-hidden relative">
      {/* Luz Radial Suave Centralizada no Fundo (Efeito Aurora Gemini) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#1e295d] via-[#111e40] to-transparent opacity-40 blur-[130px] pointer-events-none rounded-full" />

      {/* Sidebar Ícones/Minimizada */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-[#131314]/80 backdrop-blur-md flex flex-col justify-between p-3 select-none z-20 border-r border-[#1e1f20]`}>
        <div className="flex flex-col items-center space-y-6">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#282a2c] rounded-full text-[#c4c7c5] transition-colors"
          >
            <Sparkles className="w-5 h-5 text-[#a8c7fa]" />
          </button>

          <div className="flex flex-col gap-4 items-center w-full">
            <button 
              onClick={() => setMessages([])}
              className="p-2.5 hover:bg-[#282a2c] rounded-full text-[#c4c7c5] transition-colors"
              title="Nova conversa"
            >
              <Plus className="w-5 h-5" />
            </button>

            <button className="p-2.5 hover:bg-[#282a2c] rounded-full text-[#c4c7c5] transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2.5 hover:bg-[#282a2c] rounded-full text-[#c4c7c5] transition-colors">
              <Compass className="w-5 h-5" />
            </button>

            <button className="p-2.5 hover:bg-[#282a2c] rounded-full text-[#c4c7c5] transition-colors">
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button className="p-2.5 hover:bg-[#282a2c] rounded-full text-[#c4c7c5] transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-7 h-7 rounded-full bg-[#1e293b] border border-[#334155] flex items-center justify-center text-xs font-semibold text-[#a8c7fa]">
            B
          </div>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col h-full relative z-10">
        {/* Topbar com Botão Upgrade */}
        <header className="flex items-center justify-end p-4 px-8 text-[#c4c7c5]">
          <button className="flex items-center gap-2 bg-[#004a77] hover:bg-[#005c93] text-[#c2e7ff] text-sm px-4 py-1.5 rounded-full font-medium transition-colors">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Fazer upgrade</span>
          </button>
        </header>

        {/* Área Central / Respostas */}
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
                      <div className="w-8 h-8 rounded-full bg-[#282a2c] flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-[#c4c7c5]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#1e1f20] flex items-center justify-center shrink-0 border border-[#37393b]">
                        <Sparkles className="w-5 h-5 text-[#7cacf8]" />
                      </div>
                    )}
                    <div className="flex-1 pt-1 text-[#e3e3e3] leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-4 items-center">
                    <Sparkles className="w-5 h-5 text-[#7cacf8] animate-spin" />
                    <span className="text-sm text-[#8e918f]">Pensando...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Input Bar Estilo Gemini Centralizado */}
        <div className="p-6 pb-12">
          <div className="max-w-2xl mx-auto relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="bg-[#1e1f20]/90 backdrop-blur-md border border-[#2e3032] focus-within:border-[#444746] rounded-full flex items-center px-5 py-2.5 shadow-2xl transition-all"
            >
              <button type="button" className="text-[#8e918f] hover:text-[#e3e3e3] p-1.5 transition-colors">
                <Plus className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Peça ao Build IA"
                className="bg-transparent flex-1 focus:outline-none text-[#e3e3e3] placeholder-[#8e918f] text-sm px-3"
              />

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8e918f] font-medium px-2 py-1 bg-[#131314] rounded-md border border-[#282a2c]">
                  Flash
                </span>
                <button type="button" className="text-[#8e918f] hover:text-[#e3e3e3] p-1.5 transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                {input.trim() && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="p-1.5 bg-[#a8c7fa] hover:bg-[#7cacf8] text-[#042e00] rounded-full transition-colors"
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