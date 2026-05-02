import { FormEventHandler, useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Image as ImageIcon, Trash2, Upload, Pencil, X, Check, Plus } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string | null;
  category: string;
  image: string;
}
interface Props { gallery: GalleryItem[]; }

const CATEGORIES = ["Institute", "Lab", "Event", "Achievement", "Other"];

export default function ManageGallery({ gallery }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ── Upload (Add) Form ──────────────────────────────────────────────────────
  const addForm = useForm({ title: "", category: "", image: null as File | null });

  const submitAdd: FormEventHandler = (e) => {
    e.preventDefault();
    addForm.post(route("admin.gallery.store"), {
      onSuccess: () => {
        addForm.reset();
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  };

  // ── Edit Form ──────────────────────────────────────────────────────────────
  const editForm = useForm({ title: "", category: "", image: null as File | null });

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    editForm.setData({ title: item.title || "", category: item.category, image: null });
  };

  const submitEdit = (id: string) => {
    editForm.post(route("admin.gallery.update", id), {
      onSuccess: () => {
        setEditingId(null);
        editForm.reset();
        if (editFileRef.current) editFileRef.current.value = "";
      },
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    editForm.reset();
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      addForm.delete(route("admin.gallery.destroy", id));
    }
  };

  return (
    <AdminLayout>
      <Head title="Manage Gallery" />

      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Manage Gallery</h2>
          <p className="text-slate-500 font-medium">Upload, edit and delete visual assets for your website.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
          <ImageIcon size={16} className="text-slate-400" />
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{gallery.length} Images</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── Upload / Add Form ── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-7 sticky top-28">
            <h3 className="font-black text-base text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Upload className="text-cyan-600" size={18} /> Upload New Image
            </h3>
            <form onSubmit={submitAdd} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Title (Optional)</label>
                <input type="text" value={addForm.data.title} onChange={e => addForm.setData("title", e.target.value)}
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm"
                  placeholder="E.g., Computer Lab" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Category *</label>
                <select value={addForm.data.category} onChange={e => addForm.setData("category", e.target.value)} required
                  className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 rounded-xl text-sm">
                  <option value="">Select a category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {addForm.errors.category && <p className="text-red-500 text-xs mt-1">{addForm.errors.category}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Image File *</label>
                <div className="relative group">
                  <input type="file" ref={fileInputRef} accept="image/*" required
                    onChange={e => addForm.setData("image", e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${addForm.data.image ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 group-hover:border-slate-300'}`}>
                    {addForm.data.image ? (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="text-cyan-600" size={28} />
                        <span className="text-xs font-bold text-cyan-900 truncate max-w-[180px]">{(addForm.data.image as File).name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="text-slate-300" size={28} />
                        <span className="text-xs font-medium text-slate-400">Click or drag to upload</span>
                        <span className="text-[10px] text-slate-300">Max 5MB</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" disabled={addForm.processing}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50">
                <Plus size={15} /> {addForm.processing ? "Uploading..." : "Upload Image"}
              </button>
            </form>
          </div>
        </div>

        {/* ── Gallery Grid ── */}
        <div className="lg:col-span-2">
          {gallery.length === 0 ? (
            <div className="bg-white rounded-[2rem] border border-slate-100 p-20 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <ImageIcon className="text-slate-200" size={40} />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-1">Gallery is empty</p>
              <p className="text-slate-400 text-xs">Upload your first image using the form.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id}>
                  {editingId === item.id ? (
                    /* ── Edit Card ── */
                    <div className="bg-white rounded-2xl border-2 border-cyan-500 shadow-lg shadow-cyan-500/10 p-4 space-y-3">
                      {/* Current image preview */}
                      <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Title</label>
                        <input type="text" value={editForm.data.title} onChange={e => editForm.setData("title", e.target.value)}
                          className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-lg text-xs px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Category</label>
                        <select value={editForm.data.category} onChange={e => editForm.setData("category", e.target.value)}
                          className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-1 focus:ring-cyan-200 rounded-lg text-xs px-3 py-2">
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Replace Image (Optional)</label>
                        <div className="relative">
                          <input type="file" ref={editFileRef} accept="image/*"
                            onChange={e => editForm.setData("image", e.target.files?.[0] || null)}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full" />
                          <div className={`border-2 border-dashed rounded-xl p-2.5 text-center text-[10px] transition-all ${editForm.data.image ? 'border-cyan-400 bg-cyan-50 text-cyan-700 font-bold' : 'border-slate-200 text-slate-400'}`}>
                            {editForm.data.image ? `✓ ${(editForm.data.image as File).name}` : "Click to replace image"}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => submitEdit(item.id)} disabled={editForm.processing}
                          className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all">
                          <Check size={13} /> {editForm.processing ? "Saving..." : "Save"}
                        </button>
                        <button onClick={cancelEdit}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all">
                          <X size={13} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── Display Card ── */
                    <div className="relative aspect-square rounded-2xl overflow-hidden group bg-slate-100 shadow-sm border border-slate-100">
                      <img src={item.image} alt={item.title || item.category}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <p className="text-white text-xs font-bold truncate mb-0.5">{item.title || "Untitled"}</p>
                        <p className="text-cyan-400 text-[9px] font-black uppercase tracking-widest">{item.category}</p>
                      </div>
                      {/* Action buttons */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button onClick={() => startEdit(item)}
                          className="w-8 h-8 rounded-lg bg-white/20 text-white backdrop-blur-md flex items-center justify-center hover:bg-cyan-500 transition-colors"
                          title="Edit">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => handleDelete(item.id)}
                          className="w-8 h-8 rounded-lg bg-white/20 text-white backdrop-blur-md flex items-center justify-center hover:bg-red-500 transition-colors"
                          title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
