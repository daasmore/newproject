import { create } from 'zustand';
import type { WeddingData, AcaraItem, GalleryItem, LoveStoryEvent, GiftBank, GiftEWallet } from '@/types';
import { BUILDER_STEPS, type BuilderStep } from '@/types';

interface BuilderState {
  currentStep: number;
  weddingData: Partial<WeddingData>;
  isSaving: boolean;
  currentStepKey: BuilderStep;
  setStep: (step: number) => void;
  setStepByKey: (step: BuilderStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateMempelai: (data: Partial<WeddingData['mempelai']>) => void;
  updateAcara: (acara: AcaraItem[]) => void;
  addAcara: (item: AcaraItem) => void;
  removeAcara: (id: string) => void;
  updateLoveStory: (items: LoveStoryEvent[]) => void;
  updateGallery: (items: GalleryItem[]) => void;
  addGallery: (item: GalleryItem) => void;
  removeGallery: (id: string) => void;
  addBankGift: (bank: GiftBank) => void;
  removeBankGift: (id: string) => void;
  addEWalletGift: (wallet: GiftEWallet) => void;
  removeEWalletGift: (id: string) => void;
  updateRSVPSettings: (settings: Partial<WeddingData['rsvp_settings']>) => void;
  setTemplateId: (id: string) => void;
  setSlug: (slug: string) => void;
  setCoverPhoto: (url: string) => void;
  setMusicUrl: (url: string) => void;
  resetBuilder: () => void;
  setSaving: (saving: boolean) => void;
  setWeddingData: (data: Partial<WeddingData>) => void;
  publish: () => void;
}

const initialState = {
  currentStep: 0,
  isSaving: false,
  currentStepKey: BUILDER_STEPS[0].key,
  weddingData: {
    slug: '',
    template_id: '',
    mempelai: {
      bride_nickname: '',
      bride_full_name: '',
      bride_father: '',
      bride_mother: '',
      groom_nickname: '',
      groom_full_name: '',
      groom_father: '',
      groom_mother: '',
    },
    acara: [],
    love_story: [],
    gallery: [],
    gifts: { banks: [], e_wallets: [], addresses: [] },
    rsvp_settings: { deadline: '', max_guests: 2, custom_message: 'Mohon konfirmasi kehadiran Anda' },
    is_paid: false,
    is_published: false,
  },
};

export const useBuilderStore = create<BuilderState>()((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step, currentStepKey: BUILDER_STEPS[step]?.key || 'template' }),
  setStepByKey: (step) => {
    const idx = BUILDER_STEPS.findIndex((s) => s.key === step);
    set({ currentStep: idx >= 0 ? idx : 0, currentStepKey: step });
  },
  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < BUILDER_STEPS.length - 1) {
      const next = currentStep + 1;
      set({ currentStep: next, currentStepKey: BUILDER_STEPS[next].key });
    }
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      const prev = currentStep - 1;
      set({ currentStep: prev, currentStepKey: BUILDER_STEPS[prev].key });
    }
  },

  updateMempelai: (data) => set((s) => ({
    weddingData: { ...s.weddingData, mempelai: { ...s.weddingData.mempelai!, ...data } },
  })),

  updateAcara: (acara) => set((s) => ({
    weddingData: { ...s.weddingData, acara },
  })),

  addAcara: (item) => set((s) => ({
    weddingData: { ...s.weddingData, acara: [...(s.weddingData.acara || []), item] },
  })),

  removeAcara: (id) => set((s) => ({
    weddingData: { ...s.weddingData, acara: (s.weddingData.acara || []).filter((a) => a.id !== id) },
  })),

  updateLoveStory: (items) => set((s) => ({
    weddingData: { ...s.weddingData, love_story: items },
  })),

  updateGallery: (items) => set((s) => ({
    weddingData: { ...s.weddingData, gallery: items },
  })),

  addGallery: (item) => set((s) => ({
    weddingData: { ...s.weddingData, gallery: [...(s.weddingData.gallery || []), item] },
  })),

  removeGallery: (id) => set((s) => ({
    weddingData: { ...s.weddingData, gallery: (s.weddingData.gallery || []).filter((g) => g.id !== id) },
  })),

  addBankGift: (bank) => set((s) => ({
    weddingData: { ...s.weddingData, gifts: { ...s.weddingData.gifts!, banks: [...(s.weddingData.gifts?.banks || []), bank] } },
  })),

  removeBankGift: (id) => set((s) => ({
    weddingData: { ...s.weddingData, gifts: { ...s.weddingData.gifts!, banks: (s.weddingData.gifts?.banks || []).filter((b) => b.id !== id) } },
  })),

  addEWalletGift: (wallet) => set((s) => ({
    weddingData: { ...s.weddingData, gifts: { ...s.weddingData.gifts!, e_wallets: [...(s.weddingData.gifts?.e_wallets || []), wallet] } },
  })),

  removeEWalletGift: (id) => set((s) => ({
    weddingData: { ...s.weddingData, gifts: { ...s.weddingData.gifts!, e_wallets: (s.weddingData.gifts?.e_wallets || []).filter((w) => w.id !== id) } },
  })),

  updateRSVPSettings: (settings) => set((s) => ({
    weddingData: { ...s.weddingData, rsvp_settings: { ...s.weddingData.rsvp_settings!, ...settings } },
  })),

  setTemplateId: (id) => set((s) => ({
    weddingData: { ...s.weddingData, template_id: id },
  })),

  setSlug: (slug) => set((s) => ({
    weddingData: { ...s.weddingData, slug },
  })),

  setCoverPhoto: (url) => set((s) => ({
    weddingData: { ...s.weddingData, cover_photo: url },
  })),

  setMusicUrl: (url) => set((s) => ({
    weddingData: { ...s.weddingData, music_url: url },
  })),

  setSaving: (isSaving) => set({ isSaving }),
  setWeddingData: (data) => set((s) => ({
    weddingData: { ...s.weddingData, ...data },
  })),

  publish: () => set((s) => ({
    weddingData: { ...s.weddingData, is_published: true },
  })),

  resetBuilder: () => set(initialState),
}));
