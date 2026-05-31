import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center justify-center px-4">
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-12 w-64 mb-2" />
      <Skeleton className="h-4 w-48 mb-8" />
      <div className="w-full max-w-2xl space-y-4">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </div>
  );
}
