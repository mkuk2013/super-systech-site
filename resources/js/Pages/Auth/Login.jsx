import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, LogIn, ArrowLeft, ShieldCheck, Award, Users, Globe } from 'lucide-react';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden font-sans">
            <Head title="Admin Login | Super Sys-Tech" />

            {/* Left Side: Branding & Info (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-950 relative overflow-hidden items-center justify-center p-20">
                {/* Abstract Background Design */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-950/30 rounded-full blur-[150px]" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-20" />
                </div>

                <div className="relative z-10 w-full max-w-lg">
                    <div className="mb-12">
                        <div className="w-24 h-24 bg-white rounded-[2rem] p-3 shadow-2xl mb-8 transform -rotate-3 hover:rotate-0 transition-transform duration-700">
                            <img src="/images/logo.png" alt="STC Logo" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
                            Manage the <span className="text-cyan-400">Future</span> of Learning.
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed font-medium">
                            Welcome back to the Super Sys-Tech Admin Portal. Securely manage your campus, students, and academic excellence from one centralized dashboard.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/10">
                        <div>
                            <div className="flex items-center gap-3 text-cyan-400 mb-2">
                                <Users size={20} />
                                <span className="text-2xl font-black text-white">15K+</span>
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Alumni Network</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 text-emerald-400 mb-2">
                                <Award size={20} />
                                <span className="text-2xl font-black text-white">27Yrs</span>
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Legacy of Excellence</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Branding */}
                <div className="absolute bottom-12 left-12 flex items-center gap-3 text-slate-600">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Military Grade Encryption • SSL Secured</span>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-10">
                        <div className="w-20 h-20 bg-white rounded-[1.5rem] p-2 shadow-xl mx-auto mb-6">
                            <img src="/images/logo.png" alt="STC Logo" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-4xl font-black text-slate-950 tracking-tight mb-3">Sign In</h1>
                        <p className="text-slate-500 font-medium text-lg">Enter your administrative credentials to continue.</p>
                    </div>

                    {status && (
                        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-sm font-bold flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Work Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium"
                                    placeholder="name@supersystech.com"
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1 ml-1" />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Secure Password</label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all font-medium"
                                    placeholder="••••••••••••"
                                    required
                                />
                            </div>
                            <InputError message={errors.password} className="mt-1 ml-1" />
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center cursor-pointer group">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded-lg border-slate-200 text-slate-950 focus:ring-slate-950/20 w-5 h-5"
                                />
                                <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-slate-950 transition-colors">Stay logged in</span>
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-xs font-black text-slate-400 hover:text-slate-950 uppercase tracking-widest transition-colors no-underline">
                                    Lost Password?
                                </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black py-4 rounded-2xl shadow-2xl shadow-slate-950/20 flex items-center justify-center gap-3 group transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
                        >
                            {processing ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span className="tracking-widest uppercase">Authenticate Access</span>
                                    <LogIn size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-10 border-t border-slate-200 flex flex-col items-center gap-6">
                        <Link href="/" className="text-slate-400 hover:text-slate-950 font-black text-[11px] uppercase tracking-[0.2em] no-underline transition-colors flex items-center gap-2 group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Return to Homepage
                        </Link>
                        
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">© {new Date().getFullYear()} Super Sys-Tech Control</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
