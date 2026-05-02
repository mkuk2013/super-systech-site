import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { A as AnimatedSection, M as MainLayout } from "./MainLayout-BoZ6Yae8.js";
import { useState } from "react";
import "framer-motion";
function AdmissionsPage({ courses, siteContent }) {
  const [submitted, setSubmitted] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: ""
  });
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.admissions || {
    badge: "ENROLL NOW",
    title: "Secure Your Future",
    subtitle: "Fill out the form below to register for the upcoming batch. Our team will contact you for the further admission process."
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admissions", {
      onSuccess: () => {
        setSubmitted(true);
        reset();
      }
    });
  };
  if (submitted) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white min-h-screen pt-24", children: [
      /* @__PURE__ */ jsx(Head, { title: "Success" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 text-center py-20", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 40 }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black text-slate-900 mb-4", children: "Application Received!" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 mb-10 text-lg", children: "Thank you for your interest in STC Umerkot. Our admissions counselor will contact you within 24-48 hours on your provided phone number." }),
        /* @__PURE__ */ jsx("button", { onClick: () => setSubmitted(false), className: "btn-gold !px-10", children: "Back to Admissions" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white min-h-screen", children: [
    /* @__PURE__ */ jsx(Head, { title: "Admissions 2026" }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-24 md:py-32 overflow-hidden bg-slate-900", children: [
      hero.backgroundImage ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-0", children: /* @__PURE__ */ jsx("img", { src: hero.backgroundImage, alt: "", className: "w-full h-full object-cover opacity-40" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1] bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 mesh-gradient opacity-100" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10", children: /* @__PURE__ */ jsxs(AnimatedSection, { children: [
        hero.badge && /* @__PURE__ */ jsx("p", { className: "text-amber-400 text-xs font-black tracking-[0.2em] uppercase mb-4 opacity-90", children: hero.badge }),
        hero.title && /* @__PURE__ */ jsx("h1", { className: "font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight", children: hero.title }),
        hero.subtitle && /* @__PURE__ */ jsx("p", { className: "text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed opacity-80", children: hero.subtitle })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsx(AnimatedSection, { children: /* @__PURE__ */ jsx("div", { className: "bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-2xl", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              required: true,
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              placeholder: "Enter your full name",
              className: "w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none"
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs font-bold mt-1 ml-1", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1", children: "Phone Number" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              required: true,
              value: data.phone,
              onChange: (e) => setData("phone", e.target.value),
              placeholder: "e.g. 0300-1234567",
              className: "w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none"
            }
          ),
          errors.phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs font-bold mt-1 ml-1", children: errors.phone })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1", children: "Email Address (Optional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "yourname@email.com",
              className: "w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1", children: "Select Program" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              required: true,
              value: data.course,
              onChange: (e) => setData("course", e.target.value),
              className: "w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none appearance-none",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Choose a course" }),
                courses.map((c) => /* @__PURE__ */ jsx("option", { value: c.title, children: c.title }, c.id))
              ]
            }
          ),
          errors.course && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs font-bold mt-1 ml-1", children: errors.course })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1", children: "Message / Questions (Optional)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            rows: 4,
            value: data.message,
            onChange: (e) => setData("message", e.target.value),
            placeholder: "Tell us about your background or ask any questions...",
            className: "w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          disabled: processing,
          className: "w-full btn-gold !py-5 !text-[13px] uppercase tracking-widest shadow-2xl shadow-amber-500/20 disabled:opacity-50",
          children: [
            processing ? "Processing..." : "Submit Admission Request",
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "ml-2" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest", children: "Secure Enrollment • Official NAVTTC & STEVTA Training Partner" })
    ] }) }) }) }) })
  ] });
}
AdmissionsPage.layout = (page) => /* @__PURE__ */ jsx(MainLayout, { children: page });
export {
  AdmissionsPage as default
};
