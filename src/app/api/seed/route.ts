import { NextResponse } from "next/server";
import { getProductsCollection, getCategoriesCollection } from "@/lib/mongodb/collections";
import { MOCK_PRODUCTS } from "@/constants/products";
import { MOCK_CATEGORIES } from "@/constants/categories";

export async function POST() {
  try {
    const productsCol = await getProductsCollection();
    const categoriesCol = await getCategoriesCollection();

    const existingCategories = await categoriesCol.countDocuments();
    const existingProducts = await productsCol.countDocuments();

    if (existingCategories > 0 || existingProducts > 0) {
      return NextResponse.json({
        message: "Database already seeded. Use DELETE /api/seed to reset first.",
        categories: existingCategories,
        products: existingProducts,
      });
    }

    const categories = MOCK_CATEGORIES.map((c) => ({
      ...c,
      _id: c._id,
    }));
    await categoriesCol.insertMany(categories);

    const products = MOCK_PRODUCTS.map((p) => ({
      ...p,
      _id: p._id,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
    }));
    await productsCol.insertMany(products);

    return NextResponse.json({
      message: "Database seeded successfully",
      categories: categories.length,
      products: products.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const productsCol = await getProductsCollection();
    const categoriesCol = await getCategoriesCollection();

    const deletedCategories = await categoriesCol.deleteMany({});
    const deletedProducts = await productsCol.deleteMany({});

    return NextResponse.json({
      message: "Database cleared",
      categories: deletedCategories.deletedCount,
      products: deletedProducts.deletedCount,
    });
  } catch (error) {
    console.error("Clear error:", error);
    return NextResponse.json({ error: "Failed to clear database" }, { status: 500 });
  }
}
