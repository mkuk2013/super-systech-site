import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { Eye, EyeOff, Image, Type, Link, Megaphone, Save } from "lucide-react";
function ManageAnnouncement({ announcement }) {
  const { data, setData, post, processing, errors } = useForm({
    show: announcement.show || false,
    type: announcement.type || "text",
    title: announcement.title || "",
    description: announcement.description || "",
    linkText: announcement.linkText || "",
    linkUrl: announcement.linkUrl || "",
    imageFile: null
  });
  const [preview, setPreview] = useState(announcement.image);
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.announcement.update"), {
      forceFormData: true
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("imageFile", file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Promotional Popup" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Promotional Popup" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium text-lg", children: "Manage the announcement model box that appears on the frontend." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `px-6 py-2 rounded-full flex items-center gap-2 font-black text-xs uppercase tracking-widest ${data.show ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}`, children: data.show ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Eye, { size: 16 }),
        " Active"
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(EyeOff, { size: 16 }),
        " Hidden"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-black text-slate-900 uppercase tracking-tight", children: "Display Popup" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 font-medium", children: "Turn on to show this announcement to visitors." })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.show,
                onChange: (e) => setData("show", e.target.checked),
                className: "sr-only peer"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1", children: "Announcement Type" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setData("type", "image"),
                className: `p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${data.type === "image" ? "border-cyan-600 bg-cyan-50 text-cyan-700" : "border-slate-100 hover:border-slate-200 text-slate-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Image, { size: 32 }),
                  /* @__PURE__ */ jsx("span", { className: "font-black text-xs uppercase tracking-widest", children: "Image Banner" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setData("type", "text"),
                className: `p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${data.type === "text" ? "border-cyan-600 bg-cyan-50 text-cyan-700" : "border-slate-100 hover:border-slate-200 text-slate-400"}`,
                children: [
                  /* @__PURE__ */ jsx(Type, { size: 32 }),
                  /* @__PURE__ */ jsx("span", { className: "font-black text-xs uppercase tracking-widest", children: "Text & Info" })
                ]
              }
            )
          ] })
        ] }),
        data.type === "image" ? /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4 border-t border-slate-50", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1", children: "Upload Banner Image" }),
          /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                onChange: handleImageChange,
                className: "hidden",
                id: "banner-upload"
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "banner-upload",
                className: "block w-full aspect-video rounded-[2rem] border-4 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center cursor-pointer group-hover:border-cyan-500/50 group-hover:bg-cyan-50/30 transition-all overflow-hidden",
                children: preview ? /* @__PURE__ */ jsx("img", { src: preview, className: "w-full h-full object-cover", alt: "Preview" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Image, { size: 48, className: "text-slate-300 mb-4" }),
                  /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-bold uppercase text-[10px] tracking-widest", children: "Click to select image" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 font-medium italic", children: "Recommended Size: 800x600 or 1000x1200 (Portrait/Square works best for modals)" })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-4 border-t border-slate-50", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1", children: "Announcement Title" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl py-4 px-6 text-slate-900 font-bold",
                placeholder: "Special Discount or Event Title"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1", children: "Detailed Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 4,
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl py-4 px-6 text-slate-900 font-medium resize-none",
                placeholder: "Provide more details about your announcement..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Link, { size: 14 }),
                " Button Text"
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.linkText,
                  onChange: (e) => setData("linkText", e.target.value),
                  className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl py-4 px-6 text-slate-900 font-bold",
                  placeholder: "e.g. Apply Now"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxs("label", { className: "text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Link, { size: 14 }),
                " Target URL"
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.linkUrl,
                  onChange: (e) => setData("linkUrl", e.target.value),
                  className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl py-4 px-6 text-slate-900 font-bold",
                  placeholder: "e.g. /admissions"
                }
              )
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8 border-b border-white/10 pb-4", children: [
            /* @__PURE__ */ jsx(Eye, { size: 20, className: "text-cyan-400" }),
            /* @__PURE__ */ jsx("h4", { className: "font-black uppercase tracking-widest text-xs", children: "Live Preview" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-white rounded-[2rem] overflow-hidden shadow-2xl scale-95 origin-top border-4 border-white/10", children: data.type === "image" ? /* @__PURE__ */ jsx("div", { className: "aspect-[4/5] bg-slate-100 flex items-center justify-center", children: preview ? /* @__PURE__ */ jsx("img", { src: preview, className: "w-full h-full object-cover", alt: "Preview" }) : /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-black uppercase tracking-widest text-[8px]", children: "No Image Selected" }) }) : /* @__PURE__ */ jsxs("div", { className: "p-8 text-center space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Megaphone, { size: 24 }) }),
            /* @__PURE__ */ jsx("h5", { className: "text-slate-900 font-black text-xl leading-tight", children: data.title || "Your Title Here" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm leading-relaxed", children: data.description || "Your description will appear here when you type..." }),
            data.linkText && /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx("div", { className: "bg-slate-950 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em]", children: data.linkText }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: processing,
            className: "w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-cyan-900/20 flex items-center justify-center gap-3 group transition-all active:scale-[0.98] disabled:opacity-50",
            children: processing ? /* @__PURE__ */ jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Save, { size: 20 }),
              /* @__PURE__ */ jsx("span", { className: "tracking-widest uppercase", children: "Save Changes" })
            ] })
          }
        )
      ] })
    ] })
  ] });
}
export {
  ManageAnnouncement as default
};
