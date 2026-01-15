
import React, { useState, useEffect } from 'react';
import { Listing, User } from '../types';
import Logo from '../components/Logo';

interface HomeScreenProps {
  onNavigate: (view: any) => void;
  onListingClick: (listing: Listing) => void;
  historyIds: string[];
  user: User | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onListingClick, historyIds, user }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [rates, setRates] = useState({ usd: '0.00', eur: '0.00', loading: true });

  // Sincronización de tasas oficiales BCV - Proyección 2026
  useEffect(() => {
    const fetchRates = async () => {
      // Simulación de delay de red para realismo
      setTimeout(() => {
        setRates({
          usd: '339.14',
          eur: '395.26',
          loading: false
        });
      }, 1000);
    };
    fetchRates();
  }, []);

  const now = new Date();
  const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  const currentMonth = monthNames[now.getMonth()].substring(0, 3);
  const currentDay = now.getDate();
  const currentYear = now.getFullYear();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const days = [];
  const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10"></div>);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === now.getDate() && viewDate.getMonth() === now.getMonth() && viewDate.getFullYear() === now.getFullYear();
    days.push(
      <div key={d} className="h-10 flex items-center justify-center relative cursor-default">
        {isToday && <div className="absolute inset-2 bg-brand-red rounded-xl -z-10 shadow-lg shadow-brand-red/30"></div>}
        <span className={`text-xs font-black ${isToday ? 'text-white' : 'text-brand-slate'}`}>{d}</span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-10 pb-24 bg-brand-beige min-h-screen relative max-w-screen-xl mx-auto">
      {showCalendar && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-brand-slate/60 backdrop-blur-md" onClick={() => setShowCalendar(false)}></div>
          <div className="bg-brand-beige w-full max-w-sm rounded-[44px] shadow-2xl border border-white overflow-hidden relative animate-in zoom-in-95 duration-300">
            <div className="red-gradient p-8 text-white text-center">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-80">Calendario Ejecutivo</h3>
              <div className="flex items-center justify-between">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="text-xl font-display font-black tracking-tight">
                  {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                </div>
                <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => (
                  <div key={d} className="text-center text-[9px] font-black text-brand-gold uppercase tracking-widest opacity-60">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days}
              </div>
              <button 
                onClick={() => setShowCalendar(false)}
                className="w-full mt-8 bg-brand-slate text-white py-4 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-brand-red transition-all"
              >
                Cerrar Agenda
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="flex justify-between items-center mb-10 pt-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-premium p-1.5 flex items-center justify-center border border-white/50">
             <Logo showText={false} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-lg font-display font-black text-brand-slate tracking-tight leading-tight uppercase">
              Hola, {user?.fullName.split(' ')[0] || 'Aliado'}
            </h1>
            <p className="text-[9px] font-black text-brand-red uppercase tracking-[0.2em] mt-1">
              {user?.membership === 'VIP_MASTER' ? 'Consola Maestra Activa' : 'Membresía VIP Activa'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tasas de Cambio BCV - Versión Desktop con Enlace */}
          <div className="hidden sm:flex flex-col items-end gap-1 px-4 py-2 bg-white/40 rounded-2xl border border-white/60">
            <a 
              href="http://www.bcv.org.ve/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[7px] font-black text-brand-gold uppercase tracking-[0.2em] hover:text-brand-red transition-colors mb-1"
            >
              Fuente: bcv.org.ve 🔗
            </a>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-black text-slate-400">USD</span>
                <span className={`text-[12px] font-mono font-bold text-brand-slate ${rates.loading ? 'animate-pulse' : ''}`}>
                  {rates.usd}
                </span>
              </div>
              <div className="w-px h-3 bg-slate-300"></div>
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-black text-slate-400">EUR</span>
                <span className={`text-[12px] font-mono font-bold text-brand-slate ${rates.loading ? 'animate-pulse' : ''}`}>
                  {rates.eur}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              setViewDate(new Date());
              setShowCalendar(true);
            }}
            className="flex-shrink-0 flex flex-col items-center active:scale-90 transition-transform cursor-pointer"
          >
            <div className="w-14 h-14 bg-white rounded-2xl shadow-premium border border-white overflow-hidden flex flex-col">
              <div className="bg-brand-red h-5 w-full flex items-center justify-center">
                <span className="text-[8px] font-black text-white tracking-widest">{currentMonth}</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center leading-none">
                <span className="text-xl font-display font-black text-brand-slate">{currentDay}</span>
                <span className="text-[6px] font-black text-brand-gold mt-0.5 tracking-tighter">{currentYear}</span>
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Ticker Móvil Actualizado 2026 */}
      <div className="sm:hidden mb-6">
         <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-6 px-6 py-2.5 bg-white/60 backdrop-blur-md rounded-full border border-white shadow-sm">
               <div className="flex items-center gap-2">
                 <span className="text-[7px] font-black text-brand-gold uppercase tracking-widest">USD</span>
                 <span className="text-[11px] font-mono font-bold text-brand-slate">{rates.usd}</span>
               </div>
               <div className="w-px h-4 bg-slate-200"></div>
               <div className="flex items-center gap-2">
                 <span className="text-[7px] font-black text-brand-gold uppercase tracking-widest">EUR</span>
                 <span className="text-[11px] font-mono font-bold text-brand-slate">{rates.eur}</span>
               </div>
            </div>
            <a 
              href="http://www.bcv.org.ve/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[6px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-brand-red"
            >
              Verificar en bcv.org.ve
            </a>
         </div>
      </div>

      <section className="mb-10 animate-in slide-in-from-top duration-700">
         <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-1.5 h-6 gold-gradient rounded-full"></div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Mensajes del Aliado</h3>
         </div>
         <div className="bg-white p-6 rounded-[44px] shadow-premium border border-slate-50 relative overflow-hidden group">
            <div className="flex items-start gap-5">
               <div className="w-12 h-12 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center text-xl shrink-0">✉️</div>
               <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                     <h4 className="text-xs font-black text-brand-slate uppercase tracking-tight">Bienvenido a Business Paraguaná</h4>
                     <span className="text-[8px] font-bold text-slate-300">AHORA</span>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed font-medium">Hemos enviado sus credenciales y el manual de aliado VIP a {user?.email || 'su correo'}. Por favor revise su bandeja...</p>
               </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end">
               <button className="text-[9px] font-black text-brand-gold uppercase tracking-widest flex items-center gap-2">
                  Ver por correo <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
               </button>
            </div>
         </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
          <SectionCard 
            title="Mercado Virtual" 
            subtitle="Activos y Bienes de Alto Valor"
            image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
            isMain={true}
            label="EXPLORAR"
            onClick={() => onNavigate('realestate')}
          />
        </div>
        
        <SectionCard 
          title="Negocios" 
          subtitle="Consolidación"
          image="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80"
          onClick={() => onNavigate('business')}
        />
        <SectionCard 
          title="Servicios" 
          subtitle="Gestión y Trámites"
          image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80"
          onClick={() => onNavigate('services')}
        />
      </div>

      <section className="bg-white/70 backdrop-blur-sm p-6 sm:p-10 rounded-[44px] shadow-premium border border-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] scale-150 pointer-events-none">
          <Logo showText={false} />
        </div>
        <div className="flex items-center gap-3 mb-8 relative z-10">
           <div className="w-1.5 h-6 red-gradient rounded-full"></div>
           <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Acciones VIP</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
           <QuickAction icon="🏢" label="Legal" onClick={() => onNavigate('services')} />
           <QuickAction icon="⚖️" label="Notaría" onClick={() => onNavigate('services')} />
           <QuickAction icon="🏛️" label="Catastro" onClick={() => onNavigate('services')} />
           <QuickAction icon="🤝" label="PYME" onClick={() => onNavigate('business')} />
           <QuickAction icon="🏗️" label="Obras" onClick={() => onNavigate('services')} />
           <QuickAction icon="📝" label="DOCUMENTOS" onClick={() => onNavigate('services')} />
        </div>
      </section>

      <div className="mt-10 red-gradient p-6 sm:p-10 rounded-[50px] text-white flex flex-col sm:flex-row items-center justify-between shadow-2xl relative overflow-hidden group gap-6">
         <div className="relative z-10 text-center sm:text-left">
            <h4 className="font-display font-black text-xl sm:text-2xl tracking-tight">Concierge Activo</h4>
            <p className="text-[10px] sm:text-xs opacity-70 uppercase tracking-[0.2em] mt-2 font-bold">Respuesta prioritaria en la Península</p>
         </div>
         <button onClick={() => onNavigate('chat')} className="relative z-10 bg-white text-brand-red px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
           Chat VIP
         </button>
         <div className="absolute right-[-40px] bottom-[-40px] w-64 h-64 opacity-[0.08] rotate-12 pointer-events-none">
           <Logo showText={false} />
         </div>
      </div>
    </div>
  );
};

