"use client";

import React, { useState } from 'react';

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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Take only top 5 items for the expanding effect
  const featuredItems = items.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className={`flex flex-col md:flex-row gap-3 h-[500px] md:h-[450px] overflow-hidden`}>
        {featuredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            className={`
              relative cursor-pointer overflow-hidden rounded-[24px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${expandedId === item.id ? 'flex-[3] h-[350px] md:h-full' : 'flex-1 h-[120px] md:h-full'}
              ${expandedId !== null && expandedId !== item.id ? 'flex-[0.5]' : ''}
              group
            `}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={item.image}
                alt={item.title}
                className={`
                  w-full h-full object-cover transition-all duration-700
                  group-hover:scale-110
                `}
              />
              
              {/* Overlay */}
              <div className={`
                absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                transition-opacity duration-500
                ${expandedId === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-40 md:group-hover:opacity-100'}
              `} />

              <div className={`
                absolute bottom-0 left-0 right-0 p-6 md:p-8
                transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${expandedId === item.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
              `}>
                <h3 className="text-white font-heading text-xl md:text-2xl font-bold mb-1 truncate">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base line-clamp-2">
                  {item.category} Highlight
                </p>
              </div>

              {/* Title when collapsed (vertical text for desktop?) - optional, but let's keep it simple for now */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandingGallery;
