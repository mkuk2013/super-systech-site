import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";
import { Phone, Mail, MapPin, X, Menu, ChevronRight, ChevronUp, Sparkles, Megaphone, ArrowRight, Cookie } from "lucide-react";
function AnimatedSection({ children, className = "", delay = 0, direction = "up" }) {
  const variants = {
    up: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } }
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
      variants: variants[direction],
      children
    }
  );
}
function Navbar() {
  const { props } = usePage();
  const data = props.siteContent;
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
  Boolean(settings?.marqueeShow) && settings?.marqueeText;
  const navLinks = [...layout?.links || [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: "Faculty" },
    { href: "/admissions", label: "Admissions" },
    { href: "/contact", label: "Contact" }
  ]];
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 left-0 w-full z-50 transition-all duration-700", children: [
    layout?.showTopBar !== false && /* @__PURE__ */ jsx(
      "div",
      {
        className: `bg-slate-950 text-white/40 text-[10px] font-bold tracking-[0.15em] uppercase hidden lg:block transition-all duration-700 overflow-hidden ${scrolled ? "h-0 opacity-0 border-none" : "h-auto py-2.5 opacity-100 border-b border-white/5"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-8 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 hover:text-white transition-colors cursor-pointer", children: [
              /* @__PURE__ */ jsx(Phone, { size: 10, className: "text-amber-400" }),
              " ",
              settings?.phone || "0332-3350790"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 hover:text-white transition-colors cursor-pointer", children: [
              /* @__PURE__ */ jsx(Mail, { size: 10, className: "text-amber-400" }),
              " ",
              settings?.email || "stcuk1997@gmail.com"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 hover:text-white transition-colors cursor-pointer", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 10, className: "text-amber-400" }),
              " ",
              settings?.address || "Jameel Market, Umerkot"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 opacity-60", children: settings?.affiliations?.slice(0, 4).map((a, idx) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
            typeof a === "string" ? a : a.name,
            idx < 3 && /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-white/20" })
          ] }, idx)) || "SBTE • NAVTTC • STEVTA • TTB" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      "nav",
      {
        className: `transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] py-3 border-b border-slate-100" : "bg-white py-4 border-b border-slate-100 shadow-sm"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-full max-w-7xl mx-auto px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-4 no-underline group", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-2 bg-gradient-to-tr from-cyan-500/10 to-teal-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/images/logo.png",
                    alt: "Logo",
                    width: scrolled ? 42 : 48,
                    height: scrolled ? 42 : 48,
                    className: "rounded-xl shadow-lg transition-all duration-500 relative bg-white p-1"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center max-w-[150px] md:max-w-none", children: [
                /* @__PURE__ */ jsx("h1", { className: `${scrolled ? "text-[10px] md:text-base" : "text-[12px] md:text-lg"} font-black text-slate-900 leading-none tracking-tighter font-heading transition-all duration-500 truncate`, children: layout?.logoText || "SUPER SYS-TECH" }),
                /* @__PURE__ */ jsx("p", { className: `text-[7px] md:text-[9px] text-cyan-600 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mt-1 transition-all duration-500 ${scrolled ? "hidden md:block" : ""} truncate`, children: layout?.logoSubText || "Computers Centre Umerkot" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center gap-1", children: navLinks.map((link) => /* @__PURE__ */ jsxs(
              Link,
              {
                href: link.href,
                className: `relative px-4 py-2 text-[12px] font-bold no-underline transition-all duration-300 uppercase tracking-widest group ${isActive(link.href) ? "text-slate-900" : "text-slate-500 hover:text-slate-900"}`,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "relative z-10", children: link.label }),
                  /* @__PURE__ */ jsx("span", { className: `absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-cyan-600 transition-all duration-300 ${isActive(link.href) ? "w-6" : "w-0 group-hover:w-4"}` })
                ]
              },
              link.href
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(Link, { href: layout?.ctaHref || "/admissions", className: "btn-gold !px-6 !py-2.5 !text-[10px] hidden md:inline-flex uppercase tracking-widest shadow-lg", children: layout?.ctaLabel || "Start Admission" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsOpen(!isOpen),
                  className: "lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl text-slate-900 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200",
                  children: isOpen ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 })
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: `lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-[85vh] overflow-y-auto opacity-100 mt-2 shadow-2xl" : "max-h-0 opacity-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "px-6 pb-8 space-y-2 bg-white/95 backdrop-blur-3xl border-t border-slate-100", children: [
            /* @__PURE__ */ jsx("div", { className: "pt-6 grid grid-cols-1 gap-2", children: navLinks.map((link) => /* @__PURE__ */ jsx(
              Link,
              {
                href: link.href,
                onClick: () => setIsOpen(false),
                className: `block px-6 py-4 text-sm font-bold no-underline rounded-2xl transition-all uppercase tracking-widest ${isActive(link.href) ? "bg-slate-900 text-white shadow-xl" : "text-slate-600 hover:bg-slate-50"}`,
                children: link.label
              },
              link.href
            )) }),
            /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(Link, { href: layout?.ctaHref || "/admissions", onClick: () => setIsOpen(false), className: "btn-gold w-full text-center py-4 rounded-2xl", children: layout?.ctaLabel || "Apply Now" }) })
          ] }) })
        ]
      }
    )
  ] });
}
function Footer() {
  const { props } = usePage();
  const data = props.siteContent;
  const coursesRaw = props.courses;
  const courses = Array.isArray(coursesRaw) ? coursesRaw : [];
  const settings = data?.settings;
  const layout = data?.layout;
  const footer = layout?.footer;
  const navbar = layout?.navbar;
  return /* @__PURE__ */ jsxs("footer", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative py-16 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-black text-white text-2xl md:text-3xl mb-3 tracking-tight", children: settings?.ctaTitle || "Ready to Shape Your Future?" }),
          /* @__PURE__ */ jsx("p", { className: "text-white/60 text-lg font-medium max-w-xl", children: settings?.ctaSubtitle || "Join the largest technical institute in Umerkot and start your professional career today." })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: navbar?.ctaHref || "/admissions", className: "btn-gold group !px-10 !py-5", children: [
          navbar?.ctaLabel || "Get Started Now",
          /* @__PURE__ */ jsx(ChevronRight, { size: 20, className: "ml-2 group-hover:translate-x-1 transition-transform" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-slate-950 pt-20 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex items-center gap-4 no-underline group", children: [
            /* @__PURE__ */ jsx("img", { src: "/images/logo.png", alt: "STC", width: 64, height: 64, className: "rounded-2xl bg-white p-1.5 shadow-xl group-hover:scale-105 transition-transform" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-white leading-none tracking-tighter", children: navbar?.logoText || "SUPER SYS-TECH" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em] mt-2", children: navbar?.logoSubText || "Computers Centre Umerkot" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed font-medium", children: footer?.aboutText || "Empowering the youth of Umerkot with world-class technical education and industry-recognized certifications since 1997." }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: [
            {
              id: "fb",
              href: settings?.facebookUrl || "https://www.facebook.com/SuperSysTechComputersUmerkot",
              color: "hover:bg-[#1877F2]",
              svg: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
            },
            {
              id: "yt",
              href: settings?.youtubeUrl || "https://www.youtube.com/@stcumerkot",
              color: "hover:bg-[#FF0000]",
              svg: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" })
            },
            {
              id: "li",
              href: "#",
              color: "hover:bg-[#0A66C2]",
              svg: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" })
            }
          ].map((social) => /* @__PURE__ */ jsx("a", { href: social.href, target: "_blank", rel: "noopener noreferrer", className: `w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 ${social.color} hover:text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300`, children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: social.svg }) }, social.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-black text-white text-sm uppercase tracking-[0.2em] mb-8", children: footer?.quickLinksTitle || "Navigation" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: (navbar?.links || [
            { href: "/about", label: "Our Story" },
            { href: "/courses", label: "All Programs" },
            { href: "/gallery", label: "Campus Life" },
            { href: "/team", label: "Expert Faculty" },
            { href: "/admissions", label: "Admissions" },
            { href: "/contact", label: "Get in Touch" }
          ]).map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { href: link.href, className: "text-gray-400 text-sm font-bold hover:text-cyan-400 hover:translate-x-1 transition-all inline-flex items-center no-underline", children: [
            /* @__PURE__ */ jsx(ChevronRight, { size: 12, className: "mr-2 opacity-0 group-hover:opacity-100" }),
            link.label
          ] }) }, link.href)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-black text-white text-sm uppercase tracking-[0.2em] mb-8", children: footer?.programsTitle || "Top Programs" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: (courses.length > 0 ? courses.slice(0, 6) : [
            "D.I.T (Board Diploma)",
            "Web Development",
            "Graphic Design",
            "E-Commerce Expert",
            "CIT (6 Months)",
            "Python Programming"
          ]).map((course) => /* @__PURE__ */ jsx("li", { className: "text-gray-400 text-sm font-medium hover:text-white transition-colors cursor-pointer", children: typeof course === "string" ? course : course.title }, typeof course === "string" ? course : course.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-black text-white text-sm uppercase tracking-[0.2em] mb-8", children: footer?.contactTitle || "Contact Info" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-600/10 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-all", children: /* @__PURE__ */ jsx(MapPin, { size: 18 }) }),
              /* @__PURE__ */ jsx("a", { href: settings?.mapUrl || "#", target: "_blank", rel: "noopener noreferrer", className: "text-gray-400 text-sm font-medium hover:text-white transition-colors no-underline leading-tight", children: settings?.address || "1st Floor, Jameel Market, Umerkot, Sindh" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all", children: /* @__PURE__ */ jsx(Phone, { size: 18 }) }),
              /* @__PURE__ */ jsxs("div", { className: "text-gray-400 text-sm font-bold flex flex-col gap-1 leading-none", children: [
                /* @__PURE__ */ jsx("a", { href: `tel:${settings?.phone || "0238571540"}`, className: "hover:text-white transition-colors no-underline leading-none", children: settings?.phone || "0238-571540" }),
                /* @__PURE__ */ jsx("a", { href: `tel:${settings?.mobile || "03003198050"}`, className: "hover:text-white transition-colors no-underline leading-none", children: settings?.mobile || "0300-3198050" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all", children: /* @__PURE__ */ jsx(Mail, { size: 18 }) }),
              /* @__PURE__ */ jsx("a", { href: `mailto:${settings?.email || "supersystechumk@gmail.com"}`, className: "text-gray-400 text-sm font-bold hover:text-white transition-colors no-underline leading-none", children: settings?.email || "supersystechumk@gmail.com" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs font-bold tracking-wider", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          settings?.siteName || "SUPER SYS-TECH",
          ". ",
          footer?.copyrightText || "Affiliated with NAVTTC & SBTE."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-8 text-gray-600 text-xs font-bold uppercase tracking-widest", children: [
          /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "hover:text-white transition-colors no-underline", children: "Privacy Policy" }),
          /* @__PURE__ */ jsx(Link, { href: "/terms-of-service", className: "hover:text-white transition-colors no-underline", children: "Terms of Service" })
        ] })
      ] })
    ] }) })
  ] });
}
function FloatingActions() {
  const { props } = usePage();
  const siteContent = props.siteContent;
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [tooltip, setTooltip] = useState(true);
  const number = siteContent?.settings?.whatsappNumber || "03003198050";
  useEffect(() => {
    const t = setTimeout(() => setShowWhatsApp(true), 2e3);
    const t2 = setTimeout(() => setTooltip(false), 8e3);
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
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: scrollToTop,
        className: `w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border border-gray-100 text-slate-900 transition-all duration-300 transform ${showScroll ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-50 pointer-events-none"} hover:bg-slate-900 hover:text-white hover:-translate-y-1`,
        children: /* @__PURE__ */ jsx(ChevronUp, { size: 24 })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-3", children: [
      showWhatsApp && tooltip && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl px-4 py-3 max-w-[200px] relative animate-fade-in-up border border-gray-100", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setTooltip(false), className: "absolute -top-2 -right-2 bg-gray-100 rounded-full p-0.5 hover:bg-gray-200 transition-colors", children: /* @__PURE__ */ jsx(X, { size: 12 }) }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-700 leading-tight", children: "👋 Need help? Chat with us on WhatsApp!" })
      ] }),
      showWhatsApp && /* @__PURE__ */ jsx(
        "a",
        {
          href: `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=Hello, I want to know about STC Umerkot courses`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "group w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all duration-300",
          style: { animationDuration: "3s" },
          title: "Chat on WhatsApp",
          children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "w-8 h-8 fill-white", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) })
        }
      )
    ] })
  ] });
}
const Marquee = ({ text }) => {
  if (!text) return null;
  const items = text.split("•").map((t) => t.trim()).filter(Boolean);
  const displayItems = items.length > 0 ? items : [text];
  return /* @__PURE__ */ jsx("div", { className: "ticker-container relative w-full overflow-hidden bg-[#0a192f] border-b border-white/10 py-3 md:py-4 flex items-center font-sans z-[40]", children: /* @__PURE__ */ jsx("div", { className: "ticker-track", children: [0, 1, 2].map((setIndex) => /* @__PURE__ */ jsx("div", { className: "flex items-center", children: displayItems.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center whitespace-nowrap px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-white/90", children: [
      /* @__PURE__ */ jsx(Sparkles, { size: 16, className: "text-amber-400 shrink-0" }),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "text-[14px] font-bold tracking-wide uppercase marquee-item-content",
          dangerouslySetInnerHTML: { __html: item }
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mx-10 h-1 w-1 rounded-full bg-white/20" })
  ] }, `${setIndex}-${index}`)) }, setIndex)) }) });
};
function PromotionalModal({ announcement }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (announcement?.show) {
      const hasSeen = sessionStorage.getItem("hasSeenAnnouncement");
      if (!hasSeen) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [announcement]);
  const closePlaceholder = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenAnnouncement", "true");
  };
  if (!isOpen || !announcement?.show) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300", children: /* @__PURE__ */ jsxs("div", { className: `relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ${announcement.type === "text" ? "w-full max-w-lg" : "w-auto max-w-[95vw] max-h-[90vh]"}`, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: closePlaceholder,
        className: "absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-slate-800 transition-all border border-white/20",
        children: /* @__PURE__ */ jsx(X, { size: 20 })
      }
    ),
    announcement.type === "image" ? /* @__PURE__ */ jsx("div", { className: "relative flex items-center justify-center", children: announcement.linkUrl ? /* @__PURE__ */ jsx(Link, { href: announcement.linkUrl, onClick: closePlaceholder, className: "block", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: announcement.image,
        alt: announcement.title || "Announcement",
        className: "w-full h-auto max-w-full max-h-[90vh] object-contain block"
      }
    ) }) : /* @__PURE__ */ jsx(
      "img",
      {
        src: announcement.image,
        alt: announcement.title || "Announcement",
        className: "w-full h-auto max-w-full max-h-[90vh] object-contain block"
      }
    ) }) : /* @__PURE__ */ jsxs("div", { className: "p-10 md:p-12 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-cyan-100/50", children: /* @__PURE__ */ jsx(Megaphone, { size: 32 }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight", children: announcement.title }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-lg leading-relaxed mb-10 font-medium", children: announcement.description }),
      announcement.linkUrl && announcement.linkText && /* @__PURE__ */ jsxs(
        Link,
        {
          href: announcement.linkUrl,
          onClick: closePlaceholder,
          className: "inline-flex items-center gap-3 bg-slate-900 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-slate-900/20 group",
          children: [
            announcement.linkText,
            /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "group-hover:translate-x-1 transition-transform" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: closePlaceholder,
          className: "block w-full mt-6 text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest transition-colors",
          children: "Not now, thanks"
        }
      )
    ] })
  ] }) });
}
function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2e3);
      return () => clearTimeout(timer);
    }
  }, []);
  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[1000] animate-in slide-in-from-bottom-10 duration-500", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl shadow-black/50 text-white relative overflow-hidden group", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-20%] right-[-10%] w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400", children: /* @__PURE__ */ jsx(Cookie, { size: 22 }) }),
        /* @__PURE__ */ jsx("h4", { className: "font-black uppercase tracking-widest text-sm", children: "Cookie Notice" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-slate-400 text-sm leading-relaxed font-medium", children: [
        'We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies as described in our ',
        /* @__PURE__ */ jsx(Link, { href: "/privacy-policy", className: "text-cyan-400 hover:underline", children: "Privacy Policy" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: acceptCookies,
            className: "flex-1 bg-white text-slate-950 hover:bg-cyan-400 hover:text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-[0.15em] transition-all active:scale-95 shadow-xl shadow-white/5",
            children: "Accept All"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsVisible(false),
            className: "px-4 py-3 text-slate-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors",
            children: "Decline"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsVisible(false),
        className: "absolute top-4 right-4 text-slate-600 hover:text-white transition-colors",
        children: /* @__PURE__ */ jsx(X, { size: 16 })
      }
    )
  ] }) });
}
function MainLayout({ children }) {
  const { props } = usePage();
  const siteContent = props.siteContent;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white", children: [
    window.location.pathname === "/" && /* @__PURE__ */ jsx(PromotionalModal, { announcement: siteContent?.announcement }),
    /* @__PURE__ */ jsx(CookieConsent, {}),
    Boolean(siteContent?.settings?.marqueeShow) && siteContent?.settings?.marqueeText && /* @__PURE__ */ jsx(Marquee, { text: siteContent.settings.marqueeText }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { children }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(FloatingActions, {})
  ] });
}
export {
  AnimatedSection as A,
  MainLayout as M
};
