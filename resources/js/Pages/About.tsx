import { Link, Head } from "@inertiajs/react";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/Components/AnimatedSection";
import MainLayout from "@/Layouts/MainLayout";

interface AboutProps {
    about: any;
    siteContent: any;
}

export default function AboutPage({ about, siteContent }: AboutProps) {
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.about || {
    badge: "OUR STORY",
    title: "About STC Umerkot",
    subtitle: "Established in 1997, Super Sys-Tech Computers Centre Umerkot has been providing world-class technical education to thousands of students across the region."
  };

  return (
    <div className="bg-white min-h-screen">
      <Head title="About Us" />
      
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
            <p className="text-amber-400 text-xs font-black tracking-[0.2em] uppercase mb-4 opacity-90">{hero.badge}</p>
            <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {hero.title}
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed opacity-80">
              {hero.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <p className="section-label mb-3">OUR INSTITUTION</p>
              <h2 className="heading-display mb-6">
                {about.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-10">{about.description}</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="card-institute">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center mb-4">
                    <Target className="text-white" size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 font-heading">Our Mission</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{about.mission}</p>
                </div>
                <div className="card-institute">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                    <Eye className="text-white" size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 font-heading">Our Vision</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{about.vision}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white">
                  <img src={about.principalImage} alt={about.principalName} className="w-full min-h-[450px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="bg-slate-950 rounded-3xl p-8 shadow-2xl mt-6 border-l-8 border-cyan-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <h3 className="text-2xl font-black text-white font-heading tracking-tight mb-1">{about.principalName}</h3>
                  <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-4">{about.principalTitle}</p>
                  <blockquote className="text-slate-300 text-sm italic leading-relaxed font-medium">
                    &ldquo;{about.principalMessage}&rdquo;
                  </blockquote>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="section-label mb-3">ACHIEVEMENTS</p>
              <h2 className="heading-display">
                Our Milestones
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {about.achievements?.map((a: string, i: number) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-emerald-600" size={16} />
                  </span>
                  <span className="font-semibold text-slate-800 text-sm">{a}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

AboutPage.layout = (page: any) => <MainLayout children={page} />;
