import Link from "next/link";
import Image from "next/image";
import { readContent } from "@/lib/data";
import {
  ArrowRight, ChevronRight, Award, GraduationCap,
  ShieldCheck, BookOpen, CheckCircle2,
  Code, Palette, Star, Quote, Users, Clock, Sparkles,
  ShoppingCart, Briefcase,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCounter from "@/components/AnimatedCounter";

const iconMap: Record<string, any> = {
  GraduationCap, ShieldCheck, BookOpen, Award, Code, Palette, ShoppingCart, Briefcase,
};

export const dynamic = "force-dynamic";

export default function Home() {
  const data = readContent();
  const { hero, about, courses, testimonials, settings } = data;
  const featuredCourses = courses.filter((c: any) => c.featured).slice(0, 6);

  return (
    <div className="overflow-hidden">

      {/* ===== HERO - Dark dramatic section ===== */}
      <section className="relative min-h-[92vh] flex items-center mesh-gradient overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src={hero.backgroundImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/90 via-navy/70 to-navy" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl floating-shape" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl floating-shape-delayed" />

        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10 py-20 pt-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection delay={0}>
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
                  <GraduationCap size={14} /> {hero.badge}
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-6 leading-[1.1]">
                  Where Dreams Are{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                    Polished Into Skills
                  </span>
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
                  {hero.subtitle}
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Link href="/admissions" className="btn-gold px-8 py-3.5 text-sm flex items-center gap-2">
                    Start Your Journey <ArrowRight size={16} />
                  </Link>
                  <Link href="/courses" className="btn-outline-white px-8 py-3.5 text-sm">
                    Explore Programs
                  </Link>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.35}>
                <div className="flex flex-wrap items-center gap-5">
                  {settings.affiliations.map((a: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                      <img src={a.logo} alt={a.name} className="w-7 h-7 object-contain" />
                      <span className="text-slate-300 text-xs font-medium">{a.name}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.2} direction="right">
              <div className="hidden lg:block relative">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                  <Image
                    src="/images/logo_ssc.png"
                    alt="Super Sys-Tech Computers"
                    width={350}
                    height={350}
                    className="mx-auto drop-shadow-2xl"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Stats bar */}
          <AnimatedSection delay={0.4}>
            <div className="mt-16 grid grid-cols-3 max-w-2xl gap-8">
              {hero.stats.map((stat: any, i: number) => (
                <AnimatedCounter key={i} target={stat.value} label={stat.label} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== ABOUT / PRINCIPAL ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={about.principalImage} alt={about.principalName} className="w-full min-h-[450px] object-cover" />
                </div>
                <div className="absolute -bottom-5 -right-3 md:right-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center">
                      <Award size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{about.principalName}</p>
                      <p className="text-cyan-700 text-xs font-medium">{about.principalTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="section-label mb-3">PRINCIPAL&apos;S MESSAGE</p>
              <h2 className="heading-display mb-6">
                Leading Umerkot&apos;s{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-teal-600">IT Revolution</span>
              </h2>
              <blockquote className="text-gray-600 italic border-l-4 border-amber-400 pl-5 mb-8 leading-relaxed bg-amber-50/50 py-4 pr-4 rounded-r-lg">
                &ldquo;{about.principalMessage}&rdquo;
              </blockquote>
              <ul className="space-y-3 mb-8">
                {about.achievements.slice(0, 4).map((a: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn-outline-gold inline-flex items-center gap-2">
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== FEATURED COURSES ===== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="section-label mb-3">OUR PROGRAMS</p>
              <h2 className="heading-display">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-teal-600">Certifications</span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Government-recognized board diplomas and industry certifications to launch your career.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course: any, i: number) => {
              const Icon = iconMap[course.icon] || BookOpen;
              const colors = [
                "from-cyan-600 to-teal-600",
                "from-amber-500 to-orange-500",
                "from-emerald-600 to-green-600",
                "from-violet-600 to-purple-600",
                "from-rose-500 to-pink-500",
                "from-blue-600 to-indigo-600",
              ];
              return (
                <AnimatedSection key={course.id} delay={i * 0.08} direction="scale">
                  <div className="group card-institute h-full flex flex-col relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colors[i % 6]}`} />
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i % 6]} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-2 font-heading">{course.title}</h4>
                    <p className="text-sm text-gray-500 mb-4 flex-1 leading-relaxed">{course.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                        <Clock size={12} /> {course.duration}
                      </span>
                      <Link href="/admissions" className="text-cyan-700 font-semibold text-xs no-underline flex items-center gap-1 group-hover:gap-2 transition-all">
                        Enroll <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection>
            <div className="text-center mt-12">
              <Link href="/courses" className="btn-outline-gold inline-flex items-center gap-2">
                Browse All Courses <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-24 mesh-gradient text-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-amber-400 text-xs font-bold tracking-[0.15em] uppercase mb-3">WHY STC UMERKOT</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Why Students{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Choose Us</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Board Certified", desc: "All diplomas affiliated with SBTE, recognized by Govt of Pakistan", accent: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20" },
              { icon: Users, title: "Expert Faculty", desc: "Experienced instructors with industry background and certifications", accent: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20" },
              { icon: Sparkles, title: "Modern Labs", desc: "State-of-the-art computer labs with latest hardware and software", accent: "from-amber-500/20 to-amber-500/5 border-amber-500/20" },
              { icon: GraduationCap, title: "8,500+ Alumni", desc: "Thousands of successful graduates contributing globally", accent: "from-violet-500/20 to-violet-500/5 border-violet-500/20" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`bg-gradient-to-b ${item.accent} rounded-xl p-6 border backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
                  <item.icon size={28} className="text-white mb-4" />
                  <h4 className="font-bold text-white text-base mb-2 font-heading">{item.title}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="section-label mb-3">STUDENT VOICES</p>
                <h2 className="heading-display">
                  What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-teal-600">Alumni Say</span>
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t: any, i: number) => (
                <AnimatedSection key={t.id} delay={i * 0.1}>
                  <div className="card-institute relative">
                    <Quote className="absolute top-4 right-4 text-cyan-100" size={36} />
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{t.message}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900 text-sm">{t.name}</h5>
                        <p className="text-xs text-gray-400">{t.course}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-800 via-teal-700 to-emerald-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMCAxMnY2aC02di02aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
          <AnimatedSection>
            <GraduationCap size={48} className="mx-auto mb-6 text-white/80" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5">
              Ready to Shape Your Future?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join Umerkot&apos;s most trusted technical institution. Admissions are now open for the 2025 academic year.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/admissions" className="bg-white text-cyan-800 font-bold px-8 py-3.5 rounded-lg text-sm hover:bg-gray-100 transition-all no-underline inline-flex items-center gap-2 shadow-lg">
                Register for Next Batch <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline-white px-8 py-3.5">
                Contact Admissions
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
