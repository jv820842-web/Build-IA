import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { role: 'assistant', content: 'Chave API Gemini não configurada no servidor.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content || '';

    // Tenta primeiro com gemini-3.6-flash
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: lastMessage,
      });
    } catch (e) {
      // Se falhar por estar instável, tenta com o gemini-3.6-pro
      response = await ai.models.generateContent({
        model: 'gemini-3.6-pro',
        contents: lastMessage,
      });
    }

    return NextResponse.json({
      role: 'assistant',
      content: response.text,
    });
  } catch (error: any) {
    console.error('Erro no servidor:', error);
    return NextResponse.json(
      { role: 'assistant', content: `Servidores do Google ocupados. Tente enviar a mensagem novamente em instantes.` },
      { status: 500 }
    );
  }
}