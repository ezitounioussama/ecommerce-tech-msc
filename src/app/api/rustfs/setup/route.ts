import { ensureBucket, uploadImage } from "@/lib/rustfs/s3-server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await ensureBucket();

    const buffer = await readFile(join(process.cwd(), "public", "hero.jpg"));

    const url = await uploadImage("hero.jpg", buffer, "image/jpeg");

    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
