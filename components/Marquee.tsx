"use client";

import React from 'react';
import { Sparkles, ArrowRight, GraduationCap, Award, Zap } from 'lucide-react';

interface MarqueeProps {
  text: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  const items = text.split('•').map(t => t.trim()).filter(Boolean);

  return (
    <div className="ticker-container relative w-full overflow-hidden bg-[#0a192f] border-b border-white/10 py-3.5 font-sans">
      <style jsx>{`
        @keyframes scroll-text {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .ticker-track {
          display: flex;
          width: max-content;
          animation: scroll-text 40s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        /* Ambient glow effect */
        .ticker-container::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #0a192f 0%, transparent 15%, transparent 85%, #0a192f 100%);
          z-index: 10;
          pointer-events: none;
        }

        .marquee-item-content a {
          color: #fbbf24;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-left: 8px;
          transition: all 0.2s;
        }

        .marquee-item-content a:hover {
          color: #f59e0b;
          text-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
        }

        .btn-marquee {
          background: linear-gradient(to right, #fbbf24, #f59e0b);
          color: #0a192f !important;
          padding: 3px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 800 !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.2);
        }
      `}</style>

      <div className="ticker-track">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center">
            {items.map((item, index) => (
              <div key={`${setIndex}-${index}`} className="flex items-center whitespace-nowrap px-10">
                <div className="flex items-center gap-3 text-white/90">
                  <Sparkles size={16} className="text-amber-400" />
                  <span 
                    className="text-[14px] font-bold tracking-wide uppercase"
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