const SectionCard = ({ title, subtitle, image, isMain, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`relative w-full rounded-[48px] overflow-hidden shadow-premium active:scale-[0.98] transition-all text-left group border border-white/20 ${isMain ? 'h-64 sm:h-80' : 'h-48'}`}
  >
    <img src={image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-slate via-brand-slate/30 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 sm:p-10">
      <h4 className={`font-display font-black text-white leading-tight ${isMain ? 'text-2xl sm:text-4xl tracking-tight' : 'text-xl'}`}>{title}</h4>
      <p className="text-brand-goldLight text-[10px] font-black uppercase tracking-[0.3em] mt-2 opacity-90">{subtitle}</p>
    </div>
    {isMain && (
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 gold-gradient text-brand-slate text-[9px] font-black px-6 py-3 rounded-full uppercase tracking-[0.3em] shadow-2xl">
        {label || 'ALTO VALOR'}
      </div>
    )}
  </button>
);

const QuickAction = ({ icon, label, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center group">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-[32px] shadow-sm border border-slate-50 flex items-center justify-center text-2xl sm:text-3xl mb-3 group-hover:bg-brand-red group-hover:text-white transition-all active:scale-90 duration-300">
      {icon}
    </div>
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{label}</span>
  </button>
);

export default HomeScreen;
