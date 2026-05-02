import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head } from "@inertiajs/react";
import { A as AdminLayout } from "./AdminLayout-IFBoMDoz.js";
import { Save, Building2, MapPin, Globe, MessageCircle, Megaphone, Clock } from "lucide-react";
import "react";
function ManageSettings({ settings }) {
  const { data, setData, put, processing, errors } = useForm({
    siteName: settings?.siteName || "Super Sys-Tech",
    shortName: settings?.shortName || "SSTC",
    tagline: settings?.tagline || "Empowering Youth with Digital Skills",
    established: settings?.established || "2005",
    phone: settings?.phone || "03003198050",
    mobile: settings?.mobile || "03003198050",
    mobile2: settings?.mobile2 || "",
    email: settings?.email || "info@supersystech.com",
    address: settings?.address || "Main Campus, Hyderabad",
    mapUrl: settings?.mapUrl || "",
    facebookUrl: settings?.facebookUrl || "",
    youtubeUrl: settings?.youtubeUrl || "",
    linkedinUrl: settings?.linkedinUrl || "",
    whatsappNumber: settings?.whatsappNumber || "03003198050",
    marqueeShow: settings?.marqueeShow ?? true,
    marqueeText: settings?.marqueeText || "Admissions are now open for 2026 batches!",
    showAdmissionsInMarquee: settings?.showAdmissionsInMarquee ?? true,
    workingHours: settings?.workingHours || "Mon-Sat: 9:00 AM - 6:00 PM",
    copyrightInfo: settings?.copyrightInfo || "All Rights Reserved"
  });
  const submit = (e) => {
    e.preventDefault();
    put(route("admin.settings.update"));
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "System Settings" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-10 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase", children: "System Settings" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500 font-medium", children: "Configure global application parameters and contact details." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: (e) => submit(e),
          disabled: processing,
          className: "bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2 disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsx(Save, { size: 16 }),
            processing ? "Saving..." : "Save Settings"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, className: "space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsx(Building2, { className: "text-cyan-600", size: 20 }),
          "General Information"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Site Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.siteName,
                onChange: (e) => setData("siteName", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              }
            ),
            errors.siteName && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.siteName })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Short Name (Acronym)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.shortName,
                onChange: (e) => setData("shortName", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Tagline" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.tagline,
                onChange: (e) => setData("tagline", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Established Year" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.established,
                onChange: (e) => setData("established", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Copyright Text" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.copyrightInfo,
                onChange: (e) => setData("copyrightInfo", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "text-cyan-600", size: 20 }),
          "Contact & Location"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Phone" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.phone,
                onChange: (e) => setData("phone", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Mobile 1" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.mobile,
                onChange: (e) => setData("mobile", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl",
                placeholder: "e.g. 0300-3198050"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: [
              "Mobile 2 ",
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-normal normal-case tracking-normal", children: "(Optional)" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.mobile2,
                onChange: (e) => setData("mobile2", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl",
                placeholder: "e.g. 0321-1234567"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Physical Address" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.address,
                onChange: (e) => setData("address", e.target.value),
                rows: 2,
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl custom-scrollbar resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Google Maps Embed URL" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.mapUrl,
                onChange: (e) => setData("mapUrl", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl",
                placeholder: "https://www.google.com/maps/embed?pb=..."
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsx(Globe, { className: "text-cyan-600", size: 20 }),
          "Social & Communication"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MessageCircle, { size: 14, className: "text-emerald-500" }),
              " WhatsApp Number"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.whatsappNumber,
                onChange: (e) => setData("whatsappNumber", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl",
                placeholder: "Include country code, e.g., 923001234567"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold", children: "Used for the floating chat widget" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Facebook URL" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                value: data.facebookUrl,
                onChange: (e) => setData("facebookUrl", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "YouTube URL" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                value: data.youtubeUrl,
                onChange: (e) => setData("youtubeUrl", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-black text-lg text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4", children: [
          /* @__PURE__ */ jsx(Megaphone, { className: "text-cyan-600", size: 20 }),
          "Announcements & Display"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: data.marqueeShow,
                onChange: (e) => setData("marqueeShow", e.target.checked),
                className: "w-5 h-5 text-cyan-600 bg-white border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-900", children: "Show Announcement Marquee" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5", children: "Display scrolling banner below navbar" })
            ] })
          ] }) }),
          data.marqueeShow && /* @__PURE__ */ jsxs("div", { className: "pl-8 border-l-2 border-cyan-100 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2", children: "Marquee Text (HTML Supported)" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: data.marqueeText,
                  onChange: (e) => setData("marqueeText", e.target.value),
                  rows: 3,
                  className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl custom-scrollbar resize-none font-mono text-sm",
                  placeholder: "<strong>New!</strong> Admissions open..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data.showAdmissionsInMarquee,
                  onChange: (e) => setData("showAdmissionsInMarquee", e.target.checked),
                  className: "w-4 h-4 text-cyan-600 bg-slate-50 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-600 uppercase tracking-widest", children: "Append active courses to marquee automatically" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-slate-100", children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Clock, { size: 14, className: "text-cyan-600" }),
              " Working Hours"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.workingHours,
                onChange: (e) => setData("workingHours", e.target.value),
                className: "w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl",
                placeholder: "e.g., Mon-Sat: 9:00 AM - 6:00 PM"
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ManageSettings as default
};
