
import React from 'react';
import Logo from '../components/Logo';

interface AboutUsScreenProps {
  onBack: () => void;
}

const AboutUsScreen: React.FC<AboutUsScreenProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white animate-in slide-in-from-right duration-300 pb-20 overflow-y-auto no-scrollbar">
      {/* Header Editorial */}
      <header className="relative h-80 overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1512418490979-92798ccc1380?auto=format&fit=crop&w=1000&q=80" 
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" 
            alt="Business Executive"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
         <button onClick={onBack} className="absolute top-10 left-6 p-3 bg-white/90 rounded-2xl shadow-xl border border-slate-100 z-10 active:scale-95 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
         </button>
         <div className="absolute bottom-10 left-8">
            <h1 className="text-4xl sm:text-6xl font-display font-black text-brand-slate tracking-tighter uppercase leading-none">Nuestro<br/>Legado</h1>
            <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] mt-2">Talento Paraguanero para el Mundo</p>
         </div>
      </header>

      <main className="px-8 space-y-12">
         {/* Narrativa Principal */}
         <section className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-px bg-brand-red"></div>
               <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">Desde el Corazón de la Península</span>
            </div>
            <p className="text-xl font-display font-medium text-brand-slate leading-relaxed">
               Nacemos de la tierra del sol y el viento, con un ADN forjado por <span className="text-brand-red font-black">más de 10 años</span> de experiencia ininterrumpida en el sector comercial, inmobiliario y de servicios.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
               Business Paraguaná no es solo una plataforma; es la convergencia perfecta entre el rigor legal y la precisión técnica. Somos un equipo interdisciplinario de <span className="text-brand-slate font-bold">Abogados e Ingenieros</span> que entendió que la atención exclusiva va mucho más allá de ofrecer un café.
            </p>
         </section>

         {/* Los Pilares de la Revolución Digital */}
         <section className="bg-slate-50 p-8 rounded-[48px] border border-slate-100 space-y-8">
            <h2 className="text-center font-display font-black text-2xl text-brand-slate uppercase tracking-tighter">Propósito Estratégico</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <Feature icon="⚡" title="Adiós al Papeleo" desc="Simplificamos lo complejo. Procesos directos y 100% digitales que se adaptan a tu ritmo de vida." />
               <Feature icon="🛡️" title="Comunidad Verificada" desc="Un entorno seguro de compra y venta con perfiles auditados para garantizar transacciones reales." />
               <Feature icon="🔍" title="Transparencia Total" desc="Cada solicitud y gestión está blindada por un sistema de trazabilidad impecable." />
               <Feature icon="📱" title="Practicidad Bancaria" desc="Diseñada con la misma facilidad y confianza con la que realizas tus pagos diarios." />
            </div>
         </section>

         {/* Misión y Visión Editorial */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] border-b border-brand-gold/20 pb-2">Nuestra Misión</h3>
               <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Dotar al inversor y al ciudadano de Paraguaná de una herramienta de gestión soberana, donde la data de sus activos esté a su alcance con un solo clic, eliminando barreras burocráticas mediante innovación constante.
               </p>
            </div>
            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] border-b border-brand-gold/20 pb-2">Nuestra Visión</h3>
               <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Convertirnos en el estándar regional de negocios digitales, donde la confianza no se asuma, sino que se verifique a través de nuestra infraestructura tecnológica y respaldo humano experto.
               </p>
            </div>
         </div>

         {/* Cierre y Firma */}
         <footer className="pt-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 grayscale opacity-30">
               <Logo showText={false} />
            </div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Business Paraguaná © 2024</p>
            <p className="text-[8px] text-brand-gold font-bold mt-1">EXCLUSIVIDAD • SEGURIDAD • INNOVACIÓN</p>
         </footer>
      </main>
    </div>
  );
};

const Feature = ({ icon, title, desc }: any) => (
   <div className="space-y-3">
      <div className="w-12 h-12 bg-white rounded-2xl shadow-premium flex items-center justify-center text-2xl">{icon}</div>
      <h4 className="font-display font-black text-brand-slate uppercase text-sm tracking-tight">{title}</h4>
      <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{desc}</p>
   </div>
);

export default AboutUsScreen;
