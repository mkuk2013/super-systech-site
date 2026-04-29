import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";
import { readContent, writeContent } from "@/lib/data";
import { verifyToken } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Verify Auth
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 2. List all blobs
    // Note: Requires BLOB_READ_WRITE_TOKEN in environment variables
    const { blobs } = await list();

    if (!blobs || blobs.length === 0) {
      return NextResponse.json({ error: "No images found in Blob storage" }, { status: 404 });
    }

    // 3. Filter for images and create gallery items
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
    const newGalleryItems = blobs
      .filter(blob => imageExtensions.some(ext => blob.url.toLowerCase().endsWith(ext)))
      .map(blob => ({
        id: uuidv4(),
        title: blob.pathname.split("/").pop() || "Untitled",
        image: blob.url,
        category: "Restored"
      }));

    // 4. Update Database
    const data = await readContent();
    data.gallery = newGalleryItems;
    await writeContent(data);

    return NextResponse.json({ 
      success: true, 
      count: newGalleryItems.length,
      message: `${newGalleryItems.length} images restored from Blob storage to Gallery.` 
    });
  } catch (error) {
    console.error("Auto-Gallery Error:", error);
    return NextResponse.json({ 
      error: "Failed to restore gallery", 
      details: String(error) 
    }, { status: 500 });
  }
}
