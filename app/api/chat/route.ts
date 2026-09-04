import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const lastUserMessage = messages?.[messages.length - 1]?.content || 'Olá';

    // Substituindo pelo modelo correto e funcional
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(lastUserMessage);
    const responseText = result.response.text();

    return NextResponse.json({ content: responseText });
  } catch (error) {
    console.error('Erro no chat:', error);
    return NextResponse.json(
      { error: 'Falha ao processar requisição' },
      { status: 500 }
    );
  }
}