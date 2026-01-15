
import React, { useState } from 'react';
import Logo from '../components/Logo';
import NotificationService from '../services/NotificationService';

interface ServiceFormScreenProps {
  service: { title: string, category: string } | null;
  onBack: () => void;
}

const ServiceFormScreen: React.FC<ServiceFormScreenProps> = ({ service, onBack }) => {
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    contract: '',
    idNumber: '',
    address: '',
    additionalInfo: ''
  });

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(true);
      
      // Simulación de notificación Push nativa enviada al dispositivo
      const isPayment = service.category === 'PagoServicios';
      
      setTimeout(() => {
        setLoading(false);
        setShowToast(true);
        
        // Simular respuesta del servidor para notificaciones iOS/Android
        console.log(`[PUSH NOTIFICATION] Enviada a dispositivo: Tu solicitud para ${service.title} ha sido recibida.`);
        
        setTimeout(() => {
          setShowToast(false);
          onBack();
        }, 4000);
      }, 1500);
    }, 500);
  };

  const renderFields = () => {
    switch (service.category) {
      case 'PagoServicios':
        return (
          <>
            <div className="bg-brand-slate p-6 rounded-[32px] border border-brand-gold/20 mb-6">
              <p className="text-[9px] text-brand-gold font-black uppercase tracking-[0.2em] mb-4">Información del Suministro</p>
              <div className="space-y-4">
                <InputGroup 
                  label="Número de Contrato / Cuenta" 
                  placeholder="Ej. 1000456789" 
                  value={formData.contract}
                  onChange={(v: string) => setFormData({...formData, contract: v})}
                />
                <InputGroup 
                  label="Cédula de Identidad del Titular" 
                  placeholder="V-00.000.000" 
                  value={formData.idNumber}
                  onChange={(v: string) => setFormData({...formData, idNumber: v})}
                />
                <div>
                  <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block mb-2 px-1">Dirección del Servicio</label>
                  <textarea 
                    className="w-full p-5 bg-white border border-slate-100 rounded-[32px] outline-none focus:ring-2 focus:ring-brand-gold shadow-premium text-xs font-medium"
                    rows={3}
                    placeholder="Sector, calle y número de casa/apto..."
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="bg-white/60 p-6 rounded-[32px] border border-white/80">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1">Notas adicionales (opcional)</label>
              <textarea 
                className="w-full p-5 bg-white border border-slate-100 rounded-[32px] outline-none focus:ring-2 focus:ring-brand-gold shadow-premium text-xs font-medium"
                rows={2}
                placeholder="Indique si tiene pagos pendientes de meses anteriores..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
              ></textarea>
            </div>
          </>
        );
      case 'Mercantil':
        return (
          <>
            <SelectGroup label="Tipo de Trámite" options={['Constitución de Empresa', 'Aumento de Capital', 'Venta de Acciones', 'Cambio de Junta Directiva', 'Cierre de Ejercicio']} />
            <InputGroup label="Denominación Comercial / RIF" placeholder="Ej. Inversiones Paraguaná C.A." />
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Capital Social (Bs/USD)" placeholder="Monto aproximado" type="number" />
              <SelectGroup label="Ubicación Registro" options={['Punto Fijo', 'Coro', 'Nacional']} />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block px-1">Carga de Data Mercantil</label>
               <UploadBox label="Acta Constitutiva / Estatutos" />
               <UploadBox label="Cédula de los Accionistas" />
            </div>
          </>
        );
      case 'Inmobiliario':
        return (
          <>
            <SelectGroup label="Trámite Inmobiliario" options={['Protocolización de Compra-Venta', 'Inscripción de Título Supletorio', 'Cédula Catastral Nueva', 'Solvencia Municipal']} />
            <InputGroup label="Ubicación del Inmueble" placeholder="Ej. Puerta Maraven, Sector C, Vía Principal" />
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="N° Expediente Catastral" placeholder="Si posee" />
              <InputGroup label="Metraje Terreno (m2)" placeholder="Ej. 250" type="number" />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block px-1">Documentación Técnica</label>
               <UploadBox label="Documento de Propiedad / Título" />
               <UploadBox label="Plano de Mensura (Si posee)" />
            </div>
          </>
        );
      case 'Maquinaria':
        return (
          <>
            <SelectGroup label="Tipo de Maquinaria" options={['Retroexcavadora', 'Excavadora de Oruga', 'Vibrocompactador', 'Camión Volteo', 'Montacargas']} />
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Tiempo de Alquiler" placeholder="Ej. 15" type="number" />
              <SelectGroup label="Unidad" options={['Días', 'Semanas', 'Meses']} />
            </div>
            <InputGroup label="Ubicación de la Obra" placeholder="Ej. Zona Industrial Punto Fijo" />
          </>
        );
      case 'Construccion':
        return (
          <>
            <SelectGroup label="Tipo de Proyecto" options={['Remodelación Residencial', 'Obra Civil Nueva', 'Mejoras Estructurales', 'Pintura e Impermeabilización']} />
            <InputGroup label="Ubicación del Proyecto" placeholder="Dirección exacta" />
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="Área Estimada (m²)" placeholder="Ej. 100" type="number" />
              <SelectGroup label="Nivel de Acabados" options={['Obra Gris', 'Obra Limpia', 'Lujo']} />
            </div>
          </>
        );
      case 'Avaluos':
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectGroup label="Tipo de Activo" options={['Residencial', 'Comercial', 'Industrial', 'Terreno']} />
              <SelectGroup label="Propósito" options={['Venta', 'Hipotecario', 'Sucesiones', 'Contable']} />
            </div>
            <InputGroup label="Ubicación Exacta" placeholder="Ej. Puerta Maraven, Sector C" />
          </>
        );
      default:
        return (
          <>
            <InputGroup label="Nombre del Titular" placeholder="Nombre completo" />
            <InputGroup label="Cédula / RIF" placeholder="V-00.000.000" />
            <UploadBox label="Subir Documento Base" />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige pb-24 relative animate-in slide-in-from-right duration-300 overflow-y-auto no-scrollbar">
      {showToast && (
        <div className="toast-notification w-80 bg-brand-slate text-white p-6 rounded-[32px] shadow-2xl flex items-center gap-4 border border-brand-gold/30">
          <div className="w-10 h-10 rounded-2xl gold-gradient flex items-center justify-center text-brand-slate text-xl font-black">🔔</div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Solicitud Procesada</p>
            <p className="text-[9px] text-slate-300 uppercase leading-tight mt-1">
              {service.category === 'PagoServicios' 
                ? 'El equipo de BP te notificará el monto a cancelar vía email y push a la brevedad posible.' 
                : 'Tu solicitud VIP ha sido enviada exitosamente al equipo de gestión.'}
            </p>
          </div>
        </div>
      )}

      <header className="p-6 pt-12 border-b border-white/50 flex items-center gap-4 bg-white/30 backdrop-blur-xl sticky top-0 z-20">
        <button onClick={onBack} className="p-2.5 bg-white rounded-2xl text-slate-600 shadow-sm hover:scale-105 active:scale-95 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="font-display font-black text-brand-slate uppercase tracking-tight leading-none">{service.title}</h2>
          <p className="text-[9px] text-brand-red font-black uppercase tracking-widest mt-1">{service.category === 'PagoServicios' ? 'GESTIÓN DE PAGOS' : service.category}</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-6 space-y-8 max-w-screen-md mx-auto">
        <div className="bg-white/40 p-6 rounded-[40px] border border-white/60 space-y-6 shadow-premium">
          {renderFields()}
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full red-gradient text-white py-6 rounded-[32px] font-black text-sm shadow-2xl active:scale-95 transition-all uppercase tracking-[0.2em] border-b-4 border-brand-redDark flex items-center justify-center gap-3"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            service.category === 'PagoServicios' ? 'Solicitar Estado de Cuenta' : 'Procesar Solicitud VIP'
          )}
        </button>
        
        {service.category === 'PagoServicios' && (
           <div className="flex items-center justify-center gap-2 opacity-40">
              <span className="text-[7px] font-black uppercase tracking-[0.5em] text-brand-slate">Compatible con iOS & Android Push System</span>
           </div>
        )}
      </form>
    </div>
  );
};

