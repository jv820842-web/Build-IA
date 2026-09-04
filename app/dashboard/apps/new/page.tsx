'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function NewProjectPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Criar Nova Aplicação</h1>
        <p className="text-neutral-400 text-sm mt-1">Descreva o que deseja construir em detalhes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-neutral-800 bg-neutral-900/30 p-6 rounded-2xl space-y-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Nome do Projeto</label>
            <input
              type="text"
              placeholder="Ex: App de Finanças Pessoais"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-400 mb-1">Descrição do Software (Prompt)</label>
            <textarea
              rows={6}
              placeholder="Descreva as funcionalidades, telas e regras de negócio da sua aplicação..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-2.5 rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Gerando Software...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Gerar Aplicação com IA
            </>
          )}
        </button>
      </form>
    </div>
  );
}
