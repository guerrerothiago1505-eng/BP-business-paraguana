
import React from 'react';
import { RequestStatus, BusinessRequest } from '../types';

interface RequestsScreenProps {
  onViewDetail: (req: BusinessRequest) => void;
}

const RequestsScreen: React.FC<RequestsScreenProps> = ({ onViewDetail }) => {
  // Fixed: Added missing userId property to all BusinessRequest objects
  const requests: BusinessRequest[] = [
    {
      id: '1',
      userId: 'current-user-id',
      title: 'Registro Mercantil PYME',
      category: 'Negocios',
      status: RequestStatus.IN_PROGRESS,
      date: '12 May 2024',
      description: 'Tramitación de firma personal para emprendedor en Coro.',
      timeline: []
    },
    {
      id: '2',
      userId: 'current-user-id',
      title: 'Pago Impuestos Municipales',
      category: 'Servicios',
      status: RequestStatus.FINISHED,
      date: '10 May 2024',
      description: 'Gestión ante Alcaldía Carirubana de solvencia municipal.',
      timeline: []
    },
    {
      id: '3',
      userId: 'current-user-id',
      title: 'Publicación de Apartamento',
      category: 'Inmobiliaria',
      status: RequestStatus.REQUIRE_DOCS,
      date: '08 May 2024',
      description: 'Falta subir el documento de propiedad original (COPIA CERTIFICADA).',
      timeline: []
    }
  ];

  const getStatusStyles = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.FINISHED: return 'bg-green-100 text-green-700';
      case RequestStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-700';
      case RequestStatus.REQUIRE_DOCS: return 'bg-red-100 text-red-700';
      case RequestStatus.IN_REVIEW: return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8 pt-4">
        <h1 className="text-3xl font-bold text-slate-800">Solicitudes</h1>
        <p className="text-slate-400 text-sm font-medium">Gestiona tus trámites activos.</p>
      </header>
      
      <div className="space-y-4">
        {requests.map((req) => (
          <div 
            key={req.id} 
            onClick={() => onViewDetail(req)}
            className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm active:scale-[0.98] active:bg-slate-50 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 pr-4">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{req.category}</span>
                <h3 className="font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{req.title}</h3>
              </div>
              <span className={`text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-tighter ${getStatusStyles(req.status)}`}>
                {req.status}
              </span>
            </div>
            
            <p className="text-xs text-slate-500 mb-5 line-clamp-2 leading-relaxed">{req.description}</p>
            
            <div className="flex items-center justify-between">
               <div className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
                 {req.date}
               </div>
               <div className="flex -space-x-2">
                 <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600">MA</div>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-8 bg-slate-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
         <div className="relative z-10">
           <h4 className="text-xl font-bold mb-2">Nuevo Trámite</h4>
           <p className="text-xs opacity-70 mb-6 leading-relaxed">¿Necesitas algo más? Nuestro equipo está listo para asistirte.</p>
           <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg group-hover:scale-105 transition-transform">
             Iniciar Solicitud
           </button>
         </div>
         <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12">
           <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
           </svg>
         </div>
      </div>
    </div>
  );
};

export default RequestsScreen;
