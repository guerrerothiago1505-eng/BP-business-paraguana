
import React, { useState } from 'react';
import { Listing } from '../types';
import Logo from '../components/Logo';

interface ListingDetailScreenProps {
  listing: Listing | null;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onContact: () => void;
}

const ListingDetailScreen: React.FC<ListingDetailScreenProps> = ({ 
  listing, 
  onBack, 
  isFavorite, 
  onToggleFavorite,
  onContact 
}) => {
  const [showToast, setShowToast] = useState(false);

  if (!listing) return null;

  const handleRequestAssistance = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white pb-32 relative">
      {showToast && (
        <div className="toast-notification w-72 bg-brand-slate text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-brand-gold/30">
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-brand-slate text-xs font-black">!</div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Interés Registrado</p>
            <p className="text-[9px] text-slate-300 uppercase leading-tight mt-1">Nuestro equipo ha recibido tu solicitud de acompañamiento para este activo.</p>
          </div>
        </div>
      )}

      <div className="relative h-80">
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start pt-10">
          <button 
            onClick={onBack} 
            className="p-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-8 -mt-10 relative z-10 bg-white rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-4">
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">{listing.category} • {listing.type}</span>
            <h1 className="text-2xl font-display font-bold text-brand-slate mt-1 leading-tight">{listing.title}</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">{listing.location}</p>
          </div>
          <div className="text-right">
             <p className="text-2xl font-black text-brand-red">${listing.price.toLocaleString()}</p>
             <button 
              onClick={onToggleFavorite}
              className={`mt-2 p-2 rounded-xl border transition-all ${isFavorite ? 'bg-brand-red/5 border-brand-red text-brand-red' : 'bg-slate-50 border-slate-100 text-slate-300'}`}
             >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
             </button>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full mb-8"></div>

        {/* BP Verification Card */}
        <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 relative overflow-hidden">
           <div className="flex items-center gap-5 mb-5 relative z-10">
              <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-lg border border-slate-50">
                 <Logo />
              </div>
              <div>
                 <h4 className="font-bold text-brand-slate text-sm">Activo Verificado por BP</h4>
                 <p className="text-[10px] text-brand-red font-black uppercase tracking-widest mt-0.5">Gestión 100% Segura</p>
              </div>
           </div>
           
           <p className="text-[11px] text-slate-500 leading-relaxed mb-6 italic relative z-10">
             "Cada listado en nuestra plataforma pasa por una auditoría física y legal previa por parte de nuestro equipo ejecutivo."
           </p>

           <button 
             onClick={handleRequestAssistance}
             className="w-full red-gradient text-white py-4 rounded-2xl font-bold shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 border-b-4 border-brand-redDark uppercase tracking-widest text-[10px]"
           >
              Solicitar Acompañamiento
           </button>
           
           <div className="absolute right-[-30px] top-[-30px] w-32 h-32 opacity-[0.03]">
             <Logo />
           </div>
        </div>

        <div className="mt-8 space-y-6">
           <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Descripción del Activo</h3>
           <p className="text-sm text-slate-500 leading-relaxed">
             {listing.description}
           </p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailScreen;
