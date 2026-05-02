import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { useForm, Head } from "@inertiajs/react";
import { Plus, Pencil, X, Search, BookOpen, Clock, Star, Check, Trash2, MoreHorizontal, GraduationCap } from "lucide-react";
import { useState } from "react";
function ManageCourses({ courses }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { data, setData, post, patch, delete: destroy, processing, reset, errors } = useForm({
    title: "",
    description: "",
    duration: "",
    icon: "GraduationCap",
    featured: false,
    admissionsOpen: true,
    order: 0
  });
  const handleAdd = (e) => {
    e.preventDefault();
    post(route("admin.courses.store"), {
      onSuccess: () => {
        setIsAdding(false);
        reset();
      }
    });
  };
  const handleUpdate = (e, id) => {
    e.preventDefault();
    patch(route("admin.courses.update", id), {
      onSuccess: () => {
        setEditingId(null);
        reset();
      }
    });
  };
  const startEdit = (course) => {
    setEditingId(course.id);
    setData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      icon: course.icon,
      featured: course.featured,
      admissionsOpen: course.admissionsOpen,
      order: course.order
    });
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      destroy(route("admin.courses.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Courses" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Courses" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Manage your academic programs and specializations." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsAdding(true),
          className: "btn-gold !px-8 !py-4 flex items-center gap-2 group shadow-2xl hover:shadow-cyan-500/40",
          children: [
            /* @__PURE__ */ jsx(Plus, { size: 18, className: "group-hover:rotate-90 transition-transform duration-500" }),
            " Add New Course"
          ]
        }
      )
    ] }),
    (isAdding || editingId) && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4",
        onClick: (e) => {
          if (e.target === e.currentTarget) {
            setIsAdding(false);
            setEditingId(null);
            reset();
          }
        },
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 border-b border-slate-100 flex justify-between items-center flex-shrink-0", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 text-sm", children: [
              isAdding ? /* @__PURE__ */ jsx(Plus, { className: "text-cyan-600", size: 18 }) : /* @__PURE__ */ jsx(Pencil, { className: "text-amber-500", size: 18 }),
              isAdding ? "Add New Course" : "Edit Course"
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setIsAdding(false);
                  setEditingId(null);
                  reset();
                },
                className: "p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-700",
                children: /* @__PURE__ */ jsx(X, { size: 18 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: isAdding ? handleAdd : (e) => handleUpdate(e, editingId), className: "p-5 space-y-4 overflow-y-auto flex-1", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2", children: "Course Title *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: data.title,
                  onChange: (e) => setData("title", e.target.value),
                  className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl px-4 py-3 font-bold text-slate-800 text-sm",
                  placeholder: "e.g. Diploma in Information Technology (DIT)",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2", children: "Duration" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: data.duration,
                    onChange: (e) => setData("duration", e.target.value),
                    className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl px-4 py-3 text-sm",
                    placeholder: "e.g. 1 Year"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2", children: "Display Order" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: data.order,
                    onChange: (e) => setData("order", parseInt(e.target.value)),
                    className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl px-4 py-3 text-sm"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2", children: "Description" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  value: data.description,
                  onChange: (e) => setData("description", e.target.value),
                  className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 resize-none",
                  placeholder: "Brief overview of the course..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8 bg-slate-50 p-4 rounded-xl", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: data.featured,
                    onChange: (e) => setData("featured", e.target.checked),
                    className: "w-5 h-5 rounded border-slate-200 text-amber-500 focus:ring-amber-400"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase tracking-widest text-slate-700", children: "Featured" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400", children: "Show on homepage" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: data.admissionsOpen,
                    onChange: (e) => setData("admissionsOpen", e.target.checked),
                    className: "w-5 h-5 rounded border-slate-200 text-emerald-600 focus:ring-emerald-500"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase tracking-widest text-slate-700", children: "Admissions Open" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400", children: "Accept new applications" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setIsAdding(false);
                    setEditingId(null);
                    reset();
                  },
                  className: "flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-widest",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 disabled:opacity-50",
                  children: processing ? "Saving..." : isAdding ? "Add Course" : "Update Course"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400", size: 18 }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search courses...",
              className: "w-full bg-white border-slate-200 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-cyan-500 transition-all shadow-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400", children: [
          "Total Courses: ",
          courses.length
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
        /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-50 bg-slate-50/30", children: [
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-16", children: "Order" }),
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Course Details" }),
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Duration" }),
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Features" }),
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-50", children: courses.map((course) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors group", children: [
            /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("span", { className: "w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs", children: course.order }) }),
            /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0 shadow-sm", children: /* @__PURE__ */ jsx(BookOpen, { size: 20 }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-900 text-sm group-hover:text-cyan-600 transition-colors", children: course.title }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 font-medium line-clamp-1 mt-0.5", children: course.description })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-tight bg-slate-100 px-3 py-1.5 rounded-lg w-fit", children: [
              /* @__PURE__ */ jsx(Clock, { size: 14, className: "text-cyan-500" }),
              " ",
              course.duration
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              course.featured && /* @__PURE__ */ jsxs("span", { className: "inline-flex px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-100", children: [
                /* @__PURE__ */ jsx(Star, { size: 10, className: "mr-1 fill-amber-600" }),
                " Featured"
              ] }),
              course.admissionsOpen ? /* @__PURE__ */ jsxs("span", { className: "inline-flex px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100", children: [
                /* @__PURE__ */ jsx(Check, { size: 10, className: "mr-1" }),
                " Open"
              ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-red-50 text-red-600 border border-red-100", children: [
                /* @__PURE__ */ jsx(X, { size: 10, className: "mr-1" }),
                " Closed"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 text-right", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => startEdit(course),
                    className: "w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all shadow-sm border border-amber-100",
                    children: /* @__PURE__ */ jsx(Pencil, { size: 16 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(course.id),
                    className: "w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("button", { className: "group-hover:hidden w-10 h-10 flex items-center justify-center text-slate-300", children: /* @__PURE__ */ jsx(MoreHorizontal, { size: 18 }) })
            ] })
          ] }, course.id)) })
        ] }),
        courses.length === 0 && /* @__PURE__ */ jsxs("div", { className: "p-20 text-center flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(GraduationCap, { className: "text-slate-200", size: 40 }) }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-bold uppercase tracking-widest text-xs", children: "No courses found" })
        ] })
      ] })
    ] })
  ] });
}
export {
  ManageCourses as default
};
