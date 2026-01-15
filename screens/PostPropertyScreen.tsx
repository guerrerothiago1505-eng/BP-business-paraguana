
import React, { useState } from 'react';
import Logo from '../components/Logo';
import LegalContractModal from '../components/LegalContractModal';

interface PostPropertyScreenProps {
  onBack: () => void;
}

const PostPropertyScreen: React.FC<PostPropertyScreenProps> = ({ onBack }) => {
  const [showToast, setShowToast] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [acceptedContract, setAcceptedContract] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    type: 'Venta',
    description: '',
    location: 'Puerta Maraven'
  });

  const handleSubmit = () => {
    if (!acceptedContract) {
      alert('Debe aceptar el Contrato de Respaldo y Normativas BP para continuar.');
      return;
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onBack();
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-brand-beige animate-in slide-in-from-right duration-300 relative overflow-y-auto no-scrollbar">
      <LegalContractModal isOpen={showLegal} onClose={() => setShowLegal(false)} />
      
      {showToast && (
        <div className="toast-notification w-72 bg-brand-slate text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-brand-gold/30">
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-brand-slate text-xs font-black">!</div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Notificación enviada</p>
            <p className="text-[9px] text-slate-300 uppercase leading-tight mt-1">El equipo de Business Paraguaná ha recibido tu publicación de inmueble.</p>
          </div>
        </div>
      )}

      <header className="p-6 pt-10 border-b border-white/50 flex items-center gap-4 bg-white/20 backdrop-blur-md sticky top-0 z-20">
        <button onClick={onBack} className="p-2 bg-white rounded-xl text-slate-600 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-display font-black text-brand-slate uppercase tracking-tight">Publicar Inmueble</h2>
      </header>

      <div className="p-6 space-y-6 pb-32 max-w-screen-md mx-auto">
        <section>
          <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block mb-4 px-1">Fotos del Inmueble (4-8 recomendadas)</label>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square bg-white border-2 border-dashed border-brand-gold/30 rounded-3xl flex flex-col items-center justify-center text-brand-red active:scale-95 transition-all shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-[9px] font-black mt-1 uppercase tracking-widest">Añadir</span>
            </div>
            {[1, 2].map(i => (
              <div key={i} className="aspect-square bg-white rounded-3xl relative overflow-hidden group shadow-sm">
                 <img src={`https://picsum.photos/seed/prop${i}/200`} alt="preview" className="w-full h-full object-cover" />
                 <button className="absolute top-2 right-2 p-1.5 bg-brand-red text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-4 bg-white/40 p-6 rounded-[40px] border border-white/60 shadow-premium">
          <InputGroup label="Título descriptivo" placeholder="Ej. Casa moderna con piscina" />
          <div className="grid grid-cols-2 gap-4">
             <InputGroup label="Precio (USD)" type="number" placeholder="45,000" />
             <div className="group">
                <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block mb-2 px-1">Tipo</label>
                <div className="relative">
                  <select className="w-full p-4 bg-white border border-slate-100 rounded-[24px] font-black text-xs text-brand-slate outline-none focus:ring-2 focus:ring-brand-gold shadow-premium appearance-none">
                    <option>Venta</option>
                    <option>Alquiler</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
             </div>
          </div>
          <InputGroup label="Ubicación" placeholder="Puerta Maraven, Calle 5" />
          <div>
            <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block mb-2 px-1">Descripción</label>
            <textarea 
              rows={4} 
              className="w-full p-5 bg-white border border-slate-100 rounded-[32px] outline-none focus:ring-2 focus:ring-brand-gold shadow-premium text-xs font-medium"
              placeholder="Detalla las características del inmueble..."
            ></textarea>
          </div>
        </div>

        {/* BLOQUE DE RESPALDO LEGAL */}
        <div className="bg-brand-slate p-6 rounded-[32px] border border-brand-gold/20 shadow-xl space-y-4">
           <div className="flex items-start gap-4">
              <input 
                type="checkbox" 
                checked={acceptedContract}
                onChange={(e) => setAcceptedContract(e.target.checked)}
                className="mt-1 w-5 h-5 rounded-lg border-brand-gold text-brand-red focus:ring-brand-gold accent-brand-gold transition-all"
              />
              <div className="flex-1">
                 <p className="text-[10px] font-medium text-slate-300 leading-relaxed">
                    Autorizo a BP para publicar este activo y declaro conocer la normativa de gestión y porcentajes de comisión de cierre.
                 </p>
                 <button 
                  onClick={() => setShowLegal(true)}
                  className="text-[9px] font-black text-brand-gold uppercase tracking-widest mt-2 border-b border-brand-gold/30"
                 >
                    Ver Contrato de Resguardo y Normas ⚖️
                 </button>
              </div>
           </div>
        </div>

        <button 
          onClick={handleSubmit}
          className={`w-full py-6 rounded-[32px] font-black text-sm shadow-2xl transition-all uppercase tracking-widest border-b-4 ${acceptedContract ? 'red-gradient text-white border-brand-redDark active:scale-95' : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}
        >
          Confirmar y Publicar
        </button>
        <p className="text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.2em] mt-4">
          Un asesor validará tu propiedad en menos de 24 horas.
        </p>
      </div>
    </div>
  );
};

const InputGroup = ({ label, placeholder, type = 'text' }: any) => (
  <div className="group">
    <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block mb-2 px-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full p-5 bg-white border border-slate-100 rounded-[24px] font-black text-xs text-brand-slate outline-none focus:ring-2 focus:ring-brand-gold transition-all shadow-premium"
    />
  </div>
);

export default PostPropertyScreen;
