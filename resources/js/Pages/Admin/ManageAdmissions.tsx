import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import { 
  Users, 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar,
  MessageSquare,
  ArrowUpRight,
  Filter,
  Download,
  MoreHorizontal
} from "lucide-react";

interface ManageAdmissionsProps {
  admissions: any[];
}

export default function ManageAdmissions({ admissions }: ManageAdmissionsProps) {
  const { delete: destroy, processing } = useForm();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this application record?")) {
      destroy(route('admin.admissions.destroy', id));
    }
  };

  return (
    <AdminLayout>
      <Head title="Manage Admissions" />

      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Admissions</h2>
          <p className="text-slate-500 font-medium">Review and manage student applications for the upcoming batch.</p>
        </div>
        <div className="flex gap-4">
            <button className="bg-white border border-slate-200 text-slate-600 font-bold px-6 py-4 rounded-2xl text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all">
                <Download size={16} /> Export CSV
            </button>
            <button className="btn-gold !px-8 !py-4 flex items-center gap-2 group shadow-2xl hover:shadow-cyan-500/40">
                <Filter size={18} className="group-hover:scale-110 transition-transform" /> Advanced Filter
            </button>
        </div>
      </div>

      {/* Admissions Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name, email or course..."
                    className="w-full bg-white border-slate-200 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-cyan-500 transition-all shadow-sm"
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Applications: {admissions.length}</div>
            </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/30">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Info</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Applied For</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Submission Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Message</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {admissions.map((admission) => (
                <tr key={admission.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-500 text-lg shadow-inner">
                        {admission.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">{admission.name}</span>
                        <div className="flex items-center gap-4 mt-1">
                            <a href={`tel:${admission.phone}`} className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-600 no-underline hover:underline">
                                <Phone size={12} /> {admission.phone}
                            </a>
                            <a href={`mailto:${admission.email}`} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 no-underline hover:underline">
                                <Mail size={12} /> {admission.email || 'No Email'}
                            </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-cyan-50 text-cyan-700 border border-cyan-100">
                        {admission.course}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                        <Calendar size={14} className="text-slate-300" />
                        {new Date(admission.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 group/msg relative cursor-help">
                        <MessageSquare size={14} className="text-slate-300" />
                        <span className="text-xs text-slate-400 truncate max-w-[150px] italic">
                            {admission.message || 'No message provided'}
                        </span>
                        {admission.message && (
                            <div className="absolute bottom-full left-0 mb-2 w-64 p-4 bg-slate-900 text-white text-[11px] rounded-2xl shadow-2xl opacity-0 invisible group-hover/msg:opacity-100 group-hover/msg:visible transition-all z-20 leading-relaxed font-medium">
                                {admission.message}
                                <div className="absolute top-full left-4 w-2 h-2 bg-slate-900 rotate-45 -translate-y-1/2" />
                            </div>
                        )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all shadow-sm border border-cyan-100">
                          <ArrowUpRight size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(admission.id)}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                    <button className="group-hover:hidden w-10 h-10 flex items-center justify-center text-slate-300">
                        <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {admissions.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <Users className="text-slate-200" size={40} />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No admission applications yet</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
