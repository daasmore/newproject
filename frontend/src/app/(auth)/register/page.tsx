'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi password wajib'),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
});
type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError('');
    try {
      const res = await authApi.register({ name: data.name, email: data.email, password: data.password, phone: data.phone });
      setAuth(res.data);
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        : 'Gagal daftar. Coba lagi.';
      setError(msg || 'Gagal daftar. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060c] flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-600/[0.02] blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <span className="text-lg">💒</span>
            </div>
            <span className="text-xl font-semibold font-[Playfair_Display]">
              <span className="text-amber-400">Wedding</span><span className="text-white/50">Inv</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white font-[Playfair_Display]">Buat Akun Baru</h1>
          <p className="text-sm text-white/30 mt-2 font-[Inter]">Daftar gratis, buat undangan pertama Anda</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-[Inter]">{error}</div>
          )}

          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-[Inter]">Nama Lengkap</label>
            <input {...register('name')} placeholder="Nama lengkap Anda" className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
            {errors.name && <p className="text-red-400 text-xs mt-1 font-[Inter]">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-[Inter]">Email</label>
            <input {...register('email')} type="email" placeholder="nama@email.com" className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
            {errors.email && <p className="text-red-400 text-xs mt-1 font-[Inter]">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-[Inter]">No. HP <span className="text-white/15">(opsional)</span></label>
            <input {...register('phone')} placeholder="0812xxxx" className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-[Inter]">Password</label>
            <input {...register('password')} type="password" placeholder="Minimal 6 karakter" className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
            {errors.password && <p className="text-red-400 text-xs mt-1 font-[Inter]">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1.5 font-[Inter]">Konfirmasi Password</label>
            <input {...register('confirmPassword')} type="password" placeholder="Ulangi password" className="w-full px-4 py-3 rounded-xl input-dark font-[Inter] text-sm" />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 font-[Inter]">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl btn-primary font-[Playfair_Display] font-semibold tracking-tight disabled:opacity-50 mt-2">
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center text-sm text-white/25 mt-8 font-[Inter]">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-amber-400/80 hover:text-amber-400">Masuk</Link>
        </p>
      </motion.div>
    </div>
  );
}
