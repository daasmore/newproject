'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input, Button } from '@/components/ui';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setServerError('');
    try {
      const res = await authApi.login(data);
      setAuth(res.data);
      router.push('/dashboard');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setServerError(axiosErr.response?.data?.message ?? 'Gagal masuk. Periksa kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060c] flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-black font-bold font-[Playfair_Display]">W</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold font-[Playfair_Display] text-white/90 mb-2">Selamat Datang</h1>
          <p className="text-sm text-white/30 font-[Inter]">Masuk ke akun WeddingInv Anda</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {serverError && (
            <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/15 text-sm text-red-400/80 font-[Inter]">
              {serverError}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Masukkan password"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/4 accent-amber-500" />
              <span className="text-xs text-white/30 font-[Inter]">Ingat saya</span>
            </label>
            <Link href="/forgot-password" className="text-xs text-amber-400/60 hover:text-amber-400/80 font-[Inter] transition-colors">
              Lupa password?
            </Link>
          </div>

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            Masuk
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-white/25 font-[Inter]">
          Belum punya akun?{' '}
          <Link href="/register" className="text-amber-400/70 hover:text-amber-400 font-medium transition-colors">
            Daftar gratis
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
