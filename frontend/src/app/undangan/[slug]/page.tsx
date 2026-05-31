import type { Metadata } from 'next';
import Template1 from '@/components/templates/Template1';
import Template2 from '@/components/templates/Template2';
import Template3 from '@/components/templates/Template3';
import { invitationsApi } from '@/lib/api';
import type { Invitation } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate metadata for WhatsApp sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await invitationsApi.getBySlug(slug);
    const inv = res.data?.data || res.data;
    return {
      title: `${inv?.title || 'Undangan Pernikahan'} — ${inv?.groom?.full_name || ''} & ${inv?.bride?.full_name || ''}`,
      description: `Anda diundang ke pernikahan ${inv?.groom?.full_name || ''} & ${inv?.bride?.full_name || ''}. Klik untuk melihat undangan lengkap.`,
      openGraph: {
        title: inv?.title || 'Undangan Pernikahan',
        description: `Anda diundang ke pernikahan ${inv?.groom?.full_name || ''} & ${inv?.bride?.full_name || ''}`,
        type: 'website',
        images: inv?.cover_photo_url ? [inv.cover_photo_url] : [],
      },
    };
  } catch {
    return { title: 'Undangan Pernikahan' };
  }
}

export default async function InvitationPage({ params }: Props) {
  const { slug } = await params;

  let invitation: Invitation | null = null;
  try {
    const res = await invitationsApi.getBySlug(slug);
    invitation = res.data?.data || res.data;
  } catch {
    return (
      <div className="min-h-screen bg-[#06060c] flex items-center justify-center text-white/40 font-[Inter] text-sm">
        Undangan tidak ditemukan.
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-[#06060c] flex items-center justify-center text-white/40 font-[Inter] text-sm">
        Undangan tidak ditemukan.
      </div>
    );
  }

  const templateId = invitation.template_id || 'classic';

  switch (templateId) {
    case 'modern':
    case '2':
      return <Template2 data={invitation} />;
    case 'nusantara':
    case '3':
      return <Template3 data={invitation} />;
    default:
      return <Template1 data={invitation} />;
  }
}
