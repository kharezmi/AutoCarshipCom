import { randomBytes } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-session";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

function extForMime(mime: string): string {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/gif") return "gif";
  if (mime === "image/webp") return "webp";
  return "bin";
}

export async function POST(req: Request) {
  const c = await cookies();
  if (!verifyAdminSessionToken(c.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const entry = form.get("file");
  if (!entry || typeof entry === "string") {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const blob = entry as Blob;
  const mime = blob.type || "application/octet-stream";
  if (!ALLOWED.has(mime)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, GIF, and WebP images are allowed." },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await blob.arrayBuffer());
  if (buf.length > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image too large (max 8 MB)." },
      { status: 400 }
    );
  }

  const id = `${Date.now()}-${randomBytes(6).toString("hex")}`;
  const ext = extForMime(mime);
  const filename = `${id}.${ext}`;
  const dir = path.join(process.cwd(), "public", "blog-uploads");
  await mkdir(dir, { recursive: true });
  const filepath = path.join(dir, filename);
  await writeFile(filepath, buf);

  const url = `/blog-uploads/${filename}`;
  return NextResponse.json({ url });
}
