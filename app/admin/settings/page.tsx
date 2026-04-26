"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle, Plus, Trash2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content?section=settings").then((r) => r.json()).then(setSettings);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "settings", data: settings }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (field: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateAffiliation = (index: number, value: string) => {
    const arr = [...settings.affiliations];
    arr[index] = value;
    updateField("affiliations", arr);
  };

  const addAffiliation = () => {
    updateField("affiliations", [...settings.affiliations, "New Affiliation"]);
  };

  const removeAffiliation = (index: number) => {
    updateField("affiliations", settings.affiliations.filter((_: any, i: number) => i !== index));
  };

  if (!settings) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Site Settings</h1>
          <p className="text-gray-400 text-sm mt-1">General website configuration</p>
        </div>
        <button onClick={save} disabled={saving} className="admin-btn bg-navy text-white hover:bg-navy-700 disabled:opacity-50">
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> {saving ? "Saving..." : "Save Changes"}</>}
        </button>
      </div>

      <div className="space-y-6">
        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Institute Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Full Name</label>
              <input className="admin-input" value={settings.siteName} onChange={(e) => updateField("siteName", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Short Name</label>
              <input className="admin-input" value={settings.shortName} onChange={(e) => updateField("shortName", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Tagline</label>
              <input className="admin-input" value={settings.tagline} onChange={(e) => updateField("tagline", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Established Year</label>
              <input className="admin-input" value={settings.established} onChange={(e) => updateField("established", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Contact Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Phone</label>
              <input className="admin-input" value={settings.phone} onChange={(e) => updateField("phone", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Mobile</label>
              <input className="admin-input" value={settings.mobile} onChange={(e) => updateField("mobile", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Email</label>
              <input className="admin-input" value={settings.email} onChange={(e) => updateField("email", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">WhatsApp Number</label>
              <input className="admin-input" value={settings.whatsappNumber} onChange={(e) => updateField("whatsappNumber", e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-bold text-gray-400 mb-1">Full Address</label>
            <input className="admin-input" value={settings.address} onChange={(e) => updateField("address", e.target.value)} />
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-bold text-navy mb-4">Social Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Facebook URL</label>
              <input className="admin-input" value={settings.facebookUrl} onChange={(e) => updateField("facebookUrl", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">YouTube URL</label>
              <input className="admin-input" value={settings.youtubeUrl} onChange={(e) => updateField("youtubeUrl", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Google Maps URL</label>
              <input className="admin-input" value={settings.mapUrl} onChange={(e) => updateField("mapUrl", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-navy">Affiliations</h2>
            <button onClick={addAffiliation} className="admin-btn bg-gold/10 text-gold hover:bg-gold/20 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="space-y-3">
            {settings.affiliations.map((a: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <input className="admin-input flex-1" value={a} onChange={(e) => updateAffiliation(i, e.target.value)} />
                <button onClick={() => removeAffiliation(i)} className="p-2 text-red-400 hover:text-red-600">
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
