export default function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}
export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-3">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-3 w-full rounded" />
    </div>
  );
}
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/5"><Skeleton className="h-4 w-32 rounded" /></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 border-b border-white/[0.03] flex gap-4">
          <Skeleton className="h-4 flex-1 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      ))}
    </div>
  );
}
