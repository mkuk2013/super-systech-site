import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const DATA_FILE = path.join(process.cwd(), "data", "content.json");
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);

    await kv.set("site_content", data);

    return NextResponse.json({ success: true, message: "Database synchronized successfully with local JSON." });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Failed to sync database", details: String(error) }, { status: 500 });
  }
}
