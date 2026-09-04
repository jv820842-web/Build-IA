import Link from 'next/link';
import { Cpu, LayoutDashboard, PlusCircle, Code, Settings, MessageSquare } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-200">
      <aside className="w-64 border-r border-neutral-800 bg-neutral-900/50 p-4 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-2 px-2 py-4 mb-6">
            <Cpu className="h-6 w-6 text-purple-500" />
            <span className="font-bold text-lg text-white">Build IA</span>
          </div>
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-neutral-800 text-neutral-300">
              <LayoutDashboard className="h-4 w-4" /> Meus Projetos
            </Link>
            <Link href="/dashboard/apps/new" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-neutral-800 text-neutral-300">
              <PlusCircle className="h-4 w-4" /> Criar Projeto
            </Link>
            <Link href="/dashboard/chat" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-neutral-800 text-neutral-300">
              <MessageSquare className="h-4 w-4" /> Assistente IA
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
