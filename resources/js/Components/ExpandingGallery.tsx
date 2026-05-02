import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
}

interface ExpandingGalleryProps {
  items: GalleryItem[];
}

const ExpandingGallery: React.FC<ExpandingGalleryProps> = ({ items }) => {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Pre-load next/prev images for smoother experience
  useEffect(() => {
    if (selectedIndex !== null) {
      const nextIndex = (selectedIndex + 1) % items.length;
      const prevIndex = (selectedIndex - 1 + items.length) % items.length;
      new Image().src = items[nextIndex].image;
      new Image().src = items[prevIndex].image;
    }
  }, [selectedIndex, items]);

  const handleNext = () => {
    if (selectedIndex === null) return;
    setIsImageLoading(true);
    setSelectedIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setIsImageLoading(true);
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1));
  };

  const openLightbox = (index: number) => {
    setIsImageLoading(true);
    setSelectedIndex(index);
  };

  // Take only top 5 items for the expanding effect
  const featuredItems = items.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] p-2"
          >
            <X size={32} />
          </button>

          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all z-[110] border border-white/10 group/btn"
          >
            <ChevronLeft size={32} className="group-hover/btn:-translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all z-[110] border border-white/10 group/btn"
          >
            <ChevronRight size={32} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
            <div className="relative max-w-5xl w-full h-[65vh] md:h-[75vh] flex items-center justify-center">
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                  </div>
                )}
                <img
                  key={items[selectedIndex].id}
                  src={items[selectedIndex].image}
                  alt={items[selectedIndex].title || "Gallery"}
                  onLoad={() => setIsImageLoading(false)}
                  className={`max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-500 ${isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                  decoding="async"
                />
            </div>
            
            <div className="text-center space-y-2 animate-in slide-in-from-bottom-4 duration-500">
                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">{items[selectedIndex].category}</p>
                <h2 className="text-white text-2xl md:text-3xl font-black tracking-tight">{items[selectedIndex].title || "Institute Highlight"}</h2>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="h-[1px] w-8 bg-white/10" />
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Image {selectedIndex + 1} of {items.length}</p>
                  <span className="h-[1px] w-8 bg-white/10" />
                </div>
            </div>
          </div>
        </div>
      )}

      <div className={`flex flex-col md:flex-row gap-3 h-[600px] md:h-[500px] overflow-hidden`}>
        {featuredItems.map((item, index) => (
          <div
            key={item.id}
            onMouseEnter={() => setExpandedId(item.id)}
            onClick={() => openLightbox(index)}
            className={`
              relative cursor-pointer overflow-hidden rounded-[24px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] bg-slate-100
              ${expandedId === item.id ? 'flex-[4] h-[350px] md:h-full' : 'flex-1 h-[120px] md:h-full'}
              ${expandedId !== null && expandedId !== item.id ? 'flex-[0.8]' : ''}
              group
            `}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={item.image}
                alt={item.title || "Gallery Item"}
                loading="lazy"
                decoding="async"
                className={`
                  w-full h-full object-cover transition-all duration-700
                  group-hover:scale-110
                `}
              />
              
              {/* Overlay */}
              <div className={`
                absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                transition-opacity duration-500
                ${expandedId === item.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}
              `} />

              {/* Expand Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={18} />
              </div>

              <div className={`
                absolute bottom-0 left-0 right-0 p-6 md:p-8
                transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${expandedId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
              `}>
                <h3 className="text-white font-heading text-xl md:text-2xl font-bold mb-1 truncate">
                  {item.title || "Institute Life"}
                </h3>
                <p className="text-white/70 text-sm md:text-base line-clamp-2">
                  {item.category} Highlight
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Rest of the gallery items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {items.slice(5).map((item, index) => (
              <div 
                key={item.id} 
                onClick={() => openLightbox(index + 5)}
                className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-lg border border-slate-100 bg-slate-100"
              >
                  <img 
                    src={item.image} 
                    alt={item.title || "Gallery Item"} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300 mb-2">
                        <Maximize2 size={18} />
                      </div>
                      <p className="text-white text-[10px] font-black uppercase tracking-widest">{item.category}</p>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default ExpandingGallery;
