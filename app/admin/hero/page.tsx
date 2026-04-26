"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, CheckCircle } from "lucide-react";

export default function AdminHeroPage() {
  const [hero, setHero] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content?section=hero")
      .then((r) => r.json())
      .then(setHero);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "hero", data: hero }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (field: string, value: any) => {
    setHero((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateStat = (index: number, field: string, value: string) => {
    const stats = [...hero.stats];
    stats[index] = { ...stats[index], [field]: value };
    updateField("stats", stats);
  };

  const addStat = () => {
    updateField("stats", [...hero.stats, { value: "0", label: "New Stat" }]);
  };

  const removeStat = (index: number) => {
    updateField("stats", hero.stats.filter((_: any, i: number) => i !== index));
  };

  if (!hero) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Hero Section</h1>
          <p className="text-gray-400 text-sm mt-1">Edit the main banner of your website</p>
        </div>
        <button onClick={save} disabled={saving} className="admin-btn bg-navy text-white hover:bg-navy-700 disabled:opacity-50">
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> {saving ? "Saving..." : "Save Changes"}</>}
        </button>
      </div>

      <div className="space-y-6">
        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Badge Text</h2>
          <input className="admin-input" value={hero.badge} onChange={(e) => updateField("badge", e.target.value)} />
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Title</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Title Start</label>
              <input className="admin-input" value={hero.title} onChange={(e) => updateField("title", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Highlighted Text</label>
              <input className="admin-input" value={hero.titleHighlight} onChange={(e) => updateField("titleHighlight", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Title End</label>
              <input className="admin-input" value={hero.titleEnd} onChange={(e) => updateField("titleEnd", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Subtitle</h2>
          <textarea className="admin-input" rows={3} value={hero.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} />
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Background Image</h2>
          <input className="admin-input" value={hero.backgroundImage} onChange={(e) => updateField("backgroundImage", e.target.value)} placeholder="Image URL" />
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">CTA Buttons</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Primary Button</label>
              <input className="admin-input" value={hero.ctaPrimary} onChange={(e) => updateField("ctaPrimary", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Secondary Button</label>
              <input className="admin-input" value={hero.ctaSecondary} onChange={(e) => updateField("ctaSecondary", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-navy">Statistics</h2>
            <button onClick={addStat} className="admin-btn bg-gold/10 text-gold hover:bg-gold/20 text-xs">
              <Plus size={14} /> Add Stat
            </button>
          </div>
          <div className="space-y-3">
            {hero.stats.map((stat: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <input className="admin-input flex-1" value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} placeholder="Value" />
                <input className="admin-input flex-1" value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Label" />
                <button onClick={() => removeStat(i)} className="p-2 text-red-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
