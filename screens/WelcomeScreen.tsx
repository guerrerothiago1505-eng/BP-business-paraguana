
import React from 'react';
import Logo from '../components/Logo';

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onLogin }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-between p-10 bg-white text-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        {/* New High Impact Emblem */}
        <div className="w-full aspect-square animate-float">
          <Logo />
        </div>
        
        <div className="mt-8 space-y-4">
          <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.6em] animate-pulse">
            Tu Aliado Estratégico
          </p>
          <div className="h-0.5 bg-slate-100 w-16 mx-auto"></div>
        </div>
      </div>

      <div className="w-full mb-10 flex flex-col gap-5">
        <button 
          onClick={onLogin}
          className="w-full red-gradient text-white py-6 rounded-[28px] font-bold text-lg shadow-[0_20px_40px_rgba(161,27,32,0.25)] active:scale-95 transition-all uppercase tracking-[0.2em] border-b-4 border-brand-redDark"
        >
          Ya soy cliente VIP
        </button>
        
        <button 
          onClick={onStart}
          className="w-full bg-slate-50 border border-slate-100 text-slate-400 py-5 rounded-[28px] font-bold active:scale-95 transition-all text-[11px] uppercase tracking-widest"
        >
          Registro: crear mi perfil
        </button>
      </div>
      
      <div className="flex items-center gap-3 opacity-20 mb-4">
        <span className="h-px w-8 bg-slate-400"></span>
        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Exclusividad Garantizada</p>
        <span className="h-px w-8 bg-slate-400"></span>
      </div>
    </div>
  );
};

export default WelcomeScreen;
