import fs from "fs";
import path from "path";

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

export function readContent(): SiteContent {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export function writeContent(data: SiteContent): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getSection(section: keyof SiteContent) {
  const data = readContent();
  return data[section];
}

export function updateSection(section: keyof SiteContent, value: any) {
  const data = readContent();
  data[section] = value;
  writeContent(data);
  return data[section];
}

export function addItem(section: "courses" | "team" | "gallery" | "testimonials" | "admissions", item: any) {
  const data = readContent();
  data[section].push(item);
  writeContent(data);
  return item;
}

export function updateItem(section: "courses" | "team" | "gallery" | "testimonials" | "admissions", id: string, updates: any) {
  const data = readContent();
  const index = data[section].findIndex((item: any) => item.id === id);
  if (index === -1) return null;
  data[section][index] = { ...data[section][index], ...updates };
  writeContent(data);
  return data[section][index];
}

export function deleteItem(section: "courses" | "team" | "gallery" | "testimonials" | "admissions", id: string) {
  const data = readContent();
  data[section] = data[section].filter((item: any) => item.id !== id);
  writeContent(data);
  return true;
}
