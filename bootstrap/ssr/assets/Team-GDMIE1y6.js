import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AnimatedSection, M as MainLayout } from "./MainLayout-BoZ6Yae8.js";
import "framer-motion";
import "react";
import "lucide-react";
function TeamPage({ team, siteContent }) {
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.team || {
    badge: "EXPERT FACULTY",
    title: "Meet Our Instructors",
    subtitle: "Our team consists of industry veterans and certified professionals dedicated to providing high-quality IT training."
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white min-h-screen", children: [
    /* @__PURE__ */ jsx(Head, { title: "Our Team" }),
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
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-10", children: team.map((member, i) => /* @__PURE__ */ jsx(AnimatedSection, { delay: i * 0.1, children: /* @__PURE__ */ jsxs("div", { className: "group bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/4.5] overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: member.image,
            alt: member.name,
            className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6", children: /* @__PURE__ */ jsx("span", { className: "bg-white/90 backdrop-blur-md text-slate-900 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-lg border border-white/50", children: member.role }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-6 right-10 w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-cyan-600/30 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500", children: /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V4H21.017V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91238 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017V4H10.017V15C10.017 18.3137 7.33072 21 4.017 21H3.017Z" }) }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-900 font-heading tracking-tight mb-4 group-hover:text-cyan-600 transition-colors", children: member.name }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-1 bg-cyan-100 rounded-full group-hover:w-20 transition-all duration-500" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm leading-relaxed font-medium", children: member.bio || "Expert instructor dedicated to shaping the next generation of digital professionals at Super Sys-Tech." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-slate-50 flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Active Faculty" })
        ] }) })
      ] })
    ] }) }, member.id)) }) }) })
  ] });
}
TeamPage.layout = (page) => /* @__PURE__ */ jsx(MainLayout, { children: page });
export {
  TeamPage as default
};
