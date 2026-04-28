import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");

export interface SiteContent {
  settings: Record<string, any>;
  hero: Record<string, any>;
  about: Record<string, any>;
  courses: any[];
  team: any[];
  gallery: any[];
  testimonials: any[];
  admissions: any[];
}

export async function readContent(): Promise<SiteContent> {
  try {
    const data = await kv.get<SiteContent>("site_content");
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Failed to read from KV, falling back to local file:", error);
  }

  // Fallback to local file if KV is empty or fails (e.g., local dev without KV setup)
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export async function writeContent(data: SiteContent): Promise<void> {
  try {
    await kv.set("site_content", data);
  } catch (error) {
    console.error("Failed to write to KV:", error);
    // Locally, we might want to also write to the file for persistence if KV is not set up
    if (process.env.NODE_ENV !== "production") {
      try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
      } catch (fsError) {
        console.error("Failed to write to local file:", fsError);
      }
    }
  }
}

export async function getSection(section: keyof SiteContent) {
  const data = await readContent();
  return data[section];
}

export async function updateSection(section: keyof SiteContent, value: any) {
  const data = await readContent();
  data[section] = value as never;
  await writeContent(data);
  return data[section];
}

export async function addItem(section: "courses" | "team" | "gallery" | "testimonials" | "admissions", item: any) {
  const data = await readContent();
  data[section].push(item);
  await writeContent(data);
  return item;
}

export async function updateItem(section: "courses" | "team" | "gallery" | "testimonials" | "admissions", id: string, updates: any) {
  const data = await readContent();
  const index = data[section].findIndex((item: any) => item.id === id);
  if (index === -1) return null;
  data[section][index] = { ...data[section][index], ...updates };
  await writeContent(data);
  return data[section][index];
}

export async function deleteItem(section: "courses" | "team" | "gallery" | "testimonials" | "admissions", id: string) {
  const data = await readContent();
  data[section] = data[section].filter((item: any) => item.id !== id);
  await writeContent(data);
  return true;
}
