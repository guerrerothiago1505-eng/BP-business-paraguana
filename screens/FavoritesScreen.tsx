
import React from 'react';
import { Listing } from '../types';

interface FavoritesScreenProps {
  onBack: () => void;
  onListingClick: (listing: Listing) => void;
  favoriteIds: string[];
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ onBack, onListingClick, favoriteIds }) => {
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
      description: '',
      details: { rooms: 3, bathrooms: 2, sqft: 180 }
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
      description: '',
      details: { year: 2023, km: 5000, transmission: 'Auto', fuel: 'Gasolina' }
    }
  ];

  const favoriteListings = allListings.filter(l => favoriteIds.includes(l.id));

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-right duration-300 pb-10">
      <header className="p-6 pt-10 flex items-center gap-4 bg-white border-b border-slate-100">
        <button onClick={onBack} className="p-2 bg-slate-50 rounded-xl text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-slate-800">Mis Favoritos</h1>
      </header>

      <div className="p-6">
        {favoriteListings.length === 0 ? (
          <div className="text-center py-20">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl opacity-50">❤️</div>
             <p className="text-slate-500 font-bold">No tienes favoritos aún.</p>
             <button onClick={onBack} className="mt-4 text-blue-600 font-bold text-sm">Explorar Marketplace</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {favoriteListings.map(listing => (
              <div 
                key={listing.id} 
                onClick={() => onListingClick(listing)}
                className="bg-white rounded-[32px] p-3 flex gap-4 shadow-sm border border-slate-100 active:scale-[0.98] transition-transform"
              >
                <img src={listing.imageUrl} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1 py-1">
                  <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{listing.category}</span>
                  <h3 className="font-bold text-slate-800 text-sm leading-tight mt-0.5">{listing.title}</h3>
                  <p className="text-lg font-black text-slate-900 mt-2">${listing.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesScreen;
