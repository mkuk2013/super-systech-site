import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { useForm, Head } from "@inertiajs/react";
import { Download, Filter, Search, Phone, Mail, Calendar, MessageSquare, ArrowUpRight, Trash2, MoreHorizontal, Users } from "lucide-react";
import "react";
function ManageAdmissions({ admissions }) {
  const { delete: destroy, processing } = useForm();
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this application record?")) {
      destroy(route("admin.admissions.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Manage Admissions" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Admissions" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Review and manage student applications for the upcoming batch." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxs("button", { className: "bg-white border border-slate-200 text-slate-600 font-bold px-6 py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all", children: [
          /* @__PURE__ */ jsx(Download, { size: 16 }),
          " Export CSV"
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "btn-gold !px-8 !py-4 flex items-center gap-2 group shadow-2xl hover:shadow-cyan-500/40", children: [
          /* @__PURE__ */ jsx(Filter, { size: 18, className: "group-hover:scale-110 transition-transform" }),
          " Advanced Filter"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400", size: 18 }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search by name, email or course...",
              className: "w-full bg-white border-slate-200 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-cyan-500 transition-all shadow-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400", children: [
          "Total Applications: ",
          admissions.length
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
        /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-50 bg-slate-50/30", children: [
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Student Info" }),
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Applied For" }),
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Submission Date" }),
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Message" }),
            /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-50", children: admissions.map((admission) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors group", children: [
            /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 text-lg shadow-inner", children: admission.name.charAt(0) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-900 text-sm", children: admission.name }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mt-1", children: [
                  /* @__PURE__ */ jsxs("a", { href: `tel:${admission.phone}`, className: "flex items-center gap-1.5 text-[10px] font-bold text-cyan-600 no-underline hover:underline", children: [
                    /* @__PURE__ */ jsx(Phone, { size: 12 }),
                    " ",
                    admission.phone
                  ] }),
                  /* @__PURE__ */ jsxs("a", { href: `mailto:${admission.email}`, className: "flex items-center gap-1.5 text-[10px] font-bold text-slate-400 no-underline hover:underline", children: [
                    /* @__PURE__ */ jsx(Mail, { size: 12 }),
                    " ",
                    admission.email || "No Email"
                  ] })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("span", { className: "inline-flex px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-cyan-50 text-cyan-700 border border-cyan-100", children: admission.course }) }),
            /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-slate-500 text-xs font-medium", children: [
              /* @__PURE__ */ jsx(Calendar, { size: 14, className: "text-slate-300" }),
              new Date(admission.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 group/msg relative cursor-help", children: [
              /* @__PURE__ */ jsx(MessageSquare, { size: 14, className: "text-slate-300" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 truncate max-w-[150px] italic", children: admission.message || "No message provided" }),
              admission.message && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full left-0 mb-2 w-64 p-4 bg-slate-900 text-white text-[11px] rounded-2xl shadow-2xl opacity-0 invisible group-hover/msg:opacity-100 group-hover/msg:visible transition-all z-20 leading-relaxed font-medium", children: [
                admission.message,
                /* @__PURE__ */ jsx("div", { className: "absolute top-full left-4 w-2 h-2 bg-slate-900 rotate-45 -translate-y-1/2" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 text-right", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
                /* @__PURE__ */ jsx("button", { className: "w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all shadow-sm border border-cyan-100", children: /* @__PURE__ */ jsx(ArrowUpRight, { size: 16 }) }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDelete(admission.id),
                    className: "w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("button", { className: "group-hover:hidden w-10 h-10 flex items-center justify-center text-slate-300", children: /* @__PURE__ */ jsx(MoreHorizontal, { size: 18 }) })
            ] })
          ] }, admission.id)) })
        ] }),
        admissions.length === 0 && /* @__PURE__ */ jsxs("div", { className: "p-20 text-center flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Users, { className: "text-slate-200", size: 40 }) }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-bold uppercase tracking-widest text-xs", children: "No admission applications yet" })
        ] })
      ] })
    ] })
  ] });
}
export {
  ManageAdmissions as default
};
