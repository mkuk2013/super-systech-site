import { readContent } from "@/lib/data";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const { about, settings } = readContent();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="mesh-gradient py-20 pt-24 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10">
          <AnimatedSection>
            <p className="text-amber-400 text-xs font-bold tracking-[0.15em] uppercase mb-3">OUR STORY</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">STC Umerkot</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Established in 1997, Super Sys-Tech Computers Centre Umerkot has been providing world-class
              technical education to thousands of students across the region.
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
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={about.principalImage} alt={about.principalName} className="w-full min-h-[450px] object-cover" />
                </div>
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 shadow-xl mt-4 border-l-4 border-cyan-500">
                  <h3 className="text-xl font-bold text-white font-heading">{about.principalName}</h3>
                  <p className="text-cyan-400 text-sm font-bold mb-3">{about.principalTitle}</p>
                  <blockquote className="text-slate-300 text-sm italic leading-relaxed">
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
            {about.achievements.map((a: string, i: number) => (
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

      {/* Affiliations */}
      <section className="py-20 mesh-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10">
          <AnimatedSection>
            <p className="text-amber-400 text-xs font-bold tracking-[0.15em] uppercase mb-3">RECOGNIZED BY</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-12">
              Our Official Affiliations
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {settings.affiliations.map((a: any, i: number) => (
              <AnimatedSection key={i} delay={i * 0.1} direction="scale">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all">
                  <img src={a.logo} alt={a.name} className="w-16 h-16 object-contain mx-auto mb-3" />
                  <span className="font-semibold text-white text-sm">{a.name}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
