import { create } from 'zustand';
import type { Invitation, BuilderState } from '@/types';

interface BuilderStore extends BuilderState {
  setStep: (step: number) => void;
  setTemplate: (templateId: string) => void;
  setBrideGroom: (type: 'bride' | 'groom', data: Record<string, unknown>) => void;
  setEvents: (events: Invitation['events']) => void;
  setLoveStories: (stories: Invitation['love_stories']) => void;
  setGallery: (images: Invitation['gallery_images']) => void;
  setGifts: (gifts: Invitation['gift_accounts']) => void;
  setRsvpSettings: (settings: { deadline?: string; welcome_message?: string }) => void;
  setSlug: (slug: string) => void;
  setTitle: (title: string) => void;
  setCoverPhoto: (url: string) => void;
  setMusic: (url: string) => void;
  markSaved: () => void;
  reset: () => void;
}

const initialState: BuilderState = {
  currentStep: 0,
  invitation: { template_id: '', is_published: false },
  isDraft: true,
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  ...initialState,
  setStep: (step) => set({ currentStep: step }),
  setTemplate: (templateId) => set((s) => ({ invitation: { ...s.invitation, template_id: templateId } })),
  setBrideGroom: (type, data) => set((s) => ({ invitation: { ...s.invitation, [type]: data } })),
  setEvents: (events) => set((s) => ({ invitation: { ...s.invitation, events } })),
  setLoveStories: (stories) => set((s) => ({ invitation: { ...s.invitation, love_stories: stories } })),
  setGallery: (images) => set((s) => ({ invitation: { ...s.invitation, gallery_images: images } })),
  setGifts: (gifts) => set((s) => ({ invitation: { ...s.invitation, gift_accounts: gifts } })),
  setRsvpSettings: (settings) => set((s) => ({ invitation: { ...s.invitation, ...settings } })),
  setSlug: (slug) => set((s) => ({ invitation: { ...s.invitation, slug } })),
  setTitle: (title) => set((s) => ({ invitation: { ...s.invitation, title } })),
  setCoverPhoto: (url) => set((s) => ({ invitation: { ...s.invitation, cover_photo_url: url } })),
  setMusic: (url) => set((s) => ({ invitation: { ...s.invitation, music_url: url } })),
  markSaved: () => set({ lastSaved: new Date().toISOString(), isDraft: true }),
  reset: () => set(initialState),
}));
