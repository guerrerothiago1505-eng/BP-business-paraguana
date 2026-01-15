
import React, { useState } from 'react';
import { RequestStatus, User, BusinessRequest, Listing, DocumentMetadata } from '../types';
import Logo from '../components/Logo';
import NotificationService from '../services/NotificationService';

interface AdminDashboardScreenProps {
  onBack: () => void;
}

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'requests' | 'listings' | 'vault'>('users');
  const [search, setSearch] = useState('');
  const [decryptingId, setDecryptingId] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<BusinessRequest | null>(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [advisorComment, setAdvisorComment] = useState('');
  const [newStatus, setNewStatus] = useState<RequestStatus>(RequestStatus.IN_PROGRESS);

  // Mock de usuarios con documentos encriptados
  const [users, setUsers] = useState<User[]>([
    {
      id: 'u1', fullName: 'Carlos Rodríguez', email: 'carlos@empresa.com', phone: '412-5556677',
      address: 'Punto Fijo', identityVerified: true, membership: 'Premium', role: 'user', 
      registeredAt: '2024-05-01', 
      documents: [
        { name: 'CI Frontal', url: 'enc_01.dat', date: '12 May', size: '1.1MB', encryption: 'AES-256-GCM', hash: 'sha256:883...', isSanitized: true },
        { name: 'RIF Digital', url: 'enc_02.dat', date: '12 May', size: '0.9MB', encryption: 'AES-256-GCM', hash: 'sha256:411...', isSanitized: true }
      ]
    },
    {
      id: 'u2', fullName: 'María Garcés', email: 'm.garces@consultora.net', phone: '424-1112233',
      address: 'Coro', identityVerified: false, membership: 'Basic', role: 'user', 
      registeredAt: '2024-05-10', documents: []
    }
  ]);

  const [allRequests, setAllRequests] = useState<BusinessRequest[]>([
    { id: '1', userId: 'u1', userName: 'Carlos Rodríguez', title: 'Registro de Empresa', category: 'Negocios', status: RequestStatus.IN_PROGRESS, date: '12 May', description: 'Nueva pyme tecnológica.', timeline: [] }
  ]);

  const handleDecrypt = async (docId: string) => {
    setDecryptingId(docId);
    await new Promise(r => setTimeout(r, 1500));
    setDecryptingId(null);
    alert('Documento desencriptado en memoria. El acceso expira al cerrar la sesión.');
  };

  const openUpdateModal = (req: BusinessRequest) => {
    setSelectedRequest(req);
    setNewStatus(req.status);
    setUpdateModal(true);
  };

  const handleStatusUpdate = () => {
    if (!selectedRequest) return;

    // Actualizar estado localmente
    setAllRequests(allRequests.map(r => r.id === selectedRequest.id ? {...r, status: newStatus} : r));
    
    // Generar y enviar notificación por correo
    const user = users.find(u => u.id === selectedRequest.userId) || { fullName: selectedRequest.userName || 'Usuario', email: 'business.paraguana2024@gmail.com' };
    
    const updateEmail = NotificationService.generateStatusUpdateEmail(
      user.fullName,
      user.email,
      selectedRequest.title,
      newStatus,
      advisorComment || 'Su solicitud está siendo procesada por nuestro equipo.'
    );
    
    NotificationService.sendSimulatedEmail(updateEmail);
    
    setUpdateModal(false);
    setAdvisorComment('');
    alert(`Estado actualizado y correo enviado a ${user.email}`);
  };

  const sendInvitationToAll = () => {
    users.forEach(u => {
      const invitation = NotificationService.generateInvitationEmail(u.fullName, u.email);
      NotificationService.sendSimulatedEmail(invitation);
    });
    alert(`Invitaciones periódicas enviadas a ${users.length} usuarios.`);
  };

  return (
    <div className="min-h-screen bg-brand-beige pb-32">
      <header className="bg-brand-slate text-white p-8 pt-12 rounded-b-[50px] shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <button onClick={onBack} className="bg-white/10 p-3 rounded-2xl text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            Perfil
          </button>
          <div className="w-10 h-10 opacity-50"><Logo showText={false} /></div>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[8px] font-black text-brand-gold uppercase tracking-[0.4em]">Sesión Master Encriptada</span>
        </div>
        <h1 className="text-3xl font-display font-black tracking-tighter uppercase leading-none mt-2">Consola Maestra</h1>
      </header>

      {/* Selector de Módulo */}
      <div className="px-6 -mt-8">
        <div className="bg-white p-2 rounded-[32px] shadow-premium border border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
          <TabButton active={activeTab === 'users'} label="Usuarios" onClick={() => setActiveTab('users')} count={users.length} />
          <TabButton active={activeTab === 'vault'} label="Bóveda" onClick={() => setActiveTab('vault')} count={users.reduce((acc, u) => acc + u.documents.length, 0)} />
          <TabButton active={activeTab === 'requests'} label="Solicitudes" onClick={() => setActiveTab('requests')} count={allRequests.length} />
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'vault' ? (
          <div className="space-y-6">
            <div className="bg-brand-slate text-white p-6 rounded-[32px] border border-brand-gold/30 shadow-xl">
               <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <h3 className="text-sm font-bold text-brand-gold">Seguridad de Datos</h3>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">Custodia AES-256 Activa</p>
                  </div>
               </div>
               <p className="text-[10px] text-slate-400 leading-relaxed font-medium">Los documentos listados abajo están protegidos. La desencriptación ocurre solo en el navegador del administrador y no persiste en disco.</p>
            </div>

            <div className="space-y-4">
               {users.filter(u => u.documents.length > 0).map(u => (
                 <div key={u.id} className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-50">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Propietario: {u.fullName}</h4>
                    <div className="space-y-3">
                       {u.documents.map((doc, idx) => (
                         <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">📄</div>
                               <div>
                                  <p className="text-[11px] font-bold text-brand-slate">{doc.name}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                     <span className="text-[7px] font-black bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">AES-256</span>
                                     <span className="text-[8px] text-slate-400 font-bold">{doc.size}</span>
                                  </div>
                               </div>
                            </div>
                            <button 
                              onClick={() => handleDecrypt(`${u.id}-${idx}`)}
                              disabled={decryptingId === `${u.id}-${idx}`}
                              className="bg-brand-slate text-white text-[9px] font-black px-5 py-2.5 rounded-xl uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50"
                            >
                               {decryptingId === `${u.id}-${idx}` ? 'Procesando...' : 'Ver'}
                            </button>
                         </div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ) : activeTab === 'users' ? (
          <div className="space-y-6">
            <button 
              onClick={sendInvitationToAll}
              className="w-full gold-gradient text-brand-slate p-6 rounded-[32px] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"
            >
              🚀 Enviar Invitaciones de Negocios a Todos
            </button>
            
            <div className="space-y-4">
              {users.map(u => (
                <div key={u.id} className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 text-brand-red rounded-2xl flex items-center justify-center font-display font-black text-xl border border-slate-100 shadow-inner">
                        {u.fullName[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-slate text-sm">{u.fullName}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{u.email}</p>
                      </div>
                    </div>
                    <span className={`text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${u.membership === 'Premium' ? 'gold-gradient text-brand-slate' : 'bg-slate-100 text-slate-400'}`}>
                      {u.membership}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-slate-50 rounded-2xl text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      ID: {u.id}
                    </div>
                    <div className={`p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center ${u.identityVerified ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {u.identityVerified ? 'Verificado' : 'Pendiente'}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setActiveTab('vault')} className="flex-1 bg-brand-slate text-white py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-brand-red transition-all shadow-lg flex items-center justify-center gap-2">
                       <span className="text-xs">🔐</span>
                       Expediente Seguro
                    </button>
                    <button className="flex-1 border border-slate-100 text-slate-400 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest">Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'requests' ? (
          <div className="space-y-4">
            {allRequests.map(req => (
              <div key={req.id} className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-50">
                 <div className="flex justify-between items-start mb-4">
                   <div>
                      <span className="text-[9px] font-black text-brand-gold uppercase tracking-widest">{req.category}</span>
                      <h4 className="font-bold text-brand-slate text-sm">{req.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Asignado a: {req.userName}</p>
                   </div>
                   <span className="bg-slate-50 text-brand-red text-[8px] font-black px-3 py-1.5 rounded-full border border-slate-100">
                     BP-{req.id.padStart(4, '0')}
                   </span>
                 </div>
                 
                 <div className="flex items-center gap-3 mb-6">
                    <div className={`w-2 h-2 rounded-full ${req.status === RequestStatus.FINISHED ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
                    <span className="text-[10px] font-black text-brand-slate uppercase tracking-widest">{req.status}</span>
                 </div>

                 <button 
                  onClick={() => openUpdateModal(req)}
                  className="w-full bg-brand-slate text-white py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-3"
                 >
                    <span>📧</span>
                    Actualizar y Notificar
                 </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-30">
             <div className="text-6xl mb-4">📁</div>
             <p className="text-[10px] font-black uppercase tracking-widest">Módulo en construcción segura</p>
          </div>
        )}
      </div>

      {/* Modal de Actualización */}
      {updateModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-slate/60 backdrop-blur-md" onClick={() => setUpdateModal(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[44px] shadow-2xl p-8 relative animate-in zoom-in-95 duration-300">
             <h3 className="text-lg font-display font-black text-brand-slate uppercase tracking-tight mb-2">Gestión de Solicitud</h3>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Se enviará un correo automático al cliente.</p>
             
             <div className="space-y-6">
                <div>
                   <label className="text-[9px] font-black text-brand-gold uppercase tracking-widest block mb-2">Nuevo Estado</label>
                   <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as RequestStatus)}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none"
                   >
                      {Object.values(RequestStatus).map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>

                <div>
                   <label className="text-[9px] font-black text-brand-gold uppercase tracking-widest block mb-2">Comentario por Email</label>
                   <textarea 
                    value={advisorComment}
                    onChange={(e) => setAdvisorComment(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium outline-none min-h-[100px]"
                    placeholder="Escriba la respuesta que recibirá el cliente..."
                   ></textarea>
                </div>

                <div className="flex gap-3">
                   <button onClick={() => setUpdateModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest">Cancelar</button>
                   <button onClick={handleStatusUpdate} className="flex-1 py-4 red-gradient text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Confirmar Envío</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ active, label, onClick, count }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-4 rounded-[28px] whitespace-nowrap transition-all ${active ? 'bg-brand-slate text-white shadow-xl scale-105' : 'text-slate-400 hover:bg-slate-50'}`}
  >
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${active ? 'bg-brand-gold text-brand-slate' : 'bg-slate-100 text-slate-400'}`}>
      {count}
    </span>
  </button>
);

export default AdminDashboardScreen;
