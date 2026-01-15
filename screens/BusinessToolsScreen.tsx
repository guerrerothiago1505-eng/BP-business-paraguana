
import React, { useState } from 'react';

const BusinessToolsScreen: React.FC<{onBack: () => void, onNavigate: (v: any) => void, onSelectService?: (t: string, c: string) => void}> = ({ onBack, onNavigate, onSelectService }) => {
  const [showToast, setShowToast] = useState(false);

  const notifyTeam = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="pb-10 bg-brand-beige min-h-screen relative overflow-y-auto no-scrollbar">
      {showToast && (
        <div className="toast-notification w-72 bg-brand-slate text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-brand-gold/30">
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-brand-slate text-xs font-black">!</div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Notificación enviada</p>
            <p className="text-[9px] text-slate-300 uppercase leading-tight mt-1">El equipo de Business Paraguaná ha recibido tu solicitud empresarial.</p>
          </div>
        </div>
      )}

      <div className="red-gradient text-white p-8 pt-12 rounded-b-[50px] shadow-2xl mb-8 relative overflow-hidden">
        <button onClick={onBack} className="mb-6 bg-white/10 backdrop-blur-md p-3 rounded-2xl text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          PRINCIPAL
        </button>
        <h1 className="text-4xl font-display font-black mb-2 tracking-tighter uppercase">Negocios</h1>
        <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Consolidación Empresarial</p>
      </div>

      <div className="px-6 space-y-6">
        {/* 1. ASESORÍA LEGAL (PRINCIPAL) */}
        <section className="bg-brand-slate p-8 rounded-[44px] border border-brand-gold/30 shadow-premium group active:scale-[0.99] transition-all relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-24 h-24 text-brand-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 12.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
           </div>
           <div className="flex items-center gap-5 mb-4 relative z-10">
              <div className="w-16 h-16 gold-gradient rounded-3xl flex items-center justify-center text-3xl shadow-lg border border-white/20">⚖️</div>
              <div>
                <h3 className="font-display font-black text-white text-xl uppercase tracking-tighter">Asesoría Legal</h3>
                <p className="text-[9px] text-brand-gold font-black uppercase tracking-[0.3em]">Servicio Prioritario BP</p>
              </div>
           </div>
           <p className="text-xs text-slate-400 mb-6 leading-relaxed font-medium relative z-10">Protección jurídica de activos y consultoría estratégica para el éxito de sus operaciones en la península.</p>
           <button onClick={notifyTeam} className="w-full gold-gradient text-brand-slate py-5 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl relative z-10 active:scale-95 transition-all">Solicitar Consulta Ejecutiva</button>
        </section>

        {/* RESTO DE OPCIONES (ORDEN ALFABÉTICO) */}
        <div className="space-y-4">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-4 mb-2">Cartera de Activos y Gestiones</p>
           
           {/* Alquiler de Maquinarias */}
           <section className="bg-white p-6 rounded-[36px] border border-slate-50 shadow-premium">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shadow-inner">🚜</div>
                    <div>
                       <h4 className="font-display font-black text-brand-slate text-sm uppercase tracking-tight">Alquiler de Maquinarias</h4>
                       <p className="text-[8px] text-brand-gold font-black uppercase tracking-widest">Maquinaria Pesada</p>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => onSelectService?.('Cotización Maquinaria', 'Maquinaria')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-gold transition-all group"
              >
                <span className="text-[9px] font-black text-brand-slate uppercase tracking-widest">Solicitar Cotización</span>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-brand-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
           </section>

           <BusinessItem icon="🏢" title="Gestión Arrendataria" subtitle="Administración de Rentas" />
           <BusinessItem icon="🏠" title="Publicar Inmueble" subtitle="Cartera Inmobiliaria" onClick={() => onNavigate('post-property')} />
           <BusinessItem icon="🚗" title="Publicar Vehículo" subtitle="Cartera de Vehículos" onClick={() => onNavigate('post-vehicle')} />
           <BusinessItem icon="📦" title="Suministro Empresarial" subtitle="Procuras y Logística" />
        </div>
      </div>
    </div>
  );
};

const BusinessItem = ({ icon, title, subtitle, onClick }: any) => (
  <button onClick={onClick} className="w-full bg-white p-6 rounded-[36px] border border-slate-50 shadow-premium flex items-center gap-5 active:scale-95 transition-all text-left group">
     <div className="w-14 h-14 bg-brand-beige rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:bg-brand-red/5 transition-colors">{icon}</div>
     <div className="flex-1">
        <h4 className="font-display font-black text-brand-slate text-md uppercase tracking-tight leading-none mb-1">{title}</h4>
        <p className="text-[9px] text-brand-gold font-black uppercase tracking-widest">{subtitle}</p>
     </div>
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-200 group-hover:text-brand-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
     </svg>
  </button>
);

export default BusinessToolsScreen;
