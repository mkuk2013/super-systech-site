import { Head } from "@inertiajs/react";
import AnimatedSection from "@/Components/AnimatedSection";
import MainLayout from "@/Layouts/MainLayout";

interface TeamProps {
    team: any[];
    siteContent: any;
}

export default function TeamPage({ team, siteContent }: TeamProps) {
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.team || {
    badge: "EXPERT FACULTY",
    title: "Meet Our Instructors",
    subtitle: "Our team consists of industry veterans and certified professionals dedicated to providing high-quality IT training."
  };

  return (
    <div className="bg-white min-h-screen">
      <Head title="Our Team" />
      
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

      {/* Team Content */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member: any, i: number) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className="group bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-[4/4.5] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Floating Role Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-lg border border-white/50">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 md:p-10 relative">
                    {/* Quote Icon Decoration */}
                    <div className="absolute -top-6 right-10 w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-cyan-600/30 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V4H21.017V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91238 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017V4H10.017V15C10.017 18.3137 7.33072 21 4.017 21H3.017Z" />
                      </svg>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 font-heading tracking-tight mb-4 group-hover:text-cyan-600 transition-colors">
                      {member.name}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="w-10 h-1 bg-cyan-100 rounded-full group-hover:w-20 transition-all duration-500" />
                      <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        {member.bio || "Expert instructor dedicated to shaping the next generation of digital professionals at Super Sys-Tech."}
                      </p>
                    </div>

                    {/* Social/Expertise Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Faculty</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

TeamPage.layout = (page: any) => <MainLayout children={page} />;
