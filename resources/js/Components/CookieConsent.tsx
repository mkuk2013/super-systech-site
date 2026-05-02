import React, { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000); // Show after 2 seconds
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[1000] animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl shadow-black/50 text-white relative overflow-hidden group">
                {/* Background Decoration */}
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />
                
                <div className="relative z-10 flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                            <Cookie size={22} />
                        </div>
                        <h4 className="font-black uppercase tracking-widest text-sm">Cookie Notice</h4>
                    </div>
                    
                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                        We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies as described in our <Link href="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</Link>.
                    </p>
                    
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={acceptCookies}
                            className="flex-1 bg-white text-slate-950 hover:bg-cyan-400 hover:text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-[0.15em] transition-all active:scale-95 shadow-xl shadow-white/5"
                        >
                            Accept All
                        </button>
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="px-4 py-3 text-slate-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
                        >
                            Decline
                        </button>
                    </div>
                </div>

                {/* Close X (Minimal) */}
                <button 
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
