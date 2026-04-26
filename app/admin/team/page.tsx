"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Edit3, X, User } from "lucide-react";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/content?section=team").then((r) => r.json()).then(setTeam);
  };
  useEffect(() => { load(); }, []);

  const saveItem = async () => {
    setSaving(true);
    if (editing.id) {
      await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "team", id: editing.id, updates: editing }),
      });
    } else {
      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "team", item: editing }),
      });
    }
    setSaving(false);
    setEditing(null);
    load();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "team", id }),
    });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Faculty / Team</h1>
          <p className="text-gray-400 text-sm mt-1">Manage faculty members</p>
        </div>
        <button onClick={() => setEditing({ name: "", role: "", image: "", bio: "" })} className="admin-btn bg-navy text-white hover:bg-navy-700">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy">{editing.id ? "Edit Member" : "New Member"}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Name</label>
                <input className="admin-input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Role / Title</label>
                <input className="admin-input" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Photo URL</label>
                <input className="admin-input" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Bio</label>
                <textarea className="admin-input" rows={3} value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} />
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member: any) => (
          <div key={member.id} className="admin-card text-center">
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <User size={32} className="text-gray-300" />
              </div>
            )}
            <h3 className="font-bold text-navy">{member.name}</h3>
            <p className="text-gold text-xs font-bold mb-3">{member.role}</p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setEditing({ ...member })} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                <Edit3 size={14} />
              </button>
              <button onClick={() => deleteItem(member.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {team.length === 0 && <p className="text-center py-10 text-gray-400">No team members yet.</p>}
    </div>
  );
}
