'use client';

const steps = ['Template', 'Mempelai', 'Acara', 'Story', 'Galeri', 'Hadiah', 'RSVP'];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-10 px-2 overflow-x-auto">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold font-[Inter] transition-all duration-300 ${
                i < current
                  ? 'bg-amber-500 text-black'
                  : i === current
                  ? 'bg-amber-500/20 border-2 border-amber-500 text-amber-400'
                  : 'bg-white/[0.04] border border-white/10 text-white/25'
              }`}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`text-[10px] mt-2 font-[Inter] whitespace-nowrap ${
              i <= current ? 'text-amber-400/80' : 'text-white/20'
            }`}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 md:w-12 h-px mx-2 mt-[-18px] transition-colors duration-300 ${
              i < current ? 'bg-amber-500/40' : 'bg-white/5'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
