import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TemplatesSection from '@/components/landing/TemplatesSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#06060c] text-white overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <div className="flex items-center justify-center gap-3 py-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/15" />
        <svg width="16" height="16" viewBox="0 0 16 16" className="opacity-20">
          <circle cx="8" cy="8" r="2" fill="#d4a574" />
          <circle cx="8" cy="8" r="5" stroke="#d4a574" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/15" />
      </div>
      <TemplatesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
