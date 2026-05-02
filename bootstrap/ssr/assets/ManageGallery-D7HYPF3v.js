import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { Image, Upload, Plus, Check, X, Pencil, Trash2 } from "lucide-react";
const CATEGORIES = ["Institute", "Lab", "Event", "Achievement", "Other"];
function ManageGallery({ gallery }) {
  const fileInputRef = useRef(null);
  const editFileRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const addForm = useForm({ title: "", category: "", image: null });
  const submitAdd = (e) => {
    e.preventDefault();
    addForm.post(route("admin.gallery.store"), {
      onSuccess: () => {
        addForm.reset();
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    });
  };
  const editForm = useForm({ title: "", category: "", image: null });
  const startEdit = (item) => {
    setEditingId(item.id);
    editForm.setData({ title: item.title || "", category: item.category, image: null });
  };
  const submitEdit = (id) => {
    editForm.post(route("admin.gallery.update", id), {
      onSuccess: () => {
        setEditingId(null);
        editForm.reset();
        if (editFileRef.current) editFileRef.current.value = "";
      }
    });
  };
  const cancelEdit = () => {
    setEditingId(null);
    editForm.reset();
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this image?")) {
      addForm.delete(route("admin.gallery.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Gallery" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Manage Gallery" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Upload, edit and delete visual assets for your website." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl", children: [
        /* @__PURE__ */ jsx(Image, { size: 16, className: "text-slate-400" }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs font-black text-slate-500 uppercase tracking-widest", children: [
          gallery.length,
          " Images"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] border border-slate-100 shadow-sm p-7 sticky top-28", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-base text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsx(Upload, { className: "text-cyan-600", size: 18 }),
          " Upload New Image"
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submitAdd, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Title (Optional)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: addForm.data.title,
                onChange: (e) => addForm.setData("title", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm",
                placeholder: "E.g., Computer Lab"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Category *" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: addForm.data.category,
                onChange: (e) => addForm.setData("category", e.target.value),
                required: true,
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select a category" }),
                  CATEGORIES.map((c) => /* @__PURE__ */ jsx("option", { value: c, children: c }, c))
                ]
              }
            ),
            addForm.errors.category && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: addForm.errors.category })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Image File *" }),
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  ref: fileInputRef,
                  accept: "image/*",
                  required: true,
                  onChange: (e) => addForm.setData("image", e.target.files?.[0] || null),
                  className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `border-2 border-dashed rounded-2xl p-5 text-center transition-all ${addForm.data.image ? "border-cyan-500 bg-cyan-50" : "border-slate-200 group-hover:border-slate-300"}`, children: addForm.data.image ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsx(Image, { className: "text-cyan-600", size: 28 }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-cyan-900 truncate max-w-[180px]", children: addForm.data.image.name })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsx(Upload, { className: "text-slate-300", size: 28 }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-slate-400", children: "Click or drag to upload" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-300", children: "Max 5MB" })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: addForm.processing,
              className: "w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 15 }),
                " ",
                addForm.processing ? "Uploading..." : "Upload Image"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: gallery.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] border border-slate-100 p-20 text-center flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Image, { className: "text-slate-200", size: 40 }) }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-bold uppercase tracking-widest text-sm mb-1", children: "Gallery is empty" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs", children: "Upload your first image using the form." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: gallery.map((item) => /* @__PURE__ */ jsx("div", { children: editingId === item.id ? (
        /* ── Edit Card ── */
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border-2 border-cyan-500 shadow-lg shadow-cyan-500/10 p-4 space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-square rounded-xl overflow-hidden bg-slate-100", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: "", className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Title" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: editForm.data.title,
                onChange: (e) => editForm.setData("title", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-lg text-xs px-3 py-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Category" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: editForm.data.category,
                onChange: (e) => editForm.setData("category", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-lg text-xs px-3 py-2",
                children: CATEGORIES.map((c) => /* @__PURE__ */ jsx("option", { value: c, children: c }, c))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Replace Image (Optional)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  ref: editFileRef,
                  accept: "image/*",
                  onChange: (e) => editForm.setData("image", e.target.files?.[0] || null),
                  className: "absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `border-2 border-dashed rounded-xl p-2.5 text-center text-[10px] transition-all ${editForm.data.image ? "border-cyan-400 bg-cyan-50 text-cyan-700 font-bold" : "border-slate-200 text-slate-400"}`, children: editForm.data.image ? `✓ ${editForm.data.image.name}` : "Click to replace image" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => submitEdit(item.id),
                disabled: editForm.processing,
                className: "flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all",
                children: [
                  /* @__PURE__ */ jsx(Check, { size: 13 }),
                  " ",
                  editForm.processing ? "Saving..." : "Save"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: cancelEdit,
                className: "flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all",
                children: [
                  /* @__PURE__ */ jsx(X, { size: 13 }),
                  " Cancel"
                ]
              }
            )
          ] })
        ] })
      ) : (
        /* ── Display Card ── */
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-square rounded-2xl overflow-hidden group bg-slate-100 shadow-sm border border-slate-100", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: item.image,
              alt: item.title || item.category,
              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-white text-xs font-bold truncate mb-0.5", children: item.title || "Untitled" }),
            /* @__PURE__ */ jsx("p", { className: "text-cyan-400 text-[9px] font-black uppercase tracking-widest", children: item.category })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => startEdit(item),
                className: "w-8 h-8 rounded-lg bg-white/20 text-white backdrop-blur-md flex items-center justify-center hover:bg-cyan-500 transition-colors",
                title: "Edit",
                children: /* @__PURE__ */ jsx(Pencil, { size: 13 })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(item.id),
                className: "w-8 h-8 rounded-lg bg-white/20 text-white backdrop-blur-md flex items-center justify-center hover:bg-red-500 transition-colors",
                title: "Delete",
                children: /* @__PURE__ */ jsx(Trash2, { size: 13 })
              }
            )
          ] })
        ] })
      ) }, item.id)) }) })
    ] })
  ] });
}
export {
  ManageGallery as default
};
