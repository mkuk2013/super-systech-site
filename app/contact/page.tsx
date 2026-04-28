import { readContent } from "@/lib/data";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { settings } = await readContent();

  const contactCards = [
    { icon: MapPin, title: "Our Location", lines: [settings.address] },
    { icon: Phone, title: "Phone", lines: [settings.phone, settings.mobile] },
    { icon: Mail, title: "Email", lines: [settings.email] },
    { icon: Clock, title: "Working Hours", lines: ["Mon - Sat: 8AM - 5PM", "Sunday: Closed"] },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="mesh-gradient py-20 pt-24 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center relative z-10">
          <AnimatedSection>
            <p className="text-amber-400 text-xs font-bold tracking-[0.15em] uppercase mb-3">GET IN TOUCH</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Us</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Have a question? We&apos;d love to hear from you. Reach out via any method below.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 gradient-section">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Contact Cards Row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {contactCards.map((card, i) => (
              <AnimatedSection key={i} delay={i * 0.1} direction="scale">
                <div className="card-institute text-center group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                    <card.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 font-heading">{card.title}</h3>
                  {card.lines.map((l, j) => (
                    <p key={j} className="text-gray-500 text-sm">{l}</p>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Form */}
          <AnimatedSection>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid lg:grid-cols-5">
                {/* Left - Info */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white flex flex-col justify-center relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold font-heading mb-4">Let&apos;s Talk</h2>
                    <p className="text-white/50 text-sm mb-8 leading-relaxed">
                      Fill out the form and our team will get back to you within 24 hours.
                    </p>
                    <div className="space-y-4">
                      <a href={`tel:${settings.mobile}`} className="flex items-center gap-3 text-white/70 text-sm hover:text-cyan-400 transition-all no-underline">
                        <Phone size={16} className="text-cyan-400" /> {settings.mobile}
                      </a>
                      <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-white/70 text-sm hover:text-cyan-400 transition-all no-underline">
                        <Mail size={16} className="text-cyan-400" /> {settings.email}
                      </a>
                    </div>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/${settings.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-green-600 transition-all no-underline shadow-lg shadow-green-500/20"
                    >
                      <MessageSquare size={16} /> Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Right - Form */}
                <div className="lg:col-span-3 p-10">
                  <form className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2">Full Name</label>
                        <input type="text" className="admin-input" placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2">Phone Number</label>
                        <input type="tel" className="admin-input" placeholder="03XX-XXXXXXX" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2">Email Address</label>
                      <input type="email" className="admin-input" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2">Subject</label>
                      <input type="text" className="admin-input" placeholder="What is this about?" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2">Message</label>
                      <textarea rows={4} className="admin-input" placeholder="Write your message here..." />
                    </div>
                    <button type="submit" className="btn-gold px-8 py-4 w-full flex items-center justify-center gap-2">
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
