import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { Save, BookOpen, User, Trash2, Plus, Upload } from "lucide-react";
function ManageAbout({ about }) {
  const directorRef = useRef(null);
  const principalRef = useRef(null);
  const [achievements, setAchievements] = useState(about?.achievements || []);
  const [newAchievement, setNewAchievement] = useState("");
  const { data, setData, post, processing, errors } = useForm({
    title: about?.title || "",
    titleHighlight: about?.titleHighlight || "",
    description: about?.description || "",
    mission: about?.mission || "",
    vision: about?.vision || "",
    directorName: about?.directorName || "",
    directorTitle: about?.directorTitle || "",
    directorMessage: about?.directorMessage || "",
    directorImage: about?.directorImage || "",
    directorImageFile: null,
    principalName: about?.principalName || "",
    principalTitle: about?.principalTitle || "",
    principalMessage: about?.principalMessage || "",
    principalImage: about?.principalImage || "",
    principalImageFile: null,
    achievements: JSON.stringify(about?.achievements || [])
  });
  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    const updated = [...achievements, newAchievement.trim()];
    setAchievements(updated);
    setData("achievements", JSON.stringify(updated));
    setNewAchievement("");
  };
  const handleRemoveAchievement = (idx) => {
    const updated = achievements.filter((_, i) => i !== idx);
    setAchievements(updated);
    setData("achievements", JSON.stringify(updated));
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.about.update"));
  };
  const InputField = ({ label, field, textarea = false, rows = 3 }) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: label }),
    textarea ? /* @__PURE__ */ jsx(
      "textarea",
      {
        rows,
        value: data[field],
        onChange: (e) => setData(field, e.target.value),
        className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl resize-none"
      }
    ) : /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: data[field],
        onChange: (e) => setData(field, e.target.value),
        className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
      }
    )
  ] });
  const ImageUpload = ({ label, currentImage, previewKey, fileKey, inputRef }) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 flex-shrink-0", children: data[previewKey] && /* @__PURE__ */ jsx("img", { src: data[previewKey], alt: "", className: "w-full h-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: data[previewKey],
            onChange: (e) => setData(previewKey, e.target.value),
            className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm",
            placeholder: "Image URL"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              ref: inputRef,
              accept: "image/*",
              className: "absolute inset-0 opacity-0 cursor-pointer z-10",
              onChange: (e) => setData(fileKey, e.target.files?.[0] || null)
            }
          ),
          /* @__PURE__ */ jsxs("button", { type: "button", className: "flex items-center gap-2 text-xs font-bold text-cyan-600 bg-cyan-50 px-4 py-2 rounded-xl hover:bg-cyan-100 transition-colors", children: [
            /* @__PURE__ */ jsx(Upload, { size: 14 }),
            " Upload New Photo"
          ] })
        ] }),
        data[fileKey] && /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-emerald-600 font-bold", children: [
          "✓ New file selected: ",
          data[fileKey].name
        ] })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage About Page" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "About Page" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Edit your institute's story, leadership, mission and vision." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: submit,
          disabled: processing,
          className: "bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsx(Save, { size: 16 }),
            " ",
            processing ? "Saving..." : "Save Changes"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "text-cyan-600", size: 20 }),
          " Page Heading"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx(InputField, { label: "Title", field: "title" }),
          /* @__PURE__ */ jsx(InputField, { label: "Title Highlight (Colored Word)", field: "titleHighlight" })
        ] }),
        /* @__PURE__ */ jsx(InputField, { label: "Description", field: "description", textarea: true, rows: 4 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsx(User, { className: "text-blue-600", size: 20 }),
          " Director"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx(InputField, { label: "Name", field: "directorName" }),
          /* @__PURE__ */ jsx(InputField, { label: "Title / Designation", field: "directorTitle" })
        ] }),
        /* @__PURE__ */ jsx(ImageUpload, { label: "Director Photo", currentImage: data.directorImage, previewKey: "directorImage", fileKey: "directorImageFile", inputRef: directorRef }),
        /* @__PURE__ */ jsx(InputField, { label: "Message / Quote", field: "directorMessage", textarea: true, rows: 5 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsx(User, { className: "text-purple-600", size: 20 }),
          " Principal"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsx(InputField, { label: "Name", field: "principalName" }),
          /* @__PURE__ */ jsx(InputField, { label: "Title / Designation", field: "principalTitle" })
        ] }),
        /* @__PURE__ */ jsx(ImageUpload, { label: "Principal Photo", currentImage: data.principalImage, previewKey: "principalImage", fileKey: "principalImageFile", inputRef: principalRef }),
        /* @__PURE__ */ jsx(InputField, { label: "Message / Quote", field: "principalMessage", textarea: true, rows: 5 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4", children: "🎯 Mission" }),
          /* @__PURE__ */ jsx(InputField, { label: "Mission Statement", field: "mission", textarea: true, rows: 5 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4", children: "🚀 Vision" }),
          /* @__PURE__ */ jsx(InputField, { label: "Vision Statement", field: "vision", textarea: true, rows: 5 })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4 mb-6", children: "🏆 Key Achievements" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-6", children: achievements.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-slate-50 p-3 rounded-xl", children: [
          /* @__PURE__ */ jsx("span", { className: "flex-1 text-sm font-medium text-slate-700", children: item }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => handleRemoveAchievement(idx),
              className: "w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center",
              children: /* @__PURE__ */ jsx(Trash2, { size: 14 })
            }
          )
        ] }, idx)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: newAchievement,
              onChange: (e) => setNewAchievement(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && (e.preventDefault(), handleAddAchievement()),
              className: "flex-1 bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl",
              placeholder: "Add an achievement..."
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: handleAddAchievement,
              className: "bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 16 }),
                " Add"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  ManageAbout as default
};
