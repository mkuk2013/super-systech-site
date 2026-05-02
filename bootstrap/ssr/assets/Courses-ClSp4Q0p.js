import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { Briefcase, GraduationCap, Palette, Code, Award, BookOpen, ShieldCheck, Sparkles, Clock, ChevronRight } from "lucide-react";
import { A as AnimatedSection, M as MainLayout } from "./MainLayout-BoZ6Yae8.js";
import "framer-motion";
import "react";
const iconMap = {
  GraduationCap,
  ShieldCheck,
  BookOpen,
  Award,
  Code,
  Palette,
  GraduationCap,
  Briefcase
};
function CoursesPage({ courses, siteContent }) {
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.courses || {
    badge: "PROSPECTUS",
    title: "Professional IT Programs",
    subtitle: "We offer a wide range of technical courses affiliated with leading government boards, designed to make you industry-ready."
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white min-h-screen", children: [
    /* @__PURE__ */ jsx(Head, { title: "Our Courses" }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-24 md:py-32 overflow-hidden bg-slate-900", children: [
      hero.backgroundImage ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsx("img", { src: hero.backgroundImage, alt: "", className: "w-full h-full object-cover opacity-40" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1] bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 mesh-gradient opacity-100" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10", children: /* @__PURE__ */ jsxs(AnimatedSection, { children: [
        hero.badge && /* @__PURE__ */ jsx("p", { className: "text-amber-400 text-xs font-black tracking-[0.2em] uppercase mb-4 opacity-90", children: hero.badge }),
        hero.title && /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight", children: hero.title }),
        hero.subtitle && /* @__PURE__ */ jsx("p", { className: "text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed opacity-80", children: hero.subtitle })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: courses.map((course, i) => {
      const Icon = iconMap[course.icon] || BookOpen;
      return /* @__PURE__ */ jsx(AnimatedSection, { delay: i * 0.05, direction: "scale", children: /* @__PURE__ */ jsxs("div", { className: "group bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-cyan-100 transition-all duration-500 h-full flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500", children: /* @__PURE__ */ jsx(Icon, { size: 28 }) }),
          course.admissionsOpen && /* @__PURE__ */ jsxs("span", { className: "bg-emerald-500/10 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1.5 border border-emerald-500/20", children: [
            /* @__PURE__ */ jsx(Sparkles, { size: 10, className: "animate-pulse" }),
            " Admissions Open"
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-black text-slate-900 text-xl mb-3 font-heading tracking-tight uppercase group-hover:text-cyan-700 transition-colors", children: course.title }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-cyan-600 font-black uppercase tracking-[0.2em] mb-4", children: course.board }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-slate-500 mb-8 flex-1 leading-relaxed whitespace-pre-line", children: course.description }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-6 border-t border-slate-200/50", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1", children: "Duration" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-black text-slate-700 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Clock, { size: 14, className: "text-cyan-500" }),
              " ",
              course.duration
            ] })
          ] }),
          /* @__PURE__ */ jsx(Link, { href: `/admissions?course=${encodeURIComponent(course.title)}`, className: "bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-cyan-600 transition-all shadow-lg", children: /* @__PURE__ */ jsx(ChevronRight, { size: 20 }) })
        ] })
      ] }) }, course.id);
    }) }) }) })
  ] });
}
CoursesPage.layout = (page) => /* @__PURE__ */ jsx(MainLayout, { children: page });
export {
  CoursesPage as default
};
