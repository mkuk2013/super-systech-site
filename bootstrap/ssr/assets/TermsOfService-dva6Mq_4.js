import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AnimatedSection, M as MainLayout } from "./MainLayout-BoZ6Yae8.js";
import { Scale, FileCheck, GraduationCap, BookOpen, Gavel, AlertCircle, ChevronRight, Mail, Phone } from "lucide-react";
import "framer-motion";
import "react";
function TermsOfService({ siteContent }) {
  const settings = siteContent?.settings;
  const sections = [
    { id: "acceptance", title: "Acceptance", icon: FileCheck },
    { id: "admissions", title: "Admissions", icon: GraduationCap },
    { id: "license", title: "Usage License", icon: BookOpen },
    { id: "conduct", title: "Code of Conduct", icon: Gavel },
    { id: "liability", title: "Liability", icon: AlertCircle }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 min-h-screen", children: [
    /* @__PURE__ */ jsx(Head, { title: "Terms of Service" }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-24 md:py-32 overflow-hidden bg-slate-950", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-20", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6 relative z-10 text-center", children: /* @__PURE__ */ jsxs(AnimatedSection, { children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6", children: [
          /* @__PURE__ */ jsx(Scale, { size: 14 }),
          " Legal Agreement"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase leading-none", children: [
          "Terms of ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500", children: "Service" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed", children: "Everything you need to know about our rules, regulations, and commitment to your education." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 relative", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-16", children: [
      /* @__PURE__ */ jsx("aside", { className: "lg:w-80 shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-28 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4", children: "Table of Contents" }),
          /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: sections.map((section) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: `#${section.id}`,
              className: "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-all font-bold text-sm group",
              children: [
                /* @__PURE__ */ jsx(section.icon, { size: 18, className: "group-hover:scale-110 transition-transform" }),
                section.title
              ]
            },
            section.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("h5", { className: "font-black text-lg mb-2", children: "Need Help?" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mb-6", children: "Contact our administration for any policy clarifications." }),
            /* @__PURE__ */ jsxs("a", { href: "/contact", className: "inline-flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors", children: [
              "Visit Help Desk ",
              /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Scale, { className: "absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1 space-y-20", children: [
        /* @__PURE__ */ jsxs("div", { id: "acceptance", className: "scroll-mt-32 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-2", children: /* @__PURE__ */ jsx(FileCheck, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "1. Acceptance of Terms" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { children: "By accessing the website of Super Sys-Tech Computers Centre and enrolling in any of our technical programs, you agree to be bound by these Terms of Service. These terms govern your relationship with us and apply to all visitors, students, and others who access or use our services." }),
            /* @__PURE__ */ jsx("p", { children: "If you disagree with any part of the terms, then you may not access the service or enroll in our academic programs." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "admissions", className: "scroll-mt-32 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 mb-2", children: /* @__PURE__ */ jsx(GraduationCap, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "2. Enrollment & Admissions" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 font-medium text-lg leading-relaxed", children: "Super Sys-Tech maintains a high standard of academic excellence. Enrollment is subject to the following conditions:" }),
            /* @__PURE__ */ jsx("ul", { className: "grid gap-4", children: [
              "Providing verified and accurate previous academic records.",
              "Compliance with the minimum attendance requirements for certification.",
              "Adherence to the payment schedule for course fees.",
              "Meeting the technical prerequisites for advanced IT programs."
            ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-slate-600 font-bold", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(ChevronRight, { size: 14 }) }),
              item
            ] }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "license", className: "scroll-mt-32 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-2", children: /* @__PURE__ */ jsx(BookOpen, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "3. Usage License" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-lg font-medium leading-relaxed", children: "All course materials, including software, notes, and digital assets, are the intellectual property of Super Sys-Tech." }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-emerald-500", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-black text-slate-900 mb-2", children: "Permitted Use" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm font-medium", children: "Personal study, individual project work, and classroom learning activities." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-red-500", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-black text-slate-900 mb-2", children: "Prohibited Use" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-500 text-sm font-medium", children: "Commercial redistribution, unauthorized sharing, or reselling of institute materials." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "conduct", className: "scroll-mt-32 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-2", children: /* @__PURE__ */ jsx(Gavel, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "4. Code of Conduct" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 font-medium text-lg leading-relaxed", children: "Super Sys-Tech is a community of learning. We expect all students to:" }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: [
              "Maintain respectful communication with faculty and peers.",
              "Strictly avoid any form of plagiarism or academic dishonesty.",
              "Respect institute property and computing resources.",
              "Follow the lab and classroom safety protocols."
            ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white px-6 py-4 rounded-2xl border border-slate-100 font-bold text-slate-700 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-amber-500", children: [
                "0",
                i + 1
              ] }),
              item
            ] }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "liability", className: "scroll-mt-32 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 text-red-600 mb-2", children: /* @__PURE__ */ jsx(AlertCircle, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "5. Limitation of Liability" }),
          /* @__PURE__ */ jsx("div", { className: "prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed", children: /* @__PURE__ */ jsx("p", { children: "In no event shall Super Sys-Tech Computers Centre or its partners be liable for any damages arising out of the use or inability to use the materials provided, even if we have been notified of the possibility of such damage." }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "contact", className: "scroll-mt-32 space-y-8 pt-10 border-t border-slate-200", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-950 text-white mb-2", children: /* @__PURE__ */ jsx(Mail, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "Get in Touch" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Mail, { size: 20 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Official Email" }),
                /* @__PURE__ */ jsx("p", { className: "font-black text-slate-900 break-all", children: settings?.email || "stcuk1997@gmail.com" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Phone, { size: 20 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Administrative Office" }),
                /* @__PURE__ */ jsx("p", { className: "font-black text-slate-900", children: settings?.phone || "0238-571540" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-20", children: /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]", children: "Effective Date: January 1, 2026 • © Super Sys-Tech Computers Centre" }) })
      ] })
    ] }) }) })
  ] });
}
TermsOfService.layout = (page) => /* @__PURE__ */ jsx(MainLayout, { children: page });
export {
  TermsOfService as default
};
