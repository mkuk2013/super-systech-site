import { NextResponse } from "next/server";
import { readContent } from "@/lib/data";

export async function GET() {
  try {
    const content = await readContent();
    
    // Create a filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `super_systech_backup_${date}.json`;

    return new NextResponse(JSON.stringify(content, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export failed:", error);
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}
