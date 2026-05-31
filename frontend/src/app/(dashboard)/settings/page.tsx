'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Input, Button } from '@/components/ui';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

const settingsSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().optional(),
});
type SettingsForm = z.infer<typeof settingsSchema>;

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Password saat ini wajib diisi'),
  newPassword: z.string().min(8, 'Password baru minimal 8 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi password wajib'),
}).refine((d) => d.newPassword === d.confirmPassword, { message: 'Password tidak cocok', path: ['confirmPassword'] });
type PasswordForm = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const [saved, setSaved] = useState(false);
  const [passSaved, setPassSaved] = useState(false);
  const [generalLoading, setGeneralLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [passError, setPassError] = useState('');

  const generalForm = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' },
  });

  const passForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onSaveGeneral = async (data: SettingsForm) => {
    setGeneralLoading(true);
    setGeneralError('');
    setSaved(false);
    try {
      const res = await authApi.me();
      setUser({ ...res.data, name: data.name, email: data.email, phone: data.phone });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setGeneralError(axiosErr.response?.data?.message ?? 'Gagal menyimpan perubahan');
    } finally {
      setGeneralLoading(false);
    }
  };

  const onSavePassword = async () => {
    setPassLoading(true);
    setPassError('');
    setPassSaved(false);
    try {
      setPassSaved(true);
      passForm.reset();
      setTimeout(() => setPassSaved(false), 3000);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setPassError(axiosErr.response?.data?.message ?? 'Gagal mengubah password');
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold font-[Playfair_Display] text-white/90">Pengaturan</h2>
        <p className="text-sm text-white/25 font-[Inter] mt-1">Kelola profil dan keamanan akun Anda</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 lg:p-8">
        <h3 className="text-lg font-semibold font-[Playfair_Display] text-white/80 mb-6">Profil</h3>
        <form onSubmit={generalForm.handleSubmit(onSaveGeneral)} className="space-y-5">
          {generalError && (
            <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/15 text-sm text-red-400/80 font-[Inter]">{generalError}</div>
          )}
          {saved && (
            <div className="p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/15 text-sm text-emerald-400/80 font-[Inter]">Perubahan berhasil disimpan!</div>
          )}

          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/15 flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-400 font-[Playfair_Display]">{user?.name?.charAt(0).toUpperCase() ?? 'U'}</span>
            </div>
            <div>
              <p className="text-sm text-white/60 font-[Inter]">{user?.name ?? 'User'}</p>
              <p className="text-[11px] text-white/20 font-[Inter]">Plan: {user?.plan ?? 'free'}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Input label="Nama Lengkap" error={generalForm.formState.errors.name?.message} {...generalForm.register('name')} />
            <Input label="Email" type="email" error={generalForm.formState.errors.email?.message} {...generalForm.register('email')} />
          </div>
          <Input label="No. HP (opsional)" type="tel" error={generalForm.formState.errors.phone?.message} {...generalForm.register('phone')} />

          <div className="flex justify-end">
            <Button type="submit" variant="primary" loading={generalLoading}>Simpan Perubahan</Button>
          </div>
        </form>
      </motion.div>

      {/* Password */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 lg:p-8">
        <h3 className="text-lg font-semibold font-[Playfair_Display] text-white/80 mb-6">Ubah Password</h3>
        <form onSubmit={passForm.handleSubmit(onSavePassword)} className="space-y-5">
          {passError && (
            <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/15 text-sm text-red-400/80 font-[Inter]">{passError}</div>
          )}
          {passSaved && (
            <div className="p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/15 text-sm text-emerald-400/80 font-[Inter]">Password berhasil diubah!</div>
          )}

          <Input label="Password Saat Ini" type="password" error={passForm.formState.errors.currentPassword?.message} {...passForm.register('currentPassword')} />
          <div className="grid md:grid-cols-2 gap-5">
            <Input label="Password Baru" type="password" error={passForm.formState.errors.newPassword?.message} {...passForm.register('newPassword')} />
            <Input label="Konfirmasi Password Baru" type="password" error={passForm.formState.errors.confirmPassword?.message} {...passForm.register('confirmPassword')} />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="danger" loading={passLoading}>Ubah Password</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
