
import React, { useState } from 'react';
import { ChatMessage } from '../types';

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hola, soy tu asesor personal de Business Paraguaná. ¿En qué puedo apoyarte hoy con tus negocios o propiedades?',
      sender: 'advisor',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMsg]);
    setInput('');

    // Mock advisor reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'He recibido tu mensaje. Estoy revisando la información y te responderé en breve. ¿Deseas que te llame?',
        sender: 'advisor',
        timestamp: new Date()
      }]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="bg-white p-4 border-b border-slate-200 flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">BP</div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h2 className="font-bold text-slate-800 text-sm">Equipo Business Paraguaná</h2>
          <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">En línea</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm ${
              m.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
            }`}>
              {m.text}
              <div className={`text-[9px] mt-2 ${m.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-slate-200 safe-area-bottom">
        <div className="flex gap-2 bg-slate-100 p-2 rounded-2xl items-center">
          <button className="p-2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
