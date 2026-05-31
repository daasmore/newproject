'use client';

import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-6 p-4">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}
