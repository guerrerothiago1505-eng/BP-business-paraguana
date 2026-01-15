
import React, { useState } from 'react';
import Logo from '../components/Logo';

interface LoginScreenProps {
  onBack: () => void;
  onLogin: (email: string, password?: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white p-10 animate-in slide-in-from-bottom duration-500 overflow-y-auto no-scrollbar">
      <header className="mb-12">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 mb-6 active:scale-90 transition-transform">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
           </svg>
        </button>
        <div className="w-24 h-24 mx-auto mb-6">
           <Logo showText={false} />
        </div>
        <h1 className="text-3xl font-display font-black text-brand-slate text-center uppercase tracking-tighter">Acceso VIP</h1>
        <p className="text-center text-slate-400 text-xs mt-2 font-medium tracking-widest uppercase">Tu aliado de negocios espera</p>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 space-y-6">
         <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="business.paraguana2024@gmail.com"
              className="w-full bg-slate-50 border border-slate-100 p-5 rounded-[24px] outline-none focus:ring-2 focus:ring-brand-gold transition-all text-sm font-medium"
            />
         </div>

         <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Clave de Seguridad</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-100 p-5 rounded-[24px] outline-none focus:ring-2 focus:ring-brand-gold transition-all text-sm font-medium"
            />
         </div>

         <div className="pt-6">
            <button 
              type="submit"
              className="w-full red-gradient text-white py-6 rounded-[28px] font-black text-sm shadow-xl active:scale-95 transition-all uppercase tracking-widest border-b-4 border-brand-redDark"
            >
              Iniciar Sesión
            </button>
         </div>

         <div className="text-center space-y-4">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pt-4">¿Olvidaste tu clave? Contacta a Soporte BP</p>
            <div className="h-px bg-slate-50 w-24 mx-auto"></div>
            <p className="text-[8px] text-brand-gold font-black uppercase tracking-[0.4em] opacity-50">Acceso Maestro Protegido</p>
         </div>
      </form>
    </div>
  );
};

export default LoginScreen;
