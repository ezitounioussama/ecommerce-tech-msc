import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import { AddToCartButton } from "./_components/add-to-cart-button";
import { IconTag, IconBox, IconStar, IconCurrencyDollar } from "@tabler/icons-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found - TechSphere" };

  return {
    title: `${product.name} - TechSphere`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const hasComparePrice = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = hasComparePrice
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-card">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <IconBox className="h-20 w-20 text-muted-foreground/20" />
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.brand}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-foreground sm:text-4xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              ${product.price.toLocaleString()}
            </span>
            {hasComparePrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.compareAtPrice!.toLocaleString()}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                product.stock > 10
                  ? "bg-emerald-500/10 text-emerald-500"
                  : product.stock > 0
                    ? "bg-amber-500/10 text-amber-500"
                    : "bg-destructive/10 text-destructive"
              }`}
            >
              <IconTag className="h-3 w-3" />
              {product.stock > 10
                ? "In Stock"
                : product.stock > 0
                  ? `Only ${product.stock} left`
                  : "Out of Stock"}
            </span>
            {product.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-blue/10 px-2.5 py-0.5 text-xs font-medium text-accent-blue">
                <IconStar className="h-3 w-3" />
                Featured
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Specifications */}
          {Object.keys(product.specifications).length > 0 && (
            <div className="mt-6 rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <tr
                      key={key}
                      className={
                        idx < Object.keys(product.specifications).length - 1
                          ? "border-b border-border"
                          : ""
                      }
                    >
                      <td className="px-4 py-2.5 font-medium text-foreground">{key}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add to Cart */}
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
