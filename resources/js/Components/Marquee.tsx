import React from 'react';
import { Sparkles } from 'lucide-react';
import './Marquee.css';

interface MarqueeProps {
  text: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  // Safe check for text
  if (!text) return null;

  const items = text.split('•').map(t => t.trim()).filter(Boolean);
  
  // If no items after split, just use the whole text as one item
  const displayItems = items.length > 0 ? items : [text];

  return (
    <div className="ticker-container relative w-full overflow-hidden bg-[#0a192f] border-b border-white/10 py-3 md:py-4 flex items-center font-sans z-[40]">
      <div className="ticker-track">
        {[0, 1, 2].map((setIndex) => (
          <div key={setIndex} className="flex items-center">
            {displayItems.map((item: string, index: number) => (
              <div key={`${setIndex}-${index}`} className="flex items-center whitespace-nowrap px-10">
                <div className="flex items-center gap-3 text-white/90">
                  <Sparkles size={16} className="text-amber-400 shrink-0" />
                  <span 
                    className="text-[14px] font-bold tracking-wide uppercase marquee-item-content"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </div>
                <div className="mx-10 h-1 w-1 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
