import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AnimatedSection, M as MainLayout } from "./MainLayout-BoZ6Yae8.js";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import "framer-motion";
const ExpandingGallery = ({ items }) => {
  const [expandedId, setExpandedId] = useState(items[0]?.id || null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);
  useEffect(() => {
    if (selectedIndex !== null) {
      const nextIndex = (selectedIndex + 1) % items.length;
      const prevIndex = (selectedIndex - 1 + items.length) % items.length;
      new Image().src = items[nextIndex].image;
      new Image().src = items[prevIndex].image;
    }
  }, [selectedIndex, items]);
  const handleNext = () => {
    if (selectedIndex === null) return;
    setIsImageLoading(true);
    setSelectedIndex((prev) => prev !== null && prev < items.length - 1 ? prev + 1 : 0);
  };
  const handlePrev = () => {
    if (selectedIndex === null) return;
    setIsImageLoading(true);
    setSelectedIndex((prev) => prev !== null && prev > 0 ? prev - 1 : items.length - 1);
  };
  const openLightbox = (index) => {
    setIsImageLoading(true);
    setSelectedIndex(index);
  };
  const featuredItems = items.slice(0, 5);
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-7xl mx-auto py-8", children: [
    selectedIndex !== null && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedIndex(null),
          className: "absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] p-2",
          children: /* @__PURE__ */ jsx(X, { size: 32 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handlePrev,
          className: "absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all z-[110] border border-white/10 group/btn",
          children: /* @__PURE__ */ jsx(ChevronLeft, { size: 32, className: "group-hover/btn:-translate-x-1 transition-transform" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleNext,
          className: "absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all z-[110] border border-white/10 group/btn",
          children: /* @__PURE__ */ jsx(ChevronRight, { size: 32, className: "group-hover/btn:translate-x-1 transition-transform" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full flex flex-col items-center justify-center gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl w-full h-[65vh] md:h-[75vh] flex items-center justify-center", children: [
          isImageLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" }) }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: items[selectedIndex].image,
              alt: items[selectedIndex].title || "Gallery",
              onLoad: () => setIsImageLoading(false),
              className: `max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-500 ${isImageLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`,
              decoding: "async"
            },
            items[selectedIndex].id
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2 animate-in slide-in-from-bottom-4 duration-500", children: [
          /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]", children: items[selectedIndex].category }),
          /* @__PURE__ */ jsx("h2", { className: "text-white text-2xl md:text-3xl font-black tracking-tight", children: items[selectedIndex].title || "Institute Highlight" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 mt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "h-[1px] w-8 bg-white/10" }),
            /* @__PURE__ */ jsxs("p", { className: "text-white/40 text-[10px] font-bold uppercase tracking-widest", children: [
              "Image ",
              selectedIndex + 1,
              " of ",
              items.length
            ] }),
            /* @__PURE__ */ jsx("span", { className: "h-[1px] w-8 bg-white/10" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col md:flex-row gap-3 h-[600px] md:h-[500px] overflow-hidden`, children: featuredItems.map((item, index) => /* @__PURE__ */ jsx(
      "div",
      {
        onMouseEnter: () => setExpandedId(item.id),
        onClick: () => openLightbox(index),
        className: `
              relative cursor-pointer overflow-hidden rounded-[24px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] bg-slate-100
              ${expandedId === item.id ? "flex-[4] h-[350px] md:h-full" : "flex-1 h-[120px] md:h-full"}
              ${expandedId !== null && expandedId !== item.id ? "flex-[0.8]" : ""}
              group
            `,
        children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 w-full h-full", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: item.image,
              alt: item.title || "Gallery Item",
              loading: "lazy",
              decoding: "async",
              className: `
                  w-full h-full object-cover transition-all duration-700
                  group-hover:scale-110
                `
            }
          ),
          /* @__PURE__ */ jsx("div", { className: `
                absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                transition-opacity duration-500
                ${expandedId === item.id ? "opacity-100" : "opacity-40 group-hover:opacity-100"}
              ` }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx(Maximize2, { size: 18 }) }),
          /* @__PURE__ */ jsxs("div", { className: `
                absolute bottom-0 left-0 right-0 p-6 md:p-8
                transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${expandedId === item.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
              `, children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white font-heading text-xl md:text-2xl font-bold mb-1 truncate", children: item.title || "Institute Life" }),
            /* @__PURE__ */ jsxs("p", { className: "text-white/70 text-sm md:text-base line-clamp-2", children: [
              item.category,
              " Highlight"
            ] })
          ] })
        ] })
      },
      item.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12", children: items.slice(5).map((item, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => openLightbox(index + 5),
        className: "relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-lg border border-slate-100 bg-slate-100",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: item.image,
              alt: item.title || "Gallery Item",
              loading: "lazy",
              decoding: "async",
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-300 mb-2", children: /* @__PURE__ */ jsx(Maximize2, { size: 18 }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white text-[10px] font-black uppercase tracking-widest", children: item.category })
          ] })
        ]
      },
      item.id
    )) })
  ] });
};
function GalleryPage({ gallery, siteContent }) {
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.gallery || {
    badge: "VISUAL JOURNEY",
    title: "Institute Life & Achievements",
    subtitle: "A visual showcase of our learning environment, digital labs, and student activities."
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white min-h-screen", children: [
    /* @__PURE__ */ jsx(Head, { title: "Gallery" }),
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
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6", children: /* @__PURE__ */ jsx(ExpandingGallery, { items: gallery }) }) })
  ] });
}
GalleryPage.layout = (page) => /* @__PURE__ */ jsx(MainLayout, { children: page });
export {
  GalleryPage as default
};
