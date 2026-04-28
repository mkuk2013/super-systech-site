import Link from "next/link";
import { readContent } from "@/lib/data";
import {
  Clock, ChevronRight, ShieldCheck, GraduationCap,
  BookOpen, Award, Code, Palette, ArrowRight,
  ShoppingCart, Briefcase,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const iconMap: Record<string, any> = {
  GraduationCap, ShieldCheck, BookOpen, Award, Code, Palette, ShoppingCart, Briefcase,
};

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const { courses, settings } = await readContent();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="mesh-gradient py-20 pt-24 relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10">
          <AnimatedSection>
            <p className="text-amber-400 text-xs font-bold tracking-[0.15em] uppercase mb-3">ACADEMIC CATALOG 2025</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
              Board Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Programs</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Select from our government-authorized programs designed by industry experts at {settings.siteName}.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {courses.map((course: any, i: number) => {
              const Icon = iconMap[course.icon] || BookOpen;
              const colors = [
                "from-cyan-600 to-teal-600",
                "from-amber-500 to-orange-500",
                "from-emerald-600 to-green-600",
                "from-violet-600 to-purple-600",
                "from-rose-500 to-pink-500",
                "from-blue-600 to-indigo-600",
                "from-slate-700 to-slate-800",
                "from-teal-600 to-cyan-600",
                "from-orange-500 to-red-500",
              ];
              return (
                <AnimatedSection key={course.id} delay={i * 0.08} direction="scale">
                  <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className={`bg-gradient-to-br ${colors[i % colors.length]} p-6 relative overflow-hidden`}>
                      <div className="relative z-10">
                        <span className="inline-block bg-white/20 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                          {course.board}
                        </span>
                        <h3 className="text-white font-bold text-lg font-heading">{course.title}</h3>
                      </div>
                      <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon size={80} className="text-white" />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col">
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">{course.description}</p>
                      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="font-medium text-gray-400 text-xs flex items-center gap-1.5">
                          <Clock size={13} className="text-cyan-600" /> {course.duration}
                        </span>
                        <Link href="/admissions" className="btn-gold text-xs px-5 py-2">
                          Enroll <ChevronRight size={12} className="inline" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* CTA */}
          <AnimatedSection>
            <div className="mt-20 text-center bg-gradient-to-r from-cyan-800 via-teal-700 to-emerald-800 rounded-2xl p-12 relative overflow-hidden">
              <GraduationCap size={40} className="text-white/80 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3 font-heading">Can&apos;t find what you&apos;re looking for?</h3>
              <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">Contact us for custom training programs and corporate solutions.</p>
              <Link href="/contact" className="bg-white text-cyan-800 font-bold px-6 py-3 rounded-lg text-sm hover:bg-gray-100 transition-all no-underline inline-flex items-center gap-2">
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
