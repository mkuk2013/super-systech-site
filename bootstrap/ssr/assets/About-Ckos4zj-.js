import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import { A as AnimatedSection, M as MainLayout } from "./MainLayout-BoZ6Yae8.js";
import "framer-motion";
import "react";
function AboutPage({ about, siteContent }) {
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.about || {
    badge: "OUR STORY",
    title: "About STC Umerkot",
    subtitle: "Established in 1997, Super Sys-Tech Computers Centre Umerkot has been providing world-class technical education to thousands of students across the region."
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white min-h-screen", children: [
    /* @__PURE__ */ jsx(Head, { title: "About Us" }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-24 md:py-32 overflow-hidden bg-slate-900", children: [
      hero.backgroundImage ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsx("img", { src: hero.backgroundImage, alt: "", className: "w-full h-full object-cover opacity-40" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1] bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 mesh-gradient opacity-100" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10", children: /* @__PURE__ */ jsxs(AnimatedSection, { children: [
        /* @__PURE__ */ jsx("p", { className: "text-amber-400 text-xs font-black tracking-[0.2em] uppercase mb-4 opacity-90", children: hero.badge }),
        /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight", children: hero.title }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed opacity-80", children: hero.subtitle })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxs(AnimatedSection, { direction: "left", children: [
        /* @__PURE__ */ jsx("p", { className: "section-label mb-3", children: "OUR INSTITUTION" }),
        /* @__PURE__ */ jsx("h2", { className: "heading-display mb-6", children: about.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed mb-10", children: about.description }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "card-institute", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Target, { className: "text-white", size: 22 }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900 mb-2 font-heading", children: "Our Mission" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm leading-relaxed", children: about.mission })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "card-institute", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Eye, { className: "text-white", size: 22 }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900 mb-2 font-heading", children: "Our Vision" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm leading-relaxed", children: about.vision })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatedSection, { direction: "right", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white", children: [
          /* @__PURE__ */ jsx("img", { src: about.principalImage, alt: about.principalName, className: "w-full min-h-[450px] object-cover" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-950 rounded-3xl p-8 shadow-2xl mt-6 border-l-8 border-cyan-500 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-white font-heading tracking-tight mb-1", children: about.principalName }),
          /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-4", children: about.principalTitle }),
          /* @__PURE__ */ jsxs("blockquote", { className: "text-slate-300 text-sm italic leading-relaxed font-medium", children: [
            "“",
            about.principalMessage,
            "”"
          ] })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 lg:px-6", children: [
      /* @__PURE__ */ jsx(AnimatedSection, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("p", { className: "section-label mb-3", children: "ACHIEVEMENTS" }),
        /* @__PURE__ */ jsx("h2", { className: "heading-display", children: "Our Milestones" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: about.achievements?.map((a, i) => /* @__PURE__ */ jsx(AnimatedSection, { delay: i * 0.05, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300", children: [
        /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "text-emerald-600", size: 16 }) }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-800 text-sm", children: a })
      ] }) }, i)) })
    ] }) })
  ] });
}
AboutPage.layout = (page) => /* @__PURE__ */ jsx(MainLayout, { children: page });
export {
  AboutPage as default
};
