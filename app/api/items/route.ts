import { NextRequest, NextResponse } from "next/server";
import { addItem, updateItem, deleteItem, getSection } from "@/lib/data";
import { verifyToken } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

type ArraySection = "courses" | "team" | "gallery" | "testimonials" | "admissions";

async function authorize(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section") as ArraySection;
  if (!section) return NextResponse.json({ error: "Section required" }, { status: 400 });
  const data = getSection(section);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!(await authorize(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { section, item } = await request.json();
    const newItem = { ...item, id: uuidv4() };
    addItem(section as ArraySection, newItem);
    return NextResponse.json({ success: true, item: newItem });
  } catch {
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await authorize(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { section, id, updates } = await request.json();
    const updated = updateItem(section as ArraySection, id, updates);
    if (!updated) return NextResponse.json({ error: "Item not found" }, { status: 404 });
    return NextResponse.json({ success: true, item: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await authorize(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { section, id } = await request.json();
    deleteItem(section as ArraySection, id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
