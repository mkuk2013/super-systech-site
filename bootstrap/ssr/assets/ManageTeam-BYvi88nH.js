import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { Plus, Upload, UserSquare2, Check, X, Pencil, Trash2 } from "lucide-react";
function ManageTeam({ team }) {
  const [editingId, setEditingId] = useState(null);
  const fileRef = useRef(null);
  const editFileRef = useRef(null);
  const addForm = useForm({ name: "", role: "", bio: "", order: 0, image: "", imageFile: null });
  const editForm = useForm({ name: "", role: "", bio: "", order: 0, image: "", imageFile: null });
  const startEdit = (member) => {
    setEditingId(member.id);
    editForm.setData({ name: member.name, role: member.role, bio: member.bio, order: member.order, image: member.image, imageFile: null });
  };
  const submitAdd = (e) => {
    e.preventDefault();
    addForm.post(route("admin.team.store"), { onSuccess: () => {
      addForm.reset();
      if (fileRef.current) fileRef.current.value = "";
    } });
  };
  const submitEdit = (id) => {
    editForm.post(route("admin.team.update", id), { onSuccess: () => {
      setEditingId(null);
    } });
  };
  const handleDelete = (id) => {
    if (confirm("Delete this team member?")) {
      addForm.delete(route("admin.team.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Team" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Team Members" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Add, edit or remove faculty and staff profiles." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 sticky top-28", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-base text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Plus, { className: "text-cyan-600", size: 18 }),
          " Add Member"
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submitAdd, className: "space-y-5", children: [
          [
            { label: "Full Name", field: "name", placeholder: "Dr. Ahmad Khan" },
            { label: "Role / Designation", field: "role", placeholder: "Head of IT" }
          ].map(({ label, field, placeholder }) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: label }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: addForm.data[field],
                onChange: (e) => addForm.setData(field, e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm",
                placeholder,
                required: true
              }
            )
          ] }, field)),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Short Bio" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 3,
                value: addForm.data.bio,
                onChange: (e) => addForm.setData("bio", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Display Order" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: addForm.data.order,
                onChange: (e) => addForm.setData("order", Number(e.target.value)),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Photo" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  ref: fileRef,
                  accept: "image/*",
                  className: "absolute inset-0 opacity-0 cursor-pointer z-10",
                  onChange: (e) => addForm.setData("imageFile", e.target.files?.[0] || null)
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: `border-2 border-dashed rounded-xl p-3 text-center transition-all ${addForm.data.imageFile ? "border-cyan-500 bg-cyan-50" : "border-slate-200"}`, children: [
                /* @__PURE__ */ jsx(Upload, { size: 18, className: "mx-auto text-slate-400 mb-1" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: addForm.data.imageFile ? addForm.data.imageFile.name : "Click to upload" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: addForm.processing,
              className: "w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 16 }),
                " ",
                addForm.processing ? "Adding..." : "Add Member"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        team.length === 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] border border-slate-100 p-20 text-center", children: [
          /* @__PURE__ */ jsx(UserSquare2, { className: "text-slate-200 mx-auto mb-4", size: 48 }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-bold uppercase tracking-widest text-xs", children: "No team members yet" })
        ] }),
        team.map((member) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6", children: editingId === member.id ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Name" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: editForm.data.name,
                  onChange: (e) => editForm.setData("name", e.target.value),
                  className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Role" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: editForm.data.role,
                  onChange: (e) => editForm.setData("role", e.target.value),
                  className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "Bio" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 3,
                value: editForm.data.bio,
                onChange: (e) => editForm.setData("bio", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1", children: "New Photo (Optional)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  ref: editFileRef,
                  accept: "image/*",
                  className: "absolute inset-0 opacity-0 cursor-pointer z-10",
                  onChange: (e) => editForm.setData("imageFile", e.target.files?.[0] || null)
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: `border-2 border-dashed rounded-xl p-3 text-center transition-all ${editForm.data.imageFile ? "border-cyan-500 bg-cyan-50" : "border-slate-200"}`, children: [
                /* @__PURE__ */ jsx(Upload, { size: 16, className: "mx-auto text-slate-400 mb-1" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: editForm.data.imageFile ? editForm.data.imageFile.name : "Upload replacement photo" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => submitEdit(member.id),
                disabled: editForm.processing,
                className: "flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-xl transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50",
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
                className: "flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(X, { size: 14 }),
                  " Cancel"
                ]
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0", children: member.image ? /* @__PURE__ */ jsx("img", { src: member.image, alt: member.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx(UserSquare2, { className: "w-full h-full text-slate-300 p-3" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "font-black text-slate-900 text-sm", children: member.name }),
            /* @__PURE__ */ jsx("p", { className: "text-cyan-600 text-xs font-bold uppercase tracking-widest", children: member.role }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs mt-1 line-clamp-1", children: member.bio })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => startEdit(member),
                className: "w-9 h-9 rounded-xl bg-slate-100 hover:bg-cyan-500 hover:text-white text-slate-500 flex items-center justify-center transition-all",
                children: /* @__PURE__ */ jsx(Pencil, { size: 15 })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(member.id),
                className: "w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-500 hover:text-white text-slate-500 flex items-center justify-center transition-all",
                children: /* @__PURE__ */ jsx(Trash2, { size: 15 })
              }
            )
          ] })
        ] }) }, member.id))
      ] })
    ] })
  ] });
}
export {
  ManageTeam as default
};
