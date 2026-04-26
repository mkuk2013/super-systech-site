"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  const [tooltip, setTooltip] = useState(true);
  const [number, setNumber] = useState("03003198050");

  useEffect(() => {
    fetch("/api/content?section=settings")
      .then((r) => r.json())
      .then((s) => { if (s.whatsappNumber) setNumber(s.whatsappNumber); })
      .catch(() => {});
    const t = setTimeout(() => setShow(true), 2000);
    const t2 = setTimeout(() => setTooltip(false), 8000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {tooltip && (
        <div className="bg-white rounded-2xl shadow-2xl px-4 py-3 max-w-[200px] relative animate-fade-in-up">
          <button onClick={() => setTooltip(false)} className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-0.5">
            <X size={12} />
          </button>
          <p className="text-xs font-semibold text-gray-700">👋 Need help? Chat with us on WhatsApp!</p>
        </div>
      )}
      <a
        href={`https://wa.me/${number}?text=Hello, I want to know about STC Umerkot courses`}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-110 transition-all duration-300 animate-pulse-glow"
        style={{ animationDuration: "3s" }}
      >
        <MessageCircle size={26} className="text-white group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
}
