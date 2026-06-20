import { NextRequest, NextResponse } from "next/server";
import { getCategoriesCollection } from "@/lib/mongodb/collections";

export async function GET() {
  try {
    const col = await getCategoriesCollection();
    const categories = await col.find({}).sort({ name: 1 }).toArray();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const col = await getCategoriesCollection();

    const doc = {
      _id: body._id ?? crypto.randomUUID(),
      name: body.name,
      slug: body.slug,
      description: body.description ?? "",
      image: body.image ?? "",
    };

    await col.insertOne(doc);
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
