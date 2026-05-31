import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://31.97.105.202:3001/api';

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
          if (data.success && data.data) {
            localStorage.setItem('accessToken', data.data.accessToken);
            localStorage.setItem('refreshToken', data.data.refreshToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
            }
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;

export const authApi = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { email: string; password: string; name: string; phone?: string }) => api.post('/auth/register', data),
  refresh: (refreshToken: string) => api.post('/auth/refresh-token', { refreshToken }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

export const invitationsApi = {
  getAll: () => api.get('/invitations'),
  getById: (id: string) => api.get(`/invitations/${id}`),
  getBySlug: (slug: string) => api.get(`/invitations/${slug}/public`),
  create: (data: Record<string, unknown>) => api.post('/invitations', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/invitations/${id}`, data),
  delete: (id: string) => api.delete(`/invitations/${id}`),
  publish: (id: string) => api.put(`/invitations/${id}/publish`),
  getDashboardStats: () => api.get('/invitations/dashboard/stats'),
};

export const guestsApi = {
  getByInvitation: (invitationId: string, params?: { status?: string; group?: string; search?: string; page?: number; limit?: number }) =>
    api.get(`/invitations/${invitationId}/guests`, { params }),
  create: (invitationId: string, data: Record<string, unknown>) => api.post(`/invitations/${invitationId}/guests`, data),
  delete: (invitationId: string, guestId: string) => api.delete(`/invitations/${invitationId}/guests/${guestId}`),
  importCsv: (invitationId: string, csvData: string) => api.post(`/invitations/${invitationId}/guests/import`, { csvData }),
  exportCsv: (invitationId: string) => api.get(`/invitations/${invitationId}/guests/export`),
  getStats: (invitationId: string) => api.get(`/invitations/${invitationId}/guests/stats`),
};

export const rsvpApi = {
  getByToken: (token: string) => publicApi.get(`/rsvp/${token}`),
  submit: (token: string, data: { status: string; count?: number; message?: string }) =>
    publicApi.post(`/rsvp/${token}`, data),
};

export const templatesApi = {
  getAll: () => publicApi.get('/templates'),
};

export const paymentsApi = {
  getPackages: () => publicApi.get('/payments/packages'),
  getOrders: () => api.get('/payments/orders'),
  createOrder: (packageId: string) => api.post('/payments/create-order', { packageId }),
};
