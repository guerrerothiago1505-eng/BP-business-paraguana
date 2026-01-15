
import React from 'react';

interface LegalContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalContractModal: React.FC<LegalContractModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-brand-slate/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl h-[80vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-300 border border-white/20">
        
        {/* Header del Contrato */}
        <div className="red-gradient p-8 text-white relative shrink-0">
          <div className="flex justify-between items-start mb-4">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">⚖️</div>
             <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
          <h2 className="text-2xl font-display font-black uppercase tracking-tight">Contrato de Resguardo</h2>
          <p className="text-[10px] font-black text-brand-goldLight uppercase tracking-[0.3em] mt-1 opacity-80">Normativa de Gestión y Comisión de Venta</p>
        </div>

        {/* Cuerpo del Contrato (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-10 space-y-8 no-scrollbar bg-slate-50/50">
          <section className="space-y-4">
            <h3 className="text-xs font-black text-brand-slate uppercase tracking-widest border-b border-brand-gold/20 pb-2">1. OBJETO DEL MANDATO</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify font-medium">
              El presente contrato tiene por objeto autorizar de manera expresa a <b>BUSINESS PARAGUANÁ (BP)</b> para la gestión, publicación y promoción del activo (Inmueble, Vehículo o Maquinaria) cargado por EL ALIADO en la plataforma digital. BP actuará como facilitador estratégico y mediador en la negociación.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-black text-brand-slate uppercase tracking-widest border-b border-brand-gold/20 pb-2">2. COMISIÓN POR CIERRE DE VENTA</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify font-medium">
              EL ALIADO acepta y reconoce que, al concretarse la venta o arrendamiento del activo publicado a través del acompañamiento de BP, se generará una comisión de corretaje establecida bajo los siguientes parámetros:
            </p>
            <ul className="space-y-2 text-[11px] font-bold text-brand-slate pl-4">
              <li>• Inmuebles: 5% sobre el precio final de venta.</li>
              <li>• Vehículos/Maquinaria: Porcentaje pactado individualmente (3% a 5%).</li>
              <li>• Arrendamientos: Equivalente al primer mes de canon de arrendamiento.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-black text-brand-slate uppercase tracking-widest border-b border-brand-gold/20 pb-2">3. VERACIDAD Y RESPONSABILIDAD</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify font-medium">
              EL ALIADO garantiza que es el propietario legítimo o posee los derechos legales para la comercialización del activo. EL ALIADO exonera a BP de cualquier responsabilidad derivada de vicios ocultos, gravámenes no declarados o falsedad en los datos suministrados. BP se reserva el derecho de retirar cualquier publicación que no cumpla con los estándares éticos o legales.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-black text-brand-slate uppercase tracking-widest border-b border-brand-gold/20 pb-2">4. PROPIEDAD INTELECTUAL Y USO DE MARCA</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify font-medium">
              Toda pieza publicitaria, fotografía editada con la marca BP o material audiovisual generado para la promoción del activo es propiedad exclusiva de BUSINESS PARAGUANÁ. Su uso en otras plataformas sin autorización será causa de rescisión del servicio.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-black text-brand-slate uppercase tracking-widest border-b border-brand-gold/20 pb-2">5. JURISDICCIÓN</h3>
            <p className="text-xs text-slate-600 leading-relaxed text-justify font-medium">
              Para todos los efectos legales derivados de este contrato, las partes eligen como domicilio especial la ciudad de Punto Fijo, Estado Falcón, Venezuela.
            </p>
          </section>
        </div>

        {/* Footer de Acción */}
        <div className="p-8 bg-white border-t border-slate-100 flex flex-col gap-4 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 bg-brand-gold/5 rounded-2xl border border-brand-gold/10">
             <span className="text-lg">🛡️</span>
             <p className="text-[9px] text-brand-gold font-black uppercase tracking-widest leading-tight">Usted está aceptando un documento con validez jurídica digital.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-full red-gradient text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all"
          >
            Entendido y Acepto
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalContractModal;
