import { FormEventHandler, useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { UserSquare2, Plus, Trash2, Pencil, Upload, X, Save, Check } from "lucide-react";

interface TeamMember { id: string; name: string; role: string; bio: string; image: string; order: number; }
interface Props { team: TeamMember[]; }

export default function ManageTeam({ team }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  const addForm = useForm({ name: "", role: "", bio: "", order: 0, image: "", imageFile: null as File | null });
  const editForm = useForm({ name: "", role: "", bio: "", order: 0, image: "", imageFile: null as File | null });

  const startEdit = (member: TeamMember) => {
    setEditingId(member.id);
    editForm.setData({ name: member.name, role: member.role, bio: member.bio, order: member.order, image: member.image, imageFile: null });
  };

  const submitAdd: FormEventHandler = (e) => {
    e.preventDefault();
    addForm.post(route("admin.team.store"), { onSuccess: () => { addForm.reset(); if (fileRef.current) fileRef.current.value = ""; } });
  };

  const submitEdit = (id: string) => {
    editForm.post(route("admin.team.update", id), { onSuccess: () => { setEditingId(null); } });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this team member?")) {
      addForm.delete(route("admin.team.destroy", id));
    }
  };

  return (
    <AdminLayout>
      <Head title="Manage Team" />
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Team Members</h2>
        <p className="text-slate-500 font-medium">Add, edit or remove faculty and staff profiles.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 sticky top-28">
            <h3 className="font-black text-base text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
              <Plus className="text-cyan-600" size={18} /> Add Member
            </h3>
            <form onSubmit={submitAdd} className="space-y-5">
              {[
                { label: "Full Name", field: "name" as const, placeholder: "Dr. Ahmad Khan" },
                { label: "Role / Designation", field: "role" as const, placeholder: "Head of IT" },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</label>
                  <input type="text" value={addForm.data[field]} onChange={e => addForm.setData(field, e.target.value)}
                    className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm" placeholder={placeholder} required />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Short Bio</label>
                <textarea rows={3} value={addForm.data.bio} onChange={e => addForm.setData("bio", e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Display Order</label>
                <input type="number" value={addForm.data.order} onChange={e => addForm.setData("order", Number(e.target.value))}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Photo</label>
                <div className="relative">
                  <input type="file" ref={fileRef} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    onChange={e => addForm.setData("imageFile", e.target.files?.[0] || null)} />
                  <div className={`border-2 border-dashed rounded-xl p-3 text-center transition-all ${addForm.data.imageFile ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200'}`}>
                    <Upload size={18} className="mx-auto text-slate-400 mb-1" />
                    <p className="text-xs text-slate-500">{addForm.data.imageFile ? (addForm.data.imageFile as File).name : "Click to upload"}</p>
                  </div>
                </div>
              </div>
              <button type="submit" disabled={addForm.processing}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50">
                <Plus size={16} /> {addForm.processing ? "Adding..." : "Add Member"}
              </button>
            </form>
          </div>
        </div>

        {/* Team Grid */}
        <div className="lg:col-span-2 space-y-4">
          {team.length === 0 && (
            <div className="bg-white rounded-[2rem] border border-slate-100 p-20 text-center">
              <UserSquare2 className="text-slate-200 mx-auto mb-4" size={48} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No team members yet</p>
            </div>
          )}
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
              {editingId === member.id ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Name</label>
                      <input type="text" value={editForm.data.name} onChange={e => editForm.setData("name", e.target.value)}
                        className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Role</label>
                      <input type="text" value={editForm.data.role} onChange={e => editForm.setData("role", e.target.value)}
                        className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Bio</label>
                    <textarea rows={3} value={editForm.data.bio} onChange={e => editForm.setData("bio", e.target.value)}
                      className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">New Photo (Optional)</label>
                    <div className="relative">
                      <input type="file" ref={editFileRef} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={e => editForm.setData("imageFile", e.target.files?.[0] || null)} />
                      <div className={`border-2 border-dashed rounded-xl p-3 text-center transition-all ${editForm.data.imageFile ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200'}`}>
                        <Upload size={16} className="mx-auto text-slate-400 mb-1" />
                        <p className="text-xs text-slate-500">{editForm.data.imageFile ? (editForm.data.imageFile as File).name : "Upload replacement photo"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => submitEdit(member.id)} disabled={editForm.processing}
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-xl transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50">
                      <Check size={14} /> Save
                    </button>
                    <button onClick={() => setEditingId(null)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                    {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> : <UserSquare2 className="w-full h-full text-slate-300 p-3" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900 text-sm">{member.name}</p>
                    <p className="text-cyan-600 text-xs font-bold uppercase tracking-widest">{member.role}</p>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-1">{member.bio}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(member)}
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-cyan-500 hover:text-white text-slate-500 flex items-center justify-center transition-all">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(member.id)}
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
