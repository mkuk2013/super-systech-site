import { Head, useForm } from "@inertiajs/react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/Components/AnimatedSection";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from "react";

interface AdmissionsProps {
    courses: any[];
    siteContent: any;
}

export default function AdmissionsPage({ courses, siteContent }: AdmissionsProps) {
  const [submitted, setSubmitted] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
  });

  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.admissions || {
    badge: "ENROLL NOW",
    title: "Secure Your Future",
    subtitle: "Fill out the form below to register for the upcoming batch. Our team will contact you for the further admission process."
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admissions', {
        onSuccess: () => {
            setSubmitted(true);
            reset();
        }
    });
  };

  if (submitted) {
    return (
      <div className="bg-white min-h-screen pt-24">
        <Head title="Success" />
        <div className="max-w-3xl mx-auto px-4 text-center py-20">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-4">Application Received!</h1>
            <p className="text-slate-600 mb-10 text-lg">Thank you for your interest in STC Umerkot. Our admissions counselor will contact you within 24-48 hours on your provided phone number.</p>
            <button onClick={() => setSubmitted(false)} className="btn-gold !px-10">Back to Admissions</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Head title="Admissions 2026" />
      
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-slate-900">
        {hero.backgroundImage ? (
          <>
            <div className="absolute inset-0 z-0">
              <img src={hero.backgroundImage} alt="" className="w-full h-full object-cover opacity-40" />
            </div>
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900" />
          </>
        ) : (
          <div className="absolute inset-0 mesh-gradient opacity-100" />
        )}
        
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10">
          <AnimatedSection>
            {hero.badge && <p className="text-amber-400 text-xs font-black tracking-[0.2em] uppercase mb-4 opacity-90">{hero.badge}</p>}
            {hero.title && (
              <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                {hero.title}
              </h1>
            )}
            {hero.subtitle && (
              <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed opacity-80">
                {hero.subtitle}
              </p>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      placeholder="Enter your full name" 
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none" 
                    />
                    {errors.name && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                      placeholder="e.g. 0300-1234567" 
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none" 
                    />
                    {errors.phone && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address (Optional)</label>
                    <input 
                      type="email" 
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      placeholder="yourname@email.com" 
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Select Program</label>
                    <select 
                      required 
                      value={data.course}
                      onChange={e => setData('course', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none appearance-none"
                    >
                      <option value="">Choose a course</option>
                      {courses.map(c => (
                        <option key={c.id} value={c.title}>{c.title}</option>
                      ))}
                    </select>
                    {errors.course && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.course}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Message / Questions (Optional)</label>
                  <textarea 
                    rows={4} 
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                    placeholder="Tell us about your background or ask any questions..." 
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={processing}
                  className="w-full btn-gold !py-5 !text-[13px] uppercase tracking-widest shadow-2xl shadow-amber-500/20 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Submit Admission Request'} <ArrowRight size={18} className="ml-2" />
                </button>

                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Secure Enrollment • Official NAVTTC & STEVTA Training Partner
                </p>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

AdmissionsPage.layout = (page: any) => <MainLayout children={page} />;
