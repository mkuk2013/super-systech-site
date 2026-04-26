"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Edit3, X, Image as ImageIcon } from "lucide-react";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/content?section=gallery").then((r) => r.json()).then(setGallery);
  };
  useEffect(() => { load(); }, []);

  const saveItem = async () => {
    setSaving(true);
    if (editing.id) {
      await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "gallery", id: editing.id, updates: editing }),
      });
    } else {
      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "gallery", item: editing }),
      });
    }
    setSaving(false);
    setEditing(null);
    load();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "gallery", id }),
    });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Gallery</h1>
          <p className="text-gray-400 text-sm mt-1">Manage gallery photos</p>
        </div>
        <button onClick={() => setEditing({ title: "", image: "", category: "Campus" })} className="admin-btn bg-navy text-white hover:bg-navy-700">
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy">{editing.id ? "Edit Photo" : "New Photo"}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Title</label>
                <input className="admin-input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Image URL</label>
                <input className="admin-input" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Category</label>
                <input className="admin-input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="Campus, Events, Classes..." />
              </div>
              {editing.image && (
                <div className="border rounded-lg overflow-hidden">
                  <img src={editing.image} alt="Preview" className="w-full h-40 object-cover" />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveItem} disabled={saving} className="admin-btn bg-navy text-white hover:bg-navy-700 flex-1 disabled:opacity-50">
                <Save size={16} /> {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditing(null)} className="admin-btn bg-gray-100 text-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item: any) => (
          <div key={item.id} className="group relative overflow-hidden rounded-lg border">
            {item.image ? (
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                <ImageIcon size={32} className="text-gray-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/70 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button onClick={() => setEditing({ ...item })} className="p-2 bg-white rounded-lg text-blue-500">
                <Edit3 size={14} />
              </button>
              <button onClick={() => deleteItem(item.id)} className="p-2 bg-white rounded-lg text-red-400">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="p-3 bg-white">
              <p className="text-xs font-bold text-navy truncate">{item.title}</p>
              <p className="text-[10px] text-gray-400">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
      {gallery.length === 0 && <p className="text-center py-10 text-gray-400">No photos yet.</p>}
    </div>
  );
}
