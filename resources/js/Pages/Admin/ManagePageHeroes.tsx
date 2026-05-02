import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Layout, Save, Check } from "lucide-react";

interface PageHero { pageKey: string; title: string; subtitle: string | null; badge: string | null; backgroundImage: string | null; }
interface Props { pageHeroes: Record<string, PageHero>; }

const PAGE_KEYS = ["about", "courses", "gallery", "team", "admissions", "contact"];
const PAGE_LABELS: Record<string, { label: string; emoji: string }> = {
  about: { label: "About Page", emoji: "ℹ️" },
  courses: { label: "Courses Page", emoji: "📚" },
  gallery: { label: "Gallery Page", emoji: "🖼️" },
  team: { label: "Team Page", emoji: "👥" },
  admissions: { label: "Admissions Page", emoji: "📝" },
  contact: { label: "Contact Page", emoji: "📞" },
};

function PageHeroForm({ pageKey, hero }: { pageKey: string; hero?: PageHero }) {
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState<string | null>(hero?.backgroundImage || null);
  
  const { data, setData, post, processing, errors } = useForm({
    badge: hero?.badge || "",
    title: hero?.title || "",
    subtitle: hero?.subtitle || "",
    image: null as File | null,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("admin.page-heroes.update", pageKey), {
      onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000); },
      forceFormData: true,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const info = PAGE_LABELS[pageKey] || { label: pageKey, emoji: "📄" };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
      <h3 className="font-black text-base text-slate-900 uppercase tracking-tight flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
        <span className="text-2xl">{info.emoji}</span> {info.label}
      </h3>
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Badge / Category Tag</label>
          <input type="text" value={data.badge} onChange={e => setData("badge", e.target.value)}
            className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm"
            placeholder="e.g. ACADEMIC PROGRAMS" />
          {errors.badge && <p className="text-red-500 text-xs mt-1">{errors.badge}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Hero Title (Optional)</label>
          <input type="text" value={data.title} onChange={e => setData("title", e.target.value)}
            className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm font-bold"
            placeholder="Leave empty to show only the banner image..." />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Subtitle</label>
          <textarea rows={2} value={data.subtitle} onChange={e => setData("subtitle", e.target.value)}
            className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm resize-none"
            placeholder="A short descriptive sentence shown below the title..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Banner Image (1920x500)</label>
          <input type="file" accept="image/*" onChange={handleImageChange}
            className="w-full bg-slate-50 border-slate-200 border rounded-xl text-xs p-2" />
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        {/* Preview */}
        <div className="bg-slate-900 rounded-2xl p-4 text-center">
          {data.badge && <p className="text-amber-400 text-[10px] font-black tracking-[0.2em] uppercase mb-2">{data.badge}</p>}
          <h2 className="text-white font-black text-lg">{data.title || "Page Title"}</h2>
          {data.subtitle && <p className="text-slate-400 text-xs mt-1">{data.subtitle}</p>}
        </div>

        <button type="submit" disabled={processing}
          className={`w-full font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50 ${saved ? 'bg-emerald-500 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white'}`}>
          {saved ? <><Check size={16} /> Saved!</> : processing ? "Saving..." : <><Save size={16} /> Save Hero</>}
        </button>
      </form>
    </div>
  );
}

export default function ManagePageHeroes({ pageHeroes }: Props) {
  return (
    <AdminLayout>
      <Head title="Manage Page Heroes" />
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Page Hero Banners</h2>
        <p className="text-slate-500 font-medium">Customize the hero banner shown at the top of each page.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {PAGE_KEYS.map(key => (
          <PageHeroForm key={key} pageKey={key} hero={pageHeroes[key]} />
        ))}
      </div>
    </AdminLayout>
  );
}
