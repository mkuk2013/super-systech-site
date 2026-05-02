import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { Head, Link } from "@inertiajs/react";
import { Users, GraduationCap, Image, TrendingUp, Clock, ChevronRight, Phone, Mail, ArrowUpRight, Sparkles } from "lucide-react";
import "react";
function Dashboard({ stats, recentAdmissions }) {
  const statCards = [
    { label: "Admissions", value: stats.totalAdmissions, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Courses", value: stats.totalCourses, icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Team", value: stats.totalTeamMembers, icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Gallery", value: stats.totalGalleryItems, icon: Image, color: "text-cyan-600", bg: "bg-cyan-50" }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Admin Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "Overview" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Welcome back! Here's what's happening at Super Sys-Tech." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10", children: statCards.map((stat) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: `w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`, children: /* @__PURE__ */ jsx(stat.icon, { size: 28 }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", children: [
          /* @__PURE__ */ jsx(TrendingUp, { size: 12 }),
          " Live"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-slate-900 mb-1", children: stat.value }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs font-bold uppercase tracking-widest", children: stat.label })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-black text-slate-900 uppercase tracking-widest flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Clock, { className: "text-cyan-600", size: 20 }),
            " Recent Applications"
          ] }),
          /* @__PURE__ */ jsxs(Link, { href: "/admin/admissions", className: "text-xs font-bold text-cyan-600 hover:text-cyan-700 uppercase tracking-widest flex items-center gap-1", children: [
            "View All ",
            /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-0 overflow-x-auto", children: [
          /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-50 bg-slate-50/30", children: [
              /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Student" }),
              /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Course" }),
              /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right", children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-50", children: recentAdmissions.map((admission) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors", children: [
              /* @__PURE__ */ jsx("td", { className: "px-8 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-900 text-sm", children: admission.name }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-1 opacity-60", children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-[10px] font-medium", children: [
                    /* @__PURE__ */ jsx(Phone, { size: 10 }),
                    " ",
                    admission.phone
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-[10px] font-medium", children: [
                    /* @__PURE__ */ jsx(Mail, { size: 10 }),
                    " ",
                    admission.email || "N/A"
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-8 py-5", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-600 uppercase tracking-tight", children: admission.course }) }),
              /* @__PURE__ */ jsx("td", { className: "px-8 py-5", children: /* @__PURE__ */ jsx("span", { className: "inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-100", children: "Pending" }) }),
              /* @__PURE__ */ jsx("td", { className: "px-8 py-5 text-right", children: /* @__PURE__ */ jsx("button", { className: "w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all shadow-sm", children: /* @__PURE__ */ jsx(ArrowUpRight, { size: 14 }) }) })
            ] }, admission.id)) })
          ] }),
          recentAdmissions.length === 0 && /* @__PURE__ */ jsxs("div", { className: "p-20 text-center flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Users, { className: "text-slate-200", size: 40 }) }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-bold uppercase tracking-widest text-xs", children: "No recent applications found" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" }),
          /* @__PURE__ */ jsxs("h3", { className: "font-black text-xl mb-6 tracking-tight flex items-center gap-3 uppercase", children: [
            /* @__PURE__ */ jsx(Sparkles, { size: 24, className: "text-cyan-400" }),
            " Quick Actions"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
            /* @__PURE__ */ jsxs(Link, { href: "/admin/hero", className: "flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 no-underline group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Sparkles, { size: 18 }) }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-sm tracking-wide", children: "Edit Hero Section" })
            ] }),
            /* @__PURE__ */ jsxs(Link, { href: "/admin/courses", className: "flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 no-underline group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(GraduationCap, { size: 18 }) }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-sm tracking-wide", children: "Manage Courses" })
            ] }),
            /* @__PURE__ */ jsxs(Link, { href: "/admin/admissions", className: "flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 no-underline group", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Users, { size: 18 }) }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-sm tracking-wide", children: "Review Admissions" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-black text-slate-900 uppercase tracking-widest text-xs mb-6", children: "System Health" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400", children: [
                /* @__PURE__ */ jsx("span", { children: "Database Status" }),
                /* @__PURE__ */ jsx("span", { className: "text-emerald-500", children: "Connected" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-2 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-emerald-500 w-full animate-pulse" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400", children: [
                /* @__PURE__ */ jsx("span", { children: "Storage Usage" }),
                /* @__PURE__ */ jsx("span", { children: "42%" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-2 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-cyan-500 w-[42%]" }) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
