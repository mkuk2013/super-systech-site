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
  };
  hero: any;
  about: any;
  courses: any[];
  team: any[];
  gallery: any[];
  testimonials: any[];
  admissions: any[];
}

export async function readContent(): Promise<SiteContent> {
  try {
    // Only attempt to read from KV if environment variables are set
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const data = await kv.get<SiteContent>("site_content");
      if (data) {
        return data;
      }
    }
  } catch (error) {
    console.error("Failed to read from KV, falling back to local file:", error);
  }

  // Fallback to local file if KV is empty or fails
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export async function writeContent(data: SiteContent): Promise<void> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      await kv.set("site_content", data);
    } else {
      throw new Error("KV environment variables missing");
    }
  } catch (error) {
    console.error("Failed to write to KV:", error);
    // Locally we just write to the file for dev convenience
    if (process.env.NODE_ENV === "development") {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    }
    throw error;
  }
}

export async function updateSection(section: string, sectionData: any): Promise<any> {
  const content = await readContent();
  (content as any)[section] = sectionData;
  await writeContent(content);
  return sectionData;
}
