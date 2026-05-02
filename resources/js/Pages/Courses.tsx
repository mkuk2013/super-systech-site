import { Link, Head } from "@inertiajs/react";
import { GraduationCap, ShieldCheck, BookOpen, Award, Code, Palette, ShoppingCap, Briefcase, Clock, ChevronRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/Components/AnimatedSection";
import MainLayout from "@/Layouts/MainLayout";

const iconMap: Record<string, any> = {
  GraduationCap, ShieldCheck, BookOpen, Award, Code, Palette, Briefcase,
};

interface CoursesProps {
    courses: any[];
    siteContent: any;
}

export default function CoursesPage({ courses, siteContent }: CoursesProps) {
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.courses || {
    badge: "PROSPECTUS",
    title: "Professional IT Programs",
    subtitle: "We offer a wide range of technical courses affiliated with leading government boards, designed to make you industry-ready."
  };

  return (
    <div className="bg-white min-h-screen">
      <Head title="Our Courses" />
      
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

      {/* Courses Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any, i: number) => {
              const Icon = iconMap[course.icon] || BookOpen;
              return (
                <AnimatedSection key={course.id} delay={i * 0.05} direction="scale">
                  <div className="group bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-cyan-100 transition-all duration-500 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500">
                        <Icon size={28} />
                      </div>
                      {course.admissionsOpen && (
                        <span className="bg-emerald-500/10 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1.5 border border-emerald-500/20">
                          <Sparkles size={10} className="animate-pulse" /> Admissions Open
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-black text-slate-900 text-xl mb-3 font-heading tracking-tight uppercase group-hover:text-cyan-700 transition-colors">{course.title}</h3>
                    <p className="text-[10px] text-cyan-600 font-black uppercase tracking-[0.2em] mb-4">{course.board}</p>
                    
                    <p className="text-[13px] text-slate-500 mb-8 flex-1 leading-relaxed whitespace-pre-line">{course.description}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Duration</span>
                        <span className="text-sm font-black text-slate-700 flex items-center gap-2">
                          <Clock size={14} className="text-cyan-500" /> {course.duration}
                        </span>
                      </div>
                      <Link href={`/admissions?course=${encodeURIComponent(course.title)}`} className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-cyan-600 transition-all shadow-lg">
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

CoursesPage.layout = (page: any) => <MainLayout children={page} />;
