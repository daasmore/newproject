'use client';
import { motion } from 'framer-motion';


interface StatsCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color?: string;
  delay?: number;
}

export default function StatsCard({ icon, value, label, color = 'from-amber-500/10 to-amber-600/5', delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card rounded-2xl p-5"
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} border border-white/5 flex items-center justify-center text-lg mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-white font-[Playfair_Display]">{value}</div>
      <div className="text-xs text-white/30 mt-1 font-[Inter]">{label}</div>
    </motion.div>
  );
}
