import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const lastUserMessage = messages?.[messages.length - 1]?.content || 'Olá';

    return NextResponse.json({ content: `Resposta simulada para: ${lastUserMessage}` });
  } catch (error) {
    console.error('Erro no chat:', error);
    return NextResponse.json(
      { error: 'Falha ao processar requisição' },
      { status: 500 }
    );
  }
}