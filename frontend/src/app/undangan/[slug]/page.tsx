import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from '@/lib/api';
import UndanganClient from './undangan-client';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { data } = await api.get(`/invitations/${slug}/public`);
    const inv = data.data;
    return {
      title: inv?.title || 'Undangan Pernikahan',
      openGraph: { title: inv?.title || 'Undangan Pernikahan', images: inv?.cover_photo_url ? [inv.cover_photo_url] : [] },
    };
  } catch { return { title: 'Undangan Pernikahan' }; }
}

export default async function UndanganPage({ params }: Props) {
  const { slug } = await params;
  try {
    const { data } = await api.get(`/invitations/${slug}/public`);
    const invitation = data.data;
    if (!invitation) notFound();
    return <UndanganClient invitation={invitation} />;
  } catch { notFound(); }
}
