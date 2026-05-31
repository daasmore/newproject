'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
  )},
  { label: 'Builder', href: '/dashboard/builder', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14.5 7.5v-3a1.5 1.5 0 00-1.5-1.5h-10A1.5 1.5 0 001.5 4.5v9a1.5 1.5 0 001.5 1.5h10a1.5 1.5 0 001.5-1.5v-3M6 9h9M12 6l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )},
  { label: 'Tamu', href: '/dashboard/tamu', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.2"/><path d="M1 16c0-3.314 2.91-6 6.5-6s6.5 2.686 6.5 6" stroke="currentColor" strokeWidth="1.2"/><path d="M13.5 7a2.5 2.5 0 100-5M17 16v-1c0-2.21-1.5-4-3.5-4" stroke="currentColor" strokeWidth="1.2"/></svg>
  )},
  { label: 'Settings', href: '/dashboard/settings', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.2"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.5 3.5l1.5 1.5M13 13l1.5 1.5M3.5 14.5l1.5-1.5M13 5l1.5-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
  )},
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#06060c] flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0a0a12] border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <span className="text-black font-bold font-[Playfair_Display]">W</span>
          </div>
          <span className="text-lg font-bold font-[Playfair_Display] text-white/90">
            Wedding<span className="text-gradient">Inv</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-[Inter] ${
                  active ? 'active text-amber-400 bg-amber-500/8' : 'text-white/35 hover:text-white/60'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/10 flex items-center justify-center text-xs font-bold text-amber-400">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/70 truncate font-[Inter]">{user?.name ?? 'User'}</p>
              <p className="text-[10px] text-white/20 truncate font-[Inter]">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/50 hover:text-red-400 hover:bg-red-500/5 w-full font-[Inter]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6.5 4.5A1.5 1.5 0 005 6v6a1.5 1.5 0 001.5 1.5h5M10 9h6M13.5 6.5L16 9l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-20 glass px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-white/40"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <h1 className="text-lg font-semibold font-[Playfair_Display] text-white/80 hidden lg:block">
            {navItems.find((n) => n.href === pathname)?.label ?? 'Dashboard'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/20 font-[Inter]">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
