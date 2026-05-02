import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { A as AnimatedSection, M as MainLayout } from "./MainLayout-BoZ6Yae8.js";
import { ShieldCheck, Database, Eye, Lock, Mail, ChevronRight, FileText, MapPin } from "lucide-react";
import "framer-motion";
import "react";
function PrivacyPolicy({ siteContent }) {
  const settings = siteContent?.settings;
  const sections = [
    { id: "intro", title: "Introduction", icon: ShieldCheck },
    { id: "data", title: "Data Collection", icon: Database },
    { id: "usage", title: "How we Use Data", icon: Eye },
    { id: "security", title: "Data Security", icon: Lock },
    { id: "contact", title: "Contact Us", icon: Mail }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 min-h-screen", children: [
    /* @__PURE__ */ jsx(Head, { title: "Privacy Policy" }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-24 md:py-32 overflow-hidden bg-slate-950", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-20", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6 relative z-10 text-center", children: /* @__PURE__ */ jsxs(AnimatedSection, { children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 14 }),
          " Trust & Transparency"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase leading-none", children: [
          "Privacy ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500", children: "Policy" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed", children: "Your privacy is our priority. Learn how Super Sys-Tech Computers Centre protects and manages your digital footprint." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 relative", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-16", children: [
      /* @__PURE__ */ jsx("aside", { className: "lg:w-80 shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-28 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xs font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4", children: "On this page" }),
          /* @__PURE__ */ jsx("nav", { className: "space-y-2", children: sections.map((section) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: `#${section.id}`,
              className: "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition-all font-bold text-sm group",
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
            /* @__PURE__ */ jsx("h5", { className: "font-black text-lg mb-2", children: "Have Questions?" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm mb-6", children: "Our legal team is here to help you understand your rights." }),
            /* @__PURE__ */ jsxs("a", { href: "mailto:supersystechumk@gmail.com", className: "inline-flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors", children: [
              "Contact Support ",
              /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
            ] })
          ] }),
          /* @__PURE__ */ jsx(FileText, { className: "absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1 space-y-20", children: [
        /* @__PURE__ */ jsxs("div", { id: "intro", className: "scroll-mt-32 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 mb-2", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "1. Introduction" }),
          /* @__PURE__ */ jsxs("div", { className: "prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { children: "Welcome to Super Sys-Tech Computers Centre Umerkot. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you." }),
            /* @__PURE__ */ jsx("p", { children: "This website is not intended for children under the age of 13, and we do not knowingly collect data relating to children." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "data", className: "scroll-mt-32 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-2", children: /* @__PURE__ */ jsx(Database, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "2. Data Collection" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-600 text-lg font-medium leading-relaxed", children: "Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect the following:" }),
          /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: [
            { title: "Identity Data", desc: "First name, last name, and educational identification.", icon: "ID" },
            { title: "Contact Data", desc: "Email address and telephone numbers for communication.", icon: "@" },
            { title: "Technical Data", desc: "IP address, browser type, and location data.", icon: "</>" },
            { title: "Academic Data", desc: "Previous qualifications and course preferences.", icon: "EDU" }
          ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full mb-4 inline-block tracking-widest uppercase", children: item.icon }),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-black text-slate-900 mb-2", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium text-sm leading-relaxed", children: item.desc })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "usage", className: "scroll-mt-32 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mb-2", children: /* @__PURE__ */ jsx(Eye, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "3. How we use your data" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-600 font-medium text-lg italic border-l-4 border-cyan-500 pl-6", children: '"We only process your data to provide you with the best educational experience and to keep our community secure."' }),
            /* @__PURE__ */ jsx("ul", { className: "grid gap-4", children: [
              "To process your admission applications efficiently.",
              "To provide support and answer your inquiries.",
              "To send important updates regarding your enrolled courses.",
              "To maintain the security and integrity of our campus portal."
            ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-slate-600 font-bold", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(ChevronRight, { size: 14 }) }),
              item
            ] }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "security", className: "scroll-mt-32 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-2", children: /* @__PURE__ */ jsx(Lock, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "4. Data Security" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 space-y-6", children: [
              /* @__PURE__ */ jsx("p", { className: "text-slate-300 text-lg font-medium leading-relaxed", children: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed." }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
                /* @__PURE__ */ jsx("span", { className: "px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest", children: "SSL Encryption" }),
                /* @__PURE__ */ jsx("span", { className: "px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest", children: "Secure Servers" }),
                /* @__PURE__ */ jsx("span", { className: "px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest", children: "Regular Audits" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Lock, { className: "absolute top-[-20%] right-[-10%] w-64 h-64 text-white/[0.03] -rotate-12" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "contact", className: "scroll-mt-32 space-y-8 pt-10 border-t border-slate-200", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-2", children: /* @__PURE__ */ jsx(Mail, { size: 28 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase", children: "Contact Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Mail, { size: 20 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Email Inquiry" }),
                /* @__PURE__ */ jsx("p", { className: "font-black text-slate-900 break-all", children: settings?.email || "supersystechumk@gmail.com" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(MapPin, { size: 20 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Visit Campus" }),
                /* @__PURE__ */ jsx("p", { className: "font-black text-slate-900", children: settings?.address || "1st Floor, Jameel Market, Umerkot" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-20", children: /* @__PURE__ */ jsxs("p", { className: "text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]", children: [
          "Last Updated: ",
          (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          " • © Super Sys-Tech"
        ] }) })
      ] })
    ] }) }) })
  ] });
}
PrivacyPolicy.layout = (page) => /* @__PURE__ */ jsx(MainLayout, { children: page });
export {
  PrivacyPolicy as default
};
