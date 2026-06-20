import { NextRequest, NextResponse } from "next/server";
import { getProductsCollection } from "@/lib/mongodb/collections";

export async function GET() {
  try {
    const col = await getProductsCollection();
    const products = await col.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const col = await getProductsCollection();

    const now = new Date();
    const doc = {
      _id: body._id ?? crypto.randomUUID(),
      name: body.name,
      slug: body.slug,
      description: body.description ?? "",
      categoryId: body.categoryId ?? "",
      price: Number(body.price) || 0,
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : undefined,
      stock: Number(body.stock) || 0,
      images: body.images ?? [],
      specifications: body.specifications ?? {},
      brand: body.brand ?? "",
      featured: Boolean(body.featured),
      status: body.status ?? "draft",
      createdAt: now,
      updatedAt: now,
    };

    await col.insertOne(doc);
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
