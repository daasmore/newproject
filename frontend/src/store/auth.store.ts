import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthResponse } from '@/types';

interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (data: AuthResponse) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      refresh_token: null,
      isAuthenticated: false,
      isLoading: false,
      setAuth: (data) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        set({ user: data.user, access_token: data.access_token, refresh_token: data.refresh_token, isAuthenticated: true });
      },
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ user: null, access_token: null, refresh_token: null, isAuthenticated: false });
      },
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    { name: 'auth-store', partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }) }
  )
);
