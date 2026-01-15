
import React, { useState } from 'react';
import { Listing } from '../types';

interface MarketplaceScreenProps {
  onBack: () => void;
  onPost: () => void;
  onListingClick: (listing: Listing) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ 
  onBack, 
  onPost, 
  onListingClick,
  favorites,
  onToggleFavorite
}) => {
  const [activeTab, setActiveTab] = useState<'Inmuebles' | 'Vehículos'>('Inmuebles');

  // Fixed: Added missing userId and status properties to Listing objects
  const allListings: Listing[] = [
    {
      id: '1',
      userId: 'system-owner',
      status: 'approved',
      title: 'Townhouse en Puerta Maraven',
      price: 45000,
      location: 'Puerta Maraven, Punto Fijo',
      category: 'Propiedad',
      type: 'Venta',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      description: 'Increíble propiedad con acabados de lujo y vigilancia 24/7.',
      details: { rooms: 3, bathrooms: 2, sqft: 180 }
    },
    {
      id: '2',
      userId: 'system-owner',
      status: 'approved',
      title: 'Local Comercial - Av. Jacinto Lara',
      price: 850,
      location: 'Punto Fijo Centro',
      category: 'Propiedad',
      type: 'Alquiler',
      imageUrl: 'https://images.unsplash.com/photo-1556740734-7f9585457589?auto=format&fit=crop&w=600&q=80',
      description: 'Excelente ubicación estratégica para cualquier tipo de negocio.',
      details: { rooms: 0, bathrooms: 1, sqft: 65 }
    },
    {
      id: 'v1',
      userId: 'system-owner',
      status: 'approved',
      title: 'Toyota Fortuner 2023',
      price: 68000,
      location: 'Punto Fijo',
      category: 'Vehículo',
      type: 'Venta',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
      description: 'Vehículo en condiciones impecables, único dueño.',
      details: { year: 2023, km: 5000, transmission: 'Auto', fuel: 'Gasolina' }
    },
    {
      id: 'v2',
      userId: 'system-owner',
      status: 'approved',
      title: 'Ford F-150 Raptor 2022',
      price: 82000,
      location: 'Adícora',
      category: 'Vehículo',
      type: 'Venta',
      imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80',
      description: 'Máximo rendimiento off-road. Totalmente equipada.',
      details: { year: 2022, km: 15000, transmission: 'Auto', fuel: 'Gasolina' }
    }
  ];

  const filteredListings = allListings.filter(l => 
    activeTab === 'Inmuebles' ? l.category === 'Propiedad' : l.category === 'Vehículo'
  );

  return (
    <div className="pb-10 bg-brand-beige min-h-screen">
      <div className="bg-brand-slate text-white p-6 sm:p-10 pt-12 rounded-b-[50px] shadow-2xl mb-8 relative overflow-hidden">
        <button onClick={onBack} className="mb-6 bg-white/10 p-3 rounded-2xl text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Principal
        </button>
        <h1 className="text-3xl sm:text-5xl font-display font-black mb-2 tracking-tighter uppercase leading-none">Mercado Virtual</h1>
        <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em]">Activos de Alto Valor en Paraguaná</p>
      </div>

      <div className="px-6 flex gap-3 mb-8 max-w-lg mx-auto">
        <button 
          onClick={() => setActiveTab('Inmuebles')}
          className={`flex-1 py-4 rounded-[24px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'Inmuebles' ? 'red-gradient text-white shadow-xl scale-105' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'}`}
        >
          Propiedades
        </button>
        <button 
          onClick={() => setActiveTab('Vehículos')}
          className={`flex-1 py-4 rounded-[24px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'Vehículos' ? 'red-gradient text-white shadow-xl scale-105' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'}`}
        >
          Vehículos
        </button>
      </div>

      <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 max-w-screen-xl mx-auto">
        {filteredListings.map(listing => (
          <div 
            key={listing.id} 
            className="bg-white rounded-[44px] overflow-hidden shadow-premium border border-slate-50 group active:scale-[0.98] transition-all cursor-pointer flex flex-col h-full"
            onClick={() => onListingClick(listing)}
          >
            <div className="relative h-64 overflow-hidden">
              <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute top-6 left-6 gold-gradient px-4 py-2 rounded-full text-[9px] font-black text-brand-slate uppercase tracking-widest shadow-xl">
                {listing.type}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(listing.id); }}
                className={`absolute top-6 right-6 p-3 rounded-2xl backdrop-blur-md shadow-2xl transition-all hover:scale-110 ${favorites.includes(listing.id) ? 'bg-brand-red text-white' : 'bg-white/80 text-brand-slate'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${favorites.includes(listing.id) ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <div className="absolute bottom-6 right-6 bg-brand-slate/90 backdrop-blur-md text-brand-gold px-6 py-3 rounded-2xl font-black shadow-2xl border border-brand-gold/20">
                ${listing.price.toLocaleString()}
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="font-display font-black text-brand-slate text-xl leading-tight uppercase tracking-tighter line-clamp-2">{listing.title}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2 mb-6">{listing.location}</p>
              
              <div className="flex gap-6 pt-6 border-t border-slate-50 mt-auto">
                {listing.category === 'Propiedad' ? (
                  <>
                    <div className="flex items-center gap-2 text-[10px] font-black text-brand-gold uppercase tracking-widest">🛏️ {listing.details.rooms} Hab</div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-brand-gold uppercase tracking-widest">🚿 {listing.details.bathrooms} Baños</div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-[10px] font-black text-brand-gold uppercase tracking-widest">🗓️ {listing.details.year}</div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-brand-gold uppercase tracking-widest">🛣️ {listing.details.km.toLocaleString()} km</div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 text-center">
         <button 
           onClick={onPost}
           className="px-12 py-5 bg-brand-slate text-white rounded-[28px] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl active:scale-95 hover:bg-brand-red transition-all"
         >
            Publicar Nuevo Activo
         </button>
      </div>
    </div>
  );
};

export default MarketplaceScreen;
