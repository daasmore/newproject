'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // ISO date string e.g. "2025-09-15T08:00:00"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pads = [
    { label: 'Hari', value: time.days },
    { label: 'Jam', value: time.hours },
    { label: 'Menit', value: time.minutes },
    { label: 'Detik', value: time.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-6 my-8">
      {pads.map((p) => (
        <div key={p.label} className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/80 backdrop-blur border border-amber-200 flex items-center justify-center shadow-sm">
            <span className="text-2xl sm:text-3xl font-bold text-amber-800 tabular-nums">
              {String(p.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-amber-600 mt-1 block">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
