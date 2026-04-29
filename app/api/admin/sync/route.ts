import { NextRequest, NextResponse } from "next/server";
import { readContent, writeContent } from "@/lib/data";
import { verifyToken } from "@/lib/auth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify Auth
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 2. Read LOCAL file specifically (ignoring KV for a moment)
    const DATA_FILE = path.join(process.cwd(), "data", "content.json");
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const localData = JSON.parse(raw);

    // 3. Force Write to KV
    await writeContent(localData);

    return NextResponse.json({ 
      success: true, 
      message: "Database successfully synced with local content.json" 
    });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ 
      error: "Failed to sync", 
      details: String(error) 
    }, { status: 500 });
  }
}
