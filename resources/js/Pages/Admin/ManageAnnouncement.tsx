import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Megaphone, Save, Image as ImageIcon, Type, Link as LinkIcon, Eye, EyeOff } from 'lucide-react';

export default function ManageAnnouncement({ announcement }) {
    const { data, setData, post, processing, errors } = useForm({
        show: announcement.show || false,
        type: announcement.type || 'text',
        title: announcement.title || '',
        description: announcement.description || '',
        linkText: announcement.linkText || '',
        linkUrl: announcement.linkUrl || '',
        imageFile: null,
    });

    const [preview, setPreview] = useState(announcement.image);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.announcement.update'), {
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('imageFile', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Promotional Popup" />
            
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Promotional Popup</h2>
                    <p className="text-slate-500 font-medium text-lg">Manage the announcement model box that appears on the frontend.</p>
                </div>
                <div className={`px-6 py-2 rounded-full flex items-center gap-2 font-black text-xs uppercase tracking-widest ${data.show ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {data.show ? <><Eye size={16} /> Active</> : <><EyeOff size={16} /> Hidden</>}
                </div>
            </div>

            <form onSubmit={submit} className="grid lg:grid-cols-3 gap-10">
                {/* Configuration */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        {/* Visibility Toggle */}
                        <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <div>
                                <h4 className="font-black text-slate-900 uppercase tracking-tight">Display Popup</h4>
                                <p className="text-sm text-slate-500 font-medium">Turn on to show this announcement to visitors.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={data.show} 
                                    onChange={e => setData('show', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                        </div>

                        {/* Type Selector */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Announcement Type</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'image')}
                                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${data.type === 'image' ? 'border-cyan-600 bg-cyan-50 text-cyan-700' : 'border-slate-100 hover:border-slate-200 text-slate-400'}`}
                                >
                                    <ImageIcon size={32} />
                                    <span className="font-black text-xs uppercase tracking-widest">Image Banner</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'text')}
                                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${data.type === 'text' ? 'border-cyan-600 bg-cyan-50 text-cyan-700' : 'border-slate-100 hover:border-slate-200 text-slate-400'}`}
                                >
                                    <Type size={32} />
                                    <span className="font-black text-xs uppercase tracking-widest">Text & Info</span>
                                </button>
                            </div>
                        </div>

                        {data.type === 'image' ? (
                            <div className="space-y-4 pt-4 border-t border-slate-50">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Upload Banner Image</label>
                                <div className="relative group">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange}
                                        className="hidden" 
                                        id="banner-upload"
                                    />
                                    <label 
                                        htmlFor="banner-upload"
                                        className="block w-full aspect-video rounded-[2rem] border-4 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center cursor-pointer group-hover:border-cyan-500/50 group-hover:bg-cyan-50/30 transition-all overflow-hidden"
                                    >
                                        {preview ? (
                                            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <>
                                                <ImageIcon size={48} className="text-slate-300 mb-4" />
                                                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Click to select image</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium italic">Recommended Size: 800x600 or 1000x1200 (Portrait/Square works best for modals)</p>
                            </div>
                        ) : (
                            <div className="space-y-6 pt-4 border-t border-slate-50">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Announcement Title</label>
                                    <input 
                                        type="text" 
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl py-4 px-6 text-slate-900 font-bold"
                                        placeholder="Special Discount or Event Title"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Detailed Description</label>
                                    <textarea 
                                        rows={4}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl py-4 px-6 text-slate-900 font-medium resize-none"
                                        placeholder="Provide more details about your announcement..."
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2"><LinkIcon size={14}/> Button Text</label>
                                        <input 
                                            type="text" 
                                            value={data.linkText}
                                            onChange={e => setData('linkText', e.target.value)}
                                            className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl py-4 px-6 text-slate-900 font-bold"
                                            placeholder="e.g. Apply Now"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2"><LinkIcon size={14}/> Target URL</label>
                                        <input 
                                            type="text" 
                                            value={data.linkUrl}
                                            onChange={e => setData('linkUrl', e.target.value)}
                                            className="w-full bg-slate-50 border-transparent focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 rounded-2xl py-4 px-6 text-slate-900 font-bold"
                                            placeholder="e.g. /admissions"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview & Action */}
                <div className="space-y-8">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl">
                        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                            <Eye size={20} className="text-cyan-400" />
                            <h4 className="font-black uppercase tracking-widest text-xs">Live Preview</h4>
                        </div>
                        
                        {/* Mockup of the Modal */}
                        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl scale-95 origin-top border-4 border-white/10">
                            {data.type === 'image' ? (
                                <div className="aspect-[4/5] bg-slate-100 flex items-center justify-center">
                                    {preview ? (
                                        <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <span className="text-slate-400 font-black uppercase tracking-widest text-[8px]">No Image Selected</span>
                                    )}
                                </div>
                            ) : (
                                <div className="p-8 text-center space-y-4">
                                    <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <Megaphone size={24} />
                                    </div>
                                    <h5 className="text-slate-900 font-black text-xl leading-tight">{data.title || 'Your Title Here'}</h5>
                                    <p className="text-slate-500 text-sm leading-relaxed">{data.description || 'Your description will appear here when you type...'}</p>
                                    {data.linkText && (
                                        <div className="pt-4">
                                            <div className="bg-slate-950 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em]">
                                                {data.linkText}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-cyan-900/20 flex items-center justify-center gap-3 group transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {processing ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Save size={20} />
                                <span className="tracking-widest uppercase">Save Changes</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
