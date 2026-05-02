import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { Check, Save, Plus, Trash2 } from "lucide-react";
function ManageHomepage({ homepage }) {
  const sections = homepage?.sections || [];
  const statsSec = sections.find((s) => s.id === "stats") || { items: [] };
  sections.find((s) => s.id === "features") || {};
  const ctaSec = sections.find((s) => s.id === "cta" || s.id === "bottomCta") || { id: "cta", title: "", subtitle: "" };
  const [stats, setStats] = useState(statsSec.items || []);
  const [saved, setSaved] = useState(false);
  const [ctaTitle, setCtaTitle] = useState(ctaSec.title || ctaSec.heading || "");
  const [ctaSubtitle, setCtaSubtitle] = useState(ctaSec.subtitle || ctaSec.description || "");
  const { put, processing } = useForm({});
  const updateStat = (idx, field, value) => {
    setStats((prev) => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };
  const addStat = () => setStats((prev) => [...prev, { label: "New Stat", value: "0", suffix: "+" }]);
  const removeStat = (idx) => setStats((prev) => prev.filter((_, i) => i !== idx));
  const handleSave = () => {
    const updatedSections = sections.map((s) => {
      if (s.id === "stats") return { ...s, items: stats };
      if (s.id === ctaSec.id) return { ...s, title: ctaTitle, subtitle: ctaSubtitle, heading: ctaTitle, description: ctaSubtitle };
      return s;
    });
    const hasStats = updatedSections.some((s) => s.id === "stats");
    if (!hasStats) updatedSections.push({ id: "stats", enabled: true, items: stats });
    const payload = { sections: JSON.stringify(updatedSections) };
    put(route("admin.homepage.update"), {
      data: payload,
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Homepage" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Homepage Sections" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Edit stats, CTA and key content shown on your home page." })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSave,
          disabled: processing,
          className: `px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 ${saved ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-500/20"}`,
          children: saved ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Check, { size: 16 }),
            " Saved!"
          ] }) : processing ? "Saving..." : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Save, { size: 16 }),
            " Save All"
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-slate-100 pb-4 mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2", children: "📊 Statistics / Counters" }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: addStat,
              className: "flex items-center gap-2 text-xs font-bold bg-cyan-50 text-cyan-600 px-4 py-2 rounded-xl hover:bg-cyan-100 transition-colors",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 14 }),
                " Add Stat"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 xl:grid-cols-4 gap-4", children: [
          stats.map((stat, idx) => /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-5 rounded-2xl space-y-3 relative group", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => removeStat(idx),
                className: "absolute top-3 right-3 w-7 h-7 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center",
                children: /* @__PURE__ */ jsx(Trash2, { size: 12 })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Value" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: stat.value,
                  onChange: (e) => updateStat(idx, "value", e.target.value),
                  className: "w-full bg-white border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-xl text-xl font-black text-cyan-600"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Suffix (e.g. +, %)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: stat.suffix || "",
                  onChange: (e) => updateStat(idx, "suffix", e.target.value),
                  className: "w-full bg-white border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-xl text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Label" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: stat.label,
                  onChange: (e) => updateStat(idx, "label", e.target.value),
                  className: "w-full bg-white border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-xl text-sm font-bold"
                }
              )
            ] })
          ] }, idx)),
          stats.length === 0 && /* @__PURE__ */ jsx("div", { className: "col-span-4 text-center py-8 text-slate-400 text-sm font-medium", children: 'No stats yet — click "Add Stat" to add counters to your homepage.' })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4 mb-6", children: "🎯 Call to Action (CTA) Section" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2", children: "CTA Heading" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: ctaTitle,
                onChange: (e) => setCtaTitle(e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl font-bold",
                placeholder: "Ready to Start Your Tech Career?"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2", children: "CTA Subtitle" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 3,
                value: ctaSubtitle,
                onChange: (e) => setCtaSubtitle(e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl resize-none",
                placeholder: "Join thousands of students who have transformed their future..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-white font-black text-xl mb-2", children: ctaTitle || "Your CTA Heading" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm", children: ctaSubtitle || "Your subtitle will appear here" }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 inline-block bg-cyan-500 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest", children: "Apply Now" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "💡" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-black text-amber-800 text-sm mb-1", children: "More Sections Available" }),
          /* @__PURE__ */ jsxs("p", { className: "text-amber-700 text-sm", children: [
            "Hero section is managed from ",
            /* @__PURE__ */ jsx("strong", { children: "Hero Section" }),
            " module. Courses are managed from ",
            /* @__PURE__ */ jsx("strong", { children: "Courses" }),
            " module. Team and Testimonials have their own dedicated sections."
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ManageHomepage as default
};
