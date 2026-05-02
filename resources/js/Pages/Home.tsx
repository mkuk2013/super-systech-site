import { Link, Head } from "@inertiajs/react";
import {
  ArrowRight, ChevronRight, Award, GraduationCap,
  ShieldCheck, BookOpen, CheckCircle2,
  Code, Palette, Star, Quote, Users, Clock, Sparkles,
  ShoppingCart, Briefcase,
} from "lucide-react";
import AnimatedSection from "@/Components/AnimatedSection";
import AnimatedCounter from "@/Components/AnimatedCounter";
import MainLayout from "@/Layouts/MainLayout";
import React from 'react';

const iconMap: Record<string, any> = {
  GraduationCap, ShieldCheck, BookOpen, Award, Code, Palette, ShoppingCart, Briefcase,
};

interface HomeProps {
    hero: any;
    about: any;
    courses: any[];
    testimonials: any[];
    settings: any;
    homepage: any;
}

export default function Home({ hero, about, courses, testimonials, settings, homepage }: HomeProps) {
  const featuredCourses = courses.filter((c: any) => c.featured).slice(0, 6);

  const renderSection = (section: any) => {
    if (!section.enabled) return null;

    switch (section.id) {
      case "hero":
        return (
          <section key="hero" className="relative min-h-[92vh] flex items-center mesh-gradient overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-15">
              <img src={hero.backgroundImage} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/90 via-navy/70 to-navy" />
            <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl floating-shape" />
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl floating-shape-delayed" />

            <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 relative z-10 py-24 md:py-32 pt-16 md:pt-20">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                <div className="text-center lg:text-left flex flex-col justify-center">
                  <AnimatedSection delay={0}>
                    <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black px-4 py-2 rounded-full mb-8 tracking-[0.2em] uppercase">
                      <Sparkles size={14} className="animate-pulse" /> {hero.badge}
                    </div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.05] font-heading">
                      {hero.title || "Where Dreams Are"}{" "}
                      <span className="text-gradient">
                        {hero.titleHighlight || "Polished Into Skills"}
                      </span>
                      {" "}{hero.titleEnd}
                    </h1>
                  </AnimatedSection>
                  <AnimatedSection delay={0.2}>
                    <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium opacity-80">
                      {hero.subtitle}
                    </p>
                  </AnimatedSection>
                  <AnimatedSection delay={0.3}>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-5 mb-12">
                      <Link href="/admissions" className="btn-gold group">
                        {hero.ctaPrimary || "Start Your Journey"} 
                        <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link href="/courses" className="btn-outline-white">
                        {hero.ctaSecondary || "Explore Programs"}
                      </Link>
                    </div>
                  </AnimatedSection>
                </div>

                <AnimatedSection delay={0.4} direction="left" className="flex flex-col -translate-y-8">
                  <div className="relative group flex flex-col">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/30 to-teal-500/30 rounded-[2.5rem] blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
                    <div className="relative rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl bg-white/5 backdrop-blur-sm p-1 group-hover:scale-[1.01] transition-all duration-700 flex items-center justify-center h-[400px] lg:h-[480px]">
                      <img
                        src="/images/stc_banner_main.jpg"
                        alt="Super Sys-Tech Institute"
                        className="w-full h-full object-contain rounded-[1.8rem]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-4 right-4 left-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/5 hidden md:block">
                      <p className="text-white/90 text-[10px] font-black uppercase tracking-[0.2em] text-center">Modern Facilities • Expert Faculty • Practical Learning</p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              <div className="mt-20 space-y-12">
                <AnimatedSection delay={0.35}>
                  <div className="relative overflow-hidden py-4">
                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-navy to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-navy to-transparent z-10" />
                    
                    <div className="flex animate-marquee-content hover:[animation-play-state:paused] whitespace-nowrap gap-10 items-center w-max py-4">
                      {[... (settings?.affiliations || []), ... (settings?.affiliations || []), ... (settings?.affiliations || []), ... (settings?.affiliations || [])]?.map((a: any, i: number) => (
                        <div key={i} className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-500 cursor-pointer shadow-2xl backdrop-blur-md group">
                          <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                            <img 
                              src={a.logo} 
                              alt={a.name} 
                              className="w-full h-full object-contain drop-shadow-2xl grayscale brightness-150 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-amber-400 text-[10px] font-black tracking-[0.2em] uppercase mb-1 opacity-70 group-hover:opacity-100 group-hover:text-amber-300 transition-all">
                              Authorized Board
                            </span>
                            <span className="text-white text-lg md:text-xl font-extrabold tracking-tight group-hover:text-cyan-400 transition-colors">
                              {a.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.4}>
                  <div className="border-t border-white/10 pt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
                      {hero.stats?.map((stat: any, i: number) => (
                        <AnimatedCounter key={i} target={stat.value} label={stat.label} />
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );

      case "banner":
        return (
          <section key="banner" className="w-full bg-slate-50 py-4">
            <AnimatedSection direction="up">
              <div className="w-full overflow-hidden shadow-xl border-y border-slate-200 bg-white">
                <img 
                  src="/images/stc_banner_main.jpg" 
                  alt="Super Sys-Tech Official Banner" 
                  className="w-full h-auto block"
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
              </div>
            </AnimatedSection>
          </section>
        );

      case "about":
        return (
          <section key="about" className="py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-[-15deg] translate-x-1/2" />
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 relative z-10 py-16 md:py-24">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <AnimatedSection direction="left">
                  <div className="relative group mx-auto lg:mx-0">
                    <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white">
                      <img 
                        src={about.directorImage} 
                        alt={about.directorName} 
                        width={500}
                        height={600}
                        className="w-full h-[500px] object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="font-black text-lg tracking-tight mb-0.5">{about.directorName}</p>
                        <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em]">{about.directorTitle}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
 
                <AnimatedSection direction="right">
                  <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-6 tracking-[0.2em] uppercase">
                    Director&apos;s Message
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight leading-tight text-slate-900 font-heading">
                    {about.title || "Leading Umerkot's"}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">{about.titleHighlight}</span>
                  </h2>
                  <div className="relative mb-10">
                    <p className="text-slate-600 text-base leading-relaxed font-medium">
                      {about.directorMessage}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {about.achievements?.slice(0, 4).map((a: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300">
                        <div className="w-6 h-6 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={14} className="text-cyan-600" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">{a}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/about" className="btn-gold !px-8 !py-3 !text-[11px] uppercase tracking-widest">
                    Learn Our History <ArrowRight size={16} className="ml-2" />
                  </Link>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );

      case "courses":
        return (
          <section key="courses" className="py-24 bg-white relative">
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
              <AnimatedSection>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1 rounded-full mb-4 tracking-[0.3em] uppercase">
                    Academic Excellence
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 font-heading">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">Specializations</span>
                  </h2>
                </div>
              </AnimatedSection>
 
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCourses.map((course: any, i: number) => {
                  const Icon = iconMap[course.icon] || BookOpen;
                  return (
                    <AnimatedSection key={course.id} delay={i * 0.05} direction="scale">
                      <div className="group bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-cyan-100 transition-all duration-500 h-full flex flex-col">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500">
                          <Icon size={22} />
                        </div>
                        <h4 className="font-black text-slate-900 text-lg mb-2 font-heading tracking-tight uppercase">{course.title}</h4>
                        <p className="text-[13px] text-slate-500 mb-6 flex-1 leading-relaxed line-clamp-3">{course.description}</p>
                        <div className="flex items-center justify-between pt-5 border-t border-slate-200/50">
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                            <Clock size={12} className="text-cyan-500" /> {course.duration}
                          </span>
                          <Link href="/admissions" className="text-cyan-700 font-black text-[10px] no-underline flex items-center gap-2 uppercase tracking-widest">
                            Details <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>

              <AnimatedSection>
                <div className="text-center mt-16">
                  <Link href="/courses" className="btn-outline-gold group">
                    View Full Prospectus <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </section>
        );

      case "why-us":
        return (
          <section key="why-us" className="py-24 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-[0.05]" />
            
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
              <AnimatedSection>
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-white/10 text-cyan-400 text-[9px] font-black px-3 py-1 rounded-full mb-4 tracking-[0.3em] uppercase backdrop-blur-sm">
                    Why Super Sys-Tech
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                    Built for the <span className="text-cyan-400">Future</span>
                  </h2>
                </div>
              </AnimatedSection>
 
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Award, title: "Board Certified", desc: "Recognized diplomas for global employment.", accent: "border-white/5 bg-white/5" },
                  { icon: Users, title: "Expert Faculty", desc: "Instructors with deep industry background.", accent: "border-white/5 bg-white/5" },
                  { icon: Sparkles, title: "Modern Labs", desc: "High-spec computer labs with fast internet.", accent: "border-white/5 bg-white/5" },
                  { icon: GraduationCap, title: "15,000+ Alumni", desc: "Massive network of successful graduates.", accent: "border-white/5 bg-white/5" },
                ].map((item, i) => (
                  <AnimatedSection key={i} delay={item.title === "Modern Labs" ? 0.15 : i * 0.05}>
                    <div className={`${item.accent} rounded-3xl p-6 border backdrop-blur-sm hover:bg-white hover:text-slate-900 transition-all duration-500 h-full group`}>
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500">
                        <item.icon size={20} />
                      </div>
                      <h4 className="font-black text-white text-base mb-2 font-heading tracking-tight group-hover:text-slate-900 uppercase">{item.title}</h4>
                      <p className="text-slate-400 text-[12px] leading-relaxed font-medium group-hover:text-slate-600 transition-colors">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        );

      case "testimonials":
        if (testimonials.length === 0) return null;
        return (
          <section key="testimonials" className="py-24 bg-white">
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-6">
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
        );

      case "cta":
        return (
          <section key="cta" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-800 via-teal-700 to-emerald-800" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMCAxMnY2aC02di02aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
              <AnimatedSection>
                <GraduationCap size={48} className="mx-auto mb-6 text-white/80" />
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5">
                  Ready to Shape Your Future?
                </h2>
                <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join Umerkot&apos;s most trusted technical institution. Admissions are now open for the 2026 academic year.
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden">
      <Head title="Home" />
      {homepage?.sections?.map((section: any) => renderSection(section))}
    </div>
  );
}

Home.layout = (page: any) => <MainLayout children={page} />;
