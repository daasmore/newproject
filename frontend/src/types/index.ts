export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  plan: 'free' | 'basic' | 'premium';
  subscription_expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface BrideGroom {
  full_name: string;
  nickname: string;
  photo_url?: string;
  father_name: string;
  mother_name: string;
  child_order: string;
  social_media?: { instagram?: string; twitter?: string };
}

export interface EventDetail {
  type: 'akad' | 'resepsi';
  date: string;
  start_time: string;
  end_time: string;
  location_name: string;
  address: string;
  maps_embed_url?: string;
  maps_link?: string;
}

export interface LoveStory {
  id?: string;
  date: string;
  title: string;
  description: string;
  photo_url?: string;
}

export interface GalleryImage {
  id?: string;
  url: string;
  caption?: string;
  order: number;
}

export interface GiftAccount {
  id?: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  type: 'bank' | 'ewallet';
}

export interface Invitation {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  template_id: string;
  bride: BrideGroom;
  groom: BrideGroom;
  events: EventDetail[];
  love_stories: LoveStory[];
  gallery_images: GalleryImage[];
  gift_accounts: GiftAccount[];
  music_url?: string;
  cover_photo_url?: string;
  welcome_message?: string;
  rsvp_deadline?: string;
  is_published: boolean;
  meta_title?: string;
  meta_description?: string;
  meta_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  group?: string;
  phone?: string;
  email?: string;
  rsvp_status: 'pending' | 'attending' | 'not_attending';
  guest_count: number;
  message?: string;
  personal_token: string;
  created_at: string;
  updated_at: string;
}

export interface RSVPInput {
  name: string;
  attending: boolean;
  guest_count: number;
  message: string;
}

export interface DashboardStats {
  total_guests: number;
  attending: number;
  not_attending: number;
  pending: number;
  recent_rsvps: { name: string; status: string; created_at: string }[];
}

export interface BuilderState {
  currentStep: number;
  invitation: Partial<Invitation>;
  isDraft: boolean;
  lastSaved?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
