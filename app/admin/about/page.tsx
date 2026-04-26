"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, CheckCircle } from "lucide-react";

export default function AdminAboutPage() {
  const [about, setAbout] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content?section=about")
      .then((r) => r.json())
      .then(setAbout);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "about", data: about }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (field: string, value: any) => {
    setAbout((prev: any) => ({ ...prev, [field]: value }));
  };

  const addAchievement = () => {
    updateField("achievements", [...about.achievements, "New Achievement"]);
  };

  const updateAchievement = (index: number, value: string) => {
    const arr = [...about.achievements];
    arr[index] = value;
    updateField("achievements", arr);
  };

  const removeAchievement = (index: number) => {
    updateField("achievements", about.achievements.filter((_: any, i: number) => i !== index));
  };

  if (!about) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">About / Principal</h1>
          <p className="text-gray-400 text-sm mt-1">Edit about section and principal information</p>
        </div>
        <button onClick={save} disabled={saving} className="admin-btn bg-navy text-white hover:bg-navy-700 disabled:opacity-50">
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> {saving ? "Saving..." : "Save Changes"}</>}
        </button>
      </div>

      <div className="space-y-6">
        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">About Description</h2>
          <textarea className="admin-input" rows={4} value={about.description} onChange={(e) => updateField("description", e.target.value)} />
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Mission & Vision</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Mission</label>
              <textarea className="admin-input" rows={2} value={about.mission} onChange={(e) => updateField("mission", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Vision</label>
              <textarea className="admin-input" rows={2} value={about.vision} onChange={(e) => updateField("vision", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Principal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Principal Name</label>
              <input className="admin-input" value={about.principalName} onChange={(e) => updateField("principalName", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Title</label>
              <input className="admin-input" value={about.principalTitle} onChange={(e) => updateField("principalTitle", e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-bold text-gray-400 mb-1">Photo URL</label>
            <input className="admin-input" value={about.principalImage} onChange={(e) => updateField("principalImage", e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-bold text-gray-400 mb-1">Principal&apos;s Message</label>
            <textarea className="admin-input" rows={4} value={about.principalMessage} onChange={(e) => updateField("principalMessage", e.target.value)} />
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-navy">Achievements</h2>
            <button onClick={addAchievement} className="admin-btn bg-gold/10 text-gold hover:bg-gold/20 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="space-y-3">
            {about.achievements.map((a: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <input className="admin-input flex-1" value={a} onChange={(e) => updateAchievement(i, e.target.value)} />
                <button onClick={() => removeAchievement(i)} className="p-2 text-red-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Section Title</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Title</label>
              <input className="admin-input" value={about.title} onChange={(e) => updateField("title", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Title Highlight</label>
              <input className="admin-input" value={about.titleHighlight} onChange={(e) => updateField("titleHighlight", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
