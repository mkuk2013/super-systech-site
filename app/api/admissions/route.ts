import { NextRequest, NextResponse } from "next/server";
import { readContent, writeContent } from "@/lib/data";
import { verifyToken } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, fatherName, phone, cnic, course, address } = body;

    if (!studentName || !fatherName || !phone || !cnic || !course || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const data = await readContent();
    const admission = {
      id: uuidv4(),
      studentName,
      fatherName,
      phone,
      cnic,
      course,
      address,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    data.admissions.push(admission);
    await writeContent(data);

    return NextResponse.json({ success: true, message: "Application submitted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await readContent();
  return NextResponse.json(data.admissions);
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status } = await request.json();
    const data = await readContent();
    const index = data.admissions.findIndex((a: any) => a.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

    data.admissions[index].status = status;
    await writeContent(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await request.json();
    const data = await readContent();
    data.admissions = data.admissions.filter((a: any) => a.id !== id);
    await writeContent(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
