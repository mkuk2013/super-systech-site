"use client";

import { useState, useEffect } from "react";
import { Trash2, CheckCircle, XCircle, Clock, Search, Download } from "lucide-react";

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const load = () => {
    fetch("/api/admissions").then((r) => r.json()).then(setAdmissions).catch(console.error);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admissions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  const deleteAdmission = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    await fetch("/api/admissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const filtered = admissions
    .filter((a: any) => filter === "All" || a.status === filter)
    .filter((a: any) =>
      search === "" ||
      a.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      a.phone?.includes(search) ||
      a.cnic?.includes(search)
    );

  const stats = {
    total: admissions.length,
    pending: admissions.filter((a: any) => a.status === "Pending").length,
    approved: admissions.filter((a: any) => a.status === "Approved").length,
    rejected: admissions.filter((a: any) => a.status === "Rejected").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Admissions</h1>
          <p className="text-gray-400 text-sm mt-1">Manage student applications</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="admin-card text-center">
          <p className="text-2xl font-bold text-navy">{stats.total}</p>
          <p className="text-xs font-bold text-gray-400">Total</p>
        </div>
        <div className="admin-card text-center border-l-4 border-yellow-400">
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-xs font-bold text-gray-400">Pending</p>
        </div>
        <div className="admin-card text-center border-l-4 border-green-400">
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          <p className="text-xs font-bold text-gray-400">Approved</p>
        </div>
        <div className="admin-card text-center border-l-4 border-red-400">
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          <p className="text-xs font-bold text-gray-400">Rejected</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="admin-card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="admin-input pl-10"
              placeholder="Search by name, phone, CNIC..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["All", "Pending", "Approved", "Rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  filter === f ? "bg-navy text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase">Student</th>
                <th className="text-left py-4 text-xs font-bold text-gray-400 uppercase">Course</th>
                <th className="text-left py-4 text-xs font-bold text-gray-400 uppercase">Phone</th>
                <th className="text-left py-4 text-xs font-bold text-gray-400 uppercase">CNIC</th>
                <th className="text-left py-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a: any) => (
                <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-navy">{a.studentName}</div>
                    <div className="text-xs text-gray-400">S/O {a.fatherName}</div>
                  </td>
                  <td className="py-4 text-gray-500">{a.course}</td>
                  <td className="py-4 text-gray-500">{a.phone}</td>
                  <td className="py-4 text-gray-500 font-mono text-xs">{a.cnic}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                      a.status === "Approved" ? "bg-green-50 text-green-600" :
                      a.status === "Rejected" ? "bg-red-50 text-red-600" :
                      "bg-yellow-50 text-yellow-600"
                    }`}>
                      {a.status === "Approved" ? <CheckCircle size={10} /> : a.status === "Rejected" ? <XCircle size={10} /> : <Clock size={10} />}
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {a.status !== "Approved" && (
                        <button onClick={() => updateStatus(a.id, "Approved")} className="p-1.5 text-green-500 hover:bg-green-50 rounded" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {a.status !== "Rejected" && (
                        <button onClick={() => updateStatus(a.id, "Rejected")} className="p-1.5 text-red-400 hover:bg-red-50 rounded" title="Reject">
                          <XCircle size={16} />
                        </button>
                      )}
                      <button onClick={() => deleteAdmission(a.id)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
