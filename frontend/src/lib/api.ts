import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');
        const { data } = await axios.post(`${API_URL}/api/auth/refresh`, { refresh_token: refreshToken });
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        originalReq.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalReq);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { email: string; password: string; name: string; phone?: string }) => api.post('/auth/register', data),
  refresh: (refresh_token: string) => api.post('/auth/refresh', { refresh_token }),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
};

export const invitationsApi = {
  getAll: () => api.get('/invitations'),
  getById: (id: string) => api.get(`/invitations/${id}`),
  getBySlug: (slug: string) => api.get(`/invitations/slug/${slug}`),
  create: (data: Record<string, unknown>) => api.post('/invitations', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/invitations/${id}`, data),
  delete: (id: string) => api.delete(`/invitations/${id}`),
  publish: (id: string) => api.post(`/invitations/${id}/publish`),
};

export const guestsApi = {
  getByInvitation: (invitationId: string, params?: { status?: string; group?: string; search?: string; page?: number; limit?: number }) =>
    api.get(`/guests/invitation/${invitationId}`, { params }),
  create: (invitationId: string, data: Record<string, unknown>) => api.post(`/guests/invitation/${invitationId}`, data),
  bulkCreate: (invitationId: string, guests: Record<string, unknown>[]) => api.post(`/guests/invitation/${invitationId}/bulk`, { guests }),
  delete: (id: string) => api.delete(`/guests/${id}`),
  importCsv: (invitationId: string, csvData: string) => api.post(`/guests/invitation/${invitationId}/import`, { csv: csvData }),
};

export const rsvpApi = {
  submit: (slug: string, token: string, data: { name: string; attending: boolean; guest_count: number; message: string }) =>
    api.post(`/rsvp/${slug}/${token}`, data),
  getByInvitation: (invitationId: string) => api.get(`/rsvp/invitation/${invitationId}`),
};

export const dashboardApi = {
  getStats: (invitationId: string) => api.get(`/dashboard/stats/${invitationId}`),
};

export const uploadApi = {
  uploadFile: (file: File, folder?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) formData.append('folder', folder);
    const headers = { 'Content-Type': 'multipart/form-data' };
    return api.post('/upload', formData, { headers });
  },
};
