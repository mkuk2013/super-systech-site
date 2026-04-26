import { NextRequest, NextResponse } from "next/server";
import { readContent, updateSection } from "@/lib/data";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");
    const data = readContent();

    if (section && section in data) {
      return NextResponse.json(data[section as keyof typeof data]);
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { section, data } = await request.json();
    if (!section || data === undefined) {
      return NextResponse.json({ error: "Missing section or data" }, { status: 400 });
    }

    const updated = updateSection(section, data);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
