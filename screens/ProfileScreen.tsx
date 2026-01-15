
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileScreenProps {
  user: User | null;
  onLogout: () => void;
  onGoFavorites: () => void;
  onAdminClick?: () => void;
  onUpdatePassword?: (newPass: string) => void;
  onGoAbout?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onGoFavorites, onAdminClick, onUpdatePassword, onGoAbout }) => {
  const isAdmin = user?.role === 'admin' || user?.role === 'dev';
  const isMaster = user?.email === 'business.paraguana2024@gmail.com';
  
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordToast, setPasswordToast] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      onUpdatePassword?.(newPassword);
      setPasswordToast(true);
      setShowPasswordForm(false);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordToast(false), 3000);
    } else {
      alert('Las contraseñas no coinciden o están vacías.');
    }
  };

  return (
    <div className="p-6 pb-20 bg-white min-h-screen overflow-y-auto no-scrollbar">
      {passwordToast && (
        <div className="toast-notification bg-green-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">✓</div>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest">Éxito</p>
            <p className="text-[9px] uppercase mt-1">Contraseña maestra actualizada correctamente.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center mb-12 pt-10">
        <div className="relative">
          <div className="w-32 h-32 bg-slate-50 text-brand-red rounded-[48px] flex items-center justify-center text-5xl font-display font-bold mb-6 shadow-inner border-2 border-slate-100">
            {user?.fullName.split(' ').map(n => n[0]).join('') || 'JD'}
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 gold-gradient rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
             <svg className="w-5 h-5 text-brand-slate" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-display font-bold text-brand-slate text-center">{user?.fullName || 'Juan Delgado'}</h2>
        <p className="text-slate-400 text-sm font-light mt-1 text-center">{user?.email || 'juan.d@gmail.com'}</p>
        
        <div className="mt-6 flex flex-col items-center gap-3">
           <span className={`${isAdmin ? 'bg-brand-slate' : 'red-gradient'} text-white text-[9px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl border-b-2 border-brand-gold`}>
             {isMaster ? 'ADMINISTRADOR MAESTRO BP' : isAdmin ? 'PANEL ADMIN' : 'Membresía Premium'}
           </span>
        </div>
      </div>

      <section className="mb-10 space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Gestión del Sistema</h3>
        
        {isAdmin && (
          <button 
            onClick={onAdminClick}
            className="w-full flex items-center justify-between p-6 bg-brand-slate text-white rounded-[32px] border border-brand-gold/30 active:scale-[0.98] transition-all shadow-gold-glow"
          >
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold text-brand-slate flex items-center justify-center text-2xl shadow-sm">⚙️</div>
                <div className="text-left">
                   <span className="text-sm font-bold block text-brand-gold">Consola Maestra</span>
                   <span className="text-[10px] text-slate-400">Control total de Paraguaná</span>
                </div>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
             </svg>
          </button>
        )}

        {/* Sección: Nuestra Historia / Visión */}
        <button 
          onClick={onGoAbout}
          className="w-full flex items-center justify-between p-6 bg-brand-offwhite rounded-[32px] border border-brand-gold/30 active:scale-[0.98] transition-all shadow-sm"
        >
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-brand-gold flex items-center justify-center text-2xl shadow-sm">📜</div>
              <div className="text-left">
                 <span className="text-sm font-bold text-brand-slate block">Legado y Propósito</span>
                 <span className="text-[10px] text-brand-gold font-black uppercase tracking-widest">Nuestra Visión</span>
              </div>
           </div>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
           </svg>
        </button>

        {isMaster && (
          <div className="space-y-3">
            <button 
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="w-full flex items-center justify-between p-6 bg-slate-50 border border-brand-gold/20 text-brand-slate rounded-[32px] active:scale-[0.98] transition-all"
            >
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white text-brand-red flex items-center justify-center text-2xl shadow-sm">🔐</div>
                  <div className="text-left">
                     <span className="text-sm font-bold block">Seguridad Maestro</span>
                     <span className="text-[10px] text-slate-400">Actualizar clave de acceso</span>
                  </div>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-slate-300 transition-transform ${showPasswordForm ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
               </svg>
            </button>

            {showPasswordForm && (
              <form onSubmit={handlePasswordChange} className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-brand-gold uppercase tracking-widest px-1">Nueva Clave</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Ingrese nueva contraseña"
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-xs outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-brand-gold uppercase tracking-widest px-1">Confirmar Clave</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita nueva contraseña"
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-xs outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <button type="submit" className="w-full bg-brand-slate text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                  Confirmar Cambio
                </button>
              </form>
            )}
          </div>
        )}

        <button 
          onClick={onGoFavorites}
          className="w-full flex items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100 active:scale-[0.98] transition-all"
        >
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-brand-red flex items-center justify-center text-2xl shadow-sm">❤️</div>
              <div className="text-left">
                 <span className="text-sm font-bold text-brand-slate block">Mis Favoritos</span>
                 <span className="text-[10px] text-slate-400">Propiedades guardadas</span>
              </div>
           </div>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
           </svg>
        </button>
      </section>

      <div className="space-y-3 mt-10">
        <button 
          onClick={onLogout}
          className="w-full text-brand-red font-black py-5 rounded-[24px] border-2 border-slate-100 active:bg-slate-50 transition-all uppercase text-[10px] tracking-widest"
        >
          Cerrar Sesión Maestro
        </button>
        <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-[0.4em]">Business Paraguaná v2.5</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
