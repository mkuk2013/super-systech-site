import { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Settings, Save, Globe, MessageCircle, MapPin, Building2, Megaphone, Clock } from "lucide-react";

interface SettingsProps {
  settings: any;
}

export default function ManageSettings({ settings }: SettingsProps) {
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
    copyrightInfo: settings?.copyrightInfo || "All Rights Reserved",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route("admin.settings.update"));
  };

  return (
    <AdminLayout>
      <Head title="System Settings" />

      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">System Settings</h2>
          <p className="text-slate-500 font-medium">Configure global application parameters and contact details.</p>
        </div>
        <button
          onClick={(e) => submit(e as any)}
          disabled={processing}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={16} />
          {processing ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <form onSubmit={submit} className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* General Information */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Building2 className="text-cyan-600" size={20} />
              General Information
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Site Name</label>
                <input
                  type="text"
                  value={data.siteName}
                  onChange={e => setData('siteName', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                />
                {errors.siteName && <p className="text-red-500 text-xs mt-1">{errors.siteName}</p>}
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Short Name (Acronym)</label>
                <input
                  type="text"
                  value={data.shortName}
                  onChange={e => setData('shortName', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.tagline}
                  onChange={e => setData('tagline', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Established Year</label>
                <input
                  type="text"
                  value={data.established}
                  onChange={e => setData('established', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Copyright Text</label>
                <input
                  type="text"
                  value={data.copyrightInfo}
                  onChange={e => setData('copyrightInfo', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <MapPin className="text-cyan-600" size={20} />
              Contact & Location
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Phone</label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={e => setData('phone', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Mobile 1</label>
                <input
                  type="text"
                  value={data.mobile}
                  onChange={e => setData('mobile', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                  placeholder="e.g. 0300-3198050"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Mobile 2 <span className="text-slate-400 font-normal normal-case tracking-normal">(Optional)</span></label>
                <input
                  type="text"
                  value={data.mobile2}
                  onChange={e => setData('mobile2', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                  placeholder="e.g. 0321-1234567"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Physical Address</label>
                <textarea
                  value={data.address}
                  onChange={e => setData('address', e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl custom-scrollbar resize-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Google Maps Embed URL</label>
                <input
                  type="text"
                  value={data.mapUrl}
                  onChange={e => setData('mapUrl', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
              </div>
            </div>
          </div>

          {/* Social Links & Communication */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Globe className="text-cyan-600" size={20} />
              Social & Communication
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <MessageCircle size={14} className="text-emerald-500" /> WhatsApp Number
                </label>
                <input
                  type="text"
                  value={data.whatsappNumber}
                  onChange={e => setData('whatsappNumber', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                  placeholder="Include country code, e.g., 923001234567"
                />
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Used for the floating chat widget</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Facebook URL</label>
                <input
                  type="url"
                  value={data.facebookUrl}
                  onChange={e => setData('facebookUrl', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">YouTube URL</label>
                <input
                  type="url"
                  value={data.youtubeUrl}
                  onChange={e => setData('youtubeUrl', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Display Features */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Megaphone className="text-cyan-600" size={20} />
              Announcements & Display
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200">
                  <input
                    type="checkbox"
                    checked={data.marqueeShow}
                    onChange={e => setData('marqueeShow', e.target.checked)}
                    className="w-5 h-5 text-cyan-600 bg-white border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">Show Announcement Marquee</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Display scrolling banner below navbar</span>
                  </div>
                </label>
              </div>

              {data.marqueeShow && (
                <div className="pl-8 border-l-2 border-cyan-100 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">Marquee Text (HTML Supported)</label>
                    <textarea
                      value={data.marqueeText}
                      onChange={e => setData('marqueeText', e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl custom-scrollbar resize-none font-mono text-sm"
                      placeholder="<strong>New!</strong> Admissions open..."
                    />
                  </div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={data.showAdmissionsInMarquee}
                      onChange={e => setData('showAdmissionsInMarquee', e.target.checked)}
                      className="w-4 h-4 text-cyan-600 bg-slate-50 border-slate-300 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Append active courses to marquee automatically</span>
                  </label>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Clock size={14} className="text-cyan-600" /> Working Hours
                </label>
                <input
                  type="text"
                  value={data.workingHours}
                  onChange={e => setData('workingHours', e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
                  placeholder="e.g., Mon-Sat: 9:00 AM - 6:00 PM"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
