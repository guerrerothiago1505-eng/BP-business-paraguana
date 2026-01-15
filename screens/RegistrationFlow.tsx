
import React, { useState } from 'react';
import { User, DocumentMetadata } from '../types';
import LegalContractModal from '../components/LegalContractModal';

interface RegistrationFlowProps {
  onComplete: (user: User) => void;
}

const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [securityLog, setSecurityLog] = useState('');
  const [showLegal, setShowLegal] = useState(false);
  const [acceptedContract, setAcceptedContract] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: 'Punto Fijo'
  });

  const nextStep = () => {
    if (step === 2) {
      simulateSecurityProtocol();
    } else {
      setStep(s => s + 1);
    }
  };

  const simulateSecurityProtocol = async () => {
    setIsProcessing(true);
    setSecurityLog('Iniciando protocolo de blindaje...');
    await new Promise(r => setTimeout(r, 800));
    setSecurityLog('Sanitizando metadatos del archivo...');
    await new Promise(r => setTimeout(r, 1000));
    setSecurityLog('Encriptando con AES-256-GCM...');
    await new Promise(r => setTimeout(r, 1200));
    setSecurityLog('Generando hash de integridad SHA-256...');
    await new Promise(r => setTimeout(r, 800));
    setIsProcessing(false);
    setStep(3);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleFinish = () => {
    if (!acceptedContract) {
      alert('Debe aceptar el Contrato de Resguardo para finalizar su registro.');
      return;
    }
    onComplete({
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      identityVerified: true,
      membership: 'Basic',
      documents: [
        {
          name: 'Cédula Identidad',
          url: 'encrypted_vault_01.dat',
          date: new Date().toLocaleDateString(),
          size: '1.2MB',
          encryption: 'AES-256-GCM',
          hash: 'sha256:7f83b1...',
          isSanitized: true
        }
      ],
      role: 'user',
      registeredAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 animate-in slide-in-from-right duration-300 relative">
      <LegalContractModal isOpen={showLegal} onClose={() => setShowLegal(false)} />

      <div className="flex items-center mb-8 pt-4">
        {step > 1 && step < 4 && !isProcessing && (
          <button onClick={prevStep} className="p-2 -ml-2 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="flex-1 text-center">
          <div className="h-1.5 bg-slate-100 rounded-full w-48 mx-auto relative overflow-hidden">
            <div 
              className="absolute h-full bg-brand-red transition-all duration-500 ease-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {isProcessing ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-10 animate-in fade-in">
           <div className="w-24 h-24 mb-8 relative">
              <div className="absolute inset-0 border-4 border-brand-gold/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🛡️</div>
           </div>
           <h3 className="text-sm font-black text-brand-slate uppercase tracking-[0.2em] mb-2">Bóveda de Seguridad</h3>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest animate-pulse">{securityLog}</p>
        </div>
      ) : (
        <>
          {step === 1 && (
            <div className="flex-1 animate-in fade-in duration-500">
              <h2 className="text-3xl font-display font-black text-brand-slate mb-2 leading-tight uppercase tracking-tighter">Perfil Aliado</h2>
              <p className="text-slate-500 mb-8 text-sm">Información base protegida por encriptación de extremo a extremo.</p>
              
              <div className="space-y-5">
                <InputGroup label="Nombre completo" value={formData.fullName} onChange={(v: string) => setFormData({...formData, fullName: v})} placeholder="Ej. Pedro Pérez" />
                <InputGroup label="Teléfono (+58)" type="tel" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} placeholder="412-1234567" />
                <InputGroup label="Correo electrónico" type="email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} placeholder="pedro@ejemplo.com" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                 <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Conexión Segura TLS 1.3</span>
              </div>
              <h2 className="text-3xl font-display font-black text-brand-slate mb-2 leading-tight uppercase tracking-tighter">Documentos</h2>
              <p className="text-slate-500 mb-8 text-sm">Sus archivos serán sanitizados y encriptados antes de ser almacenados en nuestra bóveda privada.</p>
              
              <div className="grid grid-cols-1 gap-4">
                <UploadBox label="Frontal de Cédula" />
                <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-2xl border border-blue-100">
                   <span className="text-lg">🔐</span>
                   <p className="text-[9px] text-blue-700 font-bold leading-tight">Su privacidad es nuestra prioridad. Solo el administrador maestro puede desencriptar estos archivos.</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col items-center animate-in fade-in duration-500">
              <h2 className="text-3xl font-display font-black text-brand-slate mb-2 text-center leading-tight uppercase tracking-tighter">Biometría</h2>
              <p className="text-slate-500 mb-10 text-center text-xs px-4">Validación de prueba de vida para prevenir suplantación de identidad.</p>
              
              <div className="relative w-64 h-80 rounded-[60px] border-4 border-brand-gold bg-slate-900 overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-64 border border-brand-gold/50 rounded-full animate-pulse"></div>
                 </div>
                 <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-gold/30 shadow-[0_0_15px_rgba(197,160,89,1)] animate-bounce"></div>
                 <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <div className="bg-brand-red/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] text-white font-black uppercase tracking-widest border border-white/20">
                      Escaneo Biométrico
                    </div>
                 </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex-1 flex flex-col items-center animate-in zoom-in-95 duration-500 overflow-y-auto no-scrollbar">
               <div className="w-24 h-24 bg-brand-slate text-brand-gold rounded-[32px] flex items-center justify-center mb-8 shadow-2xl border border-brand-gold/30 rotate-12 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
               </div>
               <h2 className="text-3xl font-display font-black text-brand-slate mb-4 uppercase tracking-tighter">Blindaje Activo</h2>
               
               <div className="w-full space-y-6 bg-brand-beige p-6 rounded-[32px] border border-white/50 text-left shadow-inner mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status de Seguridad</span>
                    <span className="text-[9px] font-black text-brand-red uppercase tracking-widest">ALTA PRIORIDAD</span>
                  </div>
                  
                  {/* ACEPCIÓN LEGAL EN EL REGISTRO */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-start gap-4">
                      <input 
                        type="checkbox" 
                        checked={acceptedContract}
                        onChange={(e) => setAcceptedContract(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded-lg border-brand-gold text-brand-red focus:ring-brand-gold accent-brand-gold"
                      />
                      <div className="flex-1">
                         <p className="text-[10px] font-bold text-brand-slate leading-tight">
                            Acepto el Contrato de Respaldo BP y autorizo la gestión profesional de mis activos bajo los términos de la plataforma.
                         </p>
                         <button 
                          onClick={() => setShowLegal(true)}
                          className="text-[9px] font-black text-brand-red uppercase tracking-widest mt-2 border-b border-brand-red/30"
                         >
                            Leer Contrato y Normas Completas
                         </button>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          <button 
            onClick={step === 4 ? handleFinish : nextStep}
            className={`w-full py-6 rounded-[28px] font-black text-sm shadow-xl transition-all mt-8 uppercase tracking-[0.2em] border-b-4 ${step === 4 && !acceptedContract ? 'bg-slate-200 text-slate-400 border-slate-300' : 'red-gradient text-white border-brand-redDark active:scale-95'}`}
          >
            {step === 4 ? 'Acceder al Dashboard VIP' : step === 2 ? 'Encriptar y Continuar' : step === 3 ? 'Capturar Identidad' : 'Siguiente Paso'}
          </button>
        </>
      )}
    </div>
  );
};

const InputGroup = ({ label, value, onChange, placeholder, type = 'text' }: any) => (
  <div className="group">
    <label className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] block mb-2 px-1">{label}</label>
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[24px] focus:ring-2 focus:ring-brand-gold focus:bg-white transition-all outline-none font-medium text-xs"
    />
  </div>
);

const UploadBox = ({ label }: any) => (
  <div className="group border-2 border-dashed border-brand-gold/20 rounded-[32px] p-10 bg-slate-50 hover:bg-white hover:border-brand-gold/40 transition-all cursor-pointer flex flex-col items-center gap-4 shadow-inner">
    <div className="w-16 h-16 rounded-[24px] bg-white shadow-premium flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <div className="text-center">
       <span className="text-[10px] font-black text-brand-slate uppercase tracking-widest block">{label}</span>
       <span className="text-[8px] text-slate-400 uppercase font-bold mt-1 block">Sanitización automática activa</span>
    </div>
  </div>
);

export default RegistrationFlow;
