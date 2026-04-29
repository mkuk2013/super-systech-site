"use client";

import { useState, useEffect } from "react";
import { ChevronUp, X } from "lucide-react";

export default function FloatingActions() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [tooltip, setTooltip] = useState(true);
  const [number, setNumber] = useState("03003198050");

  useEffect(() => {
    fetch("/api/content?section=settings")
      .then((r) => r.json())
      .then((s) => { if (s.whatsappNumber) setNumber(s.whatsappNumber); })
      .catch((err) => console.error("Failed to fetch settings in FloatingActions:", err));

    const t = setTimeout(() => setShowWhatsApp(true), 2000);
    const t2 = setTimeout(() => setTooltip(false), 8000);

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => { 
      clearTimeout(t); 
      clearTimeout(t2); 
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border border-gray-100 text-slate-900 transition-all duration-300 transform ${
          showScroll ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-50 pointer-events-none"
        } hover:bg-slate-900 hover:text-white hover:-translate-y-1`}
      >
        <ChevronUp size={24} />
      </button>

      <div className="flex items-end gap-3">
        {/* WhatsApp Tooltip */}
        {showWhatsApp && tooltip && (
          <div className="bg-white rounded-2xl shadow-2xl px-4 py-3 max-w-[200px] relative animate-fade-in-up border border-gray-100">
            <button onClick={() => setTooltip(false)} className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-0.5 hover:bg-gray-200 transition-colors">
              <X size={12} />
            </button>
            <p className="text-[11px] font-bold text-gray-700 leading-tight">👋 Need help? Chat with us on WhatsApp!</p>
          </div>
        )}

        {/* WhatsApp Floating Button */}
        {showWhatsApp && (
          <a
            href={`https://wa.me/${number}?text=Hello, I want to know about STC Umerkot courses`}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 animate-pulse-glow"
            style={{ animationDuration: "3s" }}
            title="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
