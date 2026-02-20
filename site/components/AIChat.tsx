
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/gemini';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Olá! Sou o assistente do Manuel. Como posso ajudar a escalar a sua marca hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const aiMsg = await getAIResponse(userMsg, history);
    setMessages(prev => [...prev, { role: 'ai', text: aiMsg || 'Ocorreu um erro.' }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 md:w-96 glass-card rounded-2xl shadow-2xl flex flex-col h-[500px] overflow-hidden border-amber-500/30">
          <div className="bg-amber-500/10 p-4 border-b border-amber-500/20 flex justify-between items-center">
            <h3 className="font-bold text-amber-500">Mentoria AI Manuel Manero</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-amber-500 text-xs animate-pulse italic">O assistente está a processar...</div>}
          </div>
          <div className="p-4 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte sobre os programas..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
            <button onClick={handleSend} disabled={loading} className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-2 rounded-lg font-bold">
              ↑
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110 border-4 border-slate-950"
        >
          ✨
        </button>
      )}
    </div>
  );
};

export default AIChat;
