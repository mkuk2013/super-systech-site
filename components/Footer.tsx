"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Linkedin, ChevronRight } from "lucide-react";

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/content?section=settings")
      .then((r) => r.json())
      .then(setSettings);
    
    fetch("/api/content?section=courses")
      .then((r) => r.json())
      .then(setCourses);
  }, []);

  return (
    <footer>
      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-cyan-800 via-teal-700 to-emerald-800 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-lg">{settings?.ctaTitle || "Ready to Start Your Journey?"}</h4>
            <p className="text-white/60 text-sm">{settings?.ctaSubtitle || "Join 8,500+ successful graduates from STC Umerkot"}</p>
          </div>
          <Link href="/admissions" className="bg-white text-cyan-800 font-bold px-6 py-3 rounded-lg text-sm hover:bg-gray-100 transition-all no-underline flex items-center gap-2 shadow-lg">
            Apply Now <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-slate-900 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image src="/images/logo_ssc.png" alt="STC" width={56} height={56} className="rounded-xl bg-white p-1 shadow-sm" />
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-white leading-tight font-heading">
                    Super Sys-Tech
                  </h3>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Computers Centre Umerkot
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Your premier gateway to technical excellence and professional IT training in Umerkot.
              </p>
              <div className="flex gap-2">
                <a href={settings?.facebookUrl || "https://www.facebook.com/SuperSysTechComputersUmerkot"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 hover:bg-cyan-600 hover:text-white transition-all">
                  <Facebook size={14} />
                </a>
                <a href={settings?.youtubeUrl || "https://www.youtube.com/@stcumerkot"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 hover:bg-cyan-600 hover:text-white transition-all">
                  <Youtube size={14} />
                </a>
                <a href={settings?.mapUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 hover:bg-cyan-600 hover:text-white transition-all">
                  <MapPin size={14} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-5">Quick Links</h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/courses", label: "Programs" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/team", label: "Our Faculty" },
                  { href: "/admissions", label: "Admissions" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-500 text-sm hover:text-cyan-400 transition-colors no-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-5">Programs</h4>
              <ul className="space-y-2.5">
                {(courses.length > 0 ? courses.slice(0, 7) : [
                  "D.I.T (1 Year Diploma)",
                  "C.I.T (6 Months)",
                  "Web Development",
                  "Graphic Design & Video Editing",
                  "E-Commerce & Freelancing",
                  "Digital Marketing",
                  "Programming (Python/Java)",
                ]).map((course: any) => (
                  <li key={typeof course === 'string' ? course : course.id} className="text-gray-500 text-sm">
                    {typeof course === 'string' ? course : course.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-5">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500 text-sm">{settings?.address || "1st Floor, Jameel Market, Umerkot, Sindh"}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-500 text-sm">
                    <div>{settings?.phone || "0238-571540"}</div>
                    <div>{settings?.mobile || "0300-3198050"}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500 text-sm">{settings?.email || "supersystechumk@gmail.com"}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500 text-sm">{settings?.workingHours || "Mon - Sat: 8:00 AM - 5:00 PM"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} {settings?.siteName || "Super Sys-Tech Computers Centre Umerkot"}. {settings?.copyrightInfo || "Affiliated with NAVTTC, STEVTA & SBTE."}
            </p>
            <p className="text-gray-700 text-xs">Privacy Policy &bull; Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
