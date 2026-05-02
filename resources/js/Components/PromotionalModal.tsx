import React, { useState, useEffect } from 'react';
import { X, Megaphone, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Announcement {
    show: boolean;
    type: 'image' | 'text';
    image?: string;
    title?: string;
    description?: string;
    linkText?: string;
    linkUrl?: string;
}

export default function PromotionalModal({ announcement }: { announcement: Announcement }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (announcement?.show) {
            const hasSeen = sessionStorage.getItem('hasSeenAnnouncement');
            if (!hasSeen) {
                const timer = setTimeout(() => {
                    setIsOpen(true);
                }, 1500); // Show after 1.5 seconds
                return () => clearTimeout(timer);
            }
        }
    }, [announcement]);

    const closePlaceholder = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenAnnouncement', 'true');
    };

    if (!isOpen || !announcement?.show) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className={`relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ${announcement.type === 'text' ? 'w-full max-w-lg' : 'w-auto max-w-[95vw] max-h-[90vh]'}`}>
                {/* Close Button */}
                <button 
                    onClick={closePlaceholder}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 transition-all border border-white/20"
                >
                    <X size={20} />
                </button>

                {announcement.type === 'image' ? (
                    <div className="relative flex items-center justify-center">
                        {announcement.linkUrl ? (
                            <Link href={announcement.linkUrl} onClick={closePlaceholder} className="block">
                                <img 
                                    src={announcement.image} 
                                    alt={announcement.title || 'Announcement'} 
                                    className="w-full h-auto max-w-full max-h-[90vh] object-contain block"
                                />
                            </Link>
                        ) : (
                            <img 
                                src={announcement.image} 
                                alt={announcement.title || 'Announcement'} 
                                className="w-full h-auto max-w-full max-h-[90vh] object-contain block"
                            />
                        )}
                    </div>
                ) : (
                    <div className="p-10 md:p-12 text-center">
                        <div className="w-16 h-16 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-cyan-100/50">
                            <Megaphone size={32} />
                        </div>
                        
                        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                            {announcement.title}
                        </h2>
                        
                        <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
                            {announcement.description}
                        </p>

                        {announcement.linkUrl && announcement.linkText && (
                            <Link 
                                href={announcement.linkUrl}
                                onClick={closePlaceholder}
                                className="inline-flex items-center gap-3 bg-slate-900 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-slate-900/20 group"
                            >
                                {announcement.linkText}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}

                        <button 
                            onClick={closePlaceholder}
                            className="block w-full mt-6 text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest transition-colors"
                        >
                            Not now, thanks
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
