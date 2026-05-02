import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { useForm, Head } from "@inertiajs/react";
import { Save, Star, Type, Layout, Link, Image, Sparkles } from "lucide-react";
import "react";
function ManageHero({ hero }) {
  const { data, setData, post, processing, errors } = useForm({
    badge: hero?.badge || "",
    title: hero?.title || "",
    titleHighlight: hero?.titleHighlight || "",
    titleEnd: hero?.titleEnd || "",
    subtitle: hero?.subtitle || "",
    ctaPrimary: hero?.ctaPrimary || "",
    ctaSecondary: hero?.ctaSecondary || "",
    backgroundImage: hero?.backgroundImage || ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.hero.update"));
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Hero Section" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Hero Section" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Update the first thing your visitors see." })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSubmit,
          disabled: processing,
          className: "btn-gold !px-8 !py-4 flex items-center gap-2 group shadow-2xl hover:shadow-cyan-500/40",
          children: processing ? "Saving..." : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Save, { size: 18, className: "group-hover:scale-110 transition-transform" }),
            " Save Changes"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Star, { size: 14, className: "text-amber-500" }),
            " Badge Text"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.badge,
              onChange: (e) => setData("badge", e.target.value),
              className: "w-full bg-slate-50 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-bold text-slate-700",
              placeholder: "e.g. ADMISSIONS OPEN 2026"
            }
          ),
          errors.badge && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-[10px] font-bold uppercase", children: errors.badge })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Type, { size: 14, className: "text-cyan-500" }),
              " Title Start"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                className: "w-full bg-slate-50 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 transition-all font-bold"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Type, { size: 14, className: "text-amber-500" }),
              " Highlighted"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.titleHighlight,
                onChange: (e) => setData("titleHighlight", e.target.value),
                className: "w-full bg-slate-50 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 transition-all font-bold text-cyan-600"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Type, { size: 14, className: "text-cyan-500" }),
              " Title End"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.titleEnd,
                onChange: (e) => setData("titleEnd", e.target.value),
                className: "w-full bg-slate-50 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 transition-all font-bold"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Layout, { size: 14, className: "text-emerald-500" }),
            " Subtitle Description"
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 4,
              value: data.subtitle,
              onChange: (e) => setData("subtitle", e.target.value),
              className: "w-full bg-slate-50 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-slate-600 leading-relaxed"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Link, { size: 14, className: "text-cyan-500" }),
              " Primary CTA"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.ctaPrimary,
                onChange: (e) => setData("ctaPrimary", e.target.value),
                className: "w-full bg-slate-50 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 transition-all font-bold"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Link, { size: 14, className: "text-slate-400" }),
              " Secondary CTA"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.ctaSecondary,
                onChange: (e) => setData("ctaSecondary", e.target.value),
                className: "w-full bg-slate-50 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 transition-all font-bold"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Image, { size: 14, className: "text-cyan-500" }),
            " Background Image URL"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.backgroundImage,
                onChange: (e) => setData("backgroundImage", e.target.value),
                className: "flex-1 bg-slate-50 border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-slate-500"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-16 h-14 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200", children: /* @__PURE__ */ jsx("img", { src: data.backgroundImage, alt: "Preview", className: "w-full h-full object-cover" }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl relative overflow-hidden group border-8 border-slate-800", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/5 rounded-[2rem] overflow-hidden relative min-h-[500px] flex items-center p-10", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-20", children: /* @__PURE__ */ jsx("img", { src: data.backgroundImage, alt: "", className: "w-full h-full object-cover" }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 space-y-6 max-w-lg", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[8px] font-black px-3 py-1.5 rounded-full tracking-[0.2em] uppercase", children: [
                /* @__PURE__ */ jsx(Sparkles, { size: 10, className: "animate-pulse" }),
                " ",
                data.badge
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-3xl md:text-4xl font-black text-white leading-tight tracking-tight", children: [
                data.title,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400", children: data.titleHighlight }),
                " ",
                data.titleEnd
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm leading-relaxed font-medium line-clamp-3", children: data.subtitle }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-700 rounded-xl text-[10px] font-black uppercase text-white shadow-xl", children: data.ctaPrimary }),
                /* @__PURE__ */ jsx("div", { className: "px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-white", children: data.ctaSecondary })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-8 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10", children: /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-white/60 uppercase tracking-widest flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Layout, { size: 12 }),
            " Live Preview"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem]", children: [
          /* @__PURE__ */ jsxs("h4", { className: "font-black text-amber-800 text-xs uppercase tracking-widest mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Sparkles, { size: 16 }),
            " Pro Tip"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-amber-700 text-sm leading-relaxed font-medium", children: [
            "Keep your title short and impactful. Use the ",
            /* @__PURE__ */ jsx("strong", { children: "Highlighted" }),
            " field for the most important keyword to make it stand out with a beautiful gradient."
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ManageHero as default
};