const InputGroup = ({ label, placeholder, type = 'text', value, onChange }: any) => (
  <div className="group">
    <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block mb-2 px-1">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-5 bg-white border border-slate-100 rounded-[24px] font-black text-xs text-brand-slate outline-none focus:ring-2 focus:ring-brand-gold transition-all shadow-premium"
    />
  </div>
);

const SelectGroup = ({ label, options }: any) => (
  <div className="group">
    <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block mb-2 px-1">{label}</label>
    <div className="relative">
      <select className="w-full p-5 bg-white border border-slate-100 rounded-[24px] font-black text-xs text-brand-slate outline-none focus:ring-2 focus:ring-brand-gold shadow-premium appearance-none">
        {options.map((opt: string) => <option key={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

const UploadBox = ({ label }: any) => (
  <div className="group border-2 border-dashed border-slate-200 rounded-[40px] p-6 bg-white/50 hover:bg-white hover:border-brand-gold/30 transition-all cursor-pointer flex flex-col items-center gap-4 shadow-inner mb-2">
    <div className="w-12 h-12 rounded-[20px] bg-white shadow-premium flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    </div>
    <div className="text-center">
      <span className="text-[9px] font-black text-brand-slate uppercase tracking-widest block">{label}</span>
      <span className="text-[7px] text-slate-400 uppercase mt-1 block">PDF, JPG o PNG</span>
    </div>
  </div>
);

export default ServiceFormScreen;
