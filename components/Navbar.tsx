"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Fetch settings
    fetch("/api/content?section=settings")
      .then((r) => r.json())
      .then(setSettings);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: "Faculty" },
    { href: "/admissions", label: "Admissions" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-slate-900 text-white/60 text-xs py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone size={11} className="text-cyan-400" /> {settings?.phone || "0300-3198050"}</span>
            <span className="flex items-center gap-1.5"><Mail size={11} className="text-cyan-400" /> {settings?.email || "supersystechumk@gmail.com"}</span>
            <span className="flex items-center gap-1.5"><MapPin size={11} className="text-cyan-400" /> {settings?.address || "Jameel Market, Umerkot"}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-amber-400/70 uppercase">
            {settings?.affiliations?.map((a: any) => typeof a === 'string' ? a : a.name).join(" \u2022 ") || "SBTE \u2022 NAVTTC \u2022 STEVTA \u2022 TTB"}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg py-2"
            : "bg-white py-3 border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 no-underline">
              <Image
                src="/images/logo_ssc.png"
                alt="Super Sys-Tech Computers"
                width={56}
                height={56}
                className="rounded-lg"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-extrabold text-slate-900 leading-tight font-heading">
                  {settings?.siteName || "Super Sys-Tech"}
                </h1>
                <p className="text-sm text-cyan-700 font-semibold">
                  {settings?.tagline || "Computers Centre Umerkot"}
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-[13px] font-medium no-underline transition-all duration-200 rounded-lg ${
                    isActive(link.href)
                      ? "text-cyan-700 bg-cyan-50 font-semibold"
                      : "text-slate-600 hover:text-cyan-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link href="/admissions" className="btn-gold text-xs hidden md:inline-flex">
                Apply Now
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-all"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 py-3 space-y-0.5 bg-white border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium no-underline rounded-lg transition-all ${
                  isActive(link.href)
                    ? "bg-cyan-50 text-cyan-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/admissions" onClick={() => setIsOpen(false)} className="btn-gold w-full text-center">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
