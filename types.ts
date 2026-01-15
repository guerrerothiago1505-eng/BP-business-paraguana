
export enum RequestStatus {
  PENDING = 'Pendiente',
  IN_PROGRESS = 'En proceso',
  REQUIRE_DOCS = 'Requiere documentos',
  IN_REVIEW = 'En revisión',
  FINISHED = 'Finalizado',
  REJECTED = 'Rechazado'
}

export interface DocumentMetadata {
  name: string;
  url: string;
  date: string;
  size: string;
  encryption: 'AES-256-GCM';
  hash: string; // SHA-256 para verificar integridad
  isSanitized: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  identityVerified: boolean;
  membership: 'Basic' | 'Premium' | 'VIP_MASTER';
  documents: DocumentMetadata[];
  role: 'user' | 'admin' | 'dev';
  registeredAt: string;
}

export interface BusinessRequest {
  id: string;
  userId: string;
  userName?: string;
  title: string;
  category: string;
  status: RequestStatus;
  date: string;
  description: string;
  timeline: {
    status: RequestStatus;
    date: string;
    label: string;
    isCompleted: boolean;
  }[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'advisor';
  timestamp: Date;
  userId?: string;
}

export type ListingCategory = 'Propiedad' | 'Vehículo';

export interface Listing {
  id: string;
  userId: string;
  userName?: string;
  title: string;
  price: number;
  location: string;
  category: ListingCategory;
  type: 'Venta' | 'Alquiler';
  imageUrl: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  details: any;
}
