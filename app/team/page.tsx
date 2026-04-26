import { readContent } from "@/lib/data";
import { User } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export const dynamic = "force-dynamic";

export default function TeamPage() {
  const { team } = readContent();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="mesh-gradient py-20 pt-24 relative overflow-hidden">
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10">
          <AnimatedSection>
            <p className="text-amber-400 text-xs font-bold tracking-[0.15em] uppercase mb-3">OUR TEAM</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Faculty</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Experienced professionals dedicated to shaping the next generation of tech leaders.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 gradient-section">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member: any, i: number) => (
              <AnimatedSection key={member.id} delay={i * 0.1} direction="scale">
                <div className="group text-center bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-72 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center">
                          <User size={36} className="text-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-5">
                      <p className="text-white/90 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg font-heading">{member.name}</h3>
                    <p className="text-cyan-700 text-sm font-semibold">{member.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {team.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <User size={36} className="text-gray-300" />
              </div>
              <p className="font-medium">Faculty information coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
