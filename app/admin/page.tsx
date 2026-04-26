"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, Image, GraduationCap, Star, Clock, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="text-center py-20 text-gray-400">Loading dashboard...</div>;

  const stats = [
    { label: "Courses", value: data.courses?.length || 0, icon: BookOpen, color: "blue" },
    { label: "Team Members", value: data.team?.length || 0, icon: Users, color: "purple" },
    { label: "Gallery Photos", value: data.gallery?.length || 0, icon: Image, color: "green" },
    { label: "Testimonials", value: data.testimonials?.length || 0, icon: Star, color: "yellow" },
    { label: "Total Applications", value: data.admissions?.length || 0, icon: GraduationCap, color: "indigo" },
    {
      label: "Pending Applications",
      value: data.admissions?.filter((a: any) => a.status === "Pending").length || 0,
      icon: Clock,
      color: "orange",
    },
  ];

  const recentAdmissions = (data.admissions || []).slice(-5).reverse();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome to STC Umerkot Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="admin-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                <Icon size={18} className="text-gold" />
              </div>
              <p className="text-3xl font-bold text-navy">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Admissions */}
      <div className="admin-card">
        <h2 className="text-lg font-bold text-navy mb-4">Recent Applications</h2>
        {recentAdmissions.length === 0 ? (
          <p className="text-gray-400 text-sm py-4">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 text-xs font-bold text-gray-400 uppercase">Name</th>
                  <th className="py-3 text-xs font-bold text-gray-400 uppercase">Course</th>
                  <th className="py-3 text-xs font-bold text-gray-400 uppercase">Phone</th>
                  <th className="py-3 text-xs font-bold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAdmissions.map((a: any) => (
                  <tr key={a.id} className="border-b border-gray-50">
                    <td className="py-3 font-semibold text-navy">{a.studentName}</td>
                    <td className="py-3 text-gray-500">{a.course}</td>
                    <td className="py-3 text-gray-500">{a.phone}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                          a.status === "Approved"
                            ? "bg-green-50 text-green-600"
                            : a.status === "Rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        {a.status === "Approved" ? <CheckCircle size={12} /> : a.status === "Rejected" ? <XCircle size={12} /> : <Clock size={12} />}
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
