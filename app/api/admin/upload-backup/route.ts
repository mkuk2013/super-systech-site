import { NextRequest, NextResponse } from "next/server";
import { writeContent } from "@/lib/data";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify Auth
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 2. Parse the uploaded JSON
    const data = await request.json();

    // 3. Basic Validation (check if essential keys exist)
    if (!data.settings || !data.hero || !data.courses) {
      return NextResponse.json({ error: "Invalid backup format" }, { status: 400 });
    }

    // 4. Write to Database
    await writeContent(data);

    return NextResponse.json({ 
      success: true, 
      message: "Database successfully restored from backup file." 
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ 
      error: "Failed to upload backup", 
      details: String(error) 
    }, { status: 500 });
  }
}
