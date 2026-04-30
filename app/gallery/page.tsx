"use client";

import { useState, useEffect } from "react";
import { X, Image as ImageIcon, ZoomIn, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ExpandingGallery from "@/components/ExpandingGallery";

export default function GalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [hero, setHero] = useState({
    badge: "VISUAL JOURNEY",
    title: "Campus Moments",
    subtitle: "A glimpse into life at STC Umerkot — events, classroom activities, and campus highlights."
  });
  const [selected, setSelected] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(data => {
        setGallery(data.gallery || []);
        if (data.pageHeroes?.gallery) {
          setHero(data.pageHeroes.gallery);
        }
      })
      .catch((err) => console.error("Failed to fetch gallery content:", err));
  }, []);

  const categories = ["All", ...Array.from(new Set(gallery?.map((g: any) => g.category) || []))];
  const filtered = activeCategory === "All" ? gallery : gallery.filter((g: any) => g.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="mesh-gradient py-20 pt-24 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10">
          <AnimatedSection>
            <p className="text-amber-400 text-xs font-bold tracking-[0.15em] uppercase mb-3">{hero.badge}</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
              {hero.title}
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Featured Expanding Gallery */}
      {gallery.length > 0 && (
        <section className="py-12 bg-white -mt-10 relative z-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
             <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
               <Sparkles className="text-amber-500" size={20} />
               <h2 className="text-navy font-bold tracking-tight text-xl">Featured Highlights</h2>
             </div>
             <ExpandingGallery items={gallery} />
          </div>
        </section>
      )}

      {/* Filters + Grid */}
      <section className="py-24 gradient-section">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Category Filter */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat as string}
                  onClick={() => setActiveCategory(cat as string)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-cyan-700 to-teal-600 text-white shadow-md"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-cyan-600 hover:text-cyan-700"
                  }`}
                >
                  {cat as string}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item: any, i: number) => (
              <AnimatedSection key={item.id} delay={i * 0.05} direction="scale">
                <div
                  className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square"
                  onClick={() => setSelected(item)}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <ImageIcon size={40} className="text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-gold text-xs">{item.category}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>No photos found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/20 transition-all">
            <X size={24} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selected.image} alt={selected.title} className="w-full max-h-[80vh] object-contain rounded-2xl" />
            <div className="text-center mt-4">
              <p className="text-white font-bold text-lg">{selected.title}</p>
              <p className="text-gold text-sm">{selected.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
