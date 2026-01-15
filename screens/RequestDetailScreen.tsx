
import React from 'react';
import { BusinessRequest, RequestStatus } from '../types';

interface RequestDetailScreenProps {
  request: BusinessRequest | null;
  onBack: () => void;
}

const RequestDetailScreen: React.FC<RequestDetailScreenProps> = ({ request, onBack }) => {
  if (!request) return null;

  // Mock timeline if not provided
  const timeline = request.timeline || [
    { status: RequestStatus.PENDING, date: '12 May, 10:30 AM', label: 'Solicitud Recibida', isCompleted: true },
    { status: RequestStatus.IN_PROGRESS, date: '12 May, 02:15 PM', label: 'Asignación de Asesor', isCompleted: true },
    { status: RequestStatus.IN_REVIEW, date: '13 May, 09:00 AM', label: 'Revisión de Documentación', isCompleted: false },
    { status: RequestStatus.FINISHED, date: '-', label: 'Trámite Finalizado', isCompleted: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-bottom duration-300">
      <header className="bg-white p-6 pt-10 border-b border-slate-100 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-slate-50 rounded-xl text-slate-600 active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="font-bold text-slate-800 leading-tight">BP-{request.id.padStart(4, '0')}</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{request.category}</p>
        </div>
      </header>

      <div className="p-6">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 mb-6">
          <h1 className="text-xl font-bold text-slate-800 mb-2">{request.title}</h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">{request.description}</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">MA</div>
            <span className="text-xs font-bold text-slate-700">Asesor: Miguel Arcaya</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-800 mb-6 px-1">Seguimiento de Trámite</h3>
        
        <div className="space-y-0 relative pl-4">
          {/* Línea vertical central */}
          <div className="absolute left-[23px] top-2 bottom-8 w-0.5 bg-slate-200"></div>
          
          {timeline.map((step, idx) => (
            <div key={idx} className="flex gap-6 mb-8 relative">
              <div className={`z-10 w-5 h-5 rounded-full flex items-center justify-center ${step.isCompleted ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-slate-200 border-4 border-white'}`}>
                {step.isCompleted && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="-mt-1">
                <h4 className={`text-sm font-bold ${step.isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>{step.label}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-5 bg-blue-600 rounded-3xl text-white flex justify-between items-center shadow-xl shadow-blue-100">
           <div>
              <p className="text-[10px] font-bold uppercase opacity-80 mb-1">Próximo paso</p>
              <h4 className="font-bold text-sm">Validar Registro Mercantil</h4>
           </div>
           <button className="bg-white text-blue-600 p-2 rounded-xl active:scale-90 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
             </svg>
           </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailScreen;
