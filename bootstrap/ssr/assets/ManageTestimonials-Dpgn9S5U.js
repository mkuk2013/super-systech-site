import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { Plus, Star, Check, X, Pencil, Trash2 } from "lucide-react";
const StarRating = ({ value, onChange }) => /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsx(
  "button",
  {
    type: "button",
    onClick: () => onChange(n),
    className: `text-2xl transition-transform hover:scale-125 ${n <= value ? "text-amber-400" : "text-slate-200"}`,
    children: "★"
  },
  n
)) });
function ManageTestimonials({ testimonials }) {
  const [editingId, setEditingId] = useState(null);
  const addForm = useForm({ name: "", course: "", message: "", rating: 5 });
  const editForm = useForm({ name: "", course: "", message: "", rating: 5 });
  const startEdit = (t) => {
    setEditingId(t.id);
    editForm.setData({ name: t.name, course: t.course, message: t.message, rating: t.rating });
  };
  const submitAdd = (e) => {
    e.preventDefault();
    addForm.post(route("admin.testimonials.store"), { onSuccess: () => addForm.reset() });
  };
  const submitEdit = (id) => {
    editForm.patch(route("admin.testimonials.update", id), { onSuccess: () => setEditingId(null) });
  };
  const handleDelete = (id) => {
    if (confirm("Delete this testimonial?")) addForm.delete(route("admin.testimonials.destroy", id));
  };
  const courses = ["DIT", "DAE-IT", "Web Development", "Graphic Design", "Digital Marketing", "Other"];
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Testimonials" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Testimonials" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Manage student reviews displayed on the website." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 sticky top-28", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-base text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Plus, { className: "text-amber-500", size: 18 }),
          " Add Review"
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submitAdd, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Student Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: addForm.data.name,
                onChange: (e) => addForm.setData("name", e.target.value),
                required: true,
                className: "w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Course" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: addForm.data.course,
                onChange: (e) => addForm.setData("course", e.target.value),
                required: true,
                className: "w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select course" }),
                  courses.map((c) => /* @__PURE__ */ jsx("option", { value: c, children: c }, c))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2", children: "Rating" }),
            /* @__PURE__ */ jsx(StarRating, { value: addForm.data.rating, onChange: (v) => addForm.setData("rating", v) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Review Message" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 4,
                value: addForm.data.message,
                onChange: (e) => addForm.setData("message", e.target.value),
                required: true,
                className: "w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: addForm.processing,
              className: "w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 16 }),
                " ",
                addForm.processing ? "Adding..." : "Add Testimonial"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        testimonials.length === 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] border border-slate-100 p-20 text-center", children: [
          /* @__PURE__ */ jsx(Star, { className: "text-slate-200 mx-auto mb-4", size: 48 }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-bold uppercase tracking-widest text-xs", children: "No testimonials yet" })
        ] }),
        testimonials.map((t) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6", children: editingId === t.id ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: editForm.data.name,
                  onChange: (e) => editForm.setData("name", e.target.value),
                  className: "w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Course" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: editForm.data.course,
                  onChange: (e) => editForm.setData("course", e.target.value),
                  className: "w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm",
                  children: courses.map((c) => /* @__PURE__ */ jsx("option", { value: c, children: c }, c))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2", children: "Rating" }),
            /* @__PURE__ */ jsx(StarRating, { value: editForm.data.rating, onChange: (v) => editForm.setData("rating", v) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Message" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 3,
                value: editForm.data.message,
                onChange: (e) => editForm.setData("message", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => submitEdit(t.id),
                disabled: editForm.processing,
                className: "flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Check, { size: 14 }),
                  " Save"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setEditingId(null),
                className: "flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(X, { size: 14 }),
                  " Cancel"
                ]
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mb-1", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsx("span", { className: `text-sm ${n <= t.rating ? "text-amber-400" : "text-slate-200"}`, children: "★" }, n)) }),
            /* @__PURE__ */ jsxs("p", { className: "text-slate-700 text-sm mb-3 italic leading-relaxed", children: [
              '"',
              t.message,
              '"'
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-black text-slate-900 text-sm", children: [
                "— ",
                t.name
              ] }),
              /* @__PURE__ */ jsx("span", { className: "bg-cyan-50 text-cyan-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full", children: t.course })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => startEdit(t),
                className: "w-9 h-9 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-500 flex items-center justify-center transition-all",
                children: /* @__PURE__ */ jsx(Pencil, { size: 15 })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(t.id),
                className: "w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-500 hover:text-white text-slate-500 flex items-center justify-center transition-all",
                children: /* @__PURE__ */ jsx(Trash2, { size: 15 })
              }
            )
          ] })
        ] }) }, t.id))
      ] })
    ] })
  ] });
}
export {
  ManageTestimonials as default
};
