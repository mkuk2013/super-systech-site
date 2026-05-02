import React from 'react';
import { Head } from "@inertiajs/react";
import AnimatedSection from "@/Components/AnimatedSection";
import MainLayout from "@/Layouts/MainLayout";
import { ShieldCheck, Lock, Eye, Database, Mail, MapPin, ChevronRight, FileText } from 'lucide-react';

interface PrivacyPolicyProps {
    siteContent: any;
}

export default function PrivacyPolicy({ siteContent }: PrivacyPolicyProps) {
    const settings = siteContent?.settings;

    const sections = [
        { id: 'intro', title: 'Introduction', icon: ShieldCheck },
        { id: 'data', title: 'Data Collection', icon: Database },
        { id: 'usage', title: 'How we Use Data', icon: Eye },
        { id: 'security', title: 'Data Security', icon: Lock },
        { id: 'contact', title: 'Contact Us', icon: Mail },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head title="Privacy Policy" />
            
            {/* Premium Header */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10 text-center">
                    <AnimatedSection>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <ShieldCheck size={14} /> Trust & Transparency
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase leading-none">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Policy</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                            Your privacy is our priority. Learn how Super Sys-Tech Computers Centre protects and manages your digital footprint.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 lg:px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        
                        {/* Sticky Sidebar Navigation */}
                        <aside className="lg:w-80 shrink-0">
                            <div className="sticky top-28 space-y-6">
                                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">On this page</h4>
                                    <nav className="space-y-2">
                                        {sections.map((section) => (
                                            <a 
                                                key={section.id}
                                                href={`#${section.id}`}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 transition-all font-bold text-sm group"
                                            >
                                                <section.icon size={18} className="group-hover:scale-110 transition-transform" />
                                                {section.title}
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h5 className="font-black text-lg mb-2">Have Questions?</h5>
                                        <p className="text-slate-400 text-sm mb-6">Our legal team is here to help you understand your rights.</p>
                                        <a href="mailto:supersystechumk@gmail.com" className="inline-flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">
                                            Contact Support <ChevronRight size={14} />
                                        </a>
                                    </div>
                                    <FileText className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                                </div>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <main className="flex-1 space-y-20">
                            
                            <div id="intro" className="scroll-mt-32 space-y-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 mb-2">
                                    <ShieldCheck size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">1. Introduction</h2>
                                <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                                    <p>
                                        Welcome to Super Sys-Tech Computers Centre Umerkot. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                                    </p>
                                    <p>
                                        This website is not intended for children under the age of 13, and we do not knowingly collect data relating to children.
                                    </p>
                                </div>
                            </div>

                            <div id="data" className="scroll-mt-32 space-y-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-2">
                                    <Database size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">2. Data Collection</h2>
                                <p className="text-slate-600 text-lg font-medium leading-relaxed">
                                    Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect the following:
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { title: 'Identity Data', desc: 'First name, last name, and educational identification.', icon: 'ID' },
                                        { title: 'Contact Data', desc: 'Email address and telephone numbers for communication.', icon: '@' },
                                        { title: 'Technical Data', desc: 'IP address, browser type, and location data.', icon: '</>' },
                                        { title: 'Academic Data', desc: 'Previous qualifications and course preferences.', icon: 'EDU' },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                                            <span className="text-[10px] font-black text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full mb-4 inline-block tracking-widest uppercase">{item.icon}</span>
                                            <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                                            <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div id="usage" className="scroll-mt-32 space-y-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mb-2">
                                    <Eye size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">3. How we use your data</h2>
                                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                                    <p className="text-slate-600 font-medium text-lg italic border-l-4 border-cyan-500 pl-6">
                                        "We only process your data to provide you with the best educational experience and to keep our community secure."
                                    </p>
                                    <ul className="grid gap-4">
                                        {[
                                            'To process your admission applications efficiently.',
                                            'To provide support and answer your inquiries.',
                                            'To send important updates regarding your enrolled courses.',
                                            'To maintain the security and integrity of our campus portal.'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600 font-bold">
                                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                                    <ChevronRight size={14} />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div id="security" className="scroll-mt-32 space-y-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-2">
                                    <Lock size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">4. Data Security</h2>
                                <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                                    <div className="relative z-10 space-y-6">
                                        <p className="text-slate-300 text-lg font-medium leading-relaxed">
                                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest">SSL Encryption</span>
                                            <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest">Secure Servers</span>
                                            <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest">Regular Audits</span>
                                        </div>
                                    </div>
                                    <Lock className="absolute top-[-20%] right-[-10%] w-64 h-64 text-white/[0.03] -rotate-12" />
                                </div>
                            </div>

                            <div id="contact" className="scroll-mt-32 space-y-8 pt-10 border-t border-slate-200">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-2">
                                    <Mail size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Contact Information</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Inquiry</p>
                                            <p className="font-black text-slate-900 break-all">{settings?.email || 'supersystechumk@gmail.com'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Visit Campus</p>
                                            <p className="font-black text-slate-900">{settings?.address || '1st Floor, Jameel Market, Umerkot'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-20">
                                <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
                                    Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • © Super Sys-Tech
                                </p>
                            </div>

                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

PrivacyPolicy.layout = (page: React.ReactNode) => <MainLayout children={page} />;
