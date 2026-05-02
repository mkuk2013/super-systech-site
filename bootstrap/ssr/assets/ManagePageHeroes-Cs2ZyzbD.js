import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { Check, Save } from "lucide-react";
const PAGE_KEYS = ["about", "courses", "gallery", "team", "admissions", "contact"];
const PAGE_LABELS = {
  about: { label: "About Page", emoji: "ℹ️" },
  courses: { label: "Courses Page", emoji: "📚" },
  gallery: { label: "Gallery Page", emoji: "🖼️" },
  team: { label: "Team Page", emoji: "👥" },
  admissions: { label: "Admissions Page", emoji: "📝" },
  contact: { label: "Contact Page", emoji: "📞" }
};
function PageHeroForm({ pageKey, hero }) {
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(hero?.backgroundImage || null);
  const { data, setData, post, processing, errors } = useForm({
    badge: hero?.badge || "",
    title: hero?.title || "",
    subtitle: hero?.subtitle || "",
    image: null
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.page-heroes.update", pageKey), {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2e3);
      },
      forceFormData: true
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setData("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const info = PAGE_LABELS[pageKey] || { label: pageKey, emoji: "📄" };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm", children: [
    /* @__PURE__ */ jsxs("h3", { className: "font-black text-base text-slate-900 uppercase tracking-tight flex items-center gap-3 border-b border-slate-100 pb-4 mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "text-2xl", children: info.emoji }),
      " ",
      info.label
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Badge / Category Tag" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.badge,
            onChange: (e) => setData("badge", e.target.value),
            className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm",
            placeholder: "e.g. ACADEMIC PROGRAMS"
          }
        ),
        errors.badge && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.badge })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Hero Title (Optional)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data.title,
            onChange: (e) => setData("title", e.target.value),
            className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm font-bold",
            placeholder: "Leave empty to show only the banner image..."
          }
        ),
        errors.title && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.title })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Subtitle" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            rows: 2,
            value: data.subtitle,
            onChange: (e) => setData("subtitle", e.target.value),
            className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm resize-none",
            placeholder: "A short descriptive sentence shown below the title..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Banner Image (1920x500)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            onChange: handleImageChange,
            className: "w-full bg-slate-50 border-slate-200 border rounded-xl text-xs p-2"
          }
        ),
        errors.image && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.image })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 rounded-2xl p-4 text-center", children: [
        data.badge && /* @__PURE__ */ jsx("p", { className: "text-amber-400 text-[10px] font-black tracking-[0.2em] uppercase mb-2", children: data.badge }),
        /* @__PURE__ */ jsx("h2", { className: "text-white font-black text-lg", children: data.title || "Page Title" }),
        data.subtitle && /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs mt-1", children: data.subtitle })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: `w-full font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50 ${saved ? "bg-emerald-500 text-white" : "bg-cyan-600 hover:bg-cyan-700 text-white"}`,
          children: saved ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Check, { size: 16 }),
            " Saved!"
          ] }) : processing ? "Saving..." : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Save, { size: 16 }),
            " Save Hero"
          ] })
        }
      )
    ] })
  ] });
}
function ManagePageHeroes({ pageHeroes }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Page Heroes" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Page Hero Banners" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Customize the hero banner shown at the top of each page." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8", children: PAGE_KEYS.map((key) => /* @__PURE__ */ jsx(PageHeroForm, { pageKey: key, hero: pageHeroes[key] }, key)) })
  ] });
}
export {
  ManagePageHeroes as default
};
