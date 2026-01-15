
import React, { useState } from 'react';

interface ServicesScreenProps {
  onBack: () => void;
  onSelectService: (title: string, category: string) => void;
}

const ServicesScreen: React.FC<ServicesScreenProps> = ({ onBack, onSelectService }) => {
  return (
    <div className="pb-24 bg-brand-beige min-h-screen overflow-y-auto no-scrollbar">
      <div className="bg-brand-slate text-white p-8 pt-12 rounded-b-[50px] shadow-2xl mb-8 relative overflow-hidden">
        <button onClick={onBack} className="mb-6 bg-white/10 backdrop-blur-md p-3 rounded-2xl text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Principal
        </button>
        <h1 className="text-4xl font-display font-black mb-2 tracking-tighter uppercase leading-none">Servicios</h1>
        <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em]">Gestión y Trámites Especializados</p>
      </div>

      <div className="px-6 space-y-10 max-w-screen-xl mx-auto pb-10">
        
        {/* Infraestructura */}
        <section>
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-1.5 h-6 red-gradient rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Infraestructura</h3>
          </div>
          <div className="bg-white p-6 rounded-[44px] shadow-premium border border-slate-50">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-brand-red/5 rounded-2xl flex items-center justify-center text-3xl">🏗️</div>
                <div>
                   <h4 className="text-sm font-black text-brand-slate uppercase tracking-tight">Construcción y Mejoras</h4>
                   <p className="text-[9px] text-slate-400 font-bold uppercase">Proyectos de Obra Civil</p>
                </div>
             </div>
             <button 
                onClick={() => onSelectService('Cotización de Construcción', 'Construccion')}
                className="w-full bg-brand-slate text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                 <span>💰</span> Solicitar Cotización
             </button>
          </div>
        </section>

        {/* Registros Especializados */}
        <section>
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-1.5 h-6 gold-gradient rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Registros de Propiedad y Comercio</h3>
          </div>
          <div className="space-y-4">
             <ServiceCard 
               icon="🏢" 
               title="Registro Mercantil" 
               desc="Creación y modificación de empresas." 
               onClick={() => onSelectService('Registro Mercantil', 'Mercantil')}
             />
             <ServiceCard 
               icon="🏠" 
               title="Registro Inmobiliario" 
               desc="Protocolización y Catastro técnico." 
               onClick={() => onSelectService('Registro Inmobiliario', 'Inmobiliario')}
             />
             <ServiceCard 
               icon="📝" 
               title="DOCUMENTOS" 
               desc="Trámites administrativos y legales." 
               onClick={() => onSelectService('Documentación General', 'Documentos')}
             />
          </div>
        </section>

        {/* Avalúos y Notaría */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ServiceCard 
            icon="📏" 
            title="Avalúos Técnicos" 
            desc="Residencial, Comercial e Industrial." 
            onClick={() => onSelectService('Avalúo Técnico', 'Avaluos')}
          />
          <ServiceCard 
            icon="✍️" 
            title="Gestión Notarial" 
            desc="Poderes, Contratos y Permisos." 
            onClick={() => onSelectService('Notaría y Visados', 'Notaría')}
          />
        </section>

        {/* NUEVA SECCIÓN: GESTIÓN DE PAGOS */}
        <section className="mt-4">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-1.5 h-6 bg-brand-slate rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Gestión de Pagos</h3>
          </div>
          <div className="bg-brand-slate p-8 rounded-[44px] shadow-xl border border-brand-gold/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
               <svg className="w-32 h-32 text-brand-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
            </div>
            
            <div className="relative z-10 mb-6">
              <h4 className="text-white font-display font-black text-lg tracking-tight uppercase">Servicios Públicos</h4>
              <p className="text-brand-gold text-[9px] font-black uppercase tracking-widest mt-1">Consulta y Pago de Deuda en la Región</p>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <PaymentButton icon="🏛️" label="Alcaldía" onClick={() => onSelectService('Pago Alcaldía', 'PagoServicios')} />
              <PaymentButton icon="🚮" label="Imaseo" onClick={() => onSelectService('Pago Imaseo', 'PagoServicios')} />
              <PaymentButton icon="⚡" label="Corpoelec" onClick={() => onSelectService('Pago Corpoelec', 'PagoServicios')} />
              <PaymentButton icon="💧" label="Hidrofalcón" onClick={() => onSelectService('Pago Hidrofalcón', 'PagoServicios')} />
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.2em]">Solicita tu estado de cuenta y nuestro equipo te notificará el monto exacto por email.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, desc, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full bg-white p-6 rounded-[40px] shadow-premium border border-slate-50 flex items-center gap-6 active:scale-[0.98] transition-all text-left group hover:border-brand-gold/30"
  >
    <div className="w-16 h-16 bg-brand-beige rounded-3xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-display font-black text-brand-slate text-lg uppercase tracking-tight leading-none mb-2">{title}</h4>
      <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{desc}</p>
    </div>
    <div className="p-2 rounded-full bg-slate-50 text-slate-200 group-hover:bg-brand-red/5 group-hover:text-brand-red transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </button>
);

const PaymentButton = ({ icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className="bg-white/5 border border-white/10 p-4 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-white/10 active:scale-95 transition-all group"
  >
    <div className="text-2xl group-hover:scale-110 transition-transform">{icon}</div>
    <span className="text-[9px] font-black text-white uppercase tracking-widest">{label}</span>
  </button>
);

export default ServicesScreen;
