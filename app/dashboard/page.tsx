'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user', text?: string, image?: string }>>([
    { sender: 'ai', text: 'Oi! Tudo bem? Como posso te ajudar hoje?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isPixOpen, setIsPixOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePremiumClick = () => {
    if (!currentUser) {
      alert("Você precisa estar logado na sua conta pelo site para assinar o plano premium!");
      setIsAuthOpen(true);
      return;
    }
    if (currentUser.isPremium) {
      alert("Sua conta já possui o Plano Premium ativo!");
      return;
    }
    setIsPremiumOpen(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = authMode === 'register' ? (authName || authEmail.split('@')[0]) : authEmail.split('@')[0];
    setCurrentUser({ name, email: authEmail, isPremium: false });
    setIsAuthOpen(false);
    alert(authMode === 'login' ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!');
  };

  const loginWithGoogle = () => {
    setCurrentUser({ name: 'Usuário Google', email: 'usuario@gmail.com', isPremium: false });
    setIsAuthOpen(false);
    alert('Autenticado com Google com sucesso!');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    alert('Você saiu da sua conta.');
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText("140132e5-561a-41eb-bf1f-b84592f0fc87");
    alert("Chave Pix copiada para a área de transferência!");
  };

  const simulatePaymentApproval = () => {
    setIsPixOpen(false);
    if (currentUser) {
      setCurrentUser({ ...currentUser, isPremium: true });
    }
    alert("Pagamento de R$ 5,99 confirmado com sucesso! O Plano Premium foi ativado automaticamente.");
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Não foi possível acessar a câmera.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        stopCamera();
        
        setMessages(prev => [...prev, { sender: 'user', image: dataUrl }]);
        setTimeout(() => {
          setMessages(prev => [...prev, { sender: 'ai', text: 'Recebi sua foto capturada pela câmera! Como posso ajudar em relação a ela?' }]);
        }, 800);
      }
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const text = inputMessage;
    setInputMessage('');

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setChatHistory(prev => [text, ...prev]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { sender: 'ai', text: `Entendi sobre "${text}". Como posso ajudar mais?` }
      ]);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0F0E17', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      
      <aside style={{ width: '280px', backgroundColor: '#161525', borderRight: '1px solid #2A283E', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, borderBottom: '1px solid #2A283E' }}>
          <div style={{ background: 'linear-gradient(135deg, #7F56D9, #9E77ED)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚡</div>
          <span>Build IA</span>
        </div>

        <button onClick={() => setMessages([{ sender: 'ai', text: 'Novo chat iniciado! Como posso ajudar?' }])} style={{ margin: '15px 20px', background: '#7F56D9', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
          + Novo Chat
        </button>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px' }}>
          <div style={{ fontSize: '0.75rem', color: '#98A2B3', textTransform: 'uppercase', padding: '10px', fontWeight: 600 }}>Histórico</div>
          {chatHistory.map((item, index) => (
            <div key={index} onClick={() => setInputMessage(item)} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#98A2B3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item}
            </div>
          ))}
        </div>

        <div style={{ padding: '15px 20px', borderTop: '1px solid #2A283E', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3F3D56', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
              {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span>{currentUser ? `${currentUser.name} ${currentUser.isPremium ? '👑' : ''}` : 'Visitante'}</span>
          </div>
          <button onClick={() => setIsAuthOpen(true)} style={{ background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer' }}>🔑</button>
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <header style={{ padding: '15px 25px', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderBottom: '1px solid #2A283E', background: 'rgba(15, 14, 23, 0.8)' }}>
          <button onClick={handlePremiumClick} style={{ background: 'linear-gradient(135deg, #F79009, #DC6803)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            👑 Plano Premium
          </button>
          {!currentUser ? (
            <button onClick={() => setIsAuthOpen(true)} style={{ background: '#161525', border: '1px solid #2A283E', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
              Entrar / Cadastrar
            </button>
          ) : (
            <button onClick={logoutUser} style={{ background: '#F04438', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
              Sair
            </button>
          )}
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px', width: '100%', margin: '0 auto' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '15px', maxWidth: '80%', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: msg.sender === 'ai' ? '#7F56D9' : '#3F3D56', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                {msg.sender === 'ai' ? '⚡' : '👤'}
              </div>
              <div style={{ padding: '14px 18px', borderRadius: '14px', backgroundColor: msg.sender === 'ai' ? '#161525' : '#7F56D9', border: msg.sender === 'ai' ? '1px solid #2A283E' : 'none', color: 'white' }}>
                {msg.text && <p>{msg.text}</p>}
                {msg.image && <img src={msg.image} alt="Captura" style={{ maxWidth: '200px', borderRadius: '8px' }} />}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '20px 30px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '900px', width: '100%', background: '#161525', border: '1px solid #2A283E', borderRadius: '14px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={startCamera} style={{ background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer', fontSize: '1.2rem' }}>📷</button>
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Envie uma mensagem para a Build IA..." 
              style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.95rem' }} 
            />
            <button onClick={sendMessage} style={{ background: '#7F56D9', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer' }}>🚀</button>
          </div>
        </div>
      </main>

      {isAuthOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161525', border: '1px solid #2A283E', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '400px', position: 'relative' }}>
            <button onClick={() => setIsAuthOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer' }}>✕</button>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{authMode === 'login' ? 'Entrar na Conta' : 'Cadastre-se'}</h2>
            
            <div style={{ display: 'flex', background: '#0F0E17', borderRadius: '10px', padding: '4px', marginBottom: '20px' }}>
              <button onClick={() => setAuthMode('login')} style={{ flex: 1, background: authMode === 'login' ? '#161525' : 'transparent', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Entrar</button>
              <button onClick={() => setAuthMode('register')} style={{ flex: 1, background: authMode === 'register' ? '#161525' : 'transparent', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Cadastrar</button>
            </div>

            <button onClick={loginWithGoogle} style={{ width: '100%', background: 'white', color: '#111', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', marginBottom: '20px' }}>
              Continuar com Google
            </button>

            <form onSubmit={handleAuthSubmit}>
              {authMode === 'register' && (
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Nome</label>
                  <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} style={{ width: '100%', background: '#0F0E17', border: '1px solid #2A283E', padding: '10px', borderRadius: '8px', color: 'white' }} />
                </div>
              )}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>E-mail</label>
                <input type="email" required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} style={{ width: '100%', background: '#0F0E17', border: '1px solid #2A283E', padding: '10px', borderRadius: '8px', color: 'white' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Senha</label>
                <input type="password" required value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} style={{ width: '100%', background: '#0F0E17', border: '1px solid #2A283E', padding: '10px', borderRadius: '8px', color: 'white' }} />
              </div>
              <button type="submit" style={{ width: '100%', background: '#7F56D9', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
                {authMode === 'login' ? 'Entrar' : 'Criar Conta'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isPremiumOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161525', border: '1px solid #2A283E', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '480px', position: 'relative' }}>
            <button onClick={() => setIsPremiumOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer' }}>✕</button>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>👑 Seja Premium</h2>
            <p style={{ textAlign: 'center', color: '#98A2B3', marginBottom: '20px', fontSize: '0.9rem' }}>Desbloqueie recursos avançados por apenas R$ 5,99/mês</p>
            <button onClick={() => { setIsPremiumOpen(false); setIsPixOpen(true); }} style={{ width: '100%', background: 'linear-gradient(135deg, #F79009, #DC6803)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
              Assinar por R$ 5,99 via PIX
            </button>
          </div>
        </div>
      )}

      {isPixOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161525', border: '1px solid #2A283E', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '400px', textAlign: 'center', position: 'relative' }}>
            <button onClick={() => setIsPixOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#98A2B3', cursor: 'pointer' }}>✕</button>
            <h2 style={{ marginBottom: '10px' }}>Pagamento PIX</h2>
            <p style={{ color: '#98A2B3', fontSize: '0.9rem', marginBottom: '20px' }}>Pague R$ 5,99 para liberar o plano</p>
            <div style={{ background: 'white', padding: '10px', borderRadius: '10px', display: 'inline-block', marginBottom: '15px' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=00020126580014br.gov.bcb.pix0136140132e5-561a-41eb-bf1f-b84592f0fc870204059953039865802BR5925Build%20IA%20Assinatura6009Sao%20Paulo62070503***6304" alt="QR Code Pix" />
            </div>
            <div style={{ background: '#0F0E17', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', wordBreak: 'break-all' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>140132e5-561a-41eb-bf1f-b84592f0fc87</span>
              <button onClick={copyPixKey} style={{ background: '#7F56D9', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Copiar</button>
            </div>
            <button onClick={simulatePaymentApproval} style={{ width: '100%', background: '#12B76A', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer' }}>
              Simular Pagamento Realizado
            </button>
          </div>
        </div>
      )}

      {isCameraOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#161525', border: '1px solid #2A283E', padding: '20px', borderRadius: '20px', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '15px' }}>Tirar Foto</h2>
            <div style={{ width: '100%', height: '300px', background: 'black', borderRadius: '10px', overflow: 'hidden', marginBottom: '15px' }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={stopCamera} style={{ flex: 1, background: '#0F0E17', border: '1px solid #2A283E', color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
              <button onClick={capturePhoto} style={{ flex: 1, background: '#7F56D9', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Capturar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}