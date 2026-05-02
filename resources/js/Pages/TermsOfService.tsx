import React from 'react';
import { Head } from "@inertiajs/react";
import AnimatedSection from "@/Components/AnimatedSection";
import MainLayout from "@/Layouts/MainLayout";
import { Scale, BookOpen, GraduationCap, Gavel, AlertCircle, Mail, Phone, ChevronRight, FileCheck } from 'lucide-react';

interface TermsOfServiceProps {
    siteContent: any;
}

export default function TermsOfService({ siteContent }: TermsOfServiceProps) {
    const settings = siteContent?.settings;

    const sections = [
        { id: 'acceptance', title: 'Acceptance', icon: FileCheck },
        { id: 'admissions', title: 'Admissions', icon: GraduationCap },
        { id: 'license', title: 'Usage License', icon: BookOpen },
        { id: 'conduct', title: 'Code of Conduct', icon: Gavel },
        { id: 'liability', title: 'Liability', icon: AlertCircle },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            <Head title="Terms of Service" />
            
            {/* Premium Header */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10 text-center">
                    <AnimatedSection>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <Scale size={14} /> Legal Agreement
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase leading-none">
                            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Service</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                            Everything you need to know about our rules, regulations, and commitment to your education.
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
                                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Table of Contents</h4>
                                    <nav className="space-y-2">
                                        {sections.map((section) => (
                                            <a 
                                                key={section.id}
                                                href={`#${section.id}`}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-all font-bold text-sm group"
                                            >
                                                <section.icon size={18} className="group-hover:scale-110 transition-transform" />
                                                {section.title}
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h5 className="font-black text-lg mb-2">Need Help?</h5>
                                        <p className="text-slate-400 text-sm mb-6">Contact our administration for any policy clarifications.</p>
                                        <a href="/contact" className="inline-flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">
                                            Visit Help Desk <ChevronRight size={14} />
                                        </a>
                                    </div>
                                    <Scale className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                                </div>
                            </div>
                        </aside>

                        {/* Main Content Area */}
                        <main className="flex-1 space-y-20">
                            
                            <div id="acceptance" className="scroll-mt-32 space-y-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mb-2">
                                    <FileCheck size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">1. Acceptance of Terms</h2>
                                <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                                    <p>
                                        By accessing the website of Super Sys-Tech Computers Centre and enrolling in any of our technical programs, you agree to be bound by these Terms of Service. These terms govern your relationship with us and apply to all visitors, students, and others who access or use our services.
                                    </p>
                                    <p>
                                        If you disagree with any part of the terms, then you may not access the service or enroll in our academic programs.
                                    </p>
                                </div>
                            </div>

                            <div id="admissions" className="scroll-mt-32 space-y-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 mb-2">
                                    <GraduationCap size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">2. Enrollment & Admissions</h2>
                                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                                    <p className="text-slate-600 font-medium text-lg leading-relaxed">
                                        Super Sys-Tech maintains a high standard of academic excellence. Enrollment is subject to the following conditions:
                                    </p>
                                    <ul className="grid gap-4">
                                        {[
                                            'Providing verified and accurate previous academic records.',
                                            'Compliance with the minimum attendance requirements for certification.',
                                            'Adherence to the payment schedule for course fees.',
                                            'Meeting the technical prerequisites for advanced IT programs.'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-slate-600 font-bold">
                                                <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                                                    <ChevronRight size={14} />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div id="license" className="scroll-mt-32 space-y-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-2">
                                    <BookOpen size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">3. Usage License</h2>
                                <p className="text-slate-600 text-lg font-medium leading-relaxed">
                                    All course materials, including software, notes, and digital assets, are the intellectual property of Super Sys-Tech.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-emerald-500">
                                        <h4 className="text-lg font-black text-slate-900 mb-2">Permitted Use</h4>
                                        <p className="text-slate-500 text-sm font-medium">Personal study, individual project work, and classroom learning activities.</p>
                                    </div>
                                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-red-500">
                                        <h4 className="text-lg font-black text-slate-900 mb-2">Prohibited Use</h4>
                                        <p className="text-slate-500 text-sm font-medium">Commercial redistribution, unauthorized sharing, or reselling of institute materials.</p>
                                    </div>
                                </div>
                            </div>

                            <div id="conduct" className="scroll-mt-32 space-y-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white mb-2">
                                    <Gavel size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">4. Code of Conduct</h2>
                                <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 space-y-6">
                                    <p className="text-slate-600 font-medium text-lg leading-relaxed">
                                        Super Sys-Tech is a community of learning. We expect all students to:
                                    </p>
                                    <div className="grid gap-4">
                                        {[
                                            'Maintain respectful communication with faculty and peers.',
                                            'Strictly avoid any form of plagiarism or academic dishonesty.',
                                            'Respect institute property and computing resources.',
                                            'Follow the lab and classroom safety protocols.'
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white px-6 py-4 rounded-2xl border border-slate-100 font-bold text-slate-700 flex items-center gap-4">
                                                <span className="text-amber-500">0{i+1}</span>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div id="liability" className="scroll-mt-32 space-y-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 text-red-600 mb-2">
                                    <AlertCircle size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">5. Limitation of Liability</h2>
                                <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                                    <p>
                                        In no event shall Super Sys-Tech Computers Centre or its partners be liable for any damages arising out of the use or inability to use the materials provided, even if we have been notified of the possibility of such damage.
                                    </p>
                                </div>
                            </div>

                            <div id="contact" className="scroll-mt-32 space-y-8 pt-10 border-t border-slate-200">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-950 text-white mb-2">
                                    <Mail size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">Get in Touch</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Official Email</p>
                                            <p className="font-black text-slate-900 break-all">{settings?.email || 'stcuk1997@gmail.com'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                        <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Administrative Office</p>
                                            <p className="font-black text-slate-900">{settings?.phone || '0238-571540'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-20">
                                <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
                                    Effective Date: January 1, 2026 • © Super Sys-Tech Computers Centre
                                </p>
                            </div>

                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

TermsOfService.layout = (page: React.ReactNode) => <MainLayout children={page} />;
