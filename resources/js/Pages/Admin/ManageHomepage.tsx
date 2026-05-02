import { FormEventHandler, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Home, Save, Check, Plus, Trash2 } from "lucide-react";

interface Props { homepage: any; }

export default function ManageHomepage({ homepage }: Props) {
  const sections = homepage?.sections || [];

  // Find stats section
  const statsSec = sections.find((s: any) => s.id === "stats") || { id: "stats", enabled: true, items: [] };
  const featuresSec = sections.find((s: any) => s.id === "features") || { id: "features", enabled: true, items: [] };
  const ctaSec = sections.find((s: any) => s.id === "cta" || s.id === "bottomCta") || { id: "cta", enabled: true, title: "", subtitle: "" };

  const [stats, setStats] = useState<any[]>(statsSec.items || []);
  const [saved, setSaved] = useState(false);
  const [ctaTitle, setCtaTitle] = useState(ctaSec.title || ctaSec.heading || "");
  const [ctaSubtitle, setCtaSubtitle] = useState(ctaSec.subtitle || ctaSec.description || "");

  const { put, processing } = useForm({});

  const updateStat = (idx: number, field: string, value: string | number) => {
    setStats(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const addStat = () => setStats(prev => [...prev, { label: "New Stat", value: "0", suffix: "+" }]);
  const removeStat = (idx: number) => setStats(prev => prev.filter((_, i) => i !== idx));

  const handleSave = () => {
    const updatedSections = sections.map((s: any) => {
      if (s.id === "stats") return { ...s, items: stats };
      if (s.id === ctaSec.id) return { ...s, title: ctaTitle, subtitle: ctaSubtitle, heading: ctaTitle, description: ctaSubtitle };
      return s;
    });

    // If sections didn't have stats/cta, inject them
    const hasStats = updatedSections.some((s: any) => s.id === "stats");
    if (!hasStats) updatedSections.push({ id: "stats", enabled: true, items: stats });

    const payload = { sections: JSON.stringify(updatedSections) };

    put(route("admin.homepage.update"), {
      data: payload,
      onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2500); }
    });
  };

  return (
    <AdminLayout>
      <Head title="Manage Homepage" />
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Homepage Sections</h2>
          <p className="text-slate-500 font-medium">Edit stats, CTA and key content shown on your home page.</p>
        </div>
        <button onClick={handleSave} disabled={processing}
          className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 ${saved ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-500/20'}`}>
          {saved ? <><Check size={16} /> Saved!</> : processing ? "Saving..." : <><Save size={16} /> Save All</>}
        </button>
      </div>

      <div className="space-y-8">
        {/* Stats Section */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2">
              📊 Statistics / Counters
            </h3>
            <button type="button" onClick={addStat}
              className="flex items-center gap-2 text-xs font-bold bg-cyan-50 text-cyan-600 px-4 py-2 rounded-xl hover:bg-cyan-100 transition-colors">
              <Plus size={14} /> Add Stat
            </button>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-2xl space-y-3 relative group">
                <button onClick={() => removeStat(idx)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <Trash2 size={12} />
                </button>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Value</label>
                  <input type="text" value={stat.value} onChange={e => updateStat(idx, "value", e.target.value)}
                    className="w-full bg-white border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-xl text-xl font-black text-cyan-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Suffix (e.g. +, %)</label>
                  <input type="text" value={stat.suffix || ""} onChange={e => updateStat(idx, "suffix", e.target.value)}
                    className="w-full bg-white border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Label</label>
                  <input type="text" value={stat.label} onChange={e => updateStat(idx, "label", e.target.value)}
                    className="w-full bg-white border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-xl text-sm font-bold" />
                </div>
              </div>
            ))}
            {stats.length === 0 && (
              <div className="col-span-4 text-center py-8 text-slate-400 text-sm font-medium">
                No stats yet — click "Add Stat" to add counters to your homepage.
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
            🎯 Call to Action (CTA) Section
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">CTA Heading</label>
              <input type="text" value={ctaTitle} onChange={e => setCtaTitle(e.target.value)}
                className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl font-bold"
                placeholder="Ready to Start Your Tech Career?" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">CTA Subtitle</label>
              <textarea rows={3} value={ctaSubtitle} onChange={e => setCtaSubtitle(e.target.value)}
                className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl resize-none"
                placeholder="Join thousands of students who have transformed their future..." />
            </div>

            {/* Preview */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center">
              <h4 className="text-white font-black text-xl mb-2">{ctaTitle || "Your CTA Heading"}</h4>
              <p className="text-slate-400 text-sm">{ctaSubtitle || "Your subtitle will appear here"}</p>
              <div className="mt-4 inline-block bg-cyan-500 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest">Apply Now</div>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-start gap-4">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-black text-amber-800 text-sm mb-1">More Sections Available</p>
            <p className="text-amber-700 text-sm">Hero section is managed from <strong>Hero Section</strong> module. Courses are managed from <strong>Courses</strong> module. Team and Testimonials have their own dedicated sections.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
