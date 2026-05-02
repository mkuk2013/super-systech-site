import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Star, Plus, Trash2, Pencil, X, Check } from "lucide-react";

interface Testimonial { id: string; name: string; course: string; message: string; rating: number; }
interface Props { testimonials: Testimonial[]; }

const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(n => (
      <button key={n} type="button" onClick={() => onChange(n)}
        className={`text-2xl transition-transform hover:scale-125 ${n <= value ? 'text-amber-400' : 'text-slate-200'}`}>★</button>
    ))}
  </div>
);

export default function ManageTestimonials({ testimonials }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addForm = useForm({ name: "", course: "", message: "", rating: 5 });
  const editForm = useForm({ name: "", course: "", message: "", rating: 5 });

  const startEdit = (t: Testimonial) => { setEditingId(t.id); editForm.setData({ name: t.name, course: t.course, message: t.message, rating: t.rating }); };

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addForm.post(route("admin.testimonials.store"), { onSuccess: () => addForm.reset() });
  };

  const submitEdit = (id: string) => {
    editForm.patch(route("admin.testimonials.update", id), { onSuccess: () => setEditingId(null) });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this testimonial?")) addForm.delete(route("admin.testimonials.destroy", id));
  };

  const courses = ["DIT", "DAE-IT", "Web Development", "Graphic Design", "Digital Marketing", "Other"];

  return (
    <AdminLayout>
      <Head title="Manage Testimonials" />
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Testimonials</h2>
        <p className="text-slate-500 font-medium">Manage student reviews displayed on the website.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 sticky top-28">
            <h3 className="font-black text-base text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
              <Plus className="text-amber-500" size={18} /> Add Review
            </h3>
            <form onSubmit={submitAdd} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Student Name</label>
                <input type="text" value={addForm.data.name} onChange={e => addForm.setData("name", e.target.value)} required
                  className="w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Course</label>
                <select value={addForm.data.course} onChange={e => addForm.setData("course", e.target.value)} required
                  className="w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm">
                  <option value="">Select course</option>
                  {courses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Rating</label>
                <StarRating value={addForm.data.rating} onChange={v => addForm.setData("rating", v)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Review Message</label>
                <textarea rows={4} value={addForm.data.message} onChange={e => addForm.setData("message", e.target.value)} required
                  className="w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm resize-none" />
              </div>
              <button type="submit" disabled={addForm.processing}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50">
                <Plus size={16} /> {addForm.processing ? "Adding..." : "Add Testimonial"}
              </button>
            </form>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="lg:col-span-2 space-y-4">
          {testimonials.length === 0 && (
            <div className="bg-white rounded-[2rem] border border-slate-100 p-20 text-center">
              <Star className="text-slate-200 mx-auto mb-4" size={48} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No testimonials yet</p>
            </div>
          )}
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
              {editingId === t.id ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Name</label>
                      <input type="text" value={editForm.data.name} onChange={e => editForm.setData("name", e.target.value)}
                        className="w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Course</label>
                      <select value={editForm.data.course} onChange={e => editForm.setData("course", e.target.value)}
                        className="w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm">
                        {courses.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Rating</label>
                    <StarRating value={editForm.data.rating} onChange={v => editForm.setData("rating", v)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Message</label>
                    <textarea rows={3} value={editForm.data.message} onChange={e => editForm.setData("message", e.target.value)}
                      className="w-full bg-slate-50 border-transparent focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl text-sm resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => submitEdit(t.id)} disabled={editForm.processing}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                      <Check size={14} /> Save
                    </button>
                    <button onClick={() => setEditingId(null)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {[1,2,3,4,5].map(n => <span key={n} className={`text-sm ${n <= t.rating ? 'text-amber-400' : 'text-slate-200'}`}>★</span>)}
                    </div>
                    <p className="text-slate-700 text-sm mb-3 italic leading-relaxed">"{t.message}"</p>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-slate-900 text-sm">— {t.name}</span>
                      <span className="bg-cyan-50 text-cyan-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{t.course}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(t)}
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-500 flex items-center justify-center transition-all">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(t.id)}
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-500 hover:text-white text-slate-500 flex items-center justify-center transition-all">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
