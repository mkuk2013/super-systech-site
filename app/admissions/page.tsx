"use client";

import { useState, useEffect } from "react";
import { GraduationCap, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function AdmissionsPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    phone: "",
    cnic: "",
    course: "",
    address: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/content?section=courses")
      .then((r) => r.json())
      .then(setCourses)
      .catch((err) => console.error("Failed to fetch courses in Admissions:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Application submitted successfully! We will contact you soon.");
        setForm({ studentName: "", fatherName: "", phone: "", cnic: "", course: "", address: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to submit application.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="mesh-gradient py-20 pt-24 relative overflow-hidden">
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10">
          <AnimatedSection>
            <p className="text-amber-400 text-xs font-bold tracking-[0.15em] uppercase mb-3">JOIN STC UMERKOT</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
              Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Admission</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Apply now for the 2025 academic session. Fill in the form below to submit your admission application.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 gradient-section">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          {status === "success" ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-4 font-heading">Application Submitted!</h2>
                <p className="text-gray-500 mb-8">{message}</p>
                <button onClick={() => setStatus("idle")} className="btn-gold px-8 py-3">
                  Submit Another Application
                </button>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy to-navy-700 flex items-center justify-center">
                    <GraduationCap className="text-gold" size={26} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-navy font-heading">Admission Form</h2>
                    <p className="text-xs text-gray-400 font-semibold flex items-center gap-1"><Sparkles size={10} className="text-gold" /> All fields are required</p>
                  </div>
                </div>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
                  <AlertCircle size={16} /> {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Student Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Full name"
                      value={form.studentName}
                      onChange={(e) => updateField("studentName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Father&apos;s Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Father's full name"
                      value={form.fatherName}
                      onChange={(e) => updateField("fatherName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="admin-input"
                      placeholder="03XX-XXXXXXX"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">CNIC Number</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="XXXXX-XXXXXXX-X"
                      value={form.cnic}
                      onChange={(e) => updateField("cnic", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Select Course</label>
                  <select
                    className="admin-input"
                    value={form.course}
                    onChange={(e) => updateField("course", e.target.value)}
                    required
                  >
                    <option value="">-- Select a Program --</option>
                    {courses.map((c: any) => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Address</label>
                  <textarea
                    rows={3}
                    className="admin-input"
                    placeholder="Complete address"
                    value={form.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-gold px-8 py-4 w-full disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting..." : "Submit Application"}
                </button>
              </form>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
}
