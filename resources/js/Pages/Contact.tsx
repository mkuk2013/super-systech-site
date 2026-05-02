import { Head } from "@inertiajs/react";
import { Phone, Mail, MapPin, Clock, Facebook, Youtube, Send } from "lucide-react";
import AnimatedSection from "@/Components/AnimatedSection";
import MainLayout from "@/Layouts/MainLayout";

interface ContactProps {
    siteContent: any;
}

export default function ContactPage({ siteContent }: ContactProps) {
  const settings = siteContent?.settings;
  const pageHeroes = siteContent?.pageHeroes;
  const hero = pageHeroes?.contact || {
    badge: "GET IN TOUCH",
    title: "Visit Our Institute",
    subtitle: "Have questions about our programs or admissions? We're here to help you start your digital career."
  };

  return (
    <div className="bg-white min-h-screen">
      <Head title="Contact Us" />
      
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

      {/* Contact Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <AnimatedSection direction="left">
              <div className="space-y-12">
                <div>
                  <p className="section-label mb-3">CONTACT CHANNELS</p>
                  <h2 className="heading-display mb-8">How to reach us</h2>
                  
                  <div className="grid gap-6">
                    <div className="card-institute flex items-start gap-6 group hover:border-cyan-500 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Call Support</p>
                        <h4 className="text-xl font-black text-slate-900 mb-1">{settings?.phone || "0238-571540"}</h4>
                        <p className="text-slate-500 text-sm">{settings?.mobile || "0300-3198050"}</p>
                        {settings?.mobile2 && (
                          <p className="text-slate-500 text-sm mt-0.5">{settings.mobile2}</p>
                        )}
                      </div>
                    </div>

                    <div className="card-institute flex items-start gap-6 group hover:border-emerald-500 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Inquiry</p>
                        <h4 className="text-xl font-black text-slate-900 mb-1">{settings?.email || "supersystechumk@gmail.com"}</h4>
                        <p className="text-slate-500 text-sm">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="card-institute flex items-start gap-6 group hover:border-amber-500 transition-all">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Visit Campus</p>
                        <h4 className="text-xl font-black text-slate-900 mb-1">{settings?.address || "1st Floor, Jameel Market, Umerkot"}</h4>
                        <p className="text-slate-500 text-sm">Sindh, Pakistan</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="section-label mb-3">SOCIAL PRESENCE</p>
                  <div className="flex gap-4">
                    <a href={settings?.facebookUrl || "#"} className="w-12 h-12 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-blue-500/20" title="Facebook">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href={settings?.youtubeUrl || "#"} className="w-12 h-12 rounded-xl bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl shadow-red-500/20" title="YouTube">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection direction="right">
              <div className="h-full min-h-[500px] rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl relative bg-slate-100">
                 {settings?.mapUrl ? (
                   <iframe 
                      src={settings.mapUrl.includes('google.com/maps') && !settings.mapUrl.includes('/embed') 
                        ? settings.mapUrl.replace('/maps', '/maps/embed') 
                        : settings.mapUrl}
                      className="w-full h-full border-none"
                      loading="lazy"
                      allowFullScreen
                   ></iframe>
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                      Map location not set
                   </div>
                 )}
                 <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white shadow-xl flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-white">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Office Hours</p>
                        <p className="text-slate-900 font-bold text-sm">Mon - Sat: 08:00 AM - 08:00 PM</p>
                    </div>
                 </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

ContactPage.layout = (page: any) => <MainLayout children={page} />;
