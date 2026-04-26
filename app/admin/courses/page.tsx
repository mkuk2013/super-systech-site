"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, CheckCircle, Edit3, X } from "lucide-react";

const ICONS = ["GraduationCap", "ShieldCheck", "BookOpen", "Award", "Code", "Palette"];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = () => {
    fetch("/api/content?section=courses")
      .then((r) => r.json())
      .then(setCourses);
  };

  useEffect(() => { load(); }, []);

  const saveItem = async () => {
    setSaving(true);
    if (editing.id) {
      await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "courses", id: editing.id, updates: editing }),
      });
    } else {
      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "courses", item: editing }),
      });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEditing(null);
    load();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "courses", id }),
    });
    load();
  };

  const newCourse = () => {
    setEditing({
      title: "", board: "", duration: "", description: "", icon: "BookOpen", featured: false,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Manage Courses</h1>
          <p className="text-gray-400 text-sm mt-1">Add, edit, or remove courses</p>
        </div>
        <button onClick={newCourse} className="admin-btn bg-navy text-white hover:bg-navy-700">
          <Plus size={16} /> Add Course
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
          <CheckCircle size={16} /> Course saved successfully!
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy">{editing.id ? "Edit Course" : "New Course"}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Course Title</label>
                <input className="admin-input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Board / Authority</label>
                  <input className="admin-input" value={editing.board} onChange={(e) => setEditing({ ...editing, board: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Duration</label>
                  <input className="admin-input" value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Description</label>
                <textarea className="admin-input" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1">Icon</label>
                  <select className="admin-input" value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}>
                    {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="featured" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="w-4 h-4" />
                  <label htmlFor="featured" className="text-sm font-bold text-navy">Featured on Home</label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={saveItem} disabled={saving} className="admin-btn bg-navy text-white hover:bg-navy-700 flex-1 disabled:opacity-50">
                <Save size={16} /> {saving ? "Saving..." : "Save Course"}
              </button>
              <button onClick={() => setEditing(null)} className="admin-btn bg-gray-100 text-gray-600 hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-3">
        {courses.map((course: any) => (
          <div key={course.id} className="admin-card flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-navy">{course.title}</h3>
                {course.featured && <span className="text-[10px] bg-gold/10 text-gold font-bold px-2 py-0.5 rounded">FEATURED</span>}
              </div>
              <p className="text-gray-400 text-xs">{course.board} • {course.duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing({ ...course })} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                <Edit3 size={16} />
              </button>
              <button onClick={() => deleteItem(course.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {courses.length === 0 && <p className="text-center py-10 text-gray-400">No courses added yet.</p>}
      </div>
    </div>
  );
}
