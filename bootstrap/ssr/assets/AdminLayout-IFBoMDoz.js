import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { usePage, Link } from "@inertiajs/react";
import { Sparkles, LayoutDashboard, Home, BookOpen, GraduationCap, UserSquare2, Star, Image, Users, Megaphone, Layout, Settings, ChevronRight, LogOut, X, Menu, Bell } from "lucide-react";
function AdminLayout({ children }) {
  const { props } = usePage();
  const auth = props.auth;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = window.location.pathname;
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Hero Section", href: "/admin/hero", icon: Sparkles },
    { name: "Homepage", href: "/admin/homepage", icon: Home },
    { name: "About Page", href: "/admin/about", icon: BookOpen },
    { name: "Courses", href: "/admin/courses", icon: GraduationCap },
    { name: "Team Members", href: "/admin/team", icon: UserSquare2 },
    { name: "Testimonials", href: "/admin/testimonials", icon: Star },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "Admissions", href: "/admin/admissions", icon: Users },
    { name: "Promotional Popup", href: "/admin/announcement", icon: Megaphone },
    { name: "Page Heroes", href: "/admin/page-heroes", icon: Layout },
    { name: "Settings", href: "/admin/settings", icon: Settings }
  ];
  const isActive = (href) => pathname === href;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50 flex", children: [
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `${isSidebarOpen ? "w-72" : "w-20"} bg-slate-900 text-white transition-all duration-500 fixed h-full z-50 flex flex-col shadow-2xl overflow-hidden`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 flex items-center gap-4 border-b border-white/5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20", children: /* @__PURE__ */ jsx(Sparkles, { className: "text-white", size: 20 }) }),
            isSidebarOpen && /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "font-black tracking-tight text-white leading-none", children: "ADMIN" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-1", children: "Super Sys-Tech" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar", children: navigation.map((item) => /* @__PURE__ */ jsxs(
            Link,
            {
              href: item.href,
              className: `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group no-underline ${isActive(item.href) ? "bg-cyan-500 text-white shadow-xl shadow-cyan-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`,
              children: [
                /* @__PURE__ */ jsx(item.icon, { size: 20, className: isActive(item.href) ? "text-white" : "group-hover:scale-110 transition-transform" }),
                isSidebarOpen && /* @__PURE__ */ jsx("span", { className: "font-bold text-sm tracking-wide", children: item.name }),
                isActive(item.href) && isSidebarOpen && /* @__PURE__ */ jsx(ChevronRight, { size: 16, className: "ml-auto opacity-50" })
              ]
            },
            item.name
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 border-t border-white/5 bg-slate-950/50", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-cyan-400 border border-white/10", children: auth.user.name.charAt(0) }),
              isSidebarOpen && /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-sm text-white truncate", children: auth.user.name }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-500 truncate", children: auth.user.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/logout",
                method: "post",
                as: "button",
                className: "w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 no-underline group",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { size: 18, className: "group-hover:rotate-12 transition-transform" }),
                  isSidebarOpen && /* @__PURE__ */ jsx("span", { className: "font-bold text-xs uppercase tracking-widest", children: "Logout" })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("main", { className: `flex-1 transition-all duration-500 ${isSidebarOpen ? "ml-72" : "ml-20"}`, children: [
      /* @__PURE__ */ jsxs("header", { className: "h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-8", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSidebarOpen(!isSidebarOpen),
            className: "p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 transition-all border border-transparent hover:border-slate-200",
            children: isSidebarOpen ? /* @__PURE__ */ jsx(X, { size: 20 }) : /* @__PURE__ */ jsx(Menu, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxs("button", { className: "relative p-2.5 rounded-xl hover:bg-slate-50 text-slate-500 transition-all", children: [
            /* @__PURE__ */ jsx(Bell, { size: 20 }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-8 w-px bg-slate-200" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-600 uppercase tracking-widest hidden sm:block", children: "Control Center" }),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400", children: /* @__PURE__ */ jsx(Settings, { size: 16 }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-8 max-w-7xl mx-auto", children })
    ] })
  ] });
}
export {
  AdminLayout as A
};
