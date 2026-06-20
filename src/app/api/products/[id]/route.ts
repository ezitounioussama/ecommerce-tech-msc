import { NextRequest, NextResponse } from "next/server";
import { getProductsCollection } from "@/lib/mongodb/collections";
import { deleteImage } from "@/lib/rustfs/s3-server";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const col = await getProductsCollection();

    const result = await col.updateOne(
      { _id: id },
      {
        $set: {
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
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updated = await col.findOne({ _id: id });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const col = await getProductsCollection();

    const product = await col.findOne({ _id: id });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.images?.length) {
      await Promise.allSettled(product.images.map((url: string) => deleteImage(url)));
    }

    await col.deleteOne({ _id: id });

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
