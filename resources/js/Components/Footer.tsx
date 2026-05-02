import { Link, usePage } from "@inertiajs/react";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Linkedin, ChevronRight } from "lucide-react";
import React from 'react';

export default function Footer() {
  const { props } = usePage();
  const data: any = props.siteContent;
  const coursesRaw: any = props.courses;
  const courses: any[] = Array.isArray(coursesRaw) ? coursesRaw : [];

  const settings = data?.settings;
  const layout = data?.layout;
  const footer = layout?.footer;
  const navbar = layout?.navbar;

  return (
    <footer className="relative overflow-hidden">
      {/* Premium CTA Bar */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h4 className="font-black text-white text-2xl md:text-3xl mb-3 tracking-tight">
                {settings?.ctaTitle || "Ready to Shape Your Future?"}
              </h4>
              <p className="text-white/60 text-lg font-medium max-w-xl">
                {settings?.ctaSubtitle || "Join the largest technical institute in Umerkot and start your professional career today."}
              </p>
            </div>
            <Link href={navbar?.ctaHref || "/admissions"} className="btn-gold group !px-10 !py-5">
              {navbar?.ctaLabel || "Get Started Now"} 
              <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-slate-950 pt-20 pb-12">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            {/* Brand Section */}
            <div className="space-y-8">
              <Link href="/" className="flex items-center gap-4 no-underline group">
                <img src="/images/logo.png" alt="STC" width={64} height={64} className="rounded-2xl bg-white p-1.5 shadow-xl group-hover:scale-105 transition-transform" />
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-black text-white leading-none tracking-tighter">
                    {navbar?.logoText || "SUPER SYS-TECH"}
                  </h3>
                  <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em] mt-2">
                    {navbar?.logoSubText || "Computers Centre Umerkot"}
                  </p>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                {footer?.aboutText || "Empowering the youth of Umerkot with world-class technical education and industry-recognized certifications since 1997."}
              </p>
              <div className="flex gap-4">
                {[
                  { 
                    id: 'fb',
                    href: settings?.facebookUrl || "https://www.facebook.com/SuperSysTechComputersUmerkot", 
                    color: "hover:bg-[#1877F2]",
                    svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  },
                  { 
                    id: 'yt',
                    href: settings?.youtubeUrl || "https://www.youtube.com/@stcumerkot", 
                    color: "hover:bg-[#FF0000]",
                    svg: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  },
                  { 
                    id: 'li',
                    href: "#", 
                    color: "hover:bg-[#0A66C2]",
                    svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  }
                ].map((social) => (
                  <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 ${social.color} hover:text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      {social.svg}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-8">{footer?.quickLinksTitle || "Navigation"}</h4>
              <ul className="space-y-4">
                {(navbar?.links || [
                  { href: "/about", label: "Our Story" },
                  { href: "/courses", label: "All Programs" },
                  { href: "/gallery", label: "Campus Life" },
                  { href: "/team", label: "Expert Faculty" },
                  { href: "/admissions", label: "Admissions" },
                  { href: "/contact", label: "Get in Touch" },
                ]).map((link: any) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 text-sm font-bold hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center no-underline">
                      <ChevronRight size={12} className="mr-2 opacity-0 group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Programs */}
            <div>
              <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-8">{footer?.programsTitle || "Top Programs"}</h4>
              <ul className="space-y-4">
                {(courses.length > 0 ? courses.slice(0, 6) : [
                  "D.I.T (Board Diploma)",
                  "Web Development",
                  "Graphic Design",
                  "E-Commerce Expert",
                  "CIT (6 Months)",
                  "Python Programming",
                ]).map((course: any) => (
                  <li key={typeof course === 'string' ? course : course.id} className="text-gray-400 text-sm font-medium hover:text-white transition-colors cursor-pointer">
                    {typeof course === 'string' ? course : course.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-8">{footer?.contactTitle || "Contact Info"}</h4>
              <div className="space-y-5">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/10 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                    <MapPin size={18} />
                  </div>
                  <a href={settings?.mapUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm font-medium hover:text-white transition-colors no-underline leading-tight">
                    {settings?.address || "1st Floor, Jameel Market, Umerkot, Sindh"}
                  </a>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <div className="text-gray-400 text-sm font-bold flex flex-col gap-1 leading-none">
                    <a href={`tel:${settings?.phone || '0238571540'}`} className="hover:text-white transition-colors no-underline leading-none">{settings?.phone || "0238-571540"}</a>
                    <a href={`tel:${settings?.mobile || '03003198050'}`} className="hover:text-white transition-colors no-underline leading-none">{settings?.mobile || "0300-3198050"}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <a href={`mailto:${settings?.email || 'supersystechumk@gmail.com'}`} className="text-gray-400 text-sm font-bold hover:text-white transition-colors no-underline leading-none">
                    {settings?.email || "supersystechumk@gmail.com"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Final Copyright */}
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-xs font-bold tracking-wider">
              © {new Date().getFullYear()} {settings?.siteName || "SUPER SYS-TECH"}. {footer?.copyrightText || "Affiliated with NAVTTC & SBTE."}
            </p>
            <div className="flex gap-8 text-gray-600 text-xs font-bold uppercase tracking-widest">
              <Link href="/privacy-policy" className="hover:text-white transition-colors no-underline">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors no-underline">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
