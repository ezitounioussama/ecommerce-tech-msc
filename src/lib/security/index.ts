export function sanitizeSearchQuery(query: string): string {
  return query.replace(/[<>'"();]/g, "").trim();
}

export function sanitizeProductFilter(filter: Record<string, unknown>): Record<string, unknown> {
  const allowed = ["categoryId", "brand", "minPrice", "maxPrice", "status", "featured"];
  return Object.fromEntries(
    Object.entries(filter).filter(([key]) => allowed.includes(key)),
  );
}
