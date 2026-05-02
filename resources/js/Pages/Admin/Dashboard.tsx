import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { 
  Users, 
  GraduationCap, 
  Image as ImageIcon, 
  ArrowUpRight,
  Clock,
  ChevronRight,
  TrendingUp,
  Mail,
  Phone,
  Sparkles
} from "lucide-react";

interface DashboardProps {
  stats: {
    totalAdmissions: number;
    totalCourses: number;
    totalTeamMembers: number;
    totalGalleryItems: number;
  };
  recentAdmissions: any[];
}

export default function Dashboard({ stats, recentAdmissions }: DashboardProps) {
  const statCards = [
    { label: 'Admissions', value: stats.totalAdmissions, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Courses', value: stats.totalCourses, icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Team', value: stats.totalTeamMembers, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Gallery', value: stats.totalGalleryItems, icon: ImageIcon, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">Overview</h2>
        <p className="text-slate-500 font-medium">Welcome back! Here's what's happening at Super Sys-Tech.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={28} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                <TrendingUp size={12} /> Live
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Admissions */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
              <Clock className="text-cyan-600" size={20} /> Recent Applications
            </h3>
            <Link href="/admin/admissions" className="text-xs font-bold text-cyan-600 hover:text-cyan-700 uppercase tracking-widest flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/30">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Course</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentAdmissions.map((admission) => (
                  <tr key={admission.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">{admission.name}</span>
                        <div className="flex items-center gap-3 mt-1 opacity-60">
                            <span className="flex items-center gap-1 text-[10px] font-medium"><Phone size={10} /> {admission.phone}</span>
                            <span className="flex items-center gap-1 text-[10px] font-medium"><Mail size={10} /> {admission.email || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{admission.course}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-100">
                        Pending
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all shadow-sm">
                        <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentAdmissions.length === 0 && (
              <div className="p-20 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                  <Users className="text-slate-200" size={40} />
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No recent applications found</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <h3 className="font-black text-xl mb-6 tracking-tight flex items-center gap-3 uppercase">
              <Sparkles size={24} className="text-cyan-400" /> Quick Actions
            </h3>
            <div className="grid gap-3">
              <Link href="/admin/hero" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 no-underline group">
                <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Sparkles size={18} />
                </div>
                <span className="font-bold text-sm tracking-wide">Edit Hero Section</span>
              </Link>
              <Link href="/admin/courses" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 no-underline group">
                <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                  <GraduationCap size={18} />
                </div>
                <span className="font-bold text-sm tracking-wide">Manage Courses</span>
              </Link>
              <Link href="/admin/admissions" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 no-underline group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Users size={18} />
                </div>
                <span className="font-bold text-sm tracking-wide">Review Admissions</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-6">System Health</h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Database Status</span>
                  <span className="text-emerald-500">Connected</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Storage Usage</span>
                  <span>42%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[42%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
