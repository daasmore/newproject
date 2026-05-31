// ─── Tipe data utama Wedding App ───

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

// ─── Auth ───
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ─── Template ───
export interface Template {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  theme: 'classic' | 'modern' | 'minimal' | 'floral' | 'rustic';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

// ─ Love Story ──
export interface LoveStoryEvent {
  id?: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

// ─── Gallery ───
export interface GalleryItem {
  id?: string;
  url: string;
  caption?: string;
  is_featured?: boolean;
}

// ─── Gifts ───
export interface GiftBank {
  id?: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  logo?: string;
}

export interface GiftEWallet {
  id?: string;
  type: string;
  phone: string;
  account_name: string;
  logo?: string;
}

export interface GiftAddress {
  id?: string;
  name: string;
  address: string;
  phone?: string;
}

// ─── Bride-Groom Info ───
export interface Mempelai {
  bride_nickname: string;
  bride_full_name: string;
  bride_father: string;
  bride_mother: string;
  bride_photo?: string;
  groom_nickname: string;
  groom_full_name: string;
  groom_father: string;
  groom_mother: string;
  groom_photo?: string;
}

// ─── Acara ───
export interface AcaraItem {
  id?: string;
  type: 'akad' | 'resepsi';
  date: string;
  start_time: string;
  end_time: string;
  timezone: string;
  location_name: string;
  address: string;
  lat?: number;
  lng?: number;
  maps_url?: string;
  notes?: string;
}

// ─── Wedding Data (Builder) ───
export interface WeddingData {
  id?: string;
  slug: string;
  template_id: string;
  mempelai: Mempelai;
  acara: AcaraItem[];
  love_story: LoveStoryEvent[];
  gallery: GalleryItem[];
  gifts: {
    banks: GiftBank[];
    e_wallets: GiftEWallet[];
    addresses: GiftAddress[];
  };
  rsvp_settings: {
    deadline: string;
    max_guests: number;
    custom_message: string;
  };
  cover_photo?: string;
  music_url?: string;
  is_paid: boolean;
  is_published: boolean;
}

// ─── Tamu ───
export interface Tamu {
  id: string;
  name: string;
  group?: string;
  phone?: string;
  email?: string;
  link_token: string;
  link_url: string;
  status: 'hadir' | 'tidak_hadir' | 'pending';
  total_guests: number;
  confirmed_at?: string;
  rsvp?: RSVPData;
}

export interface RSVPData {
  id?: string;
  tamu_id: string;
  attendance: 'hadir' | 'tidak_hadir';
  total_guests: number;
  message: string;
  created_at?: string;
}

// ─── Guest Book / Ucapan ───
export interface UcapanItem {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

// ─── Dashboard Stats ───
export interface DashboardStats {
  total_tamu: number;
  hadir: number;
  tidak_hadir: number;
  pending: number;
  total_hadiah_terkirim?: number;
}

// ─── API Response ───
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// ─── Step Builder ───
export type BuilderStep =
  | 'template'
  | 'mempelai'
  | 'acara'
  | 'love-story'
  | 'galeri'
  | 'hadiah'
  | 'rsvp';

export const BUILDER_STEPS: { key: BuilderStep; label: string }[] = [
  { key: 'template', label: 'Template' },
  { key: 'mempelai', label: 'Mempelai' },
  { key: 'acara', label: 'Acara' },
  { key: 'love-story', label: 'Love Story' },
  { key: 'galeri', label: 'Galeri' },
  { key: 'hadiah', label: 'Hadiah' },
  { key: 'rsvp', label: 'RSVP' },
];
