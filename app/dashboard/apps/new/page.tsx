'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
}

export default function BuildIAPage() {
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; isPremium: boolean } | null>(null);
  const [currentAuthMode, setCurrentAuthMode] = useState<'login' | 'register'>('login');
  
  // Histórico de chats e chat ativo
  const [chats, setChats] = useState<ChatHistory[]>([
    { id: '1', title: 'Novo Chat', messages: [{ sender: 'ai', text: 'Oi! Tudo bem? Como posso te ajudar hoje?' }] }
  ]);
  const [activeChatId, setActiveChatId] = useState<string>('1');
  const [inputText, setInputText] = useState('');

  // Modais
  const [activeModal, setActiveModal] = useState<'authModal' | 'premiumModal' | 'pixModal' | 'cameraModal' | 'benefitsModal' | null>(null);
  
  // Formulário de Auth
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // Câmera
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat.messages]);

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newChatObj: ChatHistory = {
      id: newId,
      title: 'Nova Conversa',
      messages: [{ sender: 'ai', text: 'Olá! Como posso te ajudar nesta nova conversa?' }]
    };
    setChats(prev => [newChatObj, ...prev]);
    setActiveChatId(newId);
  };

  const handlePremiumClick = () => {
    if (!currentUser) {
      alert("Você precisa estar logado na sua conta pelo site para assinar o plano premium!");
      setActiveModal('authModal');
      return;
    }
    if (currentUser.isPremium) {
      alert("Sua conta já possui o Plano Premium ativo!");
      setActiveModal('benefitsModal');
      return;
    }
    setActiveModal('premiumModal');
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const userText = inputText;
    setInputText('');

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        const updatedMessages = [...chat.messages, { sender: 'user' as const, text: userText }];
        // Atualiza o título do chat com a primeira pergunta se ainda for o padrão
        const title = chat.title === 'Novo Chat' || chat.title === 'Nova Conversa' ? (userText.length > 25 ? userText.substring(0, 25) + '...' : userText) : chat.title;
        return { ...chat, title, messages: updatedMessages };
      }
      return chat;
    }));

    // Resposta simulada da IA permitindo continuar conversando normalmente
    setTimeout(() => {
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, { sender: 'ai' as const, text: `Entendido sobre "${userText}". Como posso te auxiliar mais com isso?` }]
          };
        }
        return chat;
      }));
    }, 600);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = currentAuthMode === 'register' ? (authName || authEmail.split('@')[0]) : authEmail.split('@')[0];
    setCurrentUser({ name, email: authEmail, isPremium: false });
    setActiveModal(null);
    alert(currentAuthMode === 'login' ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!');
  };

  const loginWithGoogle = () => {
    setCurrentUser({ name: 'Usuário Google', email: 'usuario@gmail.com', isPremium: false });
    setActiveModal(null);
    alert('Autenticado com Google com sucesso!');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    alert('Você saiu da sua conta.');
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText("140132e5-561a-41eb-bf1f-b84592f0fc87");
    alert("Chave Pix copiada com sucesso!");
  };

  const simulatePaymentApproval = () => {
    setActiveModal(null);
    if (currentUser) {
      setCurrentUser({ ...currentUser, isPremium: true });
    }
    alert("Pagamento de R$ 5,99 confirmado! O Plano Premium foi ativado automaticamente na sua conta.");
    setActiveModal('benefitsModal');
  };

  const openCameraModal = async () => {
    setActiveModal('cameraModal');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Não foi possível acessar a câmera do dispositivo.");
      setActiveModal(null);
    }
  };

  const closeCameraModal = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setActiveModal(null);
  };

  const capturePhoto = () => {
    alert("Foto capturada com sucesso e pronta para ser enviada para a IA!");
    closeCameraModal();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0F0E17', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      
      {/* SIDEBAR COM HISTÓRICO */}
      <aside style={{ width: '280px', backgroundColor: '#161525', borderRight: '1px solid #2A283E', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #2A283E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '1.1rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #7F56D9, #9E77ED)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>⚡</div>
            <span>Build IA</span>
          </div>
        </div>

        <button onClick={createNewChat} style={{ margin: '15px 20px', background: '#7F56D9', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          + Novo Chat
        </button>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px' }}>
          <div style={{ fontSize: '0.75rem', color: '#98A2B3', textTransform: 'uppercase', padding: '10px 10px 5px', fontWeight: 600 }}>Histórico de Conversas</div>
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChatId(chat.id)}
              style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', color: chat.id === activeChatId ? '#FFFFFF' : '#98A2B3', backgroundColor: chat.id === activeChatId ? '#2A283E' : 'transparent', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {chat.title}
            </div>
          ))}
        </div>

        <div style={{ padding: '15px 20px', borderTop: '1px solid #2A283E', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 500, overflow: 'hidden' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3F3D56', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, flexShrink: 0 }}>
              {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'V'}
            </div>
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {currentUser ? `${currentUser.name}${currentUser.isPremium ? ' 👑' : ''}` : 'Visitante'}
            </span>
          </div>
          {currentUser ? (
            <button onClick={logoutUser} style={{ background: '#F04438', border: 'none', color: 'white', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Sair</button>
          ) : (
            <button onClick={() => setActiveModal('authModal')} style={{ background: '#7F56D9', border: 'none', color: 'white', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Entrar</button>
          )}
        </div>
      </aside>

      {/* ÁREA PRINCIPAL DO CHAT */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#0F0E17', position: 'relative' }}>
        <header style={{ padding: '15px 25px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', borderBottom: '1px solid #2A283E', background: 'rgba(15, 14, 23, 0.8)' }}>
          <button onClick={handlePremiumClick} style={{ background: 'linear-gradient(135deg, #F79009, #DC6803)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            {currentUser?.isPremium ? '👑 Premium Ativo' : '👑 Assinar Premium (R$ 5,99)'}
          </button>
          {!currentUser && (
            <button onClick={() => setActiveModal('authModal')} style={{ background: '#161525', border: '1px solid #2A283E', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
              Entrar / Cadastrar
            </button>
          )}
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px', width: '100%', margin: '0 auto' }}>
          {activeChat.messages.map((msg, index) => (
            <div key={index} style={{ display: 'flex', gap: '15px', maxWidth: '80%', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: msg.sender === 'user' ? '#3F3D56' : '#7F56D9', color: 'white', flexShrink: 0 }}>
                {msg.sender === 'user' ? 'U' : '⚡'}
              </div>
              <div style={{ padding: '14px 18px', borderRadius: '14px', fontSize: '0.95rem', lineHeight: '1.5', backgroundColor: msg.sender === 'user' ? '#7F56D9' : '#161525', color: 'white', border: msg.sender === 'ai' ? '1px solid #2A283E' : 'none' }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '20px 30px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '900px', width: '100%', background: '#161525', border: '1px solid #2A283E', borderRadius: '14px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={openCameraModal} title="Tirar foto" style={{ background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer', fontSize: '1.2rem' }}>📷</button>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Digite sua mensagem para continuar conversando..." 
              rows={1}
              style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '0.95rem', resize: 'none', outline: 'none' }}
            />
            <button onClick={sendMessage} style={{ background: '#7F56D9', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Enviar</button>
          </div>
        </div>
      </main>

      {/* MODAL DE AUTENTICAÇÃO (LOGIN / CADASTRO / GOOGLE) */}
      {activeModal === 'authModal' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161525', border: '1px solid #2A283E', borderRadius: '20px', width: '100%', maxWidth: '480px', padding: '30px', position: 'relative' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Acesse sua conta</h2>
            
            <div style={{ display: 'flex', background: '#0F0E17', borderRadius: '10px', padding: '4px', margin: '20px 0' }}>
              <button onClick={() => setCurrentAuthMode('login')} style={{ flex: 1, background: currentAuthMode === 'login' ? '#161525' : 'transparent', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Entrar</button>
              <button onClick={() => setCurrentAuthMode('register')} style={{ flex: 1, background: currentAuthMode === 'register' ? '#161525' : 'transparent', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Cadastrar</button>
            </div>

            <button onClick={loginWithGoogle} style={{ width: '100%', background: 'white', color: '#111', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', marginBottom: '15px' }}>
              Continuar com o Google
            </button>

            <form onSubmit={handleAuthSubmit}>
              {currentAuthMode === 'register' && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Nome</label>
                  <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} style={{ width: '100%', background: '#0F0E17', border: '1px solid #2A283E', padding: '12px', borderRadius: '10px', color: 'white', outline: 'none' }} placeholder="Seu nome" />
                </div>
              )}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>E-mail</label>
                <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required style={{ width: '100%', background: '#0F0E17', border: '1px solid #2A283E', padding: '12px', borderRadius: '10px', color: 'white', outline: 'none' }} placeholder="seu@email.com" />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px' }}>Senha</label>
                <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required style={{ width: '100%', background: '#0F0E17', border: '1px solid #2A283E', padding: '12px', borderRadius: '10px', color: 'white', outline: 'none' }} placeholder="••••••••" />
              </div>
              <button type="submit" style={{ width: '100%', background: '#7F56D9', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
                {currentAuthMode === 'login' ? 'Entrar na Conta' : 'Criar Conta'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PLANO PREMIUM */}
      {activeModal === 'premiumModal' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161525', border: '1px solid #2A283E', borderRadius: '20px', width: '100%', maxWidth: '480px', padding: '30px', position: 'relative' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>👑 Seja Premium</h2>
            <div style={{ textAlign: 'center', background: '#0F0E17', border: '1px solid #2A283E', padding: '15px', borderRadius: '12px', margin: '20px 0' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F79009' }}>R$ 5,99</span> / mês
            </div>
            <ul style={{ fontSize: '0.9rem', color: '#98A2B3', marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>Respostas ultra-rápidas e sem filas</li>
              <li>Acesso a modelos de IA avançados</li>
              <li>Envio de fotos ilimitado com a câmera</li>
              <li>Histórico de conversas estendido e sem limites</li>
              <li>Suporte prioritário 24/7</li>
            </ul>
            <button onClick={() => setActiveModal('pixModal')} style={{ width: '100%', background: 'linear-gradient(135deg, #F79009, #DC6803)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
              Pagar R$ 5,99 via Pix
            </button>
          </div>
        </div>
      )}

      {/* MODAL PIX COM CHAVE AUTOMÁTICA E QR CODE */}
      {activeModal === 'pixModal' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161525', border: '1px solid #2A283E', borderRadius: '20px', width: '100%', maxWidth: '480px', padding: '30px', position: 'relative', textAlign: 'center' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '5px' }}>Pagamento via Pix</h2>
            <p style={{ color: '#F79009', fontWeight: 600, marginBottom: '15px' }}>Valor automático: R$ 5,99</p>
            
            <div style={{ background: 'white', width: '150px', height: '150px', margin: '0 auto 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126580014br.gov.bcb.pix0136140132e5-561a-41eb-bf1f-b84592f0fc870204059953039865802BR5925Build%20IA%20Plano%20Premium6009Sao%20Paulo62070503***6304" alt="QR Code Pix" style={{ maxWidth: '100%' }} />
            </div>

            <div style={{ background: '#0F0E17', border: '1px solid #2A283E', padding: '10px 15px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#98A2B3' }}>140132e5-561a-41eb-bf1f-b84592f0fc87</span>
              <button onClick={copyPixKey} style={{ background: '#7F56D9', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Copiar</button>
            </div>

            <button onClick={simulatePaymentApproval} style={{ width: '100%', background: '#12B76A', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
              Já fiz o Pix (Ativar Premium)
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE BENEFÍCIOS DO PREMIUM */}
      {activeModal === 'benefitsModal' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161525', border: '1px solid #2A283E', borderRadius: '20px', width: '100%', maxWidth: '480px', padding: '30px', position: 'relative', textAlign: 'center' }}>
            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎉</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px', color: '#F79009' }}>Parabéns, você é Premium!</h2>
            <p style={{ fontSize: '0.95rem', color: '#98A2B3', marginBottom: '20px' }}>Sua assinatura foi ativada com sucesso. Aproveite todos os benefícios desbloqueados:</p>
            <div style={{ background: '#0F0E17', border: '1px solid #2A283E', padding: '15px', borderRadius: '12px', textAlign: 'left', fontSize: '0.9rem', color: '#FFF', lineHeight: '1.6', marginBottom: '20px' }}>
              ✅ Velocidade máxima de processamento de IA<br/>
              ✅ Reconhecimento avançado de imagens via Câmera<br/>
              ✅ Histórico ilimitado de conversas e buscas salvas<br/>
              ✅ Acesso antecipado a novas ferramentas e comandos beta<br/>
              ✅ Sem anúncios ou interrupções nas respostas
            </div>
            <button onClick={() => setActiveModal(null)} style={{ width: '100%', background: '#7F56D9', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
              Começar a Usar Agora
            </button>
          </div>
        </div>
      )}

      {/* MODAL DA CÂMERA */}
      {activeModal === 'cameraModal' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161525', border: '1px solid #2A283E', borderRadius: '20px', width: '100%', maxWidth: '540px', padding: '30px', position: 'relative' }}>
            <button onClick={closeCameraModal} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '15px', textAlign: 'center' }}>Tirar Foto</h2>
            <div style={{ width: '100%', height: '300px', background: 'black', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={closeCameraModal} style={{ flex: 1, background: '#2A283E', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>Cancelar</button>
              <button onClick={capturePhoto} style={{ flex: 1, background: '#7F56D9', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>Capturar Foto</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}