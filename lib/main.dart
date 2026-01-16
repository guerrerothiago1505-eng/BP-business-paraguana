import React, { useState, useEffect } from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import RegistrationFlow from './screens/RegistrationFlow';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RequestsScreen from './screens/RequestsScreen';
import RequestDetailScreen from './screens/RequestDetailScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import RealEstateScreen from './screens/RealEstateScreen'; 
import ListingDetailScreen from './screens/ListingDetailScreen';
import PostPropertyScreen from './screens/PostPropertyScreen';
import PostVehicleScreen from './screens/PostVehicleScreen';
import ServicesScreen from './screens/ServicesScreen';
import ServiceFormScreen from './screens/ServiceFormScreen';
import BusinessToolsScreen from './screens/BusinessToolsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import Logo from './components/Logo';
import NotificationService, { EmailTemplate } from './services/NotificationService';
import { User, BusinessRequest, Listing } from './types';

type View = 'welcome' | 'register' | 'login' | 'home' | 'requests' | 'request-detail' | 'chat' | 'profile' | 'realestate' | 'listing-detail' | 'post-property' | 'post-vehicle' | 'services' | 'service-form' | 'business' | 'favorites' | 'admin-dashboard' | 'about';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<BusinessRequest | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedService, setSelectedService] = useState<{title: string, category: string} | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [adminPassword, setAdminPassword] = useState('026825185250Hola#');
  const [lastEmailSent, setLastEmailSent] = useState<EmailTemplate | null>(null);
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('bp_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('bp_user');
    const savedPass = localStorage.getItem('bp_admin_pass');
    if (savedPass) setAdminPassword(savedPass);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('home');
    }

    const handleEmailEvent = (e: any) => {
      setLastEmailSent(e.detail);
      setTimeout(() => setLastEmailSent(null), 6000);
    };

    window.addEventListener('email-sent', handleEmailEvent);
    return () => window.removeEventListener('email-sent', handleEmailEvent);
  }, []);

  const handleFinishRegistration = (userData: User) => {
    setIsVerifying(true);
    setTimeout(() => {
      const newUser: User = { ...userData, role: 'user' };
      setUser(newUser);
      localStorage.setItem('bp_user', JSON.stringify(newUser));
      
      const welcomeEmail = NotificationService.generateWelcomeEmail(newUser.fullName, newUser.email);
      NotificationService.sendSimulatedEmail(welcomeEmail);

      setIsVerifying(false);
      setCurrentView('home');
    }, 2500);
  };

  const handleLogin = (email: string, password?: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      const isMaster = email.toLowerCase() === 'business.paraguana2024@gmail.com';
      const isValidPass = password === adminPassword;

      if (isMaster && !isValidPass) {
        alert('Contraseña maestra incorrecta');
        setIsVerifying(false);
        return;
      }
      
      const mockUser: User = {
        id: isMaster ? 'master-dev' : 'vip-1',
        fullName: isMaster ? 'Administrador Maestro BP' : 'Cliente VIP Business',
        email: email,
        phone: '+58 412-1234567',
        address: 'Punto Fijo',
        identityVerified: true,
        membership: isMaster ? 'VIP_MASTER' : 'Premium',
        documents: [],
        role: isMaster ? 'dev' : 'user',
        registeredAt: new Date().toISOString()
      };
      setUser(mockUser);
      localStorage.setItem('bp_user', JSON.stringify(mockUser));
      setIsVerifying(false);
      setCurrentView('home');
    }, 2000);
  };

  const updatePassword = (newPass: string) => {
    setAdminPassword(newPass);
    localStorage.setItem('bp_admin_pass', newPass);
  };

  const handleSelectService = (title: string, category: string) => {
    setSelectedService({ title, category });
    setCurrentView('service-form');
  };

  const renderView = () => {
    switch (currentView) {
      case 'welcome': return <WelcomeScreen onStart={() => setCurrentView('register')} onLogin={() => setCurrentView('login')} />;
      case 'register': return <RegistrationFlow onComplete={handleFinishRegistration} />;
      case 'login': return <LoginScreen onBack={() => setCurrentView('welcome')} onLogin={handleLogin} />;
      case 'admin-dashboard': return <AdminDashboardScreen onBack={() => setCurrentView('profile')} />;
      case 'home': return <HomeScreen onNavigate={setCurrentView} onListingClick={(l) => { setSelectedListing(l); setCurrentView('listing-detail'); }} historyIds={[]} user={user} />;
      case 'profile': return <ProfileScreen user={user} onLogout={() => { localStorage.removeItem('bp_user'); setUser(null); setCurrentView('welcome'); }} onGoFavorites={() => setCurrentView('favorites')} onAdminClick={() => setCurrentView('admin-dashboard')} onUpdatePassword={updatePassword} onGoAbout={() => setCurrentView('about')} />;
      case 'about': return <AboutUsScreen onBack={() => setCurrentView('profile')} />;
      case 'realestate': return <RealEstateScreen onBack={() => setCurrentView('home')} onPost={() => setCurrentView('post-property')} onListingClick={(l) => { setSelectedListing(l); setCurrentView('listing-detail'); }} favorites={favorites} onToggleFavorite={(id) => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id])} />;
      case 'services': return <ServicesScreen onBack={() => setCurrentView('home')} onSelectService={handleSelectService} />;
      case 'service-form': return <ServiceFormScreen service={selectedService} onBack={() => setCurrentView('home')} />;
      case 'post-property': return <PostPropertyScreen onBack={() => setCurrentView('home')} />;
      case 'post-vehicle': return <PostVehicleScreen onBack={() => setCurrentView('home')} />;
      case 'business': return <BusinessToolsScreen onBack={() => setCurrentView('home')} onNavigate={setCurrentView} onSelectService={handleSelectService} />;
      case 'favorites': return <FavoritesScreen onBack={() => setCurrentView('profile')} onListingClick={(l) => { setSelectedListing(l); setCurrentView('listing-detail'); }} favoriteIds={favorites} />;
      case 'chat': return <ChatScreen />;
      case 'requests': return <RequestsScreen onViewDetail={(req) => { setSelectedRequest(req); setCurrentView('request-detail'); }} />;
      case 'request-detail': return <RequestDetailScreen request={selectedRequest} onBack={() => setCurrentView('requests')} />;
      default: return <HomeScreen onNavigate={setCurrentView} onListingClick={(l) => { setSelectedListing(l); setCurrentView('listing-detail'); }} historyIds={[]} user={user} />;
    }
  };

  const showNavbar = ['home', 'requests', 'chat', 'profile', 'realestate', 'services', 'business', 'request-detail', 'post-property', 'post-vehicle', 'listing-detail', 'favorites', 'service-form', 'admin-dashboard', 'about'].includes(currentView);

  return (
    <div className="w-full min-h-screen bg-brand-slate flex justify-center overflow-x-hidden font-sans">
      <div className={`w-full max-w-screen-xl relative bg-brand-beige shadow-[0_0_100px_rgba(0,0,0,0.5)] border-x border-white/5 flex flex-col ${showNavbar ? 'pb-24' : ''}`}>
        
        {lastEmailSent && (
          <div className="toast-notification fixed top-6 right-6 z-[200] max-w-xs animate-in slide-in-from-right duration-500">
            <div className="bg-white p-5 rounded-[24px] shadow-2xl border border-brand-gold/20 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center text-xs">✉️</div>
                <span className="text-[10px] font-black text-brand-slate uppercase tracking-widest">Email Enviado</span>
              </div>
              <p className="text-[9px] font-black text-brand-gold uppercase tracking-tighter truncate">{lastEmailSent.subject}</p>
              <p className="text-[8px] text-slate-400 font-bold uppercase truncate">Para: {lastEmailSent.recipient}</p>
            </div>
          </div>
        )}

        <main className="flex-1">
          {renderView()}
        </main>

        {showNavbar && (
          <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
            <div className="w-full max-w-screen-xl bg-white/95 backdrop-blur-md border-t border-slate-100 flex justify-around items-center h-20 px-4 safe-area-bottom shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
              <NavItem active={['home', 'realestate', 'services', 'business'].includes(currentView)} icon="home" label="PRINCIPAL" onClick={() => setCurrentView('home')} />
              <NavItem active={currentView === 'requests'} icon="list" label="Mi Gestión" onClick={() => setCurrentView('requests')} />
              <NavItem active={currentView === 'chat'} icon="chat" label="Asesor BP" onClick={() => setCurrentView('chat')} />
              <NavItem active={currentView === 'profile' || currentView === 'admin-dashboard' || currentView === 'about'} icon="user" label="Perfil" onClick={() => setCurrentView('profile')} />
            </div>
          </nav>
        )}
      </div>

      {isVerifying && (
        <div className="fixed inset-0 z-[100] bg-brand-beige flex flex-col items-center justify-center p-12 text-center">
          <div className="w-40 h-40 mb-10 relative">
             <Logo className="animate-pulse" showText={false} />
             <div className="absolute inset-[-10px] border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-display font-bold text-brand-slate uppercase tracking-widest animate-bounce">
            Business Paraguaná
          </h2>
          <p className="text-slate-400 text-[10px] mt-4 font-black uppercase tracking-[0.2em]">Sincronizando con el servidor de correos...</p>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ active, icon, label, onClick }: any) => {
  const getIcon = () => {
    switch (icon) {
      case 'home': return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
      case 'list': return <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
      case 'chat': return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>;
      case 'user': return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
      default: return null;
    }
  };

  return (
    <button onClick={onClick} className={`flex flex-col items-center transition-all duration-300 ${active ? 'text-brand-red scale-110' : 'text-slate-400'}`}>
      <div className={`p-1 rounded-xl ${active ? 'bg-brand-red/5' : ''}`}>
        {getIcon()}
      </div>
      <span className={`text-[8px] mt-1 font-black uppercase tracking-tighter ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    </button>
  );
};

export default App;
