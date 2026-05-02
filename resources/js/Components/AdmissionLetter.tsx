"use client";

import React from "react";
import { GraduationCap, MapPin, Phone, CreditCard, Calendar, CheckCircle2 } from "lucide-react";

interface AdmissionLetterProps {
  data: {
    studentName: string;
    fatherName: string;
    course: string;
    phone: string;
    cnic: string;
    address: string;
    createdAt?: string;
    status: string;
  };
}

export const AdmissionLetter = ({ data }: AdmissionLetterProps) => {
  return (
    <div id="admission-letter" className="bg-white p-12 w-[800px] border-[16px] border-slate-900 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -z-0 opacity-50" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-slate-50 rounded-tr-full -z-0 opacity-50" />
      
      {/* Header */}
      <div className="relative z-10 flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">SUPER SYS-TECH</h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Computers Centre Umerkot</p>
          <p className="text-xs font-medium text-slate-400 mt-2">Affiliated with NAVTTC, STEVTA & SBTE</p>
        </div>
        <div className="bg-slate-900 text-white p-4 rounded-xl rotate-3 shadow-xl">
          <GraduationCap size={40} className="text-amber-400" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-[0.2em] inline-block border-b-4 border-amber-400 pb-2">
          Admission Application
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-10 relative z-10">
        {/* Left Column: Student Details */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Student Information</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100">
                  <CheckCircle2 size={16} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Full Name</p>
                  <p className="text-base font-black text-slate-900">{data.studentName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100">
                  <CheckCircle2 size={16} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Father's Name</p>
                  <p className="text-base font-black text-slate-900">{data.fatherName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100">
                  <CreditCard size={16} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">CNIC Number</p>
                  <p className="text-base font-bold text-slate-900 font-mono tracking-tight">{data.cnic}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact Details</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100">
                  <Phone size={16} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</p>
                  <p className="text-base font-black text-slate-900">{data.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100">
                  <MapPin size={16} className="text-slate-900" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Address</p>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">{data.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Admission Details */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Selected Program</p>
            <h3 className="text-2xl font-black text-amber-400 leading-tight mb-8">
              {data.course}
            </h3>
            
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                  data.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 
                  data.status === 'Rejected' ? 'bg-rose-500/20 text-rose-400' : 
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {data.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Reg. Year</span>
                <span className="text-sm font-black">2026</span>
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-8">Authorized Signature</p>
            <div className="h-16 flex items-end justify-center">
              <div className="w-40 border-b border-slate-900" />
            </div>
            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mt-2">Director / Principal</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center relative z-10">
        <p className="text-[10px] font-bold text-slate-400 uppercase">© 2026 Super Sys-Tech Computers Centre</p>
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-slate-400" />
          <p className="text-[10px] font-bold text-slate-400 uppercase">Printed on: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};
