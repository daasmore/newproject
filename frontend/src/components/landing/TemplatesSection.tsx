'use client';

import { motion } from 'framer-motion';

const templates = [
  {
    id: 'classic',
    name: 'Classic Elegance',
    label: 'Emas & Navy',
    description: 'Elegan klasik dengan aksen emas, ornamen floral, dan typography serif yang mewah.',
    colors: ['#1a1a2e', '#d4a574', '#ffd700'],
    accent: '#d4a574',
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    label: 'Putih & Hitam',
    description: 'Bersih dan kontemporer. Layout geometris dengan whitespace yang luas.',
    colors: ['#ffffff', '#1a1a1a', '#f5f5f5'],
    accent: '#1a1a1a',
  },
  {
    id: 'nusantara',
    name: 'Nusantara',
    label: 'Batik & Budaya',
    description: 'Kaya ornamen budaya Indonesia dengan warna hangat dan bordir tradisional.',
    colors: ['#5c3317', '#c59732', '#faf5eb'],
    accent: '#c59732',
  },
];

export default function TemplatesSection() {
  return (
    <section id="tema" className="relative py-32 md:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-amber-400/50 text-xs tracking-[0.3em] uppercase font-[Inter] mb-4">Koleksi Template</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[Playfair_Display] tracking-tight">
            Pilihan <span className="text-shimmer">Template Premium</span>
          </h2>
          <p className="text-white/30 mt-4 max-w-lg mx-auto font-[Inter] leading-relaxed text-sm">
            Setiap template dirancang unik dengan animasi, layout, dan karakter yang berbeda.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="template-card group rounded-3xl overflow-hidden glass-card"
            >
              {/* Preview mockup */}
              <div className="aspect-[3/4] relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, ${t.colors[0]}, ${t.colors[1]}40, ${t.colors[2]}20)`,
                  }}
                />
                {/* Mockup content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-16 h-16 rounded-full border border-white/10 mb-6 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full" style={{ background: t.accent }} />
                  </div>
                  <div className="w-32 h-1 rounded-full bg-white/10 mb-3" />
                  <div className="w-24 h-1 rounded-full bg-white/5 mb-6" />
                  <div className="w-40 h-16 rounded-lg border border-white/10 flex items-center justify-center">
                    <span className="text-[10px] text-white/20 tracking-wider uppercase">{t.label}</span>
                  </div>
                  {/* Color swatches */}
                  <div className="flex gap-2 mt-6">
                    {t.colors.map((c, j) => (
                      <div key={j} className="w-6 h-6 rounded-full border border-white/10" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white/90 font-[Playfair_Display] mb-1">{t.name}</h3>
                <p className="text-xs text-amber-400/60 mb-3 tracking-wider uppercase font-[Inter]">{t.label}</p>
                <p className="text-sm text-white/30 font-[Inter] leading-relaxed">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
