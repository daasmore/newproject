const colors: Record<string, string> = {
  attending: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  not_attending: 'bg-red-500/15 text-red-400 border-red-500/20',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
};
const labels: Record<string, string> = { attending: 'Hadir', not_attending: 'Tidak Hadir', pending: 'Menunggu' };
export default function Badge({ status }: { status: string }) {
  return <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium border font-[Inter] ${colors[status] || colors.pending}`}>{labels[status] || status}</span>;
}
