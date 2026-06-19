import type { ReactNode } from "react";

export function StaticPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto mt-24 max-w-3xl px-4 py-16">
      <h1 className="heading-1 text-foreground">{title}</h1>
      {description && (
        <p className="mt-2 text-lg text-muted-foreground">{description}</p>
      )}
      <div className="mt-10 space-y-4 leading-relaxed">{children}</div>
    </div>
  );
}
