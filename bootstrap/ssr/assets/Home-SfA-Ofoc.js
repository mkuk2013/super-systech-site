import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { GraduationCap, ArrowRight, Quote, Star, Award, Users, Sparkles, Briefcase, ShoppingCart, Palette, Code, BookOpen, ShieldCheck, Clock, ChevronRight, CheckCircle2 } from "lucide-react";
import { A as AnimatedSection, M as MainLayout } from "./MainLayout-BoZ6Yae8.js";
import { useState, useRef, useEffect } from "react";
import "framer-motion";
function AnimatedCounter({ target, label, duration = 2e3 }) {
  const [count, setCount] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const numericPart = target.replace(/[^0-9]/g, "");
  const prefix = target.match(/^[^0-9]*/)?.[0] || "";
  const suffix = target.match(/[^0-9]*$/)?.[0] || "";
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const end = parseInt(numericPart) || 0;
    if (end === 0) {
      setCount(target);
      return;
    }
    let start = 0;
    const step = Math.ceil(end / (duration / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(`${prefix}${end.toLocaleString()}${suffix}`);
        clearInterval(timer);
      } else {
        setCount(`${prefix}${start.toLocaleString()}${suffix}`);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [started, numericPart, prefix, suffix, target, duration]);
  return /* @__PURE__ */ jsxs("div", { ref, className: "text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "text-3xl md:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400", children: count }),
    /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs font-medium mt-1.5 uppercase tracking-wider", children: label })
  ] });
}
const iconMap = {
  GraduationCap,
  ShieldCheck,
  BookOpen,
  Award,
  Code,
  Palette,
  ShoppingCart,
  Briefcase
};
function Home({ hero, about, courses, testimonials, settings, homepage }) {
  const featuredCourses = courses.filter((c) => c.featured).slice(0, 6);
  const renderSection = (section) => {
    if (!section.enabled) return null;
    switch (section.id) {
      case "hero":
        return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[92vh] flex items-center mesh-gradient overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0 opacity-15", children: /* @__PURE__ */ jsx("img", { src: hero.backgroundImage, alt: "", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1] bg-gradient-to-b from-navy/90 via-navy/70 to-navy" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl floating-shape" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl floating-shape-delayed" }),
          /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto px-4 lg:px-6 relative z-10 py-24 md:py-32 pt-16 md:pt-20", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 lg:gap-24 items-start", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left flex flex-col justify-center", children: [
                /* @__PURE__ */ jsx(AnimatedSection, { delay: 0, children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black px-4 py-2 rounded-full mb-8 tracking-[0.2em] uppercase", children: [
                  /* @__PURE__ */ jsx(Sparkles, { size: 14, className: "animate-pulse" }),
                  " ",
                  hero.badge
                ] }) }),
                /* @__PURE__ */ jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.05] font-heading", children: [
                  hero.title || "Where Dreams Are",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-gradient", children: hero.titleHighlight || "Polished Into Skills" }),
                  " ",
                  hero.titleEnd
                ] }) }),
                /* @__PURE__ */ jsx(AnimatedSection, { delay: 0.2, children: /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium opacity-80", children: hero.subtitle }) }),
                /* @__PURE__ */ jsx(AnimatedSection, { delay: 0.3, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center lg:justify-start gap-5 mb-12", children: [
                  /* @__PURE__ */ jsxs(Link, { href: "/admissions", className: "btn-gold group", children: [
                    hero.ctaPrimary || "Start Your Journey",
                    /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "ml-2 group-hover:translate-x-1 transition-transform" })
                  ] }),
                  /* @__PURE__ */ jsx(Link, { href: "/courses", className: "btn-outline-white", children: hero.ctaSecondary || "Explore Programs" })
                ] }) })
              ] }),
              /* @__PURE__ */ jsx(AnimatedSection, { delay: 0.4, direction: "left", className: "flex flex-col -translate-y-8", children: /* @__PURE__ */ jsxs("div", { className: "relative group flex flex-col", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-tr from-cyan-500/30 to-teal-500/30 rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" }),
                /* @__PURE__ */ jsx("div", { className: "relative rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl bg-white/5 backdrop-blur-sm p-1 group-hover:scale-[1.01] transition-all duration-700 flex items-center justify-center h-[400px] lg:h-[480px]", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/images/stc_banner_main.jpg",
                    alt: "Super Sys-Tech Institute",
                    className: "w-full h-full object-contain rounded-[1.8rem]"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 right-4 left-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/5 hidden md:block", children: /* @__PURE__ */ jsx("p", { className: "text-white/90 text-[10px] font-black uppercase tracking-[0.2em] text-center", children: "Modern Facilities • Expert Faculty • Practical Learning" }) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-20 space-y-12", children: [
              /* @__PURE__ */ jsx(AnimatedSection, { delay: 0.35, children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden py-4", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-navy to-transparent z-10" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-navy to-transparent z-10" }),
                /* @__PURE__ */ jsx("div", { className: "flex animate-marquee-content hover:[animation-play-state:paused] whitespace-nowrap gap-10 items-center w-max py-4", children: [...settings?.affiliations || [], ...settings?.affiliations || [], ...settings?.affiliations || [], ...settings?.affiliations || []]?.map((a, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-500 cursor-pointer shadow-2xl backdrop-blur-md group", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: a.logo,
                      alt: a.name,
                      className: "w-full h-full object-contain drop-shadow-2xl grayscale brightness-150 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-amber-400 text-[10px] font-black tracking-[0.2em] uppercase mb-1 opacity-70 group-hover:opacity-100 group-hover:text-amber-300 transition-all", children: "Authorized Board" }),
                    /* @__PURE__ */ jsx("span", { className: "text-white text-lg md:text-xl font-extrabold tracking-tight group-hover:text-cyan-400 transition-colors", children: a.name })
                  ] })
                ] }, i)) })
              ] }) }),
              /* @__PURE__ */ jsx(AnimatedSection, { delay: 0.4, children: /* @__PURE__ */ jsx("div", { className: "border-t border-white/10 pt-12", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto", children: hero.stats?.map((stat, i) => /* @__PURE__ */ jsx(AnimatedCounter, { target: stat.value, label: stat.label }, i)) }) }) })
            ] })
          ] })
        ] }, "hero");
      case "banner":
        return /* @__PURE__ */ jsx("section", { className: "w-full bg-slate-50 py-4", children: /* @__PURE__ */ jsx(AnimatedSection, { direction: "up", children: /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden shadow-xl border-y border-slate-200 bg-white", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/stc_banner_main.jpg",
            alt: "Super Sys-Tech Official Banner",
            className: "w-full h-auto block",
            style: { display: "block", width: "100%", height: "auto" }
          }
        ) }) }) }, "banner");
      case "about":
        return /* @__PURE__ */ jsxs("section", { className: "py-32 bg-white relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-[-15deg] translate-x-1/2" }),
          /* @__PURE__ */ jsx("div", { className: "w-full max-w-7xl mx-auto px-4 lg:px-6 relative z-10 py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 lg:gap-12 items-center", children: [
            /* @__PURE__ */ jsx(AnimatedSection, { direction: "left", children: /* @__PURE__ */ jsxs("div", { className: "relative group mx-auto lg:mx-0", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: about.directorImage,
                    alt: about.directorName,
                    width: 500,
                    height: 600,
                    className: "w-full h-[500px] object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }),
                /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-6 right-6 text-white", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-black text-lg tracking-tight mb-0.5", children: about.directorName }),
                  /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em]", children: about.directorTitle })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs(AnimatedSection, { direction: "right", children: [
              /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-6 tracking-[0.2em] uppercase", children: "Director's Message" }),
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-black mb-8 tracking-tight leading-tight text-slate-900 font-heading", children: [
                about.title || "Leading Umerkot's",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600", children: about.titleHighlight })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "relative mb-10", children: /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-base leading-relaxed font-medium", children: about.directorMessage }) }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10", children: about.achievements?.slice(0, 4).map((a, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300", children: [
                /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 14, className: "text-cyan-600" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-slate-700 uppercase tracking-tight", children: a })
              ] }, i)) }),
              /* @__PURE__ */ jsxs(Link, { href: "/about", className: "btn-gold !px-8 !py-3 !text-[11px] uppercase tracking-widest", children: [
                "Learn Our History ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "ml-2" })
              ] })
            ] })
          ] }) })
        ] }, "about");
      case "courses":
        return /* @__PURE__ */ jsx("section", { className: "py-24 bg-white relative", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto px-4 lg:px-6 relative z-10", children: [
          /* @__PURE__ */ jsx(AnimatedSection, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1 rounded-full mb-4 tracking-[0.3em] uppercase", children: "Academic Excellence" }),
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-black tracking-tight text-slate-900 font-heading", children: [
              "Our ",
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600", children: "Specializations" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: featuredCourses.map((course, i) => {
            const Icon = iconMap[course.icon] || BookOpen;
            return /* @__PURE__ */ jsx(AnimatedSection, { delay: i * 0.05, direction: "scale", children: /* @__PURE__ */ jsxs("div", { className: "group bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-cyan-100 transition-all duration-500 h-full flex flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500", children: /* @__PURE__ */ jsx(Icon, { size: 22 }) }),
              /* @__PURE__ */ jsx("h4", { className: "font-black text-slate-900 text-lg mb-2 font-heading tracking-tight uppercase", children: course.title }),
              /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-500 mb-6 flex-1 leading-relaxed line-clamp-3", children: course.description }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-5 border-t border-slate-200/50", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest", children: [
                  /* @__PURE__ */ jsx(Clock, { size: 12, className: "text-cyan-500" }),
                  " ",
                  course.duration
                ] }),
                /* @__PURE__ */ jsxs(Link, { href: "/admissions", className: "text-cyan-700 font-black text-[10px] no-underline flex items-center gap-2 uppercase tracking-widest", children: [
                  "Details ",
                  /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
                ] })
              ] })
            ] }) }, course.id);
          }) }),
          /* @__PURE__ */ jsx(AnimatedSection, { children: /* @__PURE__ */ jsx("div", { className: "text-center mt-16", children: /* @__PURE__ */ jsxs(Link, { href: "/courses", className: "btn-outline-gold group", children: [
            "View Full Prospectus ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "ml-2 group-hover:translate-x-1 transition-transform" })
          ] }) }) })
        ] }) }, "courses");
      case "why-us":
        return /* @__PURE__ */ jsxs("section", { className: "py-24 bg-slate-900 text-white relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-[0.05]" }),
          /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto px-4 lg:px-6 relative z-10", children: [
            /* @__PURE__ */ jsx(AnimatedSection, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
              /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 bg-white/10 text-cyan-400 text-[9px] font-black px-3 py-1 rounded-full mb-4 tracking-[0.3em] uppercase backdrop-blur-sm", children: "Why Super Sys-Tech" }),
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-black text-white tracking-tighter", children: [
                "Built for the ",
                /* @__PURE__ */ jsx("span", { className: "text-cyan-400", children: "Future" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
              { icon: Award, title: "Board Certified", desc: "Recognized diplomas for global employment.", accent: "border-white/5 bg-white/5" },
              { icon: Users, title: "Expert Faculty", desc: "Instructors with deep industry background.", accent: "border-white/5 bg-white/5" },
              { icon: Sparkles, title: "Modern Labs", desc: "High-spec computer labs with fast internet.", accent: "border-white/5 bg-white/5" },
              { icon: GraduationCap, title: "15,000+ Alumni", desc: "Massive network of successful graduates.", accent: "border-white/5 bg-white/5" }
            ].map((item, i) => /* @__PURE__ */ jsx(AnimatedSection, { delay: item.title === "Modern Labs" ? 0.15 : i * 0.05, children: /* @__PURE__ */ jsxs("div", { className: `${item.accent} rounded-3xl p-6 border backdrop-blur-sm hover:bg-white hover:text-slate-900 transition-all duration-500 h-full group`, children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500", children: /* @__PURE__ */ jsx(item.icon, { size: 20 }) }),
              /* @__PURE__ */ jsx("h4", { className: "font-black text-white text-base mb-2 font-heading tracking-tight group-hover:text-slate-900 uppercase", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-[12px] leading-relaxed font-medium group-hover:text-slate-600 transition-colors", children: item.desc })
            ] }) }, i)) })
          ] })
        ] }, "why-us");
      case "testimonials":
        if (testimonials.length === 0) return null;
        return /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto px-4 lg:px-6", children: [
          /* @__PURE__ */ jsx(AnimatedSection, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
            /* @__PURE__ */ jsx("p", { className: "section-label mb-3", children: "STUDENT VOICES" }),
            /* @__PURE__ */ jsxs("h2", { className: "heading-display", children: [
              "What Our ",
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-teal-600", children: "Alumni Say" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: testimonials.slice(0, 3).map((t, i) => /* @__PURE__ */ jsx(AnimatedSection, { delay: i * 0.1, children: /* @__PURE__ */ jsxs("div", { className: "card-institute relative", children: [
            /* @__PURE__ */ jsx(Quote, { className: "absolute top-4 right-4 text-cyan-100", size: 36 }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 mb-4", children: [...Array(t.rating)].map((_, j) => /* @__PURE__ */ jsx(Star, { size: 14, className: "fill-amber-400 text-amber-400" }, j)) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm leading-relaxed mb-6", children: t.message }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-gray-100", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center text-white text-sm font-bold", children: t.name.charAt(0) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h5", { className: "font-semibold text-slate-900 text-sm", children: t.name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: t.course })
              ] })
            ] })
          ] }) }, t.id)) })
        ] }) }, "testimonials");
      case "cta":
        return /* @__PURE__ */ jsxs("section", { className: "relative py-24 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-800 via-teal-700 to-emerald-800" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMCAxMnY2aC02di02aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" }),
          /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 relative z-10 text-center text-white", children: /* @__PURE__ */ jsxs(AnimatedSection, { children: [
            /* @__PURE__ */ jsx(GraduationCap, { size: 48, className: "mx-auto mb-6 text-white/80" }),
            /* @__PURE__ */ jsx("h2", { className: "font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5", children: "Ready to Shape Your Future?" }),
            /* @__PURE__ */ jsx("p", { className: "text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed", children: "Join Umerkot's most trusted technical institution. Admissions are now open for the 2026 academic year." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
              /* @__PURE__ */ jsxs(Link, { href: "/admissions", className: "bg-white text-cyan-800 font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-gray-100 transition-all no-underline inline-flex items-center gap-2 shadow-lg", children: [
                "Register for Next Batch ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
              ] }),
              /* @__PURE__ */ jsx(Link, { href: "/contact", className: "btn-outline-white px-8 py-3.5", children: "Contact Admissions" })
            ] })
          ] }) })
        ] }, "cta");
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsx(Head, { title: "Home" }),
    homepage?.sections?.map((section) => renderSection(section))
  ] });
}
Home.layout = (page) => /* @__PURE__ */ jsx(MainLayout, { children: page });
export {
  Home as default
};
