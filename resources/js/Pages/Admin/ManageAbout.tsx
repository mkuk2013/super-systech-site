import { FormEventHandler, useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { BookOpen, Save, User, Upload, Plus, Trash2, Image as ImageIcon } from "lucide-react";

interface AboutProps { about: any; }

export default function ManageAbout({ about }: AboutProps) {
  const directorRef = useRef<HTMLInputElement>(null);
  const principalRef = useRef<HTMLInputElement>(null);
  const [achievements, setAchievements] = useState<string[]>(about?.achievements || []);
  const [newAchievement, setNewAchievement] = useState("");

  const { data, setData, post, processing, errors } = useForm({
    title: about?.title || "",
    titleHighlight: about?.titleHighlight || "",
    description: about?.description || "",
    mission: about?.mission || "",
    vision: about?.vision || "",
    directorName: about?.directorName || "",
    directorTitle: about?.directorTitle || "",
    directorMessage: about?.directorMessage || "",
    directorImage: about?.directorImage || "",
    directorImageFile: null as File | null,
    principalName: about?.principalName || "",
    principalTitle: about?.principalTitle || "",
    principalMessage: about?.principalMessage || "",
    principalImage: about?.principalImage || "",
    principalImageFile: null as File | null,
    achievements: JSON.stringify(about?.achievements || []),
  });

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    const updated = [...achievements, newAchievement.trim()];
    setAchievements(updated);
    setData("achievements", JSON.stringify(updated));
    setNewAchievement("");
  };

  const handleRemoveAchievement = (idx: number) => {
    const updated = achievements.filter((_, i) => i !== idx);
    setAchievements(updated);
    setData("achievements", JSON.stringify(updated));
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("admin.about.update"));
  };

  const InputField = ({ label, field, textarea = false, rows = 3 }: any) => (
    <div>
      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">{label}</label>
      {textarea ? (
        <textarea rows={rows} value={(data as any)[field]} onChange={e => setData(field, e.target.value)}
          className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl resize-none" />
      ) : (
        <input type="text" value={(data as any)[field]} onChange={e => setData(field, e.target.value)}
          className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl" />
      )}
    </div>
  );

  const ImageUpload = ({ label, currentImage, previewKey, fileKey, inputRef }: any) => (
    <div>
      <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">{label}</label>
      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 flex-shrink-0">
          {(data as any)[previewKey] && <img src={(data as any)[previewKey]} alt="" className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1 space-y-2">
          <input type="text" value={(data as any)[previewKey]} onChange={e => setData(previewKey, e.target.value)}
            className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm" placeholder="Image URL" />
          <div className="relative">
            <input type="file" ref={inputRef} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={e => setData(fileKey, e.target.files?.[0] || null)} />
            <button type="button" className="flex items-center gap-2 text-xs font-bold text-cyan-600 bg-cyan-50 px-4 py-2 rounded-xl hover:bg-cyan-100 transition-colors">
              <Upload size={14} /> Upload New Photo
            </button>
          </div>
          {(data as any)[fileKey] && <p className="text-[10px] text-emerald-600 font-bold">✓ New file selected: {((data as any)[fileKey] as File).name}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <Head title="Manage About Page" />
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">About Page</h2>
          <p className="text-slate-500 font-medium">Edit your institute's story, leadership, mission and vision.</p>
        </div>
        <button onClick={submit} disabled={processing}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50">
          <Save size={16} /> {processing ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <form onSubmit={submit} className="space-y-8">
        {/* Page Header */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4">
            <BookOpen className="text-cyan-600" size={20} /> Page Heading
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="Title" field="title" />
            <InputField label="Title Highlight (Colored Word)" field="titleHighlight" />
          </div>
          <InputField label="Description" field="description" textarea rows={4} />
        </div>

        {/* Director */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4">
            <User className="text-blue-600" size={20} /> Director
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="Name" field="directorName" />
            <InputField label="Title / Designation" field="directorTitle" />
          </div>
          <ImageUpload label="Director Photo" currentImage={data.directorImage} previewKey="directorImage" fileKey="directorImageFile" inputRef={directorRef} />
          <InputField label="Message / Quote" field="directorMessage" textarea rows={5} />
        </div>

        {/* Principal */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4">
            <User className="text-purple-600" size={20} /> Principal
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="Name" field="principalName" />
            <InputField label="Title / Designation" field="principalTitle" />
          </div>
          <ImageUpload label="Principal Photo" currentImage={data.principalImage} previewKey="principalImage" fileKey="principalImageFile" inputRef={principalRef} />
          <InputField label="Message / Quote" field="principalMessage" textarea rows={5} />
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">🎯 Mission</h3>
            <InputField label="Mission Statement" field="mission" textarea rows={5} />
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">🚀 Vision</h3>
            <InputField label="Vision Statement" field="vision" textarea rows={5} />
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-lg text-slate-900 uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
            🏆 Key Achievements
          </h3>
          <div className="space-y-3 mb-6">
            {achievements.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                <span className="flex-1 text-sm font-medium text-slate-700">{item}</span>
                <button type="button" onClick={() => handleRemoveAchievement(idx)}
                  className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <input type="text" value={newAchievement} onChange={e => setNewAchievement(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddAchievement())}
              className="flex-1 bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl"
              placeholder="Add an achievement..." />
            <button type="button" onClick={handleAddAchievement}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2">
              <Plus size={16} /> Add
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
