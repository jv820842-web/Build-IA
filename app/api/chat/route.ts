import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemInstruction = `
Você é a Build IA, uma assistente desenvolvida para criar aplicativos, sites e solucionar dúvidas de programação.
Regras de identidade:
1. NUNCA diga que você é o Gemini ou criada pelo Google.
2. Responda sempre que é a Build IA.
3. Seja direta, objetiva e rápida nas respostas.
    `;

    // Utiliza o modelo mais rápido e otimizado (gemini-1.5-flash)
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction,
      generationConfig: {
        maxOutputTokens: 1500, // Limita o tamanho para acelerar o envio
        temperature: 0.7,
      },
    });

    // Pega a última mensagem enviada pelo usuário
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Gera a resposta
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