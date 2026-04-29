import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Linkedin, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-cyan-800 via-teal-700 to-emerald-800 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-lg">Ready to Start Your Journey?</h4>
            <p className="text-white/60 text-sm">Join 8,500+ successful graduates from STC Umerkot</p>
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
              <div className="flex items-center gap-3 mb-5">
                <Image src="/images/logo_ssc.png" alt="STC" width={56} height={56} className="rounded-lg bg-white p-1" />
                <div>
                  <h3 className="font-bold text-white text-xl font-heading">Super Sys-Tech</h3>
                  <p className="text-gray-500 text-sm">Computers Centre Umerkot</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Where Dreams Are Polished Into Skills. Your Gateway to IT Excellence since 1997.
              </p>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/SuperSysTechComputersUmerkot" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 hover:bg-cyan-600 hover:text-white transition-all">
                  <Facebook size={14} />
                </a>
                <a href="https://www.youtube.com/@stcumerkot" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 hover:bg-cyan-600 hover:text-white transition-all">
                  <Youtube size={14} />
                </a>
                <a href="https://www.linkedin.com/company/stcumerkot" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500 hover:bg-cyan-600 hover:text-white transition-all">
                  <Linkedin size={14} />
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
                {[
                  "D.I.T (1 Year Diploma)",
                  "C.I.T (6 Months)",
                  "Web Development",
                  "Graphic Design & Video Editing",
                  "E-Commerce & Freelancing",
                  "Digital Marketing",
                  "Programming (Python/Java)",
                ].map((course) => (
                  <li key={course} className="text-gray-500 text-sm">
                    {course}
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
                  <span className="text-gray-500 text-sm">1st Floor, Jameel Market, Umerkot, Sindh</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-500 text-sm">
                    <div>0238-571540</div>
                    <div>0300-3198050</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500 text-sm">supersystechumk@gmail.com</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500 text-sm">Mon - Sat: 8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} Super Sys-Tech Computers Centre Umerkot. Affiliated with NAVTTC, STEVTA & SBTE.
            </p>
            <p className="text-gray-700 text-xs">Privacy Policy &bull; Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
