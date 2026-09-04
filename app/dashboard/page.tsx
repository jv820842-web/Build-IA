import Link from 'next/link';
import { Plus, Code2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Seus Projetos</h1>
          <p className="text-neutral-400 text-sm mt-1">Gerencie suas aplicações geradas com IA.</p>
        </div>
        <Link
          href="/dashboard/apps/new"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all"
        >
          <Plus className="h-4 w-4" /> Novo Projeto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border border-neutral-800 bg-neutral-900/30 p-5 rounded-xl hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <Code2 className="h-5 w-5 text-purple-400" />
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full">Publicado</span>
          </div>
          <h3 className="font-semibold text-white">SaaS de Agendamento</h3>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">Sistema completo com cadastro de clientes e pagamentos.</p>
        </div>
      </div>
    </div>
  );
}
