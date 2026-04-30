import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");

export interface SiteContent {
  settings: {
    siteName: string;
    shortName: string;
    tagline: string;
    established: string;
    phone: string;
    mobile: string;
    email: string;
    address: string;
    mapUrl: string;
    facebookUrl: string;
    youtubeUrl: string;
    linkedinUrl: string;
    whatsappNumber: string;
    affiliations: any[];
    marqueeShow: boolean;
    marqueeText: string;
    showAdmissionsInMarquee?: boolean;
    workingHours?: string;
  };
  hero: any;
  about: any;
  courses: any[];
  team: any[];
  gallery: any[];
  testimonials: any[];
  admissions: any[];
  layout: {
    navbar: {
      logoText: string;
      logoSubText: string;
      links: { label: string; href: string }[];
      ctaLabel: string;
      ctaHref: string;
      showTopBar: boolean;
    };
    footer: {
      aboutText: string;
      quickLinksTitle: string;
      programsTitle: string;
      contactTitle: string;
      copyrightText: string;
    };
  };
  homepage: {
    sections: { id: string; enabled: boolean; label: string }[];
  };
  pageHeroes: Record<string, { badge: string; title: string; subtitle: string }>;
}

export async function readContent(): Promise<SiteContent> {
  let content: any;
  try {
    // Only attempt to read from KV if environment variables are set
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const data = await kv.get<SiteContent>("site_content");
      if (data) {
        content = data;
      }
    }
  } catch (error) {
    console.error("Failed to read from KV, falling back to local file:", error);
  }

  // Fallback to local file if KV is empty or fails
  if (!content) {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    content = JSON.parse(raw);
  }

  // Provide defaults for new fields to prevent breaking
  if (!content.layout) {
    content.layout = {
      navbar: {
        logoText: "Super Sys-Tech",
        logoSubText: "Computers Centre Umerkot",
        links: [
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Courses", href: "/courses" },
          { label: "Gallery", href: "/gallery" },
          { label: "Faculty", href: "/team" },
          { label: "Admissions", href: "/admissions" },
          { label: "Contact", href: "/contact" }
        ],
        ctaLabel: "Apply Now",
        ctaHref: "/admissions",
        showTopBar: true
      },
      footer: {
        aboutText: "Your premier gateway to technical excellence and professional IT training in Umerkot.",
        quickLinksTitle: "Quick Links",
        programsTitle: "Programs",
        contactTitle: "Contact",
        copyrightText: "Affiliated with NAVTTC, STEVTA & SBTE."
      }
    };
  }

  if (!content.homepage) {
    content.homepage = {
      sections: [
        { id: "hero", enabled: true, label: "Hero Section" },
        { id: "about", enabled: true, label: "Principal's Message" },
        { id: "courses", enabled: true, label: "Featured Courses" },
        { id: "why-us", enabled: true, label: "Why Choose Us" },
        { id: "testimonials", enabled: true, label: "Testimonials" },
        { id: "cta", enabled: true, label: "Call to Action" }
      ]
    };
  }

  return content;
}

export async function writeContent(data: SiteContent): Promise<void> {
  let kvSuccess = false;
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      await kv.set("site_content", data);
      kvSuccess = true;
    }
  } catch (error) {
    console.error("Failed to write to KV:", error);
  }

  // Fallback to local file if KV is unavailable or failed
  if (!kvSuccess) {
    try {
      // Ensure the directory exists
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      console.log("Data saved locally to", DATA_FILE);
    } catch (fsError) {
      console.error("Failed to write to local file:", fsError);
      throw fsError;
    }
  }
}

export async function updateSection(section: string, sectionData: any): Promise<any> {
  const content = await readContent();
  (content as any)[section] = sectionData;
  await writeContent(content);
  return sectionData;
}

export async function getSection(section: string): Promise<any[]> {
  const content = await readContent();
  return (content as any)[section] || [];
}

export async function addItem(section: string, item: any): Promise<void> {
  const content = await readContent();
  if (Array.isArray((content as any)[section])) {
    (content as any)[section].push(item);
    await writeContent(content);
  }
}

export async function updateItem(section: string, id: string, updates: any): Promise<any> {
  const content = await readContent();
  const arr = (content as any)[section];
  if (Array.isArray(arr)) {
    const idx = arr.findIndex((i: any) => i.id === id);
    if (idx !== -1) {
      arr[idx] = { ...arr[idx], ...updates };
      await writeContent(content);
      return arr[idx];
    }
  }
  return null;
}

export async function deleteItem(section: string, id: string): Promise<void> {
  const content = await readContent();
  const arr = (content as any)[section];
  if (Array.isArray(arr)) {
    (content as any)[section] = arr.filter((i: any) => i.id !== id);
    await writeContent(content);
  }
}
