import { NextRequest, NextResponse } from "next/server";
import { getCategoriesCollection } from "@/lib/mongodb/collections";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const col = await getCategoriesCollection();

    const result = await col.updateOne(
      { _id: id },
      { $set: { name: body.name, slug: body.slug, description: body.description } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const updated = await col.findOne({ _id: id });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/categories/[id] error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const col = await getCategoriesCollection();

    const result = await col.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    console.error("DELETE /api/categories/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
