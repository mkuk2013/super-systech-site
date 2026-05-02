import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

export default function Navbar() {
  const { props } = usePage();
  const data: any = props.siteContent;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const settings = data?.settings;
  const layout = data?.layout?.navbar;
  const showMarquee = Boolean(settings?.marqueeShow) && settings?.marqueeText;

  const navLinks = [...(layout?.links || [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: "Faculty" },
    { href: "/admissions", label: "Admissions" },
    { href: "/contact", label: "Contact" },
  ])];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 transition-all duration-700">
      {/* Top Info Bar - Smooth Collapse */}
      {layout?.showTopBar !== false && (
        <div 
          className={`bg-slate-950 text-white/40 text-[10px] font-bold tracking-[0.15em] uppercase hidden lg:block transition-all duration-700 overflow-hidden ${
            scrolled ? "h-0 opacity-0 border-none" : "h-auto py-2.5 opacity-100 border-b border-white/5"
          }`}
        >
          <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Phone size={10} className="text-amber-400" /> {settings?.phone || "0332-3350790"}</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Mail size={10} className="text-amber-400" /> {settings?.email || "stcuk1997@gmail.com"}</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><MapPin size={10} className="text-amber-400" /> {settings?.address || "Jameel Market, Umerkot"}</span>
            </div>
            <div className="flex items-center gap-3 opacity-60">
              {settings?.affiliations?.slice(0, 4).map((a: any, idx: number) => (
                <span key={idx} className="flex items-center gap-3">
                  {typeof a === 'string' ? a : a.name}
                  {idx < 3 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                </span>
              )) || "SBTE \u2022 NAVTTC \u2022 STEVTA \u2022 TTB"}
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar - Premium Stable Height */}
      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] py-3 border-b border-slate-100"
            : "bg-white py-4 border-b border-slate-100 shadow-sm"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-4 no-underline group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/10 to-teal-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  width={scrolled ? 42 : 48}
                  height={scrolled ? 42 : 48}
                  className="rounded-xl shadow-lg transition-all duration-500 relative bg-white p-1"
                />
              </div>
              <div className="flex flex-col justify-center max-w-[150px] md:max-w-none">
                <h1 className={`${scrolled ? 'text-[10px] md:text-base' : 'text-[12px] md:text-lg'} font-black text-slate-900 leading-none tracking-tighter font-heading transition-all duration-500 truncate`}>
                  {layout?.logoText || "SUPER SYS-TECH"}
                </h1>
                <p className={`text-[7px] md:text-[9px] text-cyan-600 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mt-1 transition-all duration-500 ${scrolled ? 'hidden md:block' : ''} truncate`}>
                  {layout?.logoSubText || "Computers Centre Umerkot"}
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link: any) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[12px] font-bold no-underline transition-all duration-300 uppercase tracking-widest group ${
                    isActive(link.href)
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-cyan-600 transition-all duration-300 ${
                    isActive(link.href) ? "w-6" : "w-0 group-hover:w-4"
                  }`} />
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link href={layout?.ctaHref || "/admissions"} className="btn-gold !px-6 !py-2.5 !text-[10px] hidden md:inline-flex uppercase tracking-widest shadow-lg">
                {layout?.ctaLabel || "Start Admission"}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl text-slate-900 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-[85vh] overflow-y-auto opacity-100 mt-2 shadow-2xl" : "max-h-0 opacity-0"}`}>
          <div className="px-6 pb-8 space-y-2 bg-white/95 backdrop-blur-3xl border-t border-slate-100">
            <div className="pt-6 grid grid-cols-1 gap-2">
              {navLinks.map((link: any) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-4 text-sm font-bold no-underline rounded-2xl transition-all uppercase tracking-widest ${
                    isActive(link.href)
                      ? "bg-slate-900 text-white shadow-xl"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4">
              <Link href={layout?.ctaHref || "/admissions"} onClick={() => setIsOpen(false)} className="btn-gold w-full text-center py-4 rounded-2xl">
                {layout?.ctaLabel || "Apply Now"}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
