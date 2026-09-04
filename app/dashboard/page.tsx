'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Plus, 
  Mic, 
  RotateCcw, 
  LogOut, 
  Loader2 
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07020d] text-[#e3e3e3] flex flex-col justify-between">
      {/* Header Superior com Botão de Sair */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4 border-b border-white/5 sticky top-0 bg-[#07020d]/80 backdrop-blur-md z-20">
        <Link href="/" className="text-xl font-extrabold text-white flex items-center gap-2">
          <span>Build IA</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* BOTÃO SAIR DO CHAT */}
          <Link 
            href="/"
            className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair do chat</span>
          </Link>

          <button 
            onClick={() => setMessages([])}
            className="flex items-center gap-1.5 text-xs text-[#d8b4fe] hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        </div>
      </header>

      {/* Area Central do Chat */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="text-center my-auto w-full">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              Crie algo com a <br />
              <span className="bg-gradient-to-r from-[#f0abfc] via-[#d946ef] to-[#8b5cf6] bg-clip-text text-transparent">
                Build IA
              </span>
            </h1>
            <p className="text-[#d8b4fe] text-sm mb-8">Crie apps e sites conversando com a IA</p>

            {/* Form de envio com o botão Construir */}
            <form onSubmit={handleSubmit} className="bg-[#15092a]/90 border border-[#d946ef]/50 rounded-2xl flex items-center px-4 py-3 shadow-[0_0_35px_rgba(217,70,239,0.25)]">
              <button type="button" onClick={() => setMessages([])} className="text-[#d8b4fe] p-1.5">
                <Plus className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Peça à Build IA para criar um aplicativo web que..."
                className="bg-transparent flex-1 outline-none text-sm px-3 text-white placeholder-[#a78bfa]/70"
              />

              {/* Botão Construir */}
              <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:opacity-90 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Construir</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 py-8 w-full">
            {messages.map((msg, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#2a1249]' : 'bg-gradient-to-tr from-[#d946ef] to-[#8b5cf6]'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-[#f0abfc]" /> : <Sparkles className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 text-[#e3e3e3] whitespace-pre-wrap">{msg.content}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}