"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Edit3, X, Star } from "lucide-react";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/content?section=testimonials").then((r) => r.json()).then(setItems);
  };
  useEffect(() => { load(); }, []);

  const saveItem = async () => {
    setSaving(true);
    if (editing.id) {
      await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "testimonials", id: editing.id, updates: editing }),
      });
    } else {
      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "testimonials", item: editing }),
      });
    }
    setSaving(false);
    setEditing(null);
    load();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "testimonials", id }),
    });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Testimonials</h1>
          <p className="text-gray-400 text-sm mt-1">Manage student testimonials</p>
        </div>
        <button onClick={() => setEditing({ name: "", course: "", message: "", rating: 5 })} className="admin-btn bg-navy text-white hover:bg-navy-700">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy">{editing.id ? "Edit" : "New"} Testimonial</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Student Name</label>
                  <input className="admin-input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Course / Batch</label>
                  <input className="admin-input" value={editing.course} onChange={(e) => setEditing({ ...editing, course: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Message</label>
                <textarea className="admin-input" rows={4} value={editing.message} onChange={(e) => setEditing({ ...editing, message: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Rating (1-5)</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setEditing({ ...editing, rating: r })}
                      className="p-1"
                    >
                      <Star size={24} className={r <= editing.rating ? "fill-gold text-gold" : "text-gray-300"} />
                    </button>
                  ))}
                </div>
              </div>
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

      <div className="space-y-3">
        {items.map((item: any) => (
          <div key={item.id} className="admin-card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-navy">{item.name}</h3>
                  <span className="text-xs text-gray-400">• {item.course}</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">&ldquo;{item.message}&rdquo;</p>
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => setEditing({ ...item })} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => deleteItem(item.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center py-10 text-gray-400">No testimonials yet.</p>}
      </div>
    </div>
  );
}
