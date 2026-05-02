import { Head } from "@inertiajs/react";
import AnimatedSection from "@/Components/AnimatedSection";
import ExpandingGallery from "@/Components/ExpandingGallery";
import MainLayout from "@/Layouts/MainLayout";

interface GalleryProps {
    gallery: any[];
    siteContent: any;
}

export default function GalleryPage({ gallery, siteContent }: GalleryProps) {
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.gallery || {
    badge: "VISUAL JOURNEY",
    title: "Institute Life & Achievements",
    subtitle: "A visual showcase of our learning environment, digital labs, and student activities."
  };

  return (
    <div className="bg-white min-h-screen">
      <Head title="Gallery" />
      
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-900">
        {hero.backgroundImage ? (
          <>
            <div className="absolute inset-0 z-0">
              <img src={hero.backgroundImage} alt="" className="w-full h-full object-cover opacity-40" />
            </div>
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900" />
          </>
        ) : (
          <div className="absolute inset-0 mesh-gradient opacity-100" />
        )}
        
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10">
          <AnimatedSection>
            {hero.badge && <p className="text-amber-400 text-xs font-black tracking-[0.2em] uppercase mb-4 opacity-90">{hero.badge}</p>}
            {hero.title && (
              <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                {hero.title}
              </h1>
            )}
            {hero.subtitle && (
              <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed opacity-80">
                {hero.subtitle}
              </p>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <ExpandingGallery items={gallery} />
        </div>
      </section>
    </div>
  );
}

GalleryPage.layout = (page: any) => <MainLayout children={page} />;
